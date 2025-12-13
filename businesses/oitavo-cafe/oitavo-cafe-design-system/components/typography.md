# Typography

## Overview

The Typography component provides consistent text styling across the Oitavo Café Design System. It handles all text elements from headings to body copy, ensuring visual hierarchy and brand consistency. Use Typography for any textual content to maintain the Major Third (1.25) modular scale and ensure accessibility.

**When to use:**
- All headings (H1-H6)
- Body paragraphs and text blocks
- Labels, captions, and supporting text
- Any text that needs semantic meaning

## Anatomy

```
┌─────────────────────────────────────┐
│ [as]                                │ ← Semantic HTML element
│   [variant]                         │ ← Visual style (h1, h2, body, etc.)
│     [size]                          │ ← Optional size override
│       [weight]                      │ ← Optional weight override
│         [color]                     │ ← Optional color override
│           [align]                   │ ← Text alignment
│             {children}              │ ← Text content
└─────────────────────────────────────┘
```

## Variants

| Variant | Use Case | Visual Difference |
|---------|----------|-------------------|
| `h1` | Page titles, hero headings | 3.052rem (48.8px), bold, Coffee Maroon |
| `h2` | Section headings | 2.441rem (39px), bold, Coffee Marron |
| `h3` | Subsection headings | 1.953rem (31.2px), semibold, Coffee Maroon |
| `h4` | Card titles, grouped content | 1.563rem (25px), semibold, Coffee Maroon |
| `h5` | Small headings | 1.25rem (20px), semibold, neutral-900 |
| `h6` | Minimal headings | 1rem (16px), semibold, neutral-900 |
| `body-lg` | Emphasized body text | 1.25rem (20px), regular, neutral-800 |
| `body` | Default paragraph text | 1rem (16px), regular, neutral-800 |
| `body-sm` | Secondary information | 0.875rem (14px), regular, neutral-700 |
| `label` | Form labels, UI labels | 0.875rem (14px), medium, neutral-900 |
| `caption` | Image captions, footnotes | 0.75rem (12px), regular, neutral-600 |
| `overline` | Eyebrow text, category tags | 0.75rem (12px), semibold, uppercase, letter-spacing: 0.08em |

## Sizes

| Size | Font Size | Line Height | Use Case |
|------|-----------|-------------|----------|
| `xs` | var(--font-size-xs) | var(--line-height-tight) | Captions, fine print |
| `sm` | var(--font-size-sm) | var(--line-height-snug) | Small body text, labels |
| `md` | var(--font-size-md) | var(--line-height-normal) | Default body text |
| `lg` | var(--font-size-lg) | var(--line-height-normal) | Large body text |
| `xl` | var(--font-size-xl) | var(--line-height-snug) | Small headings |
| `2xl` | var(--font-size-2xl) | var(--line-height-tight) | Medium headings |
| `3xl` | var(--font-size-3xl) | var(--line-height-tight) | Large headings |
| `4xl` | var(--font-size-4xl) | var(--line-height-tight) | Hero headings |

## Props/API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'p' \| 'span' \| 'label' \| 'div'` | `'p'` | HTML element to render |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body-lg' \| 'body' \| 'body-sm' \| 'label' \| 'caption' \| 'overline'` | `'body'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | - | Override font size |
| `weight` | `'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold'` | - | Override font weight |
| `color` | `string` | - | Override text color (use semantic tokens) |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment |
| `truncate` | `boolean` | `false` | Truncate with ellipsis |
| `lineClamp` | `number` | - | Clamp to specific number of lines |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Text content |

## Accessibility

**ARIA Attributes:**
- Semantic HTML elements (`h1-h6`, `p`, `label`) provide inherent accessibility
- Use `aria-label` when visual text doesn't describe purpose
- Use `role="heading" aria-level="X"` when semantic element doesn't match visual style

**Screen Reader Behavior:**
- Headings create document outline for navigation
- Screen readers announce heading levels
- Proper heading hierarchy (don't skip levels)
- Text color must meet WCAG AA contrast ratios (4.5:1 for body, 3:1 for headings)

**Best Practices:**
- Don't use headings for styling alone
- Keep heading hierarchy logical (H1 → H2 → H3, not H1 → H4)
- Ensure sufficient contrast (all defaults meet WCAG AA)

## Usage Guidelines

### Do

- Use semantic HTML that matches content structure (H1 for page title, P for paragraphs)
- Maintain heading hierarchy for accessibility
- Use design tokens for all typography properties
- Choose variants based on content hierarchy, not visual preference
- Use `body` variant for most paragraph text
- Apply `label` variant to form labels and UI text
- Use `overline` for category tags and eyebrow text
- Ensure text color meets contrast requirements

### Don't

- Don't skip heading levels (H1 → H3) even if visual size is desired
- Don't hardcode font sizes or colors
- Don't use multiple H1s on a page (use `variant="h1"` with `as="h2"` if needed)
- Don't use headings just for bold text
- Don't use `body-sm` for critical information
- Don't override colors without checking contrast ratios
- Don't use `truncate` on essential content

## Code Example

### HTML (Semantic Structure)

```html
<!-- Page title -->
<h1 class="typography typography--h1">
  Elevate Your Business with Oitavo Café
</h1>

<!-- Section heading -->
<h2 class="typography typography--h2">
  Our Services
</h2>

<!-- Subsection heading -->
<h3 class="typography typography--h3">
  Strategic Consulting
</h3>

<!-- Body text -->
<p class="typography typography--body">
  We partner with business owners to transform their operations and drive measurable ROI
  through strategic consulting and hands-on implementation.
</p>

<!-- Small supporting text -->
<p class="typography typography--body-sm">
  Results typically visible within 90 days.
</p>

<!-- Label -->
<label class="typography typography--label" for="email">
  Email Address
</label>

<!-- Caption -->
<span class="typography typography--caption">
  Photo by John Doe, 2024
</span>

<!-- Overline/Eyebrow -->
<span class="typography typography--overline">
  Case Study
</span>

<!-- Visual style different from semantic meaning -->
<h2 class="typography typography--h4">
  Card Title (H2 but looks like H4)
</h2>
```

### CSS (Component Styles)

```css
/* Base Typography Component */
.typography {
  font-family: var(--font-family-sans);
  margin: 0;
  padding: 0;
}

/* Heading Variants */
.typography--h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-brand-primary);
  letter-spacing: -0.02em;
}

.typography--h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-brand-primary);
  letter-spacing: -0.01em;
}

.typography--h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-brand-primary);
}

.typography--h4 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
  color: var(--color-brand-primary);
}

.typography--h5 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
  color: var(--color-neutral-900);
}

.typography--h6 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-900);
}

/* Body Variants */
.typography--body-lg {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  color: var(--color-neutral-800);
}

.typography--body {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  color: var(--color-neutral-800);
}

.typography--body-sm {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-700);
}

/* Label Variant */
.typography--label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
  color: var(--color-neutral-900);
  display: block;
}

/* Caption Variant */
.typography--caption {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-600);
}

/* Overline Variant */
.typography--overline {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-neutral-700);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Alignment Modifiers */
.typography--align-left {
  text-align: left;
}

.typography--align-center {
  text-align: center;
}

.typography--align-right {
  text-align: right;
}

.typography--align-justify {
  text-align: justify;
}

/* Truncate Modifier */
.typography--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Line Clamp Modifier */
.typography--line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.typography--line-clamp-2 {
  -webkit-line-clamp: 2;
}

.typography--line-clamp-3 {
  -webkit-line-clamp: 3;
}

.typography--line-clamp-4 {
  -webkit-line-clamp: 4;
}

/* Responsive Typography (Mobile-First) */
@media (max-width: 768px) {
  .typography--h1 {
    font-size: var(--font-size-3xl);
  }

  .typography--h2 {
    font-size: var(--font-size-2xl);
  }

  .typography--h3 {
    font-size: var(--font-size-xl);
  }
}
```

### React Component Example

```tsx
import React from 'react';

interface TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'div';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body' | 'body-sm' | 'label' | 'caption' | 'overline';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  lineClamp?: number;
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  as: Component = 'p',
  variant = 'body',
  align = 'left',
  truncate = false,
  lineClamp,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'typography',
    `typography--${variant}`,
    align !== 'left' && `typography--align-${align}`,
    truncate && 'typography--truncate',
    lineClamp && `typography--line-clamp typography--line-clamp-${lineClamp}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
```

### Usage Examples

```tsx
// Hero section
<Typography as="h1" variant="h1" align="center">
  Transform Your Business
</Typography>

// Visual H4 but semantic H2
<Typography as="h2" variant="h4">
  Our Approach
</Typography>

// Truncated text
<Typography variant="body" truncate>
  This is a very long description that will be truncated...
</Typography>

// Line clamping
<Typography variant="body" lineClamp={3}>
  This text will show a maximum of three lines before being cut off
  with an ellipsis at the end.
</Typography>

// Form label
<Typography as="label" variant="label" htmlFor="name">
  Full Name
</Typography>

// Caption with custom color
<Typography variant="caption" color="var(--color-neutral-500)">
  Last updated: December 2024
</Typography>
```
