# Color Palette Template

Use this template to document your brand colors for design system generation.

---

## Primary Colors

### Primary
The main brand color used for primary actions and key UI elements.

| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | #[lightest] | Subtle backgrounds |
| 100 | #[lighter] | Hover backgrounds |
| 200 | #[light] | Borders |
| 300 | #[medium-light] | - |
| 400 | #[medium] | - |
| **500** | **#[base]** | **Primary buttons, links** |
| 600 | #[medium-dark] | Hover states |
| 700 | #[dark] | Active states |
| 800 | #[darker] | - |
| 900 | #[darkest] | Text on light |

### Secondary (Optional)
A complementary color for secondary actions.

| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | #[lightest] | - |
| 100 | #[lighter] | - |
| 500 | **#[base]** | **Secondary buttons** |
| 700 | #[dark] | Hover states |
| 900 | #[darkest] | - |

---

## Neutral Colors

Grayscale colors for text, backgrounds, and borders.

| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | #F9FAFB | Page background |
| 100 | #F3F4F6 | Card backgrounds |
| 200 | #E5E7EB | Borders, dividers |
| 300 | #D1D5DB | Disabled borders |
| 400 | #9CA3AF | Placeholder text |
| 500 | #6B7280 | Secondary text |
| 600 | #4B5563 | Body text |
| 700 | #374151 | Headings |
| 800 | #1F2937 | Primary text |
| 900 | #111827 | Darkest text |

---

## Semantic Colors

Colors with specific meaning for user feedback.

### Success
| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | #ECFDF5 | Success background |
| 500 | **#10B981** | **Success text/icons** |
| 700 | #047857 | Success dark |

### Warning
| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | #FFFBEB | Warning background |
| 500 | **#F59E0B** | **Warning text/icons** |
| 700 | #B45309 | Warning dark |

### Error
| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | #FEF2F2 | Error background |
| 500 | **#EF4444** | **Error text/icons** |
| 700 | #B91C1C | Error dark |

### Info
| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | #EFF6FF | Info background |
| 500 | **#3B82F6** | **Info text/icons** |
| 700 | #1D4ED8 | Info dark |

---

## Background Colors

| Token | Hex | Usage |
|-------|-----|-------|
| bg-default | #FFFFFF | Main page background |
| bg-surface | #FFFFFF | Card backgrounds |
| bg-elevated | #FFFFFF | Elevated elements |
| bg-sunken | #F9FAFB | Inset areas |
| bg-muted | #F3F4F6 | Disabled backgrounds |

---

## Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| text-primary | #111827 | Main text |
| text-secondary | #6B7280 | Supporting text |
| text-muted | #9CA3AF | Disabled/placeholder |
| text-inverse | #FFFFFF | Text on dark backgrounds |
| text-link | [primary-500] | Links |

---

## Border Colors

| Token | Hex | Usage |
|-------|-----|-------|
| border-default | #E5E7EB | Default borders |
| border-strong | #D1D5DB | Emphasized borders |
| border-subtle | #F3F4F6 | Subtle dividers |
| border-focus | [primary-500] | Focus rings |

---

## Interactive Colors

### Buttons

| State | Background | Text | Border |
|-------|------------|------|--------|
| Primary default | primary-500 | #FFFFFF | transparent |
| Primary hover | primary-600 | #FFFFFF | transparent |
| Primary active | primary-700 | #FFFFFF | transparent |
| Primary disabled | gray-200 | gray-400 | transparent |

### Links

| State | Color |
|-------|-------|
| Default | primary-500 |
| Hover | primary-600 |
| Active | primary-700 |
| Visited | [optional] |

### Focus Ring
| Property | Value |
|----------|-------|
| Color | primary-500 @ 40% opacity |
| Width | 3px |
| Offset | 2px |

---

## Dark Mode (Optional)

If your design system supports dark mode, define the dark variants:

### Backgrounds (Dark)
| Token | Hex |
|-------|-----|
| bg-default | #111827 |
| bg-surface | #1F2937 |
| bg-elevated | #374151 |

### Text (Dark)
| Token | Hex |
|-------|-----|
| text-primary | #F9FAFB |
| text-secondary | #D1D5DB |
| text-muted | #9CA3AF |

---

## Color Usage Guidelines

### Do
- Use semantic colors for feedback (success, error, warning)
- Maintain 4.5:1 contrast ratio for text
- Use color + another indicator (icon, text) for critical info

### Don't
- Don't rely on color alone to convey meaning
- Don't use more than 3-4 colors in one view
- Don't use bright colors for large background areas

---

## Notes

[Any additional color guidelines or brand-specific rules]
