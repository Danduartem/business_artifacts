# Forge CTA Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/copy-forge/workflows/forge-cta/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the workflow</critical>

<workflow>

<action>Initialize refinement_count = 0</action>

<step n="1" goal="Welcome and Context Gathering">

<say>
Welcome to the CTA Forge, {user_name}! 🎯

I'm going to guide you through creating a call-to-action that converts interest into commitment through clear next steps, friction reduction, and authentic urgency.

This workflow will:
1. Gather your inputs (brand voice, avatar, desired action, urgency level)
2. Invoke our CTA Specialist to craft conversion-optimized copy
3. Validate through Brand Voice Guardian (7 criteria)
4. Validate through Avatar Advocate (8 criteria - especially objection handling)
5. Present validated CTA with scores and refinement options

Let's forge a CTA that turns readers into action-takers!
</say>

<ask response="creation_mode">Are you:
A) Creating a NEW CTA from scratch
B) Optimizing an EXISTING CTA

Enter A or B:
</ask>

<check if="creation_mode == B">
  <ask response="existing_cta_copy">Please provide your existing CTA copy:</ask>
  <ask response="refinement_goal">What needs improvement? (reduce friction, handle objections, adjust urgency, etc.)</ask>
</check>

<template-output>creation_mode, existing_cta_copy, refinement_goal</template-output>

</step>

<step n="2" goal="Gather Brand Voice Document">

<action>Check brand_voice_folder for available documents</action>

<check if="brand voice files found">
  <ask response="brand_voice_selection">
I found these brand voice documents:
[List files]

Which should I use?
  </ask>
</check>

<check if="no files found">
  <ask response="brand_voice_path">Please provide path to brand voice document:</ask>
</check>

<action>Load and parse brand voice document</action>

<check if="cannot load">
  <say>Cannot load brand voice. Let me help you create one...</say>
  <action>Offer templates and examples</action>
</check>

<template-output>brand_voice_document_path, brand_voice_document</template-output>

</step>

<step n="3" goal="Gather Avatar Profile">

<action>Check for default_avatar_profile or list available profiles</action>

<ask response="avatar_selection">
[If default exists] Use default avatar {default_avatar_profile}? (y/n)
[If no default] Available avatars: [List files]

Which avatar to target?
</ask>

<action>Load avatar profile</action>

<critical>Pay special attention to:
- Avatar objections (critical for CTAs)
- Decision-making process
- Trust/credibility needs
- Hesitations and concerns
</critical>

<template-output>avatar_profile_path, avatar_profile</template-output>

</step>

<step n="4" goal="Gather CTA Creative Brief">

<ask response="desired_action">What is the desired action? What should users DO?

Examples:
- "Enroll in mentorship program"
- "Book discovery call"
- "Download free guide"
- "Purchase course"
- "Start free trial"

Desired action:
</ask>

<ask response="urgency_level">What is the genuine urgency level for this offer?

A) No urgency - ongoing availability
B) Authentic deadline (enrollment closes on specific date)
C) Limited capacity (only X spots available - must be true!)
D) Seasonal/special offer with real end date

⚠️ IMPORTANT: Only use urgency that is genuinely true. Fake scarcity destroys trust.

Enter A, B, C, or D:
</ask>

<check if="urgency_level == B or C or D">
  <ask response="urgency_details">Please provide details:
[If B] What is the specific deadline?
[If C] How many spots are actually available?
[If D] What is the offer and when does it truly end?

Details:
  </ask>
</check>

<ask response="conversion_context">What is the conversion context?

A) Low commitment (email, download, watch video)
B) Medium commitment (book call, start trial, attend event)
C) High commitment (purchase, enroll, invest)

Enter A, B, or C:
</ask>

<action>Package inputs into creative brief for CTA Specialist</action>

<template-output>desired_action, urgency_level, urgency_details, conversion_context</template-output>

</step>

<step n="5" goal="Invoke CTA Specialist to Create Copy">

<say>
Perfect! Bringing this to The Action Forge (CTA Specialist) to forge your call-to-action...

📋 Creative Brief:
- Brand voice: [brand voice doc]
- Target avatar: [avatar name]
- Desired action: [desired_action]
- Urgency level: [urgency_level]
- Conversion context: [conversion_context]

Forging CTA now... 🎯
</say>

<action>Invoke CTA Specialist with creative brief</action>

<critical>CTA Specialist Process:
1. Analyze desired action and conversion context
2. Identify friction points and avatar objections
3. Craft primary CTA button text (test 3-5 variations)
4. Create supporting microcopy
5. Build friction-reduction elements
6. Add authentic urgency (if genuine)
7. Design alternative CTAs (if needed)
8. Self-review before submission
</critical>

<action>Receive CTA section from CTA Specialist:
- Primary CTA button text
- Supporting copy
- Friction-reduction elements
- Urgency elements (if applicable)
- Alternative CTAs (if needed)
- Strategic rationale
</action>

<template-output>cta_button_text, cta_supporting_copy, friction_elements, urgency_copy, alternative_ctas, cta_rationale</template-output>

</step>

<step n="6" goal="Sequential Validation - Brand Voice Guardian">

<say>
CTA forged! Here's what The Action Forge created:

---
**PRIMARY CTA BUTTON:**
"[cta_button_text]"

**SUPPORTING COPY:**
[cta_supporting_copy]

**FRICTION-REDUCTION ELEMENTS:**
[friction_elements]

**URGENCY:** [urgency_copy or "N/A - ongoing availability"]

**ALTERNATIVE CTA:** [alternative_ctas or "N/A"]
---

Sending to Brand Voice Guardian for validation...
</say>

<action>Invoke Brand Voice Guardian with CTA copy and brand voice document</action>

<action>Receive validation: APPROVED or NEEDS REVISION with score and feedback</action>

<check if="APPROVED">
  <say>
✅ **BRAND VOICE VALIDATION: PASSED** ([brand_voice_score])
Proceeding to audience validation...
  </say>
</check>

<check if="NEEDS REVISION">
  <say>
⚠️ **BRAND VOICE VALIDATION: NEEDS REVISION** ([brand_voice_score])

Issues flagged:
[List issues]

Refine with:
A) Send back to CTA Specialist
B) Continue anyway (not recommended)
C) Manual refinement

Your choice:
  </say>

  <ask response="voice_action">Enter A, B, or C:</ask>

  <check if="voice_action == A">
    <action>Increment refinement_count</action>
    <action>Refinement loop with CTA Specialist</action>
    <check if="refinement_count >= max_refinement_iterations">
      <say>⚠️ Reached maximum refinement iterations ({max_refinement_iterations}). Proceeding with current version or manual intervention required.</say>
    </check>
  </check>
</check>

<template-output>brand_voice_validation_result, brand_voice_score, brand_voice_feedback</template-output>

</step>

<step n="7" goal="Sequential Validation - Avatar Advocate">

<say>
Sending to Avatar Advocate for audience resonance validation (especially objection handling)...
</say>

<action>Invoke Avatar Advocate with CTA copy and avatar profile</action>

<critical>Avatar Advocate pays special attention to:
- Objection Handling (criterion #4) - Are avatar concerns addressed?
- Trust Building (criterion #8) - Does CTA reduce risk perception?
- Language Match (criterion #1) - Does CTA use avatar's action language?
</critical>

<action>Receive validation: RESONATES or NEEDS REVISION with score and feedback</action>

<check if="RESONATES">
  <say>
✅ **AUDIENCE RESONANCE VALIDATION: PASSED** ([audience_score])

🎉 **CTA FULLY VALIDATED!**

Brand Voice: [brand_voice_score]
Audience Resonance: [audience_score]
Objection Handling: ✓

Proceeding to final presentation...
  </say>
</check>

<check if="NEEDS REVISION">
  <say>
⚠️ **AUDIENCE RESONANCE: NEEDS REVISION** ([audience_score])

Avatar disconnects (from [avatar name]'s perspective):
[List issues]

Refine with:
A) Send back to CTA Specialist
B) Accept as-is
C) Manual refinement

Your choice:
  </say>

  <ask response="audience_action">Enter A, B, or C:</ask>

  <check if="audience_action == A">
    <action>Increment refinement_count</action>
    <action>Refinement loop through both validators</action>
    <check if="refinement_count >= max_refinement_iterations">
      <say>⚠️ Reached maximum refinement iterations ({max_refinement_iterations}). Proceeding with current version or manual intervention required.</say>
    </check>
  </check>
</check>

<template-output>audience_validation_result, audience_score, audience_feedback, objection_handling_score</template-output>

</step>

<step n="8" goal="Present Final Validated CTA">

<say>
═══════════════════════════════════════
        CTA FORGED & VALIDATED
═══════════════════════════════════════

**PRIMARY CTA BUTTON:**
"[cta_button_text]"

**SUPPORTING COPY:**
[cta_supporting_copy]

**FRICTION-REDUCTION:**
[friction_elements]

**URGENCY:**
[urgency_copy or "None - ongoing availability"]

**ALTERNATIVE CTA:**
[alternative_ctas or "Single path recommended"]

─────────────────────────────────────

**VALIDATION SCORES:**

✓ Brand Voice: [brand_voice_score]
✓ Audience Resonance: [audience_score]
✓ Objection Handling: [specific score if available]

**STRATEGIC APPROACH:**
[cta_rationale]

═══════════════════════════════════════
</say>

<check if="auto_save_output == true">
  <action>Save CTA to {cta_output_file}</action>
  <say>✅ CTA saved to: {cta_output_file}</say>
</check>

<check if="generate_validation_report == true">
  <action>Generate validation report</action>
  <action>Save to {validation_report_file}</action>
  <say>📊 Validation report saved to: {validation_report_file}</say>
</check>

<template-output>final_cta, output_file_path, refinement_count</template-output>

</step>

<step n="9" goal="Offer Next Actions">

<ask response="next_action">
What would you like to do next?

A) Optimize CTA further (reduce friction, test urgency levels)
B) Create alternative CTA for different readiness levels
C) Export/copy CTA to clipboard
D) Generate another section (hero, story, etc.)
E) Complete - I'm done

Enter A, B, C, D, or E:
</ask>

<check if="next_action == A">
  <ask response="optimization_focus">
What to optimize?

1. Reduce friction further
2. Test different urgency levels
3. Improve button text clarity
4. Add more objection pre-handling
5. Other

Your choice:
  </ask>
  <action>Increment refinement_count</action>
  <action>Send to CTA Specialist for targeted optimization</action>
  <action>Re-validate optimized version</action>
</check>

<check if="next_action == B">
  <action>Invoke CTA Specialist's *multi-cta-strategy command</action>
  <action>Create CTAs for high/medium/low readiness users</action>
  <action>Present multi-CTA strategy with placement recommendations</action>
</check>

<check if="next_action == C">
  <action>Format CTA for export</action>
  <say>
═══════════════════════════
   CTA - READY TO COPY
═══════════════════════════

[Clean formatted version]

═══════════════════════════
  </say>
</check>

<check if="next_action == D">
  <say>Available workflows:
- Hero section: */bmad:copy-forge:workflows:forge-hero-section*
- Complete LP: */bmad:copy-forge:agents:blueprint-coordinator* then *forge-complete-lp
  </say>
</check>

<check if="next_action == E">
  <say>
Excellent! Your CTA is forged and validated.

Scores:
- Brand Voice: [brand_voice_score]
- Audience Resonance: [audience_score]
- Saved to: {cta_output_file}

May it forge action without friction! 🎯
  </say>
</check>

</step>

</workflow>
