# Typography Best Practices

Reference guide for the Foundations Architect agent when creating typography systems.

---

## Core Principles

### 1. Limit Typefaces
- **Maximum 2 font families**: One for headings, one for body text
- Most designs work beautifully with just one well-chosen family
- More fonts = more complexity, slower load times, inconsistent feel

### 2. Establish Clear Hierarchy
Typography hierarchy guides users through content. Define clear levels:

| Level | Usage | Weight | Typical Size |
|-------|-------|--------|--------------|
| H1 | Page titles | Bold (700) | 2.5-4rem |
| H2 | Major sections | Semibold (600) | 2-2.5rem |
| H3 | Subsections | Semibold (600) | 1.5-2rem |
| H4 | Sub-subsections | Medium (500) | 1.25-1.5rem |
| H5 | Small headings | Medium (500) | 1-1.25rem |
| H6 | Smallest headings | Medium (500) | 0.875-1rem |
| Body | Main content | Regular (400) | 1rem (16px) |
| Small | Captions, meta | Regular (400) | 0.875rem |
| Tiny | Legal, footnotes | Regular (400) | 0.75rem |

---

## Type Scale Systems

### Modular Scale Ratios

Choose a ratio that matches your brand personality:

| Ratio | Name | Feel | Best For |
|-------|------|------|----------|
| 1.067 | Minor Second | Very subtle | Dense interfaces |
| 1.125 | Major Second | Calm, subtle | Professional, understated |
| 1.2 | Minor Third | Balanced, calm | Corporate, B2B |
| 1.25 | Major Third | Clear, balanced | Most projects (recommended) |
| 1.333 | Perfect Fourth | More dramatic | Marketing, editorial |
| 1.414 | Augmented Fourth | Bold | Creative, expressive |
| 1.5 | Perfect Fifth | Very dramatic | Landing pages, headlines |
| 1.618 | Golden Ratio | Classical | Luxury, traditional |

### Generating a Scale

With base size 16px and ratio 1.25:

```
Step -2: 16 ÷ 1.25 ÷ 1.25 = 10.24px → 0.64rem (tiny)
Step -1: 16 ÷ 1.25 = 12.8px → 0.8rem (small)
Step 0:  16px → 1rem (body)
Step 1:  16 × 1.25 = 20px → 1.25rem (large)
Step 2:  16 × 1.25² = 25px → 1.563rem (h4)
Step 3:  16 × 1.25³ = 31.25px → 1.953rem (h3)
Step 4:  16 × 1.25⁴ = 39px → 2.441rem (h2)
Step 5:  16 × 1.25⁵ = 48.83px → 3.052rem (h1)
```

---

## Line Height Guidelines

### The 1.5 Rule
- **Body text**: 1.5 line-height is the universal starting point
- **Headings**: 1.1-1.3 (tighter for larger text)
- **Small text**: 1.4-1.6 (looser for readability)

### Specific Recommendations

| Text Size | Line Height | Notes |
|-----------|-------------|-------|
| < 14px | 1.6-1.8 | Needs more space to read |
| 14-18px | 1.5-1.6 | Standard body text range |
| 18-24px | 1.4-1.5 | Large body text |
| 24-36px | 1.2-1.4 | Subheadings |
| 36px+ | 1.1-1.2 | Large headings |

---

## Letter Spacing

### When to Adjust

| Context | Letter Spacing | Why |
|---------|---------------|-----|
| ALL CAPS | +0.05-0.1em | Uppercase needs breathing room |
| Large headings | -0.01 to -0.025em | Optical tightening |
| Body text | 0 (default) | Let the font designer decide |
| Small text | +0.01-0.02em | Aids readability at small sizes |

---

## Font Weight Usage

### Weight Distribution

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Decorative, large sizes only |
| 400 | Regular | Body text, default |
| 500 | Medium | Emphasis, UI labels |
| 600 | Semibold | Subheadings, buttons |
| 700 | Bold | Headings, strong emphasis |
| 800+ | Extra Bold | Sparingly, display only |

### Rules
- **Maximum 3 weights** per font family in regular use
- Lighter weights are harder to read at small sizes
- Bold for emphasis, but not entire paragraphs

---

## Readability Essentials

### Optimal Line Length (Measure)
- **Ideal**: 45-75 characters per line
- **Sweet spot**: 65 characters
- **Mobile**: 35-50 characters acceptable

```css
/* Set maximum readable width */
.prose {
  max-width: 65ch; /* ~65 characters */
}
```

### Paragraph Spacing
- **Standard**: 1em (equal to font size) between paragraphs
- Alternatively: 0.5em with first-line indent

### Text Alignment
- **Left-aligned**: Default for most languages (easiest to read)
- **Centered**: Headings, short content only
- **Right-aligned**: RTL languages, special use cases
- **Justified**: Avoid on web (creates rivers of whitespace)

---

## Font Pairing Guidelines

### Safe Pairings

1. **Serif heading + Sans body**
   - Classic, professional combination
   - Example: Playfair Display + Inter

2. **Same family, different weights**
   - Guaranteed harmony
   - Example: Inter Bold (headings) + Inter Regular (body)

3. **Superfamily**
   - Sans + Serif from same family
   - Example: Source Sans Pro + Source Serif Pro

### Pairing Principles

| Principle | Description |
|-----------|-------------|
| **Contrast** | Pair fonts that are different enough to distinguish |
| **Complement** | Share similar x-height, stroke width, or mood |
| **Limit** | Never more than 2-3 typefaces |

---

## Responsive Typography

### Fluid Typography Formula

```css
/* Fluid font size that scales between viewports */
font-size: clamp(1rem, 0.5rem + 2vw, 2rem);
/*         min    preferred     max        */
```

### Breakpoint Adjustments

| Viewport | Base Size | Scale Ratio |
|----------|-----------|-------------|
| Mobile (< 640px) | 16px | 1.2 (minor third) |
| Tablet (640-1024px) | 16px | 1.25 (major third) |
| Desktop (> 1024px) | 16-18px | 1.25-1.333 |

---

## Web Font Best Practices

### Performance
- Use `font-display: swap` for non-blocking load
- Subset fonts to required characters
- Self-host critical fonts (faster than Google Fonts)
- Maximum 2 font families, 3-4 weights total

### Fallback Stack
```css
font-family:
  'Inter',                    /* Primary choice */
  -apple-system,              /* Apple devices */
  BlinkMacSystemFont,         /* Chrome on macOS */
  'Segoe UI',                 /* Windows */
  Roboto,                     /* Android */
  'Helvetica Neue',           /* Older systems */
  sans-serif;                 /* Ultimate fallback */
```

---

## Anti-Patterns to Avoid

| Avoid | Why | Instead |
|-------|-----|---------|
| Light fonts < 16px | Illegible | Use regular weight |
| Multiple fonts on one element | Confusing | One font per role |
| Inconsistent heading styles | Breaks hierarchy | Define once, reuse |
| Manual em/px values everywhere | Unmaintainable | Use token system |
| Justified text on web | Rivers, spacing issues | Left-align |
| Very long line lengths | Eye fatigue | Max 75 characters |
