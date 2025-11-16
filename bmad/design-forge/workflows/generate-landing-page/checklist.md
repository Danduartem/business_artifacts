# Generate Landing Page - Quality Checklist

## Pre-Generation Validation

- [ ] User has selected 2-5 sections for landing page
- [ ] Section order is confirmed
- [ ] Generation approach chosen (extract or archetype-first)
- [ ] Design system established (extracted or archetype-based)
- [ ] Section briefs loaded for all selected sections
- [ ] Content gathered for each section (or placeholder approved)

## Design System Validation

### If Extract Approach:
- [ ] Reference prototype identified or generated
- [ ] Design System Extractor successfully extracted tokens
- [ ] design-system.json created and validated
- [ ] All 10 design parameters captured (colors, typography, spacing, etc.)
- [ ] Archetype signature documented

### If Archetype-First Approach:
- [ ] Archetype selected based on user vision
- [ ] Design system JSON created with archetype defaults
- [ ] Tokens consistent with archetype philosophy

## Section Generation Validation

- [ ] All section briefs loaded successfully
- [ ] Application instructions generated for each section
- [ ] Designer agents spawned in parallel (one per section)
- [ ] All sections generated successfully (no failures)
- [ ] Each section saved as individual HTML file
- [ ] Each section uses design system tokens correctly

## Assembly Validation

- [ ] All section HTML files loaded
- [ ] Global design system CSS variables extracted
- [ ] Sections combined into single full-page HTML
- [ ] Styles merged without conflicts
- [ ] Scripts combined without conflicts
- [ ] Section IDs assigned for navigation
- [ ] Navigation links created (if navbar/footer exist)

## Quality Assurance

### Design Consistency:
- [ ] All sections use same color palette
- [ ] All sections use same typography system
- [ ] All sections use same spacing scale
- [ ] All sections use same border/shadow styles
- [ ] All sections use same animation patterns
- [ ] Visual coherence maintained across sections

### Technical Quality:
- [ ] Valid HTML structure
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] No JavaScript errors
- [ ] No CSS conflicts
- [ ] Optimized performance (minimal bloat)

### Content Quality:
- [ ] All required content included in each section
- [ ] Section briefs' structural requirements met
- [ ] Placeholder content clearly marked (if used)
- [ ] No lorem ipsum in final output (unless intentional)

## Output Validation

- [ ] full-page.html created successfully
- [ ] index.html created (copy of full-page.html)
- [ ] Individual section files created
- [ ] design-system.json saved
- [ ] landing-page-report.md generated
- [ ] All files in correct output folder

## Post-Generation Validation

- [ ] Landing page opens in browser without errors
- [ ] All sections visible and properly styled
- [ ] Smooth scrolling works (if navigation exists)
- [ ] Responsive behavior correct at all breakpoints
- [ ] Images load correctly (if included)
- [ ] Animations work as expected

## User Communication

- [ ] Success summary presented to user
- [ ] File locations communicated clearly
- [ ] Next steps suggested (screenshot, analyze, refine)
- [ ] Optional actions offered (open in browser, etc.)
- [ ] User satisfied with results or issues addressed

## Error Recovery

If any issues occurred:
- [ ] Failed sections identified
- [ ] Error messages clear and actionable
- [ ] Regeneration options offered
- [ ] User informed of workarounds
- [ ] Partial success handled gracefully

## Documentation

- [ ] Generation report includes all metadata
- [ ] Design system documented completely
- [ ] Section list accurate
- [ ] Consistency scores calculated
- [ ] Next steps clearly outlined
