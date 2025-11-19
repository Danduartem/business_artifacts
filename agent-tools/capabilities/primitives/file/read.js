#!/usr/bin/env node

/**
 * @tool file.read
 * @when Read file contents
 * @category file
 *
 * @flag path - File path to read (required)
 * @flag encoding - File encoding (default: utf8) (optional)
 *
 * @example
 * node read.js --param value
 */

import { readFileSync, existsSync } from 'fs';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'file.read' });
const args = parseArgs();

async function readFile() {
  try {
    if (!args.flags.path) {
      throw new Error('--path is required');
    }

    const path = args.flags.path;
    const encoding = args.flags.encoding || 'utf8';

    if (!existsSync(path)) {
      throw new Error(`File not found: ${path}`);
    }

    logger.info('Reading file', { path });

    const content = readFileSync(path, encoding);

    const result = {
      success: true,
      path,
      encoding,
      content,
      size: content.length
    };

    console.log(JSON.stringify(result));
    logger.info('File read', { path, size: content.length });


    process.exit(0);
  } catch (error) {
    logger.error('File read failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      path: args.flags.path
    }));

    process.exit(1);
  }
}

readFile();
