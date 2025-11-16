# Forge Complete Landing Page Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/copy-forge/workflows/forge-complete-lp/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the workflow</critical>

<workflow>

<action>Initialize refinement_count = 0</action>

<step n="1" goal="Welcome and Blueprint Loading">

<say>
Welcome to the Complete Landing Page Forge, {user_name}! 🔨

I'm your Blueprint Coordinator, and I'll orchestrate the entire Copy Forge studio to create your complete landing page copy from your LP Architect blueprint.

This master workflow will:
1. Parse your LP Architect blueprint (all sections, word counts, purposes)
2. Gather brand voice and avatar intelligence
3. Create creative briefs for each section
4. Coordinate specialist copywriters (Hero Writer, CTA Specialist)
5. Validate each section through Brand Voice Guardian → Avatar Advocate
6. Review complete LP for cohesion, flow, and transitions
7. Present validated copy with comprehensive scores
8. Collaborate on refinements

This is the complete Copy Forge experience - where brand authenticity meets conversion science across your entire landing page.

Let's begin!
</say>

<ask response="blueprint_source">Do you have an LP Architect blueprint ready?

A) Yes - I'll provide the path
B) Yes - It's in the default folder ({lp_architect_blueprint_folder})
C) No - I need to create one first

Enter A, B, or C:
</ask>

<check if="blueprint_source == A">
  <ask response="blueprint_path">Please provide the path to your LP Architect blueprint:</ask>
  <action>Load blueprint from provided path</action>
</check>

<check if="blueprint_source == B">
  <action>List available blueprints in {lp_architect_blueprint_folder}</action>
  <ask response="blueprint_selection">
Available blueprints:
[List files in folder]

Which blueprint should I use? (filename or path):
  </ask>
  <action>Load selected blueprint</action>
</check>

<check if="blueprint_source == C">
  <say>
You'll need an LP Architect blueprint to use this workflow. A blueprint defines:
- Landing page structure and sections
- Word count targets per section
- Section purposes and messaging goals
- Strategic requirements

Please create a blueprint using LP Architect first, then return to this workflow.

Alternatively, use section-specific workflows:
- */bmad:copy-forge:workflows:forge-hero-section*
- */bmad:copy-forge:workflows:forge-cta*
  </say>
  <action>Workflow paused - waiting for blueprint</action>
</check>

<action>Parse LP Architect blueprint</action>

<critical>Blueprint parsing extracts:
- Total sections count
- Section names and types (hero, benefits, story, cta, etc.)
- Word count targets per section
- Section purposes and goals
- Strategic requirements
- Order/sequence of sections
</critical>

<check if="blueprint cannot be parsed or is invalid">
  <say>I couldn't parse the blueprint. Please ensure it's a valid LP Architect blueprint file.</say>
  <action>Show blueprint format requirements or offer help</action>
</check>

<action>Present blueprint interpretation for user confirmation</action>

<say>
📋 **BLUEPRINT INTERPRETATION**

I've parsed your LP Architect blueprint:

**Landing Page Structure:**
[For each section:]
- Section [N]: [Section Name] ([Section Type])
  - Word count target: [X words]
  - Purpose: [Purpose from blueprint]
  - Copywriter: [Which specialist will handle this]

**Total Sections:** [N]
**Total Target Word Count:** [X words]

Does this interpretation look correct? (y/n)
</say>

<ask response="blueprint_confirmation">Confirm blueprint interpretation:</ask>

<check if="blueprint_confirmation == n">
  <ask response="blueprint_issue">What needs adjustment?</ask>
  <action>Clarify blueprint interpretation or request new blueprint</action>
</check>

<template-output>lp_blueprint_path, blueprint_loaded, sections_list, total_word_count, total_sections, target_word_count, blueprint_confirmed</template-output>

</step>

<step n="2" goal="Gather Brand Voice and Avatar Intelligence">

<say>
Now I need your brand intelligence assets to guide all copywriters...
</say>

<action>Use same brand voice gathering logic as forge-hero-section workflow Step 2</action>

<critical>
- Check brand_voice_folder for files
- Offer default or list available options
- Load and parse selected brand voice document
- Validate document is readable
</critical>

<action>Load brand voice document</action>

<say>✅ Brand voice loaded: [document name]</say>

<action>Use same avatar gathering logic as forge-hero-section workflow Step 3</action>

<critical>
- Check for default_avatar_profile
- List available avatars
- Load and parse selected avatar profile
- Pay special attention to pain points, desires, objections for all sections
</critical>

<action>Load avatar profile</action>

<say>✅ Avatar loaded: [avatar name]</say>

<template-output>brand_voice_document, brand_voice_loaded, avatar_profile, avatar_loaded</template-output>

</step>

<step n="3" goal="Gather Strategic Preferences">

<action>Collect high-level strategic preferences for complete LP</action>

<ask response="section_generation">Which sections should I generate?

A) All sections from blueprint ([N] sections)
B) Hero + CTA only (MVP sections)
C) Custom selection (I'll choose specific sections)

Enter A, B, or C:
</ask>

<check if="section_generation == C">
  <action>Present list of all sections from blueprint</action>
  <ask response="selected_sections">
Available sections:
[List all sections with numbers]

Which sections to generate? (enter numbers separated by commas, e.g., "1,3,5"):
  </ask>
  <action>Store selected sections for generation</action>
</check>

<ask response="default_urgency">What is the default urgency level for CTAs in this LP?

A) No urgency - ongoing availability
B) Authentic deadline (specify later per CTA)
C) Limited capacity (specify later)

Enter A, B, or C:
</ask>

<ask response="validation_approach">How should I handle validation?

A) Validate each section as created (section-by-section approval)
B) Create all sections, then validate all at once (batch validation)
C) Auto-validate using strict criteria, only show me issues

Enter A, B, or C:
</ask>

<action>Store strategic preferences for workflow execution</action>

<template-output>sections_to_generate, default_urgency, validation_approach</template-output>

</step>

<step n="4" goal="Section-by-Section Copy Creation and Validation">

<action>Initialize section tracking</action>

<say>
🔨 **FORGING YOUR LANDING PAGE**

I'll now work through each section:
1. Create creative brief
2. Invoke specialist copywriter
3. Validate through Brand Voice Guardian
4. Validate through Avatar Advocate
5. Store validated copy

Progress: [0/N sections complete]
</say>

<action>For each section in sections_to_generate, execute subsection loop:</action>

<subsection goal="Generate and validate single section">

<action>Identify current section details from blueprint</action>

<say>
───────────────────────────────────
**SECTION [X/N]: [Section Name]**
Type: [Section Type]
Word count target: [X words]
Purpose: [Purpose from blueprint]
───────────────────────────────────
</say>

<action>Create creative brief for this section:
- Section name and type
- Word count target
- Section purpose from blueprint
- Brand voice document
- Avatar profile
- Strategic preferences
- Context: position in LP, sections before/after
</action>

<action>Determine which copywriter specialist to invoke based on section type</action>

<critical>Section type → Copywriter mapping:
- hero → Hero Writer
- cta / call-to-action → CTA Specialist
- story / narrative → Hero Writer (Phase 1) or Story Writer (Phase 2)
- benefits / features → Hero Writer (Phase 1) or Benefits Writer (Phase 2)
- other → Hero Writer (Phase 1 - general copywriter)

In Phase 1 MVP, Hero Writer handles hero sections, CTA Specialist handles CTAs, Hero Writer handles other sections as general copywriter.
</critical>

<say>
Invoking [Copywriter Name] to forge [Section Name]...
</say>

<action>Invoke appropriate copywriter with creative brief</action>

<action>Receive copy from copywriter:
- Section copy
- Word count
- Strategic rationale
</action>

<check if="validation_approach == A (section-by-section)">
  <say>
[Section Name] forged! Here's the copy:

---
[Display section copy]
---

Word count: [actual] (Target: [target])

Validating now through Brand Voice Guardian...
  </say>
</check>

<action>Invoke Brand Voice Guardian with section copy</action>

<action>Receive validation: APPROVED or NEEDS REVISION</action>

<check if="APPROVED">
  <say>✅ Brand Voice: PASSED ([score])</say>
  <action>Store brand voice score for this section</action>
</check>

<check if="NEEDS REVISION">
  <check if="validation_approach == A">
    <say>⚠️ Brand Voice: NEEDS REVISION ([score])

Issues:
[Show issues]

A) Refine now
B) Skip and continue (not recommended)

Your choice:
    </say>
    <ask response="voice_refinement_choice">Enter A or B:</ask>

    <check if="voice_refinement_choice == A">
      <action>Increment refinement_count</action>
      <action>Refinement loop with copywriter and Guardian</action>
      <check if="refinement_count >= max_refinement_iterations">
        <say>⚠️ Reached maximum refinement iterations ({max_refinement_iterations}). Proceeding with current version.</say>
      </check>
    </check>
  </check>

  <check if="validation_approach == B or C">
    <action>Flag section for revision, store issues, continue to next section</action>
  </check>
</check>

<action>Invoke Avatar Advocate with section copy</action>

<action>Receive validation: RESONATES or NEEDS REVISION</action>

<check if="RESONATES">
  <say>✅ Audience Resonance: PASSED ([score])</say>
  <action>Store audience score for this section</action>
</check>

<check if="NEEDS REVISION">
  <check if="validation_approach == A">
    <say>⚠️ Audience Resonance: NEEDS REVISION ([score])

Disconnects:
[Show avatar-perspective issues]

A) Refine now
B) Skip and continue

Your choice:
    </say>
    <ask response="audience_refinement_choice">Enter A or B:</ask>

    <check if="audience_refinement_choice == A">
      <action>Increment refinement_count</action>
      <action>Refinement loop with copywriter and both validators</action>
      <check if="refinement_count >= max_refinement_iterations">
        <say>⚠️ Reached maximum refinement iterations ({max_refinement_iterations}). Proceeding with current version.</say>
      </check>
    </check>
  </check>

  <check if="validation_approach == B or C">
    <action>Flag section for revision, store issues, continue to next section</action>
  </check>
</check>

<action>Store validated section copy with scores</action>

<say>
✅ **Section [X/N] Complete: [Section Name]**
Brand Voice: [score]
Audience Resonance: [score]

Progress: [X/N sections complete]
</say>

</subsection>

<action>Repeat subsection for all sections in sections_to_generate</action>

<say>
🎉 **ALL SECTIONS FORGED!**

[N/N] sections complete
Now reviewing complete LP for cohesion and flow...
</say>

<action>Compile all section copy into complete_lp_copy variable</action>
<action>Compile section_validation_scores summary</action>
<action>Calculate average_brand_voice and average_audience_resonance</action>

<template-output>complete_lp_copy, all_sections_created, all_sections_validated, section_validation_scores, average_brand_voice, average_audience_resonance</template-output>

</step>

<step n="5" goal="Cohesion and Flow Review">

<action>Review complete landing page for cohesion</action>

<critical>Cohesion Review checks:
1. Flow between sections - do transitions work?
2. Message consistency - is core message reinforced throughout?
3. Tone consistency - does brand voice stay consistent?
4. Avatar journey - does emotional arc make sense?
5. Redundancy check - is anything repeated unnecessarily?
6. CTA placement - do CTAs appear at right moments?
7. Overall structure - does sequence make strategic sense?
</critical>

<say>
Running cohesion review on complete LP...

Checking:
- Section transitions and flow
- Message consistency throughout
- Tone maintenance
- Avatar emotional journey
- Structural logic
</say>

<action>Analyze complete LP against cohesion criteria</action>

<action>Generate cohesion report</action>

<check if="cohesion issues found">
  <say>
⚠️ **COHESION REVIEW: Issues Flagged**

I found these cohesion concerns:

[For each issue:]
- **Issue:** [What's not cohesive]
- **Location:** [Between sections X and Y]
- **Impact:** [Why this matters]
- **Suggestion:** [How to improve]

Would you like me to:
A) Refine specific sections to improve cohesion
B) Accept as-is (minor issues)
C) Manual review (show me everything, I'll decide)

Your choice:
  </say>

  <ask response="cohesion_action">Enter A, B, or C:</ask>

  <check if="cohesion_action == A">
    <action>Increment refinement_count</action>
    <action>Identify which sections need refinement for cohesion</action>
    <action>Send back to appropriate copywriters with cohesion notes</action>
    <action>Re-validate refined sections</action>
    <action>Re-run cohesion review</action>
    <check if="refinement_count >= max_refinement_iterations">
      <say>⚠️ Reached maximum refinement iterations ({max_refinement_iterations}). Proceeding with current version.</say>
    </check>
  </check>
</check>

<check if="no cohesion issues or user accepted">
  <say>
✅ **COHESION REVIEW: PASSED**

Complete LP demonstrates:
- Strong section transitions
- Consistent messaging
- Maintained brand voice
- Logical avatar journey
- Strategic structure

Ready for final presentation!
  </say>
</check>

<action>Save cohesion report to {cohesion_report_file}</action>

<template-output>cohesion_status, cohesion_report_summary, cohesion_review_complete, cohesion_report_path</template-output>

</step>

<step n="6" goal="Present Complete Validated Landing Page">

<action>Compile complete LP with all sections in order</action>

<say>
═══════════════════════════════════════════════════════
     COMPLETE LANDING PAGE FORGED & VALIDATED
═══════════════════════════════════════════════════════

**LANDING PAGE COPY**

[For each section in order:]

─────────────────────────────────────
**[SECTION NAME]**
─────────────────────────────────────

[Section copy]

[Word count: X words (Target: Y)]

─────────────────────────────────────

[Next section...]

═══════════════════════════════════════════════════════

**VALIDATION SUMMARY**

Total Sections: [N]
Total Word Count: [X words] (Target: [Y words])

**Section-by-Section Scores:**

[For each section:]
- [Section Name]:
  • Brand Voice: [score]
  • Audience Resonance: [score]
  • Status: ✅ VALIDATED

**Overall Averages:**
• Average Brand Voice Alignment: [X%]
• Average Audience Resonance: [X%]
• Cohesion Review: ✅ PASSED

═══════════════════════════════════════════════════════
</say>

<check if="auto_save_output == true">
  <action>Save complete LP to {complete_lp_output_file}</action>
  <say>
✅ Complete landing page saved to: {complete_lp_output_file}
  </say>
</check>

<check if="generate_validation_report == true">
  <action>Generate comprehensive validation report:
    - Complete LP copy
    - Section-by-section validation scorecards
    - Brand Voice Guardian feedback for all sections
    - Avatar Advocate feedback for all sections
    - Cohesion review results
    - Overall quality metrics
    - Timestamp and version
  </action>
  <action>Save to {validation_report_file}</action>
  <say>
📊 Comprehensive validation report saved to: {validation_report_file}
  </say>
</check>

<action>Compile blueprint_requirements_met summary</action>
<action>Compile copywriter_attribution details</action>
<action>Compile refinement_history summary</action>
<action>Compile brand_voice_guardian_summary</action>
<action>Compile avatar_advocate_summary</action>

<template-output>complete_lp_presented, output_file_path, validation_report_path, blueprint_requirements_met, copywriter_attribution, refinement_history, brand_voice_guardian_summary, avatar_advocate_summary</template-output>

</step>

<step n="7" goal="Collaborative Refinement Options">

<ask response="next_action">
Your complete landing page is forged and validated!

What would you like to do next?

A) Refine specific sections (I'll guide you through each)
B) Review validation details (deep-dive into scores and feedback)
C) Test alternative approaches (generate variations of key sections)
D) Export copy (clean format ready for implementation)
E) Generate additional sections not in original blueprint
F) Complete - I'm done, LP is ready!

Enter A, B, C, D, E, or F:
</ask>

<check if="next_action == A">
  <action>List all sections</action>
  <ask response="section_to_refine">
Which section to refine?

[Numbered list of all sections]

Enter section number:
  </ask>

  <action>Load selected section</action>
  <ask response="refinement_goal">What needs improvement in [Section Name]?</ask>
  <action>Increment refinement_count</action>
  <action>Send to appropriate copywriter with refinement goal</action>
  <action>Re-validate refined section</action>
  <action>Update complete LP with refined section</action>
  <action>Re-run cohesion review if needed</action>
  <say>Section refined! Returning to complete LP view...</say>
  <action>Return to Step 6 with updated LP</action>
</check>

<check if="next_action == B">
  <action>Present detailed validation breakdown</action>
  <say>
**DETAILED VALIDATION BREAKDOWN**

[For each section:]

**[Section Name]**

BRAND VOICE GUARDIAN (7 Criteria):
1. Tone Alignment: [✓/✗] - [feedback]
2. Vocabulary Choices: [✓/✗] - [feedback]
3. Sentence Rhythm: [✓/✗] - [feedback]
4. Personality Expression: [✓/✗] - [feedback]
5. Messaging Consistency: [✓/✗] - [feedback]
6. Authenticity: [✓/✗] - [feedback]
7. Emotional Resonance: [✓/✗] - [feedback]

AVATAR ADVOCATE (8 Criteria):
1. Language Match: [✓/✗] - [feedback from avatar POV]
2. Pain Point Resonance: [✓/✗] - [feedback]
3. Desire Alignment: [✓/✗] - [feedback]
4. Objection Handling: [✓/✗] - [feedback]
5. Clarity Level: [✓/✗] - [feedback]
6. Relatability: [✓/✗] - [feedback]
7. Emotional Connection: [✓/✗] - [feedback]
8. Trust Building: [✓/✗] - [feedback]

---

[Next section...]

This gives you complete transparency into what passed and what was flagged.
  </say>
</check>

<check if="next_action == C">
  <ask response="variation_section">
Which section to create variations for?

[List all sections]

Section number:
  </ask>

  <action>Invoke appropriate copywriter's variation/testing command</action>
  <action>Generate 3-4 alternative approaches for selected section</action>
  <action>Present variations with strategic rationale</action>
  <ask response="variation_selection">Which variation to validate? (or keep original)</ask>

  <check if="new variation selected">
    <action>Increment refinement_count</action>
    <action>Validate new variation through both validators</action>
    <action>Replace in complete LP if approved</action>
  </check>
</check>

<check if="next_action == D">
  <action>Format complete LP for export</action>

  <say>
═══════════════════════════════════════
   LANDING PAGE COPY - READY TO COPY
═══════════════════════════════════════

[Clean formatted version of complete LP]
[All sections in order]
[No validation scores, just pure copy]
[Ready for clipboard or implementation]

═══════════════════════════════════════

Brand Voice Alignment: [overall %]
Audience Resonance: [overall %]
Total Word Count: [X words]

═══════════════════════════════════════
  </say>
</check>

<check if="next_action == E">
  <ask response="additional_section">What section would you like to add?

Examples:
- Testimonials/social proof
- FAQ section
- Guarantee section
- About/credibility section
- Additional CTA
- Other (specify)

Section type:
  </ask>

  <action>Create creative brief for new section</action>
  <action>Invoke appropriate copywriter</action>
  <action>Increment refinement_count</action>
  <action>Validate through both validators</action>
  <action>Insert into LP at user-specified position</action>
  <action>Re-run cohesion review</action>
  <say>New section added! Updated complete LP:</say>
  <action>Return to Step 6 with updated LP</action>
</check>

<check if="next_action == F">
  <say>
🎉 **CONGRATULATIONS!** Your complete landing page is forged and ready!

**Final Stats:**
• Total Sections: [N]
• Total Word Count: [X words]
• Average Brand Voice Alignment: [X%]
• Average Audience Resonance: [X%]
• Cohesion: ✅ VALIDATED

**Files Saved:**
• Complete LP: {complete_lp_output_file}
• Validation Report: {validation_report_file}
• Cohesion Report: {cohesion_report_file}

Your landing page copy has been validated for both authentic brand-audience alignment AND conversion effectiveness.

May it forge sustainable results through genuine connections! 🔨⚡

**Next Steps:**
- Implement copy in your landing page builder
- Test with real audience
- Track conversion metrics
- Refine based on data

Use */bmad:copy-forge:workflows:forge-hero-section* or */forge-cta* for individual section updates anytime.
  </say>

  <action>Workflow complete</action>
</check>

</step>

</workflow>
