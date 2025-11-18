#!/usr/bin/env node

/**
 * PRIMITIVE: HTTP GET Request
 *
 * Purpose: Make HTTP GET request
 * Inputs:
 *   --url (required) - URL to request
 *   --headers (optional) - JSON string of headers
 *   --timeout (optional) - Request timeout in ms (default: 30000)
 * Outputs: Response status, headers, and body
 *
 * This is an ATOMIC operation - makes GET request only.
 */

import { get } from 'https';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'http.get' });
const args = parseArgs();

async function makeGetRequest() {
  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    const url = args.flags.url;
    const headers = args.flags.headers ? JSON.parse(args.flags.headers) : {};
    const timeout = parseInt(args.flags.timeout || '30000');

    logger.info('Making GET request', { url });

    const httpModule = url.startsWith('https:') ? await import('https') : await import('http');

    const response = await new Promise((resolve, reject) => {
      const request = httpModule.default.get(url, { headers, timeout }, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
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

    const result = {
      success: true,
      url,
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body,
      bodyLength: response.body.length
    };

    console.log(JSON.stringify(result));
    logger.info('GET request complete', { statusCode: response.statusCode });


    process.exit(0);
  } catch (error) {
    logger.error('GET request failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      url: args.flags.url
    }));

    process.exit(1);
  }
}

makeGetRequest();
