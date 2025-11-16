# Audit Competitor Workflow Instructions
# Module: offer-forge
# Version: 1.0.0 (V3)

## Mission

Conduct comprehensive competitive intelligence analysis to inform positioning, pricing, and differentiation strategies. This workflow systematically analyzes 2-5 competitors across pricing, positioning, structure, and marketing dimensions to identify market gaps and competitive advantages.

**Use Cases**:
- Pre-launch market research
- Quarterly competitive review
- Losing deals to specific competitors
- Planning repositioning strategy
- Preparing for competitive pricing changes
- Identifying white space opportunities

---

## Critical Actions

1. **Load Configuration** - Load `{project-root}/bmad/offer-forge/config.yaml`
2. **Set User Context** - Remember `{user_name}`, communicate in `{communication_language}`
3. **Verify Web Search** - Web search must be available for competitive research
4. **Set Audit ID** - Generate unique audit ID: `audit-{date}-{random}`

---

## Phase 1: Identify & Prioritize Competitors

**Goal**: Confirm competitors and prioritize analysis depth.

**Interaction Level**: HIGH

**Process**:

### Question 1: Who are your competitors?

> "List 2-5 competitors to analyze (company names or URLs):
>
> 1. _________________ (Primary competitor)
> 2. _________________ (Secondary)
> 3. _________________ (Optional)
> 4. _________________ (Optional)
> 5. _________________ (Optional)
>
> **Note**: More competitors = longer analysis (5-10 min per competitor)"

**Store as**: `competitor_list`

---

### Question 2: Analysis Depth

> "How deep should the analysis go?
>
> **1. Quick Scan** (15-20 min total)
>    - Pricing and basic positioning only
>    - Good for: Quick checks, frequent updates
>
> **2. Standard Analysis** (30-45 min total) ← Recommended
>    - Pricing, positioning, structure, marketing
>    - Good for: Quarterly reviews, repositioning
>
> **3. Comprehensive Audit** (60-90 min total)
>    - Everything + sales page teardown + win/loss analysis
>    - Good for: Pre-launch, major strategy shifts
>
> Choose [1-3]:"

**Store as**: `analysis_depth`

---

### Question 3: Comparative Context (Optional)

> "Do you have an existing offer stack to compare against?
>
> **Yes**: Provide path to your offer stack: _____
> **No**: Skip comparative analysis (we'll still provide recommendations)
>
> **Note**: Providing your stack enables direct comparison and personalized recommendations."

**Store as**: `your_offer_stack_path` (optional)

---

### Question 4: Specific Focus Areas (Optional)

> "Any specific areas to focus on?
>
> - [ ] Pricing strategies (they're cheaper/more expensive)
> - [ ] Messaging that resonates (they have better copy)
> - [ ] Feature differentiation (they have X we don't)
> - [ ] Tier structures (their tiers work better)
> - [ ] All areas equally"

**Store as**: `focus_areas`

---

## Phase 2: Research Competitor Offers

**Goal**: Gather comprehensive competitive intelligence via web search.

**Interaction Level**: LOW (Automated web research)

**Process**:

For EACH competitor in `competitor_list`:

### Step 1: Find Offer Pages

Use web search to find:
- Main sales/offer pages
- Pricing pages
- Features/benefits pages
- Testimonials/social proof
- About/team pages (for positioning context)

### Step 2: Extract Key Data

**Pricing Data**:
- Price points for all tiers (if tiered)
- Single price (if one tier)
- Payment options (one-time, payment plan, subscription)
- Discounts or promotions visible
- Currency and framing

**Offer Structure Data**:
- Number of tiers (1, 2, 3+)
- Tier names and positioning
- Features by tier
- Support levels (self-serve, done-with-you, done-for-you)
- Access levels (group, small group, 1-on-1)
- Deliverables promised

**Positioning Data**:
- Target audience (who it's for)
- Main value proposition / headline
- Unique selling propositions
- Transformation promise (before → after)
- Brand voice/tone
- Awareness level targeting (Schwartz 1-5)

**Marketing Elements Data**:
- Sales page length and structure
- Social proof (testimonials, case studies, stats)
- Urgency tactics (scarcity, deadlines, limited spots)
- Guarantee/risk reversal
- CTA (call-to-action) clarity and strength

**Store all as**: `competitor_data[competitor_name]`

### Step 3: Take Screenshots (Mental Note)

Note key elements for later reference:
- Pricing table
- Headline/hero section
- USPs section
- Social proof section

---

## Phase 3: Analyze Competitive Pricing

**Goal**: Deep dive on pricing strategies across all competitors.

**Agent**: `pricing-strategist`

**Instructions**:
> "Analyze competitive pricing landscape.
>
> **Competitor Data**: {competitor_pricing_data}
> **Your Pricing** (if provided): {your_pricing}
>
> **Your Mission**:
> 1. Identify pricing patterns and strategies
> 2. Determine pricing positioning (premium, mid-market, budget)
> 3. Analyze pricing psychology techniques used
> 4. Identify pricing gaps and opportunities
> 5. Compare your pricing vs market (if applicable)
>
> **Output Required**:
> - Pricing landscape map (low to high)
> - Pricing strategy analysis by competitor
> - Market positioning assessment
> - Pricing opportunities identified
> - Recommendations for your pricing"

**Generate**:

```markdown
## Competitive Pricing Analysis

### Pricing Landscape Map

```
Budget          Mid-Market       Premium          Luxury
$X              $Y               $Z               $ZZ
|               |                |                |
Competitor B    Competitor A     [Your Offer]     Competitor C
```

### Pricing Breakdown by Competitor

**Competitor A: {name}**
- Pricing: ${price} (or ${entry} / ${core} / ${premium})
- Position: Mid-market
- Payment Options: {list}
- Pricing Psychology Used:
  - ✅ Anchoring effect
  - ❌ Charm pricing
  - ✅ Payment plans
  - ✅ Decoy tier
- **Analysis**: {what_they_do_well}, {what_they_miss}

[Repeat for each competitor]

### Pricing Opportunities

1. **Gap Identified**: {gap_description}
   - Opportunity: {opportunity}
   - Recommendation: {recommendation}

2. **Pricing Strategy Weakness**: {weakness}
   - How to capitalize: {strategy}

### Your Pricing Positioning (if applicable)

- Current Position: {position_on_map}
- Competitive Strength: {strengths}
- Competitive Weakness: {weaknesses}
- Recommended Adjustments: {recommendations}
```

---

## Phase 4: Analyze Positioning & Messaging

**Goal**: Evaluate value propositions and differentiation across competitors.

**Agent**: `value-proposition-specialist`

**Instructions**:
> "Analyze competitive positioning and messaging.
>
> **Competitor Data**: {competitor_positioning_data}
> **Your Positioning** (if provided): {your_positioning}
>
> **Your Mission**:
> 1. Extract core value propositions from each
> 2. Identify target audience positioning
> 3. Analyze messaging strength and clarity
> 4. Assess transformation promise power
> 5. Identify messaging gaps and opportunities
>
> **Output Required**:
> - Positioning map (audience × value prop)
> - Messaging strength assessment
> - Differentiation analysis
> - Messaging opportunities
> - Recommendations for your messaging"

**Generate**:

```markdown
## Competitive Positioning Analysis

### Positioning Map

|              | Budget-Conscious | Time-Conscious | Quality-Focused | Premium Buyers |
|--------------|------------------|----------------|-----------------|----------------|
| **DIY**      | Competitor B     |                |                 |                |
| **Guided**   | Competitor A     | [Your Offer]   | Competitor C    |                |
| **Done-For-You** |              |                |                 | Competitor D   |

### Value Proposition Comparison

**Competitor A: {name}**
- Target Audience: {who}
- Main Value Prop: "{headline_or_tagline}"
- Transformation Promise: "{before → after}"
- USPs: {list}
- Messaging Strength: {score}/10
- **Analysis**: {strengths}, {weaknesses}

[Repeat for each competitor]

### Differentiation Analysis

**What Everyone Says** (Commoditized):
- "{common_claim_1}"
- "{common_claim_2}"
- "{common_claim_3}"

**Unique Angles Taken**:
- Competitor A: "{unique_angle}"
- Competitor C: "{unique_angle}"
- [Your Offer]: "{unique_angle}" (if applicable)

**White Space Identified**:
1. {unexplored_positioning_opportunity_1}
2. {unexplored_positioning_opportunity_2}

### Messaging Opportunities

1. **Opportunity**: {opportunity_description}
   - Why it works: {reasoning}
   - How to message it: {recommendation}

2. **Weakness to Exploit**: {competitor_weakness}
   - Your advantage: {your_strength}
   - Messaging angle: {recommendation}

### Your Messaging Positioning (if applicable)

- Current Differentiation: {current_diff}
- Strength vs Competitors: {strengths}
- Opportunities to Improve: {recommendations}
```

---

## Phase 5: Analyze Offer Structure

**Goal**: Examine tier architecture, features, and value ladder construction.

**Agent**: `offer-architect`

**Instructions**:
> "Analyze competitive offer structures and value ladders.
>
> **Competitor Data**: {competitor_structure_data}
> **Your Structure** (if provided): {your_structure}
>
> **Your Mission**:
> 1. Map tier structures (1-tier, 2-tier, 3-tier)
> 2. Analyze feature distribution by tier
> 3. Assess support level scaling
> 4. Evaluate value ladder construction
> 5. Identify structural opportunities
>
> **Output Required**:
> - Structural patterns identified
> - Feature comparison matrix
> - Value ladder quality assessment
> - Structural opportunities
> - Recommendations for your structure"

**Generate**:

```markdown
## Competitive Structure Analysis

### Tier Structure Patterns

**1-Tier Models**:
- Competitor B: Single offer at ${price}
  - Analysis: {pros_cons}

**2-Tier Models**:
- Competitor D: {tier_1} (${price}) + {tier_2} (${price})
  - Analysis: {pros_cons}

**3-Tier Models**:
- Competitor A: Entry (${price}) + Core (${price}) + Premium (${price})
  - Value ladder quality: {assessment}
  - 3-5x jumps: {yes/no}

### Feature Comparison Matrix

| Feature | Comp A | Comp B | Comp C | [You] | Market Standard |
|---------|--------|--------|--------|-------|-----------------|
| Video Training | ✅ (50h) | ✅ (20h) | ✅ (100h) | ✅ (40h) | Yes |
| 1-on-1 Coaching | ⚠️ Premium only | ❌ No | ✅ All tiers | ⚠️ Core+ | Premium only |
| Community Access | ✅ | ✅ | ✅ | ✅ | Yes (standard) |
| Templates/Tools | ✅ (10) | ⚠️ (3) | ✅ (25) | ✅ (15) | Varies |
| Lifetime Access | ✅ | ❌ | ✅ | ❌ | 50/50 split |

**Analysis**:
- Market expects: {baseline_features}
- Differentiators: {what_stands_out}
- Gaps: {what_nobody_offers}

### Support Level Analysis

**Self-Serve Models**:
- Competitors: {list}
- Typical features: {features}

**Done-With-You Models**:
- Competitors: {list}
- Support structure: {structure}

**Done-For-You Models**:
- Competitors: {list}
- Service level: {details}

### Value Ladder Quality Scores

| Competitor | Tier Config | 3-5x Jumps? | Differentiation Clarity | Support Scaling | Overall Score |
|------------|-------------|-------------|-------------------------|-----------------|---------------|
| Comp A     | 3-tier      | ✅ Yes      | ✅ Clear                | ✅ Logical      | 9/10 |
| Comp B     | 1-tier      | N/A         | N/A                     | N/A             | N/A |
| Comp C     | 3-tier      | ❌ No (2x)  | ⚠️ Confusing            | ✅ Logical      | 6/10 |
| [You]      | 3-tier      | ✅ Yes      | ✅ Clear                | ✅ Logical      | 8/10 |

### Structural Opportunities

1. **Nobody Offers**: {feature_gap}
   - Opportunity: Add this as differentiator
   - Positioning: "{how_to_position_it}"

2. **Poorly Executed by All**: {weak_element}
   - Opportunity: Execute it well
   - Competitive advantage: {advantage}

### Your Structure Assessment (if applicable)

- Strengths vs Market: {strengths}
- Weaknesses vs Market: {weaknesses}
- Recommended Changes: {recommendations}
```

---

## Phase 6: Comparative Analysis (Conditional)

**Goal**: Direct comparison of your offer vs competitors.

**Condition**: Only runs if `your_offer_stack_path` provided.

**Process**:

Generate comprehensive comparison across all dimensions:

```markdown
## Your Offer vs Competition

### Overall Competitive Position

**Your Offer: {name}**
- Pricing Position: {position} (budget/mid/premium/luxury)
- Target Audience: {audience}
- Differentiation Strength: {score}/10
- Competitive Advantages: {count}
- Competitive Disadvantages: {count}

### Head-to-Head Comparison

#### vs. Competitor A (Primary Competitor)

**Where You Win**:
1. {advantage_1} - Impact: {high/medium/low}
2. {advantage_2} - Impact: {high/medium/low}
3. {advantage_3} - Impact: {high/medium/low}

**Where They Win**:
1. {their_advantage_1} - Threat level: {high/medium/low}
2. {their_advantage_2} - Threat level: {high/medium/low}

**Neutral** (tie):
- {tied_element_1}
- {tied_element_2}

**Recommendation**:
{strategy_to_win_against_this_competitor}

[Repeat for each major competitor]

### Competitive Scorecard

| Dimension | You | Comp A | Comp B | Comp C | Winner |
|-----------|-----|--------|--------|--------|--------|
| Pricing Value | 8 | 7 | 6 | 9 | Comp C |
| Messaging Clarity | 9 | 8 | 5 | 7 | You |
| Feature Completeness | 7 | 9 | 6 | 8 | Comp A |
| Support Quality | 8 | 7 | 4 | 9 | Comp C |
| Social Proof | 6 | 8 | 5 | 9 | Comp C |
| **Overall** | **7.6** | **7.8** | **5.2** | **8.4** | **Comp C** |

**Analysis**:
- Your strongest dimension: {dimension}
- Your weakest dimension: {dimension}
- Biggest opportunity: {opportunity}
- Biggest threat: {threat}
```

---

## Phase 7: Generate Strategic Recommendations

**Goal**: Synthesize all analysis into actionable strategy.

**Output**: Comprehensive Competitive Intelligence Report

```markdown
# Competitive Intelligence Report
**Date**: {audit_date}
**Audit ID**: {audit_id}
**Competitors Analyzed**: {count}

---

## Executive Summary

**Market Landscape**:
- Pricing range: ${low} - ${high}
- Common tier structure: {most_common}
- Market maturity: {mature/emerging/saturated}

**Your Position** (if applicable):
- Pricing position: {position}
- Differentiation strength: {score}/10
- Competitive standing: {ranking} of {total}

**Top 3 Opportunities**:
1. {opportunity_1}
2. {opportunity_2}
3. {opportunity_3}

**Top 3 Threats**:
1. {threat_1}
2. {threat_2}
3. {threat_3}

---

## Market Analysis

### Pricing Landscape
{pricing_analysis_from_phase3}

### Positioning Landscape
{positioning_analysis_from_phase4}

### Structural Patterns
{structure_analysis_from_phase5}

---

## Competitor Profiles

### Competitor A: {name}
**Overall Assessment**: {score}/10

**Strengths**:
- {strength_1}
- {strength_2}

**Weaknesses**:
- {weakness_1}
- {weakness_2}

**Strategy**: {their_apparent_strategy}

**Threat Level**: {high/medium/low}

**How to Compete**:
{specific_strategy_against_them}

[Repeat for each competitor]

---

## Strategic Recommendations

### 1. Differentiation Strategy

**Current State** (if applicable):
- What you're known for: {current_positioning}
- Strength of differentiation: {score}/10

**Recommended Positioning**:
{recommended_positioning_statement}

**Why This Works**:
{reasoning}

**How to Message It**:
{specific_messaging_recommendations}

---

### 2. Pricing Strategy

**Current State** (if applicable):
- Price position: {position}
- Competitive assessment: {assessment}

**Recommended Pricing**:
- Entry: ${price} (vs market: ${market_avg})
- Core: ${price} (vs market: ${market_avg})
- Premium: ${price} (vs market: ${market_avg})

**Rationale**:
{pricing_strategy_reasoning}

**Payment Options**:
{recommended_payment_structures}

---

### 3. Feature/Structure Strategy

**Features to Add** (competitive parity):
1. {feature} - {reason}
2. {feature} - {reason}

**Features to Emphasize** (you have, they don't):
1. {feature} - {competitive_advantage}
2. {feature} - {competitive_advantage}

**Structural Changes**:
{recommended_tier_or_structure_changes}

---

### 4. Messaging Strategy

**Headline/USP Recommendations**:
- Primary: "{recommended_headline}"
- Secondary: "{recommended_usp}"
- Differentiation: "{unique_angle}"

**Transformation Promise**:
- Before: "{before_state}"
- After: "{after_state}"
- Bridge: "{how_you_get_them_there}"

**Competitive Messaging**:
- vs. {competitor}: "{comparative_message}"

---

### 5. Quick Wins (Implement Now)

1. **{quick_win_1}** - {timeframe}
   - What: {description}
   - Why: {impact}
   - How: {implementation}

2. **{quick_win_2}** - {timeframe}
   - What: {description}
   - Why: {impact}
   - How: {implementation}

3. **{quick_win_3}** - {timeframe}
   - What: {description}
   - Why: {impact}
   - How: {implementation}

---

## Implementation Roadmap

### Month 1: Positioning & Messaging
- [ ] Update primary headline and USP
- [ ] Implement competitive messaging
- [ ] Add missing social proof elements
- [ ] Revise objection handling for competitive objections

### Month 2: Pricing & Structure
- [ ] Test pricing adjustments (A/B test recommended)
- [ ] Add missing features (competitive parity)
- [ ] Enhance differentiated features (emphasis)
- [ ] Update tier descriptions

### Month 3: Optimization
- [ ] Monitor competitive response
- [ ] Track win rate improvements
- [ ] Gather customer feedback on positioning
- [ ] Plan next audit (quarterly recommended)

---

## Monitoring Plan

**Metrics to Track**:
- Win rate vs each competitor
- Price objection frequency
- "Why not [competitor]?" mentions
- Conversion rate changes

**Quarterly Review**:
- Re-run this audit
- Track competitor changes
- Adjust strategy

**Competitive Alerts**:
- Set up Google Alerts for: {competitor_names}
- Monitor their pricing pages monthly
- Track their marketing campaigns

---

## Appendix: Detailed Data

### Competitor Raw Data
[Full data tables from research phase]

### Screenshots/Sources
[List of sources and reference links]

---

**End of Competitive Intelligence Report**
```

---

## Workflow Completion

> "**Competitive Audit Complete!**
>
> **Competitors Analyzed**: {count}
> **Analysis Depth**: {depth}
> **Total Recommendations**: {count}
>
> **Generated Files**:
> 1. Competitive Intelligence Report: {report_path}
> 2. Competitor Data Export: {data_path}
>
> **Key Findings**:
> - Top Opportunity: {opportunity_1}
> - Top Threat: {threat_1}
> - Recommended Action: {top_recommendation}
>
> **Next Steps**:
> 1. Review full report
> 2. Implement quick wins (Week 1)
> 3. Run UPDATE workflow to apply strategic recommendations
> 4. Schedule next audit (3 months)
> 5. Set up competitive monitoring"

---

## Error Handling

### If Web Search Unavailable
- Display error: "Web search required for competitive research"
- Offer to accept manual competitive data input
- Proceed with limited analysis

### If Competitor Pages Not Found
- Log competitors that couldn't be found
- Continue with available competitors
- Note gaps in final report

### If Your Offer Stack Invalid
- Skip comparative analysis
- Provide market-only recommendations
- Suggest running CREATE workflow first

---

## Workflow Metadata

- **Version**: 1.0.0 (V3)
- **Author**: Daniel
- **Module**: offer-forge
- **Type**: Action Workflow (Research & Analysis)
- **Estimated Duration**: 15-90 minutes (based on depth and competitor count)
- **Dependencies**: 3 specialist agents + web search capability
- **Output**: Comprehensive competitive intelligence report with strategic recommendations
- **Recommended Frequency**: Quarterly or when competitive landscape shifts
