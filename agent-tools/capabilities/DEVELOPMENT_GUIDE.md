# Agent Tools Development Guide

## Quick Start

**Create a new primitive:**
```bash
# 1. Copy template
cp templates/full-primitive-template.js capabilities/primitives/{category}/{action}.js

# 2. Update JSDoc metadata and implement logic

# 3. Rebuild registry
node scripts/build-registry.js

# 4. Test
node capabilities/primitives/{category}/{action}.js --args
```

**Create a new workflow:**
```bash
# 1. Copy template
cp templates/workflow-template.js capabilities/workflows/{category}/{name}.js

# 2. Implement workflow using primitives

# 3. Rebuild registry
node scripts/build-registry.js
```

## File Organization

```
capabilities/
├── primitives/{category}/{action}.js  # Atomic operations
│   ├── browser/          # Browser control
│   ├── file/             # File operations
│   ├── http/             # HTTP requests
│   ├── media/            # Media processing
│   ├── page/             # Page interactions
│   ├── storage/          # Data storage
│   └── system/           # System operations
└── workflows/{category}/{name}.js     # Multi-step workflows
    ├── content/          # Content processing
    ├── instagram/        # Instagram workflows
    └── media/            # Media workflows
```

**Naming:**
- Primitives: `{category}.{action}` (e.g., `browser.navigate`, `media.convert`)
- Workflows: `workflow.{category}.{name}`
- Files: `{action}.js` or `{name}.js`

## Required Patterns

### JSDoc Metadata (Required for Registry)

```javascript
#!/usr/bin/env node
/**
 * @tool {category}.{action}
 * @description One-line description
 * @category {category}
 *
 * @input paramName type - Description
 * @input optionalParam type - Description (optional)
 *
 * @output resultField type - Description
 * @output status string - Operation status
 *
 * @dependency npm-package-name (if needed)
 * @systemDependency binary-name (if needed)
 * @envVar ENV_VAR_NAME (if needed)
 *
 * @example
 * node {action}.js --param-name value
 *
 * @example-output
 * {"success": true, "resultField": "value"}
 */
```

### Primitive Structure

```javascript
import { parseArgs } from 'node:util';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: '{category}.{action}' });

const { values } = parseArgs({
  options: {
    paramName: { type: 'string' },
    optional: { type: 'boolean', default: false }
  }
});

async function main() {
  try {
    // 1. Validate inputs
    if (!values.paramName) throw new Error('--param-name required');

    // 2. Log (goes to log file, NOT stdout)
    logger.info('Starting', { params: values });

    // 3. Do work
    const result = await doWork(values.paramName);

    // 4. Output ONLY JSON to stdout
    console.log(JSON.stringify({ success: true, ...result }));

    // 5. Exit explicitly
    process.exit(0);

  } catch (error) {
    logger.error('Failed', { error: error.message, stack: error.stack });
    console.log(JSON.stringify({ success: false, error: error.message }));
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
export { doWork };
```

**Critical Rules:**
1. Always call `process.exit(0)` on success, `process.exit(1)` on error
2. Output ONLY JSON to stdout (use `logger` for everything else)
3. Wrap everything in try-catch
4. Validate inputs first
5. Clean up resources before exiting

## Common Patterns

### System Commands

**Use execSync/spawn directly in primitives - NEVER create separate shell scripts:**

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
  proc.on('close', code => code === 0 ? resolve() : reject());
});
```

**Examples:** `media/convert.js`, `media/extract-audio.js`, `system/cleanup.js`

### Browser Operations

```javascript
// Launch (detached process)
const proc = spawn(chromePath, ['--remote-debugging-port=9222'], {
  detached: true,
  stdio: 'ignore'
});
proc.unref();
await waitForReady();
process.exit(0);

// Use browser
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const result = await page.evaluate(...);
await browser.disconnect();
process.exit(0);
```

### State Management

```javascript
import { createStateManager } from '../../core/state/index.js';

const state = createStateManager({ namespace: 'workflow-name' });
state.set('progress', data);
state.checkpoint();

// Resume from checkpoint
const previous = state.get('progress');
```

### ES Modules

```javascript
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

## Registry System

Tools are discovered via JSDoc metadata. After creating/modifying primitives:

```bash
node scripts/build-registry.js
```

This scans `capabilities/primitives/` and `capabilities/workflows/`, extracts metadata, and builds `core/registry.json` for agent discovery.

**View registry:**
```bash
node scripts/list-tools.js
```

## Testing

```bash
# Test primitive
node capabilities/primitives/{category}/{action}.js --args

# Verify exit code
node capabilities/primitives/{category}/{action}.js --args; echo $?

# Validate JSON output
node capabilities/primitives/{category}/{action}.js --args | jq .

# Check logs
tail -f temp/logs/$(date +%Y-%m-%d).log
```

## Debugging

**Primitive hangs:**
- Missing `process.exit(0)`
- Browser not disconnected
- Detached process not unref'd

**JSON parse error:**
- console.log used instead of logger
- Non-JSON output to stdout
- Logs mixed with output

**Browser fails:**
- Chrome already on port 9222: `lsof -i :9222`
- Run cleanup: `node capabilities/primitives/system/cleanup.js`

**Quick fixes:**
```bash
# Kill hung processes
node capabilities/primitives/system/cleanup.js

# Check what's running
ps aux | grep -E "(node|chrome)" | grep -v grep

# Test browser connection
curl http://localhost:9222/json/version
```

## Checklist

**Before committing:**
- [ ] JSDoc metadata complete (@tool, @description, @input, @output)
- [ ] Calls `process.exit(0)` on success, `process.exit(1)` on error
- [ ] Only JSON to stdout, all logs use logger
- [ ] Input validation with clear errors
- [ ] Try-catch with proper error handling
- [ ] Tested individually
- [ ] Registry rebuilt (`node scripts/build-registry.js`)
- [ ] Follows naming conventions ({category}.{action})
