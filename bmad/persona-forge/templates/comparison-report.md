# Persona Comparison Report

**Generated:** {{date}}
**Comparison Type:** {{comparison_type}}
**Personas Compared:** {{persona_count}}

---

# EXECUTIVE SUMMARY

## Personas Being Compared

**Persona 1:** {{persona_1_name}}
- **Version:** {{persona_1_version}}
- **Last Updated:** {{persona_1_last_updated}}
- **Quick Description:** {{persona_1_description}}

**Persona 2:** {{persona_2_name}}
- **Version:** {{persona_2_version}}
- **Last Updated:** {{persona_2_last_updated}}
- **Quick Description:** {{persona_2_description}}

{{#if persona_3_exists}}
**Persona 3:** {{persona_3_name}}
- **Version:** {{persona_3_version}}
- **Last Updated:** {{persona_3_last_updated}}
- **Quick Description:** {{persona_3_description}}
{{/if}}

## Top 3 Key Findings

1. **{{key_finding_1_title}}**
   {{key_finding_1_description}}

2. **{{key_finding_2_title}}**
   {{key_finding_2_description}}

3. **{{key_finding_3_title}}**
   {{key_finding_3_description}}

## Strategic Recommendation

{{strategic_recommendation_summary}}

---

# DETAILED COMPARISON

## Demographics Comparison

| Attribute | {{persona_1_name}} | {{persona_2_name}} | {{#if persona_3_exists}}{{persona_3_name}}{{/if}} | Analysis |
|-----------|---------------------|---------------------|---------------------|----------|
| **Age Range** | {{p1_age}} | {{p2_age}} | {{p3_age}} | {{age_analysis}} |
| **Income** | {{p1_income}} | {{p2_income}} | {{p3_income}} | {{income_analysis}} |
| **Location** | {{p1_location}} | {{p2_location}} | {{p3_location}} | {{location_analysis}} |
| **Occupation** | {{p1_occupation}} | {{p2_occupation}} | {{p3_occupation}} | {{occupation_analysis}} |
| **Education** | {{p1_education}} | {{p2_education}} | {{p3_education}} | {{education_analysis}} |

### Demographic Differentiation Level

{{demographic_differentiation_assessment}}

---

## Psychographics Comparison

| Attribute | {{persona_1_name}} | {{persona_2_name}} | {{#if persona_3_exists}}{{persona_3_name}}{{/if}} | Analysis |
|-----------|---------------------|---------------------|---------------------|----------|
| **Core Values** | {{p1_values}} | {{p2_values}} | {{p3_values}} | {{values_analysis}} |
| **Lifestyle** | {{p1_lifestyle}} | {{p2_lifestyle}} | {{p3_lifestyle}} | {{lifestyle_analysis}} |
| **Personality Type** | {{p1_personality}} | {{p2_personality}} | {{p3_personality}} | {{personality_analysis}} |
| **Media Consumption** | {{p1_media}} | {{p2_media}} | {{p3_media}} | {{media_analysis}} |

### Psychographic Differentiation Level

{{psychographic_differentiation_assessment}}

---

## Pain Points Comparison

### Side-by-Side Pain Points

**{{persona_1_name}}:**
1. {{p1_pain_1}}
2. {{p1_pain_2}}
3. {{p1_pain_3}}

**{{persona_2_name}}:**
1. {{p2_pain_1}}
2. {{p2_pain_2}}
3. {{p2_pain_3}}

{{#if persona_3_exists}}
**{{persona_3_name}}:**
1. {{p3_pain_1}}
2. {{p3_pain_2}}
3. {{p3_pain_3}}
{{/if}}

### Pain Point Analysis

**Unique Pain Points:**
- **{{persona_1_name}} Only:** {{p1_unique_pains}}
- **{{persona_2_name}} Only:** {{p2_unique_pains}}
{{#if persona_3_exists}}- **{{persona_3_name}} Only:** {{p3_unique_pains}}{{/if}}

**Shared Pain Points:**
{{shared_pain_points}}

**Pain Intensity Comparison:**
{{pain_intensity_analysis}}

---

## Goals Comparison

### Side-by-Side Goals

**{{persona_1_name}}:**
1. {{p1_goal_1}}
2. {{p1_goal_2}}
3. {{p1_goal_3}}

**{{persona_2_name}}:**
1. {{p2_goal_1}}
2. {{p2_goal_2}}
3. {{p2_goal_3}}

{{#if persona_3_exists}}
**{{persona_3_name}}:**
1. {{p3_goal_1}}
2. {{p3_goal_2}}
3. {{p3_goal_3}}
{{/if}}

### Goal Analysis

**Unique Goals:**
- **{{persona_1_name}} Only:** {{p1_unique_goals}}
- **{{persona_2_name}} Only:** {{p2_unique_goals}}
{{#if persona_3_exists}}- **{{persona_3_name}} Only:** {{p3_unique_goals}}{{/if}}

**Shared Goals:**
{{shared_goals}}

**Goal Priority Comparison:**
{{goal_priority_analysis}}

---

{{#if detailed_or_strategic}}

## Emotional Drivers Comparison

| Aspect | {{persona_1_name}} | {{persona_2_name}} | {{#if persona_3_exists}}{{persona_3_name}}{{/if}} |
|--------|---------------------|---------------------|---------------------|
| **Core Fears** | {{p1_fears}} | {{p2_fears}} | {{p3_fears}} |
| **Aspirations** | {{p1_aspirations}} | {{p2_aspirations}} | {{p3_aspirations}} |
| **Decision Factors** | {{p1_decision_factors}} | {{p2_decision_factors}} | {{p3_decision_factors}} |
| **Emotional Triggers** | {{p1_triggers}} | {{p2_triggers}} | {{p3_triggers}} |

### Emotional Differentiation

{{emotional_differentiation_analysis}}

---

## Awareness Journey Comparison

### Behavior Patterns by Awareness Level

**🔵 Unaware Stage:**
- **{{persona_1_name}}:** {{p1_unaware_behavior}}
- **{{persona_2_name}}:** {{p2_unaware_behavior}}
{{#if persona_3_exists}}- **{{persona_3_name}}:** {{p3_unaware_behavior}}{{/if}}

**🟢 Problem Aware Stage:**
- **{{persona_1_name}}:** {{p1_problem_aware_behavior}}
- **{{persona_2_name}}:** {{p2_problem_aware_behavior}}
{{#if persona_3_exists}}- **{{persona_3_name}}:** {{p3_problem_aware_behavior}}{{/if}}

**🟡 Solution Aware Stage:**
- **{{persona_1_name}}:** {{p1_solution_aware_behavior}}
- **{{persona_2_name}}:** {{p2_solution_aware_behavior}}
{{#if persona_3_exists}}- **{{persona_3_name}}:** {{p3_solution_aware_behavior}}{{/if}}

**🟠 Product Aware Stage:**
- **{{persona_1_name}}:** {{p1_product_aware_behavior}}
- **{{persona_2_name}}:** {{p2_product_aware_behavior}}
{{#if persona_3_exists}}- **{{persona_3_name}}:** {{p3_product_aware_behavior}}{{/if}}

**🔴 Most Aware Stage:**
- **{{persona_1_name}}:** {{p1_most_aware_behavior}}
- **{{persona_2_name}}:** {{p2_most_aware_behavior}}
{{#if persona_3_exists}}- **{{persona_3_name}}:** {{p3_most_aware_behavior}}{{/if}}

### Awareness Journey Insights

{{awareness_journey_insights}}

---

## Messaging Comparison

### Language and Tone

| Aspect | {{persona_1_name}} | {{persona_2_name}} | {{#if persona_3_exists}}{{persona_3_name}}{{/if}} |
|--------|---------------------|---------------------|---------------------|
| **Vocabulary** | {{p1_vocabulary}} | {{p2_vocabulary}} | {{p3_vocabulary}} |
| **Tone Preference** | {{p1_tone}} | {{p2_tone}} | {{p3_tone}} |
| **Proof Requirements** | {{p1_proof}} | {{p2_proof}} | {{p3_proof}} |
| **Key Phrases** | {{p1_phrases}} | {{p2_phrases}} | {{p3_phrases}} |

### Messaging Differentiation Tactics

{{messaging_differentiation_tactics}}

---

## Content & Channel Comparison

### Content Preferences

| Content Type | {{persona_1_name}} | {{persona_2_name}} | {{#if persona_3_exists}}{{persona_3_name}}{{/if}} |
|--------------|---------------------|---------------------|---------------------|
| **Blog Posts** | {{p1_blog_pref}} | {{p2_blog_pref}} | {{p3_blog_pref}} |
| **Video** | {{p1_video_pref}} | {{p2_video_pref}} | {{p3_video_pref}} |
| **Social Media** | {{p1_social_pref}} | {{p2_social_pref}} | {{p3_social_pref}} |
| **Email** | {{p1_email_pref}} | {{p2_email_pref}} | {{p3_email_pref}} |
| **Webinars** | {{p1_webinar_pref}} | {{p2_webinar_pref}} | {{p3_webinar_pref}} |

### Channel Strategy

{{channel_strategy_comparison}}

---

## Qualification Questions Analysis

### Questions That Distinguish Personas

**High Differentiation Questions:**
1. {{differentiating_question_1}}
2. {{differentiating_question_2}}
3. {{differentiating_question_3}}

**Recommended Question Sequence:**
{{question_sequence_recommendation}}

**Identification Decision Tree:**
```
{{qualification_decision_tree}}
```

---

## Overlap & Risk Analysis

### Areas of Potential Confusion

⚠️ **High Risk Overlaps:**
{{high_risk_overlaps}}

🟡 **Moderate Risk Overlaps:**
{{moderate_risk_overlaps}}

🟢 **Low Risk Overlaps:**
{{low_risk_overlaps}}

### Mitigation Strategies

{{overlap_mitigation_strategies}}

{{/if}}

---

{{#if strategic}}

# STRATEGIC ANALYSIS

## Market Opportunity Assessment

### Opportunity Scoring

| Factor | {{persona_1_name}} | {{persona_2_name}} | {{#if persona_3_exists}}{{persona_3_name}}{{/if}} |
|--------|---------------------|---------------------|---------------------|
| **Market Size** (0-10) | {{p1_market_size_score}} | {{p2_market_size_score}} | {{p3_market_size_score}} |
| **Ease of Access** (0-10) | {{p1_ease_access_score}} | {{p2_ease_access_score}} | {{p3_ease_access_score}} |
| **Competitive Intensity** (0-10) | {{p1_competition_score}} | {{p2_competition_score}} | {{p3_competition_score}} |
| **Business Alignment** (0-10) | {{p1_alignment_score}} | {{p2_alignment_score}} | {{p3_alignment_score}} |
| **Resource Efficiency** (0-10) | {{p1_efficiency_score}} | {{p2_efficiency_score}} | {{p3_efficiency_score}} |
| **TOTAL SCORE** | **{{p1_total_score}}** | **{{p2_total_score}}** | **{{p3_total_score}}** |
| **PRIORITY** | {{p1_priority_rank}} | {{p2_priority_rank}} | {{p3_priority_rank}} |

### Strategic Priority Ranking

1. **{{priority_1_persona}}** (Score: {{priority_1_score}})
   - {{priority_1_rationale}}

2. **{{priority_2_persona}}** (Score: {{priority_2_score}})
   - {{priority_2_rationale}}

{{#if persona_3_exists}}
3. **{{priority_3_persona}}** (Score: {{priority_3_score}})
   - {{priority_3_rationale}}
{{/if}}

---

## Resource Allocation Recommendations

### Budget Allocation

**Recommended Split:**
- **{{persona_1_name}}:** {{p1_budget_percent}}% ({{p1_budget_rationale}})
- **{{persona_2_name}}:** {{p2_budget_percent}}% ({{p2_budget_rationale}})
{{#if persona_3_exists}}- **{{persona_3_name}}:** {{p3_budget_percent}}% ({{p3_budget_rationale}}){{/if}}

### Team Specialization

{{team_specialization_recommendations}}

### Content Production Priorities

{{content_production_priorities}}

### Campaign Investment

{{campaign_investment_recommendations}}

---

## Cross-Persona Insights

### Persona Migration Patterns

{{persona_migration_analysis}}

### Cross-Sell Opportunities

{{cross_sell_opportunities}}

### Upsell Pathways

{{upsell_pathways}}

### Segment Evolution Strategies

{{segment_evolution_strategies}}

---

## Strategic Recommendations

### 🎯 Primary Focus: {{primary_focus_persona}}

**Why This Persona:**
{{primary_focus_rationale}}

**Recommended Actions:**
1. {{primary_action_1}}
2. {{primary_action_2}}
3. {{primary_action_3}}

### 🎯 Secondary Focus: {{secondary_focus_persona}}

**Why This Persona:**
{{secondary_focus_rationale}}

**Recommended Actions:**
1. {{secondary_action_1}}
2. {{secondary_action_2}}
3. {{secondary_action_3}}

{{#if persona_3_exists}}
### 🎯 Tertiary Focus: {{tertiary_focus_persona}}

**Why This Persona:**
{{tertiary_focus_rationale}}

**Recommended Actions:**
1. {{tertiary_action_1}}
2. {{tertiary_action_2}}
3. {{tertiary_action_3}}
{{/if}}

---

## Go-to-Market Strategy

### Launch Sequence

{{launch_sequence_recommendation}}

### Channel Strategy by Persona

**{{persona_1_name}}:**
{{p1_channel_strategy}}

**{{persona_2_name}}:**
{{p2_channel_strategy}}

{{#if persona_3_exists}}
**{{persona_3_name}}:**
{{p3_channel_strategy}}
{{/if}}

### Messaging Architecture

{{messaging_architecture_framework}}

### Team Deployment Plan

{{team_deployment_plan}}

### Success Metrics by Persona

**{{persona_1_name}}:**
- {{p1_success_metric_1}}
- {{p1_success_metric_2}}
- {{p1_success_metric_3}}

**{{persona_2_name}}:**
- {{p2_success_metric_1}}
- {{p2_success_metric_2}}
- {{p2_success_metric_3}}

{{#if persona_3_exists}}
**{{persona_3_name}}:**
- {{p3_success_metric_1}}
- {{p3_success_metric_2}}
- {{p3_success_metric_3}}
{{/if}}

---

## Risk Assessment & Mitigation

### Identified Risks

🔴 **High Priority Risks:**
{{high_priority_risks}}

🟡 **Medium Priority Risks:**
{{medium_priority_risks}}

🟢 **Low Priority Risks:**
{{low_priority_risks}}

### Mitigation Strategies

{{risk_mitigation_strategies}}

{{#if specialist_review}}

---

## Senior Persona Specialist Strategic Review

{{specialist_review_content}}

### Additional Opportunities Identified

{{specialist_additional_opportunities}}

### Implementation Guidance

{{specialist_implementation_guidance}}

{{/if}}

{{/if}}

---

# ACTION RECOMMENDATIONS

## Immediate Actions (This Week)

1. **{{immediate_action_1_title}}**
   - {{immediate_action_1_description}}
   - **Owner:** {{immediate_action_1_owner}}
   - **Effort:** {{immediate_action_1_effort}}

2. **{{immediate_action_2_title}}**
   - {{immediate_action_2_description}}
   - **Owner:** {{immediate_action_2_owner}}
   - **Effort:** {{immediate_action_2_effort}}

3. **{{immediate_action_3_title}}**
   - {{immediate_action_3_description}}
   - **Owner:** {{immediate_action_3_owner}}
   - **Effort:** {{immediate_action_3_effort}}

## Short-Term Actions (This Month)

1. **{{short_term_action_1_title}}**
   - {{short_term_action_1_description}}
   - **Owner:** {{short_term_action_1_owner}}
   - **Timeline:** {{short_term_action_1_timeline}}

2. **{{short_term_action_2_title}}**
   - {{short_term_action_2_description}}
   - **Owner:** {{short_term_action_2_owner}}
   - **Timeline:** {{short_term_action_2_timeline}}

3. **{{short_term_action_3_title}}**
   - {{short_term_action_3_description}}
   - **Owner:** {{short_term_action_3_owner}}
   - **Timeline:** {{short_term_action_3_timeline}}

## Long-Term Strategy (This Quarter)

1. **{{long_term_strategy_1_title}}**
   - {{long_term_strategy_1_description}}
   - **Timeline:** {{long_term_strategy_1_timeline}}

2. **{{long_term_strategy_2_title}}**
   - {{long_term_strategy_2_description}}
   - **Timeline:** {{long_term_strategy_2_timeline}}

3. **{{long_term_strategy_3_title}}**
   - {{long_term_strategy_3_description}}
   - **Timeline:** {{long_term_strategy_3_timeline}}

---

# DIFFERENTIATION PLAYBOOK

## Messaging Adjustments

{{messaging_adjustments_detailed}}

## Content Focus Shifts

{{content_focus_shifts_detailed}}

## Channel Strategy Updates

{{channel_strategy_updates_detailed}}

## Qualification Question Refinements

{{qualification_question_refinements_detailed}}

---

# APPENDIX

## Detailed Data Tables

{{appendix_detailed_data}}

## Source Documents

- **Persona 1:** {{persona_1_file_path}}
- **Persona 2:** {{persona_2_file_path}}
{{#if persona_3_exists}}- **Persona 3:** {{persona_3_file_path}}{{/if}}

## Comparison Methodology

{{comparison_methodology_notes}}

---

**🔥 Generated by Persona Forge** - Persona Comparison Analysis
**Report Version:** 1.0
**Next Recommended Review:** {{next_review_date}}
