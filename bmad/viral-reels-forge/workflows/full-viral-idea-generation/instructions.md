# Full Viral Idea Generation - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/viral-reels-forge/workflows/full-viral-idea-generation/workflow.yaml</critical>
<critical>ALWAYS communicate in {communication_language} throughout this workflow</critical>
<critical>ALL Instagram data must respect freshness thresholds: trends (7 days), competitors (30 days), niche (90 days)</critical>

<workflow>

<step n="1" goal="Gather user context and research parameters">
<action>Greet {user_name} and explain this workflow will orchestrate comprehensive Instagram research to generate {idea_count} ranked Reel ideas with viral potential</action>

<action>Collect essential information through natural conversation:</action>

**Niche/Business Information:**
<action>Guide user to describe their niche or business type with specific details (e.g., "fitness coaching for busy professionals" not just "fitness")</action>
<action>Store as {{niche}} and create URL-safe slug as {{niche_slug}}</action>

**Current Situation:**
<action>Ask about their current Instagram presence: follower count, posting frequency, growth plateau details</action>
<action>Store as {{current_situation}}</action>

**Goals:**
<action>Explore what they want to achieve: follower growth targets, engagement goals, brand awareness objectives</action>
<action>Store as {{user_goals}}</action>

**Instagram Handle (Optional):**
<ask>Do you want to include a personal content audit? If yes, provide your Instagram handle. [handle / skip]</ask>
<action>Store as {{user_instagram_handle}} or mark as "skip"</action>

**Competitor Handles (Optional but Recommended):**
<action>Ask if they know 3-5 competitor Instagram handles for analysis</action>
<action>Store as {{competitor_handles}} (comma-separated list or "none provided")</action>

<action>Confirm all collected information with user before proceeding to research phase</action>

<template-output>user_context</template-output>
</step>

<step n="2" goal="Instagram Niche Analysis - Research Agent 1">
<action>Explain you're now activating the Instagram Niche Analyst to research the {{niche}} landscape on Instagram</action>

<critical>Data must be from last {niche_data_max_age_days} days maximum</critical>

**Niche Analyst Research Tasks:**

<action>As the Instagram Niche Analyst, conduct comprehensive research on {{niche}} specifically on Instagram:</action>

1. **Instagram Audience Behavior in This Niche:**
   <action>Research how Instagram users engage with {{niche}} content - what do they save, share, comment on?</action>
   <action>Identify psychological triggers that work in this niche on Instagram</action>

2. **Viral Mechanics for This Niche:**
   <action>Use WebSearch with date filters (last 90 days) to find: "viral Instagram Reels {{niche}} 2025"</action>
   <action>Identify what makes content go viral specifically in {{niche}} on Instagram (educational, entertainment, controversy, relatable struggles, transformations)</action>

3. **Instagram Algorithm Factors for This Niche:**
   <action>Research how Instagram Reels algorithm treats {{niche}} content - watch time patterns, shareability factors, save rates</action>

4. **Content Saturation Analysis:**
   <action>Identify what's oversaturated in {{niche}} on Instagram (what everyone is doing)</action>
   <action>Find underserved angles and fresh perspectives</action>

<action>Synthesize findings into {{niche_analysis_report}} with specific, actionable insights</action>

<action>Display data collection date: "Niche Analysis Data Collected: {{date}}"</action>

<template-output>niche_analysis_report</template-output>
</step>

<step n="3" goal="Competitor Intelligence - Research Agent 2">
<action>Explain you're now activating the Instagram Competitor Detective to analyze competitors in {{niche}}</action>

<critical>Data must be from last {competitor_data_max_age_days} days maximum</critical>

**Competitor Detective Research Tasks:**

<check if="competitor_handles provided">
  <action>As the Instagram Competitor Detective, analyze each competitor handle from {{competitor_handles}}:</action>

  1. **Recent Reel Performance (Last 30 Days):**
     <action>For each competitor, research their most recent Reels performance using WebSearch</action>
     <action>Identify which Reels got the most views, engagement, saves</action>

  2. **Successful Format Patterns:**
     <action>Identify formats competitors use: hooks, text overlays, editing styles, video length</action>
     <action>Note what's working for them specifically</action>

  3. **Content Gaps Analysis:**
     <action>Find topics/angles competitors are missing</action>
     <action>Identify opportunities they're leaving on the table</action>

  4. **Engagement Patterns:**
     <action>Analyze what types of content get comments vs shares vs saves from their audience</action>
</check>

<check if="no competitor handles provided">
  <action>Use WebSearch to find top 3-5 Instagram accounts in {{niche}}</action>
  <action>Conduct same analysis as above on discovered competitors</action>
  <action>Note: "Competitors identified through research (user did not provide handles)"</action>
</check>

<action>Synthesize findings into {{competitor_intelligence_report}} highlighting opportunities and successful patterns</action>

<action>Display data collection date: "Competitor Analysis Data Collected: {{date}}"</action>

<template-output>competitor_intelligence_report</template-output>
</step>

<step n="4" goal="Trend Scanning - Research Agent 3">
<action>Explain you're now activating the Instagram Trend Hunter to scan current viral Reels in {{niche}}</action>

<critical>Data must be from last {trend_data_max_age_days} days ONLY - this is the most time-sensitive research</critical>

**Trend Hunter Research Tasks:**

<action>As the Instagram Trend Hunter, scan for what's viral RIGHT NOW in {{niche}} on Instagram:</action>

1. **Trending Audio (Last 7 Days):**
   <action>Use WebSearch with strict date filter: "trending Instagram Reels audio {{niche}} last week"</action>
   <action>Identify top 5-10 trending audio tracks being used in {{niche}} Reels</action>

2. **Viral Format Patterns:**
   <action>Search: "viral Instagram Reels format {{niche}} {{current_month}} 2025"</action>
   <action>Identify trending templates, text overlay styles, transitions, effects</action>

3. **Breakout Content Analysis:**
   <action>Find Reels in {{niche}} that exploded in views in the last 7 days</action>
   <action>Analyze what made them break through: hook, format, timing, topic</action>

4. **Instagram Features Being Leveraged:**
   <action>Identify which Instagram features are driving reach: Remix, Collab, specific effects, stickers</action>

<action>Synthesize findings into {{trend_scanning_report}} with emphasis on CURRENT opportunities</action>

<action>Display data collection date: "Trend Scanning Data Collected: {{date}}" and emphasize this is the most current intelligence</action>

<template-output>trend_scanning_report</template-output>
</step>

<step n="5" goal="Personal Performance Audit - Research Agent 4" optional="true" if="user_instagram_handle != 'skip'">
<action>Explain you're now activating the Instagram Pattern Detective to analyze {{user_instagram_handle}}'s past Reel performance</action>

<critical>Data should cover last {user_data_max_age_days} days maximum</critical>

**Pattern Detective Research Tasks:**

<action>As the Instagram Pattern Detective, analyze {{user_instagram_handle}}'s Instagram Reels:</action>

1. **Performance Pattern Analysis:**
   <action>Use WebSearch to research {{user_instagram_handle}}'s recent Reels</action>
   <action>Identify which Reels performed above average vs below average</action>

2. **User's Unique Strengths:**
   <action>Identify what makes {{user_instagram_handle}}'s content unique</action>
   <action>Determine their authentic voice and style</action>

3. **What Has Worked:**
   <action>Analyze successful Reels: topics, formats, hooks that resonated with their audience</action>

4. **What Hasn't Worked:**
   <action>Identify patterns in underperforming content to avoid repeating</action>

5. **Brand Alignment Insights:**
   <action>Understand their current brand positioning to ensure ideas fit their identity</action>

<action>Synthesize findings into {{personal_performance_audit}} with personalized recommendations</action>

<action>Display data collection date: "Personal Audit Data Collected: {{date}}"</action>

<template-output>personal_performance_audit</template-output>
</step>

<step n="6" goal="Idea Generation - Synthesis Agent 1">
<action>Explain you're now activating the Reel Idea Architect to synthesize all research into {idea_count} concrete Instagram Reel ideas</action>

**Reel Idea Architect Synthesis:**

<action>As the Reel Idea Architect, synthesize ALL research from the previous agents:</action>

<action>Review and integrate:
- Niche analysis insights: {{niche_analysis_report}}
- Competitor intelligence: {{competitor_intelligence_report}}
- Current trends: {{trend_scanning_report}}
- Personal performance patterns: {{personal_performance_audit}} (if available)
</action>

**Generate {idea_count} Instagram Reel Ideas:**

<action>For each idea, create a structured concept that includes:</action>

1. **Idea Title:** Catchy, descriptive name
2. **Hook:** The first 1-3 seconds that stop the scroll
3. **Core Concept:** What the Reel is about (2-3 sentences)
4. **Format:** Video structure (talking head, B-roll montage, text-on-screen, etc.)
5. **Trending Element:** Which trending audio, effect, or format it leverages
6. **Viral Potential Factors:** Why this could go viral (specific mechanics)
7. **Instagram Optimization:** How it's optimized for IG algorithm (watch time, saves, shares)

**Variety Requirements:**

<action>Ensure diversity across the {idea_count} ideas:</action>
- Mix of educational, entertaining, relatable, and transformational content
- Variety of formats (not all talking head or all text-on-screen)
- Different trending audio/effects
- Range from safe bets to bold/controversial
- Some leverage user's strengths (if personal audit was done)

<action>Generate all {idea_count} ideas and store as {{raw_ideas_list}}</action>

<template-output>raw_ideas_list</template-output>
</step>

<step n="7" goal="Strategic Ranking - Synthesis Agent 2">
<action>Explain you're now activating the Instagram Viral Strategist (Forge Master) to rank all ideas by viral probability</action>

**Viral Strategist Ranking Process:**

<action>As the Instagram Viral Strategist, apply data-driven ranking to the {idea_count} ideas from {{raw_ideas_list}}</action>

**Ranking Criteria (Weighted Scoring):**

<action>Evaluate each idea across these factors:</action>

1. **Algorithm Favorability (30%):**
   - Predicted watch time (hook strength)
   - Save likelihood (value to viewer)
   - Share potential (relatability/entertainment)
   - Comment trigger (engagement bait)

2. **Trend Alignment (25%):**
   - Uses current trending audio/format from {{trend_scanning_report}}
   - Aligns with what's viral RIGHT NOW
   - Timing advantage (trend is early vs saturated)

3. **Niche Fit (20%):**
   - Matches viral mechanics for {{niche}} from {{niche_analysis_report}}
   - Hits psychological triggers for this audience
   - Fills content gap identified in research

4. **Execution Feasibility (15%):**
   - User can realistically create this
   - Fits user's authentic voice (if audit available)
   - Resource requirements reasonable

5. **Differentiation Factor (10%):**
   - Uniqueness vs competitors from {{competitor_intelligence_report}}
   - Fresh angle vs oversaturated content
   - Breakthrough potential

**Scoring and Ranking:**

<action>Score each idea (1-100 scale) across all criteria</action>
<action>Rank ideas from highest to lowest viral probability</action>
<action>For each idea, provide:
- Overall Viral Probability Score (1-100)
- Ranking (#1 = highest viral potential to #{idea_count} = lowest)
- Strategic Rationale (2-3 sentences explaining the score and ranking)
</action>

<action>Store ranked list as {{ranked_ideas_final}}</action>

<template-output>ranked_ideas_final</template-output>
</step>

<step n="8" goal="Report Generation and Delivery">
<action>Compile all research and ranked ideas into the final report document</action>

<action>Populate the template.md with all variables:
- {{user_context}}
- {{niche_analysis_report}}
- {{competitor_intelligence_report}}
- {{trend_scanning_report}}
- {{personal_performance_audit}} (if applicable)
- {{raw_ideas_list}}
- {{ranked_ideas_final}}
</action>

<action>Save the complete report to {default_output_file}</action>

<action>Present summary to {user_name}:</action>

**Report Summary:**
- Total ideas generated: {idea_count}
- Top 3 highest viral probability ideas
- Data freshness confirmation (all data within required age thresholds)
- Report saved location
- Next steps: Review ideas, select top candidates, begin content creation

<action>Celebrate the completion and wish {user_name} viral success on Instagram!</action>

<template-output>completion_summary</template-output>
</step>

</workflow>
