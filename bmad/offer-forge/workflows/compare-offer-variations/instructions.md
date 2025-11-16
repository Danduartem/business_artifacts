# Compare Offer Variations Workflow Instructions
# Module: offer-forge
# Version: 1.0.0 (V3)

## Mission

Create scientifically sound A/B test variations to validate pricing, messaging, or structural hypotheses. This workflow generates test variations, ensures test integrity, and provides analysis frameworks for data-driven offer optimization.

**Key Use Cases**:
- Test pricing elasticity (will lower/higher price increase revenue?)
- Test messaging approaches (which value prop resonates more?)
- Test tier structures (2-tier vs 3-tier)
- Test payment options (payment plans vs one-time)
- Validate OPTIMIZE workflow recommendations before full rollout

---

## Critical Actions

Before beginning:

1. **Load Configuration** - Load `{project-root}/bmad/offer-forge/config.yaml`
2. **Set User Context** - Remember `{user_name}`, communicate in `{communication_language}`
3. **Verify Control** - Control offer stack must exist and perform adequately (baseline data)
4. **Set Test ID** - Generate unique test ID: `test-{date}-{random}`

---

## Phase 1: Load Control Offer

**Goal**: Load existing offer stack as control/baseline.

**Process**:

1. Load file from `{control_offer_stack_path}`
2. Extract baseline metrics (if available):
   - Current conversion rate by tier
   - Current tier distribution
   - Current average order value
3. Display control summary

> "**Control Offer Loaded**
>
> **Business**: {business_name}
> **Control Pricing**: Entry {$} | Core {$} | Premium {$}
> **Baseline Metrics** (if available):
> - Conversion Rate: {rate}%
> - Tier Distribution: Entry {%} | Core {%} | Premium {%}
> - AOV: ${aov}"

---

## Phase 2: Define Test Hypothesis

**Goal**: Clarify what you're testing and why.

**Interaction Level**: HIGH

**Process**:

### Question 1: What are you testing?

> "What do you want to test? Select one:
>
> **1. Pricing Test**
>    - Different price points
>    - Payment plan structures
>    - Discount strategies
>
> **2. Messaging Test**
>    - Headlines/hooks
>    - Value propositions
>    - Transformation narratives
>    - CTAs
>
> **3. Structural Test**
>    - Feature bundles
>    - Tier configurations
>    - Support levels
>
> **4. Combination Test**
>    - Multiple elements
>
> Choose [1-4]:"

**Store as**: `variation_type`

---

### Question 2: State Your Hypothesis

> "What's your hypothesis? Complete this:
>
> **IF** we change _____ (what)
> **THEN** _____ (expected result)
> **BECAUSE** _____ (reasoning)
>
> Example:
> IF we reduce Entry price from $997 to $697
> THEN conversion rate will increase by 20%+
> BECAUSE price objections are the #1 drop-off reason"

**Store as**: `test_hypothesis`

---

### Question 3: Test Methodology

> "Which test methodology?
>
> **1. Classic A/B Test** (recommended for most)
>    - 50/50 split between control and variation
>    - Easiest to analyze
>
> **2. A/B/C Test**
>    - Test 2 variations against control
>    - Find optimal faster
>    - Requires more traffic
>
> **3. Sequential Test**
>    - Test one variation at a time
>    - Safer for low traffic
>    - Takes longer
>
> Choose [1-3]:"

**Store as**: `test_methodology`

---

### Question 4: Sample Size & Duration

> "Test Parameters:
>
> **Expected weekly traffic**: _____ visitors
> **Minimum conversion rate change to detect**: _____%
> **Confidence level desired**: 95% (standard) or 90% (faster)
>
> **Auto-calculated**:
> - Minimum sample size needed: {calculated}
> - Estimated test duration: {calculated} days
> - Recommended duration: {calculated} days"

**Store as**: `test_parameters`

---

### Question 5: Success Criteria

> "How will you determine the winner?
>
> **Primary Metric** (must improve):
> - [ ] Conversion rate
> - [ ] Revenue per visitor
> - [ ] Average order value
> - [ ] Tier distribution quality
>
> **Secondary Metrics** (nice to have):
> - [ ] Time to purchase
> - [ ] Cart abandonment rate
> - [ ] Support ticket volume
>
> **Minimum Improvement to Declare Winner**: _____%"

**Store as**: `success_criteria`

---

## Phase 3: Create Test Variation(s)

**Goal**: Generate variation(s) based on hypothesis.

**Interaction Level**: LOW (Agent execution based on variation type)

### If variation_type = "pricing":

**Agent**: `pricing-strategist`

**Instructions**:
> "Create pricing variation for A/B test.
>
> **Hypothesis**: {test_hypothesis}
> **Control Pricing**: {control_prices}
> **What to Test**: {specific_pricing_change}
>
> **Your Mission**:
> 1. Create variation with proposed pricing changes
> 2. Ensure pricing psychology principles still applied
> 3. Validate 3-5x jumps maintained (if applicable)
> 4. Adjust payment options if needed
> 5. Project impact on metrics
>
> **Output**:
> - Variation pricing structure
> - Changes from control (detailed)
> - Projected impact
> - Risks/considerations"

**Generate**:
- `variation-a-offer-stack.md` with pricing changes only
- Side-by-side comparison table

---

### If variation_type = "messaging":

**Agent**: `value-proposition-specialist`

**Instructions**:
> "Create messaging variation for A/B test.
>
> **Hypothesis**: {test_hypothesis}
> **Control Messaging**: {control_messaging_snapshot}
> **What to Test**: {specific_messaging_change}
>
> **Your Mission**:
> 1. Create variation with proposed messaging changes
> 2. Maintain brand voice consistency
> 3. Ensure transformation promise clarity
> 4. Keep all other elements identical
> 5. Project impact on engagement/conversion
>
> **Output**:
> - Variation messaging (headlines, USPs, narratives, CTAs)
> - Changes from control (highlighted)
> - Projected impact
> - Testing recommendations"

**Generate**:
- `variation-a-offer-stack.md` with messaging changes only
- Side-by-side comparison

---

### If variation_type = "structural":

**Agent**: `offer-architect`

**Instructions**:
> "Create structural variation for A/B test.
>
> **Hypothesis**: {test_hypothesis}
> **Control Structure**: {control_structure}
> **What to Test**: {specific_structural_change}
>
> **Your Mission**:
> 1. Create variation with proposed structural changes
> 2. Maintain value ladder integrity
> 3. Ensure clear differentiation
> 4. Keep pricing and messaging consistent
> 5. Project impact on tier distribution
>
> **Output**:
> - Variation structure (features, support, access by tier)
> - Changes from control (detailed)
> - Projected impact
> - Implementation considerations"

**Generate**:
- `variation-a-offer-stack.md` with structural changes only
- Side-by-side comparison

---

### If variation_type = "combination":

Route to multiple agents as needed, coordinating changes.

---

## Phase 4: Validate Test Integrity

**Goal**: Ensure test is fair and scientifically sound.

**Agent**: `senior-offer-specialist`

**Instructions**:
> "Validate A/B test integrity.
>
> **Control**: {control_snapshot}
> **Variation(s)**: {variation_snapshots}
> **Hypothesis**: {test_hypothesis}
>
> **Your Mission - Check**:
> 1. **Isolation**: Only one variable changed? (or intentional combination)
> 2. **Fairness**: No confounding factors?
> 3. **Quality**: Both versions meet quality standards?
> 4. **Sample Size**: Sufficient traffic for statistical significance?
> 5. **Duration**: Long enough to account for day-of-week variance?
> 6. **Success Criteria**: Clear and measurable?
>
> **Output**:
> - Test integrity score (pass/fail)
> - Issues found (if any)
> - Recommendations
> - Go/no-go recommendation"

**If test fails validation**:
- Display issues
- Offer to fix
- Re-run validation

---

## Phase 5: Generate Test Plan

**Goal**: Create implementation guide and analysis framework.

**Output**: Comprehensive A/B Test Plan Document

```markdown
# A/B Test Plan: {test_name}
## {business_name}

**Test ID**: {test_id}
**Created**: {date}
**Status**: Ready to Launch

---

## Test Overview

**Hypothesis**:
{test_hypothesis}

**What We're Testing**:
{variation_type} - {specific_changes}

**Why We're Testing This**:
{reasoning}

**Expected Outcome**:
{expected_result}

---

## Test Variations

### Control (Version A)
{control_summary}

**Key Elements**:
- Pricing: {control_pricing}
- Messaging: {control_messaging_snapshot}
- Structure: {control_structure_snapshot}

### Variation (Version B)
{variation_summary}

**What Changed**:
{changes_list}

**What Stayed Same**:
{unchanged_list}

---

## Test Methodology

**Type**: {test_methodology} (50/50 split)

**Traffic Allocation**:
- Control: 50%
- Variation: 50%

**Sample Size Needed**: {calculated_sample_size} per variation
**Estimated Duration**: {estimated_days} days
**Confidence Level**: 95%

---

## Success Criteria

**Primary Metric**: {primary_metric}
- Control Baseline: {baseline_value}
- Minimum Detectable Effect: {min_effect}%
- Target Improvement: {target_improvement}%

**Secondary Metrics**:
- {secondary_metric_1}
- {secondary_metric_2}

**Winner Declaration Rules**:
1. Statistical significance reached (p < 0.05)
2. Sample size minimum met
3. Primary metric improved by {min_improvement}%+
4. No degradation in secondary metrics

---

## Implementation Checklist

### Pre-Launch (Do Before Test Starts)

- [ ] Set up tracking for all metrics
- [ ] Configure traffic split (50/50)
- [ ] Test tracking implementation (verify data flows)
- [ ] Document baseline metrics
- [ ] Brief team on test (no external mention)
- [ ] Set calendar reminder for check-ins

### Launch Day

- [ ] Activate traffic split
- [ ] Verify both versions live
- [ ] Check tracking working
- [ ] Monitor for technical issues
- [ ] Document launch timestamp

### During Test

- [ ] **Day 3**: Early check (sample size, tracking)
- [ ] **Day 7**: Mid-point check (trends, issues)
- [ ] **Day 14**: Progress check (approaching significance?)
- [ ] **Day {end_date}**: Final data collection
- [ ] Monitor for external factors (holidays, campaigns, etc.)

### Post-Test

- [ ] Export final data
- [ ] Run statistical analysis
- [ ] Determine winner
- [ ] Document learnings
- [ ] Implement winner (if clear)
- [ ] Plan next test

---

## Tracking Setup

**Tools Needed**:
- Analytics platform (Google Analytics, Mixpanel, etc.)
- A/B testing tool (if used)
- Spreadsheet for data tracking

**Events to Track**:
1. Variation viewed (A or B)
2. Add to cart
3. Checkout started
4. Purchase completed
5. Tier selected

**Custom Dimensions**:
- `ab_test_id`: {test_id}
- `ab_test_variation`: "control" or "variation"

---

## Analysis Framework

### Data Collection Template

```csv
Date, Variation, Visitors, Conversions, Revenue, AOV, Tier_Entry%, Tier_Core%, Tier_Premium%
2025-11-05, Control, 500, 15, $14925, $995, 40%, 50%, 10%
2025-11-05, Variation, 500, 18, $17946, $997, 35%, 55%, 10%
...
```

### Statistical Significance Calculator

Use tool: [Insert calculator URL or formula]

Required inputs:
- Visitors per variation
- Conversions per variation
- Confidence level (95%)

Output: P-value, significance (Yes/No)

---

## Decision Matrix

### If Variation Wins (p < 0.05, improvement > {target}%):
✅ **Implement variation immediately**
- Update offer stack
- Roll out to 100% traffic
- Document learning
- Plan follow-up test

### If Control Wins (variation performs worse):
❌ **Keep control**
- Document why variation failed
- Analyze secondary metrics for insights
- Formulate new hypothesis
- Plan next test

### If No Clear Winner (not statistically significant):
⚠️ **Extend test or iterate**
- Option 1: Run longer (if trend promising)
- Option 2: Abandon and test something else
- Option 3: Make change more dramatic

### If Test Compromised (technical issues, external factors):
🔄 **Invalidate and re-run**
- Document what went wrong
- Fix issues
- Re-launch clean test

---

## Risk Assessment

**Risks**:
1. {risk_1} - Mitigation: {mitigation_1}
2. {risk_2} - Mitigation: {mitigation_2}

**Guardrails**:
- If conversion drops >20% in first 48hrs → pause and investigate
- If revenue drops significantly → consider stopping early
- If technical issues detected → pause immediately

---

## Expected Results

**Conservative Scenario**:
- {primary_metric} improves by {conservative}%
- Revenue impact: +${amount}/month

**Moderate Scenario**:
- {primary_metric} improves by {moderate}%
- Revenue impact: +${amount}/month

**Optimistic Scenario**:
- {primary_metric} improves by {optimistic}%
- Revenue impact: +${amount}/month

---

## Files Generated

**Control Version**:
- `{business_name}-control-offer-stack.md`
- `{business_name}-control-offer-sheets.md` (3)

**Variation Version**:
- `{business_name}-variation-a-offer-stack.md`
- `{business_name}-variation-a-offer-sheets.md` (3)

**Test Plan**:
- `{business_name}-ab-test-plan-{test_id}.md`

**Comparison**:
- `{business_name}-control-vs-variation-comparison.md`

---

## Next Steps

**Immediate**:
1. Review this test plan
2. Set up tracking infrastructure
3. Schedule test launch

**Before Launch**:
1. Complete pre-launch checklist
2. Verify tracking working
3. Brief team

**After Test**:
1. Analyze results using this framework
2. Run `/offer-forge` → `*analyze-test` (Phase 6 of this workflow)
3. Implement winner
4. Plan next test iteration

---

**End of Test Plan**
```

---

## Phase 6: Analyze Test Results (Conditional)

**Goal**: Analyze results and determine winner.

**Condition**: Only runs if user provides test results.

**Interaction Level**: HIGH

**Process**:

### Input Test Results

> "Provide test results (or skip if test hasn't run yet):
>
> **Control Results**:
> - Visitors: _____
> - Conversions: _____
> - Conversion Rate: _____%
> - Revenue: $_____
> - AOV: $_____
>
> **Variation Results**:
> - Visitors: _____
> - Conversions: _____
> - Conversion Rate: _____%
> - Revenue: $_____
> - AOV: $_____
>
> **Test Duration**: _____ days"

**Store as**: `test_results`

---

### Statistical Analysis

Calculate automatically:

**Conversion Rate Comparison**:
- Control: {control_rate}%
- Variation: {variation_rate}%
- Difference: {delta}% ({better/worse})

**Statistical Significance**:
- P-value: {p_value}
- Significant? {yes/no} (p < 0.05)
- Sample size adequate? {yes/no}

**Revenue Impact**:
- Control revenue: ${control_revenue}
- Variation revenue: ${variation_revenue}
- Difference: ${delta} ({+/-}%)

---

### Winner Declaration

```
IF statistically_significant AND variation_better AND meets_minimum_improvement:
  Winner = "Variation"
  Recommendation = "Implement immediately"

ELSE IF statistically_significant AND control_better:
  Winner = "Control"
  Recommendation = "Keep control, formulate new hypothesis"

ELSE IF NOT statistically_significant:
  Winner = "Inconclusive"
  Recommendation = "Extend test or try more dramatic change"
```

**Display Results**:

> "**Test Results Analysis**
>
> **Winner**: {winner}
> **Confidence**: {confidence}% confident
> **Improvement**: {delta}% {improvement_direction}
>
> **Recommendation**: {recommendation}
>
> **Statistical Details**:
> - P-value: {p_value}
> - Sample size: {n} per variation
> - Test duration: {days} days
> - Significance achieved: {yes/no}
>
> **Revenue Impact**:
> - Projected monthly increase: +${monthly_increase}
> - Projected annual increase: +${annual_increase}
>
> **Next Steps**:
> {next_steps}"

---

### Generate Results Report

```markdown
# A/B Test Results Report
## {test_name} - {test_id}

**Test Period**: {start_date} to {end_date}
**Duration**: {days} days

---

## Executive Summary

**Winner**: {winner}
**Primary Metric Change**: {delta}%
**Statistical Significance**: {yes/no}
**Recommendation**: {recommendation}

---

## Test Results

### Control (Version A)
- Visitors: {n}
- Conversions: {conversions}
- Conversion Rate: {rate}%
- Revenue: ${revenue}
- AOV: ${aov}

### Variation (Version B)
- Visitors: {n}
- Conversions: {conversions}
- Conversion Rate: {rate}%
- Revenue: ${revenue}
- AOV: ${aov}

---

## Statistical Analysis

**Conversion Rate**:
- Control: {control_rate}%
- Variation: {variation_rate}%
- Difference: {delta}% ({improvement_direction})
- P-value: {p_value}
- Significant?: {yes/no}

**Revenue**:
- Control RPV: ${rpv}
- Variation RPV: ${rpv}
- Difference: {delta}%

---

## Decision & Next Steps

**Decision**: {implement_variation / keep_control / extend_test}

**Reasoning**:
{detailed_reasoning}

**Implementation Plan** (if winner):
1. Update offer stack to winning version
2. Roll out to 100% traffic
3. Monitor metrics for 30 days
4. Document learning

**Learnings**:
{key_learnings}

**Next Test Ideas**:
{next_test_suggestions}

---

**End of Results Report**
```

---

## Workflow Completion

> "**A/B Test Workflow Complete!**
>
> **Generated Files**:
> 1. Test Plan: {test_plan_path}
> 2. Control Stack: {control_path}
> 3. Variation Stack: {variation_path}
> 4. Comparison Doc: {comparison_path}
> 5. Results Report: {results_path} (if results analyzed)
>
> **Next Steps**:
> - Review test plan
> - Set up tracking
> - Launch test
> - Run Phase 6 when results ready: `/offer-forge` → `*analyze-test`"

---

## Workflow Metadata

- **Version**: 1.0.0 (V3)
- **Author**: Daniel
- **Module**: offer-forge
- **Type**: Action Workflow (Test Creation + Analysis)
- **Estimated Duration**: 15-30 minutes (test setup) + 10 minutes (results analysis)
- **Dependencies**: 1-3 specialist agents (based on variation type)
- **Output**: Test plan + 2 offer variations + comparison + results report (if analyzed)
- **Recommended Use**: After OPTIMIZE identifies promising changes to validate
