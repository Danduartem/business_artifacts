# Analyze Prototypes - Validation Checklist

Use this checklist to verify workflow execution quality.

## Pre-Execution Validation

- [ ] At least one prototype HTML file exists in {prototype_output_folder}
- [ ] Selected prototypes are valid HTML files (not corrupted)
- [ ] Output directory {prototype_output_folder}/analysis/ is writable

## Execution Validation

### Analysis Mode: Compare
- [ ] User selected 2-5 prototypes (minimum 2 for comparison)
- [ ] All selected prototypes successfully parsed
- [ ] Design parameters extracted from all prototypes
- [ ] Comparison tables generated with accurate deltas
- [ ] Key differences clearly identified

### Analysis Mode: Metrics
- [ ] Single prototype selected and loaded
- [ ] All 10 design parameter categories analyzed
- [ ] Quality scores calculated (0-100 range)
- [ ] Accessibility metrics include WCAG compliance level
- [ ] Improvement suggestions are actionable and specific

### Analysis Mode: Batch
- [ ] All available prototypes discovered and analyzed
- [ ] Summary table includes all prototypes
- [ ] Parameter ranges accurately calculated
- [ ] Archetype distribution correctly tallied
- [ ] Use case recommendations provided

## Output Validation

### General
- [ ] Reports generated in requested format(s)
- [ ] File names follow pattern: analysis-{mode}-{date}.{ext}
- [ ] Reports saved to correct location
- [ ] File paths reported to user are accurate

### Markdown Output
- [ ] Valid markdown syntax throughout
- [ ] Tables properly formatted
- [ ] Headings hierarchical (##, ###)
- [ ] Emoji indicators used appropriately (✓, ✗, ⚠)

### JSON Output
- [ ] Valid JSON syntax (parseable)
- [ ] Complete metrics included
- [ ] Nested structure logical
- [ ] No data loss from analysis

### HTML Output
- [ ] Valid HTML5 structure
- [ ] CSS embedded and functional
- [ ] Interactive elements work (if applicable)
- [ ] Responsive layout
- [ ] Print-friendly styles included

### Visual Comparisons (if enabled)
- [ ] Screenshots verified to exist before including
- [ ] Screenshot paths correctly referenced
- [ ] Viewport switcher functional (HTML format)
- [ ] Image grid responsive

## Quality Validation

- [ ] All selected prototypes successfully analyzed (no silent failures)
- [ ] Design parameters extracted completely (no missing categories)
- [ ] Quality scores are reasonable (0-100 range, logical values)
- [ ] Accessibility compliance accurately assessed
- [ ] Archetype detection confidence levels make sense
- [ ] Recommendations are actionable and prioritized

## Error Handling

- [ ] No prototypes found → Clear error message shown
- [ ] Invalid HTML → Prototype skipped with warning
- [ ] Insufficient prototypes for compare mode → User prompted to select more
- [ ] Missing screenshots → User informed, continues gracefully
- [ ] File write errors → User notified with troubleshooting info

## User Experience

- [ ] User greeted by name in configured language
- [ ] Prompts are clear and provide context
- [ ] Progress indicated for long operations
- [ ] Results presentation is clear and actionable
- [ ] File paths clickable/copyable for easy access
- [ ] Key findings summarized concisely

## Post-Execution

- [ ] All generated files exist at reported paths
- [ ] Generated reports are readable and complete
- [ ] No temporary files left behind
- [ ] Analysis history updated (if tracking enabled)
- [ ] User satisfied with results

## Success Criteria

**Workflow is successful if:**
1. All selected prototypes successfully parsed
2. Design parameters extracted completely
3. Analysis reports generated in requested format(s)
4. Reports saved to correct location
5. Key findings clearly presented to user
6. Actionable insights provided

**Workflow quality is excellent if additionally:**
7. Visual comparisons included (when screenshots available)
8. All accessibility issues identified with specific fixes
9. Recommendations prioritized by impact
10. User can immediately act on insights
