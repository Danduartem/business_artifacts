#!/usr/bin/env node

/**
 * @tool browser.navigate
 * @when Navigate to a URL in the current or new tab
 * @category browser
 *
 * @flag url - URL to navigate to (required)
 * @flag new-tab - Open in new tab instead of current (optional)
 * @flag wait-until - Wait until: load|domcontentloaded|networkidle0|networkidle2 (default: domcontentloaded) (optional)
 *
 * @example
 * node navigate.js --param value
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'browser.navigate' });
const args = parseArgs();

async function navigate() {
  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    const waitUntil = args.flags['wait-until'] || 'domcontentloaded';
    const newTab = args.flags['new-tab'];

    logger.info('Navigating', { url: args.flags.url, newTab, waitUntil });

    // Connect to existing browser
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222',
      defaultViewport: null
    });

    let page;
    if (newTab) {
      page = await browser.newPage();
    } else {
      const pages = await browser.pages();
      page = pages[pages.length - 1]; // Use active tab
    }

    // Force desktop viewport with device emulation to prevent Instagram from resizing
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true
    });

    // Set desktop user agent to ensure Instagram serves desktop version
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    const response = await page.goto(args.flags.url, { waitUntil });

    const result = {
      success: true,
      url: args.flags.url,
      finalUrl: page.url(),
      status: response?.status() || null,
      newTab: !!newTab
    };

    console.log(JSON.stringify(result));
    logger.info('Navigation complete', { finalUrl: result.finalUrl });

    await browser.disconnect();
    process.exit(0);

  } catch (error) {
    logger.error('Navigation failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      url: args.flags.url
    }));

    process.exit(1);
  }
}

navigate();
