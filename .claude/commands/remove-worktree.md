---
description: "Remove git worktree and optionally delete branch"
argument-hint: "[branch-name]"
allowed-tools: ["Bash", "AskUserQuestion"]
model: "haiku"
---

# Remove Git Worktree

**Arguments:** `$ARGUMENTS`

Safely removes git worktrees with proper cleanup: removes from git tracking, deletes directory, optionally deletes branch, cleans orphaned files, validates removal.

## Variables
BRANCH_NAME: `$ARGUMENTS`
SCRIPT_PATH: `.claude/skills/managing-worktrees/scripts/remove-worktree.sh`
STATUS_SCRIPT: `.claude/skills/managing-worktrees/scripts/check-worktree-status.sh`

## Instructions
- **IMPORTANT**: Always confirm before removing worktrees with uncommitted changes (because changes will be permanently lost)
- **IMPORTANT**: Ask user about branch deletion preference (because some may want to preserve branches)
- **IMPORTANT**: Present script output directly to user (because it contains cleanup report)

## Context Boundaries

<never_read>
- Script source code
- Worktree directory contents
</never_read>

<use_instead>
- Status script for change detection
- Removal script for cleanup operations
</use_instead>

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Validate Input

<decision_tree>
If $ARGUMENTS is empty:
  → Show error: "Usage: /remove-worktree <branch-name>"
  → Suggest: "/list-worktrees to see available worktrees"
  → STOP

If $ARGUMENTS is provided:
  → Proceed to Step 2
</decision_tree>

### 2. Check Worktree Exists

```bash
git worktree list | grep "\[$ARGUMENTS\]"
```

<decision_tree>
If returns match:
  → Proceed to Step 3

If empty/fails:
  → Show error: "Worktree '$ARGUMENTS' not found"
  → Run `git worktree list` to show available
  → STOP
</decision_tree>

### 3. Check for Uncommitted Changes

```bash
bash $STATUS_SCRIPT "$ARGUMENTS"
```

<decision_tree>
If CLEAN:
  → Skip to Step 5

If HAS_CHANGES:
  → Proceed to Step 4

If ERROR:
  → Show error message
  → STOP
</decision_tree>

### 4. Confirm Uncommitted Changes (If Needed)

Use AskUserQuestion:
```
question: "Worktree has uncommitted changes. Proceed with removal?"
header: "Uncommitted"
multiSelect: false
options:
  - label: "Proceed anyway", description: "Changes will be permanently lost"
  - label: "Cancel", description: "Abort and keep worktree"
```

<decision_tree>
If "Cancel":
  → Show: "Operation cancelled. Worktree preserved."
  → STOP

If "Proceed anyway":
  → Proceed to Step 5
</decision_tree>

### 5. Ask About Branch Deletion

Use AskUserQuestion:
```
question: "Delete the '$ARGUMENTS' branch after removing the worktree?"
header: "Branch"
multiSelect: false
options:
  - label: "Keep branch", description: "Preserve branch for future use (recommended)"
  - label: "Delete (safe)", description: "Only delete if merged into master"
  - label: "Force delete", description: "Delete even if unmerged"
```

Map choice: "Keep branch" → `keep`, "Delete (safe)" → `safe`, "Force delete" → `force`

### 6. Remove Worktree

```bash
bash $SCRIPT_PATH "$ARGUMENTS" {deletion_option}
```

### 7. Report

Present script output directly. The script handles:
- Remove from git tracking
- Delete worktree directory
- Branch deletion (based on choice)
- Orphan cleanup
- Final report
