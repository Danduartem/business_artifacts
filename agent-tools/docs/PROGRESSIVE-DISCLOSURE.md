# Progressive Disclosure API

**Purpose**: Enable AI agents to discover tools efficiently by loading only what they need.

## The Problem

**Before (v2.0.0 - loading full registry):**
- Full `registry.json`: 26KB, ~8,000 tokens
- Agent loads everything upfront → wastes tokens
- Doesn't scale beyond ~100 tools

**After (v3.0.0 - progressive disclosure with split registry):**
- Load incrementally as needed via `core/registry/` directory
- Total discovery: ~135 tokens (91% reduction from 1,500 tokens)
- Scales to 1000+ tools without token bloat

## How It Works

### Split Registry Structure

```
core/registry/
├── index.json                     # 15 tokens - category overview only
├── instagram/
│   ├── primitives.json           # 80 tokens - loaded on demand
│   └── workflows.json            # 120 tokens - loaded on demand
├── media/
│   ├── primitives.json
│   └── workflows.json
└── ... (10 categories total)
```

### Discovery Flow

```javascript
// Step 1: Parse user intent (0 tokens - local logic)
const intent = parseUserRequest("Extract Instagram posts with transcription");
const category = intent.category; // "instagram"

// Step 2: Load index to confirm category exists (15 tokens)
import { getIndex } from './core/discovery.js';
const index = getIndex();
// Returns: {
//   version: "3.0.0",
//   categories: {
//     instagram: { workflows: 9, primitives: 1 },
//     media: { workflows: 1, primitives: 6 },
//     ...
//   }
// }

// Step 3: Load only Instagram workflows (120 tokens)
import { getWorkflowsByCategory } from './core/discovery.js';
const workflows = getWorkflowsByCategory('instagram');
// Returns: {
//   category: "instagram",
//   tools: [
//     {
//       id: "instagram.bulk-extraction",
//       when: "Extract multiple profiles with full content, media download, and transcription",
//       complexity: "high",
//       runtime: "hours",
//       features: ["resume", "checkpoint"],
//       flags: ["profiles", "start-date", "end-date", "transcribe"],
//       path: "capabilities/workflows/instagram/bulk-extraction.js"
//     },
//     ...
//   ]
// }

// Step 4: Match by semantic search on `when` field (0 tokens - local logic)
const tool = workflows.tools.find(t =>
  t.when.includes("multiple") &&
  t.when.includes("transcription")
);

// Step 5: Execute (0 tokens for discovery)
import { executeWorkflow } from './core/discovery.js';
await executeWorkflow(tool.id, params);

// Total: 15 + 120 = 135 tokens
```

## Token Efficiency Breakdown

| Operation | Old Approach | New Approach | Savings |
|-----------|-------------|--------------|---------|
| **Load all tools** | 1,500 tokens | 15 tokens (index only) | 99% |
| **Find Instagram tools** | 1,500 tokens (scan everything) | 135 tokens (index + category) | 91% |
| **Find specific tool** | 1,500 tokens | 135 tokens | 91% |
| **Execute tool** | 1,500 tokens | 135 tokens | 91% |

**Scaling:**
- 10 categories, 100 tools: 135 tokens
- 50 categories, 500 tools: 135 tokens
- 100 categories, 1000 tools: 135 tokens

**Why it scales:** Agent only loads the category it needs, regardless of total tool count.

## API Reference

### Core Functions

#### `getIndex()`
**Tokens:** ~15
**Returns:** Category overview with tool counts

```javascript
import { getIndex } from './core/discovery.js';

const index = getIndex();
// {
//   version: "3.0.0",
//   updated: "2025-11-19T...",
//   categories: {
//     instagram: { workflows: 9, primitives: 1 },
//     media: { workflows: 1, primitives: 6 },
//     browser: { primitives: 5 },
//     ...
//   }
// }
```

#### `getWorkflowsByCategory(category)`
**Tokens:** ~80-150 (depending on category size)
**Returns:** All workflows in the category

```javascript
import { getWorkflowsByCategory } from './core/discovery.js';

const workflows = getWorkflowsByCategory('instagram');
// {
//   category: "instagram",
//   description: "Instagram automation workflows",
//   tools: [
//     {
//       id: "instagram.extract-post",
//       when: "Extract single Instagram post with metadata",
//       complexity: "low",
//       runtime: "1-2min",
//       flags: ["url", "profile", "screenshot"],
//       path: "capabilities/workflows/instagram/extract-post.js"
//     },
//     ...
//   ]
// }
```

#### `getPrimitivesByCategory(category)`
**Tokens:** ~100-250 (depending on category size)
**Returns:** All primitives in the category

```javascript
import { getPrimitivesByCategory } from './core/discovery.js';

const primitives = getPrimitivesByCategory('media');
// {
//   category: "media",
//   description: "Atomic media operations",
//   tools: [
//     {
//       id: "media.transcribe",
//       when: "Transcribe audio/video file using Whisper API",
//       flags: ["file", "language", "model"],
//       path: "capabilities/primitives/media/transcribe.js"
//     },
//     ...
//   ]
// }
```

#### `getWorkflowsByComplexity(category, level)`
**Tokens:** ~80-150 (same as getWorkflowsByCategory)
**Returns:** Workflows filtered by complexity level

```javascript
import { getWorkflowsByComplexity } from './core/discovery.js';

// Get only complex, long-running workflows
const complexWorkflows = getWorkflowsByComplexity('instagram', 'high');
// Returns only workflows with complexity: 'high'
```

#### `findTool(query, options)`
**Tokens:** Variable (loads only matching categories)
**Returns:** Tools matching search query

```javascript
import { findTool } from './core/discovery.js';

const results = findTool('instagram extraction');
// Searches across all categories, returns matching tools
// Searches in: id, when, description fields
```

#### `executeWorkflow(toolId, params, options)`
**Tokens:** 0 for discovery (tool already found)
**Returns:** Workflow execution result

```javascript
import { executeWorkflow } from './core/discovery.js';

const result = await executeWorkflow('instagram.bulk-extraction', {
  profiles: ['user1', 'user2'],
  'start-date': '2025-11-01',
  'end-date': '2025-11-30',
  transcribe: true
});
```

## Agent Integration Patterns

### Pattern 1: Category-First Discovery

**Best for:** When user clearly specifies domain (Instagram, media, etc.)

```javascript
// User: "Extract Instagram posts from @blankschoolbr"

// 1. Identify category from keywords
const category = identifyCategory("Extract Instagram posts"); // "instagram"

// 2. Load category index
const index = getIndex(); // 15 tokens
if (!index.categories[category]) {
  throw new Error(`Category '${category}' not found`);
}

// 3. Load workflows for category
const workflows = getWorkflowsByCategory(category); // 120 tokens

// 4. Match by `when` field
const tool = workflows.tools.find(t =>
  t.when.toLowerCase().includes('extract') &&
  t.when.toLowerCase().includes('post')
);

// 5. Execute
await executeWorkflow(tool.id, params);

// Total: 135 tokens
```

### Pattern 2: Global Search

**Best for:** When category is unclear

```javascript
// User: "Download and transcribe a video"

// 1. Search globally
const results = findTool('download transcribe video'); // Variable tokens

// 2. Pick best match
const tool = results[0]; // media.download-transcribe

// 3. Execute
await executeWorkflow(tool.id, params);

// Total: ~200-300 tokens (still better than 1,500)
```

### Pattern 3: Complexity-Aware Discovery

**Best for:** When you need to warn users about long-running operations

```javascript
// User: "Extract all Instagram posts from 10 profiles"

const workflows = getWorkflowsByCategory('instagram');

// Filter by complexity
const tool = workflows.tools.find(t =>
  t.when.includes('multiple') &&
  t.complexity === 'high'
);

if (tool.complexity === 'high') {
  console.log(`⚠️ This will take ${tool.runtime}`);
  console.log(`💡 Use --resume if interrupted`);
  console.log(`🔄 Progress is auto-saved every stage`);
}

await executeWorkflow(tool.id, params);
```

## Semantic Matching with `@when`

The `@when` field is optimized for agent semantic matching:

**Good `@when` descriptions:**
```javascript
// ✅ Clear, specific, includes key terms
"Extract single Instagram post with caption, metadata, and screenshot"
"Extract multiple Instagram profiles with full content, media download, and transcription"
"Download video from URL and transcribe audio using Whisper"
```

**Bad `@when` descriptions:**
```javascript
// ❌ Too vague
"Process Instagram content"

// ❌ Missing key terms
"Get data from social media"

// ❌ Too technical (not user-facing)
"Execute multi-stage extraction pipeline with checkpoint persistence"
```

**Matching strategy:**
```javascript
// Agent converts user intent to search terms
const userIntent = "Extract Instagram posts with transcription";
const searchTerms = ["extract", "instagram", "posts", "transcription"];

// Match against `when` field
const matches = workflows.tools.filter(tool => {
  const whenLower = tool.when.toLowerCase();
  return searchTerms.every(term => whenLower.includes(term));
});

// Prefer higher complexity (more feature-complete)
matches.sort((a, b) => {
  const complexity = { low: 1, medium: 2, high: 3 };
  return complexity[b.complexity] - complexity[a.complexity];
});

return matches[0];
```

## Building Tools for Progressive Disclosure

### Primitives

**JSDoc optimized for discovery:**
```javascript
/**
 * @tool media.transcribe
 * @when Transcribe audio/video file using Whisper API
 * @category media
 *
 * @flag file - Path to audio/video file (required)
 * @flag language - Language code (optional, default: auto-detect)
 * @flag model - Whisper model size (optional, default: base)
 *
 * @envVar OPENAI_API_KEY
 */
```

**What gets extracted to registry:**
```json
{
  "id": "media.transcribe",
  "when": "Transcribe audio/video file using Whisper API",
  "flags": ["file", "language", "model"],
  "envVars": ["OPENAI_API_KEY"],
  "path": "capabilities/primitives/media/transcribe.js"
}
```

### Workflows

**JSDoc optimized for discovery:**
```javascript
/**
 * @workflow instagram.bulk-extraction
 * @when Extract multiple Instagram profiles with full content, media download, and transcription
 * @complexity high
 * @category instagram
 *
 * @composes instagram.extract-profile, media.download-transcribe
 *
 * @flag profiles - Array of Instagram usernames (required)
 * @flag start-date - Start date YYYY-MM-DD (required)
 * @flag end-date - End date YYYY-MM-DD (required)
 * @flag transcribe - Transcribe videos (optional, default: false)
 * @flag resume - Resume from checkpoint (optional)
 *
 * @runtime hours
 * @resumable true
 * @feature checkpoint
 * @feature progress-tracking
 */
```

**What gets extracted to registry:**
```json
{
  "id": "instagram.bulk-extraction",
  "when": "Extract multiple profiles with full content, media download, and transcription",
  "complexity": "high",
  "runtime": "hours",
  "resumable": true,
  "features": ["checkpoint", "progress-tracking"],
  "flags": ["profiles", "start-date", "end-date", "transcribe", "resume"],
  "composes": ["instagram.extract-profile", "media.download-transcribe"],
  "path": "capabilities/workflows/instagram/bulk-extraction.js"
}
```

## Performance Metrics

**Discovery time:**
- `getIndex()`: <1ms
- `getWorkflowsByCategory()`: <5ms
- `findTool()`: <10ms (depends on search scope)

**Token comparison:**
| Scenario | Full Registry | Progressive Disclosure | Savings |
|----------|--------------|----------------------|---------|
| Browse all categories | 1,500 tokens | 15 tokens | 99% |
| Find Instagram tool | 1,500 tokens | 135 tokens | 91% |
| Execute workflow | 1,500 tokens | 135 tokens | 91% |
| Find + execute 5 workflows | 7,500 tokens | 135 tokens (amortized) | 98% |

**Scalability:**
| Total Tools | Categories | Worst Case (search all) | Typical Case (1 category) |
|------------|-----------|------------------------|---------------------------|
| 100 tools | 10 | 500 tokens | 135 tokens |
| 500 tools | 25 | 1,200 tokens | 135 tokens |
| 1000 tools | 50 | 2,500 tokens | 135 tokens |

## Best Practices

**For Agent Developers:**
1. Always start with `getIndex()` to see available categories
2. Use `getWorkflowsByCategory()` when category is known
3. Use `findTool()` for global search when category unclear
4. Match on `when` field for semantic understanding
5. Check `complexity` and `runtime` before execution
6. Warn users about high complexity workflows

**For Tool Developers:**
1. Write clear `@when` descriptions with key search terms
2. Include `@complexity` on all workflows
3. Add `@runtime` estimates
4. List `@flags` instead of verbose @input/@output
5. Use `@feature` tags for capabilities (checkpoint, resume, etc.)
6. Keep `@when` to one line (not a paragraph)

## Migration Guide

**From old approach:**
```javascript
// OLD: Load everything
const registry = require('./core/registry.json');
const tools = registry.workflows.instagram.tools;
```

**To new approach:**
```javascript
// NEW: Load only what you need
import { getWorkflowsByCategory } from './core/discovery.js';
const instagram = getWorkflowsByCategory('instagram');
const tools = instagram.tools;
```

## Troubleshooting

**Q: Agent can't find a tool**
- Check `when` field includes relevant search terms
- Verify tool is in correct category
- Run `npm run register` to rebuild registry

**Q: Token usage still high**
- Avoid calling `findTool()` without category filter
- Use category-specific functions when possible
- Cache index/category results during a session

**Q: Tool not showing in category**
- Check JSDoc header has `@tool` or `@workflow`
- Verify `@category` matches directory name
- Run `npm run register` and check for errors

## See Also

- [CONVENTIONS.md](CONVENTIONS.md) - Tool development standards
- [ENVIRONMENT.md](ENVIRONMENT.md) - Environment configuration
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Development guide with templates
