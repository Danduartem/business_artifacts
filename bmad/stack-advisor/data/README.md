# Stack Advisor Data Directory

Reference data, validation rules, decision frameworks, and compatibility matrices for the Stack Advisor module.

## Contents

### 1. Stack Patterns Library
**File:** `stack-patterns.yaml`

Pre-configured, proven technology stacks for common use cases.

**Contains:**
- 15+ proven stack combinations (SaaS, E-commerce, Content sites, APIs, etc.)
- Complete technology selections for each layer
- Cost estimates (dev, small production, medium production)
- Pros/cons analysis
- Team requirements
- SMB fit assessments

**Used by:** Scout, Blair, Casey

---

### 2. Decision Criteria Framework
**File:** `decision-criteria.yaml`

Comprehensive framework for evaluating and scoring technology choices.

**Contains:**
- Evaluation framework with weighted scoring
- Project type criteria (SaaS, E-commerce, Content, APIs, Real-time, Mobile)
- Technology layer criteria (Frontend, Backend, Database, Hosting)
- Trade-off frameworks (Performance vs DX, Stability vs Innovation, etc.)
- Decision patterns (Greenfield, Migration, MVP, Scale-up)
- SMB-specific guidelines by business size
- Decision trees for common choices

**Used by:** Dana, Blair, Morgan

---

### 3. Validation Rules
**File:** `validation-rules.yaml`

100+ validation rules to ensure technology choices are sound.

**Categories:**
- Currency Validation (release dates, maintenance, security)
- SMB Appropriateness (over-engineering, hiring, maintenance)
- Compatibility (versions, drivers, hosting, integrations)
- Security (auth, data protection, dependencies, compliance)
- Performance (bundle size, caching, optimization)
- Scalability (premature optimization, scale ceiling)
- Cost (free tiers, production costs, vendor lock-in)
- Team (skills, learning curve, hiring market)
- Production Readiness (monitoring, CI/CD, backups)
- Best Practices (boring tech, managed services, longevity)

**Used by:** All agents for validation

---

### 4. Compatibility Matrix
**File:** `compatibility-matrix.yaml`

Cross-reference matrix for technology compatibility and integration.

**Contains:**
- Frontend framework compatibility (with backends, databases, hosting, auth)
- Backend framework compatibility (with databases, hosting)
- Database compatibility (with each other, ORMs)
- ORM compatibility (with databases)
- Hosting platform compatibility (with frameworks, databases)
- Known incompatibilities and conflicts
- Version requirements
- Recommended stacks (proven combinations)
- Anti-patterns (combinations to avoid)
- Integration difficulty levels
- Integration patterns
- Compatibility checker rules

**Used by:** Scout, Dana, Jordan for validation and comparison

---

### 5. Decision Playbooks
**Directory:** `decision-playbooks/`

Flowchart-style decision trees for common technology decisions.

**Playbooks:**
1. **Frontend Framework Selection** (`frontend-framework.yaml`)
   - React, Vue, Svelte, Solid, Angular, meta-frameworks

2. **Backend Language & Framework** (`backend-language.yaml`)
   - Node.js, Python, Go, Ruby and their frameworks

3. **Database Selection** (`database-selection.yaml`)
   - SQL, NoSQL, time-series, key-value, search, graph databases

4. **Hosting Platform** (`hosting-platform.yaml`)
   - Vercel, Netlify, Railway, Render, Fly.io, cloud providers

5. **Authentication Strategy** (`authentication-strategy.yaml`)
   - Build vs buy, managed services, custom solutions

6. **Architecture Pattern** (`architecture-pattern.yaml`)
   - Monolith, modular monolith, microservices, serverless

7. **Rendering Strategy** (`rendering-strategy.yaml`)
   - SSG, SSR, CSR, ISR, hybrid approaches

8. **Build vs Buy Decisions** (`build-vs-buy.yaml`)
   - Framework for deciding custom vs third-party

**Used by:** All agents for guided decision-making

---

## How Stack Advisor Agents Use This Data

### Scout (Tech Research Specialist)
- References **framework-database.md** for technology details
- Uses **compatibility-matrix.yaml** to check integration feasibility
- Consults **decision-playbooks/** for research guidance
- Validates with **validation-rules.yaml** (currency, SMB fit)

### Dana (Comparison Specialist)
- Uses **decision-criteria.yaml** for weighted scoring
- References **compatibility-matrix.yaml** for integration difficulty
- Consults **decision-playbooks/** for trade-off analysis
- Cross-references **stack-patterns.yaml** for proven combinations

### Jordan (Architecture Specialist)
- Uses **stack-patterns.yaml** as starting templates
- References **compatibility-matrix.yaml** for stack validation
- Consults **architecture-pattern.yaml** playbook
- Validates against **validation-rules.yaml** (scalability, security)

### Blair (Decision Maker)
- Uses **decision-criteria.yaml** for final scoring
- References **decision-playbooks/** for decision trees
- Validates against **validation-rules.yaml** (all categories)
- Cross-checks **compatibility-matrix.yaml** for conflicts

### Morgan (Budget Analyst)
- Uses **stack-patterns.yaml** for cost estimates
- References **decision-criteria.yaml** (cost trade-offs)
- Consults **build-vs-buy.yaml** playbook
- Validates against **validation-rules.yaml** (cost category)

### Riley (Migration Specialist)
- Uses **compatibility-matrix.yaml** (migration paths)
- References **stack-patterns.yaml** for target architectures
- Validates against **validation-rules.yaml** (migration risks)

### Casey (Documentation Specialist)
- Compiles information from all data sources
- Uses **stack-patterns.yaml** for specification examples
- References **decision-criteria.yaml** for rationale documentation

---

## Data Update Cadence

### Weekly Updates
- **framework-database.md**: Check for new releases
- **validation-rules.yaml**: Update version requirements

### Monthly Updates
- **decision-criteria.yaml**: Review scoring weights
- **stack-patterns.yaml**: Update cost estimates
- **compatibility-matrix.yaml**: Add new known issues

### Quarterly Updates
- **decision-playbooks/**: Review and refine decision trees
- All files: Major revisions based on feedback

### As Needed
- New technology additions
- Breaking changes in popular frameworks
- Major pricing changes
- Security advisories

---

## File Relationships

```
decision-criteria.yaml
    ↓
    Provides scoring framework
    ↓
decision-playbooks/
    ↓
    Guides specific decisions
    ↓
stack-patterns.yaml
    ↓
    Pre-configured proven stacks
    ↓
compatibility-matrix.yaml
    ↓
    Validates stack combinations
    ↓
validation-rules.yaml
    ↓
    Final validation checks
```

---

## Data Principles

### SMB-Focused
- All recommendations prioritize SMB needs (< 50 people)
- Cost transparency required
- Operational simplicity valued
- Hiring feasibility considered

### Opinionated
- Based on proven best practices
- Boring technology preferred over bleeding edge
- Managed services preferred over self-hosted (for SMB)
- Simplicity over completeness

### Data-Driven
- Real version numbers and release dates
- Actual cost estimates (not ranges)
- Specific pros/cons (not generic)
- Measurable validation criteria

### Maintained
- Regular updates to keep current
- Version compatibility tracked
- Known issues documented
- Migration paths included

---

## Contributing

When adding or updating data:

1. **Maintain consistency** with existing structure
2. **Include SMB perspective** in all recommendations
3. **Provide rationale** for every decision/recommendation
4. **Use real numbers** for costs and metrics
5. **Document sources** for factual claims
6. **Test combinations** before recommending
7. **Update related files** when making changes

---

## Version History

**v1.0** (2025-01-14)
- Initial comprehensive data set
- 100+ frameworks in database
- 100+ validation rules
- 15+ stack patterns
- 8 decision playbooks
- Complete compatibility matrix
- Decision criteria framework

---

## Notes

- All data files use YAML for consistency and readability
- Documentation uses Markdown
- Focus on technologies relevant to SMB (not enterprise-only solutions)
- Cost estimates based on real pricing as of January 2025
- Framework versions are current as of January 2025
- Compatibility tested based on latest stable versions

---

## Support

For questions about using this data:
- See individual README files in subdirectories
- Reference BMAD module documentation
- Consult agent-specific instructions
