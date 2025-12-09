---
description: "Merge worktree branch into master"
argument-hint: "[branch-name]"
allowed-tools: ["Bash", "AskUserQuestion"]
model: "haiku"
---

# Merge Worktree Branch

**Arguments:** `$ARGUMENTS`

Safely merges a worktree branch into master: validates branch exists, updates master, previews commits, confirms merge, pushes to remote.

## Variables
BRANCH_NAME: `$ARGUMENTS`
SCRIPT_PATH: `.claude/skills/managing-worktrees/scripts/merge-worktree.sh`

## Instructions
- **IMPORTANT**: Always confirm with AskUserQuestion before merging (because merging to master is irreversible)
- **IMPORTANT**: Update master before merging (because stale master causes merge conflicts)
- **IMPORTANT**: Present script output directly to user (because it contains success report and next steps)

## Context Boundaries

<never_read>
- Script source code
- Full git log history
</never_read>

<use_instead>
- `git log --oneline` for commit preview
- Script execution for merge operations
</use_instead>

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Validate Input

<decision_tree>
If $ARGUMENTS is empty:
  → Show error: "Usage: /merge-worktree <branch-name>"
  → Suggest: "/list-worktrees to see available branches"
  → STOP

If $ARGUMENTS is provided:
  → Proceed to Step 2
</decision_tree>

### 2. Check Branch Exists

```bash
git show-ref --verify --quiet refs/heads/$ARGUMENTS && echo "EXISTS" || echo "NOT_FOUND"
```

<decision_tree>
If EXISTS:
  → Proceed to Step 3

If NOT_FOUND:
  → Show error: "Branch '$ARGUMENTS' not found"
  → Run `git branch -a` to show available
  → STOP
</decision_tree>

### 3. Find Main Repository

```bash
git worktree list | grep "\[master\]" | awk '{print $1}'
```

<decision_tree>
If empty:
  → Show error: "Could not find main repository with master branch"
  → STOP

If returns path:
  → Save MAIN_REPO path
  → Proceed to Step 4
</decision_tree>

### 4. Update Master and Preview

```bash
git -C "$MAIN_REPO" pull origin master && git log master..$ARGUMENTS --oneline
```

<decision_tree>
If 0 commits:
  → Show: "Branch '$ARGUMENTS' is already fully merged into master"
  → STOP

If > 0 commits:
  → Proceed to Step 5
</decision_tree>

### 5. Confirm Merge

Use AskUserQuestion:
```
question: "Merge '$ARGUMENTS' into master and push?"
header: "Merge"
multiSelect: false
options:
  - label: "Yes, merge now", description: "Merge [X] commits into master and push"
  - label: "No, cancel", description: "Keep branches separate"
```

<decision_tree>
If "No, cancel":
  → Show: "Operation cancelled. No changes made."
  → STOP

If "Yes, merge now":
  → Proceed to Step 6
</decision_tree>

### 6. Execute Merge

```bash
bash $SCRIPT_PATH "$ARGUMENTS"
```

### 7. Report

Present script output directly. The script handles:
- Merge with --no-ff
- Push to remote
- Success report with next steps
