# Airtable Integration - Quick Start

Get started with Airtable in 10 minutes!

---

## 🚀 Quick Setup (3 Steps)

### 1. Create Base & Get Credentials

```bash
# 1. Go to airtable.com and create an account
# 2. Create a base named "Instagram Content Decoder"
# 3. Follow AIRTABLE-SCHEMA.md to create tables
# 4. Get Personal Access Token from: airtable.com/create/tokens
# 5. Copy your Base ID from the URL (starts with app...)
```

### 2. Configure Environment

```bash
cd bmad/agents/content-decoder/workflows/batch-analyze

# Create .env file
cp .env.example .env

# Edit .env and add:
# AIRTABLE_API_KEY=patXXXXXXXXXXXXXX.xxxxxxxxx
# AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
```

### 3. Test & Run

```bash
# Test connection
node test-airtable-connection.js

# Run first import (small date range)
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-28 \
  --end=2025-11-30 \
  --target=airtable \
  --mode=agent
```

---

## ✅ What You Get

- **100,000 character fields** (vs Notion's 2,000)
- **Pivot tables & analytics** (vs Notion's basic views)
- **Calendar, gallery, kanban views**
- **Formula fields & rollups**
- **Creator relationship tracking**
- **Free tier: 1,000 records** (5-8 years of content)

---

## 📖 Full Documentation

- **`AIRTABLE-SETUP.md`** - Complete step-by-step setup guide
- **`AIRTABLE-SCHEMA.md`** - Database schema (3 tables, 21 fields)
- **`TESTING.md`** - Test scenarios for Airtable
- **`IMPROVEMENTS.md`** - Technical details

---

## 🎯 Usage Examples

### Save to Airtable (Recommended)
```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-30 \
  --target=airtable
```

### Save to Notion (Legacy)
```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-01 \
  --end=2025-11-30
  # No --target flag = defaults to notion
```

### Test Without Saving
```bash
node lib/orchestrator-v2.js berudolph \
  --start=2025-11-15 \
  --end=2025-11-20 \
  --target=airtable \
  --dry-run
```

---

## 🔧 Troubleshooting

### "AIRTABLE_API_KEY environment variable required"
→ Check your .env file exists and has correct values

### "NOT_FOUND: Could not find table Instagram Posts"
→ Verify table name is exactly "Instagram Posts" (case-sensitive)

### "INVALID_PERMISSIONS: Missing required scopes"
→ Token needs `data.records:read` and `data.records:write` scopes

**See `AIRTABLE-SETUP.md` for full troubleshooting guide**

---

## 💡 Why Airtable?

| Feature | Notion | Airtable |
|---------|--------|----------|
| Character Limit | 2,000 | 100,000 |
| Analytics | Basic | Advanced (pivot, charts) |
| Views | Limited | Calendar, gallery, kanban |
| Formulas | Simple | Full spreadsheet-like |
| API | Complex | Simple |
| Relationships | Basic | Proper database linking |

**Bottom line:** Use Airtable for analysis, Notion for documentation.

---

**Ready to dive deeper?** → See `AIRTABLE-SETUP.md` for complete guide

**Need help?** → Check troubleshooting in `AIRTABLE-SETUP.md`

**Want to understand the schema?** → See `AIRTABLE-SCHEMA.md`

---

Last Updated: 2025-01-18
