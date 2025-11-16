# Spec Generator - Comprehensive Technology Stack Specification

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/spec-generator/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the specification generation process</critical>

<workflow>

<step n="1" goal="Initialize document and load all available inputs">
<action>Write the template to {default_output_file} with all placeholders</action>

<action>Welcome {user_name} to the Spec Generator workflow</action>

<action>Explain Casey's role and this workflow's purpose:
"I'm here to compile everything the Stack Advisor team has created into one comprehensive, professional technology stack specification. This document brings together requirements, technology selections, architecture design, comparisons, and implementation plans into a cohesive deliverable ready for stakeholders, development teams, or clients. Think of me as the technical writer who makes complex technical decisions clear and accessible."
</action>

<action>Search for and load all available Stack Advisor outputs in {output_folder}/stack-advisor/:
- Intake session results: intake-session-*.md
- Constraint filter results: constraint-filter-*.md
- Technology selections: tech-selections-*.md
- Architecture blueprint: architecture-blueprint-*.md
- Comparison matrix: comparison-matrix-*.md
- Migration plan: migration-plan-*.md
</action>

<action>For each document type found, load the most recent version and extract key information</action>

<action if="minimal inputs">Explain to {user_name} that the specification will be most comprehensive if more Stack Advisor workflows have been completed. Ask if they want to:
1. Generate spec with available information (may have gaps)
2. Complete additional workflows first (recommended)
3. Provide missing information manually now

This workflow works best as the final step after other Stack Advisor work.
</action>

<action>Ask {user_name}:
- Who is the primary audience for this specification? (technical team, stakeholders, clients)
- What level of technical detail is appropriate? (high-level overview, detailed technical, mixed)
- Any specific sections they want emphasized or de-emphasized?
- Any branding or formatting preferences?
</action>
</step>

<step n="2" goal="Create executive summary">
<action>Generate a compelling executive summary (3-5 paragraphs) that covers:
- What project this specification is for
- High-level technology stack chosen
- Key architectural approach
- Why these choices are right for this project and {smb_scale_level} scale
- Expected benefits (performance, developer experience, cost, etc.)
- Implementation timeline overview
- Confidence level in recommendations

Make it concise yet comprehensive. This is what busy stakeholders will read.
</action>

<template-output>executive_summary</template-output>
</step>

<step n="3" goal="Document project overview">
<action>Extract project information from intake results and other sources to create comprehensive project overview</action>

<action>Document business context:
- What business problem is being solved?
- Who are the users?
- What's the business value?
- Why is this project being undertaken?

Pull from intake session if available, otherwise work with {user_name} to document.
</action>

<template-output>business_context</template-output>

<action>Document project goals (3-5 bullet points):
- User-facing goals
- Business goals
- Technical goals

Be specific and measurable where possible.
</action>

<template-output>project_goals</template-output>

<action>Document success criteria - how will we know this project succeeded?</action>
<template-output>success_criteria</template-output>

<action>Document scale and scope:
- Target user count
- Expected traffic
- Data volume
- Geographic scope
- Feature scope
- Timeline scope
- Budget constraints (if appropriate to include)

Reference {smb_scale_level} in context.
</action>

<template-output>scale_scope</template-output>

<action>Generate project-specific name from context</action>
<template-output>project_name</template-output>
</step>

<step n="4" goal="Document complete technology stack">
<action>Extract technology selections from tech-selections document if available, or compile from architecture blueprint and other sources</action>

<action>Document frontend technologies comprehensively:

**For each frontend technology:**
- Name and version
- Purpose and role
- Why selected
- Key features and capabilities
- Ecosystem (UI libraries, tools, etc.)

Format example:
**React 18.2**
- **Purpose**: Primary frontend framework
- **Why Selected**: Large community, mature ecosystem, excellent performance, team familiarity
- **Key Capabilities**: Component-based architecture, hooks for state management, extensive third-party library support
- **Supporting Libraries**: React Router for routing, Zustand for state management, Chakra UI for components, React Query for data fetching

Be specific and comprehensive. Cover main framework and all significant supporting libraries.
</action>

<template-output>frontend_technologies</template-output>

<action>Document backend technologies with same level of detail</action>
<template-output>backend_technologies</template-output>

<action>Document database and data layer technologies</action>
<template-output>database_technologies</template-output>

<action>Document infrastructure and DevOps technologies:
- Hosting platform
- CI/CD tools
- Monitoring and logging
- Container orchestration (if applicable)
- CDN
- Email services
- File storage
</action>

<template-output>infrastructure_technologies</template-output>

<action>Document supporting services:
- Authentication services
- Payment processing
- Analytics
- Error tracking
- Email/SMS services
- Other third-party services
</action>

<template-output>supporting_services</template-output>

<action>Document development tools:
- Code editor recommendations
- Testing frameworks
- Build tools
- Version control practices
- Code quality tools
</action>

<template-output>development_tools</template-output>
</step>

<step n="5" goal="Compile architecture overview">
<action>If architecture blueprint is available, extract and summarize architecture. Otherwise, create high-level architecture description based on available information.</action>

<action>Create high-level architecture description (2-4 paragraphs):
- Overall architecture pattern (SPA + REST API, microservices, monolith, etc.)
- Major system components
- How components interact
- Architecture style and rationale

Keep it accessible - explain architecture clearly without assuming deep technical knowledge.
</action>

<template-output>architecture_overview</template-output>

<action>Extract or create system architecture diagram:
- If blueprint has diagram, use that
- Otherwise create simplified diagram showing key components

Use Mermaid syntax.
</action>

<template-output>system_diagram</template-output>

<action>Add notes explaining the system diagram</action>
<template-output>system_diagram_notes</template-output>

<action>Describe component architecture - what each major component does</action>
<template-output>component_architecture</template-output>

<action>Describe data flow through the system</action>
<template-output>data_flow</template-output>

<action>List integration points with external systems and services</action>
<template-output>integration_points</template-output>
</step>

<step n="6" goal="Explain technology rationale">
<action>Document the criteria used for technology selection:
- What mattered most in selection process?
- How were options evaluated?
- What weights were applied?

If comparison matrix exists, pull criteria from there. Otherwise document selection priorities.
</action>

<template-output>selection_criteria</template-output>

<action>For each major technology layer (Frontend, Backend, Database, Infrastructure), write detailed rationale explaining WHY this technology was chosen:

**Rationale should cover:**
- How it meets project requirements
- How it fits {smb_scale_level} scale
- How it aligns with team capabilities
- Performance characteristics
- Community and ecosystem benefits
- Cost considerations
- Why it's better than alternatives for this specific project

Draw from technology selections document, comparison matrix, and architecture blueprint.

Make rationale compelling and specific. Avoid generic claims like "it's popular" - explain WHY popularity matters for THIS project.
</action>

<template-output>frontend_rationale</template-output>
<template-output>backend_rationale</template-output>
<template-output>database_rationale</template-output>
<template-output>infrastructure_rationale</template-output>

<action>Document key trade-offs that were accepted:
- What did we give up to get what we wanted?
- What alternatives offered different trade-offs?
- Why were these trade-offs acceptable?

Be honest about trade-offs. This builds credibility.
</action>

<template-output>key_tradeoffs</template-output>
</step>

<step n="7" goal="Document alternatives considered">
<action>If comparison matrix exists, extract alternatives analysis. Otherwise document key alternatives that were considered.</action>

<action>For each major technology category, briefly document alternatives that were considered and why they weren't selected:

**Format per alternative:**
- Alternative name
- Key strengths
- Why it wasn't chosen for this project (1-2 sentences)

Example: "**Vue.js** - Excellent progressive framework with great developer experience. Not chosen due to smaller ecosystem and less team familiarity compared to React."

This shows due diligence and builds confidence in recommendations.
</action>

<template-output>frontend_alternatives</template-output>
<template-output>backend_alternatives</template-output>
<template-output>database_alternatives</template-output>

<action>Provide concise justification (2-3 paragraphs) summarizing why the selected options are the best fit for this specific project given its constraints, requirements, and context</action>

<template-output>selection_justification</template-output>
</step>

<step n="8" goal="Create implementation roadmap">
<action>If migration plan exists, extract phased implementation roadmap. If architecture blueprint has implementation guidance, use that. Otherwise create high-level roadmap.</action>

<action>For each major phase (typically 3-4 phases):
- Phase name
- Objectives (what gets accomplished)
- Key deliverables
- Duration estimate
- Dependencies

Keep summaries concise - detailed migration plan is in appendix if needed.
</action>

<template-output>phase_1_name</template-output>
<template-output>phase_1_summary</template-output>
<template-output>phase_2_name</template-output>
<template-output>phase_2_summary</template-output>
<template-output>phase_3_name</template-output>
<template-output>phase_3_summary</template-output>

<action>Create timeline overview showing total implementation timeline with phase sequence and key milestones</action>

<template-output>timeline_overview</template-output>

<action>List key milestones with target dates or relative timing</action>
<template-output>milestones</template-output>
</step>

<step n="9" goal="Compile risk assessment">
<action>Extract risk information from migration plan, architecture blueprint, and other sources. Consolidate into comprehensive risk assessment.</action>

<action>Document technical risks (5-10 key risks):
- What could go wrong technically?
- Likelihood and impact
- Brief mitigation note

Draw from migration plan if available.
</action>

<template-output>technical_risks</template-output>

<action>Document business risks:
- Downtime impact
- Budget overrun risk
- Timeline delay risk
- User experience degradation
- Others relevant to project
</action>

<template-output>business_risks</template-output>

<action>Summarize mitigation strategies for major risks</action>
<template-output>mitigation_strategies</template-output>

<action if="migration plan exists">Document rollback considerations - how can we reverse course if needed?</action>

<template-output>rollback_considerations</template-output>
</step>

<step n="10" goal="Analyze costs">
<action>Work with {user_name} to estimate and document costs across all categories</action>

<action>Document infrastructure costs:
- Hosting platform costs (monthly/annual)
- CDN costs
- Database hosting
- Bandwidth and storage
- Scaling costs as usage grows

Be specific with estimates appropriate for {smb_scale_level}.
</action>

<template-output>infrastructure_costs</template-output>

<action>Document license and service costs:
- Third-party service subscriptions
- Authentication services
- Payment processing fees
- Monitoring tools
- Error tracking
- Analytics
- Other SaaS costs

Provide monthly/annual estimates.
</action>

<template-output>license_costs</template-output>

<action>Document development costs:
- Development team size and duration
- Estimated development effort (person-weeks or person-months)
- External consulting/contractors if needed
- Training costs

Provide range estimates.
</action>

<template-output>development_costs</template-output>

<action>Document ongoing maintenance costs:
- Team needed for maintenance (FTE or %)
- Ongoing infrastructure costs
- Service renewals
- Security updates and patches
- Annual estimate

</action>

<template-output>maintenance_costs</template-output>

<action>Calculate total cost of ownership for Year 1 and Years 2-5</action>
<template-output>total_cost_ownership</template-output>

<action if="migrating from existing system">Compare costs: current system vs target system to show cost impact</action>

<template-output>cost_comparison</template-output>
</step>

<step n="11" goal="Document team and resource requirements">
<action>Document required skills for implementation and maintenance:
- Frontend skills needed
- Backend skills needed
- Database skills needed
- DevOps skills needed
- Testing/QA skills needed
- Which skills exist? Which need to be acquired?
</action>

<template-output>required_skills</template-output>

<action>Describe recommended team structure:
- Roles needed (Frontend Dev, Backend Dev, Full-Stack, DevOps, QA, etc.)
- Team size recommendations
- Skill level requirements

Appropriate for {smb_scale_level} scale.
</action>

<template-output>team_structure</template-output>

<action>Document training needs:
- Who needs training on what?
- Training resources available
- Estimated training duration
- Training budget estimate
</action>

<template-output>training_needs</template-output>

<action if="external resources needed">Document external resources:
- Consultants or contractors
- When to engage them
- Estimated costs
</action>

<template-output>external_resources</template-output>

<action if="hiring needed">Provide hiring recommendations:
- Roles to hire
- Priority order
- Skills to look for
- Hiring market difficulty
</action>

<template-output>hiring_recommendations</template-output>
</step>

<step n="12" goal="Document security and compliance">
<action>Extract security information from architecture blueprint. Document security architecture overview.</action>

<template-output>security_architecture</template-output>

<action if="compliance requirements exist">Document compliance requirements:
- GDPR, CCPA, HIPAA, PCI-DSS, etc.
- How chosen stack supports compliance
- Compliance gaps to address
</action>

<template-output>compliance_requirements</template-output>

<action>Document data protection approach:
- Encryption (at rest, in transit)
- Sensitive data handling
- Backup and recovery
- Data retention policies
</action>

<template-output>data_protection</template-output>

<action>List security best practices to follow with this stack</action>
<template-output>security_best_practices</template-output>
</step>

<step n="13" goal="Document performance and scalability">
<action>Document performance expectations:
- Response time targets
- Throughput targets
- Rendering performance goals
- User experience expectations
</action>

<template-output>performance_expectations</template-output>

<action>Extract and document scalability strategy from architecture blueprint or create based on selected technologies:
- How system scales from current to 10x users
- Vertical vs horizontal scaling
- Database scaling approach
- Caching strategy
- CDN usage

Keep appropriate for {smb_scale_level} - don't over-engineer.
</action>

<template-output>scalability_strategy</template-output>

<action>Document monitoring and observability approach:
- What to monitor
- Tools to use
- Alert strategy
- Dashboard approach
</action>

<template-output>monitoring_observability</template-output>

<action>Identify optimization opportunities:
- Areas where performance could be improved
- When to optimize (don't prematurely optimize)
- Performance tuning strategies
</action>

<template-output>optimization_opportunities</template-output>
</step>

<step n="14" goal="Document development and operations practices">
<action>Document recommended development workflow:
- Branching strategy
- Code review process
- Local development setup
- Development environment
</action>

<template-output>development_workflow</template-output>

<action>Document testing strategy:
- Unit testing approach
- Integration testing
- End-to-end testing
- Performance testing
- Testing tools and frameworks
- Coverage goals
</action>

<template-output>testing_strategy</template-output>

<action>Document deployment process:
- How code gets to production
- Deployment frequency
- Deployment windows
- Approval process
</action>

<template-output>deployment_process</template-output>

<action>Document CI/CD pipeline:
- Pipeline stages
- Automated checks
- Build process
- Deployment automation
</action>

<template-output>cicd_pipeline</template-output>

<action>Document maintenance and support approach:
- How bugs are handled
- Security updates
- Dependency updates
- Support rotation
</action>

<template-output>maintenance_support</template-output>
</step>

<step n="15" goal="Document migration considerations" if="migration scenario">
<action if="migration plan exists">Extract and summarize migration information. Otherwise create high-level migration guidance.</action>

<action>Document migration approach:
- Incremental vs big bang
- Why this approach
- Key principles guiding migration
</action>

<template-output>migration_approach</template-output>

<action>Summarize migration phases (high-level - detailed plan in appendix)</action>
<template-output>migration_phases</template-output>

<action if="data migration needed">Document data migration strategy</action>
<template-output>data_migration_strategy</template-output>

<action>Document rollback plan overview</action>
<template-output>rollback_plan</template-output>

<action>Document migration timeline</action>
<template-output>migration_timeline</template-output>
</step>

<step n="16" goal="Define next steps and actions">
<action>Create list of immediate actions needed to proceed (5-10 bullet points):
- What needs to happen next?
- What decisions need to be made?
- What approvals are needed?
- What resources need to be allocated?
</action>

<template-output>immediate_actions</template-output>

<action>Document what's needed to kickoff Phase 1 of implementation:
- Prerequisites
- Team assignment
- Environment setup
- Initial tasks
</action>

<template-output>phase_1_kickoff</template-output>

<action>List key decision points coming up:
- Decisions that will affect timeline
- Technology decisions still pending
- Resource allocation decisions
- Budget approval needs
</action>

<template-output>decision_points</template-output>

<action>Document stakeholder approvals needed:
- Who needs to approve what?
- When are approvals needed?
- What information do they need to approve?
</action>

<template-output>stakeholder_approvals</template-output>
</step>

<step n="17" goal="Complete appendix">
<action>Create glossary of technical terms used in document (20-30 terms)</action>
<template-output>glossary</template-output>

<action>Compile technology reference links:
- Official documentation for all major technologies
- Community resources
- Tutorial links
- Best practice guides
</action>

<template-output>technology_references</template-output>

<action>Extract architecture decision records from architecture blueprint if available</action>
<template-output>architecture_decisions</template-output>

<action>List supporting documents:
- Link to architecture blueprint
- Link to comparison matrix
- Link to migration plan
- Link to intake session notes
- Other Stack Advisor outputs
</action>

<template-output>supporting_documents</template-output>

<action>Add contact information:
- Project lead contact
- Technical lead contact
- How to get questions answered
</action>

<template-output>contact_information</template-output>
</step>

<step n="18" goal="Review, polish, and finalize specification">
<action>Review the complete specification for:
- Consistency in terminology
- Appropriate technical level for audience
- Clear and concise language
- No jargon without explanation
- Logical flow
- All sections complete
- No contradictions between sections
</action>

<action>Polish the document:
- Ensure professional tone throughout
- Consistent formatting
- Clear section headings
- Good use of bullet points and tables for readability
- Appropriate length (comprehensive but not bloated)
</action>

<action>Review with {user_name}:
- Does this accurately represent the technology decisions?
- Is the level of detail appropriate?
- Is anything missing?
- Is anything unclear?
- Is it ready to share with stakeholders/team/clients?
</action>

<action>Make any final revisions based on feedback</action>

<action>Explain that this specification is the culmination of the Stack Advisor process. It can be used for:
- Stakeholder and executive approval
- Development team guidance
- Client deliverable
- RFP responses
- Vendor discussions
- Hiring and team building
- Project planning and estimation
</action>

<action>Thank {user_name} for working through the Stack Advisor process</action>
</step>

</workflow>
