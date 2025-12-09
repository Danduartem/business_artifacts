---
description: "Create new agent using agent-builder"
argument-hint: "[optional: agent purpose/description]"
allowed-tools: ["Task", "AskUserQuestion"]
model: "sonnet"
---

# Create New Agent

**Arguments:** `$ARGUMENTS`

## Variables
AGENTS_DIR: `.claude/agents`
TEMPLATES_DIR: `.claude/_templates/_agents/`
TEMPLATES_README: `.claude/_templates/_agents/README.md`

## Instructions
- **IMPORTANT**: Gather context from conversation FIRST before invoking agent-builder (agents need complete information)
- **IMPORTANT**: Only invoke agent-builder when you have sufficient context
- Use AskUserQuestion if context is insufficient, then Task tool for agent-builder

## Context Boundaries

<never_read>
- Existing agent implementations (agent-builder will handle)
- Full template contents
</never_read>

<use_instead>
- Conversation context for requirements
- AskUserQuestion for clarification
</use_instead>

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Analyze Conversation Context

**Required Information:**
- What problem should the agent solve?
- What specific tasks will it handle?
- What domain or expertise does it need?

**Optional:** Automation preference, tools needed, model complexity, interaction style

### 2. Determine Scope

<decision_tree>
Sufficient context (clear problem + task + domain):
  → Proceed to Step 3
  → Example: "Create an agent that debugs broken scripts when APIs change"

Insufficient context (vague request):
  → Use AskUserQuestion: "What problem should this agent solve?"
  → Then proceed with gathered context

Partial context (missing specifics):
  → Use AskUserQuestion for clarification
  → Example: "I need an agent for testing" → ask what kind of testing
</decision_tree>

### 3. Invoke Agent-Builder

```
Task(subagent_type='agent-builder'):
"Create an agent with these requirements:

Problem to solve: [from context]
Specific tasks: [from context]
Domain/expertise: [from context]
Additional preferences: [if any]

Return the created agent configuration."
```

### 4. Synthesize Results

Report to user:
- Agent name and location
- What the agent does
- How to invoke it

### 5. Offer Next Steps

Use AskUserQuestion:
- "Test the agent now?"
- "Customize the agent further?"
- "Done for now"
