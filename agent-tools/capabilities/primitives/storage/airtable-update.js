#!/usr/bin/env node

/**
 * PRIMITIVE: Update Airtable Record
 *
 * Purpose: Update an existing record in an Airtable table
 * Inputs:
 *   --table (required) - Table name
 *   --record-id (required) - Record ID to update
 *   --fields (required) - JSON string of fields to update
 *   --api-key (optional) - Airtable API key (or use AIRTABLE_API_KEY env var)
 *   --base-id (optional) - Base ID (or use AIRTABLE_BASE_ID env var)
 * Outputs: Updated record ID and fields
 *
 * This is an ATOMIC operation - updates single record only.
 * Requires Airtable API token and base ID.
 */

import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { getAirtableBase } from '../../../core/clients/airtable.js';

const logger = createLogger({ toolName: 'storage.airtable-update' });
const args = parseArgs();

async function updateAirtableRecord() {
  try {
    if (!args.flags.table) {
      throw new Error('--table is required');
    }

    if (!args.flags['record-id']) {
      throw new Error('--record-id is required');
    }

    if (!args.flags.fields) {
      throw new Error('--fields is required (JSON string)');
    }

    const table = args.flags.table;
    const recordId = args.flags['record-id'];
    const fields = JSON.parse(args.flags.fields);

    logger.info('Updating Airtable record', { table, recordId });

    const base = getAirtableBase({
      apiKey: args.flags['api-key'],
      baseId: args.flags['base-id']
    });

    const records = await base(table).update([
      {
        id: recordId,
        fields
      }
    ]);

    const record = records[0];

    const result = {
      success: true,
      id: record.id,
      fields: record.fields
    };

    console.log(JSON.stringify(result));
    logger.info('Airtable record updated', { recordId: record.id });


    process.exit(0);
  } catch (error) {
    logger.error('Airtable record update failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

updateAirtableRecord();
