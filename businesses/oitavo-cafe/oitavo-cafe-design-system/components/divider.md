# Divider

## Overview

The Divider component provides visual separation between content sections or UI elements. It creates clear boundaries and improves content hierarchy by grouping related information. Dividers are subtle yet effective tools for organizing layouts without adding visual weight.

**When to use:**
- Separate sections of content
- Group related items in lists
- Create visual breaks in forms
- Divide navigation items
- Separate header/footer from main content

## Anatomy

```
Horizontal Divider:
┌───────────────────────────────────────┐
│ Content above                         │
├───────────────────────────────────────┤ ← Divider (1px line)
│ Content below                         │
└───────────────────────────────────────┘

Vertical Divider:
┌────────┬───┬────────┐
│ Left   │ │ │ Right  │
│ Content│ │ │ Content│
│        │ │ │        │
└────────┴───┴────────┘
           ↑
        Divider

With Label:
┌───────────────────────────────────────┐
│ Content above                         │
├─────────────  Label  ─────────────────┤
│ Content below                         │
└───────────────────────────────────────┘

Parts:
- Line: The visual separator (border)
- Spacing: Margin above/below (or left/right for vertical)
- Label (optional): Text centered on the divider
```

## Variants

| Variant | Use Case | Visual Difference |
|---------|----------|-------------------|
| `solid` | Default separation | Solid line, neutral-300 |
| `dashed` | Less prominent division | Dashed border style |
| `dotted` | Subtle, informal separation | Dotted border style |
| `gradient` | Premium sections, feature highlights | Gradient from transparent → color → transparent |
| `labeled` | Section transitions with context | Text label centered on divider |

## Sizes

| Size | Thickness | Spacing | Use Case |
|------|-----------|---------|----------|
| `thin` | 1px | var(--space-2) (8px) | Subtle separation, tight layouts |
| `base` | 1px | var(--space-4) (16px) | Default, most use cases |
| `thick` | 2px | var(--space-6) (24px) | Strong visual break |
| `section` | 1px | var(--space-8) (32px) | Major section divisions |

## Props/API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider direction |
| `variant` | `'solid' \| 'dashed' \| 'dotted' \| 'gradient'` | `'solid'` | Visual style |
| `size` | `'thin' \| 'base' \| 'thick' \| 'section'` | `'base'` | Spacing and thickness |
| `color` | `string` | `var(--color-neutral-300)` | Divider color (use semantic tokens) |
| `label` | `string` | - | Optional centered label |
| `labelPosition` | `'left' \| 'center' \| 'right'` | `'center'` | Label alignment (horizontal only) |
| `className` | `string` | - | Additional CSS classes |

## Accessibility

**ARIA Attributes:**
- Use `role="separator"` for semantic dividers
- Use `aria-orientation="horizontal"` or `aria-orientation="vertical"` to indicate direction
- For decorative dividers, use `role="presentation"` or `aria-hidden="true"`

**Screen Reader Behavior:**
- Semantic separators are announced as "separator"
- Labeled dividers announce the label text
- Decorative dividers are hidden from screen readers

**Best Practices:**
- Most dividers are decorative and should use `role="presentation"`
- Use semantic `role="separator"` when the division is meaningful to content structure
- Ensure sufficient color contrast if divider conveys meaning

## Usage Guidelines

### Do

- Use dividers to improve content hierarchy and scannability
- Maintain consistent divider styles within the same context
- Use subtle colors (neutral-300 default) for non-distracting separation
- Apply appropriate spacing based on content density
- Use labeled dividers for form sections or process steps
- Use vertical dividers in toolbars and navigation
- Use gradient dividers sparingly for premium emphasis

### Don't

- Don't overuse dividers; white space can separate content too
- Don't use dividers between every list item (reserve for logical groups)
- Don't use thick dividers for minor separations
- Don't use multiple divider variants on the same page
- Don't use dividers to create borders (use border utilities instead)
- Don't rely on divider color alone to convey meaning
- Don't use vertical dividers in responsive layouts without considering mobile

## Code Example

### HTML (Divider Markup)

```html
<!-- Basic horizontal divider -->
<hr class="divider" role="presentation" />

<!-- Horizontal divider with spacing -->
<hr class="divider divider--section" role="presentation" />

<!-- Dashed divider -->
<hr class="divider divider--dashed" role="presentation" />

<!-- Thick divider -->
<hr class="divider divider--thick" role="presentation" />

<!-- Gradient divider -->
<hr class="divider divider--gradient" role="presentation" />

<!-- Labeled divider -->
<div class="divider divider--labeled" role="separator">
  <span class="divider__label">Or continue with</span>
</div>

<!-- Labeled divider (left-aligned) -->
<div class="divider divider--labeled divider--labeled-left" role="separator">
  <span class="divider__label">Step 2: Payment Details</span>
</div>

<!-- Vertical divider -->
<div class="toolbar">
  <button>Action 1</button>
  <div class="divider divider--vertical" role="presentation"></div>
  <button>Action 2</button>
  <div class="divider divider--vertical" role="presentation"></div>
  <button>Action 3</button>
</div>

<!-- Semantic separator -->
<section>
  <h2>Section 1</h2>
  <p>Content...</p>
</section>

<hr class="divider divider--section" role="separator" aria-label="End of section" />

<section>
  <h2>Section 2</h2>
  <p>Content...</p>
</section>
```

### CSS (Component Styles)

```css
/* Base Divider */
.divider {
  border: none;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}

/* Horizontal Divider (default) */
.divider:not(.divider--vertical) {
  width: 100%;
  height: 1px;
  background-color: var(--color-neutral-300);
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

/* Vertical Divider */
.divider--vertical {
  width: 1px;
  height: 100%;
  background-color: var(--color-neutral-300);
  margin-left: var(--space-4);
  margin-right: var(--space-4);
  display: inline-block;
  vertical-align: middle;
}

/* Size Variants - Horizontal */
.divider--thin:not(.divider--vertical) {
  margin-top: var(--space-2);
  margin-bottom: var(--space-2);
}

.divider--base:not(.divider--vertical) {
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

.divider--thick:not(.divider--vertical) {
  height: 2px;
  margin-top: var(--space-6);
  margin-bottom: var(--space-6);
}

.divider--section:not(.divider--vertical) {
  margin-top: var(--space-8);
  margin-bottom: var(--space-8);
}

/* Size Variants - Vertical */
.divider--vertical.divider--thin {
  margin-left: var(--space-2);
  margin-right: var(--space-2);
}

.divider--vertical.divider--base {
  margin-left: var(--space-4);
  margin-right: var(--space-4);
}

.divider--vertical.divider--thick {
  width: 2px;
  margin-left: var(--space-6);
  margin-right: var(--space-6);
}

/* Style Variants */
.divider--dashed {
  background: none;
  border: none;
  border-top: 1px dashed var(--color-neutral-300);
  height: 0;
}

.divider--dashed.divider--vertical {
  border-top: none;
  border-left: 1px dashed var(--color-neutral-300);
  width: 0;
}

.divider--dotted {
  background: none;
  border: none;
  border-top: 1px dotted var(--color-neutral-300);
  height: 0;
}

.divider--dotted.divider--vertical {
  border-top: none;
  border-left: 1px dotted var(--color-neutral-300);
  width: 0;
}

.divider--gradient {
  background: linear-gradient(
    to right,
    transparent,
    var(--color-neutral-300) 50%,
    transparent
  );
}

.divider--gradient.divider--vertical {
  background: linear-gradient(
    to bottom,
    transparent,
    var(--color-neutral-300) 50%,
    transparent
  );
}

/* Labeled Divider */
.divider--labeled {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
  color: var(--color-neutral-600);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.divider--labeled::before,
.divider--labeled::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--color-neutral-300);
}

/* Labeled Position Variants */
.divider--labeled-left::before {
  flex: 0;
  width: 0;
}

.divider--labeled-right::after {
  flex: 0;
  width: 0;
}

.divider--labeled-center {
  /* Default - both flex: 1 */
}

.divider__label {
  flex-shrink: 0;
  padding: 0 var(--space-2);
  white-space: nowrap;
}

/* Color Variants */
.divider--primary {
  background-color: var(--color-brand-primary);
}

.divider--accent {
  background-color: var(--color-brand-accent);
}

.divider--subtle {
  background-color: var(--color-neutral-200);
}

.divider--strong {
  background-color: var(--color-neutral-400);
}

/* Responsive */
@media (max-width: 768px) {
  /* Convert vertical dividers to horizontal on mobile */
  .divider--vertical.divider--responsive {
    width: 100%;
    height: 1px;
    margin-left: 0;
    margin-right: 0;
    margin-top: var(--space-4);
    margin-bottom: var(--space-4);
  }
}
```

### React Component Example

```tsx
import React from 'react';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'gradient';
type DividerSize = 'thin' | 'base' | 'thick' | 'section';
type LabelPosition = 'left' | 'center' | 'right';

interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  size?: DividerSize;
  color?: string;
  label?: string;
  labelPosition?: LabelPosition;
  decorative?: boolean;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'base',
  color,
  label,
  labelPosition = 'center',
  decorative = true,
  className = '',
  ...props
}) => {
  const classes = [
    'divider',
    orientation === 'vertical' && 'divider--vertical',
    variant !== 'solid' && `divider--${variant}`,
    size !== 'base' && `divider--${size}`,
    label && 'divider--labeled',
    label && labelPosition !== 'center' && `divider--labeled-${labelPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = color ? { backgroundColor: color } : undefined;

  const ariaProps = {
    role: decorative ? 'presentation' : 'separator',
    'aria-orientation': orientation,
    ...props,
  };

  if (label) {
    return (
      <div className={classes} style={style} {...ariaProps}>
        <span className="divider__label">{label}</span>
      </div>
    );
  }

  return <hr className={classes} style={style} {...ariaProps} />;
};
```

### Usage Examples

```tsx
import { Divider } from './Divider';

// Basic usage
<section>
  <h2>Section 1</h2>
  <p>Content...</p>
</section>

<Divider />

<section>
  <h2>Section 2</h2>
  <p>Content...</p>
</section>

// Form section divider with label
<form>
  <div>
    <label>Name</label>
    <input type="text" />
  </div>

  <Divider label="Contact Information" labelPosition="left" size="section" />

  <div>
    <label>Email</label>
    <input type="email" />
  </div>
</form>

// Social login separator
<div>
  <button>Sign in with Email</button>

  <Divider label="Or continue with" />

  <div className="social-buttons">
    <button>Google</button>
    <button>GitHub</button>
  </div>
</div>

// Toolbar with vertical dividers
<div className="toolbar">
  <button>Cut</button>
  <button>Copy</button>
  <button>Paste</button>

  <Divider orientation="vertical" size="thin" />

  <button>Undo</button>
  <button>Redo</button>

  <Divider orientation="vertical" size="thin" />

  <button>Settings</button>
</div>

// Gradient divider for premium section
<section>
  <h2>Standard Features</h2>
  <ul>...</ul>
</section>

<Divider variant="gradient" size="section" />

<section>
  <h2>Premium Features</h2>
  <ul>...</ul>
</section>

// Dashed divider in list
<ul>
  <li>Item 1</li>
  <Divider variant="dashed" size="thin" />
  <li>Item 2</li>
  <Divider variant="dashed" size="thin" />
  <li>Item 3</li>
</ul>

// Custom color divider
<Divider color="var(--color-brand-accent)" size="thick" />

// Semantic separator (not decorative)
<article>
  <section>
    <h2>Introduction</h2>
    <p>Content...</p>
  </section>

  <Divider decorative={false} size="section" />

  <section>
    <h2>Conclusion</h2>
    <p>Content...</p>
  </section>
</article>
```

### Common Patterns

```tsx
// Card list with dividers
<div className="card">
  <div className="card-item">Item 1</div>
  <Divider size="thin" />
  <div className="card-item">Item 2</div>
  <Divider size="thin" />
  <div className="card-item">Item 3</div>
</div>

// Page header divider
<header>
  <h1>Dashboard</h1>
  <nav>...</nav>
</header>

<Divider size="base" />

<main>...</main>

// Multi-step form
<form>
  <div className="step">
    <h3>Step 1: Basic Info</h3>
    {/* Form fields */}
  </div>

  <Divider label="Step 2: Address" labelPosition="left" />

  <div className="step">
    {/* Form fields */}
  </div>

  <Divider label="Step 3: Confirmation" labelPosition="left" />

  <div className="step">
    {/* Form fields */}
  </div>
</form>
```
