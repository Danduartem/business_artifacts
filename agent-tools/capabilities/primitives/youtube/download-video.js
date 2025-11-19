#!/usr/bin/env node

/**
 * @tool youtube.download-video
 * @when Download video or audio from YouTube URL using yt-dlp
 * @category youtube
 *
 * @flag url - YouTube video URL (required)
 * @flag output - Output file path (required)
 * @flag quality - Video quality (best, worst, or format code) (optional)
 * @flag audio-only - Download only audio (much faster, smaller) (optional)
 *
 * @example
 * node download-video.js --param value
 */

import { spawnSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'youtube.download-video' });
const args = parseArgs();

async function downloadYouTubeVideo() {
  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    if (!args.flags.output) {
      throw new Error('--output is required');
    }

    const url = args.flags.url;
    const outputFile = args.flags.output;
    const quality = args.flags.quality || 'best';
    const audioOnly = args.flags['audio-only'] || false;

    logger.info('Downloading YouTube content', {
      url,
      output: outputFile,
      audioOnly,
      quality: audioOnly ? 'bestaudio' : quality
    });

    // Validate URL is YouTube
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      throw new Error('URL must be a YouTube video URL');
    }

    // Build yt-dlp command
    const ytDlpArgs = [
      url,
      '-o', outputFile,  // Output file
      '--no-playlist',  // Don't download playlists
      '--no-warnings',  // Suppress warnings
      '--quiet',  // Quiet mode (only errors)
      '--progress',  // Show progress
    ];

    // Audio-only mode: download only audio stream (faster, smaller)
    if (audioOnly) {
      ytDlpArgs.push(
        '-f', 'bestaudio',  // Download best audio stream only
        '--extract-audio',  // Extract audio
        '--audio-format', 'mp3'  // Convert to mp3
      );
    } else {
      ytDlpArgs.push('-f', quality);  // Format/quality selection for video
    }

    // Execute yt-dlp
    const result = spawnSync('yt-dlp', ytDlpArgs, {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024  // 10MB buffer
    });

    if (result.error) {
      throw new Error(`Failed to execute yt-dlp: ${result.error.message}`);
    }

    if (result.status !== 0) {
      const errorMsg = result.stderr || result.stdout || 'Unknown error';
      throw new Error(`yt-dlp failed: ${errorMsg}`);
    }

    // Verify file was downloaded
    if (!existsSync(outputFile)) {
      throw new Error('Download completed but output file not found');
    }

    // Get file size
    const stats = statSync(outputFile);

    const output = {
      success: true,
      url,
      output: outputFile,
      size: stats.size,
      audioOnly,
      quality: audioOnly ? 'bestaudio/mp3' : quality
    };

    console.log(JSON.stringify(output));
    logger.info('Download complete', { output: outputFile, size: stats.size });

    process.exit(0);
  } catch (error) {
    logger.error('Download failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      url: args.flags.url
    }));

    process.exit(1);
  }
}

downloadYouTubeVideo();
