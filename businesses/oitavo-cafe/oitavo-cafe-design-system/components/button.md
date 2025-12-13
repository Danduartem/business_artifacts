# Button Component Specification

## Overview

Buttons are the primary action elements in the Oitavo Café Design System. They enable users to trigger actions, submit forms, and navigate through the application. Designed with the "always-on entrepreneur" in mind, buttons provide clear, confident CTAs with warm, approachable aesthetics.

**Design Principle**: Every button should communicate outcome, not just action. Use direct, outcome-focused copy (e.g., "Ver meu ROI" instead of "Submit").

---

## Anatomy

```
┌─────────────────────────────────────┐
│  [Icon]  Label Text  [Icon]         │ ← Button Container
└─────────────────────────────────────┘
     ↑         ↑           ↑
  Leading   Content    Trailing
   Icon      Label       Icon
   (opt)               (opt)

Components:
- Container: Rounded rectangle with padding
- Label: Typography (button text)
- Icons: Optional leading/trailing icons
- Focus Ring: 3px outline for keyboard navigation
```

---

## Variants

| Variant | Use Case | Background | Text Color | Border |
|---------|----------|------------|------------|--------|
| **Primary** | Primary CTAs, main actions | `var(--color-interactive-primary)` (#8D4C00) | `var(--color-text-on-dark)` (#EDE7E1) | None |
| **Secondary** | Secondary actions, alternative paths | `var(--color-interactive-secondary)` (#973E16) | `var(--color-text-on-dark)` (#EDE7E1) | None |
| **Tertiary** | Less prominent actions | `var(--color-brand-primary)` (#75201C) | `var(--color-text-on-dark)` (#EDE7E1) | None |
| **Ghost** | Low-emphasis actions, cancel buttons | Transparent | `var(--color-brand-primary)` (#75201C) | 1px solid `var(--color-brand-primary)` |

**Visual Hierarchy**: Primary > Secondary > Tertiary > Ghost

---

## Sizes

| Size | Height | Padding (X) | Padding (Y) | Font Size | Line Height | Min Width |
|------|--------|-------------|-------------|-----------|-------------|-----------|
| **Small** | 36px | 16px | 8px | 14px | 20px | 80px |
| **Medium** | 44px | 24px | 12px | 16px | 24px | 100px |
| **Large** | 52px | 32px | 14px | 18px | 28px | 120px |

**Notes**:
- Medium is the default size
- All sizes meet minimum 44x44px touch target (small uses padding to reach this)
- Border radius: `var(--radius-sm)` (4px) for all sizes

---

## States

| State | Visual Changes | Interaction | CSS Properties |
|-------|----------------|-------------|----------------|
| **Default** | Base styling per variant | Interactive | Base colors, cursor: pointer |
| **Hover** | Subtle lift + shadow increase | Pointer over button | `transform: translateY(-1px)`, `box-shadow: 0 4px 8px rgba(0,0,0,0.15)` |
| **Active** | Pressed effect | Click/tap | `transform: scale(0.98)`, shadow reduced |
| **Focus** | Focus ring appears | Keyboard navigation | `outline: 3px solid var(--shadow-focus)`, `outline-offset: 2px` |
| **Disabled** | Reduced opacity, no interaction | Cannot interact | `opacity: 0.4`, `cursor: not-allowed`, no hover/active |
| **Loading** | Spinner replaces content | Processing action | Show spinner, disable interaction, maintain dimensions |

**Transition**: All state changes use `var(--duration-fast)` (200ms) with `var(--ease-gentle)` easing.

### State Combinations

- Focus + Hover: Both effects apply simultaneously
- Active takes precedence over hover
- Disabled overrides all other states
- Loading shows disabled styling + spinner

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost'` | `'primary'` | No | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `disabled` | `boolean` | `false` | No | Disables button interaction |
| `loading` | `boolean` | `false` | No | Shows loading spinner |
| `fullWidth` | `boolean` | `false` | No | Button expands to container width |
| `leadingIcon` | `ReactNode \| string` | `null` | No | Icon before label |
| `trailingIcon` | `ReactNode \| string` | `null` | No | Icon after label |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | HTML button type |
| `onClick` | `(event: Event) => void` | `undefined` | No | Click handler |
| `ariaLabel` | `string` | `undefined` | No | Accessible label override |
| `className` | `string` | `''` | No | Additional CSS classes |
| `children` | `ReactNode \| string` | - | Yes | Button label content |

---

## Accessibility

### Keyboard Navigation
- **Tab**: Focus next/previous button
- **Enter/Space**: Activate button
- **Shift + Tab**: Focus previous button

### ARIA Attributes
```html
<!-- Base button -->
<button
  type="button"
  aria-label="Descriptive action"
  aria-disabled="false">
  Label
</button>

<!-- Loading state -->
<button
  aria-busy="true"
  aria-label="Processing your request">
  <span aria-hidden="true">Loading spinner</span>
</button>

<!-- Disabled state -->
<button
  disabled
  aria-disabled="true">
  Label
</button>
```

### Screen Reader Considerations
- Always provide meaningful labels
- Loading state announces "Processing" or similar
- Disabled state announces "Unavailable" or similar
- Icon-only buttons MUST have `aria-label`
- Use `aria-describedby` for additional context

### Focus Management
- Visible focus indicator (3px ring) meets WCAG 2.2 AA
- Focus ring color: `var(--shadow-focus)` with sufficient contrast
- Focus not trapped (can navigate away)

---

## Guidelines

### Do ✓

- **Use outcome-focused copy**: "Ver meu ROI", "Calcular economia", "Começar agora"
- **Maintain hierarchy**: One primary button per screen section
- **Provide feedback**: Use loading state for async operations
- **Group related actions**: Secondary/Ghost near Primary for workflows
- **Keep labels concise**: 1-3 words when possible
- **Use icons to reinforce meaning**: Leading icon for context, trailing for direction

### Don't ✗

- **Don't use generic labels**: Avoid "Submit", "Click here", "Continue"
- **Don't overuse Primary**: Multiple primaries create visual noise
- **Don't hide important actions**: Use Ghost only for truly optional actions
- **Don't mix sizes inconsistently**: Stick to one size per context
- **Don't disable without explanation**: Provide tooltip or helper text
- **Don't use buttons for navigation**: Use Link component instead

### Copy Examples

| ✓ Good | ✗ Bad |
|--------|-------|
| Ver meu ROI | Submit |
| Calcular economia | Calculate |
| Começar teste grátis | Start |
| Baixar relatório | Download |
| Agendar demonstração | Click here |

---

## Code Examples

### HTML + CSS

```html
<!-- Primary Button (Medium) -->
<button class="btn btn--primary btn--md" type="button">
  Ver meu ROI
</button>

<!-- Secondary Button with Icon -->
<button class="btn btn--secondary btn--md" type="button">
  <svg class="btn__icon btn__icon--leading" aria-hidden="true">
    <!-- icon path -->
  </svg>
  Calcular economia
</button>

<!-- Ghost Button (Small) -->
<button class="btn btn--ghost btn--sm" type="button">
  Cancelar
</button>

<!-- Loading State -->
<button class="btn btn--primary btn--md" type="button" aria-busy="true" disabled>
  <span class="btn__spinner" aria-hidden="true"></span>
  <span class="sr-only">Processando...</span>
</button>

<!-- Disabled State -->
<button class="btn btn--primary btn--md" type="button" disabled aria-disabled="true">
  Começar agora
</button>

<!-- Full Width -->
<button class="btn btn--primary btn--md btn--full-width" type="button">
  Agendar demonstração
</button>
```

### CSS

```css
/* Base Button Styles */
.btn {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* Typography */
  font-family: var(--font-family-body);
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;

  /* Interaction */
  cursor: pointer;
  user-select: none;

  /* Border */
  border: none;
  border-radius: var(--radius-sm); /* 4px */

  /* Transition */
  transition: all var(--duration-fast) var(--ease-gentle);

  /* Baseline */
  position: relative;
  overflow: hidden;
}

/* Sizes */
.btn--sm {
  height: 36px;
  min-width: 80px;
  padding: 8px 16px;
  font-size: 14px;
  line-height: 20px;
}

.btn--md {
  height: 44px;
  min-width: 100px;
  padding: 12px 24px;
  font-size: 16px;
  line-height: 24px;
}

.btn--lg {
  height: 52px;
  min-width: 120px;
  padding: 14px 32px;
  font-size: 18px;
  line-height: 28px;
}

/* Variants */
.btn--primary {
  background-color: var(--color-interactive-primary); /* #8D4C00 */
  color: var(--color-text-on-dark); /* #EDE7E1 */
}

.btn--secondary {
  background-color: var(--color-interactive-secondary); /* #973E16 */
  color: var(--color-text-on-dark); /* #EDE7E1 */
}

.btn--tertiary {
  background-color: var(--color-brand-primary); /* #75201C */
  color: var(--color-text-on-dark); /* #EDE7E1 */
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-brand-primary); /* #75201C */
  border: 1px solid var(--color-brand-primary);
}

/* States - Hover */
.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* States - Active */
.btn:active:not(:disabled) {
  transform: scale(0.98);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* States - Focus */
.btn:focus-visible {
  outline: 3px solid var(--shadow-focus);
  outline-offset: 2px;
}

/* States - Disabled */
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* States - Loading */
.btn[aria-busy="true"] {
  opacity: 0.4;
  cursor: wait;
  pointer-events: none;
}

/* Full Width */
.btn--full-width {
  width: 100%;
  min-width: 100%;
}

/* Icons */
.btn__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.btn__icon--leading {
  margin-left: -4px;
}

.btn__icon--trailing {
  margin-right: -4px;
}

/* Loading Spinner */
.btn__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### React Example

```jsx
import React from 'react';
import { Download } from 'lucide-react';

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leadingIcon = null,
  trailingIcon = null,
  type = 'button',
  onClick,
  ariaLabel,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const fullWidthClass = fullWidth ? 'btn--full-width' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    fullWidthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn__spinner" aria-hidden="true"></span>
          <span className="sr-only">Processando...</span>
        </>
      ) : (
        <>
          {leadingIcon && (
            <span className="btn__icon btn__icon--leading" aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          {children}
          {trailingIcon && (
            <span className="btn__icon btn__icon--trailing" aria-hidden="true">
              {trailingIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

// Usage Examples
export const ButtonExamples = () => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    {/* Primary CTA */}
    <Button variant="primary" size="md">
      Ver meu ROI
    </Button>

    {/* Secondary with icon */}
    <Button variant="secondary" size="md" leadingIcon={<Download />}>
      Baixar relatório
    </Button>

    {/* Loading state */}
    <Button variant="primary" size="md" loading>
      Calculando...
    </Button>

    {/* Disabled */}
    <Button variant="primary" size="md" disabled>
      Começar agora
    </Button>

    {/* Ghost variant */}
    <Button variant="ghost" size="sm">
      Cancelar
    </Button>

    {/* Full width */}
    <Button variant="primary" size="lg" fullWidth>
      Agendar demonstração
    </Button>
  </div>
);

export default Button;
```

---

## Usage Examples

### Form Submission
```html
<form>
  <!-- Form fields -->
  <div style="display: flex; gap: 12px; margin-top: 24px;">
    <button class="btn btn--primary btn--md" type="submit">
      Salvar alterações
    </button>
    <button class="btn btn--ghost btn--md" type="button">
      Cancelar
    </button>
  </div>
</form>
```

### Action Groups
```html
<!-- Primary action with secondary alternative -->
<div style="display: flex; gap: 12px; align-items: center;">
  <button class="btn btn--primary btn--md">
    Começar teste grátis
  </button>
  <button class="btn btn--secondary btn--md">
    Agendar demonstração
  </button>
</div>
```

### Mobile Full-Width CTAs
```html
<!-- Mobile: stacked, full-width -->
<div class="cta-group">
  <button class="btn btn--primary btn--lg btn--full-width">
    Ver meu ROI
  </button>
  <button class="btn btn--ghost btn--md btn--full-width">
    Saber mais
  </button>
</div>

<style>
  .cta-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  @media (min-width: 768px) {
    .cta-group {
      flex-direction: row;
      width: auto;
    }

    .cta-group .btn--full-width {
      width: auto;
    }
  }
</style>
```

---

## Related Components

- **IconButton**: For icon-only actions (see icon-button.md)
- **Link**: For navigation and text-based actions (see link.md)
- **FloatingActionButton**: For primary mobile actions (future)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-13 | Initial specification |

---

**Design System**: Oitavo Café
**Component Type**: Action
**Status**: Ready for Implementation
