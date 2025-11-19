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
const args = parseArgs();

async function processPostContent() {
  try {
    if (!args.flags.url) {
      throw new Error('--url is required');
    }

    const postUrl = args.flags.url;
    const downloadMedia = args.flags['download-media'] !== false;
    const processImages = args.flags['process-images'] !== false;
    const transcribeVideos = args.flags['transcribe-videos'] !== false;
    const videoSegments = args.flags['video-segments'] || '0-3,3-10,10+';
    const outputDir = args.flags['output-dir'] || join(process.cwd(), 'instagram_content');
    const headlessMode = args.flags.headless === true;

    // Create output directory
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    logger.info('Processing Instagram post', { url: postUrl });

    // STEP 1: Start browser
    logger.info('Step 1: Starting browser');
    const browserStart = executePrimitive('browser/start.js', {
      profile: args.flags.profile,
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
    logger.info('Step 3: Waiting for content to load');
    const waitResult = executePrimitive('page/wait-for.js', {
      selector: 'article',
      timeout: 15000
    });

    if (!waitResult.success) {
      throw new Error(`Post content did not load: ${waitResult.error || 'Unknown error'}`);
    }

    // STEP 4: Extract post metadata
    logger.info('Step 4: Extracting post metadata');

    const metadataCode = `
      (() => {
        const article = document.querySelector('article');
        if (!article) return null;

        // Extract caption
        const captionEl = article.querySelector('h1') || article.querySelector('span[dir="auto"]');
        const caption = captionEl ? captionEl.textContent.trim() : '';

        // Extract timestamp
        const timeEl = article.querySelector('time');
        const timestamp = timeEl ? timeEl.dateTime : null;
        const date = timestamp ? timestamp.split('T')[0] : null;

        // Extract username
        const usernameEl = article.querySelector('a[href^="/"][role="link"]');
        const username = usernameEl ? usernameEl.textContent.trim() : '';
        const profileUrl = usernameEl ? \`https://www.instagram.com\${usernameEl.getAttribute('href')}\` : '';

        // Determine media type
        let mediaType = 'image';
        let isCarousel = false;

        const videoEl = article.querySelector('video');
        const carouselDots = article.querySelectorAll('div[role="button"][style*="background-color"]');

        if (videoEl) {
          mediaType = 'video';
        }

        if (carouselDots.length > 1) {
          isCarousel = true;
          mediaType = 'carousel';
        }

        // Extract media URLs
        const mediaUrls = [];

        if (videoEl) {
          mediaUrls.push({
            type: 'video',
            url: videoEl.src,
            thumbnail: videoEl.poster || null
          });
        } else if (isCarousel) {
          // For carousel, get all images
          const imgElements = article.querySelectorAll('img[srcset]');
          imgElements.forEach((img, index) => {
            if (img.alt && !img.alt.includes('profile picture')) {
              mediaUrls.push({
                type: 'image',
                url: img.src,
                index: index
              });
            }
          });
        } else {
          // Single image
          const imgEl = article.querySelector('img[srcset]');
          if (imgEl && imgEl.alt && !imgEl.alt.includes('profile picture')) {
            mediaUrls.push({
              type: 'image',
              url: imgEl.src
            });
          }
        }

        return {
          url: window.location.href,
          shortcode: window.location.pathname.match(/\/(p|reel)\/([^/]+)/)?.[2] || null,
          caption,
          date,
          timestamp,
          creator: {
            username,
            profileUrl
          },
          mediaType,
          isCarousel,
          mediaUrls,
          extractedAt: new Date().toISOString()
        };
      })()
    `;

    const metadataResult = executePrimitive('browser/eval.js', {
      code: metadataCode
    });

    if (!metadataResult.success || !metadataResult.result) {
      throw new Error('Failed to extract post metadata');
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
