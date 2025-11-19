#!/usr/bin/env node

/**
 * @tool browser.cookies
 * @when Get or set browser cookies
 * @category browser
 *
 * @flag get - Get cookies (default action) (optional)
 * @flag set - Set cookie (requires --name, --value) (optional)
 * @flag name - Cookie name for set operation (optional)
 * @flag value - Cookie value for set operation (optional)
 * @flag domain - Cookie domain for set operation (optional)
 *
 * @example
 * node cookies.js --param value
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'browser.cookies' });
const args = parseArgs();

async function handleCookies() {
  try {
    const isSet = args.flags.set;

    logger.info('Cookie operation', { isSet });

    // Connect to existing browser
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222',
      defaultViewport: null
    });

    const pages = await browser.pages();
    const page = pages[pages.length - 1]; // Use active tab

    if (!page) {
      throw new Error('No active tab found');
    }

    if (isSet) {
      // Set cookie
      if (!args.flags.name || !args.flags.value) {
        throw new Error('--name and --value are required for --set');
      }

      await page.setCookie({
        name: args.flags.name,
        value: args.flags.value,
        domain: args.flags.domain || new URL(page.url()).hostname
      });

      const result = {
        success: true,
        action: 'set',
        name: args.flags.name,
        value: args.flags.value
      };

      console.log(JSON.stringify(result));
      logger.info('Cookie set', { name: args.flags.name });
    } else {
      // Get cookies
      const cookies = await page.cookies();

      const result = {
        success: true,
        action: 'get',
        count: cookies.length,
        cookies: cookies.map(c => ({
          name: c.name,
          value: c.value,
          domain: c.domain,
          path: c.path,
          httpOnly: c.httpOnly,
          secure: c.secure
        }))
      };

      console.log(JSON.stringify(result));
      logger.info('Cookies retrieved', { count: cookies.length });
    }

    await browser.disconnect();


    process.exit(0);

  } catch (error) {
    logger.error('Cookie operation failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

handleCookies();
