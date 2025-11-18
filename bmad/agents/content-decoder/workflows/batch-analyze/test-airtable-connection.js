#!/usr/bin/env node

/**
 * Airtable Connection Test
 * Verifies Airtable credentials and schema before running workflow
 */

import { testAirtableConnection } from './lib/airtable-saver.js';

console.log('🔍 Testing Airtable Connection...\n');

testAirtableConnection()
  .then((success) => {
    if (success) {
      console.log('\n✅ Airtable is ready! You can now use --target=airtable\n');
      process.exit(0);
    } else {
      console.log('\n❌ Airtable connection failed. Check your credentials in .env\n');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('\n❌ Unexpected error:', error.message);
    process.exit(1);
  });
