#!/usr/bin/env node

/**
 * PRIMITIVE: Parse JSON File
 *
 * Purpose: Read and parse JSON file
 * Inputs:
 *   --path (required) - JSON file path
 * Outputs: Parsed JSON data
 *
 * This is an ATOMIC operation - parses JSON only.
 */

import { readFileSync, existsSync } from 'fs';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'file.parse-json' });
const args = parseArgs();

async function parseJSON() {
  try {
    if (!args.flags.path) {
      throw new Error('--path is required');
    }

    const path = args.flags.path;

    if (!existsSync(path)) {
      throw new Error(`File not found: ${path}`);
    }

    logger.info('Parsing JSON file', { path });

    const content = readFileSync(path, 'utf8');
    const data = JSON.parse(content);

    const result = {
      success: true,
      path,
      data
    };

    console.log(JSON.stringify(result));
    logger.info('JSON parsed', { path });


    process.exit(0);
  } catch (error) {
    logger.error('JSON parse failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      path: args.flags.path
    }));

    process.exit(1);
  }
}

parseJSON();
