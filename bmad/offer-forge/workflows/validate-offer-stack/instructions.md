# Validate Offer Stack Workflow Instructions
# Module: offer-forge
# Version: 1.0.0 (V2)

## Mission

Perform comprehensive quality checks on existing offer stacks to ensure they maintain high standards and remain competitive. This workflow generates detailed validation reports with actionable recommendations without modifying the original offer stack.

**Use Cases**:
- Periodic quality audits (monthly/quarterly)
- Pre-launch validation before marketing campaigns
- Post-market analysis after pricing or messaging tests
- Competitive landscape health checks
- Performance troubleshooting (low conversions, poor tier distribution)

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
   - File must be valid offer stack document

4. **Set Validation Date**
   - Store current date as: `validation_date`

---

## Phase 1: Load Existing Offer Stack

**Goal**: Parse and analyze current offer stack document.

**Interaction Level**: LOW (Autonomous loading)

**Process**:

1. **Load Document**
   - Read file from: `{existing_offer_stack_path}`
   - Parse all sections and variables
   - Store current state in memory

2. **Extract Metadata**
   - Business name
   - Creation date
   - Last update date (if any)
   - Current quality score (if available)
   - Stack structure (2-tier or 3-tier)

3. **Extract Key Metrics**
   - Current pricing: Entry / Core / Premium
   - Support levels by tier
   - Access levels by tier
   - USPs and messaging snapshot
   - Value ladder structure

4. **Display Summary**
   > "**Loaded Offer Stack for Validation**
   >
   > **Business**: {business_name}
   > **Created**: {creation_date}
   > **Last Updated**: {last_update_date}
   > **Previous Quality Score**: {previous_quality_score}/10
   > **Structure**: {stack_structure}
   > **Pricing**: Entry ({entry_price}) | Core ({core_price}) | Premium ({premium_price})"

**After Loading**:
- Confirm document loaded successfully
- Transition to Phase 2

---

## Phase 2: Gather Validation Context

**Goal**: Collect performance data and market context to inform validation.

**Interaction Level**: HIGH (Interactive questioning)

**Process**:

### Question 1: Validation Purpose

> "What prompted this validation check?"
>
> 1. Periodic audit (routine quality check)
> 2. Performance troubleshooting (low conversions or issues)
> 3. Pre-launch check (before major campaign)
> 4. Post-test analysis (after pricing/messaging changes)
> 5. Competitive pressure (competitor changes detected)
> 6. Customer feedback concerns

**Store as**: `validation_purpose`

---

### Question 2: Performance Data (Optional but Recommended)

> "Do you have conversion data to share? (This improves validation insights)"
>
> **Conversion Rates** (skip if unavailable):
> - Entry tier: ____%
> - Core tier: ____%
> - Premium tier: ____%
>
> **Tier Distribution** (% of total sales):
> - Entry: ____%
> - Core: ____%
> - Premium: ____%
>
> **Common Customer Feedback** (if any):
> - Positive: _____
> - Negative: _____
> - Questions/Objections: _____

**Store as**:
- `conversion_rates` (optional)
- `tier_distribution` (optional)
- `customer_feedback` (optional)

---

### Question 3: Competitive Context

> "Should we include fresh competitive analysis in this validation?"
>
> **Options**:
> - Yes, run web search to check current competitor pricing and positioning
> - No, validate against internal quality standards only
>
> **Note**: Competitive analysis adds 3-5 minutes to validation time.

**Store as**: `include_competitive_analysis` (true/false)

**IF** `include_competitive_analysis == true`:
> "Please provide 2-3 competitor names or URLs to analyze:"
> - Competitor 1: _____
> - Competitor 2: _____
> - Competitor 3: _____

**Store as**: `competitor_list`

---

### Question 4: Validation Focus Areas (Optional)

> "Any specific areas you're concerned about? (Select all that apply)"
>
> - [ ] Pricing (seems too high/low, not converting)
> - [ ] Messaging (not resonating, unclear)
> - [ ] Value ladder (tier confusion, poor progression)
> - [ ] Differentiation (losing to competitors)
> - [ ] Support levels (overpromising, unsustainable)
> - [ ] Objection handling (new objections emerging)
> - [ ] All areas (comprehensive audit)

**Store as**: `focus_areas`

---

**After Gathering Context**:
- Summarize all captured information
- Confirm with user
- Transition: "Running comprehensive validation checks..."

---

## Phase 3: Core Quality Validation

**Goal**: Assess offer stack against 8 quality criteria.

**Interaction Level**: LOW (Autonomous validation)

**Agent**: `senior-offer-specialist`

**Invocation Method**: Intent-based validation

**Instructions to Agent**:
> "Perform comprehensive quality validation on this existing offer stack.
>
> **Context Provided**:
> - Complete offer stack document
> - Performance data: {conversion_rates}, {tier_distribution}
> - Customer feedback: {customer_feedback}
> - Focus areas: {focus_areas}
> - Validation purpose: {validation_purpose}
> - Previous quality score: {previous_quality_score}
>
> **Your Mission**:
> Use your embedded prompt `validate-complete-offer` to assess all 8 criteria:
> 1. Value Ladder Integrity
> 2. Tier Differentiation Clarity
> 3. Transformation Promise Strength
> 4. Messaging Alignment
> 5. Pricing Psychology Application
> 6. Objection Handling Coverage
> 7. Support Scaling Logic
> 8. Competitive Differentiation
>
> **Validation Process**:
> 1. Score each criterion (Strong: 10, Good: 7-9, Needs Work: 4-6, Weak: 1-3)
> 2. Calculate overall quality score
> 3. Compare to previous score (if available)
> 4. Provide detailed feedback for each criterion
> 5. Flag any declining areas
> 6. Highlight strengths and weaknesses
> 7. Prioritize issues by conversion impact
>
> **Required Outputs**:
> - Current quality score (0-10)
> - Score breakdown by criterion
> - Score comparison vs. previous (if available)
> - Detailed feedback for each criterion
> - Priority issues list (ranked by impact)
> - Strengths to leverage
> - Specific recommendations for improvement"

**Processing**:
- Agent runs full 8-criteria assessment
- No correction loops (validation only, no modifications)
- Focus on diagnosis and recommendations

**Store outputs as**:
- `current_quality_score`
- `quality_score_breakdown` (8 criterion scores)
- `quality_score_delta` (vs. previous, if available)
- `validation_feedback_detailed`
- `priority_issues`
- `identified_strengths`
- `improvement_recommendations`

**Display Progress**:
> "Running quality assessment...
> - Value Ladder Integrity: {score}/10
> - Tier Differentiation: {score}/10
> - Transformation Promises: {score}/10
> - Messaging Alignment: {score}/10
> - Pricing Psychology: {score}/10
> - Objection Handling: {score}/10
> - Support Scaling: {score}/10
> - Competitive Differentiation: {score}/10
>
> **Overall Quality Score**: {current_quality_score}/10"

---

## Phase 4: Competitive Analysis (Conditional)

**Goal**: Analyze current competitive landscape and positioning.

**Interaction Level**: LOW (Autonomous analysis with web search)

**Condition**: Only run if `include_competitive_analysis == true`

**Agent**: `offer-architect`

**Instructions to Agent**:
> "Perform competitive analysis for this offer stack.
>
> **Context Provided**:
> - Current offer stack pricing and positioning
> - Competitor list: {competitor_list}
> - Previous competitive notes (from original stack): {original_competitive_notes}
>
> **Your Mission**:
> Use web search and your embedded prompt `competitive-research` to:
> 1. Find current competitor pricing for {competitor_list}
> 2. Analyze their offer structures and positioning
> 3. Compare our pricing to market
> 4. Identify any new competitive threats
> 5. Assess our differentiation strength
> 6. Identify gaps or opportunities
>
> **Required Outputs**:
> - Competitor pricing comparison table
> - Competitive positioning analysis
> - Differentiation strength assessment
> - Market gaps identified
> - Positioning recommendations
> - Pricing competitiveness score (1-10)"

**Store outputs as**:
- `competitor_pricing_comparison`
- `competitive_positioning_analysis`
- `differentiation_assessment`
- `market_gaps`
- `positioning_recommendations`
- `pricing_competitiveness_score`

**Display Progress**:
> "Analyzing competitive landscape...
> - Competitor pricing checked
> - Positioning analyzed
> - Differentiation assessed
>
> **Pricing Competitiveness**: {pricing_competitiveness_score}/10"

---

## Phase 5: Generate Validation Report

**Goal**: Create comprehensive validation report with findings and recommendations.

**Interaction Level**: LOW (Autonomous report generation)

**Process**:

Generate detailed validation report document: `{business_name}-validation-report-{validation_date}.md`

### Report Structure:

```markdown
# Offer Stack Validation Report
## {business_name}

**Validation Date**: {validation_date}
**Offer Stack Created**: {creation_date}
**Last Updated**: {last_update_date}
**Validation Purpose**: {validation_purpose}

---

## Executive Summary

### Overall Quality Score: {current_quality_score}/10

**Status**: {Strong (8-10) | Good (7-7.9) | Needs Improvement (5-6.9) | Critical Issues (<5)}

**Score Trend**:
- Previous Score: {previous_quality_score}/10
- Current Score: {current_quality_score}/10
- Change: {quality_score_delta} ({improving/stable/declining})

### Key Findings (Top 3)
1. {priority_issue_1}
2. {priority_issue_2}
3. {priority_issue_3}

### Recommended Actions
1. {top_recommendation_1}
2. {top_recommendation_2}
3. {top_recommendation_3}

---

## Quality Criteria Assessment

### 1. Value Ladder Integrity: {score}/10
**Status**: {Strong/Good/Needs Work/Weak}

**Findings**:
{detailed_feedback_criterion_1}

**Recommendations**:
{recommendations_criterion_1}

---

### 2. Tier Differentiation Clarity: {score}/10
**Status**: {Strong/Good/Needs Work/Weak}

**Findings**:
{detailed_feedback_criterion_2}

**Recommendations**:
{recommendations_criterion_2}

---

### 3. Transformation Promise Strength: {score}/10
**Status**: {Strong/Good/Needs Work/Weak}

**Findings**:
{detailed_feedback_criterion_3}

**Recommendations**:
{recommendations_criterion_3}

---

### 4. Messaging Alignment: {score}/10
**Status**: {Strong/Good/Needs Work/Weak}

**Findings**:
{detailed_feedback_criterion_4}

**Recommendations**:
{recommendations_criterion_4}

---

### 5. Pricing Psychology Application: {score}/10
**Status**: {Strong/Good/Needs Work/Weak}

**Findings**:
{detailed_feedback_criterion_5}

**Recommendations**:
{recommendations_criterion_5}

---

### 6. Objection Handling Coverage: {score}/10
**Status**: {Strong/Good/Needs Work/Weak}

**Findings**:
{detailed_feedback_criterion_6}

**Recommendations**:
{recommendations_criterion_6}

---

### 7. Support Scaling Logic: {score}/10
**Status**: {Strong/Good/Needs Work/Weak}

**Findings**:
{detailed_feedback_criterion_7}

**Recommendations**:
{recommendations_criterion_7}

---

### 8. Competitive Differentiation: {score}/10
**Status**: {Strong/Good/Needs Work/Weak}

**Findings**:
{detailed_feedback_criterion_8}

**Recommendations**:
{recommendations_criterion_8}

---

## Performance Analysis (If Data Provided)

### Conversion Rates
- Entry Tier: {entry_conversion_rate}% {benchmark_comparison}
- Core Tier: {core_conversion_rate}% {benchmark_comparison}
- Premium Tier: {premium_conversion_rate}% {benchmark_comparison}

### Tier Distribution
- Entry: {entry_distribution}% of sales
- Core: {core_distribution}% of sales
- Premium: {premium_distribution}% of sales

**Analysis**:
{tier_distribution_analysis}

**Recommendations**:
{distribution_recommendations}

---

## Competitive Analysis (If Requested)

### Pricing Competitiveness: {pricing_competitiveness_score}/10

### Competitor Comparison

| Competitor | Their Price Range | Our Position | Analysis |
|------------|------------------|--------------|----------|
| {competitor_1} | {competitor_1_pricing} | {our_position_vs_1} | {analysis_1} |
| {competitor_2} | {competitor_2_pricing} | {our_position_vs_2} | {analysis_2} |
| {competitor_3} | {competitor_3_pricing} | {our_position_vs_3} | {analysis_3} |

### Differentiation Strength
{differentiation_assessment}

### Market Gaps Identified
{market_gaps}

### Positioning Recommendations
{positioning_recommendations}

---

## Priority Issues (Ranked by Impact)

### High Priority
{high_priority_issues}

### Medium Priority
{medium_priority_issues}

### Low Priority
{low_priority_issues}

---

## Identified Strengths

What's working well in this offer stack:

1. {strength_1}
2. {strength_2}
3. {strength_3}
...

**Leverage These**: {how_to_leverage_strengths}

---

## Customer Feedback Analysis (If Provided)

### Positive Feedback Themes
{positive_themes}

### Negative Feedback Themes
{negative_themes}

### Common Objections
{common_objections}

### Insights
{feedback_insights}

---

## Actionable Recommendations

### Immediate Actions (This Week)
1. {immediate_action_1}
2. {immediate_action_2}
3. {immediate_action_3}

### Short-Term Actions (This Month)
1. {short_term_action_1}
2. {short_term_action_2}
3. {short_term_action_3}

### Long-Term Actions (This Quarter)
1. {long_term_action_1}
2. {long_term_action_2}
3. {long_term_action_3}

---

## Implementation Plan

### To Address High-Priority Issues

**Issue**: {priority_issue_1}
**Impact**: {impact_assessment}
**Solution**: {recommended_solution}
**Effort**: {low/medium/high}
**Timeline**: {timeframe}
**How to Execute**: {step_by_step}

[Repeat for each high-priority issue]

---

## Next Validation

**Recommended Frequency**: {monthly/quarterly/semi-annual}
**Next Validation Date**: {next_date}
**Conditions to Trigger Early Validation**:
- Conversion rates drop >10%
- Major competitor changes detected
- New objections emerge frequently
- Pricing tests show significant variance

---

## Appendix: Detailed Scores

### Quality Criteria Scores
| Criterion | Score | Status | Trend |
|-----------|-------|--------|-------|
| Value Ladder Integrity | {score} | {status} | {trend} |
| Tier Differentiation | {score} | {status} | {trend} |
| Transformation Promises | {score} | {status} | {trend} |
| Messaging Alignment | {score} | {status} | {trend} |
| Pricing Psychology | {score} | {status} | {trend} |
| Objection Handling | {score} | {status} | {trend} |
| Support Scaling | {score} | {status} | {trend} |
| Competitive Differentiation | {score} | {status} | {trend} |

### Scoring Key
- **Strong (8-10)**: Meets or exceeds best practices
- **Good (7-7.9)**: Solid with minor improvements possible
- **Needs Work (4-6.9)**: Significant improvements needed
- **Weak (1-3)**: Critical issues requiring immediate attention

---

**End of Validation Report**

**How to Use This Report**:
1. Start with Executive Summary for quick overview
2. Review Priority Issues for immediate action items
3. Read detailed criterion feedback for deep insights
4. Follow Implementation Plan for step-by-step improvements
5. Schedule next validation per recommendations

**To Make Updates**:
Use `/offer-forge` → `*update` workflow to implement recommended changes.
```

---

## Phase 6: Present Recommendations

**Goal**: Present findings and recommendations to user interactively.

**Interaction Level**: HIGH (Interactive presentation)

**Process**:

1. **Display Executive Summary**
   > "**Validation Complete!**
   >
   > **Overall Quality Score**: {current_quality_score}/10
   > **Status**: {status_label}
   > **Trend**: {previous_quality_score} → {current_quality_score} ({trend_direction})
   >
   > **Top 3 Findings**:
   > 1. {priority_issue_1}
   > 2. {priority_issue_2}
   > 3. {priority_issue_3}"

2. **Highlight Critical Issues** (if any)
   > "**⚠️ Critical Issues Detected** (Score < 5.0):
   > {list_of_critical_issues}
   >
   > **Immediate Action Required**: {immediate_action_recommendation}"

3. **Show Strengths**
   > "**✅ Strengths to Leverage**:
   > {list_of_strengths}"

4. **Present Recommendations**
   > "**Recommended Next Steps**:
   >
   > **Immediate** (This Week):
   > {immediate_actions}
   >
   > **Short-Term** (This Month):
   > {short_term_actions}
   >
   > **Long-Term** (This Quarter):
   > {long_term_actions}"

5. **Provide Report Location**
   > "**Full Validation Report Saved**:
   > {report_file_path}
   >
   > This report includes:
   > - Detailed scores for all 8 criteria
   > - Competitive analysis (if requested)
   > - Performance insights (if data provided)
   > - Step-by-step implementation plan
   > - Next validation recommendations"

6. **Offer Next Actions**
   > "Would you like to:
   > 1. Make updates now (launches UPDATE workflow)
   > 2. Review the full report first
   > 3. Schedule next validation
   > 4. Export report in different format
   > 5. Exit validation
   >
   > Choose an option [1-5]:"

**Handle User Choice**:
- **Option 1**: Launch UPDATE workflow with validation findings pre-loaded
- **Option 2**: Open full report for user review
- **Option 3**: Set calendar reminder for next validation
- **Option 4**: Offer export formats (PDF, etc.)
- **Option 5**: End workflow gracefully

---

## Workflow Completion

After presenting recommendations:

1. **Confirm Report Saved**:
   > "Validation complete! Report saved to: {report_file_path}"

2. **Set Next Validation Date**:
   > "**Next Recommended Validation**: {next_validation_date}
   > (Add to calendar or set reminder)"

3. **Workflow Complete**:
   - Mark workflow as completed
   - Return control to hub agent or user

---

## Error Handling

### If Existing File Not Found
- Display error: "Offer stack file not found at: {path}"
- Ask user to provide correct path
- Offer to list available offer stacks in {output_folder}

### If File Invalid Format
- Display error: "File doesn't appear to be a valid offer stack document"
- Attempt to extract what information is available
- Run partial validation with warning
- Recommend using UPDATE workflow to fix formatting

### If No Performance Data Provided
- Run validation without performance analysis
- Note in report: "Performance analysis skipped (no data provided)"
- Recommend gathering conversion data for next validation

### If Web Search Fails (Competitive Analysis)
- Display warning: "Web search unavailable - using cached competitive data"
- Use original competitive notes from offer stack document
- Flag competitive analysis as potentially outdated
- Recommend manual competitive research

### If Validation Score < 5.0 (Critical)
- Display urgent alert: "Critical quality issues detected!"
- Highlight most urgent issues
- Recommend immediate UPDATE workflow execution
- Offer to pause marketing until issues resolved

---

## Workflow Metadata

- **Version**: 1.0.0 (V2)
- **Author**: Daniel
- **Module**: offer-forge
- **Type**: Action Workflow (Read-only validation)
- **Estimated Duration**: 5-10 minutes (15-20 with competitive analysis)
- **Dependencies**: 1-2 specialist agents (Senior Offer Specialist required, Offer Architect optional)
- **Output**: Comprehensive validation report with scores, findings, and recommendations
- **Frequency**: Recommended monthly for first 3 months, then quarterly
