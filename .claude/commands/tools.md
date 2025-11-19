# Agent-Tools Automation

Help user with automation task using agent-tools discovery API. Do NOT read registry or reference files upfront.

## API

```javascript
import { getIndex, getJobsByCategory, executeJob } from './agent-tools/core/discovery.js';
```

**getIndex()** - Returns `{categories: {instagram: {jobs: 2}, media: {workflows: 1}, ...}}`
**getJobsByCategory(category)** - Returns `{tools: [{id, description, params, example}, ...]}`
**executeJob(toolId, params)** - Executes with automatic monitoring, returns result

## Workflow

1. Parse user request to identify category: instagram, media, page, browser, file, storage
2. If category unclear, call getIndex() to see overview
3. Call getJobsByCategory(category) to discover tools
4. Match tool by description
5. Extract parameters from user request (check tool.params for required fields)
6. Call executeJob(toolId, params)

## Monitoring

Automatic, no polling needed. User sees real-time progress every 15s during execution. Report output file location on completion.

## Example

```javascript
const tools = getJobsByCategory('instagram');
// Pick tool with matching description
await executeJob('instagram:bulk-content-extraction', {
  username: 'blankschoolbr',
  startDate: '2025-11-01',
  endDate: '2025-11-30'
});
```

## Reference (if needed)

- agent-tools/HOW-TO-USE.md - Detailed examples
- agent-tools/USAGE-GUIDE.md - Technical details

---

Proceed with user's request using this pattern.
