#!/usr/bin/env node

/**
 * Airtable Saver
 * Saves analyzed Instagram posts to Airtable with proper schema mapping
 */

import Airtable from 'airtable';
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(dirname(__dirname), '.env');

// Load environment variables
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

/**
 * Initialize Airtable client
 */
function getAirtableBase() {
  const apiKey = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey) {
    throw new Error('AIRTABLE_API_KEY or AIRTABLE_TOKEN environment variable required');
  }

  if (!baseId) {
    throw new Error('AIRTABLE_BASE_ID environment variable required');
  }

  const airtable = new Airtable({ apiKey });
  return airtable.base(baseId);
}

/**
 * Find or create creator record
 *
 * @param {Object} base - Airtable base instance
 * @param {string} creatorName - Instagram username (e.g., @berudolph)
 * @returns {Promise<string>} - Creator record ID
 */
async function findOrCreateCreator(base, creatorName) {
  try {
    // Search for existing creator
    const records = await base('Creators')
      .select({
        filterByFormula: `{Creator Name} = '${creatorName}'`,
        maxRecords: 1
      })
      .firstPage();

    if (records.length > 0) {
      return records[0].id;
    }

    // Create new creator
    const newRecords = await base('Creators').create([
      {
        fields: {
          'Creator Name': creatorName,
          'Profile URL': `https://www.instagram.com/${creatorName.replace('@', '')}/`
        }
      }
    ]);

    console.log(`✓ Created new creator: ${creatorName}`);
    return newRecords[0].id;

  } catch (error) {
    console.error(`✗ Error finding/creating creator ${creatorName}:`, error.message);
    throw error;
  }
}

/**
 * Check if post already exists in Airtable
 *
 * @param {Object} base - Airtable base instance
 * @param {string} url - Post URL
 * @returns {Promise<boolean>} - True if exists
 */
async function postExists(base, url) {
  try {
    const records = await base('Instagram Posts')
      .select({
        filterByFormula: `{URL} = '${url}'`,
        maxRecords: 1
      })
      .firstPage();

    return records.length > 0;
  } catch (error) {
    console.warn(`⚠️  Could not check for duplicate: ${error.message}`);
    return false;
  }
}

/**
 * Map analyzed post data to Airtable format
 *
 * @param {Object} post - Post object from analyzer
 * @param {string} creatorId - Airtable creator record ID
 * @returns {Object} - Airtable-formatted fields
 */
function mapPostToAirtable(post, creatorId) {
  const fields = {
    'URL': post.url,
    'Creator': [creatorId],
    'Date Posted': post.date,
    'Caption': post.caption || '',
    'Format': post.isReel ? 'Reel' : 'Single Image',
    'Is Reel': post.isReel || false,
    'Video Transcription': post.transcription || '',
    'Archived': false,
  };

  // Add analyzed data if available
  if (post.analysis) {
    const a = post.analysis;

    if (a.framework) {
      fields['Framework'] = a.framework;
    }

    if (a.hookCategories && Array.isArray(a.hookCategories)) {
      fields['Hook Categories'] = a.hookCategories;
    }

    if (a.ctaType) {
      fields['CTA Type'] = a.ctaType;
    }

    if (a.emotionalTones && Array.isArray(a.emotionalTones)) {
      fields['Emotional Tones'] = a.emotionalTones;
    }

    if (a.visualStyle && Array.isArray(a.visualStyle)) {
      fields['Visual Style'] = a.visualStyle;
    }

    if (a.painPoint) {
      fields['Pain Point'] = a.painPoint;
    }

    if (a.titleHook) {
      fields['Title/Hook'] = a.titleHook;
    }

    if (a.notes) {
      fields['Analysis Notes'] = a.notes;
    }
  }

  // Add screenshot as attachment if available
  if (post.screenshot) {
    fields['Screenshot'] = [
      {
        url: post.screenshot // Airtable will fetch and store the image
      }
    ];
  }

  return fields;
}

/**
 * Save a single post to Airtable
 *
 * @param {Object} post - Post object with analysis
 * @param {Object} options - Save options
 * @returns {Promise<Object>} - Created record
 */
export async function savePostToAirtable(post, options = {}) {
  const {
    creatorName = '@unknown',
    skipDuplicateCheck = false,
    dryRun = false
  } = options;

  if (dryRun) {
    console.log(`[DRY RUN] Would save post: ${post.url}`);
    return { id: 'dry-run', success: true };
  }

  try {
    const base = getAirtableBase();

    // Check for duplicates
    if (!skipDuplicateCheck) {
      const exists = await postExists(base, post.url);
      if (exists) {
        console.log(`⏭️  Skipping duplicate: ${post.url}`);
        return { id: null, skipped: true, reason: 'duplicate' };
      }
    }

    // Get or create creator
    const creatorId = await findOrCreateCreator(base, creatorName);

    // Map post data to Airtable format
    const fields = mapPostToAirtable(post, creatorId);

    // Create record
    const records = await base('Instagram Posts').create([{ fields }]);

    console.log(`✓ Saved to Airtable: ${post.url}`);
    return { id: records[0].id, success: true };

  } catch (error) {
    console.error(`✗ Failed to save ${post.url}:`, error.message);
    throw error;
  }
}

/**
 * Save multiple posts to Airtable in batches
 *
 * @param {Array<Object>} posts - Array of post objects
 * @param {Object} options - Save options
 * @returns {Promise<Object>} - Results summary
 */
export async function savePostsToAirtable(posts, options = {}) {
  const {
    creatorName = '@unknown',
    batchSize = 10, // Airtable allows max 10 records per create
    skipDuplicateCheck = false,
    dryRun = false,
    continueOnError = true
  } = options;

  console.log(`\n⚙️  Saving ${posts.length} posts to Airtable...`);

  if (dryRun) {
    console.log(`[DRY RUN MODE - No actual saves will be made]`);
  }

  const results = {
    successful: 0,
    failed: 0,
    skipped: 0,
    total: posts.length,
    errors: []
  };

  // Process in batches
  for (let i = 0; i < posts.length; i += batchSize) {
    const batch = posts.slice(i, Math.min(i + batchSize, posts.length));

    for (const post of batch) {
      const postId = post.url.split('/').filter(Boolean).pop();

      try {
        const result = await savePostToAirtable(post, {
          creatorName,
          skipDuplicateCheck,
          dryRun
        });

        if (result.skipped) {
          results.skipped++;
        } else if (result.success) {
          results.successful++;
        }

      } catch (error) {
        results.failed++;
        results.errors.push({ postId, error: error.message });

        if (!continueOnError) {
          throw error;
        }
      }
    }

    // Small delay between batches to avoid rate limits
    if (i + batchSize < posts.length && !dryRun) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n✓ Save complete: ${results.successful} saved, ${results.skipped} skipped, ${results.failed} failed`);

  if (results.errors.length > 0 && results.errors.length <= 5) {
    console.warn('\nErrors:');
    results.errors.forEach(({ postId, error }) => {
      console.warn(`  - ${postId}: ${error}`);
    });
  }

  return results;
}

/**
 * Test Airtable connection
 *
 * @returns {Promise<boolean>} - True if connection successful
 */
export async function testAirtableConnection() {
  try {
    const base = getAirtableBase();

    // Try to read first record from Instagram Posts
    await base('Instagram Posts')
      .select({ maxRecords: 1 })
      .firstPage();

    console.log('✓ Airtable connection successful');
    return true;

  } catch (error) {
    console.error('✗ Airtable connection failed:', error.message);

    if (error.message.includes('NOT_FOUND')) {
      console.error('  → Check that AIRTABLE_BASE_ID is correct');
      console.error('  → Verify the "Instagram Posts" table exists');
    } else if (error.message.includes('AUTHENTICATION')) {
      console.error('  → Check that AIRTABLE_API_KEY is correct');
    }

    return false;
  }
}

export default {
  savePostToAirtable,
  savePostsToAirtable,
  testAirtableConnection,
  findOrCreateCreator,
  postExists
};
