#!/usr/bin/env node

/**
 * Airtable Client
 * Shared Airtable client for all storage primitives
 */

import Airtable from 'airtable';
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createLogger } from '../logger/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logger = createLogger({ toolName: 'airtable-client' });

// Load environment variables from root agent-tools/.env
const envPath = join(__dirname, '..', '..', '.env');
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  // Fallback: try loading from process.cwd() for flexibility
  const cwdEnvPath = join(process.cwd(), '.env');
  if (existsSync(cwdEnvPath)) {
    dotenv.config({ path: cwdEnvPath });
  }
}

/**
 * Get Airtable base instance
 * @param {Object} options - Configuration options
 * @returns {Object} - Airtable base instance
 */
export function getAirtableBase(options = {}) {
  const apiKey = options.apiKey || process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_TOKEN;
  const baseId = options.baseId || process.env.AIRTABLE_BASE_ID;

  if (!apiKey) {
    throw new Error('AIRTABLE_API_KEY or AIRTABLE_TOKEN environment variable required');
  }

  if (!baseId) {
    throw new Error('AIRTABLE_BASE_ID environment variable required');
  }

  const airtable = new Airtable({ apiKey });
  logger.debug('Airtable client initialized', { baseId });

  return airtable.base(baseId);
}

/**
 * Test Airtable connection
 * @param {Object} options - Configuration options
 * @returns {Promise<boolean>} - True if connection successful
 */
export async function testConnection(options = {}) {
  try {
    const base = getAirtableBase(options);
    const table = options.table || 'Instagram Posts';

    await base(table)
      .select({ maxRecords: 1 })
      .firstPage();

    logger.info('Airtable connection successful');
    return true;

  } catch (error) {
    logger.error('Airtable connection failed', { error: error.message });
    return false;
  }
}

export default {
  getAirtableBase,
  testConnection
};
