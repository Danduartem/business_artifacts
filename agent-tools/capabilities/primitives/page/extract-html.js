#!/usr/bin/env node

/**
 * PRIMITIVE: Extract HTML from Page
 *
 * Purpose: Extract HTML content from CSS selector
 * Inputs:
 *   --selector (required) - CSS selector
 *   --all (optional) - extract all matching elements
 *   --outer (optional) - extract outerHTML instead of innerHTML
 * Outputs: Extracted HTML content
 *
 * This is an ATOMIC operation - extracts HTML only.
 * Assumes browser is already navigated to target page.
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'page.extract-html' });
const args = parseArgs();

async function extractHTML() {
  try {
    if (!args.flags.selector) {
      throw new Error('--selector is required');
    }

    const all = args.flags.all;
    const outer = args.flags.outer;

    logger.info('Extracting HTML', { selector: args.flags.selector, all, outer });

    // Connect to existing browser
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222'
    });

    const pages = await browser.pages();
    const page = pages[pages.length - 1]; // Use active tab

    let html;
    if (all) {
      // Extract from all matching elements
      html = await page.$$eval(
        args.flags.selector,
        (elements, useOuter) => elements.map(el => useOuter ? el.outerHTML : el.innerHTML),
        outer
      );
    } else {
      // Extract from first matching element
      html = await page.$eval(
        args.flags.selector,
        (el, useOuter) => useOuter ? el.outerHTML : el.innerHTML,
        outer
      );
    }

    const result = {
      success: true,
      selector: args.flags.selector,
      html,
      count: Array.isArray(html) ? html.length : 1
    };

    console.log(JSON.stringify(result));
    logger.info('HTML extracted', { count: result.count });

    await browser.disconnect();


    process.exit(0);

  } catch (error) {
    logger.error('Failed to extract HTML', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      selector: args.flags.selector
    }));

    process.exit(1);
  }
}

extractHTML();
