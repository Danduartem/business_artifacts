#!/usr/bin/env node

/**
 * @tool page.screenshot
 * @when Capture screenshot of page or element
 * @category page
 *
 * @flag path - Output file path (required)
 * @flag selector - CSS selector to screenshot specific element (optional)
 * @flag fullpage - Capture full scrollable page (optional)
 *
 * @example
 * node screenshot.js --param value
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'page.screenshot' });
const args = parseArgs();

async function takeScreenshot() {
  try {
    if (!args.flags.path) {
      throw new Error('--path is required');
    }

    const fullpage = args.flags.fullpage;
    const selector = args.flags.selector;

    logger.info('Taking screenshot', { path: args.flags.path, fullpage, selector });

    // Connect to existing browser
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222'
    });

    const pages = await browser.pages();
    const page = pages[pages.length - 1]; // Use active tab

    if (!page) {
      throw new Error('No active tab found');
    }

    if (selector) {
      // Screenshot specific element
      const element = await page.$(selector);
      if (!element) {
        throw new Error(`Element not found: ${selector}`);
      }
      await element.screenshot({ path: args.flags.path });
    } else {
      // Screenshot entire page
      await page.screenshot({
        path: args.flags.path,
        fullPage: fullpage
      });
    }

    const result = {
      success: true,
      path: args.flags.path,
      fullpage: !!fullpage,
      selector: selector || null
    };

    console.log(JSON.stringify(result));
    logger.info('Screenshot saved', { path: args.flags.path });

    await browser.disconnect();


    process.exit(0);

  } catch (error) {
    logger.error('Screenshot failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      path: args.flags.path
    }));

    process.exit(1);
  }
}

takeScreenshot();
