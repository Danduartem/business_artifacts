#!/usr/bin/env node

/**
 * WORKFLOW: Download Instagram Reel
 *
 * Purpose: Complete workflow to download and optionally transcribe Instagram reel
 * Composes multiple primitives:
 *   1. browser.start - Launch browser
 *   2. browser.navigate - Navigate to reel
 *   3. page.wait-for - Wait for video
 *   4. browser.eval - Extract video URL
 *   5. http.download - Download video
 *   6. media.transcribe-segments (optional) - Transcribe audio using local whisper.cpp
 *   7. browser.close - Close browser
 *
 * This is a HIGH-LEVEL workflow for convenience.
 * For custom needs, compose primitives directly.
 */

import { executePrimitive, executePrimitiveNoReturn } from '../workflow-utils.js';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { mkdirSync } from 'fs';
import { join, basename } from 'path';

const logger = createLogger({ toolName: 'workflow.instagram.download-reel' });
const args = parseArgs();

async function downloadReel() {

  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    const url = args.flags.url;
    const transcribe = args.flags.transcribe;
    const language = args.flags.language || 'en';
    const outputDir = args.flags['output-dir'] || './temp/reels';

    mkdirSync(outputDir, { recursive: true });

    logger.info('Starting reel download workflow', { url });

    // STEP 1: Start browser
    logger.info('Step 1/7: Starting browser');
    executePrimitive('browser/start.js', {
      profile: args.flags.profile
    });

    // STEP 2: Navigate to reel
    logger.info('Step 2/7: Navigating to reel');
    executePrimitive('browser/navigate.js', { url });

    // STEP 3: Wait for video element
    logger.info('Step 3/7: Waiting for video to load');
    executePrimitive('page/wait-for.js', {
      selector: 'video',
      timeout: 15000
    });

    // STEP 4: Extract video URL
    logger.info('Step 4/7: Extracting video URL');
    const videoUrlResult = executePrimitive('browser/eval.js', {
      code: 'document.querySelector("video").src'
    });

    const videoUrl = videoUrlResult.result;
    if (!videoUrl) {
      throw new Error('Failed to extract video URL');
    }

    // STEP 5: Download video
    logger.info('Step 5/7: Downloading video');
    const reelId = basename(url.split('?')[0]);
    const videoPath = join(outputDir, `${reelId}.mp4`);

    executePrimitive('http/download.js', {
      url: videoUrl,
      output: videoPath
    });

    let transcriptPath = null;

    if (transcribe) {
      // STEP 6: Transcribe (optional)
      logger.info('Step 6/7: Transcribing video');
      transcriptPath = join(outputDir, `${reelId}_transcript.txt`);

      executePrimitive('media/transcribe-segments.js', {
        input: videoPath,
        output: transcriptPath,
        language
      });
    }

    // STEP 7: Close browser
    logger.info('Step 7/7: Closing browser');
    executePrimitiveNoReturn('browser/close.js');

    const result = {
      success: true,
      url,
      video: videoPath,
      transcript: transcriptPath,
      language: transcribe ? language : null,
      downloadedAt: new Date().toISOString()
    };

    console.log(JSON.stringify(result, null, 2));
    logger.info('Reel download complete');

  } catch (error) {
    logger.error('Reel download failed', { error: error.message });

    // Try to close browser on error
    executePrimitiveNoReturn('browser/close.js');

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

downloadReel();
