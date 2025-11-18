#!/usr/bin/env node

/**
 * WORKFLOW: Extract Instagram Post
 *
 * Purpose: Complete workflow to extract Instagram post data
 * Composes multiple primitives:
 *   1. browser.start
 *   2. browser.navigate
 *   3. page.wait-for
 *   4. page.extract-text
 *   5. browser.close
 *
 * This is a HIGH-LEVEL workflow for convenience.
 * For custom needs, compose primitives directly.
 */

import { executePrimitive, executePrimitiveNoReturn } from '../workflow-utils.js';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'workflow.instagram.extract-post' });
const args = parseArgs();

async function extractPost() {

  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    logger.info('Starting Instagram post extraction', { url: args.flags.url });

    // STEP 1: Start browser (primitive)
    logger.info('Step 1/5: Starting browser');
    executePrimitive('browser/start.js', {
      profile: args.flags.profile
    });

    // STEP 2: Navigate (primitive)
    logger.info('Step 2/5: Navigating to post');
    executePrimitive('browser/navigate.js', {
      url: args.flags.url
    });

    // STEP 3: Wait for content (primitive)
    logger.info('Step 3/5: Waiting for content to load');
    executePrimitive('page/wait-for.js', {
      selector: 'article',
      timeout: 10000
    });

    // STEP 4: Extract data (multiple primitives)
    logger.info('Step 4/5: Extracting post data');

    const caption = executePrimitive('page/extract-text.js', {
      selector: 'article h1'
    });

    const likes = executePrimitive('page/extract-text.js', {
      selector: 'section button span'
    });

    const date = executePrimitive('page/extract-text.js', {
      selector: 'time'
    });

    // STEP 5: Close browser (primitive)
    logger.info('Step 5/5: Closing browser');
    executePrimitiveNoReturn('browser/close.js');

    // Compose results
    const result = {
      success: true,
      url: args.flags.url,
      caption: caption.text || '',
      likes: likes.text || '',
      date: date.text || '',
      extractedAt: new Date().toISOString()
    };

    console.log(JSON.stringify(result, null, 2));
    logger.info('Extraction complete');

  } catch (error) {
    logger.error('Extraction failed', { error: error.message });

    // Try to close browser on error
    executePrimitiveNoReturn('browser/close.js');

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

extractPost();
