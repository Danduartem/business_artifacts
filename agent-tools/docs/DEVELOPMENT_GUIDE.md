# Agent Tools Development Guide

**Purpose:** Practical guide for creating new primitives and workflows.

**See also:** [CONVENTIONS.md](CONVENTIONS.md) for architecture and standards.

## Quick Start

### Create a Primitive

```bash
# 1. Create file
touch capabilities/primitives/{category}/{action}.js

# 2. Copy template from this guide (see below)

# 3. Implement your logic

# 4. Make executable
chmod +x capabilities/primitives/{category}/{action}.js

# 5. Test
node capabilities/primitives/{category}/{action}.js --help

# 6. Register
npm run register
```

### Create a Workflow

```bash
# 1. Create file
touch capabilities/workflows/{category}/{name}.js

# 2. Copy template from this guide (see below)

# 3. Implement workflow logic

# 4. Make executable and test
chmod +x capabilities/workflows/{category}/{name}.js

# 5. Register
npm run register
```

## File Organization

```
capabilities/
├── primitives/{category}/{action}.js
│   ├── browser/          # Browser control
│   ├── file/             # File operations
│   ├── http/             # HTTP requests
│   ├── instagram/        # Instagram-specific
│   ├── media/            # Media processing
│   ├── page/             # Page interactions
│   ├── storage/          # Data storage
│   ├── youtube/          # YouTube-specific
│   └── system/           # System operations
│
└── workflows/{category}/{name}.js
    ├── content/          # Content processing
    ├── instagram/        # Instagram workflows
    └── media/            # Media workflows
```

## Naming Conventions

**Tool IDs** (auto-generated from file location):
- Primitives: `{category}.{action}` → `media.transcribe`
- Workflows: `{category}.{action}` → `instagram.extract-post`

**Files** (kebab-case):
- Primitives: `{action}.js` → `transcribe.js`
- Workflows: `{descriptive-name}.js` → `extract-post.js`

## Primitive Template

```javascript
#!/usr/bin/env node
/**
 * @tool {category}.{action}
 * @when One-line use case description for agent semantic matching
 * @category {category}
 *
 * @flag param1 - Description (required)
 * @flag param2 - Description (optional)
 *
 * @dependency npm-package (if needed)
 * @systemDependency ffmpeg (if needed)
 * @envVar OPENAI_API_KEY (if needed)
 *
 * @example
 * node {action}.js --param1 value
 */

import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: '{category}.{action}' });
const args = parseArgs();

async function main() {
  try {
    // 1. Validate inputs
    if (!args.flags.param1) {
      throw new Error('--param1 is required');
    }

    // 2. Log (to file, NOT stdout)
    logger.info('Starting {action}', { param1: args.flags.param1 });

    // 3. Do work
    const result = await doWork(args.flags.param1);

    // 4. Output ONLY JSON to stdout
    console.log(JSON.stringify({
      success: true,
      result: result
    }));

    // 5. Exit explicitly
    process.exit(0);

  } catch (error) {
    logger.error('Failed', { error: error.message, stack: error.stack });
    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));
    process.exit(1);
  }
}

async function doWork(param1) {
  // Your implementation here
  return { data: 'example' };
}

if (import.meta.url === `file://${process.argv[1]}`) main();
```

## Workflow Templates

### Low Complexity (Simple, Minutes)

```javascript
#!/usr/bin/env node
/**
 * @workflow {category}.{name}
 * @when Clear use case description for agent semantic matching
 * @complexity low
 * @category {category}
 *
 * @composes primitive1, primitive2
 *
 * @flag input - Input parameter (required)
 * @flag output - Output path (optional)
 *
 * @runtime 1-5min
 *
 * @example
 * node {name}.js --input file.mp4
 */

import { parseArgs } from 'node:util';
import { executePrimitive, executePrimitiveNoReturn } from '../workflow-utils.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: '{category}.{name}' });

const { values } = parseArgs({
  options: {
    input: { type: 'string' },
    output: { type: 'string' },
    help: { type: 'boolean', short: 'h' }
  }
});

function main() {
  try {
    // 1. Validate inputs
    if (!values.input) {
      throw new Error('--input is required');
    }

    logger.info('Starting workflow', { input: values.input });

    // 2. Execute primitives in sequence (synchronous)
    // executePrimitive uses spawnSync internally - returns immediately
    const step1 = executePrimitive('media/extract-audio.js', {
      input: values.input,
      output: 'temp/audio.wav'
    });

    if (!step1.success) {
      throw new Error(`Step 1 failed: ${step1.error}`);
    }

    const step2 = executePrimitive('media/transcribe.js', {
      input: step1.output,
      output: values.output || 'output.txt'
    });

    if (!step2.success) {
      throw new Error(`Step 2 failed: ${step2.error}`);
    }

    // 3. Output final result
    console.log(JSON.stringify({
      success: true,
      input: values.input,
      transcript: step2.output,
      transcriptText: step2.text
    }));

    logger.info('Workflow complete');
    process.exit(0);

  } catch (error) {
    logger.error('Workflow failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

main();
```

### High Complexity (Multi-Stage, Hours, Checkpointing)

```javascript
#!/usr/bin/env node
/**
 * @workflow {category}.{name}
 * @when Clear use case description for agent semantic matching
 * @complexity high
 * @category {category}
 *
 * @composes workflow1, workflow2, primitive1
 *
 * @flag profiles - Array of profiles to process (required)
 * @flag start-date - Start date YYYY-MM-DD (required)
 * @flag resume - Resume from checkpoint (optional)
 *
 * @runtime hours
 * @resumable true
 * @feature checkpoint
 * @feature progress-tracking
 *
 * @example
 * node {name}.js --profiles '["user1","user2"]' --start-date "2025-01-01"
 * node {name}.js --resume  # Resume from checkpoint
 */

import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';

const logger = createLogger({ toolName: '{category}.{name}' });
const state = createStateManager({ namespace: 'workflow-{name}' });

const { values } = parseArgs({
  options: {
    profiles: { type: 'string' },
    'start-date': { type: 'string' },
    resume: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h' }
  }
});

async function main() {
  try {
    // Initialize or restore state
    let workflowState = values.resume
      ? state.get('workflowState')
      : { stage: 'init', processed: [] };

    if (!workflowState) {
      throw new Error('No checkpoint found. Run without --resume first.');
    }

    logger.info('Starting workflow', { resume: values.resume, stage: workflowState.stage });

    // Stage 1: Process profiles
    if (!workflowState.stage1Complete) {
      logger.info('Stage 1/3: Processing profiles');

      const profiles = JSON.parse(values.profiles || '[]');
      const results = [];

      for (const profile of profiles) {
        if (workflowState.processed.includes(profile)) {
          logger.info('Skipping already processed', { profile });
          continue;
        }

        // Process profile
        const result = await processProfile(profile);
        results.push(result);

        // Checkpoint after each profile
        workflowState.processed.push(profile);
        state.set('workflowState', workflowState);
        state.createCheckpoint();

        logger.info('Profile processed', { profile, total: workflowState.processed.length });
      }

      workflowState.stage1Complete = true;
      workflowState.stage1Results = results;
      state.set('workflowState', workflowState);
      state.createCheckpoint();
    }

    // Stage 2: Aggregate results
    if (!workflowState.stage2Complete) {
      logger.info('Stage 2/3: Aggregating results');

      const aggregated = aggregateResults(workflowState.stage1Results);

      workflowState.stage2Complete = true;
      workflowState.aggregated = aggregated;
      state.set('workflowState', workflowState);
      state.createCheckpoint();
    }

    // Stage 3: Export
    if (!workflowState.stage3Complete) {
      logger.info('Stage 3/3: Exporting data');

      const exported = await exportData(workflowState.aggregated);

      workflowState.stage3Complete = true;
      workflowState.exported = exported;
    }

    // Final output
    const output = {
      success: true,
      processedProfiles: workflowState.processed.length,
      outputFile: workflowState.exported,
      stages: {
        stage1: 'complete',
        stage2: 'complete',
        stage3: 'complete'
      }
    };

    console.log(JSON.stringify(output));
    logger.info('Workflow complete', output);

    // Clean up checkpoint
    state.clear();
    process.exit(0);

  } catch (error) {
    logger.error('Workflow failed', {
      error: error.message,
      stage: state.get('workflowState')?.stage
    });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      checkpoint: 'Use --resume to continue from last checkpoint'
    }));

    process.exit(1);
  }
}

async function processProfile(profile) {
  // Your implementation
  return { profile, data: 'example' };
}

function aggregateResults(results) {
  // Your implementation
  return results;
}

async function exportData(data) {
  // Your implementation
  return 'output.json';
}

main();
```

## Workflow Utilities (workflow-utils.js)

### executePrimitive(primitivePath, args)

**Synchronous execution** of primitives using `spawnSync`. Returns immediately with parsed JSON result.

```javascript
import { executePrimitive } from '../workflow-utils.js';

// Execute primitive and get result
const result = executePrimitive('browser/navigate.js', {
  url: 'https://example.com',
  'wait-until': 'networkidle2'
});

// Check success
if (!result.success) {
  throw new Error(`Navigation failed: ${result.error}`);
}

// Use result
console.log('Navigated to:', result.url);
```

**Important:**
- Uses `spawnSync` (synchronous, not async/await)
- Returns parsed JSON object from primitive's stdout
- Throws error if primitive fails or returns invalid JSON
- 2-minute timeout by default
- Path is relative to `capabilities/primitives/` directory

### executePrimitiveNoReturn(primitivePath, args)

**For cleanup operations** that may fail gracefully (e.g., closing browser).

```javascript
import { executePrimitiveNoReturn } from '../workflow-utils.js';

try {
  // Main workflow logic here
  const result = executePrimitive('browser/navigate.js', { url });

} catch (error) {
  // Cleanup - doesn't throw even if it fails
  executePrimitiveNoReturn('browser/close.js');

  throw error;
}

// Always try to cleanup (won't throw if already closed)
executePrimitiveNoReturn('browser/close.js');
```

**Important:**
- Logs errors but doesn't throw
- Perfect for cleanup operations in error handlers
- Use for operations where failure is acceptable (browser already closed, etc.)

## Common Patterns

### System Commands

```javascript
import { execSync, spawn } from 'child_process';

// Simple command
execSync('pkill -9 -f "pattern"', { stdio: 'ignore' });

// With output
const output = execSync('command --args', { encoding: 'utf8' });

// Long-running with streaming
const proc = spawn('ffmpeg', ['-i', input, output]);
proc.stderr.on('data', data => logger.debug(data.toString()));
await new Promise((resolve, reject) => {
  proc.on('close', code => code === 0 ? resolve() : reject(new Error('Failed')));
});
```

### Browser Operations

```javascript
import puppeteer from 'puppeteer-core';

// Connect to running browser
const browser = await puppeteer.connect({
  browserURL: 'http://localhost:9222',
  defaultViewport: null
});

const pages = await browser.pages();
const page = pages[pages.length - 1];

const result = await page.evaluate(() => {
  return { data: document.title };
});

await browser.disconnect();  // Don't close, just disconnect
```

### ES Modules Path Resolution

```javascript
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPath = join(__dirname, '../../../temp/output.json');
```

## Registry System

After creating tools, rebuild the registry:

```bash
npm run register
```

This builds:
- `core/registry.json` - Full registry
- `core/registry/index.json` - Category overview (15 tokens)
- `core/registry/{category}/primitives.json` - Category primitives
- `core/registry/{category}/workflows.json` - Category workflows

**View registry:**
```bash
# See all tools
node scripts/list-tools.js

# View specific category
cat core/registry/instagram/workflows.json | jq .
```

## Testing

```bash
# Test primitive
node capabilities/primitives/{category}/{action}.js --param value

# Verify exit code
node capabilities/primitives/{category}/{action}.js --args
echo $?  # Should be 0 on success, 1 on error

# Validate JSON output
node capabilities/primitives/{category}/{action}.js --args | jq .

# Check logs
tail -f temp/logs/$(date +%Y-%m-%d).log
```

## Debugging Common Issues

**Tool hangs / doesn't exit:**
- Missing `process.exit(0)` at end
- Browser not disconnected (use `disconnect()` not `close()`)
- Detached process not `unref()`'d

**JSON parse error:**
- Using `console.log()` instead of `logger` for debug messages
- Non-JSON output mixed with JSON to stdout
- Check: `node tool.js | jq .` should work

**Registry doesn't show tool:**
- Missing `@tool` or `@workflow` in JSDoc
- `@category` doesn't match directory name
- Run: `npm run register` and check for errors

**Browser connection fails:**
- Chrome already on port 9222: `lsof -i :9222`
- Run cleanup: `node capabilities/primitives/system/cleanup.js`
- Start browser: `node capabilities/primitives/browser/start.js`

## Quick Fixes

```bash
# Kill hung processes
node capabilities/primitives/system/cleanup.js

# Check what's running
ps aux | grep -E "(node|chrome)" | grep -v grep

# Test browser connection
curl http://localhost:9222/json/version

# Rebuild registry
npm run register

# View registry structure
tree core/registry -L 2
```

## Best Practices & Critical Patterns

### ✅ DO

**Primitives:**
- Use `parseArgs` from `'../../../core/utils/index.js'` (simple auto-parsing wrapper)
- Use `@tool` tag with `@when`, `@category`, `@flag` fields
- Access args via `args.flags.paramName` (core/utils pattern)
- Output ONLY JSON to stdout
- Call `process.exit(0)` on success, `process.exit(1)` on error
- Use `logger` for all debug/info/error messages
- Validate inputs before processing
- Clean up resources (disconnect browsers, close files)

**Workflows:**
- Use `parseArgs` from `'node:util'` (explicit options definition)
- Access args via `values.paramName` (node:util pattern)
- Use `@workflow` tag with `@when`, `@complexity`, `@category`, `@composes`, `@flag`
- Import from `'../workflow-utils.js'` (relative path)
- Use `executePrimitive()` for normal operations
- Use `executePrimitiveNoReturn()` for cleanup operations
- Check `result.success` after each step
- Use state manager for high complexity workflows
- Logger name matches tool ID (e.g., `instagram.extract-post`)

### ❌ DON'T

- Don't mix parseArgs sources (primitives → core/utils, workflows → node:util)
- Don't use old `PRIMITIVE:` or `WORKFLOW:` comment format
- Don't use `@input` / `@output` (use `@flag` instead)
- Don't use `console.log()` for debugging (use `logger`)
- Don't use async/await with executePrimitive (it's synchronous via spawnSync)
- Don't forget to disconnect browsers (use `browser.disconnect()`, not `close()`)
- Don't throw errors in cleanup operations (use executePrimitiveNoReturn)
- Don't create custom spawn logic (use workflow-utils.js)

### 🔍 Common Mistakes

**Mistake 1: Wrong parseArgs import for workflow**
```javascript
// ❌ WRONG (in workflow)
import { parseArgs } from '../../../core/utils/index.js';

// ✅ CORRECT (in workflow)
import { parseArgs } from 'node:util';

// ✅ CORRECT (in primitive)
import { parseArgs } from '../../../core/utils/index.js';
```

**Mistake 2: Old JSDoc format**
```javascript
// ❌ WRONG
/**
 * PRIMITIVE: Extract Text
 * Purpose: Extract text from page
 * Inputs: --selector (required)
 */

// ✅ CORRECT
/**
 * @tool page.extract-text
 * @when Extract text content from CSS selector on current page
 * @category page
 * @flag selector - CSS selector (required)
 */
```

**Mistake 3: Using async/await with executePrimitive**
```javascript
// ❌ WRONG (executePrimitive is synchronous)
const result = await executePrimitive('browser/navigate.js', { url });

// ✅ CORRECT
const result = executePrimitive('browser/navigate.js', { url });
```

**Mistake 4: Not checking result.success**
```javascript
// ❌ WRONG (assumes success)
const result = executePrimitive('browser/navigate.js', { url });
const nextStep = executePrimitive('page/screenshot.js', {});

// ✅ CORRECT (check success)
const result = executePrimitive('browser/navigate.js', { url });
if (!result.success) {
  throw new Error(`Navigation failed: ${result.error}`);
}
const nextStep = executePrimitive('page/screenshot.js', {});
```

**Mistake 5: Wrong logger name**
```javascript
// ❌ WRONG (old naming)
const logger = createLogger({ toolName: 'workflow.instagram.extract-post-full' });

// ✅ CORRECT (matches tool ID)
const logger = createLogger({ toolName: 'instagram.extract-post' });
```

## Checklist Before Committing

**Primitives:**
- [ ] Shebang: `#!/usr/bin/env node`
- [ ] JSDoc with `@tool`, `@when`, `@category`, `@flag`
- [ ] Import: `parseArgs` from `'node:util'` ✅
- [ ] Import: `createLogger` from `'../../../core/logger/index.js'`
- [ ] Logger name matches tool ID: `{category}.{action}`
- [ ] Input validation with clear error messages
- [ ] Only JSON to stdout (use `logger` for debug)
- [ ] `process.exit(0)` on success, `process.exit(1)` on error
- [ ] Try-catch with proper error handling
- [ ] Clean up resources before exit
- [ ] Tested with: `node {primitive}.js --help`
- [ ] Tested with valid/invalid inputs
- [ ] File is executable: `chmod +x {primitive}.js`

**Workflows:**
- [ ] Shebang: `#!/usr/bin/env node`
- [ ] JSDoc with `@workflow`, `@when`, `@complexity`, `@category`, `@composes`, `@flag`
- [ ] Import: `parseArgs` from `'node:util'` ✅
- [ ] Import: `executePrimitive` from `'../workflow-utils.js'`
- [ ] Import: `createLogger` from `'../../../core/logger/index.js'`
- [ ] Logger name matches tool ID: `{category}.{name}`
- [ ] Check `result.success` after each primitive execution
- [ ] Use `executePrimitiveNoReturn()` for cleanup
- [ ] Only JSON to stdout (use `logger` for debug)
- [ ] `process.exit(0)` on success, `process.exit(1)` on error
- [ ] High complexity: `@resumable true`, state manager, checkpointing
- [ ] Tested end-to-end with real data
- [ ] File is executable: `chmod +x {workflow}.js`

**After Implementation:**
- [ ] Registry rebuilt: `npm run register`
- [ ] Tool appears in registry: `cat core/registry/{category}/{type}.json | jq .`
- [ ] Tool ID follows conventions: `{category}.{action}`

## Critical Rules

1. **Always exit explicitly:** `process.exit(0)` or `process.exit(1)`
2. **JSON only to stdout:** Use `logger` for everything else
3. **Validate inputs first:** Before any work
4. **Try-catch everything:** Never let errors crash silently
5. **Clean up resources:** Disconnect browsers, close files
6. **Use @when for discoverability:** Clear, searchable use case descriptions
7. **Add @complexity to workflows:** low/medium/high for agent decision-making
8. **Checkpoint high complexity workflows:** Use state manager for resume capability

## See Also

- [CONVENTIONS.md](CONVENTIONS.md) - Architecture and standards
- [PROGRESSIVE-DISCLOSURE.md](PROGRESSIVE-DISCLOSURE.md) - Token-efficient discovery
- [ENVIRONMENT.md](ENVIRONMENT.md) - Environment setup and API keys
