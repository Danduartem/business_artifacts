# Color Theory Reference

Reference data for the Color Theorist agent.

---

## The Color Wheel

### Primary Colors
- **Red** (0°)
- **Yellow** (60°)
- **Blue** (240°)

### Secondary Colors (mix of primaries)
- **Orange** (30°) = Red + Yellow
- **Green** (120°) = Yellow + Blue
- **Purple** (270°) = Blue + Red

### Tertiary Colors
- Red-Orange (15°)
- Yellow-Orange (45°)
- Yellow-Green (90°)
- Blue-Green (150°)
- Blue-Purple (255°)
- Red-Purple (315°)

---

## Harmony Models

### Complementary
Two colors 180° apart on the wheel.

**Formula**: Base + (Base + 180°)

**Example** (Blue base at 210°):
- Blue: hsl(210, 80%, 50%)
- Orange: hsl(30, 80%, 50%)

**Characteristics**:
- Maximum contrast
- Vibrant, energetic
- Can be overwhelming if not balanced
- Best used with one dominant + one accent

**Best for**: Bold brands, call-to-actions, high-energy designs

---

### Analogous
Three colors adjacent on the wheel (within 30° of each other).

**Formula**: (Base - 30°) + Base + (Base + 30°)

**Example** (Blue base at 210°):
- Blue-Green: hsl(180, 70%, 45%)
- Blue: hsl(210, 70%, 50%)
- Blue-Purple: hsl(240, 70%, 55%)

**Characteristics**:
- Harmonious and pleasing
- Low contrast, serene
- Easy on the eyes
- Natural feeling

**Best for**: Calm brands, nature themes, cohesive designs

---

### Triadic
Three colors evenly spaced (120° apart).

**Formula**: Base + (Base + 120°) + (Base + 240°)

**Example** (Blue base at 210°):
- Blue: hsl(210, 70%, 50%)
- Yellow-Orange: hsl(330, 70%, 50%)
- Green: hsl(90, 70%, 50%)

**Characteristics**:
- Balanced vibrance
- Rich and diverse
- Works well with one dominant
- Playful yet balanced

**Best for**: Creative brands, diverse product lines, engaging designs

---

### Split-Complementary
Base + two colors adjacent to its complement.

**Formula**: Base + (Base + 150°) + (Base + 210°)

**Example** (Blue base at 210°):
- Blue: hsl(210, 70%, 50%)
- Yellow: hsl(60, 70%, 50%)
- Red-Orange: hsl(0, 70%, 50%)

**Characteristics**:
- High contrast like complementary
- Less tension than pure complementary
- More nuanced
- Visually interesting

**Best for**: Brands wanting contrast without harshness

---

### Tetradic (Rectangle)
Four colors forming a rectangle on the wheel.

**Formula**: Base + (Base + 60°) + (Base + 180°) + (Base + 240°)

**Example** (Blue base at 210°):
- Blue: hsl(210, 70%, 50%)
- Purple: hsl(270, 70%, 50%)
- Orange: hsl(30, 70%, 50%)
- Yellow: hsl(90, 70%, 50%)

**Characteristics**:
- Very rich palette
- Complex to balance
- Works best with one dominant
- Maximum variety

**Best for**: Complex systems, multiple product categories

---

### Square
Four colors evenly spaced (90° apart).

**Formula**: Base + (Base + 90°) + (Base + 180°) + (Base + 270°)

**Example** (Blue base at 210°):
- Blue: hsl(210, 70%, 50%)
- Cyan: hsl(300, 70%, 50%)
- Orange: hsl(30, 70%, 50%)
- Green: hsl(120, 70%, 50%)

**Characteristics**:
- Equal visual weight
- Dynamic and vibrant
- Challenging to balance
- Bold statement

**Best for**: Energetic brands, entertainment, sports

---

### Monochromatic
Single hue with varied saturation and lightness.

**Formula**: Same hue, different S/L values

**Example** (Blue at 210°):
- Light: hsl(210, 30%, 90%)
- Medium-light: hsl(210, 50%, 70%)
- Base: hsl(210, 70%, 50%)
- Medium-dark: hsl(210, 80%, 35%)
- Dark: hsl(210, 90%, 20%)

**Characteristics**:
- Extremely cohesive
- Elegant and sophisticated
- Limited variety
- Easy to balance

**Best for**: Minimalist brands, premium/luxury, focused designs

---

## Color Properties

### Hue
The pure color (0-360° on wheel)
- Determines color family (red, blue, green, etc.)

### Saturation
Color intensity (0-100%)
- 0% = Gray
- 100% = Pure, vivid color

**Guidelines**:
- High (70-100%): Bold, attention-grabbing
- Medium (40-70%): Balanced, professional
- Low (10-40%): Subtle, sophisticated
- Very low (0-10%): Near-neutral, muted

### Lightness (Brightness)
Light to dark (0-100%)
- 0% = Black
- 100% = White
- 50% = Pure hue

**Guidelines**:
- Light (70-90%): Backgrounds, tints
- Medium (40-60%): Primary use
- Dark (10-40%): Text, emphasis

---

## Creating Scales

### 10-Step Scale (50-900)

Starting from base color (500), calculate other values:

```
Step 50:  L+45%, S-60%  (very light tint)
Step 100: L+40%, S-50%
Step 200: L+30%, S-30%
Step 300: L+20%, S-15%
Step 400: L+10%, S-5%
Step 500: BASE COLOR
Step 600: L-10%, S+5%
Step 700: L-20%, S+5%
Step 800: L-30%, S+5%
Step 900: L-40%, S-5%  (deep shade)
```

### Scale Smoothness Rules

1. **Even progression**: No jarring jumps between adjacent steps
2. **Perceptual uniformity**: Steps should feel equally spaced visually
3. **Utility**: Each step should have distinct use cases
4. **Contrast**: Adjacent steps should be distinguishable

---

## Temperature

### Warm Colors
- Hue: 0° to 60° (reds, oranges, yellows)
- Feel: Energetic, inviting, passionate
- Best for: Food, entertainment, action-oriented

### Cool Colors
- Hue: 180° to 270° (blues, greens, purples)
- Feel: Calm, professional, trustworthy
- Best for: Technology, finance, healthcare

### Neutral Colors
- Grays, browns, off-whites
- Feel: Balanced, sophisticated, timeless
- Use: Backgrounds, text, supporting roles

---

## Value Contrast

### High Contrast
- Light and dark together
- Strong visual hierarchy
- Accessible
- Bold statement

### Low Contrast
- Similar values together
- Subtle, sophisticated
- Can be harder to read
- Calming effect

### Recommended Contrasts
- Text: Minimum 4.5:1 (WCAG AA)
- Large text: Minimum 3:1
- UI components: Minimum 3:1

---

## Common Mistakes

1. **Too many colors** - Stick to 4-6 max
2. **No neutral** - Always include gray scale
3. **Equal saturation** - Vary saturation for hierarchy
4. **Ignoring temperature** - Mix warm/cool intentionally
5. **Skipping middle values** - Full scales enable flexibility
6. **Pure black/white** - Use tinted neutrals for warmth
