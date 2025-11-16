# Persona Health Check - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/persona-forge/workflows/health-check/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the health check process</critical>

<workflow>

<step n="1" goal="Load persona and gather health data">
<action>Welcome {user_name} to the Persona Health Check workflow</action>

<action>Explain:
This workflow calculates a comprehensive health score for your persona based on:

**Health Score Components (0-100 each):**
1. **Freshness** (25%) - How current is the persona data?
2. **Accuracy** (35%) - How well does it predict real prospects?
3. **Usage** (20%) - Is the team actively using it?
4. **Market Alignment** (20%) - Does it reflect current market reality?

**Total Health Score:** Weighted average → Status rating

**Health Status Ratings:**
- 90-100: Excellent (Green) ✅
- 75-89: Good (Blue) 💙
- 60-74: Fair (Yellow) ⚠️
- 40-59: Poor (Orange) 🟠
- 0-39: Critical (Red) 🔴
</action>

<ask response="persona_file_path">Which persona would you like to health check? (Provide file path)</ask>

<action>Load persona document and extract:
- Creation date
- Last updated date
- Version number
- Last research date
- Confidence levels
- Research sources
- Update history (if available)
</action>

<action>Display persona summary:
**Persona:** {{persona_name}}
**Version:** {{version}}
**Created:** {{created_date}}
**Last Updated:** {{last_updated_date}}
**Days Since Update:** {{days_since_update}}
</action>

<template-output>persona_loaded</template-output>
</step>

<step n="2" goal="Calculate Freshness Score">

<action>Calculate Freshness Score based on time elapsed:</action>

**Freshness Calculation:**

Days Since Last Update:
- 0-30 days: 100 points
- 31-60 days: 85 points
- 61-90 days: 70 points
- 91-180 days: 50 points
- 181-365 days: 30 points
- 365+ days: 10 points

Days Since Last Research:
- 0-60 days: Bonus +10 points
- 61-180 days: Neutral
- 181+ days: Penalty -10 points

<action>Calculate and store freshness_score</action>

<action>Generate Freshness Assessment:
**Freshness Score:** {{freshness_score}}/100

**Analysis:**
- Last Update: {{last_updated_date}} ({{days_since_update}} days ago)
- Last Research: {{last_research_date}} ({{days_since_research}} days ago)
- **Status:** {{freshness_status}}
- **Recommendation:** {{freshness_recommendation}}
</action>

<template-output>freshness_score</template-output>
</step>

<step n="3" goal="Calculate Accuracy Score">

<ask>Do you have qualification accuracy data for this persona? [y/n]

(If you've been using qualification questions and tracking which leads matched)</ask>

<check if="yes">
  <ask>Please provide:
  - Total qualification calls made: [number]
  - Correctly identified this persona: [number]
  - False positives (thought it was this persona, wasn't): [number]
  - Conversions from this persona: [number] (optional)
  </ask>

  <action>Calculate Accuracy Score:

  Base Accuracy = (Correct Identifications / Total Calls) × 100

  Adjustments:
  - False Positive Rate > 20%: -15 points
  - False Positive Rate 10-20%: -10 points
  - False Positive Rate < 10%: No penalty
  - Conversion rate > 15%: +10 bonus
  - Conversion rate 10-15%: +5 bonus

  Sample Size Confidence:
  - < 10 calls: × 0.5 (insufficient data)
  - 10-30 calls: × 0.75 (limited data)
  - 30-100 calls: × 1.0 (good data)
  - 100+ calls: × 1.0 + 5 bonus (excellent data)
  </action>

  <action>Store accuracy_score with confidence level</action>
</check>

<check if="no">
  <action>Accuracy Score = 50 (default - no data available)</action>
  <action>Note: "Accuracy score is estimated. Track qualification results to get real accuracy data."</action>
</check>

<action>Generate Accuracy Assessment:
**Accuracy Score:** {{accuracy_score}}/100 {{confidence_indicator}}

**Analysis:**
- Qualification Calls: {{total_calls}}
- Correct IDs: {{correct_ids}} ({{accuracy_rate}}%)
- False Positives: {{false_positives}} ({{false_positive_rate}}%)
- Conversion Rate: {{conversion_rate}}%
- **Status:** {{accuracy_status}}
- **Recommendation:** {{accuracy_recommendation}}
</action>

<template-output>accuracy_score</template-output>
</step>

<step n="4" goal="Calculate Usage Score">

<ask>How is this persona being used by your team?

1. Actively used daily/weekly by multiple team members [high-usage]
2. Referenced occasionally by some team members [medium-usage]
3. Created but rarely accessed [low-usage]
4. Not sure / No tracking [unknown]
</ask>

<action>Calculate Usage Score based on response:

- **High Usage:** 100 points
  - Team references it regularly
  - Qualification questions used on calls
  - Messaging aligned to persona
  - Content created per persona

- **Medium Usage:** 65 points
  - Some team members use it
  - Occasional references
  - Partial implementation

- **Low Usage:** 30 points
  - Rarely accessed
  - Team doesn't reference it
  - Not integrated into workflows

- **Unknown:** 50 points (estimated)
  - No usage data available
  - Assumed moderate usage
</action>

<action>Store usage_score</action>

<action>Generate Usage Assessment:
**Usage Score:** {{usage_score}}/100

**Analysis:**
- Usage Level: {{usage_level}}
- Team Adoption: {{adoption_level}}
- **Status:** {{usage_status}}
- **Recommendation:** {{usage_recommendation}}
</action>

<template-output>usage_score</template-output>
</step>

<step n="5" goal="Calculate Market Alignment Score">

<action>Assess Market Alignment based on available indicators:</action>

<ask>Considering current market conditions, how well does this persona still match reality?

**Indicators to consider:**
- Have customer demographics shifted?
- Have pain points evolved?
- Have buying behaviors changed?
- Is competitive landscape different?
- Are economic conditions different?

Rate alignment: [excellent/good/fair/poor/don't-know]
</ask>

<action>Calculate Market Alignment Score:

- **Excellent:** 95 points (Persona perfectly reflects current market)
- **Good:** 80 points (Minor updates needed)
- **Fair:** 60 points (Some drift from market reality)
- **Poor:** 30 points (Significant misalignment)
- **Don't Know:** 70 points (Assumed reasonable, but needs validation)

Additional factors:
- Last research date recent (<90 days): +10 bonus
- Research sources cited: +5 bonus
- High confidence level documented: +5 bonus
</action>

<action>Store market_alignment_score</action>

<action>Generate Market Alignment Assessment:
**Market Alignment Score:** {{market_alignment_score}}/100

**Analysis:**
- Perceived Alignment: {{alignment_level}}
- Research Currency: {{research_currency}}
- **Status:** {{alignment_status}}
- **Recommendation:** {{alignment_recommendation}}
</action>

<template-output>market_alignment_score</template-output>
</step>

<step n="6" goal="Calculate Total Health Score and generate report">

<action>Calculate Total Health Score (weighted average):

**Formula:**
Total Health Score =
  (Freshness × 0.25) +
  (Accuracy × 0.35) +
  (Usage × 0.20) +
  (Market Alignment × 0.20)

Round to nearest integer.
</action>

<action>Determine Health Status based on score:
- 90-100: Excellent ✅
- 75-89: Good 💙
- 60-74: Fair ⚠️
- 40-59: Poor 🟠
- 0-39: Critical 🔴
</action>

<action>Generate Health Report with:

**Overall Health Score:** {{total_health_score}}/100
**Status:** {{health_status_emoji}} {{health_status}}

**Component Scores:**
- Freshness: {{freshness_score}}/100 (Weight: 25%)
- Accuracy: {{accuracy_score}}/100 (Weight: 35%)
- Usage: {{usage_score}}/100 (Weight: 20%)
- Market Alignment: {{market_alignment_score}}/100 (Weight: 20%)

**Health Breakdown:**
[Visual bar chart representation]

**Critical Issues:** (Score < 60)
{{list_critical_components}}

**Strengths:** (Score > 85)
{{list_strong_components}}

**Immediate Actions Needed:**
1. {{action_1}}
2. {{action_2}}
3. {{action_3}}

**Maintenance Schedule:**
- Next Review: {{recommended_next_review_date}}
- Update Frequency: {{recommended_update_frequency}}
- Health Check Frequency: {{recommended_health_check_frequency}}

**Long-term Recommendations:**
{{long_term_health_recommendations}}
</action>

<action>Save health report to: {health_report_file}</action>

<template-output>health_report_generated</template-output>
</step>

<step n="7" goal="Present health findings and recommendations">

<action>Present health check results to {user_name}</action>

<action>Display health dashboard:

**{{persona_name}} Health Dashboard**

Overall Health: {{total_health_score}}/100 {{health_status_emoji}}

Component Breakdown:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Freshness        [████████░░] {{freshness_score}}/100
Accuracy         [██████████] {{accuracy_score}}/100
Usage            [██████░░░░] {{usage_score}}/100
Market Alignment [███████░░░] {{market_alignment_score}}/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Status:** {{health_status}}

**Top Priority:** {{top_priority_action}}
</action>

<check if="health_score < 60">
  <action>⚠️ WARNING: This persona is in {{health_status}} condition.</action>
  <action>Immediate action is required to restore persona health.</action>
  <action>Consider running Update or Validate workflow soon.</action>
</check>

<check if="health_score >= 90">
  <action>✅ Excellent! This persona is healthy and well-maintained.</action>
  <action>Continue current maintenance schedule.</action>
</check>

<ask>What would you like to do?
1. **View full health report** [view]
2. **Take recommended actions** [act]
3. **Compare with other personas** [compare]
4. **Schedule maintenance** [schedule]
5. **Complete and exit** [exit]
</ask>

<check if="view">
  <action>Display full health report with all details</action>
</check>

<check if="act">
  <check if="freshness_score < 60">
    <ask>Freshness is low. Would you like to run Update workflow now? [y/n]</ask>
    <check if="yes">
      <action>Transition to Update Persona workflow</action>
    </check>
  </check>

  <check if="accuracy_score < 60">
    <action>Recommend: Start tracking qualification accuracy data</action>
    <action>Provide template for tracking sheet</action>
  </check>

  <check if="usage_score < 60">
    <action>Recommend: Conduct team training session on persona usage</action>
    <action>Provide quick reference materials for distribution</action>
  </check>

  <check if="market_alignment_score < 60">
    <ask>Market alignment is low. Would you like to run Validate workflow? [y/n]</ask>
    <check if="yes">
      <action>Transition to Validate Persona workflow</action>
    </check>
  </check>
</check>

<check if="compare">
  <action>Offer to run health checks on other personas</action>
  <action>Generate comparative health dashboard</action>
</check>

<check if="schedule">
  <action>Provide recommended maintenance schedule:

  **Based on current health ({{health_score}}/100):**

  - Next Health Check: {{next_health_check_date}}
  - Next Update: {{next_update_date}}
  - Quarterly Validation: {{next_validation_date}}

  Calendar reminders:
  - Add to your calendar
  - Set team notifications
  - Track in project management tool
  </action>
</check>

<check if="exit">
  <action>Remind about health report location</action>
  <action>Encourage regular health checks (monthly for active personas)</action>
</check>

<template-output>completion_message</template-output>
</step>

</workflow>

## Health Score Interpretation Guide

### Excellent (90-100) ✅
**What it means:** Persona is in optimal condition
**Action:** Maintain current schedule, monitor quarterly
**Typical Characteristics:**
- Updated within last 60 days
- High qualification accuracy (>80%)
- Actively used by team
- Aligned with current market

### Good (75-89) 💙
**What it means:** Persona is healthy with minor maintenance needs
**Action:** Minor updates recommended within 30 days
**Typical Characteristics:**
- Updated within last 90 days
- Good accuracy (65-80%)
- Regular team usage
- Mostly aligned with market

### Fair (60-74) ⚠️
**What it means:** Persona needs attention soon
**Action:** Schedule update within 2 weeks
**Typical Characteristics:**
- Updated 90-180 days ago
- Moderate accuracy (50-65%)
- Occasional usage
- Some market drift

### Poor (40-59) 🟠
**What it means:** Persona is degraded, immediate action needed
**Action:** Update within 1 week
**Typical Characteristics:**
- Updated 180+ days ago
- Low accuracy (<50%)
- Rarely used
- Significant market misalignment

### Critical (0-39) 🔴
**What it means:** Persona is severely outdated or unused
**Action:** Immediate update or consider retiring/recreating
**Typical Characteristics:**
- Updated 1+ year ago
- Very low or no accuracy data
- Not used by team
- Major market disconnect

## Component-Specific Actions

### Low Freshness (<60)
→ Run Update workflow immediately
→ Conduct new market research
→ Review and refresh all sections

### Low Accuracy (<60)
→ Start tracking qualification data
→ Review qualification questions effectiveness
→ Analyze false positive/negative patterns
→ Consider validation against real leads

### Low Usage (<60)
→ Conduct team training session
→ Create quick reference materials
→ Integrate into daily workflows
→ Demonstrate value with examples

### Low Market Alignment (<60)
→ Run Validate workflow with deep research
→ Compare against current market data
→ Interview recent customers
→ Review competitive landscape changes

