#!/usr/bin/env node

/**
 * @tool media.analyze-image
 * @description Save image metadata and create analysis queue for Claude Code agent processing (zero-cost)
 * @category media
 *
 * @input input string - Path to image file (required)
 * @input queue-file string - Path to analysis queue JSON file (optional, default: temp/image_analysis_queue.json)
 * @output queued boolean - Whether image was added to analysis queue
 * @output queueFile string - Path to queue file
 * @output imageInfo object - Basic image information
 *
 * @example
 * node media/analyze-image.js --input /path/to/image.jpg
 *
 * @example-output
 * {"success": true, "queued": true, "queueFile": "temp/image_analysis_queue.json", "imageInfo": {...}}
 */

import { existsSync, readFileSync, writeFileSync, statSync } from 'fs';
import { dirname, basename, join } from 'path';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'media.analyze-image' });
const args = parseArgs();

async function analyzeImage() {
  try {
    if (!args.flags.input) {
      throw new Error('--input is required');
    }

    const inputFile = args.flags.input;

    if (!existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    const queueFile = args.flags['queue-file'] || join(process.cwd(), 'temp', 'image_analysis_queue.json');

    // Ensure temp directory exists
    const queueDir = dirname(queueFile);
    if (!existsSync(queueDir)) {
      const { mkdirSync } = await import('fs');
      mkdirSync(queueDir, { recursive: true });
    }

    logger.info('Adding image to analysis queue', { input: inputFile });

    // Get basic image info
    const stats = statSync(inputFile);
    const imageInfo = {
      path: inputFile,
      filename: basename(inputFile),
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      addedAt: new Date().toISOString()
    };

    // Load existing queue or create new one
    let queue = [];
    if (existsSync(queueFile)) {
      try {
        const queueData = readFileSync(queueFile, 'utf8');
        queue = JSON.parse(queueData);
      } catch (parseError) {
        logger.warn('Could not parse existing queue file, creating new one');
        queue = [];
      }
    }

    // Check if image already in queue
    const existingIndex = queue.findIndex(item => item.path === inputFile);
    if (existingIndex !== -1) {
      logger.info('Image already in queue', { path: inputFile });

      const result = {
        success: true,
        queued: false,
        alreadyQueued: true,
        queueFile,
        imageInfo: queue[existingIndex],
        queuePosition: existingIndex + 1,
        totalInQueue: queue.length
      };

      console.log(JSON.stringify(result));
      return;
    }

    // Add to queue
    queue.push({
      ...imageInfo,
      status: 'pending',
      analysis: null
    });

    // Save queue
    writeFileSync(queueFile, JSON.stringify(queue, null, 2));

    const result = {
      success: true,
      queued: true,
      queueFile,
      imageInfo,
      queuePosition: queue.length,
      totalInQueue: queue.length,
      note: 'Use the "process-image-queue" workflow with Claude Code agents to analyze these images'
    };

    console.log(JSON.stringify(result));
    logger.info('Image added to analysis queue', {
      path: inputFile,
      position: queue.length,
      queueFile
    });


    process.exit(0);
  } catch (error) {
    logger.error('Failed to queue image', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      input: args.flags.input
    }));

    process.exit(1);
  }
}

analyzeImage();
