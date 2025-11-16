# Executive Summary Generator

High-level executive summary creation from technical documentation for stakeholder approval.

## Purpose

Distills complex technology stack decisions into clear, business-focused summaries that executives and non-technical stakeholders can quickly understand and act on.

## How to Invoke

**Direct invocation:**
```
/executive-summary
```
or
```
workflow executive-summary
```

**Via Casey (Documentation Specialist):**
```
agent casey
Can you create an executive summary from the specification?
```

## What This Creates

A **4-8 page executive summary** containing:

- Project overview (high-level)
- Technology stack summary (one-liners per layer)
- Strategic rationale (business reasons for choices)
- Key benefits (3 top benefits for business)
- Investment overview (costs and timeline)
- Risk assessment (business-level risks)
- Team requirements (skills, structure, hiring)
- Implementation approach (3 phases)
- Alternatives considered (due diligence)
- Success criteria (measurable outcomes)
- Decision/approval request (what's needed)
- Next steps (immediate, short, medium term)

## Target Audience

**Perfect for:**
- C-suite executives (CEO, CFO, CTO)
- Board of directors
- Investors
- Business unit leaders
- Project sponsors
- Anyone who needs strategic overview without technical depth

**NOT for:**
- Technical team members (use full specification instead)
- Developers (use architecture docs)
- DevOps engineers (use deployment docs)

## When to Use

### Use This When:

- **Seeking approval** from executives or board
- **Presenting to investors** for funding
- **Briefing stakeholders** on technology decisions
- **RFP responses** requiring executive summary
- **Business case** needs high-level technology overview
- **After completing** full stack advisory (distill findings)

### Skip This If:

- **Technical team** is the audience (use full spec)
- **No approval needed** (just building)
- **Very simple project** (summary would be overkill)
- **No existing documentation** (create spec first)

## Expected Duration

**20-40 minutes** depending on:
- Availability of source documentation
- Complexity of technology decisions
- Number of refinements needed

## Session Flow

1. **Load source documentation** (spec, architecture, etc.)
2. **Identify stakeholder audience** (tailor language)
3. **Extract project overview** (2-3 sentences)
4. **Summarize tech stack** (one-liner per layer)
5. **Articulate rationale** (business reasons)
6. **Highlight benefits** (3 key benefits)
7. **Document investment** (costs, timeline)
8. **Assess risks** (executive-level)
9. **Define team needs** (skills, structure)
10. **Outline implementation** (3 phases)
11. **Note alternatives** (due diligence)
12. **Set success criteria** (measurable)
13. **Request decision** (what approval needed)
14. **Define next steps** (actionable items)
15. **Link appendix** (full documentation)
16. **Finalize metadata** (name, date, contact)
17. **Generate & review**
18. **Finalize**

## Input Sources

**Best with existing:**
- Technology Stack Specification (from spec-generator)
- Architecture Blueprint (from blueprint-architect)
- Comparison Matrix (from comparison-matrix)
- Requirements Document (from smart-intake)

**Can work with:**
- Conversational input (if no docs exist)
- Partial documentation
- Notes and bullet points

## Key Features

**Business-Focused:**
- Translates technical decisions to business value
- Emphasizes ROI, risk, timeline
- Avoids jargon and technical minutiae

**Stakeholder-Ready:**
- Professional presentation quality
- Concise (4-8 pages typical)
- Scannable with headers, tables, bullets

**Decision-Oriented:**
- Clear approval request
- Actionable next steps
- Risk mitigation strategies

**Honest and Balanced:**
- Acknowledges trade-offs
- Presents alternatives considered
- Realistic about risks and costs

## Output Quality

**High-quality summary has:**
- Non-technical stakeholder can understand it
- All costs and timelines are transparent
- Risks are honestly addressed with mitigation
- Benefits are business-focused, not technical
- Decision needed is explicit
- Next steps are concrete and actionable
- Professional presentation

## Best Practices

**Before Starting:**
- Gather all source documentation
- Know your stakeholder audience
- Understand what approval/decision is needed

**During Creation:**
- Focus on business value, not technical features
- Use clear, jargon-free language
- Be honest about risks (with mitigation)
- Keep it concise (4-8 pages)

**After Generation:**
- Review with checklist
- Test on non-technical person
- Prepare for stakeholder questions
- Print to check formatting

## Comparison to Full Specification

| Aspect | Executive Summary | Full Specification |
|--------|-------------------|-------------------|
| **Audience** | Executives, non-technical | Technical team |
| **Length** | 4-8 pages | 30-50 pages |
| **Focus** | Business value | Technical details |
| **Language** | Business-focused | Technical depth |
| **Purpose** | Approval, decision | Implementation guide |
| **Details** | High-level | Comprehensive |

## Common Use Cases

**Startup Seeking Funding:**
- Investor pitch deck appendix
- Board approval for budget
- Strategic planning documentation

**Corporate Project:**
- Executive steering committee approval
- Budget allocation justification
- Cross-department stakeholder briefing

**Agency Client Deliverable:**
- Client presentation material
- Project kickoff documentation
- Proposal response

**Internal Business Case:**
- Replatforming justification
- Technology modernization approval
- Strategic initiative documentation

## Follow-Up Options

After creating executive summary:

**For Stakeholder Meeting:**
- Create presentation deck (slides from summary)
- Prepare FAQ for common questions
- Develop talking points

**For Approval Process:**
- Detailed cost analysis (Morgan)
- Risk deep-dive (Sam)
- Comparison alternatives (Dana)

**For Implementation:**
- Reference full technical specification
- Use architecture diagrams
- Follow migration plan

## Success Indicators

**Executive summary is successful when:**
- Stakeholders approve technology decisions
- No confusion or repeated questions
- Approval obtained efficiently
- Confidence in recommendations demonstrated
- Technical team can proceed with implementation

## Notes

- **Complement to full spec** - not a replacement
- **Business language** - value over features
- **Decision enabler** - makes approval easy
- **Professional quality** - represents your expertise
- **Honest presentation** - builds trust with stakeholders

This workflow transforms technical documentation into business-focused summaries that enable fast, confident stakeholder approval.
