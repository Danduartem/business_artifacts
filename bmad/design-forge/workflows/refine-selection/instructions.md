# Refine Selection - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/design-forge/workflows/refine-selection/workflow.yaml</critical>
<critical>Communicate with {user_name} in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Load target prototype and initialize/load state">
  <action>Greet {user_name} in {communication_language}</action>
  <action>Explain that this workflow iteratively refines a single prototype through conversational feedback</action>

  <action>Scan {prototype_output_folder} for *.html files</action>

  <check if="no prototypes found">
    <action>Display error: "No prototypes available to refine. Please run Design Director's *generate command first."</action>
    <action>Exit workflow</action>
  </check>

  <action>Display available prototypes with details</action>

  <ask>Which prototype would you like to refine, {user_name}?

Enter prototype number:</ask>

  <action>Store selection as {target_prototype}</action>
  <action>Extract prototype name (filename without extension) as {target_prototype_name}</action>

  <action>Load prototype HTML file from {target_prototype}</action>
  <action>Parse HTML structure and embedded CSS/styles</action>

  <action>Check if state file exists: {prototype_output_folder}/.refine-state-{target_prototype_name}.json</action>

  <check if="state file exists">
    <action>Load existing state file with:
- current_iteration (number)
- iteration_limit (default 3, max 5)
- refinement_history (array of previous iterations)
- original_file_path
- latest_refined_file_path
- cumulative_quality_changes</action>

    <action>Display to {user_name}: "Found existing refinement session (iteration {current_iteration}/{iteration_limit}). Continuing from latest version: {latest_refined_file_path}"</action>

    <action>Load the latest refined prototype (not the original)</action>
  </check>

  <check if="state file does not exist">
    <action>Create new state file with:
```json
{
  "original_file": "{target_prototype}",
  "current_iteration": 0,
  "iteration_limit": 3,
  "refinement_history": [],
  "latest_refined_file": "{target_prototype}",
  "created_at": "{date}",
  "cumulative_changes": {}
}
```</action>

    <ask>Maximum refinement iterations? (1-5, default 3)

This helps prevent endless tweaking:</ask>

    <action>Store as {iteration_limit} in state file (validate 1-5 range)</action>
  </check>
</step>

<step n="2" goal="Analyze current design baseline">
  <action>Analyze current prototype design parameters across 10 categories:

1. **Color System** - palette, saturation, warmth, contrast
2. **Typography** - fonts, scale, weights, spacing
3. **Spacing System** - base unit, density, rhythm
4. **Layout Structure** - grid type, alignment
5. **Animation Patterns** - durations, easing, intensity
6. **Component Styling** - buttons, cards, forms
7. **Visual Weight** - hierarchy
8. **Content Arrangement** - grouping, flow
9. **Visual Style** - aesthetic, mood
10. **Archetype Influence** - detected archetype

For each parameter:
- Extract current values
- Calculate quality score (0-100)
- Assess accessibility compliance
- Identify improvement opportunities</action>

  <action>Calculate baseline metrics:
- Overall quality score
- Coherence score
- Accessibility score (WCAG compliance)
- Technical implementation score</action>

  <action>Store as {baseline_analysis}</action>
</step>

<step n="3" goal="Choose refinement mode">
  <ask>How would you like to refine this prototype, {user_name}?

1. **Conversational** - Describe changes in natural language
   (e.g., "Make it more playful", "Too corporate, loosen it up")

2. **Guided** - Step through specific design parameters
   (Systematic adjustments with sliders/options)

3. **Hybrid** - Natural feedback + structured parameter tweaks
   (Best of both: conversational with precision controls)

Enter 1, 2, or 3:</ask>

  <action>Store response as {refinement_mode}:
- 1 → conversational
- 2 → guided
- 3 → hybrid</action>
</step>

<step n="4" goal="Gather user feedback based on mode">
  <check if="refinement_mode == conversational">
    <ask>What would you like to change about this prototype, {user_name}?

Describe your desired changes in natural language:
- "Make it more playful"
- "The colors feel too corporate"
- "Buttons should be bigger and more prominent"
- "Add more whitespace, it feels cramped"
- "Make the typography more elegant"

Your feedback:</ask>

    <action>Store as {user_feedback}</action>
    <goto step="5">Interpret feedback</goto>
  </check>

  <check if="refinement_mode == guided">
    <ask>Which design aspect would you like to adjust?

1. Colors (saturation, warmth, contrast)
2. Typography (fonts, sizes, weights)
3. Spacing (density, rhythm, breathing room)
4. Layout (structure, alignment, proportions)
5. Animations (speed, intensity, style)
6. Components (buttons, cards, forms)
7. Overall mood (archetype influence)

Enter 1-7:</ask>

    <action>Store selected category as {adjustment_category}</action>

    <action>Based on {adjustment_category}, present specific adjustment options with current values and sliders/choices</action>

    <ask>For {adjustment_category}, make these adjustments:

{Present specific options based on category - e.g., for Colors:}
- Saturation: [Current: 35%] New: __% (0-100)
- Warmth: [Current: neutral] New: cooler/same/warmer
- Contrast: [Current: moderate] New: lower/same/higher

Enter your adjustments:</ask>

    <action>Store as {guided_adjustments}</action>
    <goto step="5">Interpret feedback</goto>
  </check>

  <check if="refinement_mode == hybrid">
    <ask>What would you like to change, {user_name}?

Describe your desired changes:</ask>

    <action>Store as {user_feedback}</action>

    <action>Interpret natural language to identify affected parameters</action>

    <action>For identified parameters, offer precision controls:</action>

    <ask>I understand you want {interpreted_intent}. Let's fine-tune:

{For each affected parameter, show slider/option}
- {parameter_1}: [Current] → [Suggested] (adjust if needed)
- {parameter_2}: [Current] → [Suggested] (adjust if needed)

Confirm or adjust values:</ask>

    <action>Store as {hybrid_adjustments}</action>
    <goto step="5">Interpret feedback</goto>
  </check>
</step>

<step n="5" goal="Interpret feedback into specific parameter changes">
  <action>Translate user feedback into concrete design parameter changes</action>

  <check if="refinement_mode == conversational">
    <action>Parse natural language feedback to extract intent:

**"Make it more playful" →**
- Increase color saturation (+20-30%)
- Lighten typography weights (-100 to -200)
- Speed up animations (-20% duration)
- Add bouncy easing (ease-out-back)
- Increase component border-radius (+2-4px)
- Shift toward Bold Innovator archetype (+15%)

**"Too corporate" →**
- Reduce Professional archetype influence (-25%)
- Increase color variety/saturation
- Add personality to typography
- More dynamic animations
- Less rigid alignment

**"Buttons bigger and more prominent" →**
- Increase button padding (+20%)
- Increase font-weight to 600
- Boost button color saturation
- Add subtle shadow/hover effects
- Ensure 48x48px minimum touch target

**"Add more whitespace" →**
- Increase section padding (+25%)
- Increase element margins (+30%)
- Increase line-height (+10%)
- Reduce element density
- Shift toward Minimalist spacing philosophy</action>
  </check>

  <check if="refinement_mode == guided OR refinement_mode == hybrid">
    <action>Use provided adjustment values directly, mapped to CSS parameters</action>
  </check>

  <action>Generate parameter change specification with:
```json
{
  "changes": [
    {
      "parameter": "color_saturation",
      "current": 35,
      "target": 55,
      "rationale": "User requested more playful mood"
    },
    {
      "parameter": "button_padding",
      "current": "12px 24px",
      "target": "16px 32px",
      "rationale": "User wants bigger, more prominent buttons"
    }
  ],
  "archetype_shift": {
    "from": "Professional 80%, Modern Artisan 20%",
    "to": "Professional 60%, Modern Artisan 20%, Bold Innovator 20%",
    "rationale": "Increasing playfulness and energy"
  }
}
```</action>

  <action>Store as {parameter_changes}</action>
</step>

<step n="6" goal="Validate proposed changes for quality and accessibility">
  <action>Validate each proposed change:

**ACCESSIBILITY CHECKS:**
- Color contrast still ≥4.5:1 for text (WCAG AA)
- Touch targets ≥44x44px
- Font sizes ≥16px for body text
- Focus indicators remain visible

**COHERENCE CHECKS:**
- Changes align with overall aesthetic
- No conflicting parameters
- Archetype shift is reasonable (<40% total per iteration)
- Visual hierarchy maintained

**TECHNICAL CHECKS:**
- Responsive behavior preserved
- Animation performance maintained (60fps)
- Valid CSS values
- No breaking changes</action>

  <check if="validation issues detected">
    <action>For each issue, generate warning and alternative:

"⚠ Increasing saturation to 80% may cause contrast issues with current background.
Suggest: 65% maximum OR darken background.

To achieve playful mood while maintaining accessibility:
- Option A: Saturation to 60% + lighter background
- Option B: Saturation to 65% + keep background, darken text
- Option C: Saturation to 55% + add playful animations instead"</action>

    <ask>{user_name}, validation warnings detected:

{list_warnings}

Would you like to:
1. Accept recommended fixes automatically
2. Choose alternative approaches
3. Override warnings (not recommended)

Enter 1-3:</ask>

    <check if="accept fixes">
      <action>Apply recommended adjustments to resolve issues</action>
    </check>

    <check if="choose alternatives">
      <action>Present alternatives and apply user's choice</action>
    </check>
  </check>

  <action>Calculate predicted coherence score for refined version (target ≥80)</action>
</step>

<step n="7" goal="Apply refinements and generate new HTML">
  <action>Generate refined HTML prototype by:

1. Starting from current prototype HTML/CSS
2. Applying all validated parameter changes
3. Maintaining responsive behavior across breakpoints
4. Preserving accessibility standards (WCAG AA minimum)
5. Keeping component consistency

**Embedded Changelog:**
Add HTML comment block with:
```html
<!--
REFINEMENT ITERATION {current_iteration + 1}
Date: {date}
Mode: {refinement_mode}

CHANGES APPLIED:
{for each change}
- {parameter}: {current} → {target} ({rationale})
{end for}

ARCHETYPE SHIFT:
{archetype_from} → {archetype_to}

QUALITY METRICS:
- Coherence: {previous_coherence} → {new_coherence}
- Accessibility: {wcag_level} (maintained/improved)
- Overall Quality: {quality_score}/100

BEFORE/AFTER PARAMETERS:
{comparison_table}
-->
```</action>

  <action>Save refined prototype as: {prototype_output_folder}/{target_prototype_name}-refined-v{iteration+1}-{date}.html</action>

  <action>Store new file path as {refined_file_path}</action>
</step>

<step n="8" goal="Update state and present comparison">
  <action>Increment iteration counter: current_iteration++</action>

  <action>Update state file with:
- latest_refined_file: {refined_file_path}
- Add to refinement_history:
  ```json
  {
    "iteration": {current_iteration},
    "date": "{date}",
    "mode": "{refinement_mode}",
    "changes": {parameter_changes},
    "quality_before": {previous_quality},
    "quality_after": {new_quality},
    "file": "{refined_file_path}"
  }
  ```
- Update cumulative_changes</action>

  <action>Display to {user_name} in {communication_language}:

✓ Refinement iteration {current_iteration}/{iteration_limit} complete!

**CHANGES APPLIED:**

{for each change}
**{parameter_name}:** {old_value} → {new_value} ({delta})
  - {rationale}
{end for}

**ARCHETYPE INFLUENCE:**
- Was: {old_archetype_blend}
- Now: {new_archetype_blend}
- Shift: {archetype_change_description}

**QUALITY METRICS:**
- Coherence: {old_coherence}/100 → {new_coherence}/100 ({delta})
- Accessibility: ✓ {wcag_level} (maintained)
- Performance: ✓ 60fps animations (maintained)
- Responsiveness: ✓ All breakpoints (maintained)

**FILES:**
- Original: {original_file}
- Latest refined: {refined_file_path}
- Changelog: Embedded in HTML comments

Open in browser to preview!</action>
</step>

<step n="9" goal="Check user satisfaction and determine next action">
  <ask>How do you feel about this refinement, {user_name}?

1. ✓ Perfect! I'm done with refinements
2. Close, but needs more tweaking (continue refining)
3. Not quite right, try different direction (refine again)
4. Go back to previous version (revert last change)

Enter 1-4:</ask>

  <action>Store response as {user_satisfaction}</action>

  <check if="user_satisfaction == 1 (done)">
    <goto step="11">Finalize refinement</goto>
  </check>

  <check if="user_satisfaction == 4 (revert)">
    <action>Load previous version from refinement_history</action>
    <action>Decrement current_iteration</action>
    <action>Update state file</action>
    <action>Inform {user_name}: "Reverted to iteration {current_iteration}. File: {reverted_file_path}"</action>
    <ask>Continue refining from this version? (y/n):</ask>
    <check if="yes">
      <goto step="3">Choose refinement mode</goto>
    </check>
    <check if="no">
      <goto step="11">Finalize at this version</goto>
    </check>
  </check>

  <check if="user_satisfaction == 2 OR 3 (continue)">
    <check if="current_iteration >= iteration_limit">
      <goto step="10">Handle iteration limit</goto>
    </check>

    <check if="current_iteration < iteration_limit">
      <action>Inform {user_name}: "Continuing refinement (iteration {current_iteration + 1}/{iteration_limit})..."</action>
      <goto step="3">Choose refinement mode for next iteration</goto>
    </check>
  </check>
</step>

<step n="10" goal="Handle iteration limit reached">
  <action>Display to {user_name}:

You've reached the iteration limit ({iteration_limit} rounds).

This helps prevent endless tweaking and ensures productivity.

**Recommendation:** If you've made {current_iteration}+ iterations, consider:
- The design might be approaching a local maximum
- Fresh generation may discover better directions
- Take a break and return with fresh perspective</action>

  <ask>What would you like to do?

1. I'm satisfied - Finalize this version
2. Continue refining (add 2 more iterations)
3. Start fresh with new prototype generation

Enter 1-3:</ask>

  <check if="response == 1">
    <goto step="11">Finalize refinement</goto>
  </check>

  <check if="response == 2">
    <action>Extend iteration_limit by 2</action>
    <action>Update state file</action>
    <action>Inform {user_name}: "Extended to {iteration_limit} iterations. Continuing..."</action>
    <goto step="3">Choose refinement mode</goto>
  </check>

  <check if="response == 3">
    <action>Inform {user_name}: "To start fresh, run the Design Director's *generate command."</action>
    <goto step="11">Finalize current work</goto>
  </check>
</step>

<step n="11" goal="Finalize refinement and generate summary">
  <action>Generate comprehensive refinement summary:

**REFINEMENT SUMMARY**

**Original:** {original_file}
**Final:** {latest_refined_file}
**Total iterations:** {current_iteration}
**Refinement modes used:** {list_modes_from_history}

**CUMULATIVE CHANGES:**
{summarize all changes across all iterations}

**QUALITY PROGRESSION:**
- Starting quality: {original_quality}/100
- Final quality: {final_quality}/100
- Improvement: {delta_quality}

- Starting coherence: {original_coherence}/100
- Final coherence: {final_coherence}/100
- Change: {delta_coherence}

**ITERATION HISTORY:**
{for each iteration in history}
Iteration {n}: {date}
  Mode: {mode}
  Key changes: {brief_summary}
  Quality: {quality_before} → {quality_after}
{end for}

**DESIGN RATIONALE:**
{synthesize overall design direction from all iterations}</action>

  <action>Save summary to: {prototype_output_folder}/{target_prototype_name}-refinement-summary-{date}.md</action>

  <action>Mark state file as completed (add "completed": true, "completed_at": "{date}")</action>

  <action>Display to {user_name}:

✓ Refinement complete!

**Final refined prototype:** {latest_refined_file}
**Summary report:** {summary_file_path}
**Total iterations:** {current_iteration}

Your refined prototype is ready to use!

**Next steps:**
- Open HTML file in browser to preview
- Run *analyze to compare before/after metrics
- Use in your project
- Refine further if needed (state saved for continuation)</action>

  <ask>Would you like to:
1. Refine another prototype
2. Analyze this refined prototype
3. Exit

Enter 1-3:</ask>

  <check if="response == 1">
    <goto step="1">Start new refinement session</goto>
  </check>

  <check if="response == 2">
    <action>Inform {user_name}: "Run the analyze-prototypes workflow to generate detailed analysis of your refined prototype."</action>
  </check>
</step>

</workflow>
