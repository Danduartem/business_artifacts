# Modal Component

## Overview

Dialog overlays that appear on top of the main content, requiring user interaction before returning to the underlying page. Modals focus attention on a specific task, confirmation, or information while temporarily blocking interaction with the rest of the application.

**When to use:**
- Confirm destructive actions
- Collect critical information
- Display important warnings
- Complex forms that need focus
- Multi-step processes

**When not to use:**
- Simple confirmations (use inline Alert)
- Non-blocking notifications (use Toast)
- Navigation (use proper routing)
- Frequent interruptions (consider inline UI)

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ BACKDROP ░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░                                                  ░░░░ │
│ ░░  ┌────────────────────────────────────────┐     ░░░░ │
│ ░░  │ [×] Modal Title                        │     ░░░░ │
│ ░░  ├────────────────────────────────────────┤     ░░░░ │
│ ░░  │                                        │     ░░░░ │
│ ░░  │  Modal content goes here...           │     ░░░░ │
│ ░░  │                                        │     ░░░░ │
│ ░░  ├────────────────────────────────────────┤     ░░░░ │
│ ░░  │              [Cancel] [Confirm]        │     ░░░░ │
│ ░░  └────────────────────────────────────────┘     ░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└──────────────────────────────────────────────────────────┘

Components:
1. Backdrop - Semi-transparent overlay blocking page
2. Dialog - Modal container (centered)
3. Header - Title and close button
4. Body - Main content area
5. Footer - Action buttons (optional)
6. Close button - Dismiss modal
```

## Variants

### Default Modal
**Purpose:** Standard dialog for most use cases.

```css
Width: 600px max
Padding: var(--spacing-6) /* 32px */
Background: var(--color-white)
Border radius: var(--border-radius-lg) /* 12px */
Shadow: var(--elevation-modal)
```

### Small Modal
**Purpose:** Simple confirmations or alerts.

```css
Width: 400px max
Padding: var(--spacing-5) /* 24px */
Single action typically
```

### Large Modal
**Purpose:** Complex forms or data displays.

```css
Width: 800px max
Padding: var(--spacing-6) /* 32px */
May include sections/tabs
```

### Full-screen Modal (Mobile)
**Purpose:** Mobile adaptation for better usability.

```css
@media (max-width: 768px) {
  Width: 100vw
  Height: 100vh
  Border radius: 0
  Slide from bottom animation
}
```

### Destructive Modal
**Purpose:** Confirm dangerous actions (delete, remove, etc.).

```css
Header background: var(--feedback-error-light)
Primary button: var(--feedback-error-default)
Icon: Warning/alert triangle
```

## Sizes

### Small
```css
Max width: 400px
Padding: var(--spacing-5) /* 24px */
Font size: var(--font-size-base)
```

### Medium (Default)
```css
Max width: 600px
Padding: var(--spacing-6) /* 32px */
Font size: var(--font-size-base)
```

### Large
```css
Max width: 800px
Padding: var(--spacing-6) /* 32px */
Font size: var(--font-size-base)
```

### Responsive Breakpoints
```css
/* Desktop */
@media (min-width: 768px) {
  Max width: As specified
  Margin: 48px auto
}

/* Mobile */
@media (max-width: 767px) {
  Width: calc(100% - 32px)
  Max width: none
  Margin: 16px
}
```

## States

### Closed (Default)
```css
Display: none
Backdrop: opacity 0
Dialog: opacity 0, scale(0.95)
```

### Opening
```css
Animation: modal-enter
Duration: var(--duration-moderate) /* 400ms */
Easing: var(--ease-emphasized)

Backdrop:
  - opacity: 0 → 1
  - Duration: 300ms

Dialog:
  - opacity: 0 → 1
  - transform: scale(0.95) translateY(-20px) → scale(1) translateY(0)
  - Duration: 400ms
  - Delay: 50ms (after backdrop starts)
```

### Open
```css
Display: flex
Backdrop: opacity 1
Dialog: opacity 1, transform none
Body scroll: Locked (overflow hidden)
Focus: Trapped in modal
```

### Closing
```css
Animation: modal-exit
Duration: var(--duration-base) /* 300ms */
Easing: var(--ease-accelerate)

Dialog:
  - opacity: 1 → 0
  - transform: scale(1) → scale(0.95)
  - Duration: 250ms

Backdrop:
  - opacity: 1 → 0
  - Duration: 200ms
  - Delay: 100ms (after dialog starts)
```

## Animation

### Entry Animation
```css
@keyframes modal-backdrop-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-dialog-enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-backdrop {
  animation: modal-backdrop-enter 300ms var(--ease-emphasized);
}

.modal-dialog {
  animation: modal-dialog-enter 400ms var(--ease-emphasized) 50ms;
}
```

### Exit Animation
```css
@keyframes modal-dialog-exit {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

@keyframes modal-backdrop-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.modal-dialog--closing {
  animation: modal-dialog-exit 250ms var(--ease-accelerate);
}

.modal-backdrop--closing {
  animation: modal-backdrop-exit 200ms var(--ease-accelerate) 100ms;
}
```

### Mobile Slide-up
```css
@media (max-width: 767px) {
  @keyframes modal-dialog-enter-mobile {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .modal-dialog {
    animation: modal-dialog-enter-mobile 400ms var(--ease-emphasized);
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .modal-backdrop,
  .modal-dialog {
    animation: modal-fade-only 200ms ease;
  }

  @keyframes modal-fade-only {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

## Backdrop

### Backdrop Styles
```css
Background: rgba(43, 37, 35, 0.6) /* neutral-800 at 60% */
Position: fixed
Top: 0
Right: 0
Bottom: 0
Left: 0
Z-index: var(--z-index-modal-backdrop) /* 400 */
Display: flex
Align items: center
Justify content: center
```

### Click Outside to Close
```javascript
backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) {
    closeModal();
  }
});
```

### Prevent Body Scroll
```javascript
// When modal opens
document.body.style.overflow = 'hidden';

// When modal closes
document.body.style.overflow = '';
```

## Props/API

```typescript
interface ModalProps {
  /** Modal open state */
  open: boolean;

  /** Callback when modal should close */
  onClose: () => void;

  /** Modal title */
  title?: string;

  /** Modal size */
  size?: 'small' | 'medium' | 'large';

  /** Show close button */
  showCloseButton?: boolean;

  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;

  /** Close on Escape key */
  closeOnEscape?: boolean;

  /** Prevent body scroll when open */
  preventBodyScroll?: boolean;

  /** Modal variant */
  variant?: 'default' | 'destructive';

  /** Custom footer content */
  footer?: React.ReactNode;

  /** Primary action button */
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
  };

  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };

  /** Additional CSS class */
  className?: string;

  /** Modal content */
  children: React.ReactNode;
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Backdrop -->
<div
  class="modal-backdrop"
  role="presentation"
  aria-hidden="false"
>
  <!-- Dialog -->
  <div
    class="modal-dialog"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <h2 id="modal-title">Modal Title</h2>
    <div id="modal-description">
      Modal content...
    </div>
  </div>
</div>
```

### Focus Management
```javascript
// Focus trap implementation
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

// Focus first element when modal opens
firstElement.focus();

// Trap focus within modal
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
});
```

### Keyboard Navigation
- **Tab**: Cycle through focusable elements
- **Shift+Tab**: Cycle backwards
- **Escape**: Close modal (if enabled)
- **Enter**: Activate focused button

### Screen Reader Announcements
```html
<!-- Announce modal opening -->
<div class="visually-hidden" aria-live="polite" aria-atomic="true">
  Modal de confirmação aberto
</div>
```

### Return Focus
```javascript
// Store trigger element before opening
const triggerElement = document.activeElement;

// Return focus when closing
function closeModal() {
  // ... close logic
  triggerElement.focus();
}
```

## Usage Guidelines

### Do's

✓ **Use for important decisions**
  - Destructive actions need confirmation
  - Critical information requires attention

✓ **Keep content focused**
  - One primary task per modal
  - Clear, concise messaging

✓ **Provide clear actions**
  - Primary action clearly labeled
  - Cancel/close always available

✓ **Lock body scroll**
  - Prevents background scrolling
  - Maintains modal focus

✓ **Support Escape to close**
  - Quick dismissal for power users
  - Accessibility requirement

### Don'ts

✗ **Don't nest modals**
  - Multiple layers = confusing
  - Consider stepper/wizard instead

✗ **Don't use for non-critical info**
  - Modals are disruptive
  - Use inline content when possible

✗ **Don't make modals too large**
  - Maximum 800px width
  - Scroll content, not entire modal

✗ **Don't hide close mechanisms**
  - Always provide way to dismiss
  - X button + Escape + Cancel button

✗ **Don't auto-open modals**
  - User-initiated only
  - Exception: Critical warnings

## Code Examples

### Basic Modal Structure

```html
<div class="modal-backdrop" role="presentation">
  <div
    class="modal-dialog"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="modal-header">
      <h2 id="modal-title" class="modal-title">
        Confirmar exclusão
      </h2>
      <button
        class="modal-close"
        type="button"
        aria-label="Fechar modal"
      >
        <svg><use href="#icon-x"></use></svg>
      </button>
    </div>

    <div class="modal-body" id="modal-description">
      <p>
        Tem certeza que quer apagar este item? Essa ação não pode ser desfeita.
      </p>
    </div>

    <div class="modal-footer">
      <button type="button" class="button button--secondary">
        Cancelar
      </button>
      <button type="button" class="button button--primary">
        Confirmar
      </button>
    </div>
  </div>
</div>
```

```css
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-modal-backdrop);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-5);
  background: rgba(43, 37, 35, 0.6);
  backdrop-filter: blur(4px);

  animation: modal-backdrop-enter 300ms var(--ease-emphasized);
}

.modal-dialog {
  position: relative;
  max-width: 600px;
  width: 100%;
  max-height: calc(100vh - 96px);
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--elevation-modal);
  display: flex;
  flex-direction: column;

  animation: modal-dialog-enter 400ms var(--ease-emphasized) 50ms;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--border-subtle);
}

.modal-title {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.modal-close {
  padding: var(--spacing-2);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-sm);

  transition: background var(--duration-fast) var(--ease-gentle);
}

.modal-close:hover {
  background: var(--neutral-100);
  color: var(--text-primary);
}

.modal-close svg {
  width: 20px;
  height: 20px;
  display: block;
}

.modal-body {
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
  color: var(--text-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--border-subtle);
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .modal-backdrop {
    padding: 0;
    align-items: flex-end;
  }

  .modal-dialog {
    max-width: none;
    width: 100%;
    max-height: 90vh;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    animation: modal-dialog-enter-mobile 400ms var(--ease-emphasized);
  }

  .modal-footer {
    flex-direction: column-reverse;
  }

  .modal-footer .button {
    width: 100%;
  }
}
```

### React Component

```tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Modal({
  open,
  onClose,
  title,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  variant = 'default',
  footer,
  primaryAction,
  secondaryAction,
  className = '',
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Prevent body scroll
      if (preventBodyScroll) {
        document.body.style.overflow = 'hidden';
      }

      // Focus first element
      setTimeout(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }, 100);
    }

    return () => {
      if (preventBodyScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [open, preventBodyScroll]);

  useEffect(() => {
    if (!open) {
      // Return focus when closing
      previousFocusRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  const modalContent = (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className={`modal-dialog modal-dialog--${size} modal-dialog--${variant} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {title && (
          <div className="modal-header">
            <h2 id="modal-title" className="modal-title">
              {title}
            </h2>
            {showCloseButton && (
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Fechar modal"
              >
                <svg><use href="#icon-x" /></svg>
              </button>
            )}
          </div>
        )}

        <div className="modal-body">{children}</div>

        {(footer || primaryAction || secondaryAction) && (
          <div className="modal-footer">
            {footer || (
              <>
                {secondaryAction && (
                  <button
                    type="button"
                    className="button button--secondary"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </button>
                )}
                {primaryAction && (
                  <button
                    type="button"
                    className="button button--primary"
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled}
                  >
                    {primaryAction.loading ? 'Carregando...' : primaryAction.label}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// Hook for modal state management
export function useModal(defaultOpen = false) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
}
```

### Usage Examples

```tsx
// Basic confirmation modal
function DeleteConfirmation() {
  const { isOpen, open, close } = useModal();

  const handleDelete = async () => {
    await deleteItem();
    close();
  };

  return (
    <>
      <button onClick={open}>Excluir</button>

      <Modal
        open={isOpen}
        onClose={close}
        title="Confirmar exclusão"
        size="small"
        variant="destructive"
        primaryAction={{
          label: 'Excluir',
          onClick: handleDelete,
        }}
        secondaryAction={{
          label: 'Cancelar',
          onClick: close,
        }}
      >
        <p>Tem certeza que quer apagar este item? Essa ação não pode ser desfeita.</p>
      </Modal>
    </>
  );
}

// Form modal
function EditProfile() {
  const { isOpen, open, close } = useModal();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await saveProfile();
    setLoading(false);
    close();
  };

  return (
    <>
      <button onClick={open}>Editar perfil</button>

      <Modal
        open={isOpen}
        onClose={close}
        title="Editar perfil"
        size="medium"
        primaryAction={{
          label: 'Salvar',
          onClick: handleSubmit,
          loading,
        }}
        secondaryAction={{
          label: 'Cancelar',
          onClick: close,
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
        </form>
      </Modal>
    </>
  );
}
```

---

**Version:** 1.0
**Last updated:** 2025-12-13
**Component Specifier:** Design System Team
