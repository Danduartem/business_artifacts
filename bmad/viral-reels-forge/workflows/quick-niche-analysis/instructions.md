# Quick Niche Analysis - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/viral-reels-forge/workflows/quick-niche-analysis/workflow.yaml</critical>
<critical>ALWAYS communicate in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Gather niche information">
<action>Greet {user_name} and explain this workflow provides fast Instagram niche intelligence</action>

<action>Collect niche information through natural conversation:</action>

**Niche Description:**
<action>Guide user to describe their niche with specific details (e.g., "sustainable fashion for millennials" not just "fashion")</action>
<action>Store as {{niche}} and create URL-safe slug as {{niche_slug}}</action>

**Analysis Focus (Optional):**
<ask>What specific aspect should I focus on? [viral mechanics / audience behavior / content landscape / all]</ask>
<action>Store as {{analysis_focus}}</action>

<template-output>niche_context</template-output>
</step>

<step n="2" goal="Instagram Niche Analyst research">
<action>Explain you're activating the Instagram Niche Analyst to research {{niche}} on Instagram</action>

<critical>Data must be from last {niche_data_max_age_days} days maximum</critical>

**Niche Analyst Research:**

<action>As the Instagram Niche Analyst, conduct research on {{niche}} specifically on Instagram:</action>

1. **Instagram Audience Behavior:**
   <action>Use WebSearch: "Instagram Reels engagement {{niche}} 2025"</action>
   <action>Identify how users engage with {{niche}} content - saves, shares, comments patterns</action>
   <action>Determine psychological triggers that work in this niche</action>

2. **Viral Mechanics for This Niche:**
   <action>Search: "viral Instagram Reels {{niche}} what works"</action>
   <action>Identify what makes content go viral in {{niche}}: educational, entertainment, controversy, transformations</action>
   <action>Map niche-specific viral patterns</action>

3. **Content Landscape Analysis:**
   <action>Research content saturation: what's oversaturated vs underserved</action>
   <action>Identify fresh angles and opportunities</action>

4. **Instagram Algorithm Considerations:**
   <action>How does Instagram treat {{niche}} content - watch time, shareability, save rates</action>

<action>Synthesize findings into {{niche_analysis}} with actionable insights</action>
<action>Display: "Data Collected: {{date}}"</action>

<template-output>niche_analysis</template-output>
</step>

<step n="3" goal="Quick competitor landscape scan">
<action>Explain you're doing a quick competitor landscape scan</action>

<critical>Data must be from last {competitor_data_max_age_days} days maximum</critical>

**Competitor Detective Quick Scan:**

<action>As the Instagram Competitor Detective, identify top accounts in {{niche}}:</action>

1. **Find Top Performers:**
   <action>Search: "top Instagram accounts {{niche}}"</action>
   <action>Identify 3-5 leading accounts in this niche</action>

2. **Quick Pattern Analysis:**
   <action>For each top account, identify common patterns:</action>
   - Content formats they use
   - Posting frequency
   - Engagement levels
   - Content themes

3. **Opportunity Gaps:**
   <action>Identify what's missing in competitor content</action>
   <action>Find underutilized angles</action>

<action>Synthesize into {{competitor_landscape}} overview</action>
<action>Display: "Data Collected: {{date}}"</action>

<template-output>competitor_landscape</template-output>
</step>

<step n="4" goal="Generate analysis report">
<action>Compile all research into the analysis report</action>

<action>Populate template with:
- {{niche_context}}
- {{niche_analysis}}
- {{competitor_landscape}}
</action>

<action>Save report to {default_output_file}</action>

<action>Present summary to {user_name}:</action>
- Niche analyzed: {{niche}}
- Key insights discovered
- Opportunity areas identified
- Report location

<action>Explain this analysis can inform content strategy or be used as input for full viral idea generation</action>

<template-output>completion_summary</template-output>
</step>

</workflow>
