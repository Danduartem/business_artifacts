#!/usr/bin/env node

/**
 * @tool file.write
 * @when Write content to file
 * @category file
 *
 * @flag path - File path to write (required)
 * @flag content - Content to write (required)
 * @flag encoding - File encoding (default: utf8) (optional)
 * @flag append - Append to file instead of overwrite (optional)
 *
 * @example
 * node write.js --param value
 */

import { writeFileSync, appendFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'file.write' });
const args = parseArgs();

async function writeFile() {
  try {
    if (!args.flags.path) {
      throw new Error('--path is required');
    }

    if (!args.flags.content) {
      throw new Error('--content is required');
    }

    const path = args.flags.path;
    const content = args.flags.content;
    const encoding = args.flags.encoding || 'utf8';
    const append = args.flags.append;

    logger.info('Writing file', { path, append });

    // Ensure directory exists
    mkdirSync(dirname(path), { recursive: true });

    if (append) {
      appendFileSync(path, content, encoding);
    } else {
      writeFileSync(path, content, encoding);
    }

    const result = {
      success: true,
      path,
      encoding,
      size: content.length,
      append: !!append
    };

    console.log(JSON.stringify(result));
    logger.info('File written', { path, size: content.length });


    process.exit(0);
  } catch (error) {
    logger.error('File write failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      path: args.flags.path
    }));

    process.exit(1);
  }
}

writeFile();
