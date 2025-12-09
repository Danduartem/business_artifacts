---
description: "Create new slash command from template"
argument-hint: "[command-name]"
allowed-tools: ["AskUserQuestion", "Bash", "Read", "Write"]
model: "sonnet"
---

# Create New Slash Command

**Arguments:** `$ARGUMENTS`

## Variables
COMMAND_NAME: `$ARGUMENTS`
TEMPLATES_DIR: `.claude/_templates/_commands`
COMMANDS_DIR: `.claude/commands`

## Instructions
- **IMPORTANT**: Validate command name is lowercase with hyphens only (because uppercase or spaces break invocation)
- **IMPORTANT**: After creating, remind user to replace ALL_CAPS placeholders (because the command won't work with placeholder text)
- Use AskUserQuestion tool (not direct prompts) to select template type

## Context Boundaries

<never_read>
- Full template contents before selection
- Other existing commands
</never_read>

<use_instead>
- Template names with brief descriptions
- Copy command to duplicate template
</use_instead>

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Validate Input

```bash
# Verify $ARGUMENTS is lowercase with hyphens only
echo "$ARGUMENTS" | grep -E '^[a-z][a-z0-9-]*$'
```

<decision_tree>
If valid:
  → Proceed to Step 2

If empty:
  → Show error: "Usage: /create-command command-name"

If invalid format:
  → Show error: "Command name must be lowercase with hyphens (e.g., my-command)"
</decision_tree>

### 2. Select Template

Use AskUserQuestion:
```
question: "Which template type?"
options:
  - template_lean.md - Ultra-minimal (read file → output)
  - template_simple.md - Fixed workflow, no user input
  - template_parameterized.md - Takes dynamic arguments with conditional logic
  - template_agent.md - Spawns parallel agents via Task tool
  - template_orchestration.md - Multi-phase workflow with gates and recovery
```

### 3. Create Command

```bash
cp $TEMPLATES_DIR/<selected_template> $COMMANDS_DIR/$ARGUMENTS.md
```

### 4. Report

Read and show the created file, then output:
- File location: `.claude/commands/$ARGUMENTS.md`
- Remind to replace ALL_CAPS placeholders
- Reference `.claude/_templates/_commands/README.md` for guidance
- Suggest: `/clear` then `/$ARGUMENTS` to test
