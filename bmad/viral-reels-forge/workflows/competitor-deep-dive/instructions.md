# Competitor Deep Dive - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/viral-reels-forge/workflows/competitor-deep-dive/workflow.yaml</critical>
<critical>ALWAYS communicate in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Collect competitor information">
<action>Greet {user_name} and explain this workflow provides intensive competitor intelligence for Instagram Reels</action>

**Competitor Handles:**
<ask>Provide 3-5 competitor Instagram handles for analysis (comma-separated):</ask>
<action>Store as {{competitor_handles}} (parse into list)</action>
<action>Count the number of competitors and store as {{competitor_count}}</action>

**Niche Context (Optional):**
<ask>What niche/industry are these competitors in?</ask>
<action>Store as {{niche}} or "Not specified"</action>

**Analysis Focus:**
<ask>What should I focus on? [performance patterns / content strategy / engagement tactics / all]</ask>
<action>Store as {{analysis_focus}}</action>

<template-output>competitor_context</template-output>
</step>

<step n="2" goal="Deep competitor analysis" repeat="for-each-competitor">
<action>Explain you're activating the Instagram Competitor Detective for deep analysis</action>

<critical>Data must be from last {competitor_data_max_age_days} days maximum</critical>

**For Each Competitor in {{competitor_handles}}:**

<action>As the Instagram Competitor Detective, conduct intensive analysis:</action>

1. **Account Overview:**
   <action>Research account size, posting frequency, engagement rate</action>
   <action>Use WebSearch: "[competitor_handle] Instagram stats"</action>

2. **Recent Reel Performance (Last 30 Days):**
   <action>Search: "[competitor_handle] Instagram Reels performance"</action>
   <action>Identify highest-performing Reels: views, likes, comments, shares</action>
   <action>Analyze what made top Reels successful</action>

3. **Content Format Analysis:**
   <action>Document formats they use:</action>
   - Video style (talking head, B-roll, text-heavy, etc.)
   - Hook patterns (first 3 seconds)
   - Text overlay styles
   - Editing techniques
   - Video length preferences

4. **Content Themes and Topics:**
   <action>Identify their content pillars and recurring themes</action>
   <action>Note which topics get best engagement</action>

5. **Trending Element Usage:**
   <action>Which trending audio, effects, formats do they leverage?</action>
   <action>How quickly do they adopt trends?</action>

6. **Engagement Strategy:**
   <action>Analyze their approach to driving:</action>
   - Comments (questions, controversy, relatability)
   - Saves (value, educational content)
   - Shares (entertainment, emotional resonance)

7. **Posting Strategy:**
   <action>Posting frequency and timing</action>
   <action>Content mix and variety</action>

<action>Store analysis as {{competitor_X_analysis}}</action>

</step>

<step n="3" goal="Comparative analysis and gap identification">
<action>Synthesize findings across all competitors</action>

**Cross-Competitor Patterns:**

<action>Identify patterns across all analyzed competitors:</action>

1. **Common Success Factors:**
   <action>What do all successful competitors have in common?</action>
   <action>Which formats work consistently?</action>

2. **Differentiation Strategies:**
   <action>How does each competitor differentiate themselves?</action>
   <action>What unique angles do they take?</action>

3. **Content Gaps:**
   <action>What topics/formats are competitors NOT covering?</action>
   <action>Identify underserved angles and opportunities</action>

4. **Saturation Analysis:**
   <action>What's oversaturated (everyone doing it)?</action>
   <action>Where can you find blue ocean opportunities?</action>

5. **Competitive Positioning:**
   <action>Map competitive landscape: who owns what territory?</action>
   <action>Identify positioning opportunities</action>

<action>Store as {{competitive_intelligence}}</action>

<template-output>competitive_intelligence</template-output>
</step>

<step n="4" goal="Strategic recommendations">
<action>Generate actionable strategic recommendations</action>

**Recommendations:**

<action>Based on competitive analysis, provide:</action>

1. **Content Opportunities:**
   <action>Specific topics/angles competitors are missing</action>

2. **Format Recommendations:**
   <action>Formats working well that you should test</action>

3. **Differentiation Strategy:**
   <action>How to stand out from competitors</action>

4. **Engagement Tactics:**
   <action>Proven tactics from top performers to adapt</action>

5. **Trend Adoption Strategy:**
   <action>How to balance trending vs evergreen content</action>

<action>Store as {{strategic_recommendations}}</action>

<template-output>strategic_recommendations</template-output>
</step>

<step n="5" goal="Generate competitor intelligence report">
<action>Compile all analysis into comprehensive report</action>

<action>Aggregate all individual competitor analyses from Step 2 into {{competitor_analyses}}</action>

<action>Populate template with:
- {{competitor_context}}
- {{competitor_analyses}}
- {{competitive_intelligence}}
- {{strategic_recommendations}}
</action>

<action>Save report to {default_output_file}</action>

<action>Present summary to {user_name}:</action>
- Competitors analyzed: count
- Key patterns discovered
- Main opportunities identified
- Report location

<template-output>completion_summary</template-output>
</step>

</workflow>
