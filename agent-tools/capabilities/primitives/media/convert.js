#!/usr/bin/env node

/**
 * PRIMITIVE: Convert Video Format
 *
 * Purpose: Convert video between formats
 * Inputs:
 *   --input (required) - Input video file path
 *   --output (optional) - Output video file path
 *   --format (optional) - Output format: mp4|webm|avi (default: mp4)
 *   --codec (optional) - Video codec: libx264|libvpx-vp9
 *   --preset (optional) - Encoding preset: ultrafast|fast|medium|slow (default: medium)
 *   --bitrate (optional) - Video bitrate (e.g., 1000k, 2M)
 * Outputs: Converted video file path
 *
 * This is an ATOMIC operation - converts format only.
 * Requires ffmpeg to be installed.
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { dirname, basename, extname, join } from 'path';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'media.convert' });
const args = parseArgs();

async function convertVideo() {
  try {
    if (!args.flags.input) {
      throw new Error('--input is required');
    }

    const inputFile = args.flags.input;

    if (!existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    const format = args.flags.format || 'mp4';
    const codec = args.flags.codec || (format === 'webm' ? 'libvpx-vp9' : 'libx264');
    const preset = args.flags.preset || 'medium';
    const bitrate = args.flags.bitrate;

    const outputFile = args.flags.output ||
      join(
        dirname(inputFile),
        `${basename(inputFile, extname(inputFile))}_converted.${format}`
      );

    logger.info('Converting video', { input: inputFile, output: outputFile, format, codec });

    // Build ffmpeg command
    const ffmpegArgs = [
      '-i', inputFile,
      '-c:v', codec,
      '-preset', preset,
      '-f', format,
      '-y' // Overwrite output
    ];

    if (bitrate) {
      ffmpegArgs.push('-b:v', bitrate);
    }

    ffmpegArgs.push(outputFile);

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
      codec,
      preset,
      bitrate: bitrate || null
    };

    console.log(JSON.stringify(result));
    logger.info('Video converted', { output: outputFile });


    process.exit(0);
  } catch (error) {
    logger.error('Video conversion failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      input: args.flags.input
    }));

    process.exit(1);
  }
}

convertVideo();
