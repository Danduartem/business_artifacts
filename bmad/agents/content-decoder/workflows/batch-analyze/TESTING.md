# Testing Guide - Batch Analyze Workflow V2

## Overview

This document provides comprehensive testing procedures for the refactored batch-analyze workflow.

---

## Quick Syntax Verification ✅

All modules have passed syntax checks:

```bash
cd /Users/danielmenezes/Coding/business_artifacts/bmad/agents/content-decoder/workflows/batch-analyze

# Check all modules
node --check lib/extractor.js
node --check lib/screenshotter.js
node --check lib/transcriber.js
node --check lib/analyzer.js
node --check lib/validator.js
node --check lib/saver.js
node --check lib/llm-service.js
node --check lib/orchestrator-v2.js

# ✓ All passed
```

---

## Test Scenarios

### 1. Dry Run Test (Recommended First Test)

Test the workflow without making actual Notion saves:

```bash
cd /Users/danielmenezes/Coding/business_artifacts/bmad/agents/content-decoder/workflows/batch-analyze

# Test with recent data (November 2025)
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-30 \
  --dry-run \
  --skip-screenshots \
  --skip-transcribe \
  --skip-analyze

# This will:
# ✓ Extract posts
# ✓ Filter by date
# ✓ Save to cache
# ✗ Skip screenshots (faster)
# ✗ Skip transcription (faster)
# ✗ Skip analysis (faster)
# ✗ Skip Notion save (dry-run mode)
```

**Expected Output:**
```
🚀 Instagram Batch Processor V2

Profiles: berudolph
Period: 2025-11-01 to 2025-11-30
Mode: agent
[DRY RUN MODE]

============================================================
📸 Processing @berudolph
============================================================

⚙️  Extracting posts from @berudolph...
✓ Extracting posts from @berudolph complete

⚙️  Filtering posts by date (2025-11-01 to 2025-11-30)...
✓ Filtered N posts in date range
✓ Saved to: .cache/berudolph-posts.json

⏭️  Skipped screenshots

⏭️  Skipped transcription

⏭️  Skipped analysis

⏭️  Skipped saving to Notion

============================================================
📊 FINAL SUMMARY
============================================================
Total posts found: N
Screenshots captured: 0
Videos transcribed: 0
Posts analyzed: 0
Posts validated: 0
Posts saved to Notion: 0
Errors: 0
============================================================
```

---

### 2. Screenshot Test

Test screenshot capture functionality:

```bash
# Test with 3 posts maximum to avoid rate limiting
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-03 \
  --skip-transcribe \
  --skip-analyze \
  --skip-save \
  --dry-run
```

**What to Check:**
- Screenshots saved to `temp/screenshots/`
- File format: `{postId}.png`
- Files readable and valid images
- Console shows successful captures

---

### 3. Transcription Test

Test video download and transcription:

```bash
# Test with posts that have reels
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-15 \
  --end=2025-11-20 \
  --skip-screenshots \
  --skip-analyze \
  --skip-save \
  --dry-run
```

**What to Check:**
- Videos downloaded to `temp/videos/`
- Transcriptions saved as `.txt` files
- Parallel-safe (unique filenames with timestamp_random)
- Portuguese language transcription quality
- Console shows download + transcribe for each reel

---

### 4. Agent-Aware Analysis Test

Test LLM integration in agent-aware mode:

```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-30 \
  --mode=agent \
  --skip-save \
  --dry-run
```

**What to Check:**
- Prompts saved to `.cache/prompts/`
- Manifest file created: `.cache/prompts/manifest.json`
- Batch prompt files: `batch-1-prompt.txt`, etc.
- Batch data files: `batch-1-data.json`, etc.
- Console shows "AGENT INTERVENTION REQUIRED"
- Workflow pauses for manual processing

---

### 5. API Mode Test (Requires API Key)

Test fully automated LLM integration:

```bash
# Set API key first
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# Run in API mode
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-05 \
  --mode=api \
  --batch-size=5 \
  --skip-save \
  --dry-run
```

**What to Check:**
- API calls successful (check console for "Calling Claude API")
- Retry logic works (can test by temporarily using invalid API key)
- JSON parsing successful
- Posts analyzed with framework data
- No manual intervention required

---

### 6. Full End-to-End Test

Complete workflow test (use with caution - will save to Notion):

```bash
# Full workflow for a small date range
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-28 \
  --end=2025-11-30 \
  --mode=agent

# This will:
# 1. Extract posts
# 2. Capture screenshots
# 3. Download & transcribe reels
# 4. Save prompts for agent analysis
# 5. Pause for agent processing
# 6. (After you process analysis) Resume and save to Notion
```

---

## Module-Specific Tests

### Test Extractor Module

```bash
cd lib
node -e "
import { extractPosts } from './extractor.js';
const result = await extractPosts('berudolph', {
  startDate: '2025-11-01',
  endDate: '2025-11-30',
  cacheDir: '../.cache'
});
console.log('Extracted:', result.totalExtracted, 'posts');
"
```

### Test Screenshotter Module

```bash
node -e "
import { captureScreenshot } from './screenshotter.js';
const post = { url: 'https://www.instagram.com/berudolph/reel/DRDJrfECbCz/' };
const path = await captureScreenshot(post);
console.log('Screenshot saved:', path);
"
```

### Test Transcriber Module

```bash
node -e "
import { transcribeVideo } from './transcriber.js';
const reel = { url: 'https://www.instagram.com/berudolph/reel/DRDJrfECbCz/' };
const transcription = await transcribeVideo(reel);
console.log('Transcription:', transcription.substring(0, 100) + '...');
"
```

### Test LLM Service

```bash
export ANTHROPIC_API_KEY=sk-ant-your-key-here

node -e "
import { callClaudeAPI } from './llm-service.js';
const response = await callClaudeAPI('Respond with: API is working');
console.log('Response:', response);
"
```

---

## Common Issues & Solutions

### Issue: "command not found: extract-instagram.js"

**Solution:** Make sure you're in the correct directory and the script is in your PATH:
```bash
which extract-instagram.js
# Should show the path to the script
```

### Issue: "Cannot find module '@anthropic-ai/sdk'"

**Solution:** Install dependencies:
```bash
cd bmad/agents/content-decoder/workflows/batch-analyze
npm install
```

### Issue: "ANTHROPIC_API_KEY environment variable required"

**Solution:** Set the API key:
```bash
export ANTHROPIC_API_KEY=sk-ant-your-key-here
# Or add to .env file
```

### Issue: Screenshots fail

**Solution:** Check Chrome/browser automation setup:
```bash
# Test browser-screenshot.js directly
browser-screenshot.js "https://www.instagram.com/berudolph/reel/DRDJrfECbCz/" --dir temp/test
```

### Issue: Parallel downloads still conflict

**Solution:** Verify video-url-transcribe.js was updated:
```bash
grep "uniqueId" agent-tools/video-processor/scripts/video-url-transcribe.js
# Should show: const uniqueId = `${Date.now()}_${Math.random()...`
```

---

## Test Checklist

Before considering the refactoring complete, verify:

- [ ] All syntax checks pass
- [ ] Dry-run completes without errors
- [ ] Extraction works and filters by date
- [ ] Screenshots capture successfully
- [ ] Videos download with unique filenames
- [ ] Transcriptions complete in Portuguese
- [ ] Agent-aware mode saves prompts correctly
- [ ] API mode calls Claude API successfully
- [ ] Retry logic handles failures gracefully
- [ ] Validation deduplicates against Notion
- [ ] Dry-run mode prevents actual Notion saves
- [ ] Error messages are clear and helpful
- [ ] Skip flags work correctly
- [ ] Config system resolves paths correctly
- [ ] No hardcoded paths remain

---

## Performance Benchmarks

### Expected Performance (MacBook, good internet):

| Operation | Time per Item | Notes |
|-----------|--------------|-------|
| Extract post | ~100ms | Network dependent |
| Screenshot | ~2-3s | Browser automation |
| Video download | ~5-10s | Network + video size |
| Transcription | ~10-20s | Whisper processing |
| LLM API call | ~5-10s | Batch of 10 posts |
| Notion save | ~500ms | API call |

**Full workflow (10 posts, 3 reels, agent mode):**
- Expected: ~3-5 minutes
- Actual: ___(fill in after testing)___

---

## Regression Testing

When making changes, run:

```bash
# Quick regression test
npm test  # (if test script exists)

# Manual regression
./run-regression-tests.sh  # (if script exists)

# Or use the dry-run test
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-05 \
  --dry-run
```

---

## Airtable Integration Tests

### Test Airtable Connection

```bash
node test-airtable-connection.js
```

**Expected output:**
```
🔍 Testing Airtable Connection...
✓ Airtable connection successful
✅ Airtable is ready! You can now use --target=airtable
```

### Test Airtable Save (Dry Run)

```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-05 \
  --target=airtable \
  --skip-screenshots \
  --skip-transcribe \
  --skip-analyze \
  --dry-run
```

**What to Check:**
- Workflow completes without errors
- Console shows "[DRY RUN] Would save post..." messages
- No actual records created in Airtable

### Test Full Airtable Import

```bash
# Small date range for testing
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-28 \
  --end=2025-11-30 \
  --target=airtable \
  --mode=agent
```

**What to Check:**
- Posts saved to Airtable
- Creator record created/linked
- Screenshots attached
- Transcriptions present for reels
- Analysis fields populated
- No duplicates created on re-run

### Test Duplicate Prevention

Run the same import twice:

```bash
# First run
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-15 \
  --end=2025-11-15 \
  --target=airtable

# Second run (should skip duplicates)
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-15 \
  --end=2025-11-15 \
  --target=airtable
```

**Expected:** Second run shows "⏭️  Skipping duplicate" for each post

---

## Next Steps After Testing

1. ✅ Verify all tests pass
2. ✅ Document any issues found
3. ✅ Fix critical bugs
4. ✅ Update IMPROVEMENTS.md with test results
5. ✅ Create release notes
6. ✅ Tag version (v2.0.0)

---

**Last Updated:** $(date +%Y-%m-%d)
**Status:** Ready for testing
