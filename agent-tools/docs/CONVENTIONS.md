# Agent Tools Development Conventions

**Purpose**: Standards for creating tools that AI agents can discover and use efficiently via progressive disclosure.

## Architecture Overview

```
Primitives (atomic)  →  Workflows (simple & complex)  →  Applications
     ↓                           ↓                            ↓
  Do ONE thing          Chain primitives/workflows      Use workflows
```

**Two-Layer Architecture:**
- **Primitives**: Single-purpose atomic operations (e.g., `browser.start`, `media.transcribe`)
- **Workflows**: Multi-step compositions, simple or complex (e.g., `instagram.extract-post`, `instagram.bulk-extraction`)

**Complexity Levels** (workflow property, not separate layer):
- **Low**: 2-5 primitives, minutes to complete
- **Medium**: Multi-step, 10-30 min
- **High**: Multi-stage with checkpointing, hours/days, supports `--resume`

## Quick Reference

| Type | Purpose | Complexity | Runtime | Example |
|------|---------|-----------|---------|---------|
| **Primitive** | Single atomic operation | N/A | Seconds | `browser.start`, `media.transcribe` |
| **Workflow (Low)** | Chain 2-5 primitives | Low | 1-5 min | `media.download-transcribe` |
| **Workflow (Medium)** | Multi-step operation | Medium | 10-30 min | `instagram.extract-profile` |
| **Workflow (High)** | Multi-stage with checkpoints | High | Hours/days | `instagram.bulk-extraction` |

## Primitive Tool Standard

### File Structure

```
capabilities/primitives/{category}/{action}.js
```

**Categories**: `browser`, `page`, `media`, `http`, `file`, `storage`, `instagram`, `youtube`, `content`, `system`

### JSDoc Template

```javascript
#!/usr/bin/env node
/**
 * @tool {category}.{action}
 * @when One-line use case description for agent matching
 * @category {category}
 *
 * @flag param1 - Description (optional)
 * @flag param2 - Description (required)
 *
 * @dependency npm-package-name (optional)
 * @systemDependency binary-name (optional)
 * @envVar ENV_VAR_NAME (optional)
 *
 * @example
 * node {action}.js --param1 value
 */
```

### Implementation Pattern

**Note:** Primitives use `core/utils` parseArgs for simple auto-parsing of all flags.

```javascript
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: '{category}.{action}' });
const args = parseArgs();

async function main() {
  try {
    // 1. Validate inputs
    if (!args.flags.param) throw new Error('--param required');

    // 2. Log (to file, NOT stdout)
    logger.info('Starting', { param: args.flags.param });

    // 3. Do work
    const result = await doWork(args.flags.param);

    // 4. Output ONLY JSON to stdout
    console.log(JSON.stringify({ success: true, result }));

    // 5. Exit explicitly
    process.exit(0);

  } catch (error) {
    logger.error('Failed', { error: error.message });
    console.log(JSON.stringify({ success: false, error: error.message }));
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
```

**Critical Rules:**
1. Always call `process.exit(0)` on success, `process.exit(1)` on error
2. Output ONLY JSON to stdout (use `logger` for everything else)
3. Wrap everything in try-catch
4. Validate inputs first
5. Clean up resources before exiting

## Workflow Tool Standard

### File Structure

```
capabilities/workflows/{category}/{descriptive-name}.js
```

**Categories**: `instagram`, `media`, `content`, etc.

### JSDoc Template

```javascript
#!/usr/bin/env node
/**
 * @workflow {category}.{name}
 * @when Clear use case description for agent matching
 * @complexity low|medium|high
 * @category {category}
 *
 * @composes primitive1, primitive2, workflow.category.other (optional)
 *
 * @flag param1 - Description (required)
 * @flag param2 - Description (optional)
 * @flag resume - Resume from checkpoint (for high complexity)
 *
 * @runtime 1-5min | 10-30min | hours
 * @resumable true|false (for high complexity workflows)
 * @feature checkpoint (optional)
 * @feature progress-tracking (optional)
 *
 * @example
 * node {name}.js --param1 value --param2 value
 */
```

### Low Complexity Workflow

Simple composition, no state management needed:

**Note:** Workflows use `node:util` parseArgs for explicit options. executePrimitive is synchronous (uses spawnSync).

```javascript
import { parseArgs } from 'node:util';
import { executePrimitive } from '../workflow-utils.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: '{category}.{name}' });

const { values } = parseArgs({
  options: {
    input: { type: 'string' }
  }
});

function main() {
  try {
    if (!values.input) throw new Error('--input required');

    logger.info('Starting workflow');

    // Execute primitives in sequence (synchronous)
    const step1 = executePrimitive('primitive1.js', { param: values.input });
    if (!step1.success) throw new Error(`Step 1 failed: ${step1.error}`);

    const step2 = executePrimitive('primitive2.js', { input: step1.result });
    if (!step2.success) throw new Error(`Step 2 failed: ${step2.error}`);

    console.log(JSON.stringify({ success: true, result: step2.result }));
    process.exit(0);

  } catch (error) {
    logger.error('Workflow failed', { error: error.message });
    console.log(JSON.stringify({ success: false, error: error.message }));
    process.exit(1);
  }
}

main();
```

### High Complexity Workflow

Multi-stage with checkpointing and resume support:

```javascript
import { parseArgs } from 'node:util';
import { executePrimitive } from '../workflow-utils.js';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';

const logger = createLogger({ toolName: '{category}.{name}' });
const state = createStateManager({ namespace: 'workflow-{name}' });

const { values } = parseArgs({
  options: {
    param: { type: 'string' },
    resume: { type: 'boolean', default: false }
  }
});

async function main() {
  try {
    // Initialize or restore state
    let workflowState = values.resume ? state.get('workflowState') : { stage: 'init' };

    // Stage 1
    if (!workflowState.stage1Complete) {
      logger.info('Stage 1: Processing...');
      const result1 = await executePrimitive('primitive1.js', { param: values.param });

      workflowState.stage1Complete = true;
      workflowState.result1 = result1;
      state.set('workflowState', workflowState);
      state.createCheckpoint();
    }

    // Stage 2
    if (!workflowState.stage2Complete) {
      logger.info('Stage 2: Processing...');
      const result2 = await executePrimitive('primitive2.js', { input: workflowState.result1 });

      workflowState.stage2Complete = true;
      workflowState.result2 = result2;
      state.set('workflowState', workflowState);
      state.createCheckpoint();
    }

    // Final output
    const output = {
      success: true,
      result: workflowState.result2,
      stages: {
        stage1: workflowState.result1,
        stage2: workflowState.result2
      }
    };

    console.log(JSON.stringify(output));
    logger.info('Workflow completed');

    // Cleanup checkpoint
    state.clear();
    process.exit(0);

  } catch (error) {
    logger.error('Workflow failed', { error: error.message, stage: state.get('workflowState')?.stage });
    console.log(JSON.stringify({
      success: false,
      error: error.message,
      checkpoint: 'Use --resume to continue from last checkpoint'
    }));
    process.exit(1);
  }
}

main();
```

## Argument Parsing Patterns

### Why Two Different parseArgs?

This project uses **two different parseArgs implementations** depending on the tool type:

| Tool Type | Module | Pattern | Use Case |
|-----------|--------|---------|----------|
| **Primitives** | `core/utils/index.js` | `args.flags.X` | Auto-parses all flags without declaration |
| **Workflows** | `node:util` | `values.X` | Explicit options with type definitions |

### Primitives: Auto-Parsing (core/utils)

Primitives use the custom `core/utils` parseArgs for **simple, automatic flag parsing**:

```javascript
import { parseArgs } from '../../../core/utils/index.js';

const args = parseArgs();

// Access any flag via args.flags
if (!args.flags.url) throw new Error('--url required');
if (args.flags.verbose) console.log('Verbose mode enabled');
```

**Advantages:**
- No need to declare options upfront
- All flags automatically available
- Simpler for single-purpose primitives
- Less boilerplate code

### Workflows: Explicit Options (node:util)

Workflows use Node's built-in `node:util` parseArgs for **explicit type-safe options**:

```javascript
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    input: { type: 'string' },
    count: { type: 'string' },  // Note: still string, parse later
    verbose: { type: 'boolean' }
  }
});

// Access declared options via values
if (!values.input) throw new Error('--input required');
const count = parseInt(values.count || '10', 10);
```

**Advantages:**
- Type validation at parse time
- Clear documentation of accepted options
- Better for multi-parameter workflows
- Standard Node.js API

### When to Use Which?

**Use `core/utils` (auto-parsing) when:**
- Writing a primitive (always)
- Simple flag requirements
- Flags are all optional or validated manually

**Use `node:util` (explicit) when:**
- Writing a workflow (always)
- Complex option requirements
- Need type validation
- Multiple required parameters

### Common Mistakes

❌ **WRONG - Using node:util in primitives:**
```javascript
// primitives/browser/start.js
import { parseArgs } from 'node:util';  // ❌ WRONG
const { values } = parseArgs({ options: { headless: { type: 'boolean' } } });
```

❌ **WRONG - Using core/utils in workflows:**
```javascript
// workflows/instagram/extract-post.js
import { parseArgs } from '../../../core/utils/index.js';  // ❌ WRONG
const args = parseArgs();
```

✅ **CORRECT:**
```javascript
// Primitive
import { parseArgs } from '../../../core/utils/index.js';
const args = parseArgs();
console.log(args.flags.url);

// Workflow
import { parseArgs } from 'node:util';
const { values } = parseArgs({ options: { url: { type: 'string' } } });
console.log(values.url);
```

## Naming Conventions

**Tool IDs** (used in registry):
- Primitives: `{category}.{action}` → `browser.start`, `media.transcribe`
- Workflows: `{category}.{action}` → `instagram.extract-post`, `instagram.bulk-extraction`

**Files** (always kebab-case):
- Primitives: `{action}.js` → `start.js`, `transcribe.js`
- Workflows: `{descriptive-name}.js` → `extract-post.js`, `bulk-extraction.js`

**No prefixes needed** - Discovery API provides context via function names:
- `getPrimitivesByCategory('browser')` → Returns primitives
- `getWorkflowsByCategory('instagram')` → Returns workflows

## Registry Integration

Tools are auto-discovered by scanning JSDoc headers. The build script extracts:

```bash
npm run register  # Builds both registry.json and split registry files
```

**Generated files:**
- `core/registry.json` - Full registry (for compatibility)
- `core/registry/index.json` - Category overview (~15 tokens)
- `core/registry/{category}/primitives.json` - Category primitives (~100-250 tokens)
- `core/registry/{category}/workflows.json` - Category workflows (~80-150 tokens)

**Progressive Disclosure:**
Agents load only what they need:
1. `getIndex()` → 15 tokens (see all categories)
2. `getWorkflowsByCategory('instagram')` → 120 tokens (get Instagram workflows)
3. Total: 135 tokens (vs 420 tokens loading full registry)

## Core Services Usage

### Logger

```javascript
import { createLogger } from './core/logger/index.js';

const logger = createLogger({ toolName: 'your-tool' });

logger.info('Message', { metadata: 'here' });
logger.error('Error message', { error: err });
logger.debug('Debug info', { details });
```

### State Manager (for high complexity workflows)

```javascript
import { createStateManager } from './core/state/index.js';

const state = createStateManager({ namespace: 'unique-namespace' });

// Set values
state.set('key', 'value');
state.set('nested.key', { data: 'value' });

// Get values
const value = state.get('key');

// Checkpoint (save to disk)
state.createCheckpoint();

// Restore from checkpoint
state.restoreCheckpoint();

// Clear checkpoint
state.clear();
```

### Event Bus (for multi-agent coordination)

```javascript
import { getEventBus } from './core/events/index.js';

const events = getEventBus();

// Publish event
events.publish('event.name', { data: 'payload' });

// Subscribe to event
const unsubscribe = events.subscribe('event.name', (data) => {
  console.log('Received:', data);
});

// Unsubscribe
unsubscribe();
```

## Adding a New Tool

**Checklist:**
1. Choose layer: Primitive or Workflow?
2. Choose category: `instagram`, `media`, `browser`, etc.
3. Choose complexity (workflows only): `low`, `medium`, or `high`
4. Copy appropriate template (primitive or workflow)
5. Place in correct directory:
   - Primitive: `capabilities/primitives/{category}/{action}.js`
   - Workflow: `capabilities/workflows/{category}/{name}.js`
6. Update JSDoc header with all required fields
7. Implement functionality following conventions
8. Make executable: `chmod +x your-tool.js`
9. Test locally: `node your-tool.js --help`
10. Register tool: `npm run register`
11. Verify in registry: `cat core/registry/{category}/primitives.json` or `workflows.json`

## Progressive Disclosure for Agents

**Agent discovery pattern:**

```javascript
// 1. Parse user intent → category
const category = 'instagram';

// 2. Load index (15 tokens)
const index = getIndex();
// See: { instagram: { workflows: 9, primitives: 1 }, ... }

// 3. Load workflows (120 tokens)
const workflows = getWorkflowsByCategory('instagram');
// See all Instagram workflows with `when`, `complexity`, `runtime`, `features`

// 4. Match by `when` field
const tool = workflows.tools.find(t =>
  t.when.toLowerCase().includes('bulk') &&
  t.when.toLowerCase().includes('extraction')
);
// Matched: instagram.bulk-extraction

// 5. Check complexity and features
if (tool.complexity === 'high') {
  // Long-running, supports --resume
  console.log(`This will take ${tool.runtime}. Use --resume if interrupted.`);
}

// 6. Execute
await executeWorkflow(tool.id, params);
```

## Best Practices

**DO:**
✅ Single responsibility per primitive
✅ Output only JSON to stdout
✅ Use logger for all debug/info messages
✅ Validate inputs early
✅ Exit explicitly with correct codes
✅ Add `@when` for semantic matching
✅ Use checkpoints for operations > 10 min
✅ Support `--resume` for high complexity workflows
✅ Compose workflows from primitives (not other workflows when possible)

**DON'T:**
❌ Print non-JSON to stdout
❌ Silent failures (always log errors)
❌ Hardcode file paths
❌ Skip input validation
❌ Forget process.exit()
❌ Create workflows without `@complexity`
❌ Use `echo` or `console.log` for communication (use JSON output)

## Anti-Patterns

❌ **Primitives calling other primitives** - Keep atomic
❌ **Workflows without @when** - Agents can't match
❌ **High complexity without checkpoints** - Will lose progress
❌ **Missing @resumable on long workflows** - Users will be confused
❌ **Skipping error handling** - Workflows will hang
❌ **Not using progressive disclosure** - Wastes tokens

## Environment Variables

All tools use centralized `.env` at root:

```bash
# Storage
AIRTABLE_API_KEY=patXXXXXX
AIRTABLE_BASE_ID=appXXXXXX
NOTION_API_TOKEN=secret_XXXXX

# AI Services
OPENAI_API_KEY=sk-XXXXX
ANTHROPIC_API_KEY=sk-ant-XXXXX
```

Load with:
```javascript
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });
```

## See Also

- [Environment Configuration](ENVIRONMENT.md) - API keys and setup
- [Development Guide](DEVELOPMENT_GUIDE.md) - Technical details
- [Progressive Disclosure API](PROGRESSIVE-DISCLOSURE.md) - Token-efficient tool discovery
- Split Registry Structure - Category-based tool loading
