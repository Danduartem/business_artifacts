#!/usr/bin/env node

/**
 * Instagram Batch Processor Orchestrator V2
 * Clean, composable workflow using modular tools
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { extractPosts } from './extractor.js';
import { captureScreenshots } from './screenshotter.js';
import { transcribeVideos } from './transcriber.js';
import { analyzeBatch } from './analyzer.js';
import { validateAndDedupe } from './validator.js';
import { savePosts } from './saver.js';
import { savePostsToAirtable } from '../../../../../../agent-tools/airtable-integration/scripts/airtable-save.js';

/**
 * Main orchestration function (V2 - Composable)
 *
 * @param {Object} options - Workflow options
 * @returns {Promise<Object>} - Workflow results
 */
export async function orchestrate(options) {
  const {
    profiles = [],
    startDate = '2000-01-01',
    endDate = '2099-12-31',
    cacheDir = '.cache',
    skipExtract = false,
    skipScreenshots = false,
    skipTranscribe = false,
    skipAnalyze = false,
    skipValidate = false,
    skipSave = false,
    mode = 'agent', // 'agent' or 'api'
    saveTarget = 'notion', // 'notion' or 'airtable'
    batchSize = 10,
    dryRun = false,
  } = options;

  console.log('🚀 Instagram Batch Processor V2\n');
  console.log(`Profiles: ${profiles.join(', ')}`);
  console.log(`Period: ${startDate} to ${endDate}`);
  console.log(`Analysis Mode: ${mode}`);
  console.log(`Save Target: ${saveTarget}`);
  if (dryRun) console.log(`[DRY RUN MODE]\n`);

  const results = {
    profiles: {},
    summary: {
      totalPosts: 0,
      screenshots: 0,
      transcriptions: 0,
      analyzed: 0,
      validated: 0,
      saved: 0,
      errors: 0,
    },
    startTime: new Date().toISOString(),
  };

  for (const profile of profiles) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📸 Processing @${profile}`);
    console.log('='.repeat(60));

    try {
      // STEP 1: Extract posts
      let posts;
      if (!skipExtract) {
        const extracted = await extractPosts(profile, {
          startDate,
          endDate,
          cacheDir,
        });
        posts = extracted.posts;
        results.summary.totalPosts += posts.length;
      } else {
        // Load from cache
        const postsFile = join(cacheDir, `${profile}-posts.json`);
        posts = JSON.parse(readFileSync(postsFile, 'utf-8'));
        console.log(`\n⏭️  Skipped extraction, loaded ${posts.length} posts from cache`);
      }

      // STEP 2: Capture screenshots
      if (!skipScreenshots) {
        const screenshotResults = await captureScreenshots(posts);
        results.summary.screenshots += screenshotResults.successful;
        results.summary.errors += screenshotResults.failed;
      } else {
        console.log(`\n⏭️  Skipped screenshots`);
      }

      // Save posts with screenshots
      const postsFile = join(cacheDir, `${profile}-posts.json`);
      writeFileSync(postsFile, JSON.stringify(posts, null, 2));

      // STEP 3: Transcribe videos
      if (!skipTranscribe) {
        const transcribeResults = await transcribeVideos(posts);
        results.summary.transcriptions += transcribeResults.successful;
        results.summary.errors += transcribeResults.failed;
      } else {
        console.log(`\n⏭️  Skipped transcription`);
      }

      // Save posts with transcriptions
      writeFileSync(postsFile, JSON.stringify(posts, null, 2));

      // STEP 4: Analyze posts
      let analyzed;
      if (!skipAnalyze) {
        analyzed = await analyzeBatch(posts, batchSize, { mode });

        // Handle agent-aware mode
        if (analyzed.needsAgentProcessing) {
          console.log(`\n⏸️  Analysis paused - agent intervention required`);
          console.log(`📂 Prompts saved to: ${analyzed.promptsDir}`);

          // Save workflow state for resumption
          const stateFile = join(cacheDir, `${profile}-workflow-state.json`);
          writeFileSync(stateFile, JSON.stringify({
            profile,
            step: 'analysis_pending',
            manifestFile: analyzed.manifestFile,
            promptsDir: analyzed.promptsDir,
            postsFile,
            timestamp: new Date().toISOString()
          }, null, 2));

          console.log(`💾 Workflow state saved: ${stateFile}`);
          console.log(`\n⚠️  Please process analysis prompts and resume workflow`);

          // Don't continue for this profile
          results.profiles[profile] = {
            status: 'paused_for_analysis',
            stateFile,
            manifestFile: analyzed.manifestFile
          };
          continue;
        }

        results.summary.analyzed += analyzed.length;
      } else {
        // Load analyzed results from cache
        const analyzedFile = join(cacheDir, `${profile}-analyzed.json`);
        analyzed = JSON.parse(readFileSync(analyzedFile, 'utf-8'));
        console.log(`\n⏭️  Skipped analysis, loaded ${analyzed.length} from cache`);
      }

      // STEP 5: Validate and deduplicate
      let validated;
      if (!skipValidate) {
        validated = await validateAndDedupe(analyzed, profile);
        results.summary.validated += validated.length;
      } else {
        validated = analyzed;
        console.log(`\n⏭️  Skipped validation`);
      }

      // STEP 6: Save to database
      if (!skipSave && validated.length > 0) {
        let saveResults;

        if (saveTarget === 'airtable') {
          saveResults = await savePostsToAirtable(validated, {
            creatorName: `@${profile}`,
            dryRun,
            continueOnError: true
          });
        } else {
          // Default to Notion (legacy)
          saveResults = await savePosts(validated, { dryRun });
        }

        results.summary.saved += saveResults.successful;
        results.summary.errors += saveResults.failed;
      } else if (skipSave) {
        console.log(`\n⏭️  Skipped saving to database`);
      }

      // Store profile results
      results.profiles[profile] = {
        status: 'completed',
        posts: posts.length,
        validated: validated.length,
        saved: skipSave ? 0 : results.summary.saved,
      };

    } catch (error) {
      console.error(`\n✗ Error processing @${profile}:`, error.message);
      results.profiles[profile] = {
        status: 'failed',
        error: error.message
      };
      results.summary.errors++;
    }
  }

  // Final summary
  results.endTime = new Date().toISOString();

  console.log(`\n\n${'='.repeat(60)}`);
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total posts found: ${results.summary.totalPosts}`);
  console.log(`Screenshots captured: ${results.summary.screenshots}`);
  console.log(`Videos transcribed: ${results.summary.transcriptions}`);
  console.log(`Posts analyzed: ${results.summary.analyzed}`);
  console.log(`Posts validated: ${results.summary.validated}`);
  console.log(`Posts saved to ${saveTarget}: ${results.summary.saved}`);
  console.log(`Errors: ${results.summary.errors}`);
  console.log('='.repeat(60));

  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const profiles = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  const args = process.argv.slice(2);

  const getArg = (name) => {
    const arg = args.find(a => a.startsWith(`--${name}=`));
    return arg ? arg.split('=')[1] : null;
  };

  const hasFlag = (name) => args.includes(`--${name}`);

  const options = {
    profiles,
    startDate: getArg('start') || '2000-01-01',
    endDate: getArg('end') || '2099-12-31',
    mode: getArg('mode') || 'agent',
    saveTarget: getArg('target') || 'notion',
    batchSize: parseInt(getArg('batch-size') || '10'),
    skipExtract: hasFlag('skip-extract'),
    skipScreenshots: hasFlag('skip-screenshots'),
    skipTranscribe: hasFlag('skip-transcribe'),
    skipAnalyze: hasFlag('skip-analyze'),
    skipValidate: hasFlag('skip-validate'),
    skipSave: hasFlag('skip-save'),
    dryRun: hasFlag('dry-run'),
  };

  if (profiles.length === 0) {
    console.error('Usage: orchestrator-v2.js <profile1> [profile2...] [options]');
    console.error('\nOptions:');
    console.error('  --start=YYYY-MM-DD      Start date (default: 2000-01-01)');
    console.error('  --end=YYYY-MM-DD        End date (default: 2099-12-31)');
    console.error('  --mode=agent|api        Analysis mode (default: agent)');
    console.error('  --target=notion|airtable Save target database (default: notion)');
    console.error('  --batch-size=N          Batch size for analysis (default: 10)');
    console.error('  --skip-extract          Skip post extraction');
    console.error('  --skip-screenshots      Skip screenshot capture');
    console.error('  --skip-transcribe       Skip video transcription');
    console.error('  --skip-analyze          Skip LLM analysis');
    console.error('  --skip-validate         Skip validation & deduplication');
    console.error('  --skip-save             Skip saving to database');
    console.error('  --dry-run               Run without saving to database');
    process.exit(1);
  }

  orchestrate(options)
    .then(() => process.exit(0))
    .catch(error => {
      console.error('\n✗ Fatal error:', error.message);
      process.exit(1);
    });
}

export default orchestrate;
