#!/usr/bin/env node

/**
 * Instagram Post Screenshotter
 * Captures screenshots of Instagram posts for visual analysis
 */

import { execSync } from 'child_process';
import { getTempPath } from '@business-artifacts/config';
import { existsSync, mkdirSync } from 'fs';

/**
 * Execute command with error handling
 */
function exec(command, description) {
  try {
    const result = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    return result.trim();
  } catch (error) {
    throw new Error(`${description} failed: ${error.message}`);
  }
}

/**
 * Capture screenshot for a single post
 *
 * @param {Object} post - Post object with url property
 * @param {Object} options - Screenshot options
 * @returns {Promise<string>} - Path to screenshot file
 */
export async function captureScreenshot(post, options = {}) {
  const {
    screenshotsDir = getTempPath('screenshots'),
    delay = 500
  } = options;

  // Ensure directory exists
  if (!existsSync(screenshotsDir)) {
    mkdirSync(screenshotsDir, { recursive: true });
  }

  const postId = post.url.split('/').filter(Boolean).pop();

  try {
    const screenshotPath = exec(
      `browser-screenshot.js "${post.url}" --dir "${screenshotsDir}"`,
      `Capturing screenshot for ${postId}`
    );

    // Small delay to avoid rate limiting
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return screenshotPath.trim();
  } catch (error) {
    console.warn(`⚠️  Failed to capture screenshot for ${postId}:`, error.message);
    return null;
  }
}

/**
 * Capture screenshots for multiple posts
 *
 * @param {Array<Object>} posts - Array of post objects
 * @param {Object} options - Screenshot options
 * @returns {Promise<Object>} - Results with screenshot paths
 */
export async function captureScreenshots(posts, options = {}) {
  const {
    screenshotsDir = getTempPath('screenshots'),
    delay = 500,
    continueOnError = true
  } = options;

  console.log(`\n⚙️  Capturing screenshots for ${posts.length} posts...`);

  const results = {
    successful: 0,
    failed: 0,
    screenshots: []
  };

  for (const post of posts) {
    const postId = post.url.split('/').filter(Boolean).pop();

    try {
      const screenshotPath = await captureScreenshot(post, { screenshotsDir, delay });

      if (screenshotPath) {
        post.screenshot = screenshotPath;
        results.successful++;
        results.screenshots.push(screenshotPath);
        console.log(`✓ Screenshot captured: ${postId}`);
      } else {
        post.screenshot = null;
        results.failed++;
      }
    } catch (error) {
      post.screenshot = null;
      results.failed++;

      if (!continueOnError) {
        throw error;
      }
    }
  }

  console.log(`\n✓ Screenshots complete: ${results.successful}/${posts.length} successful`);

  if (results.failed > 0) {
    console.warn(`⚠️  ${results.failed} screenshots failed`);
  }

  return results;
}

/**
 * Get screenshot path for a post (without capturing)
 *
 * @param {Object} post - Post object
 * @param {string} screenshotsDir - Screenshots directory
 * @returns {string|null} - Path to screenshot if it exists
 */
export function getScreenshotPath(post, screenshotsDir = getTempPath('screenshots')) {
  const postId = post.url.split('/').filter(Boolean).pop();
  const screenshotPath = `${screenshotsDir}/${postId}.png`;

  return existsSync(screenshotPath) ? screenshotPath : null;
}

export default {
  captureScreenshot,
  captureScreenshots,
  getScreenshotPath
};
