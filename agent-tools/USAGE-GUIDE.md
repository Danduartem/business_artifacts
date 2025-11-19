# Agent-Tools Usage Guide for AI Agents

**Last Updated**: 2025-11-19
**Version**: v3.1 (with monitoring)

---

## ⚠️ MANDATORY: How to Execute Jobs

### ✅ THE ONLY CORRECT WAY

```javascript
import { executeJob } from './core/discovery.js';

const result = await executeJob('complete-profile-extraction', {
  username: 'blankschoolbr',
  'start-date': '2025-11-01',
  'end-date': '2025-11-30',
  profile: true,
  transcribe: true
});
```

**This gives you**:
- Progressive discovery (220 tokens)
- Automatic monitoring (every 15s)
- Real-time progress updates
- 98% token savings vs direct execution

---

## ❌ NEVER DO THIS

```javascript
// ❌ WRONG: Direct execution
exec('node capabilities/jobs/instagram/complete-profile-extraction.js ...');

// ❌ WRONG: Load full registry
const registry = require('./core/registry.json'); // 8,000 tokens wasted!

// ❌ WRONG: No monitoring
spawn('node', ['capabilities/jobs/...'], { detached: true });
```

**Problems**:
- User waits 10+ minutes with no feedback
- Wastes 51,000 tokens reading full logs
- Doesn't use progressive disclosure
- No automatic monitoring

---

## Step-by-Step Workflow

### 1. Discovery (20-220 tokens)

```javascript
// Option A: Quick discovery if you know what you want
import { getJobsByCategory } from './core/discovery.js';
const jobs = getJobsByCategory('instagram');
const job = jobs.tools.find(j => j.id === 'complete-profile-extraction');

// Option B: Comprehensive search
import { findTool } from './core/discovery.js';
const results = findTool('instagram extraction transcription');
const job = results[0];
```

### 2. Execution with Monitoring (820 tokens for 2-min job)

```javascript
import { executeJob } from './core/discovery.js';

const result = await executeJob(job.id, {
  username: 'blankschoolbr',
  'start-date': '2025-11-01',
  'end-date': '2025-11-30',
  profile: true,
  transcribe: true
});

// User sees (automatically):
// 🚀 Starting: complete-profile-extraction
// 📊 Monitoring enabled (updates every 15s)
// {"type":"PROGRESS","stage":"1/4","message":"Extracting URLs for @blankschoolbr"}
// 📍 Stage 1/4: Extracting URLs for @blankschoolbr
// {"type":"PROGRESS","stage":"2/4","message":"Extracting 12 posts"}
// 📍 Stage 2/4: Extracting 12 posts
// {"type":"PROGRESS","stage":"2/4","current":5,"total":12,"message":"Post 5/12","type":"posts"}
//    [42%] Post 5/12
// ...
// {"type":"PROGRESS","stage":"complete","message":"Job complete","summary":{...}}
// ✅ Complete! (2m 15s)
//    Summary: {totalPosts: 12, videosTranscribed: 3}
```

### 3. Handle Results

```javascript
if (result.summary) {
  console.log(`Extracted ${result.summary.totalPosts} posts`);
  console.log(`Transcribed ${result.summary.videosTranscribed} videos`);
  console.log(`Output file: ${result.outputFile}`);
}
```

---

## Token Usage Breakdown

| Operation | Method | Tokens | Time |
|-----------|--------|--------|------|
| **Discovery** | getIndex() + getJobsByCategory() | 220 | Instant |
| **Monitoring Poll #1** | Filtered output (15s) | 100 | 15s |
| **Monitoring Poll #2** | Filtered output (30s) | 100 | 15s |
| **Monitoring Poll #3** | Filtered output (45s) | 100 | 15s |
| **...continues** | Every 15s | 100 | 15s |
| **2-min job total** | **1,020 tokens** | **2m** | |
| | | | |
| **Old way (wrong)** | Direct exec + read full logs | 51,000 | 10m (perceived) |
| **Savings** | **98% reduction** | **Accurate perception** | |

---

## Multiple Jobs

### Sequential

```javascript
import { executeJobSequence } from './core/discovery.js';

const results = await executeJobSequence([
  {
    id: 'complete-profile-extraction',
    params: { username: 'user1', 'start-date': '2025-11-01', 'end-date': '2025-11-30' }
  },
  {
    id: 'complete-profile-extraction',
    params: { username: 'user2', 'start-date': '2025-11-01', 'end-date': '2025-11-30' }
  }
]);
```

### Parallel (use with caution)

```javascript
import { executeJobParallel } from './core/discovery.js';

const results = await executeJobParallel([
  { id: 'complete-profile-extraction', params: {...} },
  { id: 'complete-profile-extraction', params: {...} }
]);
```

---

## Monitoring Details

### Progress Event Structure

All jobs emit structured JSON progress events:

```json
{
  "type": "PROGRESS",
  "timestamp": "2025-11-19T14:20:05.000Z",
  "stage": "2/4",
  "current": 5,
  "total": 12,
  "message": "Post 5/12",
  "type": "posts"
}
```

### How Monitoring Works

1. Job runs in background
2. Emits progress events to stdout
3. Monitor polls every 15s with filter: `"type":"PROGRESS"|Stage|Complete`
4. Parses events and shows user-friendly updates
5. Detects completion automatically

### Token Efficiency

- Unfiltered logs: ~15,000 tokens per poll
- Filtered logs: ~100 tokens per poll
- **Savings: 99% per poll**

---

## Cleanup

Stale job files are automatically cleaned up every hour. Manual cleanup:

```bash
node core/cleanup.js --dry-run  # Preview
node core/cleanup.js            # Clean files older than 30 min
node core/cleanup.js --max-age=60  # Clean files older than 60 min
```

---

## Troubleshooting

### "Job takes 10 minutes but only runs for 2 minutes"
**Problem**: Not using monitoring, checking output only at the end.
**Solution**: Use `executeJob()` instead of direct execution.

### "Too many tokens used"
**Problem**: Reading full logs or loading full registry.
**Solution**: Use discovery system + filtered monitoring.

### "Background jobs show as 'running' but are done"
**Problem**: Stale job references from previous session.
**Solution**: Run `node core/cleanup.js` or wait for auto-cleanup.

### "No progress updates"
**Problem**: Job doesn't emit progress events.
**Solution**: Check job has `emitProgress()` calls (v3.1+).

---

## Summary

**Always use this pattern**:

```javascript
import { executeJob } from './core/discovery.js';
const result = await executeJob(toolId, params);
```

**Never**:
- Direct execution (`exec('node capabilities/...')`)
- Loading full registry (`require('./core/registry.json')`)
- Background execution without monitoring

**Benefits**:
- 98% token savings
- Real-time progress (every 15s)
- Accurate time perception (2 min = 2 min, not 10 min)
- Automatic cleanup
