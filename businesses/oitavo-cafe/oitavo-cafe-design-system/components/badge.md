# Badge Component

**Component Category:** Data Display
**Design System:** Oitavo Café Design System
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

Badges are compact visual indicators used to display counts, status, labels, or other concise information. In the Oitavo Café system, badges highlight important metrics, ROI indicators, and status information that demands attention.

**Primary Use Cases:**
- ROI metrics and growth indicators
- Status labels (active, pending, completed)
- Notification counts
- Category tags
- Feature highlights

**Design Principle Alignment:**
Following "Data Dignity: Numbers Are Heroes," badges make metrics prominent and meaningful. Golden Amber badges celebrate achievements and growth, while maintaining professional restraint.

---

## Anatomy

```
┌─────────────────────┐
│  [●] Label Text     │  ← Pill Badge (with optional dot)
└─────────────────────┘

┌──────┐
│  42  │  ← Numeric Badge (count/metric)
└──────┘

┌─────────────────────┐
│ +23% ↗              │  ← ROI Badge (with icon)
└─────────────────────┘
```

**Anatomy Parts:**
1. **Container** - Background with border-radius
2. **Label/Content** - Text, number, or icon
3. **Optional Dot** - Status indicator
4. **Optional Icon** - Growth arrow, checkmark, etc.

---

## Variants

### 1. Status Badge
Used for showing status states (active, pending, error, success).

**Visual Characteristics:**
- Pill shape (fully rounded corners)
- Subtle colors with strong text contrast
- Optional leading dot indicator

**When to Use:**
- System status indicators
- Process states (pending, approved, rejected)
- Activity indicators (online, offline, away)

### 2. Numeric Badge
Displays counts and metrics prominently.

**Visual Characteristics:**
- Compact size, pill or circular shape
- High contrast for readability
- Often used as overlay on other components

**When to Use:**
- Notification counts
- Item quantities
- Unread messages

### 3. ROI/Metric Badge
Highlights financial metrics and growth indicators - the star of the show.

**Visual Characteristics:**
- Uses Golden Amber (accent-600) for positive metrics
- Larger size to make numbers heroic
- Includes context: "R$42k in sales" not just "42k"
- Optional growth/decline icons

**When to Use:**
- Revenue metrics
- Growth percentages
- ROI indicators
- Performance highlights

### 4. Label Badge
Simple text labels for categorization.

**Visual Characteristics:**
- Minimal styling
- Neutral colors
- Compact padding

**When to Use:**
- Category labels
- Feature tags
- Metadata display

---

## Sizes

### Small
- Height: 20px
- Padding: 4px 8px
- Font: 12px (--font-size-xs)
- Use: Inline text, tight spaces

### Medium (Default)
- Height: 24px
- Padding: 6px 12px
- Font: 14px (--font-size-sm)
- Use: Standard UI elements

### Large
- Height: 32px
- Padding: 8px 16px
- Font: 16px (--font-size-base)
- Use: Prominent metrics, hero sections

---

## States

### Default
- Base colors as specified by variant
- Full opacity
- No hover effect (badges are non-interactive)

### With Dot
- 6px circular dot in leading position
- 8px margin-right
- Dot color matches semantic meaning

### Dismissible (for interactive badges)
- Close icon on trailing edge
- Hover state on icon only
- Icon: 16px × 16px
- Transition: 200ms ease

---

## Color Specifications

### Status Colors

**Success** (completed, active, approved)
```css
background: var(--accent-50);  /* #FBF4EA */
color: var(--accent-700);      /* #6B3100 */
border: 1px solid var(--accent-200);
```

**Warning** (pending, in-progress)
```css
background: var(--accent-100); /* #F3E6D2 */
color: var(--accent-700);      /* #6B3100 */
border: 1px solid var(--accent-300);
```

**Error** (rejected, failed)
```css
background: var(--primary-50);  /* #FCF3F1 */
color: var(--primary-800);      /* #4C0707 */
border: 1px solid var(--primary-200);
```

**Info** (neutral information)
```css
background: var(--secondary-50); /* #FBF3F0 */
color: var(--secondary-700);     /* #742400 */
border: 1px solid var(--secondary-200);
```

**Neutral** (default labels)
```css
background: var(--neutral-100); /* #EBE7E6 */
color: var(--neutral-700);      /* #4A403D */
border: 1px solid var(--neutral-300);
```

### ROI/Metric Badge (Special Treatment)

**Positive Growth**
```css
background: var(--accent-600);  /* #8D4C00 - Golden Amber */
color: white;
font-weight: 600;
box-shadow: var(--shadow-sm);
```

**Neutral Metric**
```css
background: var(--neutral-700); /* #4A403D */
color: white;
font-weight: 600;
```

**Negative Metric**
```css
background: var(--primary-700); /* #75201C */
color: white;
font-weight: 600;
```

---

## Typography

- Font Family: System font stack (inherited)
- Font Weight: 500 (medium) for labels, 600 (semibold) for metrics
- Line Height: 1.2 (tight for vertical centering)
- Letter Spacing: 0.01em (slightly open for readability at small sizes)
- Text Transform: None (preserve natural case)

---

## Spacing & Layout

**Padding:**
- Small: 4px 8px
- Medium: 6px 12px
- Large: 8px 16px

**Border Radius:**
- Pills: var(--radius-full) - 999px
- Rounded: var(--radius-md) - 8px
- Circular (for counts): 50%

**Margins:**
- When inline: 4px horizontal gap
- When stacked: 8px vertical gap
- In groups: 8px gap (use flexbox gap property)

---

## Accessibility

### Semantic HTML
```html
<!-- Status badge -->
<span class="badge badge--success" role="status" aria-label="Active">
  Active
</span>

<!-- Count badge -->
<span class="badge badge--count" aria-label="5 unread notifications">
  5
</span>

<!-- Metric badge -->
<span class="badge badge--metric" aria-label="Revenue increased by 23%">
  +23% ↗
</span>
```

### ARIA Guidelines
- Use `role="status"` for status indicators
- Use `aria-label` when visual content needs context
- For counts: include descriptive label (not just "5")
- For icons: ensure text alternative exists

### Keyboard Interaction
- Non-interactive badges: no keyboard focus
- Dismissible badges: close button receives focus, activates with Enter/Space

### Color Contrast
- All badge color combinations meet WCAG AA minimum (4.5:1)
- ROI badges use high contrast white text on dark backgrounds
- Status dots maintain 3:1 contrast with backgrounds

### Screen Reader Considerations
- Provide context for numeric badges ("5 notifications" not "5")
- ROI percentages: announce full context ("Revenue up 23%")
- Status changes: use `aria-live="polite"` for dynamic updates

---

## Responsive Behavior

Badges are inherently responsive but follow these guidelines:

**Mobile (< 768px):**
- Use small or medium sizes only
- Ensure touch targets for dismissible badges are 44×44px minimum
- Stack badges vertically when space is constrained

**Tablet (768px - 1024px):**
- Medium size is optimal
- Can display badges inline with wrapping

**Desktop (> 1024px):**
- All sizes appropriate
- Can use large badges for hero metrics
- Maintain consistent sizing within component groups

---

## Do's and Don'ts

### Do

- **Do** use Golden Amber badges for ROI and growth metrics - they're earned
- **Do** include context with numbers: "R$42k revenue" not "42k"
- **Do** keep labels concise (1-3 words maximum)
- **Do** use consistent badge sizes within the same context
- **Do** pair every metric with meaning - numbers are heroes with context
- **Do** use status dots for quick visual scanning
- **Do** maintain sufficient white space around badges

### Don't

- **Don't** overuse badges - they lose impact when everywhere
- **Don't** use badges as buttons (use actual button components)
- **Don't** exceed 10% coverage of Golden Amber per the 60-30-10 rule
- **Don't** use badges for long text (use tags or chips instead)
- **Don't** rely on color alone to convey meaning
- **Don't** make badges interactive unless necessary
- **Don't** use generic numbers without context - violates Data Dignity

### Brand-Specific Guidance

**Carolina's ROI Dashboard Context:**
- Celebrate wins with prominent Golden Amber badges
- Always show currency symbols with amounts (R$, €)
- Include timeframe context: "This month: R$42k"
- Use growth arrows (↗↘) for trends
- Make positive metrics visually dominant

---

## Code Examples

### Basic Status Badge

```html
<span class="badge badge--success">
  <span class="badge__dot"></span>
  Active
</span>
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 500;
  line-height: 1.2;
  border: 1px solid transparent;
}

.badge--success {
  background: var(--accent-50);
  color: var(--accent-700);
  border-color: var(--accent-200);
}

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
  background: currentColor;
}
```

### ROI Metric Badge (Golden Amber)

```html
<span class="badge badge--roi badge--large">
  +23% ↗
</span>
```

```css
.badge--roi {
  background: var(--accent-600); /* Golden Amber */
  color: white;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

.badge--large {
  padding: 8px 16px;
  font-size: var(--font-size-base);
}
```

### ROI Badge with Context

```html
<div class="metric-badge">
  <span class="metric-badge__label">Revenue This Month</span>
  <span class="badge badge--roi badge--large">
    R$ 42.350
  </span>
</div>
```

```css
.metric-badge {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-badge__label {
  font-size: var(--font-size-sm);
  color: var(--neutral-600);
  font-weight: 500;
}
```

### Numeric Count Badge

```html
<div class="badge-wrapper">
  <svg class="icon"><!-- notification icon --></svg>
  <span class="badge badge--count" aria-label="5 unread notifications">
    5
  </span>
</div>
```

```css
.badge-wrapper {
  position: relative;
  display: inline-block;
}

.badge--count {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  padding: 2px 6px;
  background: var(--primary-700);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 600;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Dismissible Badge

```html
<span class="badge badge--dismissible">
  Label
  <button class="badge__close" aria-label="Remove label">
    <svg><!-- close icon --></svg>
  </button>
</span>
```

```css
.badge--dismissible {
  padding-right: 8px;
}

.badge__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background var(--duration-fast) var(--ease-gentle);
}

.badge__close:hover {
  background: rgba(0, 0, 0, 0.1);
}

.badge__close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

### Badge Group

```html
<div class="badge-group">
  <span class="badge badge--neutral">Design</span>
  <span class="badge badge--neutral">Marketing</span>
  <span class="badge badge--neutral">Strategy</span>
</div>
```

```css
.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

---

## React/Component Example

```jsx
// Badge.jsx
const Badge = ({
  children,
  variant = 'neutral',
  size = 'medium',
  dot = false,
  dismissible = false,
  onDismiss,
  ...props
}) => {
  const className = `badge badge--${variant} badge--${size} ${dismissible ? 'badge--dismissible' : ''}`;

  return (
    <span className={className} {...props}>
      {dot && <span className="badge__dot" />}
      {children}
      {dismissible && (
        <button
          className="badge__close"
          onClick={onDismiss}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
};

// Usage
<Badge variant="success" dot>Active</Badge>
<Badge variant="roi" size="large">+23% ↗</Badge>
<Badge variant="neutral" dismissible onDismiss={() => console.log('removed')}>
  Label
</Badge>
```

---

## Design Tokens Reference

```css
/* Badge-specific tokens */
:root {
  /* Sizes */
  --badge-height-sm: 20px;
  --badge-height-md: 24px;
  --badge-height-lg: 32px;

  /* Padding */
  --badge-padding-sm: 4px 8px;
  --badge-padding-md: 6px 12px;
  --badge-padding-lg: 8px 16px;

  /* Typography */
  --badge-font-size-sm: var(--font-size-xs);
  --badge-font-size-md: var(--font-size-sm);
  --badge-font-size-lg: var(--font-size-base);

  /* Dot */
  --badge-dot-size: 6px;
  --badge-dot-gap: 8px;

  /* Border */
  --badge-border-width: 1px;
  --badge-border-radius: var(--radius-full);
}
```

---

## Related Components

- **Tag** - For removable/interactive categorization
- **Chip** - For input selections
- **Tooltip** - To provide additional context on hover
- **Card** - Often contains badges for status/metrics

---

## References

- Design Principle: "Data Dignity: Numbers Are Heroes"
- Color Palette: Golden Amber (accent-600) for ROI highlights
- Carolina's Journey: Celebrate measurable wins with badges
- 60-30-10 Rule: Reserve Golden Amber (10%) for genuine achievements

---

*Generated for Oitavo Café Design System - Where numbers tell the story*
