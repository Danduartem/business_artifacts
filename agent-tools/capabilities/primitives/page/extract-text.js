#!/usr/bin/env node

/**
 * PRIMITIVE: Extract Text from Page
 *
 * Purpose: Extract text content from CSS selector
 * Inputs:
 *   --selector (required) - CSS selector
 *   --all (optional) - extract all matching elements
 * Outputs: Extracted text content
 *
 * This is an ATOMIC operation - extracts text only.
 * Assumes browser is already navigated to target page.
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'page.extract-text' });
const args = parseArgs();

async function extractText() {
  try {
    if (!args.flags.selector) {
      throw new Error('--selector is required');
    }

    logger.info('Extracting text', { selector: args.flags.selector });

    // Connect to existing browser
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222'
    });

    const pages = await browser.pages();
    const page = pages[pages.length - 1]; // Use active tab

    let text;
    if (args.flags.all) {
      // Extract from all matching elements
      text = await page.$$eval(args.flags.selector, elements =>
        elements.map(el => el.textContent.trim())
      );
    } else {
      // Extract from first matching element
      text = await page.$eval(args.flags.selector, el => el.textContent.trim());
    }

    const result = {
      success: true,
      selector: args.flags.selector,
      text: text,
      count: Array.isArray(text) ? text.length : 1
    };

    console.log(JSON.stringify(result));
    logger.info('Text extracted', { count: result.count });

    await browser.disconnect();


    process.exit(0);

  } catch (error) {
    logger.error('Failed to extract text', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      selector: args.flags.selector
    }));

    process.exit(1);
  }
}

extractText();
