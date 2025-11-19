# Progressive Disclosure Analysis & Action Plan

**Date**: 2025-11-19
**Status**: NEEDS IMPROVEMENT
**Issue**: Current implementation is NOT fully progressive

---

## 🔍 Current State Assessment

### ✅ What IS Progressive (Code Execution)

**Jobs spawning workflows as child processes:**
```javascript
// capabilities/jobs/instagram/complete-profile-extraction.js (Line 51-116)
async function executeWorkflow(workflowPath, params) {
  const child = spawn('node', [workflowFullPath, ...args], {
    stdio: ['ignore', 'pipe', 'pipe']
  });
  // Workflow is NOT imported/required upfront
  // Workflow is spawned as separate process ONLY when stage is reached
}
```

**Workflows spawning primitives as child processes:**
```javascript
// capabilities/workflows/workflow-utils.js (Line 29-112)
export function executePrimitive(primitivePath, args = {}) {
  const fullPath = join(PRIMITIVES_DIR, primitivePath);
  const result = spawnSync('node', [fullPath, ...argsArray], {
    encoding: 'utf8',
    timeout: 120000
  });
  // Primitive is NOT imported/required upfront
  // Primitive is spawned as separate process ONLY when called
}
```

**✅ Result**: Code execution IS progressive - no upfront loading of tools.

---

### ❌ What is NOT Progressive (Discovery System)

**Current registry-lite.json structure:**
```json
{
  "jobs": {
    "instagram": {
      "tools": [
        {
          "id": "job.instagram.complete-profile-extraction",
          "description": "Complete pipeline...",
          "when": "User wants to extract Instagram posts...",
          "features": ["Checkpointing", "Resume", "Transcription", ...],
          "example": "node capabilities/jobs/...",
          "runtime": "1-8 hours"
        },
        { "id": "job.instagram.bulk-content-extraction", ... },
        { "id": "job.instagram.process-existing-urls", ... }
      ]
    }
  },
  "workflows": {
    "media": { "tools": [...] },
    "instagram": { "tools": [...] },
    "content": { "tools": [...] }
  },
  "usage": { "recommendation": "...", "progressive_disclosure": {...} },
  "common_use_cases": {
    "instagram_extraction_with_transcription": {...},
    "multi_profile_extraction": {...},
    "transcribe_single_video": {...}
  }
}
```

**❌ Problem**: Agent loads ALL of this at once (160 lines, ~1,500 tokens)

**Token breakdown**:
- 3 Instagram jobs × ~50 tokens = 150 tokens
- 3 Media workflows × 30 tokens = 90 tokens
- 3 Instagram workflows × 30 tokens = 90 tokens
- 3 Content workflows × 30 tokens = 90 tokens
- Usage metadata = 100 tokens
- Common use cases = 200 tokens
- Orchestrates/features details = 780 tokens
- **Total: ~1,500 tokens**

**If agent only needs 1 Instagram job**: They load 1,500 tokens but only use ~50 tokens worth of info.

**Waste**: 1,450 tokens (97% wasted!)

---

## 🎯 True Progressive Disclosure Architecture

### Principle: Load ONLY What You Query

**Bad (Current)**:
```
Agent: "I need Instagram extraction"
System: [Loads ALL jobs + ALL workflows + ALL metadata] (1,500 tokens)
Agent: "Thanks, I'll use complete-profile-extraction"
```

**Good (Target)**:
```
Agent: "What categories exist?"
System: ["instagram", "media", "content"] (10 tokens)

Agent: "What Instagram jobs exist?"
System: ["complete-profile-extraction", "bulk-content-extraction", "process-existing-urls"] (20 tokens)

Agent: "Tell me about complete-profile-extraction"
System: { one-line description } (30 tokens)

Agent: "What are the parameters?"
System: Runs --help (50 tokens)

Total: 110 tokens (vs 1,500 tokens)
Savings: 93%
```

---

## 📐 Proposed Solution: Tiered Registry Architecture

### Tier 0: Index (20 tokens)

**File**: `core/registry-index.json`

```json
{
  "version": "2.0.0",
  "categories": {
    "instagram": {
      "jobs": 3,
      "workflows": 3,
      "primitives": 2
    },
    "media": {
      "workflows": 1,
      "primitives": 3
    },
    "storage": {
      "primitives": 7
    },
    "browser": {
      "primitives": 5
    },
    "page": {
      "primitives": 6
    },
    "http": {
      "primitives": 3
    },
    "file": {
      "primitives": 3
    },
    "content": {
      "workflows": 3
    }
  },
  "recommended_start": "core/prime-prompts/{use-case}.md or core/registry/{category}/{layer}.json"
}
```

**Usage**:
```javascript
// Agent loads index
const index = require('./core/registry-index.json'); // 20 tokens

// Agent sees categories
console.log(index.categories); // { instagram: {...}, media: {...}, ... }

// Agent decides to explore Instagram
// Loads next tier...
```

---

### Tier 1: Category-Specific Registries (100-300 tokens each)

**File**: `core/registry/instagram/jobs.json`

```json
{
  "category": "instagram",
  "layer": "jobs",
  "tools": [
    {
      "id": "complete-profile-extraction",
      "when": "Extract Instagram posts with full metadata, media downloads, and video transcription",
      "path": "capabilities/jobs/instagram/complete-profile-extraction.js",
      "runtime": "1-8 hours",
      "flags": ["--username", "--start-date", "--end-date", "--profile", "--resume", "--dry-run"]
    },
    {
      "id": "bulk-content-extraction",
      "when": "Process multiple Instagram profiles simultaneously with transcription",
      "path": "capabilities/jobs/instagram/bulk-content-extraction.js",
      "runtime": "3-13 hours",
      "flags": ["--profiles", "--start-date", "--end-date", "--output-format", "--resume"]
    },
    {
      "id": "process-existing-urls",
      "when": "Already have Instagram URLs, just need to extract metadata",
      "path": "capabilities/jobs/instagram/process-existing-urls.js",
      "runtime": "30 mins - 2 hours",
      "flags": ["--input", "--output"]
    }
  ],
  "help": "Use --help flag on any job for detailed parameter information"
}
```

**File**: `core/registry/instagram/workflows.json`

```json
{
  "category": "instagram",
  "layer": "workflows",
  "tools": [
    {
      "id": "extract-profile-posts-puppeteer",
      "when": "Get post URLs from a profile (first step before full extraction)",
      "path": "capabilities/workflows/instagram/extract-profile-posts-puppeteer.js",
      "flags": ["--username", "--start-date", "--end-date"]
    },
    {
      "id": "extract-post-full",
      "when": "Extract complete metadata from a single post URL",
      "path": "capabilities/workflows/instagram/extract-post-full.js",
      "flags": ["--url", "--profile", "--screenshot"]
    },
    {
      "id": "download-reel",
      "when": "Download video from Instagram reel",
      "path": "capabilities/workflows/instagram/download-reel.js",
      "flags": ["--url", "--output"]
    }
  ]
}
```

**File**: `core/registry/media/workflows.json`

```json
{
  "category": "media",
  "layer": "workflows",
  "tools": [
    {
      "id": "download-and-transcribe",
      "when": "Download video/audio and transcribe using Whisper",
      "path": "capabilities/workflows/media/download-and-transcribe.js",
      "flags": ["--url", "--language", "--output-dir"]
    }
  ]
}
```

**Directory structure**:
```
core/registry/
├── index.json (20 tokens - all categories)
├── instagram/
│   ├── jobs.json (150 tokens - 3 Instagram jobs)
│   ├── workflows.json (120 tokens - 3 Instagram workflows)
│   └── primitives.json (80 tokens - 2 Instagram primitives)
├── media/
│   ├── workflows.json (50 tokens - 1 media workflow)
│   └── primitives.json (120 tokens - 3 media primitives)
├── storage/
│   └── primitives.json (280 tokens - 7 storage primitives)
├── browser/
│   └── primitives.json (200 tokens - 5 browser primitives)
├── page/
│   └── primitives.json (240 tokens - 6 page primitives)
├── http/
│   └── primitives.json (120 tokens - 3 http primitives)
├── file/
│   └── primitives.json (120 tokens - 3 file primitives)
└── content/
    └── workflows.json (120 tokens - 3 content workflows)
```

---

### Tier 2: Tool-Specific Details (50 tokens via --help)

**Agent doesn't load JSON schemas - they query the tool directly:**

```bash
node capabilities/jobs/instagram/complete-profile-extraction.js --help
```

**Output** (50 tokens):
```
Usage: complete-profile-extraction.js [options]

Options:
  --username <string>        Instagram username (required)
  --start-date <YYYY-MM-DD>  Start date (required)
  --end-date <YYYY-MM-DD>    End date (required)
  --profile                  Use Chrome profile
  --transcribe               Transcribe videos (default: true)
  --resume                   Resume from checkpoint
  --dry-run                  Validate only
  --help, -h                 Show this help
```

---

## 💡 Discovery Helper Functions

**File**: `core/discovery.js`

```javascript
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get registry index (all categories)
 * Tokens: ~20
 */
export function getIndex() {
  const indexPath = join(__dirname, 'registry/index.json');
  return JSON.parse(readFileSync(indexPath, 'utf-8'));
}

/**
 * Get tools for a specific category and layer
 * Tokens: ~100-300 depending on category
 *
 * @param {string} category - e.g., 'instagram', 'media'
 * @param {string} layer - 'jobs', 'workflows', 'primitives'
 */
export function getTools(category, layer) {
  const toolsPath = join(__dirname, 'registry', category, `${layer}.json`);
  return JSON.parse(readFileSync(toolsPath, 'utf-8'));
}

/**
 * Get jobs by category
 * Tokens: ~100-200
 */
export function getJobsByCategory(category) {
  return getTools(category, 'jobs');
}

/**
 * Get workflows by category
 * Tokens: ~80-150
 */
export function getWorkflowsByCategory(category) {
  return getTools(category, 'workflows');
}

/**
 * Get primitives by category
 * Tokens: ~80-280
 */
export function getPrimitivesByCategory(category) {
  return getTools(category, 'primitives');
}

/**
 * Find tool by partial ID match
 * Tokens: Variable (loads only matching category)
 *
 * @param {string} query - e.g., 'instagram', 'complete-profile'
 */
export function findTool(query) {
  const index = getIndex();
  const results = [];

  for (const [category, layers] of Object.entries(index.categories)) {
    if (!category.includes(query.toLowerCase())) continue;

    // Check each layer
    for (const layer of ['jobs', 'workflows', 'primitives']) {
      if (!layers[layer]) continue;

      try {
        const tools = getTools(category, layer);
        const matches = tools.tools.filter(t =>
          t.id.includes(query.toLowerCase()) ||
          t.when?.toLowerCase().includes(query.toLowerCase())
        );
        results.push(...matches);
      } catch (err) {
        // Layer doesn't exist for this category
        continue;
      }
    }
  }

  return results;
}

/**
 * Get tool by exact ID
 * Tokens: ~100-300 (loads only the category containing the tool)
 *
 * @param {string} toolId - e.g., 'complete-profile-extraction'
 */
export function getToolById(toolId) {
  const index = getIndex();

  for (const [category, layers] of Object.entries(index.categories)) {
    for (const layer of ['jobs', 'workflows', 'primitives']) {
      if (!layers[layer]) continue;

      try {
        const tools = getTools(category, layer);
        const tool = tools.tools.find(t => t.id === toolId);
        if (tool) return tool;
      } catch (err) {
        continue;
      }
    }
  }

  return null;
}
```

---

## 📊 Token Comparison: Current vs Proposed

### Scenario: Agent needs Instagram extraction job

| Approach | Method | Tokens Loaded | Tokens Used | Waste |
|----------|--------|---------------|-------------|-------|
| **v1.0 (Full Registry)** | Load registry.json | 8,000 | 50 | 99.4% |
| **v2.0 (Registry-Lite)** | Load registry-lite.json | 1,500 | 50 | 96.7% |
| **v3.0 (Tiered - Proposed)** | Load index → Load instagram/jobs.json → --help | 20 + 150 + 50 = 220 | 220 | 0% |

**Improvement**: 1,500 → 220 tokens = **85% further reduction**

**Total improvement from v1.0**: 8,000 → 220 = **97% reduction**

---

## 🎯 Implementation Plan

### Phase 1: Create Tiered Registry Structure
1. ✅ Create `core/registry/index.json` (20 tokens)
2. ✅ Split by category: `instagram/`, `media/`, `storage/`, `browser/`, `page/`, `http/`, `file/`, `content/`
3. ✅ Split by layer: `jobs.json`, `workflows.json`, `primitives.json`
4. ✅ Keep only essential fields: `id`, `when`, `path`, `flags`, `runtime`

### Phase 2: Create Discovery Helper
1. ✅ Create `core/discovery.js` with helper functions
2. ✅ `getIndex()` - Load index only
3. ✅ `getTools(category, layer)` - Load specific category/layer
4. ✅ `findTool(query)` - Search with minimal loading
5. ✅ `getToolById(toolId)` - Load only one tool's category

### Phase 3: Update Documentation
1. ✅ Update `core/prime-prompts/` to reference tiered registries
2. ✅ Create `DISCOVERY.md` - Document progressive discovery pattern
3. ✅ Update `ARCHITECTURE.md` - Add tiered registry section
4. ✅ Update `README.md` - Add discovery helper examples

### Phase 4: Deprecation Plan (Non-Breaking)
1. ✅ Keep `core/registry-lite.json` for backward compatibility
2. ✅ Mark as deprecated in README
3. ✅ Recommend `core/discovery.js` instead
4. ✅ Add migration guide

---

## 🚀 Expected Results

### Token Efficiency (Instagram Use Case)

**Current (v2.0)**:
```javascript
const registryLite = require('./core/registry-lite.json'); // 1,500 tokens
const instagramJobs = registryLite.jobs.instagram.tools;
const job = instagramJobs.find(j => j.id === 'complete-profile-extraction');
execSync(`node ${job.path} --help`); // +50 tokens
// Total: 1,550 tokens
```

**Proposed (v3.0)**:
```javascript
import { getIndex, getJobsByCategory } from './core/discovery.js';

const index = getIndex(); // 20 tokens
const instagramJobs = getJobsByCategory('instagram'); // 150 tokens
const job = instagramJobs.tools.find(j => j.id === 'complete-profile-extraction');
execSync(`node ${job.path} --help`); // +50 tokens
// Total: 220 tokens
```

**Savings**: 1,550 → 220 = **86% reduction**

---

## 📋 Action Items Summary

- [ ] Create `core/registry/index.json`
- [ ] Create category-specific registry files (8 categories × 3 layers)
- [ ] Create `core/discovery.js` helper
- [ ] Update `core/prime-prompts/instagram-extraction.md`
- [ ] Create `DISCOVERY.md`
- [ ] Update `ARCHITECTURE.md`
- [ ] Update `README.md`
- [ ] Mark `core/registry-lite.json` as deprecated
- [ ] Test discovery helpers
- [ ] Document migration path

---

## ✅ Success Criteria

1. **Token efficiency**: Instagram job discovery ≤ 250 tokens (vs 1,500 currently)
2. **Query-based loading**: Load only requested category/layer
3. **Non-breaking**: Existing registry-lite.json still works
4. **Documented**: DISCOVERY.md explains the pattern
5. **Helper functions**: discovery.js provides simple API

---

## 🎓 Key Insight

**Current mistake**: We reduced tokens from 8,000 → 1,500 (81% reduction) but we loaded ALL jobs + ALL workflows upfront.

**True progressive disclosure**: Agent queries for ONLY what they need:
- Index → Category → Layer → Tool → Parameters
- 20 → 150 → 50 = **220 tokens total**

**Final savings**: 8,000 → 220 = **97.25% reduction**

This is **TRUE progressive disclosure**.
