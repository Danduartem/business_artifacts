#!/usr/bin/env node

/**
 * PRIMITIVE: Download File from URL
 *
 * Purpose: Download file from HTTP/HTTPS URL
 * Inputs:
 *   --url (required) - URL to download from
 *   --output (required) - Output file path
 *   --timeout (optional) - Request timeout in ms (default: 60000)
 * Outputs: Downloaded file path and size
 *
 * This is an ATOMIC operation - downloads only.
 */

import { createWriteStream } from 'fs';
import { get } from 'https';
import { parse } from 'url';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'http.download' });
const args = parseArgs();

async function downloadFile() {
  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    if (!args.flags.output) {
      throw new Error('--output is required');
    }

    const url = args.flags.url;
    const outputFile = args.flags.output;
    const timeout = parseInt(args.flags.timeout || '60000');

    logger.info('Downloading file', { url, output: outputFile });

    const parsed = parse(url);
    const httpModule = parsed.protocol === 'https:' ? await import('https') : await import('http');

    await new Promise((resolve, reject) => {
      const request = httpModule.default.get(url, { timeout }, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          // Follow redirect
          const redirectUrl = response.headers.location;
          logger.info('Following redirect', { redirectUrl });
          response.resume();

          httpModule.default.get(redirectUrl, { timeout }, (redirectResponse) => {
            if (redirectResponse.statusCode !== 200) {
              reject(new Error(`HTTP ${redirectResponse.statusCode}: ${redirectResponse.statusMessage}`));
              return;
            }

            const file = createWriteStream(outputFile);
            redirectResponse.pipe(file);

            file.on('finish', () => {
              file.close();
              resolve();
            });

            file.on('error', (err) => {
              reject(err);
            });
          });
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          return;
        }

        const file = createWriteStream(outputFile);
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          resolve();
        });

        file.on('error', (err) => {
          reject(err);
        });
      });

      request.on('error', (err) => {
        reject(err);
      });

      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });

    // Get file size
    const { statSync } = await import('fs');
    const stats = statSync(outputFile);

    const result = {
      success: true,
      url,
      output: outputFile,
      size: stats.size
    };

    console.log(JSON.stringify(result));
    logger.info('Download complete', { output: outputFile, size: stats.size });


    process.exit(0);
  } catch (error) {
    logger.error('Download failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      url: args.flags.url
    }));

    process.exit(1);
  }
}

downloadFile();
