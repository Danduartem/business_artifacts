# Generate Palette Workflow v2.3

This workflow generates accessible, production-ready color palettes through a
sequential multi-agent pipeline with feedback loop and locked color validation.

**v2.3 Additions**: Natural grade placement, hex validation gate, dark color support.
**v2.2 Additions**: Text selection colors, brand gradients.
**v2.1 Additions**: Warm shadows, surfaces, focus rings, overlays, interactions.

---

## Overview

Color Forge v2 coordinates 4 specialized agents:

1. **Color Palette Architect** - Orchestrates pipeline with quality feedback loop
2. **Color Theorist** - Generates harmonious OKLCH-based palette
3. **Color Psychologist** - Assigns semantic meanings
4. **Accessibility Checker** - Validates WCAG using Magic Number system

**Key Features:**
- OKLCH color space for perceptual uniformity
- Magic Number system for predictable contrast
- Feedback loop (max 3 rounds per specialist)
- 2 output files only (80/20 rule)
- **Warm shadows** (tinted, not cold gray)
- **Surface hierarchy** (base, raised, overlay, sunken)
- **Focus rings** (branded accessibility)
- **Overlays & interactions** (polish)

---

## Inputs

### Required
- **brand_personality**: 3-5 words describing brand (e.g., "innovative, trustworthy, modern")

### LOCKED Brand Colors (Source of Truth)
These colors are **IMMUTABLE** - the EXACT hex MUST appear in output:
- **primary_color**: Your PRIMARY brand color (hex) - LOCKED at NATURAL grade
- **secondary_color**: Your SECONDARY brand color (hex) - LOCKED at NATURAL grade
- **accent_color**: Your ACCENT brand color (hex) - LOCKED at NATURAL grade or generate
- **neutral_color**: Your BACKGROUND base color (hex) - LOCKED at grade 100

**CRITICAL**: When provided, these colors are NOT suggestions - they ARE the answer.
Color Forge builds scales AROUND them, never replaces them.

**v2.3 Natural Grade Placement**: Brand colors are placed at their NATURAL OKLCH
lightness grade, not forced to grade 500. This preserves Magic Number reliability.

| OKLCH Lightness | Natural Grade | Example |
|-----------------|---------------|---------|
| ~25% | 800 | #191F3A (dark navy) |
| ~40% | 700 | #81171F (burgundy) |
| ~55% | 500 | #E63946 (bright red) |
| ~93% | 100 | #ECECEC (light gray) |

**Custom Neutral**: If your brand uses warm backgrounds (cream, beige) instead of
cold gray/white, provide the neutral_color. Color Forge will build a warm/tinted
neutral scale that matches your brand feel.

### Optional
- **industry**: Target industry (default: "technology")
- **color_temperature**: For GENERATED colors only (warm | cool | neutral)
- **palette_style**: For GENERATED colors only (classic | modern | bold | subtle)
- **brand_guide_path**: Path to brand guide document

---

## Pipeline Phases

### Phase 1: Context Gathering
**Agent**: Color Palette Architect

**Actions**:
1. Load configuration
2. Prompt for missing required inputs
3. Load brand guide if provided
4. Prepare context for specialists

---

### Phase 2: Base Palette Generation
**Agent**: Color Theorist

**Input**: Context + LOCKED brand colors from Phase 1

**Actions**:
1. **Calculate NATURAL GRADE** for each locked color based on OKLCH lightness
2. **LOCKED colors → EXACT hex at NATURAL grade** (no modification)
3. Build 50-900 scales around each locked color (preserve hue)
4. Only GENERATE new colors for roles not provided
5. Use harmony model for generated colors
6. Calculate harmony score
7. **Generate warm shadows** (using neutral-800 hue)
8. **Define surfaces** (base, raised, overlay, sunken)
9. **Define focus ring** (primary-400 with neutral-50 offset)
10. **Define overlays** (scrim, hover)
11. **Define text selection** (primary-200 background) - v2.2
12. **Generate gradients** (6 brand gradients) - v2.2

**CRITICAL**: If locked colors are modified → REJECT immediately

**Quality Gate**: Harmony Score ≥ 80

**Feedback Loop**: If < 80 OR locked colors modified, request revision

---

### Phase 2.5: VALIDATION GATE (v2.3 - MANDATORY)
**Agent**: Color Palette Architect

**This step is BLOCKING. Do NOT proceed until it passes.**

**Actions**:
1. **Read the output JSON** (base-palette.json)
2. **Search for EXACT hex strings**:
   ```
   For each locked color:
     - grep for "hex": "#XXXXXX" (exact match)
     - Example: grep '"hex": "#191F3A"' base-palette.json
   ```
3. **Evaluate**:
   - **PASS**: All locked colors found verbatim → proceed to Phase 3
   - **FAIL**: Any locked color missing → REJECT output

4. **If FAIL**:
   - Log: "VALIDATION FAILED: {color} not found in output"
   - Provide feedback: "Locked color {hex} must appear VERBATIM. Do NOT recalculate from OKLCH."
   - Retry (max 3 attempts)

5. **If still failing after 3 attempts**:
   - Escalate to user with diagnostic info
   - Show expected vs actual hex values

---

### Phase 3: Semantic Assignment
**Agent**: Color Psychologist

**Input**: Base palette from Phase 2

**Actions**:
1. Map colors to semantic roles (primary, secondary, accent, neutral)
2. Assign status colors (success, warning, error, info)
3. Provide psychological rationale
4. Calculate psychology score

**Quality Gate**: Psychology Score ≥ 75

**Feedback Loop**: If < 75, Architect requests revision

---

### Phase 4: Accessibility Validation
**Agent**: Accessibility Checker

**Input**: Semantic palette from Phase 3

**Actions**:
1. Validate using Magic Number system
2. Check light mode and dark mode
3. Check color blindness safety
4. Identify failures with fixes
5. Calculate accessibility score

**Quality Gate**: Accessibility Score ≥ 90 (BLOCKING)

**Feedback Loop**: If < 90, Architect requests fixes (cannot proceed until resolved)

---

### Phase 5: Final Compilation
**Agent**: Color Palette Architect

**Input**: All specialist outputs

**Actions**:
1. Compile color-palette.json
2. Compile color-palette.md
3. Present summary to user

---

## Output Files

### color-palette.json
Machine-readable data for design-system-forge:

```json
{
  "metadata": {
    "brand": "...",
    "generated": "ISO date",
    "colorSpace": "OKLCH",
    "version": "2.1",
    "harmonyModel": "...",
    "scores": { "harmony": 85, "psychology": 82, "accessibility": 94 }
  },
  "colors": { "primary": {...}, "secondary": {...}, "accent": {...}, "neutral": {...} },
  "semantic": { "primary": "primary-500", "background": "neutral-100", ... },
  "accessibility": { "magicNumbers": {...} },
  "darkMode": { "background": "neutral-900", "foreground": "neutral-100", ... },
  "shadows": {
    "color": { "oklch": "oklch(26% 0.025 28)", "note": "Uses neutral-800 hue" },
    "sm": "0 1px 2px oklch(26% 0.025 28 / 0.12)",
    "md": "0 4px 6px oklch(26% 0.025 28 / 0.15)",
    "lg": "0 10px 15px oklch(26% 0.025 28 / 0.18)",
    "xl": "0 20px 25px oklch(26% 0.025 28 / 0.22)"
  },
  "surfaces": {
    "base": { "token": "neutral-100", "usage": "Page background" },
    "raised": { "token": "neutral-50", "usage": "Cards" },
    "overlay": { "token": "neutral-50", "shadow": "lg", "usage": "Modals" },
    "sunken": { "token": "neutral-200", "usage": "Inputs" }
  },
  "focus": {
    "ring": { "token": "primary-400", "hex": "#..." },
    "offset": { "token": "neutral-50", "hex": "#..." },
    "style": "0 0 0 2px var(--neutral-50), 0 0 0 4px var(--primary-400)"
  },
  "overlays": {
    "scrim": { "value": "oklch(18% 0.02 25 / 0.6)", "usage": "Modal backdrop" },
    "hover": { "value": "oklch(32% 0.12 25 / 0.08)", "usage": "Hover tint" }
  },
  "interactions": {
    "hoverLift": { "transform": "translateY(-2px)", "shadow": "md" },
    "cardHover": { "border": "neutral-400" },
    "listItemHover": { "background": "primary-50" }
  },
  "selection": {
    "background": { "token": "primary-200", "hex": "#..." },
    "text": { "token": "neutral-900", "hex": "#..." }
  },
  "gradients": {
    "primary": { "value": "linear-gradient(135deg, primary-400, primary-600)", "usage": "Hero sections" },
    "coffee": { "value": "linear-gradient(135deg, secondary-500, primary-500)", "usage": "Brand signature" }
  },
  "recipes": { ... },
  "avoid": { ... }
}
```

### color-palette.md
Designer reference documentation with:

1. **Quality Scores Summary** - All scores at a glance
2. **Quick Start: Component Recipes** - Copy-paste color assignments
3. **Common Mistakes to Avoid** - What breaks the brand
4. **Palette Overview** - Harmony model and rationale
5. **Color Scales** - Primary, Secondary, Accent, Neutral (OKLCH + HEX)
6. **Semantic Assignments** - With psychological rationale
7. **Status Colors** - Universal definitions
8. **Shadows** - Warm-tinted shadow scale with usage
9. **Surfaces** - Elevation hierarchy (base, raised, overlay, sunken)
10. **Focus States** - Branded accessibility rings
11. **Overlays & Interactions** - Scrim, hover, transitions
12. **Text Selection** - Branded ::selection colors (v2.2)
13. **Gradients** - Brand gradient library (v2.2)
14. **Magic Number Quick Reference** - Grade pairings for instant accessibility
15. **Accessibility Guide** - Safe pairings, color blindness notes
16. **Dark Mode Recommendations** - Inverted mappings
17. **60-30-10 Application Guide** - Distribution guidance
18. **Usage Guidelines** - Do's and Don'ts

---

## Feedback Loop

When a specialist's output fails quality gate:

1. **Architect reviews** specific issues
2. **Architect provides feedback** with concrete suggestions
3. **Specialist revises** based on feedback
4. **Architect reviews** again
5. **Maximum 3 rounds** per specialist
6. If still failing after 3 rounds, document limitations and proceed (except accessibility which is blocking)

---

## Quality Thresholds

| Metric | Minimum | Blocking? |
|--------|---------|-----------|
| **Brand Color Preservation** | **100%** | **Yes** |
| **Hex Validation (v2.3)** | **PASS** | **Yes** |
| Harmony Score | 80 | No |
| Psychology Score | 75 | No |
| Accessibility Score | 90 | **Yes** |

**Brand Color Preservation (v2.3)**: Locked colors must appear EXACTLY at their
NATURAL grade with the VERBATIM hex value. Validation is performed by searching
the output JSON for the exact hex string. Any modification = automatic rejection.

**Hex Validation**: After Color Theorist completes, grep for exact hex strings:
```bash
grep -q '"hex": "#191F3A"' base-palette.json || echo "FAIL: Primary not locked"
grep -q '"hex": "#81171F"' base-palette.json || echo "FAIL: Secondary not locked"
```

---

## Usage

### Start Workflow
```
/bmad:color-forge:agents:color-palette-architect
```

### Generate Palette
```
*generate
```

---

## Integration

Color Forge output feeds into:
- **design-system-forge** → as `color_palette_path` for tokens.css
- **style-guide-forge** → as `color_palette_path` for design guidelines

---

*Color Forge v2.2 - OKLCH + Magic Numbers + Beautiful Design + Selection + Gradients. 2 files. Production ready.*
