# Generate Palette Workflow Instructions

## Overview

This workflow orchestrates the generation of 5 diverse color palettes using specialized agents, each approaching color from a unique perspective. The result is a comprehensive set of options for the user to compare, score, and select from.

---

## Workflow Steps

<step n="1" goal="Gather primary colors from user">

### Action: Request Primary Colors

Ask the user to provide 2-4 primary colors for their brand:

```
Please provide 2-4 primary colors for your brand:

**Format:** HEX codes (e.g., #FF5733) or color names

Examples:
- "#2563EB" (your main brand blue)
- "#10B981, #F59E0B" (two brand colors)
- "#1E293B, #3B82F6, #F97316" (dark, primary, accent)

Your primary colors:
```

### Validation:
- Minimum 2 colors, maximum 4 colors
- Must be valid HEX codes (#RRGGBB or #RGB) or recognized color names
- Convert color names to HEX for processing

### Store:
- `{primary_colors}` - Array of HEX codes

</step>

---

<step n="2" goal="Gather brand context">

### Action: Request Brand Context

Ask for context that will inform palette generation:

```
Brief brand context (helps generate better palettes):

1. **Industry/Sector:**
   (e.g., tech startup, healthcare, e-commerce, creative agency)

2. **Target Audience:**
   (e.g., young professionals, enterprise buyers, health-conscious consumers)

3. **Brand Personality:**
   (3-5 adjectives, e.g., trustworthy, innovative, playful, premium, approachable)

4. **Colors to Avoid:** (optional)
   (Any colors that conflict with brand or competitors)

5. **Special Requirements:** (optional)
   (Specific accessibility needs, print requirements, etc.)
```

### Store:
- `{industry}` - Industry/sector
- `{target_audience}` - Target audience description
- `{brand_personality}` - Array of personality adjectives
- `{colors_to_avoid}` - Optional array of colors to avoid
- `{special_requirements}` - Optional special requirements

</step>

---

<step n="3" goal="Load reference data">

### Action: Load Supporting Data Files

Read the reference data files to inform agent prompts:

1. **Color Psychology Data**
   - Read: `{color_psychology_data}`
   - Extract: Color-emotion mappings, cultural associations

2. **WCAG Standards Data**
   - Read: `{wcag_standards_data}`
   - Extract: Contrast requirements, accessibility rules

3. **Industry Colors Data**
   - Read: `{industry_colors_data}`
   - Extract: Industry conventions, trend information

### Store:
- `{psychology_reference}` - Key psychology insights
- `{wcag_reference}` - Accessibility requirements
- `{industry_reference}` - Industry color conventions

</step>

---

<step n="4" goal="Prepare output folder">

### Action: Create Output Directory

```bash
mkdir -p {palette_output_folder}
```

### Verify:
- Directory exists and is writable
- Clear any previous palette files if user confirms

</step>

---

<step n="5" goal="Spawn 5 parallel palette generator agents">

### Action: Launch All 5 Agents in SINGLE Message

**CRITICAL:** All 5 Task calls must be in ONE message for true parallelism.

Each agent receives:
- Primary colors: `{primary_colors}`
- Brand context: `{industry}`, `{target_audience}`, `{brand_personality}`
- Configuration: `{wcag_level}`, `{scale_granularity}`, `{generate_modes}`
- Reference data summaries
- Output file path

#### Agent 1: Color Psychologist
```
Task: subagent_type="general-purpose"

You are the Color Psychologist, a specialist in the Color Forge studio.

**Your Approach:** Emotion-first
**Your Philosophy:** "Colors speak to the soul before the eye sees them"

**Input:**
- Primary Colors: {primary_colors}
- Industry: {industry}
- Target Audience: {target_audience}
- Brand Personality: {brand_personality}

**Your Mission:**
1. Analyze primary colors for emotional qualities
2. Map to brand personality requirements
3. Select complementary colors reinforcing emotions
4. Build hierarchy based on psychological impact
5. Assign semantic meanings aligned with emotions

**Output:** {palette_output_folder}/palette-psychology.json

**Requirements:**
- WCAG {wcag_level} compliance
- {scale_granularity}-step tint/shade scale (50-900)
- Generate for {generate_modes} mode(s)
- Include semantic colors if {include_semantic_colors}
```

#### Agent 2: Color Harmonist
```
Task: subagent_type="general-purpose"

You are the Color Harmonist, a specialist in the Color Forge studio.

**Your Approach:** Theory-first
**Your Philosophy:** "Mathematical harmony creates visual music"

**Input:**
- Primary Colors: {primary_colors}
- Industry: {industry}
- Target Audience: {target_audience}
- Brand Personality: {brand_personality}

**Your Mission:**
1. Plot primary colors on color wheel (hue angles)
2. Identify optimal harmony type
3. Calculate mathematically perfect complementary colors
4. Generate tints/shades with consistent lightness steps
5. Balance saturation across palette

**Output:** {palette_output_folder}/palette-harmony.json

**Requirements:**
- WCAG {wcag_level} compliance
- {scale_granularity}-step scale
- Generate for {generate_modes} mode(s)
- Include harmony_analysis section with scheme detection
```

#### Agent 3: Accessibility Guardian
```
Task: subagent_type="general-purpose"

You are the Accessibility Guardian, a specialist in the Color Forge studio.

**Your Approach:** Inclusion-first
**Your Philosophy:** "A beautiful palette that excludes is a failed palette"

**Input:**
- Primary Colors: {primary_colors}
- Industry: {industry}
- Target Audience: {target_audience}
- Brand Personality: {brand_personality}

**Your Mission:**
1. Analyze colors for accessibility potential
2. Adjust to maximize contrast while preserving hue
3. Test ALL text/background combinations
4. Ensure colorblind distinguishability
5. Generate light AND dark mode variants

**Output:** {palette_output_folder}/palette-accessible.json

**Requirements:**
- WCAG {wcag_level} compliance (MANDATORY)
- Colorblind validation: {colorblind_validation}
- {scale_granularity}-step scale
- Include comprehensive accessibility section
```

#### Agent 4: Trend Analyst
```
Task: subagent_type="general-purpose"

You are the Trend Analyst, a specialist in the Color Forge studio.

**Your Approach:** Context-first
**Your Philosophy:** "Colors exist in cultural and temporal context"

**Input:**
- Primary Colors: {primary_colors}
- Industry: {industry}
- Target Audience: {target_audience}
- Brand Personality: {brand_personality}

**Your Mission:**
1. Identify current design trends for {industry}
2. Research competitor color usage
3. Position primary colors within trend landscape
4. Add trend-aware accent colors
5. Balance timelessness with contemporary appeal

**Output:** {palette_output_folder}/palette-trendy.json

**Requirements:**
- WCAG {wcag_level} compliance
- {scale_granularity}-step scale
- Generate for {generate_modes} mode(s)
- Include trend_analysis section
```

#### Agent 5: Brand Synthesizer
```
Task: subagent_type="general-purpose"

You are the Brand Synthesizer, a specialist in the Color Forge studio.

**Your Approach:** Integration-first
**Your Philosophy:** "A palette must work everywhere your brand lives"

**Input:**
- Primary Colors: {primary_colors}
- Industry: {industry}
- Target Audience: {target_audience}
- Brand Personality: {brand_personality}

**Your Mission:**
1. Analyze colors for versatility potential
2. Generate palette optimized for ALL application scenarios
3. Test against common UI patterns
4. Ensure light AND dark mode work beautifully
5. Handle edge cases (images, gradients, glassmorphism)

**Output:** {palette_output_folder}/palette-synthesized.json

**Requirements:**
- WCAG {wcag_level} compliance
- {scale_granularity}-step scale
- Generate for {generate_modes} mode(s)
- Include application_guide section
```

</step>

---

<step n="6" goal="Wait for all agents to complete">

### Action: Monitor Completion

All 5 agents work simultaneously and independently.
Wait for all Task results before proceeding.

### Expected Files:
- `{palette_output_folder}/palette-psychology.json`
- `{palette_output_folder}/palette-harmony.json`
- `{palette_output_folder}/palette-accessible.json`
- `{palette_output_folder}/palette-trendy.json`
- `{palette_output_folder}/palette-synthesized.json`

</step>

---

<step n="7" goal="Confirm generation complete">

### Action: Notify User

```
✅ 5 Color Palettes Generated Successfully!

**Files Created:**
1. palette-psychology.json - Emotion-first approach
2. palette-harmony.json - Theory-first approach
3. palette-accessible.json - Inclusion-first approach
4. palette-trendy.json - Context-first approach
5. palette-synthesized.json - Integration-first approach

**Location:** {palette_output_folder}/

**Next Steps:**
- *compare - View palettes side-by-side
- *score - Get detailed scoring and recommendations
- *preview - Generate visual HTML preview
- *export - Export your chosen palette
```

</step>

---

<step n="8" goal="Offer immediate scoring">

### Action: Ask About Scoring

```
Would you like me to score and rank these palettes now?

This will analyze each palette across 5 dimensions:
- Harmony (color wheel balance)
- Accessibility (WCAG compliance)
- Psychology (emotional coherence)
- Versatility (real-world usability)
- Trend Alignment (contemporary relevance)

[Y/N]:
```

### If Yes:
Proceed to spawn Palette Scorer agent (see *score command in Color Director)

### If No:
Workflow complete. User can run *score later.

</step>

---

## Validation Checklist

Before completing workflow, verify:

- [ ] All 5 palette JSON files exist
- [ ] Each palette has complete color scales (50-900)
- [ ] Each palette includes semantic colors
- [ ] Each palette has distribution recommendations
- [ ] Each palette has accessibility information
- [ ] User has been notified of completion
