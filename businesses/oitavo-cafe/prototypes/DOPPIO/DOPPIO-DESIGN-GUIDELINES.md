# Doppio Design Guidelines
## Oitavo Café Landing Page Design System

Based on our hero section iterations, these are the established patterns and best practices for creating consistent, beautiful sections.

---

## 1. Design Philosophy

### Core Principles
- **Editorial & Clean**: Inspired by Spotify.design and YES PLZ Coffee
- **Less is More**: Strip away decorative clutter, let typography breathe
- **Confident & Premium**: Bold statements, not busy designs
- **Functional Beauty**: Every element serves a purpose

### What to Avoid
- Decorative SVGs, bursts, dots, rings (looks like a "circus")
- Too many visual elements competing for attention
- Weak or passive copy
- Over-engineering with excessive animations

---

## 2. Color Palette

```css
/* Brand Colors */
--color-marrom-dark: #4E130D;
--color-marrom-medium: #7A1307;
--color-terracotta: #A1523C;
--color-caramelo: #F8E8D8;

/* Dark Mode Application */
--color-bg: #1A0604;              /* Page background */
--color-bg-card: #2A0E0A;         /* Card backgrounds */
--color-text-primary: #F8E8D8;    /* Headlines, key text */
--color-text-secondary: #B89888;  /* Subheadlines, light text */
--color-text-muted: #7A5A4A;      /* Labels, meta text */
```

### Color Usage Rules
- **Background**: Deep maroon (#1A0604) - creates premium, warm feel
- **Primary Text**: Cream (#F8E8D8) - high contrast, readable
- **Accents**: Terracotta (#A1523C) - for CTAs, underlines, highlights
- **Glows**: Use maroon gradients (rgba(122, 19, 7, 0.5)) for atmosphere

---

## 3. Typography

### Font Families
```css
--font-headline: 'Hartwell', Georgia, serif;  /* Headlines only */
--font-body: 'DIN Pro', system-ui, sans-serif; /* Everything else */
```

### Font Files Location
```
/businesses/oitavo-cafe/fonts/
├── Hartwell Black.woff2      (weight: 900)
├── Hartwell Bold.woff2       (weight: 700)
├── Hartwell Medium.woff2     (weight: 500)
├── Hartwell Regular.woff2    (weight: 400)
├── DINPro.woff2              (weight: 400)
├── DINPro-Bold.woff2         (weight: 700)
└── DINPro-Black.woff2        (weight: 900)
```

### Typography Scale
| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Hero Headline | Hartwell | clamp(40px, 5vw, 72px) | 900 | 1.05 |
| Section Headline | Hartwell | clamp(32px, 4vw, 56px) | 900 | 1.1 |
| Subheadline | DIN Pro | 18-20px | 400 | 1.5 |
| Body Text | DIN Pro | 16px | 400 | 1.6 |
| Labels/Meta | DIN Pro | 11-13px | 700 | 1.2 |
| CTA Buttons | DIN Pro | 14px | 700 | - |

### Typography Patterns

#### Bold/Light Contrast
Create visual interest by mixing weights within headlines:
```html
<span>Transformamos</span>           <!-- Bold (900) -->
<span class="light">seu Instagram</span>  <!-- Light (400) -->
```

```css
.light {
    font-weight: 400;
    color: var(--color-text-secondary);
}
```

#### Accent Words
Highlight key words with underline:
```css
.accent {
    color: var(--color-caramelo);
    position: relative;
}
.accent::after {
    content: '';
    position: absolute;
    bottom: 0.06em;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--color-terracotta);
    border-radius: 3px;
}
```

---

## 4. Layout Structure

### Grid System
```css
.section__grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;  /* Content heavier than visual */
    gap: 60px;
    align-items: start;  /* Or center depending on content */
}
```

### Container
```css
.section__container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 80px 80px;
}
```

### Content Block Max Width
```css
.section__content {
    max-width: 700px;  /* Prevents lines from getting too long */
}
```

---

## 5. Visual Elements

### Cards (Dashboard Style)
```css
.card {
    background: linear-gradient(145deg, var(--color-bg-card) 0%, #1F0906 100%);
    border: 1px solid rgba(161, 82, 60, 0.3);
    border-radius: 16px;
    padding: 32px;
    max-width: 440px;
    transform: rotate(2deg);  /* Adds dynamism */
}
```

### Card Glow Effect
```css
.card::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: radial-gradient(
        ellipse at center,
        rgba(161, 82, 60, 0.4) 0%,
        transparent 70%
    );
    z-index: -1;
    filter: blur(30px);
}
```

### Atmospheric Background Glow
```css
.section__glow {
    position: absolute;
    top: -10%;
    right: -5%;
    width: 900px;
    height: 900px;
    background: radial-gradient(
        circle,
        rgba(122, 19, 7, 0.5) 0%,
        rgba(78, 19, 13, 0.2) 40%,
        transparent 65%
    );
    pointer-events: none;
    z-index: 0;
}
```

---

## 6. Components

### CTA Button
```css
.cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 22px 52px;
    background: linear-gradient(135deg, var(--color-terracotta) 0%, #B86B55 100%);
    color: var(--color-caramelo);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(161, 82, 60, 0.4);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta:hover {
    background: #8A4530;
    transform: translateY(-2px);
}
```

### Stats Line
```css
.stats {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text-secondary);
}

.stats__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-terracotta);
    box-shadow: 0 0 8px rgba(161, 82, 60, 0.5);
}
```

### Flow Indicator
```css
.flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 20px;
    background: var(--color-bg-card);
    border: 1px solid rgba(248, 232, 216, 0.08);
    border-radius: 12px;
    transform: rotate(2deg);
    white-space: nowrap;
}

.flow__step {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-secondary);
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
}

.flow__arrow {
    color: var(--color-terracotta);
    font-weight: 700;
    font-size: 12px;
}
```

### Logo
```css
.logo {
    height: 72px;
    width: auto;
    margin-bottom: 44px;
}
```

---

## 7. Animation Guidelines

### Easing
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

### Fade In
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.element {
    opacity: 0;
    animation: fadeIn 0.8s var(--ease-out) forwards;
}
```

### Reveal Line (Headlines)
```css
.headline-line {
    display: block;
    overflow: hidden;
    padding-bottom: 0.15em;  /* Prevents descender clipping */
    margin-bottom: -0.15em;
}

.headline-line > span {
    display: block;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(105%);
    animation: revealLine 0.8s var(--ease-out) forwards;
}

/* Nested spans must stay inline */
.headline-line > span span {
    display: inline;
}

@keyframes revealLine {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Stagger Delays
```css
.headline-line:nth-child(1) span { animation-delay: 0.3s; }
.headline-line:nth-child(2) span { animation-delay: 0.42s; }
.headline-line:nth-child(3) span { animation-delay: 0.54s; }
.headline-line:nth-child(4) span { animation-delay: 0.66s; }
```

### Dashboard Slide In
```css
@keyframes dashboardIn {
    from {
        opacity: 0;
        transform: translateX(40px) rotate(2deg);
    }
    to {
        opacity: 1;
        transform: translateX(0) rotate(2deg);
    }
}
```

---

## 8. Responsive Breakpoints

```css
/* Large screens */
@media (max-width: 1200px) {
    .section__container { padding: 60px 48px; }
    .section__grid { gap: 60px; }
}

/* Tablets */
@media (max-width: 1024px) {
    .section__grid {
        grid-template-columns: 1fr;
        gap: 56px;
    }
    .card { max-width: 100%; }
}

/* Mobile */
@media (max-width: 768px) {
    .section__container { padding: 40px 28px; }
    .headline { font-size: 48px; }
    .cta { width: 100%; justify-content: center; }
}

/* Small Mobile */
@media (max-width: 480px) {
    .headline { font-size: 36px; }
    .card { padding: 24px; }
}
```

---

## 9. Accessibility

```css
/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
    }
}

/* Focus states */
.cta:focus-visible {
    outline: 2px solid var(--color-caramelo);
    outline-offset: 3px;
}
```

---

## 10. Content Hierarchy Pattern

Each section should follow this content flow:

1. **Logo/Brand Mark** (optional, mainly for hero)
2. **Headline** - Bold, impactful, uses weight contrast
3. **Subheadline** - Supporting statement, lighter
4. **Proof Points** - Stats, features, or social proof
5. **Closing Statement** - Confident, memorable line
6. **CTA** - Clear action

### Example Structure
```
[Logo]

Transformamos
seu Instagram
em uma máquina
de fazer dinheiro.

Sistema de vendas integrado. Do post ao PIX.

8 ingredientes · Um sistema · Zero pontas soltas

Não é mágica. É método.

[AGENDAR DIAGNÓSTICO →]
```

---

## 11. Lessons Learned (Pitfalls to Avoid)

### Headlines
- ❌ Don't start with light/weak words ("Seu Instagram em...")
- ✅ Start with strong, bold words ("Transformamos...")
- ❌ Don't let lines break mid-phrase
- ✅ Control line breaks intentionally with separate spans
- ❌ Don't forget `padding-bottom` on animated lines (clips descenders like 'g')
- ✅ Use `white-space: nowrap` on headline line spans
- ✅ Ensure nested spans (`.light`, `.accent`) have `display: inline`

### Visual Balance
- ❌ Don't let dashboard float too high
- ✅ Use `margin-top` to align with content vertically
- ❌ Don't make visual elements same width as text column
- ✅ Give content column more space (1.2fr vs 0.8fr)

### Cards/Dashboards
- ✅ Use subtle rotation (2deg) for dynamism
- ✅ Add glow effect behind for depth
- ✅ Keep dashboard + flow as unified visual unit (same width, same rotation)

### Colors
- ❌ Don't use generic colors (amber, orange)
- ✅ Always use brand palette (maroon, terracotta, cream)

---

## 12. Quick Start Template

```html
<section class="section">
    <div class="section__glow"></div>

    <div class="section__container">
        <div class="section__grid">

            <!-- Content Column -->
            <div class="section__content">
                <h2 class="section__headline">
                    <span class="headline-line"><span>Bold Text</span></span>
                    <span class="headline-line"><span><span class="light">Light text</span></span></span>
                    <span class="headline-line"><span><span class="accent">accent.</span></span></span>
                </h2>

                <p class="section__subheadline">
                    Supporting statement here.
                </p>

                <div class="section__stats">
                    <span>Point 1</span>
                    <span class="stats__dot"></span>
                    <span>Point 2</span>
                    <span class="stats__dot"></span>
                    <span>Point 3</span>
                </div>

                <p class="section__closing">Confident closing line.</p>

                <a href="#" class="cta">
                    Action Text
                    <span class="cta__arrow">→</span>
                </a>
            </div>

            <!-- Visual Column -->
            <div class="section__visual">
                <div class="card">
                    <!-- Card content -->
                </div>
                <div class="flow">
                    <!-- Flow steps -->
                </div>
            </div>

        </div>
    </div>
</section>
```

---

## Reference Files

- **Hero Section**: `/design-prototypes/doppio-hero-modern-artisan-v9.html`
- **Brand Fonts**: `/businesses/oitavo-cafe/fonts/`
- **Brand Logo**: `/businesses/oitavo-cafe/logos/marca-15.png`
- **Brand Guide**: `/businesses/oitavo-cafe/manual-de-marca/`

---

*Last updated after hero section v9 finalization*
