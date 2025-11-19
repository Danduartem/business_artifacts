#!/usr/bin/env node
/**
 * @workflow media.download-and-transcribe
 * @when Complete workflow to download video from URL and transcribe it
 * @complexity low
 * @category media
 *
 * @flag input - TODO: Add parameter description
 *
 * @example
 * node download-and-transcribe.js --param value
 */

import { executePrimitive } from '../workflow-utils.js';
import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';
import { mkdirSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const logger = createLogger({ toolName: 'media.download-and-transcribe' });
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

    // STEP 1: Download video/audio (shell out to primitive)
    // Detect platform and use appropriate downloader
    const isInstagram = url.includes('instagram.com');
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    const downloaderPrimitive = isInstagram
      ? 'instagram/download-video.js'
      : isYouTube
        ? 'youtube/download-video.js'
        : 'http/download.js';

    logger.info('Using downloader', { primitive: downloaderPrimitive, isInstagram, isYouTube });

    let downloadResult;
    if (isInstagram || isYouTube) {
      // For Instagram/YouTube: download audio directly (faster, smaller)
      logger.info('Step 1/2: Downloading audio directly');
      downloadResult = executePrimitive(downloaderPrimitive, {
        url,
        output: audioPath,
        'audio-only': true
      });
    } else {
      // For other URLs: download video then extract audio
      logger.info('Step 1/3: Downloading video');
      downloadResult = executePrimitive(downloaderPrimitive, {
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
    }

    if (!downloadResult.success) {
      throw new Error((isInstagram || isYouTube) ? 'Failed to download audio' : 'Failed to download video');
    }

    // STEP 2/3: Transcribe (shell out to primitive)
    const stepLabel = (isInstagram || isYouTube) ? 'Step 2/2' : 'Step 3/3';
    logger.info(`${stepLabel}: Transcribing audio`);
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
      // Only delete video if it was downloaded (not for Instagram/YouTube audio-only)
      if (!isInstagram && !isYouTube && existsSync(videoPath)) {
        unlinkSync(videoPath);
      }
      if (existsSync(audioPath)) {
        unlinkSync(audioPath);
      }
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
