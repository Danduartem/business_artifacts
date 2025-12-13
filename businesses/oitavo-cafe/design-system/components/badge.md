# Badge

## Overview
Badges are small, compact labels used for status indicators, categories, counts, or quick visual classification in the Oitavo Café Design System. They provide at-a-glance information and help users quickly scan and categorize content. Use badges for statuses, tags, notification counts, new features, and other metadata.

## Anatomy

```
┌─────────────────┐        ┌───┐
│  Status: Ativo  │        │ 5 │
└─────────────────┘        └───┘
       ↑                      ↑
   Text Badge            Count Badge
  (pill shaped)           (circular)

┌───────────────────┐
│  Category  [×]    │
└───────────────────┘
       ↑        ↑
     Text   Close Icon
            (interactive)
```

**Component Parts:**
- **Container**: Background, border, padding, border radius
- **Text Label**: Status, category, or tag text
- **Count**: Numeric indicator (for count badges)
- **Close Icon**: Optional, for removable badges

## Variants

| Variant | Use Case | Background | Text Color | Border |
|---------|----------|------------|------------|--------|
| Default | Neutral tags, general labels | var(--color-neutral-200) | var(--color-neutral-800) | none |
| Primary | Brand-related, important status | var(--color-primary-100) | var(--color-primary-800) | 1px solid var(--color-primary-300) |
| Success | Positive status, completion | var(--color-accent-100) | var(--color-accent-800) | 1px solid var(--color-accent-300) |
| Warning | Warnings, attention needed | var(--color-accent-50) | var(--color-accent-700) | 1px solid var(--color-accent-200) |
| Error | Errors, critical issues | var(--color-primary-50) | var(--color-primary-800) | 1px solid var(--color-primary-200) |
| Info | Information, neutral status | var(--color-secondary-100) | var(--color-secondary-800) | 1px solid var(--color-secondary-300) |
| Solid Primary | High-emphasis brand badge | var(--color-primary-700) | var(--color-support-cream-100) | none |
| Solid Success | High-emphasis success | var(--color-accent-600) | var(--color-support-cream-100) | none |

## Sizes

| Size | Height | Padding | Font Size | Border Radius | Token Reference |
|------|--------|---------|-----------|---------------|-----------------|
| sm | 20px | 2px 8px | 11px | 10px | var(--spacing-1) - 2px, var(--spacing-2) |
| md | 24px | 4px 12px | 13px | 12px | var(--spacing-1), var(--spacing-3) |
| lg | 32px | 6px 16px | 14px | 16px | var(--spacing-1) + 2px, var(--spacing-4) |

**Note:** Medium (md) is the default size. Border radius is always pill-shaped (half of height).

## Special Variants

### Count Badge

Circular badge for numeric counts (notifications, items, etc.):

| Property | Value |
|----------|-------|
| Size | 20px × 20px (circle) |
| Padding | 0 |
| Font Size | 11px |
| Font Weight | var(--font-weight-bold) |
| Background | var(--color-primary-700) |
| Text Color | var(--color-support-cream-100) |
| Border Radius | 50% (full circle) |
| Display | inline-flex |
| Align Items | center |
| Justify Content | center |

**For counts > 99:** Display "99+" instead of actual number

### Removable Badge

Badge with close icon for user-removable tags:

| Property | Value |
|----------|-------|
| Padding Right | 8px (reduced for icon space) |
| Icon Size | 14px |
| Icon Position | Right side, after text |
| Icon Color | Inherit from text color |
| Icon Hover | opacity: 0.7 |
| Icon Click Area | 20px × 20px minimum |

## States

### Static Badge

| State | Appearance |
|-------|------------|
| default | As defined in variants table |

### Interactive Badge (Clickable/Removable)

| State | Opacity | Cursor | Background Change |
|-------|---------|--------|-------------------|
| default | 1.0 | default | - |
| hover | 0.8 | pointer | Slightly darker (filter: brightness(0.95)) |
| active | 0.6 | pointer | Darker (filter: brightness(0.9)) |
| focus | 1.0 | pointer | Focus ring: 2px solid var(--color-primary-400) |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'solid-primary' \| 'solid-success' | 'default' | Visual style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Badge size |
| type | 'text' \| 'count' | 'text' | Badge type (text label or count) |
| count | number | - | Numeric count (for type="count") |
| maxCount | number | 99 | Maximum count to display before showing "+" |
| removable | boolean | false | Shows close icon for removal |
| onRemove | function | - | Callback when close icon is clicked |
| onClick | function | - | Click handler (makes badge interactive) |
| icon | ReactNode | - | Optional icon before text |
| children | ReactNode | - | Badge text content |

## Accessibility

### Semantic HTML
- **Static badges**: Use `<span>` element
- **Interactive badges**: Use `<button>` element with type="button"
- **Count badges**: Use `<span>` with aria-label

### ARIA Attributes
- **aria-label**: Required for count badges (e.g., "5 unread notifications")
- **role**: Implicit from element (span or button)
- **aria-live**: Use `"polite"` for count badges that update dynamically
- **aria-atomic**: Set to `"true"` for dynamic count updates

### Screen Reader Behavior
- Text badge: Announces "[Text content]"
- Count badge: Announces "[aria-label]" (e.g., "5 unread messages")
- Removable badge: Announces "[Text], remove button" or "[Text], dismissible"

### WCAG Compliance
- Minimum color contrast: 4.5:1 for text (WCAG AA)
- Don't rely on color alone - use text or icons for meaning
- Interactive badges: Minimum 24px touch target
- Close icon: Minimum 20px × 20px click area
- Focus indicators: 2px outline clearly visible

## Usage Guidelines

### ✅ Do
- Use badges for quick visual classification and status
- Keep badge text concise (1-2 words maximum)
- Use appropriate semantic colors (success = green, error = red)
- Provide aria-label for count badges
- Use solid variants sparingly (high emphasis only)
- Stack badges horizontally with 8px gap
- Align badges vertically with adjacent text
- Use count badges for notifications and unread items

### ❌ Don't
- Don't use badges for long text (use pills or chips instead)
- Don't use too many badge variants on one screen (confusing)
- Don't make badges interactive unless necessary
- Don't rely on color alone for meaning (add text/icons)
- Don't use badges as primary navigation or actions
- Don't make badges smaller than 20px height (illegible)
- Don't use all caps for badge text (reduces readability)
- Don't nest badges or stack them vertically

## Semantic Color Usage

| Status/Category | Recommended Variant | Example Use Case |
|-----------------|---------------------|------------------|
| Success, Active, Complete | Success | "Ativo", "Completo", "Publicado" |
| Error, Failed, Urgent | Error | "Erro", "Falhou", "Urgente" |
| Warning, Pending | Warning | "Pendente", "Atenção", "Em Revisão" |
| Info, New, Beta | Info | "Novo", "Beta", "Atualizado" |
| Primary, Featured | Primary | "Destaque", "Premium", "Recomendado" |
| Neutral, Tag | Default | General categories and tags |

## Code Examples

### HTML

```html
<!-- Default Badge -->
<span class="badge badge-default badge-md">
  Marketing
</span>

<!-- Primary Badge -->
<span class="badge badge-primary badge-md">
  Destaque
</span>

<!-- Success Badge -->
<span class="badge badge-success badge-md">
  Ativo
</span>

<!-- Warning Badge -->
<span class="badge badge-warning badge-md">
  Pendente
</span>

<!-- Error Badge -->
<span class="badge badge-error badge-md">
  Erro
</span>

<!-- Solid Badge (High Emphasis) -->
<span class="badge badge-solid-primary badge-md">
  Premium
</span>

<!-- Count Badge -->
<span class="badge badge-count" aria-label="5 unread notifications">
  5
</span>

<!-- Count Badge (Over 99) -->
<span class="badge badge-count" aria-label="More than 99 unread messages">
  99+
</span>

<!-- Removable Badge -->
<button
  type="button"
  class="badge badge-primary badge-md badge-removable"
  aria-label="Remove Growth Marketing tag"
>
  Growth Marketing
  <svg class="badge-close-icon" aria-hidden="true">×</svg>
</button>

<!-- Badge with Icon -->
<span class="badge badge-success badge-md">
  <svg class="badge-icon" aria-hidden="true">✓</svg>
  Verificado
</span>

<!-- Badge Group -->
<div class="badge-group">
  <span class="badge badge-primary badge-sm">ROI</span>
  <span class="badge badge-default badge-sm">Marketing</span>
  <span class="badge badge-success badge-sm">Ativo</span>
</div>
```

### CSS

```css
/* Badge Base Styles */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--font-size-sm); /* 13px */
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  white-space: nowrap;
  text-transform: none;
  transition: all var(--duration-fast) var(--easing-ease-out);
}

/* Default Variant */
.badge-default {
  background: var(--color-neutral-200);
  color: var(--color-neutral-800);
}

/* Primary Variant */
.badge-primary {
  background: var(--color-primary-100);
  color: var(--color-primary-800);
  border: 1px solid var(--color-primary-300);
}

/* Success Variant */
.badge-success {
  background: var(--color-accent-100);
  color: var(--color-accent-800);
  border: 1px solid var(--color-accent-300);
}

/* Warning Variant */
.badge-warning {
  background: var(--color-accent-50);
  color: var(--color-accent-700);
  border: 1px solid var(--color-accent-200);
}

/* Error Variant */
.badge-error {
  background: var(--color-primary-50);
  color: var(--color-primary-800);
  border: 1px solid var(--color-primary-200);
}

/* Info Variant */
.badge-info {
  background: var(--color-secondary-100);
  color: var(--color-secondary-800);
  border: 1px solid var(--color-secondary-300);
}

/* Solid Primary Variant */
.badge-solid-primary {
  background: var(--color-primary-700);
  color: var(--color-support-cream-100);
  border: none;
}

/* Solid Success Variant */
.badge-solid-success {
  background: var(--color-accent-600);
  color: var(--color-support-cream-100);
  border: none;
}

/* Sizes */
.badge-sm {
  padding: 2px 8px;
  font-size: 11px;
  border-radius: 10px;
  height: 20px;
}

.badge-lg {
  padding: 6px 16px;
  font-size: var(--font-size-sm);
  border-radius: 16px;
  height: 32px;
}

/* Count Badge */
.badge-count {
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 50%;
  font-size: 11px;
  font-weight: var(--font-weight-bold);
  background: var(--color-primary-700);
  color: var(--color-support-cream-100);
}

/* Removable Badge */
.badge-removable {
  padding-right: 8px;
  cursor: pointer;
  border: inherit;
  font: inherit;
}

.badge-removable:hover {
  opacity: 0.8;
  filter: brightness(0.95);
}

.badge-removable:active {
  opacity: 0.6;
  filter: brightness(0.9);
}

.badge-removable:focus-visible {
  outline: 2px solid var(--color-primary-400);
  outline-offset: 2px;
}

.badge-close-icon {
  width: 14px;
  height: 14px;
  margin-left: 4px;
  transition: opacity var(--duration-fast);
}

.badge-removable:hover .badge-close-icon {
  opacity: 0.7;
}

/* Badge Icon */
.badge-icon {
  width: 14px;
  height: 14px;
  margin-right: 2px;
}

/* Badge Group */
.badge-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
```

### React Component Example

```jsx
import React from 'react';
import './Badge.css';

export const Badge = ({
  variant = 'default',
  size = 'md',
  type = 'text',
  count,
  maxCount = 99,
  removable = false,
  onRemove,
  onClick,
  icon,
  children,
  ...props
}) => {
  const classNames = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    type === 'count' && 'badge-count',
    removable && 'badge-removable',
  ].filter(Boolean).join(' ');

  // Count badge
  if (type === 'count') {
    const displayCount = count > maxCount ? `${maxCount}+` : count;
    return (
      <span
        className={classNames}
        aria-label={`${count} ${props['aria-label'] || 'items'}`}
        {...props}
      >
        {displayCount}
      </span>
    );
  }

  // Removable badge
  if (removable || onRemove) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={onRemove || onClick}
        aria-label={`Remove ${children}`}
        {...props}
      >
        {icon && <span className="badge-icon" aria-hidden="true">{icon}</span>}
        {children}
        <svg className="badge-close-icon" aria-hidden="true">×</svg>
      </button>
    );
  }

  // Interactive badge (clickable but not removable)
  if (onClick) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={onClick}
        {...props}
      >
        {icon && <span className="badge-icon" aria-hidden="true">{icon}</span>}
        {children}
      </button>
    );
  }

  // Static badge
  return (
    <span className={classNames} {...props}>
      {icon && <span className="badge-icon" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
};

// Badge Group Component
export const BadgeGroup = ({ children, ...props }) => {
  return (
    <div className="badge-group" {...props}>
      {children}
    </div>
  );
};

// Usage Examples:
// <Badge variant="primary">Destaque</Badge>
// <Badge variant="success">Ativo</Badge>
// <Badge type="count" count={5} aria-label="unread notifications" />
// <Badge variant="primary" removable onRemove={handleRemove}>Marketing</Badge>
// <BadgeGroup>
//   <Badge variant="primary">ROI</Badge>
//   <Badge variant="default">Marketing</Badge>
// </BadgeGroup>
```

### Dynamic Count Updates

```jsx
// Example: Live notification counter
const NotificationBadge = ({ count }) => {
  return (
    <span
      className="badge badge-count"
      aria-label={`${count} unread notifications`}
      aria-live="polite"
      aria-atomic="true"
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};
```

## Related Components
- **Button** - Badges can appear on or near buttons
- **Card** - Status badges often appear in card headers
- **Table** - Status badges used in table cells
- **Tag Input** - Removable badges for user-entered tags
- **Notification** - Count badges for notification indicators
