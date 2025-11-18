#!/usr/bin/env node

/**
 * Instagram Batch Processor Orchestrator
 * Coordinates the complete workflow: extract → download → transcribe → analyze → save
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SCRIPTS, getTempPath } from '@business-artifacts/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, '../.cache');

/**
 * Execute command with logging
 */
function exec(command, description) {
  console.log(`\n⚙️  ${description}...`);
  try {
    const result = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(`✓ ${description} complete`);
    return result.trim();
  } catch (error) {
    console.error(`✗ ${description} failed:`, error.message);
    throw error;
  }
}

/**
 * Main orchestration function
 */
export async function orchestrate(options) {
  const { profiles, startDate, endDate, skipDownload, skipTranscribe, skipAnalyze } = options;

  console.log('🚀 Instagram Batch Processor\n');
  console.log(`Profiles: ${profiles.join(', ')}`);
  console.log(`Period: ${startDate} to ${endDate}\n`);

  // Ensure cache directory exists
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  const results = {
    profiles: {},
    summary: {
      totalPosts: 0,
      totalVideos: 0,
      transcribed: 0,
      analyzed: 0,
      saved: 0,
      errors: 0,
    },
  };

  for (const profile of profiles) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📸 Processing @${profile}`);
    console.log('='.repeat(60));

    try {
      // STEP 1: Extract posts
      const postsFile = join(CACHE_DIR, `${profile}-posts.json`);
      exec(
        `extract-instagram.js ${profile} --posts 100 --output ${join(CACHE_DIR, 'captions')}`,
        `Extracting posts from @${profile}`
      );

      // STEP 2: Filter by date and parse
      console.log(`\n⚙️  Filtering posts by date (${startDate} to ${endDate})...`);
      const captionsFile = join(CACHE_DIR, 'captions', `${profile}.md`);
      const posts = parseAndFilterPosts(captionsFile, startDate, endDate);

      writeFileSync(postsFile, JSON.stringify(posts, null, 2));
      console.log(`✓ Filtered ${posts.length} posts in date range`);

      results.summary.totalPosts += posts.length;

      // STEP 2.5: Capture screenshots of all posts
      console.log(`\n⚙️  Capturing screenshots of ${posts.length} posts...`);
      const screenshotsDir = getTempPath('screenshots');

      for (const post of posts) {
        const postId = post.url.split('/').filter(Boolean).pop();

        try {
          const screenshotPath = exec(
            `browser-screenshot.js "${post.url}" --dir "${screenshotsDir}"`,
            `Capturing ${postId}`
          );
          post.screenshot = screenshotPath.trim();
          console.log(`✓ Screenshot: ${postId}`);
        } catch (error) {
          console.warn(`⚠️  Failed to capture screenshot for ${postId}`);
          post.screenshot = null;
          results.summary.errors++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Save posts with screenshots
      writeFileSync(postsFile, JSON.stringify(posts, null, 2));
      console.log(`✓ Captured ${posts.filter(p => p.screenshot).length} screenshots`);

      // STEP 3: Download and transcribe videos (for reels)
      if (!skipDownload && !skipTranscribe) {
        const reels = posts.filter(p => p.isReel);
        const videosDir = getTempPath('videos');

        if (!existsSync(videosDir)) {
          mkdirSync(videosDir, { recursive: true });
        }

        console.log(`\n⚙️  Downloading and transcribing ${reels.length} videos...`);

        for (const reel of reels) {
          const postId = reel.url.split('/').filter(Boolean).pop();

          try {
            // Use video-url-transcribe.js which downloads AND transcribes in one step
            const transcriptPath = join(videosDir, `${postId}.txt`);
            exec(
              `node "${SCRIPTS.VIDEO_URL_TRANSCRIBE}" "${reel.url}" --keep-video --download-dir "${videosDir}" --output "${transcriptPath}" --language pt --format txt`,
              `Downloading & transcribing ${postId}`
            );

            // Read transcription
            if (existsSync(transcriptPath)) {
              reel.transcription = readFileSync(transcriptPath, 'utf-8').trim();
              results.summary.transcribed++;
            }

            results.summary.totalVideos++;
            console.log(`✓ Video downloaded and transcribed: ${postId}`);
          } catch (error) {
            console.warn(`⚠️  Failed to download/transcribe ${reel.url}:`, error.message);
            reel.transcription = '';
            results.summary.errors++;
          }

          // Delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // Save posts with transcriptions
        writeFileSync(postsFile, JSON.stringify(posts, null, 2));
        console.log(`✓ Transcribed ${results.summary.transcribed}/${reels.length} videos`);
      }

      // Legacy STEP 4: Transcribe videos (now handled above)
      if (skipDownload && !skipTranscribe) {
        const videosDir = getTempPath('videos');
        if (existsSync(videosDir)) {
          console.log(`\n⚙️  Transcribing videos...`);

          for (const post of posts.filter(p => p.isReel)) {
            const postId = post.url.split('/').filter(Boolean).pop();
            const videoPath = join(videosDir, `${postId}.mp4`);

            if (existsSync(videoPath)) {
              try {
                const transcription = exec(
                  `transcribe-video.js "${videoPath}"`,
                  `Transcribing ${postId}`
                );
                post.transcription = transcription;
                results.summary.transcribed++;
              } catch (error) {
                console.warn(`⚠️  Failed to transcribe ${postId}`);
                post.transcription = '';
                results.summary.errors++;
              }
            }
          }

          // Save updated posts with transcriptions
          writeFileSync(postsFile, JSON.stringify(posts, null, 2));
        }
      }

      // STEP 5: Analyze posts (in batches)
      if (!skipAnalyze) {
        console.log(`\n⚙️  Analyzing ${posts.length} posts...`);
        const { analyzeBatch } = await import('./analyzer.js');
        const analyzed = await analyzeBatch(posts);

        const analyzedFile = join(CACHE_DIR, `${profile}-analyzed.json`);
        writeFileSync(analyzedFile, JSON.stringify(analyzed, null, 2));
        results.summary.analyzed += analyzed.length;
      }

      // STEP 6: Validate and deduplicate
      console.log(`\n⚙️  Validating and checking for duplicates...`);
      const { validateAndDedupe } = await import('./validator.js');
      const validated = await validateAndDedupe(posts, profile);

      // STEP 7: Save to Notion
      console.log(`\n⚙️  Saving ${validated.length} posts to Notion...`);
      for (const post of validated) {
        const tempFile = `/tmp/notion-post-${Date.now()}.json`;
        writeFileSync(tempFile, JSON.stringify(post.notionData, null, 2));

        try {
          exec(
            `node "${SCRIPTS.NOTION_SAVE}" --json "${tempFile}"`,
            `Saving post ${post.url.split('/').pop()}`
          );
          results.summary.saved++;
        } catch (error) {
          console.warn(`⚠️  Failed to save ${post.url}`);
          results.summary.errors++;
        }
      }

      results.profiles[profile] = {
        posts: posts.length,
        saved: validated.length,
      };

    } catch (error) {
      console.error(`\n✗ Error processing @${profile}:`, error.message);
      results.profiles[profile] = { error: error.message };
      results.summary.errors++;
    }
  }

  // Final summary
  console.log(`\n\n${'='.repeat(60)}`);
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total posts found: ${results.summary.totalPosts}`);
  console.log(`Videos downloaded: ${results.summary.totalVideos}`);
  console.log(`Videos transcribed: ${results.summary.transcribed}`);
  console.log(`Posts analyzed: ${results.summary.analyzed}`);
  console.log(`Posts saved to Notion: ${results.summary.saved}`);
  console.log(`Errors: ${results.summary.errors}`);
  console.log('='.repeat(60));

  return results;
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
        });
      }
    }
  }

  return posts;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const profiles = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  const startDate = process.argv.find(arg => arg.startsWith('--start='))?.split('=')[1] || '2000-01-01';
  const endDate = process.argv.find(arg => arg.startsWith('--end='))?.split('=')[1] || '2099-12-31';

  orchestrate({ profiles, startDate, endDate })
    .then(() => process.exit(0))
    .catch(error => {
      console.error('\n✗ Fatal error:', error.message);
      process.exit(1);
    });
}
