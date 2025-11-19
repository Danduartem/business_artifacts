#!/usr/bin/env node

/**
 * @tool page.click
 * @when Click an element by CSS selector
 * @category page
 *
 * @flag selector - CSS selector to click (required)
 * @flag wait - Wait for selector before clicking (optional)
 *
 * @example
 * node click.js --param value
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'page.click' });
const args = parseArgs();

async function clickElement() {
  try {
    if (!args.flags.selector) {
      throw new Error('--selector is required');
    }

    const wait = args.flags.wait !== false; // Default true

    logger.info('Clicking element', { selector: args.flags.selector });

    // Connect to existing browser
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222'
    });

    const pages = await browser.pages();
    const page = pages[pages.length - 1]; // Use active tab

    if (!page) {
      throw new Error('No active tab found');
    }

    // Wait for selector if needed
    if (wait) {
      await page.waitForSelector(args.flags.selector, { timeout: 10000 });
    }

    // Click element
    await page.click(args.flags.selector);

    const result = {
      success: true,
      selector: args.flags.selector
    };

    console.log(JSON.stringify(result));
    logger.info('Element clicked', { selector: args.flags.selector });

    await browser.disconnect();


    process.exit(0);

  } catch (error) {
    logger.error('Click failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      selector: args.flags.selector
    }));

    process.exit(1);
  }
}

clickElement();
