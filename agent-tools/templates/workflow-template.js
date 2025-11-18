#!/usr/bin/env node
/**
 * @workflow {category}.{name}
 * @description High-level description of what this workflow accomplishes
 * @category {category}
 *
 * @composes primitive1, primitive2, primitive3
 *
 * @input inputParam string - Description of input parameter
 * @input optionalInput boolean - Optional input description
 *
 * @output finalResult object - Description of final output
 * @output status string - Workflow status
 *
 * @example
 * node {name}.js --input-param "value"
 *
 * @example-output
 * {"success": true, "finalResult": {...}, "status": "completed"}
 */

import { parseArgs } from 'node:util';
import { executePrimitive } from '../workflow-utils.js';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';

const logger = createLogger({
  toolName: 'workflow.{category}.{name}'
});

const state = createStateManager({
  namespace: 'workflow-{name}'
});

// Parse command line arguments
const { values } = parseArgs({
  options: {
    inputParam: { type: 'string' },
    optionalInput: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h' }
  }
});

// Help flag
if (values.help) {
  console.log(`
Usage: node {name}.js [options]

Description:
  High-level description of what this workflow accomplishes

Workflow Steps:
  1. Step 1 description
  2. Step 2 description
  3. Step 3 description

Options:
  --input-param <value>    Description of input parameter (required)
  --optional-input         Optional input description
  --help, -h               Show this help

Example:
  node {name}.js --input-param "value"

Output (JSON):
  {
    "success": true,
    "finalResult": { ... },
    "status": "completed"
  }
  `);
  process.exit(0);
}

async function main() {
  try {
    logger.info('Starting workflow', { params: values });

    // Validate required inputs
    if (!values.inputParam) {
      throw new Error('--input-param is required');
    }

    // Check if we can resume from checkpoint
    const checkpoint = state.get('lastStep');
    if (checkpoint) {
      logger.info('Resuming from checkpoint', { lastStep: checkpoint });
    }

    // STEP 1: Execute first primitive
    let step1Result;
    if (!checkpoint || checkpoint < 1) {
      logger.info('Executing step 1');
      step1Result = await executePrimitive('category/primitive1.js', {
        param: values.inputParam
      });

      // Checkpoint after completing step 1
      state.set('step1', step1Result);
      state.set('lastStep', 1);
      state.checkpoint();
      logger.info('Step 1 completed', { result: step1Result });
    } else {
      step1Result = state.get('step1');
      logger.info('Step 1 restored from checkpoint');
    }

    // STEP 2: Execute second primitive
    let step2Result;
    if (!checkpoint || checkpoint < 2) {
      logger.info('Executing step 2');
      step2Result = await executePrimitive('category/primitive2.js', {
        input: step1Result.result
      });

      // Checkpoint after completing step 2
      state.set('step2', step2Result);
      state.set('lastStep', 2);
      state.checkpoint();
      logger.info('Step 2 completed', { result: step2Result });
    } else {
      step2Result = state.get('step2');
      logger.info('Step 2 restored from checkpoint');
    }

    // STEP 3: Execute third primitive (if needed)
    logger.info('Executing step 3');
    const step3Result = await executePrimitive('category/primitive3.js', {
      data: step2Result.result,
      flag: values.optionalInput
    });

    logger.info('Step 3 completed', { result: step3Result });

    // Final output
    const output = {
      success: true,
      finalResult: step3Result.result,
      status: 'completed',
      steps: {
        step1: step1Result.success,
        step2: step2Result.success,
        step3: step3Result.success
      }
    };

    console.log(JSON.stringify(output));
    logger.info('Workflow completed', { output });

    // Clean up checkpoint after successful completion
    state.clear();

  } catch (error) {
    logger.error('Workflow failed', {
      error: error.message,
      stack: error.stack,
      lastStep: state.get('lastStep')
    });

    // Output error as JSON
    console.log(JSON.stringify({
      success: false,
      error: error.message,
      lastStep: state.get('lastStep')
    }));

    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
