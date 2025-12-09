---
description: "Create atomic commits with optimization"
model: "haiku"
allowed-tools: ["Bash", "AskUserQuestion"]
---

# Atomic Commit Workflow

## Instructions
- **IMPORTANT**: Never commit secrets (.env, credentials, etc.) (because they can leak credentials to version history)
- **IMPORTANT**: Never skip hooks or force push to main without confirmation (because these are destructive actions)
- **IMPORTANT**: If commit fails, stop immediately and show error (to prevent partial/broken commits)
- Use short format commands (git status -s) for token efficiency
- Chain operations with `&&` to reduce verification steps
- Only show status at start and end, not after each commit

## Constraints
- Never amend commits not authored by you
- Avoid staging unrelated files in the same commit
- Never force push without explicit user approval

## Trigger
Execute this workflow immediately upon invocation. Only pause for user input at Step 3 if multiple commit groups need approval.

## Workflow

### 1. Analyze Changes

```bash
git status -s && git diff --stat --stat-width=80 | head -n 10 && git log -3 --oneline
```

### 2. Group Logically

Break changes into atomic commits by feature, change type, or module. Each commit must be complete, independent, and testable.

<decision_tree>
If 1 obvious commit:
  → Skip to Step 4 (commit directly)

If 2+ logical groups:
  → Proceed to Step 3
</decision_tree>

### 3. Present Plan

Show proposed commit groupings with files. Use AskUserQuestion to approve/adjust.

### 4. Process Sequentially

For each commit:
```bash
git reset && git add <files> && git commit -m "$(cat <<'EOF'
subject line

body
EOF
)"
```

### 5. Report

```bash
git log -<n> --oneline && git status -s
```
