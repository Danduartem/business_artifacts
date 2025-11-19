# Agent Tools

**Version:** 3.0.0
**Modular automation toolkit** for AI agents with token-efficient progressive disclosure.

Build automation workflows from composable primitives with 91% token reduction in discovery.

---

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your API keys (see docs/ENVIRONMENT.md)

# Verify installation
npm run health

# Build registry
npm run register
```

## 📚 Documentation

**All documentation is in the `docs/` folder:**

| Document | Purpose |
|----------|---------|
| **[ENVIRONMENT.md](docs/ENVIRONMENT.md)** | API keys and environment setup - **start here** |
| **[CONVENTIONS.md](docs/CONVENTIONS.md)** | Development standards and architecture overview |
| **[DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)** | Practical guide with templates for creating tools |
| **[PROGRESSIVE-DISCLOSURE.md](docs/PROGRESSIVE-DISCLOSURE.md)** | Discovery API for AI agents |
| **[index.md](docs/index.md)** | Documentation hub with cross-references |

**Quick links:**
- **New users:** Start with [ENVIRONMENT.md](docs/ENVIRONMENT.md) for setup
- **Tool developers:** Read [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) for templates
- **AI agents:** See "For AI Agents" section below or [PROGRESSIVE-DISCLOSURE.md](docs/PROGRESSIVE-DISCLOSURE.md)

---

## Architecture

### Two-Layer Design

```
Primitives (atomic operations)
    ↓
Workflows (composed operations, simple → complex)
    ↓
Your Applications
```

**Primitives** (27 tools):
- Single-purpose atomic operations
- Examples: `browser.start`, `media.transcribe`, `storage.airtable-create`
- CLI: `node capabilities/primitives/{category}/{action}.js --flag value`

**Workflows** (12 tools):
- Multi-step compositions of primitives and other workflows
- Complexity levels: **low** (2-5 min), **medium** (10-30 min), **high** (hours/days)
- High complexity workflows support `--resume` for checkpoint recovery
- Examples: `instagram.extract-post` (low), `instagram.bulk-extraction` (high)
- CLI: `node capabilities/workflows/{category}/{name}.js --param value`

**Complexity Property** (not a separate layer):
- Workflows have `@complexity` annotation: `low`, `medium`, or `high`
- High complexity = checkpointing + `--resume` support
- No separate "jobs" layer

### Progressive Disclosure

**91% token reduction** in discovery flow:

| Method | Tokens | Use Case |
|--------|--------|----------|
| Category index | 15 | See all categories |
| Category workflows | 80-150 | Discover workflows in category |
| Category primitives | 100-250 | Discover primitives in category |
| **Total (typical)** | **135** | vs 1,500 tokens loading full registry |

**How it works:**
1. Load `core/registry/index.json` (15 tokens) - See categories
2. Load `core/registry/{category}/workflows.json` (120 tokens) - Find workflows
3. Execute discovered workflow
4. Total: 135 tokens vs 1,500 tokens (91% reduction)

See [PROGRESSIVE-DISCLOSURE.md](docs/PROGRESSIVE-DISCLOSURE.md) for complete API reference.

---

## For AI Agents

### Tool Discovery Pattern (Recommended)

**Use progressive disclosure for token efficiency:**

```javascript
import { getIndex, getWorkflowsByCategory, executeWorkflow } from './core/discovery.js';

// Step 1: Load index (15 tokens)
const index = getIndex();
console.log(index); // { instagram: { workflows: 6, primitives: 1 }, ... }

// Step 2: Load workflows for category (120 tokens)
const workflows = getWorkflowsByCategory('instagram');

// Step 3: Find workflow by semantic matching
const tool = workflows.tools.find(t =>
  t.when.toLowerCase().includes('extract') &&
  t.when.toLowerCase().includes('profile')
);
// Found: instagram.extract-profile

// Step 4: Check complexity and features
if (tool.complexity === 'high') {
  console.log(`Long-running workflow (${tool.runtime})`);
  console.log('Supports --resume for recovery');
}

// Step 5: Execute
const result = await executeWorkflow(tool.id, {
  username: 'example',
  'start-date': '2025-11-01'
});

// Total: 135 tokens (vs 1,500 tokens loading full registry)
```

### Semantic Matching with @when

Every tool has a `@when` field describing its use case:

```javascript
// Example: Finding the right workflow
const workflows = getWorkflowsByCategory('instagram');

// Match by keywords in @when field
const extractTool = workflows.tools.find(t =>
  t.when.includes('extract posts') &&
  t.when.includes('date range')
);

// Each workflow includes:
// - id: 'instagram.extract-posts'
// - when: 'Extract Instagram posts within date range'
// - complexity: 'medium'
// - runtime: '10-30min'
// - flags: [{ name: 'username', description: '...', required: true }]
```

### Direct Execution (Without Discovery)

If you already know the workflow ID:

```javascript
import { executeWorkflow } from './core/discovery.js';

// Execute directly
const result = await executeWorkflow('instagram.extract-profile', {
  username: 'berudolph',
  'start-date': '2025-11-01',
  'end-date': '2025-11-30'
});

// Returns JSON: { success: true, result: {...} }
```

### Working with High Complexity Workflows

High complexity workflows support resume after interruption:

```javascript
// Start long-running workflow
const result = await executeWorkflow('instagram.bulk-extraction', {
  profiles: ['user1', 'user2', 'user3'],
  'start-date': '2025-11-01'
});

// If interrupted, resume from checkpoint:
// node capabilities/workflows/instagram/bulk-extraction.js --resume

// Or programmatically:
import { spawn } from 'node:child_process';
const proc = spawn('node', [
  'capabilities/workflows/instagram/bulk-extraction.js',
  '--resume'
]);
```

---

## Examples

### Execute Primitive (CLI)

```bash
# Start browser
node capabilities/primitives/browser/start.js --profile

# Extract text from page
node capabilities/primitives/page/extract-text.js --selector "h1"

# Save to Airtable
node capabilities/primitives/storage/airtable-create.js \
  --table "Posts" \
  --fields '{"url":"https://..."}'
```

### Execute Workflow (CLI)

```bash
# Download and transcribe video (low complexity)
node capabilities/workflows/media/download-and-transcribe.js \
  --url "https://example.com/video.mp4" \
  --language pt

# Extract Instagram profile (medium complexity)
node capabilities/workflows/instagram/extract-profile.js \
  --username berudolph \
  --start-date "2025-11-01" \
  --end-date "2025-11-30"

# Bulk extraction with resume support (high complexity)
node capabilities/workflows/instagram/bulk-extraction.js \
  --profiles '["user1","user2"]' \
  --start-date "2025-11-01"

# Resume after interruption
node capabilities/workflows/instagram/bulk-extraction.js --resume
```

### Compose Primitives (Programmatic)

```javascript
import { executePrimitive } from './capabilities/workflows/workflow-utils.js';

async function customWorkflow(url) {
  // Start browser
  const browser = executePrimitive('browser/start.js', { profile: true });
  if (!browser.success) throw new Error(browser.error);

  // Navigate and extract
  const nav = executePrimitive('browser/navigate.js', { url });
  if (!nav.success) throw new Error(nav.error);

  const data = executePrimitive('page/extract-text.js', {
    selector: '.content'
  });
  if (!data.success) throw new Error(data.error);

  // Save to storage
  const saved = executePrimitive('storage/airtable-create.js', {
    table: 'Content',
    fields: { text: data.result.text }
  });
  if (!saved.success) throw new Error(saved.error);

  // Cleanup
  executePrimitive('browser/close.js');

  return data.result;
}
```

**Note:** `executePrimitive` is synchronous (uses `spawnSync`), not async/await.

---

## Core Services

For high complexity workflows and multi-agent coordination:

```javascript
// Logging (all tools)
import { createLogger } from './core/logger/index.js';
const logger = createLogger({ toolName: 'my-workflow' });
logger.info('Processing...', { step: 1 });
logger.error('Failed', { error: err.message });

// State management & checkpointing (high complexity workflows)
import { createStateManager } from './core/state/index.js';
const state = createStateManager({ namespace: 'unique-id' });
state.set('progress', { stage: 1, items: 42 });
state.createCheckpoint(); // Save to disk
state.restoreCheckpoint(); // Resume after crash

// Event bus (multi-agent coordination)
import { getEventBus } from './core/events/index.js';
const events = getEventBus();
events.publish('data.ready', { items: 100 });
events.subscribe('data.ready', (data) => process(data));
```

**See [CONVENTIONS.md](docs/CONVENTIONS.md) for detailed usage examples.**

---

## Creating New Tools

### Quick Steps

1. Choose tool type: **Primitive** or **Workflow**?
2. Choose category: `browser`, `media`, `instagram`, etc.
3. For workflows, choose complexity: `low`, `medium`, or `high`
4. Copy template from [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)
5. Place in correct directory:
   - Primitive: `capabilities/primitives/{category}/{action}.js`
   - Workflow: `capabilities/workflows/{category}/{name}.js`
6. Update JSDoc header with all required fields
7. Implement functionality
8. Make executable: `chmod +x your-tool.js`
9. Test: `node your-tool.js --help`
10. Register: `npm run register`

### Required Reading

- **[DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)** - Complete templates and best practices
- **[CONVENTIONS.md](docs/CONVENTIONS.md)** - Standards and quick reference
- **[ENVIRONMENT.md](docs/ENVIRONMENT.md)** - API keys and environment setup

### JSDoc Format (Quick Reference)

**Primitives:**
```javascript
/**
 * @tool browser.start
 * @when Start browser instance for automation
 * @category browser
 * @flag profile - Use persistent profile (optional)
 */
```

**Workflows:**
```javascript
/**
 * @workflow instagram.extract-profile
 * @when Extract Instagram profile with posts in date range
 * @complexity medium
 * @category instagram
 * @flag username - Instagram username (required)
 * @flag start-date - Start date YYYY-MM-DD (optional)
 * @runtime 10-30min
 */
```

**See [CONVENTIONS.md](docs/CONVENTIONS.md) for complete JSDoc templates.**

---

## File Structure

```
agent-tools/
├── README.md                    # This file
├── package.json
├── .env.example
├── docs/
│   ├── index.md                 # Documentation hub
│   ├── CONVENTIONS.md           # Standards and conventions
│   ├── ENVIRONMENT.md           # API keys and environment setup
│   ├── DEVELOPMENT_GUIDE.md     # Practical development guide
│   └── PROGRESSIVE-DISCLOSURE.md # Discovery API reference
├── scripts/
│   ├── build-registry.js        # Generates registry files
│   ├── health-check.js          # Verify installation
│   └── cleanup.sh               # Clean temp files
├── core/
│   ├── registry.json            # Full registry (compatibility)
│   ├── registry/                # Split registry for progressive disclosure
│   │   ├── index.json           # Category overview (15 tokens)
│   │   ├── browser/
│   │   │   └── primitives.json  # Browser primitives (80-250 tokens)
│   │   ├── instagram/
│   │   │   ├── primitives.json
│   │   │   └── workflows.json   # Instagram workflows (80-150 tokens)
│   │   └── ...
│   ├── discovery.js             # Progressive disclosure API
│   ├── logger/                  # Logging system
│   ├── state/                   # State management & checkpointing
│   ├── events/                  # Event bus for coordination
│   ├── health/                  # Health monitoring
│   └── utils/                   # Shared utilities
├── schemas/                     # JSON schemas
├── temp/                        # Temporary files (gitignored)
│   ├── logs/                    # Tool execution logs
│   ├── state/                   # Workflow checkpoints
│   └── downloads/               # Downloaded media
└── capabilities/
    ├── primitives/              # 27 atomic operations
    │   ├── browser/             # 5 tools
    │   ├── page/                # 6 tools
    │   ├── media/               # 3 tools
    │   ├── http/                # 3 tools
    │   ├── file/                # 3 tools
    │   └── storage/             # 7 tools
    ├── workflows/               # 12 composed operations
    │   ├── media/               # 3 workflows
    │   ├── instagram/           # 6 workflows
    │   ├── content/             # 2 workflows
    │   └── youtube/             # 1 workflow
    └── workflow-utils.js        # Workflow utilities (executePrimitive)
```

---

## Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| **[README.md](README.md)** | Project overview, quick start | Everyone |
| **[CONVENTIONS.md](docs/CONVENTIONS.md)** | Standards, quick reference | Tool developers |
| **[ENVIRONMENT.md](docs/ENVIRONMENT.md)** | API keys, environment setup | Everyone |
| **[DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)** | Practical guide with templates | Tool developers |
| **[PROGRESSIVE-DISCLOSURE.md](docs/PROGRESSIVE-DISCLOSURE.md)** | Discovery API reference | AI agents |
| **[docs/index.md](docs/index.md)** | Documentation hub | Everyone |

---

## Key Principles

1. **Token-Efficient** - 91% token reduction via progressive disclosure
2. **Discoverable** - Split registry + semantic matching via `@when` field
3. **Self-Documenting** - JSDoc headers + `--help` flag
4. **Composable** - Primitives → Workflows → Applications
5. **Resilient** - Checkpointing + `--resume` for high complexity workflows
6. **Observable** - Centralized logging to `temp/logs/`
7. **Maintainable** - Auto-generated registry, clear conventions
8. **Modular** - Workspace architecture for selective installation

---

## Version History

### v3.0.0 (2025-11-19)

**Major Changes:**
- ✅ Removed jobs layer (merged into workflows with `@complexity` property)
- ✅ Implemented split registry for progressive disclosure (91% token reduction)
- ✅ Updated all 39 tools to v3.0.0 JSDoc format
- ✅ Standardized parseArgs usage (primitives: `core/utils`, workflows: `node:util`)
- ✅ Added `@when` field to all tools for semantic matching

**Architecture:**
- Two layers: **Primitives → Workflows** (removed jobs layer)
- Workflow complexity levels: `low`, `medium`, `high`
- High complexity workflows support `--resume`

**Discovery:**
- Split registry: `core/registry/index.json` + category files
- Progressive disclosure API in `core/discovery.js`
- 91% token reduction (1,500 → 135 tokens typical flow)

### v2.0.0 (2025-11-18)
- Added jobs layer (removed in v3.0.0)
- State management and checkpointing
- registry-lite.json (replaced by split registry in v3.0.0)

### v1.0.0 (2025-11-01)
- Initial release
- Primitives and workflows architecture
- Basic registry system

---

**Concept from:** [badlogic/browser-tools](https://github.com/badlogic/browser-tools)
**License:** MIT
