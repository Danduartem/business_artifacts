#!/usr/bin/env node
/**
 * @workflow instagram.extract-post
 * @when Extract complete Instagram post data including caption, format, screenshot, and media URLs
 * @complexity low
 * @category instagram
 *
 * @flag url - Instagram post URL (required)
 * @flag profile - Use Chrome profile (optional)
 * @flag screenshot - Take screenshot (optional)
 * @flag download-media - Download media files (optional)
 *
 * @example
 * node extract-post.js --param value
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';
import { getAgentToolsRoot } from '../../../core/utils/index.js';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const logger = createLogger({ toolName: 'instagram.extract-post' });

const { values } = parseArgs({
  options: {
    url: { type: 'string' },
    profile: { type: 'boolean', default: false },
    screenshot: { type: 'boolean', default: true },
    'download-media': { type: 'boolean', default: false }
  }
});

async function extractPostFull() {
  let browser;

  try {
    // Validate inputs
    if (!values.url) {
      throw new Error('--url is required');
    }

    const url = values.url;
    const takeScreenshot = values.screenshot !== false;

    // Extract post ID from URL
    const postIdMatch = url.match(/\/(p|reel)\/([^/?]+)/);
    if (!postIdMatch) {
      throw new Error('Invalid Instagram post URL');
    }
    const postId = postIdMatch[2];

    logger.info('Starting Instagram post extraction', { url, postId });

    // Create output directory
    const outputDir = join(getAgentToolsRoot(), 'temp', 'instagram-posts', postId);
    await mkdir(outputDir, { recursive: true });

    // Connect to browser
    try {
      browser = await puppeteer.connect({
        browserURL: 'http://localhost:9222',
        defaultViewport: null
      });
      logger.info('Connected to existing browser');
    } catch (err) {
      throw new Error('No browser running. Start browser first with: node capabilities/primitives/browser/start.js --profile');
    }

    const pages = await browser.pages();
    const page = pages[pages.length - 1];

    if (!page) {
      throw new Error('No active tab found');
    }

    // Navigate to post
    logger.info('Step 1/4: Navigating to post');
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    logger.info('Navigation complete');

    // Wait for content - Instagram uses time elements
    logger.info('Step 2/4: Waiting for content to load');
    await page.waitForSelector('time, video, img[alt]', { timeout: 15000 });

    // Wait a bit more for React to fully render
    await new Promise(resolve => setTimeout(resolve, 2000));
    logger.info('Content loaded');

    // Extract post data using page.evaluate
    logger.info('Step 3/4: Extracting post data');

    const postData = await page.evaluate(() => {
      // Extract creator from URL
      const creator = window.location.pathname.split('/')[1] || '';

      // Extract date from time element
      let datePosted = '';
      const timeElement = document.querySelector('time');
      if (timeElement) {
        datePosted = timeElement.getAttribute('datetime') ||
                     timeElement.getAttribute('title') || '';
      }

      // Extract caption - try multiple methods (based on primitives/instagram/selectors.js)
      let caption = '';

      // Helper to check if text is UI noise
      const isUIText = (text) => {
        if (!text || text.length < 5) return true;
        const uiPatterns = [
          /^(Follow|Like|Comment|Share|Send|Save)$/i,
          /English\nAfrikaans\nالعربية/, // Language selector
          /^@\w+$/, // Just a username
          /^[0-9,]+ (likes?|comments?|views?)$/i
        ];
        return uiPatterns.some(pattern => pattern.test(text));
      };

      // Method 1: Main heading (article h1)
      const h1 = document.querySelector('article h1');
      if (h1) {
        const text = h1.innerText?.trim() || '';
        if (!isUIText(text)) {
          caption = text;
        }
      }

      // Method 2: Caption in first list item after username
      if (!caption) {
        const captionSpan = document.querySelector('article ul > div li:nth-child(1) span');
        if (captionSpan) {
          const text = captionSpan.innerText?.trim() || '';
          // Skip if it looks like just a username
          if (text.length >= 10 && !text.match(/^@\w+$/) && !isUIText(text)) {
            caption = text;
          }
        }
      }

      // Method 3: Spans with line-height styling (captions often have this)
      if (!caption) {
        const styledSpans = document.querySelectorAll('article span[style*="line-height"]');
        for (const span of styledSpans) {
          const text = span.innerText?.trim() || '';
          if (text.length >= 20 && !isUIText(text)) {
            caption = text;
            break;
          }
        }
      }

      // Method 4: Fallback - longest meaningful span (improved)
      if (!caption) {
        const spans = document.querySelectorAll('article span');
        let longestText = '';
        spans.forEach(span => {
          const text = span.innerText?.trim() || '';
          if (text.length > longestText.length && text.length >= 20 && !isUIText(text)) {
            longestText = text;
          }
        });
        if (longestText) {
          caption = longestText;
        }
      }

      // Determine format
      let format = 'Single Image';
      let isReel = false;

      if (window.location.pathname.includes('/reel/')) {
        format = 'Reel';
        isReel = true;
      } else if (document.querySelector('video')) {
        format = 'Video';
      } else if (document.querySelector('button[aria-label*="Next"], button[aria-label*="Próximo"]')) {
        format = 'Carousel';
      } else {
        const images = document.querySelectorAll('img[alt]');
        if (images.length > 3) { // More than just profile pics
          format = 'Carousel';
        }
      }

      // Extract media URLs
      const mediaUrls = [];

      // Helper to check if URL is a real CDN URL (not blob)
      const isRealUrl = (url) => {
        if (!url) return false;
        // Filter out blob URLs and data URLs
        if (url.startsWith('blob:') || url.startsWith('data:')) return false;
        // Only accept http/https URLs
        return url.startsWith('http://') || url.startsWith('https://');
      };

      // Get video sources from DOM
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        // Try to get actual source URL
        if (video.src && isRealUrl(video.src) && !mediaUrls.includes(video.src)) {
          mediaUrls.push(video.src);
        }

        // Check source elements
        const sources = video.querySelectorAll('source');
        sources.forEach(source => {
          if (source.src && isRealUrl(source.src) && !mediaUrls.includes(source.src)) {
            mediaUrls.push(source.src);
          }
        });
      });

      // Fallback: Try to get video URL from meta tags (for Reels/Videos)
      if (videos.length > 0 && mediaUrls.length === 0) {
        // Check og:video meta tag
        const ogVideo = document.querySelector('meta[property="og:video"], meta[property="og:video:secure_url"]');
        if (ogVideo && ogVideo.content && isRealUrl(ogVideo.content)) {
          mediaUrls.push(ogVideo.content);
        }
      }

      // Get image sources (skip profile pictures)
      const images = document.querySelectorAll('img[srcset], img[src]');
      images.forEach(img => {
        // Skip profile/avatar images
        if (img.alt && (img.alt.includes('profile') || img.alt.includes('avatar'))) {
          return;
        }

        // Prefer srcset for higher quality
        if (img.srcset) {
          const srcsetParts = img.srcset.split(',');
          const lastSrc = srcsetParts[srcsetParts.length - 1];
          const imgUrl = lastSrc.trim().split(' ')[0];
          if (imgUrl && !imgUrl.includes('/profile/') && !mediaUrls.includes(imgUrl)) {
            mediaUrls.push(imgUrl);
          }
        } else if (img.src && !img.src.includes('/profile/') && !mediaUrls.includes(img.src)) {
          mediaUrls.push(img.src);
        }
      });

      return {
        creator,
        datePosted,
        caption: caption.trim(),
        format,
        isReel,
        mediaUrls
      };
    });

    logger.info('Extracted post data', {
      creator: postData.creator,
      format: postData.format,
      captionLength: postData.caption?.length || 0,
      mediaCount: postData.mediaUrls?.length || 0
    });

    // Take screenshot if requested
    let screenshotPath = null;
    if (takeScreenshot) {
      logger.info('Step 4/4: Taking screenshot');
      const screenshotFilename = postId + '.png';
      screenshotPath = join(outputDir, screenshotFilename);

      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      });

      logger.info('Screenshot saved', { path: screenshotPath });
    } else {
      logger.info('Step 4/4: Skipping screenshot');
    }

    // Disconnect (don't close the browser)
    await browser.disconnect();

    // Build result
    const result = {
      success: true,
      postId,
      url,
      creator: postData.creator || '',
      datePosted: postData.datePosted || '',
      caption: postData.caption || '',
      format: postData.format || 'Unknown',
      isReel: postData.isReel || false,
      screenshotPath,
      mediaUrls: postData.mediaUrls || [],
      videoTranscription: null, // Will be populated by downstream process if needed
      extractedAt: new Date().toISOString()
    };

    console.log(JSON.stringify(result, null, 2));
    logger.info('Post extraction complete', { postId, format: result.format });

    process.exit(0);

  } catch (error) {
    logger.error('Post extraction failed', { error: error.message, stack: error.stack });

    // Try to disconnect browser on error
    if (browser) {
      try {
        await browser.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
    }

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }));

    process.exit(1);
  }
}

extractPostFull();
