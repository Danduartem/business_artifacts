# Progressive Discovery Guide

**Version**: 3.0.0
**Purpose**: Load ONLY what you query - True progressive disclosure for 97% token reduction

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Token Comparison](#token-comparison)
3. [Discovery Methods](#discovery-methods)
4. [Tiered Registry Architecture](#tiered-registry-architecture)
5. [Discovery Helper API](#discovery-helper-api)
6. [Usage Patterns](#usage-patterns)
7. [Migration from v2.0](#migration-from-v20)

---

## Quick Start

### For AI Agents (Recommended)

**Option 1: Use Discovery Helper (Best)**
```javascript
import { getIndex, getJobsByCategory } from './core/discovery.js';

// 1. Load index (20 tokens)
const index = getIndex();
console.log(index.categories); // { instagram: {...}, media: {...}, ... }

// 2. Load only Instagram jobs (150 tokens)
const jobs = getJobsByCategory('instagram');
const job = jobs.tools.find(j => j.id === 'complete-profile-extraction');

// 3. Get parameters via --help (50 tokens)
execSync(`node ${job.path} --help`);

// Total: 220 tokens (vs 8,000 for full registry)
```

**Option 2: Load Tiered Registries Directly**
```javascript
// Load index (20 tokens)
const index = require('./core/registry/index.json');

// Load only Instagram jobs (150 tokens)
const instagramJobs = require('./core/registry/instagram/jobs.json');

// Find job
const job = instagramJobs.tools.find(j => j.id === 'complete-profile-extraction');

// Total: 170 tokens
```

**Option 3: Use Prime Prompts (Fastest)**
```markdown
Read @core/prime-prompts/instagram-extraction.md  (300 tokens)
```

---

## Token Comparison

| Method | Tokens | Reduction vs v1.0 | Reduction vs v2.0 | Use Case |
|--------|--------|-------------------|-------------------|----------|
| **v1.0: registry.json** | 8,000 | - | - | Custom workflows from primitives |
| **v2.0: registry-lite.json** | 1,500 | 81% ↓ | - | All jobs + workflows (deprecated) |
| **v3.0: Tiered registries** | 170-220 | **97% ↓** | **85% ↓** | Query-based progressive loading |
| **v3.0: Prime prompts** | 300 | **96% ↓** | **80% ↓** | Focused use case (Instagram, etc.) |

### Example: Instagram Extraction Use Case

**v1.0 (Full Registry)**:
```javascript
const registry = require('./core/registry.json'); // 8,000 tokens
const instagramJobs = registry.jobs?.instagram?.tools || [];
// Loads: 27 primitives + 7 workflows + 3 jobs = 8,000 tokens
// Uses: 1 job = 50 tokens
// Waste: 7,950 tokens (99.4%)
```

**v2.0 (Lite Registry - Deprecated)**:
```javascript
const registryLite = require('./core/registry-lite.json'); // 1,500 tokens
const instagramJobs = registryLite.jobs.instagram.tools;
// Loads: 3 jobs + 7 workflows + metadata = 1,500 tokens
// Uses: 1 job = 50 tokens
// Waste: 1,450 tokens (97%)
```

**v3.0 (Tiered Registries)**:
```javascript
import { getIndex, getJobsByCategory } from './core/discovery.js';

const index = getIndex(); // 20 tokens
const jobs = getJobsByCategory('instagram'); // 150 tokens
const job = jobs.tools.find(j => j.id === 'complete-profile-extraction');
execSync(`node ${job.path} --help`); // 50 tokens

// Total: 220 tokens
// Waste: 0 tokens (0%)
```

**Savings**: 8,000 → 220 = **97.25% reduction**

---

## Discovery Methods

### Method 1: Discovery Helper Functions (Recommended)

**Best for**: Programmatic tool discovery with minimal tokens

```javascript
import {
  getIndex,
  getJobsByCategory,
  getWorkflowsByCategory,
  getPrimitivesByCategory,
  findTool,
  getToolById,
  getRecommendedTool
} from './core/discovery.js';

// Get categories (20 tokens)
const index = getIndex();
console.log(Object.keys(index.categories));
// ['instagram', 'media', 'browser', 'storage', ...]

// Get Instagram jobs only (150 tokens)
const jobs = getJobsByCategory('instagram');
console.log(jobs.tools.map(t => t.id));
// ['complete-profile-extraction', 'bulk-content-extraction', 'process-existing-urls']

// Search across all tools (variable tokens - loads only matching categories)
const results = findTool('transcribe');
// Returns tools from media category

// Get specific tool (loads only its category)
const tool = getToolById('complete-profile-extraction');
console.log(tool.category); // 'instagram'
console.log(tool.layer); // 'jobs'

// Get recommendation
const recommended = getRecommendedTool('extract Instagram posts with transcription');
console.log(recommended.id); // 'complete-profile-extraction'
```

---

### Method 2: Direct Registry Loading

**Best for**: Simple use cases, no helper dependencies

```javascript
// Load index (20 tokens)
const index = require('./core/registry/index.json');

// Load specific category/layer (variable tokens)
const instagramJobs = require('./core/registry/instagram/jobs.json');
const mediaWorkflows = require('./core/registry/media/workflows.json');
const browserPrimitives = require('./core/registry/browser/primitives.json');

// Use tools
const job = instagramJobs.tools[0];
console.log(job.path); // 'capabilities/jobs/instagram/complete-profile-extraction.js'
```

---

### Method 3: Prime Prompts

**Best for**: Focused use cases, human-readable guidance

```markdown
# Load Instagram extraction prime prompt (300 tokens)
Read @core/prime-prompts/instagram-extraction.md

# Provides:
- Job-level interfaces
- Common flags
- Error recovery patterns
- Example commands
- No programmatic discovery needed
```

---

## Tiered Registry Architecture

### Structure

```
core/registry/
├── index.json                           # 20 tokens - All categories
├── instagram/
│   ├── jobs.json                        # 150 tokens - 3 jobs
│   ├── workflows.json                   # 120 tokens - 5 workflows
│   └── primitives.json                  # 80 tokens - 2 primitives
├── media/
│   ├── workflows.json                   # 50 tokens - 1 workflow
│   └── primitives.json                  # 120 tokens - 3 primitives
├── storage/
│   └── primitives.json                  # 280 tokens - 7 primitives
├── browser/
│   └── primitives.json                  # 200 tokens - 5 primitives
├── page/
│   └── primitives.json                  # 240 tokens - 6 primitives
├── http/
│   └── primitives.json                  # 120 tokens - 3 primitives
├── file/
│   └── primitives.json                  # 120 tokens - 3 primitives
└── content/
    └── workflows.json                   # 120 tokens - 3 workflows
```

### Registry File Format

**index.json** (20 tokens):
```json
{
  "version": "3.0.0",
  "categories": {
    "instagram": { "jobs": 3, "workflows": 5, "primitives": 2 },
    "media": { "workflows": 1, "primitives": 3 },
    "storage": { "primitives": 7 }
  }
}
```

**instagram/jobs.json** (150 tokens):
```json
{
  "category": "instagram",
  "layer": "jobs",
  "tools": [
    {
      "id": "complete-profile-extraction",
      "when": "Extract Instagram posts with full metadata, media, and transcription",
      "path": "capabilities/jobs/instagram/complete-profile-extraction.js",
      "runtime": "1-8 hours",
      "flags": ["--username", "--start-date", "--end-date", "--profile", "--resume"],
      "example": "node capabilities/jobs/instagram/complete-profile-extraction.js --username berudolph --start-date 2025-11-01 --end-date 2025-11-30"
    }
  ]
}
```

---

## Discovery Helper API

### Core Functions

#### `getIndex()`
**Tokens**: 20
**Returns**: Index with all categories and tool counts

```javascript
const index = getIndex();
// { version: '3.0.0', categories: { instagram: {...}, media: {...} } }
```

---

#### `getJobsByCategory(category)`
**Tokens**: 100-200 (depends on category)
**Returns**: All jobs in the category

```javascript
const jobs = getJobsByCategory('instagram');
// { category: 'instagram', layer: 'jobs', tools: [...] }
```

---

#### `getWorkflowsByCategory(category)`
**Tokens**: 50-150
**Returns**: All workflows in the category

```javascript
const workflows = getWorkflowsByCategory('media');
// { category: 'media', layer: 'workflows', tools: [...] }
```

---

#### `getPrimitivesByCategory(category)`
**Tokens**: 80-280
**Returns**: All primitives in the category

```javascript
const primitives = getPrimitivesByCategory('browser');
// { category: 'browser', layer: 'primitives', tools: [...] }
```

---

#### `findTool(query, options?)`
**Tokens**: Variable (loads only matching categories)
**Returns**: Array of matching tools with category/layer info

```javascript
// Search all categories
const results = findTool('transcribe');
// [{ id: 'transcribe', category: 'media', layer: 'primitives', ... }]

// Search specific layers
const jobs = findTool('instagram', { layers: ['jobs'] });

// Search specific categories
const instagramTools = findTool('extract', { categories: ['instagram'] });
```

---

#### `getToolById(toolId)`
**Tokens**: Variable (loads only the tool's category)
**Returns**: Tool object with category/layer info, or null

```javascript
const tool = getToolById('complete-profile-extraction');
// {
//   id: 'complete-profile-extraction',
//   category: 'instagram',
//   layer: 'jobs',
//   path: 'capabilities/jobs/instagram/complete-profile-extraction.js',
//   ...
// }
```

---

#### `getToolSchema(toolId, includeHelp?)`
**Tokens**: Variable + optional 50 for --help
**Returns**: Tool schema with optional help text

```javascript
const schema = getToolSchema('complete-profile-extraction');
// { id, category, layer, path, when, flags, features, runtime, example }

const schemaWithHelp = getToolSchema('complete-profile-extraction', true);
// Includes: helpText: 'Run: node {path} --help'
```

---

#### `getRecommendedTool(useCase)`
**Tokens**: Variable (uses findTool internally)
**Returns**: Best matching tool (prioritizes jobs > workflows > primitives)

```javascript
const tool = getRecommendedTool('extract Instagram posts with transcription');
// { id: 'complete-profile-extraction', category: 'instagram', layer: 'jobs', ... }
```

---

## Usage Patterns

### Pattern 1: Programmatic Discovery (AI Agents)

```javascript
import { getIndex, getJobsByCategory, findTool } from './core/discovery.js';

async function discoverAndExecute(userRequest) {
  // User: "Extract Instagram posts from berudolph"

  // Step 1: Search for matching tools (variable tokens)
  const results = findTool(userRequest);

  // Step 2: Get recommended tool (prioritizes jobs)
  const tool = results.find(t => t.layer === 'jobs') || results[0];

  // Step 3: Get parameters via --help (50 tokens)
  const help = execSync(`node ${tool.path} --help`).toString();

  // Step 4: Construct and execute command
  execSync(`node ${tool.path} --username berudolph --start-date 2025-11-01 --end-date 2025-11-30`);
}

// Total tokens: ~200-300 (vs 8,000 for full registry)
```

---

### Pattern 2: Category-Specific Discovery

```javascript
import { getJobsByCategory, getWorkflowsByCategory } from './core/discovery.js';

// User wants Instagram extraction
const jobs = getJobsByCategory('instagram'); // 150 tokens

// Show options to user
jobs.tools.forEach(job => {
  console.log(`- ${job.id}: ${job.when}`);
});

// User selects: complete-profile-extraction
const selectedJob = jobs.tools.find(j => j.id === 'complete-profile-extraction');

// Execute
execSync(`node ${selectedJob.path} --help`); // 50 tokens

// Total: 200 tokens
```

---

### Pattern 3: Quick Query

```javascript
import { getRecommendedTool } from './core/discovery.js';

// One-line discovery
const tool = getRecommendedTool('transcribe Instagram videos');
// Returns: job.instagram.complete-profile-extraction (best match)

execSync(`node ${tool.path} --username berudolph --start-date 2025-11-01 --end-date 2025-11-30 --transcribe`);
```

---

### Pattern 4: Human-Readable (Prime Prompts)

```bash
# Load focused prime prompt (300 tokens)
cat core/prime-prompts/instagram-extraction.md

# Follow instructions
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30 \
  --profile \
  --resume
```

---

## Migration from v2.0

### Before (v2.0 - registry-lite.json)

```javascript
// Load everything (1,500 tokens)
const registryLite = require('./core/registry-lite.json');

// Find Instagram jobs
const instagramJobs = registryLite.jobs.instagram.tools;

// Find job
const job = instagramJobs.find(j => j.id === 'complete-profile-extraction');

// Total: 1,500 tokens
// Waste: 1,450 tokens (loaded all jobs + all workflows)
```

### After (v3.0 - Tiered Registries)

```javascript
// Load index (20 tokens)
import { getIndex, getJobsByCategory } from './core/discovery.js';

const index = getIndex();

// Load only Instagram jobs (150 tokens)
const jobs = getJobsByCategory('instagram');

// Find job
const job = jobs.tools.find(j => j.id === 'complete-profile-extraction');

// Total: 170 tokens
// Savings: 1,330 tokens (89% reduction from v2.0)
```

---

## Best Practices

### 1. Start with Index
Always load the index first to understand available categories.

```javascript
const index = getIndex(); // 20 tokens
console.log(Object.keys(index.categories)); // See what's available
```

### 2. Load Only What You Need
Don't load all categories - query specific ones.

```javascript
// ❌ Bad: Load everything
const instagram = require('./core/registry/instagram/jobs.json');
const media = require('./core/registry/media/workflows.json');
const browser = require('./core/registry/browser/primitives.json');
// Total: 470 tokens

// ✅ Good: Load only what you need
const instagramJobs = getJobsByCategory('instagram'); // 150 tokens
// Total: 150 tokens
```

### 3. Use --help for Parameters
Don't load detailed schemas - use `--help` flags.

```javascript
// ✅ Good: On-demand parameter discovery
execSync(`node ${tool.path} --help`); // 50 tokens
```

### 4. Use findTool() for Searches
Searches load only matching categories.

```javascript
// Search loads only relevant categories
const results = findTool('instagram extraction'); // ~150-200 tokens
// vs loading all categories: 1,500+ tokens
```

### 5. Use Prime Prompts for Common Use Cases
For focused tasks, prime prompts are fastest.

```markdown
# Instagram extraction: 300 tokens
Read @core/prime-prompts/instagram-extraction.md
```

---

## Summary

**v3.0 Progressive Discovery** achieves true progressive disclosure:

✅ **Query-based loading** - Load only what you ask for
✅ **97% token reduction** - From 8,000 → 220 tokens
✅ **Helper functions** - Simple API via `core/discovery.js`
✅ **Backward compatible** - v2.0 (registry-lite.json) still works
✅ **Non-breaking** - Additive enhancement

**Recommended usage**:
1. **AI Agents**: Use `core/discovery.js` helpers
2. **Humans**: Use prime prompts (`core/prime-prompts/*.md`)
3. **Custom workflows**: Load tiered registries directly

**Key principle**: Load index → Query category/layer → Get parameters via --help

**Result**: Minimal tokens, maximum flexibility
