---
description: "List all git worktrees with their status"
allowed-tools: ["Bash"]
model: "haiku"
---

# List Git Worktrees

Provides comprehensive overview of all worktrees in the project with locations, branches, commits, directory status, and management commands.

## Variables
SCRIPT_PATH: `.claude/skills/managing-worktrees/scripts/list-worktrees.sh`

## Instructions
- **IMPORTANT**: Present script output directly to user (because it contains status indicators and next steps)

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Execute Script

```bash
bash $SCRIPT_PATH
```

### 2. Report

Present output directly. The script:
- Gathers all worktree and repository information atomically
- Handles both single repository and multiple worktrees cases
- Detects and reports orphaned worktrees
- Outputs formatted summary with status indicators
- Works reliably across bash/zsh without complex syntax
