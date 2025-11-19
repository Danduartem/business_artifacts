#!/usr/bin/env node

/**
 * @tool storage.airtable-query
 * @when Query records from an Airtable table
 * @category storage
 *
 * @flag table - Table name (required)
 * @flag formula - Airtable filter formula (optional)
 * @flag max-records - Maximum records to return (default: 100) (optional)
 * @flag sort - JSON string of sort configuration (optional)
 * @flag fields - Comma-separated list of fields to return (optional)
 * @flag api-key - Airtable API key (or use AIRTABLE_API_KEY env var) (optional)
 * @flag base-id - Base ID (or use AIRTABLE_BASE_ID env var) (optional)
 *
 * @example
 * node airtable-query.js --param value
 */

import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { getAirtableBase } from '../../../core/clients/airtable.js';

const logger = createLogger({ toolName: 'storage.airtable-query' });
const args = parseArgs();

async function queryAirtableRecords() {
  try {
    if (!args.flags.table) {
      throw new Error('--table is required');
    }

    const table = args.flags.table;
    const maxRecords = parseInt(args.flags['max-records']) || 100;

    logger.info('Querying Airtable records', { table, maxRecords });

    const base = getAirtableBase({
      apiKey: args.flags['api-key'],
      baseId: args.flags['base-id']
    });

    // Build query options
    const queryOptions = { maxRecords };

    if (args.flags.formula) {
      queryOptions.filterByFormula = args.flags.formula;
    }

    if (args.flags.sort) {
      queryOptions.sort = JSON.parse(args.flags.sort);
    }

    if (args.flags.fields) {
      queryOptions.fields = args.flags.fields.split(',').map(f => f.trim());
    }

    // Execute query
    const records = await base(table)
      .select(queryOptions)
      .all();

    const result = {
      success: true,
      count: records.length,
      records: records.map(r => ({
        id: r.id,
        fields: r.fields,
        createdTime: r._rawJson?.createdTime
      }))
    };

    console.log(JSON.stringify(result));
    logger.info('Airtable records retrieved', { count: records.length });


    process.exit(0);
  } catch (error) {
    logger.error('Airtable query failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

queryAirtableRecords();
