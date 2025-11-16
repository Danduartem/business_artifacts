# Migration Plan - Technology Stack Migration Strategy

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/migration-plan/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the migration planning process</critical>

<workflow>

<step n="1" goal="Initialize document and understand migration context">
<action>Write the template to {default_output_file} with all placeholders</action>

<action>Welcome {user_name} to the Migration Plan workflow</action>

<action>Explain Riley's role and this workflow's purpose:
"I'm here to help you plan a safe, incremental migration from your current tech stack to your target stack. Migrations are high-risk operations, but with proper planning, phased execution, and rollback strategies, we can minimize disruption and ensure success. This is about being methodical and cautious - we'll plan for both success and failure scenarios."
</action>

<action>Ask {user_name} key context questions:
- What's driving this migration? (technical debt, performance, modernization, cost, etc.)
- Is this a complete replacement or gradual modernization?
- What's the urgency? (ASAP, planned timeline, whenever ready)
- What's the risk tolerance? (can't afford downtime vs willing to accept some risk)
- Is the system currently in production serving users?
- What's the business impact of downtime or issues?
</action>

<action>Load available context documents:
- Technology selections: {output_folder}/stack-advisor/tech-selections-*.md
- Architecture blueprint: {output_folder}/stack-advisor/architecture-blueprint-*.md
- Intake results: {output_folder}/stack-advisor/intake-session-*.md
- Any current system documentation
</action>

<action if="context found">Review to understand:
- Target technology stack (where we're going)
- Current system state (where we are)
- Architecture design (how target should work)
- Business constraints and requirements
- Scale level ({smb_scale_level})
</action>
</step>

<step n="2" goal="Document current and target states">
<action>Work with {user_name} to document the current state in detail:

**Current Technology Stack:**
- Frontend framework and version
- Backend framework and version
- Database and version
- Hosting/infrastructure
- Key dependencies and libraries
- Authentication system
- Payment integration
- Other critical components

**Current System Characteristics:**
- Lines of code / system size
- Number of active users
- Daily traffic / request volume
- Database size
- Number of critical features
- Known technical debt
- Known pain points
- Dependencies on current tech

Be specific and comprehensive. The more we know about current state, the better we can plan.
</action>

<template-output>current_state</template-output>

<action>Document the target state (where we're migrating to):

**Target Technology Stack:**
- New frontend framework and version
- New backend framework and version
- New database and version
- New hosting/infrastructure
- New dependencies and libraries
- New authentication approach
- New payment integration
- Other new components

**Expected Target Characteristics:**
- Expected system complexity
- Performance improvements expected
- Developer experience improvements
- Cost changes
- Maintainability improvements

Reference the technology selections and architecture blueprint if available.
</action>

<template-output>target_state</template-output>

<action>Generate project-specific name from context</action>
<template-output>project_name</template-output>
</step>

<step n="3" goal="Assess migration risks">
<action>Collaborate with {user_name} to identify critical risks in this migration</action>

<action>Analyze risk categories:

**Technical Risks:**
- Data loss or corruption
- Performance degradation
- Security vulnerabilities during transition
- Integration breakages
- Feature regressions
- Browser/platform compatibility issues

**Business Risks:**
- User-facing downtime
- Data inconsistency visible to users
- Loss of business-critical functionality
- Revenue impact
- Customer trust impact

**Team Risks:**
- Knowledge gaps with new tech
- Key person dependencies
- Insufficient testing time
- Parallel maintenance burden

**Timeline Risks:**
- Underestimated complexity
- Unexpected technical challenges
- Scope creep
- Resource constraints

For each significant risk:
- Describe the risk
- Assess likelihood (High/Medium/Low)
- Assess impact (High/Medium/Low)
- Initial mitigation ideas

Focus on the 10-15 most critical risks for this specific migration.
</action>

<template-output>critical_risks</template-output>

<action>For each critical risk, develop specific mitigation strategies:
- How do we prevent this risk from materializing?
- If it happens, how do we detect it quickly?
- If it happens, how do we minimize impact?

Make mitigation strategies actionable and specific.
</action>

<template-output>risk_mitigation</template-output>

<action>Define clear rollback triggers - conditions under which we abandon the migration phase and roll back:
- Performance degradation > X%
- Error rate increase > Y%
- Data inconsistencies detected
- Critical feature failures
- User-reported issues exceeding threshold
- Security incident
- Time overrun beyond buffer

Be specific with thresholds appropriate for {smb_scale_level}.
</action>

<template-output>rollback_triggers</template-output>
</step>

<step n="4" goal="Design migration approach and phases">
<action>Determine the overall migration approach with {user_name}:

**Common Migration Patterns:**

1. **Big Bang** - Switch everything at once
   - Pros: Fast, clean cut, no dual maintenance
   - Cons: High risk, all-or-nothing, hard to roll back
   - Best for: Small systems, non-critical apps, no users yet

2. **Incremental (Strangler Fig)** - Gradually replace piece by piece
   - Pros: Lower risk, can validate each piece, easier rollback
   - Cons: Longer timeline, dual maintenance, integration complexity
   - Best for: Production systems, large apps, risk-averse (RECOMMENDED for most)

3. **Parallel Run** - Run both old and new side-by-side
   - Pros: Can compare, easy rollback, high confidence
   - Cons: Double infrastructure cost, complex data sync
   - Best for: Business-critical systems, when you need absolute confidence

4. **Feature Flags** - Switch features individually
   - Pros: Gradual rollout, easy partial rollback, can test with subset of users
   - Cons: Code complexity, feature flag management overhead
   - Best for: SaaS products, when you can segment users

Which pattern fits this migration best?
</action>

<template-output>migration_approach</template-output>

<action>Break the migration into 3-6 phases. Each phase should be:
- Independently deployable
- Independently rollbackable
- Incrementally valuable (provides some benefit even if we stop)
- Testable in isolation

Work with {user_name} to define phases. Common phase breakdowns:

**By Layer:**
- Phase 1: Frontend migration
- Phase 2: API layer migration
- Phase 3: Database migration
- Phase 4: Infrastructure migration

**By Feature:**
- Phase 1: Authentication system
- Phase 2: Core features (80% of usage)
- Phase 3: Secondary features
- Phase 4: Legacy/rarely-used features

**By Risk:**
- Phase 1: Low-risk, low-traffic pages
- Phase 2: Medium-traffic features
- Phase 3: High-traffic core features
- Phase 4: Business-critical flows

Choose phasing strategy that minimizes risk for this specific system and {smb_scale_level}.
</action>

<template-output>migration_phases_overview</template-output>

<action>Create timeline overview showing total duration and phase sequence</action>
<template-output>timeline_overview</template-output>
</step>

<step n="5" goal="Detail Phase 1" repeat="for-each-phase">
<action>For the first migration phase, create detailed plan:</action>

<action>Name the phase clearly and descriptively</action>
<template-output>phase_1_name</template-output>

<action>Define phase objectives - what we're accomplishing:
- 2-4 bullet points
- Specific and measurable
- Clear success outcomes
</action>

<template-output>phase_1_objectives</template-output>

<action>Define phase scope - what's included and excluded:
- Which components are being migrated
- Which features are affected
- What stays the same
- What's out of scope

Be crystal clear on boundaries.
</action>

<template-output>phase_1_scope</template-output>

<action>List prerequisites that must be complete before starting this phase:
- Completed previous phases (if any)
- Required infrastructure setup
- Team training completed
- Tools and environments ready
- Data backups completed
- Stakeholder approvals obtained
</action>

<template-output>phase_1_prerequisites</template-output>

<action>Create detailed step-by-step implementation plan (10-20 steps):

Number each step and make it actionable:
1. Create feature branch for Phase 1
2. Set up new framework in /new-frontend directory
3. Implement authentication module in new framework
4. Create adapter layer for API communication
5. Build 5 key pages in new framework
6. Implement routing for new pages
7. Add feature flag "enable_new_frontend"
8. Deploy to staging environment
9. Run automated test suite
10. Perform manual testing of all migrated features
11. Performance test new pages
12. Fix any issues found
13. Deploy to production with feature flag OFF
14. Enable for 5% of users
15. Monitor metrics for 24 hours
16. If stable, roll out to 25% of users
17. Monitor for 48 hours
18. If stable, roll out to 100%
19. Remove old code after 1 week of stability
20. Document lessons learned

Adapt to your specific Phase 1 scope. Make steps small and verifiable.
</action>

<template-output>phase_1_steps</template-output>

<action>Define testing strategy for this phase:
- Unit testing approach and coverage goals
- Integration testing scenarios
- Manual testing checklist
- Performance testing criteria
- Security testing requirements
- User acceptance testing approach

Be specific about what constitutes "tested" for this phase.
</action>

<template-output>phase_1_testing</template-output>

<action>Create detailed rollback plan for this phase:
- How do we detect problems?
- What's the rollback process step-by-step?
- How long does rollback take?
- What data needs to be handled in rollback?
- Who authorizes rollback?
- How do we communicate rollback to users?

Make rollback plan as detailed as implementation plan.
</action>

<template-output>phase_1_rollback</template-output>

<action>Define measurable success criteria:
- All automated tests passing
- Manual test scenarios completed
- Performance benchmarks met (specific numbers)
- No increase in error rate
- No critical bugs reported
- Specific features verified working
- Monitoring dashboards showing green

Criteria should be objective and verifiable.
</action>

<template-output>phase_1_success_criteria</template-output>

<action>Estimate realistic duration with buffer:
- Development time: X weeks
- Testing time: Y weeks
- Staging validation: Z days
- Gradual rollout: W days
- Stabilization: V days
- Buffer (20-30%): B days
- **Total: [sum] weeks**

Be conservative with estimates. Migrations always take longer than expected.
</action>

<template-output>phase_1_duration</template-output>
</step>

<step n="6" goal="Detail Phase 2">
<action>Repeat Phase 1 planning process for Phase 2, using same template</action>

<template-output>phase_2_name</template-output>
<template-output>phase_2_objectives</template-output>
<template-output>phase_2_scope</template-output>
<template-output>phase_2_prerequisites</template-output>
<template-output>phase_2_steps</template-output>
<template-output>phase_2_testing</template-output>
<template-output>phase_2_rollback</template-output>
<template-output>phase_2_success_criteria</template-output>
<template-output>phase_2_duration</template-output>
</step>

<step n="7" goal="Detail Phase 3">
<action>Repeat Phase planning process for Phase 3</action>

<template-output>phase_3_name</template-output>
<template-output>phase_3_objectives</template-output>
<template-output>phase_3_scope</template-output>
<template-output>phase_3_prerequisites</template-output>
<template-output>phase_3_steps</template-output>
<template-output>phase_3_testing</template-output>
<template-output>phase_3_rollback</template-output>
<template-output>phase_3_success_criteria</template-output>
<template-output>phase_3_duration</template-output>
</step>

<step n="8" goal="Detail additional phases" optional="true">
<action if="more than 3 phases">For each additional phase (Phase 4, 5, 6, etc.), create the same detailed plan structure</action>

<template-output>additional_phases</template-output>
</step>

<step n="9" goal="Plan data migration strategy">
<action>If the migration involves data migration (database change, schema change, data transformation), create comprehensive data plan</action>

<action>Assess data migration requirements:
- What data needs to migrate?
- How much data (volume)?
- Data transformation needed?
- Data validation requirements?
- Acceptable data downtime?
- Data rollback complexity?

Document data scope and challenges.
</action>

<template-output>data_assessment</template-output>

<action>Define data migration approach:

**Common Data Migration Patterns:**
- **One-time bulk migration**: All data migrated in maintenance window
- **Incremental migration**: Data migrated in batches over time
- **Dual-write**: Write to both old and new during transition
- **Background sync**: Continuous sync old → new until cutover
- **On-demand migration**: Migrate data as it's accessed

Choose approach based on data volume, downtime tolerance, and risk.

Document:
- Migration pattern chosen and why
- Step-by-step data migration process
- Timing (during phase X)
- Downtime requirements
- Tools and scripts needed
</action>

<template-output>data_migration_approach</template-output>

<action>Define data validation strategy:
- How do we verify data migrated correctly?
- Checksum/hash validation?
- Sample verification?
- Full comparison?
- Acceptance criteria for data migration success?
</action>

<template-output>data_validation</template-output>

<action>Define data rollback procedures:
- Can we roll back data changes?
- What's the data rollback process?
- How long does data rollback take?
- What data might be lost in rollback scenario?

Be honest about data rollback limitations.
</action>

<template-output>data_rollback</template-output>
</step>

<step n="10" goal="Define testing and validation approach">
<action>Define overall testing approach for the migration (not phase-specific)</action>

<template-output>testing_approach</template-output>

<action>Define test environments:
- Development environment setup
- Staging environment (production-like)
- Pre-production environment?
- Production testing approach (feature flags, canary, etc.)

Document environment strategy and requirements.
</action>

<template-output>test_environments</template-output>

<action>Create critical test scenarios that must pass:
- 10-20 key scenarios covering critical user flows
- Include happy paths and edge cases
- Cover integration points
- Include error scenarios

Make scenarios specific enough to be executable.
</action>

<template-output>test_scenarios</template-output>

<action>Define performance testing requirements:
- Performance benchmarks from current system
- Acceptable performance in new system
- Load testing approach
- Performance monitoring during migration
</action>

<template-output>performance_testing</template-output>

<action if="users exist">Define user acceptance testing approach:
- Who tests? (internal users, beta users, all users)
- What are they testing?
- How long is UAT period?
- What feedback mechanisms?
- UAT success criteria?
</action>

<template-output>user_acceptance_testing</template-output>
</step>

<step n="11" goal="Define deployment strategy">
<action>Define deployment approach:
- Manual vs automated deployment
- Deployment tools and scripts
- Deployment windows (off-hours, maintenance windows, anytime)
- Deployment authorization process
- Deployment verification steps
</action>

<template-output>deployment_approach</template-output>

<action>If using advanced deployment patterns (blue-green, canary), explain the pattern:
- How it works for this migration
- Infrastructure requirements
- Traffic switching strategy
- Validation at each stage
</action>

<template-output>deployment_pattern</template-output>

<action>Create deployment checklist (20-30 items) that must be completed/verified before each deployment:
- [ ] All tests passing in staging
- [ ] Performance benchmarks met
- [ ] Security scan completed
- [ ] Database backup completed
- [ ] Rollback plan reviewed
- [ ] Monitoring dashboards ready
- [ ] On-call team notified
- [ ] Communication sent to stakeholders
- [etc.]

Be comprehensive. Checklist prevents forgotten steps.
</action>

<template-output>deployment_checklist</template-output>

<action>Define monitoring during migration:
- What metrics to watch?
- Alert thresholds
- Dashboard requirements
- Log monitoring
- Error tracking
- Who monitors? When?
</action>

<template-output>migration_monitoring</template-output>
</step>

<step n="12" goal="Document rollback procedures">
<action>Define when to rollback (rollback conditions covered earlier, now focus on how):</action>

<template-output>rollback_conditions</template-output>

<action>For each phase, document detailed rollback steps:

**Phase 1 Rollback:**
1. [Step-by-step process]

**Phase 2 Rollback:**
1. [Step-by-step process]

[etc.]

Make rollback procedures as detailed and practiced as deployment procedures.
</action>

<template-output>rollback_procedures</template-output>

<action if="data migration involved">Document data-specific rollback procedures (may reference earlier data rollback section)</action>

<template-output>data_rollback_procedures</template-output>

<action>Define communication during rollback:
- Who gets notified?
- What's the message?
- What channels?
- Timing of communications?
</action>

<template-output>rollback_communication</template-output>
</step>

<step n="13" goal="Plan team and resources">
<action>Define team structure for migration:
- Core team members and roles
- Extended team members
- Part-time vs full-time allocation
- On-call rotation during migration phases
</action>

<template-output>team_structure</template-output>

<action>Define roles and responsibilities:

**Role: Migration Lead**
- Responsibilities: [list]

**Role: Backend Developer**
- Responsibilities: [list]

**Role: Frontend Developer**
- Responsibilities: [list]

**Role: DevOps Engineer**
- Responsibilities: [list]

**Role: QA/Test Lead**
- Responsibilities: [list]

**Role: DBA (if applicable)**
- Responsibilities: [list]

[Other roles as needed]

Assign clear ownership and accountability.
</action>

<template-output>roles_responsibilities</template-output>

<action>Identify required skills for migration:
- New framework expertise
- Database migration experience
- DevOps/infrastructure skills
- Testing expertise
- Which skills exist on team?
- Which need to be acquired?
</action>

<template-output>required_skills</template-output>

<action>Define training needs:
- Who needs training on what?
- Training timeline
- Training format (courses, workshops, pair programming)
- Budget for training
</action>

<template-output>training_needs</template-output>

<action if="external help needed">Identify external resources:
- Consultants or contractors
- Vendor support
- Community help
- When to engage them?
</action>

<template-output>external_resources</template-output>
</step>

<step n="14" goal="Create communication plan">
<action>Define stakeholder communication strategy:
- Who are the stakeholders? (executives, product, sales, support)
- What do they need to know?
- How often to communicate?
- What format? (email, meetings, dashboards)
- Migration status reporting template
</action>

<template-output>stakeholder_communication</template-output>

<action if="users exist">Define user communication strategy:
- When to notify users about migration?
- What do users need to know?
- How to communicate? (email, in-app, blog post)
- Handling user questions and concerns
- Migration announcement templates
</action>

<template-output>user_communication</template-output>

<action>Define status reporting cadence and format:
- Daily standups during active migration?
- Weekly status reports?
- What's included in status report?
- Who receives status updates?
</action>

<template-output>status_reporting</template-output>

<action>Define incident communication procedures:
- How to communicate issues during migration?
- Escalation path
- Incident notification templates
- Post-incident communication
</action>

<template-output>incident_communication</template-output>
</step>

<step n="15" goal="Create timeline and milestones">
<action>Create overall timeline showing all phases with start and end dates (use relative dates or placeholders like "Week 1-4"):</action>

<template-output>overall_timeline</template-output>

<action>Define key milestones across all phases:
- Milestone 1: Phase 1 complete (Week X)
- Milestone 2: Data migration complete (Week Y)
- Milestone 3: Phase 2 complete (Week Z)
- [etc.]
- Final Milestone: Complete migration and old system decommissioned

Mark milestones as go/no-go decision points.
</action>

<template-output>phase_milestones</template-output>

<action>Identify decision points where migration direction might change:
- After Phase 1: Continue vs pause vs rollback?
- After data migration: Proceed vs revert?
- After performance testing: Accept vs optimize vs reconsider?

Document decision criteria for each decision point.
</action>

<template-output>decision_points</template-output>

<action>Add buffer time to timeline:
- 20-30% buffer for unexpected issues
- Extra buffer for high-risk phases
- Document where buffer is allocated

Buffers turn "best case" into "realistic case."
</action>

<template-output>buffer_time</template-output>
</step>

<step n="16" goal="Create migration diagram">
<action>Create a visual migration diagram using Mermaid showing:
- Current state → Phase 1 → Phase 2 → Phase 3 → Target state
- What changes in each phase
- Dependencies between phases
- Data flows during migration

Use Mermaid graph or flowchart syntax.
</action>

<template-output>migration_diagram</template-output>

<action>Add notes explaining the diagram</action>
<template-output>migration_diagram_notes</template-output>
</step>

<step n="17" goal="Plan contingencies">
<action>For each major failure mode, define contingency plan:</action>

<action>Technical failure contingencies:
- Database migration fails
- Performance unacceptable in new system
- Critical bug found in production
- Infrastructure issues
- Integration failures

For each: What's plan B?
</action>

<template-output>technical_failure_contingency</template-output>

<action>Resource constraint contingencies:
- Key team member leaves
- Budget cut
- Timeline compressed
- No access to required expertise

For each: How do we adapt?
</action>

<template-output>resource_contingency</template-output>

<action>Schedule delay contingencies:
- Phase takes 2x longer than expected
- Unexpected complexity discovered
- Dependency delays (vendor, infrastructure, etc.)

For each: How do we handle delay?
</action>

<template-output>schedule_contingency</template-output>

<action>Scope change contingencies:
- Business requires new must-have feature mid-migration
- Target framework changes (new version, deprecation)
- Compliance requirements change

For each: How do we accommodate change?
</action>

<template-output>scope_change_contingency</template-output>
</step>

<step n="18" goal="Plan post-migration activities">
<action>Define stabilization period after final phase:
- How long to monitor closely? (typically 1-4 weeks)
- What metrics to watch?
- When to declare "migration complete"?
- When to move from "migration mode" to "normal operations"?
</action>

<template-output>stabilization_period</template-output>

<action>Define post-migration monitoring:
- What metrics to track long-term?
- Performance comparison: new vs old
- Cost comparison: new vs old
- Developer productivity comparison
- How long to track migration benefits?
</action>

<template-output>post_migration_monitoring</template-output>

<action>Identify technical debt cleanup work:
- Temporary scaffolding to remove
- Dual-maintenance code to eliminate
- Adapter layers to simplify
- Documentation to update
- Tools and scripts to archive

Create cleanup task list.
</action>

<template-output>technical_debt_cleanup</template-output>

<action>Plan lessons learned retrospective:
- When to conduct? (after each phase? after complete migration?)
- What to capture?
- How to document and share learnings?
- How to apply lessons to future migrations?
</action>

<template-output>lessons_learned</template-output>

<action>Define old system decommissioning plan:
- When is it safe to decommission old system?
- What needs to be archived?
- What can be deleted?
- Final data export if needed
- Backup retention policy
- Infrastructure teardown
- Cost savings from decommissioning
</action>

<template-output>decommissioning_plan</template-output>
</step>

<step n="19" goal="Complete appendix and executive summary">
<action>Create glossary of migration-specific terms used in document</action>
<template-output>glossary</template-output>

<action>Compile references:
- New framework documentation
- Migration guides and best practices
- Internal documentation
- Vendor resources
- Community resources
</action>

<template-output>references</template-output>

<action>Create master migration checklist - all critical tasks across all phases:
- [ ] Task 1
- [ ] Task 2
- [etc.]

100-200 item checklist that covers entire migration.
</action>

<template-output>migration_checklist</template-output>

<action>Now that full plan is complete, write executive summary (2-3 paragraphs):
- What migration is being undertaken
- Why we're doing it
- High-level approach (phased, timeline)
- Key risks and mitigations
- Success criteria
- Resource requirements
- Expected benefits
</action>

<template-output>executive_summary</template-output>
</step>

<step n="20" goal="Review and finalize migration plan">
<action>Review the complete migration plan with {user_name}:
- Does the phased approach feel right?
- Are timelines realistic?
- Are risks adequately addressed?
- Is rollback strategy clear?
- Do we have resources needed?
- Are any phases too ambitious?
- Any gaps or missing considerations?
</action>

<action>Make any necessary revisions based on feedback</action>

<action>Discuss next steps:
1. **Review with team**: Get team buy-in on plan
2. **Validate**: Have Sam review for production-readiness
3. **Refine**: Adjust based on team and stakeholder feedback
4. **Socialize**: Share with all stakeholders
5. **Execute Phase 1**: Begin first phase when ready
6. **Iterate**: Adjust plan based on Phase 1 learnings
</action>

<action>Thank {user_name} for the collaboration. Emphasize that this plan is a living document - it will evolve as we learn during execution.</action>
</step>

</workflow>
