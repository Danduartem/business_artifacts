# Design Token Specification

Reference guide for understanding design token architecture and naming conventions.

> **Note:** This is educational reference material. Style Guide Forge v2 outputs
> design guidelines only (`style-guide.md`). For actual code exports (`tokens.css`,
> `tokens.json`), use **design-system-forge**.

---

## What Are Design Tokens?

Design tokens are the **smallest, atomic pieces** of a design system. They are named entities that store visual design attributes:
- Colors
- Typography values
- Spacing
- Shadows
- Border radius
- Animation timing

Tokens create a **single source of truth** that connects design to code.

---

## Token Architecture

### Three-Layer Model (Recommended)

```
┌─────────────────────────────────────────────┐
│           COMPONENT TOKENS                   │
│     button-background, card-padding          │
│         (most specific)                      │
├─────────────────────────────────────────────┤
│           SEMANTIC TOKENS                    │
│     color-primary, spacing-md, text-body     │
│         (purpose-driven)                     │
├─────────────────────────────────────────────┤
│           PRIMITIVE TOKENS                   │
│     blue-500, 16px, 1.5rem                   │
│         (raw values)                         │
└─────────────────────────────────────────────┘
```

### Layer Definitions

| Layer | Purpose | Example |
|-------|---------|---------|
| **Primitive** | Raw values | `color-blue-500: #3B82F6` |
| **Semantic** | Purpose/meaning | `color-primary: {color-blue-500}` |
| **Component** | Specific usage | `button-bg-primary: {color-primary}` |

---

## Naming Convention

### Format

```
[category]-[property]-[variant]-[state]
```

### Examples

| Token | Breakdown |
|-------|-----------|
| `color-primary-500` | category: color, property: primary, variant: 500 |
| `font-size-lg` | category: font, property: size, variant: lg |
| `spacing-md` | category: spacing, variant: md |
| `button-bg-hover` | category: button, property: bg, state: hover |

### Rules

1. **Use kebab-case**: `color-primary` not `colorPrimary`
2. **Be descriptive**: `font-size-body` not `fs-1`
3. **Avoid abbreviations**: `background` not `bg` (exception: common ones like `bg`, `fg`)
4. **Order consistently**: category → property → variant → state

---

## Color Tokens

### Primitive Colors

```json
{
  "color": {
    "blue": {
      "50": { "value": "#EFF6FF" },
      "100": { "value": "#DBEAFE" },
      "200": { "value": "#BFDBFE" },
      "300": { "value": "#93C5FD" },
      "400": { "value": "#60A5FA" },
      "500": { "value": "#3B82F6" },
      "600": { "value": "#2563EB" },
      "700": { "value": "#1D4ED8" },
      "800": { "value": "#1E40AF" },
      "900": { "value": "#1E3A8A" }
    }
  }
}
```

### Semantic Colors

```json
{
  "color": {
    "primary": { "value": "{color.blue.500}" },
    "primary-hover": { "value": "{color.blue.600}" },
    "secondary": { "value": "{color.gray.600}" },
    "background": { "value": "{color.white}" },
    "foreground": { "value": "{color.gray.900}" },
    "muted": { "value": "{color.gray.500}" },
    "border": { "value": "{color.gray.200}" }
  }
}
```

### Semantic Status Colors

```json
{
  "color": {
    "success": { "value": "{color.green.500}" },
    "success-bg": { "value": "{color.green.50}" },
    "warning": { "value": "{color.yellow.500}" },
    "warning-bg": { "value": "{color.yellow.50}" },
    "error": { "value": "{color.red.500}" },
    "error-bg": { "value": "{color.red.50}" },
    "info": { "value": "{color.blue.500}" },
    "info-bg": { "value": "{color.blue.50}" }
  }
}
```

---

## Typography Tokens

### Font Family

```json
{
  "font": {
    "family": {
      "sans": { "value": "'Inter', -apple-system, sans-serif" },
      "serif": { "value": "'Lora', Georgia, serif" },
      "mono": { "value": "'JetBrains Mono', monospace" }
    }
  }
}
```

### Font Size

```json
{
  "font": {
    "size": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "1.875rem" },
      "4xl": { "value": "2.25rem" },
      "5xl": { "value": "3rem" }
    }
  }
}
```

### Font Weight

```json
{
  "font": {
    "weight": {
      "normal": { "value": "400" },
      "medium": { "value": "500" },
      "semibold": { "value": "600" },
      "bold": { "value": "700" }
    }
  }
}
```

### Line Height

```json
{
  "line-height": {
    "none": { "value": "1" },
    "tight": { "value": "1.25" },
    "snug": { "value": "1.375" },
    "normal": { "value": "1.5" },
    "relaxed": { "value": "1.625" },
    "loose": { "value": "2" }
  }
}
```

---

## Spacing Tokens

### Base Scale (8pt Grid)

```json
{
  "spacing": {
    "0": { "value": "0" },
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "3": { "value": "0.75rem" },
    "4": { "value": "1rem" },
    "5": { "value": "1.25rem" },
    "6": { "value": "1.5rem" },
    "8": { "value": "2rem" },
    "10": { "value": "2.5rem" },
    "12": { "value": "3rem" },
    "16": { "value": "4rem" },
    "20": { "value": "5rem" },
    "24": { "value": "6rem" }
  }
}
```

### Semantic Spacing

```json
{
  "spacing": {
    "xs": { "value": "{spacing.1}" },
    "sm": { "value": "{spacing.2}" },
    "md": { "value": "{spacing.4}" },
    "lg": { "value": "{spacing.6}" },
    "xl": { "value": "{spacing.8}" },
    "2xl": { "value": "{spacing.12}" }
  }
}
```

---

## Border Tokens

### Border Radius

```json
{
  "radius": {
    "none": { "value": "0" },
    "sm": { "value": "0.125rem" },
    "base": { "value": "0.25rem" },
    "md": { "value": "0.375rem" },
    "lg": { "value": "0.5rem" },
    "xl": { "value": "0.75rem" },
    "2xl": { "value": "1rem" },
    "full": { "value": "9999px" }
  }
}
```

### Border Width

```json
{
  "border": {
    "width": {
      "0": { "value": "0" },
      "1": { "value": "1px" },
      "2": { "value": "2px" },
      "4": { "value": "4px" }
    }
  }
}
```

---

## Shadow Tokens

```json
{
  "shadow": {
    "none": { "value": "none" },
    "sm": { "value": "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
    "base": { "value": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" },
    "md": { "value": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
    "lg": { "value": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
    "xl": { "value": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
    "2xl": { "value": "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
    "inner": { "value": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" }
  }
}
```

---

## Animation Tokens

### Duration

```json
{
  "duration": {
    "instant": { "value": "0ms" },
    "fast": { "value": "100ms" },
    "normal": { "value": "200ms" },
    "slow": { "value": "300ms" },
    "slower": { "value": "400ms" }
  }
}
```

### Easing

```json
{
  "easing": {
    "linear": { "value": "linear" },
    "in": { "value": "cubic-bezier(0.4, 0, 1, 1)" },
    "out": { "value": "cubic-bezier(0, 0, 0.2, 1)" },
    "in-out": { "value": "cubic-bezier(0.4, 0, 0.2, 1)" }
  }
}
```

---

## Breakpoint Tokens

```json
{
  "breakpoint": {
    "sm": { "value": "640px" },
    "md": { "value": "768px" },
    "lg": { "value": "1024px" },
    "xl": { "value": "1280px" },
    "2xl": { "value": "1536px" }
  }
}
```

---

## Z-Index Tokens

```json
{
  "z-index": {
    "hide": { "value": "-1" },
    "base": { "value": "0" },
    "dropdown": { "value": "1000" },
    "sticky": { "value": "1100" },
    "fixed": { "value": "1200" },
    "modal-backdrop": { "value": "1300" },
    "modal": { "value": "1400" },
    "popover": { "value": "1500" },
    "tooltip": { "value": "1600" },
    "toast": { "value": "1700" }
  }
}
```

---

## Output Formats

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #3B82F6;
  --color-primary-hover: #2563EB;
  --color-background: #FFFFFF;
  --color-foreground: #111827;

  /* Typography */
  --font-family-sans: 'Inter', -apple-system, sans-serif;
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  --line-height-normal: 1.5;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;

  /* Border */
  --radius-md: 0.375rem;

  /* Shadow */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  /* Animation */
  --duration-normal: 200ms;
  --easing-out: cubic-bezier(0, 0, 0.2, 1);
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          // ...scale
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        base: '1rem',
        // ...scale
      },
      spacing: {
        // uses default Tailwind scale
      },
      borderRadius: {
        md: '0.375rem',
      },
      boxShadow: {
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
      transitionDuration: {
        normal: '200ms',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
}
```

---

## Token Organization Best Practices

### File Structure

```
tokens/
├── primitives/
│   ├── colors.json
│   ├── typography.json
│   └── spacing.json
├── semantic/
│   ├── colors.json
│   ├── typography.json
│   └── spacing.json
├── components/
│   ├── button.json
│   ├── input.json
│   └── card.json
└── themes/
    ├── light.json
    └── dark.json
```

### Documentation Requirements

Each token should include:
- **Name**: Token identifier
- **Value**: The actual value
- **Description**: What it's for
- **Category**: Grouping
- **Type**: Value type (color, dimension, etc.)

```json
{
  "color-primary": {
    "value": "#3B82F6",
    "type": "color",
    "description": "Primary brand color for buttons, links, and key UI elements",
    "category": "color"
  }
}
```

---

## Anti-Patterns to Avoid

| Avoid | Why | Instead |
|-------|-----|---------|
| Hardcoded values | Inconsistent | Use tokens |
| Too many tokens | Bloat, confusion | Start minimal |
| Inconsistent naming | Hard to find | Follow convention |
| One layer only | Limited flexibility | Use 2-3 layers |
| Platform-specific values | Not portable | Use abstract values |
| Undocumented tokens | Unknown usage | Document everything |
