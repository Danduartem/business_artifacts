# Validate Persona - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/persona-forge/workflows/validate-persona/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the validation process</critical>

<workflow>

<step n="1" goal="Load persona and determine validation scope">
<action>Welcome {user_name} to the Persona Validation workflow</action>

<action>Explain the validation workflow:
This workflow validates existing persona documents against industry best practices and Persona Forge standards. You can validate:

1. **Personas created outside Persona Forge** - Check if they meet quality standards
2. **Older Persona Forge personas** - Validate they still meet current standards
3. **Imported or inherited personas** - Quality check before using in your go-to-market

Validation types:
- **Quick Validation** (5 min) - Core structure and completeness check
- **Standard Validation** (10 min) - Full quality assessment against best practices
- **Deep Validation with Research** (20 min) - Includes current market data validation
</action>

<ask response="persona_file_path">Which persona document would you like to validate? (Provide the file path)</ask>

<action>Load existing persona document from provided path</action>
<action>Parse persona metadata and structure</action>
<action>Detect persona format (Persona Forge format, other standard format, custom format)</action>

<action>Display persona summary:
- Persona Name: {{persona_name}}
- Format Detected: {{format_type}}
- Sections Found: {{sections_list}}
- Last Updated: {{last_updated}} (if available)
- Estimated Completeness: {{completeness_percent}}%
</action>

<ask>What type of validation would you like?
1. **Quick Validation** - Core structure and completeness (5 min) [quick]
2. **Standard Validation** - Full quality assessment (10 min) [standard]
3. **Deep Validation + Research** - Quality + current market validation (20 min) [deep]
</ask>

<action>Store validation_type</action>

<check if="validation_type == 'deep'">
  <action>Set include_research = true</action>
  <action>Note: This will include Market Intelligence Analyst research validation</action>
</check>

<template-output>loaded_persona, validation_type</template-output>
</step>

<step n="2" goal="Senior Persona Specialist validates quality">
<action>Transition to Senior Persona Specialist</action>

<check if="validation_type == 'quick'">
  <action>Explain: "The Senior Persona Specialist will now conduct a quick validation focusing on structure and completeness. This takes 5 minutes."</action>
</check>

<check if="validation_type == 'standard'">
  <action>Explain: "The Senior Persona Specialist will now conduct a comprehensive quality validation against industry best practices. This takes 10 minutes."</action>
</check>

<check if="validation_type == 'deep'">
  <action>Explain: "The Senior Persona Specialist will conduct comprehensive quality validation, then the Market Intelligence Analyst will validate against current market data. This takes 15-20 minutes total."</action>
</check>

<action>Load Senior Persona Specialist agent context: {senior_persona_specialist}</action>

<action>Pass persona document to Specialist with validation scope</action>

<check if="validation_type == 'quick'">
  <action>Senior Persona Specialist executes Quick Validation:
  1. Verifies core structure (demographics, psychographics, pain points, goals)
  2. Checks completeness of critical sections
  3. Identifies obvious gaps or missing information
  4. Provides high-level assessment (Pass/Needs Work/Incomplete)
  5. Lists priority issues to address
  </action>
</check>

<check if="validation_type == 'standard' or validation_type == 'deep'">
  <action>Senior Persona Specialist executes Standard Validation:
  1. Runs comprehensive quality validation checklist
  2. Assesses actionability for go-to-market teams
  3. Checks industry best practices compliance
  4. Evaluates depth and specificity (are descriptions generic or specific?)
  5. Verifies narrative coherence (does the persona make sense as a whole person?)
  6. Checks for evidence grounding (assumptions vs. validated insights)
  7. Assesses qualification readiness (can sales use this to identify prospects?)
  8. Evaluates awareness journey integration (if applicable)
  9. Identifies strengths and weaknesses
  10. Provides detailed improvement recommendations
  11. Assigns quality score (0-100) with breakdown by category
  </action>
</check>

<action>Specialist generates validation report with:
- Overall Assessment: {{assessment}}
- Quality Score: {{score}}/100 (if standard/deep)
- Strengths Identified: {{strengths_list}}
- Issues Found: {{issues_list}} (categorized by severity: Critical/Important/Minor)
- Specific Recommendations: {{recommendations}}
- Comparison to Persona Forge Standards: {{gap_analysis}}
</action>

<template-output>specialist_validation_report</template-output>
</step>

<step n="3" goal="Market Intelligence Analyst validates research (if deep validation)">

<check if="validation_type == 'deep'">
  <action>Transition to Market Intelligence Analyst</action>

  <action>Explain: "Now the Market Intelligence Analyst will validate the persona against current market data to ensure it reflects today's reality."</action>

  <action>Load Market Intelligence Analyst agent context: {market_intelligence_analyst}</action>

  <action>Pass persona document to Analyst</action>

  <action>Market Intelligence Analyst executes Research Validation:
  1. Identifies key claims in persona (demographics, behaviors, pain points, preferences)
  2. Conducts targeted research to validate claims against current market data
  3. Flags outdated information (market has changed since persona creation)
  4. Flags unverified assumptions (claims without evidence)
  5. Provides current market context for validation
  6. Cites sources for validation findings
  7. Assigns confidence levels to persona sections (high/medium/low confidence)
  8. Recommends updates based on current market reality
  </action>

  <action>Analyst generates research validation report:
  - Validated Claims: {{validated_list}}
  - Outdated Information: {{outdated_list}}
  - Unverified Assumptions: {{assumptions_list}}
  - Confidence Levels by Section: {{confidence_map}}
  - Market Context Updates: {{market_updates}}
  - Recommended Revisions: {{revision_recommendations}}
  </action>

  <template-output>analyst_research_validation</template-output>
</check>

<check if="validation_type != 'deep'">
  <action>Skip research validation step</action>
</check>

</step>

<step n="4" goal="Present validation results to user">
<action>Present comprehensive validation results to {user_name}</action>

<action>Display validation report summary:
- Overall Assessment: {{assessment}}
- Quality Score: {{score}}/100 (if applicable)
- Critical Issues: {{critical_count}}
- Important Issues: {{important_count}}
- Minor Issues: {{minor_count}}
</action>

<check if="validation_type == 'deep'">
  <action>Display research validation summary:
  - Market Alignment: {{alignment_status}}
  - Outdated Elements: {{outdated_count}}
  - Confidence Level: {{overall_confidence}}
  </action>
</check>

<action>Present top 3-5 priority improvements</action>

<ask>What would you like to do with these validation results?
1. **Review detailed report** [review]
2. **Fix issues using Update Workflow** [fix]
3. **Save validation report and exit** [save]
4. **Discuss specific issues** [discuss]
</ask>

<check if="review">
  <action>Display full validation report with all details</action>
  <action>Show issue-by-issue breakdown with recommendations</action>
  <check if="validation_type == 'deep'">
    <action>Show research validation details</action>
  </check>
  <ask>Ready to proceed? [fix/save/discuss]</ask>
</check>

<check if="fix">
  <action>Explain: "I'll route you to the Update Persona workflow to address these issues systematically."</action>
  <ask>The Update Workflow will help you apply the recommended improvements. Ready to proceed? [y/n]</ask>
  <check if="yes">
    <action>Save validation report for reference during update</action>
    <action>Transition to Update Persona workflow with validation context</action>
    <goto workflow="{project-root}/bmad/persona-forge/workflows/update-persona/workflow.yaml">
      Pass: persona_file_path, validation_report, priority_issues
    </goto>
  </check>
</check>

<check if="discuss">
  <action>Facilitate discussion about specific validation findings</action>
  <action>Clarify why certain issues matter for go-to-market effectiveness</action>
  <action>Explain Persona Forge standards and best practices</action>
  <ask>After discussion, what would you like to do? [fix/save]</ask>
</check>

<check if="save">
  <action>Generate final validation report document</action>
  <action>Save report to: {validation_report_file}</action>
  <action>Provide next steps guidance</action>
</check>

<template-output>validation_completion</template-output>
</step>

<step n="5" goal="Provide guidance on next steps">
<action>Provide guidance based on validation results</action>

<check if="critical_count > 0">
  <action>Explain: "Your persona has {{critical_count}} critical issue(s) that significantly impact its effectiveness. I strongly recommend addressing these before using this persona in live campaigns or sales qualification."</action>

  <action>Show critical issues with context:
  - Why each issue matters
  - Impact on go-to-market effectiveness
  - How to fix (quick guidance)
  </action>

  <action>Recommend: "Use the Update Persona workflow to systematically address these issues, or consider creating a new persona using the Create Personas workflow if extensive rework is needed."</action>
</check>

<check if="critical_count == 0 and important_count > 0">
  <action>Explain: "Your persona meets minimum quality standards but has {{important_count}} important improvement(s) that would increase its effectiveness."</action>

  <action>Recommend: "You can use this persona now, but schedule time to address the important issues to improve team clarity and campaign performance. The Update Persona workflow can help."</action>
</check>

<check if="critical_count == 0 and important_count == 0">
  <action>Celebrate: "Excellent! Your persona meets Persona Forge quality standards."</action>

  <check if="minor_count > 0">
    <action>Note: "There are {{minor_count}} minor improvements you could make for polish, but these won't significantly impact effectiveness."</action>
  </check>

  <action>Recommend: "Your persona is ready for use. Consider setting up quarterly reviews to keep it current with market changes."</action>
</check>

<check if="validation_type == 'deep' and outdated_count > 0">
  <action>Highlight: "The research validation found {{outdated_count}} outdated element(s). Markets change quickly - consider updating these to reflect current reality."</action>
</check>

<action>Remind about validation report location: {validation_report_file}</action>

<ask>Would you like to:
1. **Validate another persona** [validate-another]
2. **Update this persona now** [update]
3. **Complete and exit** [exit]
</ask>

<check if="validate-another">
  <action>Return to Step 1 with new persona</action>
</check>

<check if="update">
  <action>Transition to Update Persona workflow</action>
  <goto workflow="{project-root}/bmad/persona-forge/workflows/update-persona/workflow.yaml">
    Pass: persona_file_path, validation_report
  </goto>
</check>

<check if="exit">
  <action>Final encouragement</action>
  <action>Remind about validation report location</action>
  <action>Suggest regular validation (quarterly or when market shifts)</action>
</check>

<template-output>completion_message</template-output>
</step>

</workflow>

## Validation Scope by Type

### Quick Validation (5 min)
**Focus:** Structure and completeness
- Core sections present? (demographics, psychographics, pain points, goals)
- Critical information included?
- Obvious gaps or missing data?
- Pass/Fail assessment with priority fixes

### Standard Validation (10 min)
**Focus:** Quality and actionability
- All elements of Quick Validation PLUS:
- Industry best practices compliance
- Actionability for go-to-market teams
- Depth and specificity (not generic)
- Narrative coherence
- Evidence grounding
- Qualification readiness
- Quality score (0-100) with detailed feedback

### Deep Validation (20 min)
**Focus:** Quality + market reality
- All elements of Standard Validation PLUS:
- Market Intelligence Analyst research validation
- Claims validated against current market data
- Outdated information flagged
- Unverified assumptions identified
- Confidence levels assigned
- Market context updates provided

## Quality Scoring Breakdown (Standard/Deep only)

**Score Components:**
- Completeness (0-20 points): All critical sections present and filled
- Depth & Specificity (0-20 points): Detailed, not generic descriptions
- Actionability (0-20 points): Useful for go-to-market teams
- Evidence Grounding (0-20 points): Claims supported by data/research
- Narrative Coherence (0-20 points): Persona makes sense as unified character

**Quality Tiers:**
- 90-100: Excellent - Persona Forge gold standard
- 75-89: Good - Meets professional standards, minor improvements possible
- 60-74: Adequate - Usable but needs improvements for optimal effectiveness
- 40-59: Needs Work - Significant gaps impacting go-to-market effectiveness
- 0-39: Incomplete - Not ready for use, requires major rework

## Issue Severity Definitions

**Critical Issues:**
- Missing core demographic or psychographic information
- Generic/vague descriptions (could describe anyone)
- No evidence grounding (pure assumptions)
- Contradictory information
- Not actionable for go-to-market teams
- **Impact:** Persona unusable or misleading for campaigns/sales

**Important Issues:**
- Incomplete sections (present but shallow)
- Moderate specificity (somewhat generic)
- Weak evidence grounding
- Limited actionability
- **Impact:** Reduces persona effectiveness, causes team confusion

**Minor Issues:**
- Formatting inconsistencies
- Could use more examples
- Minor wording improvements
- Optional enhancements
- **Impact:** Polish and refinement, not blocking usage

