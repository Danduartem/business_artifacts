# Analyze Prototypes - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/design-forge/workflows/analyze-prototypes/workflow.yaml</critical>
<critical>Communicate with {user_name} in {communication_language} throughout this workflow</critical>

<workflow>

<step n="1" goal="Gather analysis requirements from user">
  <action>Greet {user_name} in {communication_language}</action>
  <action>Explain that this workflow analyzes design prototypes to provide objective metrics and comparisons</action>

  <ask>What type of analysis would you like, {user_name}?

1. **Compare Prototypes** - Side-by-side comparison (2-5 prototypes)
2. **Design Metrics** - Single prototype deep-dive analysis
3. **Batch Analysis** - Overview of all prototypes in folder

Enter 1, 2, or 3:</ask>

  <action>Store response as {analysis_mode}:
- 1 → compare
- 2 → metrics
- 3 → batch</action>

  <ask>Which prototypes would you like to analyze?

(Scan {prototype_output_folder} for *.html files and present list)

<check if="analysis_mode == compare">
Select 2-5 prototypes (comma-separated numbers):
</check>
<check if="analysis_mode == metrics">
Select 1 prototype (enter number):
</check>
<check if="analysis_mode == batch">
Press enter to analyze all prototypes:
</check>
</ask>

  <action>Store selected prototypes as {target_prototypes}</action>

  <ask>What output format would you like?

1. Markdown Report (readable in text editor)
2. JSON Data (programmatic use)
3. HTML Dashboard (interactive visualization)
4. All Formats

Enter 1-4:</ask>

  <action>Store response as {output_format}</action>

  <ask if="analysis_mode == compare OR analysis_mode == batch">Include visual screenshot comparisons? (y/n)

(Requires screenshots to be captured first)</ask>

  <action>Store response as {include_visual_comparison}</action>
</step>

<step n="2" goal="Check for screenshots if visual comparison requested">
  <check if="include_visual_comparison == true">
    <action>For each prototype in {target_prototypes}:
- Check if {prototype_output_folder}/screenshots/{prototype-name}/ exists
- Check for mobile-375.png, tablet-768.png, desktop-1440.png
- Mark as available or missing</action>

    <check if="some screenshots missing">
      <ask>Some prototypes don't have screenshots yet. Would you like to capture them now? (y/n)

Missing screenshots for: {list_missing_prototypes}</ask>

      <check if="yes">
        <action>Note: Screenshot capture requires browser automation tools</action>
        <action>Inform {user_name}: "Screenshot capture workflow would need to be run separately. For now, continuing without visual comparisons for missing prototypes."</action>
      </check>
    </check>
  </check>
</step>

<step n="3" goal="Load and parse selected prototypes">
  <action>Load each prototype HTML file from {target_prototypes}</action>
  <action>Parse HTML structure and extract embedded CSS/styles</action>
  <action>Extract any embedded metadata (archetype, generation date, rationale)</action>
  <action>Store prototype contents for analysis</action>
</step>

<step n="4" goal="Extract design parameters from prototypes">
  <action>For each loaded prototype, analyze and extract the 10 design parameter categories:

1. **Color System** - palette, saturation, warmth, contrast ratios
2. **Typography** - fonts, scale, weights, spacing, line heights
3. **Spacing System** - base unit, density, rhythm, whitespace
4. **Layout Structure** - grid type, alignment, proportions, max-width
5. **Animation Patterns** - durations, easing functions, intensity
6. **Component Styling** - buttons, cards, forms styling
7. **Visual Weight** - hierarchy, prominence levels
8. **Content Arrangement** - grouping patterns, flow
9. **Visual Style** - aesthetic mood, style approach
10. **Archetype Influence** - detected archetype signature, personality traits

For each parameter, record:
- Current values
- Quality scores (0-100)
- Best practices compliance
- Accessibility metrics (WCAG compliance)
</action>

  <action>Store extracted design data for each prototype</action>
</step>

<step n="5" goal="Route to appropriate analysis mode">
  <check if="analysis_mode == compare">
    <goto step="6">Generate comparison analysis</goto>
  </check>

  <check if="analysis_mode == metrics">
    <goto step="7">Generate metrics report</goto>
  </check>

  <check if="analysis_mode == batch">
    <goto step="8">Generate batch summary</goto>
  </check>
</step>

<step n="6" goal="Generate side-by-side comparison analysis">
  <action>For each pair of selected prototypes, compare across all design parameters</action>

  <action>Generate comparison analysis covering:

**VISUAL DIFFERENCES:**
- Layout structure differences (grid vs flexbox, columns, alignment)
- Color palette variations (saturation, warmth, contrast approaches)
- Typography choices (fonts, scales, weights, line heights)
- Spacing approaches (density, whitespace ratios, rhythm)
- Animation styles (speed, intensity, easing)
- Component treatments (button styles, card designs, forms)

**METRIC DIFFERENCES:**
- Quality score deltas for each dimension
- Accessibility comparison (WCAG compliance levels)
- Performance differences (animation fps, load considerations)
- Coherence scores (how well each prototype holds together)

**ARCHETYPE DIFFERENCES:**
- Which archetype(s) each prototype uses
- Philosophy differences between archetypes
- Personality trait variations
- Target audience fit for each</action>

  <action>Create comparison tables showing parameter values side-by-side with difference calculations</action>

  <action>Identify and highlight:
- Biggest visual impact differences
- Quality trade-offs between prototypes
- Use case suitability recommendations</action>

  <goto step="9">Format output</goto>
</step>

<step n="7" goal="Generate deep metrics report for single prototype">
  <action>For the selected prototype, generate comprehensive analysis:

**DESIGN PARAMETERS (all 10 categories):**
Each with current values, quality scores (0-100), best practices compliance, improvement suggestions

**COLOR ANALYSIS:**
- Full palette with hex codes and HSL values
- Saturation levels and distribution
- Warmth analysis (cool/neutral/warm)
- Contrast ratios for all text/background combinations
- WCAG compliance level (A, AA, AAA)
- Color usage breakdown (primary, accents, neutrals)

**TYPOGRAPHY ANALYSIS:**
- Font families used (headings, body, monospace)
- Complete type scale with all sizes
- Scale ratio calculation
- Weight distribution across elements
- Line height analysis for readability
- Readability score

**SPACING ANALYSIS:**
- Base unit detection (4px, 8px, etc.)
- Complete spacing scale
- Density classification (compact, moderate, spacious, luxurious)
- Whitespace ratio percentage
- Vertical rhythm consistency score

**LAYOUT ANALYSIS:**
- Structure type (single column, grid, flexbox hybrid)
- Column usage and breakdowns
- Alignment patterns
- Responsive breakpoints detected
- Flow analysis (how content is arranged)

**ANIMATION ANALYSIS:**
- Duration range across all animations
- Easing functions catalog
- Intensity level assessment
- Performance impact (60fps compliance)
- Animation purpose and effectiveness

**COMPONENT ANALYSIS:**
- Button styles (primary, secondary, variants)
- Card treatments (shadows, borders, spacing)
- Form styling (inputs, labels, validation)
- Navigation patterns
- Component consistency score

**QUALITY METRICS:**
- Overall quality rating (0-100)
- Clarity score
- Sophistication score
- Innovation score
- Accessibility score (WCAG compliance)
- Technical implementation score
- Coherence score

**ARCHETYPE ANALYSIS:**
- Detected archetype(s) with confidence levels
- Key personality traits expressed
- Philosophy alignment
- Target audience fit assessment

**IMPROVEMENT SUGGESTIONS:**
- Quick wins (easy, high-impact improvements)
- Accessibility fixes needed
- Performance optimizations available
- Coherence enhancements possible</action>

  <goto step="9">Format output</goto>
</step>

<step n="8" goal="Generate batch overview of all prototypes">
  <action>Analyze all selected prototypes and generate overview:

**SUMMARY TABLE:**
Create table showing for each prototype:
- Name
- Detected archetype
- Overall quality score
- Accessibility score
- Coherence score
- Quick notes

**PARAMETER RANGES:**
Show min-to-max ranges across all prototypes:
- Color saturation range (e.g., 18% to 78%)
- Base font size range
- Animation speed range
- Whitespace density range (compact to luxurious)

**ARCHETYPE DISTRIBUTION:**
- Count of each archetype represented
- Diversity score (how varied the prototypes are)

**QUALITY OVERVIEW:**
- Average quality across all prototypes
- WCAG compliance summary (all pass AA? AAA?)
- Responsive behavior verification
- Coherence range

**RECOMMENDATIONS:**
- Best for accessibility (highest score)
- Most innovative (highest innovation score)
- Best coherence (most internally consistent)
- Most versatile (balanced scores)
- Specific use case recommendations

**USE CASE MAPPING:**
Map prototypes to ideal use cases:
- Corporate/B2B → which prototypes work best
- Startup/Disruptive → which prototypes work best
- Luxury/Premium → which prototypes work best
- SaaS/Tech → which prototypes work best</action>

  <goto step="9">Format output</goto>
</step>

<step n="9" goal="Format output in requested format(s)">
  <action>Based on {output_format}, generate analysis reports:

<check if="output_format == markdown OR output_format == all">
**MARKDOWN FORMAT:**
- Human-readable report with clear sections
- Tables for comparisons (markdown table syntax)
- ASCII charts for visualizations where helpful
- Emoji indicators (✓, ✗, ⚠) for quick scanning
- Hierarchical headings (##, ###)
</check>

<check if="output_format == json OR output_format == all">
**JSON FORMAT:**
- Structured data with nested objects
- Programmatically parseable
- Complete metrics in key-value format
- Arrays for lists and comparisons
</check>

<check if="output_format == html OR output_format == all">
**HTML FORMAT:**
- Interactive dashboard with embedded CSS
- Color swatches rendered visually
- Typography specimens showing actual fonts
- Collapsible sections for deep dives
- Print-friendly styles
- Dark/light theme support

<check if="include_visual_comparison AND screenshots_available">
- Screenshot thumbnail gallery
- Interactive viewport switcher (mobile/tablet/desktop tabs)
- Side-by-side visual comparison grid
- Click to enlarge functionality
- Responsive image layout
</check>
</check>
</action>

  <action>Save generated reports to: {prototype_output_folder}/analysis/
File naming:
- analysis-{analysis_mode}-{date}.md
- analysis-{analysis_mode}-{date}.json
- analysis-{analysis_mode}-{date}.html</action>

  <action>Store file paths for user presentation</action>
</step>

<step n="10" goal="Present results to user">
  <action>Display to {user_name} in {communication_language}:

✓ Analysis complete!

**Settings:**
- Mode: {analysis_mode}
- Prototypes analyzed: {count}
- Output format: {output_format}

**Generated files:**
{list_file_paths_with_full_paths}

**KEY FINDINGS:**
{summary_of_key_insights_from_analysis}

Open the report(s) to explore detailed analysis.</action>

  <action>If any errors or warnings occurred, summarize them</action>

  <ask>Would you like to:
1. Run another analysis
2. View one of the generated reports
3. Exit

Enter 1-3:</ask>

  <check if="response == 1">
    <goto step="1">Start new analysis</goto>
  </check>

  <check if="response == 2">
    <action>Show available reports and ask which to display</action>
    <action>Display selected report content (first 100 lines if very long)</action>
  </check>
</step>

</workflow>
