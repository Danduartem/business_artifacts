---
description: "Push current branch with confirmation"
model: "haiku"
allowed-tools: ["Bash", "AskUserQuestion"]
---

# Safe Push

## Instructions
- **IMPORTANT**: Always use AskUserQuestion before pushing (because pushing is irreversible)
- **IMPORTANT**: Never force push to main/master without explicit confirmation (because it can destroy team history)
- Set up tracking (-u) automatically for new branches

## Constraints
- Never push to main/master directly without confirmation
- Avoid pushing if there are uncommitted changes

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Check Status

```bash
git status -s && git branch --show-current
```

### 2. Show Unpushed Commits

```bash
git log @{u}.. --oneline 2>/dev/null || echo "No upstream set"
```

### 3. Confirm Push

Use AskUserQuestion to confirm push with commit list.

### 4. Execute Push

```bash
git push -u origin HEAD
```

### 5. Report

```bash
git status -s
```
