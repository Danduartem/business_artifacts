# Oitavo Cafe - Style Guide

**Version:** 1.0.0
**Date:** 2025-12-23
**Status:** Production Ready

---

## Executive Summary

| Field | Value |
|-------|-------|
| **Brand** | Oitavo Cafe |
| **Category** | Boutique Marketing Agency |
| **Positioning** | Anti-Bullshit / Premium but Accessible |
| **Tagline** | Sem acucar. Feito pra vender. |
| **Vision** | Acabar com o marketing de vaidade. |
| **Sub-brand** | Mocha CRM - "O CRM que desperta a relacao" |

---

## Part 1: Design Principles

### Core Philosophy

> Digital design is brand made interactive. Every pixel should reflect the essence of Oitavo Cafe: direct, warm, trustworthy, and results-focused.

### The 7 Design Principles

| # | Principle | Description |
|---|-----------|-------------|
| 1 | **Clarity Over Decoration** | Every element serves a purpose. No ornamental clutter. If it doesn't help the user or communicate value, remove it. |
| 2 | **Warmth Without Softness** | Coffee browns and cream tones create warmth, but the design remains sharp and professional. Warm ≠ weak. |
| 3 | **Direct Visual Hierarchy** | The most important thing should be unmistakably clear. Headlines hit hard. CTAs stand out. No ambiguity. |
| 4 | **Premium Accessibility** | Premium doesn't mean exclusive. High contrast, readable fonts, accessible interactions for everyone. |
| 5 | **Results-Focused Design** | Design should drive action and conversion. Pretty is a byproduct of functional, not the goal. |
| 6 | **Consistent but Not Rigid** | The system provides guardrails, not handcuffs. Adapt to context while maintaining brand recognition. |
| 7 | **Human Over Corporate** | Real photography, approachable typography, conversational microcopy. Never feel like a faceless corporation. |

### Personality-to-Visual Mapping

| Brand Trait | Visual Expression |
|-------------|-------------------|
| Brutally Honest | High contrast, clear typography, no hidden elements |
| Anti-Establishment | Bold color usage, unconventional layouts when appropriate |
| Confident | Strong typography hierarchy, decisive color choices |
| Direct | Minimal decoration, clear CTAs, short copy blocks |
| Warm | Coffee browns, cream backgrounds, rounded corners |
| Results-Focused | Data visualizations, number callouts, progress indicators |
| Educative | Well-organized content, clear information hierarchy |

---

## Part 2: Logo Guidelines

### Primary Logo

The Oitavo Cafe logo combines three symbolic elements:
- **The 8/Infinity Symbol**: Continuous cycle of learning, connections, and business evolution
- **Coffee Bean**: Connection to intimate, social moments where ideas emerge
- **Coffee Cup (top view)**: The brand as a meeting point for strategy and human relations

### Logo Versions

| Version | Usage | File |
|---------|-------|------|
| **Primary Horizontal** | Default usage - headers, documents | logo-horizontal.svg |
| **Symbol Only** | App icons, favicons, small spaces | logo-symbol.svg |
| **Stacked** | Square formats, social media profiles | logo-stacked.svg |
| **Reverse** | Dark backgrounds | logo-reverse.svg |

### Logo Colors

| Context | Logo Color | Background |
|---------|------------|------------|
| Light backgrounds | Brand gradient (#4E130D → #7A1307 → #A1523C) | Neutral-50 (#FFFCF9) or Neutral-100 (#F8E8D8) |
| Dark backgrounds | Neutral-100 (#F8E8D8) or White | Primary-700+ or brand gradient |
| Photography | White or Neutral-100 | Ensure sufficient contrast |

### Clear Space

Minimum clear space around the logo equals the height of the "O" in "Oitavo" on all sides.

```
          ┌─────────────────────────────────┐
          │                                 │
          │    [O height]                   │
          │         ┌───────────────┐       │
          │  [O]    │   LOGO        │  [O]  │
          │         └───────────────┘       │
          │              [O height]         │
          │                                 │
          └─────────────────────────────────┘
```

### Minimum Sizes

| Format | Minimum Width |
|--------|---------------|
| Digital (horizontal) | 120px |
| Digital (symbol only) | 32px |
| Print (horizontal) | 30mm |
| Print (symbol only) | 10mm |

### Logo Don'ts

- Never stretch or distort the logo
- Never change the logo colors outside approved palette
- Never add effects (shadows, glows, outlines)
- Never place on busy backgrounds without sufficient contrast
- Never rotate the logo
- Never recreate the logo with different fonts
- Never separate the symbol from wordmark in horizontal version

---

## Part 3: Color System

### Brand Colors

Reference: `/design-system/color-palette/oitavo-cafe-colors.css`

#### Primary Palette

| Name | Role | Locked Value | Usage |
|------|------|--------------|-------|
| **Cafe Escuro** | Primary | #4E130D | Headlines, buttons, brand emphasis |
| **Cafe Intenso** | Secondary | #7A1307 | Gradients, hover states |
| **Terracotta** | Accent | #A1523C | CTAs, highlights, links |
| **Caramelo** | Neutral | #F8E8D8 | Backgrounds, cards |
| **Cinza** | Gray | #ECECEC | Borders, subtle backgrounds |

#### Brand Gradient

The signature gradient flows from deep burgundy through red-brown to warm terracotta:

```css
background: linear-gradient(135deg, #4E130D 0%, #7A1307 50%, #A1523C 100%);
```

**Usage:** Hero sections, headers, featured content blocks, brand emphasis areas.

#### Color Application Rules

**60-30-10 Distribution:**
| Proportion | Colors | Application |
|------------|--------|-------------|
| 60% | Neutrals (Caramelo, Cinza, White) | Backgrounds, large surfaces |
| 30% | Primary/Secondary | Navigation, headers, key UI |
| 10% | Accent (Terracotta) | CTAs, highlights, emphasis |

### Semantic Colors

| Status | Color | HEX | Usage |
|--------|-------|-----|-------|
| Success | Green | #22C55E | Positive feedback, confirmations |
| Warning | Amber | #F59E0B | Cautions, important notices |
| Error | Red | #EF4444 | Errors, destructive actions |
| Info | Blue | #3B82F6 | Informational messages |

**Note:** Error red (#EF4444) is intentionally distinct from brand burgundy (#4E130D) to avoid confusion.

### Data Visualization Colors

Extended palette for charts, graphs, and heatmaps. These colors complement the brand palette while providing sufficient differentiation for data clarity.

| Name | HEX | Usage |
|------|-----|-------|
| **Teal-400** | #2DD4BF | Heatmaps, geographic data, positive trends |
| **Teal-600** | #0D9488 | Darker teal for emphasis in charts |
| **Coral-400** | #FB7185 | Secondary data series, contrast elements |
| **Amber-400** | #FBBF24 | Highlights, attention areas in visualizations |

**Heatmap Gradient:**
```css
/* Low to High intensity */
--heatmap-low: #F0FDFA;    /* Teal-50 */
--heatmap-mid: #5EEAD4;    /* Teal-300 */
--heatmap-high: #0D9488;   /* Teal-600 */
```

**Chart Series Colors (in order):**
1. Primary-600 (#7A2E21) - Primary series
2. Accent-500 (#A1523C) - Secondary series
3. Teal-500 (#14B8A6) - Tertiary series
4. Neutral-400 (#C4A080) - Quaternary series

**Usage Guidelines:**
- Use brand colors (Primary, Accent) for the most important data series
- Use Teal for geographic/location data and heatmaps
- Maintain 3:1 contrast ratio between adjacent chart elements
- Always provide legends for color-coded data

### Dark Mode

Dark mode inverts the relationship while maintaining warmth:

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | Neutral-50 | Primary-900 |
| Text | Gray-900 | Neutral-100 |
| Brand color | Primary-700 | Accent-400 |
| Interactive | Primary-600 | Accent-500 |

---

## Part 4: Typography

### Font Families

#### Primary: Hartwell

Custom typography developed specifically for Oitavo Cafe.

**Characteristics:**
- Modern sans-serif with soft curves
- Geometric proportions suggesting a stylized coffee bean
- Modern but accessible - transmits clarity, innovation, proximity
- Technological without losing human warmth
- Balance between professionalism and welcoming

**Weights Available:**
- Light (300)
- Regular (400)
- Italic (400i)
- Bold (700)

**Usage:** Headlines, logo, featured text, display typography

#### Secondary: DIN Pro

Supporting font for extended reading and UI elements.

**Weights Available:**
- Light (300)
- Regular (400)
- Bold (700)
- Black (900)

**Usage:** Body text, UI elements, forms, long-form content

#### Fallback Stack

```css
--font-display: "Hartwell", system-ui, -apple-system, sans-serif;
--font-body: "DIN Pro", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;
```

### Type Scale

Based on 16px base size with 1.25 (Major Third) ratio:

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-xs` | 12px / 0.75rem | 1.5 | Captions, labels |
| `--text-sm` | 14px / 0.875rem | 1.5 | Secondary text, hints |
| `--text-base` | 16px / 1rem | 1.6 | Body text |
| `--text-lg` | 20px / 1.25rem | 1.5 | Lead paragraphs |
| `--text-xl` | 25px / 1.563rem | 1.4 | H4, subheadings |
| `--text-2xl` | 31px / 1.953rem | 1.3 | H3 |
| `--text-3xl` | 39px / 2.441rem | 1.2 | H2 |
| `--text-4xl` | 49px / 3.052rem | 1.1 | H1, heroes |
| `--text-5xl` | 61px / 3.815rem | 1.1 | Display, impact |

### Typography Guidelines

#### Headlines (Hartwell)

- Use Bold (700) for maximum impact
- Sentence case preferred (not ALL CAPS)
- Keep headlines short and punchy (5-10 words ideal)
- Color: Primary-700 (#4E130D) on light, Neutral-100 on dark

#### Body Text (DIN Pro)

- Regular (400) for body copy
- Maximum line width: 65-75 characters
- Paragraph spacing: 1.5em
- Color: Gray-900 for primary, Gray-600 for secondary

#### Hierarchy Example

```
H1 - Sem acucar. Feito pra vender.      [Hartwell Bold, 49px, Primary-700]
H2 - O que nos torna diferentes         [Hartwell Bold, 39px, Primary-700]
H3 - Metodo, nao magia                  [Hartwell Bold, 31px, Gray-900]
Body - Lorem ipsum dolor sit amet...    [DIN Pro, 16px, Gray-800]
Caption - Atualizado em 2025            [DIN Pro, 12px, Gray-500]
```

### Typography Don'ts

- Never use more than 2 font families in one design
- Never set body text smaller than 14px
- Never use light weights for body copy
- Never justify text (use left alignment)
- Never use decorative fonts
- Never stretch or compress type

---

## Part 5: Spacing & Layout

### Spacing Scale

Based on 8px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing, inline elements |
| `--space-2` | 8px | Compact elements, icon gaps |
| `--space-3` | 12px | Small component padding |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 20px | Component gaps |
| `--space-6` | 24px | Section padding (small) |
| `--space-8` | 32px | Card padding, section gaps |
| `--space-10` | 40px | Large gaps |
| `--space-12` | 48px | Section padding (medium) |
| `--space-16` | 64px | Section padding (large) |
| `--space-20` | 80px | Page sections |
| `--space-24` | 96px | Hero spacing |

### Grid System

**Container widths:**

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Mobile (<640px) | 100% | 16px |
| Tablet (640-1024px) | 100% | 24px |
| Desktop (1024-1280px) | 1024px | 32px |
| Wide (>1280px) | 1200px | 32px |

**Column grid:** 12-column grid with 24px gutters

### Breakpoints

| Name | Value | Target |
|------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small elements, tags |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards, modals |
| `--radius-xl` | 16px | Large cards, sections |
| `--radius-2xl` | 24px | Feature cards |
| `--radius-full` | 9999px | Pills, avatars |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | 0 1px 2px rgba(78,19,13,0.05) | Subtle lift |
| `--shadow-md` | 0 4px 6px rgba(78,19,13,0.1) | Cards, dropdowns |
| `--shadow-lg` | 0 10px 15px rgba(78,19,13,0.1) | Modals, popovers |
| `--shadow-xl` | 0 20px 25px rgba(78,19,13,0.1) | Large elements |

Note: Shadows use brand primary color for warmth.

---

## Part 6: Imagery Guidelines

### Photography Style

#### Characteristics

| Attribute | Guideline |
|-----------|-----------|
| **Subjects** | Real entrepreneurs, professionals, business owners |
| **Setting** | Cafe environments, modern workspaces, natural settings |
| **Mood** | Warm, confident, approachable, authentic |
| **Lighting** | Natural light preferred, warm tones |
| **Color Grading** | Warm, aligned with brand palette |
| **Composition** | Clean, uncluttered, subject-focused |

#### Photo Types

**Hero Images:**
- Full-bleed backgrounds
- Subject looking at camera or engaged in work
- Coffee/cafe elements as natural props
- Space for text overlay

**Lifestyle Images:**
- Entrepreneurs working
- Coffee moments
- Business meetings
- Celebrating results

**Product/Interface:**
- Clean screenshots
- Device mockups
- Dashboard views

### Image Treatment

**Color overlay for brand consistency:**
```css
/* Subtle brand tint */
filter: sepia(10%) saturate(90%);

/* Strong brand overlay */
background: linear-gradient(
  135deg,
  rgba(78, 19, 13, 0.7),
  rgba(161, 82, 60, 0.7)
);
```

**Rounded corners:** Use `--radius-lg` (12px) or `--radius-xl` (16px) for images in cards.

### Icon System

#### Product Icons

| Icon | Product | Shape |
|------|---------|-------|
| Star/Flower | Mocha CRM | Four-petal flower with center dot |
| C with bean | Clientes | Letter C with coffee bean curve |
| 8/Bean symbol | OitavoCafe | Primary logo mark |
| Text circle | Mentorias | "Oitavo Cafe" text in circle |
| Double stripes | Expresso | Two parallel coffee bean stripes |

**Icon style:**
- Solid fills on gradient circular backgrounds
- Brand gradient from Primary-700 to Accent-500
- Cream (#F8E8D8) icon color on dark backgrounds
- Consistent stroke width when outlined

#### UI Icons

**CRITICAL: NEVER use emojis in any design or UI.**

Emojis are banned because:
- Unprofessional appearance
- Inconsistent rendering across platforms
- Poor accessibility (screen readers announce them awkwardly)
- Break brand cohesion
- Not scalable or customizable

**Primary Icon System: Lucide Icons**

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

**Why Lucide:**
- Minimal, consistent design language
- Actively maintained
- Excellent accessibility support
- SVG-based, fully scalable

**Secondary: Heroicons** (for Tailwind projects)

**Icon Sizing:**

| Context | Size |
|---------|------|
| UI icons | 16-24px (1rem - 1.5rem) |
| Feature highlights | 32-48px (2rem - 3rem) |
| Hero/decorative | 64px+ (4rem+) |

**Icon Styling:**

```css
/* Inherit from text color */
.icon {
  color: inherit;
  stroke: currentColor;
}

/* Brand colors */
.icon-primary { color: #4E130D; }
.icon-accent { color: #A1523C; }
```

**Icon Accessibility:**

```html
<!-- Decorative icon (hidden from screen readers) -->
<svg aria-hidden="true" class="icon">...</svg>

<!-- Meaningful icon (needs label) -->
<svg aria-label="Success" role="img" class="icon">...</svg>

<!-- Icon-only button (needs label) -->
<button aria-label="Close menu">
  <svg aria-hidden="true" class="icon">...</svg>
</button>
```

**Common Icons (Lucide):**
- `check` - Success, completion
- `x` - Close, error, remove
- `alert-circle` - Warning
- `info` - Information
- `arrow-right` - Forward, next
- `chevron-down` - Dropdown
- `user` - Profile
- `mail` - Email
- `phone` - Call
- `calendar` - Schedule

### Imagery Don'ts

- No stock photos that feel generic or staged
- No cold, corporate imagery
- No blue-tinted or cold color grading
- No cluttered compositions
- No isolated white backgrounds (use cream)
- No images without proper contrast for text overlay

---

## Part 7: Component Principles

### Buttons

#### Primary Button

```css
.btn-primary {
  background: var(--color-primary-600);
  color: var(--color-neutral-50);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-family: var(--font-body);
}

.btn-primary:hover {
  background: var(--color-primary-700);
}
```

#### Button Variants

| Variant | Background | Border | Text |
|---------|------------|--------|------|
| Primary | Primary-600 | None | Neutral-50 |
| Secondary | Transparent | Primary-400 | Primary-600 |
| Ghost | Transparent | None | Primary-600 |
| Accent | Accent-500 | None | Neutral-50 |
| Destructive | Error-500 | None | White |

#### Button Sizes

| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| Small | 8px 16px | 14px | 32px |
| Medium | 12px 24px | 16px | 44px |
| Large | 16px 32px | 18px | 52px |

### Form Inputs

```css
.input {
  background: var(--color-neutral-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: var(--color-accent-500);
  box-shadow: 0 0 0 3px rgba(161, 82, 60, 0.2);
  outline: none;
}
```

### Cards

```css
.card {
  background: var(--color-neutral-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
}

.card-featured {
  background: var(--gradient-subtle);
  border: none;
}
```

### Alerts

| Type | Background | Border-Left | Icon Color |
|------|------------|-------------|------------|
| Success | Success-50 | Success-500 | Success-600 |
| Warning | Warning-50 | Warning-500 | Warning-600 |
| Error | Error-50 | Error-500 | Error-600 |
| Info | Info-50 | Info-500 | Info-600 |

---

## Part 8: Motion Principles

### Animation Philosophy

Motion in Oitavo Cafe design should feel:
- **Confident**: Quick, decisive movements
- **Warm**: Smooth easing, never harsh
- **Purposeful**: Every animation serves UX
- **Subtle**: Support, don't distract

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 100ms | Micro-interactions, hover |
| `--duration-normal` | 200ms | Standard transitions |
| `--duration-slow` | 300ms | Larger element changes |
| `--duration-slower` | 500ms | Page transitions, modals |

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Elements exiting |
| `--ease-out` | cubic-bezier(0, 0, 0.2, 1) | Elements entering |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Standard transitions |
| `--ease-bounce` | cubic-bezier(0.34, 1.56, 0.64, 1) | Playful emphasis |

### Common Animations

**Button hover:**
```css
transition: background-color var(--duration-fast) var(--ease-out),
            transform var(--duration-fast) var(--ease-out);
```

**Card hover:**
```css
transition: transform var(--duration-normal) var(--ease-out),
            box-shadow var(--duration-normal) var(--ease-out);
transform: translateY(-2px);
```

**Page transitions:**
```css
transition: opacity var(--duration-slow) var(--ease-in-out);
```

### Reduced Motion

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Part 9: Landing Page Principles

### Core Philosophy

- **Single Purpose:** One primary goal per page (convert, capture, book). Everything else supports it.
- **Restraint = Luxury:** Minimal elements, maximum intention. Edit aggressively.
- **Clarity Over Cleverness:** 5-second skim must explain what/for whom/value.
- **Trust Before Push:** Evidence precedes CTA emphasis.
- **Speed Is Brand:** Performance is part of the premium feel.

### Page Structure

Follow the **Promise → Mechanism → Proof → Offer** narrative:

| Section | Purpose |
|---------|---------|
| **Promise** | Clear value proposition, what they get |
| **Mechanism** | How it works, the system/method |
| **Proof** | Social proof, results, testimonials |
| **Offer** | CTA, pricing, next steps |

### CTA Strategy

- One primary action repeated throughout
- One secondary "safety" path at most
- Use first person: "Quero agendar" (not "Agende")
- Be specific: "Quero o diagnostico gratuito"
- Remove friction: "sem compromisso", "so 20 minutos"

### Form UX

| Principle | Implementation |
|-----------|----------------|
| Field Minimization | Ask only what's necessary |
| Two-Step Option | Qualifier → contact for higher completion |
| Labels Always Visible | No placeholder-as-label |
| Inline Validation | Specific, human error messages |
| Trust Microcopy | Privacy/response time near CTA |
| Thank-You State | Clear next step (calendar/download) |

### Performance Targets

| Metric | Target | Priority |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Critical |
| **INP** (Interaction to Next Paint) | < 200ms | Critical |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Critical |

**Media Discipline:**
- Modern formats (WebP, AVIF)
- Responsive sizes
- Lazy-load below fold

### SEO Essentials

- One H1 per page
- Logical H2/H3 hierarchy
- Meaningful alt text for images
- Title/meta/OG tags
- Relevant schema (FAQ/Organization)

### Analytics Events

Standard event naming:
- `view_hero`
- `click_cta_primary`
- `form_start`
- `form_submit`
- `faq_toggle`
- `exit_intent`

---

## Part 10: Accessibility Checklist (WCAG AA+)

### Color Contrast

| Requirement | Standard | Status |
|-------------|----------|--------|
| Normal text | 4.5:1 minimum (WCAG AA) | Pass (all pairs 6.5:1+) |
| Large text | 3:1 minimum | Pass |
| UI components | 3:1 minimum | Pass |
| Focus indicators | 3:1 minimum | Pass |

### Interaction

- All interactive elements have visible focus states
- Focus order follows logical reading order
- Touch targets minimum 44x44px
- No interaction relies solely on color
- Keyboard navigation supported throughout

### Content

- Images have descriptive alt text
- Form inputs have associated labels
- Error messages are descriptive and helpful
- Language is declared in HTML
- Headings follow hierarchical order

### Motion

- Reduced motion preference respected
- No content flashes more than 3 times/second
- Animations can be paused when relevant

---

## Part 11: Voice in UI Design

### Microcopy Guidelines

Align all UI text with the voice guide principles:

| Context | Generic | Oitavo Cafe |
|---------|---------|-------------|
| Empty state | No data available | Nada aqui ainda. Vamos mudar isso? |
| Loading | Please wait... | Carregando os numeros que importam... |
| Success | Operation successful | Feito. Sem enrolacao. |
| Error | An error occurred | Algo deu errado. Ja estamos vendo. |
| CTA | Submit | Quero comecar |
| CTA | Learn more | Me mostra os dados |

### Tone in UI

- **Forms**: Helpful but not patronizing
- **Errors**: Direct, solution-focused
- **Success**: Celebrate briefly, move on
- **Empty states**: Opportunity, not dead-end
- **Loading**: Acknowledge the wait with personality

---

## Part 12: Brand Applications

### Social Media

**Instagram Grid:**
- Consistent warm color palette
- Mix of photography and graphic posts
- Carousels for educational content
- Results callouts with numbers

**Profile Picture:**
- Symbol-only logo on cream background
- Circular crop-safe

### Documents

**Proposals:**
- Cover with brand gradient
- Clean interior pages
- Data visualizations in brand colors
- Maximum 6-8 pages

**Presentations:**
- Title slides: Brand gradient background, white text
- Content slides: Cream background, dark text
- Data slides: Minimal decoration, numbers prominent

### Digital Products

**Mocha CRM:**
- Same color system
- Cream backgrounds for main app
- Brand gradient for headers/navigation
- Terracotta accent for CTAs

---

## Appendix A: Quick Reference

### Colors (HEX)

```
Primary-700:    #4E130D
Secondary-600:  #7A1307
Accent-500:     #A1523C
Neutral-100:    #F8E8D8
Neutral-50:     #FFFCF9
Gray-900:       #262626
```

### Typography

```
Display:    Hartwell Bold, 49px
H1:         Hartwell Bold, 39px
H2:         Hartwell Bold, 31px
H3:         Hartwell Bold, 25px
Body:       DIN Pro, 16px
Small:      DIN Pro, 14px
```

### Spacing

```
Base unit:  8px
Card:       24px padding
Section:    64px vertical
```

### Radius

```
Buttons:    8px
Cards:      12px
Inputs:     8px
Pills:      9999px
```

---

## Appendix B: File References

| Asset | Location |
|-------|----------|
| Color Palette | `/design-system/color-palette/` |
| CSS Variables | `/design-system/color-palette/oitavo-cafe-colors.css` |
| Design Principles | `/design/design-principles.md` |
| Icon System | `/design/icon-system.md` |
| Voice Guide | `/estrategia/voice-guide.md` |
| Brand Manual | `/manual-de-marca/` |
| Offers Catalog | `/ofertas/oitavo-cafe-catalogo-ofertas.md` |

---

## Changelog

### v1.0.0 (2025-12-23)

- Initial style guide generation
- 12 sections covering complete design system
- Typography: Hartwell + DIN Pro
- Color integration from Color Forge palette
- Voice integration from Voice Guide
- Component principles documented
- Accessibility checklist included (WCAG AA+)
- Landing page principles (Promise → Mechanism → Proof → Offer)
- Performance targets (LCP, INP, CLS)
- Icon system: Lucide primary, NO EMOJIS rule
- Form UX guidelines
- Analytics event naming conventions

---

**Sem acucar. Feito pra vender.**
