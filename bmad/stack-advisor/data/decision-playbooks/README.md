# Decision Playbooks

Reusable, flowchart-style decision trees for common technology selection decisions in the Stack Advisor module.

## Overview

Decision playbooks provide structured, step-by-step guidance for making technology choices. Each playbook contains:

- **Decision Tree**: Flowchart-style questions leading to recommendations
- **Quick Reference**: Fast lookup tables by use case, priority, team size, etc.
- **Detailed Comparisons**: Pros/cons, costs, performance metrics
- **SMB Guidance**: Specific recommendations for small/medium businesses
- **Red Flags**: Warning signs when a choice doesn't fit
- **Common Patterns**: Proven combinations that work well together

## Available Playbooks

### 1. Frontend Framework Selection
**File:** `frontend-framework.yaml`

Helps choose between React, Vue, Svelte, Solid, Angular, and their meta-frameworks (Next.js, Nuxt, Remix, SvelteKit, Astro).

**Key Decision Points:**
- Project type (static site, SPA, SSR app)
- Team experience level
- Performance requirements
- SEO needs

**Best For:** Scout (Tech Research Specialist), Dana (Comparison Specialist)

---

### 2. Backend Language & Framework Selection
**File:** `backend-language.yaml`

Guides selection between Node.js, Python, Go, Ruby, and their frameworks (Express, FastAPI, Django, Gin, Rails, etc.).

**Key Decision Points:**
- Backend type (REST API, real-time, microservices)
- Team skills
- Performance vs productivity trade-offs
- Scale requirements

**Best For:** Scout, Dana

---

### 3. Database Selection
**File:** `database-selection.yaml`

Helps choose between PostgreSQL, MySQL, MongoDB, Redis, SQLite, and specialized databases (TimescaleDB, Elasticsearch, Neo4j).

**Key Decision Points:**
- Data type (structured, semi-structured, time-series, key-value)
- Query patterns
- Scale expectations
- Team expertise

**Best For:** Scout, Dana, Jordan (Architecture Specialist)

---

### 4. Hosting Platform Selection
**File:** `hosting-platform.yaml`

Compares Vercel, Netlify, Railway, Render, Fly.io, Cloudflare, DigitalOcean, and cloud providers.

**Key Decision Points:**
- Application type (static, fullstack, API, serverless)
- Budget constraints
- Operational complexity tolerance
- Global distribution needs

**Best For:** Scout, Jordan

---

### 5. Authentication Strategy
**File:** `authentication-strategy.yaml`

Decides between managed auth services (Clerk, Auth0, Supabase Auth) vs building custom.

**Key Decision Points:**
- Build vs buy assessment
- B2B vs B2C needs
- Budget constraints
- Security requirements (SSO, MFA)

**Best For:** Scout, Dana, Blair (Decision Maker)

---

### 6. Architecture Pattern Selection
**File:** `architecture-pattern.yaml`

Chooses between monolith, modular monolith, microservices, and serverless architectures.

**Key Decision Points:**
- Team size and structure
- Operational capabilities
- Scaling needs (real vs perceived)
- Product maturity

**Best For:** Jordan, Blair, Dana

---

### 7. Rendering Strategy Selection
**File:** `rendering-strategy.yaml`

Decides between SSG, SSR, CSR, ISR, and hybrid approaches for frontend applications.

**Key Decision Points:**
- Content type (static, dynamic, personalized)
- SEO requirements
- Update frequency
- Performance priorities

**Best For:** Scout, Jordan

---

### 8. Build vs Buy Decisions
**File:** `build-vs-buy.yaml`

Framework for deciding whether to build features custom or use third-party services.

**Categories Covered:**
- Authentication
- Payments
- Email
- File storage
- Analytics
- Search
- Real-time features
- CMS

**Best For:** Blair, Morgan (Budget Analyst), Dana

---

## How to Use

### For BMAD Agents

Agents can reference these playbooks when:

1. **Scout** is researching technology options
2. **Dana** is creating comparison matrices
3. **Jordan** is designing architecture
4. **Blair** is making final decisions
5. **Morgan** is analyzing costs

### Usage Pattern

```yaml
# In agent workflow or instructions:
1. Identify the decision type
2. Load relevant playbook
3. Follow decision tree based on user's answers
4. Reference quick reference for common scenarios
5. Present recommendations with rationale
6. Include cost and risk analysis
```

### Example Integration

```markdown
Based on your project requirements, let me consult the Frontend Framework
decision playbook...

Following the decision tree:
- Project type: Interactive web app → react_experience
- Team experience: Experienced with React → react_experience
- Need SSR: Yes for SEO → **Recommendation: Next.js 14 (App Router)**

Rationale: Industry standard, excellent SEO, great ecosystem, easy deployment

Cost: Free tier available (Vercel), $20/month Pro
Team fit: Your team already knows React, Next.js adds minimal learning curve
```

## Playbook Structure

Each playbook follows this structure:

```yaml
playbook:
  name: "Playbook Name"
  description: "What this helps with"
  version: "1.0"
  last_updated: "YYYY-MM-DD"

decision_tree:
  start:
    question: "Initial question"
    options:
      - label: "Option 1"
        next: "node_name"
      - label: "Option 2"
        recommendation: "Technology/Approach"
        rationale: "Why this choice"
        next: null  # Terminal node

  node_name:
    question: "Follow-up question"
    context: "Additional context for decision"
    options:
      # ... more options

quick_reference:
  by_use_case:
    use_case_1: "Recommendation"
  by_priority:
    priority_1: "Recommendation"
  # ... more lookup tables

# ... detailed comparisons, costs, patterns, etc.
```

## SMB Focus

All playbooks include SMB-specific guidance:

- **Micro business (1-2 people)**: Simplest options, minimal operations
- **Small business (3-10 people)**: Balance of features and simplicity
- **Medium business (10-50 people)**: Can handle more complexity

Recommendations prioritize:
- Time to market over perfection
- Managed services over self-hosted
- Simplicity over complexity
- Boring tech over bleeding edge

## Cost Transparency

Each playbook includes cost estimates for:
- Free tier options
- Small scale (< 1k users)
- Medium scale (1k-100k users)
- Large scale (100k+ users)

## Red Flags

Every playbook identifies warning signs when a technology choice doesn't fit:
- Team size mismatches
- Over-engineering risks
- Cost traps
- Operational complexity beyond team capability

## Updates

Playbooks are living documents and should be updated when:
- New technologies emerge as viable options
- Pricing changes significantly
- Best practices evolve
- User feedback identifies gaps

**Last Updated:** 2025-01-14
**Version:** 1.0

## Integration Points

### With Stack Patterns
Decision playbooks work with `stack-patterns.yaml` to provide both:
- **Playbooks**: Decision-making process
- **Patterns**: Proven complete stacks

### With Validation Rules
Playbooks reference `validation-rules.yaml` for:
- Currency checks
- Compatibility validations
- SMB appropriateness

### With Decision Criteria
Playbooks extend `decision-criteria.yaml` with:
- Specific technology decisions
- Detailed cost-benefit analysis
- Migration paths

## Notes

- Playbooks are **opinionated** based on SMB best practices
- Recommendations favor **proven technologies** over cutting edge
- **Simplicity** is valued over completeness
- **Cost transparency** is critical for SMB decision-making
- All recommendations include **rationale** for learning

## Contributing

When adding or updating playbooks:

1. Follow the existing YAML structure
2. Include SMB-specific guidance
3. Add cost estimates (real numbers, not ranges)
4. Provide rationale for every recommendation
5. Identify red flags and anti-patterns
6. Include migration paths when relevant
7. Keep language accessible (avoid jargon or explain it)
