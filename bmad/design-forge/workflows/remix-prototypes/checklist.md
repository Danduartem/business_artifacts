# Remix Prototypes - Validation Checklist

## Pre-Execution Validation

- [ ] At least 2 prototype HTML files exist in {prototype_output_folder}
- [ ] Selected prototypes (2-5) are valid HTML files
- [ ] Output directory {prototype_output_folder} is writable
- [ ] User has selected valid remix strategy (interactive/best-of/hybrid)
- [ ] Output count is within valid range (1-3)

## Execution Validation

### Step 1: Requirements Gathering
- [ ] User greeted by name in configured language
- [ ] Prototypes scanned and listed correctly
- [ ] User selections validated (2-5 prototypes)
- [ ] Remix strategy captured
- [ ] Output count captured (1-3)
- [ ] Focus areas captured

### Step 2: Prototype Analysis
- [ ] All selected prototypes successfully loaded
- [ ] HTML structure parsed without errors
- [ ] CSS extracted from embedded styles
- [ ] All 10 design parameter categories analyzed
- [ ] Quality scores calculated for each element
- [ ] Archetype signatures detected

### Steps 4-6: Element Selection (Strategy-Dependent)
**Interactive Mode:**
- [ ] User prompted for each focus area
- [ ] Options presented with quality scores
- [ ] User selections recorded
- [ ] Compatibility warnings shown when appropriate

**Best-of Mode:**
- [ ] Elements scored across all prototypes
- [ ] Highest quality elements selected
- [ ] Archetype compatibility checked
- [ ] Multiple combinations generated if output_count > 1

**Hybrid Mode:**
- [ ] Archetype signatures identified
- [ ] Blend percentages calculated
- [ ] Parameters averaged/interpolated correctly
- [ ] Multiple blend ratios created if output_count > 1

### Step 7: Compatibility Validation
- [ ] Color contrast checked (WCAG AA minimum)
- [ ] Typography scale consistency verified
- [ ] Spacing system compatibility confirmed
- [ ] Animation timing harmony checked
- [ ] Component style coherence validated
- [ ] Conflicts resolved or flagged
- [ ] Overall coherence score ≥80

### Step 8: HTML Generation
- [ ] Production-ready HTML generated for each remix
- [ ] CSS properly embedded
- [ ] Selected/blended design parameters applied
- [ ] Component styles consistent
- [ ] Animation patterns included
- [ ] Responsive behavior maintained
- [ ] Accessibility standards met (WCAG AA)
- [ ] Documentation embedded in HTML comments

### Step 9: Metadata Tracking
- [ ] Metadata file created/updated
- [ ] Source prototypes listed
- [ ] Strategy and focus areas recorded
- [ ] Element mappings documented
- [ ] Generated file paths stored
- [ ] Timestamp recorded

### Step 10: Results Presentation
- [ ] User informed of success in configured language
- [ ] All file paths reported accurately
- [ ] Archetype blend info shown
- [ ] Quality scores displayed
- [ ] Next steps guidance provided

## Output Validation

### Generated HTML Files
- [ ] Files exist at reported paths
- [ ] File names follow pattern: remix-{date}-{index}.html
- [ ] Valid HTML5 structure
- [ ] CSS embedded and functional
- [ ] No JavaScript errors
- [ ] Responsive across breakpoints
- [ ] Accessible (WCAG AA minimum)

### Documentation Quality
- [ ] Embedded comments explain source of each element
- [ ] Strategy used is documented
- [ ] Archetype blend explained (if hybrid)
- [ ] Generation timestamp included
- [ ] Quality scores documented

### Metadata File
- [ ] Valid JSON syntax
- [ ] Complete element mapping
- [ ] Accurate source prototype references
- [ ] Correct timestamp format

## Quality Validation

- [ ] All remixes maintain coherence (score ≥80)
- [ ] No color contrast failures
- [ ] Typography scales are harmonious
- [ ] Spacing systems work together
- [ ] Animations are smooth and purposeful
- [ ] Components are visually consistent
- [ ] Overall quality maintained from source prototypes

## Error Handling

- [ ] Less than 2 prototypes → Clear error, exit gracefully
- [ ] Invalid HTML in source → Prototype skipped with warning
- [ ] Incompatible elements → User warned, alternatives offered
- [ ] File write errors → User notified with path info
- [ ] Validation failures → Conflicts resolved before generation

## Success Criteria

**Workflow is successful if:**
1. At least 2 valid prototypes selected and analyzed
2. Elements successfully selected/blended per strategy
3. Compatibility validation passed (conflicts resolved)
4. All requested remixes generated (1-3 files)
5. Files saved to correct location
6. Metadata tracking updated
7. User informed of results with accurate paths

**Workflow quality is excellent if additionally:**
8. All remixes score ≥85 coherence
9. Zero accessibility issues
10. Element combinations feel natural and intentional
11. Documentation clearly explains design decisions
12. User can immediately preview and understand results
