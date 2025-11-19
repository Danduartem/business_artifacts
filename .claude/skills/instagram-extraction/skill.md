# Instagram Content Extraction

Extract Instagram posts with transcription and export to Airtable.

## When to Use

Invoke this skill when the user wants to:
- Extract Instagram posts from one or multiple profiles
- Download and transcribe video content from Instagram
- Export Instagram data to structured formats (JSON, CSV, Airtable)
- Process content within specific date ranges

## Available Jobs

### 1. Complete Profile Extraction (Single User)
**Best for:** Extracting all content from one Instagram profile with full transcription pipeline

```bash
node agent-tools/capabilities/jobs/instagram/complete-profile-extraction.js \
  --username <username> \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD \
  --profile \
  --resume
```

**Features:**
- Extracts post URLs from profile
- Downloads full post metadata
- Downloads all media files
- Transcribes videos using Whisper
- Exports to JSON
- Built-in checkpointing
- Resume capability after failures

**Runtime:** 1-8 hours depending on post count

**Example:**
```bash
node agent-tools/capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30 \
  --profile
```

---

### 2. Bulk Content Extraction (Multiple Users)
**Best for:** Processing multiple Instagram profiles simultaneously

```bash
node agent-tools/capabilities/jobs/instagram/bulk-content-extraction.js \
  --profiles '["user1","user2","user3"]' \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD \
  --output-format json \
  --resume
```

**Features:**
- Multi-profile support
- Date range filtering
- Multiple output formats (json, csv, markdown)
- Optional story extraction
- Resume capability
- Dry-run validation

**Runtime:** 3-13 hours for multiple profiles

**Example:**
```bash
node agent-tools/capabilities/jobs/instagram/bulk-content-extraction.js \
  --profiles '["berudolph","tay.ldantas"]' \
  --start-date 2025-11-01 \
  --end-date 2025-11-30
```

---

### 3. Process Existing URLs
**Best for:** When you already have Instagram URLs and just need metadata extraction

```bash
node agent-tools/capabilities/jobs/instagram/process-existing-urls.js \
  --input urls.json \
  --output posts.json
```

**Runtime:** 30 minutes - 2 hours

---

## Common Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--username` | Instagram username | Yes (for single profile) |
| `--profiles` | JSON array of usernames | Yes (for bulk) |
| `--start-date` | Start date (YYYY-MM-DD) | Yes |
| `--end-date` | End date (YYYY-MM-DD) | Yes |
| `--profile` | Use Chrome profile (auth) | No |
| `--transcribe` | Transcribe videos (default: true) | No |
| `--resume` | Resume from checkpoint | No |
| `--dry-run` | Validate only, don't execute | No |
| `--output-format` | json, csv, or markdown | No (default: json) |
| `--help` | Show detailed usage | No |

## Workflow Stages

All jobs follow this pipeline:

1. **Stage 1: URL Extraction**
   - Navigate to Instagram profile
   - Scroll and collect post URLs within date range
   - Checkpoint saved

2. **Stage 2: Metadata Extraction**
   - Visit each post URL
   - Extract caption, likes, comments, media URLs
   - Checkpoint saved

3. **Stage 3: Media Download**
   - Download videos and images
   - Save to `temp/media/`
   - Checkpoint saved

4. **Stage 4: Transcription**
   - Transcribe videos using Whisper
   - Attach transcripts to post metadata
   - Final checkpoint saved

5. **Stage 5: Export**
   - Write structured JSON to `temp/`
   - Optional: Export to CSV, Markdown, or Airtable

## Error Recovery

If a job fails at any stage:

```bash
# Original command (failed at hour 5)
node agent-tools/capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30

# Resume from checkpoint
node agent-tools/capabilities/jobs/instagram/complete-profile-extraction.js --resume
```

**No need to re-specify parameters** - they're loaded from the checkpoint at `temp/state/`.

## Output Location

All jobs save output to:
- **JSON files**: `agent-tools/temp/instagram-<username>-<date>.json`
- **Logs**: `agent-tools/temp/logs/job.instagram.*-<date>.log`
- **State**: `agent-tools/temp/state/job-*.checkpoint.json`
- **Media**: `agent-tools/temp/media/`

## Airtable Export

After extraction, export to Airtable:

```bash
node agent-tools/capabilities/workflows/content/save-instagram-to-airtable.js \
  --posts temp/instagram-berudolph-2025-11-30.json \
  --table "Instagram Posts"
```

**Required environment variables:**
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`

## Example Output Structure

```json
{
  "profile": "berudolph",
  "extractionDate": "2025-11-30",
  "posts": [
    {
      "url": "https://instagram.com/p/ABC123/",
      "timestamp": "2025-11-15T10:30:00Z",
      "caption": "Post caption...",
      "likes": 1234,
      "comments": 56,
      "mediaType": "video",
      "mediaUrl": "https://...",
      "localMediaPath": "temp/media/ABC123.mp4",
      "transcript": {
        "text": "Video transcript...",
        "language": "pt",
        "confidence": 0.94
      }
    }
  ]
}
```

## Tips

1. **Always use `--dry-run` first** for long operations to validate inputs
2. **Use `--profile` flag** when extracting from private accounts or to avoid rate limits
3. **Use `--resume`** instead of restarting after failures
4. **Check logs** at `temp/logs/` when debugging
5. **Monitor progress** - jobs emit progress logs every 10 items

## Instructions for the Agent

When this skill is invoked:

1. **Identify the use case:**
   - Single profile → Use `complete-profile-extraction.js`
   - Multiple profiles → Use `bulk-content-extraction.js`
   - Existing URLs → Use `process-existing-urls.js`

2. **Gather required parameters:**
   - Username(s)
   - Date range (start-date, end-date)
   - Any optional flags (--profile, --transcribe, etc.)

3. **Construct the command:**
   - Use absolute path: `node agent-tools/capabilities/jobs/instagram/<job-name>.js`
   - Add all required flags
   - Suggest `--dry-run` for first-time operations

4. **Execute and monitor:**
   - Run the job
   - Monitor logs if needed
   - If failure occurs, instruct user to use `--resume`

5. **Post-processing:**
   - Show output file location
   - Offer to export to Airtable if requested
   - Provide summary of extracted content

## Do NOT:
- ❌ Load `core/registry.json` (too many tokens)
- ❌ Manually call primitives or workflows
- ❌ Restart jobs from scratch after failures
- ❌ Forget to use `--profile` for authenticated scraping

## DO:
- ✅ Use job-level commands (complete-profile-extraction or bulk-content-extraction)
- ✅ Use `--help` flag to discover parameters on-demand
- ✅ Use `--dry-run` before long operations
- ✅ Use `--resume` after failures
- ✅ Check logs when debugging

---

**Token Efficiency:** This skill loads ~500 tokens. Full registry would load ~8,000 tokens (94% savings).
