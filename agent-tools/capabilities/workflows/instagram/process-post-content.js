#!/usr/bin/env node
/**
 * @workflow instagram.process-post-content
 * @when Process Instagram post content: extract media, analyze images, transcribe videos with timestamps
 * @complexity medium
 * @category instagram
 *
 * @composes browser.start, browser.navigate, page.wait-for, page.screenshot, http.download, media.analyze-image, media.ocr-image, media.transcribe-segments, browser.eval, browser.close
 *
 * @flag url - Instagram post URL (required)
 * @flag download-media - Download media files (optional)
 * @flag process-images - Analyze and OCR images (optional)
 * @flag transcribe-videos - Transcribe videos with timestamps (optional)
 * @flag video-segments - Video time segments (optional)
 * @flag output-dir - Output directory for files (optional)
 * @flag profile - Use Chrome profile (optional)
 * @flag headless - Force headless Chrome (optional)
 *
 * @example
 * node process-post-content.js --param value
 */

import { executePrimitive, executePrimitiveNoReturn } from '../workflow-utils.js';
import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const logger = createLogger({ toolName: 'instagram.process-post-content' });
const args = parseArgs({
  options: {
    'url': { type: 'string' },
    'download-media': { type: 'string' },
    'process-images': { type: 'string' },
    'transcribe-videos': { type: 'string' },
    'video-segments': { type: 'string' },
    'output-dir': { type: 'string' },
    'profile': { type: 'string' },
    'headless': { type: 'string' }
  }
});

async function processPostContent() {
  try {
    if (!args.values.url) {
      throw new Error('--url is required');
    }

    const postUrl = args.values.url;
    const downloadMedia = args.values['download-media'] !== 'false';
    const processImages = args.values['process-images'] !== 'false';
    const transcribeVideos = args.values['transcribe-videos'] !== 'false';
    const videoSegments = args.values['video-segments'] || '0-3,3-10,10+';
    const outputDir = args.values['output-dir'] || join(process.cwd(), 'instagram_content');
    const headlessMode = args.values.headless === 'true';

    // Create output directory
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    logger.info('Processing Instagram post', { url: postUrl });

    // STEP 1: Start browser
    logger.info('Step 1: Starting browser');
    const browserStart = executePrimitive('browser/start.js', {
      profile: args.values.profile,
      headless: headlessMode
    });

    if (!browserStart.success) {
      throw new Error(`Failed to start browser: ${browserStart.error || 'Unknown error'}`);
    }

    // STEP 2: Navigate to post
    logger.info('Step 2: Navigating to post');
    const navigation = executePrimitive('browser/navigate.js', {
      url: postUrl,
      'wait-until': 'networkidle2'
    });

    if (!navigation.success) {
      throw new Error(`Failed to open post: ${navigation.error || 'Unknown error'}`);
    }

    // STEP 3: Wait for content
    // Note: When logged in, Instagram doesn't use <article> tags
    // Wait for body instead (always present) with a small delay for JS to load
    logger.info('Step 3: Waiting for content to load');
    const waitResult = executePrimitive('page/wait-for.js', {
      selector: 'body',
      timeout: 5000
    });

    if (!waitResult.success) {
      throw new Error(`Post content did not load: ${waitResult.error || 'Unknown error'}`);
    }

    // STEP 4: Extract post metadata
    logger.info('Step 4: Extracting post metadata');

    const metadataCode = `
      async () => {
        const shortcode = window.location.pathname.match(/\\/(p|reel)\\/([^/]+)/)?.[2] || 'unknown';
        const main = document.querySelector('main') || document.body;

        // Get caption from spans (Instagram doesn't use h1 for captions)
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

    if (!metadataResult.success) {
      throw new Error(`Eval failed: ${metadataResult.error || 'Unknown error'}`);
    }

    if (!metadataResult.result) {
      throw new Error('Metadata extraction returned null - check selectors');
    }

    const postData = metadataResult.result;
    logger.info('Metadata extracted', { mediaType: postData.mediaType, isCarousel: postData.isCarousel });

    // STEP 5: Take screenshot
    logger.info('Step 5: Taking screenshot');
    const screenshotPath = join(outputDir, `${postData.shortcode}_screenshot.png`);
    const screenshotResult = executePrimitive('page/screenshot.js', {
      path: screenshotPath,
      'full-page': false
    });

    if (!screenshotResult.success) {
      throw new Error(`Failed to capture screenshot: ${screenshotResult.error || 'Unknown error'}`);
    }
    postData.screenshot = screenshotPath;

    // STEP 6: Download and process media
    const processedMedia = [];

    if (downloadMedia && postData.mediaUrls && postData.mediaUrls.length > 0) {
      logger.info('Step 6: Processing media files', { count: postData.mediaUrls.length });

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
            logger.info('Media downloaded', { file: fileName });

            // Process based on media type
            if (media.type === 'image' && processImages) {
              // Analyze image
              logger.info('Analyzing image', { index: i });
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
                  logger.info('Performing OCR', { index: i });
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
              logger.info('Transcribing video with timestamps', { segments: videoSegments });
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

    // STEP 7: Close browser
    logger.info('Step 7: Closing browser');
    executePrimitiveNoReturn('browser/close.js');

    // STEP 8: Save results
    const outputFile = join(outputDir, `${postData.shortcode}_complete.json`);
    writeFileSync(outputFile, JSON.stringify(postData, null, 2));

    const result = {
      success: true,
      post: postData,
      outputFile
    };

    console.log(JSON.stringify(result));
    logger.info('Post processing complete', { output: outputFile });

  } catch (error) {
    logger.error('Post processing failed', { error: error.message });

    // Try to close browser on error
    executePrimitiveNoReturn('browser/close.js');

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

processPostContent();
