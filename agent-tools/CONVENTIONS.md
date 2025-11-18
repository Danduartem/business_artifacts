# Agent Tools Development Conventions

**Purpose**: Standards for creating new tools that AI agents can discover and use in multi-agent workflows.

## Architecture Overview

```
Primitives (atomic)  →  Workflows (composed)  →  Jobs (orchestrated)  →  Applications
     ↓                        ↓                        ↓                      ↓
  Do ONE thing          Chain primitives      Orchestrate workflows    Use jobs
```

**Layer Definitions:**
- **Primitives**: Single-purpose atomic operations (e.g., browser/start.js, page/extract-text.js)
- **Workflows**: Multi-step compositions using primitives (e.g., media/download-and-transcribe.js)
- **Jobs**: Long-running orchestrations combining multiple workflows (e.g., instagram/bulk-content-extraction.js)
- **Applications**: Complete multi-agent systems using jobs and workflows

## Primitive Tool Standard

### File Structure

```
capabilities/primitives/{category}/{action}.js
```

**Categories**: `browser`, `page`, `media`, `http`, `file`, `storage`

### Template

```javascript
#!/usr/bin/env node
/**
 * @tool {category}.{action}
 * @description One-line description of what this tool does
 * @category {category}
 *
 * @input {name} {type} - Description
 * @input {name} {type} - Description (optional)
 *
 * @output {name} {type} - Description
 * @output {name} {type} - Description
 *
 * @dependency npm-package-name (optional)
 * @systemDependency binary-name (optional)
 * @envVar ENV_VAR_NAME (optional)
 *
 * @example
 * node {category}/{action}.js --param value
 *
 * @example-output
 * {"success": true, "result": "value"}
 */

import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({
  toolName: '{category}.{action}'
});

// Parse arguments
const { values } = parseArgs({
  options: {
    param: { type: 'string', short: 'p' },
    help: { type: 'boolean', short: 'h' }
  }
});

// Help flag
if (values.help) {
  console.log(`
Usage: node {action}.js [options]

Options:
  --param, -p <value>    Description
  --help, -h             Show this help

Example:
  node {action}.js --param value
  `);
  process.exit(0);
}

async function main() {
  try {
    logger.info('Starting {action}', { param: values.param });

    // Validate required inputs
    if (!values.param) {
      throw new Error('--param is required');
    }

    // DO WORK HERE
    const result = await doWork(values.param);

    // Always output JSON to stdout
    const output = {
      success: true,
      result: result
    };

    console.log(JSON.stringify(output));
    logger.info('Completed {action}', { output });

  } catch (error) {
    logger.error('Failed {action}', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));

    process.exit(1);
  }
}

async function doWork(param) {
  // Implementation here
  return { data: 'result' };
}

main();
```

### Key Conventions

1. **JSDoc header** - Two formats supported:
   - **Recommended**: `@tool`, `@description`, `@input`, `@output` (shown in template above)
   - **Legacy**: `PRIMITIVE: Name`, `Purpose:`, `Inputs:`, `Outputs:` (still supported, used by existing tools)
2. **Always output JSON** - Both success and error cases
3. **Use logger** - Log operations for debugging long-running workflows
4. **Validate inputs** - Check required parameters
5. **Exit codes** - 0 for success, 1 for failure
6. **Help flag** - Always support --help/-h

**Note**: The build-registry.js script supports both JSDoc formats. New tools should use the recommended format, but existing tools using the legacy format will continue to work.

### Output Schema

```javascript
// Success
{
  "success": true,
  "result": <tool-specific-data>,
  // ... other fields
}

// Failure
{
  "success": false,
  "error": "Error message"
}
```

## Workflow Tool Standard

### File Structure

```
capabilities/workflows/{category}/{descriptive-name}.js
```

**Categories**: `media`, `instagram`, `content`, etc.

### Template

```javascript
#!/usr/bin/env node
/**
 * @workflow {category}.{name}
 * @description High-level description of the workflow
 * @category {category}
 *
 * @composes primitive1, primitive2, primitive3
 *
 * @input {name} {type} - Description
 * @output {name} {type} - Description
 *
 * @example
 * node {category}/{name}.js --param value
 */

import { parseArgs } from 'node:util';
import { executePrimitive } from '../workflow-utils.js';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';

const logger = createLogger({
  toolName: 'workflow.{category}.{name}'
});

const state = createStateManager({
  namespace: 'workflow-{name}'
});

// Parse arguments
const { values } = parseArgs({
  options: {
    param: { type: 'string' },
    help: { type: 'boolean', short: 'h' }
  }
});

if (values.help) {
  console.log(`
Usage: node {name}.js [options]

Description:
  High-level workflow description

Options:
  --param <value>    Description
  --help, -h         Show this help

Example:
  node {name}.js --param value
  `);
  process.exit(0);
}

async function main() {
  try {
    logger.info('Starting workflow', { params: values });

    // Step 1: Execute first primitive
    const step1 = await executePrimitive('category/action1.js', {
      param: values.param
    });

    // Checkpoint after expensive operation
    state.set('step1', step1);
    state.checkpoint();

    // Step 2: Execute second primitive
    const step2 = await executePrimitive('category/action2.js', {
      input: step1.result
    });

    state.set('step2', step2);
    state.checkpoint();

    // Final output
    const output = {
      success: true,
      result: step2.result
    };

    console.log(JSON.stringify(output));
    logger.info('Workflow completed', { output });

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

### Workflow Conventions

1. **Compose primitives** - Use `executePrimitive()` helper
2. **Add checkpoints** - Use state manager for long operations
3. **Pass data between steps** - Output of one → input of next
4. **Error handling** - Wrap in try/catch, log errors
5. **Document composition** - Use @composes to list primitives

## Job Tool Standard

### File Structure

```
capabilities/jobs/{category}/{descriptive-name}.js
```

**Categories**: `instagram`, `media`, `content`, etc.

### Template

```javascript
#!/usr/bin/env node
/**
 * @job {category}.{name}
 * @description High-level description of the job orchestration
 * @category {category}
 *
 * @orchestrates workflow1, workflow2, workflow3
 *
 * @input {name} {type} - Description
 * @output {name} {type} - Description
 *
 * @example
 * node {category}/{name}.js --param value
 */

import { parseArgs } from 'node:util';
import { spawn } from 'node:child_process';
import { createLogger } from '../../../core/logger/index.js';
import { createStateManager } from '../../../core/state/index.js';
import { getEventBus } from '../../../core/events/index.js';

const logger = createLogger({
  toolName: 'job.{category}.{name}'
});

const state = createStateManager({
  namespace: 'job-{name}'
});

const events = getEventBus();

// Helper to execute workflows
async function executeWorkflow(workflowPath, params) {
  // Implementation in template
}

// Parse arguments with --resume flag
const { values } = parseArgs({
  options: {
    param: { type: 'string' },
    resume: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h' }
  }
});

async function main() {
  try {
    // Initialize job state with resume capability
    let jobState = { stage: 'initialized', ... };

    if (values.resume) {
      const checkpoint = state.get('jobState');
      if (checkpoint) jobState = checkpoint;
    }

    // Stage 1: Execute first workflow
    if (!jobState.workflow1Complete) {
      const result = await executeWorkflow('path/to/workflow1.js', params);
      jobState.workflow1Complete = true;
      state.set('jobState', jobState);
      state.checkpoint();
    }

    // Stage 2, 3, etc...

    // Final output
    console.log(JSON.stringify({ success: true, ... }));

    // Cleanup
    state.clear();
    events.publish('job.completed', { ... });

  } catch (error) {
    logger.error('Job failed', { error });
    events.publish('job.failed', { ... });
    process.exit(1);
  }
}

main();
```

### Job Conventions

1. **Orchestrate workflows** - Jobs combine multiple workflows, not primitives
2. **Resume capability** - Always support `--resume` flag with checkpointing
3. **Stage-based execution** - Break into clear stages with checkpoints between
4. **Progress tracking** - Log progress and emit events for monitoring
5. **Comprehensive output** - Include summary, stats, and artifact lists
6. **Long-running** - Designed for operations taking hours or days
7. **Event emission** - Publish job.started, job.completed, job.failed events
8. **Document orchestration** - Use @orchestrates to list workflows

### Job vs Workflow

**When to create a Workflow:**
- Combines 2-5 primitives
- Completes in minutes
- Single focused task
- Example: Download video and transcribe it

**When to create a Job:**
- Combines multiple workflows
- May run for hours/days
- Complex multi-stage operation
- Requires robust checkpointing
- Example: Extract all Instagram posts from 10 profiles, download media, transcribe videos, and export to CSV

## Core Services Usage

### Logger

```javascript
import { createLogger } from './core/logger/index.js';

const logger = createLogger({
  agentId: 'optional-agent-id',
  toolName: 'your-tool'
});

logger.info('Message', { metadata: 'here' });
logger.error('Error message', { error: err });
logger.debug('Debug info', { details });
```

### State Manager

```javascript
import { createStateManager } from './core/state/index.js';

const state = createStateManager({
  namespace: 'unique-namespace'
});

// Set values
state.set('key', 'value');
state.set('nested.key', { data: 'value' });

// Get values
const value = state.get('key');

// Checkpoint (save to disk)
state.checkpoint();

// Restore from checkpoint
state.restoreCheckpoint();
```

### Event Bus

```javascript
import { getEventBus } from './core/events/index.js';

const events = getEventBus();

// Publish event
events.publish('event.name', { data: 'payload' });

// Subscribe to event
events.subscribe('event.name', (data) => {
  console.log('Received:', data);
});

// Unsubscribe
const unsubscribe = events.subscribe('event.name', handler);
unsubscribe(); // Remove subscription
```

### Health Monitor

```javascript
import { health } from './core/health/index.js';

// Register health check
health.registerCheck('service-name', async () => {
  const isHealthy = await checkService();
  return {
    status: isHealthy ? 'healthy' : 'unhealthy',
    message: 'Optional status message'
  };
});

// Run all health checks
const report = await health.runAll();
console.log(report.status); // 'healthy' | 'degraded' | 'unhealthy'
```

## Naming Conventions

### Files
- **Primitives**: `{action}.js` (e.g., `start.js`, `navigate.js`)
- **Workflows**: `{descriptive-name}.js` (e.g., `download-and-transcribe.js`)
- **Jobs**: `{descriptive-name}.js` (e.g., `bulk-content-extraction.js`)
- **Always kebab-case**
- **No version numbers in filenames**

### Tool IDs (in registry)
- **Primitives**: `{category}.{action}` (e.g., `browser.start`)
- **Workflows**: `workflow.{category}.{name}` (e.g., `workflow.media.download-and-transcribe`)
- **Jobs**: `job.{category}.{name}` (e.g., `job.instagram.bulk-content-extraction`)

### Variables/Functions
- **camelCase**: `const userName = 'value'`
- **Functions**: Verbs - `async function fetchData()`

## Registry Integration

Tools are auto-discovered by scanning JSDoc headers. The build script extracts:

```javascript
// From JSDoc
@tool browser.start
@description Launches Chrome instance
@input profile boolean - Use Chrome profile
@output browserId string - Browser instance ID

// Generates in registry.json
{
  "id": "browser.start",
  "name": "Start Browser",
  "path": "capabilities/primitives/browser/start.js",
  "capabilities": ["launch-chrome"],
  "inputs": ["profile"],
  "outputs": ["browserId", "port"]
}
```

## Adding a New Tool Checklist

1. **Copy template** from:
   - `templates/primitive-template.js` (for primitives)
   - `templates/workflow-template.js` (for workflows)
   - `templates/job-template.js` (for jobs)
2. **Place in correct directory**:
   - Primitive: `capabilities/primitives/{category}/{action}.js`
   - Workflow: `capabilities/workflows/{category}/{name}.js`
   - Job: `capabilities/jobs/{category}/{name}.js`
3. **Update JSDoc header** with all required fields
4. **Implement functionality** following conventions
5. **Make executable**: `chmod +x your-tool.js`
6. **Test locally**: `node your-tool.js --help`
7. **Register tool**: `npm run register` (auto-updates registry.json)
8. **Commit**: Tool is now discoverable by AI agents

## Tool Discovery (For AI Agents)

```javascript
// Load registry
const registry = require('./core/registry.json');

// Find all browser primitives
const browserTools = registry.primitives.browser.tools;

// Find tools by capability
function findByCapability(capability) {
  const results = [];
  for (const category in registry.primitives) {
    for (const tool of registry.primitives[category].tools) {
      if (tool.capabilities.includes(capability)) {
        results.push(tool);
      }
    }
  }
  return results;
}

// Execute any tool
import { executePrimitive } from './capabilities/workflows/workflow-utils.js';
const result = await executePrimitive('browser/start.js', { profile: true });
```

## Environment Variables

All tools requiring API keys or configuration use a centralized `.env` file at the root:

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

## Error Handling Patterns

### For Primitives

```javascript
try {
  const result = await operation();
  console.log(JSON.stringify({ success: true, result }));
} catch (error) {
  logger.error('Operation failed', { error: error.message, stack: error.stack });
  console.log(JSON.stringify({ success: false, error: error.message }));
  process.exit(1);
}
```

### For Workflows (with retry)

```javascript
import { retry } from '../../core/utils/index.js';

try {
  const result = await retry(async () => {
    return await executePrimitive('http/get.js', { url });
  }, {
    maxRetries: 3,
    initialDelay: 1000,
    backoffFactor: 2
  });
} catch (error) {
  logger.error('All retries failed', { error });
  process.exit(1);
}
```

## Long-Running Workflow Patterns

### Batch Processing with Checkpointing

```javascript
const state = createStateManager({ namespace: 'batch-processor' });

// Resume from checkpoint if exists
const startIndex = state.get('lastProcessed') || 0;

for (let i = startIndex; i < items.length; i++) {
  await processItem(items[i]);

  // Checkpoint every 10 items
  if (i % 10 === 0) {
    state.set('lastProcessed', i);
    state.checkpoint();
    logger.info('Checkpoint saved', { processed: i });
  }
}
```

### Multi-Agent Coordination

```javascript
import { getEventBus } from './core/events/index.js';

const events = getEventBus();

// Agent 1: Producer
async function producer() {
  const data = await extractData();
  events.publish('data.ready', { data, timestamp: Date.now() });
}

// Agent 2: Consumer
events.subscribe('data.ready', async (payload) => {
  logger.info('Received data', { timestamp: payload.timestamp });
  await processData(payload.data);
  events.publish('processing.complete', { success: true });
});
```

## Testing

### Manual Testing

```bash
# Test primitive
node capabilities/primitives/browser/start.js --profile

# Test workflow
node capabilities/workflows/media/download-and-transcribe.js \
  --url "https://example.com/video.mp4" \
  --language pt

# Check registry includes your tool
node -e "console.log(require('./core/registry.json').primitives.browser.tools)"
```

### Expected Behavior

- **Exit code 0** on success
- **Exit code 1** on failure
- **JSON output** always
- **Logs written** to `temp/logs/`
- **State saved** to `temp/state/` (if using state manager)

## Best Practices

1. **Single Responsibility** - Each primitive does ONE thing
2. **JSON Communication** - All tools input/output JSON
3. **Fail Fast** - Validate inputs early, exit on error
4. **Log Everything** - Use logger for debugging multi-hour workflows/jobs
5. **Checkpoint Often** - Save state before expensive operations
6. **Self-Document** - JSDoc headers + --help flag
7. **No Side Effects** - Primitives shouldn't modify global state
8. **Composable** - Workflows combine primitives; Jobs combine workflows
9. **Resume Support** - Jobs should always support --resume flag
10. **Event-Driven** - Jobs should emit events for monitoring and coordination

## Anti-Patterns to Avoid

❌ Hardcoding file paths
❌ Silent failures (always log errors)
❌ Printing non-JSON to stdout
❌ Modifying global state in primitives
❌ Workflows calling other workflows (use primitives)
❌ Jobs calling other jobs (use workflows)
❌ Primitives calling workflows or jobs
❌ Skipping input validation
❌ Not handling errors
❌ Jobs without --resume capability
❌ Missing checkpoints in long-running operations

## Questions for AI Agents

**Q: How do I create a new primitive?**
A: Copy `templates/primitive-template.js`, place in `capabilities/primitives/{category}/{action}.js`, update JSDoc, implement, run `npm run register`.

**Q: How do I discover available tools?**
A: Read `core/registry.json` or import and query programmatically.

**Q: How do I compose multiple primitives?**
A: Create a workflow using `executePrimitive()` from `workflow-utils.js`.

**Q: How do I orchestrate multiple workflows?**
A: Create a job using `executeWorkflow()` helper and organize into stages with checkpoints.

**Q: When should I create a job vs a workflow?**
A: Create a workflow for operations completing in minutes using 2-5 primitives. Create a job for long-running operations (hours/days) that orchestrate multiple workflows.

**Q: How do I handle long-running operations?**
A: Use state manager with checkpoints every N iterations. For very long operations, create a job with --resume capability.

**Q: How do I coordinate between multiple agents?**
A: Use event bus to publish/subscribe to events.

**Q: Where are logs stored?**
A: `temp/logs/` directory, automatically rotated by date.

**Q: How do I pass data between tools?**
A: Output JSON from one tool, parse and pass to next tool's input.
