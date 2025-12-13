# Color Forge

**Color Palette Generator** - Multi-Agent System for Brand Color Palettes

Version: 2.0.0

---

## Overview

Color Forge is a BMAD module that generates comprehensive, accessible color palettes for brands. Powered by 5 specialized AI agents, it creates complete color systems from brand personality, industry context, and reference materials.

**Key Innovations in v2.0:**
- **OKLCH Color Space** - Perceptually uniform colors that look consistently bright across hues
- **Magic Number System** - Grade-based accessibility (40+ diff = AA, 50+ = AAA)
- **60-30-10 Rule** - Proven color distribution for visual balance
- **Token Hierarchy** - Three-level system ready for design systems
- **Dark Mode First** - Full light/dark mode validation built-in
- **2025 Trend Aware** - Current color trends and psychology

**Output feeds into:** Design System Forge, Style Guide Forge

---

## Key Features

- **OKLCH-Based Scales** - Perceptually uniform 50-900 color scales
- **Magic Number Accessibility** - Guaranteed contrast by grade difference
- **5 Specialized Agents** - Each expert in a specific color domain
- **Color Theory Based** - Harmonious palettes using proven color relationships
- **Psychology Informed** - Colors aligned with brand personality and industry
- **Dark Mode Ready** - Complete light/dark mode mappings
- **Production Ready** - Token hierarchy, CSS variables, Tailwind config

---

## What Makes v2.0 Different

### OKLCH vs HSL

Traditional HSL scales produce colors with inconsistent perceived brightness. A yellow at 50% lightness looks much brighter than a blue at 50% lightness.

**OKLCH fixes this** by using a perceptually uniform color space. All colors at the same grade have the same perceived brightness, making scales predictable and accessible.

```
Grade 500 in OKLCH:
- All colors have L = 58%
- All achieve 4.5:1 contrast on white (AA)
- All look equally bright to human eyes
```

### Magic Number System

Instead of calculating contrast ratios manually, simply use grade differences:

| Grade Diff | Contrast | WCAG Level | Safe For |
|-----------|----------|------------|----------|
| **30** | ~3:1 | AA Large/UI | Icons, borders, large text |
| **40** | ~4.5:1 | AA | Normal body text |
| **50** | ~7:1 | AAA | Enhanced accessibility |

**Example:** Text at grade 700 on background grade 100 = diff **60** → Exceeds AAA

---

## Agents

| Agent | Role | Output |
|-------|------|--------|
| **Color Palette Architect** | Orchestrates pipeline, enforces 60-30-10 | Coordination & quality assurance |
| **Color Theorist** | OKLCH-based harmony and scale generation | Base palette with full 50-900 scales |
| **Color Psychologist** | Maps colors to emotions, 2025 trends | Semantic assignments with rationale |
| **Accessibility Checker** | Magic Number validation, dark mode testing | Contrast matrix & adjustments |
| **Palette Scorer** | Quality evaluation with blocking rules | Quality report (must pass to ship) |

---

## Quick Start

### 1. Prepare Your Inputs

You need at least one of:
- **Brand Guide** - Brand personality, values, voice
- **Industry Context** - Target industry and competitors
- **Reference Colors** - Existing brand colors or inspiration

### 2. Configure Paths

Edit `config.yaml`:

```yaml
brand_guide_path: "/path/to/brand-guide.md"
industry: "technology"
reference_colors:
  - "#2196F3"  # Example existing brand color
```

### 3. Launch Color Palette Architect

```bash
/bmad:color-forge:agents:color-palette-architect
```

### 4. Generate Palette

Use `*generate` for the full pipeline, or individual commands:
- `*theory` - Generate base palette from color theory (OKLCH)
- `*psychology` - Apply color psychology mapping
- `*accessibility` - Run Magic Number accessibility audit
- `*score` - Evaluate palette quality (must pass to ship)

---

## Commands

| Command | Description |
|---------|-------------|
| `*generate` | Full palette generation pipeline (recommended) |
| `*theory` | Generate OKLCH-based harmonious palette |
| `*psychology` | Apply psychological color mapping |
| `*accessibility` | Run Magic Number accessibility check |
| `*score` | Evaluate palette quality (blocking if <90 accessibility) |
| `*load` | Load/update brand inputs |
| `*preview` | View current palette |
| `*export` | Export palette in multiple formats |
| `*help` | Show all commands |
| `*exit` | Exit Color Forge |

---

## Output Structure

The full pipeline produces:

```
{output_folder}/color-palette/
├── color-palette.md           # Complete palette documentation
├── palette-data.json          # Machine-readable with token hierarchy
├── palette-preview.html       # Visual preview (light + dark mode)
├── accessibility-report.md    # Magic Number compliance report
└── quality-scores.json        # Quality evaluation results
```

---

## Output Formats

### palette-data.json (Token Hierarchy)

```json
{
  "metadata": {
    "brand": "Example Brand",
    "generated": "2025-01-15",
    "harmony_model": "analogous",
    "color_space": "oklch"
  },
  "primitives": {
    "blue-50": { "hex": "#E3F2FD", "oklch": "oklch(97% 0.02 250)" },
    "blue-500": { "hex": "#2196F3", "oklch": "oklch(58% 0.18 250)" },
    "blue-900": { "hex": "#0D47A1", "oklch": "oklch(18% 0.08 250)" },
    "gray-50": { "hex": "#FAFAFA", "oklch": "oklch(98% 0 0)" },
    "gray-900": { "hex": "#171717", "oklch": "oklch(12% 0 0)" }
  },
  "semantic": {
    "color-primary": "{blue-500}",
    "color-primary-hover": "{blue-600}",
    "color-background": "{gray-50}",
    "color-text-primary": "{gray-900}",
    "color-success": "{green-500}",
    "color-warning": "{amber-500}",
    "color-error": "{red-500}",
    "color-info": "{blue-500}"
  },
  "darkMode": {
    "color-primary": "{blue-300}",
    "color-background": "{gray-900}",
    "color-text-primary": "{gray-100}"
  },
  "magicNumbers": {
    "text-on-background": { "fg": "700", "bg": "100", "diff": 60 },
    "button-text": { "fg": "white", "bg": "500", "diff": 50 }
  },
  "distribution": {
    "dominant": ["gray-50", "gray-100"],
    "secondary": ["primary-100", "gray-200", "gray-600"],
    "accent": ["primary-500", "accent-500"]
  },
  "scores": {
    "harmony": 85,
    "accessibility": 92,
    "psychology": 78,
    "versatility": 88,
    "distinctiveness": 76,
    "overall": 85
  }
}
```

### color-palette.md (Markdown)

Each palette includes:
- Color values (HEX + OKLCH)
- Full scale (50-900) for each color
- Magic Number quick reference
- 60-30-10 distribution guide
- Dark mode mappings
- Token hierarchy examples
- CSS/Tailwind implementation
- Accessibility notes

---

## The 60-30-10 Rule

Color Forge enforces the proven 60-30-10 distribution:

| % | Role | Typical Use | Grade Range |
|---|------|-------------|-------------|
| **60%** | Dominant | Page backgrounds, large areas | 50-100 (light) or 800-900 (dark) |
| **30%** | Secondary | Cards, sections, navigation | 100-300 or Secondary color |
| **10%** | Accent | CTAs, buttons, highlights | Primary 500-600, Accent 500 |

```
Page Layout:
┌─────────────────────────────────────────┐
│  Navigation (30% - Neutral-100/Primary) │
├─────────────────────────────────────────┤
│                                         │
│  Main Content Area                      │
│  (60% - Neutral-50 background)          │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ Card        │  │ Card        │      │
│  │ (30%)       │  │ (30%)       │      │
│  │             │  │             │      │
│  │ [CTA 10%]   │  │ [CTA 10%]   │      │
│  └─────────────┘  └─────────────┘      │
│                                         │
└─────────────────────────────────────────┘
```

---

## Quality Scoring

Palette Scorer evaluates across 5 dimensions with **blocking rules**:

| Dimension | Weight | Min Threshold | Blocking? |
|-----------|--------|---------------|-----------|
| Harmony | 20% | ≥ 80 | Yes |
| Accessibility | 25% | ≥ 90 | **BLOCKING** |
| Brand Alignment | 20% | ≥ 75 | Yes |
| Versatility | 20% | ≥ 75 | Yes |
| Distinctiveness | 15% | ≥ 65 | Advisory |

**Blocking Rule:** If Accessibility < 90, palette **cannot pass** regardless of other scores.

### Pre-Score Validation (Must Pass First)

Before scoring, these technical requirements must be met:
1. **OKLCH Uniformity** - All colors at same grade have same L (±2%)
2. **Magic Number Compliance** - All text pairings have 40+ grade diff
3. **Dark Mode Mappings** - All elements have validated dark mode equivalents

---

## Configuration

### config.yaml

```yaml
# User Settings
user_name: "Your Name"
communication_language: "English"

# Brand Context
brand_personality: "innovative, trustworthy, modern"
industry: "technology"

# Color Preferences
primary_color: ""  # Leave empty for AI to suggest, or provide hex
color_temperature: "neutral"  # warm | cool | neutral
palette_style: "modern"  # classic | modern | bold | subtle

# Output Settings
output_folder: "/path/to/output"

# Input File Paths
brand_guide_path: "/path/to/brand-guide.md"
references_path: "/path/to/references/"

# Accessibility
wcag_level: "AA"  # AA | AAA

# Quality Thresholds
quality_thresholds:
  harmony: 80
  accessibility: 90
  psychology: 75
```

---

## 2025 Color Trends

Color Forge includes current trend awareness:

### Pantone Color of the Year: Mocha Mousse
- **OKLCH:** oklch(55% 0.08 45)
- **Psychology:** Comfort, sophistication, grounding
- **Best For:** Luxury, wellness, food/beverage

### Key Trends
1. **Muted Neutrals + Neon Accents** - Calm base with vibrant pops
2. **Dark Mode + Neon** - Futuristic, high contrast
3. **Nature-Inspired** - Sustainability signaling
4. **Warm Shift** - Away from cold corporate blues

See `data/color-trends-2025.md` for full trend reference.

---

## File Structure

```
bmad/color-forge/
├── _module-installer/
│   └── install-config.yaml
├── agents/
│   ├── color-palette-architect.md   # Primary orchestrator
│   ├── color-theorist.md            # OKLCH harmony specialist
│   ├── color-psychologist.md        # Psychology + 2025 trends
│   ├── accessibility-checker.md     # Magic Number specialist
│   └── palette-scorer.md            # Quality evaluator (blocking)
├── workflows/
│   └── generate-palette/
│       ├── workflow.yaml
│       └── instructions.md
├── templates/
│   ├── color-palette-template.md    # v2.0 with OKLCH + Magic Numbers
│   └── palette-preview.html
├── data/
│   ├── color-psychology.md
│   ├── color-theory.md
│   ├── industry-colors.md
│   └── color-trends-2025.md         # NEW: Current trends
├── briefs/                          # User inputs stored here
├── config.yaml
└── README.md
```

---

## Integration with Other Forges

### Output → Design System Forge

Color Forge output can be directly used as input for Design System Forge:

```yaml
# In design-system-forge/config.yaml
color_palette_path: "{output_folder}/color-palette/color-palette.md"
```

### Output → Style Guide Forge

```yaml
# In style-guide-forge/config.yaml
color_palette_path: "{output_folder}/color-palette/color-palette.md"
```

---

## Best Practices

### OKLCH Implementation
- Always provide HEX fallbacks (OKLCH can exceed sRGB gamut)
- Use grade-based naming (primary-500, not primary-main)
- Test in browsers: Chrome 111+, Safari 15.4+, Firefox 113+

### Magic Number Usage
- Text on backgrounds: Always 40+ grade difference (AA)
- Important text: Use 50+ grade difference (AAA)
- UI components: 30+ grade difference minimum

### Dark Mode
- Invert background grades (50→900, 100→800)
- Lighten primary colors (500→300 or 400)
- Test all semantic pairings in both modes

### 60-30-10 Distribution
- Resist urge to use more accent color
- CTAs lose impact when accent is overused
- Neutrals are your friend for the 60%

---

## Troubleshooting

### Palette fails accessibility check
Magic Number system makes this easy to fix - adjust grade pairings until difference is 40+.

### OKLCH colors look wrong
Likely a gamut issue. Use the HEX fallbacks, which are gamut-mapped to sRGB.

### Palette feels wrong for brand
Run `*psychology` again with more detailed brand personality. Consider 2025 trends for context.

### Colors don't work in dark mode
Ensure all dark mode mappings exist. Primary should lighten (500→300), backgrounds should darken (50→900).

### Quality score too low
Check which dimension is failing. If Accessibility < 90, that's blocking - fix contrast issues first.

---

## Version History

### 2.0.0 (Current)
- **OKLCH Color Space** - Perceptually uniform scale generation
- **Magic Number System** - Grade-based accessibility guarantee
- **60-30-10 Rule** - Color distribution guidance
- **Token Hierarchy** - Three-level token system
- **Dark Mode First** - Full light/dark validation
- **2025 Trend Awareness** - Current color psychology
- **Blocking Quality Rules** - Accessibility < 90 = fail
- **Pre-Score Validation** - Technical requirements before scoring

### 1.0.0 (Initial Release)
- Color Palette Generator with 5 specialized agents
- Color theory-based harmony generation
- Color psychology mapping for brand alignment
- WCAG accessibility validation
- Quality scoring across multiple dimensions
- Multiple export formats (MD, JSON, HTML preview)

---

## Credits

Built with the BMAD Framework.

Follows the proven multi-agent pattern for generating comprehensive, high-quality outputs.
