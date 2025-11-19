#!/usr/bin/env node

/**
 * Process already-extracted Instagram post URLs
 * Reads URLs from existing file and extracts full post data
 */

import { readFile, writeFile } from 'fs/promises';
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createLogger } from '../../../core/logger/index.js';
import { getAgentToolsRoot } from '../../../core/utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = createLogger({ toolName: 'job.instagram.process-existing-urls' });

// Helper to execute workflow
async function executeWorkflow(workflowPath, params) {
  return new Promise((resolve, reject) => {
    const workflowFullPath = join(getAgentToolsRoot(), 'capabilities/workflows', workflowPath);

    const args = Object.entries(params).flatMap(([key, value]) => {
      if (value === true) return [`--${key}`];
      if (value === false) return [];
      return [`--${key}`, String(value)];
    });

    const child = spawn('node', [workflowFullPath, ...args], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        logger.error('Workflow failed', { workflow: workflowPath, code, stderr });
        reject(new Error(`Workflow failed with code ${code}`));
      } else {
        try {
          const result = JSON.parse(stdout);
          resolve(result);
        } catch (error) {
          reject(new Error('Failed to parse workflow output: ' + error.message));
        }
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  try {
    const inputFile = process.argv[2];

    if (!inputFile) {
      console.error('Usage: node process-existing-urls.js <path-to-urls-file.json>');
      process.exit(1);
    }

    logger.info('Reading URLs from file', { file: inputFile });

    const data = JSON.parse(await readFile(inputFile, 'utf-8'));
    const posts = data.posts || [];

    logger.info('Found posts to process', { count: posts.length });

    const processedPosts = [];
    const failedPosts = [];

    for (const [index, post] of posts.entries()) {
      try {
        logger.info(`Processing post ${index + 1}/${posts.length}`, { url: post.url });

        const result = await executeWorkflow('instagram/extract-post-full.js', {
          url: post.url,
          profile: true,
          screenshot: true
        });

        if (result.success) {
          processedPosts.push(result);
          logger.info('Post processed successfully', { postId: result.postId });
        } else {
          throw new Error('Workflow returned success: false');
        }

      } catch (error) {
        logger.error('Post processing failed', { url: post.url, error: error.message });
        failedPosts.push({
          url: post.url,
          error: error.message
        });
      }
    }

    // Export results
    const outputFileName = `instagram-${data.username}-${new Date().toISOString().split('T')[0]}.json`;
    const outputPath = join(getAgentToolsRoot(), 'temp', outputFileName);

    const exportData = {
      metadata: {
        username: data.username,
        dateRange: data.dateRange,
        extractedAt: new Date().toISOString()
      },
      summary: {
        totalPosts: posts.length,
        successfulPosts: processedPosts.length,
        failedPosts: failedPosts.length
      },
      posts: processedPosts,
      failed: failedPosts
    };

    await writeFile(outputPath, JSON.stringify(exportData, null, 2), 'utf-8');

    console.log(JSON.stringify({
      success: true,
      totalPosts: posts.length,
      successfulPosts: processedPosts.length,
      failedPosts: failedPosts.length,
      outputFile: outputPath
    }));

    logger.info('Processing complete', { outputFile: outputPath });

  } catch (error) {
    logger.error('Job failed', { error: error.message, stack: error.stack });
    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));
    process.exit(1);
  }
}

main();
