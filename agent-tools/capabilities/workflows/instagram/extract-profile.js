#!/usr/bin/env node

/**
 * WORKFLOW: Extract Instagram Profile
 *
 * Purpose: Complete workflow to extract Instagram profile information
 * Composes multiple primitives:
 *   1. browser.start - Launch browser
 *   2. browser.navigate - Navigate to profile
 *   3. page.wait-for - Wait for content
 *   4. page.extract-text - Extract profile data
 *   5. browser.close - Close browser
 *
 * This is a HIGH-LEVEL workflow for convenience.
 * For custom needs, compose primitives directly.
 */

import { executePrimitive, executePrimitiveNoReturn } from '../workflow-utils.js';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'workflow.instagram.extract-profile' });
const args = parseArgs();

async function extractProfile() {

  try {
    if (!args.flags.username) {
      throw new Error('--username is required');
    }

    const username = args.flags.username;
    const url = `https://www.instagram.com/${username}/`;

    logger.info('Starting Instagram profile extraction', { username });

    // STEP 1: Start browser
    logger.info('Step 1/6: Starting browser');
    executePrimitive('browser/start.js', {
      profile: args.flags.profile
    });

    // STEP 2: Navigate to profile
    logger.info('Step 2/6: Navigating to profile');
    executePrimitive('browser/navigate.js', {
      url,
      'wait-until': 'networkidle2'
    });

    // STEP 3: Wait for content
    logger.info('Step 3/6: Waiting for content to load');
    executePrimitive('page/wait-for.js', {
      selector: 'header section',
      timeout: 15000
    });

    // STEP 4: Extract profile data
    logger.info('Step 4/6: Extracting profile data');

    const fullName = executePrimitive('page/extract-text.js', {
      selector: 'header section h1'
    });

    const bio = executePrimitive('page/extract-text.js', {
      selector: 'header section h1 + span'
    });

    const stats = executePrimitive('page/extract-text.js', {
      selector: 'header section ul li',
      all: true
    });

    // STEP 5: Close browser
    logger.info('Step 5/6: Closing browser');
    executePrimitiveNoReturn('browser/close.js');

    // Compose results
    const result = {
      success: true,
      username,
      url,
      fullName: fullName.text || '',
      bio: bio.text || '',
      stats: stats.text || [],
      extractedAt: new Date().toISOString()
    };

    console.log(JSON.stringify(result, null, 2));
    logger.info('Profile extraction complete');
    process.exit(0);

  } catch (error) {
    logger.error('Profile extraction failed', { error: error.message });

    // Try to close browser on error
    executePrimitiveNoReturn('browser/close.js');

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

extractProfile();
