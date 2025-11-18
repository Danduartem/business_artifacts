#!/usr/bin/env node

/**
 * PRIMITIVE: Create Airtable Record
 *
 * Purpose: Create a single record in an Airtable table
 * Inputs:
 *   --table (required) - Table name
 *   --fields (required) - JSON string of record fields
 *   --api-key (optional) - Airtable API key (or use AIRTABLE_API_KEY env var)
 *   --base-id (optional) - Base ID (or use AIRTABLE_BASE_ID env var)
 * Outputs: Created record ID and fields
 *
 * This is an ATOMIC operation - creates single record only.
 * Requires Airtable API token and base ID.
 */

import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { getAirtableBase } from '../../../core/clients/airtable.js';

const logger = createLogger({ toolName: 'storage.airtable-create' });
const args = parseArgs();

async function createAirtableRecord() {
  try {
    if (!args.flags.table) {
      throw new Error('--table is required');
    }

    if (!args.flags.fields) {
      throw new Error('--fields is required (JSON string)');
    }

    const table = args.flags.table;
    const fields = JSON.parse(args.flags.fields);

    logger.info('Creating Airtable record', { table });

    const base = getAirtableBase({
      apiKey: args.flags['api-key'],
      baseId: args.flags['base-id']
    });

    const records = await base(table).create([{ fields }]);
    const record = records[0];

    const result = {
      success: true,
      id: record.id,
      fields: record.fields,
      createdTime: record._rawJson?.createdTime
    };

    console.log(JSON.stringify(result));
    logger.info('Airtable record created', { recordId: record.id });


    process.exit(0);
  } catch (error) {
    logger.error('Airtable record creation failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

createAirtableRecord();
