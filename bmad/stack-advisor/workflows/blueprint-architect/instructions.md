# Blueprint Architect - System Architecture Design

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/blueprint-architect/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the architecture design process</critical>

<workflow>

<step n="1" goal="Initialize document and load context">
<action>Write the template to {default_output_file} with all placeholders</action>

<action>Welcome {user_name} to the Blueprint Architect session</action>

<action>Explain Jordan's role and this workflow's purpose:
"I'm here to design a comprehensive system architecture for your project. We'll work together to create a blueprint that's right-sized for {smb_scale_level} business scale, uses the technologies we've selected, and gives your development team clear guidance. This is a collaborative design process - my architectural thinking + your project knowledge = a solid blueprint."
</action>

<action>Load available context documents:
- Technology selections: {output_folder}/stack-advisor/tech-selections-*.md
- Intake session results: {output_folder}/stack-advisor/intake-session-*.md
- Requirements documentation (PRD, specs, etc.)
- Constraint filter results if available
</action>

<action if="context found">Review context to understand:
- Selected technology stack (Frontend, Backend, Database, Infrastructure)
- Business requirements and project goals
- Scale expectations ({smb_scale_level})
- Constraints and non-functional requirements
- User base and usage patterns
</action>

<action if="minimal context">Work with {user_name} to gather essential architecture inputs:
- What's the project about? (brief description)
- What technologies have been selected?
- What's the scale expectation? (users, traffic, data volume)
- Any specific architectural requirements? (real-time, offline, etc.)
</action>

<action>Ask {user_name}:
- What level of architectural detail do you need? (high-level overview vs detailed component design)
- Are there any specific architectural concerns? (performance, security, scalability)
- Is this greenfield or does it need to integrate with existing systems?
</action>
</step>

<step n="2" goal="Create executive summary and system overview">
<action>Collaborate with {user_name} to create a clear executive summary (2-3 paragraphs) that covers:
- What system is being built and why
- High-level architecture approach (e.g., "Modern SPA with RESTful API backend")
- Key technology choices (brief mention)
- Primary architectural goals (e.g., "Scalable, maintainable, cost-effective for SMB")
</action>

<template-output>executive_summary</template-output>

<action>Expand into system overview that describes:
- System boundaries (what's in scope, what's external)
- Major system components at highest level (e.g., "Web Application, API Server, Database, Authentication Service")
- Overall architecture style (SPA, MPA, microservices, monolith, etc.)
- Why this architecture fits the project needs and {smb_scale_level} scale

Adapt the overview depth to what {user_name} needs. Keep it clear and jargon-free.
</action>

<template-output>system_overview</template-output>

<action>Document 5-7 key architecture decisions with rationale:
- Decision: [what was decided]
- Rationale: [why this choice]
- Alternatives Considered: [what else was considered]
- Trade-offs: [what we're accepting/giving up]

Example: "Decision: Monolithic backend architecture | Rationale: SMB scale doesn't warrant microservices complexity | Alternatives: Microservices (rejected - over-engineering) | Trade-offs: Accepting coupling for simplicity"
</action>

<template-output>key_architecture_decisions</template-output>
</step>

<step n="3" goal="Document technology stack">
<action>For each layer of the stack (Frontend, Backend, Database, Infrastructure), document:

**For each technology:**
- Framework/Library name and version
- Purpose and role in architecture
- Why it was selected (brief rationale)
- Key integrations or dependencies

Keep descriptions concise. This is reference documentation, not sales copy.
</action>

<action>Generate frontend stack documentation</action>
<template-output>frontend_stack</template-output>

<action>Generate backend stack documentation</action>
<template-output>backend_stack</template-output>

<action>Generate database and data layer documentation</action>
<template-output>database_stack</template-output>

<action>Generate infrastructure and DevOps stack documentation</action>
<template-output>infrastructure_stack</template-output>
</step>

<step n="4" goal="Design component architecture">
<action>Identify the major components of the system. For a typical web application, this might include:
- Frontend Application (React/Vue/etc.)
- API Server
- Database
- Authentication Service
- Background Job Processor (if needed)
- File Storage (if needed)
- Email Service (if needed)
- Payment Integration (if needed)
- etc.

Adapt to the specific project. Don't include components that aren't needed.
</action>

<action>Create high-level component overview describing how components interact</action>
<template-output>component_overview</template-output>

<action>For each major component, provide detailed breakdown:

**Component: [Name]**
- **Technology**: [Framework/language]
- **Purpose**: [What it does]
- **Interfaces**: [How other components interact with it]
- **Key Modules**: [Internal sub-components if relevant]
- **Dependencies**: [External services, libraries]

Collaborate with {user_name} on the right granularity. Don't over-engineer for {smb_scale_level} scale.
</action>

<template-output>component_details</template-output>

<action>Document clear component responsibilities (what each component should and should NOT do):
- Separation of concerns
- Bounded contexts
- Responsibility assignments

This helps prevent future architecture drift.
</action>

<template-output>component_responsibilities</template-output>
</step>

<step n="5" goal="Design data architecture">
<action>Work with {user_name} to identify core data models/entities. For each major entity:
- Entity name
- Key attributes/fields
- Relationships to other entities
- Storage location (which database/table)

Keep it at logical model level, not full schema. Aim for 5-15 core entities depending on project complexity.
</action>

<template-output>data_models</template-output>

<action>Describe how data flows through the system:
- User interactions → API calls → Database operations
- Background jobs and async processing
- Real-time data flows if applicable
- Cache invalidation patterns

Make it narrative and understandable. This isn't a sequence diagram - save that for the visual diagram.
</action>

<template-output>data_flow_description</template-output>

<action>Document data storage strategy:
- Primary database usage
- Caching strategy (if applicable)
- File/blob storage (if applicable)
- Data partitioning or sharding (if scale requires)
- Backup and recovery approach

Keep it appropriate for {smb_scale_level}. Don't over-engineer.
</action>

<template-output>data_storage_strategy</template-output>
</step>

<step n="6" goal="Design API architecture">
<action>Define API architecture approach:
- REST, GraphQL, or hybrid?
- API versioning strategy
- Request/response formats
- Error handling patterns
</action>

<template-output>api_architecture</template-output>

<action>Document endpoint structure and patterns. Don't list every endpoint - show the pattern:

**Example Endpoint Patterns:**
- `GET /api/v1/resources` - List resources
- `GET /api/v1/resources/:id` - Get single resource
- `POST /api/v1/resources` - Create resource
- `PUT /api/v1/resources/:id` - Update resource
- `DELETE /api/v1/resources/:id` - Delete resource

Adapt to the actual API design. Include 5-10 example endpoints that illustrate patterns.
</action>

<template-output>endpoint_structure</template-output>

<action>Document authentication and authorization approach:
- Auth mechanism (JWT, sessions, OAuth, etc.)
- Where authentication happens (middleware, gateway, etc.)
- Authorization model (RBAC, ABAC, simple roles, etc.)
- Token storage and refresh strategy

Be specific and implementation-ready.
</action>

<template-output>auth_architecture</template-output>
</step>

<step n="7" goal="Document integration points">
<action>Identify external services the system integrates with:
- Payment processors (Stripe, PayPal)
- Email services (SendGrid, Mailgun)
- Cloud storage (S3, Cloudinary)
- Analytics (Google Analytics, etc.)
- Monitoring (Sentry, LogRocket)
- Others

For each, briefly note: purpose, integration method, fallback strategy if applicable
</action>

<template-output>external_integrations</template-output>

<action>Document third-party APIs consumed:
- API name and purpose
- Authentication method
- Rate limits and quotas
- Error handling strategy
</action>

<template-output>third_party_apis</template-output>

<action if="webhooks needed">Document webhook and event handling:
- Inbound webhooks (from external services)
- Outbound webhooks (to notify external systems)
- Event processing patterns
</action>

<template-output>webhooks_events</template-output>
</step>

<step n="8" goal="Define security architecture">
<action>Document security layers in the architecture:
- Network security (HTTPS, firewalls)
- Application security (input validation, SQL injection prevention)
- Data security (encryption at rest, in transit)
- Authentication & authorization (covered earlier, reference here)
- Secrets management
- Security headers and CORS

Keep it pragmatic for {smb_scale_level}. Essential protections without paranoia.
</action>

<template-output>security_layers</template-output>

<action>Expand on authentication and authorization strategy (implementation details)</action>
<template-output>auth_strategy</template-output>

<action>Document data protection approach:
- Sensitive data handling (PII, passwords, payment info)
- Encryption strategies
- Compliance considerations (GDPR, CCPA, etc. if applicable)
- Data retention and deletion policies
</action>

<template-output>data_protection</template-output>
</step>

<step n="9" goal="Address scalability and performance">
<action>Document scalability strategy appropriate for {smb_scale_level}:
- Current scale target (users, requests/sec, data volume)
- Vertical vs horizontal scaling approach
- Database scaling strategy
- Caching layers
- CDN usage for static assets
- Background job processing

Be realistic. SMB doesn't need Netflix-scale architecture.
</action>

<template-output>scalability_strategy</template-output>

<action>Document performance considerations:
- Expected response times
- Performance bottleneck identification
- Database query optimization approach
- Asset optimization (images, bundles, etc.)
- Lazy loading strategies
</action>

<template-output>performance_considerations</template-output>

<action>Define caching strategy if applicable:
- What to cache (API responses, database queries, rendered pages, etc.)
- Cache invalidation strategy
- Cache technology (Redis, in-memory, CDN, etc.)
- TTL policies
</action>

<template-output>caching_strategy</template-output>
</step>

<step n="10" goal="Design deployment architecture">
<action>Document deployment model:
- Hosting platform (AWS, Azure, GCP, Vercel, Netlify, DigitalOcean, etc.)
- Deployment topology (single server, load balanced, serverless, etc.)
- Service architecture (monolith vs distributed services)

Match complexity to {smb_scale_level} scale.
</action>

<template-output>deployment_model</template-output>

<action>Define environment strategy:
- Development environment
- Staging/QA environment
- Production environment
- Environment configuration management
- Environment parity considerations
</action>

<template-output>environment_strategy</template-output>

<action>Document CI/CD pipeline approach:
- Source control workflow (Git flow, trunk-based, etc.)
- Build process
- Test automation integration
- Deployment process
- Rollback strategy
- Blue-green or canary deployments (if applicable)

Keep it appropriate for team size and {smb_scale_level}.
</action>

<template-output>cicd_pipeline</template-output>
</step>

<step n="11" goal="Create architecture diagrams">
<action>Create System Architecture Diagram using Mermaid syntax:

This diagram should show:
- Major system components
- Data flow between components
- External services and integrations
- User interactions

Use Mermaid graph syntax. Example structure:
```
graph TB
    User[User/Browser]
    Frontend[Frontend App]
    API[API Server]
    DB[(Database)]
    Auth[Auth Service]

    User -->|HTTPS| Frontend
    Frontend -->|API Calls| API
    API -->|Queries| DB
    API -->|Verify Token| Auth
```

Adapt to the actual architecture. Keep it clear and readable.
</action>

<template-output>system_architecture_diagram</template-output>

<action>Add notes explaining the system architecture diagram (what components do, key flows)</action>
<template-output>system_architecture_notes</template-output>

<action>Create Data Flow Diagram showing how data moves through the system:
- User actions
- Data transformations
- Storage operations
- Cache interactions

Use Mermaid flowchart or sequence diagram syntax as appropriate.
</action>

<template-output>data_flow_diagram</template-output>

<action>Add notes explaining the data flow</action>
<template-output>data_flow_notes</template-output>

<action>Create Deployment Architecture Diagram showing:
- Hosting infrastructure
- Network boundaries
- Load balancers
- Database clusters
- CDN
- External services

Use Mermaid graph syntax for deployment view.
</action>

<template-output>deployment_diagram</template-output>

<action>Add notes explaining the deployment architecture</action>
<template-output>deployment_notes</template-output>

<action>Create Component Diagram showing internal structure:
- Component boundaries
- Inter-component communication
- Module organization

Use Mermaid graph syntax.
</action>

<template-output>component_diagram</template-output>

<action>Add notes explaining the component structure</action>
<template-output>component_notes</template-output>
</step>

<step n="12" goal="Document development considerations">
<action>Define development workflow:
- Branching strategy
- Code review process
- Local development setup
- Development tools and IDE recommendations
</action>

<template-output>development_workflow</template-output>

<action>Document testing strategy:
- Unit testing approach and coverage goals
- Integration testing strategy
- End-to-end testing approach
- Performance testing
- Testing tools and frameworks

Make it practical for the team size.
</action>

<template-output>testing_strategy</template-output>

<action>Define code organization:
- Project structure
- Module organization
- Naming conventions
- File/folder patterns

Provide clear guidance for consistency.
</action>

<template-output>code_organization</template-output>
</step>

<step n="13" goal="Define monitoring and observability">
<action>Document monitoring strategy:
- What to monitor (uptime, errors, performance, business metrics)
- Monitoring tools (Datadog, New Relic, Prometheus, simple logging, etc.)
- Alerting thresholds and channels
- Dashboard requirements

Keep it appropriate for {smb_scale_level}. Don't over-monitor.
</action>

<template-output>monitoring_strategy</template-output>

<action>Define logging strategy:
- What to log
- Log levels and when to use them
- Log aggregation approach
- Log retention policies
- Structured logging format
</action>

<template-output>logging_strategy</template-output>

<action>Document error tracking:
- Error tracking tool (Sentry, Rollbar, etc.)
- Error categorization
- Alert routing
- Error resolution workflow
</action>

<template-output>error_tracking</template-output>
</step>

<step n="14" goal="Identify risks and mitigation strategies">
<action>Collaborate with {user_name} to identify 5-10 technical risks:

For each risk:
- **Risk**: [Description of the risk]
- **Likelihood**: [High/Medium/Low]
- **Impact**: [High/Medium/Low]
- **Mitigation**: [How to prevent or minimize]

Focus on real risks for this architecture and {smb_scale_level} scale.
</action>

<template-output>technical_risks</template-output>

<action>Specifically identify scalability risks:
- Database bottlenecks
- Single points of failure
- Resource constraints
- Cost scaling concerns

With mitigation approaches.
</action>

<template-output>scalability_risks</template-output>

<action>Summarize overall mitigation strategies and architecture resilience approach</action>
<template-output>mitigation_strategies</template-output>
</step>

<step n="15" goal="Plan for future considerations">
<action>Work with {user_name} to identify Phase 2 enhancements:
- Features deferred to later phases
- Technical improvements post-MVP
- Architecture evolution opportunities

Keep it realistic and prioritized.
</action>

<template-output>phase_2_enhancements</template-output>

<action>Document scalability path as usage grows:
- What changes at 10x users?
- What changes at 100x users?
- Migration paths for each scaling phase

This helps plan for success without over-engineering today.
</action>

<template-output>scalability_path</template-output>

<action>Document technical debt prevention strategies:
- Code quality standards
- Refactoring guidelines
- Architecture review cadence
- When to revisit architecture decisions
</action>

<template-output>technical_debt_prevention</template-output>
</step>

<step n="16" goal="Complete appendix and finalize document">
<action>Generate project-specific name from context</action>
<template-output>project_name</template-output>

<action>Create glossary of technical terms used in the document (10-20 key terms with brief definitions)</action>
<template-output>glossary</template-output>

<action>List references and resources:
- Technology documentation links
- Architecture pattern references
- Best practice articles
- Relevant books or guides
</action>

<template-output>references</template-output>

<action>Document architecture decision records (ADRs) for major decisions:

For each significant decision:
- **Decision**: [What was decided]
- **Status**: [Proposed/Accepted/Deprecated]
- **Context**: [Why this decision was needed]
- **Decision**: [What was chosen]
- **Consequences**: [Implications of this decision]

This creates a decision history for future reference.
</action>

<template-output>architecture_decisions</template-output>
</step>

<step n="17" goal="Review and validate architecture blueprint">
<action>Review the completed architecture blueprint with {user_name}:
- Does it accurately reflect the system design?
- Is it at the right level of detail?
- Are there any gaps or unclear areas?
- Does it feel right-sized for {smb_scale_level}?
- Will the development team understand and be able to follow this?
</action>

<action>Make any necessary revisions based on feedback</action>

<action>Explain that Sam (Stack Validator) can validate this architecture for production-readiness, and Casey (Documentation Specialist) can refine the documentation if needed</action>

<action>Suggest next steps:
1. **Validation** - Have Sam validate the architecture (*validate via Sam)
2. **Comparison** - If uncertain about architecture decisions, Dana can compare alternatives (*compare via Dana)
3. **Documentation Refinement** - Casey can polish and simplify if needed (*review via Casey)
4. **Migration Planning** - If migrating from existing architecture, Riley can help (*migrate via Riley)
</action>

<action>Thank {user_name} for collaborating on the architecture design</action>
</step>

</workflow>
