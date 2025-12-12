# Style Guide Template

Use this template to document your visual design specifications for design system generation.

---

## Typography

### Font Families

#### Primary Font (Headings)
- **Font Name:** [e.g., Inter, Playfair Display, Montserrat]
- **Source:** [Google Fonts / Adobe Fonts / Self-hosted]
- **Weights Used:** [e.g., 400, 500, 600, 700]

#### Secondary Font (Body)
- **Font Name:** [e.g., Open Sans, Lora, Source Sans Pro]
- **Source:** [Google Fonts / Adobe Fonts / Self-hosted]
- **Weights Used:** [e.g., 400, 500, 600]

#### Mono Font (Code) - Optional
- **Font Name:** [e.g., JetBrains Mono, Fira Code]

### Font Sizes

| Name | Size | Usage |
|------|------|-------|
| xs | 12px / 0.75rem | Captions, labels |
| sm | 14px / 0.875rem | Secondary text |
| md | 16px / 1rem | Body text (base) |
| lg | 18px / 1.125rem | Lead paragraphs |
| xl | 20px / 1.25rem | Small headings |
| 2xl | 24px / 1.5rem | H4 |
| 3xl | 30px / 1.875rem | H3 |
| 4xl | 36px / 2.25rem | H2 |
| 5xl | 48px / 3rem | H1 |
| 6xl | 60px / 3.75rem | Display |

### Font Weights

| Name | Value | Usage |
|------|-------|-------|
| light | 300 | Large display text |
| regular | 400 | Body text |
| medium | 500 | Emphasis, buttons |
| semibold | 600 | Subheadings |
| bold | 700 | Headings |

### Line Heights

| Name | Value | Usage |
|------|-------|-------|
| tight | 1.25 | Headings |
| normal | 1.5 | Body text |
| relaxed | 1.75 | Long-form content |

---

## Spacing System

### Base Unit
[e.g., 4px or 8px]

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0 | Reset |
| 1 | 4px | Tight spacing |
| 2 | 8px | Small gaps |
| 3 | 12px | Medium-small |
| 4 | 16px | Default padding |
| 5 | 20px | Medium |
| 6 | 24px | Section padding |
| 8 | 32px | Large spacing |
| 10 | 40px | XL spacing |
| 12 | 48px | Section gaps |
| 16 | 64px | Page sections |
| 20 | 80px | Major sections |
| 24 | 96px | Hero spacing |

### T-Shirt Aliases

| Alias | Value | Common Use |
|-------|-------|------------|
| xs | 4px | Icon spacing |
| sm | 8px | Button padding |
| md | 16px | Card padding |
| lg | 24px | Section padding |
| xl | 32px | Large containers |
| 2xl | 48px | Page sections |

---

## Border & Corners

### Border Radius

| Name | Value | Usage |
|------|-------|-------|
| none | 0 | Sharp corners |
| sm | 2px | Subtle rounding |
| md | 4px | Default (buttons, inputs) |
| lg | 8px | Cards, containers |
| xl | 12px | Modals, large cards |
| 2xl | 16px | Hero elements |
| full | 9999px | Pills, circles |

### Border Width

| Name | Value | Usage |
|------|-------|-------|
| thin | 1px | Default borders |
| medium | 2px | Emphasis borders |
| thick | 4px | Strong emphasis |

---

## Shadows / Elevation

### Elevation Levels

| Name | Value | Usage |
|------|-------|-------|
| none | none | Flat elements |
| sm | 0 1px 2px rgba(0,0,0,0.05) | Subtle lift |
| md | 0 4px 6px -1px rgba(0,0,0,0.1) | Cards |
| lg | 0 10px 15px -3px rgba(0,0,0,0.1) | Dropdowns |
| xl | 0 20px 25px -5px rgba(0,0,0,0.1) | Modals |
| 2xl | 0 25px 50px -12px rgba(0,0,0,0.25) | Floating elements |

---

## Motion / Animation

### Durations

| Name | Value | Usage |
|------|-------|-------|
| instant | 0ms | No animation |
| fast | 150ms | Micro-interactions |
| normal | 300ms | Default transitions |
| slow | 500ms | Page transitions |

### Easing Functions

| Name | Value | Usage |
|------|-------|-------|
| linear | linear | Progress bars |
| ease-in | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
| ease-out | cubic-bezier(0, 0, 0.2, 1) | Enter animations |
| ease-in-out | cubic-bezier(0.4, 0, 0.2, 1) | Default |

---

## Component Guidelines

### Buttons
- Minimum height: [e.g., 44px for touch targets]
- Padding: [e.g., 12px 24px]
- Border radius: [e.g., md (4px)]
- Font weight: [e.g., medium (500)]

### Inputs
- Height: [e.g., 44px]
- Padding: [e.g., 12px 16px]
- Border: [e.g., 1px solid border-default]
- Border radius: [e.g., md (4px)]
- Focus ring: [e.g., 3px primary with 40% opacity]

### Cards
- Padding: [e.g., 24px]
- Border radius: [e.g., lg (8px)]
- Shadow: [e.g., md]
- Border: [e.g., none or 1px subtle]

---

## Layout Guidelines

### Container Widths

| Name | Value | Usage |
|------|-------|-------|
| sm | 640px | Narrow content |
| md | 768px | Default |
| lg | 1024px | Wide content |
| xl | 1280px | Full-width |

### Grid System
- Columns: [e.g., 12]
- Gutter: [e.g., 24px]
- Margin: [e.g., 16px mobile, 24px tablet, 32px desktop]

### Breakpoints

| Name | Value | Description |
|------|-------|-------------|
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Small desktops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large desktops |

---

## Additional Guidelines

### Z-Index Scale

| Name | Value | Usage |
|------|-------|-------|
| base | 0 | Default |
| dropdown | 100 | Dropdowns, tooltips |
| sticky | 200 | Sticky headers |
| modal | 300 | Modal backgrounds |
| modal-content | 400 | Modal content |
| toast | 500 | Notifications |

### Iconography
- Style: [e.g., Outlined / Filled / Duo-tone]
- Size: [e.g., 16px, 20px, 24px]
- Stroke width: [e.g., 1.5px or 2px]
- Library: [e.g., Lucide, Heroicons, Phosphor]

---

## Notes

[Any additional style guidelines]
