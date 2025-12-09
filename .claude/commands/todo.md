---
description: "Approve plan and create tracked todos"
argument-hint: "[optional modifications]"
allowed-tools: ["TodoWrite", "AskUserQuestion"]
model: "haiku"
---

# Plan Approval & Execution

**Arguments:** `$ARGUMENTS`

Approve suggested plan with optional modifications.

## Variables
MODIFICATIONS: `$ARGUMENTS`
CONTEXT_WINDOW: `last 3 messages`

## Instructions
- **IMPORTANT**: Extract plan from LAST 3 messages only (because searching old messages wastes context)
- **IMPORTANT**: If no clear numbered plan exists, ask user to clarify (because ambiguous plans cause wrong todos)
- **IMPORTANT**: Use clear task descriptions with content + activeForm (because TodoWrite requires both)
- Set all tasks to pending except first one (in_progress)

## Context Boundaries

<never_read>
- Messages older than last 3
- Unrelated conversation context
</never_read>

<use_instead>
- Recent messages for plan extraction
- AskUserQuestion if plan unclear
</use_instead>

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Extract Plan

Parse previous 3 messages to find numbered plan/steps.

<decision_tree>
If clear numbered plan found:
  → Proceed to Step 2

If no clear plan:
  → Use AskUserQuestion: "I don't see a clear plan. What tasks should I track?"
  → STOP until clarified
</decision_tree>

### 2. Apply Modifications

<decision_tree>
If $ARGUMENTS is empty:
  → Use plan as-is

If $ARGUMENTS contains modifications:
  → "remove step X" → skip that step
  → "add [task] at end" → append task
  → "change step X to [new]" → modify description
</decision_tree>

### 3. Create Todos

Use TodoWrite with all tasks:
- All tasks set to `pending`
- First task set to `in_progress`

### 4. Begin Execution

Start working on the first task.

## Examples

```
/todo                                    # Approve as-is
/todo yes but remove step 3              # Skip step 3
/todo ok but add testing at the end      # Add extra step
/todo yes, change step 2 to use PostgreSQL  # Modify step
```
