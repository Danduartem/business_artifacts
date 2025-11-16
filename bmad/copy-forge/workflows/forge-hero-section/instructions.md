# Forge Hero Section Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/copy-forge/workflows/forge-hero-section/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the workflow</critical>

<workflow>

<action>Initialize refinement_count = 0</action>

<step n="1" goal="Welcome and Context Gathering">

<action>Present warm welcome from Copy Forge with forge metaphor energy</action>

<say>
Welcome to the Hero Section Forge, {user_name}! ⚡

I'm going to guide you through creating a scroll-stopping hero section (headline + subheadline + opening hook) that passes sequential validation for both brand voice authenticity and audience resonance.

This workflow will:
1. Gather your inputs (brand voice, avatar, value proposition)
2. Invoke our Hero Writer specialist to craft compelling copy
3. Validate through Brand Voice Guardian (7 criteria)
4. Validate through Avatar Advocate (8 criteria)
5. Present validated copy with scores and refinement options

Let's forge a hero section that creates immediate connections!
</say>

<action>Check if this is a regeneration of existing copy vs new creation</action>

<ask response="creation_mode">Are you:
A) Creating a NEW hero section from scratch
B) Regenerating/refining an EXISTING hero section

Enter A or B:
</ask>

<check if="creation_mode == B">
  <ask response="existing_hero_copy">Please provide your existing hero section copy that needs refinement:</ask>
  <ask response="refinement_goal">What specifically needs to change? (more punch, different angle, clarity, etc.)</ask>
  <action>Store existing copy and refinement goal for Hero Writer context</action>
</check>

<template-output>creation_mode, existing_hero_copy (if B), refinement_goal (if B)</template-output>

</step>

<step n="2" goal="Gather Brand Voice Document">

<action>Check if default brand voice is configured in config.yaml</action>

<check if="brand voice folder has files">
  <action>List available brand voice documents in {brand_voice_folder}</action>
  <ask response="brand_voice_selection">
I found these brand voice documents:
[List files in brand_voice_folder]

Which brand voice should I use? (Enter filename or path, or type "new" to provide a different path):
  </ask>
</check>

<check if="no brand voice files found">
  <ask response="brand_voice_path">Please provide the path to your brand voice document (tone, vocabulary, style, personality guidelines):</ask>
</check>

<action>Load brand voice document from selected/provided path</action>
<action>Parse and internalize: tone, vocabulary, sentence structure, personality, messaging, emotional tone</action>

<check if="brand voice document cannot be read or is invalid">
  <say>I couldn't load the brand voice document. Let me help you create one or point you to templates.</say>
  <action>Offer to show TEMPLATE-brand-voice.md or example brand voice documents</action>
  <action>Wait for user to provide valid brand voice document before proceeding</action>
</check>

<template-output>brand_voice_document_path, brand_voice_document, brand_voice_loaded</template-output>

</step>

<step n="3" goal="Gather Avatar Profile">

<action>Check if default avatar is configured in config.yaml</action>

<check if="default_avatar_profile is set in config">
  <ask response="use_default_avatar">I found a default avatar profile configured: {default_avatar_profile}

Use this avatar? (y/n):
  </ask>

  <check if="use_default_avatar == y">
    <action>Load default avatar profile</action>
  </check>

  <check if="use_default_avatar == n">
    <ask response="avatar_path">Please provide the path to the avatar profile you want to use:</ask>
    <action>Load avatar from provided path</action>
  </check>
</check>

<check if="no default avatar configured">
  <action>List available avatar profiles in {avatars_folder}</action>
  <ask response="avatar_selection">
I found these avatar profiles:
[List files in avatars_folder]

Which avatar should I target? (Enter filename or path, or type "new" to provide a different path):
  </ask>
  <action>Load selected avatar profile</action>
</check>

<action>Parse and internalize avatar: demographics, pain points, desires, language patterns, objections, emotional state</action>

<check if="avatar profile cannot be read or is invalid">
  <say>I couldn't load the avatar profile. Let me help you create one or point you to templates.</say>
  <action>Offer to show TEMPLATE-avatar-profile.md or example avatar profiles</action>
  <action>Wait for user to provide valid avatar profile before proceeding</action>
</check>

<template-output>avatar_profile_path, avatar_profile, avatar_loaded</template-output>

</step>

<step n="4" goal="Gather Creative Brief Details">

<action>Collect remaining inputs needed for Hero Writer</action>

<ask response="value_proposition">What is the core value proposition or transformation this hero section should communicate?

(e.g., "From 16-hour days to 4-hour weeks without sacrificing revenue" or "10x results with 10x less effort")

Value proposition:
</ask>

<ask response="word_count_target">What word count should I target for the complete hero section (headline + subheadline + opening hook)?

Typical range: 50-150 words
Recommended: 80-120 words

Target word count:
</ask>

<ask response="strategic_angle">Do you have a preferred strategic angle for the headline?

A) Benefit-driven ("Get [specific benefit] for [avatar]")
B) Transformation-focused ("From [pain] to [desired state]")
C) Problem-agitation ("You're [doing thing] and [negative result]")
D) Curiosity-driven ("[Surprising truth] that [result]")
E) Surprise me - let Hero Writer choose best fit

Enter A, B, C, D, or E:
</ask>

<action>Package all gathered inputs into creative brief for Hero Writer</action>

<template-output>value_proposition, word_count_target, strategic_angle, creative_brief_complete</template-output>

</step>

<step n="5" goal="Invoke Hero Writer to Create Copy">

<action>Present status update with forge metaphor</action>

<say>
Excellent! I have everything I need. Let me bring this to The Hook Smith (Hero Writer) to forge your hero section...

📋 Creative Brief:
- Brand voice: [brand voice doc name]
- Target avatar: [avatar name]
- Value proposition: [value_proposition]
- Word count target: [word_count_target]
- Strategic angle: [strategic_angle]

Forging hero section now... ⚡
</say>

<action>Invoke Hero Writer agent with creative brief</action>

<critical>Hero Writer Process:
1. Deep analysis of brand voice + avatar
2. Strategic framework selection
3. Headline creation (test 3-5 variations)
4. Subheadline crafting
5. Opening hook writing
6. Word count optimization
7. Self-review before submission
</critical>

<action>Receive hero section from Hero Writer:
- Headline
- Subheadline
- Opening hook
- Word count (actual vs target)
- Strategic rationale
</action>

<template-output>hero_headline, hero_subheadline, hero_opening_hook, hero_word_count, hero_rationale</template-output>

</step>

<step n="6" goal="Sequential Validation - Brand Voice Guardian">

<action>Present copy to user before validation</action>

<say>
Hero section forged! Here's what The Hook Smith created:

---
**HEADLINE:**
[hero_headline]

**SUBHEADLINE:**
[hero_subheadline]

**OPENING HOOK:**
[hero_opening_hook]

**WORD COUNT:** [hero_word_count] (Target: [word_count_target])
---

Now sending to Brand Voice Guardian for authenticity validation (7 criteria)...
</say>

<action>Invoke Brand Voice Guardian agent with:
- Hero section copy
- Brand voice document
- Creative brief context
</action>

<critical>Brand Voice Guardian validates against 7 criteria:
1. Tone Alignment
2. Vocabulary Choices
3. Sentence Structure/Rhythm
4. Personality Expression
5. Messaging Consistency
6. Authenticity Check
7. Emotional Resonance

ALL 7 must pass for approval.
</critical>

<action>Receive Brand Voice Guardian validation results:
- Overall decision: APPROVED or NEEDS REVISION
- Score: X/7 criteria passed (X%)
- Flagged issues (if any)
- Detailed feedback (based on validation_detail_level)
</action>

<check if="Brand Voice Guardian APPROVED">
  <action>Store brand voice validation score</action>
  <say>
✅ **BRAND VOICE VALIDATION: PASSED**
Score: [X/7] ([X%])

Brand Voice Guardian says: "This copy demonstrates authentic brand voice alignment. Advancing to Avatar Advocate for audience validation."

Proceeding to audience resonance validation...
  </say>
  <action>Proceed to Step 7</action>
</check>

<check if="Brand Voice Guardian NEEDS REVISION">
  <action>Present flagged issues to user</action>
  <say>
⚠️ **BRAND VOICE VALIDATION: NEEDS REVISION**
Score: [X/7] ([X%])

Brand Voice Guardian flagged these issues:

[List all flagged issues with Issue/Why/Suggestion/Example format from Guardian]

Would you like me to:
A) Send back to Hero Writer for refinement based on this feedback
B) Continue to audience validation anyway (not recommended - voice breaks destroy trust)
C) You'll manually refine the copy yourself

Enter A, B, or C:
  </say>

  <ask response="voice_validation_action">Your choice:</ask>

  <check if="voice_validation_action == A">
    <action>Increment refinement_count</action>
    <action>Send copy + Guardian feedback back to Hero Writer</action>
    <action>Hero Writer refines copy based on flagged issues</action>
    <action>Receive refined hero section</action>
    <action>Send refined copy back to Brand Voice Guardian for re-validation</action>
    <action>Continue validation loop until approval or max_refinement_iterations reached</action>
    <check if="refinement_count >= max_refinement_iterations">
      <say>⚠️ Reached maximum refinement iterations ({max_refinement_iterations}). Proceeding with current version or manual intervention required.</say>
    </check>
  </check>

  <check if="voice_validation_action == B">
    <say>Proceeding to audience validation, but note that voice misalignment may undermine audience resonance...</say>
    <action>Proceed to Step 7 with current copy</action>
  </check>

  <check if="voice_validation_action == C">
    <action>Increment refinement_count</action>
    <ask response="manual_refinement">Please provide your manually refined hero section:</ask>
    <action>Update hero section copy with manual refinement</action>
    <action>Send to Brand Voice Guardian for re-validation</action>
  </check>
</check>

<template-output>brand_voice_validation_result, brand_voice_score, brand_voice_feedback</template-output>

</step>

<step n="7" goal="Sequential Validation - Avatar Advocate">

<say>
Now sending to Avatar Advocate for audience resonance validation (8 criteria from avatar perspective)...
</say>

<action>Invoke Avatar Advocate agent with:
- Hero section copy (voice-approved)
- Avatar profile
- Creative brief context
</action>

<critical>Avatar Advocate validates from avatar POV against 8 criteria:
1. Language Match (uses words they actually use)
2. Pain Point Resonance (acknowledges their struggles)
3. Desire Alignment (speaks to what they want)
4. Objection Handling (pre-addresses concerns)
5. Clarity for Audience Level (appropriate sophistication)
6. Relatability (written FOR them specifically)
7. Emotional Connection (triggers right emotions)
8. Trust Building (addresses skepticism)

ALL 8 must pass for approval.
</critical>

<action>Receive Avatar Advocate validation results:
- Overall decision: RESONATES or NEEDS REVISION
- Score: X/8 criteria passed (X%)
- Flagged disconnects (if any)
- Avatar-perspective feedback (based on validation_detail_level)
</action>

<check if="Avatar Advocate RESONATES">
  <action>Store audience resonance score</action>
  <say>
✅ **AUDIENCE RESONANCE VALIDATION: PASSED**
Score: [X/8] ([X%])

Avatar Advocate says (as [Avatar Name]): "This copy resonates with me. I feel seen, understood, and compelled. This speaks to ME specifically."

🎉 **HERO SECTION FULLY VALIDATED!**

Brand Voice Alignment: [brand_voice_score]
Audience Resonance: [audience_score]
Overall Quality: APPROVED ✓

Proceeding to final presentation...
  </say>
  <action>Proceed to Step 8</action>
</check>

<check if="Avatar Advocate NEEDS REVISION">
  <action>Present flagged disconnects to user</action>
  <say>
⚠️ **AUDIENCE RESONANCE VALIDATION: NEEDS REVISION**
Score: [X/8] ([X%])

Avatar Advocate flagged these disconnects (from avatar perspective):

[List all flagged issues with Avatar POV/Why it matters/Suggestion/Example from Advocate]

Would you like me to:
A) Send back to Hero Writer for refinement based on avatar feedback
B) Accept copy as-is (passed voice, needs audience work)
C) You'll manually refine the copy yourself

Enter A, B, or C:
  </say>

  <ask response="audience_validation_action">Your choice:</ask>

  <check if="audience_validation_action == A">
    <action>Increment refinement_count</action>
    <action>Send copy + Advocate feedback back to Hero Writer</action>
    <action>Hero Writer refines copy based on avatar disconnects</action>
    <action>Receive refined hero section</action>
    <action>Re-validate through Brand Voice Guardian (ensure voice still aligned)</action>
    <action>Re-validate through Avatar Advocate</action>
    <action>Continue validation loop until both approve or max_refinement_iterations reached</action>
    <check if="refinement_count >= max_refinement_iterations">
      <say>⚠️ Reached maximum refinement iterations ({max_refinement_iterations}). Proceeding with current version or manual intervention required.</say>
    </check>
  </check>

  <check if="audience_validation_action == B">
    <say>Accepting copy with voice validation only. Note: audience resonance gaps may affect conversion...</say>
    <action>Proceed to Step 8 with current copy</action>
  </check>

  <check if="audience_validation_action == C">
    <action>Increment refinement_count</action>
    <ask response="manual_audience_refinement">Please provide your manually refined hero section:</ask>
    <action>Update hero section copy</action>
    <action>Re-validate through both Guardian and Advocate</action>
  </check>
</check>

<template-output>audience_validation_result, audience_score, audience_feedback</template-output>

</step>

<step n="8" goal="Present Final Validated Hero Section">

<action>Generate complete hero section presentation with validation scores</action>

<say>
═══════════════════════════════════════
     HERO SECTION FORGED & VALIDATED
═══════════════════════════════════════

**HEADLINE:**
[hero_headline]

**SUBHEADLINE:**
[hero_subheadline]

**OPENING HOOK:**
[hero_opening_hook]

─────────────────────────────────────

**VALIDATION SCORES:**

✓ Brand Voice Alignment: [brand_voice_score]
  [7-criteria breakdown if detail_level is standard or comprehensive]

✓ Audience Resonance: [audience_score]
  [8-criteria breakdown if detail_level is standard or comprehensive]

**WORD COUNT:** [actual] words (Target: [target] words)

**STRATEGIC APPROACH:**
[hero_rationale from Hero Writer]

═══════════════════════════════════════
</say>

<action>Save hero section to output file if auto_save_output is true</action>

<check if="auto_save_output == true">
  <action>Save complete hero section to {hero_output_file}</action>
  <say>
✅ Hero section saved to: {hero_output_file}
  </say>
</check>

<action>Generate validation report if generate_validation_report is true</action>

<check if="generate_validation_report == true">
  <action>Create comprehensive validation report with:
    - Complete hero section copy
    - Brand Voice Guardian scorecard (7 criteria)
    - Avatar Advocate scorecard (8 criteria)
    - Detailed feedback from both validators
    - Strategic rationale
    - Timestamp and version info
  </action>
  <action>Save validation report to {validation_report_file}</action>
  <say>
📊 Validation report saved to: {validation_report_file}
  </say>
</check>

<template-output>final_hero_section, output_file_path, validation_report_path, refinement_count</template-output>

</step>

<step n="9" goal="Offer Next Actions">

<ask response="next_action">
What would you like to do next?

A) Refine this hero section further (iterate on specific elements)
B) Test alternative hooks (generate variations with different frameworks)
C) Export/copy hero section to clipboard
D) Generate another section (CTA, story, etc.)
E) Complete - I'm done with this hero section

Enter A, B, C, D, or E:
</ask>

<check if="next_action == A">
  <ask response="refinement_request">What would you like to refine?

1. Make headline more punchy
2. Simplify for clarity
3. Change strategic angle
4. Adjust tone/energy
5. Other (specify)

Your choice:
  </ask>
  <action>Increment refinement_count</action>
  <action>Send refinement request to Hero Writer</action>
  <action>Re-run validation on refined version</action>
  <action>Return to Step 8 with refined hero</action>
</check>

<check if="next_action == B">
  <action>Invoke Hero Writer's *test-hooks command</action>
  <action>Generate 3-4 alternative hero section variations using different frameworks</action>
  <action>Present all variations with strategic rationale</action>
  <ask response="variation_selection">Which variation would you like to validate? (or keep original)</ask>
  <action>If new variation selected, run through validation steps 6-7</action>
</check>

<check if="next_action == C">
  <action>Format hero section for export (clean markdown or plain text)</action>
  <action>Present formatted copy for user to copy</action>
  <say>
═══════════════════════════
HERO SECTION - READY TO COPY
═══════════════════════════

[Clean formatted version ready for clipboard]

═══════════════════════════
  </say>
</check>

<check if="next_action == D">
  <ask response="next_section">Which section would you like to generate next?

- CTA (call-to-action)
- Story/narrative section
- Benefits section
- Other

(Note: CTA workflow is available now; others coming in Phase 2)
  </ask>
  <action>Guide to appropriate workflow or inform if not yet available</action>
</check>

<check if="next_action == E">
  <say>
Excellent work! Your hero section is forged and validated.

Remember:
- Brand Voice: [brand_voice_score]
- Audience Resonance: [audience_score]
- Saved to: {hero_output_file}

May it forge immediate connections with your audience! ⚡

Use */bmad:copy-forge:workflows:forge-cta* to generate your call-to-action next, or */bmad:copy-forge:agents:blueprint-coordinator* for complete landing pages.
  </say>
  <action>Workflow complete</action>
</check>

</step>

</workflow>
