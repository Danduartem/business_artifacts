# Optimize Offer Stack Workflow Instructions
# Module: offer-forge
# Version: 1.0.0 (V3)

## Mission

Identify and fix specific conversion bottlenecks through targeted, data-driven optimizations. Unlike UPDATE (broad changes) or VALIDATE (assessment only), OPTIMIZE focuses surgically on the highest-impact improvement opportunity based on performance data.

**Key Difference from UPDATE**:
- **UPDATE**: User-driven changes based on market feedback
- **OPTIMIZE**: Data-driven improvements focused on specific bottlenecks

**Use Cases**:
- Conversion rate is lower than expected
- One tier significantly underperforming
- High cart abandonment rate
- Specific objections causing drop-off
- Pricing tests showing elasticity issues
- Messaging not resonating (high bounce rate)
- Losing to specific competitors

---

## Critical Actions

Before beginning workflow execution:

1. **Load Configuration**
   - Load into memory: `{project-root}/bmad/offer-forge/config.yaml`
   - Set all configuration variables

2. **Set User Context**
   - Remember user's name: `{user_name}`
   - Communicate in: `{communication_language}`

3. **Verify Input Requirements**
   - Existing offer stack path must be provided
   - File must exist and be readable
   - Performance data strongly recommended (workflow works better with data)

4. **Set Optimization Date**
   - Store current date as: `optimization_date`

---

## Phase 1: Load Stack & Analyze Performance

**Goal**: Load existing offer stack and performance metrics to identify patterns.

**Interaction Level**: LOW (Autonomous loading and analysis)

**Process**:

### Step 1: Load Offer Stack

- Read file from: `{existing_offer_stack_path}`
- Parse all sections and current configuration
- Extract key metrics:
  - Current pricing (all tiers)
  - Current conversion data (if available from previous validations)
  - Last quality score
  - Previous optimization history (if any)

### Step 2: Display Current State

> "**Loaded Offer Stack for Optimization**
>
> **Business**: {business_name}
> **Created**: {creation_date}
> **Last Optimized**: {last_optimization_date} (or "Never")
> **Current Quality Score**: {quality_score}/10
>
> **Current Pricing**:
> - Entry: {entry_price}
> - Core: {core_price}
> - Premium: {premium_price}"

### Step 3: Quick Pattern Analysis

Automatically analyze for common issues:

**Price Pattern Check**:
- Are jumps 3-5x? (Flag if not)
- Charm pricing used? (Flag if not)
- Any pricing anomalies?

**Structure Pattern Check**:
- Clear tier differentiation?
- Support scaling logical?
- Access intimacy progression clear?

**Messaging Pattern Check**:
- USPs present for each tier?
- Transformation narratives complete?
- Objection handling comprehensive?

**Store preliminary findings as**: `pattern_analysis_results`

**Display**:
> "Quick analysis complete. Identified {num_potential_issues} potential optimization areas."

---

## Phase 2: Identify Primary Bottleneck

**Goal**: Determine the highest-impact optimization opportunity.

**Interaction Level**: HIGH (Interactive questioning with data input)

**Process**:

### Question 1: What's the primary concern?

> "What's prompting this optimization? (Select one)"
>
> **Conversion Issues**:
> 1. **Low overall conversion rate** - People aren't buying
> 2. **Wrong tier distribution** - Everyone buying Entry, nobody buying Core/Premium
> 3. **High cart abandonment** - People add to cart but don't complete
>
> **Messaging Issues**:
> 4. **Specific objections causing drop-off** - Same objections keep coming up
> 5. **Messaging not resonating** - High bounce rate, low engagement
> 6. **Value perception problem** - "Too expensive" objections frequent
>
> **Competitive Issues**:
> 7. **Losing to specific competitors** - Prospects choosing competitors instead
> 8. **Pricing sensitivity** - Price tests show elasticity issues
>
> **General**:
> 9. **Not sure - need data-driven diagnosis** - Let the data guide us

**Store as**: `optimization_focus`

---

### Question 2: Performance Data Collection

> "Let's gather performance data to guide optimization. Provide what you have:"

**Conversion Data** (highly recommended):
```
Overall conversion rate: ____%

By Tier:
- Entry tier conversion: ____%
- Core tier conversion: ____%
- Premium tier conversion: ____%

Tier Distribution (% of total sales):
- Entry: ____%
- Core: ____%
- Premium: ____%
```

**Cart Abandonment Data** (if applicable):
```
Cart abandonment rate: ____%

Where they abandon:
- [ ] On pricing reveal
- [ ] During checkout
- [ ] After seeing payment options
- [ ] Other: _____
```

**Objection Data** (if applicable):
```
Most common objections (frequency):
1. _________________ (___% of conversations)
2. _________________ (___% of conversations)
3. _________________ (___% of conversations)
```

**Engagement Data** (if applicable):
```
Sales page metrics:
- Bounce rate: ____%
- Average time on page: _____ seconds
- Scroll depth (% who reach pricing): ____%
- CTA click rate: ____%
```

**Competitive Data** (if applicable):
```
Win/Loss Analysis:
- Win rate vs Competitor A: ____%
- Win rate vs Competitor B: ____%
- Main reason for losses: _____
```

**Store all as**: `performance_data`

---

### Question 3: Customer Feedback

> "Any qualitative feedback from customers? (Optional but valuable)"

```
Positive feedback themes:
- _____

Negative feedback themes:
- _____

Questions customers keep asking:
- _____

Specific quotes (if any):
- "_____"
```

**Store as**: `customer_feedback`

---

### Step 4: Bottleneck Diagnosis

Based on `optimization_focus` + `performance_data`, automatically diagnose:

**Diagnostic Logic**:

```
IF optimization_focus == "low_overall_conversion":
  IF conversion_rate < 1%:
    Primary_bottleneck = "messaging_resonance" (messaging not connecting)
  ELSE IF conversion_rate 1-3%:
    Primary_bottleneck = "value_perception" (pricing objections)
  ELSE IF conversion_rate > 3%:
    Primary_bottleneck = "cart_abandonment" (checkout friction)

IF optimization_focus == "wrong_tier_distribution":
  IF entry_sales > 70%:
    Primary_bottleneck = "tier_distribution" (Core/Premium undervalued)
  IF premium_sales < 5%:
    Primary_bottleneck = "value_perception" (Premium not justified)

IF optimization_focus == "high_cart_abandonment":
  Primary_bottleneck = "cart_abandonment"

IF optimization_focus == "specific_objections":
  Primary_bottleneck = "objection_rate"

IF optimization_focus == "messaging_not_resonating":
  Primary_bottleneck = "messaging_resonance"

IF optimization_focus == "value_perception_problem":
  Primary_bottleneck = "value_perception"

IF optimization_focus == "losing_to_competitors":
  Primary_bottleneck = "competitive_pressure"

IF optimization_focus == "pricing_sensitivity":
  Primary_bottleneck = "pricing_sensitivity"

IF optimization_focus == "not_sure":
  # Data-driven diagnosis
  Analyze performance_data and assign bottleneck based on worst metric
```

**Display Diagnosis**:
> "**Optimization Diagnosis**
>
> **Primary Bottleneck**: {primary_bottleneck}
> **Impact Level**: {high/medium/low}
> **Recommended Focus**: {optimization_area_description}
>
> **Why this is the priority**:
> {diagnostic_reasoning}
>
> **Expected Impact if Fixed**:
> {projected_improvement}"

**Confirm with User**:
> "Does this diagnosis match your intuition? [Yes/No/Adjust]"

---

## Phase 3: Gather Optimization Data

**Goal**: Collect specific data needed for the identified bottleneck.

**Interaction Level**: HIGH (Targeted data collection)

**Process**:

Based on `primary_bottleneck`, ask specific questions:

### If bottleneck = "conversion_rate":

> **Conversion Rate Optimization Data Needed:**
>
> 1. "What's your traffic source quality?"
>    - [ ] Cold traffic (ads, SEO)
>    - [ ] Warm traffic (email list, referrals)
>    - [ ] Hot traffic (retargeting, qualified leads)
>
> 2. "How do prospects arrive at your offer page?"
>    - [ ] Direct from ad
>    - [ ] Through content (blog, video, etc.)
>    - [ ] From sales call/demo
>    - [ ] Referral
>
> 3. "What's their awareness level?" (Schwartz 5 levels)
>    - [ ] Mostly unaware (1-2)
>    - [ ] Problem/solution aware (3)
>    - [ ] Product aware (4)
>    - [ ] Most aware (5)
>
> 4. "Current messaging approach?"
>    - Is it education-focused or conversion-focused?
>    - Does it match their awareness level?

---

### If bottleneck = "tier_distribution":

> **Tier Distribution Optimization Data Needed:**
>
> 1. "Current distribution:"
>    - Entry: ____%
>    - Core: ____%
>    - Premium: ____%
>
> 2. "Target distribution:"
>    - Entry: ____%
>    - Core: ____%
>    - Premium: ____%
>
> 3. "Why do you think everyone chooses Entry?"
>    - [ ] Core/Premium seem too expensive
>    - [ ] Value difference unclear
>    - [ ] Entry seems "good enough"
>    - [ ] Support/access differences not clear
>    - [ ] Not sure
>
> 4. "Have you surveyed why people don't upgrade?"
>    - Yes: What did they say? _____
>    - No: Would you like to?

---

### If bottleneck = "cart_abandonment":

> **Cart Abandonment Optimization Data Needed:**
>
> 1. "Where in the process do they abandon?"
>    - [ ] On pricing page (before cart)
>    - [ ] In cart (before checkout)
>    - [ ] During checkout form
>    - [ ] At payment step
>
> 2. "Payment options currently offered:"
>    - [ ] One-time payment only
>    - [ ] Payment plan available
>    - [ ] Multiple payment methods
>
> 3. "Have you asked abandoners why they left?"
>    - Yes: What did they say? _____
>    - No: Would you like abandonment email sequence?
>
> 4. "Checkout friction points:"
>    - [ ] Too many form fields
>    - [ ] Unexpected costs (fees, taxes)
>    - [ ] Payment method issues
>    - [ ] Trust/security concerns
>    - [ ] "Need to think about it"

---

### If bottleneck = "objection_rate":

> **Objection Optimization Data Needed:**
>
> 1. "Top 3 objections by frequency:"
>    - 1. _____ (___% of conversations)
>    - 2. _____ (___% of conversations)
>    - 3. _____ (___% of conversations)
>
> 2. "Current objection handling:"
>    - Do you have prepared responses?
>    - Are they in your sales materials?
>    - Do they work (close after handling)?
>
> 3. "When do these objections come up?"
>    - [ ] Before they see pricing
>    - [ ] After seeing pricing
>    - [ ] During sales calls
>    - [ ] In email conversations
>
> 4. "What's your current response to objection #1?"
>    - Current response: _____
>    - Does it work? _____

---

### If bottleneck = "pricing_sensitivity":

> **Pricing Sensitivity Optimization Data Needed:**
>
> 1. "Have you run price tests?"
>    - Yes: What were the results? _____
>    - No: What makes you think pricing is the issue?
>
> 2. "Competitive pricing context:"
>    - Competitors charge: $_____
>    - We charge: $_____
>    - Difference: _____%
>
> 3. "Value justification strength:"
>    - Do prospects say "too expensive" without context?
>    - Do they compare to cheaper alternatives?
>    - Do they understand the value?
>
> 4. "Payment friction:"
>    - Is it the total price or monthly payment that's the issue?
>    - Would a different payment plan help?

---

### If bottleneck = "messaging_resonance":

> **Messaging Resonance Optimization Data Needed:**
>
> 1. "Engagement metrics:"
>    - Bounce rate: ____%
>    - Time on page: _____ seconds
>    - Scroll depth: ____%
>
> 2. "Customer language audit:"
>    - What words do THEY use to describe their problem? _____
>    - What words do YOU use in your messaging? _____
>    - Do they match?
>
> 3. "Emotional resonance check:"
>    - Does your messaging address fear/desire/aspiration?
>    - Do you have before/after stories?
>    - Do customers see themselves in your messaging?
>
> 4. "Clarity test:"
>    - Can a prospect explain your offer in one sentence?
>    - Is your USP immediately clear?
>    - Do you use jargon or industry terms?

---

### If bottleneck = "value_perception":

> **Value Perception Optimization Data Needed:**
>
> 1. "Price objection frequency:"
>    - ___% of prospects say "too expensive"
>
> 2. "Perceived value vs actual price:"
>    - What do you think prospects value your offer at? $_____
>    - What do you charge? $_____
>    - Gap: _____%
>
> 3. "Value stack clarity:"
>    - Do you show all components and their individual value?
>    - Do you demonstrate ROI?
>    - Do you anchor against alternatives?
>
> 4. "Transformation clarity:"
>    - Is the before → after transformation vivid?
>    - Do prospects understand what they'll become?
>    - Is the gap urgent and compelling?

---

### If bottleneck = "competitive_pressure":

> **Competitive Pressure Optimization Data Needed:**
>
> 1. "Specific competitors you're losing to:"
>    - Competitor 1: _____ (win rate: ___%)
>    - Competitor 2: _____ (win rate: ___%)
>
> 2. "Why prospects choose them:"
>    - Price (they're cheaper)
>    - Features (they have X we don't)
>    - Brand recognition
>    - Other: _____
>
> 3. "Your unique advantages they don't have:"
>    - Advantage 1: _____
>    - Advantage 2: _____
>    - Advantage 3: _____
>
> 4. "Messaging emphasis:"
>    - Do you lead with differentiation?
>    - Do you directly compare?
>    - Do you even mention competitors?

---

**After Data Collection**:
- Summarize all captured optimization data
- Confirm with user
- Transition: "Routing to specialist agents for deep analysis..."

---

## Phase 4: Expert Agent Analysis

**Goal**: Get specialist analysis of the specific bottleneck.

**Interaction Level**: LOW (Autonomous agent execution)

**Agent Routing Based on Bottleneck**:

### Route 1: Conversion Rate → Value Prop Specialist

**Agent**: `value-proposition-specialist`

**Instructions**:
> "Analyze conversion rate bottleneck for this offer stack.
>
> **Context**:
> - Current conversion rate: {conversion_rate}
> - Traffic source: {traffic_source}
> - Awareness level: {awareness_level}
> - Current messaging: {current_messaging_snapshot}
>
> **Your Mission**:
> 1. Analyze messaging-to-awareness fit
> 2. Identify messaging gaps causing drop-off
> 3. Assess transformation promise strength
> 4. Evaluate emotional resonance
> 5. Check USP clarity
>
> **Output Required**:
> - Top 3 conversion blockers in messaging
> - Specific messaging improvements
> - Rewritten key sections (headlines, USPs, CTAs)
> - Expected conversion lift"

---

### Route 2: Tier Distribution → Offer Architect + Pricing Strategist

**Agent 1**: `offer-architect`

**Instructions**:
> "Optimize tier distribution to shift sales toward Core/Premium.
>
> **Context**:
> - Current distribution: Entry {%}, Core {%}, Premium {%}
> - Target distribution: {target}
> - Why Entry is over-selected: {reasons}
>
> **Your Mission**:
> 1. Analyze tier differentiation strength
> 2. Identify why Core/Premium aren't compelling
> 3. Recommend feature/support adjustments
> 4. Strengthen upgrade incentives
>
> **Output Required**:
> - Tier differentiation improvements
> - Feature rebalancing recommendations
> - Upgrade trigger enhancements"

**Agent 2**: `pricing-strategist`

**Instructions**:
> "Optimize pricing to improve tier distribution.
>
> **Context**:
> - Current pricing: Entry {$}, Core {$}, Premium {$}
> - Tier distribution problem: {description}
>
> **Your Mission**:
> 1. Analyze if pricing jumps create resistance
> 2. Assess decoy effect implementation
> 3. Evaluate payment options by tier
> 4. Recommend pricing adjustments
>
> **Output Required**:
> - Pricing structure recommendations
> - Payment option optimizations
> - Anchoring strategy improvements"

---

### Route 3: Cart Abandonment → Pricing Strategist

**Agent**: `pricing-strategist`

**Instructions**:
> "Reduce cart abandonment through pricing psychology and friction reduction.
>
> **Context**:
> - Abandonment rate: {rate}
> - Abandonment stage: {stage}
> - Current payment options: {options}
>
> **Your Mission**:
> 1. Identify checkout friction points
> 2. Optimize payment framing
> 3. Add payment plan options if missing
> 4. Recommend trust/security enhancements
>
> **Output Required**:
> - Checkout optimization recommendations
> - Payment option restructuring
> - Friction reduction tactics
> - Expected abandonment reduction"

---

### Route 4: Objection Rate → Value Prop Specialist

**Agent**: `value-proposition-specialist`

**Instructions**:
> "Strengthen objection handling to reduce drop-off.
>
> **Context**:
> - Top objections: {list with frequency}
> - Current responses: {current_responses}
> - Response effectiveness: {effectiveness}
>
> **Your Mission**:
> 1. Analyze why these objections persist
> 2. Evaluate current objection handling quality
> 3. Craft stronger, trust-building responses
> 4. Recommend preemptive messaging
>
> **Output Required**:
> - Improved objection responses (top 3)
> - Preemptive messaging to prevent objections
> - Trust-building elements to add
> - Expected objection resolution improvement"

---

### Route 5: Pricing Sensitivity → Pricing Strategist

**Agent**: `pricing-strategist`

**Instructions**:
> "Optimize pricing based on sensitivity data.
>
> **Context**:
> - Price test results: {results}
> - Competitive pricing: {competitor_prices}
> - Current price: {current_price}
> - Price objection frequency: {frequency}
>
> **Your Mission**:
> 1. Analyze price elasticity
> 2. Determine optimal price point
> 3. Evaluate payment plan options
> 4. Assess value-price gap
>
> **Output Required**:
> - Optimal pricing recommendation
> - Payment plan restructuring
> - Value anchoring improvements
> - Expected conversion impact"

---

### Route 6: Messaging Resonance → Value Prop Specialist

**Agent**: `value-proposition-specialist`

**Instructions**:
> "Improve messaging resonance and engagement.
>
> **Context**:
> - Bounce rate: {rate}
> - Time on page: {time}
> - Customer language: {their_words} vs Our language: {our_words}
> - Engagement metrics: {metrics}
>
> **Your Mission**:
> 1. Audit language alignment (theirs vs ours)
> 2. Assess emotional resonance
> 3. Evaluate clarity and simplicity
> 4. Strengthen transformation narratives
>
> **Output Required**:
> - Language alignment corrections
> - Emotional hook improvements
> - Clarity enhancements
> - Rewritten key sections
> - Expected engagement improvement"

---

### Route 7: Value Perception → Offer Architect + Value Prop Specialist

**Agent 1**: `offer-architect`

**Instructions**:
> "Increase perceived value through structural improvements.
>
> **Context**:
> - Perceived value: {perceived}
> - Actual price: {price}
> - Gap: {gap}
>
> **Your Mission**:
> 1. Analyze value stack completeness
> 2. Identify under-communicated components
> 3. Recommend value-add features
> 4. Strengthen deliverables clarity
>
> **Output Required**:
> - Value stack enhancements
> - Feature additions/emphasis
> - Deliverable clarity improvements"

**Agent 2**: `value-proposition-specialist`

**Instructions**:
> "Improve value perception through messaging.
>
> **Context**:
> - Price objection frequency: {frequency}
> - Value-price gap: {gap}
>
> **Your Mission**:
> 1. Strengthen transformation promise
> 2. Improve ROI demonstration
> 3. Add value anchoring comparisons
> 4. Enhance benefit-driven copy
>
> **Output Required**:
> - Value demonstration improvements
> - ROI messaging
> - Anchoring comparisons
> - Benefit statement rewrites"

---

### Route 8: Competitive Pressure → Offer Architect + Value Prop Specialist

**Agent 1**: `offer-architect`

**Instructions**:
> "Strengthen positioning against specific competitors.
>
> **Context**:
> - Losing to: {competitors}
> - Win rate: {rate}
> - Their advantages: {their_strengths}
> - Our advantages: {our_strengths}
>
> **Your Mission**:
> 1. Analyze differentiation strength
> 2. Identify feature gaps vs advantages
> 3. Recommend positioning adjustments
> 4. Strengthen unique value
>
> **Output Required**:
> - Differentiation enhancements
> - Positioning refinements
> - Feature emphasis changes"

**Agent 2**: `value-proposition-specialist`

**Instructions**:
> "Create competitive messaging that wins.
>
> **Context**:
> - Competitors: {list}
> - Unique advantages: {our_strengths}
> - Customer choice factors: {why_they_win}
>
> **Your Mission**:
> 1. Craft competitive USPs
> 2. Develop comparison messaging
> 3. Build 'only we...' statements
> 4. Address competitive objections
>
> **Output Required**:
> - Competitive USPs
> - Comparison framework
> - Competitive objection responses
> - Differentiation messaging"

---

**After Agent Analysis**:
- Collect all agent outputs
- Synthesize into unified recommendations
- Transition to Phase 5

---

## Phase 5: Generate Actionable Recommendations

**Goal**: Synthesize expert analysis into prioritized, actionable recommendations.

**Interaction Level**: LOW (Autonomous synthesis)

**Agent**: `senior-offer-specialist`

**Instructions**:
> "Synthesize optimization recommendations from specialist agents.
>
> **Context**:
> - Primary bottleneck: {primary_bottleneck}
> - Specialist analysis: {agent_outputs}
> - Performance data: {performance_data}
> - Customer feedback: {customer_feedback}
>
> **Your Mission**:
> 1. Synthesize all recommendations into coherent plan
> 2. Prioritize by impact (high/medium/low)
> 3. Estimate effort for each (quick win/moderate/complex)
> 4. Project conversion impact
> 5. Create implementation sequence
>
> **Output Required**:
> - Top 5 optimization recommendations (ranked)
> - Impact estimates (% improvement projected)
> - Effort estimates (hours/days)
> - Implementation priority matrix
> - Quick wins to do first
> - Expected overall improvement"

**Generate Optimization Report** (detailed):

```markdown
# Optimization Report: {business_name}
**Date**: {optimization_date}
**Primary Bottleneck**: {primary_bottleneck}

## Executive Summary

**Current Performance**:
- Conversion Rate: {current_rate}
- Tier Distribution: {current_distribution}
- Key Issue: {bottleneck_description}

**Optimization Focus**: {optimization_area}

**Expected Impact**: {projected_improvement}

---

## Recommendations (Prioritized)

### High-Priority (Do First)

#### 1. {recommendation_1_title}
**Impact**: {high/medium/low} - Projected {X}% improvement
**Effort**: {quick_win/moderate/complex} - {hours/days}
**Why**: {reasoning}

**What to Change**:
{specific_changes}

**How to Implement**:
{step_by_step}

**Success Metric**:
{how_to_measure}

---

#### 2. {recommendation_2_title}
[Same structure]

---

### Medium-Priority (Do Next)

#### 3. {recommendation_3_title}
[Same structure]

---

### Low-Priority (Nice to Have)

#### 4. {recommendation_4_title}
[Same structure]

---

## Quick Wins (Implement Today)

1. {quick_win_1} - {5-30 min}
2. {quick_win_2} - {5-30 min}
3. {quick_win_3} - {5-30 min}

---

## Implementation Plan

### Week 1:
- [ ] Quick wins (all 3)
- [ ] High-priority #1

### Week 2:
- [ ] High-priority #2
- [ ] Medium-priority #1

### Week 3:
- [ ] Medium-priority #2
- [ ] Test and measure

### Week 4:
- [ ] Analyze results
- [ ] Refine based on data
- [ ] Plan next optimization cycle

---

## Impact Projections

**Conservative Scenario**:
- Current conversion: {current}%
- After optimization: {projected_conservative}%
- Revenue impact: +{amount}

**Moderate Scenario**:
- After optimization: {projected_moderate}%
- Revenue impact: +{amount}

**Optimistic Scenario**:
- After optimization: {projected_optimistic}%
- Revenue impact: +{amount}

---

## Measurement Plan

**Metrics to Track**:
- Primary: {primary_metric} (current: {X}, target: {Y})
- Secondary: {secondary_metric} (current: {X}, target: {Y})
- Tertiary: {tertiary_metric} (current: {X}, target: {Y})

**Testing Period**: 2-4 weeks

**Success Criteria**:
- Minimum: {primary_metric} improves by {X}%
- Goal: {primary_metric} improves by {Y}%

---

## Specialist Agent Insights

### Offer Architect
{architect_insights}

### Value Proposition Specialist
{value_prop_insights}

### Pricing Strategist
{pricing_insights}

### Senior Offer Specialist
{validator_insights}

---

## Next Steps

**Immediate**:
1. Review this report
2. Implement quick wins today
3. Schedule high-priority changes

**This Week**:
1. Implement high-priority recommendations
2. Set up tracking for success metrics
3. Brief team on changes

**Next 30 Days**:
1. Complete all high/medium priority optimizations
2. Monitor metrics daily
3. Run follow-up VALIDATE workflow
4. Consider A/B testing top changes

---

**End of Optimization Report**
```

---

## Phase 6: Implement Top Recommendations

**Goal**: Allow user to select and implement recommendations immediately.

**Interaction Level**: HIGH (User chooses what to implement)

**Process**:

### Step 1: Present Recommendations

Display top 5 recommendations with impact/effort matrix.

> "**Optimization Recommendations Ready**
>
> **Quick Wins** (do these first):
> 1. {quick_win_1} - {impact} impact, {effort} effort
> 2. {quick_win_2} - {impact} impact, {effort} effort
> 3. {quick_win_3} - {impact} impact, {effort} effort
>
> **High-Impact Changes**:
> 1. {high_priority_1} - Projected {X}% improvement
> 2. {high_priority_2} - Projected {Y}% improvement
>
> **Expected Overall Improvement**:
> Conservative: {conversion_rate} → {new_rate} (+{delta}%)
> Optimistic: {conversion_rate} → {new_rate} (+{delta}%)"

---

### Step 2: User Selection

> "Which recommendations would you like to implement now?
>
> **Options**:
> 1. **All quick wins only** (fastest - 15-30 min total)
> 2. **Quick wins + top high-priority** (recommended - 1-2 hours)
> 3. **All high-priority recommendations** (comprehensive - 2-4 hours)
> 4. **Custom selection** (choose specific recommendations)
> 5. **Review report only** (don't implement yet)
>
> Choose [1-5]:"

**Store as**: `implementation_choice`

---

### Step 3: Implement Selected Changes

Based on user choice, route back to appropriate agents to make changes:

**IF** quick_wins selected:
- Apply quick changes directly
- Update offer stack document
- Update affected deliverables

**IF** high-priority selected:
- Route to appropriate specialist agents
- Generate updated sections
- Backup original files
- Apply changes
- Regenerate affected deliverables

**IF** custom selection:
- Ask user which specific recommendations to implement
- Route accordingly

---

### Step 4: Backup and Apply

1. **Create Backup**:
   ```
   {business_name}-offer-stack.md → {business_name}-offer-stack-backup-{date}.md
   ```

2. **Apply Changes**:
   - Update offer stack document
   - Regenerate affected deliverables (based on what changed)
   - Update quality score (re-run validation)

3. **Create Implementation Log**:
   ```
   {business_name}-optimization-implementation-{date}.md
   ```

**Implementation Log Contents**:
```markdown
# Optimization Implementation Log
**Date**: {date}
**Bottleneck Addressed**: {primary_bottleneck}

## Changes Made

### Quick Wins Implemented
- [x] {quick_win_1}
- [x] {quick_win_2}
- [x] {quick_win_3}

### High-Priority Changes Implemented
- [x] {high_priority_1}
  - Changed: {what_changed}
  - Expected impact: {impact}

## Files Updated
- {list of updated files}

## Backup Files
- {list of backup files}

## Next Steps
1. Monitor {primary_metric} for 2-4 weeks
2. Track conversion rate changes
3. Run VALIDATE workflow after testing period
4. Consider A/B testing if unsure

## Success Metrics
- **Before**: {baseline_metrics}
- **Target**: {target_metrics}
- **Measurement period**: {date_range}
```

---

## Phase 7: Project Impact & Create Report

**Goal**: Finalize optimization report with implementation summary.

**Interaction Level**: LOW (Automated report generation)

**Process**:

1. **Generate Complete Optimization Report** (already done in Phase 5)
2. **Add Implementation Section** if changes were applied
3. **Save Report** to: `{output_folder}/{business_name}-optimization-report-{date}.md`
4. **Display Summary**

---

## Workflow Completion

After optimization complete:

**Display Final Summary**:

> "**Optimization Complete!**
>
> **Bottleneck Addressed**: {primary_bottleneck}
> **Changes Implemented**: {num_changes}
>
> **Expected Impact**:
> - {primary_metric}: {baseline} → {target} (+{delta}%)
> - Projected revenue increase: +${amount}/month
>
> **Files Generated**:
> 1. Optimization Report: {report_path}
> 2. Implementation Log: {log_path}
> 3. Updated Offer Stack: {stack_path}
> 4. Backup Files: {backup_folder}
>
> **Next Steps**:
> 1. Monitor {primary_metric} for 2-4 weeks
> 2. Track actual vs projected improvement
> 3. Run VALIDATE workflow after testing period
> 4. Consider A/B testing with COMPARE workflow
>
> **Measurement Schedule**:
> - Day 7: Check early signals
> - Day 14: Mid-point analysis
> - Day 28: Full impact assessment
> - Day 30: Run VALIDATE to confirm improvement"

---

## Error Handling

### If No Performance Data Provided

- Run optimization based on qualitative analysis only
- Note in report: "Limited to qualitative optimization (no performance data)"
- Recommend gathering metrics for next optimization cycle

### If Bottleneck Unclear

- Use pattern analysis to suggest most likely bottleneck
- Present top 3 possibilities
- Ask user to pick based on intuition

### If Implementation Fails

- Restore from backup files
- Log error details
- Suggest manual implementation with step-by-step guide

---

## Workflow Metadata

- **Version**: 1.0.0 (V3)
- **Author**: Daniel
- **Module**: offer-forge
- **Type**: Action Workflow (Diagnostic + Implementation)
- **Estimated Duration**: 20-40 minutes (diagnosis) + 15 min - 4 hours (implementation, varies)
- **Dependencies**: 2-4 specialist agents (based on bottleneck)
- **Output**: Optimization report + implementation log + updated stack (if implemented)
- **Recommended Frequency**: After significant traffic volume or when metrics plateau
