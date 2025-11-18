#!/usr/bin/env node

/**
 * WORKFLOW: Save Instagram Content to Airtable
 *
 * Purpose: High-level workflow to save analyzed Instagram posts to Airtable
 * Inputs:
 *   --posts (required) - JSON file path or JSON string of posts array
 *   --creator (required) - Creator username (e.g., @berudolph)
 *   --batch-size (optional) - Records per batch (default: 10, max: 10)
 *   --skip-duplicates (optional) - Skip duplicate URL checking (default: false)
 *   --dry-run (optional) - Test mode without saving (default: false)
 * Outputs: Summary of saved, skipped, and failed records
 *
 * This workflow:
 * 1. Finds or creates creator record
 * 2. Checks for duplicate posts (optional)
 * 3. Maps post data to Airtable schema
 * 4. Batch creates records
 * 5. Handles errors gracefully
 */

import { readFileSync } from 'fs';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { getAirtableBase } from '../../../core/clients/airtable.js';
import { execSync } from 'child_process';

const logger = createLogger({ toolName: 'workflow.save-instagram-airtable' });
const args = parseArgs();

/**
 * Map post data to Airtable fields format
 */
function mapPostToAirtableFields(post, creatorId) {
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

  // Add analysis data if available
  if (post.analysis) {
    const a = post.analysis;

    if (a.framework) fields['Framework'] = a.framework;
    if (a.hookCategories?.length) fields['Hook Categories'] = a.hookCategories;
    if (a.ctaType) fields['CTA Type'] = a.ctaType;
    if (a.emotionalTones?.length) fields['Emotional Tones'] = a.emotionalTones;
    if (a.visualStyle?.length) fields['Visual Style'] = a.visualStyle;
    if (a.painPoint) fields['Pain Point'] = a.painPoint;
    if (a.titleHook) fields['Title/Hook'] = a.titleHook;
    if (a.notes) fields['Analysis Notes'] = a.notes;
  }

  // Add screenshot attachment if available
  if (post.screenshot) {
    fields['Screenshot'] = [{ url: post.screenshot }];
  }

  return fields;
}

/**
 * Find or create creator record
 */
async function findOrCreateCreator(base, creatorName) {
  try {
    // Query for existing creator using primitive
    const queryResult = execSync(
      `node capabilities/primitives/storage/airtable-query.js --table "Creators" --formula "{Creator Name} = '${creatorName}'" --max-records 1`,
      { encoding: 'utf-8' }
    );

    const result = JSON.parse(queryResult);

    if (result.success && result.records.length > 0) {
      logger.info('Found existing creator', { creatorName, id: result.records[0].id });
      return result.records[0].id;
    }

    // Create new creator using primitive
    const createResult = execSync(
      `node capabilities/primitives/storage/airtable-create.js --table "Creators" --fields '${JSON.stringify({
        'Creator Name': creatorName,
        'Profile URL': `https://www.instagram.com/${creatorName.replace('@', '')}/`
      })}'`,
      { encoding: 'utf-8' }
    );

    const created = JSON.parse(createResult);

    if (!created.success) {
      throw new Error(`Failed to create creator: ${created.error}`);
    }

    logger.info('Created new creator', { creatorName, id: created.id });
    return created.id;

  } catch (error) {
    logger.error('Error finding/creating creator', { error: error.message });
    throw error;
  }
}

/**
 * Check if post already exists
 */
async function postExists(url) {
  try {
    const queryResult = execSync(
      `node capabilities/primitives/storage/airtable-query.js --table "Instagram Posts" --formula "{URL} = '${url}'" --max-records 1`,
      { encoding: 'utf-8' }
    );

    const result = JSON.parse(queryResult);
    return result.success && result.records.length > 0;

  } catch (error) {
    logger.warn('Could not check for duplicate', { error: error.message });
    return false;
  }
}

/**
 * Main workflow execution
 */
async function saveInstagramToAirtable() {
  try {
    if (!args.flags.posts) {
      throw new Error('--posts is required (JSON file path or JSON string)');
    }

    if (!args.flags.creator) {
      throw new Error('--creator is required (e.g., @berudolph)');
    }

    const creator = args.flags.creator;
    const batchSize = Math.min(parseInt(args.flags['batch-size']) || 10, 10);
    const skipDuplicates = args.flags['skip-duplicates'] === 'true';
    const dryRun = args.flags['dry-run'] === 'true';

    // Load posts data
    let posts;
    try {
      // Try as file path first
      const postsData = readFileSync(args.flags.posts, 'utf-8');
      posts = JSON.parse(postsData);
    } catch {
      // Try as JSON string
      posts = JSON.parse(args.flags.posts);
    }

    if (!Array.isArray(posts)) {
      throw new Error('Posts must be an array');
    }

    logger.info('Starting workflow', {
      creator,
      postsCount: posts.length,
      batchSize,
      dryRun
    });

    if (dryRun) {
      console.log('[DRY RUN MODE - No actual saves will be made]\n');
    }

    // Initialize base for direct operations
    const base = getAirtableBase();

    // Step 1: Find or create creator
    const creatorId = await findOrCreateCreator(base, creator);

    // Step 2: Process posts
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
      const batchRecords = [];

      // Filter and prepare batch
      for (const post of batch) {
        try {
          // Check for duplicates
          if (!skipDuplicates && !dryRun) {
            const exists = await postExists(post.url);
            if (exists) {
              console.log(`⏭️  Skipping duplicate: ${post.url}`);
              results.skipped++;
              continue;
            }
          }

          // Map post to Airtable format
          const fields = mapPostToAirtableFields(post, creatorId);
          batchRecords.push(fields);

        } catch (error) {
          logger.error('Error preparing post', { url: post.url, error: error.message });
          results.failed++;
          results.errors.push({
            url: post.url,
            error: error.message
          });
        }
      }

      // Create batch records
      if (batchRecords.length > 0) {
        try {
          if (dryRun) {
            console.log(`[DRY RUN] Would save ${batchRecords.length} posts`);
            results.successful += batchRecords.length;
          } else {
            const batchResult = execSync(
              `node capabilities/primitives/storage/airtable-batch.js --table "Instagram Posts" --records '${JSON.stringify(batchRecords)}'`,
              { encoding: 'utf-8' }
            );

            const result = JSON.parse(batchResult);

            if (result.success) {
              results.successful += result.count;
              console.log(`✓ Saved batch: ${result.count} records`);
            } else {
              throw new Error(result.error);
            }
          }

          // Rate limiting delay between batches
          if (i + batchSize < posts.length && !dryRun) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

        } catch (error) {
          logger.error('Batch save failed', { error: error.message });
          results.failed += batchRecords.length;
          results.errors.push({
            batch: `${i}-${i + batchRecords.length}`,
            error: error.message
          });
        }
      }
    }

    // Output summary
    const summary = {
      success: true,
      ...results
    };

    console.log('\n' + JSON.stringify(summary, null, 2));

    logger.info('Workflow completed', results);

    console.log(`\n✓ Save complete: ${results.successful} saved, ${results.skipped} skipped, ${results.failed} failed`);

    if (results.errors.length > 0 && results.errors.length <= 5) {
      console.log('\nErrors:');
      results.errors.forEach(({ url, error }) => {
        console.log(`  - ${url || 'batch'}: ${error}`);
      });
    }

  } catch (error) {
    logger.error('Workflow failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

saveInstagramToAirtable();
