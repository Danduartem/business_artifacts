# Trend Report - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/viral-reels-forge/workflows/trend-report/workflow.yaml</critical>
<critical>ALWAYS communicate in {communication_language} throughout this workflow</critical>
<critical>DATA MUST BE FROM LAST {trend_data_max_age_days} DAYS ONLY - This is the MOST time-sensitive research</critical>

<workflow>

<step n="1" goal="Gather context for trend scanning">
<action>Greet {user_name} and explain this workflow scans what's viral RIGHT NOW on Instagram Reels</action>

<action>Emphasize data freshness: "This report will ONLY include trends from the last 7 days to ensure you're riding current waves, not outdated trends."</action>

**Niche Context:**
<action>Guide user to specify their niche for targeted trend scanning</action>
<action>Store as {{niche}} and create URL-safe slug as {{niche_slug}}</action>

**Trend Focus (Optional):**
<ask>What trend type should I prioritize? [audio / formats / effects / topics / all]</ask>
<action>Store as {{trend_focus}}</action>

<template-output>trend_context</template-output>
</step>

<step n="2" goal="Scan trending audio">
<action>Explain you're activating the Instagram Trend Hunter to scan trending audio</action>

<critical>ONLY data from last {trend_data_max_age_days} days - NO OLDER DATA</critical>

**Trend Hunter - Audio Scanning:**

<action>As the Instagram Trend Hunter, scan for trending audio in {{niche}}:</action>

1. **Current Trending Audio:**
   <action>Use WebSearch with STRICT date filter: "trending Instagram Reels audio {{niche}} last week"</action>
   <action>Use WebSearch: "viral Instagram audio {{niche}} {{current_month}} 2025"</action>
   <action>Identify 5-10 audio tracks trending RIGHT NOW</action>

2. **For Each Trending Audio:**
   <action>Track name and artist</action>
   <action>Estimated Reel count using this audio
   <action>Which part of the audio is being used (hook, chorus, etc.)</action>
   <action>How creators in {{niche}} are using it</action>

3. **Audio Trend Lifecycle:**
   <action>Which audio is emerging (early trend)?</action>
   <action>Which is peaking (maximum reach)?</action>
   <action>Which is starting to decline (avoid)?</action>

<action>Store as {{trending_audio}}</action>

<template-output>trending_audio</template-output>
</step>

<step n="3" goal="Scan viral format patterns">
<action>Scan for viral Reel formats trending in last 7 days</action>

**Trend Hunter - Format Scanning:**

<action>Search: "viral Instagram Reels format {{niche}} {{current_week}}"</action>

1. **Template Formats:**
   <action>Identify trending templates (text patterns, transitions, effects)</action>
   <action>Note how they're being adapted in {{niche}}</action>

2. **Hook Patterns:**
   <action>What hooks are stopping the scroll this week?</action>
   <action>Opening lines, visual patterns, pattern interrupts</action>

3. **Text Overlay Styles:**
   <action>Trending text placement, fonts, animation styles</action>

4. **Editing Techniques:**
   <action>Cuts, transitions, speed changes that are hot right now</action>

5. **Video Length Trends:**
   <action>Are short-form (<10s) or longer formats (15-30s) performing better?</action>

<action>Store as {{viral_formats}}</action>

<template-output>viral_formats</template-output>
</step>

<step n="4" goal="Scan trending effects and features">
<action>Identify Instagram effects and features driving reach</action>

**Trend Hunter - Effects & Features:**

<action>Search: "trending Instagram effects {{niche}} 2025"</action>

1. **Trending Effects:**
   <action>Which Instagram filters/effects are being used in viral Reels?</action>
   <action>Effect names and how they're being applied</action>

2. **Instagram Features:**
   <action>Is Remix, Collab, Add Yours, or other features driving reach?</action>
   <action>How are top creators leveraging these features?</action>

3. **Visual Trends:**
   <action>Color grading styles, aspect ratio tricks, visual techniques</action>

<action>Store as {{trending_effects}}</action>

<template-output>trending_effects</template-output>
</step>

<step n="5" goal="Identify breakout content">
<action>Find Reels that exploded in views in last 7 days</action>

**Breakout Content Analysis:**

<action>Search: "viral Instagram Reels {{niche}} this week"</action>

1. **Breakout Examples:**
   <action>Identify 3-5 Reels that went viral in last 7 days</action>
   <action>Analyze what made them break through:</action>
   - Hook quality
   - Format used
   - Trending elements leveraged
   - Topic/angle
   - Timing advantage

2. **Common Patterns:**
   <action>What do recent breakout Reels have in common?</action>

<action>Store as {{breakout_content}}</action>

<template-output>breakout_content</template-output>
</step>

<step n="6" goal="Generate trend report">
<action>Compile all trend intelligence into report</action>

<action>Calculate {{date_plus_7_days}} by adding 7 days to {date}</action>

<action>Populate template with:
- {{trend_context}}
- {{trending_audio}}
- {{viral_formats}}
- {{trending_effects}}
- {{breakout_content}}
</action>

<action>Save report to {default_output_file}</action>

<action>Present summary to {user_name}:</action>
- Number of trending audio tracks identified
- Key format trends
- Breakout content patterns
- Data collection date (emphasize freshness)
- Report location

<action>**IMPORTANT REMINDER:** "These trends are from the last 7 days. Trends change rapidly on Instagram - use these insights immediately and refresh this report weekly for best results."</action>

<template-output>completion_summary</template-output>
</step>

</workflow>
