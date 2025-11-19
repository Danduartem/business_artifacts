#!/usr/bin/env node
/**
 * @workflow instagram.profiles-to-airtable
 * @when Extract Instagram posts from profiles by date range, analyze content, and save to Airtable
 * @complexity high
 * @category instagram
 *
 * @flag profiles - Comma-separated profile usernames (e.g., "tay.ldantas,blankschoolbr")
 * @flag start-date - Start date YYYY-MM-DD (e.g., "2025-11-01")
 * @flag end-date - End date YYYY-MM-DD (e.g., "2025-11-30")
 * @flag profile - Chrome profile to use (optional)
 * @flag headless - Run browser in headless mode (optional)
 * @flag skip-duplicates - Skip posts that already exist in Airtable (optional)
 * @flag dry-run - Test without saving to Airtable (optional)
 * @flag output-dir - Directory for media files (optional)
 *
 * @example
 * node profiles-to-airtable.js --profiles "tay.ldantas,blankschoolbr" --start-date "2025-11-01" --end-date "2025-11-30"
 */

import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';
import { executePrimitive, executePrimitiveNoReturn } from '../workflow-utils.js';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Auto-cleanup before starting
try {
  execSync('bash ' + join(__dirname, '../../../core/cleanup-processes.sh'), { stdio: 'inherit' });
} catch (e) {
  // Ignore cleanup errors
}

const logger = createLogger({ toolName: 'instagram.profiles-to-airtable' });
const args = parseArgs({
  options: {
    'profiles': { type: 'string' },
    'start-date': { type: 'string' },
    'end-date': { type: 'string' },
    'profile': { type: 'string' },
    'headless': { type: 'string' },
    'skip-duplicates': { type: 'string' },
    'dry-run': { type: 'string' },
    'output-dir': { type: 'string' }
  }
});

/**
 * Extract URLs from a profile page using browser primitives
 */
function extractUrlsFromProfile(username, options = {}) {
  logger.info('Extracting URLs from profile', { username });

  try {
    // Start browser
    executePrimitive('browser/start.js', {
      profile: options.profile ? true : false,
      headless: options.headless || false
    });

    // Navigate to profile
    const url = `https://www.instagram.com/${username}/`;
    executePrimitive('browser/navigate.js', {
      url,
      'wait-until': 'networkidle2'
    });

    // Wait for content to load
    executePrimitive('page/wait-for.js', {
      selector: 'article',
      timeout: 15000
    });

    // Scroll multiple times to load more posts
    const scrollCount = 5;
    for (let i = 0; i < scrollCount; i++) {
      executePrimitive('page/scroll.js', {
        to: 'bottom'
      });

      // Wait a bit for new posts to load
      executePrimitive('page/wait-for.js', {
        selector: 'article',
        timeout: 2000
      });
    }

    // Extract all post URLs using eval
    // Note: When logged in, Instagram doesn't use <article> tags
    const extractCode = `async () => {
      const links = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]'));
      const urls = [...new Set(links.map(a => a.href))];
      return urls;
    }`;

    const result = executePrimitive('browser/eval.js', {
      code: extractCode
    });

    // Close browser
    executePrimitiveNoReturn('browser/close.js');

    if (!result.success || !result.result) {
      throw new Error('Failed to extract URLs from page');
    }

    logger.info('URLs extracted successfully', {
      username,
      count: result.result.length
    });

    return result.result;

  } catch (error) {
    // Try to close browser on error
    executePrimitiveNoReturn('browser/close.js');

    logger.error('Failed to extract URLs', { username, error: error.message });
    throw new Error(`Could not extract URLs from @${username}: ${error.message}`);
  }
}

/**
 * Main workflow execution
 */
async function profilesToAirtable() {
  try {
    // Validate required arguments
    if (!args.values.profiles) {
      throw new Error('--profiles is required (comma-separated usernames)');
    }

    if (!args.values['start-date'] || !args.values['end-date']) {
      throw new Error('--start-date and --end-date are required (YYYY-MM-DD)');
    }

    const profilesArg = args.values.profiles;
    const startDate = args.values['start-date'];
    const endDate = args.values['end-date'];
    const outputDir = args.values['output-dir'] || join(process.cwd(), 'instagram_extracts');
    const skipDuplicates = args.values['skip-duplicates'] === 'true' || args.values['skip-duplicates'] === true;
    const dryRun = args.values['dry-run'] === 'true' || args.values['dry-run'] === true;
    const profile = args.values.profile;
    const headless = args.values.headless === 'true' || args.values.headless === true;

    // Parse profiles
    const profiles = profilesArg.split(',').map(p => p.trim()).filter(p => p);

    if (profiles.length === 0) {
      throw new Error('No valid profiles provided');
    }

    // Create output directory
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    logger.info('Starting profiles-to-airtable workflow', {
      profiles,
      dateRange: { startDate, endDate },
      dryRun
    });

    console.log(`\n🚀 Instagram → Airtable Pipeline`);
    console.log(`   Profiles: ${profiles.join(', ')}`);
    console.log(`   Date Range: ${startDate} to ${endDate}`);
    console.log(`   Output: ${outputDir}`);
    if (dryRun) console.log(`   ⚠️  DRY RUN MODE\n`);
    else console.log('');

    // Collect all URLs from all profiles
    const allUrls = [];
    const profileResults = {};

    for (const username of profiles) {
      console.log(`\n[${profiles.indexOf(username) + 1}/${profiles.length}] Processing @${username}`);

      try {
        // Extract URLs from profile
        const urls = extractUrlsFromProfile(username, { profile, headless });

        console.log(`   ✅ Found ${urls.length} posts`);

        // Store for this profile
        profileResults[username] = {
          urls,
          count: urls.length
        };

        allUrls.push(...urls);

      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}`);
        logger.error('Profile extraction failed', { username, error: error.message });

        profileResults[username] = {
          urls: [],
          count: 0,
          error: error.message
        };
      }
    }

    if (allUrls.length === 0) {
      throw new Error('No posts found from any profile');
    }

    console.log(`\n📊 Total posts found: ${allUrls.length}`);
    console.log(`\n🔄 Starting extraction and analysis pipeline...\n`);

    // Save URLs to temp file
    const urlsFile = join(outputDir, 'collected-urls.txt');
    writeFileSync(urlsFile, allUrls.join('\n'));

    // Now use the extract-analyze-and-save workflow to process all URLs
    // We'll use the first profile as the creator
    const primaryCreator = '@' + profiles[0];

    const command = [
      'node',
      'agent-tools/capabilities/workflows/instagram/extract-analyze-and-save.js',
      `--urls "${urlsFile}"`,
      `--creator "${primaryCreator}"`,
      `--output-dir "${outputDir}"`,
      `--skip-duplicates ${skipDuplicates}`,
      `--dry-run ${dryRun}`
    ];

    if (profile) {
      command.push(`--profile "${profile}"`);
    }

    if (headless) {
      command.push('--headless true');
    }

    logger.info('Executing extract-analyze-and-save workflow', {
      totalUrls: allUrls.length,
      creator: primaryCreator
    });

    try {
      execSync(command.join(' '), {
        encoding: 'utf-8',
        stdio: 'inherit',
        maxBuffer: 50 * 1024 * 1024
      });

      console.log(`\n✅ Pipeline complete!`);
      console.log(`\nSummary by profile:`);
      for (const [username, result] of Object.entries(profileResults)) {
        if (result.error) {
          console.log(`  ❌ @${username}: ${result.error}`);
        } else {
          console.log(`  ✅ @${username}: ${result.count} posts`);
        }
      }

      const summary = {
        success: true,
        profiles: profiles.length,
        totalPosts: allUrls.length,
        dateRange: { startDate, endDate },
        byProfile: profileResults,
        outputDir
      };

      console.log('\n' + JSON.stringify(summary, null, 2));
      logger.info('Workflow completed', summary);

    } catch (error) {
      throw new Error(`Pipeline failed: ${error.message}`);
    }

  } catch (error) {
    logger.error('Workflow failed', { error: error.message });

    console.log('\n' + JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

profilesToAirtable();
