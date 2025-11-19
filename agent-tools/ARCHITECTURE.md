# Agent Tools Architecture

**Version**: 2.0.0 (Progressive Disclosure)
**Last Updated**: 2025-11-19

This document describes the architecture of Agent Tools, a production-grade system for building long-running multi-agent workflows with progressive disclosure for token efficiency.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Architecture Overview](#architecture-overview)
3. [Progressive Disclosure System](#progressive-disclosure-system)
4. [Layered Tool Composition](#layered-tool-composition)
5. [Core Services](#core-services)
6. [Token Optimization Strategy](#token-optimization-strategy)
7. [Comparison with Alternative Architectures](#comparison-with-alternative-architectures)
8. [Usage Patterns](#usage-patterns)
9. [When to Use What](#when-to-use-what)

---

## Design Philosophy

Agent Tools is built on three core principles:

### 1. Production-Grade Reliability
- **Checkpointing**: Every long-running operation saves progress at stage boundaries
- **Resume capability**: `--resume` flag continues from last checkpoint without re-execution
- **State persistence**: Explicit state management via `createStateManager()`
- **Centralized logging**: All operations log to `temp/logs/` for debugging multi-hour workflows
- **Health monitoring**: Built-in health checks for service status

### 2. Composability at Scale
- **Primitives**: 27 atomic operations (e.g., `browser/start.js`, `media/transcribe.js`)
- **Workflows**: Multi-step compositions (e.g., `media/download-and-transcribe.js`)
- **Jobs**: Multi-stage orchestrations with checkpointing (e.g., `instagram/bulk-content-extraction.js`)
- **Applications**: Your multi-agent systems using jobs and workflows

### 3. Progressive Disclosure (NEW in v2.0)
- **Token efficiency**: 94% reduction (8,000 → 300-1,500 tokens)
- **Lazy loading**: Load tool details only when needed via `--help` flags
- **Conditional mapping**: "When X, use Y tool" instead of loading full implementations
- **Hybrid approach**: Combines production infrastructure with minimal token overhead

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      AI Agent Interface                          │
│                                                                   │
│  Progressive Disclosure Layer (NEW in v2.0)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Prime Prompts│  │Registry-Lite │  │ Claude Skills│         │
│  │  (300 tokens)│  │ (1,500 tokens│  │  (500 tokens)│         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         └──────────────────┴──────────────────┘                 │
│                            ↓                                     │
│         ┌────────────────────────────────────┐                  │
│         │  On-Demand Discovery (--help)      │                  │
│         └────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Tool Composition Layers                       │
│                                                                   │
│  Jobs (Long-running orchestrations, hours/days)                 │
│  ├─ Multi-stage pipelines with checkpoints                     │
│  ├─ --resume capability                                         │
│  └─ Event emission for monitoring                              │
│                            ↓                                     │
│  Workflows (Multi-step compositions, minutes)                   │
│  ├─ Compose 2-5 primitives                                     │
│  ├─ Focused task completion                                    │
│  └─ State checkpointing                                        │
│                            ↓                                     │
│  Primitives (Atomic operations, seconds)                        │
│  ├─ Single-purpose tools                                       │
│  ├─ JSON input/output                                          │
│  └─ CLI + programmatic interfaces                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Core Services                               │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Logger  │  │  State   │  │  Events  │  │  Health  │      │
│  │          │  │  Manager │  │   Bus    │  │ Monitor  │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Progressive Disclosure System

### Evolution: v1.0 → v2.0 → v3.0

**v1.0**: Full registry (8,000 tokens)
**v2.0**: Lite registry (1,500 tokens) - 81% reduction
**v3.0**: Tiered registries (170-220 tokens) - **97% reduction** ✅

### The Problem

Traditional MCP servers and full registry loading consume 8,000-18,000 tokens upfront, even when agents only need 1-2 tools. This limits context window availability for actual work.

**Example**: Instagram extraction job needs:
- Job interface: `complete-profile-extraction.js`
- But full registry loads: 27 primitives + 7 workflows + 3 jobs = 8,000 tokens

**Result**: 7,500 tokens wasted on unused tool definitions.

**v2.0 Problem**: Even registry-lite.json (1,500 tokens) loads ALL jobs + ALL workflows, when agent only needs 1 job.

### The Solution: Query-Based Tiered Registries (v3.0)

#### Tier 1: Prime Prompts (300 tokens)
**Use case-specific instructions for focused tasks**

```markdown
# core/prime-prompts/instagram-extraction.md

Quick Start: Use this job for Instagram extraction with transcription
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username <user> \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD \
  --profile \
  --resume

Built-in features:
- Checkpointing after each stage
- --resume to continue after failures
- Chrome profile sync for auth
```

**Agent workflow**:
1. Loads prime prompt (300 tokens)
2. Sees job-level interface
3. Runs job with appropriate flags
4. Job handles all orchestration internally

**Token savings**: 8,000 → 300 = **96% reduction**

---

### v3.0: Tiered Registry Architecture (NEW - 97% Reduction)

**Problem with v2.0**: registry-lite.json still loads ALL jobs + ALL workflows (1,500 tokens) even when agent needs 1 job.

**v3.0 Solution**: Split registry by category and layer. Load ONLY what you query.

**Structure**:
```
core/registry/
├── index.json (20 tokens - category index)
├── instagram/
│   ├── jobs.json (150 tokens - 3 Instagram jobs)
│   ├── workflows.json (120 tokens - 5 Instagram workflows)
│   └── primitives.json (80 tokens - 2 Instagram primitives)
├── media/
│   ├── workflows.json (50 tokens)
│   └── primitives.json (120 tokens)
└── [8 total categories]
```

**Discovery Pattern**:
```javascript
import { getIndex, getJobsByCategory } from './core/discovery.js';

// 1. Load index (20 tokens)
const index = getIndex();
// Shows: { instagram: {...}, media: {...}, browser: {...}, ... }

// 2. Load ONLY Instagram jobs (150 tokens)
const jobs = getJobsByCategory('instagram');
// Returns: { tools: [job1, job2, job3] }

// 3. Get parameters via --help (50 tokens)
const job = jobs.tools.find(j => j.id === 'complete-profile-extraction');
execSync(`node ${job.path} --help`);

// Total: 20 + 150 + 50 = 220 tokens
// vs 1,500 (registry-lite) or 8,000 (registry.json)
// Savings: 85% from v2.0, 97% from v1.0
```

**Key Principle**: Query-based loading
- Agent asks: "What Instagram jobs exist?"
- System returns: ONLY Instagram jobs (150 tokens)
- NOT: All jobs + all workflows (1,500 tokens)

**Discovery Helper Functions**:
```javascript
// Get index (20 tokens)
getIndex()

// Get by category/layer (100-300 tokens each)
getJobsByCategory('instagram')
getWorkflowsByCategory('media')
getPrimitivesByCategory('browser')

// Search (variable - loads only matching categories)
findTool('transcribe')

// Get specific tool (loads only its category)
getToolById('complete-profile-extraction')

// Get recommendation (prioritizes jobs > workflows > primitives)
getRecommendedTool('extract Instagram posts with transcription')
```

**See**: `DISCOVERY.md` for complete API documentation

---

#### Tier 2: Registry-Lite (1,500 tokens) - DEPRECATED
**Legacy: Job and workflow catalog with conditional mappings**

**Status**: Deprecated in favor of v3.0 tiered registries
**Use**: Backward compatibility only
**Replacement**: Use `core/registry/` tiered files or `core/discovery.js` helpers

```json
{
  "jobs": {
    "instagram": {
      "tools": [
        {
          "id": "job.instagram.complete-profile-extraction",
          "when": "User wants to extract Instagram posts with transcription",
          "features": ["Checkpointing", "Resume", "Transcription"],
          "example": "node capabilities/jobs/instagram/complete-profile-extraction.js ..."
        }
      ]
    }
  },
  "usage": {
    "recommendation": "Start with JOBS. Only load full registry for custom workflow composition."
  }
}
```

**Agent workflow**:
1. Loads registry-lite.json (1,500 tokens)
2. Browses available jobs by use case
3. Matches user intent to job via "when" conditions
4. Runs appropriate job

**Token savings**: 8,000 → 1,500 = **81% reduction**

---

#### Tier 3: Full Registry (8,000 tokens) - ADVANCED USE ONLY
**Complete primitive catalog for custom workflow composition**

**Status**: Still supported for advanced use cases
**Use**: Building custom workflows from primitives
**Replacement**: For most cases, use tiered registries (v3.0) instead

**Only load when**:
- Building new custom workflows
- Debugging primitive-level issues
- Need to understand all atomic operations

```javascript
// Load full registry
const registry = require('./core/registry.json');

// Browse all 27 primitives
const browserTools = registry.primitives.browser.tools;
```

---

#### Tier 4: On-Demand Discovery (--help flags)
**Progressive parameter discovery without loading full docs**

```bash
# Agent doesn't know job parameters
node capabilities/jobs/instagram/complete-profile-extraction.js --help

# Output:
Usage: complete-profile-extraction.js [options]

Options:
  --username <string>     Instagram username (required)
  --start-date <YYYY-MM-DD> Start date (required)
  --end-date <YYYY-MM-DD>   End date (required)
  --profile               Use Chrome profile
  --resume                Resume from checkpoint
  --dry-run               Validate only
  --help                  Show this help
```

**Tokens**: ~50 tokens per `--help` call vs 200 tokens per tool in registry

---

## Layered Tool Composition

### Layer 1: Primitives (Atomic Operations)

**Purpose**: Do ONE thing well

**Examples**:
- `browser/start.js` - Launch Chrome with debugging
- `media/transcribe.js` - Transcribe audio/video with Whisper
- `storage/airtable-create.js` - Create Airtable record

**Characteristics**:
- Single responsibility
- JSON input/output
- CLI + programmatic interfaces
- No side effects
- Self-contained

**Template**:
```javascript
#!/usr/bin/env node
/**
 * @tool browser.start
 * @description Launch Chrome with debugging enabled
 * @input profile boolean - Use Chrome profile
 * @output browserId string - Browser instance ID
 */

// Parse args
const { values } = parseArgs({ options: { profile: 'boolean' } });

// Do work
const browser = await launchChrome(values.profile);

// Output JSON
console.log(JSON.stringify({ success: true, browserId: browser.id }));
```

**Discovery**:
- Full registry: `registry.primitives.browser.tools`
- CLI: `node capabilities/primitives/browser/start.js --help`

---

### Layer 2: Workflows (Composed Operations)

**Purpose**: Chain 2-5 primitives for focused task completion

**Example**: `media/download-and-transcribe.js`

```javascript
/**
 * @workflow media.download-and-transcribe
 * @description Download video/audio and transcribe using Whisper
 * @composes http/download, media/transcribe
 */

import { executePrimitive } from '../workflow-utils.js';

// Step 1: Download media
const download = await executePrimitive('http/download.js', {
  url: values.url
});

// Checkpoint
state.set('downloadPath', download.path);
state.checkpoint();

// Step 2: Transcribe
const transcript = await executePrimitive('media/transcribe.js', {
  path: download.path,
  language: values.language
});

// Output
console.log(JSON.stringify({ success: true, transcript }));
```

**Characteristics**:
- Compose 2-5 primitives
- Complete in minutes
- Checkpoint after expensive operations
- Single focused task

**Discovery**:
- Registry-lite: `registryLite.workflows.media.tools`
- CLI: `node capabilities/workflows/media/download-and-transcribe.js --help`

---

### Layer 3: Jobs (Orchestrated Workflows)

**Purpose**: Multi-stage orchestration for long-running operations (hours/days)

**Example**: `instagram/complete-profile-extraction.js`

```javascript
/**
 * @job instagram.complete-profile-extraction
 * @description Complete pipeline: URLs → Metadata → Media → Transcription → Export
 * @orchestrates instagram.extract-profile-posts, instagram.extract-post-full, media.download-and-transcribe
 */

const state = createStateManager({ namespace: 'job-complete-profile-extraction' });

// Initialize or resume
let jobState = values.resume
  ? state.get('jobState')
  : { stage: 'init', processed: [] };

// Stage 1: Extract post URLs (resume-safe)
if (!jobState.stage1Complete) {
  const urls = await executeWorkflow('instagram/extract-profile-posts-puppeteer.js', {
    username: values.username,
    startDate: values.startDate,
    endDate: values.endDate
  });
  jobState.stage1Complete = true;
  jobState.urls = urls;
  state.checkpoint(); // SAVE PROGRESS
}

// Stage 2: Extract full metadata (resume-safe)
if (!jobState.stage2Complete) {
  for (const url of jobState.urls) {
    const post = await executeWorkflow('instagram/extract-post-full.js', { url });
    jobState.posts.push(post);
    state.checkpoint(); // Save after each post
  }
  jobState.stage2Complete = true;
  state.checkpoint();
}

// Stage 3: Download media (resume-safe)
// Stage 4: Transcribe videos (resume-safe)
// Stage 5: Export (resume-safe)

// Final output
console.log(JSON.stringify({
  success: true,
  totalPosts: jobState.posts.length,
  outputFile: jobState.outputPath
}));

// Cleanup
state.clear();
events.publish('job.completed', { jobId, summary });
```

**Characteristics**:
- Orchestrate multiple workflows
- Run for hours/days
- Stage-based execution with checkpoints
- `--resume` capability (ALWAYS)
- Progress tracking and event emission
- Comprehensive error recovery

**Discovery**:
- Prime prompts: `core/prime-prompts/instagram-extraction.md`
- Registry-lite: `registryLite.jobs.instagram.tools`
- CLI: `node capabilities/jobs/instagram/complete-profile-extraction.js --help`

---

## Core Services

### Logger

**Purpose**: Centralized logging for debugging multi-hour workflows

```javascript
import { createLogger } from './core/logger/index.js';

const logger = createLogger({
  toolName: 'job.instagram.complete-profile-extraction'
});

logger.info('Starting extraction', { username: 'berudolph' });
logger.error('Failed to extract post', { url, error: err.message });
logger.debug('Checkpoint saved', { stage: 2, processed: 45 });
```

**Features**:
- Auto-rotation by date
- Structured logging (JSON)
- Context enrichment (toolName, timestamp)
- Output to `temp/logs/<toolName>-<date>.log`

---

### State Manager

**Purpose**: Checkpointing and resume capability

```javascript
import { createStateManager } from './core/state/index.js';

const state = createStateManager({
  namespace: 'job-complete-profile-extraction'
});

// Set state
state.set('stage1Complete', true);
state.set('processedUrls', ['url1', 'url2']);

// Checkpoint (save to disk)
state.checkpoint(); // Saves to temp/state/job-complete-profile-extraction.checkpoint.json

// Resume (load from disk)
state.restoreCheckpoint();
const resumeData = state.get('processedUrls');
```

**Features**:
- Nested key support: `state.set('stage1.urls', [...])`)
- JSON persistence to `temp/state/`
- Atomic writes
- Restore from checkpoint

---

### Event Bus

**Purpose**: Multi-agent coordination via pub/sub

```javascript
import { getEventBus } from './core/events/index.js';

const events = getEventBus();

// Producer (Agent 1)
events.publish('data.ready', {
  type: 'instagram-posts',
  count: 87,
  path: 'temp/instagram-export.json'
});

// Consumer (Agent 2)
events.subscribe('data.ready', async (payload) => {
  logger.info('Received data', { type: payload.type });
  await processData(payload.path);
  events.publish('processing.complete', { success: true });
});

// Unsubscribe
const unsubscribe = events.subscribe('event.name', handler);
unsubscribe();
```

**Features**:
- Decoupled agent communication
- Event history tracking
- Wildcard subscriptions

---

### Health Monitor

**Purpose**: Track service status for long-running operations

```javascript
import { health } from './core/health/index.js';

// Register check
health.registerCheck('browser-service', async () => {
  const isRunning = await checkChrome();
  return {
    status: isRunning ? 'healthy' : 'unhealthy',
    message: isRunning ? 'Chrome running on port 9222' : 'Chrome not responding'
  };
});

// Run all checks
const report = await health.runAll();
console.log(report.status); // 'healthy' | 'degraded' | 'unhealthy'
```

---

## Token Optimization Strategy

### v1.0: Full Registry (Baseline)

```
Agent loads full registry.json
↓
8,000 tokens consumed
↓
Sees 27 primitives + 7 workflows + 3 jobs
↓
Uses 1 job
↓
7,500 tokens wasted (99.4% waste)
```

### v2.0: Progressive Disclosure (Lite Registry)

```
Agent loads prime prompt OR registry-lite.json
↓
300-1,500 tokens consumed
↓
Sees job-level interface with "when" conditions
↓
Matches user intent to job
↓
Uses --help for parameter discovery
↓
Runs job (job handles orchestration internally)
↓
6,500-7,700 tokens saved (81-96% reduction)
```

**Problem**: registry-lite.json still loads ALL jobs + ALL workflows (1,500 tokens) when agent only needs 1 job (150 tokens). **97% waste remains**.

### v3.0: Query-Based Tiered Registries (TRUE Progressive Disclosure)

```
Agent loads index
↓
20 tokens consumed (categories only)
↓
Agent queries specific category/layer
↓
150 tokens consumed (Instagram jobs only)
↓
Agent uses --help for parameters
↓
50 tokens consumed
↓
Total: 220 tokens (vs 8,000)
↓
7,780 tokens saved (97.25% reduction)
↓
0% waste - loaded exactly what was needed
```

**Key innovation**: Query-based loading eliminates waste entirely.

---

## Comparison with Alternative Architectures

### Mario's Minimal MCP-Free Approach

**Structure**:
```
~/agent-tools/browser-tools/
├── README.md (225 tokens)
├── browser-start.js
├── browser-navigate.js
├── browser-eval.js
└── browser-screenshot.js
```

**Pros**:
- ✅ Minimal tokens (225)
- ✅ Extreme simplicity (4 files)
- ✅ Fast to build (<2 hours)
- ✅ Highly portable

**Cons**:
- ❌ No state management
- ❌ No error recovery/resume
- ❌ Manual orchestration required
- ❌ Code duplication across tools

**Best for**: Quick prototypes, short tasks (<30 min), personal projects

---

### Dan's Scripts Approach

**Structure**:
```
app-file-system-scripts/
├── README.md (58 lines - conditions mapped to scripts)
├── search.js (self-contained)
├── read.js (self-contained)
├── write.js (self-contained)
└── delete.js (self-contained)
```

**Pros**:
- ✅ Progressive disclosure (~2,000 tokens)
- ✅ Self-contained scripts
- ✅ Conditional mapping ("When X, use Y")
- ✅ Easy to add tools

**Cons**:
- ❌ Code duplication accepted
- ❌ No state/checkpointing
- ❌ Manual orchestration

**Best for**: Medium complexity, no infrastructure investment, portability needs

---

### Agent Tools (This System)

**Structure**:
```
agent-tools/
├── core/ (registry, state, logger, events, health)
├── capabilities/
│   ├── primitives/ (27 atomic operations)
│   ├── workflows/ (7 composed operations)
│   └── jobs/ (3 orchestrated pipelines)
├── prime-prompts/ (300 tokens each)
└── registry-lite.json (1,500 tokens)
```

**Pros**:
- ✅ Production-ready (checkpointing, resume, logging)
- ✅ Multi-agent coordination (event bus)
- ✅ Progressive disclosure (300-1,500 tokens)
- ✅ Composable (primitives → workflows → jobs)
- ✅ Scales to hours/days of runtime

**Cons**:
- ❌ Higher initial complexity
- ❌ Requires infrastructure setup
- ❌ Tighter coupling to core services

**Best for**: Long-running operations, multi-stage orchestration, production reliability, multi-agent systems

---

## Usage Patterns

### Pattern 1: Use Prime Prompts for Focused Tasks

```bash
# In conversation with AI agent
User: "Extract Instagram posts from berudolph with transcription"

# Agent loads prime prompt (300 tokens)
@core/prime-prompts/instagram-extraction.md

# Agent sees job interface and runs
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30 \
  --profile
```

**Token consumption**: 300 tokens (vs 8,000 with full registry)

---

### Pattern 2: Use Registry-Lite for Job Discovery

```javascript
// Agent loads lightweight catalog
const registryLite = require('./core/registry-lite.json');

// Browse jobs by category
const instagramJobs = registryLite.jobs.instagram.tools;

// Match user intent
const job = instagramJobs.find(j =>
  j.when.includes('extract Instagram posts with transcription')
);

// Run job
execSync(`node ${job.path} --username berudolph --start-date 2025-11-01 --end-date 2025-11-30`);
```

**Token consumption**: 1,500 tokens (vs 8,000 with full registry)

---

### Pattern 3: Use --help for Parameter Discovery

```bash
# Agent doesn't know parameters
node capabilities/jobs/instagram/complete-profile-extraction.js --help

# Output shows all parameters (50 tokens)
# Agent constructs command
node capabilities/jobs/instagram/complete-profile-extraction.js \
  --username berudolph \
  --start-date 2025-11-01 \
  --end-date 2025-11-30
```

**Token consumption**: 300 (prime prompt) + 50 (--help) = 350 tokens

---

### Pattern 4: Use Claude Code Skills for Auto-Discovery

```bash
# Claude Code auto-discovers skill
/skills

# Output:
Available skills:
- instagram-extraction: Extract Instagram posts with transcription

# User invokes
/instagram-extraction

# Skill expands (500 tokens), agent runs job
```

**Token consumption**: 500 tokens (only when invoked)

---

## When to Use What

### Use Prime Prompts When:
- ✅ Focused use case (e.g., Instagram extraction)
- ✅ Want minimal token overhead (300 tokens)
- ✅ Agent should run jobs, not compose primitives
- ✅ Need job-level interface only

### Use Registry-Lite When:
- ✅ Need to browse multiple jobs/workflows
- ✅ Want conditional mappings ("When X, use Y")
- ✅ Acceptable token overhead (1,500 tokens)
- ✅ Need more discovery than prime prompts

### Use Full Registry When:
- ✅ Building custom workflows from primitives
- ✅ Debugging primitive-level issues
- ✅ Need to understand all 27 atomic operations
- ✅ Token overhead acceptable (8,000 tokens)

### Use Claude Skills When:
- ✅ Using Claude Code
- ✅ Want auto-discovery
- ✅ Zero tokens until invoked
- ✅ Acceptable lock-in to Claude ecosystem

---

## Summary

**Agent Tools v2.0** combines:
1. **Production-grade infrastructure** (checkpointing, state, logging, events)
2. **Progressive disclosure** (300-1,500 tokens vs 8,000 tokens)
3. **Layered composition** (primitives → workflows → jobs)
4. **Long-running reliability** (hours/days of runtime with resume)

**Key innovation**: Job-level interfaces with built-in orchestration eliminate need for agents to load primitive catalogs. **94-96% token reduction** while maintaining all production features.

**Best for**: Long-running multi-agent workflows requiring reliability, state management, and error recovery.

**See also**:
- `README.md` - Quick start and examples
- `CONVENTIONS.md` - Tool creation standards
- `core/prime-prompts/` - Use-case-specific prompts
- `core/registry-lite.json` - Job-level catalog
