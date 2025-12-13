# Card Component

**Component Category:** Data Display
**Design System:** Oitavo Café Design System
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

Cards are versatile containers that group related information and actions. They're the workhorse of the Oitavo Café ROI Dashboard - showcasing metrics, client success stories, service offerings, and campaign performance. Cards make data digestible and actionable.

**Primary Use Cases:**
- ROI metric displays (the crown jewel)
- Client testimonial showcases
- Service/offer presentations
- Campaign performance summaries
- Content previews with actions

**Design Principle Alignment:**
Following "Data Dignity: Numbers Are Heroes," cards elevate metrics to prominence. The hover "lift" effect invites interaction, aligning with "Clarity Over Cleverness" through purposeful motion that guides attention.

---

## Anatomy

```
┌─────────────────────────────────────┐
│ ┌─────┐ Header Text          [•••] │ ← Header (optional)
│ └─────┘                             │   - Media/icon
│                                     │   - Title
│ ┌─────────────────────────────────┐ │   - Actions menu
│ │                                 │ │
│ │         Media Area              │ │ ← Media (optional)
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Content Area                        │ ← Content
│ Lorem ipsum dolor sit amet...       │   - Text
│                                     │   - Metrics
│ ┌─────────┐ ┌─────────┐            │   - Data
│ │ Action  │ │ Action  │            │
│ └─────────┘ └─────────┘            │ ← Footer (optional)
└─────────────────────────────────────┘   - Actions
                                          - Metadata
```

**Anatomy Parts:**
1. **Container** - Background, padding, border-radius, shadow
2. **Header** (optional) - Title, subtitle, avatar, action menu
3. **Media** (optional) - Image, illustration, chart
4. **Content** - Primary information, metrics, description
5. **Footer** (optional) - Actions, metadata, timestamps

---

## Variants

### 1. Metric Card
Displays key performance indicators and ROI data.

**Visual Characteristics:**
- Large, prominent number display
- Golden Amber accents for positive metrics
- Context label above metric
- Optional trend indicator (↗↘)
- Minimal padding to maximize metric visibility

**When to Use:**
- Dashboard KPIs
- ROI displays
- Revenue tracking
- Performance summaries

**Example:**
```
┌──────────────────────┐
│ Revenue This Month   │
│                      │
│   R$ 42.350          │ ← Large, bold
│   +23% ↗             │ ← Golden Amber badge
└──────────────────────┘
```

### 2. Testimonial Card
Showcases client success stories with photo and quote.

**Visual Characteristics:**
- Avatar/photo prominent
- Quote in larger font
- Client name and business
- Optional metric highlight
- Warm, trustworthy feel

**When to Use:**
- Social proof sections
- Case study previews
- Client success stories
- Trust-building content

**Example:**
```
┌────────────────────────────┐
│ ┌──────┐                   │
│ │Photo │ "ROI de 350% em   │
│ └──────┘  4 meses. Agora   │
│           vejo cada real   │
│           retornando."     │
│                            │
│ Carolina Silva             │
│ Clínica Estética           │
└────────────────────────────┘
```

### 3. Service/Offer Card
Presents services or products with clear value proposition.

**Visual Characteristics:**
- Icon or image at top
- Service name as title
- Brief description
- Clear CTA button
- Optional pricing or badge

**When to Use:**
- Service listings
- Product catalogs
- Pricing tiers
- Feature showcases

### 4. Campaign Card
Summarizes campaign performance and status.

**Visual Characteristics:**
- Campaign name and status badge
- Key metrics (impressions, clicks, conversions)
- Progress indicators
- Quick action buttons
- Date range metadata

**When to Use:**
- Campaign management dashboards
- Performance overviews
- Active project tracking

### 5. Content Card
Preview of blog posts, resources, or articles.

**Visual Characteristics:**
- Featured image
- Headline/title
- Excerpt or description
- Metadata (date, author, category)
- Read more link

**When to Use:**
- Blog listings
- Resource libraries
- News feeds
- Documentation portals

### 6. Interactive Card
Clickable entire card surface for navigation.

**Visual Characteristics:**
- Entire card is clickable
- Strong hover lift effect
- Cursor pointer on hover
- Focus state on entire container

**When to Use:**
- Navigation grids
- Portfolio items
- Product/service selection
- Category browsing

---

## Sizes

### Compact
- Padding: var(--space-4) - 16px
- Use: Dense dashboards, mobile views

### Default
- Padding: var(--space-5) - 24px
- Use: Standard layouts, desktop

### Comfortable
- Padding: var(--space-6) - 32px
- Use: Featured content, hero cards

---

## States

### Default
```css
background: var(--color-bg-primary); /* white */
border-radius: var(--radius-md);     /* 8px */
box-shadow: var(--shadow-sm);
transition: all var(--duration-base) var(--ease-gentle);
```

### Hover (for interactive cards)
```css
transform: translateY(-4px);
box-shadow: var(--shadow-lg);
cursor: pointer;
```

### Focus (for interactive cards)
```css
outline: 2px solid var(--primary-600);
outline-offset: 2px;
```

### Selected/Active
```css
border: 2px solid var(--primary-600);
box-shadow: var(--shadow-md);
```

### Loading
```css
background: var(--neutral-50);
animation: pulse 2s ease-in-out infinite;
pointer-events: none;
```

### Disabled
```css
opacity: 0.6;
cursor: not-allowed;
pointer-events: none;
```

---

## Color Specifications

### Default Card
```css
background: var(--color-bg-primary);  /* white */
border: 1px solid var(--neutral-200); /* optional subtle border */
box-shadow: var(--shadow-sm);
```

### Metric Card (ROI Highlight)
```css
/* For positive growth metrics */
border-top: 4px solid var(--accent-600); /* Golden Amber */

/* Or full accent background for hero metrics */
background: linear-gradient(135deg, var(--accent-50) 0%, white 100%);
```

### Testimonial Card
```css
background: var(--support-50);        /* #F8F4F2 - warm cream */
border-left: 4px solid var(--primary-600);
```

### Alert/Error Card
```css
background: var(--primary-50);
border-left: 4px solid var(--primary-700);
```

### Success Card
```css
background: var(--accent-50);
border-left: 4px solid var(--accent-600);
```

---

## Typography

### Card Title
- Font Size: var(--font-size-lg) - 18px
- Font Weight: 600 (semibold)
- Color: var(--neutral-800)
- Line Height: 1.4
- Margin Bottom: 8px

### Card Subtitle
- Font Size: var(--font-size-sm) - 14px
- Font Weight: 400 (regular)
- Color: var(--neutral-600)
- Line Height: 1.5

### Card Content
- Font Size: var(--font-size-base) - 16px
- Font Weight: 400 (regular)
- Color: var(--neutral-700)
- Line Height: 1.6

### Metric Display (Hero Numbers)
- Font Size: 48px - 72px (responsive)
- Font Weight: 700 (bold)
- Color: var(--accent-600) for growth, var(--neutral-800) for neutral
- Line Height: 1.1

---

## Spacing & Layout

**Card Padding:**
- Compact: 16px
- Default: 24px
- Comfortable: 32px

**Section Gaps (within card):**
- Between header and content: 16px
- Between content and footer: 20px
- Between content elements: 12px

**Card Grid Gaps:**
- Mobile: 16px
- Tablet: 20px
- Desktop: 24px

**Border Radius:**
- Default: var(--radius-md) - 8px
- Media (top corners only): 8px 8px 0 0

**Shadows:**
- Default: var(--shadow-sm)
- Hover: var(--shadow-lg)
- Selected: var(--shadow-md)

---

## Responsive Behavior

### Mobile (< 768px)
- Full width cards (single column)
- Compact padding (16px)
- Stack media above content
- Stack footer actions vertically
- Reduce metric font sizes (36-48px)

### Tablet (768px - 1024px)
- 2-column grid for smaller cards
- Default padding (24px)
- Can use horizontal card layout
- Metric font sizes (48-56px)

### Desktop (> 1024px)
- 3-4 column grids
- Comfortable padding for featured cards
- Full hover effects
- Large metric displays (64-72px)

**Responsive Grid Example:**
```css
.card-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

---

## Accessibility

### Semantic HTML

```html
<!-- Basic card -->
<article class="card">
  <header class="card__header">
    <h3 class="card__title">Revenue This Month</h3>
  </header>
  <div class="card__content">
    <p class="card__metric" aria-label="42,350 reais">R$ 42.350</p>
    <span class="badge badge--roi">+23% ↗</span>
  </div>
</article>

<!-- Interactive card (entire card clickable) -->
<a href="/campaign/details" class="card card--interactive">
  <article>
    <h3 class="card__title">Instagram Campaign Q4</h3>
    <p class="card__content">Performance summary...</p>
  </article>
</a>

<!-- Card with multiple actions -->
<article class="card">
  <header class="card__header">
    <h3 class="card__title">Campaign Name</h3>
    <button aria-label="Card options" class="card__menu">•••</button>
  </header>
  <div class="card__content">...</div>
  <footer class="card__footer">
    <button class="button button--primary">View Details</button>
    <button class="button button--secondary">Edit</button>
  </footer>
</article>
```

### ARIA Guidelines
- Use `<article>` for self-contained cards
- Card titles should use appropriate heading levels (h2, h3, h4)
- Interactive cards: Entire card should be wrapped in `<a>` or have `role="button"`
- Metrics: Use `aria-label` for screen-readable format ("42,350 reais")
- Loading state: `aria-busy="true"` and `aria-live="polite"`
- Card actions: Each button needs descriptive label

### Keyboard Interaction
- Tab: Move focus to next interactive element
- Enter/Space: Activate interactive card or focused action
- Escape: Close card menu/modal if open
- Arrow keys: Navigate between cards in a grid (optional enhancement)

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Metric text on backgrounds: Test contrast
- Focus indicators: 3:1 contrast with background
- Don't rely on color alone for status (use icons/text)

### Screen Reader Considerations
- Announce card purpose clearly in heading
- For metric cards: Include units and context ("Revenue this month: 42,350 reais, up 23%")
- Group related cards in `<section>` with heading
- Announce state changes for loading/error states

---

## Do's and Don'ts

### Do

- **Do** make numbers heroic in metric cards - large, bold, prominent
- **Do** add hover lift effect to invite interaction
- **Do** pair every number with context ("R$42k in sales" not "42k")
- **Do** use Golden Amber for ROI/growth highlights sparingly
- **Do** maintain consistent card heights in grids
- **Do** provide clear actions in footer
- **Do** use appropriate heading hierarchy
- **Do** include loading states for async content

### Don't

- **Don't** cram too much content - edit aggressively
- **Don't** use tiny fonts for important metrics
- **Don't** forget hover states on interactive cards
- **Don't** make entire card clickable AND have multiple actions (confusing)
- **Don't** use low-quality images
- **Don't** exceed 10% Golden Amber coverage (60-30-10 rule)
- **Don't** create cards without clear purpose
- **Don't** forget mobile optimization

### Brand-Specific Guidance

**Carolina's ROI Dashboard:**
- Metric cards are the stars - make them prominent
- Always show currency symbols (R$, €)
- Use Golden Amber borders/accents for positive growth
- Include trend indicators (↗↘) for metrics
- "Lift" animation on hover makes Carolina want to click
- Testimonial cards build trust - use real photos and names
- Every metric needs context - "This Month", "Last 30 Days", etc.

**Metric Card Best Practice:**
```
┌──────────────────────────┐
│ Revenue This Month       │ ← Context label
│                          │
│   R$ 42.350              │ ← Hero number (large)
│   ┌──────────────┐       │
│   │ +23% ↗       │       │ ← Golden Amber badge
│   └──────────────┘       │
│                          │
│ vs. R$ 34.431 last month │ ← Comparison context
└──────────────────────────┘
```

---

## Code Examples

### Basic Card

```html
<article class="card">
  <header class="card__header">
    <h3 class="card__title">Card Title</h3>
    <p class="card__subtitle">Supporting text</p>
  </header>
  <div class="card__content">
    <p>Card content goes here...</p>
  </div>
  <footer class="card__footer">
    <button class="button button--primary">Action</button>
  </footer>
</article>
```

```css
.card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-5);
  transition: all var(--duration-base) var(--ease-gentle);
}

.card__header {
  margin-bottom: 16px;
}

.card__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--neutral-800);
  margin: 0 0 4px 0;
}

.card__subtitle {
  font-size: var(--font-size-sm);
  color: var(--neutral-600);
  margin: 0;
}

.card__content {
  margin-bottom: 20px;
}

.card__footer {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--neutral-200);
}
```

### Metric Card (ROI Highlight)

```html
<article class="card card--metric">
  <div class="card__metric-label">Revenue This Month</div>
  <div class="card__metric-value" aria-label="42,350 reais">
    R$ 42.350
  </div>
  <div class="card__metric-trend">
    <span class="badge badge--roi">+23% ↗</span>
  </div>
  <div class="card__metric-context">
    vs. R$ 34.431 last month
  </div>
</article>
```

```css
.card--metric {
  border-top: 4px solid var(--accent-600);
  text-align: center;
  padding: 24px;
}

.card__metric-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--neutral-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.card__metric-value {
  font-size: 56px;
  font-weight: 700;
  color: var(--neutral-800);
  line-height: 1.1;
  margin-bottom: 12px;
}

.card--metric[data-trend="positive"] .card__metric-value {
  color: var(--accent-600);
}

.card__metric-trend {
  margin-bottom: 8px;
}

.card__metric-context {
  font-size: var(--font-size-sm);
  color: var(--neutral-600);
}

@media (max-width: 768px) {
  .card__metric-value {
    font-size: 36px;
  }
}
```

### Testimonial Card

```html
<article class="card card--testimonial">
  <div class="card__testimonial-content">
    <img class="avatar avatar--lg" src="/carolina.jpg" alt="Carolina Silva" />
    <blockquote class="card__quote">
      "ROI de 350% em 4 meses. Agora vejo cada real retornando. Não é achismo, é número."
    </blockquote>
  </div>
  <footer class="card__testimonial-footer">
    <div class="card__author">Carolina Silva</div>
    <div class="card__author-role">Clínica Estética - São Paulo</div>
  </footer>
</article>
```

```css
.card--testimonial {
  background: var(--support-50);
  border-left: 4px solid var(--primary-600);
}

.card__testimonial-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.card__quote {
  font-size: var(--font-size-lg);
  line-height: 1.6;
  color: var(--neutral-800);
  font-style: italic;
  margin: 0;
  text-align: center;
}

.card__quote::before {
  content: '"';
  font-size: 48px;
  color: var(--primary-400);
  line-height: 0;
  vertical-align: -0.4em;
}

.card__testimonial-footer {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid var(--neutral-300);
}

.card__author {
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 4px;
}

.card__author-role {
  font-size: var(--font-size-sm);
  color: var(--neutral-600);
}
```

### Interactive Card (Hover Lift)

```html
<a href="/campaign/details" class="card card--interactive">
  <article>
    <header class="card__header">
      <h3 class="card__title">Instagram Campaign Q4</h3>
      <span class="badge badge--success">Active</span>
    </header>
    <div class="card__content">
      <p>Performance summary and key metrics...</p>
    </div>
    <div class="card__meta">
      <span>Started: Dec 1, 2024</span>
    </div>
  </article>
</a>
```

```css
.card--interactive {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.card--interactive:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card--interactive:focus-visible {
  outline: 2px solid var(--primary-600);
  outline-offset: 2px;
}

.card--interactive:active {
  transform: translateY(-2px);
}
```

### Card with Media

```html
<article class="card card--media">
  <div class="card__media">
    <img src="/campaign-banner.jpg" alt="Campaign visual" loading="lazy" />
  </div>
  <div class="card__body">
    <h3 class="card__title">Campaign Name</h3>
    <p class="card__content">Description of the campaign...</p>
    <footer class="card__footer">
      <button class="button button--primary">View Details</button>
    </footer>
  </div>
</article>
```

```css
.card--media {
  padding: 0;
  overflow: hidden;
}

.card__media {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--neutral-100);
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-base) var(--ease-gentle);
}

.card--interactive:hover .card__media img {
  transform: scale(1.05);
}

.card__body {
  padding: var(--space-5);
}
```

### Card Grid

```html
<section class="card-grid">
  <article class="card">...</article>
  <article class="card">...</article>
  <article class="card">...</article>
  <article class="card">...</article>
</section>
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* Equal height cards */
.card-grid .card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-grid .card__content {
  flex: 1;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

---

## React/Component Example

```jsx
// Card.jsx
const Card = ({
  children,
  variant = 'default',
  interactive = false,
  hover = true,
  padding = 'default',
  className = '',
  href,
  onClick,
  ...props
}) => {
  const cardClasses = `
    card
    card--${variant}
    card--padding-${padding}
    ${interactive ? 'card--interactive' : ''}
    ${hover ? 'card--hover' : ''}
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} className={cardClasses} {...props}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button className={cardClasses} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }

  return (
    <article className={cardClasses} {...props}>
      {children}
    </article>
  );
};

// CardHeader.jsx
const CardHeader = ({ title, subtitle, action, children }) => (
  <header className="card__header">
    <div className="card__header-content">
      {title && <h3 className="card__title">{title}</h3>}
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
      {children}
    </div>
    {action && <div className="card__header-action">{action}</div>}
  </header>
);

// CardContent.jsx
const CardContent = ({ children, className = '' }) => (
  <div className={`card__content ${className}`}>
    {children}
  </div>
);

// CardFooter.jsx
const CardFooter = ({ children, className = '' }) => (
  <footer className={`card__footer ${className}`}>
    {children}
  </footer>
);

// MetricCard.jsx
const MetricCard = ({ label, value, trend, context, unit = '' }) => (
  <Card variant="metric">
    <div className="card__metric-label">{label}</div>
    <div className="card__metric-value" aria-label={`${value} ${unit}`}>
      {unit && <span className="card__metric-unit">{unit}</span>}
      {value.toLocaleString('pt-BR')}
    </div>
    {trend && (
      <div className="card__metric-trend">
        <span className={`badge badge--${trend.type}`}>
          {trend.value > 0 ? '+' : ''}{trend.value}% {trend.value > 0 ? '↗' : '↘'}
        </span>
      </div>
    )}
    {context && (
      <div className="card__metric-context">{context}</div>
    )}
  </Card>
);

// Usage
<Card interactive hover href="/campaign/1">
  <CardHeader
    title="Instagram Campaign Q4"
    subtitle="Active since Dec 1"
    action={<Badge variant="success">Active</Badge>}
  />
  <CardContent>
    <p>Performance metrics and summary...</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">View Details</Button>
  </CardFooter>
</Card>

<MetricCard
  label="Revenue This Month"
  value={42350}
  unit="R$"
  trend={{ type: 'roi', value: 23 }}
  context="vs. R$ 34.431 last month"
/>
```

---

## Design Tokens Reference

```css
/* Card-specific tokens */
:root {
  /* Padding */
  --card-padding-compact: var(--space-4);  /* 16px */
  --card-padding-default: var(--space-5);  /* 24px */
  --card-padding-comfortable: var(--space-6); /* 32px */

  /* Border */
  --card-border-radius: var(--radius-md);  /* 8px */
  --card-border-width: 1px;
  --card-border-color: var(--neutral-200);

  /* Shadow */
  --card-shadow: var(--shadow-sm);
  --card-shadow-hover: var(--shadow-lg);

  /* Transition */
  --card-transition: all var(--duration-base) var(--ease-gentle);

  /* Hover lift */
  --card-hover-lift: -4px;

  /* Spacing */
  --card-header-gap: 16px;
  --card-content-gap: 20px;
  --card-footer-gap: 12px;
}
```

---

## Related Components

- **Badge** - Status and metrics within cards
- **Button** - Actions in card footers
- **Avatar** - User representation in testimonials
- **Tag** - Categorization within cards

---

## References

- Design Principle: "Data Dignity: Numbers Are Heroes"
- Interaction: Hover lift invites engagement
- ROI Dashboard: Crown jewel of the system
- 60-30-10 Rule: Use Golden Amber sparingly for impact
- Carolina's Journey: Make her proud with metric displays

---

*Generated for Oitavo Café Design System - Where cards tell success stories*
