---
description: "Create isolated git worktree for parallel development"
argument-hint: "[branch-name]"
allowed-tools: ["Bash", "AskUserQuestion"]
model: "haiku"
---

# Create Git Worktree

**Arguments:** `$ARGUMENTS`

Creates isolated git worktrees for parallel development without constant branch switching. Each worktree is a sibling directory with its own checked-out branch.

## Variables
BRANCH_NAME: `$ARGUMENTS`
SCRIPT_PATH: `.claude/skills/managing-worktrees/scripts/create-worktree.sh`
VALID_TYPES: `feature|fix|bugfix|hotfix|docs|refactor|test|chore|release`

## Instructions
- **IMPORTANT**: Validate branch name format before creating (because invalid names break git operations)
- **IMPORTANT**: If branch name is missing type prefix, ask user to select one (because 2025 convention requires type/description format)
- **IMPORTANT**: Present script output directly to user (because it contains success report and next steps)

## Context Boundaries

<never_read>
- Script source code
- Other worktree directories
</never_read>

<use_instead>
- Script execution with arguments
- Script output for status
</use_instead>

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Validate Input

<decision_tree>
If $ARGUMENTS is empty:
  → Show error: "Usage: /create-worktree <branch-name>"
  → Show format: "type/description-in-kebab-case (e.g., feature/user-auth)"
  → STOP

If $ARGUMENTS is provided:
  → Proceed to Step 2
</decision_tree>

### 2. Validate Branch Name Format

```bash
BRANCH="$ARGUMENTS" && if echo "$BRANCH" | grep -Eq '^(feature|fix|bugfix|hotfix|docs|refactor|test|chore|release)/[a-z0-9-]+$'; then echo "VALID_FORMAT"; else echo "INVALID_FORMAT"; fi
```

<decision_tree>
If VALID_FORMAT:
  → Skip to Step 4

If INVALID_FORMAT:
  → Check if missing prefix only:
    ```bash
    if echo "$ARGUMENTS" | grep -Eq '^[a-z0-9-]+$'; then echo "MISSING_PREFIX"; else echo "INVALID_CHARS"; fi
    ```

  If MISSING_PREFIX:
    → Proceed to Step 3

  If INVALID_CHARS:
    → Show error: "Invalid format. Use: type/description-in-kebab-case"
    → Show valid types: feature, fix, bugfix, hotfix, docs, refactor, test, chore, release
    → Show examples: "feature/user-auth ✓" vs "Feature/UserAuth ✗"
    → STOP
</decision_tree>

### 3. Ask for Branch Type (If Missing Prefix)

Use AskUserQuestion:
```
question: "What type of branch is '$ARGUMENTS'?"
header: "Branch Type"
multiSelect: false
options:
  - label: "feature", description: "New feature or enhancement"
  - label: "fix", description: "Bug fix"
  - label: "hotfix", description: "Critical production fix"
  - label: "docs", description: "Documentation changes"
  - label: "refactor", description: "Code refactoring"
  - label: "test", description: "Adding tests"
  - label: "chore", description: "Maintenance tasks"
```

Construct full branch name: `{selected_type}/$ARGUMENTS`

### 4. Create Worktree

```bash
bash $SCRIPT_PATH "{BRANCH_NAME}"
```

Use the constructed branch name from Step 3, or original $ARGUMENTS if it was already valid.

### 5. Report

Present script output directly to user. The script handles:
- Existing worktree/orphan directory checks
- Branch creation (new or existing)
- Directory setup (downloads/, outputs/)
- .env file copying
- Success report with next steps
