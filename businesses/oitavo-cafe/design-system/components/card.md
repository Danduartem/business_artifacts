# Card

## Overview
Cards are versatile containers for grouping related content and actions in the Oitavo Café Design System. They serve as the foundation of content organization, helping users scan and digest information efficiently. Use cards for blog posts, products, features, team members, case studies, and other cohesive content blocks.

## Anatomy

```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │
│  │        Image (16:9 or 4:3)        │  │ ← Header Image
│  └───────────────────────────────────┘  │   (optional)
│                                          │
│  Card Title                              │ ← Header
│  ─────────────                           │
│                                          │
│  Body text goes here with details       │ ← Body
│  about the content. Line height 1.6     │
│  for readability.                        │
│                                          │
│  ──────────────────────────────────────  │
│  Footer content  |  [Action Button]     │ ← Footer
└─────────────────────────────────────────┘   (optional)
        ↑                    ↑
    Container            Content Areas
  (border, shadow,        (header, body,
   padding, radius)           footer)
```

**Component Parts:**
- **Container**: Background, border, padding, shadow, border radius
- **Header**: Optional title and metadata section
- **Image**: Optional visual content (top or inline)
- **Body**: Main content area with text and supporting elements
- **Footer**: Optional actions and metadata (buttons, links, tags)

## Variants

| Variant | Use Case | Key Differences |
|---------|----------|-----------------|
| Basic | Standard content cards | Subtle border, minimal shadow, 8px radius |
| Elevated | Featured or important content | No border, stronger shadow, 12px radius, more prominent |
| Interactive | Clickable cards (entire card is link) | Cursor pointer, hover effects, transition animations |
| Tinted | Highlighted or categorized content | Warm cream background, subtle border, softer appearance |

## Sizes (Padding)

| Size | Padding | Use Case | Token Reference |
|------|---------|----------|-----------------|
| compact | 16px | Dense layouts, mobile cards | var(--spacing-4) |
| default | 24px | Standard content cards | var(--spacing-5) |
| comfortable | 32px | Featured content, hero cards | var(--spacing-6) |

**Note:** Default (24px) is recommended for most use cases.

## States

### Basic Variant

| State | Background | Border | Shadow |
|-------|------------|--------|--------|
| default | var(--color-white) | 1px solid var(--color-neutral-200) | 0 1px 3px rgba(43,37,35,0.08) |

### Elevated Variant

| State | Background | Border | Shadow |
|-------|------------|--------|--------|
| default | var(--color-white) | none | 0 4px 12px rgba(43,37,35,0.12) |

### Interactive Variant

| State | Background | Border | Shadow | Transform |
|-------|------------|--------|--------|-----------|
| default | var(--color-white) | 2px solid var(--color-neutral-200) | 0 1px 3px rgba(43,37,35,0.08) | none |
| hover | var(--color-white) | 2px solid var(--color-primary-600) | 0 6px 16px rgba(43,37,35,0.15) | translateY(-2px) |
| active | var(--color-white) | 2px solid var(--color-primary-700) | 0 2px 8px rgba(43,37,35,0.1) | translateY(0) |
| focus | var(--color-white) | 2px solid var(--color-primary-600) | 0 1px 3px rgba(43,37,35,0.08) | none |
| selected | var(--color-accent-50) | 2px solid var(--color-accent-600) | 0 4px 12px rgba(43,37,35,0.12) | none |

### Tinted Variant

| State | Background | Border | Shadow |
|-------|------------|--------|--------|
| default | var(--color-support-cream-100) | 1px solid var(--color-neutral-200) | none |

## Content Structure Specifications

### Header

```css
.card-header {
  margin-bottom: 16px;
}

.card-title {
  font-size: var(--font-size-md); /* 20px */
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-800);
  line-height: var(--line-height-snug);
  margin: 0 0 8px 0;
}

.card-subtitle {
  font-size: var(--font-size-sm); /* 13px */
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-600);
  line-height: var(--line-height-normal);
}
```

### Body

```css
.card-body {
  font-size: var(--font-size-base); /* 16px */
  line-height: 1.6;
  color: var(--color-neutral-700);
  margin-bottom: 16px;
}
```

### Footer

```css
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--color-neutral-200);
}
```

### Image

```css
.card-image {
  aspect-ratio: 16 / 9; /* or 4 / 3 */
  width: 100%;
  object-fit: cover;
  margin-bottom: 16px;
}

/* Image at top of card */
.card-image-top {
  border-radius: 8px 8px 0 0;
  margin: -24px -24px 16px -24px; /* Bleed to edges */
}

/* Image inside card */
.card-image-inline {
  border-radius: 6px;
}
```

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'basic' \| 'elevated' \| 'interactive' \| 'tinted' | 'basic' | Card visual style |
| padding | 'compact' \| 'default' \| 'comfortable' | 'default' | Internal padding size |
| interactive | boolean | false | Makes entire card clickable |
| selected | boolean | false | Shows selected state |
| href | string | - | Link destination (makes card a link) |
| onClick | function | - | Click handler for interactive cards |
| header | ReactNode | - | Card header content |
| footer | ReactNode | - | Card footer content |
| image | string | - | Image URL for card image |
| imagePosition | 'top' \| 'inline' | 'top' | Image position in card |
| aspectRatio | '16/9' \| '4/3' \| '1/1' | '16/9' | Image aspect ratio |
| children | ReactNode | - | Card body content |

## Accessibility

### Interactive Cards

When entire card is clickable:
- Use `<a>` element with href for navigation
- Use `<button>` element for actions
- Add tabindex="0" if using `<div>` (not recommended)
- Include visible focus indicator
- Ensure 48px minimum touch target height
- Use aria-label if card content isn't clear from heading

### Keyboard Navigation
| Key | Action |
|-----|--------|
| Tab | Move focus to card (if interactive) |
| Enter / Space | Activate card link or action |

### ARIA Attributes
- **role**: Use semantic HTML (`<article>` for content, `<div>` for UI)
- **aria-label**: Provide if card purpose isn't clear from visible heading
- **aria-describedby**: Associate additional context if needed
- **aria-selected**: Set to `"true"` for selected cards in a set

### Best Practices
- Use `<article>` for independent content (blog posts, products)
- Use `<div>` for UI components (feature cards, stat cards)
- Always include heading in header (h2, h3, etc.)
- Don't nest interactive elements (button inside clickable card)
- Provide clear focus indicators for interactive cards
- Ensure sufficient color contrast (4.5:1 minimum)

## Spacing Guidelines

### Card Grid Layouts

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px; /* var(--spacing-5) */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### Internal Spacing

- Header margin-bottom: 16px
- Body margin-bottom: 16px
- Footer padding-top: 16px
- Image margin-bottom: 16px
- Gap between elements: 12-16px

## Usage Guidelines

### ✅ Do
- Use consistent card heights in grid layouts (creates visual rhythm)
- Limit actions to 1-2 buttons per card (prevents decision paralysis)
- Use aspect ratio containers for images (prevents layout shift)
- Make entire card clickable for single-action cards (larger target)
- Include descriptive headings in all cards
- Use semantic HTML (article, section, div appropriately)
- Maintain consistent padding across similar cards
- Use elevation sparingly (2 levels max on a page)

### ❌ Don't
- Don't make entire card clickable if it has multiple actions (confusing)
- Don't nest cards inside cards (creates visual confusion)
- Don't use more than 2 shadow levels on a page (flattens hierarchy)
- Don't mix card variants randomly (inconsistent experience)
- Don't create cards without clear purpose or grouping
- Don't use cards for single lines of text (overkill)
- Don't forget focus indicators on interactive cards
- Don't nest interactive elements in clickable cards

## Code Examples

### HTML

```html
<!-- Basic Card -->
<article class="card card-basic">
  <header class="card-header">
    <h3 class="card-title">ROI Calculator</h3>
    <p class="card-subtitle">Marketing Tools</p>
  </header>
  <div class="card-body">
    <p>Calculate your return on investment with our data-driven tool. Get instant insights into your marketing performance.</p>
  </div>
  <footer class="card-footer">
    <span class="card-meta">5 min read</span>
    <a href="/tools/roi-calculator" class="btn btn-secondary btn-sm">
      Try Now
    </a>
  </footer>
</article>

<!-- Elevated Card with Image -->
<article class="card card-elevated">
  <img
    src="/images/case-study.jpg"
    alt="Case study preview"
    class="card-image card-image-top"
    loading="lazy"
  />
  <header class="card-header">
    <h3 class="card-title">How We Grew Revenue by 300%</h3>
  </header>
  <div class="card-body">
    <p>Discover the growth marketing strategies that tripled our client's revenue in just 6 months.</p>
  </div>
  <footer class="card-footer">
    <span class="card-meta">Case Study</span>
    <a href="/case-studies/revenue-growth" class="link link-standalone">
      Read More →
    </a>
  </footer>
</article>

<!-- Interactive Card (Entire card is clickable) -->
<a href="/services/growth-marketing" class="card card-interactive" aria-label="Learn about our Growth Marketing service">
  <header class="card-header">
    <h3 class="card-title">Growth Marketing</h3>
  </header>
  <div class="card-body">
    <p>Data-driven strategies to accelerate your business growth and maximize ROI.</p>
  </div>
  <footer class="card-footer">
    <span class="card-meta">Learn More →</span>
  </footer>
</a>

<!-- Tinted Card -->
<div class="card card-tinted">
  <header class="card-header">
    <h3 class="card-title">Quick Tip</h3>
  </header>
  <div class="card-body">
    <p>Use A/B testing to validate your hypotheses before scaling campaigns.</p>
  </div>
</div>

<!-- Card Grid Layout -->
<div class="card-grid">
  <article class="card card-basic">...</article>
  <article class="card card-basic">...</article>
  <article class="card card-basic">...</article>
</div>
```

### CSS

```css
/* Card Base */
.card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-5); /* 24px default */
  transition: all var(--duration-base) var(--easing-ease-out);
}

/* Basic Variant */
.card-basic {
  border: 1px solid var(--color-neutral-200);
  box-shadow: 0 1px 3px rgba(43, 37, 35, 0.08);
}

/* Elevated Variant */
.card-elevated {
  border: none;
  border-radius: var(--border-radius-lg); /* 12px */
  box-shadow: 0 4px 12px rgba(43, 37, 35, 0.12);
}

/* Interactive Variant */
.card-interactive {
  border: 2px solid var(--color-neutral-200);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.card-interactive:hover {
  border-color: var(--color-primary-600);
  box-shadow: 0 6px 16px rgba(43, 37, 35, 0.15);
  transform: translateY(-2px);
}

.card-interactive:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(43, 37, 35, 0.1);
}

.card-interactive:focus-visible {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}

/* Tinted Variant */
.card-tinted {
  background: var(--color-support-cream-100);
  border: 1px solid var(--color-neutral-200);
  box-shadow: none;
}

/* Selected State */
.card-selected {
  background: var(--color-accent-50);
  border: 2px solid var(--color-accent-600);
  box-shadow: 0 4px 12px rgba(43, 37, 35, 0.12);
}

/* Padding Sizes */
.card-compact {
  padding: var(--spacing-4); /* 16px */
}

.card-comfortable {
  padding: var(--spacing-6); /* 32px */
}

/* Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-5);
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
}
```

### React Component Example

```jsx
import React from 'react';
import './Card.css';

export const Card = ({
  variant = 'basic',
  padding = 'default',
  interactive = false,
  selected = false,
  href,
  onClick,
  header,
  footer,
  image,
  imagePosition = 'top',
  aspectRatio = '16/9',
  children,
  ...props
}) => {
  const classNames = [
    'card',
    `card-${variant}`,
    padding !== 'default' && `card-${padding}`,
    interactive && 'card-interactive',
    selected && 'card-selected',
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {image && (
        <img
          src={image}
          alt=""
          className={`card-image card-image-${imagePosition}`}
          style={{ aspectRatio }}
          loading="lazy"
        />
      )}
      {header && <header className="card-header">{header}</header>}
      <div className="card-body">{children}</div>
      {footer && <footer className="card-footer">{footer}</footer>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {content}
      </a>
    );
  }

  if (interactive || onClick) {
    return (
      <div
        className={classNames}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e);
          }
        }}
        tabIndex={0}
        role="button"
        {...props}
      >
        {content}
      </div>
    );
  }

  return (
    <article className={classNames} {...props}>
      {content}
    </article>
  );
};

// Usage Examples:
// <Card variant="basic" header={<h3>Title</h3>} footer={<Button>Action</Button>}>Content</Card>
// <Card variant="elevated" image="/image.jpg">Content</Card>
// <Card variant="interactive" href="/details">Clickable Content</Card>
```

## Related Components
- **Button** - Cards often contain action buttons
- **Link** - For navigation within card content
- **Badge** - Status indicators in card headers
- **Image** - Visual content in cards
- **Grid** - Layout system for card collections
