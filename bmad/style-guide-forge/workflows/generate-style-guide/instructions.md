# Generate Style Guide - Instructions

## Overview

Creates a comprehensive design style guide using 5 specialist agents, with Director review and feedback loop, compiled into ONE actionable file.

**Architecture:** Multi-agent depth + Single-file simplicity

**Note:** Code exports (tokens.css, tailwind.config.js) are handled by **design-system-forge**. This module creates design guidelines only.

## What You'll Get

ONE file: `style-guide.md`

Contains 9 sections:
1. **Design Principles** - 5-7 core principles with applications
2. **Brand Foundation** - Personality mapping, voice/tone for UI, logo usage
3. **Visual Direction** - Patterns to adopt/avoid from references
4. **Color Guidelines** - Color hierarchy with usage guidance
5. **Typography Guidelines** - Type scale with use cases
6. **Spacing & Layout** - Spacing scale, grid, breakpoints
7. **Component Principles** - When-to-use guidelines for UI components
8. **Motion Principles** - Animation philosophy, timing, easing
9. **Accessibility Checklist** - WCAG compliance checklist

## What You Need

1. **Brand Guide Path** - Path to brand guidelines document (PDF or MD)
2. **Color Palette Path** - Path to Color Forge output JSON
3. **Reference URLs** - 1-5 websites that inspire your design
4. **Brand Personality** - 3-5 adjectives (e.g., professional, innovative, approachable)
5. **Target Audience** - Who are you designing for?
6. **Industry** - What sector? (e.g., SaaS, healthcare, fintech)
7. **Design Goals** - What feeling should design evoke?

## How It Works

```
1. You provide inputs
        ↓
2. Director captures reference screenshots (optional)
        ↓
3. 5 specialists work in PARALLEL:
   - Brand Translator → Design Principles + Brand Foundation
   - Reference Analyzer → Visual Direction
   - Foundations Architect → Color, Typography, Spacing
   - Component Designer → Component Principles
   - Interaction Designer → Motion + Accessibility
        ↓
4. Director REVIEWS each section
        ↓
5. FEEDBACK LOOP (if needed):
   - Director sends specific feedback
   - Specialist regenerates
   - Max 3 rounds
        ↓
6. Director COMPILES into one file
        ↓
7. You get: style-guide.md
```

## Commands

| Command | Description |
|---------|-------------|
| `*generate` | Full workflow with specialists |
| `*analyze` | Analyze URLs only (no file output) |
| `*help` | Show menu |
| `*exit` | Exit |

## Why Multi-Agent?

Each specialist brings unique expertise:

| Specialist | Focus |
|------------|-------|
| Brand Translator | Brand essence → design principles |
| Reference Analyzer | Visual patterns from inspiration |
| Foundations Architect | Typography, spacing, color systems |
| Component Designer | UI component principles |
| Interaction Designer | Motion and accessibility |

A single agent doing all of this would be shallower on each area.

## The Feedback Loop

If a section is weak, the Director sends targeted feedback:

```
Your Typography Guidelines section needs improvement:

ISSUE: Missing usage context for each size
EXAMPLE: "xl - 1.25rem" doesn't tell designers when to use it
FIX: Add usage like "xl - 1.25rem - Card titles, section headers"

Please regenerate with this guidance.
```

**Rules:**
- Maximum 3 rounds per specialist
- Feedback must be SPECIFIC
- If still weak after 3 rounds, use best version

## Tips

- **Better references = better output.** Pick sites whose design language you admire.
- **Be specific about personality.** "Modern but warm" > "professional"
- **Provide a color palette.** Run Color Forge first for best results.

## What's NOT in the Output

- JSON files (designers don't need JSON)
- Code exports (handled by design-system-forge)
- tokens.css / tailwind.config.js (handled by design-system-forge)
- Individual component specs (handled by design-system-forge)
- Intermediate process files (all in memory)

## Next Steps After Generation

1. **Review** - Open style-guide.md and verify it matches your brand
2. **Share** - Give to designers as their daily reference
3. **Generate Code** - Run design-system-forge to create tokens.css and tokens.json

---

*Style Guide Forge v2 - Multi-agent quality. Single-file simplicity.*
