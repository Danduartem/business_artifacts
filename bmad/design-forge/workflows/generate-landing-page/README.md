# Generate Landing Page Workflow

**Version:** 4.0.0
**Module:** Design Forge
**Type:** Interactive Multi-Section Orchestration

---

## Overview

The Generate Landing Page workflow orchestrates the creation of complete, cohesive landing pages with 2-5 sections that share a unified design system. This is Design Forge's v4.0 flagship feature that solves the "multi-section consistency" problem.

**What it does:**
- Generates complete landing pages with multiple sections
- Ensures design system consistency across all sections
- Offers two approaches: extract from reference or archetype-first
- Spawns parallel designer agents for efficient generation
- Assembles sections into cohesive full-page HTML
- Validates quality and consistency automatically

---

## Quick Start

### From Design Director:

```
/design-forge
*landing-page
```

### Standalone:

```
workflow bmad/design-forge/workflows/generate-landing-page/workflow.yaml
```

---

## How It Works

### Phase 1: Planning

**Section Selection:**
- Choose from quick templates (Minimal, Standard, Complete)
- Or build custom section list
- Confirm section order

**Generation Approach:**
- **Extract from Reference:** Analyze existing prototype and apply its design to all sections
- **Archetype-First:** Select archetype and apply consistently to all sections

### Phase 2: Design System Establishment

**Extract Approach:**
1. Provide reference prototype (or generate hero as reference)
2. Design System Extractor analyzes and extracts all tokens
3. Generates design-system.json specification
4. Review and confirm design system

**Archetype-First Approach:**
1. Describe brand personality and vision
2. Select archetype (or use recommendation)
3. Generate design system from archetype defaults
4. Creates design-system.json specification

### Phase 3: Content & Generation

**Content Gathering:**
- Provide specific content for each section
- Or use placeholder content for faster generation

**Parallel Section Generation:**
- Spawns designer agents for ALL sections simultaneously
- Each agent receives:
  - Section brief (structural requirements)
  - Design system (token constraints)
  - User content (specific copy)
- Generates self-contained HTML sections

### Phase 4: Assembly

**Full Page Creation:**
- Combines individual sections into complete HTML
- Merges styles into global design system
- Creates navigation links (if navbar/footer)
- Ensures smooth scrolling and proper IDs

### Phase 5: Validation & Output

**Quality Checks:**
- Design system consistency (colors, typography, spacing)
- Technical quality (valid HTML, responsive, accessible)
- Content completeness

**Outputs:**
- `full-page.html` - Complete landing page
- `index.html` - Easy access copy
- `section-[N]-[type].html` - Individual sections
- `design-system.json` - Design specification
- `landing-page-report.md` - Generation summary

---

## Section Templates

### Minimal Landing (3 sections)
```
1. Hero
2. Features/Solution
3. CTA
```

**Best for:** Simple product launches, coming soon pages, focused offers

### Standard Landing (5 sections)
```
1. Hero
2. Problem
3. Solution
4. Testimonials
5. CTA
```

**Best for:** Service pages, course sales, B2B offerings

### Complete Landing (7 sections)
```
1. Navbar
2. Hero
3. Problem
4. Solution
5. Offer
6. Testimonials
7. CTA
8. Footer
```

**Best for:** Full sales pages, comprehensive product pages, authority sites

### Available Sections
- **navbar** - Navigation bar with menu
- **hero** - First impression, value proposition
- **about-me** - Personal story or brand story
- **problem** - Pain point awareness and amplification
- **vision** - Aspirational future-self transformation
- **solution** - Methodology or approach explanation
- **offer** - Conversion/purchase section
- **testimonials** - Social proof and credibility
- **faq** - Frequently asked questions
- **cta** - Call-to-action section
- **footer** - Links, legal, contact info

---

## Generation Approaches

### Approach 1: Extract from Reference (Recommended)

**When to use:**
- You have an existing design you want to match
- You generated a hero and want to extend it
- You need 100% consistency with brand guidelines

**Advantages:**
- Perfect design system extraction
- Guaranteed consistency
- Matches existing aesthetic exactly

**Process:**
1. Provide reference prototype path (or generate hero)
2. Design System Extractor analyzes HTML/CSS
3. Extracts all design tokens automatically
4. Applies tokens to all other sections

### Approach 2: Archetype-First

**When to use:**
- Starting from scratch with new design
- You know the aesthetic but don't have a reference
- You want to explore a specific archetype throughout

**Advantages:**
- Fast start without reference
- Coherent aesthetic from single archetype
- Consistent design philosophy throughout

**Process:**
1. Describe brand personality and vision
2. Select archetype (or use AI recommendation)
3. Generate design system from archetype defaults
4. Apply consistently to all sections

---

## Design System Tokens

The workflow ensures these tokens are consistent across all sections:

### Core Tokens:
- **Colors:** Primary, secondary, accent, backgrounds, text colors
- **Typography:** Font families, sizes, weights, line heights
- **Spacing:** Base unit, spacing scale, density level
- **Layout:** Container width, grid columns, breakpoints
- **Borders:** Border radius values, widths, styles
- **Shadows:** Box shadows, text shadows, depth levels
- **Animations:** Transition durations, timing functions, intensity

### Component Patterns:
- **Buttons:** Primary, secondary, sizes, states
- **Cards:** Background, borders, padding, shadows
- **Forms:** Input styles, focus states, validation

---

## Output Files

### full-page.html
Complete assembled landing page with:
- All sections in order
- Global design system CSS variables
- Combined styles and scripts
- Navigation links (if applicable)
- Production-ready HTML

### Individual Sections
- `section-1-hero.html`
- `section-2-problem.html`
- `section-3-solution.html`
- etc.

Useful for:
- Isolated refinement with *refine workflow
- A/B testing individual sections
- Modular updates

### design-system.json
Complete design system specification:
- All extracted/generated tokens
- Archetype signature
- Component patterns
- Metadata and versioning

### landing-page-report.md
Generation summary including:
- Sections included
- Design system details
- Consistency scores
- Next steps suggestions

---

## Post-Generation Actions

### Immediate Options:
- **Open in browser** - View full landing page
- **Generate screenshots** - Capture visuals at multiple viewports
- **Analyze design** - Run metrics and quality analysis

### Refinement Options:
- **Refine individual sections** - Use *refine on any section
- **Remix sections** - Combine elements from multiple versions
- **Regenerate sections** - Replace any section while maintaining design system

---

## Integration with Other Workflows

### Screenshot Workflow:
```
*screenshot
Select: landing-page/full-page.html
Viewports: mobile, tablet, desktop
```

### Analyze Workflow:
```
*analyze
Mode: Metrics
File: landing-page/full-page.html
```

### Refine Workflow:
```
*refine
File: landing-page/section-2-problem.html
```

After refinement, manually update full-page.html or regenerate with new section.

---

## Best Practices

### Content Preparation:
1. **Gather real content beforehand** - Headlines, copy, CTAs
2. **Use actual brand colors** - Don't rely on placeholders
3. **Have images/assets ready** - Or clear descriptions
4. **Know your audience** - Helps archetype selection

### Design Consistency:
1. **Start with extract approach** if you have a reference
2. **Use archetype-first** only for new designs
3. **Review design system** before generation starts
4. **Don't mix approaches** within single landing page

### Quality Assurance:
1. **Test at all breakpoints** - Mobile, tablet, desktop
2. **Check accessibility** - Color contrast, keyboard navigation
3. **Validate content** - No lorem ipsum in production
4. **Review consistency** - Visually compare sections

---

## Troubleshooting

### Section Generation Fails:
- Check section brief exists for requested section type
- Verify prototype_output_folder is writable
- Review error message for specific section
- Regenerate failed section individually

### Design System Extraction Fails:
- Ensure reference prototype is valid HTML
- Check that prototype has embedded styles
- Fall back to archetype-first approach
- Manually specify design tokens if needed

### Assembly Issues:
- Verify all sections have valid HTML structure
- Check for unclosed tags or syntax errors
- Ensure no conflicting CSS selectors
- Review merged scripts for conflicts

### Inconsistent Styling:
- Regenerate sections with stricter design system constraints
- Check that all sections loaded design-system.json correctly
- Manually align any outlier sections
- Consider using extract approach for tighter control

---

## Examples

### Example 1: SaaS Product Landing Page

**Template:** Standard Landing
**Approach:** Archetype-First
**Archetype:** The Modern Artisan

**Sections:**
1. Hero - "Save 10 hours a week on email"
2. Problem - "Email overwhelm is killing productivity"
3. Solution - "AI-powered inbox that works like you do"
4. Testimonials - 3 customer quotes
5. CTA - "Start your 14-day free trial"

**Result:** Cohesive 5-section landing page with contemporary, sophisticated aesthetic throughout

### Example 2: Personal Brand About Page

**Template:** Custom
**Approach:** Extract from Reference
**Reference:** Existing hero section

**Sections:**
1. Hero (existing)
2. About-Me - Personal story
3. Vision - Transformation promise
4. Testimonials - Client results
5. CTA - Book consultation

**Result:** Multi-section page perfectly matching existing hero's design language

### Example 3: Course Sales Page

**Template:** Complete Landing
**Approach:** Archetype-First
**Archetype:** The Bold Innovator

**Sections:**
1. Navbar
2. Hero - Course promise
3. Problem - Current struggle
4. Solution - Course curriculum
5. Offer - Pricing tiers
6. FAQ - Common questions
7. CTA - Enrollment button
8. Footer

**Result:** Full 8-section sales page with energetic, dynamic design throughout

---

## Advanced Usage

### Custom Design System:
Manually edit design-system.json before generation to:
- Fine-tune color values
- Adjust spacing scale
- Modify component patterns
- Add custom tokens

### Section Variations:
Generate multiple landing pages with:
- Same sections, different archetypes
- Same design system, different content
- A/B test variations

### Iterative Refinement:
1. Generate initial landing page
2. Refine individual sections
3. Extract design system from refined section
4. Regenerate other sections with updated design system

---

## Performance Notes

**Generation Time:**
- 2-3 sections: ~60-90 seconds
- 4-5 sections: ~90-120 seconds
- 6+ sections: ~120-180 seconds

**Parallelization:**
All sections generate simultaneously, so adding more sections doesn't linearly increase time.

**Optimization Tips:**
- Use placeholder content for faster initial generation
- Refine individual sections after initial generation
- Generate screenshots in batch mode after assembly

---

## Version History

### v4.0.0 (2025-11-14)
- Initial release of multi-section coordination
- Two-approach system (extract vs archetype-first)
- Parallel section generation
- Full-page assembly with design system consistency
- Comprehensive validation and reporting

---

## Next Features (v4.1+)

Planned enhancements:
- Visual diff tools for before/after comparison
- Section library (save/reuse favorite sections)
- Template marketplace (share landing page templates)
- Real-time preview during generation
- Drag-and-drop section reordering

---

**Design Forge v4.0 - Generate beautiful, cohesive landing pages in minutes! 🎨**
