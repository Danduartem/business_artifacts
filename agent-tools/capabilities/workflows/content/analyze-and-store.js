#!/usr/bin/env node
/**
 * @workflow content.analyze-and-store
 * @when Extract content, analyze it, and save to Notion database
 * @complexity low
 * @category content
 *
 * @flag input - TODO: Add parameter description
 *
 * @example
 * node analyze-and-store.js --param value
 */

import { executePrimitive } from '../workflow-utils.js';
import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'content.analyze-and-store' });
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
