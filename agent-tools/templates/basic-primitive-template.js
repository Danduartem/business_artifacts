#!/usr/bin/env node

/**
 * PRIMITIVE TEMPLATE
 *
 * Copy this template when creating new primitives
 * Follow these best practices:
 *
 * 1. ALWAYS call process.exit(0) on success
 * 2. ALWAYS call process.exit(1) on error
 * 3. Output ONLY JSON to stdout (logs go to logger)
 * 4. Use try-catch for all operations
 * 5. Clean up resources before exiting
 */

import { parseArgs } from '../../core/utils/index.js';
import { createLogger } from '../../core/logger/index.js';

const logger = createLogger({ toolName: 'primitive.template' });
const args = parseArgs();

async function main() {
  try {
    // 1. Validate inputs
    if (!args.flags.required) {
      throw new Error('--required is required');
    }

    // 2. Log what we're doing (goes to log file, not stdout)
    logger.info('Starting operation', { input: args.flags.required });

    // 3. Do the work
    const result = { success: true, data: 'example' };

    // 4. Output JSON to stdout (ONLY JSON, nothing else)
    console.log(JSON.stringify(result));

    // 5. Log completion
    logger.info('Operation complete');

    // 6. CRITICAL: Always exit explicitly
    process.exit(0);

  } catch (error) {
    // Log error details
    logger.error('Operation failed', { error: error.message });

    // Output error as JSON
    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    // Exit with error code
    process.exit(1);
  }
}

main();
