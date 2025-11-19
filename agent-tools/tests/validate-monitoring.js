#!/usr/bin/env node
/**
 * Monitoring System Validation Test
 *
 * Tests the complete flow: discovery → execution → monitoring
 * Measures token usage and validates 98% savings claim
 *
 * Usage:
 *   node tests/validate-monitoring.js [--full]
 *
 * Options:
 *   --full    Run full test with 5-10 posts (longer duration)
 *   (default) Run quick test with 1-2 posts (30-60 seconds)
 */

import { executeJob, getJobsByCategory, getIndex } from '../core/discovery.js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI colors for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
  console.log('');
  log('='.repeat(60), 'dim');
  log(title, 'cyan');
  log('='.repeat(60), 'dim');
  console.log('');
}

// Token estimation (rough approximation based on character count)
function estimateTokens(text) {
  // Rough estimate: ~4 characters per token for English text
  // JSON is slightly more efficient, code is less efficient
  // This is a simplification but good enough for validation
  return Math.ceil(text.length / 4);
}

// Track token usage
class TokenTracker {
  constructor() {
    this.operations = [];
    this.total = 0;
  }

  track(operation, content, notes = '') {
    const tokens = estimateTokens(content);
    this.operations.push({ operation, tokens, notes });
    this.total += tokens;
    return tokens;
  }

  report() {
    section('Token Usage Report');

    log('Operations:', 'yellow');
    this.operations.forEach(({ operation, tokens, notes }) => {
      const notesStr = notes ? ` (${notes})` : '';
      log(`  ${operation}: ${tokens.toLocaleString()} tokens${notesStr}`, 'dim');
    });

    console.log('');
    log(`Total Token Usage: ${this.total.toLocaleString()} tokens`, 'green');

    return this.total;
  }

  compare(baseline, label = 'Old Method') {
    const savings = baseline - this.total;
    const savingsPercent = ((savings / baseline) * 100).toFixed(1);

    console.log('');
    log('Comparison:', 'yellow');
    log(`  ${label}: ${baseline.toLocaleString()} tokens`, 'dim');
    log(`  New Method: ${this.total.toLocaleString()} tokens`, 'dim');
    log(`  Savings: ${savings.toLocaleString()} tokens (${savingsPercent}%)`, 'green');

    return { savings, savingsPercent };
  }
}

async function testDiscoveryPhase() {
  section('Phase 1: Discovery System Test');

  const tracker = new TokenTracker();

  log('Testing getIndex()...', 'blue');
  const index = getIndex();
  const indexContent = JSON.stringify(index);
  tracker.track('getIndex()', indexContent, 'loads index.json only');

  log(`✓ Found ${Object.keys(index.categories).length} categories`, 'green');

  log('\nTesting getJobsByCategory(\'instagram\')...', 'blue');
  const instagramJobs = getJobsByCategory('instagram');
  const jobsContent = JSON.stringify(instagramJobs);
  tracker.track('getJobsByCategory()', jobsContent, 'loads instagram jobs only');

  log(`✓ Found ${instagramJobs.tools.length} Instagram jobs`, 'green');

  const job = instagramJobs.tools.find(j => j.id === 'complete-profile-extraction');
  if (job) {
    log(`✓ Located target job: ${job.id}`, 'green');
  } else {
    log('✗ Could not find complete-profile-extraction job', 'red');
    throw new Error('Target job not found');
  }

  const discoveryTokens = tracker.report();

  // Compare to loading full registry
  const registryPath = resolve(__dirname, '../core/registry.json');
  if (existsSync(registryPath)) {
    const fullRegistry = readFileSync(registryPath, 'utf-8');
    const fullRegistryTokens = estimateTokens(fullRegistry);

    tracker.compare(fullRegistryTokens, 'Loading Full Registry');
  }

  return { tracker, discoveryTokens };
}

async function testMonitoringPhase(quickTest = true) {
  section('Phase 2: Execution with Monitoring Test');

  const tracker = new TokenTracker();

  // Use a short date range for quick testing
  const testParams = quickTest ? {
    username: 'blankschoolbr',
    'start-date': '2025-11-01',
    'end-date': '2025-11-01', // Single day for quick test
    profile: true,
    transcribe: false // Skip transcription for speed
  } : {
    username: 'blankschoolbr',
    'start-date': '2025-11-01',
    'end-date': '2025-11-05', // 5 days
    profile: true,
    transcribe: true
  };

  log('Test Parameters:', 'yellow');
  Object.entries(testParams).forEach(([key, value]) => {
    log(`  ${key}: ${value}`, 'dim');
  });
  console.log('');

  log('Starting execution with monitoring...', 'blue');
  log('(Progress updates should appear every 15 seconds)', 'dim');
  console.log('');

  const startTime = Date.now();
  let progressUpdateCount = 0;
  let lastProgressContent = '';

  try {
    const result = await executeJob('complete-profile-extraction', testParams, {
      verbose: true,
      onProgress: (status) => {
        progressUpdateCount++;
        lastProgressContent = JSON.stringify(status);
        tracker.track(`Progress Update #${progressUpdateCount}`, lastProgressContent, '15s poll with filter');
      }
    });

    const duration = Date.now() - startTime;
    const durationSec = (duration / 1000).toFixed(1);

    console.log('');
    log(`✓ Execution completed in ${durationSec} seconds`, 'green');
    log(`✓ Received ${progressUpdateCount} progress updates`, 'green');

    if (result.summary) {
      log('\nJob Summary:', 'yellow');
      Object.entries(result.summary).forEach(([key, value]) => {
        log(`  ${key}: ${value}`, 'dim');
      });
    }

    if (result.outputFile) {
      log(`\nOutput file: ${result.outputFile}`, 'dim');
    }

    // Estimate what unfiltered polling would have cost
    console.log('');
    log('Token Analysis:', 'yellow');

    const monitoringTokens = tracker.total;
    const avgTokensPerPoll = progressUpdateCount > 0 ? monitoringTokens / progressUpdateCount : 0;

    log(`  Filtered polling: ~${Math.round(avgTokensPerPoll)} tokens per poll`, 'dim');
    log(`  Total monitoring: ${monitoringTokens} tokens`, 'dim');

    // Estimate unfiltered cost (15,000 tokens per poll)
    const unfilteredEstimate = progressUpdateCount * 15000;
    log(`  Unfiltered estimate: ${unfilteredEstimate.toLocaleString()} tokens`, 'red');

    if (unfilteredEstimate > 0) {
      const pollSavings = ((unfilteredEstimate - monitoringTokens) / unfilteredEstimate * 100).toFixed(1);
      log(`  Monitoring savings: ${pollSavings}% reduction`, 'green');
    }

    return {
      tracker,
      monitoringTokens,
      progressUpdateCount,
      duration: durationSec,
      unfilteredEstimate
    };

  } catch (error) {
    console.log('');
    log(`✗ Execution failed: ${error.message}`, 'red');
    throw error;
  }
}

async function testCompleteFlow(quickTest = true) {
  section('Complete Flow Validation');

  log('Testing: Discovery → Execution → Monitoring', 'cyan');
  log(quickTest ? '(Quick test mode: 1 day, no transcription)' : '(Full test mode: 5 days, with transcription)', 'dim');

  try {
    // Phase 1: Discovery
    const { discoveryTokens } = await testDiscoveryPhase();

    // Phase 2: Execution with Monitoring
    const { monitoringTokens, progressUpdateCount, duration, unfilteredEstimate } =
      await testMonitoringPhase(quickTest);

    // Final Report
    section('Final Validation Report');

    const totalTokens = discoveryTokens + monitoringTokens;

    log('Summary:', 'yellow');
    log(`  Discovery: ${discoveryTokens} tokens`, 'dim');
    log(`  Monitoring: ${monitoringTokens} tokens (${progressUpdateCount} updates)`, 'dim');
    log(`  Total: ${totalTokens.toLocaleString()} tokens`, 'green');
    log(`  Duration: ${duration} seconds`, 'dim');
    console.log('');

    // Compare to old method
    const oldMethodBaseline = 51000; // From documentation
    const oldMethodUnfilteredPolling = 8000 + unfilteredEstimate; // Registry + unfiltered polls

    log('Comparison to Old Method:', 'yellow');
    log(`  Old method (documented): 51,000 tokens`, 'red');
    log(`  Old method (calculated): ${oldMethodUnfilteredPolling.toLocaleString()} tokens`, 'red');
    log(`  New method: ${totalTokens.toLocaleString()} tokens`, 'green');

    const savingsVsDocumented = ((51000 - totalTokens) / 51000 * 100).toFixed(1);
    const savingsVsCalculated = oldMethodUnfilteredPolling > 0
      ? ((oldMethodUnfilteredPolling - totalTokens) / oldMethodUnfilteredPolling * 100).toFixed(1)
      : 0;

    log(`  Savings (vs documented): ${savingsVsDocumented}%`, 'green');
    log(`  Savings (vs calculated): ${savingsVsCalculated}%`, 'green');

    console.log('');

    // Validation checks
    log('Validation Checks:', 'yellow');

    const checks = [
      {
        name: 'Discovery uses progressive disclosure',
        pass: discoveryTokens < 500,
        actual: `${discoveryTokens} tokens (expected < 500)`
      },
      {
        name: 'Monitoring provides progress updates',
        pass: progressUpdateCount > 0,
        actual: `${progressUpdateCount} updates received`
      },
      {
        name: 'Token savings > 90%',
        pass: parseFloat(savingsVsDocumented) > 90,
        actual: `${savingsVsDocumented}% savings`
      },
      {
        name: 'Execution completes successfully',
        pass: true,
        actual: `Completed in ${duration}s`
      }
    ];

    checks.forEach(({ name, pass, actual }) => {
      const icon = pass ? '✓' : '✗';
      const color = pass ? 'green' : 'red';
      log(`  ${icon} ${name}`, color);
      log(`    ${actual}`, 'dim');
    });

    console.log('');

    const allPassed = checks.every(c => c.pass);

    if (allPassed) {
      log('🎉 All validation checks passed!', 'green');
      log('The monitoring system is working as expected.', 'green');
    } else {
      log('⚠️  Some validation checks failed', 'yellow');
      log('Review the results above for details.', 'yellow');
    }

    return allPassed;

  } catch (error) {
    section('Validation Failed');
    log(`Error: ${error.message}`, 'red');
    if (error.stack) {
      log('\nStack trace:', 'dim');
      console.error(error.stack);
    }
    return false;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const quickTest = !args.includes('--full');

  console.log('');
  log('╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Monitoring System Validation Test                 ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝', 'cyan');
  console.log('');

  const success = await testCompleteFlow(quickTest);

  console.log('');
  process.exit(success ? 0 : 1);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { testDiscoveryPhase, testMonitoringPhase, testCompleteFlow };
