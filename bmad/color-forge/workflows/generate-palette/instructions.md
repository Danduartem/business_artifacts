# Generate Palette Workflow

This workflow generates a comprehensive, accessible color palette through a multi-agent pipeline.

---

## Overview

The Generate Palette workflow coordinates 5 specialized agents to create production-ready color palettes:

1. **Color Palette Architect** - Orchestrates the pipeline
2. **Color Theorist** - Generates harmonious base palette
3. **Color Psychologist** - Assigns semantic meanings
4. **Accessibility Checker** - Validates WCAG compliance
5. **Palette Scorer** - Evaluates quality

---

## Inputs

### Required
- **brand_personality**: 3-5 words describing brand (e.g., "innovative, trustworthy, modern")

### Optional
- **industry**: Target industry (default: "technology")
- **primary_color**: Existing brand color to build around (hex)
- **color_temperature**: warm | cool | neutral (default: "neutral")
- **palette_style**: classic | modern | bold | subtle (default: "modern")
- **brand_guide_path**: Path to brand guide document

---

## Pipeline Phases

### Phase 1: Context Gathering
**Agent**: Color Palette Architect

**Actions**:
1. Load configuration from config.yaml
2. Prompt for missing required inputs
3. Load brand guide if provided
4. Load reference materials if available
5. Prepare context package for specialists

**Output**: Context document for downstream agents

---

### Phase 2: Base Palette Generation
**Agent**: Color Theorist

**Input**: Context from Phase 1

**Actions**:
1. Select appropriate harmony model based on brand
2. Generate base colors (primary, secondary, accent, neutral)
3. Create full scales (50-900) for each color
4. Calculate harmony score
5. Verify temperature and style alignment

**Output**: Base palette with 4+ colors, each with 10-step scale

**Quality Gate**: Harmony Score ≥ 80

---

### Phase 3: Semantic Assignment
**Agent**: Color Psychologist

**Input**: Base palette from Phase 2

**Actions**:
1. Map colors to semantic roles (primary, secondary, accent, neutral)
2. Assign status colors (success, warning, error, info)
3. Provide psychological rationale for each assignment
4. Consider cultural implications
5. Calculate psychology alignment score

**Output**: Semantic color assignments with rationale

**Quality Gate**: Psychology Score ≥ 75

---

### Phase 4: Accessibility Validation
**Agent**: Accessibility Checker

**Input**: Semantic palette from Phase 3

**Actions**:
1. Calculate contrast ratios for all combinations
2. Validate against WCAG AA/AAA requirements
3. Check color blindness safety
4. Identify failures
5. Provide adjusted alternatives for failures
6. Calculate accessibility score

**Output**: Contrast matrix, failures list, recommended fixes

**Quality Gate**: Accessibility Score ≥ 90

---

### Phase 5: Quality Evaluation
**Agent**: Palette Scorer

**Input**: Complete palette with all metadata

**Actions**:
1. Score across 5 dimensions (harmony, accessibility, brand, versatility, distinctiveness)
2. Apply dimension weights
3. Calculate overall score
4. Identify strengths and weaknesses
5. Provide improvement recommendations

**Output**: Quality scores, detailed analysis, recommendations

**Quality Gate**: Overall Score ≥ 80

---

### Phase 6: Final Delivery
**Agent**: Color Palette Architect

**Input**: All outputs from previous phases

**Actions**:
1. Compile comprehensive documentation
2. Generate JSON data file
3. Create HTML preview
4. Package accessibility report
5. Present summary to user

**Outputs**:
- `color-palette.md` - Complete documentation
- `palette-data.json` - Machine-readable data
- `palette-preview.html` - Visual preview
- `accessibility-report.md` - Compliance report
- `quality-scores.json` - Evaluation results

---

## Iteration Handling

If any quality gate fails:

### Harmony Failure (< 80)
1. Return to Color Theorist
2. Try different harmony model
3. Adjust problem colors
4. Re-evaluate

### Psychology Failure (< 75)
1. Return to Color Psychologist
2. Review brand personality interpretation
3. Consider different color associations
4. Re-assign semantics

### Accessibility Failure (< 90)
1. Apply recommended fixes from Accessibility Checker
2. Re-validate affected combinations
3. Verify fixes don't break harmony
4. Re-score

### Overall Failure (< 80)
1. Identify lowest-scoring dimensions
2. Address in priority order
3. Balance improvements across dimensions
4. Re-run full evaluation

---

## Output Specifications

### color-palette.md

```markdown
# [Brand Name] Color Palette

## Overview
[Brief description of palette and design decisions]

## Primary Color
### [Color Name]
- **Purpose**: Main brand color
- **Psychology**: [Emotional impact]
- **Base**: #HEXCODE

| Scale | Hex | RGB | Usage |
|-------|-----|-----|-------|
| 50 | #... | rgb(...) | Light backgrounds |
| 100 | ... | ... | ... |
...

## Secondary Color
[Same format]

## Accent Color
[Same format]

## Neutral Colors
[Same format]

## Status Colors
| Status | Color | Hex | Usage |
|--------|-------|-----|-------|
| Success | ... | ... | ... |
...

## Recommended Combinations
[Safe color pairings with contrast ratios]

## Accessibility Notes
[Key accessibility information]

## Usage Guidelines
[How to apply the palette]
```

### palette-data.json

```json
{
  "metadata": {
    "brand": "string",
    "generated": "ISO date",
    "harmony_model": "string",
    "version": "1.0"
  },
  "palette": {
    "primary": { "50": "#...", ... "900": "#..." },
    "secondary": { ... },
    "accent": { ... },
    "neutral": { ... }
  },
  "semantic": {
    "success": "#...",
    "warning": "#...",
    "error": "#...",
    "info": "#..."
  },
  "contrast": {
    "[combo]": ratio
  },
  "scores": {
    "harmony": number,
    "accessibility": number,
    "psychology": number,
    "versatility": number,
    "distinctiveness": number,
    "overall": number
  }
}
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

### Check Status
```
*status
```

### Export Results
```
*export
```
