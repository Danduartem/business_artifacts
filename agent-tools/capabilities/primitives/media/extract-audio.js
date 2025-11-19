#!/usr/bin/env node

/**
 * @tool media.extract-audio
 * @when Extract audio track from video file
 * @category media
 *
 * @flag input - Input video file path (required)
 * @flag output - Output audio file path (optional)
 * @flag format - Audio format: mp3|wav|aac|flac (default: mp3) (optional)
 * @flag quality - Audio quality 0-9, lower is better (default: 2) (optional)
 *
 * @example
 * node extract-audio.js --param value
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { dirname, basename, extname, join } from 'path';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'media.extract-audio' });
const args = parseArgs();

async function extractAudio() {
  try {
    if (!args.flags.input) {
      throw new Error('--input is required');
    }

    const inputFile = args.flags.input;

    if (!existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    const format = args.flags.format || 'mp3';
    const quality = args.flags.quality || '2';
    const outputFile = args.flags.output ||
      join(
        dirname(inputFile),
        `${basename(inputFile, extname(inputFile))}.${format}`
      );

    logger.info('Extracting audio', { input: inputFile, output: outputFile, format });

    // Build ffmpeg command
    const ffmpegArgs = [
      '-i', inputFile,
      '-vn', // No video
      '-acodec', 'libmp3lame',
      '-q:a', quality,
      '-f', format,
      '-y', // Overwrite output
      outputFile
    ];

    // Execute ffmpeg
    const ffmpeg = spawn('ffmpeg', ffmpegArgs);

    let stderr = '';
    ffmpeg.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    await new Promise((resolve, reject) => {
      ffmpeg.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg exited with code ${code}: ${stderr}`));
        }
      });

      ffmpeg.on('error', (err) => {
        reject(new Error(`Failed to start FFmpeg: ${err.message}`));
      });
    });

    const result = {
      success: true,
      input: inputFile,
      output: outputFile,
      format,
      quality
    };

    console.log(JSON.stringify(result));
    logger.info('Audio extracted', { output: outputFile });


    process.exit(0);
  } catch (error) {
    logger.error('Audio extraction failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      input: args.flags.input
    }));

    process.exit(1);
  }
}

extractAudio();
