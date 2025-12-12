# Style Guide Forge

A multi-agent BMAD module that generates comprehensive web design style guides from brand inputs. Creates the foundational design system that integrates directly with Design Forge for consistent design generation.

## Overview

Style Guide Forge uses **7 specialized agents** to create production-ready style guides:

| Agent | Approach | Focus |
|-------|----------|-------|
| **Style Guide Director** | Orchestrator | Gathers inputs, spawns agents, assembles output |
| **Brand Translator** | Brand-First | Converts brand guide to digital design principles |
| **Reference Analyzer** | Inspiration-First | Captures screenshots and analyzes design patterns |
| **Foundations Architect** | System-First | Typography, spacing, tokens, grid systems |
| **Component Designer** | Usage-First | 18+ UI components with all states |
| **Interaction Designer** | Feel-First | Motion, timing, microinteractions |
| **Style Guide Scorer** | Quality | Validates completeness and consistency |

## Quick Start

1. **Start the Director:**
   ```
   /bmad:style-guide-forge:agents:style-guide-director
   ```

2. **Generate a Style Guide:**
   - Select `*generate` from the menu
   - Provide your brand guide, colors, reference sites, logo, and assets
   - Wait for 5 specialist agents to work in parallel
   - Review scored results

## Inputs Required

| Input | Description | Format |
|-------|-------------|--------|
| Brand Guide | Your existing brand guidelines | PDF or Markdown |
| Colors | Color palette from Color Forge | JSON |
| Reference Sites | Inspiration website URLs | 1-5 URLs |
| Logo | Brand logo file(s) | SVG, PNG |
| Brand Assets | Icons, imagery, patterns | Folder path |

## Outputs Generated

```
{output_folder}/
├── style-guide.md              # Complete human-readable guide
├── design-tokens.json          # All tokens in standard format
├── design-principles.md        # Design principles document
├── component-specs.md          # Comprehensive component documentation
├── style-guide-scores.json     # Quality validation scores
├── reference-screenshots/      # Captured reference site screenshots
└── exports/
    ├── tokens.css              # CSS custom properties
    └── tailwind.config.js      # Tailwind configuration
```

## Agent Philosophies

### Brand Translator
> "Digital design is brand made interactive"

Extracts brand essence and translates it to digital design language: principles, visual mapping, voice guidelines, and logo usage rules.

### Reference Analyzer
> "Learn from the best, create something unique"

Uses Playwright to capture screenshots of inspiration sites, then visually analyzes them using Claude's multimodal capabilities to extract design patterns.

### Foundations Architect
> "Strong foundations create scalable systems"

Creates the token architecture: typography scales, spacing systems (8pt grid), breakpoints, shadows, border radius, and color token mapping.

### Component Designer
> "Components are the vocabulary of interaction"

Documents 18+ component types with all states, variants, accessibility requirements, and visual do's/don'ts.

### Interaction Designer
> "Motion gives interfaces soul"

Defines animation principles, timing tokens, easing curves, microinteractions, and reduced-motion alternatives.

## Menu Commands

| Command | Description |
|---------|-------------|
| `*generate` | Create complete style guide (main workflow) |
| `*analyze` | Analyze existing style guide for gaps |
| `*update` | Update specific sections |
| `*export` | Export in various formats |
| `*apply` | Apply to Design Forge config |
| `*help` | Show help menu |

## Design Forge Integration

After generation, Style Guide Forge can:
1. Export `style-guide.md` to Design Forge's expected path
2. Export `design-principles.md` to principles path
3. Update Design Forge `config.yaml` with new paths
4. Generate `design-system.json` compatible format

## Quality Scoring

The Style Guide Scorer validates across 5 dimensions:

| Dimension | Weight | Criteria |
|-----------|--------|----------|
| Completeness | 25% | All required sections present |
| Consistency | 25% | Tokens and values align |
| Accessibility | 20% | WCAG compliance built-in |
| Brand Alignment | 15% | Matches brand personality |
| Usability | 15% | Clear, actionable documentation |

## Configuration

See `config.yaml` for all available settings:
- Output folder location
- Export formats (CSS, Tailwind)
- Typography scale settings
- Spacing base unit
- Screenshot viewports
- WCAG level requirements

## Related Modules

- **Color Forge**: Generates color palettes (input for Style Guide Forge)
- **Design Forge**: Uses style guides to generate consistent designs
- **Persona Forge**: Creates user personas for design context
