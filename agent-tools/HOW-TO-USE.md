# How to Use the Agent-Tools System - Practical Guide

**For Users & AI Agents**

---

## For Users: How to Request Jobs

### Example 1: Simple Request

**You say:**
```
"Extract Instagram posts from @coffeeshop for December 2024 with transcriptions"
```

**What the AI will do (automatically):**
```javascript
import { executeJob } from './core/discovery.js';

const result = await executeJob('complete-profile-extraction', {
  username: 'coffeeshop',
  'start-date': '2024-12-01',
  'end-date': '2024-12-31',
  profile: true,
  transcribe: true
});
```

**What you'll see:**
```
🚀 Starting: complete-profile-extraction
📊 Monitoring enabled (updates every 15s)
   Job ID: 12345
   Output: temp/job-outputs/complete-profile-extraction-1234567890.log

📍 Stage 1/4: Extracting URLs for @coffeeshop
📍 Stage 2/4: Extracting 45 posts
   [22%] Post 10/45
   [44%] Post 20/45
   [67%] Post 30/45
   [89%] Post 40/45
📍 Stage 3/4: Transcribing 12 videos
   [25%] Video 3/12
   [50%] Video 6/12
   [75%] Video 9/12
📍 Stage 4/4: Exporting results
✅ Complete! (8m 32s)
   Summary: {totalPosts: 45, videosTranscribed: 12}

Output file: temp/instagram-coffeeshop-2024-12-01_2024-12-31.json
```

---

## For Users: Common Use Cases

### Use Case 1: Extract Recent Posts (Quick)

**You say:**
```
"Get the last 3 days of posts from @techblog"
```

**AI uses:**
```javascript
const result = await executeJob('complete-profile-extraction', {
  username: 'techblog',
  'start-date': '2024-12-15',
  'end-date': '2024-12-18',
  profile: true,
  transcribe: false  // Skip transcription for speed
});
```

**Duration:** ~2-3 minutes (no video transcription)

---

### Use Case 2: Extract with Transcription (Thorough)

**You say:**
```
"Extract all November posts from @travelvlog with video transcriptions"
```

**AI uses:**
```javascript
const result = await executeJob('complete-profile-extraction', {
  username: 'travelvlog',
  'start-date': '2024-11-01',
  'end-date': '2024-11-30',
  profile: true,
  transcribe: true  // Include video transcriptions
});
```

**Duration:** ~10-15 minutes (depends on video count)

---

### Use Case 3: Process Multiple Accounts

**You say:**
```
"Extract posts from @account1, @account2, and @account3 for last week"
```

**AI uses:**
```javascript
import { executeJobSequence } from './core/discovery.js';

const results = await executeJobSequence([
  {
    id: 'complete-profile-extraction',
    params: {
      username: 'account1',
      'start-date': '2024-12-11',
      'end-date': '2024-12-18',
      profile: true
    }
  },
  {
    id: 'complete-profile-extraction',
    params: {
      username: 'account2',
      'start-date': '2024-12-11',
      'end-date': '2024-12-18',
      profile: true
    }
  },
  {
    id: 'complete-profile-extraction',
    params: {
      username: 'account3',
      'start-date': '2024-12-11',
      'end-date': '2024-12-18',
      profile: true
    }
  }
]);
```

**Each job shows progress separately, runs one after another**

---

## For AI Agents: The Correct Pattern

### ✅ ALWAYS Use This Pattern

```javascript
import { executeJob } from './core/discovery.js';

// 1. Parse user request to extract parameters
const params = {
  username: 'extracted_from_user_request',
  'start-date': 'YYYY-MM-DD',
  'end-date': 'YYYY-MM-DD',
  profile: true,  // Use Chrome profile for authentication
  transcribe: true  // Set false for speed, true for thoroughness
};

// 2. Execute with automatic monitoring
const result = await executeJob('complete-profile-extraction', params);

// 3. Report results to user
console.log(`Extracted ${result.summary.totalPosts} posts`);
console.log(`Output: ${result.outputFile}`);
```

**Benefits:**
- ✅ Automatic progress updates every 15s
- ✅ 98% token savings
- ✅ User sees what's happening in real-time
- ✅ Automatic cleanup of stale jobs

---

### ❌ NEVER Do This

```javascript
// ❌ WRONG - Direct execution
exec('node capabilities/jobs/instagram/complete-profile-extraction.js ...');

// ❌ WRONG - Load full registry
const registry = require('./core/registry.json'); // Wastes 8,000 tokens

// ❌ WRONG - Background execution without monitoring
spawn('node', ['capabilities/jobs/...'], { detached: true });
```

**Problems:**
- ❌ No progress updates (user waits in silence)
- ❌ Wastes 51,000 tokens
- ❌ User thinks it's stuck
- ❌ No automatic cleanup

---

## Interactive Mode (Optional)

### For Users Who Want to Explore

**Run the interactive CLI:**
```bash
cd agent-tools
node core/interactive-cli.js
```

**You'll see:**
```
🔍 Agent-Tools Interactive Discovery

Step 1: Loading tool index...
Found 8 categories

Step 2: Select a category:
  1. instagram (2 jobs, 1 workflows)
  2. media (0 jobs, 2 workflows)
  ...

Select number (or q to quit): 1

Step 3: Select tool type for instagram:
  1. jobs
  2. workflows

Select number: 1

Step 4: Loading instagram jobs...
Found 2 tools

Step 5: Select a tool:
  1. complete-profile-extraction
     Extract complete Instagram profile with posts and transcriptions
  2. bulk-content-extraction
     Process multiple profiles in batch

Select number: 1

...

Execute this tool? (y/n): y

Parameters:
  Username: coffeeshop
  Start date (YYYY-MM-DD): 2024-12-01
  End date (YYYY-MM-DD): 2024-12-31
  Use Chrome profile? (y/n): y
  Transcribe videos? (y/n): y

[Executes with automatic monitoring]
```

---

## Understanding the Output

### Progress Updates Explained

```
📍 Stage 2/4: Extracting posts
   [44%] Post 20/45
```
- **Stage 2/4**: Current stage out of 4 total stages
- **[44%]**: Percentage complete for this stage
- **Post 20/45**: Item 20 out of 45 total

### Stages for Instagram Extraction

1. **Stage 1/4**: Extracting URLs - Opens Instagram, scrolls through profile
2. **Stage 2/4**: Extracting posts - Downloads each post's content
3. **Stage 3/4**: Transcribing videos - Converts video audio to text (if transcribe=true)
4. **Stage 4/4**: Exporting results - Saves everything to JSON file

---

## Parameter Reference

### Complete Profile Extraction

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `username` | Yes | - | Instagram username (without @) |
| `start-date` | Yes | - | Start date (YYYY-MM-DD) |
| `end-date` | Yes | - | End date (YYYY-MM-DD) |
| `profile` | No | false | Use Chrome profile for auth |
| `transcribe` | No | true | Transcribe video content |

**Examples:**
```javascript
// Minimal (posts only, no transcription)
{ username: 'user', 'start-date': '2024-12-01', 'end-date': '2024-12-31' }

// Full (with authentication and transcription)
{ username: 'user', 'start-date': '2024-12-01', 'end-date': '2024-12-31', profile: true, transcribe: true }

// Quick scan (single day, no transcription)
{ username: 'user', 'start-date': '2024-12-15', 'end-date': '2024-12-15', transcribe: false }
```

---

## Typical Timings

| Scenario | Posts | Videos | Duration |
|----------|-------|--------|----------|
| Single day, no transcription | 1-5 | N/A | 1-2 min |
| Week, no transcription | 10-30 | N/A | 3-5 min |
| Month, no transcription | 40-100 | N/A | 8-12 min |
| Single day, with transcription | 1-5 | 0-2 | 2-4 min |
| Week, with transcription | 10-30 | 3-8 | 6-15 min |
| Month, with transcription | 40-100 | 10-25 | 15-30 min |

**Note:** Video transcription adds ~1-2 minutes per video

---

## Output Format

### JSON File Structure

```json
{
  "metadata": {
    "username": "coffeeshop",
    "dateRange": {
      "start": "2024-12-01",
      "end": "2024-12-31"
    },
    "extractedAt": "2024-12-18T10:30:00Z"
  },
  "posts": [
    {
      "id": "ABC123",
      "type": "image",
      "url": "https://instagram.com/p/ABC123/",
      "timestamp": "2024-12-15T14:20:00Z",
      "caption": "Check out our new latte art...",
      "likes": 234,
      "comments": 12,
      "media": {
        "type": "image",
        "url": "https://..."
      }
    },
    {
      "id": "DEF456",
      "type": "video",
      "url": "https://instagram.com/p/DEF456/",
      "timestamp": "2024-12-10T09:15:00Z",
      "caption": "Behind the scenes of our morning rush",
      "likes": 567,
      "comments": 34,
      "media": {
        "type": "video",
        "url": "https://...",
        "duration": 45
      },
      "transcription": {
        "text": "Good morning everyone, welcome to our cafe...",
        "language": "en",
        "segments": [...]
      }
    }
  ],
  "summary": {
    "totalPosts": 45,
    "images": 33,
    "videos": 12,
    "videosTranscribed": 12,
    "dateRange": "2024-12-01 to 2024-12-31",
    "totalLikes": 15234,
    "totalComments": 892
  }
}
```

### Output Location

Files are saved to:
```
agent-tools/temp/instagram-{username}-{start-date}_{end-date}.json
```

Example:
```
agent-tools/temp/instagram-coffeeshop-2024-12-01_2024-12-31.json
```

---

## Troubleshooting

### "Job seems stuck"
**Check:** Look for progress updates. They appear every 15 seconds.
**Typical:** Instagram extraction can take 1-2 minutes per ~10 posts.
**Action:** Wait for progress updates. If no updates for 2 minutes, something is wrong.

### "No output file found"
**Check:** Look at the completion message for the file path.
**Location:** Always in `agent-tools/temp/instagram-*.json`
**Action:** Use the exact path shown in "Output file: ..." message.

### "Job failed"
**Check:** Error message in the output.
**Common causes:**
- Invalid date range
- Username doesn't exist
- Network/authentication issues
**Action:** Read error message, adjust parameters, try again.

---

## Quick Reference Card

### As a User, Say:
```
"Extract posts from @username for [time period]"
"Get Instagram content from @username for last week with transcriptions"
"Process @username1, @username2 for December"
```

### AI Will Automatically:
1. Parse your request
2. Call `executeJob()` with correct parameters
3. Show real-time progress updates
4. Report completion with summary
5. Provide output file path

### You Will See:
```
🚀 Starting...
📊 Monitoring enabled
📍 Stage updates every 15s
✅ Complete! (duration)
   Summary and output file path
```

### Token Efficiency:
- Discovery: ~600 tokens
- Monitoring: ~1,000 tokens for typical job
- **Total: ~1,600 tokens** vs 51,000 (old way)
- **98% savings**

---

## Examples in Different Scenarios

### Marketing Team
**Request:** "Get all our posts from @ourbrand for Q4 2024"
**AI extracts:** Oct-Dec posts, provides analysis-ready JSON

### Content Research
**Request:** "Extract @competitor posts from last month with video transcripts"
**AI extracts:** Posts with full video text for analysis

### Backup/Archive
**Request:** "Archive all @myaccount posts from 2024"
**AI extracts:** Full year of content with metadata

### Quick Check
**Request:** "What did @someone post yesterday?"
**AI extracts:** Single day, fast results (1-2 min)

---

## Summary: The Pattern to Remember

```
USER REQUEST
    ↓
AI uses executeJob()
    ↓
Progress updates every 15s
    ↓
Job completes
    ↓
Summary + output file provided
```

**That's it!** The system handles everything else automatically.

**Key files for reference:**
- **USAGE-GUIDE.md** - Technical details for AI agents
- **HOW-TO-USE.md** - This file (practical examples)
- **README.md** - Quick start guide
