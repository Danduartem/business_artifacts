# Create Design System - Instructions

## Overview

Creates a production-ready design system using 3 specialist agents, with Architect review and feedback loop, producing code exports and ONE documentation file.

**Architecture:** Multi-agent depth + Production-ready output

## What You'll Get

THREE files:

### 1. tokens.css
CSS custom properties ready to import:
```css
@import 'tokens.css';

.my-component {
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}
```

### 2. tokens.json
Style Dictionary format for build tools:
```json
{
  "color": {
    "primary": { "value": "#2196F3" }
  }
}
```

### 3. design-system.md
Single documentation file with:
- Quick Reference
- Token Reference (all categories)
- Component Guidelines
- Accessibility Validation

## What You Need

1. **Style Guide Path** - From style-guide-forge or manual style guide
2. **Color Palette Path** - From Color Forge JSON output
3. **Design System Name** - Name for your system (e.g., "Acme Design System")
4. **Brand Personality** - 3-5 adjectives

## How It Works

```
1. You provide inputs
        ↓
2. 3 specialists work in PARALLEL:
   - Token Architect → tokens.css + tokens.json
   - Component Specifier → Component Guidelines
   - Accessibility Auditor → WCAG Validation
        ↓
3. Architect REVIEWS each output
        ↓
4. FEEDBACK LOOP (if needed):
   - Architect sends specific feedback
   - Specialist regenerates
   - Max 3 rounds
        ↓
5. Architect COMPILES documentation
        ↓
6. You get: tokens.css, tokens.json, design-system.md
```

## Commands

| Command | Description |
|---------|-------------|
| `*create` | Full workflow with specialists |
| `*preview` | Preview current system state |
| `*help` | Show menu |
| `*exit` | Exit |

## Why Multi-Agent?

Each specialist brings unique expertise:

| Specialist | Focus |
|------------|-------|
| Token Architect | Extract tokens, generate CSS + JSON |
| Component Specifier | Component usage principles |
| Accessibility Auditor | WCAG 2.1 AA validation |

A single agent doing all of this would be shallower on each area.

## The Feedback Loop

If an output is weak, the Architect sends targeted feedback:

```
Your tokens.css needs improvement:

ISSUE: Missing semantic color tokens
EXAMPLE: Only palette colors defined, no --color-text-primary
FIX: Add semantic tokens that reference palette values

Please regenerate with this guidance.
```

**Rules:**
- Maximum 3 rounds per specialist
- Feedback must be SPECIFIC
- If still weak after 3 rounds, use best version

## Token Architecture (3-Tier)

```
TIER 1: Global/Reference (raw values)
        --color-palette-blue-500: #2196F3
                    ↓
TIER 2: Semantic/Alias (purpose-based)
        --color-primary: var(--color-palette-blue-500)
                    ↓
TIER 3: Component (component-specific)
        --button-primary-bg: var(--color-primary)
```

## Token Categories

| Category | Examples |
|----------|----------|
| Colors | Palette, semantic, states |
| Typography | Families, sizes, weights, line-heights |
| Spacing | Scale (xs to 4xl) |
| Borders | Radius, width |
| Shadows | Elevation levels, focus ring |
| Motion | Duration, easing |

## Tips

- **Run Color Forge first.** The color palette JSON is essential input.
- **Run Style Guide Forge second.** Gives you typography, spacing guidelines.
- **Import tokens.css early.** Use it from day one of development.
- **Check accessibility results.** Fix any contrast failures before shipping.

## What's NOT in the Output

- Individual component spec files (guidelines are in design-system.md)
- Multiple documentation files (one file is enough)
- Separate accessibility report file (included in design-system.md)

## Quick Start After Generation

**1. Add tokens to your project:**
```html
<link rel="stylesheet" href="path/to/tokens.css">
```

**2. Use tokens in your CSS:**
```css
.my-component {
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  transition: all var(--duration-fast) var(--easing-default);
}
```

**3. Check accessibility:**
Open design-system.md and review the Accessibility Validation section.
Fix any contrast issues before shipping.

---

*Design System Forge v2 - Multi-agent quality. Production-ready output.*
