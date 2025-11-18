#!/usr/bin/env node

/**
 * WORKFLOW: Analyze Content and Store to Notion
 *
 * Purpose: Extract content, analyze it, and save to Notion database
 * Composes multiple primitives:
 *   1. file.read - Read content file
 *   2. storage.notion-create - Save to Notion
 *
 * This is a HIGH-LEVEL workflow for convenience.
 * For custom needs, compose primitives directly.
 */

import { executePrimitive } from '../workflow-utils.js';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'workflow.analyze-and-store' });
const args = parseArgs();

async function analyzeAndStore() {
  try {
    if (!args.flags.file) {
      throw new Error('--file is required');
    }

    if (!args.flags['database-id']) {
      throw new Error('--database-id is required');
    }

    const filePath = args.flags.file;
    const databaseId = args.flags['database-id'];
    const title = args.flags.title;

    logger.info('Starting analyze and store workflow', { file: filePath });

    // STEP 1: Read content file
    logger.info('Step 1/2: Reading content file');
    const contentResult = executePrimitive('file/read.js', {
      path: filePath
    });

    if (!contentResult.success) {
      throw new Error('Failed to read content file');
    }

    const content = contentResult.content;

    // STEP 2: Store to Notion
    logger.info('Step 2/2: Storing to Notion');

    // Build Notion properties
    const properties = {
      Name: {
        title: [
          {
            text: {
              content: title || filePath
            }
          }
        ]
      },
      Content: {
        rich_text: [
          {
            text: {
              content: content.slice(0, 2000) // Notion has limits
            }
          }
        ]
      },
      Source: {
        rich_text: [
          {
            text: {
              content: filePath
            }
          }
        ]
      },
      ImportedAt: {
        date: {
          start: new Date().toISOString()
        }
      }
    };

    const notionResult = executePrimitive('storage/notion-create.js', {
      'database-id': databaseId,
      properties: JSON.stringify(properties)
    });

    if (!notionResult.success) {
      throw new Error('Failed to save to Notion');
    }

    const result = {
      success: true,
      file: filePath,
      notionPageId: notionResult.pageId,
      notionUrl: notionResult.url,
      contentLength: content.length
    };

    console.log(JSON.stringify(result, null, 2));
    logger.info('Workflow complete');

  } catch (error) {
    logger.error('Workflow failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

analyzeAndStore();
