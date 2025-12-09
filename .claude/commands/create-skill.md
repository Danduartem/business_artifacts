---
description: "Create new skill from template"
argument-hint: "[skill-name]"
allowed-tools: ["AskUserQuestion", "Bash", "Read", "Write"]
model: "sonnet"
---

# Create New Skill

**Arguments:** `$ARGUMENTS`

## Variables
SKILL_NAME: `$ARGUMENTS`
TEMPLATES_DIR: `.claude/_templates/_skills`
SKILLS_DIR: `.claude/skills`

## Instructions
- **IMPORTANT**: Validate skill name is lowercase with hyphens only (because uppercase or spaces break invocation)
- **IMPORTANT**: Skill directory should be `$ARGUMENTS/` in `.claude/skills/` (because skills require directory structure)
- **IMPORTANT**: After creating, remind user to replace ALL_CAPS placeholders (because the skill won't work with placeholder text)
- Use AskUserQuestion tool (not direct prompts) to select template type

## Context Boundaries

<never_read>
- Full template contents before selection
- Other existing skills
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
  → Show error: "Usage: /create-skill skill-name"

If invalid format:
  → Show error: "Skill name must be lowercase with hyphens (e.g., my-skill)"
</decision_tree>

### 2. Select Template

Use AskUserQuestion:
```
question: "Which template type?"
options:
  - SKILL-SIMPLE.md - Knowledge-based skill (no scripts)
  - SKILL-JS.md - JavaScript/Node.js skill with scripts
  - SKILL-PY.md - Python/UV skill with scripts
```

### 3. Create Skill Structure

```bash
mkdir -p $SKILLS_DIR/$ARGUMENTS
cp $TEMPLATES_DIR/<selected_template> $SKILLS_DIR/$ARGUMENTS/SKILL.md
```

<decision_tree>
If SKILL-SIMPLE.md selected:
  → Proceed to Step 4

If SKILL-JS.md or SKILL-PY.md selected:
  → Create scripts directory: `mkdir -p $SKILLS_DIR/$ARGUMENTS/scripts`
  → Remind about script templates in `$TEMPLATES_DIR/`
  → For JS: Remind about creating package.json
  → For PY: Remind about PEP 723 inline dependencies
</decision_tree>

### 4. Report

Read and show the created SKILL.md, then output:
- Skill location: `.claude/skills/$ARGUMENTS/`
- Remind to replace ALL_CAPS placeholders
- Reference `.claude/_templates/_skills/README.md` for guidance
- For simple skills: Suggest testing by invoking relevant task
- For script-based: Remind to create/test scripts with `--help` flag
