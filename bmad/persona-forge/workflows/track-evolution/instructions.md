# Track Persona Evolution - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/persona-forge/workflows/track-evolution/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the evolution tracking process</critical>

<workflow>

<step n="1" goal="Load persona versions for analysis">
<action>Welcome {user_name} to the Persona Evolution Tracking workflow</action>

<action>Explain the evolution tracking workflow:
This workflow analyzes how a persona has changed over time by comparing multiple versions. You'll discover:

1. **Change Trends** - Which attributes change most frequently
2. **Stability Analysis** - Which parts of the persona remain stable
3. **Improvement Tracking** - Whether changes are making the persona better
4. **Market Alignment** - How persona updates reflect market changes
5. **Data Drift** - Whether persona is drifting from original intent

Analysis types:
- **Quick Analysis** (5 min) - Basic change comparison
- **Standard Analysis** (10 min) - Comprehensive trend analysis
- **Deep Analysis** (15 min) - Strategic insights + recommendations
</action>

<ask>How many versions of the persona would you like to analyze? (Minimum 2, recommended 3-5)</ask>

<action>Store version_count</action>

<ask>Provide the file paths for the persona versions in chronological order (oldest first):

Version 1 (Oldest): [file path]
Version 2: [file path]
{{#if version_count >= 3}}Version 3: [file path]{{/if}}
{{#if version_count >= 4}}Version 4: [file path]{{/if}}
{{#if version_count >= 5}}Version 5: [file path]{{/if}}
</ask>

<action>Load all persona versions from provided paths</action>

<action>For each version, extract:
- Version number
- Date created/updated
- Demographics
- Psychographics
- Pain points
- Goals
- Awareness journey characteristics
- Update notes/reasons (if available)
- Confidence levels
</action>

<action>Display loaded versions summary:

**Persona Evolution Timeline:**
{{#each persona_versions}}
**Version {{version}}** ({{date}})
- Pain Points: {{pain_point_count}}
- Goals: {{goal_count}}
- Update Reason: {{update_reason}}
{{/each}}

**Time Span:** {{days_between_first_and_last}} days
**Update Frequency:** Approx every {{avg_days_between_updates}} days
</action>

<ask>What depth of analysis would you like?
1. **Quick Analysis** - Basic change comparison (5 min) [quick]
2. **Standard Analysis** - Trend analysis with insights (10 min) [standard]
3. **Deep Analysis** - Strategic recommendations (15 min) [deep]
</ask>

<action>Store analysis_depth</action>

<template-output>persona_versions_loaded, analysis_depth_selected</template-output>
</step>

<step n="2" goal="Analyze changes across versions">

<action>Compare all versions and identify changes in each category</action>

### Demographics Evolution

<action>Track changes in:
- Age range
- Income range
- Location
- Occupation
- Education

For each attribute:
- Version-by-version changes
- Frequency of changes
- Magnitude of changes
- Pattern (widening, narrowing, shifting)
</action>

<action>Generate Demographics Evolution Report:
- **Stability Score:** {{demo_stability_score}}/10 (10 = no changes)
- **Most Volatile Attribute:** {{most_changed_demo_attribute}}
- **Most Stable Attribute:** {{least_changed_demo_attribute}}
- **Change Pattern:** {{demo_change_pattern}}
</action>

### Psychographics Evolution

<action>Track changes in:
- Core values
- Lifestyle patterns
- Personality type
- Media consumption
- Behavioral patterns

Identify:
- Value shifts over time
- Lifestyle evolution
- Behavioral pattern changes
</action>

<action>Generate Psychographics Evolution Report:
- **Stability Score:** {{psycho_stability_score}}/10
- **Key Shifts:** {{psycho_key_shifts}}
- **Emerging Patterns:** {{psycho_emerging_patterns}}
</action>

### Pain Points Evolution

<action>Track pain point changes:
- New pain points added
- Pain points removed
- Pain points that remained constant
- Pain intensity changes
- Pain priority reordering

Calculate:
- Pain Point Churn Rate: {{pain_churn_rate}}%
- Core Pain Stability: {{core_pain_stability}}%
</action>

<action>Generate Pain Points Evolution Report:
- **Churn Rate:** {{pain_churn_rate}}% (how many changed)
- **Core Stability:** {{core_pain_stability}}% (top 3 pain points unchanged)
- **New Pains Added:** {{new_pains_list}}
- **Pains Resolved:** {{resolved_pains_list}}
- **Persistent Pains:** {{persistent_pains_list}} (appear in all versions)
</action>

### Goals Evolution

<action>Track goal changes similar to pain points:
- New goals added
- Goals achieved/removed
- Goal priority shifts
- Goal specificity changes

Calculate:
- Goal Churn Rate: {{goal_churn_rate}}%
- Core Goal Stability: {{core_goal_stability}}%
</action>

### Awareness Journey Evolution

<action>Track changes in behavior at each awareness level:
- Messaging changes over time
- Channel preference shifts
- Conversion path evolution
- Objection pattern changes

Identify which awareness levels are most/least volatile
</action>

### Overall Change Metrics

<action>Calculate overall evolution metrics:
- **Total Change Score:** Sum of all stability scores / categories
- **Update Impact:** Average magnitude of changes per update
- **Drift Score:** Deviation from version 1
- **Improvement Trend:** Positive/Negative/Neutral
</action>

<template-output>change_analysis_complete</template-output>
</step>

<step n="3" goal="Identify trends and patterns">

<action>Analyze trends across the timeline:</action>

### Trend Categories

**1. Refinement Trends** (Persona becoming more specific)
- Demographics narrowing
- Pain points getting more detailed
- Goals becoming more precise
- Language becoming more authentic

**2. Expansion Trends** (Persona becoming broader)
- Demographics widening
- New pain points/goals added
- Market segment expansion
- Use cases broadening

**3. Pivot Trends** (Fundamental shifts)
- Major demographic changes
- Core value shifts
- Pain point replacements
- Goal transformations

**4. Market Response Trends** (Reacting to market changes)
- Competitive pressure responses
- Economic condition impacts
- Industry evolution tracking
- Technology adoption changes

**5. Data-Driven Trends** (Based on qualification/research)
- Research-driven corrections
- Qualification data refinements
- Assumption validations
- Confidence improvements

<action>Classify each change by trend category</action>

<action>Generate Trend Analysis:
- **Dominant Trend:** {{dominant_trend}}
- **Secondary Trends:** {{secondary_trends}}
- **Trend Trajectory:** {{trend_direction}} (Improving/Declining/Stable)
- **Velocity:** {{change_velocity}} (Fast/Moderate/Slow evolution)
</action>

<template-output>trends_identified</template-output>
</step>

<step n="4" goal="Assess evolution quality">

<action>Evaluate whether evolution represents improvement or drift</action>

### Quality Indicators

**Positive Evolution Indicators:**
- ✅ Changes based on data/research
- ✅ Increased specificity and detail
- ✅ Better actionability
- ✅ Higher confidence levels
- ✅ Improved qualification accuracy
- ✅ Clearer differentiation

**Negative Evolution Indicators:**
- ⚠️ Changes without justification
- ⚠️ Increasing vagueness
- ⚠️ Reduced actionability
- ⚠️ Contradictory changes
- ⚠️ Drift from original market
- ⚠️ Overcomplexity

<action>Score each version on quality dimensions:
- Specificity (1-10)
- Actionability (1-10)
- Evidence Grounding (1-10)
- Coherence (1-10)
- Differentiation (1-10)

Calculate Quality Trajectory: Improving/Declining/Stable
</action>

<action>Generate Quality Evolution Report:
- **Quality Trend:** {{quality_trend}}
- **Best Version:** Version {{best_version}} (Score: {{best_score}})
- **Current vs. Best:** {{current_vs_best_comparison}}
- **Recommendations:** {{quality_recommendations}}
</action>

<template-output>quality_assessment_complete</template-output>
</step>

<step n="5" goal="Generate strategic insights">

<check if="analysis_depth == 'deep'">
  <action>Generate deep strategic insights:</action>

  ### Strategic Questions Answered

  **1. Is This Persona Improving?**
  {{is_improving_analysis}}

  **2. Should We Continue Current Update Strategy?**
  {{update_strategy_assessment}}

  **3. Are We Chasing the Market or Leading It?**
  {{market_position_analysis}}

  **4. Is the Persona Drifting from Original Intent?**
  {{drift_analysis}}

  **5. Which Version Should We Revert To (If Any)?**
  {{version_recommendation}}

  ### Actionable Recommendations

  **Continue Doing:**
  {{continue_doing_recommendations}}

  **Stop Doing:**
  {{stop_doing_recommendations}}

  **Start Doing:**
  {{start_doing_recommendations}}

  ### Future Update Strategy

  {{future_update_strategy}}

  <action>Optional: Invoke Senior Persona Specialist for strategic review</action>

  <ask>Would you like the Senior Persona Specialist to review this evolution analysis and provide additional insights? [y/n]</ask>

  <check if="yes">
    <action>Load Senior Persona Specialist agent context: {senior_persona_specialist}</action>
    <action>Pass evolution analysis to Specialist</action>
    <action>Specialist provides strategic validation and recommendations</action>
    <action>Append Specialist insights to evolution report</action>
  </check>
</check>

<template-output>strategic_insights_generated</template-output>
</step>

<step n="6" goal="Visualize evolution and generate report">

<action>Create visual representations of evolution:</action>

### Timeline Visualization

```
Version 1.0 -----> Version 2.0 -----> Version 3.0 -----> Version 4.0
(Jan 2025)        (Mar 2025)        (Jun 2025)        (Nov 2025)

Demographics:   Narrowed ------>  Stable -------->  Shifted
Pain Points:    Added 2 -------->  Removed 1 ---->  Added 1
Goals:          Stable --------->  Refined ------->  Expanded
Quality Score:  72 ------------->  85 ----------->  88
```

### Change Heatmap

| Attribute | V1→V2 | V2→V3 | V3→V4 | Total Change |
|-----------|-------|-------|-------|--------------|
| Demographics | 🟡 Medium | 🟢 Low | 🟡 Medium | 🟡 Medium |
| Pain Points | 🔴 High | 🟢 Low | 🟡 Medium | 🟡 Medium |
| Goals | 🟢 Low | 🟡 Medium | 🔴 High | 🟡 Medium |
| Awareness Journey | 🟡 Medium | 🟡 Medium | 🟢 Low | 🟡 Medium |

### Stability Dashboard

```
Overall Stability: ████████░░ 80%

Most Stable:
- Core Values (95%)
- Personality Type (90%)
- Top Pain Point (85%)

Most Volatile:
- Goals (45%)
- Channels (50%)
- Secondary Pain Points (55%)
```

<action>Generate comprehensive evolution report with:
- Executive summary
- Version timeline
- Change analysis by category
- Trend identification
- Quality assessment
- Strategic insights (if deep analysis)
- Visualizations
- Recommendations
</action>

<action>Save evolution report to: {evolution_report_file}</action>

<template-output>evolution_report_generated</template-output>
</step>

<step n="7" goal="Present findings and recommendations">

<action>Present evolution analysis to {user_name}</action>

<action>Display key findings:

**Evolution Summary for {{persona_name}}:**
- **Versions Analyzed:** {{version_count}}
- **Time Span:** {{time_span_days}} days
- **Overall Stability:** {{overall_stability}}%
- **Quality Trend:** {{quality_trend}}
- **Dominant Evolution Pattern:** {{dominant_pattern}}
</action>

<action>Highlight top insights:
1. {{top_insight_1}}
2. {{top_insight_2}}
3. {{top_insight_3}}
</action>

<action>Present key recommendations:
**Immediate Action:** {{immediate_action}}
**Strategic Adjustment:** {{strategic_adjustment}}
**Long-term Approach:** {{longterm_approach}}
</action>

<ask>Would you like to:
1. **Review full evolution report** [review]
2. **Discuss specific trends** [discuss]
3. **Compare with another persona's evolution** [compare]
4. **Export evolution data** [export]
5. **Complete and exit** [exit]
</ask>

<check if="review">
  <action>Display full evolution report</action>
  <action>Walk through visualizations</action>
</check>

<check if="discuss">
  <action>Facilitate discussion about specific findings</action>
  <action>Answer questions about trends and recommendations</action>
</check>

<check if="compare">
  <action>Suggest running evolution tracking for another persona</action>
  <action>Offer to compare evolution patterns across personas</action>
</check>

<check if="export">
  <action>Export evolution data to CSV/JSON</action>
  <action>Export visualizations as images</action>
  <action>Create shareable summary report</action>
</check>

<check if="exit">
  <action>Remind about evolution report location</action>
  <action>Encourage quarterly evolution reviews</action>
  <action>Suggest tracking evolution after each major update</action>
</check>

<template-output>completion_message</template-output>
</step>

</workflow>

## Evolution Metrics Explained

### Stability Score (0-100%)
- 100% = No changes across versions
- 75-99% = Minor refinements only
- 50-74% = Moderate evolution
- 25-49% = Significant changes
- 0-24% = Complete transformation

### Churn Rate
- Percentage of attributes that changed between versions
- Lower churn = more stable persona
- Higher churn = rapid evolution or instability

### Quality Trajectory
- **Improving:** Quality scores increasing over time
- **Stable:** Quality scores consistent
- **Declining:** Quality scores decreasing (concern)

### Drift Score
- Measures deviation from original Version 1.0
- Low drift = staying true to original
- High drift = persona evolved significantly (may need validation)

### Update Velocity
- **Fast:** Updates every 1-3 months with significant changes
- **Moderate:** Updates every 3-6 months with refinements
- **Slow:** Updates 6+ months apart with minor tweaks

## Strategic Interpretation

### Healthy Evolution Patterns
- Increasing specificity over time
- Data-driven refinements
- Stable core + evolving tactics
- Improving quality scores
- Moderate update velocity

### Concerning Evolution Patterns
- Frequent contradictory changes
- Quality score decline
- High churn without justification
- Excessive drift from original
- Changes not based on data

### Recommended Actions by Pattern
- **Refinement Trend:** Continue current approach, you're improving
- **Expansion Trend:** Ensure not diluting persona focus
- **Pivot Trend:** Validate whether fundamental shift is justified
- **Drift Trend:** Consider reverting to best previous version
- **Instability Trend:** Slow down updates, gather more data first

