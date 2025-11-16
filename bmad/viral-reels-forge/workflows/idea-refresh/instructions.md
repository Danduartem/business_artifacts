# Idea Refresh - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/viral-reels-forge/workflows/idea-refresh/workflow.yaml</critical>
<critical>ALWAYS communicate in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Check for previous research and context">
<action>Greet {user_name} and explain this workflow generates NEW ideas quickly by leveraging previous research</action>

**Previous Research Check:**
<ask>Do you have a recent viral idea generation report (from last 30 days)? [yes/no]</ask>
<action>Store response as {{has_recent_report}}</action>

<check if="has_recent_report == 'yes'">
  <ask>Provide the path to the previous report or key research findings:</ask>
  <action>Load previous research: niche analysis, competitor intelligence, trends, personal audit</action>
  <action>Store as {{previous_research}}</action>
  <action>Extract {{niche}} from previous report and create URL-safe slug as {{niche_slug}}</action>
  <action>Extract report date and store as {{previous_research_date}}</action>
</check>

<check if="has_recent_report == 'no'">
  <action>Explain that without recent research, they should run the full viral idea generation workflow instead</action>
  <ask>Would you like to:
1. Provide niche for minimal research mode
2. Run full viral idea generation workflow instead
  </ask>
  <action>Store choice as {{workflow_choice}}</action>

  <check if="workflow_choice == '1'">
    <ask>What is your niche?</ask>
    <action>Store as {{niche}} and create URL-safe slug as {{niche_slug}}</action>
    <action>Set {{research_mode}} to "minimal"</action>
    <action>Set {{previous_research_date}} to "N/A - minimal research mode"</action>
  </check>

  <check if="workflow_choice == '2'">
    <action>Redirect to full-viral-idea-generation workflow</action>
    <goto step="exit">Run full workflow instead</goto>
  </check>
</check>

**Refresh Context:**
<ask>What should these new ideas focus on? [different angles / different formats / trending variations / all new]</ask>
<action>Store as {{refresh_focus}}</action>

<template-output>refresh_context</template-output>
</step>

<step n="2" goal="Quick trend update check" optional="true">
<action>Explain checking if major trends have shifted since last research</action>

**Quick Trend Scan:**

<action>Search: "viral Instagram Reels trends {{current_week}}"</action>
<action>Identify if any MAJOR new trends emerged since {{previous_research_date}}</action>
<action>Store findings indicator as {{trends_changed}} (true/false)</action>

<check if="trends_changed == 'true'">
  <action>Document new trending audio, formats, or viral patterns</action>
  <action>Store as {{trend_updates}}</action>
</check>

<check if="trends_changed == 'false'">
  <action>Note: "Trend landscape stable since last research"</action>
  <action>Store as {{trend_updates}}</action>
</check>

<template-output>trend_updates</template-output>
</step>

<step n="3" goal="Generate fresh ideas">
<action>Explain you're activating the Reel Idea Architect to generate {idea_count} NEW ideas</action>

**Reel Idea Architect - Fresh Ideation:**

<action>As the Reel Idea Architect, generate {idea_count} NEW Instagram Reel ideas:</action>

<check if="research_mode != 'minimal'">
  <action>Leverage previous intelligence:</action>
  - Niche viral mechanics from previous analysis
  - Competitor gaps identified
  - Trending elements from previous scan
  - User strengths (if personal audit exists)
  - New trend updates from Step 2
</check>

<check if="research_mode == 'minimal'">
  <action>Quick niche research:</action>
  - Search: "Instagram Reels {{niche}} what works"
  - Identify 2-3 viral mechanics for {{niche}}
  - Search: "trending Instagram audio {{niche}}"
  - Use general Instagram best practices
</check>

**Generation Guidelines Based on {{refresh_focus}}:**

<action>Apply focus directive:</action>

<check if="refresh_focus == 'different angles'">
  <action>Generate ideas from completely different perspectives than previous batch</action>
  <action>Explore contrarian takes, unexpected hooks, fresh narratives</action>
</check>

<check if="refresh_focus == 'different formats'">
  <action>Generate ideas using formats NOT used in previous batch</action>
  <action>If last batch was text-heavy, go visual; if talking head, try B-roll</action>
</check>

<check if="refresh_focus == 'trending variations'">
  <action>Take trending elements and create variations</action>
  <action>Different applications of same trends</action>
</check>

<check if="refresh_focus == 'all new'">
  <action>Maximum variety - no overlap with previous ideas</action>
  <action>Fresh hooks, fresh angles, fresh formats</action>
</check>

**For Each Idea:**

<action>Create structured concept with:</action>
1. Idea Title
2. Hook (first 1-3 seconds)
3. Core Concept
4. Format
5. Trending Element
6. Viral Potential Factors
7. Instagram Optimization

<action>Store as {{fresh_ideas}}</action>

<template-output>fresh_ideas</template-output>
</step>

<step n="4" goal="Rank new ideas by viral potential">
<action>Explain you're activating the Viral Strategist to rank the new ideas</action>

**Viral Strategist - Ranking:**

<action>As the Instagram Viral Strategist, rank all {idea_count} ideas:</action>

**Ranking Criteria:**
- Algorithm Favorability (30%): watch time, saves, shares, comments
- Trend Alignment (25%): uses current trends, timing advantage
- Niche Fit (20%): matches niche viral mechanics
- Execution Feasibility (15%): user can realistically create
- Differentiation Factor (10%): unique vs previous ideas

<action>For each idea:</action>
- Viral Probability Score (1-100)
- Ranking (#1 to #{idea_count})
- Strategic Rationale

<action>Ensure rankings consider:</action>
- How fresh/different these are from previous batch
- Current trend landscape
- Niche-specific factors

<action>Store as {{ranked_ideas}}</action>

<template-output>ranked_ideas</template-output>
</step>

<step n="5" goal="Generate idea refresh report">
<action>Compile all new ideas into refresh report</action>

<action>Populate template with:
- {{refresh_context}}
- {{trend_updates}}
- {{fresh_ideas}}
- {{ranked_ideas}}
</action>

<action>Save report to {default_output_file}</action>

<action>Present summary to {user_name}:</action>
- New ideas generated: {idea_count}
- Top 3 highest-ranked ideas
- How these differ from previous batch
- Report location

<action>Encourage testing top-ranked ideas and tracking which perform best</action>

<template-output>completion_summary</template-output>
</step>

</workflow>
