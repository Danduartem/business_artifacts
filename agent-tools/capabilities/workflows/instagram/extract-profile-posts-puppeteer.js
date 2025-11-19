#!/usr/bin/env node

/**
 * @workflow instagram.extract-profile-posts-puppeteer
 * @description Extract Instagram posts using Puppeteer native APIs (no eval!)
 * @category instagram
 *
 * @input username string - Instagram username (required)
 * @input start-date string - Start date in YYYY-MM-DD format (required)
 * @input end-date string - End date in YYYY-MM-DD format (required)
 * @input profile boolean - Use Chrome profile (optional)
 * @input headless boolean - Force headless Chrome (optional)
 * @input output string - Output JSON file path (optional)
 * @input max-scrolls number - Maximum scroll attempts (default: 30)
 *
 * @output posts array - Array of post objects with URL, date, media type
 * @output success boolean - Operation success status
 *
 * @example
 * node instagram/extract-profile-posts-puppeteer.js --username natgeo --start-date 2024-01-01 --end-date 2024-12-31
 */

import puppeteer from 'puppeteer-core';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';
import { writeFileSync } from 'fs';
import { join } from 'path';

const logger = createLogger({ toolName: 'workflow.instagram.extract-profile-posts-puppeteer' });
const args = parseArgs();
const state = createStateManager({ namespace: 'instagram-extract-puppeteer' });

async function extractProfilePostsPuppeteer() {
  let browser = null;

  try {
    // Validate inputs
    if (!args.flags.username) {
      throw new Error('--username is required');
    }
    if (!args.flags['start-date']) {
      throw new Error('--start-date is required (format: YYYY-MM-DD)');
    }
    if (!args.flags['end-date']) {
      throw new Error('--end-date is required (format: YYYY-MM-DD)');
    }

    const username = args.flags.username;
    const startDate = new Date(args.flags['start-date']);
    const endDate = new Date(args.flags['end-date']);
    const maxScrolls = args.flags['max-scrolls'] || 30;
    const url = `https://www.instagram.com/${username}/`;

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format. Use YYYY-MM-DD');
    }

    if (startDate > endDate) {
      throw new Error('start-date must be before end-date');
    }

    logger.info('Starting Instagram posts extraction (Puppeteer API mode)', {
      username,
      startDate: args.flags['start-date'],
      endDate: args.flags['end-date'],
      maxScrolls
    });

    // Connect to existing browser or start new one
    try {
      browser = await puppeteer.connect({
        browserURL: 'http://localhost:9222',
        defaultViewport: null
      });
      logger.info('Connected to existing browser');
    } catch (err) {
      logger.info('No existing browser, starting new one');
      // If no browser running, you could start one here or throw error
      throw new Error('No browser running. Start browser first with: node capabilities/primitives/browser/start.js --profile');
    }

    let pages = await browser.pages();
    let page = pages[pages.length - 1];

    // If no active tab, create one
    if (!page) {
      logger.info('No active tab found, creating new tab');
      page = await browser.newPage();
      logger.info('New tab created');
    }

    // Navigate to profile
    logger.info('Step 1/4: Navigating to profile');
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    logger.info('Navigation complete', { url });

    // Wait for content to load
    logger.info('Step 2/4: Waiting for content to load');
    await page.waitForSelector('a[href*="/p/"], a[href*="/reel/"]', { timeout: 30000 });
    logger.info('Content loaded');

    // Extract posts with scrolling (Puppeteer API style!)
    logger.info('Step 3/4: Extracting posts with scrolling');

    const posts = [];
    const seenUrls = new Set();
    let scrollAttempts = 0;
    let stableCount = 0;
    let noNewPostsCount = 0; // Track consecutive scrolls with no new posts

    // Max time limit: 5 minutes
    const MAX_SCROLL_TIME = 5 * 60 * 1000;
    const scrollStartTime = Date.now();
    let lastProgressLog = Date.now();

    while (scrollAttempts < maxScrolls && stableCount < 3 && noNewPostsCount < 5) {
      // Check max time limit
      const elapsed = Date.now() - scrollStartTime;
      if (elapsed > MAX_SCROLL_TIME) {
        logger.warn('Max scroll time reached (5 minutes), exiting scroll loop', {
          totalPosts: posts.length,
          scrollAttempts,
          elapsedMs: elapsed
        });
        break;
      }

      // Progress logging every 10 seconds
      if (Date.now() - lastProgressLog > 10000) {
        logger.info('Scroll progress', {
          totalPosts: posts.length,
          scrollAttempts,
          elapsedSeconds: Math.floor(elapsed / 1000),
          stableCount,
          noNewPostsCount
        });
        lastProgressLog = Date.now();
      }

      // Extract visible posts using page.$$eval (no complex eval!)
      const newPosts = await page.$$eval(
        'a[href*="/p/"], a[href*="/reel/"]',
        (elements) => {
          return elements.map(el => {
            const url = el.href;
            const shortcodeMatch = url.match(/\/(p|reel)\/([^/]+)/);
            return {
              url: url,
              shortcode: shortcodeMatch ? shortcodeMatch[2] : null,
              mediaType: url.includes('/reel/') ? 'video' : 'image',
              extractedAt: new Date().toISOString()
            };
          });
        }
      );

      // Add new posts (filter duplicates in Node.js)
      let addedCount = 0;
      for (const post of newPosts) {
        if (!seenUrls.has(post.url)) {
          seenUrls.add(post.url);
          posts.push(post);
          addedCount++;
        }
      }

      logger.info('Scroll attempt', {
        attempt: scrollAttempts + 1,
        totalPosts: posts.length,
        newPosts: addedCount
      });

      // Track consecutive scrolls with no new posts
      if (addedCount === 0) {
        noNewPostsCount++;
        if (noNewPostsCount >= 5) {
          logger.info('No new posts found in 5 consecutive scrolls, likely reached end', {
            totalPosts: posts.length
          });
          break;
        }
      } else {
        noNewPostsCount = 0;
      }

      // Get current height (simple expression - Mario's style!)
      const previousHeight = await page.evaluate(() => document.body.scrollHeight);

      // Scroll (simple expression - Mario's style!)
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Wait for new content
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if page height changed
      const currentHeight = await page.evaluate(() => document.body.scrollHeight);

      if (currentHeight === previousHeight) {
        stableCount++;
        logger.info('Page height stable', { stableCount });
      } else {
        stableCount = 0;
      }

      scrollAttempts++;
    }

    logger.info('Extraction complete', {
      totalPosts: posts.length,
      scrollAttempts,
      stableCount
    });

    // Save checkpoint
    state.set('posts', posts);
    state.createCheckpoint();

    // Save results
    logger.info('Step 4/4: Saving results');
    const outputFile = args.flags.output || join(process.cwd(), `instagram_${username}_${args.flags['start-date']}_${args.flags['end-date']}.json`);

    const result = {
      success: true,
      username,
      profileUrl: url,
      dateRange: {
        start: args.flags['start-date'],
        end: args.flags['end-date']
      },
      posts,
      totalPosts: posts.length,
      scrollAttempts,
      extractedAt: new Date().toISOString(),
      method: 'puppeteer-native-apis'
    };

    writeFileSync(outputFile, JSON.stringify(result, null, 2));

    console.log(JSON.stringify(result));
    logger.info('Extraction complete', { output: outputFile, posts: posts.length });

    // Disconnect (don't close browser, it might be used by other tools)
    await browser.disconnect();

    // Exit successfully
    process.exit(0);

  } catch (error) {
    logger.error('Extraction failed', { error: error.message, stack: error.stack });

    if (browser) {
      try {
        await browser.disconnect();
      } catch {}
    }

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }));

    process.exit(1);
  }
}

extractProfilePostsPuppeteer();
