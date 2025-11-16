# View Config - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/viral-reels-forge/workflows/view-config/workflow.yaml</critical>
<critical>ALWAYS communicate in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Display module configuration">
<action>Greet {user_name} and display the current Viral Reels Forge module configuration</action>

**Module Configuration for Viral Reels Forge**

---

**Module Information:**
- Module Version: {module_version}
- Configuration Date: {date}

**User Settings:**
- User Name: {user_name}
- Communication Language: {communication_language}
- Output Folder: {output_folder}

**Content Generation Settings:**
- Ideas Per Session: {idea_count}
- Instagram Handle: {instagram_handle} (for personal audits)

**Data Freshness Rules:**
- Trend Data Max Age: {trend_data_max_age_days} days (most critical - trends change fast!)
- Competitor Data Max Age: {competitor_data_max_age_days} days
- Niche Data Max Age: {niche_data_max_age_days} days
- User Performance Data Max Age: {user_data_max_age_days} days

**What These Mean:**
- All workflows enforce these data freshness thresholds
- Trend data MUST be from last 7 days for viral relevance
- Competitor strategies analyzed from last 30 days
- Niche insights from last 90 days
- Personal performance history up to 180 days

---

<ask>Would you like to:
1. View config file location
2. Learn how to update settings
3. Exit
</ask>

<action>Store user choice as {{user_choice}}</action>

<check if="user_choice == '1'">
  <action>Display: "Config file location: {config_source}"</action>
  <action>Explain: "This file was generated during installation from install-config.yaml"</action>
</check>

<check if="user_choice == '2'">
  <action>Explain how to update configuration:</action>

  **To Update Module Configuration:**

  1. **Edit config.yaml directly:**
     - Location: {config_source}
     - Update values as needed
     - Save file

  2. **What you can change:**
     - `idea_count`: Number of ideas generated (default: 25)
     - `instagram_handle`: Your IG handle for audits
     - `output_folder`: Where reports are saved

  3. **What you should NOT change:**
     - Data freshness rules (optimized for viral content)
     - Module version
     - System paths

  4. **After making changes:**
     - No restart needed
     - Next workflow run will use new settings
</check>

<check if="user_choice == '3'">
  <action>Exit workflow</action>
</check>

</step>

</workflow>
