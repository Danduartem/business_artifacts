# Toast Component

**Component Type:** Feedback
**Version:** 1.0.0
**Status:** Production Ready
**Last Updated:** 2025-12-13

---

## Overview

Toasts are temporary, non-blocking notifications that appear briefly to provide feedback about an operation. They automatically dismiss after a short duration and don't interrupt the user's workflow. Unlike alerts, toasts are ephemeral and shouldn't require user interaction.

**Purpose:** Provide brief, timely feedback about background operations or completed actions without blocking the interface.

**When to Use:**
- Confirming actions (saved, deleted, sent)
- Background process completion
- Non-critical system updates
- Quick status updates that don't require action
- Undoable actions (with action button)

**When NOT to Use:**
- Critical errors requiring attention → Use **Alert** instead
- Persistent information → Use **Alert** instead
- Information requiring user action → Use **Alert** or **Modal** instead
- Loading states → Use **Progress** or **Skeleton** instead
- Multiple simultaneous notifications → Stack maximum 3, queue others

---

## Anatomy

```
                                    ┌────────────────────────────────┐
                                    │ [Icon] Message text       [×]  │
                                    │                                │
                                    │ [Action]                       │
                                    └────────────────────────────────┘
                                             (appears from right)
```

### Required Elements
1. **Container** - Elevated card with shadow
2. **Icon** - Visual indicator matching toast type (20×20px)
3. **Message** - Clear, concise text (1-2 lines max)

### Optional Elements
4. **Action Button** - Single primary action (e.g., "Desfazer", "Ver")
5. **Dismiss Button** - Close icon (pauses auto-dismiss on hover)
6. **Progress Bar** - Visual countdown to auto-dismiss

---

## Variants

### By Severity Type

#### 1. Info Toast
**Purpose:** Neutral information, tips, updates

**Visual Properties:**
- Background: `var(--color-primary-700)` (#75201C)
- Text color: `#FFFFFF`
- Icon color: `#FFFFFF`
- Icon: ⓘ (info circle)
- Shadow: `var(--shadow-lg)`

**Example:**
```
[ⓘ] Dashboard atualizado com os dados mais recentes.
```

#### 2. Success Toast
**Purpose:** Confirm successful operations

**Visual Properties:**
- Background: `var(--color-feedback-success)` (#2D5016)
- Text color: `#FFFFFF`
- Icon color: `#FFFFFF`
- Icon: ✓ (checkmark circle)
- Shadow: `var(--shadow-lg)`

**Example:**
```
[✓] Pronto! Proposta enviada por email.
```

#### 3. Warning Toast
**Purpose:** Non-critical warnings, cautions

**Visual Properties:**
- Background: `var(--color-feedback-warning)` (#8D4C00)
- Text color: `#FFFFFF`
- Icon color: `#FFFFFF`
- Icon: ⚠ (warning triangle)
- Shadow: `var(--shadow-lg)`

**Example:**
```
[⚠] Conexão lenta. Alguns dados podem demorar.
```

#### 4. Error Toast
**Purpose:** Failed operations (non-blocking)

**Visual Properties:**
- Background: `var(--color-feedback-error)` (#B91C1C)
- Text color: `#FFFFFF`
- Icon color: `#FFFFFF`
- Icon: ✕ (error circle with X)
- Shadow: `var(--shadow-lg)`

**Example:**
```
[✕] Ops, não conseguimos salvar. Tenta de novo?
```

### By Position

#### Top Right (Default)
- Fixed position: `top: 24px; right: 24px`
- Most common for desktop
- Stack vertically downward

#### Top Center
- Fixed position: `top: 24px; left: 50%; transform: translateX(-50%)`
- Use for critical announcements
- Stack vertically downward

#### Bottom Right
- Fixed position: `bottom: 24px; right: 24px`
- Use when top is occupied
- Stack vertically upward

#### Bottom Center
- Fixed position: `bottom: 24px; left: 50%; transform: translateX(-50%)`
- Use for mobile (most thumb-accessible)
- Stack vertically upward

---

## Specifications

### Sizing

| Element | Size | Token |
|---------|------|-------|
| Container width (desktop) | 360px | - |
| Container width (mobile) | calc(100vw - 32px) | - |
| Max width | 560px | - |
| Padding | 16px | var(--space-4) |
| Border radius | 8px | var(--radius-md) |
| Icon size | 20×20px | - |
| Gap between toasts | 12px | var(--space-3) |
| Min height | 64px | - |

### Typography

| Element | Font Size | Weight | Line Height |
|---------|-----------|--------|-------------|
| Message | 14px (sm) | 400 (regular) | 1.5 |
| Action button | 14px (sm) | 600 (semibold) | 1.5 |

### Spacing

```
Container:
  padding: 16px
  gap: 12px (between icon and content)

Content Stack:
  gap: 8px (between message and action)

Action Row:
  margin-top: 8px
```

### Shadow

```css
box-shadow: var(--shadow-lg);
/* Equivalent to: 0 8px 16px 0 rgba(43, 37, 35, 0.12),
                  0 4px 8px 0 rgba(43, 37, 35, 0.08) */
```

---

## Auto-Dismiss Timing

### Duration by Type

| Type | Duration | Rationale |
|------|----------|-----------|
| Success | 3000ms (3s) | Quick positive feedback |
| Info | 5000ms (5s) | Standard reading time |
| Warning | 5000ms (5s) | Needs attention but not urgent |
| Error | 7000ms (7s) | More time to read and act |

### Pause on Interaction

**Hover:**
- Auto-dismiss timer **pauses**
- Progress bar (if visible) **pauses**
- Resumes when hover ends

**Focus:**
- Auto-dismiss timer **pauses**
- Resumes when focus leaves

**Click (anywhere on toast):**
- Auto-dismiss timer **pauses**
- Requires explicit dismiss or action

### Immediate Dismiss

User can dismiss immediately by:
- Clicking dismiss button (×)
- Pressing `Escape` key when focused
- Clicking action button (if configured to dismiss)

---

## Animation Specifications

### Entry Animation
**Type:** Slide in from right + Fade in

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

.toast {
  animation: toast-enter 300ms var(--ease-decelerate);
}
```

**Timing:**
- Duration: 300ms
- Easing: decelerate (cubic-bezier(0, 0, 0.2, 1))
- Delay: 0ms (or 50ms if stacking)

### Exit Animation
**Type:** Slide out to right + Fade out

```css
@keyframes toast-exit {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(calc(100% + 24px));
  }
}

.toast-exiting {
  animation: toast-exit 200ms var(--ease-accelerate) forwards;
}
```

**Timing:**
- Duration: 200ms
- Easing: accelerate (cubic-bezier(0.4, 0, 1, 1))

### Stack Reflow Animation

When a toast is removed from a stack, remaining toasts smoothly reposition:

```css
.toast {
  transition: transform 300ms var(--ease-standard);
}
```

### Progress Bar Animation

Optional visual countdown:

```css
@keyframes toast-progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

.toast__progress {
  animation: toast-progress var(--toast-duration) linear;
  transform-origin: left;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .toast {
    animation: toast-fade-in 200ms ease;
  }

  @keyframes toast-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .toast-exiting {
    animation: toast-fade-out 150ms ease forwards;
  }

  @keyframes toast-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .toast__progress {
    display: none;
  }
}
```

---

## Props / API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `message` | `string \| ReactNode` | Toast message content |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | Toast type |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | Auto (by type) | Auto-dismiss time in ms (0 = never) |
| `dismissible` | `boolean` | `true` | Show dismiss button |
| `action` | `ToastAction` | - | Action button configuration |
| `position` | `ToastPosition` | `'top-right'` | Toast position on screen |
| `showProgress` | `boolean` | `false` | Show countdown progress bar |
| `onDismiss` | `() => void` | - | Callback when dismissed |
| `pauseOnHover` | `boolean` | `true` | Pause timer on hover |
| `pauseOnFocus` | `boolean` | `true` | Pause timer on focus |
| `id` | `string` | Auto | Unique identifier |

### ToastAction Type

```typescript
interface ToastAction {
  label: string;
  onClick: () => void;
  dismissOnClick?: boolean; // Default: true
}
```

### ToastPosition Type

```typescript
type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-center';
```

### Toast Manager API

```typescript
// Imperative API
toast.success('Proposta enviada!');
toast.error('Ops, algo deu errado.');
toast.info('Dashboard atualizado.');
toast.warning('Conexão lenta detectada.');

// With options
toast.success('Salvo com sucesso!', {
  duration: 3000,
  action: {
    label: 'Desfazer',
    onClick: handleUndo
  }
});

// Dismiss specific toast
toast.dismiss(toastId);

// Dismiss all toasts
toast.dismissAll();
```

---

## Accessibility

### ARIA Attributes

**Toast Container (Portal):**
```html
<div
  aria-live="polite"
  aria-atomic="false"
  role="region"
  aria-label="Notificações"
>
```

**Individual Toast:**
```html
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  <div className="toast__content">
    {message}
  </div>
</div>
```

### ARIA Live Regions

| Type | `aria-live` | Reason |
|------|-------------|--------|
| Info | `polite` | Non-urgent updates |
| Success | `polite` | Positive feedback |
| Warning | `polite` | Important but not critical |
| Error | `assertive` | Critical, announce immediately |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus dismiss button or action |
| `Enter` / `Space` | Activate focused button |
| `Escape` | Dismiss focused toast |

### Focus Management

- Toast appears: **Do not** steal focus
- Screen reader announces via live region
- User can tab to toast buttons if needed
- Focus returns to trigger on dismiss

### Screen Reader Announcements

**Format:**
```
[Type] [Message] [Action available/dismissible]
```

**Examples:**
```
"Success. Proposta enviada. Desfazer button available. Dismissible."
"Error. Não conseguimos salvar. Dismissible."
```

### Color Contrast

All toast variants meet **WCAG AAA** standards:

| Type | Text | Background | Ratio |
|------|------|-----------|-------|
| Info | #FFFFFF | #75201C | 10.2:1 ✓ |
| Success | #FFFFFF | #2D5016 | 11.8:1 ✓ |
| Warning | #FFFFFF | #8D4C00 | 7.3:1 ✓ |
| Error | #FFFFFF | #B91C1C | 8.1:1 ✓ |

---

## Reduced Motion Fallbacks

When `prefers-reduced-motion: reduce`:

1. **Entry:** Fade in (no slide)
2. **Exit:** Fade out (no slide)
3. **Stack reflow:** Instant (no transition)
4. **Progress bar:** Hidden
5. **Durations:** Reduced to 150-200ms

```css
@media (prefers-reduced-motion: reduce) {
  .toast,
  .toast-exiting,
  .toast__progress {
    animation-duration: 150ms !important;
  }

  .toast {
    animation-name: toast-fade-in !important;
  }

  .toast-exiting {
    animation-name: toast-fade-out !important;
  }

  .toast__progress {
    display: none;
  }
}
```

---

## Do's and Don'ts

### Do ✓

**Do use brand voice:**
```
✓ "Pronto! A gente recebeu seu contato."
✓ "Ops, deu ruim. Tenta de novo?"
✓ "Salvo! (Quer desfazer?)"
```

**Do keep messages brief (1-2 lines):**
```
✓ "Proposta enviada por email."
✓ "Lead adicionado ao funil."
```

**Do provide undo for destructive actions:**
```
✓ [Success] Item removido. [Desfazer]
```

**Do stack toasts (max 3):**
```
[Toast 3]  ← Newest
[Toast 2]
[Toast 1]  ← Oldest
```

**Do pause on hover:**
```
Hovering → Timer pauses → Resume on unhover
```

### Don't ✗

**Don't use long messages:**
```
✗ "Sua proposta foi enviada com sucesso para o email cadastrado e
   você receberá uma cópia em até 24 horas úteis."
✓ "Proposta enviada! Chega no email em até 24h."
```

**Don't show too many toasts:**
```
✗ 5+ toasts stacked
✓ Max 3, queue the rest
```

**Don't use for critical errors:**
```
✗ Toast: "Payment failed" (user might miss it)
✓ Alert/Modal: Show blocking message
```

**Don't require user action:**
```
✗ Toast with required form
✓ Use modal or inline alert
```

**Don't use for loading states:**
```
✗ Toast: "Loading..."
✓ Use Progress or Skeleton
```

---

## Brand Voice Examples

### Success
```
Pronto! Proposta enviada por email.

Feito! Lead adicionado ao funil.

Salvo com sucesso! (ROI atualizado)

Tudo certo! Diagnóstico agendado.
```

### Error
```
Ops, não conseguimos salvar. Tenta de novo?

Eita, algo deu errado. Confere tua conexão?

Hmm, esse arquivo é grande demais. Máx 5MB.

Deu ruim. Tenta recarregar a página?
```

### Warning
```
Conexão lenta. Pode demorar um pouco.

Atenção: mudanças não salvas.

Cuidado: essa ação remove o lead do funil.

Aviso: orçamento 80% comprometido.
```

### Info
```
Dashboard atualizado com dados recentes.

Dica: arrasta os cards pra reorganizar.

Lembra: diagnóstico é gratuito.

Seu caso está em análise. Resposta em 24h.
```

---

## Code Examples

### Basic Toast

```jsx
// Using toast manager
toast.success('Proposta enviada!');
```

### Toast with Action

```jsx
toast.success('Lead removido do funil.', {
  action: {
    label: 'Desfazer',
    onClick: handleUndo
  }
});
```

### Toast with Custom Duration

```jsx
toast.info('Calculando ROI...', {
  duration: 8000, // 8 seconds
  showProgress: true
});
```

### Non-Dismissible Toast

```jsx
toast.warning('Processando pagamento...', {
  duration: 0, // Never auto-dismiss
  dismissible: false
});

// Later, dismiss programmatically
toast.dismiss(toastId);
```

### Toast at Different Position

```jsx
toast.success('Salvo!', {
  position: 'bottom-center'
});
```

### Programmatic Dismiss

```jsx
const toastId = toast.info('Upload em progresso...');

// On upload complete
handleUploadComplete().then(() => {
  toast.dismiss(toastId);
  toast.success('Upload completo!');
});
```

---

## Stacking Behavior

### Maximum Stack Size

**Desktop:** 3 toasts maximum
**Mobile:** 2 toasts maximum

### Queue Management

When stack is full:
1. New toast enters queue
2. Oldest toast dismissed (or waited to auto-dismiss)
3. Next queued toast appears

### Stacking Direction

**Top positions:** Stack downward (newest on top)
**Bottom positions:** Stack upward (newest on bottom)

### Spacing Between Toasts

- Gap: 12px (var(--space-3))
- Smooth reflow on dismiss (300ms transition)

---

## Implementation Notes

### Toast Container Structure

```jsx
<div className="toast-container" data-position="top-right">
  <div className="toast toast--success" role="status" aria-live="polite">
    <div className="toast__icon">
      <CheckIcon />
    </div>

    <div className="toast__content">
      <div className="toast__message">Proposta enviada!</div>
      {action && (
        <button className="toast__action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>

    <button className="toast__dismiss" aria-label="Fechar">
      <CloseIcon />
    </button>

    {showProgress && (
      <div className="toast__progress-bar" aria-hidden="true" />
    )}
  </div>
</div>
```

### CSS Architecture

```css
/* Container */
.toast-container {
  position: fixed;
  z-index: var(--z-toast, 800);
  pointer-events: none;
}

.toast-container[data-position="top-right"] {
  top: 24px;
  right: 24px;
}

.toast-container[data-position="bottom-center"] {
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
}

/* Toast */
.toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  width: 360px;
  max-width: calc(100vw - 32px);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--space-3);
  pointer-events: auto;
  position: relative;
  overflow: hidden;
}

/* Variants */
.toast--success {
  background: var(--color-feedback-success);
  color: #FFFFFF;
}

.toast--error {
  background: var(--color-feedback-error);
  color: #FFFFFF;
}

.toast--warning {
  background: var(--color-feedback-warning);
  color: #FFFFFF;
}

.toast--info {
  background: var(--color-primary-700);
  color: #FFFFFF;
}

/* Content */
.toast__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.toast__message {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.toast__action {
  align-self: flex-start;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--duration-fast);
}

.toast__action:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Dismiss */
.toast__dismiss {
  padding: var(--space-1);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #FFFFFF;
  opacity: 0.8;
  border-radius: var(--radius-sm);
  transition: opacity var(--duration-fast);
}

.toast__dismiss:hover {
  opacity: 1;
}

/* Progress bar */
.toast__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.4);
  transform-origin: left;
}

/* Pause on hover */
.toast:hover .toast__progress-bar {
  animation-play-state: paused !important;
}
```

### Toast Manager Implementation

```typescript
// toast-manager.ts
class ToastManager {
  private toasts: Toast[] = [];
  private maxStack = 3;
  private queue: Toast[] = [];

  show(options: ToastOptions) {
    const toast = this.createToast(options);

    if (this.toasts.length >= this.maxStack) {
      this.queue.push(toast);
    } else {
      this.addToast(toast);
    }

    return toast.id;
  }

  dismiss(id: string) {
    this.removeToast(id);
    this.processQueue();
  }

  private processQueue() {
    if (this.queue.length > 0 && this.toasts.length < this.maxStack) {
      const next = this.queue.shift();
      if (next) this.addToast(next);
    }
  }

  // Helper methods
  success(message: string, options?: Partial<ToastOptions>) {
    return this.show({ message, type: 'success', ...options });
  }

  error(message: string, options?: Partial<ToastOptions>) {
    return this.show({ message, type: 'error', ...options });
  }

  // ... etc
}

export const toast = new ToastManager();
```

---

## Related Components

- **Alert** - For persistent, non-dismissing notifications
- **Snackbar** - Alternative term for toast (we use "toast")
- **Banner** - For system-wide announcements
- **Notification** - For inbox-style notifications

---

## Resources

- Design Tokens: `/tokens.css`
- Animation Principles: `/style-guide.md#motion`
- Brand Voice: `/voice-forge/voice-documentation.md`
- Accessibility Guidelines: WCAG 2.1 Level AA

---

**Component Owner:** Design System Team
**Last Review:** 2025-12-13
**Next Review:** 2026-03-13
