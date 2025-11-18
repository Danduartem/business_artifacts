#!/usr/bin/env node

/**
 * WORKFLOW: Batch Process Items
 *
 * Purpose: Process multiple items with checkpointing and recovery
 * Composes multiple primitives based on input configuration
 *
 * This is a HIGH-LEVEL workflow for convenience.
 * Demonstrates batch processing pattern with recovery.
 */

import { executePrimitive } from '../workflow-utils.js';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'workflow.batch-process' });
const args = parseArgs();

async function batchProcess() {

  try {
    if (!args.flags.items) {
      throw new Error('--items is required (JSON array string)');
    }

    if (!args.flags.operation) {
      throw new Error('--operation is required (primitive to execute)');
    }

    const items = JSON.parse(args.flags.items);
    const operation = args.flags.operation;
    const continueOnError = args.flags['continue-on-error'];

    logger.info('Starting batch processing', {
      itemCount: items.length,
      operation
    });

    const results = [];
    const errors = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      try {
        logger.info(`Processing item ${i + 1}/${items.length}`, { item });

        const result = executePrimitive(operation, item);

        results.push({
          index: i,
          item,
          result,
          success: true
        });

      } catch (error) {
        logger.error(`Failed to process item ${i + 1}`, { error: error.message });

        errors.push({
          index: i,
          item,
          error: error.message
        });

        if (!continueOnError) {
          throw error;
        }
      }
    }

    const result = {
      success: true,
      totalItems: items.length,
      successCount: results.length,
      errorCount: errors.length,
      results,
      errors
    };

    console.log(JSON.stringify(result, null, 2));
    logger.info('Batch processing complete', {
      success: results.length,
      failed: errors.length
    });

  } catch (error) {
    logger.error('Batch processing failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

batchProcess();
