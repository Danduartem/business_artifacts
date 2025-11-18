#!/usr/bin/env node

/**
 * @workflow instagram.batch-extract-and-process
 * @description Main orchestrator: Extract posts from multiple Instagram profiles by date range and process all content
 * @category instagram
 *
 * @composes workflow.instagram.extract-profile-posts-daterange, workflow.instagram.process-post-content, storage.airtable-batch
 *
 * @input usernames string - Comma-separated Instagram usernames (required)
 * @input start-date string - Start date in YYYY-MM-DD format (required)
 * @input end-date string - End date in YYYY-MM-DD format (required)
 * @input output-dir string - Output directory (optional, default: ./instagram_batch_output)
 * @input process-content boolean - Process post content (images/videos) (optional, default: true)
 * @input save-to-airtable boolean - Save results to Airtable (optional, default: false)
 * @input airtable-table string - Airtable table name (optional, required if save-to-airtable is true)
 * @input profile boolean - Use Chrome profile (optional)
 * @input headless boolean - Force headless Chrome (optional)
 * @input resume boolean - Resume from last checkpoint if inputs match (optional, default: false)
 *
 * @output results array - Array of processed results for each profile
 * @output success boolean - Operation success status
 *
 * @example
 * node instagram/batch-extract-and-process.js --usernames "user1,user2,user3" --start-date 2024-01-01 --end-date 2024-01-31
 */

import { execSync } from 'child_process';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = createLogger({ toolName: 'workflow.instagram.batch-extract-and-process' });
const args = parseArgs();
const state = createStateManager({ namespace: 'instagram-batch-extract' });

async function batchExtractAndProcess() {
  try {
    // Validate inputs
    if (!args.flags.usernames) {
      throw new Error('--usernames is required (comma-separated list)');
    }
    if (!args.flags['start-date']) {
      throw new Error('--start-date is required (format: YYYY-MM-DD)');
    }
    if (!args.flags['end-date']) {
      throw new Error('--end-date is required (format: YYYY-MM-DD)');
    }

    const usernames = args.flags.usernames.split(',').map(u => u.trim());
    const startDate = args.flags['start-date'];
    const endDate = args.flags['end-date'];
    const outputDir = args.flags['output-dir'] || join(process.cwd(), 'instagram_batch_output');
    const processContent = args.flags['process-content'] !== false;
    const saveToAirtable = args.flags['save-to-airtable'] === true;
    const airtableTable = args.flags['airtable-table'];
    const resumeRun = args.flags.resume === true;
    const headlessMode = args.flags.headless === true;

    if (saveToAirtable && !airtableTable) {
      throw new Error('--airtable-table is required when --save-to-airtable is enabled');
    }

    // Create output directory
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Determine if we should resume from previous state
    const runSignature = JSON.stringify({
      usernames,
      startDate,
      endDate,
      processContent,
      saveToAirtable,
      airtableTable: airtableTable || null
    });

    const previousSignature = state.get('runSignature');
    let resumeAvailable = false;

    if (resumeRun) {
      if (!previousSignature) {
        logger.info('No previous state found, starting new run');
        state.clear();
        state.set('runSignature', runSignature);
      } else if (previousSignature !== runSignature) {
        logger.warn('Resume requested but inputs changed, resetting state');
        state.clear();
        state.set('runSignature', runSignature);
      } else {
        resumeAvailable = true;
      }
    } else {
      if (previousSignature) {
        logger.info('Clearing previous state before starting new run');
      }
      state.clear();
      state.set('runSignature', runSignature);
    }

    const results = resumeAvailable ? JSON.parse(JSON.stringify(state.get('results', []))) : [];
    const lastProcessedIndex = resumeAvailable ? state.get('lastProcessedProfile', 0) : 0;

    logger.info('Starting batch extraction and processing', {
      usernames: usernames.length,
      startDate,
      endDate,
      processContent,
      resume: resumeAvailable
    });

    // Process each profile
    for (let i = lastProcessedIndex; i < usernames.length; i++) {
      const username = usernames[i];
      const profileResult = {
        username,
        status: 'pending',
        posts: [],
        errors: []
      };

      try {
        logger.info(`Processing profile ${i + 1}/${usernames.length}`, { username });

        // STEP 1: Extract posts from profile
        logger.info('Step 1: Extracting posts from profile', { username });

        const profileFlag = args.flags.profile ? ' --profile' : '';
        const headlessFlag = headlessMode ? ' --headless' : '';
        const extractCmd = `node ${join(__dirname, 'extract-profile-posts-daterange.js')} --username "${username}" --start-date "${startDate}" --end-date "${endDate}"${profileFlag}${headlessFlag}`;

        let extractOutput;
        try {
          extractOutput = execSync(extractCmd, {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'inherit']
          });
        } catch (cmdError) {
          throw new Error(`Failed to extract posts: ${cmdError.message}`);
        }

        const extractResult = JSON.parse(extractOutput);

        if (!extractResult.success) {
          throw new Error(`Extraction failed: ${extractResult.error}`);
        }

        profileResult.postsFound = extractResult.totalPosts;
        logger.info('Posts extracted', { username, count: extractResult.totalPosts });

        // STEP 2: Process each post if enabled
        if (processContent && extractResult.posts && extractResult.posts.length > 0) {
          logger.info('Step 2: Processing post content', { username, count: extractResult.posts.length });

          const postOutputDir = join(outputDir, username);
          if (!existsSync(postOutputDir)) {
            mkdirSync(postOutputDir, { recursive: true });
          }

          for (let j = 0; j < extractResult.posts.length; j++) {
            const post = extractResult.posts[j];

            try {
              logger.info(`Processing post ${j + 1}/${extractResult.posts.length}`, {
                username,
                url: post.url
              });

              const processCmd = `node ${join(__dirname, 'process-post-content.js')} --url "${post.url}" --output-dir "${postOutputDir}"${profileFlag}${headlessFlag}`;

              let processOutput;
              try {
                processOutput = execSync(processCmd, {
                  encoding: 'utf8',
                  stdio: ['pipe', 'pipe', 'inherit']
                });
              } catch (cmdError) {
                throw new Error(`Failed to process post: ${cmdError.message}`);
              }

              const processResult = JSON.parse(processOutput);

              if (processResult.success) {
                profileResult.posts.push(processResult.post);
                logger.info('Post processed successfully', {
                  username,
                  shortcode: processResult.post.shortcode
                });
              } else {
                profileResult.errors.push({
                  url: post.url,
                  error: processResult.error
                });
                logger.warn('Post processing failed', {
                  username,
                  url: post.url,
                  error: processResult.error
                });
              }

              // Small delay between posts to avoid rate limiting
              await new Promise(resolve => setTimeout(resolve, 3000));

            } catch (postError) {
              profileResult.errors.push({
                url: post.url,
                error: postError.message
              });
              logger.warn('Failed to process post', {
                username,
                url: post.url,
                error: postError.message
              });
            }
          }
        } else if (!processContent) {
          // Just include the basic post data without processing
          profileResult.posts = extractResult.posts;
        }

        profileResult.status = 'completed';
        profileResult.processedPosts = profileResult.posts.length;

      } catch (profileError) {
        profileResult.status = 'failed';
        profileResult.error = profileError.message;
        logger.error('Profile processing failed', { username, error: profileError.message });
      }

      results.push(profileResult);

      // Checkpoint after each profile
      state.set('lastProcessedProfile', i + 1);
      state.set('results', results);
      state.createCheckpoint();

      logger.info('Profile checkpoint saved', { username, index: i + 1 });
    }

    // STEP 3: Save to Airtable if requested
    if (saveToAirtable && airtableTable) {
      logger.info('Step 3: Saving to Airtable', { table: airtableTable });

      try {
        // Flatten results for Airtable
        const airtableRecords = [];

        for (const profileResult of results) {
          if (profileResult.status === 'completed' && profileResult.posts) {
            for (const post of profileResult.posts) {
              const record = {
                Username: profileResult.username,
                URL: post.url,
                Shortcode: post.shortcode,
                Caption: post.caption || '',
                Date: post.date,
                Timestamp: post.timestamp,
                MediaType: post.mediaType,
                IsCarousel: post.isCarousel || false,
                Screenshot: post.screenshot || '',
                ExtractedAt: post.extractedAt
              };

              // Add processed media info
              if (post.processedMedia && post.processedMedia.length > 0) {
                const textContent = post.processedMedia
                  .filter(m => m.extractedText)
                  .map(m => m.extractedText)
                  .join('\n\n---\n\n');

                if (textContent) {
                  record.ExtractedText = textContent;
                }

                const videoTranscript = post.processedMedia
                  .filter(m => m.transcription)
                  .map(m => {
                    return m.transcription.segments
                      .map(s => `[${s.range}] ${s.text}`)
                      .join('\n');
                  })
                  .join('\n\n---\n\n');

                if (videoTranscript) {
                  record.VideoTranscript = videoTranscript;
                }
              }

              airtableRecords.push(record);
            }
          }
        }

        // Save in batches of 10 (Airtable limit)
        const batchSize = 10;
        for (let i = 0; i < airtableRecords.length; i += batchSize) {
          const batch = airtableRecords.slice(i, i + batchSize);

          const airtableCmd = `node ${join(__dirname, '../../primitives/storage/airtable-batch.js')} --table "${airtableTable}" --records '${JSON.stringify(batch)}'`;

          try {
            execSync(airtableCmd, {
              encoding: 'utf8',
              stdio: ['pipe', 'pipe', 'inherit']
            });

            logger.info('Batch saved to Airtable', {
              batch: Math.floor(i / batchSize) + 1,
              records: batch.length
            });
          } catch (airtableError) {
            logger.error('Failed to save batch to Airtable', {
              batch: Math.floor(i / batchSize) + 1,
              error: airtableError.message
            });
          }
        }

        logger.info('Airtable save complete', { totalRecords: airtableRecords.length });

      } catch (airtableError) {
        logger.error('Airtable save failed', { error: airtableError.message });
      }
    }

    // STEP 4: Save final summary
    const summaryFile = join(outputDir, 'batch_summary.json');
    const summary = {
      success: true,
      dateRange: {
        start: startDate,
        end: endDate
      },
      profiles: usernames,
      results,
      totalProfiles: usernames.length,
      successfulProfiles: results.filter(r => r.status === 'completed').length,
      failedProfiles: results.filter(r => r.status === 'failed').length,
      totalPostsProcessed: results.reduce((sum, r) => sum + (r.processedPosts || 0), 0),
      processedAt: new Date().toISOString()
    };

    writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

    console.log(JSON.stringify(summary));
    logger.info('Batch processing complete', {
      output: outputDir,
      profiles: summary.totalProfiles,
      posts: summary.totalPostsProcessed
    });

  } catch (error) {
    logger.error('Batch processing failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

batchExtractAndProcess();
