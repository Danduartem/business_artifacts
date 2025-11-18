# Agent Tools

Modular automation toolkit for multi-agent workflows that run for hours or days.

## Quick Start

```bash
# Install all workspaces
npm install

# Or install selectively (for library users)
npm install -w @agent-tools/core
npm install -w @agent-tools/primitives-browser

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Use any tool
node capabilities/primitives/browser/start.js --help
node capabilities/workflows/media/download-and-transcribe.js --url "https://example.com/video.mp4"
```

## For AI Agents: Tool Discovery

**Primary discovery mechanism**: `core/registry.json`

```javascript
// Load registry
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
│   ├── registry.json      # AUTO-GENERATED tool catalog
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
- **core/registry.json** - Auto-generated tool catalog
- **templates/** - Copy-paste templates for new tools

## Key Principles

1. **Discoverable** - All tools in registry.json
2. **Self-documenting** - JSDoc headers + --help flag
3. **Composable** - Primitives → Workflows → Applications
4. **Resilient** - State checkpointing for long operations
5. **Observable** - Centralized logging
6. **Maintainable** - Auto-generated registry, clear conventions
7. **Modular** - Workspace architecture for selective installation

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
