# Personal Content Audit - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/viral-reels-forge/workflows/personal-content-audit/workflow.yaml</critical>
<critical>ALWAYS communicate in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Collect Instagram handle and context">
<action>Greet {user_name} and explain this workflow analyzes their past Instagram Reel performance to identify patterns</action>

**Instagram Handle:**
<action>Check if {instagram_handle} is configured and store status as {{handle_configured}}</action>

<check if="handle_configured == 'true'">
  <action>Use configured handle: {instagram_handle}</action>
  <ask>Confirm this is correct or provide different handle:</ask>
  <action>Store as {{instagram_handle}}</action>
</check>

<check if="handle_configured == 'false'">
  <ask>What is your Instagram handle?</ask>
  <action>Store as {{instagram_handle}}</action>
</check>

**Audit Goals:**
<ask>What do you want to learn from this audit? [what works / why some fail / content strategy / all]</ask>
<action>Store as {{audit_goals}}</action>

**Niche Context:**
<ask>What is your niche/content focus?</ask>
<action>Store as {{niche}}</action>

<template-output>audit_context</template-output>
</step>

<step n="2" goal="Analyze performance patterns">
<action>Explain you're activating the Instagram Pattern Detective to analyze {{instagram_handle}}'s Reel history</action>

<critical>Analyze data from last {user_data_max_age_days} days maximum</critical>

**Pattern Detective Analysis:**

<action>As the Instagram Pattern Detective, analyze {{instagram_handle}}'s Instagram Reels:</action>

1. **Account Performance Overview:**
   <action>Use WebSearch: "{{instagram_handle}} Instagram performance"</action>
   <action>Get baseline metrics: average views, engagement rate, follower count</action>

2. **High-Performing Reels Analysis:**
   <action>Search: "{{instagram_handle}} Instagram best Reels"</action>
   <action>Identify top 5-10 Reels by views/engagement</action>
   <action>For each successful Reel, analyze:</action>
   - Topic/theme
   - Format (talking head, B-roll, text, etc.)
   - Hook quality
   - Length
   - Audio used
   - Posting time/day
   - What made it resonate

3. **Low-Performing Reels Analysis:**
   <action>Identify underperforming Reels (below average)</action>
   <action>Analyze why they didn't perform:</action>
   - Weak hooks
   - Wrong format for content
   - Off-brand
   - Poor timing
   - Oversaturated topic

4. **Content Pattern Recognition:**
   <action>Identify patterns across successful content:</action>
   - Recurring themes that work
   - Preferred formats by audience
   - Optimal video length
   - Best posting times
   - Trending vs evergreen performance

5. **Unique Strengths Identification:**
   <action>What makes {{instagram_handle}}'s content unique?</action>
   <action>Authentic voice characteristics</action>
   <action>Expertise areas that shine</action>
   <action>Personality traits that connect with audience</action>

<action>Store as {{performance_analysis}}</action>

<template-output>performance_analysis</template-output>
</step>

<step n="3" goal="Audience behavior analysis">
<action>Analyze how {{instagram_handle}}'s audience engages</action>

**Audience Engagement Patterns:**

<action>Examine engagement types:</action>

1. **What Gets Saved:**
   <action>Content types that get high save rates</action>
   <action>Indicates valuable/reference content</action>

2. **What Gets Shared:**
   <action>Content that drives shares</action>
   <action>Indicates relatable/entertaining content</action>

3. **What Gets Comments:**
   <action>Topics that spark conversation</action>
   <action>Indicates engaging/controversial content</action>

4. **What Gets Watched Fully:**
   <action>Content with high completion rate</action>
   <action>Indicates compelling hooks and valuable content</action>

<action>Store as {{audience_behavior}}</action>

<template-output>audience_behavior</template-output>
</step>

<step n="4" goal="Brand alignment and authenticity assessment">
<action>Assess content authenticity and brand consistency</action>

**Brand Alignment Analysis:**

1. **Content Consistency:**
   <action>Does content stay on-brand and on-message?</action>
   <action>When off-brand content is posted, how does it perform?</action>

2. **Authentic Voice:**
   <action>When does {{instagram_handle}} sound most authentic?</action>
   <action>Which content feels forced vs natural?</action>

3. **Expertise Positioning:**
   <action>How effectively is expertise communicated?</action>
   <action>Educational vs entertaining balance</action>

4. **Visual Brand Consistency:**
   <action>Consistent visual style across Reels?</action>
   <action>Does inconsistency hurt or help performance?</action>

<action>Store as {{brand_alignment}}</action>

<template-output>brand_alignment</template-output>
</step>

<step n="5" goal="Generate personalized recommendations">
<action>Create actionable recommendations based on all analysis</action>

**Personalized Recommendations:**

<action>Based on performance patterns, audience behavior, and brand alignment, provide:</action>

1. **Double Down On:**
   <action>Topics/formats that consistently work - do MORE of these</action>

2. **Optimize:**
   <action>Areas showing promise but need refinement</action>

3. **Avoid:**
   <action>Patterns that consistently underperform</action>

4. **Test:**
   <action>New angles based on strengths that haven't been tried</action>

5. **Format Recommendations:**
   <action>Optimal format for {{instagram_handle}}'s style and audience</action>

6. **Content Mix Strategy:**
   <action>Ideal balance of educational, entertaining, promotional content</action>

7. **Authenticity Enhancements:**
   <action>How to lean into unique strengths more</action>

<action>Store as {{personalized_recommendations}}</action>

<template-output>personalized_recommendations</template-output>
</step>

<step n="6" goal="Generate content audit report">
<action>Compile all analysis into comprehensive personal audit report</action>

<action>Calculate {{date_plus_90_days}} by adding 90 days to {date}</action>

<action>Populate template with:
- {{audit_context}}
- {{performance_analysis}}
- {{audience_behavior}}
- {{brand_alignment}}
- {{personalized_recommendations}}
</action>

<action>Save report to {default_output_file}</action>

<action>Present summary to {user_name}:</action>
- Key strengths identified
- Performance patterns discovered
- Top recommendations
- Report location

<action>Encourage {user_name} to focus on their unique strengths and proven patterns when creating new content</action>

<template-output>completion_summary</template-output>
</step>

</workflow>
