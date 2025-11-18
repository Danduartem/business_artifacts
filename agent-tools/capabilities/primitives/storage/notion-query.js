#!/usr/bin/env node

/**
 * PRIMITIVE: Query Notion Database
 *
 * Purpose: Query pages from a Notion database
 * Inputs:
 *   --database-id (required) - Notion database ID
 *   --filter (optional) - JSON string of filter object
 *   --sorts (optional) - JSON string of sort array
 *   --limit (optional) - Page size limit (default: 100)
 *   --api-key (optional) - Notion API key (or use NOTION_API_TOKEN env var)
 * Outputs: Query results with pages
 *
 * This is an ATOMIC operation - queries database only.
 * Requires Notion API token.
 */

import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'storage.notion-query' });
const args = parseArgs();

async function queryNotionDatabase() {
  try {
    if (!args.flags['database-id']) {
      throw new Error('--database-id is required');
    }

    const apiKey = args.flags['api-key'] || process.env.NOTION_API_TOKEN;
    if (!apiKey) {
      throw new Error('--api-key or NOTION_API_TOKEN env var is required');
    }

    const databaseId = args.flags['database-id'];
    const filter = args.flags.filter ? JSON.parse(args.flags.filter) : undefined;
    const sorts = args.flags.sorts ? JSON.parse(args.flags.sorts) : undefined;
    const limit = args.flags.limit ? parseInt(args.flags.limit) : 100;

    logger.info('Querying Notion database', { databaseId, limit });

    // Dynamic import for Notion SDK
    const { Client } = await import('@notionhq/client');
    const notion = new Client({
      auth: apiKey,
      notionVersion: '2025-09-03'  // Required for @notionhq/client v5+
    });

    const response = await notion.databases.query({
      database_id: databaseId,
      filter,
      sorts,
      page_size: limit
    });

    const result = {
      success: true,
      count: response.results.length,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
      pages: response.results.map(page => ({
        id: page.id,
        url: page.url,
        created: page.created_time,
        updated: page.last_edited_time,
        properties: page.properties
      }))
    };

    console.log(JSON.stringify(result));
    logger.info('Notion query complete', { count: response.results.length });


    process.exit(0);
  } catch (error) {
    logger.error('Notion query failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

queryNotionDatabase();
