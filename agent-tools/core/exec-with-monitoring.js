/**
 * exec-with-monitoring - Execute jobs with automatic progress monitoring
 *
 * Purpose:
 * - Provide a wrapper that combines job execution + monitoring
 * - Makes monitored execution the default (instead of silent background runs)
 * - Integrates with discovery system for seamless usage
 *
 * This is what Claude/AI agents should ALWAYS use when running jobs.
 *
 * Usage:
 * ```javascript
 * import { execWithMonitoring } from './core/exec-with-monitoring.js';
 *
 * const result = await execWithMonitoring(
 *   'capabilities/jobs/instagram/complete-profile-extraction.js',
 *   {
 *     username: 'blankschoolbr',
 *     'start-date': '2025-11-01',
 *     'end-date': '2025-11-30',
 *     profile: true,
 *     transcribe: true
 *   }
 * );
 *
 * // User sees:
 * // 🚀 Starting: complete-profile-extraction
 * // 📍 Stage 1/4: Extracting URLs
 * // 📍 Stage 2/4: Extracting posts
 * //    [42%] Extracting posts: 5/12
 * // ...
 * // ✅ Complete! (2m 15s)
 * //    Summary: {totalPosts: 12, videosTranscribed: 3}
 * ```
 */

import { spawn } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { JobMonitor } from './monitor.js';
import { autoCleanup } from './cleanup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Execute a job with automatic monitoring
 *
 * @param {string} jobPath - Path to job file (absolute or relative to agent-tools/)
 * @param {Object} params - Job parameters (flags and values)
 * @param {Object} options - Execution options
 * @param {number} options.pollInterval - Monitor poll interval in ms (default: 15000)
 * @param {boolean} options.verbose - Enable verbose logging (default: false)
 * @param {boolean} options.captureOutput - Capture stdout/stderr to file (default: true)
 * @returns {Promise<Object>} Job result with summary
 */
export async function execWithMonitoring(jobPath, params = {}, options = {}) {
  // Auto-cleanup stale jobs before starting new execution
  await autoCleanup();

  const {
    pollInterval = 15000,
    verbose = false,
    captureOutput = true
  } = options;

  // Resolve job path
  const agentToolsRoot = join(__dirname, '..');
  const resolvedPath = jobPath.startsWith('/')
    ? jobPath
    : join(agentToolsRoot, jobPath);

  // Convert params object to CLI arguments
  const args = paramsToArgs(params);

  // Job identifier
  const jobName = basename(jobPath, '.js');

  console.log(`🚀 Starting: ${jobName}`);
  if (verbose) {
    console.log(`   Path: ${resolvedPath}`);
    console.log(`   Args: ${args.join(' ')}`);
  }
  console.log(`📊 Monitoring enabled (updates every ${pollInterval / 1000}s)`);

  // Prepare output capture
  let outputFile = null;
  if (captureOutput) {
    const tempDir = join(agentToolsRoot, 'temp', 'job-outputs');
    if (!existsSync(tempDir)) {
      mkdirSync(tempDir, { recursive: true });
    }
    outputFile = join(tempDir, `${jobName}-${Date.now()}.log`);
  }

  // Start job as background process
  const startTime = Date.now();
  const child = spawn('node', [resolvedPath, ...args], {
    detached: true,
    stdio: captureOutput ? ['ignore', 'pipe', 'pipe'] : 'ignore',
    cwd: agentToolsRoot
  });

  const jobId = child.pid;

  // Capture output to file if enabled
  if (captureOutput) {
    let outputBuffer = '';

    child.stdout?.on('data', (data) => {
      outputBuffer += data.toString();
    });

    child.stderr?.on('data', (data) => {
      outputBuffer += data.toString();
    });

    // Periodically write to file
    const writeInterval = setInterval(() => {
      if (outputBuffer) {
        try {
          writeFileSync(outputFile, outputBuffer, { flag: 'w' });
        } catch (e) {
          if (verbose) console.error(`Failed to write output: ${e.message}`);
        }
      }
    }, 2000);

    // Cleanup on exit
    child.on('exit', () => {
      clearInterval(writeInterval);
      if (outputBuffer) {
        writeFileSync(outputFile, outputBuffer, { flag: 'w' });
      }
    });
  }

  child.unref(); // Don't wait for child to exit

  if (verbose) {
    console.log(`   Job ID: ${jobId}`);
    if (outputFile) {
      console.log(`   Output: ${outputFile}`);
    }
  }

  // Start monitoring
  const monitor = new JobMonitor(jobId, {
    pollInterval,
    verbose,
    outputFile,  // Pass the output file path to the monitor

    onProgress: (status) => {
      // Format progress update
      if (status.stage) {
        console.log(`📍 Stage ${status.stage}: ${status.message || 'In progress'}`);
      } else if (status.percent !== undefined) {
        console.log(`   [${status.percent}%] ${status.message}`);
      } else if (status.message) {
        console.log(`   ${status.message}`);
      }
    },

    onComplete: (result) => {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      const duration = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

      console.log(`✅ Complete! (${duration})`);

      if (result.summary) {
        console.log(`   Summary: ${JSON.stringify(result.summary, null, 2)}`);
      }

      if (result.error) {
        console.log(`   ⚠️  Warning: ${result.error}`);
      }

      if (outputFile && verbose) {
        console.log(`   Full output: ${outputFile}`);
      }
    }
  });

  try {
    const result = await monitor.start();
    return {
      ...result,
      jobId,
      outputFile,
      duration: result.elapsed
    };
  } catch (error) {
    console.error(`❌ Job failed: ${error.message}`);
    if (outputFile) {
      console.error(`   Check logs: ${outputFile}`);
    }
    throw error;
  }
}

/**
 * Convert params object to CLI arguments array
 * @private
 *
 * @param {Object} params - Parameters object
 * @returns {string[]} Array of CLI arguments
 *
 * @example
 * paramsToArgs({ username: 'test', 'start-date': '2025-01-01', profile: true, count: 10 })
 * // Returns: ['--username', 'test', '--start-date', '2025-01-01', '--profile', '--count', '10']
 */
function paramsToArgs(params) {
  const args = [];

  for (const [key, value] of Object.entries(params)) {
    const flag = key.startsWith('--') ? key : `--${key}`;

    if (value === true) {
      // Boolean flag
      args.push(flag);
    } else if (value !== false && value !== null && value !== undefined) {
      // Value argument
      args.push(flag, String(value));
    }
    // Skip false, null, undefined
  }

  return args;
}

/**
 * Execute multiple jobs in sequence with monitoring
 *
 * @param {Array<{path: string, params: Object}>} jobs - Array of job configurations
 * @param {Object} options - Execution options
 * @returns {Promise<Array>} Array of results
 */
export async function execSequence(jobs, options = {}) {
  const results = [];

  for (let i = 0; i < jobs.length; i++) {
    const { path, params } = jobs[i];
    console.log(`\n[${i + 1}/${jobs.length}] Executing: ${basename(path)}`);

    try {
      const result = await execWithMonitoring(path, params, options);
      results.push({ success: true, result });
    } catch (error) {
      results.push({ success: false, error: error.message });

      if (!options.continueOnError) {
        throw new Error(`Job ${i + 1} failed: ${error.message}`);
      }
    }
  }

  return results;
}

/**
 * Execute multiple jobs in parallel with monitoring
 * Note: Use with caution - parallel jobs may compete for resources
 *
 * @param {Array<{path: string, params: Object}>} jobs - Array of job configurations
 * @param {Object} options - Execution options
 * @returns {Promise<Array>} Array of results
 */
export async function execParallel(jobs, options = {}) {
  console.log(`Executing ${jobs.length} jobs in parallel...`);

  const promises = jobs.map(({ path, params }, i) => {
    console.log(`   [${i + 1}] ${basename(path)}`);
    return execWithMonitoring(path, params, options).catch(error => ({
      success: false,
      error: error.message
    }));
  });

  return await Promise.all(promises);
}

export default execWithMonitoring;
