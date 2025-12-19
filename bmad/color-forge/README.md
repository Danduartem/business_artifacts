# Color Forge

**Color Palette Generator** - Multi-Agent System for Brand Color Palettes

Version: 2.2.0

---

## Overview

Color Forge is a BMAD module that generates comprehensive, accessible color palettes for brands. Powered by 4 specialized AI agents in a sequential pipeline with feedback loop, it creates complete color systems from brand personality and industry context.

**Key Features:**
- **Brand Colors as Source of Truth** - Your colors are LOCKED, never replaced
- **OKLCH Color Space** - Perceptually uniform colors
- **Magic Number System** - Grade-based accessibility (40+ diff = AA, 50+ = AAA)
- **Feedback Loop** - Quality control with max 3 rounds per specialist
- **2-File Output** - JSON for code, MD for designers (80/20 rule)
- **Warm Shadows** - Tinted shadows using neutral hue (not cold gray)
- **Surface Hierarchy** - Base, raised, overlay, sunken levels
- **Focus Rings** - Branded accessibility (not browser blue)
- **Overlays & Interactions** - Scrim, hover, polish effects
- **Text Selection** - Branded ::selection colors
- **Gradients** - Brand gradient library (6 presets)

**Output feeds into:** design-system-forge, style-guide-forge

---

## Agents

| Agent | Role |
|-------|------|
| **Color Palette Architect** | Orchestrator with feedback loop |
| **Color Theorist** | OKLCH-based harmony and scale generation |
| **Color Psychologist** | Semantic mapping and brand alignment |
| **Accessibility Checker** | Magic Number WCAG validation |

---

## Brand Colors Are Source of Truth

When you provide existing brand colors, they are **LOCKED**:

```
Primary:   #E63946 → Primary-500 = #E63946 (EXACT)
Secondary: #1D3557 → Secondary-500 = #1D3557 (EXACT)
Neutral:   #F8E8D8 → Neutral-100 = #F8E8D8 (warm background)
```

**What Color Forge does:**
1. Locks your colors at their grade (no modification)
2. Builds 50-900 scales around each (preserving hue)
3. If neutral provided: builds WARM/tinted scale (not cold gray)
4. Generates complementary colors ONLY for missing roles
5. Never suggests "better" alternatives - YOUR colors are the answer

**Custom Neutral**: Many brands use warm backgrounds (cream, beige) instead of
cold gray. Provide `neutral_color` to ensure cohesive warm tones throughout.

---

## Quick Start

### 1. Launch Color Palette Architect

```bash
/bmad:color-forge:agents:color-palette-architect
```

### 2. Generate Palette

```
*generate
```

### 3. Provide Brand Context

When prompted, provide:
- **PRIMARY brand color** (hex) - LOCKED at grade 500
- **SECONDARY brand color** (hex) - LOCKED at grade 500 or skip
- **ACCENT color** (hex) - LOCKED at grade 500 or generate
- **NEUTRAL/BACKGROUND color** (hex) - LOCKED at grade 100 or standard gray
- Brand personality (3-5 words)
- Industry

---

## Output

Two files only (80/20 rule):

```
{output_folder}/color-palette/
├── color-palette.json    # Machine-readable for design-system-forge
└── color-palette.md      # Designer reference documentation
```

### color-palette.json

```json
{
  "metadata": {
    "brand": "...",
    "colorSpace": "OKLCH",
    "version": "2.0",
    "scores": { "harmony": 85, "psychology": 82, "accessibility": 94 }
  },
  "colors": {
    "primary": {
      "scale": {
        "50": { "oklch": "oklch(97% 0.02 250)", "hex": "#E3F2FD" },
        "500": { "oklch": "oklch(58% 0.18 250)", "hex": "#2196F3" },
        "900": { "oklch": "oklch(18% 0.08 250)", "hex": "#0D47A1" }
      }
    }
  },
  "semantic": { ... },
  "accessibility": { "magicNumbers": { ... } },
  "darkMode": { ... }
}
```

### color-palette.md

Designer reference with:
- Quality scores summary
- Color scales (OKLCH + HEX)
- Semantic assignments with rationale
- Magic Number quick reference
- Dark mode recommendations
- 60-30-10 application guide

---

## OKLCH Color Space

Traditional HSL scales produce colors with inconsistent perceived brightness. OKLCH fixes this.

```
Grade 500 in OKLCH:
- All colors have L = 58%
- All achieve 4.5:1 contrast on white (AA)
- All look equally bright to human eyes
```

---

## Magic Number System

Grade difference guarantees contrast ratios:

| Grade Diff | Contrast | WCAG Level | Safe For |
|-----------|----------|------------|----------|
| **30** | ~3:1 | AA Large/UI | Icons, borders, large text |
| **40** | ~4.5:1 | AA | Normal body text |
| **50** | ~7:1 | AAA | Enhanced accessibility |

**Example:** Text at grade 700 on background grade 100 = diff **60** → Exceeds AAA

---

## 60-30-10 Rule

Proven color distribution:

| % | Role | Usage |
|---|------|-------|
| **60%** | Dominant | Page backgrounds |
| **30%** | Secondary | Cards, sections |
| **10%** | Accent | CTAs, highlights |

---

## Quality Thresholds

| Metric | Minimum | Blocking? |
|--------|---------|-----------|
| **Brand Color Preservation** | **100%** | **Yes** |
| Harmony Score | 80 | No |
| Psychology Score | 75 | No |
| Accessibility Score | 90 | **Yes** |

**Brand Color Preservation**: Locked colors must appear EXACTLY at grade 500.
If modified → automatic rejection.

Feedback loop: Max 3 rounds per specialist.

---

## Pipeline

Sequential (each step depends on previous):

1. **Context Gathering** → Architect collects inputs
2. **Color Theory** → Theorist generates OKLCH palette
3. **Color Psychology** → Psychologist assigns semantics
4. **Accessibility** → Checker validates Magic Numbers
5. **Compilation** → Architect compiles final output

---

## Integration

### → design-system-forge

```yaml
color_palette_path: "{output_folder}/color-palette/color-palette.json"
```

### → style-guide-forge

```yaml
color_palette_path: "{output_folder}/color-palette/color-palette.json"
```

---

## File Structure

```
bmad/color-forge/
├── _module-installer/
│   └── install-config.yaml
├── agents/
│   ├── color-palette-architect.agent.yaml
│   ├── color-theorist.agent.yaml
│   ├── color-psychologist.agent.yaml
│   └── accessibility-checker.agent.yaml
├── workflows/
│   └── generate-palette/
│       ├── workflow.yaml
│       ├── instructions.md
│       └── checklist.md
├── data/
│   ├── color-psychology.md
│   ├── color-theory.md
│   ├── industry-colors.md
│   └── color-trends-2025.md
├── config.yaml
└── README.md
```

---

## Version History

### 2.2.0 (Current)
- **Text Selection Colors** - Branded ::selection (primary-200 background)
- **Brand Gradients** - 6 preset gradients (primary, secondary, accent, warm, coffee, sunset)

### 2.1.0
- **Beautiful Design Additions**:
  - Warm shadows (tinted with neutral hue, not cold gray)
  - Surface hierarchy (base, raised, overlay, sunken)
  - Focus rings (branded accessibility)
  - Overlays (scrim, hover tint)
  - Interactions (hover lift, card hover, list hover)
- **Component Recipes** - Copy-paste color assignments for UI elements
- **Common Mistakes** - What breaks the brand and how to avoid it

### 2.0.0
- **4 Agents** - Removed Palette Scorer (integrated into feedback loop)
- **2-File Output** - JSON + MD only (80/20 rule)
- **Feedback Loop** - Quality control with max 3 rounds
- **OKLCH Color Space** - Perceptually uniform scales
- **Magic Number System** - Grade-based accessibility
- **Sequential Pipeline** - Each step depends on previous

### 1.0.0
- Initial release with 5 agents
- Multiple output files

---

*Color Forge v2.2 - OKLCH + Magic Numbers + Beautiful Design + Selection + Gradients. 2 files. Production ready.*
