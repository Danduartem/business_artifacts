#!/usr/bin/env node

/**
 * @workflow content.process-image-queue
 * @description Process queued images using Claude Code agents for AI vision analysis (Option C: zero-cost)
 * @category content
 *
 * @composes Task (Claude Code agents)
 *
 * @input queue-file string - Path to image analysis queue JSON file (optional, default: temp/image_analysis_queue.json)
 * @input batch-size number - Number of images to process per agent (optional, default: 10)
 * @input parallel boolean - Process multiple agents in parallel (optional, default: false)
 *
 * @output processed number - Number of images processed
 * @output success boolean - Operation success status
 *
 * @example
 * node content/process-image-queue.js --queue-file temp/image_analysis_queue.json
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'workflow.content.process-image-queue' });
const args = parseArgs();

async function processImageQueue() {
  try {
    const queueFile = args.flags['queue-file'] || join(process.cwd(), 'temp', 'image_analysis_queue.json');
    const batchSize = parseInt(args.flags['batch-size']) || 10;
    const parallel = args.flags.parallel === true;

    if (!existsSync(queueFile)) {
      throw new Error(`Queue file not found: ${queueFile}\n\nRun the batch extraction workflow first to generate the queue.`);
    }

    logger.info('Loading image analysis queue', { queueFile });

    // Load queue
    const queueData = readFileSync(queueFile, 'utf8');
    const queue = JSON.parse(queueData);

    // Filter pending images
    const pendingImages = queue.filter(item => item.status === 'pending');

    if (pendingImages.length === 0) {
      console.log(JSON.stringify({
        success: true,
        message: 'No pending images in queue',
        totalInQueue: queue.length,
        alreadyProcessed: queue.filter(item => item.status === 'completed').length
      }));
      logger.info('No pending images to process');
      return;
    }

    logger.info('Found pending images', { count: pendingImages.length });

    console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                  IMAGE ANALYSIS QUEUE PROCESSOR                    ║
╚════════════════════════════════════════════════════════════════════╝

Found ${pendingImages.length} images pending analysis.

This workflow uses Claude Code agents to analyze images with AI vision.

INSTRUCTIONS:
1. This is a semi-automated workflow
2. You (Claude Code) will analyze each image using vision
3. For each image, provide:
   - hasText: true/false (does image contain readable text?)
   - imageType: "text", "photo", or "mixed"
   - confidence: 0.0 to 1.0
   - description: Brief description (max 100 chars)

Starting image analysis...
────────────────────────────────────────────────────────────────────

`);

    // Process images in batches
    let processedCount = 0;
    const batchCount = Math.ceil(pendingImages.length / batchSize);

    for (let batchNum = 0; batchNum < batchCount; batchNum++) {
      const batchStart = batchNum * batchSize;
      const batchEnd = Math.min(batchStart + batchSize, pendingImages.length);
      const batch = pendingImages.slice(batchStart, batchEnd);

      console.log(`\n📦 BATCH ${batchNum + 1}/${batchCount} (${batch.length} images)\n`);

      for (let i = 0; i < batch.length; i++) {
        const image = batch[i];
        const imageNum = batchStart + i + 1;

        console.log(`\n[${imageNum}/${pendingImages.length}] Analyzing: ${image.filename}`);
        console.log(`Path: ${image.path}`);
        console.log(`Size: ${image.sizeKB} KB\n`);

        // This is where Claude Code (you) would analyze the image
        // For now, we'll create a placeholder that you can fill in

        console.log(`⚠️  MANUAL ANALYSIS REQUIRED ⚠️

Please analyze this image and provide the following information:

Required fields:
  - hasText: Does the image contain readable text? (true/false)
  - imageType: Type of image ("text", "photo", or "mixed")
  - confidence: Your confidence in this assessment (0.0 to 1.0)
  - description: Brief description of the image content (max 100 chars)

IMAGE TO ANALYZE: ${image.path}

After analyzing, the workflow will save your analysis to the queue.
`);

        // Mark as pending manual analysis
        const queueIndex = queue.findIndex(item => item.path === image.path);
        if (queueIndex !== -1) {
          queue[queueIndex].status = 'awaiting_manual_analysis';
          queue[queueIndex].batchNumber = batchNum + 1;
          queue[queueIndex].processedAt = new Date().toISOString();
        }

        processedCount++;
      }

      // Save progress after each batch
      writeFileSync(queueFile, JSON.stringify(queue, null, 2));
      logger.info('Batch progress saved', { batch: batchNum + 1, processed: processedCount });
    }

    const result = {
      success: true,
      queueFile,
      totalImages: queue.length,
      pendingAnalysis: pendingImages.length,
      awaitingManualAnalysis: processedCount,
      message: `${processedCount} images queued for manual Claude Code analysis`,
      nextSteps: [
        '1. Use Claude Code Read tool to view each image',
        '2. Analyze image content with Claude vision',
        '3. Update queue file with analysis results',
        'OR: Use the automated Task-based agent (coming soon)'
      ]
    };

    console.log(`

════════════════════════════════════════════════════════════════════

✅ QUEUE PROCESSING COMPLETE

Images queued: ${processedCount}
Status: Awaiting manual Claude Code analysis

NEXT STEPS:
1. Review queue file: ${queueFile}
2. Use Claude Code to analyze each image
3. Update the queue with analysis results

Or wait for the automated Task-based agent workflow (in development)

════════════════════════════════════════════════════════════════════
`);

    console.log(JSON.stringify(result));
    logger.info('Queue processing complete', { processed: processedCount });

  } catch (error) {
    logger.error('Queue processing failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

processImageQueue();
