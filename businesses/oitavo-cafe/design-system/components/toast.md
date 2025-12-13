# Toast Component

## Overview

Temporary notification popups that appear briefly to provide feedback about actions or system events. Toasts are non-modal, auto-dismissing messages that don't interrupt the user's workflow. They slide in from the edge of the screen, persist for a few seconds, then automatically exit.

**When to use:**
- Quick confirmations after user actions
- Background task completions
- Non-critical system notifications
- Success messages that don't require acknowledgment
- Copy/paste confirmations

**When not to use:**
- Critical errors requiring action (use Alert instead)
- Information that must be acknowledged (use Modal)
- Permanent status updates (use Alert)
- Complex messages with multiple actions (use Alert or Modal)

## Anatomy

```
                                    ┌────────────────────────────────────┐
                                    │ [Icon] Message text goes here    × │
                                    └────────────────────────────────────┘

Components:
1. Container - Floating card with shadow
2. Icon - Visual indicator (20×20px)
3. Message - Primary notification text
4. Dismiss button (optional) - Manual close
5. Progress bar (optional) - Auto-dismiss countdown
```

## Variants

### Success Toast
**Purpose:** Confirm successful completion of an action.

```css
Background: var(--feedback-success-default) /* #2D5016 */
Icon: Checkmark circle (white)
Text: var(--color-white) /* #FFFFFF */
Shadow: var(--elevation-overlay)
```

**Voice examples:**
- "Salvo! ✓"
- "Copiado pra área de transferência"
- "Convite enviado com sucesso"
- "Alterações aplicadas"

### Warning Toast
**Purpose:** Alert about non-critical issues or important information.

```css
Background: var(--feedback-warning-default) /* #8D4C00 */
Icon: Alert triangle (white)
Text: var(--color-white)
Shadow: var(--elevation-overlay)
```

**Voice examples:**
- "Conexão instável. Salvando em brascunho..."
- "Alguns dados podem estar desatualizados"
- "Limite de uso próximo (80%)"

### Error Toast
**Purpose:** Communicate failures that don't block the workflow.

```css
Background: var(--feedback-error-default) /* #B91C1C */
Icon: X circle (white)
Text: var(--color-white)
Shadow: var(--elevation-overlay)
```

**Voice examples:**
- "Não foi possível salvar. Tenta de novo?"
- "Upload falhou. Arquivo muito grande"
- "Erro ao conectar. Verifica sua internet?"

### Info Toast
**Purpose:** Provide helpful information or tips.

```css
Background: var(--feedback-info-default) /* #75201C */
Icon: Info circle (white)
Text: var(--color-white)
Shadow: var(--elevation-overlay)
```

**Voice examples:**
- "Dica: Ctrl+K pra busca rápida"
- "Nova versão disponível. Atualizar?"
- "Sincronizando dados..."

## Sizes

### Default
```css
Min width: 288px
Max width: 480px
Padding: var(--spacing-4) /* 16px */
Gap: var(--spacing-3) /* 12px between elements */
Border radius: var(--border-radius-md) /* 8px */
Font size: var(--font-size-base) /* 16px */
Line height: var(--line-height-normal) /* 1.5 */
Shadow: var(--elevation-overlay)
```

### Compact
```css
Min width: 240px
Max width: 360px
Padding: var(--spacing-3) /* 12px */
Gap: var(--spacing-2) /* 8px */
Border radius: var(--border-radius-sm) /* 4px */
Font size: var(--font-size-sm) /* 13px */
Shadow: var(--elevation-floating)
```

## States

### Entering
```css
Animation: toast-enter
Duration: var(--duration-moderate) /* 400ms */
Easing: var(--ease-emphasized)
Properties:
  - opacity: 0 → 1
  - transform: translateX(100%) → translateX(0)
  - Optional: scale(0.95) → scale(1)
```

### Visible
```css
Default appearance as defined in variants
Auto-dismiss timer active
Pause on hover (timer stops)
```

### Hover
```css
Cursor: default
Shadow: var(--elevation-modal) /* Slightly increased */
Progress bar: Paused (if shown)
Dismiss button:
  Background: rgba(255, 255, 255, 0.2)
  Border radius: var(--border-radius-sm)
```

### Exiting
```css
Animation: toast-exit
Duration: var(--duration-base) /* 200ms */
Easing: var(--ease-accelerate)
Properties:
  - opacity: 1 → 0
  - transform: translateX(0) → translateX(50%)
```

### Stacked (multiple toasts)
```css
Spacing: var(--spacing-2) /* 8px between toasts */
Max visible: 3 toasts
Older toasts: Push down, oldest dismissed first
Z-index: Latest toast has highest z-index
```

## Animation

### Entry Animation
```css
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* With optional bounce for important notifications */
@keyframes toast-enter-bounce {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  70% {
    opacity: 1;
    transform: translateX(-4px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

Duration: var(--duration-moderate) /* 400ms */
Easing: var(--ease-emphasized)
```

### Exit Animation
```css
@keyframes toast-exit {
  from {
    opacity: 1;
    transform: translateX(0);
    max-height: 100px;
    margin-bottom: var(--spacing-2);
  }
  50% {
    opacity: 0;
    transform: translateX(50%);
    max-height: 100px;
  }
  to {
    opacity: 0;
    transform: translateX(50%);
    max-height: 0;
    margin-bottom: 0;
  }
}

Duration: var(--duration-base) /* 200ms */
Easing: var(--ease-accelerate)
```

### Progress Bar (Auto-dismiss)
```css
@keyframes toast-progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

Duration: Based on toast duration (3000ms - 7000ms)
Easing: linear
Transform origin: left
```

## Positioning

### Top-Right (Default)
```css
Position: fixed
Top: var(--spacing-5) /* 24px */
Right: var(--spacing-5) /* 24px */
Z-index: var(--z-index-toast) /* 700 */

@media (max-width: 768px) {
  Top: var(--spacing-3)
  Right: var(--spacing-3)
  Left: var(--spacing-3)
  Max-width: none
}
```

### Bottom-Center (Alternative)
```css
Position: fixed
Bottom: var(--spacing-5) /* 24px */
Left: 50%
Transform: translateX(-50%)
Z-index: var(--z-index-toast)

@media (max-width: 768px) {
  Bottom: var(--spacing-3)
  Left: var(--spacing-3)
  Right: var(--spacing-3)
  Transform: none
}
```

## Auto-Dismiss Timing

```typescript
const TOAST_DURATIONS = {
  success: 3000,  // 3 seconds - quick confirmation
  info: 5000,     // 5 seconds - default
  warning: 5000,  // 5 seconds - needs reading time
  error: 7000,    // 7 seconds - more time to read and react
};

// Pause on hover
// Resume on mouse leave
// Manual dismiss available at any time
```

## Props/API

```typescript
interface ToastProps {
  /** Toast variant type */
  variant: 'success' | 'warning' | 'error' | 'info';

  /** Message text (required) */
  message: string;

  /** Auto-dismiss duration in ms */
  duration?: number;

  /** Show dismiss button */
  dismissible?: boolean;

  /** Show progress bar */
  showProgress?: boolean;

  /** Position on screen */
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

  /** Size variant */
  size?: 'default' | 'compact';

  /** Custom icon */
  icon?: React.ReactNode;

  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };

  /** Callback on dismiss */
  onDismiss?: () => void;

  /** Pause on hover */
  pauseOnHover?: boolean;

  /** ID for programmatic control */
  id?: string;
}

interface ToastManager {
  /** Show a toast */
  show(props: ToastProps): string;

  /** Dismiss a specific toast */
  dismiss(id: string): void;

  /** Dismiss all toasts */
  dismissAll(): void;

  /** Update existing toast */
  update(id: string, props: Partial<ToastProps>): void;
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Success/Info toasts -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  ...
</div>

<!-- Warning/Error toasts -->
<div
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  ...
</div>
```

### Keyboard Navigation
- **Escape**: Dismiss focused toast (or all toasts)
- **Tab**: Focus on action button (if present)
- **Enter/Space**: Activate action or dismiss

### Screen Reader Considerations
- Message is announced when toast appears
- Variant type announced via icon aria-label
- Auto-dismiss doesn't interrupt reading
- Pause on focus for screen reader users
- Action buttons have clear, specific labels

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .toast {
    animation: toast-fade-only;
  }

  @keyframes toast-fade-only {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

## Usage Guidelines

### Do's

✓ **Keep messages concise**
  - 1-2 lines maximum
  - Front-load important info
  - "Salvo!" is better than "Suas alterações foram salvas com sucesso"

✓ **Use appropriate durations**
  - Success: 3s (quick confirmation)
  - Info/Warning: 5s (reading time)
  - Error: 7s (more time to understand)

✓ **Limit simultaneous toasts**
  - Maximum 3 visible at once
  - Queue additional toasts
  - Dismiss oldest first

✓ **Pause on hover**
  - Let users read at their pace
  - Resume when mouse leaves
  - Essential for accessibility

✓ **Provide manual dismiss**
  - Don't rely only on auto-dismiss
  - Users should be able to clear immediately

### Don'ts

✗ **Don't use for critical errors**
  - Toasts auto-dismiss
  - Critical errors need persistent Alert or Modal

✗ **Don't stack too many toasts**
  - More than 3 = visual clutter
  - Queue or batch notifications

✗ **Don't include complex interactions**
  - One action maximum
  - No forms or multiple buttons

✗ **Don't auto-dismiss error toasts too quickly**
  - 7s minimum for errors
  - Users need time to read and understand

✗ **Don't rely on toasts for important info**
  - They're temporary and easy to miss
  - Use persistent UI for critical information

## Code Examples

### Basic Toast

```html
<div
  class="toast toast--success"
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  <svg class="toast__icon" aria-label="Sucesso">
    <use href="#icon-check-circle"></use>
  </svg>
  <p class="toast__message">Salvo com sucesso!</p>
  <button
    class="toast__dismiss"
    type="button"
    aria-label="Fechar notificação"
  >
    <svg aria-hidden="true">
      <use href="#icon-x"></use>
    </svg>
  </button>
</div>
```

```css
.toast {
  position: fixed;
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  min-width: 288px;
  max-width: 480px;
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  color: var(--color-white);
  box-shadow: var(--elevation-overlay);

  animation: toast-enter var(--duration-moderate) var(--ease-emphasized);
  z-index: var(--z-index-toast);
}

/* Position: Top-Right */
.toast-container {
  position: fixed;
  top: var(--spacing-5);
  right: var(--spacing-5);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  z-index: var(--z-index-toast);
}

.toast--success {
  background: var(--feedback-success-default);
}

.toast--warning {
  background: var(--feedback-warning-default);
}

.toast--error {
  background: var(--feedback-error-default);
}

.toast--info {
  background: var(--feedback-info-default);
}

.toast__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.toast__message {
  flex: 1;
  margin: 0;
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  font-weight: var(--font-weight-medium);
}

.toast__dismiss {
  padding: var(--spacing-1);
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  flex-shrink: 0;

  transition: background var(--duration-fast) var(--ease-gentle);
}

.toast__dismiss:hover {
  background: rgba(255, 255, 255, 0.2);
}

.toast__dismiss svg {
  width: 16px;
  height: 16px;
  display: block;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .toast-container {
    top: var(--spacing-3);
    right: var(--spacing-3);
    left: var(--spacing-3);
  }

  .toast {
    max-width: none;
  }
}
```

### Toast with Progress Bar

```html
<div class="toast toast--info" role="status">
  <svg class="toast__icon" aria-label="Informação">
    <use href="#icon-info-circle"></use>
  </svg>
  <p class="toast__message">Sincronizando dados...</p>
  <button class="toast__dismiss" aria-label="Fechar notificação">
    <svg aria-hidden="true">
      <use href="#icon-x"></use>
    </svg>
  </button>
  <div class="toast__progress" aria-hidden="true"></div>
</div>
```

```css
.toast {
  position: relative;
  overflow: hidden;
}

.toast__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
}

.toast__progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  transform-origin: left;
  animation: toast-progress var(--toast-duration) linear;
}

@keyframes toast-progress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

/* Pause animation on hover */
.toast:hover .toast__progress::before {
  animation-play-state: paused;
}
```

### React Toast Manager

```tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: string;
  variant: 'success' | 'warning' | 'error' | 'info';
  message: string;
  duration?: number;
  dismissible?: boolean;
  showProgress?: boolean;
}

const ToastContext = createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  removeAll: () => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { ...toast, id };

    setToasts((prev) => {
      // Limit to 3 toasts
      const updated = [...prev, newToast];
      if (updated.length > 3) {
        return updated.slice(-3);
      }
      return updated;
    });

    // Auto-dismiss
    const duration = toast.duration || getDefaultDuration(toast.variant);
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const removeAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAll }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  onDismiss
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({
  variant,
  message,
  dismissible = true,
  onDismiss
}: Toast & { onDismiss: () => void }) {
  const [isPaused, setIsPaused] = useState(false);

  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  const ariaLive = variant === 'error' || variant === 'warning' ? 'assertive' : 'polite';

  return (
    <div
      className={`toast toast--${variant}`}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <svg className="toast__icon" aria-label={getAriaLabel(variant)}>
        <use href={`#icon-${getIcon(variant)}`} />
      </svg>

      <p className="toast__message">{message}</p>

      {dismissible && (
        <button
          type="button"
          className="toast__dismiss"
          onClick={onDismiss}
          aria-label="Fechar notificação"
        >
          <svg aria-hidden="true">
            <use href="#icon-x" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Hook for using toasts
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// Helper functions
function getDefaultDuration(variant: string): number {
  const durations = {
    success: 3000,
    info: 5000,
    warning: 5000,
    error: 7000,
  };
  return durations[variant] || 5000;
}

function getIcon(variant: string): string {
  const icons = {
    success: 'check-circle',
    warning: 'alert-triangle',
    error: 'x-circle',
    info: 'info-circle',
  };
  return icons[variant] || 'info-circle';
}

function getAriaLabel(variant: string): string {
  const labels = {
    success: 'Sucesso',
    warning: 'Atenção',
    error: 'Erro',
    info: 'Informação',
  };
  return labels[variant] || '';
}
```

### Usage Example

```tsx
function MyComponent() {
  const { addToast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      addToast({
        variant: 'success',
        message: 'Salvo com sucesso!',
        duration: 3000,
      });
    } catch (error) {
      addToast({
        variant: 'error',
        message: 'Não foi possível salvar. Tenta de novo?',
        duration: 7000,
      });
    }
  };

  return <button onClick={handleSave}>Salvar</button>;
}
```

---

**Version:** 1.0
**Last updated:** 2025-12-13
**Component Specifier:** Design System Team
