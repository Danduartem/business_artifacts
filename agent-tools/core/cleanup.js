/**
 * Automatic cleanup service for stale job references
 *
 * Purpose:
 * - Remove stale job state files that persist across sessions
 * - Prevent confusion from "running" jobs that actually finished
 * - Keep temp directories clean
 *
 * Problem:
 * - Jobs complete but their state files remain
 * - Next session, Claude sees "job still running" and gets confused
 * - User has to manually clean up or explain "those are old"
 *
 * Solution:
 * - Auto-clean state files older than N minutes
 * - Run cleanup on every tool execution
 * - Optional manual cleanup command
 */

import { readdir, stat, unlink, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const AGENT_TOOLS_ROOT = join(__dirname, '..');

/**
 * Clean up stale job state files
 *
 * @param {Object} options - Cleanup options
 * @param {number} options.maxAgeMinutes - Max age for state files (default: 30)
 * @param {boolean} options.dryRun - Preview what would be deleted (default: false)
 * @param {boolean} options.verbose - Log details (default: false)
 * @returns {Promise<Object>} Cleanup results
 */
export async function cleanupStaleJobs(options = {}) {
  const {
    maxAgeMinutes = 30,
    dryRun = false,
    verbose = false
  } = options;

  const results = {
    stateFiles: [],
    outputFiles: [],
    totalCleaned: 0,
    errors: []
  };

  // Clean state directory
  const stateDir = join(AGENT_TOOLS_ROOT, 'temp', 'state');
  if (existsSync(stateDir)) {
    await cleanDirectory(stateDir, maxAgeMinutes, dryRun, verbose, results.stateFiles, results.errors);
  }

  // Clean job output logs
  const outputDir = join(AGENT_TOOLS_ROOT, 'temp', 'job-outputs');
  if (existsSync(outputDir)) {
    await cleanDirectory(outputDir, maxAgeMinutes, dryRun, verbose, results.outputFiles, results.errors);
  }

  results.totalCleaned = results.stateFiles.length + results.outputFiles.length;

  if (verbose) {
    console.log(`Cleanup complete:`);
    console.log(`  State files: ${results.stateFiles.length}`);
    console.log(`  Output files: ${results.outputFiles.length}`);
    console.log(`  Total: ${results.totalCleaned}`);
    if (results.errors.length > 0) {
      console.log(`  Errors: ${results.errors.length}`);
    }
  }

  return results;
}

/**
 * Clean a directory of old files
 * @private
 */
async function cleanDirectory(dir, maxAgeMinutes, dryRun, verbose, cleanedList, errorList) {
  try {
    const files = await readdir(dir);
    const now = Date.now();
    const maxAgeMs = maxAgeMinutes * 60 * 1000;

    for (const file of files) {
      const filePath = join(dir, file);

      try {
        const fileStat = await stat(filePath);
        const ageMs = now - fileStat.mtimeMs;
        const ageMinutes = Math.round(ageMs / 1000 / 60);

        if (ageMs > maxAgeMs) {
          if (verbose) {
            console.log(`  ${dryRun ? '[DRY RUN]' : 'Removing'} ${file} (${ageMinutes}m old)`);
          }

          if (!dryRun) {
            if (fileStat.isDirectory()) {
              await rm(filePath, { recursive: true, force: true });
            } else {
              await unlink(filePath);
            }
          }

          cleanedList.push({ file, ageMinutes });
        }
      } catch (error) {
        errorList.push({ file, error: error.message });
        if (verbose) {
          console.error(`  Error cleaning ${file}: ${error.message}`);
        }
      }
    }
  } catch (error) {
    errorList.push({ dir, error: error.message });
    if (verbose) {
      console.error(`  Error reading directory ${dir}: ${error.message}`);
    }
  }
}

/**
 * Run cleanup automatically (called on tool startup)
 * Uses conservative settings to avoid interfering with running jobs
 */
export async function autoCleanup() {
  try {
    await cleanupStaleJobs({
      maxAgeMinutes: 60, // Only clean files older than 1 hour
      dryRun: false,
      verbose: false  // Silent unless errors
    });
  } catch (error) {
    // Fail silently - cleanup failure shouldn't break tool execution
    console.error(`Auto-cleanup failed: ${error.message}`);
  }
}

/**
 * Manual cleanup command (can be run as script)
 */
export async function manualCleanup(options = {}) {
  console.log('Running manual cleanup...');

  const results = await cleanupStaleJobs({
    maxAgeMinutes: options.maxAgeMinutes || 30,
    dryRun: options.dryRun || false,
    verbose: true
  });

  if (options.dryRun) {
    console.log('\n[DRY RUN] No files were actually deleted.');
    console.log(`Run without --dry-run to perform cleanup.`);
  }

  return results;
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const maxAgeMinutes = parseInt(args.find(arg => arg.startsWith('--max-age='))?.split('=')[1]) || 30;

  manualCleanup({ dryRun, maxAgeMinutes })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(`Cleanup failed: ${error.message}`);
      process.exit(1);
    });
}

export default cleanupStaleJobs;
