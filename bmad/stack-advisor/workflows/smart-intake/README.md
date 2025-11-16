# Smart Intake Session

Comprehensive requirements gathering workflow for Stack Advisor module.

## Purpose

This interactive session collects all information needed to provide tech stack recommendations:
- Business requirements and goals
- Current tech stack (if applicable)
- Scale expectations (realistic for SMB)
- Constraints (team, budget, timeline, technical)

## How to Invoke

**Direct invocation:**
```
/smart-intake
```
or
```
workflow smart-intake
```

**Via Alex (Requirements Analyst):**
```
agent alex
*intake
```

## Session Flow

1. **Introduction** - Welcome and process explanation
2. **Business Discovery** - What you're building and why
3. **Current Stack Analysis** - What exists now (or starting fresh)
4. **Scale Expectations** - Realistic user/traffic projections
5. **Constraints** - Team, budget, timeline, technical requirements
6. **Summary & Validation** - Review and confirm completeness

## Expected Duration

15-30 minutes depending on project complexity

## Output

This session stores gathered requirements in memory for the Stack Advisor team to use. Optionally saves session notes to `output/stack-advisor/intake-session-[date].md`.

## Interaction Style

- **Intent-based**: Adaptive, conversational requirements gathering
- **High interactivity**: Collaborative discovery with open-ended questions
- **SMB-focused**: Realistic scale expectations, no over-engineering

## Next Steps

After intake, you can:
- Work with individual Stack Advisor agents (Scout, Jordan, Sam, Dana, Casey, Riley)
- Run the full tech stack advisory workflow (when available)
- Refine requirements at any time by re-running this session

## Notes

- This is a standalone workflow (can be invoked directly)
- No template output (interactive session)
- Designed for SMB projects (not enterprise scale)
- Emphasizes clarity and realistic expectations
