#!/usr/bin/env node

/**
 * Notion Saver
 * Saves analyzed posts to Notion database
 */

import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { SCRIPTS } from '@business-artifacts/config';

/**
 * Execute command with error handling
 */
function exec(command, description) {
  try {
    execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
  } catch (error) {
    throw new Error(`${description} failed: ${error.message}`);
  }
}

/**
 * Save a single post to Notion
 *
 * @param {Object} post - Post object with notionData property
 * @param {Object} options - Save options
 * @returns {Promise<boolean>} - Success status
 */
export async function savePost(post, options = {}) {
  const { dryRun = false } = options;

  if (!post.notionData) {
    throw new Error('Post missing notionData property');
  }

  const postId = post.url.split('/').filter(Boolean).pop();
  const tempFile = `/tmp/notion-post-${Date.now()}-${postId}.json`;

  try {
    // Write post data to temp file
    writeFileSync(tempFile, JSON.stringify(post.notionData, null, 2));

    if (dryRun) {
      console.log(`[DRY RUN] Would save post ${postId} to Notion`);
      return true;
    }

    // Call Notion save script
    exec(
      `node "${SCRIPTS.NOTION_SAVE}" --json "${tempFile}"`,
      `Saving post ${postId}`
    );

    return true;
  } catch (error) {
    console.error(`✗ Failed to save ${postId}:`, error.message);
    return false;
  } finally {
    // Cleanup temp file
    try {
      unlinkSync(tempFile);
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

/**
 * Save multiple posts to Notion
 *
 * @param {Array<Object>} posts - Array of post objects with notionData
 * @param {Object} options - Save options
 * @returns {Promise<Object>} - Results with success/failure counts
 */
export async function savePosts(posts, options = {}) {
  const {
    dryRun = false,
    continueOnError = true,
    delay = 500
  } = options;

  console.log(`\n⚙️  Saving ${posts.length} posts to Notion...`);

  if (dryRun) {
    console.log(`[DRY RUN MODE - No actual saves will be made]`);
  }

  const results = {
    successful: 0,
    failed: 0,
    total: posts.length,
    errors: []
  };

  for (const post of posts) {
    const postId = post.url.split('/').filter(Boolean).pop();

    try {
      const success = await savePost(post, { dryRun });

      if (success) {
        results.successful++;
        console.log(`✓ Saved: ${postId}`);
      } else {
        results.failed++;
        results.errors.push({ postId, error: 'Save returned false' });
      }

      // Small delay to avoid rate limiting
      if (delay > 0 && !dryRun) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      results.failed++;
      results.errors.push({ postId, error: error.message });

      if (!continueOnError) {
        throw error;
      }
    }
  }

  console.log(`\n✓ Save complete: ${results.successful}/${results.total} successful`);

  if (results.failed > 0) {
    console.warn(`⚠️  ${results.failed} posts failed to save`);

    if (results.errors.length > 0 && results.errors.length <= 5) {
      console.warn('\nErrors:');
      results.errors.forEach(({ postId, error }) => {
        console.warn(`  - ${postId}: ${error}`);
      });
    }
  }

  return results;
}

/**
 * Prepare post data for Notion (without saving)
 *
 * @param {Object} post - Post object with analysis results
 * @param {string} profile - Instagram profile name
 * @returns {Object} - Notion-formatted data
 */
export function prepareNotionData(post, profile) {
  // This would typically be done by the analyzer
  // but can be used to manually prepare data if needed
  return {
    Instagram: { title: [{ text: { content: `@${profile}` } }] },
    Caption: { rich_text: [{ text: { content: post.caption || '' } }] },
    Data: { date: { start: post.date } },
    URL: { url: post.url },
    'Video Transcrito': {
      rich_text: [{ text: { content: post.transcription || '' } }]
    },
    // Additional fields would be filled by analyzer
  };
}

export default {
  savePost,
  savePosts,
  prepareNotionData
};
