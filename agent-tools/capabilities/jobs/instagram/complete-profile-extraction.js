#!/usr/bin/env node
/**
 * @job instagram.complete-profile-extraction
 * @description Complete pipeline: Get post URLs → Extract full post data → Download media → Transcribe videos
 * @category instagram
 *
 * @orchestrates instagram.extract-profile-posts-puppeteer, instagram.extract-post-full, media.download-and-transcribe
 *
 * @input username string - Instagram username (required)
 * @input start-date string - Start date YYYY-MM-DD (required)
 * @input end-date string - End date YYYY-MM-DD (required)
 * @input profile boolean - Use Chrome profile (default: false)
 * @input transcribe boolean - Transcribe videos (default: true)
 * @input resume boolean - Resume from checkpoint (default: false)
 * @input dry-run boolean - Validate only (default: false)
 *
 * @output totalPosts number - Total posts extracted
 * @output successfulPosts number - Successfully processed
 * @output failedPosts number - Failed to process
 * @output outputFile string - Path to JSON export
 *
 * @example
 * node complete-profile-extraction.js --username berudolph --start-date 2025-11-01 --end-date 2025-11-30 --profile
 */

import { parseArgs } from 'node:util';
import { spawn } from 'node:child_process';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';
import { getEventBus } from '../../../core/events/index.js';
import { getAgentToolsRoot } from '../../../core/utils/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile, mkdir, access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = createLogger({
  toolName: 'job.instagram.complete-profile-extraction'
});

const state = createStateManager({
  namespace: 'job-complete-profile-extraction'
});

const events = getEventBus();

// Helper to execute workflows
async function executeWorkflow(workflowPath, params) {
  return new Promise((resolve, reject) => {
    const workflowFullPath = path.join(getAgentToolsRoot(), 'capabilities/workflows', workflowPath);

    // Convert params object to command line args
    const args = Object.entries(params).flatMap(([key, value]) => {
      if (value === true) return [`--${key}`];
      if (value === false) return [];
      if (typeof value === 'object') return [`--${key}`, JSON.stringify(value)];
      return [`--${key}`, String(value)];
    });

    logger.info('Executing workflow', { workflow: workflowPath, params });

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
        logger.error('Workflow failed', {
          workflow: workflowPath,
          code,
          stderr
        });
        reject(new Error(`Workflow failed with code ${code}: ${stderr}`));
      } else {
        try {
          // Parse JSON output
          const result = JSON.parse(stdout);
          logger.info('Workflow completed', {
            workflow: workflowPath,
            success: result.success
          });
          resolve(result);
        } catch (error) {
          logger.error('Failed to parse workflow output', {
            workflow: workflowPath,
            stdout,
            error: error.message
          });
          reject(new Error('Failed to parse workflow output: ' + error.message));
        }
      }
    });

    child.on('error', (error) => {
      logger.error('Failed to spawn workflow', {
        workflow: workflowPath,
        error: error.message
      });
      reject(error);
    });
  });
}

// Helper to emit structured progress events for monitoring
// These JSON events can be easily filtered and parsed by the monitor
function emitProgress(data) {
  console.log(JSON.stringify({
    type: 'PROGRESS',
    timestamp: new Date().toISOString(),
    ...data
  }));
}

// Parse command line arguments
const { values } = parseArgs({
  options: {
    username: { type: 'string' },
    'start-date': { type: 'string' },
    'end-date': { type: 'string' },
    profile: { type: 'boolean', default: false },
    transcribe: { type: 'boolean', default: true },
    resume: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
    'max-scrolls': { type: 'string', default: '30' },
    'urls-file': { type: 'string' },
    'skip-url-extraction': { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h' }
  }
});

// Help flag
if (values.help) {
  console.log(`
Usage: node complete-profile-extraction.js [options]

Description:
  Complete Instagram profile extraction pipeline:

  1. Extract all post URLs from profile (with scrolling)
  2. Extract full data for each post (caption, format, screenshot, etc.)
  3. Download media files (optional)
  4. Transcribe videos (optional)
  5. Export to structured JSON

  Supports checkpointing - use --resume to continue after interruption.

Options:
  --username <string>        Instagram username (required unless using --urls-file)
  --start-date <date>        Start date YYYY-MM-DD (required unless using --urls-file)
  --end-date <date>          End date YYYY-MM-DD (required unless using --urls-file)
  --profile                  Use Chrome profile (logged-in session)
  --transcribe               Transcribe videos with Whisper (enabled by default)
  --max-scrolls <number>     Max scrolls for post collection (default: 30)
  --urls-file <path>         Skip URL extraction, load from existing JSON file
  --skip-url-extraction      Skip URL extraction (use with --resume if URLs already in state)
  --resume                   Resume from last checkpoint
  --dry-run                  Validate dependencies only
  --help, -h                 Show this help

Examples:
  # Extract all posts from November 2025
  node complete-profile-extraction.js \\
    --username berudolph \\
    --start-date 2025-11-01 \\
    --end-date 2025-11-30 \\
    --profile

  # With video transcription
  node complete-profile-extraction.js \\
    --username berudolph \\
    --start-date 2025-11-01 \\
    --end-date 2025-11-30 \\
    --profile \\
    --transcribe

  # Resume interrupted job
  node complete-profile-extraction.js --resume

Output:
  {
    "success": true,
    "totalPosts": 25,
    "successfulPosts": 24,
    "failedPosts": 1,
    "outputFile": "temp/instagram-{username}-{date}.json",
    "summary": {
      "postsWithScreenshots": 24,
      "videosTranscribed": 8,
      "duration": "15m 30s"
    }
  }
  `);
  process.exit(0);
}

async function main() {
  const startTime = Date.now();

  try {
    logger.info('Starting complete Instagram profile extraction', { params: values });

    // Ensure output directory exists
    const outputDir = path.join(getAgentToolsRoot(), 'temp');
    await mkdir(outputDir, { recursive: true });

    // Dry-run mode
    if (values['dry-run']) {
      logger.info('Dry-run mode: validation successful');
      console.log(JSON.stringify({
        success: true,
        mode: 'dry-run',
        message: 'All dependencies validated successfully'
      }));
      process.exit(0);
    }

    // Validate required inputs (unless resuming or using --urls-file)
    if (!values.resume && !values['urls-file']) {
      if (!values.username) {
        throw new Error('--username is required (unless using --urls-file)');
      }
      if (!values['start-date'] || !values['end-date']) {
        throw new Error('--start-date and --end-date are required (unless using --urls-file)');
      }
    }

    // Initialize or resume job state
    let jobState = state.get('jobState');

    if (values.resume && jobState) {
      logger.info('Resuming from checkpoint', {
        stage: jobState.stage,
        processedPosts: jobState.processedPosts?.length || 0
      });
    } else {
      jobState = {
        stage: 'initialized',
        username: values.username,
        startDate: values['start-date'],
        endDate: values['end-date'],
        useProfile: values.profile,
        transcribe: values.transcribe,
        postUrls: [],
        processedPosts: [],
        failedPosts: [],
        stats: {
          totalPosts: 0,
          successfulPosts: 0,
          failedPosts: 0,
          videosTranscribed: 0
        }
      };
    }

    state.set('jobState', jobState);
    state.createCheckpoint();

    // BROWSER CHECK: Ensure browser is running before starting stages
    logger.info('Checking if browser is running');
    let browserRunning = false;

    try {
      const response = await fetch('http://localhost:9222/json/version');
      if (response.ok) {
        browserRunning = true;
        logger.info('Browser already running');
      }
    } catch (err) {
      logger.info('Browser not running, will auto-start');
    }

    if (!browserRunning) {
      logger.info('Auto-starting browser', { profile: jobState.useProfile });

      try {
        const browserResult = await executeWorkflow('../primitives/browser/start.js', {
          profile: jobState.useProfile,
          'no-kill': false
        });

        if (browserResult.success) {
          logger.info('Browser started successfully', {
            browserId: browserResult.browserId,
            port: browserResult.port
          });
        } else {
          throw new Error('Browser start returned success: false');
        }
      } catch (error) {
        logger.error('Failed to auto-start browser', {
          error: error.message
        });
        throw new Error('Browser auto-start failed. Please start browser manually with: node capabilities/primitives/browser/start.js --profile');
      }
    }

    // STAGE 1: Get all post URLs
    if (jobState.stage === 'initialized' || jobState.stage === 'extracting-urls') {
      // Check if we should skip URL extraction
      if (values['skip-url-extraction'] || values['urls-file']) {
        if (values['urls-file']) {
          logger.info('Stage 1: Loading URLs from file', { file: values['urls-file'] });

          // Check if file exists
          try {
            await access(values['urls-file'], constants.R_OK);
          } catch (err) {
            throw new Error(`URLs file not found or not readable: ${values['urls-file']}`);
          }

          const urlsData = JSON.parse(await readFile(values['urls-file'], 'utf-8'));
          jobState.postUrls = urlsData.posts || [];
          jobState.stats.totalPosts = jobState.postUrls.length;

          // Use metadata from file if available, otherwise use CLI flags
          jobState.username = urlsData.metadata?.username || urlsData.username || values.username || jobState.username;
          jobState.startDate = urlsData.metadata?.dateRange?.start || urlsData.dateRange?.start || values['start-date'] || jobState.startDate;
          jobState.endDate = urlsData.metadata?.dateRange?.end || urlsData.dateRange?.end || values['end-date'] || jobState.endDate;

          logger.info('URLs loaded from file', {
            count: jobState.postUrls.length,
            username: jobState.username
          });
        } else {
          logger.info('Stage 1: Skipping URL extraction (using existing state)', {
            urlsInState: jobState.postUrls?.length || 0
          });

          if (!jobState.postUrls || jobState.postUrls.length === 0) {
            throw new Error('No URLs in state. Cannot skip URL extraction without existing URLs.');
          }
        }
      } else {
        // Original URL extraction workflow
        logger.info('Stage 1: Extracting post URLs from profile', {
          username: jobState.username
        });
        emitProgress({ stage: '1/4', message: `Extracting URLs for @${jobState.username}` });
        console.log(`\n=== Stage 1: Extracting URLs for @${jobState.username} ===`);

        jobState.stage = 'extracting-urls';
        state.set('jobState', jobState);
        state.createCheckpoint();

        const urlsResult = await executeWorkflow('instagram/extract-profile-posts-puppeteer.js', {
          username: jobState.username,
          'start-date': jobState.startDate,
          'end-date': jobState.endDate,
          'max-scrolls': values['max-scrolls']
        });

        if (urlsResult.success) {
          jobState.postUrls = urlsResult.posts || [];
          jobState.stats.totalPosts = jobState.postUrls.length;
          logger.info('Post URLs extracted', { count: jobState.postUrls.length });
        } else {
          throw new Error('Failed to extract post URLs');
        }
      }

      jobState.stage = 'extracting-posts';
      state.set('jobState', jobState);
      state.createCheckpoint();
    }

    // STAGE 2: Extract full data for each post
    logger.info('Stage 2: Extracting full post data', {
      totalPosts: jobState.postUrls.length,
      remaining: jobState.postUrls.length - jobState.processedPosts.length
    });
    emitProgress({ stage: '2/4', message: `Extracting ${jobState.postUrls.length} posts` });
    console.log(`\n=== Stage 2: Extracting ${jobState.postUrls.length} posts ===`);

    for (const postData of jobState.postUrls) {
      // Skip if already processed
      if (jobState.processedPosts.find(p => p.url === postData.url)) {
        logger.info('Post already processed, skipping', { url: postData.url });
        continue;
      }

      try {
        logger.info('Extracting post', { url: postData.url });

        const postResult = await executeWorkflow('instagram/extract-post-full.js', {
          url: postData.url,
          profile: jobState.useProfile,
          screenshot: true
        });

        if (postResult.success) {
          jobState.processedPosts.push(postResult);
          jobState.stats.successfulPosts++;

          logger.info('Post extracted successfully', {
            postId: postResult.postId,
            format: postResult.format
          });
          emitProgress({
            stage: '2/4',
            current: jobState.stats.successfulPosts,
            total: jobState.postUrls.length,
            message: `Post ${jobState.stats.successfulPosts}/${jobState.postUrls.length}`,
            type: 'posts'
          });
          console.log(`  ✓ Post ${jobState.stats.successfulPosts}/${jobState.postUrls.length}: ${postResult.format}`);
        } else {
          throw new Error('Post extraction returned success: false');
        }

      } catch (error) {
        logger.error('Post extraction failed', {
          url: postData.url,
          error: error.message
        });
        jobState.failedPosts.push({
          url: postData.url,
          error: error.message
        });
        jobState.stats.failedPosts++;
      }

      // Checkpoint after each post
      state.set('jobState', jobState);
      state.createCheckpoint();
    }

    // STAGE 3: Transcribe videos (if requested)
    if (jobState.transcribe) {
      logger.info('Stage 3: Transcribing videos');
      jobState.stage = 'transcribing';
      state.set('jobState', jobState);
      state.createCheckpoint();

      const videoPosts = jobState.processedPosts.filter(
        p => p.format === 'Reel' || p.format === 'Video'
      );

      emitProgress({ stage: '3/4', message: `Transcribing ${videoPosts.length} videos` });
      console.log(`\n=== Stage 3: Transcribing ${videoPosts.length} videos ===`);

      for (const post of videoPosts) {
        if (post.mediaUrls && post.mediaUrls.length > 0) {
          try {
            logger.info('Transcribing video', { postId: post.postId });

            // Create unique output directory for this video
            const transcriptDir = path.join(getAgentToolsRoot(), 'temp', 'transcriptions', post.postId);

            const transcribeResult = await executeWorkflow('media/download-and-transcribe.js', {
              url: post.url,
              language: 'pt',
              'output-dir': transcriptDir
            });

            if (transcribeResult.success) {
              // Read the transcript file and embed content
              try {
                const transcriptContent = await readFile(transcribeResult.transcript, 'utf-8');
                post.videoTranscription = {
                  path: transcribeResult.transcript,
                  content: transcriptContent
                };
                jobState.stats.videosTranscribed++;
                logger.info('Transcript embedded', {
                  postId: post.postId,
                  length: transcriptContent.length
                });
                emitProgress({
                  stage: '3/4',
                  current: jobState.stats.videosTranscribed,
                  total: videoPosts.length,
                  message: `Video ${jobState.stats.videosTranscribed}/${videoPosts.length} transcribed`,
                  type: 'videos'
                });
                console.log(`  ✓ Video ${jobState.stats.videosTranscribed}/${videoPosts.length} transcribed`);
              } catch (readError) {
                logger.error('Failed to read transcript file', {
                  postId: post.postId,
                  path: transcribeResult.transcript,
                  error: readError.message
                });
                // Store path only if we can't read content
                post.videoTranscription = {
                  path: transcribeResult.transcript,
                  error: 'Failed to read transcript file'
                };
              }
            }
          } catch (error) {
            logger.error('Transcription failed', {
              postId: post.postId,
              error: error.message
            });
          }
        }

        // Checkpoint every 5 videos
        if (jobState.stats.videosTranscribed % 5 === 0) {
          state.set('jobState', jobState);
          state.createCheckpoint();
        }
      }
    }

    // STAGE 4: Export results
    logger.info('Stage 4: Exporting results');
    emitProgress({ stage: '4/4', message: 'Exporting results' });
    jobState.stage = 'exporting';
    state.set('jobState', jobState);
    state.createCheckpoint();

    const timestamp = new Date().toISOString().split('T')[0];
    const outputFileName = `instagram-${jobState.username}-${timestamp}.json`;
    const outputPath = path.join(outputDir, outputFileName);

    const exportData = {
      metadata: {
        username: jobState.username,
        dateRange: {
          start: jobState.startDate,
          end: jobState.endDate
        },
        extractedAt: new Date().toISOString(),
        useProfile: jobState.useProfile
      },
      summary: {
        totalPosts: jobState.stats.totalPosts,
        successfulPosts: jobState.stats.successfulPosts,
        failedPosts: jobState.stats.failedPosts,
        videosTranscribed: jobState.stats.videosTranscribed
      },
      posts: jobState.processedPosts,
      failed: jobState.failedPosts
    };

    await writeFile(outputPath, JSON.stringify(exportData, null, 2), 'utf-8');
    logger.info('Export complete', { path: outputPath });

    // Calculate duration
    const duration = Date.now() - startTime;
    const durationFormatted = formatDuration(duration);

    const output = {
      success: true,
      totalPosts: jobState.stats.totalPosts,
      successfulPosts: jobState.stats.successfulPosts,
      failedPosts: jobState.stats.failedPosts,
      outputFile: outputPath,
      summary: {
        videosTranscribed: jobState.stats.videosTranscribed,
        duration: durationFormatted
      }
    };

    emitProgress({ stage: 'complete', message: 'Job complete', summary: output.summary });
    console.log(JSON.stringify(output));
    console.log(`\n=== ✓ Job Complete ===`);
    console.log(`Posts: ${output.summary.successfulPosts}/${output.summary.totalPosts} successful`);
    console.log(`Videos transcribed: ${output.summary.videosTranscribed}`);
    console.log(`Duration: ${output.summary.duration}`);
    console.log(`Output: ${output.outputFile}\n`);
    logger.info('Job completed successfully', { summary: output.summary });

    // Clean up checkpoint
    state.clear();

    // Publish completion event
    events.publish('job.completed', {
      jobName: 'instagram.complete-profile-extraction',
      summary: output.summary
    });

    // Exit successfully
    process.exit(0);

  } catch (error) {
    logger.error('Job failed', {
      error: error.message,
      stack: error.stack,
      stage: state.get('jobState')?.stage
    });

    events.publish('job.failed', {
      jobName: 'instagram.complete-profile-extraction',
      error: error.message,
      stage: state.get('jobState')?.stage
    });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      stage: state.get('jobState')?.stage,
      checkpoint: 'Use --resume to continue from last checkpoint'
    }));

    process.exit(1);
  }
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
