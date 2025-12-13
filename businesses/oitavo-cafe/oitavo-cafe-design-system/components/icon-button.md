# IconButton Component Specification

## Overview

IconButtons are compact, icon-only action elements designed for space-constrained interfaces, toolbars, and mobile experiences. They maintain the same interaction patterns as standard Buttons but communicate action through iconography alone, requiring thoughtful use of accessible labels.

**Design Principle**: Icon-only buttons save space but must always be semantically clear. When in doubt, use a full Button with icon + label.

---

## Anatomy

```
┌─────────┐
│         │
│  Icon   │ ← IconButton Container
│         │
└─────────┘
     ↑
  SVG Icon
  (Required)

Components:
- Container: Circular or rounded square
- Icon: SVG or icon component (20x20px or 24x24px)
- Focus Ring: 3px outline for keyboard navigation
- Background: Filled or transparent based on variant
```

---

## Variants

| Variant | Use Case | Background | Icon Color | Border |
|---------|----------|------------|------------|--------|
| **Primary** | High-emphasis icon actions | `var(--color-interactive-primary)` (#8D4C00) | `var(--color-text-on-dark)` (#EDE7E1) | None |
| **Secondary** | Medium-emphasis icon actions | `var(--color-interactive-secondary)` (#973E16) | `var(--color-text-on-dark)` (#EDE7E1) | None |
| **Tertiary** | Lower-emphasis actions | `var(--color-brand-primary)` (#75201C) | `var(--color-text-on-dark)` (#EDE7E1) | None |
| **Ghost** | Minimal, low-emphasis actions | Transparent | `var(--color-brand-primary)` (#75201C) | None (hover adds background) |

**Visual Hierarchy**: Primary > Secondary > Tertiary > Ghost

**Note**: Ghost is the most common variant for IconButtons (e.g., toolbar actions, close buttons, overflow menus).

---

## Sizes

| Size | Container Size | Icon Size | Touch Target | Padding |
|------|----------------|-----------|--------------|---------|
| **Small** | 32px × 32px | 16px × 16px | 40px × 40px* | 8px |
| **Medium** | 44px × 44px | 20px × 20px | 44px × 44px | 12px |
| **Large** | 52px × 52px | 24px × 24px | 52px × 52px | 14px |

\* Small size uses additional invisible padding/margin to meet 44x44px minimum touch target on mobile

**Notes**:
- Medium is the default size
- All sizes meet minimum 44x44px touch target requirement
- Border radius: `var(--radius-sm)` (4px) for square variant, 50% for circular

---

## Shapes

| Shape | Border Radius | Use Case |
|-------|---------------|----------|
| **Square** | `var(--radius-sm)` (4px) | Default, general actions |
| **Circle** | 50% | FABs, media controls, special emphasis |

**Recommendation**: Use square by default for consistency with Button component. Use circle sparingly for floating actions or media playback.

---

## States

| State | Visual Changes | Interaction | CSS Properties |
|-------|----------------|-------------|----------------|
| **Default** | Base styling per variant | Interactive | Base colors, cursor: pointer |
| **Hover** | Background lightens/darkens + subtle lift | Pointer over button | Ghost: adds background; Others: `filter: brightness(1.1)`, `transform: translateY(-1px)` |
| **Active** | Pressed effect | Click/tap | `transform: scale(0.95)`, subtle shadow |
| **Focus** | Focus ring appears | Keyboard navigation | `outline: 3px solid var(--shadow-focus)`, `outline-offset: 2px` |
| **Disabled** | Reduced opacity, no interaction | Cannot interact | `opacity: 0.4`, `cursor: not-allowed`, no hover/active |
| **Selected** | Persistent highlight (toggle state) | Toggled on | Background: 10% tint of primary color, icon remains same color |

**Transition**: All state changes use `var(--duration-fast)` (200ms) with `var(--ease-gentle)` easing.

### Ghost Variant Hover

Ghost variant gets subtle background on hover:
- **Hover background**: `rgba(117, 32, 28, 0.08)` (8% opacity of brand-primary)
- **Active background**: `rgba(117, 32, 28, 0.15)` (15% opacity of brand-primary)

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost'` | `'ghost'` | No | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `shape` | `'square' \| 'circle'` | `'square'` | No | Container shape |
| `disabled` | `boolean` | `false` | No | Disables button interaction |
| `selected` | `boolean` | `false` | No | Toggle selected state (for toggle buttons) |
| `icon` | `ReactNode \| string` | - | Yes | Icon component or SVG |
| `ariaLabel` | `string` | - | **Yes** | Required accessible label |
| `ariaPressed` | `boolean` | `undefined` | No | For toggle buttons (true/false/undefined) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | HTML button type |
| `onClick` | `(event: Event) => void` | `undefined` | No | Click handler |
| `className` | `string` | `''` | No | Additional CSS classes |

---

## Accessibility

### Critical Requirement

**IconButtons MUST have `aria-label`** since there is no visible text label. This is non-negotiable for screen reader users.

### Keyboard Navigation
- **Tab**: Focus next/previous button
- **Enter/Space**: Activate button
- **Shift + Tab**: Focus previous button

### ARIA Attributes

```html
<!-- Standard icon button -->
<button
  type="button"
  class="icon-btn"
  aria-label="Fechar modal">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<!-- Toggle button (e.g., favorite) -->
<button
  type="button"
  class="icon-btn"
  aria-label="Adicionar aos favoritos"
  aria-pressed="false">
  <svg aria-hidden="true"><!-- Heart icon --></svg>
</button>

<!-- Toggle button (pressed) -->
<button
  type="button"
  class="icon-btn icon-btn--selected"
  aria-label="Remover dos favoritos"
  aria-pressed="true">
  <svg aria-hidden="true"><!-- Filled heart icon --></svg>
</button>

<!-- Disabled state -->
<button
  type="button"
  class="icon-btn"
  disabled
  aria-disabled="true"
  aria-label="Compartilhar (indisponível)">
  <svg aria-hidden="true"><!-- Share icon --></svg>
</button>
```

### Screen Reader Considerations
- **Always** provide descriptive `aria-label`
- Icon element should have `aria-hidden="true"` to prevent double-announcement
- Toggle buttons use `aria-pressed` (true/false)
- For expandable menus, use `aria-expanded` (true/false)
- Disabled state should explain why in `aria-label` when possible

### Focus Management
- Visible focus indicator (3px ring) meets WCAG 2.2 AA
- Focus ring color: `var(--shadow-focus)` with sufficient contrast
- Focus not trapped (can navigate away)

---

## Guidelines

### Do ✓

- **Always provide `aria-label`**: Required for screen readers
- **Use universally recognized icons**: Close (X), Menu (☰), Search (🔍), etc.
- **Consider tooltips**: Add tooltip on hover for additional context
- **Group related actions**: Use consistent spacing and alignment
- **Match icon to action**: Icon should clearly represent the action
- **Use Ghost variant by default**: Unless action needs strong emphasis

### Don't ✗

- **Don't omit `aria-label`**: This makes the button unusable for screen readers
- **Don't use obscure icons**: If users won't recognize it, use a labeled Button
- **Don't mix shapes inconsistently**: Stick to square OR circle per context
- **Don't overuse Primary variant**: Reserve for truly critical icon actions
- **Don't make icons too small**: Minimum 16px, prefer 20px or 24px
- **Don't forget touch targets**: Ensure 44x44px minimum on mobile

### Common Use Cases

| Use Case | Variant | Icon Example | aria-label Example |
|----------|---------|--------------|-------------------|
| Close modal/drawer | Ghost | X | "Fechar modal" |
| Open menu | Ghost | ☰ | "Abrir menu" |
| Edit item | Ghost | Pencil | "Editar item" |
| Delete item | Ghost | Trash | "Excluir item" |
| Favorite toggle | Ghost | Heart | "Adicionar aos favoritos" / "Remover dos favoritos" |
| Share | Secondary | Share | "Compartilhar" |
| Download | Secondary | Download | "Baixar relatório" |
| Primary action (FAB) | Primary | + | "Adicionar novo item" |

---

## Code Examples

### HTML + CSS

```html
<!-- Ghost IconButton (Default) -->
<button class="icon-btn icon-btn--ghost icon-btn--md" type="button" aria-label="Fechar modal">
  <svg class="icon-btn__icon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
  </svg>
</button>

<!-- Primary IconButton (Circle) -->
<button class="icon-btn icon-btn--primary icon-btn--md icon-btn--circle" type="button" aria-label="Adicionar novo item">
  <svg class="icon-btn__icon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
  </svg>
</button>

<!-- Toggle Button (Selected) -->
<button
  class="icon-btn icon-btn--ghost icon-btn--md icon-btn--selected"
  type="button"
  aria-label="Remover dos favoritos"
  aria-pressed="true">
  <svg class="icon-btn__icon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
  </svg>
</button>

<!-- Small IconButton -->
<button class="icon-btn icon-btn--ghost icon-btn--sm" type="button" aria-label="Editar">
  <svg class="icon-btn__icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>
</button>

<!-- Disabled IconButton -->
<button class="icon-btn icon-btn--ghost icon-btn--md" type="button" disabled aria-label="Compartilhar (indisponível)" aria-disabled="true">
  <svg class="icon-btn__icon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>
</button>
```

### CSS

```css
/* Base IconButton Styles */
.icon-btn {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Remove default button styles */
  border: none;
  background: transparent;
  padding: 0;

  /* Interaction */
  cursor: pointer;
  user-select: none;

  /* Border radius (default square) */
  border-radius: var(--radius-sm); /* 4px */

  /* Transition */
  transition: all var(--duration-fast) var(--ease-gentle);

  /* Position for focus ring */
  position: relative;
}

/* Sizes */
.icon-btn--sm {
  width: 32px;
  height: 32px;
  padding: 8px;
  /* Expand touch target on mobile */
  min-width: 40px;
  min-height: 40px;
}

.icon-btn--md {
  width: 44px;
  height: 44px;
  padding: 12px;
}

.icon-btn--lg {
  width: 52px;
  height: 52px;
  padding: 14px;
}

/* Shapes */
.icon-btn--square {
  border-radius: var(--radius-sm); /* 4px */
}

.icon-btn--circle {
  border-radius: 50%;
}

/* Icon */
.icon-btn__icon {
  flex-shrink: 0;
  color: currentColor;
}

.icon-btn--sm .icon-btn__icon {
  width: 16px;
  height: 16px;
}

.icon-btn--md .icon-btn__icon {
  width: 20px;
  height: 20px;
}

.icon-btn--lg .icon-btn__icon {
  width: 24px;
  height: 24px;
}

/* Variants */
.icon-btn--primary {
  background-color: var(--color-interactive-primary); /* #8D4C00 */
  color: var(--color-text-on-dark); /* #EDE7E1 */
}

.icon-btn--secondary {
  background-color: var(--color-interactive-secondary); /* #973E16 */
  color: var(--color-text-on-dark); /* #EDE7E1 */
}

.icon-btn--tertiary {
  background-color: var(--color-brand-primary); /* #75201C */
  color: var(--color-text-on-dark); /* #EDE7E1 */
}

.icon-btn--ghost {
  background-color: transparent;
  color: var(--color-brand-primary); /* #75201C */
}

/* States - Hover (Ghost) */
.icon-btn--ghost:hover:not(:disabled) {
  background-color: rgba(117, 32, 28, 0.08); /* 8% brand-primary */
  transform: translateY(-1px);
}

/* States - Hover (Filled variants) */
.icon-btn--primary:hover:not(:disabled),
.icon-btn--secondary:hover:not(:disabled),
.icon-btn--tertiary:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* States - Active */
.icon-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.icon-btn--ghost:active:not(:disabled) {
  background-color: rgba(117, 32, 28, 0.15); /* 15% brand-primary */
}

/* States - Focus */
.icon-btn:focus-visible {
  outline: 3px solid var(--shadow-focus);
  outline-offset: 2px;
}

/* States - Disabled */
.icon-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* States - Selected (Toggle) */
.icon-btn--selected {
  background-color: rgba(141, 76, 0, 0.1); /* 10% interactive-primary */
}

.icon-btn--ghost.icon-btn--selected {
  background-color: rgba(117, 32, 28, 0.12); /* 12% brand-primary */
  color: var(--color-brand-primary);
}

.icon-btn--ghost.icon-btn--selected:hover:not(:disabled) {
  background-color: rgba(117, 32, 28, 0.18); /* 18% brand-primary */
}
```

### React Example

```jsx
import React from 'react';
import { X, Menu, Heart, Share2, Download, Plus, Edit2 } from 'lucide-react';

const IconButton = ({
  variant = 'ghost',
  size = 'md',
  shape = 'square',
  disabled = false,
  selected = false,
  icon,
  ariaLabel,
  ariaPressed,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  if (!ariaLabel) {
    console.error('IconButton: aria-label is required for accessibility');
  }

  const baseClass = 'icon-btn';
  const variantClass = `icon-btn--${variant}`;
  const sizeClass = `icon-btn--${size}`;
  const shapeClass = `icon-btn--${shape}`;
  const selectedClass = selected ? 'icon-btn--selected' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    shapeClass,
    selectedClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      onClick={onClick}
      {...props}
    >
      <span className="icon-btn__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
};

// Usage Examples
export const IconButtonExamples = () => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      {/* Close button (most common) */}
      <IconButton
        variant="ghost"
        size="md"
        icon={<X />}
        ariaLabel="Fechar modal"
      />

      {/* Menu button */}
      <IconButton
        variant="ghost"
        size="md"
        icon={<Menu />}
        ariaLabel="Abrir menu"
      />

      {/* Edit button */}
      <IconButton
        variant="ghost"
        size="sm"
        icon={<Edit2 />}
        ariaLabel="Editar item"
      />

      {/* Toggle favorite button */}
      <IconButton
        variant="ghost"
        size="md"
        icon={<Heart fill={isFavorite ? 'currentColor' : 'none'} />}
        ariaLabel={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        ariaPressed={isFavorite}
        selected={isFavorite}
        onClick={() => setIsFavorite(!isFavorite)}
      />

      {/* Share button (secondary) */}
      <IconButton
        variant="secondary"
        size="md"
        icon={<Share2 />}
        ariaLabel="Compartilhar"
      />

      {/* Download button */}
      <IconButton
        variant="secondary"
        size="md"
        icon={<Download />}
        ariaLabel="Baixar relatório"
      />

      {/* FAB (circular primary) */}
      <IconButton
        variant="primary"
        size="md"
        shape="circle"
        icon={<Plus />}
        ariaLabel="Adicionar novo item"
      />

      {/* Disabled */}
      <IconButton
        variant="ghost"
        size="md"
        icon={<Share2 />}
        ariaLabel="Compartilhar (indisponível)"
        disabled
      />
    </div>
  );
};

export default IconButton;
```

---

## Usage Examples

### Toolbar Actions
```html
<!-- App header toolbar -->
<header class="app-header">
  <button class="icon-btn icon-btn--ghost icon-btn--md" aria-label="Abrir menu">
    <svg class="icon-btn__icon" aria-hidden="true"><!-- Menu icon --></svg>
  </button>

  <h1>Oitavo Café</h1>

  <div class="toolbar-actions">
    <button class="icon-btn icon-btn--ghost icon-btn--md" aria-label="Buscar">
      <svg class="icon-btn__icon" aria-hidden="true"><!-- Search icon --></svg>
    </button>
    <button class="icon-btn icon-btn--ghost icon-btn--md" aria-label="Notificações">
      <svg class="icon-btn__icon" aria-hidden="true"><!-- Bell icon --></svg>
    </button>
    <button class="icon-btn icon-btn--ghost icon-btn--md" aria-label="Perfil">
      <svg class="icon-btn__icon" aria-hidden="true"><!-- User icon --></svg>
    </button>
  </div>
</header>
```

### Modal/Drawer Close
```html
<!-- Modal with close button -->
<div class="modal" role="dialog" aria-labelledby="modal-title">
  <div class="modal__header">
    <h2 id="modal-title">Calcular ROI</h2>
    <button class="icon-btn icon-btn--ghost icon-btn--md" aria-label="Fechar modal">
      <svg class="icon-btn__icon" aria-hidden="true"><!-- X icon --></svg>
    </button>
  </div>
  <!-- Modal content -->
</div>
```

### Action List (Edit/Delete)
```html
<!-- Item with action buttons -->
<div class="list-item">
  <div class="list-item__content">
    <h3>Produto XYZ</h3>
    <p>Descrição do produto</p>
  </div>
  <div class="list-item__actions">
    <button class="icon-btn icon-btn--ghost icon-btn--sm" aria-label="Editar Produto XYZ">
      <svg class="icon-btn__icon" aria-hidden="true"><!-- Edit icon --></svg>
    </button>
    <button class="icon-btn icon-btn--ghost icon-btn--sm" aria-label="Excluir Produto XYZ">
      <svg class="icon-btn__icon" aria-hidden="true"><!-- Trash icon --></svg>
    </button>
  </div>
</div>
```

### Floating Action Button (FAB)
```html
<!-- FAB for primary mobile action -->
<button
  class="icon-btn icon-btn--primary icon-btn--lg icon-btn--circle fab"
  aria-label="Adicionar novo produto">
  <svg class="icon-btn__icon" aria-hidden="true"><!-- Plus icon --></svg>
</button>

<style>
  .fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    z-index: 1000;
  }

  .fab:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
</style>
```

---

## Tooltip Integration

IconButtons should often include tooltips for additional context:

```html
<!-- IconButton with tooltip -->
<button
  class="icon-btn icon-btn--ghost icon-btn--md"
  aria-label="Compartilhar relatório"
  data-tooltip="Compartilhar">
  <svg class="icon-btn__icon" aria-hidden="true"><!-- Share icon --></svg>
</button>
```

**Note**: Tooltip text should match or complement `aria-label` for consistency between visual and screen reader experiences.

---

## Related Components

- **Button**: For labeled actions (see button.md)
- **Tooltip**: For providing context on hover (future)
- **FloatingActionButton**: Specialized FAB variant (future)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-13 | Initial specification |

---

**Design System**: Oitavo Café
**Component Type**: Action
**Status**: Ready for Implementation
