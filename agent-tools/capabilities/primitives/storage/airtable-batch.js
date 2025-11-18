#!/usr/bin/env node

/**
 * PRIMITIVE: Batch Create Airtable Records
 *
 * Purpose: Create multiple records in an Airtable table (max 10 per batch)
 * Inputs:
 *   --table (required) - Table name
 *   --records (required) - JSON string of array of record field objects
 *   --api-key (optional) - Airtable API key (or use AIRTABLE_API_KEY env var)
 *   --base-id (optional) - Base ID (or use AIRTABLE_BASE_ID env var)
 * Outputs: Array of created record IDs and fields
 *
 * This is an ATOMIC operation - creates multiple records in one API call.
 * Maximum 10 records per batch (Airtable limitation).
 * Requires Airtable API token and base ID.
 */

import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { getAirtableBase } from '../../../core/clients/airtable.js';

const logger = createLogger({ toolName: 'storage.airtable-batch' });
const args = parseArgs();

async function batchCreateAirtableRecords() {
  try {
    if (!args.flags.table) {
      throw new Error('--table is required');
    }

    if (!args.flags.records) {
      throw new Error('--records is required (JSON array)');
    }

    const table = args.flags.table;
    const recordsData = JSON.parse(args.flags.records);

    if (!Array.isArray(recordsData)) {
      throw new Error('--records must be an array');
    }

    if (recordsData.length > 10) {
      throw new Error('Maximum 10 records per batch (Airtable limitation)');
    }

    logger.info('Batch creating Airtable records', { table, count: recordsData.length });

    const base = getAirtableBase({
      apiKey: args.flags['api-key'],
      baseId: args.flags['base-id']
    });

    // Format records for Airtable API
    const formattedRecords = recordsData.map(fields => ({ fields }));

    const createdRecords = await base(table).create(formattedRecords);

    const result = {
      success: true,
      count: createdRecords.length,
      records: createdRecords.map(r => ({
        id: r.id,
        fields: r.fields,
        createdTime: r._rawJson?.createdTime
      }))
    };

    console.log(JSON.stringify(result));
    logger.info('Airtable records batch created', { count: createdRecords.length });


    process.exit(0);
  } catch (error) {
    logger.error('Airtable batch creation failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

batchCreateAirtableRecords();
