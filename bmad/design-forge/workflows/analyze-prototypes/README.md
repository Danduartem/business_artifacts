# Analyze Prototypes Workflow

**Version:** 2.5.0
**Status:** ✅ Production Ready
**Category:** Design Analysis
**Complexity:** Medium
**Duration:** 2-5 minutes

## Overview

The **Analyze Prototypes** workflow provides comprehensive visual comparison, design metrics analysis, and batch overview capabilities for Design Forge prototypes. It helps you make informed decisions by quantifying design parameters, comparing prototypes objectively, and identifying the best fit for your use case.

## What It Does

**Turns subjective design into objective data:**

- **Compare Mode:** Side-by-side comparison of 2-5 prototypes with detailed difference analysis
- **Metrics Mode:** Deep-dive analysis of a single prototype with complete design parameter breakdown
- **Batch Mode:** Overview summary of all prototypes with use case recommendations

**Key Capabilities:**

1. **Extract 10 Design Parameters:**
   - Color system (palette, saturation, warmth, contrast)
   - Typography (fonts, scale, weights, spacing)
   - Spacing system (base unit, density, rhythm)
   - Layout structure (grid, alignment, proportions)
   - Animation patterns (duration, easing, intensity)
   - Component styling (buttons, cards, forms)
   - Visual weight (hierarchy, prominence)
   - Content arrangement (grouping, flow)
   - Visual style (aesthetic, mood)
   - Archetype influence (personality traits)

2. **Calculate Quality Scores:**
   - Accessibility (WCAG compliance, contrast ratios)
   - Sophistication (visual refinement)
   - Innovation (creative approaches)
   - Technical quality (performance, responsiveness)
   - Overall coherence (design consistency)

3. **Generate Multi-Format Reports:**
   - Markdown (human-readable with tables and charts)
   - JSON (programmatic access to all data)
   - HTML (interactive dashboard with visualizations)

## When to Use This

**Use Compare Mode when:**
- You have 2-5 prototypes and need to understand differences
- "Which layout is more spacious?"
- "How do the color schemes compare?"
- "What are the key visual differences?"

**Use Metrics Mode when:**
- You want deep analysis of a single prototype
- Need to understand all design parameters quantitatively
- Want improvement suggestions for accessibility or coherence
- Creating design documentation or specifications

**Use Batch Mode when:**
- You want an overview of all available prototypes
- Need recommendations by use case (corporate, startup, luxury)
- Want to see parameter ranges across all options
- Deciding which prototypes to compare in detail

## Quick Start

### Access the Workflow

From Design Director agent:
```
/design-forge
*analyze
```

Or directly via slash command:
```
/bmad:design-forge:workflows:analyze-prototypes
```

### Example: Compare Two Prototypes

1. Select mode: **Compare Prototypes**
2. Select prototypes: `minimalist.html`, `bold-innovator.html`
3. Choose output: **Markdown Report**
4. Review generated comparison showing:
   - Layout differences (grid vs. asymmetric)
   - Color palette variations (18% vs. 65% saturation)
   - Typography approaches (clean sans vs. display fonts)
   - Animation styles (subtle vs. dynamic)
   - Quality metric deltas
   - Use case fit recommendations

### Example: Deep-Dive Single Prototype

1. Select mode: **Design Metrics**
2. Select prototype: `modern-artisan.html`
3. Choose output: **HTML Dashboard**
4. Review comprehensive analysis:
   - Complete color palette with hex/HSL values
   - Typography scale with all sizes and ratios
   - Spacing system with base unit detection
   - Layout structure breakdown
   - Component style analysis
   - Quality scores (Accessibility: 94, Coherence: 89)
   - Improvement suggestions

### Example: Batch Overview

1. Select mode: **Batch Analysis**
2. Prototypes: All 5 archetypes auto-selected
3. Choose output: **All Formats**
4. Review summary table:
   - Quality comparison across all prototypes
   - Archetype distribution
   - Parameter ranges (saturation, fonts, spacing)
   - Best-for recommendations by use case

## Key Features

### Intelligent Parameter Extraction

**Automatic detection and quantification:**
- Base unit spacing via GCD algorithm
- Type scale ratio calculation
- Color warmth classification (cool/neutral/warm)
- Density classification (compact/balanced/spacious)
- Animation intensity scoring (subtle/moderate/dynamic)
- Responsive breakpoint analysis

### 5-Dimensional Quality Scoring

**Every prototype scored on:**
1. **Clarity (0-100):** Visual hierarchy, readability, information architecture
2. **Sophistication (0-100):** Visual refinement, attention to detail, polish
3. **Innovation (0-100):** Creative approaches, unique solutions, modern techniques
4. **Accessibility (0-100):** WCAG compliance, contrast ratios, semantic HTML
5. **Technical (0-100):** Performance, responsiveness, code quality

### Archetype Signature Detection

**AI identifies archetype influence with confidence levels:**
```
Archetype Signatures:
- Minimalist: 85% (strong signals)
- Modern Artisan: 12% (some influence)
- Professional: 3% (minimal)
```

Helps understand design personality and target audience fit.

### Multi-Format Output

**Markdown Reports:**
- Human-readable with clear sections
- Tables for comparisons
- ASCII charts for visualizations
- Emoji indicators (✓, ✗, ⚠)

**JSON Data:**
- Structured, parseable data
- Complete metrics for all parameters
- Nested objects for complex data
- Perfect for programmatic analysis

**HTML Dashboards:**
- Interactive interface
- Color swatch visualizations
- Typography specimens
- Collapsible sections
- Print-friendly styling

## Workflow Steps

### 1. Load Target Prototypes
Reads selected HTML files and extracts metadata.

### 2. Extract Design Parameters
Spawns Design Metrics Analyzer agent to parse and analyze each prototype, extracting all 10 design parameter categories.

### 3. Route by Analysis Mode
Branches to appropriate analysis type (Compare, Metrics, or Batch).

### 4. Generate Analysis
Creates detailed analysis based on mode:
- **Compare:** Side-by-side difference tables
- **Metrics:** Comprehensive single-prototype report
- **Batch:** Summary overview with recommendations

### 5. Format Output
Generates reports in requested format(s) and saves to analysis folder.

### 6. Present Results
Shows user the generated reports with key findings summary.

## Output Location

**Analysis reports saved to:**
```
{prototype_output_folder}/analysis/
```

**File naming:**
```
analysis-compare-2025-11-10-14-30.md
analysis-metrics-2025-11-10-14-35.json
analysis-batch-2025-11-10-14-40.html
```

**Analysis history tracked in:**
```
{prototype_output_folder}/analysis/.analysis-history.json
```

## Configuration

Uses module config from `/bmad/design-forge/config.yaml`:

- `prototype_output_folder`: Where to find prototypes and save analyses
- `design_principles_path`: Quality standards reference for scoring

## Error Handling

**No prototypes found:**
- Message: "No prototypes available to analyze. Run *generate first."
- Action: Workflow aborts

**Malformed HTML:**
- Message: "Prototype {filename} has malformed HTML. Cannot analyze."
- Action: Skips that prototype, continues with others

**Insufficient prototypes for comparison:**
- Message: "Comparison requires at least 2 prototypes. Please select more or use metrics mode."
- Action: Prompts user to reselect

## Success Criteria

✅ All selected prototypes successfully parsed
✅ Design parameters extracted completely
✅ Analysis reports generated in requested format(s)
✅ Reports saved to analysis folder
✅ Key findings clearly presented
✅ Actionable insights provided

## Use Cases

### For Designers
- **Visual audit:** Quantify subjective design qualities
- **Quality assurance:** Check accessibility and coherence scores
- **Documentation:** Generate specs from existing prototypes
- **Comparison:** Objectively compare design alternatives

### For Developers
- **Implementation reference:** Extract exact values (colors, spacing, fonts)
- **Quality validation:** Verify responsive behavior and performance
- **Component specs:** Understand button styles, card treatments
- **Archetype understanding:** Learn design philosophy for accurate implementation

### For Product Teams
- **Decision support:** Compare prototypes with objective data
- **Stakeholder presentations:** Professional reports with visualizations
- **A/B testing planning:** Understand key differences to test
- **Use case mapping:** Match prototypes to target audiences

### For Marketing Teams
- **Brand alignment:** Verify consistency with brand guidelines
- **Audience fit:** Understand emotional targets and personality traits
- **Competitive positioning:** Compare against brand archetypes
- **Campaign planning:** Select appropriate aesthetic for campaigns

## Advanced Usage

### Trend Analysis
Generate batch analyses over time to track design evolution:
```
2025-11-10: Average saturation 35%
2025-11-15: Average saturation 42% (+7% shift toward bold)
```

### Combination Workflows
1. `*generate` → Create 5 prototypes
2. `*analyze` (batch) → Get overview
3. `*analyze` (compare) → Compare top 2-3
4. `*refine` → Polish selected prototype
5. `*analyze` (metrics) → Validate improvements

### Export for Presentations
HTML dashboard mode creates presentation-ready reports:
- Professional styling
- Interactive elements
- Print-friendly CSS
- Embeddable in slide decks

## Tips & Best Practices

**For Accurate Comparisons:**
- Compare prototypes of the same section type
- Use 2-3 prototypes for detailed comparison (not all 5)
- Focus on specific parameters that matter for your decision

**For Deep Analysis:**
- Use Metrics mode when you need complete understanding
- Review improvement suggestions for quick wins
- Check accessibility scores before implementation

**For Quick Decisions:**
- Start with Batch mode to narrow options
- Use recommendations table for use case mapping
- Export HTML dashboard for stakeholder reviews

**For Documentation:**
- Generate JSON for developer handoff
- Use Markdown for design documentation
- HTML dashboard for executive presentations

## Related Workflows

- **[Generate Prototypes](/bmad/design-forge/agents/design-director.md):** Create prototypes to analyze
- **[Refine Selection](/bmad/design-forge/workflows/refine-selection/):** Polish prototypes before analysis
- **[Remix Prototypes](/bmad/design-forge/workflows/remix-prototypes/):** Combine elements, then analyze result

## Future Enhancements

**Planned for v2.6+:**
- Screenshot capture (if browser tools available)
- Visual diff images (highlight changed pixels)
- Interactive comparison sliders
- Export comparison as presentation slides
- Trend analysis across multiple generations
- A/B testing recommendations based on parameter differences

## Technical Details

**Agent Used:** Design Metrics Analyzer
**Execution Type:** Sequential with conditional branching
**Average Duration:** 2-5 minutes depending on mode
**File Operations:** Read HTML, Write Markdown/JSON/HTML

**Dependencies:**
- Prototype HTML files in output folder
- Design principles reference (optional)
- Write access to analysis folder

## Support

**For detailed usage instructions:**
See `/bmad/design-forge/workflows/analyze-prototypes/instructions.md`

**For troubleshooting:**
Check error messages in analysis output, verify HTML validity, ensure prototype files exist.

**For feedback:**
Contact module maintainer or submit issue to Design Forge repository.

---

**Design Forge v2.5** - Turn vision into data, data into decisions.
