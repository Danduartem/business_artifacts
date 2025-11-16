# Spec Generator

Comprehensive technology stack specification compilation workflow for Stack Advisor module.

## Purpose

Compiles all Stack Advisor outputs into a single, professional technology stack specification document. Brings together requirements, technology selections, architecture, comparisons, and implementation plans into a cohesive deliverable ready for stakeholders, development teams, or clients.

## How to Invoke

**Direct invocation:**
```
/spec-generator
```
or
```
workflow spec-generator
```

**Via Casey (Documentation Specialist):**
```
agent casey
*generate
```

## Session Flow

1. **Initialize & Load All Inputs** - Load all available Stack Advisor outputs
2. **Create Executive Summary** - Compelling 3-5 paragraph overview
3. **Document Project Overview** - Business context, goals, success criteria, scale
4. **Document Complete Technology Stack** - All layers with versions and rationale
5. **Compile Architecture Overview** - High-level architecture with system diagram
6. **Explain Technology Rationale** - Why each technology was chosen
7. **Document Alternatives Considered** - What wasn't chosen and why
8. **Create Implementation Roadmap** - Phased approach with timeline
9. **Compile Risk Assessment** - Technical and business risks with mitigation
10. **Analyze Costs** - Infrastructure, services, development, maintenance, TCO
11. **Document Team & Resources** - Skills, structure, training, hiring needs
12. **Document Security & Compliance** - Architecture, requirements, data protection
13. **Document Performance & Scalability** - Expectations, strategy, monitoring
14. **Document Development & Operations** - Workflow, testing, deployment, CI/CD
15. **Document Migration Considerations** - Approach, phases, data, rollback (if applicable)
16. **Define Next Steps** - Immediate actions, kickoff, decisions, approvals
17. **Complete Appendix** - Glossary, references, ADRs, contacts
18. **Review & Polish** - Final review, polish, and stakeholder readiness check

## Document Sections

### Core Sections
- Executive Summary
- Project Overview
- Technology Stack (all layers)
- Architecture Overview
- Technology Rationale
- Alternatives Considered
- Implementation Roadmap

### Analysis Sections
- Risk Assessment
- Cost Analysis
- Team & Resources

### Technical Sections
- Security & Compliance
- Performance & Scalability
- Development & Operations
- Migration Considerations (if applicable)

### Action Sections
- Next Steps
- Appendix (glossary, references, contacts)

## Expected Duration

90-150 minutes depending on:
- Amount of available input documents
- Number of technology layers
- Complexity of architecture
- Migration requirements
- Level of detail needed

## Output

**Technology Stack Specification Document** (`tech-stack-specification-[date].md`):
- Comprehensive 30-50 page specification document
- Executive summary for busy stakeholders
- Complete technology stack with versions and ecosystem
- Architecture overview with Mermaid diagrams
- Detailed rationale for every technology choice
- Alternatives analysis showing due diligence
- Implementation roadmap with phases and timeline
- Risk assessment with mitigation strategies
- Cost analysis with TCO projections
- Team and resource requirements
- Security, performance, and scalability coverage
- Development and operations practices
- Migration plan (if applicable)
- Next steps and approval requirements
- Comprehensive appendix

## Interaction Style

- **Intent-based**: Intelligent compilation from available sources
- **High interactivity**: Collaborative refinement of compiled content
- **Synthesis-focused**: Brings together disparate outputs into cohesive narrative
- **Professional**: Client-ready, stakeholder-ready quality
- **Accessible**: Technical content explained clearly for varied audiences

## Key Features

**Intelligent Compilation:**
- Automatically discovers all Stack Advisor outputs
- Extracts key information from each source
- Synthesizes information into cohesive narrative
- Eliminates duplication
- Fills gaps through collaboration with user

**Multi-Audience Accessibility:**
- Executive summary for leadership
- Technical details for development team
- Implementation guidance for project managers
- Cost analysis for budget holders
- Risk assessment for stakeholders

**Comprehensive Coverage:**
- All technology layers documented
- Both what and why explained
- Technical and business considerations
- Implementation and operational guidance
- Risks, costs, and resources planned

**Professional Quality:**
- Consistent voice and terminology
- Clear, concise language
- Logical flow
- Professional formatting
- Ready for external presentation

## Input Sources

**Automatically Loads (if available):**
- Intake session results
- Constraint filter results
- Technology selections document
- Architecture blueprint
- Comparison matrix
- Migration plan

**Works Best When:**
- Multiple Stack Advisor workflows have been completed
- Technology selections are finalized
- Architecture is designed
- Implementation plan exists

**Can Still Generate With:**
- Minimal inputs (will have gaps)
- User-provided information to fill gaps
- Manual input during generation

## Use Cases

**Stakeholder Approval:**
- Present comprehensive spec for executive approval
- Document decisions and rationale
- Show due diligence in technology selection
- Justify budget and timeline

**Development Team Guidance:**
- Provide implementation roadmap
- Document technology choices and ecosystem
- Define development practices
- Specify testing and deployment approaches

**Client Deliverable:**
- Professional documentation for agency clients
- Shows thorough analysis and planning
- Builds confidence in recommendations
- Ready for client presentation

**RFP Response:**
- Document proposed technology stack
- Show technical expertise
- Provide implementation approach
- Include cost and timeline estimates

**Team Onboarding:**
- Comprehensive reference for new team members
- Explains technology decisions
- Documents practices and workflows
- Provides learning resources

## Best Practices

- **Generate last**: Run after other Stack Advisor workflows for comprehensive spec
- **Review sources**: Ensure input documents are accurate before compilation
- **Tailor audience**: Adjust technical level for primary audience
- **Be honest**: Include risks and trade-offs transparently
- **Update regularly**: Refresh spec as decisions evolve
- **Use as baseline**: Treat as living document that evolves with project
- **Share early**: Get stakeholder feedback before finalization
- **Link sources**: Reference detailed documents in appendix

## Quality Indicators

**High-Quality Specification:**
- Executives can understand and approve from executive summary
- Technical team can start implementation from document
- Stakeholders find all concerns addressed
- Clients would consider this professional and thorough
- No obvious gaps or unanswered questions
- Risks and costs are realistic
- Implementation plan is actionable
- Document inspires confidence

## Next Steps

After specification generation:
- **Stakeholder Review** - Present to stakeholders for feedback
- **Team Review** - Share with development team for validation
- **Client Presentation** - Present to clients (if agency work)
- **Refinement** - Incorporate feedback and update
- **Approval** - Obtain necessary approvals
- **Implementation** - Use as guide for project kickoff
- **Living Document** - Update as project evolves

## Notes

- Represents culmination of Stack Advisor process
- Synthesizes work from all 7 agents
- Professional, client-ready quality
- Suitable for external and internal use
- Comprehensive but accessible
- Includes validation checklist for quality assurance
- Designed for SMB projects (appropriate scope and detail)
- Can be used as template for future projects
- Demonstrates technical due diligence
- Builds stakeholder confidence in technology decisions
