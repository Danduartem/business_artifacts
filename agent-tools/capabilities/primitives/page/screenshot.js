#!/usr/bin/env node

/**
 * PRIMITIVE: Take Screenshot
 *
 * Purpose: Capture screenshot of page or element
 * Inputs:
 *   --path (required) - Output file path
 *   --selector (optional) - CSS selector to screenshot specific element
 *   --fullpage (optional) - Capture full scrollable page
 * Outputs: Screenshot file path
 *
 * This is an ATOMIC operation - takes screenshot only.
 * Assumes browser is already navigated to target page.
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
