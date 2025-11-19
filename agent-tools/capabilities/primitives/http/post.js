#!/usr/bin/env node

/**
 * @tool http.post
 * @when Make HTTP POST request
 * @category http
 *
 * @flag url - URL to request (required)
 * @flag data - JSON string of data to POST (required)
 * @flag headers - JSON string of headers (optional)
 * @flag timeout - Request timeout in ms (default: 30000) (optional)
 *
 * @example
 * node post.js --param value
 */

import { request } from 'https';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'http.post' });
const args = parseArgs();

async function makePostRequest() {
  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    if (!args.flags.data) {
      throw new Error('--data is required');
    }

    const url = args.flags.url;
    const data = args.flags.data;
    const headers = args.flags.headers ? JSON.parse(args.flags.headers) : {};
    const timeout = parseInt(args.flags.timeout || '30000');

    // Set content-type if not provided
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    logger.info('Making POST request', { url });

    const httpModule = url.startsWith('https:') ? await import('https') : await import('http');
    const urlParsed = new URL(url);

    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: urlParsed.hostname,
        port: urlParsed.port,
        path: urlParsed.pathname + urlParsed.search,
        method: 'POST',
        headers,
        timeout
      };

      const req = httpModule.default.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: responseData
          });
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.write(data);
      req.end();
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
    logger.info('POST request complete', { statusCode: response.statusCode });


    process.exit(0);
  } catch (error) {
    logger.error('POST request failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      url: args.flags.url
    }));

    process.exit(1);
  }
}

makePostRequest();
