# Cost Analysis Quality Checklist

Use this checklist to ensure the cost analysis is complete, accurate, and actionable.

## Completeness

### All Cost Categories Covered
- [ ] Development costs (team, timeline, rates)
- [ ] Infrastructure costs (hosting, compute, networking)
- [ ] Database & storage costs
- [ ] Third-party SaaS services (auth, payments, email, etc.)
- [ ] Operational costs (DevOps, domains, tools)
- [ ] Maintenance & support costs
- [ ] Contingency/buffer included

### Time Horizons
- [ ] Year 1 costs detailed
- [ ] Year 2 costs projected
- [ ] Year 3 costs projected
- [ ] 3-year TCO calculated
- [ ] Quarterly breakdown (Year 1)

### Scaling Analysis
- [ ] Multiple user count scenarios (e.g., 100, 1k, 5k, 10k users)
- [ ] Infrastructure scaling costs
- [ ] SaaS scaling costs (usage-based services)
- [ ] Cost per user calculated
- [ ] Scaling assumptions documented

### Supporting Analysis
- [ ] Break-even analysis (if revenue-generating)
- [ ] Cost optimization recommendations (quick wins, medium, long-term)
- [ ] Cost risk analysis (3-5 key risks)
- [ ] Comparison to alternatives (if applicable)
- [ ] Budget recommendations with buffer

## Accuracy

### Pricing Verification
- [ ] **Pricing is current** - checked within last week
- [ ] **Sources cited** - links to pricing pages provided
- [ ] **Pricing date documented** - clear when prices were valid
- [ ] **Tier/plan specified** - not just "hosting", but "Vercel Pro"
- [ ] **Usage assumptions stated** - e.g., "based on 1000 MAU"

### Calculations
- [ ] **Math is correct** - totals add up
- [ ] **Percentages calculated** - category % of total
- [ ] **Annual from monthly** - monthly × 12 (or actual billing)
- [ ] **3-year TCO** - sum of all 3 years
- [ ] **Cost per user** - total cost ÷ user count
- [ ] **Break-even** - formula applied correctly

### Assumptions
- [ ] All assumptions explicitly stated
- [ ] Assumptions are realistic (not overly optimistic)
- [ ] Growth projections reasonable
- [ ] Scaling assumptions conservative
- [ ] Development estimates include buffer

## Realism

### Development Costs
- [ ] Team composition realistic for project scope
- [ ] Rates match market or provided rates
- [ ] Timeline is achievable
- [ ] Includes all phases (design, dev, testing, deployment)
- [ ] Accounts for ramp-up time

### Infrastructure Costs
- [ ] Start small (appropriate for launch scale)
- [ ] Scaling costs increase appropriately
- [ ] Not over-provisioned at start
- [ ] Free tiers utilized where possible
- [ ] Provider limits understood (e.g., Vercel function timeouts)

### SaaS Costs
- [ ] Usage-based pricing understood
- [ ] Tier jumps accounted for (e.g., Clerk after 1000 MAU)
- [ ] All necessary services included
- [ ] Not paying for enterprise features at SMB scale
- [ ] Free tier usage realistic

### Ongoing Costs
- [ ] Maintenance estimate is 15-20% of dev cost (typical)
- [ ] DevOps time realistic
- [ ] Doesn't assume zero maintenance
- [ ] Includes security updates, dependency updates

## Actionability

### Optimization Recommendations
- [ ] **Specific** - not vague ("use free tiers" → "Start with Supabase free tier")
- [ ] **Quantified** - savings amount stated
- [ ] **Feasible** - can actually be implemented
- [ ] **Prioritized** - quick wins, medium, long-term
- [ ] **Implementation noted** - how to achieve savings

### Budget Recommendations
- [ ] Total budget with buffer provided
- [ ] Buffer percentage stated (typically 15-20%)
- [ ] Quarterly breakdown for cash flow planning
- [ ] Initial vs ongoing costs separated
- [ ] Decision-ready (stakeholder can approve this)

### Monitoring Framework
- [ ] Key metrics to track defined
- [ ] Target values provided
- [ ] Alert thresholds set
- [ ] Review cadence recommended (weekly, monthly, quarterly)
- [ ] Tools suggested

## Risk Management

### Cost Risks Identified
- [ ] 3-5 key cost risks listed
- [ ] Impact level indicated (Low/Medium/High)
- [ ] Potential cost impact quantified
- [ ] Mitigation strategy for each risk
- [ ] Realistic (not fear-mongering, not ignoring)

### Uncertainty Acknowledged
- [ ] Disclaimers included
- [ ] Assumptions clearly stated
- [ ] "Actual costs may vary" messaging
- [ ] Recommendation to review quarterly
- [ ] Provider pricing change risk noted

## Presentation Quality

### Structure
- [ ] Executive summary at top
- [ ] Logical flow of sections
- [ ] Tables used for cost breakdowns
- [ ] Clear headers and subheaders
- [ ] Scannable (bullets, tables, not walls of text)

### Clarity
- [ ] Currency specified (USD, EUR, etc.)
- [ ] Costs formatted consistently ($1,234 or $1.2k)
- [ ] Abbreviations explained (TCO, MAU, etc.)
- [ ] No ambiguous terms
- [ ] Professional language

### Professional Quality
- [ ] No typos or grammar errors
- [ ] Consistent formatting
- [ ] Tables aligned and complete
- [ ] Numbers make sense (no obvious errors)
- [ ] Ready to present to stakeholders

## Validation Tests

### The "CFO Test"
- [ ] CFO could use this to approve budget
- [ ] All financial questions answered
- [ ] ROI or TCO justification clear
- [ ] Risks and mitigations addressed

### The "Sanity Check"
- [ ] Costs seem reasonable for project scope
- [ ] Not wildly higher/lower than market
- [ ] Scaling makes sense
- [ ] No obvious missing costs

### The "Decision Test"
- [ ] Stakeholder could approve budget from this analysis
- [ ] Clear what needs to be spent and when
- [ ] Alternatives considered (shows due diligence)
- [ ] Optimization opportunities identified

## Common Mistakes to Avoid

### Cost Estimation Errors
- [ ] ❌ **Avoid:** Forgetting ongoing costs (only listing one-time)
- [ ] ❌ **Avoid:** Using old pricing (check current rates)
- [ ] ❌ **Avoid:** Ignoring usage-based scaling
- [ ] ❌ **Avoid:** Not including buffer/contingency
- [ ] ❌ **Avoid:** Overly precise numbers ($1,234.56 instead of $1,200)

### Analysis Errors
- [ ] ❌ **Avoid:** Not showing your work (no sources, no assumptions)
- [ ] ❌ **Avoid:** Cherry-picking costs (hiding expensive items)
- [ ] ❌ **Avoid:** Unrealistic optimizations ("we'll save 90%!")
- [ ] ❌ **Avoid:** Ignoring future costs (only Year 1)
- [ ] ❌ **Avoid:** No comparison to alternatives

### Presentation Errors
- [ ] ❌ **Avoid:** Walls of text (use tables)
- [ ] ❌ **Avoid:** Inconsistent formatting
- [ ] ❌ **Avoid:** No executive summary
- [ ] ❌ **Avoid:** Burying key numbers deep in document
- [ ] ❌ **Avoid:** No clear total or TCO

## Specific Number Checks

### Development Costs
- [ ] Typical: $50k-$300k for SMB SaaS MVP (4-6 month timeline)
- [ ] If outside this range, explanation provided
- [ ] Team size reasonable (2-5 people for SMB)
- [ ] Rates: $80-150k/year full-time or $100-200/hour contract

### Infrastructure (Year 1, Small Scale)
- [ ] Typical: $500-$5,000/year for 0-1000 users
- [ ] Start cheap (free tiers), scale up
- [ ] Not spending $10k/month at launch

### SaaS Services (Year 1)
- [ ] Typical: $1,000-$10,000/year for essential services
- [ ] Auth: $0-$500/year initially
- [ ] Payments: % of transactions (not flat fee)
- [ ] Email: $0-$500/year initially

### Total Year 1 (SMB Project)
- [ ] Typical range: $100k-$500k all-in
- [ ] If < $50k: probably missing costs
- [ ] If > $1M: probably over-engineered for SMB

## Final Checks

Before delivering:

- [ ] All template variables filled
- [ ] No [PLACEHOLDER] text remaining
- [ ] Tables are complete
- [ ] Calculations verified
- [ ] Sources linked
- [ ] Date and version noted
- [ ] Executive summary compelling
- [ ] Ready for stakeholder presentation

## Scoring

Rate each section:
- ✅ **Complete & Accurate**
- ⚠️ **Needs Minor Revision**
- ❌ **Incomplete or Inaccurate**

**Target:** All sections should be ✅ before delivering.

## If Checks Fail

### Minor issues (⚠️):
- Revise specific sections
- Verify calculations
- Add missing details

### Major issues (❌):
- Gather more information
- Re-check pricing
- Redo calculations
- Don't deliver until fixed

## Remember

This analysis will:
- **Inform budget decisions** - accuracy matters
- **Set expectations** - be realistic
- **Guide planning** - be actionable
- **Build credibility** - be thorough

A good cost analysis prevents budget surprises and enables confident decision-making.
