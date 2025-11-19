# Agent Tools

Modular automation toolkit for multi-agent workflows that run for hours or days.

---

## 🤖 FOR AI AGENTS IN NEW SESSIONS

**When the user requests Instagram extraction or any job execution:**

1. **Read HOW-TO-USE.md first** - Contains natural language → code mapping
2. **Use `executeJob()` from `./core/discovery.js`** - Never run jobs directly
3. **User will see real-time progress** - Automatic monitoring every 15s

**Example pattern:**
- User says: "Extract posts from @username for December"
- You use: `executeJob('complete-profile-extraction', {username, dates, profile: true})`
- System handles: Progress updates, completion, summary, 98% token savings

**Key files:**
- **HOW-TO-USE.md** - Practical examples and parameter mapping
- **USAGE-GUIDE.md** - Technical details and patterns
- **This README** - Quick reference

---

## ⚠️ CRITICAL FOR AI AGENTS: Progressive Disclosure + Monitoring

**ALWAYS use the v3.0 discovery system with automatic monitoring.**
This is required for token efficiency (97% savings) and proper UX (no silent 10-min waits).

### The Correct Way to Execute Jobs

```javascript
import { executeJob } from './core/discovery.js';

// ✅ CORRECT: Discovery + Execution + Monitoring (all-in-one)
const result = await executeJob('complete-profile-extraction', {
  username: 'blankschoolbr',
  'start-date': '2025-11-01',
  'end-date': '2025-11-30',
  profile: true,
  transcribe: true
});

// User sees real-time progress:
// 🚀 Starting: complete-profile-extraction
// 📊 Monitoring enabled (updates every 15s)
// 📍 Stage 1/4: Extracting URLs
// 📍 Stage 2/4: Extracting posts
//    [42%] Extracting posts: 5/12
// ...
// ✅ Complete! (2m 15s)
//    Summary: {totalPosts: 12, videosTranscribed: 3}
```

**Token Usage**:
- Discovery: 220 tokens (one-time)
- Monitoring: ~100 tokens per 15s poll
- 2-min job: 1,020 tokens total
- **vs 51,000 tokens** (reading full logs without monitoring)
- **98% token savings**

### What NOT to Do

```javascript
// ❌ WRONG: Direct execution (bypasses discovery, no monitoring)
exec('node capabilities/jobs/instagram/complete-profile-extraction.js ...');
// Problems:
// - User waits 10 minutes with no feedback
// - Wastes 51k tokens reading full logs
// - Doesn't use progressive disclosure

// ❌ WRONG: Load full registry upfront
const registry = require('./core/registry.json'); // 8,000 tokens!
// Should use discovery.js instead (20-220 tokens)
```

---

## Quick Start

```bash
# Install all workspaces
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API keys
```

### For AI Agents: Discover → Execute → Monitor

```javascript
// Step 1: Discover (20 tokens)
import { getIndex } from './core/discovery.js';
const index = getIndex();
console.log(index.categories); // { instagram: {...}, media: {...}, ... }

// Step 2: Find job (150 tokens)
import { getJobsByCategory } from './core/discovery.js';
const jobs = getJobsByCategory('instagram');
const job = jobs.tools.find(j => j.id === 'complete-profile-extraction');

// Step 3: Execute with monitoring (820 tokens for 2-min job)
import { executeJob } from './core/discovery.js';
const result = await executeJob('complete-profile-extraction', {
  username: 'blankschoolbr',
  'start-date': '2025-11-01',
  'end-date': '2025-11-30'
});

// Total: 990 tokens vs 51,000 tokens (95% savings)
```

---

## For AI Agents: Tool Discovery (v3.0)

### Progressive Disclosure (Recommended)

**Start with job-level catalog for 94% token savings:**

```javascript
// Option 1: Load lite registry (1,500 tokens vs 8,000 tokens)
const registryLite = require('./core/registry-lite.json');

// See available jobs and their use cases
const instagramJobs = registryLite.jobs.instagram.tools;

// Option 2: Load prime prompts (300 tokens)
// Read: core/prime-prompts/instagram-extraction.md
// Provides job-level interfaces without primitive details

// Option 3: Use Claude Code Skills (500 tokens when invoked)
// .claude/skills/instagram-extraction/skill.md
// Auto-discovered and loaded on-demand
```

**When to use each discovery method:**

| Method | Tokens | Best For |
|--------|--------|----------|
| **registry-lite.json** | ~1,500 | Job + workflow discovery |
| **prime-prompts/*.md** | ~300 | Specific use case (e.g., Instagram extraction) |
| **Skills** | ~500 | Auto-discovery in Claude Code |
| **registry.json** | ~8,000 | Building custom workflows from primitives |

**Recommendation:** Load `registry-lite.json` or prime prompts first. Only load full `registry.json` when building custom workflows.

### Full Registry (Traditional)

**For advanced use cases or custom workflow composition:**

```javascript
// Load full registry (8,000 tokens - use sparingly)
const registry = require('./core/registry.json');

// Find all primitives in a category
const browserTools = registry.primitives.browser.tools;

// Find all workflows
const mediaWorkflows = registry.workflows.media.tools;

// Execute any primitive
import { executePrimitive } from './capabilities/workflows/workflow-utils.js';
const result = await executePrimitive('browser/start.js', { profile: true });
```

**Registry structure**:
```javascript
{
  "primitives": {
    "browser": { tools: [...] },
    "page": { tools: [...] },
    "media": { tools: [...] },
    "http": { tools: [...] },
    "file": { tools: [...] },
    "storage": { tools: [...] }
  },
  "workflows": {
    "media": { tools: [...] },
    "instagram": { tools: [...] },
    "content": { tools: [...] }
  }
}
```

Each tool entry includes:
- `id` - Unique identifier (e.g., `browser.start`)
- `path` - Relative file path
- `inputs` - Required/optional parameters
- `outputs` - Expected return fields
- `dependencies` - NPM packages required
- `envVars` - Environment variables needed

### On-Demand Discovery

All tools support `--help` flag for parameter discovery:

```bash
# Discover job parameters
node capabilities/jobs/instagram/complete-profile-extraction.js --help

# Discover workflow parameters
node capabilities/workflows/media/download-and-transcribe.js --help

# Discover primitive parameters
node capabilities/primitives/browser/start.js --help
```

**Progressive disclosure pattern:** Load high-level catalog → Use `--help` for details → Avoid loading full primitive registry

## Architecture

```
Primitives (atomic operations)
    ↓
Workflows (composed operations)
    ↓
Jobs (orchestrated workflows)
    ↓
Applications (your multi-agent systems)
```

**Primitives** - Single-purpose tools (27 total):
- CLI: `node capabilities/primitives/{category}/{action}.js --param value`
- Programmatic: `executePrimitive('category/action.js', { param })`
- Example: `browser/start.js`, `page/extract-text.js`, `storage/airtable-create.js`

**Workflows** - Multi-step compositions (7 total):
- CLI: `node capabilities/workflows/{category}/{name}.js --input value`
- Programmatic: `import workflow from './capabilities/workflows/...'; await workflow(params)`
- Example: `media/download-and-transcribe.js`, `instagram/extract-profile.js`

**Jobs** - Long-running orchestrations (NEW):
- CLI: `node capabilities/jobs/{category}/{name}.js --params values [--resume]`
- Orchestrate multiple workflows into complex multi-stage operations
- Built-in checkpointing and resume capability
- Example: `instagram/bulk-content-extraction.js` (extract posts → download media → transcribe → export)

## Core Services (for long-running workflows)

```javascript
// Logging
import { createLogger } from './core/logger/index.js';
const logger = createLogger({ toolName: 'my-tool' });
logger.info('Message', { metadata });

// State management & checkpointing
import { createStateManager } from './core/state/index.js';
const state = createStateManager({ namespace: 'unique-id' });
state.set('progress', 50);
state.checkpoint(); // Save to disk
state.restoreCheckpoint(); // Resume after crash

// Event bus (multi-agent coordination)
import { getEventBus } from './core/events/index.js';
const events = getEventBus();
events.publish('data.ready', { payload });
events.subscribe('data.ready', (data) => process(data));

// Health monitoring
import { health } from './core/health/index.js';
health.registerCheck('service', async () => ({
  status: 'healthy' | 'unhealthy'
}));
```

## Creating New Tools

**See `CONVENTIONS.md` for complete standards.**

Quick steps:
1. Copy template: `cp templates/primitive-template.js capabilities/primitives/{category}/{action}.js`
2. Update JSDoc header with @tool, @input, @output annotations
3. Implement functionality
4. Register: `npm run register` (auto-updates registry.json)
5. Test: `node your-tool.js --help`

**Templates**:
- `templates/primitive-template.js` - For atomic operations
- `templates/workflow-template.js` - For multi-step workflows
- `templates/job-template.js` - For long-running orchestrations

**Auto-generation**: Registry is rebuilt on `npm install` and `npm run register`

## Examples

### Execute Primitive (CLI)
```bash
node capabilities/primitives/browser/start.js --profile
node capabilities/primitives/page/extract-text.js --selector "h1"
node capabilities/primitives/storage/airtable-create.js --table "Posts" --fields '{"url":"..."}'
```

### Execute Workflow (CLI)
```bash
node capabilities/workflows/media/download-and-transcribe.js \
  --url "https://example.com/video.mp4" \
  --language pt

node capabilities/workflows/instagram/extract-profile.js \
  --username berudolph
```

### Execute Job (CLI)
```bash
# Run a long-running job
node capabilities/jobs/instagram/bulk-content-extraction.js \
  --profiles '["user1","user2","user3"]' \
  --start-date "2024-01-01" \
  --end-date "2024-01-31" \
  --output-format json

# Resume interrupted job
node capabilities/jobs/instagram/bulk-content-extraction.js --resume
```

### Compose Primitives (Programmatic)
```javascript
import { executePrimitive } from './capabilities/workflows/workflow-utils.js';

async function customWorkflow(url) {
  // Start browser
  await executePrimitive('browser/start.js', { profile: true });

  // Navigate and extract
  await executePrimitive('browser/navigate.js', { url });
  const data = await executePrimitive('page/extract-text.js', {
    selector: '.content'
  });

  // Save to storage
  await executePrimitive('storage/airtable-create.js', {
    table: 'Content',
    fields: { text: data.text }
  });

  // Cleanup
  await executePrimitive('browser/close.js');

  return data;
}
```

### Long-Running Job with Resume
```javascript
import { createStateManager } from './core/state/index.js';
import { spawn } from 'node:child_process';

const state = createStateManager({ namespace: 'my-job' });

async function executeWorkflow(workflowPath, params) {
  // Execute workflow as child process
  // Returns JSON result
}

// Initialize or resume job state
let jobState = values.resume
  ? state.get('jobState')
  : { stage: 'initialized', processedItems: [] };

// Stage 1: Extract data
if (!jobState.stage1Complete) {
  const result = await executeWorkflow('workflow1.js', params);
  jobState.stage1Complete = true;
  jobState.stage1Result = result;
  state.set('jobState', jobState);
  state.checkpoint();
}

// Stage 2, 3, etc...
// Each stage checks completion and checkpoints progress
```

## File Structure

```
agent-tools/
├── README.md              # This file
├── CONVENTIONS.md         # Standards for creating tools (READ THIS)
├── ENVIRONMENT.md         # API key configuration guide
├── templates/             # Copy these to create new tools
│   ├── primitive-template.js
│   ├── workflow-template.js
│   └── job-template.js
├── scripts/
│   ├── build-registry.js  # Auto-generates registry.json
│   ├── health-check.js    # Verify setup
│   └── list-tools.js      # Browse catalog
├── core/
│   ├── registry.json      # AUTO-GENERATED full tool catalog (8K tokens)
│   ├── registry-lite.json # Job-level catalog for progressive disclosure (1.5K tokens)
│   ├── prime-prompts/     # Use-case-specific prompts (300 tokens each)
│   │   └── instagram-extraction.md
│   ├── logger/
│   ├── state/
│   ├── events/
│   ├── health/
│   └── clients/
├── schemas/               # JSON schemas for data structures
└── capabilities/
    ├── primitives/        # 27 atomic operations
    │   ├── browser/       # 5 tools
    │   ├── page/          # 6 tools
    │   ├── media/         # 3 tools
    │   ├── http/          # 3 tools
    │   ├── file/          # 3 tools
    │   └── storage/       # 7 tools
    ├── workflows/         # 7 composed operations
    │   ├── media/         # 1 workflow
    │   ├── instagram/     # 3 workflows
    │   └── content/       # 3 workflows
    └── jobs/              # Long-running orchestrations (NEW)
        ├── instagram/     # 1 job (bulk-content-extraction)
        ├── media/
        └── content/
```

## Documentation

- **CONVENTIONS.md** - Required reading for creating tools
- **ENVIRONMENT.md** - Environment variable setup
- **ARCHITECTURE.md** - Progressive disclosure design and token optimization
- **core/registry-lite.json** - Lightweight job-level catalog (recommended for AI agents)
- **core/registry.json** - Full tool catalog (for custom workflow composition)
- **core/prime-prompts/** - Use-case-specific prompts (300 tokens each)
- **templates/** - Copy-paste templates for new tools

## Key Principles

1. **Discoverable** - Progressive disclosure via registry-lite.json and prime prompts
2. **Self-documenting** - JSDoc headers + --help flag for on-demand parameter discovery
3. **Composable** - Primitives → Workflows → Jobs → Applications
4. **Resilient** - State checkpointing and --resume capability for long operations
5. **Observable** - Centralized logging to temp/logs/
6. **Maintainable** - Auto-generated registry, clear conventions
7. **Modular** - Workspace architecture for selective installation
8. **Token-efficient** - 94% token reduction via progressive disclosure (300-1,500 vs 8,000 tokens)

## For Library Users

This toolkit uses **npm workspaces** for modular installation:

```bash
# Install only what you need
npm install @agent-tools/core              # Required
npm install @agent-tools/primitives-browser
npm install @agent-tools/primitives-storage

# Or install everything
npm install
```

Each workspace is independently versioned and can be published to npm.

---

**Concept from**: [badlogic/browser-tools](https://github.com/badlogic/browser-tools)
