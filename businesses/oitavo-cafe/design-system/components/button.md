# Button

## Overview
Buttons are the primary interactive elements for user actions in the Oitavo Café Design System. They communicate clear, actionable choices that drive results and conversions. Use buttons for primary actions, form submissions, and calls-to-action that guide users toward business goals.

## Anatomy

```
┌─────────────────────────────────┐
│  [icon]  Começar Agora  [→]     │
└─────────────────────────────────┘
     ↑           ↑            ↑
  Leading     Label       Trailing
   Icon       Text         Icon
              (required)  (optional)
```

**Component Parts:**
- **Container**: Background, border, padding, shadow
- **Label Text**: Required, action-oriented verb
- **Leading Icon**: Optional, supports the action
- **Trailing Icon**: Optional, typically arrows for navigation
- **Focus Ring**: 3px outline for keyboard navigation

## Variants

| Variant | Use Case | Key Differences |
|---------|----------|-----------------|
| Primary | Main conversion actions (Começar, Agendar) | Solid Coffee Maroon background, high contrast, subtle shadow |
| Secondary | Alternative or supporting actions | Transparent background with Coffee Maroon border |
| Tertiary | Low-emphasis actions, navigation | No border, minimal styling, underline on hover |
| CTA (Call-to-Action) | High-impact conversion actions (limited use) | Golden Amber background, larger size, prominent shadow |

## Sizes

| Size | Height | Padding | Font Size | Token Reference |
|------|--------|---------|-----------|-----------------|
| sm | 36px | 8px 16px | 14px | var(--spacing-2) var(--spacing-4) |
| md | 48px | 12px 24px | 16px | var(--spacing-3) var(--spacing-5) |
| lg | 56px | 16px 32px | 18px | var(--spacing-4) var(--spacing-6) |

**Note:** Medium (md) is the default size. All sizes maintain minimum 48×48px touch target for accessibility.

## States

### Primary Variant

| State | Background | Border | Text | Shadow | Transform |
|-------|------------|--------|------|--------|-----------|
| default | var(--color-primary-700) | none | var(--color-support-cream-100) | var(--box-shadow-xs) | none |
| hover | var(--color-primary-600) | none | var(--color-support-cream-100) | var(--box-shadow-sm) | translateY(-1px) |
| active | var(--color-primary-800) | none | var(--color-support-cream-100) | inset 0 2px 4px rgba(0,0,0,0.2) | translateY(0) |
| focus | var(--color-primary-700) | 3px solid var(--color-accent-400) | var(--color-support-cream-100) | var(--box-shadow-focus) | none |
| disabled | var(--color-neutral-200) | none | var(--color-neutral-400) | none | none |
| loading | var(--color-primary-700) | none | var(--color-support-cream-100) | var(--box-shadow-xs) | none |

### Secondary Variant

| State | Background | Border | Text | Shadow |
|-------|------------|--------|------|--------|
| default | transparent | 2px solid var(--color-primary-700) | var(--color-primary-700) | none |
| hover | var(--color-primary-50) | 2px solid var(--color-primary-600) | var(--color-primary-600) | none |
| active | var(--color-primary-100) | 2px solid var(--color-primary-800) | var(--color-primary-800) | none |
| focus | transparent | 2px solid var(--color-primary-700) | var(--color-primary-700) | var(--box-shadow-focus) |
| disabled | transparent | 2px solid var(--color-neutral-300) | var(--color-neutral-400) | none |

### Tertiary Variant

| State | Background | Text | Text Decoration |
|-------|------------|------|-----------------|
| default | transparent | var(--color-primary-600) | none |
| hover | transparent | var(--color-primary-700) | underline |
| active | transparent | var(--color-primary-800) | underline |
| focus | transparent | var(--color-primary-600) | var(--box-shadow-focus) |
| disabled | transparent | var(--color-neutral-400) | none |

### CTA Variant

| State | Background | Text | Shadow |
|-------|------------|------|--------|
| default | var(--color-accent-600) | var(--color-support-cream-100) | 0 4px 8px rgba(141,76,0,0.2) |
| hover | var(--color-accent-500) | var(--color-support-cream-100) | 0 6px 12px rgba(141,76,0,0.3) |
| active | var(--color-accent-700) | var(--color-support-cream-100) | inset 0 2px 4px rgba(0,0,0,0.2) |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' \| 'cta' | 'primary' | Visual style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| disabled | boolean | false | Disabled state |
| loading | boolean | false | Loading state with spinner |
| fullWidth | boolean | false | Expand to full width (mobile) |
| leftIcon | ReactNode | - | Icon before label text |
| rightIcon | ReactNode | - | Icon after label text |
| type | 'button' \| 'submit' \| 'reset' | 'button' | HTML button type |
| onClick | function | - | Click handler function |

## Accessibility

### Keyboard Navigation
| Key | Action |
|-----|--------|
| Enter / Space | Activate button |
| Tab | Move focus to next focusable element |
| Shift + Tab | Move focus to previous focusable element |

### ARIA Attributes
- **role**: Implicit from `<button>` element (do not override)
- **aria-disabled**: Set to `"true"` when disabled (maintains tab order)
- **aria-busy**: Set to `"true"` when in loading state
- **aria-label**: Required for icon-only buttons (provide descriptive label)
- **aria-describedby**: Use to associate helper text or additional context

### Screen Reader Behavior
- Default: Announces "[Label text], button"
- Disabled: Announces "[Label text], button, disabled"
- Loading: Announces "[Label text], button, loading" or "Carregando, button"
- Icon-only: Announces "[aria-label], button"

### WCAG Compliance
- Minimum touch target: 48×48px (WCAG 2.5.5 Level AAA)
- Color contrast: 4.5:1 minimum for all states (WCAG AA)
- Focus indicator: 3px outline with 2px offset, clearly visible (WCAG 2.4.7)
- Text not in all caps (better readability)

## Usage Guidelines

### ✅ Do
- Use primary buttons for main conversion actions (Começar, Agendar, Ver ROI)
- Use action verbs that are clear and results-focused
- Limit to 1 primary button per section to maintain visual hierarchy
- Ensure 48×48px minimum touch target on all devices
- Use full-width buttons on mobile (<640px) for better touch ergonomics
- Provide clear feedback on loading states
- Explain why a button is disabled (tooltip or helper text)

### ❌ Don't
- Don't use multiple primary buttons in the same context (creates decision paralysis)
- Don't use vague labels like "Click here", "Submit", or "OK"
- Don't use all caps for button text (reduces readability, feels aggressive)
- Don't make buttons smaller than 36px height
- Don't use more than 2 CTA buttons per page (Golden Amber is reserved for highest-value actions)
- Don't disable buttons without explanation (confuses users)
- Don't rely on color alone to convey meaning (use icons and text)

## Code Examples

### HTML

```html
<!-- Primary Button (Default) -->
<button class="btn btn-primary btn-md" type="button">
  Ver meu ROI
</button>

<!-- Secondary Button with Icon -->
<button class="btn btn-secondary btn-md" type="button">
  <svg class="btn-icon-left">...</svg>
  Agendar Reunião
</button>

<!-- CTA Button -->
<button class="btn btn-cta btn-lg" type="submit">
  Começar Agora
  <svg class="btn-icon-right">→</svg>
</button>

<!-- Disabled Button -->
<button class="btn btn-primary btn-md" type="button" aria-disabled="true" disabled>
  Indisponível
</button>

<!-- Loading Button -->
<button class="btn btn-primary btn-md" type="button" aria-busy="true">
  <span class="btn-spinner"></span>
  Carregando...
</button>
```

### CSS

```css
/* Primary Button */
.btn-primary {
  background: var(--color-primary-700);
  color: var(--color-support-cream-100);
  padding: var(--spacing-3) var(--spacing-5);
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  min-height: 48px;
  min-width: 120px;
  box-shadow: var(--box-shadow-xs);
  transition: all var(--duration-fast) var(--easing-ease-out);
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--color-primary-600);
  box-shadow: var(--box-shadow-sm);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: var(--color-primary-800);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: 3px solid var(--color-accent-400);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background: var(--color-neutral-200);
  color: var(--color-neutral-400);
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--color-primary-700);
  padding: calc(var(--spacing-3) - 2px) calc(var(--spacing-5) - 2px);
  border: 2px solid var(--color-primary-700);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  min-height: 48px;
  min-width: 120px;
  transition: all var(--duration-fast) var(--easing-ease-out);
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary-600);
  color: var(--color-primary-600);
}

/* CTA Button */
.btn-cta {
  background: var(--color-accent-600);
  color: var(--color-support-cream-100);
  padding: var(--spacing-4) var(--spacing-6);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  min-height: 56px;
  min-width: 160px;
  box-shadow: 0 4px 8px rgba(141, 76, 0, 0.2);
  transition: all var(--duration-fast) var(--easing-ease-out);
  cursor: pointer;
}

.btn-cta:hover {
  background: var(--color-accent-500);
  box-shadow: 0 6px 12px rgba(141, 76, 0, 0.3);
  transform: translateY(-1px);
}

/* Mobile: Full-width buttons */
@media (max-width: 640px) {
  .btn {
    width: 100%;
  }
}
```

### React Component Example

```jsx
import React from 'react';
import './Button.css';

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  type = 'button',
  onClick,
  children,
  ...props
}) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full-width',
    loading && 'btn-loading',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-spinner" aria-hidden="true"></span>
          Carregando...
        </>
      ) : (
        <>
          {leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
```

## Related Components
- **IconButton** - Icon-only button variant for compact actions
- **Link** - For navigation (use links, not buttons, for page navigation)
- **Card** - Cards often contain buttons in their footer
- **Form** - Buttons are essential for form submission
