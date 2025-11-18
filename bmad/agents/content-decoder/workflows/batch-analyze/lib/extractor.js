#!/usr/bin/env node

/**
 * Instagram Post Extractor
 * Extracts and filters Instagram posts by date range
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Execute command with logging and error handling
 */
function exec(command, description, options = {}) {
  console.log(`\n⚙️  ${description}...`);
  try {
    const result = execSync(command, {
      encoding: 'utf-8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
    console.log(`✓ ${description} complete`);
    return result ? result.trim() : '';
  } catch (error) {
    console.error(`✗ ${description} failed:`, error.message);
    throw error;
  }
}

/**
 * Parse markdown file and filter posts by date
 */
function parseAndFilterPosts(markdownFile, startDate, endDate) {
  const content = readFileSync(markdownFile, 'utf-8');
  const posts = [];

  const postBlocks = content.split(/---\n\n## Post \d+/);

  for (const block of postBlocks.slice(1)) {
    const urlMatch = block.match(/\*\*URL:\*\* (https:\/\/[^\n]+)/);
    const dateMatch = block.match(/\*\*Posted:\*\* (\d{4}-\d{2}-\d{2})/);
    const captionMatch = block.match(/\*\*Caption:\*\*\s*\n\n([\s\S]*?)(?:\n\n---|$)/);

    if (urlMatch && dateMatch) {
      const url = urlMatch[1];
      const date = dateMatch[1];
      const caption = captionMatch ? captionMatch[1].trim() : '';

      // Filter by date range
      if (date >= startDate && date <= endDate) {
        posts.push({
          url,
          date,
          caption,
          isReel: url.includes('/reel/'),
          transcription: '',
          screenshot: null,
        });
      }
    }
  }

  return posts;
}

/**
 * Extract Instagram posts for a profile
 *
 * @param {string} profile - Instagram profile username
 * @param {Object} options - Extraction options
 * @returns {Promise<Array>} - Array of extracted posts
 */
export async function extractPosts(profile, options = {}) {
  const {
    startDate = '2000-01-01',
    endDate = '2099-12-31',
    maxPosts = 100,
    cacheDir = '.cache',
    outputDir = null
  } = options;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`📸 Extracting posts from @${profile}`);
  console.log(`Period: ${startDate} to ${endDate}`);
  console.log('='.repeat(60));

  // Ensure cache directory exists
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
  }

  const captionsDir = join(cacheDir, 'captions');
  if (!existsSync(captionsDir)) {
    mkdirSync(captionsDir, { recursive: true });
  }

  try {
    // STEP 1: Extract posts using extract-instagram.js
    exec(
      `extract-instagram.js ${profile} --posts ${maxPosts} --output ${captionsDir}`,
      `Extracting posts from @${profile}`
    );

    // STEP 2: Parse and filter by date
    console.log(`\n⚙️  Filtering posts by date (${startDate} to ${endDate})...`);
    const captionsFile = join(captionsDir, `${profile}.md`);

    if (!existsSync(captionsFile)) {
      throw new Error(`Captions file not found: ${captionsFile}`);
    }

    const posts = parseAndFilterPosts(captionsFile, startDate, endDate);
    console.log(`✓ Filtered ${posts.length} posts in date range`);

    // STEP 3: Save filtered posts
    const postsFile = join(cacheDir, `${profile}-posts.json`);
    writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    console.log(`✓ Saved to: ${postsFile}`);

    return {
      posts,
      profile,
      postsFile,
      captionsFile,
      totalExtracted: posts.length,
      dateRange: { startDate, endDate }
    };

  } catch (error) {
    console.error(`\n✗ Failed to extract posts from @${profile}:`, error.message);
    throw error;
  }
}

/**
 * Extract posts from multiple profiles
 *
 * @param {Array<string>} profiles - Array of profile usernames
 * @param {Object} options - Extraction options
 * @returns {Promise<Object>} - Results for all profiles
 */
export async function extractMultipleProfiles(profiles, options = {}) {
  const results = {
    profiles: {},
    summary: {
      totalProfiles: profiles.length,
      totalPosts: 0,
      successful: 0,
      failed: 0
    }
  };

  for (const profile of profiles) {
    try {
      const result = await extractPosts(profile, options);
      results.profiles[profile] = result;
      results.summary.totalPosts += result.totalExtracted;
      results.summary.successful++;
    } catch (error) {
      results.profiles[profile] = { error: error.message };
      results.summary.failed++;
    }
  }

  return results;
}

export default {
  extractPosts,
  extractMultipleProfiles
};
