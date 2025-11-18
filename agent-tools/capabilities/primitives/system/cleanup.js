#!/usr/bin/env node
/**
 * @tool system.cleanup
 * @description Kill hung processes and reset browser state
 * @category system
 *
 * @output success boolean - Cleanup completed successfully
 * @output message string - Cleanup result message
 * @output killedProcesses array - List of process types that were cleaned
 *
 * @example
 * node cleanup.js
 *
 * @example-output
 * {"success": true, "message": "Cleanup complete", "killedProcesses": ["instagram", "workflows", "chrome"]}
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createLogger } from '../../../core/logger/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = createLogger({ toolName: 'system.cleanup' });

/**
 * Execute a cleanup command and track if it killed processes
 */
function executeCleanup(command, label) {
  try {
    logger.info(`Killing ${label} processes...`);
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    // pkill returns non-zero if no processes found - this is fine
    logger.debug(`${label} cleanup completed`, {
      note: 'No processes found or already cleaned'
    });
    return false;
  }
}

/**
 * Close browser using the browser.close primitive
 */
async function closeBrowser() {
  try {
    const closePath = join(__dirname, '..', 'browser', 'close.js');
    logger.info('Closing browser...');

    execSync(`node "${closePath}"`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });

    return true;
  } catch (error) {
    // Browser might not be running - this is fine
    logger.debug('Browser close completed', {
      note: 'Browser may not have been running'
    });
    return false;
  }
}

async function main() {
  try {
    logger.info('Starting system cleanup');

    const killedProcesses = [];

    // Kill Instagram-related node processes
    if (executeCleanup('pkill -9 -f "node.*instagram" 2>/dev/null || true', 'Instagram workflow')) {
      killedProcesses.push('instagram');
    }

    // Kill any workflow processes
    if (executeCleanup('pkill -9 -f "capabilities/workflows" 2>/dev/null || true', 'generic workflow')) {
      killedProcesses.push('workflows');
    }

    // Kill any Chrome debugging processes
    if (executeCleanup('pkill -9 -f "Google Chrome.*--remote-debugging-port" 2>/dev/null || true', 'Chrome remote debugging')) {
      killedProcesses.push('chrome');
    }

    // Close browser if running
    if (await closeBrowser()) {
      killedProcesses.push('browser');
    }

    // Wait a moment for cleanup to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = {
      success: true,
      message: 'Cleanup complete - hung processes killed and browser state reset',
      killedProcesses
    };

    console.log(JSON.stringify(result));
    logger.info('Cleanup completed successfully', result);

    process.exit(0);

  } catch (error) {
    logger.error('Cleanup failed', {
      error: error.message,
      stack: error.stack
    });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      message: 'Cleanup encountered an error but may have partially completed'
    }));

    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as cleanup };
