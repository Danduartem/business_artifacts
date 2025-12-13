# Tooltip Component

## Overview

Small contextual popups that appear on hover or focus to provide additional information about an element. Tooltips are non-interactive overlays that help users understand interface elements, shortcuts, or disabled states without cluttering the primary UI.

**When to use:**
- Explain icon-only buttons
- Provide keyboard shortcuts
- Clarify disabled state reasons
- Show full text when truncated
- Add context to complex features

**When not to use:**
- Critical information (use visible text instead)
- Interactive content (use Popover instead)
- Mobile interfaces (no hover state - use inline text)
- Long explanations (use Popover or help documentation)

## Anatomy

```
                    ┌────────────────────────┐
                    │  Tooltip message text  │
                    └───────────▼────────────┘
                           [Target]

Components:
1. Container - Floating dark box
2. Text - Concise description
3. Arrow - Pointer to target element
4. Target - Element that triggers tooltip
```

## Variants

### Default (Dark)
```css
Background: var(--neutral-900) /* #1A1817 */
Text: var(--color-white) /* #FFFFFF */
Shadow: var(--elevation-overlay)
Opacity: 0.95
```

### Light
```css
Background: var(--color-white)
Text: var(--neutral-800) /* #2B2523 */
Border: 1px solid var(--neutral-300)
Shadow: var(--elevation-floating)
```

### Brand
```css
Background: var(--primary-700) /* #75201C */
Text: var(--color-white)
Shadow: var(--elevation-overlay)
```

## Sizes

### Default
```css
Padding: var(--spacing-2) var(--spacing-3) /* 8px 12px */
Font size: var(--font-size-sm) /* 13px */
Line height: var(--line-height-relaxed) /* 1.6 */
Max width: 280px
Border radius: var(--border-radius-sm) /* 4px */
```

### Compact
```css
Padding: var(--spacing-1) var(--spacing-2) /* 4px 8px */
Font size: var(--font-size-xs) /* 10px */
Max width: 200px
Border radius: var(--border-radius-sm)
```

### Large
```css
Padding: var(--spacing-3) var(--spacing-4) /* 12px 16px */
Font size: var(--font-size-base) /* 16px */
Max width: 320px
Border radius: var(--border-radius-md) /* 8px */
```

## Positioning

### Preferred Positions (Auto-flip)
```
Priority order:
1. Top (default)
2. Bottom (if no space above)
3. Right (if no space top/bottom)
4. Left (last resort)

Auto-positioning ensures tooltip stays in viewport
```

### Position Styles
```css
/* Top */
Bottom: calc(100% + 8px)
Arrow: Bottom center, pointing down

/* Bottom */
Top: calc(100% + 8px)
Arrow: Top center, pointing up

/* Right */
Left: calc(100% + 8px)
Arrow: Left center, pointing left

/* Left */
Right: calc(100% + 8px)
Arrow: Right center, pointing right
```

### Arrow Styles
```css
Width: 8px
Height: 8px
Transform: rotate(45deg)
Background: Same as tooltip
Position: Absolute, centered on tooltip edge
```

## States

### Hidden (Default)
```css
Opacity: 0
Pointer events: none
Transform: translateY(4px) /* or appropriate direction */
```

### Showing
```css
Animation: tooltip-enter
Duration: var(--duration-fast) /* 200ms */
Easing: var(--ease-decelerate)
Delay: 300ms /* Prevent accidental triggers */

Properties:
  - opacity: 0 → 1
  - transform: translateY(4px) → translateY(0)
```

### Visible
```css
Opacity: 1
Pointer events: none /* Tooltip is not interactive */
Z-index: var(--z-index-tooltip) /* 700 */
```

### Hiding
```css
Animation: tooltip-exit
Duration: var(--duration-fast) /* 150ms */
Easing: var(--ease-accelerate)
Delay: 0ms /* Hide immediately on mouse leave */

Properties:
  - opacity: 1 → 0
  - transform: translateY(0) → translateY(4px)
```

## Animation

### Entry Animation
```css
@keyframes tooltip-enter {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Position-specific transforms */
/* Top */
from { transform: translateY(4px); }

/* Bottom */
from { transform: translateY(-4px); }

/* Right */
from { transform: translateX(-4px); }

/* Left */
from { transform: translateX(4px); }

Duration: var(--duration-fast) /* 200ms */
Easing: var(--ease-decelerate)
Delay: 300ms
```

### Exit Animation
```css
@keyframes tooltip-exit {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(4px);
  }
}

Duration: var(--duration-fast) /* 150ms */
Easing: var(--ease-accelerate)
Delay: 0ms
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .tooltip {
    animation: tooltip-fade-only var(--duration-micro) ease;
  }

  @keyframes tooltip-fade-only {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

## Timing

```typescript
const TOOLTIP_TIMING = {
  showDelay: 300,    // 300ms hover before showing
  hideDelay: 0,      // Hide immediately on leave
  duration: 200,     // 200ms animation duration
};

// Rationale:
// - Show delay prevents tooltips on accidental hover
// - No hide delay = responsive feel
// - Quick animation = not sluggish
```

## Props/API

```typescript
interface TooltipProps {
  /** Tooltip content (string or React node) */
  content: React.ReactNode;

  /** Preferred position */
  position?: 'top' | 'bottom' | 'left' | 'right';

  /** Enable auto-positioning */
  autoPosition?: boolean;

  /** Show delay in milliseconds */
  showDelay?: number;

  /** Hide delay in milliseconds */
  hideDelay?: number;

  /** Variant style */
  variant?: 'dark' | 'light' | 'brand';

  /** Size preset */
  size?: 'compact' | 'default' | 'large';

  /** Show arrow pointer */
  showArrow?: boolean;

  /** Disable tooltip */
  disabled?: boolean;

  /** Additional CSS class */
  className?: string;

  /** Target element */
  children: React.ReactElement;
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Trigger element -->
<button
  aria-describedby="tooltip-id"
  data-tooltip-trigger
>
  Icon
</button>

<!-- Tooltip -->
<div
  id="tooltip-id"
  role="tooltip"
  aria-hidden="false"
>
  Tooltip content
</div>
```

### Keyboard Navigation
- **Hover**: Show tooltip on mouse enter
- **Focus**: Show tooltip when trigger receives keyboard focus
- **Escape**: Hide tooltip (optional)
- **Tab**: Move to next element (tooltip not interactive)

### Screen Reader Considerations
- Tooltip content announced when trigger receives focus
- Use `aria-describedby` to link tooltip to trigger
- Don't rely on tooltip for critical information
- Ensure tooltip content is concise and clear
- Tooltip stays visible while trigger has focus

### Focus Management
```typescript
// Show on focus (keyboard users)
trigger.addEventListener('focus', showTooltip);

// Hide on blur
trigger.addEventListener('blur', hideTooltip);

// Show on mouseenter (mouse users)
trigger.addEventListener('mouseenter', showTooltip);

// Hide on mouseleave
trigger.addEventListener('mouseleave', hideTooltip);
```

## Usage Guidelines

### Do's

✓ **Keep tooltips concise**
  - 1-2 lines maximum
  - 5-10 words ideal
  - "Salvar alterações (Ctrl+S)" not an essay

✓ **Use for supplementary information**
  - Additional context, not critical info
  - Keyboard shortcuts
  - Icon meanings

✓ **Provide clear, specific text**
  - "Exportar relatório em PDF" ✓
  - "Exportar" ✗ (too vague)

✓ **Use delay before showing**
  - 300ms prevents accidental triggers
  - Feels intentional, not jumpy

✓ **Make triggers keyboard accessible**
  - Tooltips must show on focus
  - Essential for keyboard users

### Don'ts

✗ **Don't put critical information in tooltips**
  - Users may miss hover-only content
  - Screen readers need visible text

✗ **Don't make tooltips interactive**
  - No buttons, links, or forms
  - Use Popover for interactive content

✗ **Don't use on mobile without adaptation**
  - No hover state on touch devices
  - Use tap-to-show or inline text instead

✗ **Don't show multiple tooltips simultaneously**
  - Confusing and cluttered
  - Hide previous before showing new

✗ **Don't use for long explanations**
  - Max 2 lines / 280px width
  - Use Popover or help documentation

## Code Examples

### Basic Tooltip

```html
<div class="tooltip-wrapper">
  <button
    class="icon-button"
    aria-describedby="tooltip-save"
    data-tooltip-trigger
  >
    <svg><use href="#icon-save"></use></svg>
  </button>

  <div
    id="tooltip-save"
    class="tooltip tooltip--top"
    role="tooltip"
    aria-hidden="true"
  >
    Salvar alterações (Ctrl+S)
    <div class="tooltip__arrow"></div>
  </div>
</div>
```

```css
.tooltip {
  position: absolute;
  z-index: var(--z-index-tooltip);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--neutral-900);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--elevation-overlay);
  max-width: 280px;
  width: max-content;
  opacity: 0;
  pointer-events: none;

  transition:
    opacity var(--duration-fast) var(--ease-decelerate),
    transform var(--duration-fast) var(--ease-decelerate);
}

/* Positions */
.tooltip--top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
}

.tooltip--bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
}

.tooltip--left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) translateX(4px);
}

.tooltip--right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) translateX(-4px);
}

/* Visible state */
.tooltip--visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0); /* Adjust per position */
}

/* Arrow */
.tooltip__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--neutral-900);
  transform: rotate(45deg);
}

.tooltip--top .tooltip__arrow {
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
}

.tooltip--bottom .tooltip__arrow {
  top: -4px;
  left: 50%;
  margin-left: -4px;
}

.tooltip--left .tooltip__arrow {
  right: -4px;
  top: 50%;
  margin-top: -4px;
}

.tooltip--right .tooltip__arrow {
  left: -4px;
  top: 50%;
  margin-top: -4px;
}

/* Variants */
.tooltip--light {
  background: var(--color-white);
  color: var(--neutral-800);
  border: 1px solid var(--neutral-300);
  box-shadow: var(--elevation-floating);
}

.tooltip--light .tooltip__arrow {
  background: var(--color-white);
  border-right: 1px solid var(--neutral-300);
  border-bottom: 1px solid var(--neutral-300);
}

.tooltip--brand {
  background: var(--primary-700);
  color: var(--color-white);
}

.tooltip--brand .tooltip__arrow {
  background: var(--primary-700);
}
```

### JavaScript Controller

```javascript
class TooltipController {
  constructor(trigger, tooltip, options = {}) {
    this.trigger = trigger;
    this.tooltip = tooltip;
    this.options = {
      showDelay: 300,
      hideDelay: 0,
      position: 'top',
      autoPosition: true,
      ...options,
    };

    this.showTimeout = null;
    this.hideTimeout = null;

    this.init();
  }

  init() {
    // Mouse events
    this.trigger.addEventListener('mouseenter', () => this.scheduleShow());
    this.trigger.addEventListener('mouseleave', () => this.scheduleHide());

    // Keyboard events
    this.trigger.addEventListener('focus', () => this.scheduleShow());
    this.trigger.addEventListener('blur', () => this.scheduleHide());

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });
  }

  scheduleShow() {
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => {
      this.show();
    }, this.options.showDelay);
  }

  scheduleHide() {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, this.options.hideDelay);
  }

  show() {
    if (this.options.autoPosition) {
      this.updatePosition();
    }

    this.tooltip.classList.add('tooltip--visible');
    this.tooltip.setAttribute('aria-hidden', 'false');
  }

  hide() {
    this.tooltip.classList.remove('tooltip--visible');
    this.tooltip.setAttribute('aria-hidden', 'true');
  }

  updatePosition() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let position = this.options.position;

    // Check if tooltip fits in preferred position
    if (position === 'top' && triggerRect.top < tooltipRect.height + 16) {
      position = 'bottom';
    } else if (position === 'bottom' && viewportHeight - triggerRect.bottom < tooltipRect.height + 16) {
      position = 'top';
    } else if (position === 'left' && triggerRect.left < tooltipRect.width + 16) {
      position = 'right';
    } else if (position === 'right' && viewportWidth - triggerRect.right < tooltipRect.width + 16) {
      position = 'left';
    }

    // Update tooltip class
    this.tooltip.className = this.tooltip.className.replace(/tooltip--\w+/, `tooltip--${position}`);
  }
}

// Initialize all tooltips
document.querySelectorAll('[data-tooltip-trigger]').forEach((trigger) => {
  const tooltipId = trigger.getAttribute('aria-describedby');
  const tooltip = document.getElementById(tooltipId);

  if (tooltip) {
    new TooltipController(trigger, tooltip);
  }
});
```

### React Component

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';

interface TooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  showDelay?: number;
  hideDelay?: number;
  variant?: 'dark' | 'light' | 'brand';
  showArrow?: boolean;
  disabled?: boolean;
  children: React.ReactElement;
}

export function Tooltip({
  content,
  position = 'top',
  showDelay = 300,
  hideDelay = 0,
  variant = 'dark',
  showArrow = true,
  disabled = false,
  children,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const showTimeoutRef = useRef<number>();
  const hideTimeoutRef = useRef<number>();

  const { refs, floatingStyles, placement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const handleMouseEnter = () => {
    if (disabled) return;
    clearTimeout(hideTimeoutRef.current);
    showTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, showDelay);
  };

  const handleMouseLeave = () => {
    clearTimeout(showTimeoutRef.current);
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, hideDelay);
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(showTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const tooltipId = useId();

  return (
    <>
      {React.cloneElement(children, {
        ref: refs.setReference,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        'aria-describedby': isOpen ? tooltipId : undefined,
      })}

      {isOpen && (
        <div
          ref={refs.setFloating}
          id={tooltipId}
          role="tooltip"
          className={`tooltip tooltip--${variant}`}
          style={floatingStyles}
        >
          {content}
          {showArrow && (
            <div className="tooltip__arrow" data-placement={placement} />
          )}
        </div>
      )}
    </>
  );
}

// Hook version
export function useTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, show, hide, toggle };
}
```

### Usage Examples

```tsx
// Basic tooltip
<Tooltip content="Salvar alterações (Ctrl+S)">
  <button className="icon-button">
    <SaveIcon />
  </button>
</Tooltip>

// Custom position
<Tooltip content="Filtrar resultados" position="bottom">
  <button>
    <FilterIcon />
  </button>
</Tooltip>

// Light variant with longer delay
<Tooltip
  content="Este campo é obrigatório"
  variant="light"
  showDelay={500}
>
  <input type="text" required />
</Tooltip>

// Disabled state explanation
<Tooltip
  content="Complete o passo anterior primeiro"
  disabled={!isPreviousStepComplete}
>
  <button disabled={!isPreviousStepComplete}>
    Próximo passo
  </button>
</Tooltip>
```

---

**Version:** 1.0
**Last updated:** 2025-12-13
**Component Specifier:** Design System Team
