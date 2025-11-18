#!/usr/bin/env node
/**
 * @tool {category}.{action}
 * @description One-line description of what this tool does
 * @category {category}
 *
 * @input paramName string - Description of parameter
 * @input optionalParam boolean - Optional parameter description
 *
 * @output resultField string - Description of output field
 * @output status string - Operation status
 *
 * @dependency package-name (if npm package required)
 * @systemDependency binary-name (if system binary required)
 * @envVar ENV_VAR_NAME (if environment variable required)
 *
 * @example
 * node {action}.js --param-name value
 *
 * @example-output
 * {"success": true, "resultField": "value", "status": "completed"}
 */

import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({
  toolName: '{category}.{action}'
});

// Parse command line arguments
const { values } = parseArgs({
  options: {
    paramName: { type: 'string' },
    optionalParam: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h' }
  }
});

// Help flag
if (values.help) {
  console.log(`
Usage: node {action}.js [options]

Description:
  One-line description of what this tool does

Options:
  --param-name <value>     Description of parameter (required)
  --optional-param         Optional parameter description
  --help, -h               Show this help

Example:
  node {action}.js --param-name "example value"

Output (JSON):
  {
    "success": true,
    "resultField": "value",
    "status": "completed"
  }
  `);
  process.exit(0);
}

async function main() {
  try {
    logger.info('Starting {action}', { params: values });

    // Validate required inputs
    if (!values.paramName) {
      throw new Error('--param-name is required');
    }

    // DO YOUR WORK HERE
    // Replace this section with actual implementation
    const result = await performOperation(values.paramName, values.optionalParam);

    // Always output JSON to stdout
    const output = {
      success: true,
      resultField: result.data,
      status: 'completed'
    };

    console.log(JSON.stringify(output));
    logger.info('Completed {action}', { output });

  } catch (error) {
    logger.error('Failed {action}', {
      error: error.message,
      stack: error.stack
    });

    // Output error as JSON
    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

/**
 * Main operation logic - replace with your implementation
 */
async function performOperation(paramName, optionalParam) {
  // Example implementation
  logger.debug('Performing operation', { paramName, optionalParam });

  // Your code here
  const data = `Processed: ${paramName}`;

  return { data };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { performOperation };
