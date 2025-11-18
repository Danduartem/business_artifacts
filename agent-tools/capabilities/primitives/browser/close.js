#!/usr/bin/env node

/**
 * PRIMITIVE: Close Browser
 *
 * Purpose: Close the browser instance or specific tab
 * Inputs:
 *   --tab-only (optional) - Close only current tab, not entire browser
 * Outputs: Success confirmation
 *
 * This is an ATOMIC operation - closes browser or tab only.
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'browser.close' });
const args = parseArgs();

async function closeBrowser() {
  try {
    const tabOnly = args.flags['tab-only'];

    logger.info('Closing', { tabOnly });

    // Try to connect to existing browser
    let browser;
    try {
      browser = await puppeteer.connect({
        browserURL: 'http://localhost:9222'
      });
    } catch (connectError) {
      // No browser running - this is fine for cleanup operations
      logger.info('No browser running to close', { error: connectError.message });
      console.log(JSON.stringify({
        success: true,
        action: 'no-browser-running',
        message: 'No browser instance found to close'
      }));
      process.exit(0);
      return;
    }

    if (tabOnly) {
      const pages = await browser.pages();
      const page = pages[pages.length - 1];

      if (!page) {
        throw new Error('No active tab to close');
      }

      await page.close();
      await browser.disconnect();

      const result = {
        success: true,
        action: 'tab-closed'
      };

      console.log(JSON.stringify(result));
      logger.info('Tab closed');
    } else {
      await browser.close();

      const result = {
        success: true,
        action: 'browser-closed'
      };

      console.log(JSON.stringify(result));
      logger.info('Browser closed');
    }

    process.exit(0);

  } catch (error) {
    logger.error('Close failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

closeBrowser();
