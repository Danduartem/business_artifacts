#!/usr/bin/env node
/**
 * @job instagram.bulk-content-extraction
 * @description Extracts all Instagram posts from specified profiles within a date range, downloads media, transcribes videos, and exports to structured format
 * @category instagram
 *
 * @orchestrates instagram.extract-profile, media.download-and-transcribe, content.format-export
 *
 * @input profiles array - List of Instagram usernames to process
 * @input startDate string - Start date for post extraction (YYYY-MM-DD)
 * @input endDate string - End date for post extraction (YYYY-MM-DD)
 * @input outputFormat string - Output format (json, csv, markdown) (optional, default: json)
 * @input includeStories boolean - Include stories if available (optional, default: false)
 *
 * @output processedPosts number - Total number of posts processed
 * @output downloadedMedia number - Total media files downloaded
 * @output transcribedVideos number - Total videos transcribed
 * @output outputFile string - Path to the generated output file
 * @output summary object - Detailed processing summary
 *
 * @example
 * node bulk-content-extraction.js --profiles '["user1","user2"]' --start-date "2024-01-01" --end-date "2024-01-31"
 *
 * @example-output
 * {
 *   "success": true,
 *   "processedPosts": 87,
 *   "downloadedMedia": 145,
 *   "transcribedVideos": 23,
 *   "outputFile": "instagram-export-2024-01-31.json",
 *   "summary": {
 *     "totalProfiles": 2,
 *     "successfulProfiles": 2,
 *     "failedProfiles": 0,
 *     "duration": "1h 24m"
 *   }
 * }
 */

import { parseArgs } from 'node:util';
import { spawn } from 'node:child_process';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';
import { getEventBus } from '../../../core/events/index.js';
import { getAgentToolsRoot } from '../../../core/utils/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = createLogger({
  toolName: 'job.instagram.bulk-content-extraction'
});

const state = createStateManager({
  namespace: 'job-bulk-content-extraction'
});

const events = getEventBus();

// Helper to execute workflows
async function executeWorkflow(workflowPath, params) {
  return new Promise((resolve, reject) => {
    const workflowFullPath = path.join(__dirname, '../../workflows', workflowPath);

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
          reject(new Error(`Failed to parse workflow output: ${error.message}`));
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

// Parse command line arguments
const { values } = parseArgs({
  options: {
    profiles: { type: 'string' },
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    outputFormat: { type: 'string', default: 'json' },
    includeStories: { type: 'boolean', default: false },
    resume: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h' }
  }
});

// Help flag
if (values.help) {
  console.log(`
Usage: node bulk-content-extraction.js [options]

Description:
  Orchestrates a complete Instagram content extraction pipeline:

  1. Extracts posts from specified profiles within date range
  2. Downloads all media (images, videos, carousels)
  3. Transcribes all video/audio content
  4. Formats and exports data to structured file

  This is a long-running job with checkpointing. If interrupted, use --resume
  to continue from the last successful checkpoint.

Options:
  --profiles <array>         JSON array of Instagram usernames (required)
                             Example: '["user1","user2","user3"]'

  --start-date <date>        Start date for post extraction (YYYY-MM-DD) (required)

  --end-date <date>          End date for post extraction (YYYY-MM-DD) (required)

  --output-format <format>   Output format: json, csv, or markdown (default: json)

  --include-stories          Include stories if available (default: false)

  --resume                   Resume from last checkpoint after interruption

  --help, -h                 Show this help

Examples:
  # Extract posts from 3 users for January 2024
  node bulk-content-extraction.js \\
    --profiles '["berudolph","design.studio","techblog"]' \\
    --start-date "2024-01-01" \\
    --end-date "2024-01-31" \\
    --output-format json

  # Resume interrupted job
  node bulk-content-extraction.js --resume

  # Include stories in extraction
  node bulk-content-extraction.js \\
    --profiles '["user1","user2"]' \\
    --start-date "2024-01-01" \\
    --end-date "2024-01-31" \\
    --include-stories

Output (JSON):
  {
    "success": true,
    "processedPosts": 87,
    "downloadedMedia": 145,
    "transcribedVideos": 23,
    "outputFile": "instagram-export-2024-01-31.json",
    "summary": {
      "totalProfiles": 3,
      "successfulProfiles": 3,
      "failedProfiles": 0,
      "duration": "1h 24m",
      "byProfile": {
        "user1": { "posts": 25, "media": 48, "videos": 8 },
        "user2": { "posts": 42, "media": 67, "videos": 10 },
        "user3": { "posts": 20, "media": 30, "videos": 5 }
      }
    },
    "artifacts": [
      "temp/instagram-export-2024-01-31.json",
      "temp/media/user1/...",
      "temp/media/user2/...",
      "temp/transcripts/..."
    ]
  }
  `);
  process.exit(0);
}

async function main() {
  const startTime = Date.now();

  try {
    logger.info('Starting Instagram bulk content extraction job', { params: values });

    // Validate required inputs (unless resuming)
    if (!values.resume) {
      if (!values.profiles) {
        throw new Error('--profiles is required');
      }
      if (!values.startDate || !values.endDate) {
        throw new Error('--start-date and --end-date are required');
      }
    }

    // Parse profiles array
    const profiles = values.profiles ? JSON.parse(values.profiles) : null;

    if (!values.resume && (!Array.isArray(profiles) || profiles.length === 0)) {
      throw new Error('--profiles must be a non-empty JSON array');
    }

    // Initialize job state
    let jobState = {
      stage: 'initialized',
      profiles: profiles || [],
      startDate: values.startDate,
      endDate: values.endDate,
      outputFormat: values.outputFormat,
      includeStories: values.includeStories,
      processedProfiles: [],
      failedProfiles: [],
      allPosts: [],
      allMedia: [],
      allTranscripts: [],
      stats: {
        totalPosts: 0,
        totalMedia: 0,
        totalVideos: 0,
        transcribedVideos: 0
      }
    };

    // Check if we can resume from checkpoint
    if (values.resume) {
      const checkpoint = state.get('jobState');
      if (checkpoint) {
        jobState = checkpoint;
        logger.info('Resuming from checkpoint', {
          stage: jobState.stage,
          processedProfiles: jobState.processedProfiles.length,
          remaining: jobState.profiles.length - jobState.processedProfiles.length
        });
      } else {
        logger.warn('No checkpoint found, starting fresh');
      }
    }

    // STAGE 1: Extract posts from each profile
    logger.info('Stage 1: Extracting posts from profiles', {
      totalProfiles: jobState.profiles.length,
      remaining: jobState.profiles.length - jobState.processedProfiles.length
    });

    for (const username of jobState.profiles) {
      // Skip if already processed
      if (jobState.processedProfiles.includes(username)) {
        logger.info('Profile already processed, skipping', { username });
        continue;
      }

      jobState.stage = `extracting-${username}`;
      state.set('jobState', jobState);
      state.createCheckpoint();

      try {
        logger.info('Extracting profile posts', { username });

        const extractResult = await executeWorkflow('instagram/extract-profile.js', {
          username: username,
          startDate: jobState.startDate,
          endDate: jobState.endDate,
          includeStories: jobState.includeStories
        });

        if (extractResult.success) {
          jobState.allPosts.push({
            username,
            posts: extractResult.posts
          });
          jobState.stats.totalPosts += extractResult.posts?.length || 0;
          jobState.processedProfiles.push(username);

          logger.info('Profile extraction completed', {
            username,
            postsCount: extractResult.posts?.length || 0
          });
        } else {
          throw new Error(`Extraction failed for ${username}`);
        }

      } catch (error) {
        logger.error('Profile extraction failed', {
          username,
          error: error.message
        });
        jobState.failedProfiles.push({
          username,
          error: error.message
        });
      }

      // Checkpoint after each profile
      state.set('jobState', jobState);
      state.createCheckpoint();
    }

    // STAGE 2: Download all media
    logger.info('Stage 2: Downloading media', {
      totalPosts: jobState.stats.totalPosts
    });

    jobState.stage = 'downloading-media';
    state.set('jobState', jobState);
    state.createCheckpoint();

    for (const profileData of jobState.allPosts) {
      for (const post of profileData.posts || []) {
        try {
          if (post.mediaUrls && post.mediaUrls.length > 0) {
            for (const mediaUrl of post.mediaUrls) {
              logger.info('Downloading media', {
                username: profileData.username,
                postId: post.id,
                url: mediaUrl
              });

              // Download media (using media workflow or primitive)
              // This is a placeholder - adjust based on your actual workflow
              const downloadResult = await executeWorkflow('media/download-and-transcribe.js', {
                url: mediaUrl,
                skipTranscribe: true  // We'll transcribe in next stage
              });

              if (downloadResult.success) {
                jobState.allMedia.push({
                  username: profileData.username,
                  postId: post.id,
                  localPath: downloadResult.localPath,
                  mediaType: downloadResult.mediaType
                });
                jobState.stats.totalMedia++;

                if (downloadResult.mediaType === 'video') {
                  jobState.stats.totalVideos++;
                }
              }
            }
          }
        } catch (error) {
          logger.error('Media download failed', {
            username: profileData.username,
            postId: post.id,
            error: error.message
          });
        }
      }

      // Checkpoint after each profile's media
      state.set('jobState', jobState);
      state.createCheckpoint();
    }

    // STAGE 3: Transcribe videos
    logger.info('Stage 3: Transcribing videos', {
      totalVideos: jobState.stats.totalVideos
    });

    jobState.stage = 'transcribing';
    state.set('jobState', jobState);
    state.createCheckpoint();

    const videosToTranscribe = jobState.allMedia.filter(m => m.mediaType === 'video');

    for (const video of videosToTranscribe) {
      try {
        logger.info('Transcribing video', {
          username: video.username,
          postId: video.postId,
          path: video.localPath
        });

        const transcribeResult = await executeWorkflow('media/download-and-transcribe.js', {
          localPath: video.localPath,
          skipDownload: true  // Already downloaded
        });

        if (transcribeResult.success && transcribeResult.transcript) {
          jobState.allTranscripts.push({
            username: video.username,
            postId: video.postId,
            transcript: transcribeResult.transcript
          });
          jobState.stats.transcribedVideos++;
        }

      } catch (error) {
        logger.error('Video transcription failed', {
          username: video.username,
          postId: video.postId,
          error: error.message
        });
      }

      // Checkpoint every 10 videos
      if (jobState.stats.transcribedVideos % 10 === 0) {
        state.set('jobState', jobState);
        state.createCheckpoint();
      }
    }

    // STAGE 4: Format and export
    logger.info('Stage 4: Formatting and exporting data', {
      format: jobState.outputFormat
    });

    jobState.stage = 'exporting';
    state.set('jobState', jobState);
    state.createCheckpoint();

    // Merge all data
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        dateRange: {
          start: jobState.startDate,
          end: jobState.endDate
        },
        profiles: jobState.profiles,
        includeStories: jobState.includeStories
      },
      summary: {
        totalProfiles: jobState.profiles.length,
        successfulProfiles: jobState.processedProfiles.length,
        failedProfiles: jobState.failedProfiles.length,
        totalPosts: jobState.stats.totalPosts,
        totalMedia: jobState.stats.totalMedia,
        totalVideos: jobState.stats.totalVideos,
        transcribedVideos: jobState.stats.transcribedVideos
      },
      posts: jobState.allPosts.map(profileData => ({
        username: profileData.username,
        posts: (profileData.posts || []).map(post => {
          // Attach media and transcripts
          const postMedia = jobState.allMedia.filter(m => m.postId === post.id);
          const postTranscripts = jobState.allTranscripts.filter(t => t.postId === post.id);

          return {
            ...post,
            media: postMedia,
            transcripts: postTranscripts
          };
        })
      })),
      failedProfiles: jobState.failedProfiles
    };

    // Generate output file
    const timestamp = new Date().toISOString().split('T')[0];
    const outputFileName = `instagram-export-${timestamp}.${jobState.outputFormat}`;
    const outputPath = path.join(getAgentToolsRoot(), 'temp', outputFileName);

    // Format based on output format
    let fileContent;
    if (jobState.outputFormat === 'json') {
      fileContent = JSON.stringify(exportData, null, 2);
    } else if (jobState.outputFormat === 'csv') {
      // Implement CSV formatting
      fileContent = formatAsCSV(exportData);
    } else if (jobState.outputFormat === 'markdown') {
      // Implement Markdown formatting
      fileContent = formatAsMarkdown(exportData);
    } else {
      throw new Error(`Unsupported output format: ${jobState.outputFormat}`);
    }

    await writeFile(outputPath, fileContent, 'utf-8');
    logger.info('Export file created', { path: outputPath });

    // Calculate duration
    const duration = Date.now() - startTime;
    const durationFormatted = formatDuration(duration);

    // Build by-profile summary
    const byProfile = {};
    for (const profileData of jobState.allPosts) {
      const profileMedia = jobState.allMedia.filter(m => m.username === profileData.username);
      const profileVideos = profileMedia.filter(m => m.mediaType === 'video');
      const profileTranscripts = jobState.allTranscripts.filter(t => t.username === profileData.username);

      byProfile[profileData.username] = {
        posts: profileData.posts?.length || 0,
        media: profileMedia.length,
        videos: profileVideos.length,
        transcripts: profileTranscripts.length
      };
    }

    const output = {
      success: true,
      processedPosts: jobState.stats.totalPosts,
      downloadedMedia: jobState.stats.totalMedia,
      transcribedVideos: jobState.stats.transcribedVideos,
      outputFile: outputPath,
      summary: {
        totalProfiles: jobState.profiles.length,
        successfulProfiles: jobState.processedProfiles.length,
        failedProfiles: jobState.failedProfiles.length,
        duration: durationFormatted,
        byProfile
      },
      artifacts: [outputPath]
    };

    console.log(JSON.stringify(output));
    logger.info('Job completed successfully', { summary: output.summary });

    // Clean up checkpoint
    state.clear();

    // Publish completion event
    events.publish('job.completed', {
      jobName: 'instagram.bulk-content-extraction',
      summary: output.summary
    });

  } catch (error) {
    logger.error('Job failed', {
      error: error.message,
      stack: error.stack,
      stage: state.get('jobState')?.stage
    });

    events.publish('job.failed', {
      jobName: 'instagram.bulk-content-extraction',
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

// Helper functions
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

function formatAsCSV(data) {
  // Implement CSV formatting
  // This is a placeholder - implement based on your needs
  const rows = [];
  rows.push('Username,PostID,Caption,Date,MediaCount,TranscriptCount');

  for (const profileData of data.posts) {
    for (const post of profileData.posts) {
      rows.push([
        profileData.username,
        post.id,
        `"${post.caption || ''}"`,
        post.timestamp,
        post.media?.length || 0,
        post.transcripts?.length || 0
      ].join(','));
    }
  }

  return rows.join('\n');
}

function formatAsMarkdown(data) {
  // Implement Markdown formatting
  // This is a placeholder - implement based on your needs
  let md = `# Instagram Export\n\n`;
  md += `**Export Date:** ${data.metadata.exportDate}\n`;
  md += `**Date Range:** ${data.metadata.dateRange.start} to ${data.metadata.dateRange.end}\n\n`;
  md += `## Summary\n\n`;
  md += `- Total Profiles: ${data.summary.totalProfiles}\n`;
  md += `- Total Posts: ${data.summary.totalPosts}\n`;
  md += `- Total Media: ${data.summary.totalMedia}\n`;
  md += `- Transcribed Videos: ${data.summary.transcribedVideos}\n\n`;

  for (const profileData of data.posts) {
    md += `## @${profileData.username}\n\n`;
    for (const post of profileData.posts) {
      md += `### Post ${post.id}\n\n`;
      if (post.caption) md += `${post.caption}\n\n`;
      if (post.transcripts && post.transcripts.length > 0) {
        md += `**Transcripts:**\n${post.transcripts.map(t => t.transcript).join('\n\n')}\n\n`;
      }
    }
  }

  return md;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
