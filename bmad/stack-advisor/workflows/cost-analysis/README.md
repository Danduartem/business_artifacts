# Cost Analysis Workflow

Comprehensive financial analysis of technology stack including TCO, scaling projections, and optimization recommendations.

## Purpose

Creates detailed, multi-year cost analysis that enables informed budgeting and financial decision-making for technology stack investments.

## How to Invoke

**Direct invocation:**
```
/cost-analysis
```
or
```
workflow cost-analysis
```

**Via Morgan (Budget Analyst):**
```
agent morgan
I need a detailed cost analysis for the technology stack
```

## What This Creates

A comprehensive cost analysis document (15-25 pages) including:

1. **Executive Summary** - Key cost findings
2. **Cost Breakdown** - Detailed by category (dev, infrastructure, SaaS, ops, maintenance)
3. **3-Year TCO** - Total Cost of Ownership projection
4. **Scaling Projections** - Costs at different user levels
5. **Break-Even Analysis** - When investment is recovered (if revenue-generating)
6. **Optimization Recommendations** - Ways to reduce costs
7. **Cost Risk Analysis** - Financial risks and mitigation
8. **Alternative Comparison** - Cost vs other stack options
9. **Budget Recommendations** - With buffers and quarterly breakdown
10. **Monitoring Framework** - How to track and control costs

## Expected Duration

**60-90 minutes** depending on:
- Complexity of technology stack
- Availability of source information
- Number of third-party services
- Depth of scaling analysis required

## When to Use

### Perfect For:

- **Budget approval** - Need detailed financial justification
- **Stakeholder presentation** - Show complete financial picture
- **Comparing alternatives** - Which stack is most cost-effective?
- **Planning funding** - How much capital needed over 3 years?
- **Cost optimization** - Identify opportunities to reduce spend
- **Financial forecasting** - Project future technology costs

### Also Useful For:

- Board presentations
- Investor pitches
- Internal business cases
- RFP responses
- Strategic planning

## Prerequisites

**Helpful to have:**
- Technology stack selections
- Project timeline
- Expected user growth
- Team composition plans

**Can work without** (will gather through questions)

## Session Flow

1. **Initialize** - Load context, set parameters
2. **Development Costs** - Team, timeline, rates
3. **Infrastructure Costs** - Hosting, compute, networking
4. **Database & Storage** - Database, file storage, cache
5. **Third-Party SaaS** - Auth, payments, email, analytics, etc.
6. **Operational Costs** - DevOps, domains, tools
7. **Maintenance** - Ongoing support and updates
8. **Year 1 TCO** - Calculate total for first year
9. **Years 2 & 3** - Project future costs
10. **Scaling Projections** - Costs at different user levels
11. **Break-Even** - When investment is recovered (if applicable)
12. **Optimizations** - Identify cost savings opportunities
13. **Risk Analysis** - Financial risks and mitigation
14. **Compare Alternatives** - Cost vs other options
15. **Budget Recommendations** - With buffers and breakdown
16. **Monitoring** - Framework for ongoing cost control
17. **Finalize** - Add assumptions, generate document

## Key Features

**Comprehensive Coverage:**
- All cost categories (nothing overlooked)
- 3-year projection horizon
- Scaling scenarios
- Risk assessment

**Data-Driven:**
- Based on actual provider pricing
- Usage-based cost modeling
- Conservative estimates
- Sourced and cited

**Actionable:**
- Specific optimization recommendations
- Quantified savings opportunities
- Budget recommendations with buffers
- Monitoring framework

**Professional:**
- Stakeholder-ready quality
- Clear tables and breakdowns
- Executive summary
- Well-documented assumptions

## Output Quality

**High-quality analysis includes:**
- All costs accounted for (dev, infra, SaaS, ops, maintenance)
- 3-year TCO with yearly breakdown
- Scaling projections for multiple user levels
- Realistic pricing (current as of analysis date)
- Sourced estimates (links to pricing pages)
- Conservative buffer (15-20%)
- Clear assumptions and disclaimers
- Actionable recommendations

## Typical Cost Ranges (SMB Projects)

### Development (Initial)
- **Small project:** $50k-$150k (2-4 months, 2-3 developers)
- **Medium project:** $150k-$300k (4-6 months, 3-5 developers)
- **Large project:** $300k-$500k (6-12 months, 5-10 developers)

### Infrastructure (Year 1, 0-1000 users)
- **Minimal:** $500-$2,000/year (generous free tiers)
- **Typical:** $2,000-$10,000/year (paid tiers, multiple services)
- **High traffic:** $10,000-$30,000/year (scaling up)

### SaaS Services (Year 1)
- **Essential only:** $1,000-$5,000/year (auth, email, monitoring)
- **Standard:** $5,000-$15,000/year (+ payments, CMS, analytics)
- **Comprehensive:** $15,000-$30,000/year (full suite)

### Total Year 1 (Typical SMB)
- **Lean MVP:** $100k-$200k
- **Standard build:** $200k-$400k
- **Feature-rich:** $400k-$700k

*These are guidelines; actual costs vary by scope, team, location.*

## Best Practices

**Before Starting:**
- Review technology stack document
- Gather user growth projections
- Know team composition
- Check current provider pricing

**During Analysis:**
- Use actual provider pricing (don't guess)
- Document all assumptions
- Be conservative (overestimate slightly)
- Include all cost categories
- Think 3 years ahead

**After Generation:**
- Verify calculations
- Check against market rates
- Run sanity checks
- Get team review before presenting

## Common Use Cases

**Startup Seeking Funding:**
- Show investors total capital needed
- Project runway and burn rate
- Demonstrate fiscally responsible choices

**Corporate Project:**
- Justify budget to finance team
- Show 3-year TCO for planning
- Compare to alternative approaches

**Agency Proposal:**
- Transparent client cost breakdown
- Show value vs alternatives
- Build trust with detailed analysis

**Internal Business Case:**
- Justify technology modernization
- Show ROI of new stack
- Plan multi-year budget

## Optimization Focus

The analysis identifies savings in:

**Quick Wins** (immediate):
- Start with free tiers
- Use combined services (e.g., Supabase for DB + Auth)
- Eliminate redundant tools

**Medium-Term** (3-6 months):
- Optimize code for efficiency
- Right-size infrastructure
- Implement caching

**Long-Term** (6-12 months):
- Committed use discounts
- Volume pricing negotiations
- Evaluate cheaper alternatives

**Typical Savings:** 10-30% of baseline costs

## Break-Even Analysis

*Only for revenue-generating products*

Calculates:
- Revenue per user
- Cost per user
- Gross margin per user
- Users needed to break even
- Months to break even

Helps answer: "When will this investment pay for itself?"

## Risk Assessment

Identifies cost risks:
- Unexpected traffic spikes
- Provider price increases
- Development delays
- Currency fluctuations
- Scope creep

Each with mitigation strategy.

## Integration with Other Workflows

**Works with:**
- Technology Stack Specification (source for tech selections)
- Architecture Blueprint (infrastructure requirements)
- Executive Summary (cost overview for stakeholders)
- Migration Plan (migration costs if applicable)

**Enhances:**
- spec-generator (adds detailed cost section)
- executive-summary (provides cost data)
- Any stakeholder presentation

## Follow-Up Options

After cost analysis:

**Optimization:**
- Implement quick win recommendations
- Plan medium/long-term optimizations
- Set up cost monitoring

**Refinement:**
- Adjust based on team feedback
- Update with new pricing
- Refine scaling assumptions

**Monitoring:**
- Set up budget alerts
- Track actual vs projected
- Monthly cost reviews

## Success Indicators

**Analysis is successful when:**
- Stakeholders approve budget confidently
- No surprise costs during implementation
- Actual costs track projections (±20%)
- Optimization opportunities identified and captured
- Team has clear financial constraints

## Notes

- **Update quarterly** - pricing changes, usage evolves
- **Conservative is better** - overestimate slightly
- **Source everything** - link to pricing pages
- **3-year horizon** - think beyond Year 1
- **Buffer always** - 15-20% contingency
- **Optimization mindset** - always look for savings
- **Professional quality** - represents your financial acumen

This workflow provides the financial foundation for confident technology investment decisions.
