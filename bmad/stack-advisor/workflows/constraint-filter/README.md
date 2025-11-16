# Constraint Filter

Interactive technology filtering workflow for Stack Advisor module.

## Purpose

Eliminates incompatible technology options based on hard project constraints before detailed research begins. This workflow helps Scout focus research efforts on viable choices only, saving time and avoiding recommendations that won't work for the specific project context.

## How to Invoke

**Direct invocation:**
```
/constraint-filter
```
or
```
workflow constraint-filter
```

**Via Scout (Tech Research):**
```
agent scout
*filter
```

## Session Flow

1. **Load Context** - Review intake results if available
2. **Identify Hard Constraints** - Collaborative discovery of non-negotiable requirements
3. **Apply Category Filters** - Systematically eliminate incompatible options by technology category
4. **Handle Gray Areas** - Discuss borderline technologies and make collaborative decisions
5. **Document Results** - Create comprehensive filtering summary
6. **Plan Next Steps** - Guide user on natural next actions

## Constraint Categories

**Team Constraints:**
- Programming languages known/unknown
- Experience levels and skill gaps
- Team size and capacity

**Existing Technology:**
- Required integrations
- Legacy system compatibility
- Infrastructure dependencies

**Budget:**
- Licensing restrictions
- Hosting cost limits
- Third-party service budgets

**Timeline:**
- Production deadiness
- Learning curve tolerance
- Maintenance considerations

**Technical Requirements:**
- Performance needs
- Security/compliance (GDPR, HIPAA, etc.)
- Deployment environment
- Platform compatibility
- Scalability expectations

## Expected Duration

20-40 minutes depending on project complexity and number of constraint categories

## Output

This session produces a filtering summary documenting:
- All hard constraints applied
- Technologies eliminated by category with rationale
- Viable technologies remaining for research
- Gray area items needing deeper investigation
- Recommended next steps

Optionally saves session notes to `output/stack-advisor/constraint-filter-[date].md`.

## Interaction Style

- **Intent-based**: Adaptive, conversational constraint discovery
- **High interactivity**: Collaborative elimination with validation at each step
- **SMB-focused**: Focuses on mainstream options relevant to small/medium business scale

## Next Steps

After constraint filtering, typical next workflows:
- **Detailed Research** (`*research` via Scout) - Research remaining viable options
- **Materials Selection** (`*materials` via Scout) - Select specific frameworks/libraries
- **Architecture Design** (`*blueprint` via Jordan) - Design system architecture
- **Validation** (`*validate` via Sam) - Validate technology choices

## Notes

- Works best after smart-intake workflow (has context on constraints)
- Can run standalone with manual constraint gathering if needed
- Designed for SMB projects (not enterprise scale)
- Focuses on mainstream, production-ready technologies
- Emphasizes elimination rationale for transparency
