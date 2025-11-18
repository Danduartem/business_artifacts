#!/usr/bin/env node
/**
 * @job {category}.{name}
 * @description High-level description of what this job orchestrates
 * @category {category}
 *
 * @orchestrates workflow1, workflow2, workflow3
 *
 * @input inputParam string - Description of input parameter
 * @input startDate string - Start date for processing (optional)
 * @input endDate string - End date for processing (optional)
 *
 * @output finalResult object - Description of final output
 * @output summary object - Job execution summary
 * @output artifacts array - List of created artifacts
 *
 * @example
 * node {name}.js --input-param "value" --start-date "2024-01-01" --end-date "2024-01-31"
 *
 * @example-output
 * {
 *   "success": true,
 *   "finalResult": {...},
 *   "summary": {
 *     "totalProcessed": 150,
 *     "successful": 145,
 *     "failed": 5,
 *     "duration": "2h 34m"
 *   },
 *   "artifacts": ["file1.json", "file2.csv"]
 * }
 */

import { parseArgs } from 'node:util';
import { spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';
import { getEventBus } from '../../../core/events/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = createLogger({
  toolName: 'job.{category}.{name}'
});

const state = createStateManager({
  namespace: 'job-{name}'
});

const events = getEventBus();

// Helper to execute workflows
async function executeWorkflow(workflowPath, params) {
  return new Promise((resolve, reject) => {
    const workflowFullPath = path.join(__dirname, '../../workflows', workflowPath);

    // Convert params object to command line args
    const args = Object.entries(params).flatMap(([key, value]) => {
      if (value === true) return [`--${key}`];
      if (value === false) return [];
      return [`--${key}`, String(value)];
    });

    logger.info('Executing workflow', { workflow: workflowPath, params });

    const child = spawn('node', [workflowFullPath, ...args], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        logger.error('Workflow failed', {
          workflow: workflowPath,
          code,
          stderr
        });
        reject(new Error(`Workflow failed with code ${code}: ${stderr}`));
      } else {
        try {
          // Parse JSON output
          const result = JSON.parse(stdout);
          logger.info('Workflow completed', {
            workflow: workflowPath,
            success: result.success
          });
          resolve(result);
        } catch (error) {
          logger.error('Failed to parse workflow output', {
            workflow: workflowPath,
            stdout,
            error: error.message
          });
          reject(new Error(`Failed to parse workflow output: ${error.message}`));
        }
      }
    });

    child.on('error', (error) => {
      logger.error('Failed to spawn workflow', {
        workflow: workflowPath,
        error: error.message
      });
      reject(error);
    });
  });
}

// Parse command line arguments
const { values } = parseArgs({
  options: {
    inputParam: { type: 'string' },
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    resume: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h' }
  }
});

// Help flag
if (values.help) {
  console.log(`
Usage: node {name}.js [options]

Description:
  High-level description of what this job orchestrates

  This job is a long-running operation that orchestrates multiple workflows
  to accomplish a complex business goal. It includes checkpointing and can
  be resumed if interrupted.

Job Workflow:
  1. Workflow 1 - Description
  2. Workflow 2 - Description
  3. Workflow 3 - Description
  4. Final aggregation and artifact creation

Options:
  --input-param <value>    Description of input parameter (required)
  --start-date <date>      Start date for processing (YYYY-MM-DD)
  --end-date <date>        End date for processing (YYYY-MM-DD)
  --resume                 Resume from last checkpoint
  --help, -h               Show this help

Examples:
  # Run full job
  node {name}.js --input-param "value" --start-date "2024-01-01" --end-date "2024-01-31"

  # Resume interrupted job
  node {name}.js --resume

Output (JSON):
  {
    "success": true,
    "finalResult": { ... },
    "summary": {
      "totalProcessed": 150,
      "successful": 145,
      "failed": 5,
      "duration": "2h 34m"
    },
    "artifacts": ["file1.json", "file2.csv"]
  }
  `);
  process.exit(0);
}

async function main() {
  const startTime = Date.now();

  try {
    logger.info('Starting job', { params: values });

    // Validate required inputs (unless resuming)
    if (!values.resume && !values.inputParam) {
      throw new Error('--input-param is required');
    }

    // Initialize job state
    let jobState = {
      stage: 'initialized',
      workflow1Complete: false,
      workflow2Complete: false,
      workflow3Complete: false,
      totalProcessed: 0,
      successful: 0,
      failed: 0,
      artifacts: []
    };

    // Check if we can resume from checkpoint
    if (values.resume) {
      const checkpoint = state.get('jobState');
      if (checkpoint) {
        jobState = checkpoint;
        logger.info('Resuming from checkpoint', { stage: jobState.stage });
      } else {
        logger.warn('No checkpoint found, starting fresh');
      }
    }

    // STAGE 1: Execute first workflow
    if (!jobState.workflow1Complete) {
      logger.info('Starting workflow 1');
      jobState.stage = 'workflow1';
      state.set('jobState', jobState);
      state.checkpoint();

      const workflow1Result = await executeWorkflow('category/workflow1.js', {
        param: values.inputParam,
        startDate: values.startDate,
        endDate: values.endDate
      });

      if (!workflow1Result.success) {
        throw new Error('Workflow 1 failed');
      }

      jobState.workflow1Complete = true;
      jobState.workflow1Result = workflow1Result;
      state.set('jobState', jobState);
      state.checkpoint();

      logger.info('Workflow 1 completed', { result: workflow1Result });
    } else {
      logger.info('Workflow 1 already completed, skipping');
    }

    // STAGE 2: Execute second workflow
    if (!jobState.workflow2Complete) {
      logger.info('Starting workflow 2');
      jobState.stage = 'workflow2';
      state.set('jobState', jobState);
      state.checkpoint();

      const workflow2Result = await executeWorkflow('category/workflow2.js', {
        input: jobState.workflow1Result.result
      });

      if (!workflow2Result.success) {
        throw new Error('Workflow 2 failed');
      }

      jobState.workflow2Complete = true;
      jobState.workflow2Result = workflow2Result;
      state.set('jobState', jobState);
      state.checkpoint();

      logger.info('Workflow 2 completed', { result: workflow2Result });
    } else {
      logger.info('Workflow 2 already completed, skipping');
    }

    // STAGE 3: Execute third workflow
    if (!jobState.workflow3Complete) {
      logger.info('Starting workflow 3');
      jobState.stage = 'workflow3';
      state.set('jobState', jobState);
      state.checkpoint();

      const workflow3Result = await executeWorkflow('category/workflow3.js', {
        data: jobState.workflow2Result.result
      });

      if (!workflow3Result.success) {
        throw new Error('Workflow 3 failed');
      }

      jobState.workflow3Complete = true;
      jobState.workflow3Result = workflow3Result;
      jobState.artifacts.push(...(workflow3Result.artifacts || []));
      state.set('jobState', jobState);
      state.checkpoint();

      logger.info('Workflow 3 completed', { result: workflow3Result });
    } else {
      logger.info('Workflow 3 already completed, skipping');
    }

    // STAGE 4: Final aggregation
    logger.info('Performing final aggregation');
    jobState.stage = 'aggregation';

    // Calculate summary
    const duration = Date.now() - startTime;
    const durationFormatted = formatDuration(duration);

    const output = {
      success: true,
      finalResult: {
        workflow1: jobState.workflow1Result.result,
        workflow2: jobState.workflow2Result.result,
        workflow3: jobState.workflow3Result.result
      },
      summary: {
        totalProcessed: jobState.totalProcessed,
        successful: jobState.successful,
        failed: jobState.failed,
        duration: durationFormatted
      },
      artifacts: jobState.artifacts
    };

    console.log(JSON.stringify(output));
    logger.info('Job completed', {
      summary: output.summary,
      artifactCount: output.artifacts.length
    });

    // Clean up checkpoint after successful completion
    state.clear();

    // Publish job completion event
    events.publish('job.completed', {
      jobName: '{category}.{name}',
      summary: output.summary,
      artifacts: output.artifacts
    });

  } catch (error) {
    logger.error('Job failed', {
      error: error.message,
      stack: error.stack,
      stage: state.get('jobState')?.stage
    });

    // Publish job failure event
    events.publish('job.failed', {
      jobName: '{category}.{name}',
      error: error.message,
      stage: state.get('jobState')?.stage
    });

    // Output error as JSON
    console.log(JSON.stringify({
      success: false,
      error: error.message,
      stage: state.get('jobState')?.stage,
      checkpoint: 'Use --resume to continue from last checkpoint'
    }));

    process.exit(1);
  }
}

// Helper function to format duration
function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
