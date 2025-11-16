# Migration Plan

Comprehensive technology stack migration planning workflow for Stack Advisor module.

## Purpose

Creates detailed, phased migration plans from current to target technology stack. Emphasizes safety, incremental execution, and rollback strategies to minimize risk during transitions. Provides development teams with a roadmap for safe, successful migrations.

## How to Invoke

**Direct invocation:**
```
/migration-plan
```
or
```
workflow migration-plan
```

**Via Riley (Integration Strategist):**
```
agent riley
*migrate
```

## Session Flow

1. **Initialize & Understand Context** - Load target selections and current state
2. **Document Current & Target States** - Comprehensive documentation of before/after
3. **Assess Migration Risks** - Identify critical risks with likelihood/impact
4. **Design Migration Approach** - Choose pattern (big bang, incremental, parallel, feature flags)
5. **Detail Phase 1** - Complete phase planning with objectives, steps, testing, rollback
6. **Detail Phase 2** - Same comprehensive planning
7. **Detail Phase 3** - Same comprehensive planning
8. **Detail Additional Phases** - If 4+ phases needed
9. **Plan Data Migration** - Assess, approach, validation, rollback for data
10. **Define Testing Approach** - Environments, scenarios, performance, UAT
11. **Define Deployment Strategy** - Approach, patterns, checklist, monitoring
12. **Document Rollback Procedures** - Conditions, steps per phase, communication
13. **Plan Team & Resources** - Structure, roles, skills, training, external help
14. **Create Communication Plan** - Stakeholders, users, status reporting, incidents
15. **Create Timeline & Milestones** - Overall timeline, milestones, decision points, buffer
16. **Create Migration Diagram** - Visual Mermaid diagram of migration flow
17. **Plan Contingencies** - Technical failures, resource constraints, delays, scope changes
18. **Plan Post-Migration** - Stabilization, monitoring, cleanup, lessons learned, decommissioning
19. **Complete Appendix** - Glossary, references, master checklist, executive summary
20. **Review & Finalize** - Final review and next steps

## Migration Patterns

**Big Bang** - Switch everything at once
- Pros: Fast, clean cut, no dual maintenance
- Cons: High risk, hard to roll back
- Best for: Small systems, non-critical apps

**Incremental (Strangler Fig)** - Gradually replace piece by piece ⭐ RECOMMENDED
- Pros: Lower risk, validates each piece, easier rollback
- Cons: Longer timeline, dual maintenance
- Best for: Production systems, large apps, risk-averse

**Parallel Run** - Run both old and new side-by-side
- Pros: Easy rollback, high confidence
- Cons: Double infrastructure cost
- Best for: Business-critical systems

**Feature Flags** - Switch features individually
- Pros: Gradual rollout, easy partial rollback
- Cons: Code complexity
- Best for: SaaS products, user segmentation

## Phase Planning

**Each Phase Includes:**
- Clear objectives (what we're accomplishing)
- Specific scope (what's included/excluded)
- Prerequisites (what must be complete first)
- Detailed implementation steps (10-20 steps)
- Testing strategy (unit, integration, manual, performance)
- Rollback plan (as detailed as implementation)
- Success criteria (measurable outcomes)
- Realistic duration with buffer (20-30%)

**Typical Phase Breakdown Strategies:**
- **By Layer**: Frontend → API → Database → Infrastructure
- **By Feature**: Auth → Core Features → Secondary Features → Legacy
- **By Risk**: Low-risk pages → Medium-traffic → High-traffic → Business-critical

## Expected Duration

90-180 minutes depending on:
- Migration complexity
- Number of phases (3-6 typical)
- Data migration requirements
- System criticality and risk level
- Team familiarity with migration planning

## Output

**Migration Plan Document** (`migration-plan-[date].md`):
- Executive summary with migration overview
- Current and target state documentation
- Comprehensive risk assessment with mitigation strategies
- Detailed phase-by-phase plans with rollback procedures
- Data migration strategy
- Testing and validation approach
- Deployment strategy and checklist
- Team structure and communication plan
- Timeline with milestones and buffers
- Migration diagram (Mermaid)
- Contingency plans for major failure modes
- Post-migration activities
- Master migration checklist (100-200 items)

## Interaction Style

- **Intent-based**: Collaborative migration planning
- **High interactivity**: Guided risk assessment and phase design
- **Safety-focused**: Emphasizes rollback and risk mitigation
- **Pragmatic**: Realistic timelines with buffers
- **Comprehensive**: Covers all aspects of migration execution

## Key Features

**Risk Management:**
- Comprehensive risk identification
- Likelihood/impact assessment
- Specific mitigation strategies
- Clear rollback triggers
- Rollback procedures for each phase

**Phased Execution:**
- 3-6 phases typical
- Each phase independently deployable/rollbackable
- Incremental value delivery
- Learning from each phase

**Safety Mechanisms:**
- Detailed testing strategy
- Monitoring during migration
- Rollback plans as detailed as implementation
- Deployment checklists
- Feature flags and gradual rollouts

**Team Support:**
- Clear roles and responsibilities
- Training needs identification
- Communication plans
- Status reporting cadence
- Incident procedures

## Risk Assessment Categories

**Technical Risks:**
- Data loss or corruption
- Performance degradation
- Security vulnerabilities
- Integration breakages
- Feature regressions

**Business Risks:**
- User-facing downtime
- Data inconsistency
- Lost functionality
- Revenue impact
- Trust impact

**Team Risks:**
- Knowledge gaps
- Key person dependencies
- Testing time insufficient
- Dual maintenance burden

**Timeline Risks:**
- Underestimated complexity
- Unexpected challenges
- Scope creep
- Resource constraints

## Communication Planning

**Stakeholder Communication:**
- Who needs updates (executives, product, sales, support)
- Frequency and format
- Migration status templates

**User Communication:**
- Notification timing and content
- Communication channels
- Handling concerns

**Status Reporting:**
- Daily standups during active migration
- Weekly status reports
- Incident notifications

## Best Practices

- **Incremental approach**: Strangler fig pattern minimizes risk
- **Buffer appropriately**: 20-30% buffer for unexpected issues
- **Rollback reality**: Treat rollback as first-class citizen, not afterthought
- **Test thoroughly**: Each phase needs comprehensive testing
- **Monitor closely**: Detailed monitoring during migration with clear alerts
- **Communicate proactively**: Keep stakeholders and users informed
- **Learn iteratively**: Adjust plan based on early phase learnings
- **Safety over speed**: Prioritize successful migration over fast migration
- **Team preparation**: Training before it's needed
- **Data caution**: Extra care with data migration - data loss is unacceptable

## Contingency Planning

**Addresses:**
- Technical failures (database, performance, bugs, infrastructure)
- Resource constraints (people, budget, expertise)
- Schedule delays (complexity, dependencies)
- Scope changes (new features, compliance, framework changes)

Each contingency has specific Plan B approach.

## Post-Migration Activities

**Covered:**
- Stabilization period (1-4 weeks)
- Performance monitoring and comparison
- Technical debt cleanup
- Lessons learned retrospective
- Old system decommissioning
- Cost savings tracking

## Next Steps

After migration planning, typical next workflows:
- **Production Validation** (`*validate` via Sam) - Validate migration plan for production-readiness
- **Team Review** - Share plan with development team for feedback
- **Stakeholder Approval** - Present plan to business stakeholders
- **Phase 1 Execution** - Begin first migration phase
- **Continuous Adjustment** - Update plan based on execution learnings

## Notes

- Emphasizes incremental, safe migration approaches
- Includes comprehensive validation checklist
- Suitable for production system migrations
- Designed for SMB scale (not enterprise complexity)
- Creates living document that evolves during execution
- Treats rollback seriously (not afterthought)
- Realistic timelines with buffers
- Focuses on team execution capability
- Safety-first mindset throughout
