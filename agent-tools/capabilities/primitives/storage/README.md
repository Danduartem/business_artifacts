# Storage Primitives

Atomic operations for storing and retrieving data from various storage backends.

## Available Primitives

### Notion Primitives

#### storage.notion-create
Create a new page in a Notion database.

**Usage:**
```bash
node capabilities/primitives/storage/notion-create.js \
  --database-id appXXXXXXXXXXXXXX \
  --properties '{"Name": {"title": [{"text": {"content": "My Page"}}]}}'
```

#### storage.notion-update
Update an existing Notion page.

**Usage:**
```bash
node capabilities/primitives/storage/notion-update.js \
  --page-id XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX \
  --properties '{"Status": {"status": {"name": "Done"}}}'
```

#### storage.notion-query
Query records from a Notion database.

**Usage:**
```bash
node capabilities/primitives/storage/notion-query.js \
  --database-id appXXXXXXXXXXXXXX \
  --filter '{"property": "Status", "status": {"equals": "Done"}}' \
  --limit 10
```

---

### Airtable Primitives

#### storage.airtable-create
Create a single record in an Airtable table.

**Usage:**
```bash
node capabilities/primitives/storage/airtable-create.js \
  --table "Instagram Posts" \
  --fields '{"URL": "https://instagram.com/p/ABC123", "Caption": "Test post"}'
```

**Output:**
```json
{
  "success": true,
  "id": "recXXXXXXXXXXXXXX",
  "fields": {...},
  "createdTime": "2025-01-18T..."
}
```

#### storage.airtable-query
Query records from an Airtable table.

**Usage:**
```bash
# Query with filter
node capabilities/primitives/storage/airtable-query.js \
  --table "Instagram Posts" \
  --formula "{URL} = 'https://instagram.com/p/ABC123'" \
  --max-records 10

# Query with sort and field selection
node capabilities/primitives/storage/airtable-query.js \
  --table "Creators" \
  --sort '[{"field": "Name", "direction": "asc"}]' \
  --fields "Name,Profile URL"
```

**Output:**
```json
{
  "success": true,
  "count": 5,
  "records": [
    {
      "id": "recXXXXXXXXXXXXXX",
      "fields": {...},
      "createdTime": "2025-01-18T..."
    }
  ]
}
```

#### storage.airtable-update
Update an existing Airtable record.

**Usage:**
```bash
node capabilities/primitives/storage/airtable-update.js \
  --table "Instagram Posts" \
  --record-id recXXXXXXXXXXXXXX \
  --fields '{"Archived": true}'
```

**Output:**
```json
{
  "success": true,
  "id": "recXXXXXXXXXXXXXX",
  "fields": {...}
}
```

#### storage.airtable-batch
Create multiple records in a single API call (max 10 per batch).

**Usage:**
```bash
node capabilities/primitives/storage/airtable-batch.js \
  --table "Instagram Posts" \
  --records '[
    {"URL": "https://instagram.com/p/ABC123", "Caption": "Post 1"},
    {"URL": "https://instagram.com/p/DEF456", "Caption": "Post 2"}
  ]'
```

**Output:**
```json
{
  "success": true,
  "count": 2,
  "records": [
    {
      "id": "recXXXXXXXXXXXXXX",
      "fields": {...}
    }
  ]
}
```

---

## Environment Variables

### Notion
- `NOTION_API_TOKEN` - Notion integration token

### Airtable
- `AIRTABLE_API_KEY` - Airtable API token
- `AIRTABLE_BASE_ID` - Base ID (starts with `app...`)

---

## Composing Primitives

These primitives are designed to be composed into workflows:

```bash
# Example: Find or create pattern
EXISTING=$(node storage/airtable-query.js \
  --table "Creators" \
  --formula "{Name} = '@username'" \
  --max-records 1)

if [ $(echo $EXISTING | jq '.count') -eq 0 ]; then
  node storage/airtable-create.js \
    --table "Creators" \
    --fields '{"Name": "@username"}'
fi
```

---

## Error Handling

All primitives output JSON with a `success` field:

**Success:**
```json
{"success": true, ...}
```

**Error:**
```json
{"success": false, "error": "Error message"}
```

Exit codes:
- `0` - Success
- `1` - Error

---

## See Also

- [Airtable Workflow](../../workflows/content/save-instagram-to-airtable.js) - High-level Instagram to Airtable workflow
- [Core Registry](../../../core/registry.json) - Full primitive catalog
- [Architecture Docs](../../../ARCHITECTURE.md) - System design principles
