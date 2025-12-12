# Generate Style Guide - Workflow Instructions

## Overview

This workflow orchestrates the creation of a comprehensive web design style guide using 5 specialist agents working in parallel. The result is a production-ready design system documentation with design tokens, component specifications, and export files.

---

## Prerequisites

Before starting, ensure you have:

1. **Brand Guide** - Your existing brand guidelines document (PDF or Markdown)
2. **Color Palette** - Output from Color Forge (JSON) or custom color JSON
3. **Reference Sites** - 1-5 URLs of websites that inspire your design direction
4. **Logo** (optional but recommended) - SVG or PNG of your brand logo
5. **Brand Assets** (optional) - Folder containing brand imagery, icons, patterns

---

## Workflow Steps

### Phase 1: Input Collection

**Step 1.1: Gather Required Files**

Collect file paths for:
- Brand guide document
- Color palette JSON
- Logo file
- Brand assets folder

**Step 1.2: Collect Reference URLs**

List 1-5 website URLs that represent your design inspiration:
- Consider sites that match your target aesthetic
- Include competitors or industry leaders
- Mix different styles for diversity

**Step 1.3: Brand Context Questions**

If brand guide is sparse, gather:
- Brand personality (3-5 adjectives)
- Target audience description
- Industry/sector
- Design goals (feelings to evoke)
- Constraints (things to avoid)

---

### Phase 2: Preparation

**Step 2.1: Validate Inputs**

- Verify all file paths exist
- Parse and validate color JSON
- Test reference URLs are accessible

**Step 2.2: Create Output Directories**

```bash
mkdir -p {style_guide_output_folder}
mkdir -p {style_guide_output_folder}/reference-screenshots
mkdir -p {style_guide_output_folder}/exports
```

**Step 2.3: Load Reference Data**

Read all data files to inform agent prompts:
- typography-best-practices.md
- spacing-systems.md
- component-patterns.md
- accessibility-checklist.md
- motion-guidelines.md
- design-token-spec.md

---

### Phase 3: Screenshot Capture

**Step 3.1: Capture Reference Site Screenshots**

For each reference URL, capture:
- Desktop viewport (1440px width)
- Mobile viewport (375px width)

Use Playwright or similar browser automation:

```javascript
// Example capture command structure
// playwright screenshot {url} --viewport-width=1440 --output=site-1-desktop.png
// playwright screenshot {url} --viewport-width=375 --output=site-1-mobile.png
```

**Step 3.2: Save Screenshots**

Save to: `{style_guide_output_folder}/reference-screenshots/`

Naming convention:
- `site-1-desktop.png`
- `site-1-mobile.png`
- `site-2-desktop.png`
- etc.

---

### Phase 4: Parallel Agent Execution

**CRITICAL: Launch all 5 agents in a SINGLE message for true parallelism.**

**Step 4.1: Spawn Brand Translator**

Input:
- Brand guide content
- Logo path
- Brand context

Output: `brand-foundation.json`

**Step 4.2: Spawn Reference Analyzer**

Input:
- Screenshot file paths
- Brand context

Output: `reference-analysis.json`

**Step 4.3: Spawn Foundations Architect**

Input:
- Color palette JSON
- Typography settings (base_size, scale_ratio)
- Spacing settings (base_unit)

Output: `foundations.json`

**Step 4.4: Spawn Component Designer**

Input:
- References to foundations patterns
- Component depth setting (comprehensive)

Output: `components.json`

**Step 4.5: Spawn Interaction Designer**

Input:
- Brand personality
- Reference patterns

Output: `interactions.json`

---

### Phase 5: Quality Validation

**Step 5.1: Wait for All Agents**

Monitor completion of all 5 specialist agents.

**Step 5.2: Spawn Style Guide Scorer**

Input:
- Paths to all 5 generated JSON files

Output: `style-guide-scores.json`

Scoring dimensions:
- Completeness (25%)
- Consistency (25%)
- Accessibility (20%)
- Brand Alignment (15%)
- Usability (15%)

**Step 5.3: Review Scores**

Present scores to user with:
- Overall grade
- Dimension breakdown
- Gaps identified
- Improvement recommendations

---

### Phase 6: Assembly

**Step 6.1: Merge JSON Outputs**

Combine all agent outputs into unified documents:

1. **style-guide.md** - Human-readable comprehensive guide
2. **design-tokens.json** - Structured token file for tools
3. **design-principles.md** - Standalone principles document
4. **component-specs.md** - Detailed component documentation

**Step 6.2: Generate Exports**

Based on export_formats setting:

**CSS Custom Properties:**
```css
:root {
  /* Colors */
  --color-primary: #...;
  /* Typography */
  --font-family-sans: '...';
  --font-size-base: 1rem;
  /* Spacing */
  --spacing-4: 1rem;
  /* etc. */
}
```

**Tailwind Configuration:**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: { /* from palette */ },
      fontFamily: { /* from foundations */ },
      fontSize: { /* from scale */ },
      spacing: { /* from grid */ },
      // etc.
    }
  }
}
```

---

### Phase 7: Integration

**Step 7.1: Offer Design Forge Integration**

If user accepts, update Design Forge config:
- Set `style_guide_path` to generated style-guide.md
- Set `design_principles_path` to generated design-principles.md

**Step 7.2: Confirm Completion**

Present summary:
- Files created
- Quality score
- Next steps

---

## Agent Responsibilities

| Agent | Focus | Output |
|-------|-------|--------|
| Brand Translator | Brand essence → digital principles | brand-foundation.json |
| Reference Analyzer | Visual pattern extraction | reference-analysis.json |
| Foundations Architect | Typography, spacing, tokens | foundations.json |
| Component Designer | UI component specs | components.json |
| Interaction Designer | Motion guidelines | interactions.json |
| Style Guide Scorer | Quality validation | style-guide-scores.json |

---

## Output Files Summary

```
{output_folder}/
├── brand-foundation.json       # Brand principles, voice, logo rules
├── reference-analysis.json     # Visual pattern analysis
├── foundations.json            # Typography, spacing, color tokens
├── components.json             # Component specifications
├── interactions.json           # Motion guidelines
├── style-guide-scores.json     # Quality validation
├── style-guide.md              # Complete human-readable guide
├── design-tokens.json          # Unified token file
├── design-principles.md        # Standalone principles
├── component-specs.md          # Component documentation
├── reference-screenshots/      # Captured screenshots
│   ├── site-1-desktop.png
│   ├── site-1-mobile.png
│   └── ...
└── exports/
    ├── tokens.css              # CSS custom properties
    └── tailwind.config.js      # Tailwind configuration
```

---

## Error Handling

### File Not Found
If required files are missing, prompt user to provide correct paths.

### URL Inaccessible
If reference URLs fail, offer to:
- Skip that reference
- Use cached/manual screenshot
- Continue without that site

### Agent Failure
If an agent fails:
1. Log the error
2. Offer to retry that agent
3. Continue with partial results if non-critical

### Low Quality Score
If score < 60:
1. Present specific gaps
2. Offer to regenerate weak sections
3. Allow manual review and editing

---

## Tips for Best Results

1. **Brand Guide Quality** - The richer your brand guide, the better the output
2. **Reference Diversity** - Include varied inspiration for comprehensive patterns
3. **Color Palette** - Use Color Forge for best color system integration
4. **Review Scores** - Address any gaps before using in production
5. **Iterate** - Use `*update` command to refine specific sections
