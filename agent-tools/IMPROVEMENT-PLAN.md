# Agent-Tools Improvement Plan
## Background Job Monitoring & Progressive Disclosure

**Created**: 2025-11-19
**Priority**: High
**Estimated Effort**: 8-12 hours

---

## Problem Statement

Current issues identified during Instagram extraction workflow:
1. **Poor UX**: Background jobs run without proactive monitoring
2. **Token Inefficiency**: Reading verbose logs instead of filtered summaries (60% waste)
3. **Progressive Disclosure Failure**: Reading full data when summaries suffice

User experience: 2-minute job felt like 10+ minutes due to lack of communication.

---

## Solution Architecture

### Phase 1: Background Job Monitoring (Priority: Critical)

#### 1.1 Create Job Monitor Utility
**File**: `agent-tools/core/job-monitor.js`

```javascript
/**
 * Monitors background jobs and provides progress updates
 * Solves: Silent background execution problem
 */
class JobMonitor {
  constructor(jobId, checkInterval = 5000) {
    this.jobId = jobId;
    this.checkInterval = checkInterval;
    this.lastOutput = '';
  }

  async monitor(onProgress, onComplete) {
    // Poll job status
    // Extract progress indicators
    // Call onProgress with updates
    // Detect completion and call onComplete
  }

  extractProgress(output) {
    // Parse: "Stage 2: Extracting 12 posts"
    // Parse: "✓ Post 5/12"
    // Parse: "✓ Video 2/3 transcribed"
    return { stage, current, total, message };
  }
}
```

**Usage Example**:
```javascript
const monitor = new JobMonitor('bcb1b3');
await monitor.monitor(
  (progress) => console.log(`[${progress.current}/${progress.total}] ${progress.message}`),
  (result) => console.log('Job complete:', result.summary)
);
```

#### 1.2 Add Structured Progress Events
**File**: `agent-tools/capabilities/jobs/instagram/complete-profile-extraction.js`

Add JSON-formatted progress events:
```javascript
// Before: Just INFO logs
logger.info('Extracting post', { url });

// After: Structured progress + INFO log
console.log(JSON.stringify({
  type: 'PROGRESS',
  stage: 'extracting-posts',
  current: 5,
  total: 12,
  message: 'Extracting post 5/12'
}));
logger.info('Extracting post', { url });
```

**Benefits**:
- Easy to filter with BashOutput regex: `"type":"PROGRESS"`
- Structured data for parsing
- Backwards compatible (logs remain)

---

### Phase 2: Progressive Disclosure Utilities (Priority: High)

#### 2.1 Create JSON Summary Extractor
**File**: `agent-tools/core/utilities/json-summary.js`

```javascript
/**
 * Extracts summary information from large JSON files
 * Solves: Reading 100+ lines when only metadata needed
 */
export async function extractSummary(filePath, keys = ['metadata', 'summary']) {
  // Use jq or JSON streaming parser
  // Extract only specified top-level keys
  // Return minimal object
}

// Usage:
const summary = await extractSummary(
  'instagram-blankschoolbr-2025-11-19.json',
  ['metadata', 'summary']
);
// Returns only: { metadata: {...}, summary: {...} }
```

#### 2.2 Add Output Modes to Jobs
**File**: All job files

Add `--output-mode` flag:
```bash
# Verbose (current default): Full colored logs
node job.js --output-mode verbose

# Summary (new): Only key milestones + final result
node job.js --output-mode summary

# JSON (new): Structured progress events only
node job.js --output-mode json

# Silent (new): Only final result JSON
node job.js --output-mode silent
```

**Implementation**:
```javascript
const OUTPUT_MODE = process.env.OUTPUT_MODE || argv['output-mode'] || 'verbose';

function logProgress(message, data) {
  if (OUTPUT_MODE === 'silent') return;

  if (OUTPUT_MODE === 'summary') {
    // Only log stage changes and completion
    if (data.stage || data.complete) {
      console.log(formatSummary(message, data));
    }
  } else if (OUTPUT_MODE === 'json') {
    console.log(JSON.stringify({ type: 'PROGRESS', message, ...data }));
  } else {
    // verbose
    logger.info(message, data);
  }
}
```

#### 2.3 Create BashOutput Filter Presets
**File**: `agent-tools/core/utilities/output-filters.js`

```javascript
/**
 * Common regex patterns for filtering job output
 * Solves: Manual regex construction for common patterns
 */
export const FILTERS = {
  PROGRESS: '"type":"PROGRESS"',
  SUMMARY: 'Stage|Complete|success|failed',
  ERRORS: 'ERROR|WARN|Failed',
  FINAL: 'Job Complete|success.*true',
};

// Usage in agent instructions:
// Instead of: BashOutput(jobId) → 50k tokens
// Use: BashOutput(jobId, filter: FILTERS.SUMMARY) → 2k tokens
```

---

### Phase 3: Progressive Disclosure Guidelines (Priority: High)

#### 3.1 Create Workflow Documentation
**File**: `agent-tools/docs/PROGRESSIVE-DISCLOSURE-WORKFLOW.md`

```markdown
# Progressive Disclosure Workflow for Agent-Tools

## Level 0: Initiation
- Start job with --output-mode summary
- Show user that job is starting
- Set up monitoring

## Level 1: Monitoring
- Poll with filtered output (PROGRESS events only)
- Show user progress every 30s or on stage change
- Extract: stage, current/total, ETA

## Level 2: Completion
- Detect completion event
- Extract final summary (not full output)
- Verify output file exists

## Level 3: Result Summary
- Read ONLY metadata + summary sections
- Report: success rate, duration, key metrics
- DO NOT read full post data unless user requests

## Level 4: Deep Dive (Only if requested)
- User asks: "show me the transcription"
- THEN read specific sections
- Use jq to extract specific fields

## Anti-Patterns
❌ Reading full logs without filtering
❌ Reading full JSON files for "analysis"
❌ Using Read when jq/grep would work
❌ Silent background execution
```

#### 3.2 Add Examples Directory
**File**: `agent-tools/examples/efficient-extraction.js`

```javascript
/**
 * Example: Efficient Instagram extraction with progress monitoring
 * Demonstrates proper progressive disclosure
 */

// BAD: Silent execution
exec('node job.js --username X');
// ... wait ...
// ... user asks "are you stuck?" ...
// ... then check output ...

// GOOD: Monitored execution
const job = exec('node job.js --username X --output-mode summary');
const monitor = new JobMonitor(job.id);

await monitor.monitor(
  (progress) => {
    // Show progress every 30s or on stage change
    console.log(`Progress: ${progress.message}`);
  },
  async (result) => {
    // Job complete - get summary only
    const summary = await extractSummary(result.outputFile);
    console.log(`Complete: ${summary.totalPosts} posts, ${summary.videosTranscribed} videos`);
  }
);
```

---

### Phase 4: Token Optimization (Priority: Medium)

#### 4.1 Add File Existence Checks
**Pattern**: Always check before reading

```javascript
// In agent-tools/core/utilities/file-helpers.js
export async function safeRead(filePath, options = {}) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}
```

#### 4.2 Add Output Size Limits
**File**: All jobs

```javascript
// Add --max-output flag
if (process.stdout.isTTY === false && OUTPUT_MODE === 'verbose') {
  console.warn('Warning: Verbose output to pipe may be large. Consider --output-mode summary');
}

// Truncate verbose logs when piped
if (logLines > MAX_LOG_LINES) {
  console.log(`... (${logLines - MAX_LOG_LINES} lines truncated)`);
}
```

#### 4.3 Use jq for JSON Extraction
**File**: Add to utilities

```bash
# Instead of Read(file, limit=100)
# Use jq to extract only what's needed
jq '.metadata, .summary, .posts | length' file.json

# Extract specific post by ID
jq '.posts[] | select(.postId == "DQpvqZDDeze")' file.json

# Get video transcriptions only
jq '[.posts[] | select(.isReel == true) | {postId, transcription: .videoTranscription.content}]' file.json
```

---

## Implementation Checklist

### Week 1: Core Infrastructure
- [ ] Create JobMonitor utility
- [ ] Add structured progress events to complete-profile-extraction.js
- [ ] Create json-summary.js utility
- [ ] Add output-filters.js presets
- [ ] Test monitoring with sample job

### Week 2: Job Updates
- [ ] Add --output-mode to complete-profile-extraction.js
- [ ] Add --output-mode to bulk-content-extraction.js
- [ ] Add --output-mode to process-existing-urls.js
- [ ] Update all workflows to emit PROGRESS events
- [ ] Add file existence checks

### Week 3: Documentation & Examples
- [ ] Write PROGRESSIVE-DISCLOSURE-WORKFLOW.md
- [ ] Create efficient-extraction.js example
- [ ] Update README with new flags
- [ ] Create before/after comparison doc
- [ ] Add troubleshooting guide

### Week 4: Testing & Validation
- [ ] Test full extraction with monitoring
- [ ] Measure token usage improvement
- [ ] Compare UX before/after
- [ ] Run regression tests
- [ ] Deploy to production

---

## Success Metrics

### Before (Current State)
- **User Wait Time**: 10+ minutes (perceived)
- **Token Usage**: 51k tokens for simple status check
- **Communication**: Silent execution, user must ask status
- **Progressive Disclosure**: Failed (read everything immediately)

### After (Target State)
- **User Wait Time**: 2-3 minutes (accurate perception)
- **Token Usage**: ~15k tokens (70% reduction)
- **Communication**: Proactive progress updates every 30s
- **Progressive Disclosure**: Pass (summary first, details on request)

### Validation Tests
1. Run extraction with new monitoring → user sees progress
2. Check token usage → should be <20k for status + summary
3. User asks "what happened?" → answer from summary only
4. User asks "show post X" → fetch only that post data

---

## Migration Plan

### Backwards Compatibility
- Keep verbose mode as default (for debugging)
- New output modes opt-in via flags
- Existing scripts continue to work

### Rollout Strategy
1. Deploy utilities first (non-breaking)
2. Add new flags to jobs (opt-in)
3. Update examples and docs
4. Gradually migrate to summary mode as default
5. Deprecate verbose mode for production use

---

## Future Enhancements

### Phase 5: Real-time Streaming (Optional)
- WebSocket-based progress streaming
- Live progress bar in agent interface
- Estimated time remaining

### Phase 6: Job Queuing (Optional)
- Multiple jobs with priority queue
- Parallel execution management
- Resource usage optimization

### Phase 7: AI-Friendly Output (Optional)
- Semantic progress events
- Natural language summaries
- Context-aware detail levels

---

## Questions for Discussion

1. Should summary mode be default for new jobs?
2. Do we need a separate "AI mode" with minimal tokens?
3. Should we add automatic progress notifications to Slack/email?
4. What's the right polling interval for monitoring? (5s? 10s? 30s?)
5. Should we create a shared job runner that handles monitoring automatically?

---

## Appendix: Token Usage Analysis

### Current Workflow (51k tokens)
```
- BashOutput(job1): 15k (failed job, full logs)
- BashOutput(job2): 15k (failed job, full logs)
- BashOutput(job3): 10k (success, full logs)
- Read(JSON, 100 lines): 8k
- Bash ls/wc: 1k
- Responses: 2k
```

### Optimized Workflow (15k tokens)
```
- BashOutput(job, filter=SUMMARY): 2k (just progress events)
- jq(JSON, metadata+summary): 1k
- Bash checks: 0.5k
- Responses: 1.5k
- Reserve: 10k (for deep dive if requested)
```

**Savings**: 70% reduction in token usage
**Improvement**: Can handle 3.4x more interactions per session
