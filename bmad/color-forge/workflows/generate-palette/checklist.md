# Color Palette Generation Checklist

Use this checklist to verify completeness of generated color palette.

## Pre-Generation

- [ ] Brand personality defined (3-5 words)
- [ ] Industry identified

### LOCKED Brand Colors (Source of Truth)
- [ ] PRIMARY brand color provided (hex) - LOCKED at grade 500
- [ ] SECONDARY brand color provided (hex) - LOCKED at grade 500 or skip
- [ ] ACCENT brand color provided (hex) - LOCKED at grade 500 or generate
- [ ] NEUTRAL/BACKGROUND color provided (hex) - LOCKED at grade 100 or standard gray
- [ ] All locked colors noted as IMMUTABLE

### Preferences (for generated colors only)
- [ ] Color temperature preference noted (warm/cool/neutral)
- [ ] Palette style preference noted (classic/modern/bold/subtle)
- [ ] Brand guide loaded (if available)

## Pipeline Execution

### Phase 1: Context
- [ ] All required inputs gathered
- [ ] Brand guide processed (if provided)
- [ ] Context package prepared for specialists

### Phase 2: Color Theory
- [ ] **LOCKED colors preserved EXACTLY at grade 500**
- [ ] Scales built around locked colors (same hue)
- [ ] Only NEW colors generated for missing roles
- [ ] 4+ colors total (Primary, Secondary, Accent, Neutral)
- [ ] Full 50-900 scales for each color
- [ ] OKLCH values provided (with fixed L per grade)
- [ ] HEX values provided
- [ ] Harmony score calculated (must be ≥80)

### Phase 3: Color Psychology
- [ ] Semantic roles assigned (primary, secondary, accent, neutral)
- [ ] Status colors assigned (success, warning, error, info)
- [ ] Psychological rationale provided for each
- [ ] Cultural considerations noted
- [ ] Psychology score calculated (must be ≥75)

### Phase 4: Accessibility
- [ ] Magic Number system applied
- [ ] Light mode contrast validated
- [ ] Dark mode contrast validated
- [ ] Color blindness check completed
- [ ] Failures identified with specific fixes
- [ ] Accessibility score calculated (must be ≥90)

## Feedback Loop (if needed)

- [ ] Low scores identified
- [ ] Specific feedback provided to specialist
- [ ] Specialist revised output
- [ ] Max 3 rounds respected per specialist

## Quality Thresholds

| Metric | Minimum | Status |
|--------|---------|--------|
| **Brand Color Preservation** | **100%** | [ ] Pass (BLOCKING) |
| Harmony Score | ≥80 | [ ] Pass |
| Psychology Score | ≥75 | [ ] Pass |
| Accessibility Score | ≥90 | [ ] Pass (BLOCKING) |

**Verify locked colors**: Compare output grade 500 hex values against input.
Must match EXACTLY.

## Final Output

TWO files generated:

- [ ] `color-palette.json` created
  - [ ] Metadata complete (brand, version, scores)
  - [ ] All color scales included (50-900)
  - [ ] Both OKLCH and HEX values
  - [ ] Semantic mappings defined
  - [ ] Accessibility info (Magic Numbers)
  - [ ] Dark mode recommendations

- [ ] `color-palette.md` created
  - [ ] Quality scores summary
  - [ ] Palette overview with rationale
  - [ ] All color scales documented
  - [ ] Semantic assignments with psychology
  - [ ] Status colors defined
  - [ ] Magic Number quick reference
  - [ ] Accessibility guide
  - [ ] Dark mode recommendations
  - [ ] 60-30-10 application guide
  - [ ] Usage guidelines (Do's/Don'ts)

## Post-Generation

- [ ] Palette reviewed by stakeholder
- [ ] Ready to feed into design-system-forge
- [ ] Ready to feed into style-guide-forge

---

## What's NOT in the Output

v2 simplified output - these are intentionally excluded:

- ❌ colors.css (handled by design-system-forge → tokens.css)
- ❌ palette-preview.html (nice-to-have, not essential)
- ❌ accessibility-report.md (consolidated in main doc)
- ❌ quality-scores.json (consolidated in main doc)
- ❌ Multiple intermediate files

---

*Color Forge v2 - OKLCH + Magic Numbers. 2 files. Production ready.*
