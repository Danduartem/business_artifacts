# Environment Configuration

All agent-tools share a centralized `.env` file at the root of the `agent-tools/` directory.

## Quick Setup

```bash
# 1. Copy the example file
cp .env.example .env

# 2. Edit .env and add your API keys
nano .env  # or use your preferred editor

# 3. Test your configuration
node capabilities/primitives/storage/airtable-query.js --table "YourTable" --max-records 1
```

## Configuration File Location

```
agent-tools/
├── .env                    # Your credentials (gitignored)
├── .env.example            # Template with instructions
└── core/
    └── clients/
        └── airtable.js     # Loads from root .env
```

## Supported Environment Variables

### Airtable
```bash
AIRTABLE_API_KEY=patXXXXXXX...    # Personal Access Token
AIRTABLE_BASE_ID=appXXXXXXX       # Base ID from URL
```

**Get credentials:**
- API Token: https://airtable.com/create/tokens
  - Required scopes: `data.records:read`, `data.records:write`
- Base ID: From your Airtable URL (`app...` prefix)

### Notion
```bash
NOTION_API_TOKEN=secret_XXXXXX...  # Integration token
NOTION_DATABASE_ID=XXXXXX...       # Database ID
```

**Get credentials:**
- Token: https://www.notion.so/my-integrations
- Database ID: From database URL or share menu

### OpenAI (Transcription, Analysis)
```bash
OPENAI_API_KEY=sk-XXXXXX...
```

**Get credentials:**
- API Key: https://platform.openai.com/api-keys

### Anthropic (Content Analysis)
```bash
ANTHROPIC_API_KEY=sk-ant-XXXXXX...
```

**Get credentials:**
- API Key: https://console.anthropic.com/settings/keys

### Browser Automation (Optional)
```bash
CHROME_PATH=/path/to/chrome  # Usually auto-detected
```

## How It Works

### Client Loading Order

All clients follow this pattern:

1. **Try root `.env`**: `agent-tools/.env`
2. **Fallback to CWD**: `process.cwd()/.env`
3. **Use environment variables**: Already set in shell
4. **Error if missing**: Clear error message

### Example (Airtable Client)

```javascript
// core/clients/airtable.js
const envPath = join(__dirname, '..', '..', '.env');
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
}
```

### Primitives Inherit Configuration

All primitives automatically use the centralized config:

```bash
# No need to specify --api-key or --base-id
node capabilities/primitives/storage/airtable-create.js \
  --table "Posts" \
  --fields '{"URL": "..."}'
```

## Security Best Practices

1. **Never commit `.env`**: Already in `.gitignore`
2. **Rotate tokens regularly**: Especially after sharing code
3. **Use minimal scopes**: Only grant required permissions
4. **Different tokens per environment**: Dev vs production

## Troubleshooting

### "Environment variable required" error

**Symptom:**
```
ERROR: AIRTABLE_API_KEY or AIRTABLE_TOKEN environment variable required
```

**Solution:**
1. Check `.env` exists at `agent-tools/.env`
2. Verify variable name matches exactly (case-sensitive)
3. No spaces around `=`: `KEY=value` not `KEY = value`
4. Restart terminal if you just created `.env`

### "Not authorized" error

**Symptom:**
```
ERROR: You are not authorized to perform this operation
```

**Solution:**
1. Check token has correct scopes
2. Verify token hasn't expired
3. Check base ID is correct
4. Ensure table name is exact match (case-sensitive)

### Values not loading

**Debug steps:**
```bash
# 1. Verify file exists
ls -la agent-tools/.env

# 2. Check file contents (don't share output!)
cat agent-tools/.env | grep AIRTABLE

# 3. Test direct loading
node -e "require('dotenv').config({path: './agent-tools/.env'}); console.log(process.env.AIRTABLE_API_KEY)"
```

## Migration from Old Setup

If you had `.env` files in subdirectories:

```bash
# Old structure
agent-tools/capabilities/data-storage/airtable/.env

# New structure
agent-tools/.env
```

**Migration steps:**
1. Copy values from old `.env` to root `.env`
2. Test that primitives work
3. Delete old `.env` files (optional, for cleanup)

```bash
# Quick migration
cat agent-tools/capabilities/data-storage/airtable/.env >> agent-tools/.env
```

## Benefits of Centralized Config

✅ Single source of truth for all credentials
✅ Easier to manage and update API keys
✅ Consistent across all tools and primitives
✅ Simpler onboarding for new tools
✅ Reduced duplication and sync issues

## See Also

- [CONVENTIONS.md](CONVENTIONS.md) - Standards and architecture
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Practical development guide
- [README.md](../README.md) - Project overview and quick start
- [.env.example](../.env.example) - Template file
