#!/usr/bin/env node

/**
 * PRIMITIVE: Update Notion Page
 *
 * Purpose: Update an existing Notion page
 * Inputs:
 *   --page-id (required) - Notion page ID to update
 *   --properties (required) - JSON string of properties to update
 *   --api-key (optional) - Notion API key (or use NOTION_API_TOKEN env var)
 * Outputs: Updated page ID and URL
 *
 * This is an ATOMIC operation - updates page only.
 * Requires Notion API token.
 */

import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'storage.notion-update' });
const args = parseArgs();

async function updateNotionPage() {
  try {
    if (!args.flags['page-id']) {
      throw new Error('--page-id is required');
    }

    if (!args.flags.properties) {
      throw new Error('--properties is required (JSON string)');
    }

    const apiKey = args.flags['api-key'] || process.env.NOTION_API_TOKEN;
    if (!apiKey) {
      throw new Error('--api-key or NOTION_API_TOKEN env var is required');
    }

    const pageId = args.flags['page-id'];
    const properties = JSON.parse(args.flags.properties);

    logger.info('Updating Notion page', { pageId });

    // Dynamic import for Notion SDK
    const { Client } = await import('@notionhq/client');
    const notion = new Client({
      auth: apiKey,
      notionVersion: '2025-09-03'  // Required for @notionhq/client v5+
    });

    const response = await notion.pages.update({
      page_id: pageId,
      properties
    });

    const result = {
      success: true,
      pageId: response.id,
      url: response.url,
      updated: response.last_edited_time
    };

    console.log(JSON.stringify(result));
    logger.info('Notion page updated', { pageId: response.id });


    process.exit(0);
  } catch (error) {
    logger.error('Notion page update failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

updateNotionPage();
