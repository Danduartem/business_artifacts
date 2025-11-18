# Airtable Integration Setup Guide

Complete guide to set up Airtable as your data backend for Instagram content analysis.

---

## Why Airtable?

Airtable is superior to Notion for content analysis because:

- **Better Analytics**: Built-in pivot tables, grouping, filtering
- **No Character Limits**: 100,000 characters per field vs Notion's 2,000
- **Proper Relationships**: Linked records work like a real database
- **Views & Formulas**: Calendar, gallery, kanban views with powerful formulas
- **Better API**: Simpler and more reliable than Notion's API

---

## Step 1: Create Airtable Account

1. Go to [airtable.com](https://airtable.com)
2. Sign up for a free account
3. Verify your email

**Free tier includes:**
- 1,000 records per base (5-8 years of @berudolph content)
- Unlimited bases
- All field types and views
- 100 automation runs/month

---

## Step 2: Create Your Base

### Option A: Manual Setup (Recommended)

1. Click "Create a base" → "Start from scratch"
2. Name it: **Instagram Content Decoder**
3. Follow the complete schema in `AIRTABLE-SCHEMA.md` to create:
   - Instagram Posts table (21 fields)
   - Creators table (12 fields)
   - Frameworks table (8 fields)

### Option B: Import from CSV (After Notion Export)

1. Export your Notion database as CSV
2. Create new Airtable base
3. Import CSV → Map fields
4. Adjust field types to match schema

---

## Step 3: Get API Credentials

### Get Personal Access Token

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Name it: `Content Decoder Workflow`
4. Add scopes:
   - `data.records:read`
   - `data.records:write`
5. Add access to your base: **Instagram Content Decoder**
6. Click "Create token"
7. **Copy the token immediately** (starts with `pat...`)

### Get Base ID

1. Open your Airtable base
2. Look at the URL:
   ```
   https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYYYYY/viwZZZZZZZZZZZZZZ
                        ^^^^^^^^^^^^^^^^
                        This is your Base ID
   ```
3. Copy the Base ID (starts with `app...`)

---

## Step 4: Configure Environment Variables

1. Copy the example file:
   ```bash
   cd bmad/agents/content-decoder/workflows/batch-analyze
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```bash
   # Airtable Configuration
   AIRTABLE_API_KEY=patXXXXXXXXXXXXXX.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   ```

3. **Important**: Never commit `.env` to git (it's already in .gitignore)

---

## Step 5: Test Connection

Run the connection test script:

```bash
node test-airtable-connection.js
```

**Expected output:**
```
🔍 Testing Airtable Connection...

✓ Airtable connection successful

✅ Airtable is ready! You can now use --target=airtable
```

**If it fails:**
- Check your API token is correct
- Check your Base ID is correct
- Verify you have "Instagram Posts" table in your base
- Ensure token has proper scopes (data.records:read, data.records:write)

---

## Step 6: Run First Import

### Dry Run (Recommended First)

Test the workflow without actually saving:

```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-05 \
  --target=airtable \
  --mode=agent \
  --dry-run
```

This will:
- Extract posts
- Capture screenshots
- Transcribe videos
- Generate analysis prompts
- **Skip** saving to Airtable (dry-run mode)

### Full Import

Once dry run looks good, run for real:

```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-30 \
  --target=airtable \
  --mode=agent
```

This will save all analyzed posts to Airtable!

---

## Step 7: Verify Data in Airtable

1. Open your Airtable base
2. Go to "Instagram Posts" table
3. Check that posts are populated:
   - URL filled
   - Creator linked
   - Date Posted set
   - Caption present
   - Screenshot attached (if captured)
   - Video Transcription present (for reels)
   - Analysis fields populated (Framework, Hook Categories, etc.)

---

## Usage Examples

### Save to Airtable with API Mode (Full Automation)

```bash
export ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-30 \
  --target=airtable \
  --mode=api
```

### Save to Notion (Legacy, Default)

```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-30
  # No --target flag = defaults to notion
```

### Test Without Saving (Any Target)

```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-15 \
  --end=2025-11-20 \
  --target=airtable \
  --dry-run
```

---

## Troubleshooting

### Error: "AIRTABLE_API_KEY environment variable required"

**Solution:**
```bash
# Check .env file exists
cat .env

# Should contain:
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
```

### Error: "NOT_FOUND: Could not find table Instagram Posts"

**Solution:**
- Check your Base ID is correct
- Verify table name is exactly "Instagram Posts" (case-sensitive)
- Ensure token has access to this specific base

### Error: "INVALID_PERMISSIONS: Missing required scopes"

**Solution:**
1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Find your token
3. Edit → Add missing scopes:
   - `data.records:read`
   - `data.records:write`

### Error: "Formula is invalid" when filtering

**Solution:**
- Check your Creator Name doesn't have special characters
- Make sure linked records exist before linking

### Duplicates Being Created

**Solution:**
- The workflow checks for duplicates by URL
- If duplicates still appear, check URL format consistency
- Use `--skip-validate` to skip duplicate checking (not recommended)

---

## Field Mapping Reference

| Workflow Data | Airtable Field | Type |
|--------------|---------------|------|
| `post.url` | URL | URL |
| `post.date` | Date Posted | Date |
| `post.caption` | Caption | Long text |
| `post.isReel` | Is Reel | Checkbox |
| `post.transcription` | Video Transcription | Long text |
| `post.screenshot` | Screenshot | Attachment |
| `post.analysis.framework` | Framework | Single select |
| `post.analysis.hookCategories` | Hook Categories | Multiple select |
| `post.analysis.ctaType` | CTA Type | Single select |
| `post.analysis.emotionalTones` | Emotional Tones | Multiple select |
| `post.analysis.visualStyle` | Visual Style | Multiple select |
| `post.analysis.painPoint` | Pain Point | Long text |
| `post.analysis.titleHook` | Title/Hook | Long text |
| `post.analysis.notes` | Analysis Notes | Long text |
| `@profile` | Creator | Link to Creators |

---

## Advanced: Migrating from Notion

If you have existing data in Notion:

### Option 1: Manual CSV Export/Import

1. Export Notion database as CSV
2. Import to Airtable
3. Map fields to match schema
4. Clean up data types

### Option 2: Use Both (Hybrid Approach)

Keep using Notion for new imports, but switch analysis to Airtable:

```bash
# Import to Notion (existing workflow)
node lib/orchestrator-v2.js berudolph --target=notion

# Later, manually copy to Airtable for analysis
```

### Option 3: Full Migration Script (Future Enhancement)

We could create a migration script that:
1. Reads all posts from Notion
2. Transforms to Airtable format
3. Imports to Airtable with duplicate checking

---

## Views to Create

After importing data, create these useful views:

### 1. Gallery View
- Filter: Archived ≠ true
- Card cover: Screenshot
- Group by: Format

### 2. By Framework
- Filter: Archived ≠ true
- Group by: Framework
- Sort: Date Posted (newest)

### 3. Reels Only
- Filter: Is Reel = true
- Group by: Creator

### 4. Calendar View
- Calendar field: Date Posted
- Color: By Framework

See `AIRTABLE-SCHEMA.md` for 10 pre-configured view ideas.

---

## Cost Considerations

**Free Tier Limits:**
- 1,000 records per base
- Unlimited bases
- 100 automation runs/month

**When You'll Need Paid:**
- Analyzing 3+ creators seriously
- Need more than 1,000 records in one base
- Solution: Create multiple bases (one per creator)

**Pricing:**
- Plus: $20/month (5,000 records)
- Pro: $45/month (50,000 records)

---

## Next Steps

1. ✅ Create Airtable base with schema
2. ✅ Get API credentials
3. ✅ Configure .env file
4. ✅ Test connection
5. ✅ Run first import
6. Create custom views for your analysis needs
7. Set up automations (optional)
8. Invite team members (optional)

---

## Support

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Verify your schema matches `AIRTABLE-SCHEMA.md`
3. Test connection with `node test-airtable-connection.js`
4. Check Airtable API docs: [airtable.com/developers/web/api](https://airtable.com/developers/web/api)

---

**Last Updated:** $(date +%Y-%m-%d)
**Version:** 1.0.0
