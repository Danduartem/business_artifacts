#!/usr/bin/env node

/**
 * @tool browser.eval
 * @when Execute JavaScript code in browser context
 * @category browser
 *
 * @flag code - JavaScript code to execute (required)
 *
 * @example
 * node eval.js --param value
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'browser.eval' });
const args = parseArgs();

async function evaluateCode() {
  try {
    // Code can be passed as --code, --code-base64 (base64 encoded), or as remaining args
    let code;
    if (args.flags['code-base64']) {
      code = Buffer.from(args.flags['code-base64'], 'base64').toString('utf-8');
    } else {
      code = args.flags.code || args.args.slice(1).join(' ');
    }

    if (!code) {
      throw new Error('--code or --code-base64 is required');
    }

    // Debug mode - log full context
    if (args.flags.debug) {
      console.error('[DEBUG] Code being evaluated (first 300 chars):');
      console.error(code.slice(0, 300));
      console.error('[DEBUG] Code length:', code.length);
      console.error('[DEBUG] Starts with:', code.trim().slice(0, 20));
    }

    logger.info('Evaluating code', { codeLength: code.length });

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

    // Directly evaluate the async function
    // Puppeteer handles serialization properly - no eval() or Function() needed
    const result = await page.evaluate(async (codeString) => {
      // Create the function and immediately invoke it
      const fn = eval(`(${codeString})`);
      return await fn();
    }, code);

    const output = {
      success: true,
      result,
      type: typeof result
    };

    console.log(JSON.stringify(output));
    logger.info('Evaluation complete', { type: typeof result });

    await browser.disconnect();
    process.exit(0);

  } catch (error) {
    logger.error('Evaluation failed', { error: error.message, stack: error.stack });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }));

    process.exit(1);
  }
}

evaluateCode();
