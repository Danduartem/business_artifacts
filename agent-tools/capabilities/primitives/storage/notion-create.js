#!/usr/bin/env node

/**
 * @tool storage.notion-create
 * @when Create a new page in a Notion database
 * @category storage
 *
 * @flag database-id - Notion database ID (required)
 * @flag properties - JSON string of page properties (required)
 * @flag api-key - Notion API key (or use NOTION_API_TOKEN env var) (optional)
 *
 * @example
 * node notion-create.js --param value
 */

import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'storage.notion-create' });
const args = parseArgs();

async function createNotionPage() {
  try {
    if (!args.flags['database-id']) {
      throw new Error('--database-id is required');
    }

    if (!args.flags.properties) {
      throw new Error('--properties is required (JSON string)');
    }

    const apiKey = args.flags['api-key'] || process.env.NOTION_API_TOKEN;
    if (!apiKey) {
      throw new Error('--api-key or NOTION_API_TOKEN env var is required');
    }

    const databaseId = args.flags['database-id'];
    const properties = JSON.parse(args.flags.properties);

    logger.info('Creating Notion page', { databaseId });

    // Dynamic import for Notion SDK
    const { Client } = await import('@notionhq/client');
    const notion = new Client({
      auth: apiKey,
      notionVersion: '2025-09-03'  // Required for @notionhq/client v5+
    });

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties
    });

    const result = {
      success: true,
      pageId: response.id,
      url: response.url,
      created: response.created_time
    };

    console.log(JSON.stringify(result));
    logger.info('Notion page created', { pageId: response.id });


    process.exit(0);
  } catch (error) {
    logger.error('Notion page creation failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

createNotionPage();
