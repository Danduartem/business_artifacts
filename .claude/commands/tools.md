# Agent-Tools Automation

Help user automate tasks using progressive discovery. Load ONLY what you need.

## API

```javascript
import { getIndex, getWorkflowsByCategory, executeWorkflow } from './agent-tools/core/discovery.js';
```

## Discovery Pattern (135 tokens total)

**1. Identify category:** instagram | media | browser | content | storage | youtube

**2. Load index (15 tokens):**
```javascript
const index = getIndex();
```

**3. Load workflows (120 tokens):**
```javascript
const workflows = getWorkflowsByCategory('instagram');
```

**4. Match by `when` field:**
```javascript
const tool = workflows.tools.find(t => t.when.includes('keyword'));
```

**5. Execute:**
```javascript
await executeWorkflow(tool.id, params);
```

## Workflow Properties

- `when` - Use case description for matching
- `complexity` - low (minutes) | medium (10-30min) | high (hours)
- `features` - resume, checkpoint, progress-tracking
- `flags` - Required/optional parameters

## Example

```javascript
const index = getIndex();
const workflows = getWorkflowsByCategory('instagram');
const tool = workflows.tools.find(t => t.when.includes('bulk'));

await executeWorkflow('instagram.bulk-extraction', {
  profiles: ['user1'],
  'start-date': '2025-11-01',
  'end-date': '2025-11-30',
  transcribe: true
});
```

High complexity workflows support `--resume` if interrupted.

---

Proceed with user's request using this pattern.
