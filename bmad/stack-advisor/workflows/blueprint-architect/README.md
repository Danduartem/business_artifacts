# Blueprint Architect

Comprehensive system architecture design workflow for Stack Advisor module.

## Purpose

Creates professional architecture documentation including component design, data architecture, API design, deployment architecture, and visual Mermaid diagrams. Provides development teams with clear, implementable blueprints that are right-sized for SMB scale.

## How to Invoke

**Direct invocation:**
```
/blueprint-architect
```
or
```
workflow blueprint-architect
```

**Via Jordan (Solutions Architect):**
```
agent jordan
*blueprint
```

## Session Flow

1. **Initialize & Load Context** - Review tech selections and requirements
2. **Create Executive Summary** - High-level architecture approach and key decisions
3. **Document Technology Stack** - Frontend, backend, database, infrastructure details
4. **Design Component Architecture** - Major components, responsibilities, interactions
5. **Design Data Architecture** - Data models, flow, storage strategy
6. **Design API Architecture** - Endpoints, auth, versioning
7. **Document Integration Points** - External services, third-party APIs, webhooks
8. **Define Security Architecture** - Security layers, auth strategy, data protection
9. **Address Scalability & Performance** - Scaling strategy, caching, performance
10. **Design Deployment Architecture** - Hosting, environments, CI/CD pipeline
11. **Create Architecture Diagrams** - System, data flow, deployment, component diagrams
12. **Document Development Considerations** - Workflow, testing, code organization
13. **Define Monitoring & Observability** - Monitoring, logging, error tracking
14. **Identify Risks & Mitigation** - Technical risks, scalability risks, mitigation strategies
15. **Plan Future Considerations** - Phase 2, scalability path, technical debt prevention
16. **Complete Appendix** - Glossary, references, ADRs
17. **Review & Validate** - Final review and next steps

## Architecture Sections

### Core Architecture
- System overview and key decisions
- Component architecture and responsibilities
- Data architecture and storage
- API design and endpoints
- Integration points

### Non-Functional Requirements
- Security architecture
- Scalability and performance
- Monitoring and observability

### Deployment & Operations
- Deployment architecture
- Environment strategy
- CI/CD pipeline
- Development workflow

### Risk & Planning
- Technical risks and mitigation
- Scalability path
- Future enhancements
- Technical debt prevention

### Visual Diagrams
- System architecture diagram (Mermaid)
- Data flow diagram (Mermaid)
- Deployment architecture diagram (Mermaid)
- Component diagram (Mermaid)

## Expected Duration

60-120 minutes depending on:
- Project complexity
- Level of architectural detail needed
- Number of integrations
- Team architectural experience

## Output

**Architecture Blueprint Document** (`architecture-blueprint-[date].md`):
- Complete system architecture documentation
- 4 Mermaid diagrams (system, data flow, deployment, components)
- Technology stack with rationale
- Security, scalability, and deployment strategies
- Risk assessment and mitigation
- Development guidelines
- Architecture Decision Records (ADRs)
- Ready for development team handoff

## Interaction Style

- **Intent-based**: Collaborative architectural design
- **High interactivity**: Facilitated design decisions with architectural guidance
- **SMB-focused**: Right-sized architecture (no enterprise over-engineering)
- **Practical**: Implementation-ready guidance
- **Visual**: Comprehensive Mermaid diagrams

## Best Practices

- **After materials-lab**: Works best with selected technology stack
- **Collaborative design**: Jordan's architectural thinking + user's project knowledge
- **Right-sized complexity**: Appropriate for SMB scale
- **Visual communication**: Diagrams for clarity
- **Decision documentation**: ADRs capture rationale
- **Risk-aware**: Identifies and mitigates architectural risks
- **Future-ready**: Plans scalability path without over-engineering today

## Architecture Principles

**SMB-Appropriate:**
- Avoids enterprise complexity
- Focuses on maintainability
- Cost-effective scaling
- Practical over theoretical

**Production-Ready:**
- Security by design
- Monitoring and observability
- Error handling strategies
- Deployment and rollback plans

**Team-Friendly:**
- Clear component boundaries
- Documented development workflow
- Testing strategy
- Code organization guidelines

## Next Steps

After architecture design, typical next workflows:
- **Production Validation** (`*validate` via Sam) - Validate architecture for production-readiness
- **Comparison Analysis** (`*compare` via Dana) - Compare alternative architectural approaches
- **Migration Planning** (`*migrate` via Riley) - Plan migration from current to target architecture
- **Documentation Refinement** (`*review` via Casey) - Polish and simplify architecture documentation
- **Final Deliverables** (`*generate` via Casey) - Compile into client-ready tech stack document

## Diagram Examples

**System Architecture Diagram** - Shows major components, data flow, user interactions

**Data Flow Diagram** - Illustrates how data moves through the system

**Deployment Architecture Diagram** - Depicts hosting infrastructure, network boundaries, external services

**Component Diagram** - Details internal component structure and communication

All diagrams use Mermaid syntax for easy rendering and version control.

## Notes

- Integrates with Scout's knowledge base for technology reference
- Emphasizes collaborative design (not top-down prescription)
- Includes validation checklist for quality assurance
- Suitable for greenfield projects and modernization initiatives
- Focuses on mainstream, proven architectural patterns
- Designed for SMB scale (not enterprise or unicorn startup)
- Creates implementation-ready blueprint for development teams
