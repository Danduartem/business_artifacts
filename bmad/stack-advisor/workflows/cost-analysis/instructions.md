# Cost Analysis - Technology Stack Financial Analysis

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/stack-advisor/workflows/cost-analysis/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the cost analysis process</critical>

<workflow>

<step n="1" goal="Initialize document and load context">
<action>Write the template to {default_output_file} with all placeholders</action>

<action>Welcome {user_name} to the Cost Analysis workflow</action>

<action>Explain Morgan's role and this workflow's purpose in {communication_language}:
"I'll help you create a comprehensive cost analysis for your technology stack. This will include:
- Detailed cost breakdown
- 3-year TCO projections
- Scaling cost estimates
- Break-even analysis
- Cost optimization recommendations

This workflow produces

This analysis produces:
- Complete cost breakdown by category
- 3-year Total Cost of Ownership (TCO)
- Cost scaling projections
- Break-even analysis
- Cost optimization recommendations
- Budget recommendations with buffers

**Duration:** 60-90 minutes

## Preparation

Before starting, ideally have:
- Technology stack selections
- Project scope and timeline
- Expected user growth projections
- Team composition plans

Can work with partial information and fill gaps through questions.

---

## Step 1: Initialize & Load Context

**Greet and explain:**

"I'll help you create a comprehensive cost analysis for your technology stack. This will include:
- Detailed cost breakdown
- 3-year TCO projections
- Scaling cost estimates
- Break-even analysis
- Cost optimization recommendations

This usually takes 60-90 minutes. Do you have:
1. Technology stack document? (helps identify all costs)
2. Project timeline? (helps estimate development costs)
3. Expected user growth? (helps project scaling costs)"

**Load any provided documents.**

**Capture basic metadata:**

```
<template-output id="project_name">
[Project name]
</template-output>

<template-output id="date">
[Today's date]
</template-output>

<template-output id="analysis_period">
[e.g., "3 years (2025-2027)"]
</template-output>

<template-output id="currency">
[e.g., "USD"]
</template-output>
```

---

## Step 2: Development Costs

### Team Composition

**Ask:**
"Let's start with development costs. What's your planned team composition?

For example:
- 2 frontend developers (full-time, 4 months)
- 1 backend developer (full-time, 4 months)
- 1 DevOps engineer (part-time, 2 months)
- 1 designer (contract, 2 months)"

**For each role, capture:**
- Role
- Full-time / Part-time / Contract
- Duration
- Rate (if known) or use market rate

**Calculate development cost:**

Example calculation:
```
Frontend Dev: 2 people × $100k/year ÷ 12 months × 4 months = $66,667
Backend Dev: 1 person × $110k/year ÷ 12 months × 4 months = $36,667
DevOps: 1 person × $120k/year ÷ 12 months × 2 months × 0.5 FTE = $10,000
Designer: $8,000 (contract)
Total: $121,334
```

**Present:**

```
<template-output id="dev_costs">
[
  {item: "Frontend Development (2 FTE × 4 months)", cost: "$66,667", notes: "React/Next.js"},
  {item: "Backend Development (1 FTE × 4 months)", cost: "$36,667", notes: "FastAPI/Python"},
  ... more items
]
</template-output>

<template-output id="total_dev_cost">
$121,334
</template-output>

<template-output id="dev_timeline">
4 months (primary development)
</template-output>
```

---

## Step 3: Infrastructure Costs

### Hosting & Compute

**Ask about each layer:**

"What hosting platform did you choose for:
- Frontend: [e.g., Vercel]
- Backend: [e.g., Railway]
- Additional: [any other hosting needs]"

**For each service, ask:**
- "What tier/plan?" (Hobby, Pro, Team, etc.)
- "Estimated monthly cost?"

**Use known pricing if available:**
- Vercel Pro: $20/user/month
- Railway: $5/month + usage
- Render: $7/month per service
- etc.

**Present:**

```
<template-output id="hosting_costs">
[
  {service: "Frontend Hosting", provider: "Vercel", tier: "Pro", monthly: "$20", annual: "$240"},
  {service: "Backend API", provider: "Railway", tier: "Starter + Usage", monthly: "$20", annual: "$240"},
  ... more
]
</template-output>

<template-output id="total_hosting_monthly">
$40
</template-output>

<template-output id="total_hosting_annual">
$480
</template-output>
```

### Database & Storage

**Ask:**
"What database and storage services?
- Database: [e.g., PostgreSQL on Supabase]
- File storage: [e.g., Cloudflare R2]
- Cache: [e.g., Redis on Upstash]"

**For each, determine tier and cost.**

**Present:**

```
<template-output id="database_costs">
[
  {service: "PostgreSQL Database", provider: "Supabase", tier: "Pro", monthly: "$25", annual: "$300"},
  {service: "Redis Cache", provider: "Upstash", tier: "Pay-as-you-go", monthly: "$10", annual: "$120"},
  ... more
]
</template-output>

<template-output id="total_database_monthly">
$35
</template-output>

<template-output id="total_database_annual">
$420
</template-output>
```

### Additional Infrastructure Services

**Ask:**
"Any additional infrastructure?
- CDN (beyond hosting provider)
- DNS
- SSL certificates
- Monitoring
- Logging"

**Most of these are often included in hosting, but capture if separate.**

---

## Step 4: Third-Party SaaS & Services

**Ask about each category:**

### Authentication
"Are you using a managed auth service?
- Clerk: $25/month + $0.02/MAU after 1000
- Auth0: $240/month
- Supabase Auth: Free up to 50k MAU
- None (custom): $0"

### Payments
"Payment processing?
- Stripe: 2.9% + $0.30 per transaction
- PayPal: Similar rates
- None yet: $0"

### Email
"Email service?
- Resend: $20/month for 50k emails
- SendGrid: $15-20/month
- Amazon SES: Pay-per-email
- None yet: $0"

### Others
"Any other SaaS services?
- CMS (Sanity, Contentful)
- Analytics (PostHog, Mixpanel)
- Monitoring (Sentry, LogRocket)
- Search (Algolia, Meilisearch)
- etc."

**For each service:**
- Determine current usage-based cost
- Project future cost based on growth

**Present:**

```
<template-output id="saas_costs">
[
  {service: "Authentication", purpose: "User auth", tier: "Clerk Pro", monthly: "$25", annual: "$300"},
  {service: "Payments", purpose: "Transaction processing", tier: "Stripe (estimated)", monthly: "$50", annual: "$600"},
  {service: "Email", purpose: "Transactional emails", tier: "Resend", monthly: "$20", annual: "$240"},
  ... more
]
</template-output>

<template-output id="total_saas_monthly">
$95
</template-output>

<template-output id="total_saas_annual">
$1,140
</template-output>
```

---

## Step 5: Operational Costs

**Operational costs include:**

- **DevOps/maintenance time** (ongoing)
- **Domain names** ($12-15/year)
- **Development tools** (GitHub, CI/CD, etc.)
- **Communication tools** (Slack, etc. - if project-specific)
- **Backup solutions** (if separate from hosting)

**Ask:**
"What operational costs will you have?
- Ongoing DevOps/maintenance: [hours per month × rate]
- Domain names: [$12-15/year]
- Tools & subscriptions: [any project-specific tools]"

**Present:**

```
<template-output id="operational_costs">
[
  {category: "DevOps Maintenance", description: "10 hours/month at $120/hour", monthly: "$1,200", annual: "$14,400"},
  {category: "Domain & DNS", description: "Domain registration", monthly: "$1", annual: "$15"},
  ... more
]
</template-output>

<template-output id="total_operational_monthly">
$1,201
</template-output>

<template-output id="total_operational_annual">
$14,415
</template-output>
```

---

## Step 6: Maintenance & Support Costs

**Annual maintenance includes:**
- Ongoing feature development
- Security updates
- Dependency updates
- Performance optimization
- Bug fixes
- Support

**Ask:**
"After initial development, what ongoing maintenance?
- Quarterly feature updates?
- Security/dependency updates monthly?
- Estimated time/cost?"

**Common approach:** 15-20% of initial development cost annually

**Present:**

```
<template-output id="maintenance_costs">
[
  {item: "Security & Dependency Updates", description: "Monthly updates, ~20 hours/month", cost: "$28,800"},
  {item: "Quarterly Feature Enhancements", description: "New features and improvements", cost: "$40,000"},
  ... more
]
</template-output>

<template-output id="total_maintenance_annual">
$68,800
</template-output>
```

---

## Step 7: Calculate Year 1 TCO

**Sum all Year 1 costs:**

Development (one-time) + Infrastructure + SaaS + Operational + Maintenance

**Calculate percentages:**

**Present:**

```
<template-output id="year1_development">
$121,334
</template-output>

<template-output id="year1_infrastructure">
$900 (hosting $480 + database $420)
</template-output>

<template-output id="year1_saas">
$1,140
</template-output>

<template-output id="year1_operational">
$14,415
</template-output>

<template-output id="year1_maintenance">
$68,800
</template-output>

<template-output id="total_year1">
$206,589
</template-output>

[Calculate and fill percentages for each category]
```

---

## Step 8: Project Years 2 & 3

**Year 2 Changes:**
- No initial development (one-time)
- Infrastructure may increase (more users)
- New features/enhancements (smaller than initial)
- Maintenance continues

**Year 3 Changes:**
- Further infrastructure scaling
- Continued enhancements
- Maintenance continues

**Ask:**
"Expected growth trajectory?
- Year 2: [user count, revenue]
- Year 3: [user count, revenue]"

**Project costs based on growth:**

Example:
- Infrastructure scales with users (estimate)
- SaaS often has usage tiers
- Maintenance relatively stable
- New development for enhancements

**Present Years 2 & 3 breakdowns similar to Year 1.**

---

## Step 9: Cost Scaling Projections

**Create table showing how costs scale with users:**

**Ask:**
"Let's project costs at different user levels. What milestones?
- Launch: 100 users
- 6 months: 500 users
- 1 year: 1,000 users
- 2 years: 5,000 users
- 3 years: 10,000 users"

**For each milestone, estimate:**
- Infrastructure cost (hosting scales)
- SaaS cost (auth, etc. often scale with MAU)

**Present:**

```
<template-output id="scaling_projections">
[
  {user_count: "100", infrastructure: "$40", saas: "$95", monthly_total: "$135", annual_total: "$1,620"},
  {user_count: "1,000", infrastructure: "$80", saas: "$145", monthly_total: "$225", annual_total: "$2,700"},
  {user_count: "5,000", infrastructure: "$200", saas: "$295", monthly_total: "$495", annual_total: "$5,940"},
  {user_count: "10,000", infrastructure: "$400", saas: "$495", monthly_total: "$895", annual_total: "$10,740"}
]
</template-output>

<template-output id="scaling_assumptions">
Assumptions:
- Infrastructure scales linearly with traffic (conservative estimate)
- Auth costs based on Clerk pricing ($0.02/MAU after 1000)
- Payment processing scales with transactions (estimated 2% of users transact monthly)
- Database and hosting have tiered pricing jumps at certain thresholds
</template-output>
```

---

## Step 10: Break-Even Analysis

**Only if applicable (revenue-generating product):**

**Ask:**
"Is this a revenue-generating product?
- Monthly subscription: $[amount]/user
- Transaction fees: [percentage]
- Other revenue: [describe]

Or
- Not applicable (internal tool, free product, etc.)"

**If revenue-generating, calculate break-even:**

Formula:
```
Monthly Revenue per User - Monthly Cost per User = Gross Margin per User
Total Investment ÷ Gross Margin per User = Users Needed to Break Even
```

**Present:**

```
<template-output id="revenue_assumptions">
- Monthly subscription: $10/user
- Average customer lifetime: 24 months
- Payment processing costs: 3% of revenue
</template-output>

<template-output id="total_investment_year1">
$206,589
</template-output>

<template-output id="monthly_revenue_per_user">
$10
</template-output>

<template-output id="monthly_cost_per_user">
$2 (at 1000 users: $2,700/month ÷ 1000)
</template-output>

<template-output id="gross_margin_per_user">
$8 (revenue $10 - cost $2)
</template-output>

<template-output id="breakeven_users">
2,157 users (investment $206,589 ÷ $8 ÷ 12 months)
</template-output>

<template-output id="breakeven_months">
18-24 months (depending on growth rate)
</template-output>
```

**If not revenue-generating, skip this section.**

---

## Step 11: Cost Optimization Recommendations

**Identify opportunities to reduce costs:**

### Quick Wins
Things that can be done immediately:
- Use free tiers where possible
- Start with lower hosting tiers
- Combine services (e.g., Supabase for DB + Auth)

### Medium-term
Things to implement in 3-6 months:
- Optimize database queries
- Implement caching
- Review and downgrade unused services

### Long-term
Things for 6-12 months out:
- Consider reserved instances / committed use discounts
- Migrate expensive services if cheaper alternatives emerge
- Implement cost monitoring and alerts

**For each recommendation:**

```
<template-output id="quick_wins">
[
  {
    optimization_title: "Use Supabase free tier initially",
    current_cost: "$300/year (Pro plan)",
    optimized_cost: "$0/year (Free tier - 50k MAU limit)",
    savings: "$300",
    savings_percent: "100",
    implementation: "Start on free tier, upgrade when approaching limits"
  },
  ... more
]
</template-output>

[Similar for medium_term_optimizations and long_term_optimizations]

<template-output id="total_optimization_savings">
$2,400 annually (if all implemented)
</template-output>
```

---

## Step 12: Cost Risk Analysis

**Identify cost-related risks:**

Common cost risks:
- Unexpected usage spikes
- Provider price increases
- Underestimated development time
- Third-party service changes
- Currency fluctuations (if international)

**For each risk:**

```
<template-output id="cost_risks">
[
  {
    risk_title: "Unexpected Traffic Spikes",
    impact_level: "Medium",
    risk_description: "Viral growth or marketing campaign could cause 10x traffic increase",
    cost_impact: "$500-1000/month additional infrastructure costs",
    mitigation: "Implement auto-scaling with budget alerts, have contingency budget of 20%"
  },
  ... more (3-5 risks total)
]
</template-output>
```

---

## Step 13: Compare to Alternatives

**If alternative stacks were considered:**

**Ask:**
"Were alternative technology stacks considered? I can compare costs."

**For each alternative:**
- Estimate Year 1 cost
- Estimate 3-year TCO
- Note why cost difference exists

**Present:**

```
<template-output id="alternative_stacks">
[
  {
    stack_name: "WordPress + WooCommerce",
    year1_cost: "$15,000",
    tco_3year: "$45,000",
    notes: "Lower initial development but higher ongoing costs for customization"
  },
  {
    stack_name: "Enterprise Stack (AWS + Enterprise DBs)",
    year1_cost: "$450,000",
    tco_3year: "$800,000",
    notes: "Significantly more expensive, over-engineered for SMB scale"
  }
]
</template-output>

<template-output id="cost_benefit_analysis">
Recommended stack offers best balance:
- 30% more expensive than WordPress but 5x more flexible
- 50% less expensive than enterprise stack with similar capabilities at SMB scale
- Lowest TCO when factoring in development speed and maintenance burden
</template-output>
```

---

## Step 14: Budget Recommendations

**Add buffer for contingencies:**

Common practice: 15-20% buffer for unexpected costs

**Create quarterly breakdown for Year 1:**

Development costs usually front-loaded (Q1-Q2)
Infrastructure/SaaS spread evenly
Operational costs even across quarters

**Present:**

```
<template-output id="buffer_percent">
20
</template-output>

[Calculate budget with buffers for each category]

<template-output id="total_budget_year1">
$206,589
</template-output>

<template-output id="total_buffer">
$41,318 (20%)
</template-output>

<template-output id="grand_total_year1">
$247,907
</template-output>

[Create quarterly breakdown table]
```

---

## Step 15: Cost Monitoring Recommendations

**Define what to track:**

Key metrics:
- Monthly infrastructure spend
- Cost per user
- Cost per transaction (if applicable)
- Actual vs budget variance
- Burn rate

**Recommend monitoring:**

```
<template-output id="cost_metrics">
[
  {
    metric_name: "Monthly Infrastructure Cost",
    metric_description: "Total hosting, database, and infrastructure",
    metric_target: "$135/month (first 100 users)",
    metric_threshold: "$200/month (alert if exceeded without user growth)"
  },
  ... more metrics
]
</template-output>

<template-output id="monitoring_tools_recommendations">
- Use provider dashboards (Vercel, Railway, etc.) for service-level costs
- Set up budget alerts in each service
- Consolidate billing through Stripe Climate or similar (if available)
- Weekly review in team stand-up
- Monthly financial review with detailed analysis
</template-output>

<template-output id="weekly_review">
Check dashboards for anomalies
</template-output>

<template-output id="monthly_review">
Full cost breakdown vs budget, trend analysis
</template-output>

<template-output id="quarterly_review">
TCO projection update, optimization review, budget adjustment for next quarter
</template-output>
```

---

## Step 16: Assumptions & Disclaimers

**Document all assumptions made:**

```
<template-output id="assumptions">
[
  "Pricing based on provider public pricing as of [date]",
  "User growth projections provided by client",
  "Development team rates based on [market/provided rates]",
  "Infrastructure scaling assumes linear growth (conservative)",
  "No major provider pricing changes during analysis period",
  "Exchange rates stable (if applicable)",
  ... more
]
</template-output>

<template-output id="disclaimers">
This cost analysis is based on current provider pricing and projected usage. Actual costs may vary based on:
- Usage patterns and traffic
- Provider pricing changes
- Implementation decisions
- Market conditions
- Currency fluctuations

Regular review and updates recommended quarterly. Costs should be validated before making commitments.
</template-output>
```

---

## Step 17: Finalize & Generate

**Write executive summary at the top:**

2-3 paragraphs summarizing:
- Total first year investment
- 3-year TCO
- Key cost drivers
- Scaling behavior
- Primary recommendations

**Capture metadata:**

```
<template-output id="version">
1.0
</template-output>

<template-output id="prepared_by">
[Your name or "Stack Advisor - Morgan"]
</template-output>

<template-output id="pricing_date">
[Today's date - when pricing was checked]
</template-output>
```

**Generate full document.**

**Present to user:**

"Your comprehensive cost analysis is complete! This document includes:

✅ Complete cost breakdown by category
✅ 3-year TCO projection: [amount]
✅ Cost scaling projections by user count
✅ Break-even analysis [if applicable]
✅ Cost optimization recommendations (potential savings: [amount])
✅ Budget recommendations with 20% buffer
✅ Cost monitoring framework

Key findings:
- First year total: [amount]
- Monthly run rate: [amount]
- Cost per user at scale: [amount]

Would you like me to:
- Dive deeper into any cost category?
- Explore additional optimization opportunities?
- Create a simplified version for executives?"

---

## Quality Guidelines

### Cost Estimates Should Be:

- **Realistic** - not overly optimistic
- **Detailed** - show your work
- **Sourced** - link to pricing pages
- **Current** - use latest pricing
- **Conservative** - better to overestimate than underestimate

### Avoid:

- Overly precise numbers ($1,234.56) - use rounded estimates
- Hiding costs - include everything
- Unrealistic optimizations - only recommend feasible savings
- Ignoring future costs - think 3 years out

### Tone:

- **Analytical** - data-driven
- **Transparent** - show assumptions
- **Practical** - actionable recommendations
- **Balanced** - acknowledge risks and uncertainties

The cost analysis should give stakeholders confidence in the financial planning while being honest about uncertainties and risks.
</action>

<action>Thank {user_name} for collaborating on the cost analysis</action>
</step>

</workflow>
