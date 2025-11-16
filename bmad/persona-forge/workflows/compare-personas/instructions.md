# Compare Personas - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/persona-forge/workflows/compare-personas/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the comparison process</critical>

<workflow>

<step n="1" goal="Load personas for comparison">
<action>Welcome {user_name} to the Persona Comparison workflow</action>

<action>Explain the comparison workflow:
This workflow generates side-by-side comparisons of 2-3 personas to help you:

1. **Identify Differentiation** - Understand what makes each persona unique
2. **Find Overlaps** - Discover where personas share characteristics
3. **Optimize Targeting** - Decide which personas to prioritize
4. **Refine Messaging** - Ensure messaging differentiates appropriately
5. **Strategic Planning** - Allocate resources based on persona insights

Comparison types:
- **Quick Comparison** (5 min) - Core attributes side-by-side
- **Detailed Comparison** (10 min) - Comprehensive analysis across all sections
- **Strategic Comparison** (15 min) - Includes strategic recommendations and opportunity analysis
</action>

<ask>How many personas would you like to compare? [2/3]</ask>

<action>Store comparison_count</action>

<ask>Provide the file paths for the personas you want to compare:

Persona 1: [file path]
Persona 2: [file path]
<check if="comparison_count == 3">Persona 3: [file path]</check>
</ask>

<action>Load all persona documents from provided paths</action>

<action>Parse each persona:
- Persona name
- Demographics
- Psychographics
- Pain points
- Goals
- Awareness journey characteristics
- Current version
- Last updated date
</action>

<action>Display loaded personas summary:

**Persona 1:** {{persona_1_name}} (v{{persona_1_version}}, updated {{persona_1_last_updated}})
**Persona 2:** {{persona_2_name}} (v{{persona_2_version}}, updated {{persona_2_last_updated}})
<check if="comparison_count == 3">**Persona 3:** {{persona_3_name}} (v{{persona_3_version}}, updated {{persona_3_last_updated}})</check>
</action>

<ask>What type of comparison would you like?
1. **Quick Comparison** - Core attributes (5 min) [quick]
2. **Detailed Comparison** - Comprehensive analysis (10 min) [detailed]
3. **Strategic Comparison** - Strategic recommendations (15 min) [strategic]
</ask>

<action>Store comparison_type</action>

<template-output>loaded_personas, comparison_type</template-output>
</step>

<step n="2" goal="Generate side-by-side comparison">

<check if="comparison_type == 'quick'">
  <action>Generate Quick Comparison Report covering:

  **Demographics Comparison:**
  - Age ranges
  - Income levels
  - Industries/occupations
  - Locations
  - Education levels

  **Psychographics Comparison:**
  - Core values
  - Lifestyle patterns
  - Media consumption
  - Personality types

  **Pain Points Comparison:**
  - Top 3 pain points for each
  - Unique pain points
  - Shared pain points
  - Pain point intensity

  **Goals Comparison:**
  - Top 3 goals for each
  - Unique goals
  - Shared goals
  - Goal priorities

  **Quick Differentiation Summary:**
  - Key differentiators
  - Target market overlap percentage
  - Recommended focus areas
  </action>
</check>

<check if="comparison_type == 'detailed'">
  <action>Generate Detailed Comparison Report covering all Quick sections PLUS:

  **Emotional Drivers Comparison:**
  - Core fears for each
  - Aspirations and desires
  - Emotional triggers
  - Decision-making factors

  **Awareness Journey Comparison:**
  - Behavior differences at each awareness level
  - Channel preferences by level
  - Message resonance patterns
  - Conversion path differences

  **Qualification Questions:**
  - Which questions distinguish between personas
  - Question effectiveness comparison
  - Recommended question order for identification

  **Messaging Comparison:**
  - Language patterns and vocabulary
  - Tone preferences
  - Proof requirements
  - Objection patterns

  **Content Strategy Comparison:**
  - Content type preferences
  - Channel effectiveness
  - Engagement patterns
  - Campaign approach differences

  **Overlap Analysis:**
  - Where personas could be confused
  - Risk areas for misidentification
  - Recommendations for clearer differentiation
  </action>
</check>

<check if="comparison_type == 'strategic'">
  <action>Generate Strategic Comparison Report covering all Detailed sections PLUS:

  **Market Opportunity Analysis:**
  - Market size estimates per persona
  - Growth potential
  - Competitive intensity
  - Ease of access
  - Strategic priority ranking

  **Resource Allocation Recommendations:**
  - Budget allocation by persona
  - Team specialization suggestions
  - Content production priorities
  - Campaign investment ratios

  **Cross-Persona Insights:**
  - Persona migration patterns (which personas evolve into others)
  - Cross-sell opportunities
  - Upsell pathways
  - Segment evolution strategies

  **Strategic Recommendations:**
  - Which persona to prioritize and why
  - How to differentiate messaging
  - Where to consolidate efforts
  - When to create sub-segments
  - Risk mitigation strategies

  **Go-to-Market Strategy:**
  - Launch sequence recommendations
  - Channel strategy per persona
  - Messaging architecture
  - Team deployment plan
  - Success metrics by persona
  </action>
</check>

<action>Format comparison using side-by-side tables where appropriate</action>

<action>Highlight key insights with visual markers:
- 🔴 Critical differences (must address in messaging)
- 🟡 Moderate differences (consider in strategy)
- 🟢 Similarities (potential for shared resources)
- ⚠️ Overlap risks (risk of confusion)
- 💡 Strategic opportunities
</action>

<template-output>comparison_report</template-output>
</step>

<step n="3" goal="Optional Senior Specialist strategic review">

<check if="comparison_type == 'strategic'">
  <ask>Would you like the Senior Persona Specialist to review this comparison and provide additional strategic insights? [y/n]</ask>

  <check if="yes">
    <action>Load Senior Persona Specialist agent context: {senior_persona_specialist}</action>

    <action>Pass comparison report to Specialist for strategic review</action>

    <action>Specialist provides:
    - Validation of differentiation strength
    - Additional strategic opportunities identified
    - Risk assessment
    - Priority recommendations
    - Implementation guidance
    </action>

    <action>Append Specialist insights to comparison report</action>
  </check>
</check>

<check if="comparison_type != 'strategic'">
  <action>Skip specialist review for quick/detailed comparisons</action>
</check>

<template-output>specialist_insights (if applicable)</template-output>
</step>

<step n="4" goal="Generate actionable recommendations">

<action>Based on comparison findings, generate specific action items:</action>

**Immediate Actions (This Week):**
{{immediate_action_1}}
{{immediate_action_2}}
{{immediate_action_3}}

**Short-Term Actions (This Month):**
{{short_term_action_1}}
{{short_term_action_2}}
{{short_term_action_3}}

**Long-Term Strategy (This Quarter):**
{{long_term_strategy_1}}
{{long_term_strategy_2}}
{{long_term_strategy_3}}

**Differentiation Tactics:**
- Messaging adjustments needed: {{messaging_changes}}
- Content focus shifts: {{content_changes}}
- Channel strategy updates: {{channel_changes}}
- Qualification question refinements: {{question_changes}}

**Resource Allocation:**
- Budget: {{budget_recommendation}}
- Team: {{team_recommendation}}
- Content: {{content_recommendation}}
- Campaigns: {{campaign_recommendation}}

<template-output>action_recommendations</template-output>
</step>

<step n="5" goal="Save and present comparison report">

<action>Generate final comparison report document with:
- Executive summary (1-page overview)
- Side-by-side comparison tables
- Differentiation analysis
- Strategic insights
- Action recommendations
- Appendix with detailed data
</action>

<action>Save comparison report to: {comparison_report_file}</action>

<action>Present report to {user_name}:
- Report location
- Key findings summary
- Top 3 strategic recommendations
- Immediate next steps
</action>

<ask>Would you like to:
1. **Review the full report** [review]
2. **Discuss specific findings** [discuss]
3. **Export for team sharing** [export]
4. **Compare different personas** [new-comparison]
5. **Complete and exit** [exit]
</ask>

<check if="review">
  <action>Display full comparison report</action>
  <action>Walk through key sections</action>
</check>

<check if="discuss">
  <action>Facilitate discussion about specific comparison findings</action>
  <action>Answer questions about strategic recommendations</action>
</check>

<check if="export">
  <action>Offer export options (redirect to export workflow)</action>
  <action>Suggest: "Use the Export Persona workflow to export this comparison in multiple formats."</action>
</check>

<check if="new-comparison">
  <action>Return to Step 1 for new comparison</action>
</check>

<check if="exit">
  <action>Remind about report location</action>
  <action>Encourage revisiting comparison after persona updates</action>
</check>

<template-output>completion_message</template-output>
</step>

</workflow>

## Comparison Dimensions

### Quick Comparison Dimensions
- Demographics (age, income, location, occupation, education)
- Top 3 pain points
- Top 3 goals
- Core values
- Personality type
- Key differentiators

### Detailed Comparison Adds
- Complete psychographic profile
- Emotional drivers and fears
- Awareness journey behavior patterns
- Messaging and language preferences
- Content and channel preferences
- Qualification question effectiveness
- Objection patterns

### Strategic Comparison Adds
- Market opportunity sizing
- Competitive landscape per persona
- Resource allocation recommendations
- Cross-persona migration patterns
- Strategic priority rankings
- Go-to-market sequencing
- Risk and mitigation strategies

## Comparison Output Format

### Side-by-Side Tables
```markdown
| Attribute | Persona 1 | Persona 2 | Persona 3 | Analysis |
|-----------|-----------|-----------|-----------|----------|
| Age Range | 35-50 | 25-35 | 45-60 | Different generations |
| Income | $80-120k | $45-65k | $120k+ | Clear segmentation |
```

### Venn Diagram (Text)
```
Persona 1 Only:
- Characteristic A
- Characteristic B

Shared (1 & 2):
- Characteristic C

Persona 2 Only:
- Characteristic D

All Three:
- Characteristic E
```

### Differentiation Matrix
```
High Differentiation: Demographics, Pain Points
Medium Differentiation: Goals, Channels
Low Differentiation: Values, Education
```

## Strategic Insights Framework

**Opportunity Score Formula:**
- Market Size (0-10)
- Ease of Access (0-10)
- Competitive Intensity (reverse, 0-10)
- Alignment with Business (0-10)
- Resource Efficiency (0-10)

**Total Score:** Sum / 5 = Priority Score

**Recommendations based on scores:**
- 8-10: Primary focus, allocate 50%+ resources
- 6-7.9: Secondary focus, 30-40% resources
- 4-5.9: Tertiary focus, 10-20% resources
- <4: Deprioritize or refine persona definition

