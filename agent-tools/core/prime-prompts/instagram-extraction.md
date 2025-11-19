# Instagram Content Extraction Prime Prompt

**Agent Context**: You are working with the Agent Tools system for Instagram content extraction with transcription and export capabilities.

## Quick Start

For Instagram extraction with transcription and Airtable export, use **JOBS** (not primitives or workflows directly).

### Primary Tool: Complete Profile Extraction

```bash
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username <instagram-username> \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD \
  --profile \
  --resume
```

**What this job does:**
1. Extracts post URLs from Instagram profile (date-filtered)
2. Extracts full metadata from each post (caption, likes, comments, media URLs)
3. Downloads videos/images
4. Transcribes videos using Whisper
5. Exports to JSON with complete data

**Built-in features:**
- ✅ Automatic checkpointing after each stage
- ✅ `--resume` flag to continue after failures
- ✅ `--dry-run` to validate inputs without execution
- ✅ Progress logging to `temp/logs/`
- ✅ State persistence to `temp/state/`
- ✅ Chrome profile sync for authenticated scraping (`--profile`)

**Runtime**: 1-8 hours depending on post count and video duration

### Alternative: Bulk Multi-Profile Extraction

```bash
node capabilities/jobs/instagram/bulk-content-extraction.js \
  --profiles '["username1","username2","username3"]' \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD \
  --output-format json \
  --resume
```

**Use when:** Extracting from multiple profiles simultaneously.

**Runtime**: 3-13 hours for multi-profile operations

## Command Reference

### Get Help
```bash
# See all available options
node capabilities/jobs/instagram/complete-profile-extraction.js --help

# Or for bulk extraction
node capabilities/jobs/instagram/bulk-content-extraction.js --help
```

### Common Flags

| Flag | Type | Description |
|------|------|-------------|
| `--username` | string | Instagram username (required for single profile) |
| `--profiles` | JSON array | Multiple usernames (for bulk job) |
| `--start-date` | YYYY-MM-DD | Start date for post filtering (required) |
| `--end-date` | YYYY-MM-DD | End date for post filtering (required) |
| `--profile` | boolean | Use Chrome profile (enables authenticated scraping) |
| `--transcribe` | boolean | Transcribe videos (default: true) |
| `--resume` | boolean | Resume from checkpoint (default: false) |
| `--dry-run` | boolean | Validate inputs only, don't execute (default: false) |
| `--output-format` | string | json, csv, or markdown (default: json) |

## Job Architecture

```
Job: complete-profile-extraction.js
  ├─ Stage 1: Extract post URLs
  │   └─ Workflow: instagram/extract-profile-posts-puppeteer.js
  │       └─ Uses primitives: browser/start, browser/navigate, browser/eval
  │
  ├─ Stage 2: Extract full post metadata
  │   └─ Workflow: instagram/extract-post-full.js
  │       └─ Uses primitives: browser/navigate, page/extract-data
  │
  ├─ Stage 3: Download media
  │   └─ Primitives: http/download, instagram/download-video
  │
  └─ Stage 4: Transcribe videos
      └─ Workflow: media/download-and-transcribe.js
          └─ Uses primitives: media/transcribe
```

**Each stage checkpoints progress**. If job fails at Stage 3, use `--resume` to continue from there.

## Output Structure

Jobs output JSON to stdout and save to `temp/` directory:

```json
{
  "success": true,
  "totalPosts": 87,
  "successfulPosts": 85,
  "failedPosts": 2,
  "outputFile": "temp/instagram-berudolph-2025-11-30.json",
  "duration": "4h 23m",
  "summary": {
    "postsExtracted": 87,
    "videosTranscribed": 23,
    "mediaSaved": 145
  }
}
```

**Output file contains:**
```json
{
  "profile": "berudolph",
  "extractionDate": "2025-11-30",
  "posts": [
    {
      "url": "https://instagram.com/p/ABC123/",
      "timestamp": "2025-11-15T10:30:00Z",
      "caption": "Post caption text...",
      "likes": 1234,
      "comments": 56,
      "mediaType": "video",
      "mediaUrl": "https://...",
      "localMediaPath": "temp/media/ABC123.mp4",
      "transcript": {
        "text": "Full video transcript...",
        "language": "pt",
        "confidence": 0.94
      }
    }
  ]
}
```

## Error Recovery

### If Job Fails

1. **Check logs**: `temp/logs/job.instagram.complete-profile-extraction-<date>.log`
2. **Check state**: `temp/state/job-complete-profile-extraction.checkpoint.json`
3. **Resume**: Add `--resume` flag to continue from last checkpoint

```bash
# Original command that failed
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30 \
  --profile

# Resume from checkpoint
node capabilities/jobs/instagram/complete-profile-extraction.js --resume
```

**No need to specify parameters when resuming** - they're loaded from checkpoint.

## Important Guidelines

### DO:
✅ Use `--help` flag to discover all parameters on-demand
✅ Use `--dry-run` to validate before executing long operations
✅ Use `--resume` after failures (don't restart from scratch)
✅ Check logs in `temp/logs/` when debugging
✅ Use `--profile` for authenticated Instagram scraping

### DO NOT:
❌ Read `core/registry.json` - it contains 27 primitives you don't need
❌ Directly call primitives or workflows for this use case
❌ Manually orchestrate stages - the job handles it
❌ Re-run from scratch after failures - always use `--resume`
❌ Use workflows when a job exists for your use case

## When to Use Lower-Level Tools

### Use Workflows (instead of jobs) when:
- Processing a single video: `workflow.media.download-and-transcribe.js`
- Extracting one post: `workflow.instagram.extract-post-full.js`
- Quick operations (<10 minutes)

### Use Primitives (instead of workflows) when:
- Building custom workflows not yet implemented
- Debugging low-level issues
- Need to see `core/registry.json` for primitive catalog

## Airtable Export

To export to Airtable after extraction:

```bash
# 1. Run extraction job (creates JSON file)
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30 \
  --profile

# 2. Export to Airtable
node capabilities/workflows/content/save-instagram-to-airtable.js \
  --posts temp/instagram-berudolph-2025-11-30.json \
  --table "Instagram Posts"
```

**Required environment variables:**
- `AIRTABLE_API_KEY` - Your Airtable API key
- `AIRTABLE_BASE_ID` - Your Airtable base ID

## Progressive Disclosure (v3.0)

This prime prompt provides high-level job interfaces. For programmatic discovery:

**Tiered Registry System** (NEW - 97% token reduction):
- **registry/index.json**: All categories (20 tokens)
- **registry/instagram/jobs.json**: Instagram jobs only (150 tokens)
- **registry/instagram/workflows.json**: Instagram workflows only (120 tokens)
- **--help flags**: On-demand parameters (50 tokens per tool)

**Discovery Helper** (Recommended):
```javascript
import { getIndex, getJobsByCategory } from './core/discovery.js';

// Load index (20 tokens)
const index = getIndex();

// Load only Instagram jobs (150 tokens)
const jobs = getJobsByCategory('instagram');

// Total: 170 tokens vs 1,500 tokens (registry-lite) or 8,000 tokens (registry.json)
```

**Legacy Options** (Higher token cost):
- **registry-lite.json**: All jobs + workflows (1,500 tokens) - Deprecated
- **registry.json**: Full primitive catalog (8,000 tokens) - Only for custom workflows

**Recommendation**: Use `core/discovery.js` helpers or load tiered registries directly for 97% token savings.

## Examples

### Example 1: Single Profile with Transcription
```bash
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30 \
  --profile \
  --transcribe
```

### Example 2: Multiple Profiles
```bash
node capabilities/jobs/instagram/bulk-content-extraction.js \
  --profiles '["berudolph","tay.ldantas","other_user"]' \
  --start-date 2025-11-01 \
  --end-date 2025-11-30 \
  --output-format json
```

### Example 3: Resume After Failure
```bash
# Job failed at hour 5 during transcription
# Just add --resume
node capabilities/jobs/instagram/complete-profile-extraction.js --resume
```

### Example 4: Dry Run (Validate Before Execute)
```bash
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30 \
  --dry-run
```

## Token Efficiency

By using this prime prompt:
- **You load**: 300 tokens (this file)
- **You avoid**: 8,000 tokens (full registry.json)
- **Savings**: 96%

When you need parameter details, use `--help` flag for progressive disclosure instead of loading full documentation.

---

**Next Steps**: Run the appropriate job command for your use case. The job handles all orchestration, checkpointing, and error recovery automatically.
