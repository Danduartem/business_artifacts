# Alert Component

**Component Type:** Feedback
**Version:** 1.0.0
**Status:** Production Ready
**Last Updated:** 2025-12-13

---

## Overview

Alerts are inline notification components that communicate important information to users without interrupting their workflow. They provide contextual feedback about system states, user actions, or important messages that require attention but not immediate action.

**Purpose:** Inform users about system states, results of actions, or important contextual information within the flow of the interface.

**When to Use:**
- System status updates (maintenance, connection issues)
- Form validation feedback (field-level or form-level)
- Contextual information that enhances understanding
- Warning users about consequences before actions
- Confirming successful operations

**When NOT to Use:**
- Time-sensitive notifications → Use **Toast** instead
- Temporary feedback that auto-dismisses → Use **Toast** instead
- Inline help text → Use **Tooltip** instead
- Loading states → Use **Progress** or **Skeleton** instead

---

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│ [Icon] Title Text                                      [×]  │
│ ────────────────────────────────────────────────────────── │
│ Supporting message text that provides additional context   │
│ and details about the alert.                               │
│                                                             │
│ [Action Button] [Secondary Action]                         │
└─────────────────────────────────────────────────────────────┘
```

### Required Elements
1. **Container** - Background with appropriate semantic color
2. **Icon** - Visual indicator of alert type (16×16px or 20×20px)
3. **Message** - Clear, concise text explaining the alert

### Optional Elements
4. **Title** - Bold heading for longer alerts (font-weight: 600)
5. **Dismiss Button** - Close icon for dismissible alerts
6. **Action Button(s)** - Primary/secondary actions related to the alert
7. **Divider** - Horizontal line separating title from body (when title present)

---

## Variants

### By Severity Type

#### 1. Info Alert
**Purpose:** Neutral information, helpful context, tips

**Visual Properties:**
- Background: `var(--color-primary-100)` (#F8ECEA)
- Border: `2px solid var(--color-primary-600)` (#993A33)
- Icon color: `var(--color-feedback-info)` (#75201C)
- Text color: `var(--color-text-primary)` (#2B2523)
- Icon: ⓘ (info circle)

**Example:**
```
[ⓘ] Seu diagnóstico foi agendado para amanhã às 15h.
```

#### 2. Success Alert
**Purpose:** Confirm successful operations, positive outcomes

**Visual Properties:**
- Background: `#E8F5E9` (light green tint)
- Border: `2px solid var(--color-feedback-success)` (#2D5016)
- Icon color: `var(--color-feedback-success)` (#2D5016)
- Text color: `var(--color-text-primary)` (#2B2523)
- Icon: ✓ (checkmark circle)

**Example:**
```
[✓] Pronto! A gente recebeu e vai analisar seu caso.
```

#### 3. Warning Alert
**Purpose:** Caution users about potential issues, non-critical problems

**Visual Properties:**
- Background: `#FFF8E1` (light amber tint)
- Border: `2px solid var(--color-feedback-warning)` (#8D4C00)
- Icon color: `var(--color-feedback-warning)` (#8D4C00)
- Text color: `var(--color-text-primary)` (#2B2523)
- Icon: ⚠ (warning triangle)

**Example:**
```
[⚠] Calculando seu ROI... (pode levar uns segundos)
```

#### 4. Error Alert
**Purpose:** Critical errors, failed operations, blocking issues

**Visual Properties:**
- Background: `#FFEBEE` (light red tint)
- Border: `2px solid var(--color-feedback-error)` (#B91C1C)
- Icon color: `var(--color-feedback-error)` (#B91C1C)
- Text color: `var(--color-text-primary)` (#2B2523)
- Icon: ✕ (error circle with X)

**Example:**
```
[✕] Ops, esse email não parece válido. Confere de novo?
```

### By Layout

#### Inline Alert
- Width: 100% of container
- Padding: `16px` (var(--space-4))
- Border-radius: `4px` (var(--radius-sm))
- Position: Within content flow

#### Banner Alert
- Width: Full viewport width
- Position: Top of page or section
- Padding: `12px 24px`
- Border-radius: `0` (spans full width)
- Often used for system-wide announcements

---

## Specifications

### Sizing

| Element | Size | Token |
|---------|------|-------|
| Container padding | 16px | var(--space-4) |
| Icon size | 20×20px | - |
| Border width | 2px | - |
| Border radius | 4px | var(--radius-sm) |
| Gap between elements | 12px | var(--space-3) |
| Min height | 48px | - |

### Typography

| Element | Font Size | Weight | Line Height |
|---------|-----------|--------|-------------|
| Title | 16px (base) | 600 (semibold) | 1.5 |
| Message | 14px (sm) | 400 (regular) | 1.5 |
| Action button | 14px (sm) | 500 (medium) | 1.5 |

### Spacing

```
Container:
  padding: 16px (all sides)
  gap: 12px (between icon and content)

Content Stack:
  gap: 8px (between title and message)
  gap: 12px (between message and actions)

Actions Row:
  gap: 8px (between buttons)
```

---

## States

### Default
- Standard appearance as defined by variant
- Fully interactive if dismissible

### Hover (Dismiss Button)
- Background: rgba(0,0,0,0.08)
- Cursor: pointer
- Transition: 200ms ease

### Focus (Dismiss Button)
- Outline: 3px solid with 15% opacity of alert color
- Outline offset: 2px

### Disabled
- Opacity: 0.6
- Cursor: not-allowed
- Non-interactive

---

## Animation Specifications

### Entry Animation
**Type:** Slide down + Fade in

```css
@keyframes alert-enter {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert {
  animation: alert-enter 300ms var(--ease-decelerate);
}
```

**Timing:**
- Duration: 300ms
- Easing: decelerate (cubic-bezier(0, 0, 0.2, 1))
- Delay: 0ms

### Exit Animation (Dismiss)
**Type:** Slide up + Fade out

```css
@keyframes alert-exit {
  from {
    opacity: 1;
    transform: translateY(0);
    max-height: 200px;
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
}

.alert-exiting {
  animation: alert-exit 200ms var(--ease-accelerate) forwards;
}
```

**Timing:**
- Duration: 200ms
- Easing: accelerate (cubic-bezier(0.4, 0, 1, 1))

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .alert {
    animation: none;
  }

  .alert-exiting {
    display: none;
  }
}
```

---

## Props / API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | Alert severity type |
| `children` | `ReactNode \| string` | Alert message content |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Optional heading for the alert |
| `dismissible` | `boolean` | `false` | Show close button |
| `onDismiss` | `() => void` | - | Callback when alert is dismissed |
| `actions` | `AlertAction[]` | - | Array of action buttons |
| `icon` | `ReactNode` | Auto | Custom icon (overrides default) |
| `variant` | `'inline' \| 'banner'` | `'inline'` | Layout variant |
| `className` | `string` | - | Additional CSS classes |
| `id` | `string` | Auto | HTML id attribute |

### AlertAction Type

```typescript
interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
```

---

## Accessibility

### ARIA Attributes

**Required:**
```html
<div
  role="alert"
  aria-live="polite"
  aria-atomic="true"
>
```

**When Dismissible:**
```html
<button
  aria-label="Fechar alerta"
  onClick={handleDismiss}
>
  <svg aria-hidden="true">...</svg>
</button>
```

### ARIA Live Regions

| Type | `aria-live` | Reason |
|------|-------------|--------|
| Info | `polite` | Non-urgent, read at next opportunity |
| Success | `polite` | Positive feedback, not urgent |
| Warning | `polite` | Important but not critical |
| Error | `assertive` | Critical, interrupt immediately |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus dismiss button (if dismissible) |
| `Enter` / `Space` | Activate focused button |
| `Escape` | Dismiss alert (if dismissible) |

### Focus Management

- When alert appears, **do not** automatically move focus
- Screen reader announces via live region
- Focus stays on triggering element
- Exception: If alert contains actionable items, consider focus management

### Color Contrast

All alert variants meet **WCAG AA** standards:

| Element | Foreground | Background | Ratio |
|---------|-----------|-----------|-------|
| Info text | #2B2523 | #F8ECEA | 12.8:1 ✓ |
| Success text | #2B2523 | #E8F5E9 | 13.2:1 ✓ |
| Warning text | #2B2523 | #FFF8E1 | 14.1:1 ✓ |
| Error text | #2B2523 | #FFEBEE | 13.9:1 ✓ |

---

## Reduced Motion Fallbacks

When `prefers-reduced-motion: reduce` is detected:

1. **No entry/exit animations** - Alert appears/disappears instantly
2. **Instant state transitions** - No hover animations
3. **Maintain functionality** - Dismissal still works

```css
@media (prefers-reduced-motion: reduce) {
  .alert,
  .alert-exiting,
  .alert button {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Do's and Don'ts

### Do ✓

**Do use brand voice in messages:**
```
✓ "Ops, esse email não parece válido. Confere de novo?"
✓ "Pronto! A gente recebeu e vai analisar seu caso."
✓ "ROI sendo calculado... (pode levar uns segundos)"
```

**Do stack alerts when multiple are needed:**
```
[Error Alert]
[Warning Alert]
[Info Alert]
```

**Do provide actionable next steps:**
```
[⚠] Sua sessão expira em 2 minutos.
    [Continuar Conectada] [Sair]
```

**Do use appropriate severity:**
- Error: Blocking issues only
- Warning: Potential problems
- Info: Helpful context
- Success: Confirmed actions

### Don't ✗

**Don't use generic corporate language:**
```
✗ "An error has occurred. Please try again later."
✓ "Ops, algo deu errado. Tenta de novo?"
```

**Don't overuse alerts:**
```
✗ Alert for every minor status
✓ Reserve for important information
```

**Don't use success alerts for expected behavior:**
```
✗ "Form field updated successfully"
✓ Use for completed multi-step processes
```

**Don't mix alert and toast:**
```
✗ Inline alert that auto-dismisses
✓ Use Toast for auto-dismiss
```

**Don't rely solely on color:**
```
✗ Red background only
✓ Icon + Color + Clear text
```

---

## Brand Voice Examples

### Error States
```
Ops, esse email não parece válido. Confere de novo?

Eita, algo deu errado ao enviar. Tenta mais uma vez?

Hmm, essa senha precisa ter pelo menos 8 caracteres.
```

### Success States
```
Pronto! A gente recebeu e vai analisar seu caso.

Tudo certo! Seu diagnóstico está agendado.

Feito! Você vai receber a proposta por email.
```

### Warning States
```
Calculando seu ROI... (pode levar uns segundos)

Atenção: essa ação não pode ser desfeita.

Seu orçamento está 80% comprometido este mês.
```

### Info States
```
Dica: você pode acelerar o processo enviando mais detalhes.

Lembra: o diagnóstico é gratuito e sem compromisso.

Seu caso está em análise. Resposta em até 24h.
```

---

## Code Examples

### Basic Alert

```jsx
<Alert type="info">
  Seu diagnóstico foi agendado para amanhã às 15h.
</Alert>
```

### Alert with Title

```jsx
<Alert
  type="success"
  title="Proposta Enviada"
>
  Você vai receber a proposta por email em até 1 hora.
</Alert>
```

### Dismissible Alert

```jsx
<Alert
  type="warning"
  dismissible
  onDismiss={() => console.log('Alert dismissed')}
>
  Calculando seu ROI... (pode levar uns segundos)
</Alert>
```

### Alert with Actions

```jsx
<Alert
  type="error"
  title="Sessão Expirando"
  actions={[
    {
      label: 'Continuar Conectada',
      onClick: extendSession,
      variant: 'primary'
    },
    {
      label: 'Sair',
      onClick: logout,
      variant: 'secondary'
    }
  ]}
>
  Sua sessão expira em 2 minutos.
</Alert>
```

### Custom Icon

```jsx
<Alert
  type="info"
  icon={<CoffeeIcon />}
>
  Pausa para o café? Seus leads ainda estarão aqui.
</Alert>
```

---

## Implementation Notes

### Container Structure

```jsx
<div className="alert alert--{type}" role="alert" aria-live="polite">
  <div className="alert__icon">
    {/* Icon component */}
  </div>

  <div className="alert__content">
    {title && <div className="alert__title">{title}</div>}
    <div className="alert__message">{children}</div>
    {actions && (
      <div className="alert__actions">
        {/* Action buttons */}
      </div>
    )}
  </div>

  {dismissible && (
    <button className="alert__dismiss" aria-label="Fechar alerta">
      <CloseIcon />
    </button>
  )}
</div>
```

### CSS Architecture

```css
/* Base */
.alert {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-sm);
  border-width: 2px;
  border-style: solid;
  min-height: 48px;
}

/* Variants */
.alert--info {
  background: var(--color-primary-100);
  border-color: var(--color-primary-600);
}

.alert--success {
  background: #E8F5E9;
  border-color: var(--color-feedback-success);
}

.alert--warning {
  background: #FFF8E1;
  border-color: var(--color-feedback-warning);
}

.alert--error {
  background: #FFEBEE;
  border-color: var(--color-feedback-error);
}

/* Content */
.alert__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.alert__title {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.alert__message {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.alert__actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

/* Dismiss button */
.alert__dismiss {
  align-self: flex-start;
  padding: var(--space-1);
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--duration-fast);
}

.alert__dismiss:hover {
  background: rgba(0, 0, 0, 0.08);
}

.alert__dismiss:focus-visible {
  outline: 3px solid rgba(0, 0, 0, 0.15);
  outline-offset: 2px;
}
```

---

## Related Components

- **Toast** - For temporary, auto-dismissing notifications
- **Tooltip** - For inline contextual help
- **Modal** - For critical alerts requiring immediate action
- **Banner** - For persistent system-wide announcements

---

## Resources

- Design Tokens: `/tokens.css`
- Icon System: `/design/icon-system.md`
- Brand Voice: `/voice-forge/voice-documentation.md`
- Accessibility Guidelines: WCAG 2.1 Level AA

---

**Component Owner:** Design System Team
**Last Review:** 2025-12-13
**Next Review:** 2026-03-13
