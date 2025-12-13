# Icon

## Overview

The Icon component provides a consistent wrapper for icon display across the Oitavo Café Design System. Built to work seamlessly with Lucide Icons, it ensures proper sizing, color inheritance, and accessibility. Icons enhance UI comprehension and provide visual cues for actions and states.

**When to use:**
- Buttons and interactive elements
- Navigation items
- Status indicators
- Visual affordances for actions
- Decorative enhancement of content

**Icon System:** Lucide Icons (professional, consistent 2px stroke width, optimized SVGs)

## Anatomy

```
┌─────────────────┐
│   ┌─────────┐   │ ← Container (sets size context)
│   │         │   │
│   │  <svg>  │   │ ← Lucide icon SVG
│   │         │   │   (inherits color & size)
│   └─────────┘   │
└─────────────────┘

Parts:
- Container: Provides sizing and layout context
- SVG: Lucide icon (color/size inherited from container)
- Label: Optional accessible label (visually hidden)
```

## Variants

| Variant | Use Case | Visual Difference |
|---------|----------|-------------------|
| `default` | Standard icons | Current color, standard stroke |
| `decorative` | Non-interactive visual elements | `aria-hidden="true"`, no label required |
| `interactive` | Clickable icons (buttons) | Hover/focus states, accessible label required |

## Sizes

| Size | Dimensions | Stroke Width | Use Case |
|------|------------|--------------|----------|
| `xs` | 16px × 16px | 2px | Inline text icons, compact UI |
| `sm` | 20px × 20px | 2px | Small buttons, list items |
| `md` | 24px × 24px | 2px | Default size, most buttons |
| `lg` | 32px × 32px | 2px | Large buttons, feature highlights |
| `xl` | 40px × 40px | 2px | Hero sections, empty states |
| `2xl` | 48px × 48px | 2px | Large feature icons, illustrations |

## Props/API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `LucideIconName` | required | Name of Lucide icon to render |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Icon size |
| `color` | `string` | `'currentColor'` | Icon color (use semantic tokens or inherit) |
| `strokeWidth` | `number` | `2` | Override stroke width (default 2px) |
| `decorative` | `boolean` | `false` | If true, adds `aria-hidden="true"` |
| `label` | `string` | - | Accessible label (required if not decorative) |
| `className` | `string` | - | Additional CSS classes |

## Accessibility

**ARIA Attributes:**
- **Decorative icons:** Use `aria-hidden="true"` to hide from screen readers
- **Meaningful icons:** Provide `aria-label` or use `<title>` inside SVG
- **Interactive icons:** Must have accessible label or visible text

**Screen Reader Behavior:**
- Decorative icons are announced: hidden from screen readers
- Meaningful standalone icons: Label is announced
- Icons with adjacent text: Usually decorative

**Keyboard Navigation:**
- Icons themselves are not focusable
- When inside buttons/links, the parent element receives focus
- Focus indicators should be on interactive parent, not icon

**Best Practices:**
```html
<!-- Decorative icon with adjacent text -->
<button>
  <Icon name="save" decorative />
  Save
</button>

<!-- Standalone meaningful icon -->
<button>
  <Icon name="save" label="Save document" />
</button>

<!-- Decorative icon in content -->
<div>
  <Icon name="check-circle" decorative />
  <span>Task completed</span>
</div>
```

## Usage Guidelines

### Do

- Use Lucide Icons exclusively for consistency
- Inherit color from parent when possible (`currentColor`)
- Provide labels for standalone icons
- Mark decorative icons as `decorative={true}`
- Use consistent sizes throughout similar UI contexts
- Align icons vertically with adjacent text
- Use icons to enhance, not replace, clear text labels (except universally understood icons)
- Choose icons that clearly represent their action/meaning

### Don't

- Don't mix icon libraries (stick to Lucide)
- Don't hardcode colors; use design tokens or inheritance
- Don't use icons without text labels unless meaning is universal (e.g., close X, search magnifier)
- Don't resize icons using CSS transforms (use size prop)
- Don't use decorative icons for critical information
- Don't exceed 2xl size for UI icons (48px max)
- Don't use overly complex icons that lose clarity at small sizes
- Don't use different stroke widths inconsistently

## Code Example

### HTML (Icon with wrapper)

```html
<!-- Default icon in button -->
<button class="button">
  <span class="icon icon--sm" aria-hidden="true">
    <svg><!-- Lucide save icon --></svg>
  </span>
  <span>Save Changes</span>
</button>

<!-- Standalone icon with label -->
<button class="icon-button">
  <span class="icon icon--md">
    <svg aria-label="Close dialog"><!-- Lucide x icon --></svg>
  </span>
</button>

<!-- Decorative icon in content -->
<div class="feature">
  <span class="icon icon--lg" aria-hidden="true">
    <svg><!-- Lucide check-circle icon --></svg>
  </span>
  <h3>Success</h3>
  <p>Your changes have been saved.</p>
</div>

<!-- Icon with custom color -->
<span class="icon icon--md icon--success">
  <svg><!-- Lucide check icon --></svg>
</span>

<!-- Icon sizes -->
<span class="icon icon--xs">
  <svg><!-- 16px icon --></svg>
</span>

<span class="icon icon--sm">
  <svg><!-- 20px icon --></svg>
</span>

<span class="icon icon--md">
  <svg><!-- 24px icon --></svg>
</span>

<span class="icon icon--lg">
  <svg><!-- 32px icon --></svg>
</span>

<span class="icon icon--xl">
  <svg><!-- 40px icon --></svg>
</span>

<span class="icon icon--2xl">
  <svg><!-- 48px icon --></svg>
</span>
```

### CSS (Component Styles)

```css
/* Base Icon Container */
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: currentColor;
  vertical-align: middle;
}

/* Icon SVG */
.icon svg {
  width: 100%;
  height: 100%;
  display: block;
  stroke-width: 2;
}

/* Size Variants */
.icon--xs {
  width: 16px;
  height: 16px;
}

.icon--sm {
  width: 20px;
  height: 20px;
}

.icon--md {
  width: 24px;
  height: 24px;
}

.icon--lg {
  width: 32px;
  height: 32px;
}

.icon--xl {
  width: 40px;
  height: 40px;
}

.icon--2xl {
  width: 48px;
  height: 48px;
}

/* Color Variants (Semantic) */
.icon--primary {
  color: var(--color-brand-primary);
}

.icon--accent {
  color: var(--color-brand-accent);
}

.icon--success {
  color: var(--color-feedback-success);
}

.icon--warning {
  color: var(--color-feedback-warning);
}

.icon--error {
  color: var(--color-feedback-error);
}

.icon--info {
  color: var(--color-feedback-info);
}

.icon--neutral {
  color: var(--color-neutral-600);
}

/* Interactive States (when icon is inside button) */
button .icon,
a .icon {
  transition: color var(--duration-fast) var(--ease-out);
}

button:hover .icon,
a:hover .icon {
  opacity: 0.8;
}

button:active .icon,
a:active .icon {
  opacity: 0.6;
}

button:disabled .icon,
a:disabled .icon {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Icon Button (standalone clickable icon) */
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.icon-button:hover {
  background-color: var(--color-neutral-100);
}

.icon-button:active {
  background-color: var(--color-neutral-200);
}

.icon-button:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}

/* Icon with Text Alignment */
.button-content {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.button-content .icon {
  margin-top: -2px; /* Optical alignment */
}

/* Loading State (spinning icon) */
.icon--loading {
  animation: icon-spin 1s linear infinite;
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### React Component Example

```tsx
import React from 'react';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
  decorative?: boolean;
  label?: string;
  className?: string;
  loading?: boolean;
}

const sizeMap: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'currentColor',
  strokeWidth = 2,
  decorative = false,
  label,
  className = '',
  loading = false,
  ...props
}) => {
  const LucideIcon = LucideIcons[name] as React.ComponentType<any>;

  if (!LucideIcon) {
    console.error(`Icon "${name}" not found in Lucide Icons`);
    return null;
  }

  const classes = [
    'icon',
    `icon--${size}`,
    loading && 'icon--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconProps = {
    size: sizeMap[size],
    strokeWidth,
    color,
    'aria-hidden': decorative || undefined,
    'aria-label': !decorative && label ? label : undefined,
  };

  return (
    <span className={classes} {...props}>
      <LucideIcon {...iconProps} />
    </span>
  );
};
```

### Usage Examples

```tsx
import { Icon } from './Icon';

// In a button with text
<button>
  <Icon name="Save" size="sm" decorative />
  Save Changes
</button>

// Standalone icon button
<button aria-label="Close dialog">
  <Icon name="X" size="md" />
</button>

// With custom color
<Icon
  name="CheckCircle"
  size="lg"
  color="var(--color-feedback-success)"
  decorative
/>

// Status indicator
<div className="status">
  <Icon name="AlertCircle" size="sm" color="var(--color-feedback-warning)" />
  <span>Action required</span>
</div>

// Loading spinner
<Icon name="Loader2" size="md" loading />

// Feature icon
<div className="feature-card">
  <Icon name="TrendingUp" size="xl" color="var(--color-brand-accent)" decorative />
  <h3>Increase Revenue</h3>
  <p>Data-driven strategies to boost your bottom line.</p>
</div>

// Navigation
<nav>
  <a href="/dashboard">
    <Icon name="Home" size="sm" decorative />
    Dashboard
  </a>
  <a href="/reports">
    <Icon name="BarChart3" size="sm" decorative />
    Reports
  </a>
</nav>
```

### Common Icon Mappings

```tsx
// Recommended Lucide icons for common use cases
const commonIcons = {
  // Actions
  add: 'Plus',
  edit: 'Pencil',
  delete: 'Trash2',
  save: 'Save',
  close: 'X',
  search: 'Search',
  filter: 'Filter',
  download: 'Download',
  upload: 'Upload',
  copy: 'Copy',

  // Navigation
  menu: 'Menu',
  home: 'Home',
  back: 'ChevronLeft',
  forward: 'ChevronRight',
  expand: 'ChevronDown',
  collapse: 'ChevronUp',

  // Status
  success: 'CheckCircle',
  error: 'XCircle',
  warning: 'AlertCircle',
  info: 'Info',
  loading: 'Loader2',

  // Business/Oitavo Café
  coffee: 'Coffee',
  analytics: 'BarChart3',
  growth: 'TrendingUp',
  strategy: 'Target',
  consulting: 'Users',
  roi: 'DollarSign',
};
```
