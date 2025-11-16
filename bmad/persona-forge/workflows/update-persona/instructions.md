# Update Persona - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/persona-forge/workflows/update-persona/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the persona update process</critical>

<workflow>

<step n="1" goal="Load existing persona and determine update type">
<action>Welcome {user_name} to the Persona Update workflow</action>

<action>Explain the update workflow:
This workflow refreshes existing personas with new insights. You can update based on:

1. **New Market Research** - Updated industry data, competitor changes, market shifts
2. **Real Qualification Data** - Actual results from using qualification questions with leads
3. **General Refresh** - Periodic review and enhancement

Updates are incremental and create new versions while preserving history.
</action>

<ask response="persona_file_path">Which persona document would you like to update? (Provide the file path)</ask>

<action>Load existing persona document from provided path</action>
<action>Parse persona metadata (name, version, last updated, business context)</action>
<action>Store as previous_version</action>

<action>Display persona summary:
- Persona Name: {{persona_name}}
- Current Version: {{current_version}}
- Last Updated: {{last_updated}}
- Created: {{creation_date}}
</action>

<ask>What type of update are you performing?
1. **Market Research Update** - I have new market data or industry insights [market]
2. **Qualification Data Update** - I have results from using this persona in real calls [qualification]
3. **General Refresh** - Periodic update and enhancement [refresh]
</ask>

<action>Store update_type based on user selection</action>

<template-output>loaded_persona, update_type</template-output>
</step>

<step n="2" goal="Gather update inputs based on type">

<check if="update_type == 'market'">
  <ask response="market_research_context">What new market research or industry insights do you have? (Reports, competitor changes, market shifts, etc.)</ask>

  <ask>Do you want the Market Intelligence Analyst to:
  1. **Research specific topics** you provide [targeted]
  2. **Conduct broad market refresh** across all persona elements [broad]
  </ask>

  <action>Store research_scope</action>

  <check if="research_scope == 'targeted'">
    <ask response="research_topics">What specific topics should the Analyst research? (e.g., "new competitors in this space", "changing customer preferences", "demographic shifts")</ask>
  </check>
</check>

<check if="update_type == 'qualification'">
  <ask response="qualification_results">Share your qualification call results and learnings:

- How many leads did you qualify using this persona?
- Which leads matched this persona well?
- Which leads you expected to match but didn't?
- What patterns emerged that surprised you?
- Which qualification questions worked well?
- Which questions were confusing or inaccurate?
- What information is missing from the current persona?
  </ask>

  <ask response="conversion_data">Do you have conversion data? (Which persona-matched leads converted, patterns, etc.)</ask>

  <action>Analyze qualification results for patterns:
  - Accuracy rate (correct persona identification)
  - Qualification question effectiveness
  - Missing persona characteristics
  - Awareness level identification accuracy
  - New pain points or objections discovered
  - Language patterns from actual conversations
  </action>
</check>

<check if="update_type == 'refresh'">
  <ask>What triggered this refresh?
  1. **Time-based** - It's been X months, time to update [time]
  2. **Performance-based** - Persona isn't working as expected [performance]
  3. **Business change** - Our offering or market position changed [business]
  </ask>

  <ask response="refresh_context">What has changed since this persona was created? (Market conditions, your business, customer feedback, etc.)</ask>

  <ask response="focus_areas">Are there specific sections you want to focus on, or refresh everything? [specific sections / everything]</ask>

  <check if="specific sections">
    <ask response="section_list">Which sections need updating? (Demographics, Pain Points, Awareness Journey levels, Messaging, etc.)</ask>
  </check>
</check>

<template-output>update_inputs</template-output>
</step>

<step n="3" goal="Process update based on type">

<check if="update_type == 'market' or update_type == 'refresh'">
  <action>Transition to Market Intelligence Analyst</action>

  <action>Explain: "The Market Intelligence Analyst will now conduct research and integrate new findings into your persona. This takes 10-15 minutes."</action>

  <action>Load Market Intelligence Analyst agent context: {market_intelligence_analyst}</action>

  <action>Pass to Analyst:
  - Existing persona document
  - Market research context / refresh context
  - Research scope or focus areas
  - Previous version number
  </action>

  <action>Market Intelligence Analyst executes:
  1. Conducts targeted or broad market research based on scope
  2. Validates existing persona elements against current market data
  3. Identifies what has changed since last version
  4. Updates sections with new findings
  5. Preserves persona core while updating evolving elements
  6. Cites new sources and notes confidence levels
  7. Creates revision notes documenting what changed and why
  </action>

  <action>Analyst generates updated persona document with:
  - Incremented version number
  - Updated sections based on research
  - Revision notes section showing changes
  - New sources cited
  - Updated "Last Updated" date
  </action>
</check>

<check if="update_type == 'qualification'">
  <action>Analyze qualification data for persona refinements</action>

  <action>Identify recommended updates:

  **High Confidence Updates** (based on clear patterns):
  - Qualification question adjustments
  - Pain point priorities (what actually resonates)
  - Language refinements (use their actual words)
  - Objection updates (what they really say)
  - Awareness level indicators (better identification)

  **Medium Confidence Updates** (based on emerging patterns):
  - Demographic refinements
  - Psychographic insights
  - Decision factor weightings
  - Channel effectiveness

  **Low Confidence Updates** (based on limited data):
  - Flag for further observation
  - Note in revision comments
  </action>

  <action>Present recommended updates to {user_name} with confidence levels</action>

  <ask>Review the recommended updates. Would you like to:
  1. **Apply all high confidence updates** [high-only]
  2. **Apply high + medium confidence updates** [high-medium]
  3. **Review each update individually** [review]
  4. **Customize which updates to apply** [customize]
  </ask>

  <action>Apply selected updates to persona document</action>

  <action>Create revision notes documenting:
  - Number of qualification calls analyzed
  - Accuracy rate of current persona
  - What was updated and why
  - Confidence levels for changes
  - Recommended next steps for validation
  </action>

  <action>Generate updated persona document with:
  - Incremented version number
  - Refined sections based on real data
  - Updated qualification questions with calibrated scoring
  - Revision notes section
  - Updated "Last Updated" date
  - Accuracy tracking metadata
  </action>
</check>

<template-output>updated_persona_draft</template-output>
</step>

<step n="4" goal="User reviews updated persona">
<action>Present updated persona to {user_name}</action>

<action>Show:
- Version comparison (v{{previous_version}} → v{{new_version}})
- Summary of what changed
- Revision notes
- Sections with significant updates highlighted
</action>

<ask>The persona has been updated. Would you like to:
1. **Review changes in detail** [review]
2. **See before/after comparison** [compare]
3. **Proceed to quality validation** [continue]
</ask>

<check if="review">
  <action>Display updated persona with changes highlighted</action>
  <ask>Any concerns or additional changes needed? [provide feedback or say "continue"]</ask>
</check>

<check if="compare">
  <action>Show side-by-side comparison of changed sections</action>
  <action>Highlight:
  - What was added
  - What was modified
  - What was removed (if anything)
  - Why changes were made
  </action>
  <ask>Ready to proceed to validation? [y/n]</ask>
</check>

<check if="continue">
  <action>Proceed to next step</action>
</check>

<template-output>user_review_of_updates</template-output>
</step>

<step n="5" goal="Senior Persona Specialist validates updates">
<action>Transition to Senior Persona Specialist</action>

<action>Explain: "The Senior Persona Specialist will validate that updates maintain quality standards and improve the persona's effectiveness."</action>

<action>Load Senior Persona Specialist agent context: {senior_persona_specialist}</action>

<action>Pass updated persona to Specialist with:
- Previous version for comparison
- Update type and context
- Revision notes
</action>

<action>Senior Persona Specialist executes:
1. Validates updates maintain persona coherence
2. Checks that core profile remains stable while awareness journey evolves appropriately
3. Ensures new information is properly integrated
4. Verifies qualification questions improvements (if updated)
5. Assesses whether updates actually improve persona actionability
6. Reviews revision notes for completeness
7. Makes DECISION: Approve OR Request Refinements
</action>

<action>Specialist provides feedback</action>

<template-output>specialist_validation</template-output>
</step>

<step n="6" goal="Handle validation decision">

<check if="specialist_decision == 'APPROVED'">
  <action>Celebrate approval</action>
  <action>Display Specialist's approval message</action>
  <action>Proceed to Step 7 (Finalize and save)</action>
</check>

<check if="specialist_decision == 'REFINEMENTS_NEEDED'">
  <action>Display refinement requests</action>

  <ask>The Specialist recommends refinements to the updates. Would you like to:
  1. **Apply recommended refinements** [apply]
  2. **Discuss the refinements** [discuss]
  3. **Accept current version anyway** [accept]
  </ask>

  <check if="apply">
    <action>Apply refinements based on Specialist feedback</action>
    <action>Return to Step 5 for re-validation</action>
  </check>

  <check if="discuss">
    <action>Facilitate discussion about specific refinements</action>
    <action>Clarify standards and expectations</action>
    <action>Make targeted adjustments</action>
    <action>Return to Step 5 for re-validation</action>
  </check>

  <check if="accept">
    <ask>Are you sure you want to accept without refinements? This may reduce persona effectiveness. [confirm/cancel]</ask>
    <check if="confirm">
      <action>Mark as "Accepted with caveats" in metadata</action>
      <action>Proceed to Step 7</action>
    </check>
  </check>
</check>

<template-output>validation_handling</template-output>
</step>

<step n="7" goal="Finalize and save updated persona">
<action>Congratulate {user_name} on completing the persona update</action>

<action>Finalize updated persona document:
- Increment version number
- Add complete revision history
- Update all metadata (version, date, approval status)
- Preserve previous version reference
- Add accuracy tracking if qualification data was used
</action>

<action>Save updated persona to: {updated_output_file}</action>

<action>Create update summary document:

**Persona Update Summary**
- Persona: {{persona_name}}
- Previous Version: {{previous_version}}
- New Version: {{new_version}}
- Update Type: {{update_type}}
- Updated Date: {{date}}
- Updated By: {{user_name}}

**Changes Made:**
{{revision_notes}}

**Validation Status:** {{specialist_decision}}

**Next Review Recommended:** {{next_review_date}}
</action>

<action>Present to {user_name}:
- Updated persona location
- Version comparison summary
- Key improvements made
- Usage recommendations based on updates
</action>

<template-output>final_updated_persona</template-output>
</step>

<step n="8" goal="Provide usage guidance for updated persona">
<action>Explain how to use the updated persona effectively</action>

<action>Based on update type, provide specific guidance:

<check if="update_type == 'market'">
**Market Research Update Guidance:**
- Share updated Quick Reference with team
- Highlight what changed in market positioning
- Update any active campaigns based on new insights
- Brief sales team on new objections or decision factors
- Review channel strategies for changes
</check>

<check if="update_type == 'qualification'">
**Qualification Data Update Guidance:**
- Start using updated qualification questions immediately
- Note the improved accuracy based on {{sample_size}} calls
- Track ongoing accuracy with new scoring
- Continue feeding results back monthly for further calibration
- Celebrate improvements in persona predictive value
</check>

<check if="update_type == 'refresh'">
**General Refresh Guidance:**
- Conduct team briefing on updated persona
- Update any materials referencing the persona
- Review messaging to align with refreshed insights
- Plan next refresh for {{recommended_interval}}
</check>
</action>

<ask>Would you like to:
1. **Update another persona** [update-another]
2. **Compare this version with previous** [compare]
3. **Generate qualification questions from updates** [questions]
4. **Complete and exit** [exit]
</ask>

<check if="update-another">
  <action>Return to Step 1 with new persona</action>
</check>

<check if="compare">
  <action>Display detailed before/after comparison</action>
  <action>Highlight measurable improvements</action>
</check>

<check if="questions">
  <action>Regenerate qualification questions document based on updated persona</action>
  <action>Show what changed in questions/scoring</action>
</check>

<check if="exit">
  <action>Final encouragement</action>
  <action>Remind about continuous improvement cycle</action>
  <action>Encourage monthly updates with qualification data</action>
</check>

<template-output>completion_message</template-output>
</step>

</workflow>

## Update Type Handling

### Market Research Updates
- Load existing persona
- Conduct new market research (targeted or broad)
- Integrate findings while preserving persona core
- Validate changes maintain coherence
- Track sources and confidence levels

### Qualification Data Updates
- Analyze real call results and patterns
- Calculate accuracy rates and question effectiveness
- Identify persona refinements from actual usage
- Apply updates with confidence level tracking
- Calibrate qualification questions
- Track improvement in predictive value

### General Refresh Updates
- Review all sections for currency
- Update market positioning
- Refresh examples and messaging
- Verify demographic/psychographic accuracy
- Enhance based on time elapsed

## Version Tracking

**Version Number Format:** X.Y
- X = Major update (significant changes, market research, qualification data refinement)
- Y = Minor update (tweaks, corrections, formatting)

**Revision History:**
- What changed
- Why it changed
- Data source (research, qualification calls, user input)
- Confidence level
- Date and updater

**Version Comparison:**
- Highlight changed sections
- Show before/after for key elements
- Note impact of changes on actionability

## Quality Standards for Updates

**Updates must:**
- Maintain persona core identity (no complete personality changes)
- Improve actionability (make persona more useful, not just different)
- Be grounded in evidence (research or real data, not assumptions)
- Preserve narrative coherence (persona still makes sense as a whole)
- Update qualification questions if persona changes significantly

**Updates should not:**
- Contradict core persona without strong evidence
- Add complexity without adding value
- Remove working elements without reason
- Create inconsistencies between sections

