# Modal

## Overview

Modals are dialog windows that appear above the main content, requiring user interaction before returning to the underlying page. They create focus by temporarily blocking interaction with the rest of the application.

**When to use:**
- Confirm destructive actions
- Collect critical information that interrupts the current flow
- Display important warnings or errors requiring acknowledgment
- Show focused content that needs full attention

**When not to use:**
- For non-critical information (use Popover instead)
- For navigation (use Drawer instead)
- For simple confirmations (consider inline alternatives)
- Excessively long forms (consider dedicated pages)

---

## Anatomy

```
┌─────────────────────────────────────┐
│         Modal Backdrop              │
│  (semi-transparent overlay)         │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ [×]  Modal Header           │  │
│   ├─────────────────────────────┤  │
│   │                             │  │
│   │  Modal Body                 │  │
│   │  (scrollable if needed)     │  │
│   │                             │  │
│   ├─────────────────────────────┤  │
│   │  Modal Footer               │  │
│   │  [Secondary]  [Primary CTA] │  │
│   └─────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

**Parts:**
1. **Backdrop** - Semi-transparent overlay (rgba(78, 19, 13, 0.5))
2. **Dialog** - The modal container
3. **Header** - Title and close button
4. **Body** - Main content area (scrollable)
5. **Footer** - Action buttons
6. **Close Button** - Always present for accessibility

---

## Sizes

**Small (400px)**
- Simple confirmations
- Short messages
- Quick actions

**Medium (600px)** - Default
- Standard forms
- Moderate content
- Most use cases

**Large (800px)**
- Complex forms
- Rich content
- Multiple sections

**Full (90vw max)**
- Very complex workflows
- Image galleries
- Multi-step processes

---

## Animation Sequence

### Opening (450ms total)

**Step 1: Backdrop Fade In (300ms)**
```css
.modal-backdrop {
  opacity: 0;
  animation: backdropFadeIn 300ms var(--ease-emphasized) forwards;
}

@keyframes backdropFadeIn {
  to {
    opacity: 1;
  }
}
```

**Step 2: Dialog Scale & Slide (400ms, 50ms delay)**
```css
.modal-dialog {
  transform: scale(0.95) translateY(-20px);
  opacity: 0;
  animation: dialogEnter 400ms var(--ease-emphasized) 50ms forwards;
}

@keyframes dialogEnter {
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
```

### Closing (300ms total)

**Simultaneous: Backdrop & Dialog (300ms)**
```css
.modal-backdrop.closing {
  animation: backdropFadeOut 300ms var(--ease-accelerate) forwards;
}

.modal-dialog.closing {
  animation: dialogExit 300ms var(--ease-accelerate) forwards;
}

@keyframes backdropFadeOut {
  to {
    opacity: 0;
  }
}

@keyframes dialogExit {
  to {
    transform: scale(0.95) translateY(-20px);
    opacity: 0;
  }
}
```

---

## Positioning

**Vertical:** Centered, with 5% offset from top on desktop for better ergonomics
**Horizontal:** Always centered
**Mobile:** Full width with padding, or full-screen for complex modals

```css
.modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100vh - 64px);
  margin: 32px;
}

@media (min-width: 768px) {
  .modal-dialog {
    top: 45%; /* Slightly above center */
  }
}
```

---

## Styling

**Dialog Container:**
```css
.modal-dialog {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
```

**Header:**
```css
.modal-header {
  padding: var(--spacing-6) var(--spacing-6) var(--spacing-4);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-family: var(--font-primary);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
}
```

**Body:**
```css
.modal-body {
  padding: var(--spacing-6);
  overflow-y: auto;
  flex: 1;
  color: var(--color-text-secondary);
}
```

**Footer:**
```css
.modal-footer {
  padding: var(--spacing-4) var(--spacing-6) var(--spacing-6);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
}
```

---

## Component API

### Props

```typescript
interface ModalProps {
  // Visibility
  open: boolean;
  onClose: () => void;

  // Content
  title?: string;
  children: React.ReactNode;

  // Sizing
  size?: 'sm' | 'md' | 'lg' | 'full';

  // Behavior
  closeOnBackdropClick?: boolean; // default: true
  closeOnEscape?: boolean; // default: true
  showCloseButton?: boolean; // default: true

  // Layout
  header?: React.ReactNode;
  footer?: React.ReactNode;

  // Styling
  className?: string;

  // Accessibility
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;

  // Advanced
  initialFocus?: React.RefObject<HTMLElement>;
  returnFocus?: boolean; // default: true
}
```

### Usage Example

```tsx
import { Modal, Button } from '@oitavo-cafe/ui';

function DeleteConfirmationModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Excluir conta
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="sm"
        title="Tem certeza que quer excluir sua conta?"
      >
        <p>
          Essa ação não pode ser desfeita. Todos os seus dados
          serão permanentemente removidos dos nossos servidores.
        </p>

        <Modal.Footer>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
          >
            Sim, excluir conta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

---

## Accessibility

### Focus Management

**On Open:**
1. Trap focus within modal
2. Move focus to first focusable element (or `initialFocus` if specified)
3. Save reference to previously focused element

**On Close:**
1. Return focus to trigger element (unless `returnFocus={false}`)
2. Release focus trap

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Escape` | Close modal (if `closeOnEscape={true}`) |
| `Tab` | Move focus to next focusable element (cycles within modal) |
| `Shift + Tab` | Move focus to previous focusable element |

### ARIA Attributes

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <div id="modal-description">
    Modal content description
  </div>
</div>
```

### Screen Reader Announcements

- Announce modal open: "Dialog aberto"
- Announce modal close: "Dialog fechado"
- Header title should be announced first

---

## Reduced Motion

For users with `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .modal-backdrop,
  .modal-dialog {
    animation-duration: 50ms;
    animation-delay: 0ms;
  }

  .modal-dialog {
    transform: none;
  }

  @keyframes dialogEnter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes dialogExit {
    to {
      opacity: 0;
    }
  }
}
```

---

## Voice & Content

### Oitavo Café Modal Voice

**Confirmation dialogs should be conversational and clear:**

**Do:**
- "Tem certeza que quer cancelar? Os dados preenchidos vão sumir."
- Buttons: "Cancelar" / "Continuar preenchendo"

**Don't:**
- "Are you sure?" (too generic)
- Buttons: "Yes" / "No" (unclear what happens)

**Destructive actions:**
```
Title: "Excluir [item]?"
Body: "Essa ação não pode ser desfeita. [Specific consequence]."
Buttons: "Voltar" / "Sim, excluir"
```

**Save prompts:**
```
Title: "Salvar alterações?"
Body: "Você fez mudanças que ainda não foram salvas."
Buttons: "Descartar" / "Salvar"
```

---

## Best Practices

### Do

- Use modals sparingly - they interrupt user flow
- Provide clear, actionable button labels
- Always include a way to close (X button, Cancel, Escape)
- Keep content focused and concise
- Use appropriate size for content
- Maintain brand voice in confirmation messages
- Make primary action visually prominent
- Position destructive actions on the right with warning colors

### Don't

- Stack modals on top of each other
- Use for non-critical information
- Hide the close button
- Use vague button labels ("OK", "Yes")
- Include excessive content requiring extensive scrolling
- Open modals automatically without user action
- Use modals for multi-page forms (use Drawer or dedicated page)
- Block users indefinitely (always provide escape)

---

## Variants

### Alert Modal

Simple confirmation with icon:

```tsx
<Modal.Alert
  variant="warning"
  icon={<AlertTriangle />}
  title="Tem certeza que quer sair?"
  message="As mudanças não salvas vão sumir."
  onConfirm={handleLeave}
  onCancel={handleStay}
  confirmLabel="Sim, sair"
  cancelLabel="Continuar editando"
/>
```

### Form Modal

Optimized for forms with validation:

```tsx
<Modal.Form
  title="Adicionar novo contato"
  onSubmit={handleSubmit}
  submitLabel="Adicionar contato"
>
  <FormField label="Nome" required />
  <FormField label="Email" type="email" required />
  <FormField label="Telefone" />
</Modal.Form>
```

---

## Z-Index Layers

```css
.modal-backdrop {
  z-index: var(--z-modal-backdrop); /* 400 */
}

.modal-dialog {
  z-index: var(--z-modal); /* 500 */
}
```

**Stack order:**
- Base content: 0
- Sticky elements: 100
- Modal backdrop: 400
- Modal dialog: 500
- Popover: 600
- Tooltip: 700

---

## Mobile Considerations

**On mobile devices (< 768px):**

```css
@media (max-width: 767px) {
  .modal-dialog {
    margin: 16px;
    max-height: calc(100vh - 32px);
    width: calc(100vw - 32px);
  }

  /* Full-screen variant for complex modals */
  .modal-dialog.full-mobile {
    margin: 0;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-footer {
    /* Stack buttons vertically */
    flex-direction: column-reverse;
  }

  .modal-footer button {
    width: 100%;
  }
}
```

---

## Implementation Notes

### Focus Trap Implementation

```tsx
import { useEffect, useRef } from 'react';

function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }

    container.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  return containerRef;
}
```

### Body Scroll Lock

```tsx
useEffect(() => {
  if (open) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${getScrollbarWidth()}px`;
  }

  return () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };
}, [open]);
```

---

## Related Components

- **Drawer** - For navigation and filters
- **Popover** - For contextual information without blocking
- **Alert** - For inline notifications
- **Toast** - For non-blocking confirmations

---

**Component Status:** Ready for Implementation
**Last Updated:** 2025-12-13
**Design System:** Oitavo Café v1.0
