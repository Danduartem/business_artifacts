#!/usr/bin/env node

/**
 * WORKFLOW: Download and Transcribe Video
 *
 * Purpose: Complete workflow to download video from URL and transcribe it
 * Composes multiple primitives by shelling out to them:
 *   1. http.download - Download video
 *   2. media.extract-audio - Extract audio
 *   3. media.transcribe - Transcribe audio
 *
 * This is a HIGH-LEVEL workflow for convenience.
 * For custom needs, compose primitives directly.
 *
 * Benefits of shelling out:
 * - No SDK overhead (lighter weight)
 * - Primitives can be used standalone
 * - Clear separation of concerns
 */

import { executePrimitive } from '../workflow-utils.js';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

const logger = createLogger({ toolName: 'workflow.download-and-transcribe' });
const args = parseArgs();

async function downloadAndTranscribe() {
  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    const url = args.flags.url;
    const language = args.flags.language || 'en';
    const format = args.flags.format || 'txt';
    const outputDir = args.flags['output-dir'] || './temp/transcriptions';
    const keepVideo = args.flags['keep-video'];

    // Ensure output directory exists
    mkdirSync(outputDir, { recursive: true });

    const videoPath = join(outputDir, 'video.mp4');
    const audioPath = join(outputDir, 'audio.mp3');
    const transcriptPath = join(outputDir, `transcript.${format}`);

    logger.info('Starting download and transcribe workflow', { url, language });

    // STEP 1: Download video (shell out to primitive)
    logger.info('Step 1/3: Downloading video');
    const downloadResult = executePrimitive('http/download.js', {
      url,
      output: videoPath
    });

    if (!downloadResult.success) {
      throw new Error('Failed to download video');
    }

    // STEP 2: Extract audio (shell out to primitive)
    logger.info('Step 2/3: Extracting audio');
    const audioResult = executePrimitive('media/extract-audio.js', {
      input: videoPath,
      output: audioPath,
      format: 'mp3'
    });

    if (!audioResult.success) {
      throw new Error('Failed to extract audio');
    }

    // STEP 3: Transcribe (shell out to primitive)
    logger.info('Step 3/3: Transcribing audio');
    const transcribeResult = executePrimitive('media/transcribe.js', {
      input: audioPath,
      output: transcriptPath,
      language,
      format
    });

    if (!transcribeResult.success) {
      throw new Error('Failed to transcribe');
    }

    // Cleanup if requested
    if (!keepVideo) {
      unlinkSync(videoPath);
      unlinkSync(audioPath);
    }

    const result = {
      success: true,
      url,
      transcript: transcriptPath,
      language,
      format,
      keptVideo: keepVideo
    };

    console.log(JSON.stringify(result, null, 2));
    logger.info('Workflow complete');

  } catch (error) {
    logger.error('Workflow failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

downloadAndTranscribe();
