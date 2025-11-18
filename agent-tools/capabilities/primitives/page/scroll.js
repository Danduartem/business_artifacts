#!/usr/bin/env node

/**
 * PRIMITIVE: Scroll Page
 *
 * Purpose: Scroll page to position or element
 * Inputs:
 *   --to (optional) - Scroll to: top|bottom|element
 *   --selector (optional) - CSS selector to scroll to (if --to=element)
 *   --y (optional) - Scroll to specific Y position
 * Outputs: Scroll confirmation
 *
 * This is an ATOMIC operation - scrolls only.
 * Assumes browser is already navigated to target page.
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'page.scroll' });
const args = parseArgs();

async function scrollPage() {
  try {
    const to = args.flags.to || 'bottom';
    const selector = args.flags.selector;
    const y = args.flags.y ? parseInt(args.flags.y) : null;

    logger.info('Scrolling page', { to, selector, y });

    // Connect to existing browser
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222'
    });

    const pages = await browser.pages();
    const page = pages[pages.length - 1]; // Use active tab

    if (!page) {
      throw new Error('No active tab found');
    }

    let scrolledTo;

    if (y !== null) {
      // Scroll to specific Y position
      await page.evaluate((yPos) => window.scrollTo(0, yPos), y);
      scrolledTo = `y=${y}`;
    } else if (to === 'top') {
      await page.evaluate(() => window.scrollTo(0, 0));
      scrolledTo = 'top';
    } else if (to === 'bottom') {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      scrolledTo = 'bottom';
    } else if (to === 'element' && selector) {
      await page.evaluate((sel) => {
        document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
      }, selector);
      scrolledTo = `element:${selector}`;
    } else {
      throw new Error('Invalid scroll parameters');
    }

    const result = {
      success: true,
      scrolledTo
    };

    console.log(JSON.stringify(result));
    logger.info('Page scrolled', { scrolledTo });

    await browser.disconnect();


    process.exit(0);

  } catch (error) {
    logger.error('Scroll failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

scrollPage();
