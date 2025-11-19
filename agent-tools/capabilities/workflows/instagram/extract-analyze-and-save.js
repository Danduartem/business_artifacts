#!/usr/bin/env node
/**
 * @workflow instagram.extract-analyze-and-save
 * @when Complete pipeline: Extract Instagram posts, intelligently analyze content, and save to Airtable with full metadata
 * @complexity high
 * @category instagram
 *
 * @flag urls - Comma-separated Instagram post URLs or file path (required)
 * @flag creator - Creator username for Airtable (required, e.g., @username)
 * @flag profile - Chrome profile to use (optional)
 * @flag headless - Run browser in headless mode (optional)
 * @flag skip-duplicates - Skip posts that already exist in Airtable (optional)
 * @flag dry-run - Test without saving to Airtable (optional)
 * @flag output-dir - Directory for media files (optional, default: ./instagram_extracts)
 *
 * @example
 * node extract-analyze-and-save.js --urls "https://instagram.com/p/abc123,https://instagram.com/p/def456" --creator "@berudolph"
 * node extract-analyze-and-save.js --urls urls.txt --creator "@berudolph" --skip-duplicates true
 */

import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';
import { execSync } from 'child_process';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { executePrimitive, executePrimitiveNoReturn } from '../workflow-utils.js';

const logger = createLogger({ toolName: 'instagram.extract-analyze-and-save' });
const args = parseArgs({
  options: {
    'urls': { type: 'string' },
    'creator': { type: 'string' },
    'profile': { type: 'string' },
    'headless': { type: 'string' },
    'skip-duplicates': { type: 'string' },
    'dry-run': { type: 'string' },
    'output-dir': { type: 'string' }
  }
});

/**
 * Parse URLs from argument (comma-separated string or file path)
 */
function parseUrls(urlsArg) {
  // Check if it's a file path
  if (existsSync(urlsArg)) {
    const content = readFileSync(urlsArg, 'utf-8');
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.startsWith('http'));
  }

  // Otherwise treat as comma-separated URLs
  return urlsArg.split(',').map(url => url.trim()).filter(url => url);
}

/**
 * Extract post content using inline browser primitives (reuses browser session)
 */
function extractPostInline(url, outputDir, processImages = true, transcribeVideos = true, videoSegments = '0-3,3-10,10+') {
  logger.info('Extracting post', { url });

  try {
    // Navigate to post
    const navigation = executePrimitive('browser/navigate.js', {
      url: url,
      'wait-until': 'networkidle2'
    });

    if (!navigation.success) {
      throw new Error(`Failed to navigate: ${navigation.error || 'Unknown error'}`);
    }

    // Wait for content
    const waitResult = executePrimitive('page/wait-for.js', {
      selector: 'body',
      timeout: 5000
    });

    if (!waitResult.success) {
      throw new Error(`Content did not load: ${waitResult.error || 'Unknown error'}`);
    }

    // Extract metadata using the fixed selectors
    const metadataCode = `
      async () => {
        const shortcode = window.location.pathname.match(/\\/(p|reel)\\/([^/]+)/)?.[2] || 'unknown';
        const main = document.querySelector('main') || document.body;

        // Get caption from spans
        let caption = '';
        const spans = Array.from(main.querySelectorAll('span'));
        const longSpan = spans.find(s => s.textContent && s.textContent.length > 20 && !s.querySelector('*'));
        if (longSpan) {
          caption = longSpan.textContent.trim();
        }

        // Get timestamp
        const timeEl = main.querySelector('time');
        const timestamp = timeEl ? (timeEl.dateTime || timeEl.getAttribute('datetime')) : null;
        const date = timestamp ? timestamp.split('T')[0] : null;

        // Get username
        let username = '';
        let profileUrl = '';
        const links = Array.from(main.querySelectorAll('a'));
        const profileLink = links.find(a => {
          const href = a.getAttribute('href');
          return href && href.match(/^\\/[^/]+\\/$/) && !href.includes('/p/') && !href.includes('/reel/');
        });

        if (profileLink) {
          username = profileLink.textContent.trim();
          profileUrl = 'https://www.instagram.com' + profileLink.getAttribute('href');
        }

        // Determine media type
        const videoEl = main.querySelector('video');
        const nextButton = main.querySelector('[aria-label*="Next"]') || main.querySelector('[aria-label*="next"]');

        let mediaType = 'unknown';
        let isCarousel = false;

        if (videoEl) {
          mediaType = 'video';
        } else if (nextButton) {
          mediaType = 'carousel';
          isCarousel = true;
        } else if (main.querySelector('img')) {
          mediaType = 'image';
        }

        // Extract media URLs
        const mediaUrls = [];

        if (videoEl && videoEl.src) {
          mediaUrls.push({
            type: 'video',
            url: videoEl.src,
            thumbnail: videoEl.poster || null
          });
        }

        // Get images
        const images = Array.from(main.querySelectorAll('img'));
        images.forEach((img, index) => {
          if (img.src && img.src.includes('instagram') && img.width > 100 && img.height > 100) {
            const alt = img.alt || '';
            if (!alt.toLowerCase().includes('profile picture')) {
              mediaUrls.push({
                type: 'image',
                url: img.src,
                index: index
              });
            }
          }
        });

        return {
          url: window.location.href,
          shortcode,
          caption: caption || '',
          date,
          timestamp,
          creator: {
            username: username || 'unknown',
            profileUrl: profileUrl || ''
          },
          mediaType,
          isCarousel,
          mediaUrls,
          extractedAt: new Date().toISOString()
        };
      }
    `;

    const metadataResult = executePrimitive('browser/eval.js', {
      code: metadataCode
    });

    if (!metadataResult.success || !metadataResult.result) {
      throw new Error('Failed to extract metadata');
    }

    const postData = metadataResult.result;
    logger.info('Metadata extracted', { mediaType: postData.mediaType, isCarousel: postData.isCarousel });

    // Take screenshot
    const screenshotPath = join(outputDir, `${postData.shortcode}_screenshot.png`);
    const screenshotResult = executePrimitive('page/screenshot.js', {
      path: screenshotPath,
      'full-page': false
    });

    if (screenshotResult.success) {
      postData.screenshot = screenshotPath;
    }

    // Download and process media
    const processedMedia = [];

    if (postData.mediaUrls && postData.mediaUrls.length > 0) {
      for (let i = 0; i < postData.mediaUrls.length; i++) {
        const media = postData.mediaUrls[i];
        const mediaItem = { type: media.type, originalUrl: media.url };

        try {
          // Download media
          const fileName = `${postData.shortcode}_${i}_${media.type}.${media.type === 'video' ? 'mp4' : 'jpg'}`;
          const filePath = join(outputDir, fileName);

          const downloadResult = executePrimitive('http/download.js', {
            url: media.url,
            output: filePath
          });

          if (downloadResult.success) {
            mediaItem.filePath = filePath;

            // Process based on media type
            if (media.type === 'image' && processImages) {
              // Analyze image
              const analysisResult = executePrimitive('media/analyze-image.js', {
                input: filePath
              });

              if (analysisResult.success) {
                mediaItem.analysis = {
                  hasText: analysisResult.hasText,
                  imageType: analysisResult.imageType,
                  confidence: analysisResult.confidence,
                  description: analysisResult.description
                };

                // If image has text, perform OCR
                if (analysisResult.hasText) {
                  const ocrResult = executePrimitive('media/ocr-image.js', {
                    input: filePath
                  });

                  if (ocrResult.success) {
                    mediaItem.extractedText = ocrResult.text;
                    mediaItem.textFile = ocrResult.output;
                  }
                }
              }
            } else if (media.type === 'video' && transcribeVideos) {
              // Transcribe video with timestamps
              const transcribeResult = executePrimitive('media/transcribe-segments.js', {
                input: filePath,
                segments: videoSegments
              });

              if (transcribeResult.success) {
                mediaItem.transcription = {
                  segments: transcribeResult.segments,
                  totalDuration: transcribeResult.totalDuration
                };
              }
            }
          }
        } catch (mediaError) {
          logger.warn('Failed to process media', { index: i, error: mediaError.message });
          mediaItem.error = mediaError.message;
        }

        processedMedia.push(mediaItem);
      }
    }

    postData.processedMedia = processedMedia;

    // Save results
    const outputFile = join(outputDir, `${postData.shortcode}_complete.json`);
    writeFileSync(outputFile, JSON.stringify(postData, null, 2));

    logger.info('Post extracted successfully', { url, shortcode: postData.shortcode });
    return postData;

  } catch (error) {
    logger.error('Failed to extract post', { url, error: error.message });
    throw error;
  }
}

/**
 * Analyze post content using content.analyze-instagram-content
 */
function analyzeContent(postData) {
  logger.info('Analyzing content', { url: postData.url, mediaType: postData.mediaType });

  try {
    const result = execSync(
      `node agent-tools/capabilities/workflows/content/analyze-instagram-content.js --post-data '${JSON.stringify(postData)}'`,
      {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024
      }
    );

    const parsed = JSON.parse(result);

    if (!parsed.success) {
      throw new Error(parsed.error || 'Analysis failed');
    }

    logger.info('Content analyzed successfully', {
      url: postData.url,
      contentType: parsed.contentAnalyzed,
      framework: parsed.analysis.framework
    });

    return parsed.analysis;

  } catch (error) {
    logger.error('Failed to analyze content', { url: postData.url, error: error.message });
    throw error;
  }
}

/**
 * Map extracted post data to format needed for Airtable
 */
function mapToAirtableFormat(postData, analysis) {
  // Get full transcription text if available
  let fullTranscription = '';
  if (postData.processedMedia) {
    const videoMedia = postData.processedMedia.find(m => m.type === 'video' && m.transcription);
    if (videoMedia?.transcription?.segments) {
      fullTranscription = videoMedia.transcription.segments
        .map(seg => seg.text)
        .join(' ');
    }
  }

  // Determine format
  let format = 'Single Image';
  if (postData.mediaType === 'video') {
    format = 'Reel';
  } else if (postData.mediaType === 'carousel') {
    format = 'Carousel';
  } else if (postData.isCarousel) {
    format = 'Carousel';
  }

  return {
    url: postData.url,
    date: postData.date,
    caption: postData.caption || '',
    format: format,
    isReel: format === 'Reel',
    screenshot: postData.screenshot,
    transcription: fullTranscription,
    analysis: {
      framework: analysis.framework,
      hookCategories: analysis.hookCategories || [],
      ctaType: analysis.ctaType,
      emotionalTones: analysis.emotionalTones || [],
      visualStyle: analysis.visualStyle || [],
      painPoint: analysis.painPoint || '',
      titleHook: analysis.titleHook || '',
      notes: analysis.notes || ''
    }
  };
}

/**
 * Main workflow execution
 */
async function extractAnalyzeAndSave() {
  try {
    // Validate required arguments
    if (!args.values.urls) {
      throw new Error('--urls is required (comma-separated URLs or file path)');
    }

    if (!args.values.creator) {
      throw new Error('--creator is required (e.g., @berudolph)');
    }

    const creator = args.values.creator;
    const outputDir = args.values['output-dir'] || join(process.cwd(), 'instagram_extracts');
    const skipDuplicates = args.values['skip-duplicates'] === 'true';
    const dryRun = args.values['dry-run'] === 'true';
    const profile = args.values.profile;
    const headless = args.values.headless === 'true';

    // Create output directory
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Parse URLs
    const urls = parseUrls(args.values.urls);

    if (urls.length === 0) {
      throw new Error('No valid URLs provided');
    }

    logger.info('Starting workflow', {
      creator,
      urlCount: urls.length,
      outputDir,
      dryRun
    });

    console.log(`\n🚀 Processing ${urls.length} Instagram posts for ${creator}\n`);

    if (dryRun) {
      console.log('⚠️  DRY RUN MODE - No data will be saved to Airtable\n');
    }

    // Start browser ONCE at the beginning
    logger.info('Starting browser session');
    console.log('🌐 Starting browser...\n');

    try {
      const browserStart = executePrimitive('browser/start.js', {
        profile: profile,
        headless: headless
      });

      if (!browserStart.success) {
        throw new Error(`Failed to start browser: ${browserStart.error || 'Unknown error'}`);
      }

      logger.info('Browser started successfully');
    } catch (error) {
      logger.error('Failed to start browser', { error: error.message });
      throw new Error(`Could not start browser: ${error.message}`);
    }

    // Process each post using the same browser session
    const processedPosts = [];
    const errors = [];
    const MAX_CONSECUTIVE_ERRORS = 3;
    let consecutiveErrors = 0;

    try {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        console.log(`\n[${i + 1}/${urls.length}] Processing: ${url}`);

        try {
          // Step 1: Extract post (using inline function with shared browser)
          console.log('  📥 Extracting post data...');
          const postData = extractPostInline(url, outputDir, true, true, '0-3,3-10,10+');

          // Step 2: Analyze content
          console.log(`  🤖 Analyzing ${postData.mediaType} content...`);
          const analysis = analyzeContent(postData);

          // Step 3: Map to Airtable format
          const mappedPost = mapToAirtableFormat(postData, analysis);

          processedPosts.push(mappedPost);
          consecutiveErrors = 0; // Reset on success

          console.log(`  ✅ Complete - Framework: ${analysis.framework}`);

          // Small delay between posts to avoid rate limits
          if (i < urls.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }

        } catch (error) {
          consecutiveErrors++;
          console.log(`  ❌ Failed: ${error.message}`);
          errors.push({
            url,
            error: error.message
          });

          // Stop if too many consecutive failures
          if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
            logger.error(`Stopping: ${MAX_CONSECUTIVE_ERRORS} consecutive failures detected`);
            console.log(`\n❌ Stopping workflow: ${MAX_CONSECUTIVE_ERRORS} consecutive failures\n`);
            break;
          }
        }
      }
    } finally {
      // Always close browser at the end, even if there were errors
      logger.info('Closing browser session');
      console.log('\n🌐 Closing browser...');
      executePrimitiveNoReturn('browser/close.js');
    }

    console.log(`\n📊 Extraction & Analysis Complete`);
    console.log(`   ✅ Successful: ${processedPosts.length}`);
    console.log(`   ❌ Failed: ${errors.length}\n`);

    // Step 4: Save to Airtable (if not dry run and we have posts)
    if (processedPosts.length > 0) {
      if (dryRun) {
        console.log('[DRY RUN] Would save the following posts to Airtable:');
        processedPosts.forEach((post, i) => {
          console.log(`  ${i + 1}. ${post.url}`);
          console.log(`     Format: ${post.format}`);
          console.log(`     Framework: ${post.analysis.framework}`);
        });
      } else {
        console.log('💾 Saving to Airtable...\n');

        try {
          // Write posts to temporary file for batch processing
          const tempFile = join(outputDir, 'airtable_batch.json');
          const fs = await import('fs');
          fs.writeFileSync(tempFile, JSON.stringify(processedPosts, null, 2));

          const saveCommand = [
            'node',
            'agent-tools/capabilities/workflows/content/save-instagram-to-airtable.js',
            `--posts "${tempFile}"`,
            `--creator "${creator}"`,
            `--skip-duplicates ${skipDuplicates}`
          ].join(' ');

          const saveResult = execSync(saveCommand, {
            encoding: 'utf-8',
            stdio: 'inherit'
          });

          console.log('\n✅ All data saved to Airtable!\n');

        } catch (error) {
          console.log(`\n❌ Failed to save to Airtable: ${error.message}\n`);
          errors.push({
            step: 'airtable-save',
            error: error.message
          });
        }
      }
    }

    // Final summary
    const result = {
      success: errors.length === 0,
      summary: {
        total: urls.length,
        successful: processedPosts.length,
        failed: errors.length,
        dryRun
      },
      errors: errors.length > 0 ? errors : undefined
    };

    console.log('\n' + JSON.stringify(result, null, 2));

    if (errors.length > 0) {
      console.log('\n❌ Some posts failed to process:');
      errors.forEach(({ url, error }) => {
        console.log(`  - ${url || 'unknown'}: ${error}`);
      });
    }

    logger.info('Workflow complete', result.summary);

  } catch (error) {
    logger.error('Workflow failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

extractAnalyzeAndSave();
