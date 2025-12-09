---
description: "Interactive decision-making with multi-choice questions"
allowed-tools: ["AskUserQuestion"]
model: "haiku"
---

# Interactive Multi-Choice Mode

## Variables
NUM_OPTIONS: `5`
LAST_OPTION: `Custom/Other/Combination`

## Instructions
- **IMPORTANT**: Use AskUserQuestion tool with `multiSelect: true` (because users need to select multiple options)
- **IMPORTANT**: Exactly 5 options per question, reserve last for "Custom/Other" (because users need escape hatch)
- Keep options concise (1-2 lines), action-oriented
- Tone: Efficient, collaborative, direct - no over-explanation between questions

## Trigger
Execute this workflow immediately upon invocation.

## Workflow

### 1. Analyze Request
Break down request into decision points.

### 2. Ask Questions
For each decision: Ask question with 5 options using AskUserQuestion.

### 3. Process Answers
Wait for selection before next question. Use previous answers to inform next options (progressive).

### 4. Synthesize
Briefly acknowledge choices, maintain momentum. Synthesize all selections into actionable output.
