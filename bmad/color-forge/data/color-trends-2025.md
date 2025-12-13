# 2025 Color Trends Reference

Reference data for current color trends in web design.

---

## Pantone Color of the Year 2025

### Mocha Mousse (PANTONE 17-1230)

A rich, warming brown that evokes comfort, sophistication, and natural elegance.

**Color Values**:
- HEX: #A47864
- OKLCH: oklch(55% 0.08 45)
- RGB: rgb(164, 120, 100)

**Characteristics**:
- Warm, earthy, grounded
- Evokes chocolate, coffee, natural materials
- Sophisticated yet approachable
- Works as neutral or accent

**Best Used For**:
- Luxury brands seeking warmth
- Food & beverage (coffee, chocolate, organic)
- Wellness and comfort-focused brands
- Premium hospitality

**Pairing Suggestions**:
- Cream/ivory backgrounds
- Deep forest greens
- Soft gold accents
- Dusty rose complements

---

## Key 2025 Color Trends

### 1. Muted Neutrals with Vibrant Accents

**Trend**: Soft, calming base palettes with unexpected pops of bright color.

**Base Colors**:
- Soft creams: `oklch(95% 0.02 80)`
- Warm taupes: `oklch(70% 0.04 60)`
- Muted browns: `oklch(55% 0.06 50)`
- Soft beiges: `oklch(85% 0.03 70)`

**Accent Pairings**:
- Neon yellow: `oklch(90% 0.2 100)`
- Electric coral: `oklch(70% 0.2 25)`
- Bright teal: `oklch(65% 0.15 195)`

**Why It Works**:
- Calming base doesn't overwhelm
- Accents create focus and energy
- Balance of comfort and excitement

---

### 2. Bold & Vibrant Palettes

**Trend**: Unapologetically bold, dopamine-inducing colors.

**Key Colors**:
- Electric blue: `oklch(55% 0.25 260)`
- Hot pink: `oklch(60% 0.25 350)`
- Neon green: `oklch(80% 0.3 140)`
- Intense orange: `oklch(70% 0.22 50)`

**Best For**:
- Gen Z targeting
- Entertainment & gaming
- Creative agencies
- Startups seeking attention

**Implementation**:
- Use as 10% accent only
- Pair with dark backgrounds
- High contrast for readability
- Add motion for full effect

---

### 3. Dark Mode + Neon Accents

**Trend**: Dark backgrounds with glowing neon highlights.

**Base Palette**:
- Near-black: `oklch(12% 0 0)` or `oklch(15% 0.02 260)`
- Dark gray: `oklch(20% 0 0)`
- Charcoal: `oklch(25% 0.01 250)`

**Neon Accents**:
- Neon cyan: `oklch(80% 0.2 200)`
- Neon magenta: `oklch(65% 0.3 330)`
- Neon lime: `oklch(85% 0.3 130)`

**Why It Works**:
- High contrast = high readability
- Futuristic, tech-forward aesthetic
- Reduces eye strain (dark base)
- Creates visual drama

**Accessibility Note**:
Ensure neon colors maintain Magic Number 50+ against dark backgrounds.

---

### 4. Nature-Inspired & Earthy Tones

**Trend**: Colors that evoke sustainability, authenticity, and nature.

**Key Colors**:
- Forest green: `oklch(40% 0.12 150)`
- Clay/terracotta: `oklch(55% 0.12 40)`
- Ocean blue: `oklch(45% 0.1 240)`
- Sand/stone: `oklch(75% 0.05 70)`
- Moss: `oklch(50% 0.1 130)`

**Best For**:
- Eco-conscious brands
- Organic/natural products
- Wellness & health
- Outdoor & adventure

**Cultural Context**:
- Resonates with Gen Z/Millennial values
- Signals environmental responsibility
- Creates calm, trustworthy feel

---

### 5. High-Tech Metallics

**Trend**: Chrome, silver, and metallic finishes for futuristic aesthetics.

**Key Colors**:
- Chrome silver: `oklch(75% 0 0)` with gradient
- Platinum: `oklch(85% 0.01 260)`
- Rose gold: `oklch(70% 0.08 30)`
- Brushed steel: `oklch(65% 0.01 250)`

**Implementation**:
- Use gradients for metallic effect
- Pair with dark backgrounds
- Apply to icons, buttons, accents
- Subtle animation enhances effect

**CSS Gradient Example**:
```css
background: linear-gradient(
  135deg,
  oklch(85% 0.01 260),
  oklch(65% 0.02 250),
  oklch(80% 0.01 260)
);
```

---

### 6. Multi-Dimensional Gradients

**Trend**: Complex gradients blending multiple vibrant colors.

**Popular Combinations**:
- Blue → Purple → Pink
- Teal → Green → Yellow
- Orange → Pink → Purple

**Example Gradient**:
```css
background: linear-gradient(
  135deg,
  oklch(55% 0.2 260),
  oklch(50% 0.25 300),
  oklch(60% 0.2 350)
);
```

**Best For**:
- Tech & gaming
- Creative portfolios
- Music & entertainment
- Modern SaaS

**Accessibility Note**:
Text on gradients needs careful contrast checking at all points.

---

## Trend-Based Palette Suggestions

### For Tech Startups (2025)
```
Primary:    oklch(55% 0.2 260)   Electric Blue
Secondary:  oklch(25% 0.02 260)  Dark Navy
Accent:     oklch(70% 0.25 50)   Vibrant Orange
Neutral:    oklch(90% 0 0)       Near White
```

### For Wellness Brands (2025)
```
Primary:    oklch(50% 0.1 150)   Forest Green
Secondary:  oklch(55% 0.08 45)   Mocha Mousse
Accent:     oklch(75% 0.1 80)    Soft Gold
Neutral:    oklch(95% 0.02 80)   Warm Cream
```

### For Creative Agencies (2025)
```
Primary:    oklch(60% 0.25 350)  Hot Pink
Secondary:  oklch(15% 0.02 260)  Near Black
Accent:     oklch(85% 0.3 130)   Neon Lime
Neutral:    oklch(20% 0 0)       Dark Gray
```

### For Luxury/Premium (2025)
```
Primary:    oklch(15% 0.02 0)    Rich Black
Secondary:  oklch(55% 0.08 45)   Mocha Mousse
Accent:     oklch(70% 0.08 80)   Soft Gold
Neutral:    oklch(95% 0.02 60)   Ivory
```

---

## What's Declining in 2025

| Declining Trend | Replacing With |
|-----------------|----------------|
| Pure white backgrounds | Warm off-whites, soft creams |
| Flat minimal palettes | Gradients, depth, texture |
| Cool corporate blues | Warmer, more human colors |
| Generic tech purple | Unique brand signatures |
| Single-color dark mode | Dark + neon accents |

---

## Implementation Tips

### Incorporating Trends Responsibly

1. **Don't chase trends blindly** - Brand fit matters more
2. **Use trends for accents** - Keep core palette timeless
3. **Test with audience** - Trends vary by demographic
4. **Consider longevity** - Will this age well?
5. **Maintain accessibility** - Trends don't override WCAG

### Trend + Timelessness Balance

```
Core Palette:     Timeless, brand-aligned
Accent Colors:    Can incorporate trends
UI Elements:      Mostly timeless
Marketing:        More trend-forward acceptable
```

---

## Resources

- Pantone Color Institute
- WGSN Color Forecasting
- Adobe Color Trends
- Behance Design Trends
- Dribbble Popular Shots
