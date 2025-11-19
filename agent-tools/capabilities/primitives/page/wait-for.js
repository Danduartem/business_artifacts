#!/usr/bin/env node

/**
 * @tool page.wait-for
 * @when Wait for CSS selector to appear on page
 * @category page
 *
 * @flag selector - CSS selector to wait for (required)
 * @flag timeout - Timeout in milliseconds (default: 30000) (optional)
 * @flag visible - Wait for element to be visible (optional)
 *
 * @example
 * node wait-for.js --param value
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'page.wait-for' });
const args = parseArgs();

async function waitForElement() {
  try {
    if (!args.flags.selector) {
      throw new Error('--selector is required');
    }

    const timeout = parseInt(args.flags.timeout || '30000');
    const visible = args.flags.visible;

    logger.info('Waiting for element', { selector: args.flags.selector, timeout });

    // Connect to existing browser
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222'
    });

    const pages = await browser.pages();
    const page = pages[pages.length - 1]; // Use active tab

    if (!page) {
      throw new Error('No active tab found');
    }

    // Wait for selector
    await page.waitForSelector(args.flags.selector, {
      timeout,
      visible
    });

    const result = {
      success: true,
      selector: args.flags.selector,
      timeout,
      visible: !!visible
    };

    console.log(JSON.stringify(result));
    logger.info('Element found', { selector: args.flags.selector });

    await browser.disconnect();
    process.exit(0);

  } catch (error) {
    logger.error('Wait failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      selector: args.flags.selector
    }));

    process.exit(1);
  }
}

waitForElement();
