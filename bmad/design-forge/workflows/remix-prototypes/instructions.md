# Remix Prototypes - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/design-forge/workflows/remix-prototypes/workflow.yaml</critical>
<critical>Communicate with {user_name} in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Check for existing prototypes and gather remix requirements">
  <action>Greet {user_name} in {communication_language}</action>
  <action>Explain that this workflow combines design elements from multiple prototypes to create custom variations</action>

  <action>Scan {prototype_output_folder} for *.html files</action>

  <check if="less than 2 prototypes found">
    <action>Display error to {user_name}: "Remix requires at least 2 existing prototypes. Please run the Design Director's *generate command first to create prototypes."</action>
    <action>Exit workflow</action>
  </check>

  <action>Display available prototypes with details (name, archetype if detected, file date)</action>

  <ask>Which prototypes do you want to remix, {user_name}? (Select 2-5)

Enter prototype numbers separated by commas (e.g., 1,3,5):</ask>

  <action>Validate selection (must be 2-5 prototypes)</action>
  <action>Store selected prototypes as {source_prototypes}</action>

  <ask>How should we combine these prototypes?

1. **Interactive** - You guide element selection from each prototype
2. **Best of Each** - AI analyzes and picks strongest elements automatically
3. **Hybrid** - Blend design approaches smoothly

Enter 1, 2, or 3:</ask>

  <action>Store response as {remix_strategy}:
- 1 → interactive
- 2 → best-of
- 3 → hybrid</action>

  <ask>How many remix variations should we create? (1-3)

Enter number:</ask>

  <action>Store response as {output_count} (validate 1-3 range)</action>

  <ask>Which design aspects should the remix prioritize? (Select multiple)

1. Layout structure
2. Visual style
3. Color scheme
4. Typography
5. Animation patterns
6. Component styling

Enter numbers separated by commas (e.g., 1,2,3):</ask>

  <action>Store selected aspects as {remix_focus}</action>
</step>

<step n="2" goal="Load and analyze source prototypes">
  <action>Load each selected prototype HTML file from {source_prototypes}</action>
  <action>Parse HTML structure, embedded CSS, and any metadata</action>

  <action>For each prototype, extract and categorize design elements across 10 parameter categories:

1. **Color System** - palette, saturation, warmth, contrast
2. **Typography** - fonts, scale, weights, spacing
3. **Spacing System** - base unit, density, rhythm
4. **Layout Structure** - grid type, alignment, columns
5. **Animation Patterns** - durations, easing, intensity
6. **Component Styling** - buttons, cards, forms
7. **Visual Weight** - hierarchy levels
8. **Content Arrangement** - grouping, flow patterns
9. **Visual Style** - aesthetic approach, mood
10. **Archetype Signature** - detected archetype influence</action>

  <action>Score each element for quality and coherence</action>
  <action>Identify archetype signatures from each prototype</action>
  <action>Store element catalog with quality scores</action>
</step>

<step n="3" goal="Route to appropriate remix strategy">
  <check if="remix_strategy == interactive">
    <goto step="4">Interactive element selection</goto>
  </check>

  <check if="remix_strategy == best-of">
    <goto step="5">AI-driven element selection</goto>
  </check>

  <check if="remix_strategy == hybrid">
    <goto step="6">Hybrid blending approach</goto>
  </check>
</step>

<step n="4" goal="Interactive element selection">
  <action>For each design parameter category in {remix_focus}:</action>

  <ask>**{parameter_category}** - Choose your preferred approach:

{for each source prototype, show its approach to this parameter with quality score}

1. Prototype A - {description} (Quality: {score}/100)
2. Prototype B - {description} (Quality: {score}/100)
3. Prototype C - {description} (Quality: {score}/100)
...

Which would you like to use? (Enter number):</ask>

  <action>Record selection for this parameter</action>
  <action>Validate compatibility with previously selected elements</action>

  <check if="incompatibility detected">
    <action>Warn {user_name}: "This selection may conflict with {previous_selection}. Suggest: {alternative_approach}"</action>
    <ask>Proceed anyway? (y/n):</ask>
  </check>

  <action>Store selected element in combination map</action>

  <goto step="7">Validate and generate</goto>
</step>

<step n="5" goal="AI-driven best-of-each selection">
  <action>For each design parameter category:</action>

  <action>Score elements from all source prototypes based on:
- Quality metrics (0-100 scores)
- Harmony with other selections
- Coherence with prioritized {remix_focus} areas
- Best practices compliance</action>

  <action>Select highest-scoring element for each parameter</action>

  <action>Check for archetype compatibility:
- Prefer coherent archetype combinations (e.g., Minimalist + Elegant work well)
- Avoid jarring combinations (e.g., Bold + Elegant may conflict)
- Calculate overall coherence score for the combination</action>

  <action>Generate {output_count} different combinations by:
- First combination: absolute best scores across all parameters
- Additional combinations: alternative high-scoring combinations with different character
- Ensure variety between generated combinations</action>

  <action>Store selected elements and rationale for each combination</action>

  <goto step="7">Validate and generate</goto>
</step>

<step n="6" goal="Hybrid archetype blending">
  <action>Identify primary archetype signature from each source prototype</action>

  <action>Find compatible middle ground between archetypes:
- Calculate archetype blend percentages (e.g., 40% Minimalist + 35% Elegant + 25% Modern)
- Ensure blend makes philosophical sense
- Target coherence score ≥80</action>

  <action>Blend design parameters using weighted averaging:

**Color Palettes:**
- Blend saturation levels (weighted average)
- Combine warmth approaches
- Merge contrast strategies

**Typography:**
- Merge font scales (interpolate sizes)
- Blend weight distributions
- Combine spacing philosophies

**Spacing:**
- Average density levels
- Blend whitespace ratios
- Merge rhythm patterns

**Animations:**
- Average durations
- Blend easing approaches
- Merge intensity levels

**Components:**
- Create gradient between style approaches
- Blend border radius, shadows, etc.</action>

  <action>Generate {output_count} variations with different blend ratios</action>
  <action>Store blended parameters and hybrid specification</action>

  <goto step="7">Validate and generate</goto>
</step>

<step n="7" goal="Validate element compatibility">
  <action>Check selected/blended elements for conflicts:

**Color Contrast Issues:**
- Ensure all text/background combinations meet WCAG AA minimum (4.5:1)
- Flag any contrast failures

**Typography Mismatches:**
- Verify scale ratios are consistent
- Check for conflicting font pairings

**Spacing Incompatibilities:**
- Ensure base units align or convert cleanly
- Check for rhythm conflicts

**Animation Timing Conflicts:**
- Verify durations are harmonious
- Check for jarring easing combinations

**Component Style Clashes:**
- Ensure button/card/form styles are cohesive
- Flag visual inconsistencies</action>

  <check if="conflicts found">
    <action>For each conflict, suggest resolution:
- Adjust parameter to resolve (e.g., darken text color for contrast)
- Provide alternative element choice
- Explain trade-off</action>

    <ask if="remix_strategy == interactive">Conflicts detected. Would you like to:
1. Apply suggested fixes automatically
2. Review and adjust manually
3. Proceed anyway (not recommended)

Enter 1-3:</ask>

    <action if="apply fixes">Automatically resolve conflicts using suggested adjustments</action>
  </check>

  <action>Calculate final coherence score for combination (target ≥80)</action>
</step>

<step n="8" goal="Generate remix prototype HTML files">
  <action>For each remix combination (1 to {output_count}):</action>

  <action>Generate production-ready HTML prototype by:

1. Creating HTML structure based on selected layout approach
2. Embedding CSS with all selected/blended design parameters
3. Applying selected component styles
4. Including selected animation patterns
5. Ensuring responsive behavior across breakpoints
6. Maintaining accessibility standards (WCAG AA minimum)

**Embedded Documentation:**
Add HTML comment block documenting:
- Source prototypes used
- Elements selected from each source
- Remix strategy employed
- Archetype blend (if hybrid)
- Quality scores
- Generation timestamp</action>

  <action>Save each remix to: {prototype_output_folder}/remix-{date}-{index}.html
Where {index} is 1, 2, or 3</action>

  <action>Store generated file paths</action>
</step>

<step n="9" goal="Create remix metadata tracking">
  <action>Create or update metadata file: {prototype_output_folder}/.remix-metadata.json

Include:
- Source prototypes list
- Remix strategy used
- Focus areas prioritized
- Timestamp
- Element combination mappings
- Generated file paths
- Quality scores</action>

  <action>This enables tracking remix history and lineage</action>
</step>

<step n="10" goal="Present results to user">
  <action>Display to {user_name} in {communication_language}:

✓ Successfully created {output_count} remix prototype(s)!

**Strategy:** {remix_strategy}
**Source prototypes:** {list_source_names}
**Focus areas:** {list_focus_areas}

**Generated files:**
{for each generated file}
- {file_path}
  - Archetype blend: {archetype_info}
  - Coherence score: {coherence}/100
  - Quality: {quality}/100
{end for}

Each remix includes embedded documentation explaining:
- Which elements came from which source prototypes
- Why these combinations work together
- How the design maintains coherence

**Next steps:**
- Open HTML files in browser to preview
- Run *analyze to compare remixes with originals
- Run *refine on your favorite to polish further</action>

  <ask>Would you like to:
1. Create more remixes with different settings
2. Analyze the generated remixes
3. Exit

Enter 1-3:</ask>

  <check if="response == 1">
    <goto step="1">Start new remix</goto>
  </check>

  <check if="response == 2">
    <action>Inform {user_name}: "You can run the analyze-prototypes workflow to compare your new remixes with the original prototypes."</action>
  </check>
</step>

</workflow>
