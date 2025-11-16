# Materials Lab

Interactive framework and library selection workflow for Stack Advisor module.

## Purpose

Guides Scout through researching and selecting specific technologies from viable options. This workflow facilitates systematic comparison of alternatives, ensures currency and SMB-appropriateness, and produces documented selections with clear rationale.

## How to Invoke

**Direct invocation:**
```
/materials-lab
```
or
```
workflow materials-lab
```

**Via Scout (Tech Research):**
```
agent scout
*materials
```

## Session Flow

1. **Load Context** - Review constraint filter and intake results
2. **Research Current State** - Investigate latest versions, adoption, maturity for each viable option
3. **Present & Select by Category** - Compare options and facilitate selection for Frontend, Backend, Database, etc.
4. **Address Supporting Technologies** - Select libraries for state management, testing, UI components, etc.
5. **Validate Stack Compatibility** - Check integration compatibility and coherence
6. **Document Selections** - Create comprehensive technology selection summary
7. **Plan Next Steps** - Guide user on natural next actions in Stack Advisor process

## Selection Criteria

For each framework/library:
- **Currency**: Meets tech_currency_threshold (not outdated)
- **Adoption**: Active community, well-maintained
- **Maturity**: Battle-tested in production
- **SMB Fit**: Appropriate for small/medium business scale (no enterprise over-engineering)
- **Learning Curve**: Reasonable for team skill level
- **Documentation**: Quality docs and community support
- **Ecosystem**: Availability of plugins, tools, integrations
- **Team Fit**: Aligns with team skills and constraints

## Technology Categories

Typical categories for selection:
- **Frontend Framework** (React, Vue, Angular, Svelte, etc.)
- **Backend Framework/Language** (Node.js/Express, Python/Django, Ruby/Rails, etc.)
- **Database** (PostgreSQL, MySQL, MongoDB, etc.)
- **State Management** (Redux, Zustand, Pinia, etc.)
- **Authentication** (Auth0, Firebase Auth, Passport, etc.)
- **Payment Processing** (Stripe, PayPal, etc.)
- **Testing Frameworks** (Jest, Vitest, Playwright, etc.)
- **UI Component Libraries** (Material-UI, Chakra UI, Shadcn, etc.)
- **Build Tools** (Vite, Webpack, esbuild, etc.)
- **Infrastructure & DevOps**

## Expected Duration

45-90 minutes depending on:
- Number of technology categories
- Complexity of requirements
- Depth of research needed
- User familiarity with options

## Output

This session produces:

1. **Technology Selection Summary** (`tech-selections-[date].md`):
   - All framework/library selections with versions
   - Selection rationale for each choice
   - Trade-offs and decisions documented
   - Integration compatibility validation
   - SMB appropriateness assessment
   - Backup options if applicable
   - Recommended next steps

2. **Optional Detailed Session Notes** (`materials-selection-[date].md`):
   - Complete research findings
   - Comparison details
   - Discussion notes
   - Alternatives considered

## Interaction Style

- **Intent-based**: Adaptive research and facilitated decision-making
- **High interactivity**: Collaborative comparison and selection
- **Research-driven**: Real-time investigation of current framework states
- **SMB-focused**: Emphasis on mainstream, production-ready technologies
- **Currency-conscious**: Strict adherence to tech_currency_threshold

## Best Practices

- **After constraint-filter**: Works best with pre-filtered viable options
- **Current data**: Always checks latest versions and release dates
- **Team context**: Considers team skills when facilitating selections
- **Integration validation**: Checks compatibility between selections
- **Avoid over-engineering**: Steers toward SMB-appropriate choices
- **Document rationale**: Every selection has clear reasoning
- **Backup options**: Identifies alternatives if validation fails

## Next Steps

After materials selection, typical next workflows:
- **Architecture Design** (`*blueprint` via Jordan) - Design system architecture with selected technologies
- **Production Validation** (`*validate` via Sam) - Validate selections for production-readiness
- **Comparison Analysis** (`*compare` via Dana) - Deep dive on specific alternative comparisons
- **Migration Planning** (`*migrate` via Riley) - Plan migration from current to selected stack
- **Final Documentation** (`*generate` via Casey) - Compile everything into deliverables

## Notes

- Integrates with Scout's knowledge base for framework data
- Performs real-time currency checks against tech_currency_threshold
- Emphasizes collaborative decision-making (not prescriptive recommendations)
- Suitable for greenfield projects and modernization initiatives
- Focuses on mainstream, well-documented frameworks
- Avoids bleeding-edge or experimental technologies
- Designed for SMB scale (not enterprise complexity)
