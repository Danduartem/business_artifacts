# Alert Component

## Overview

Inline feedback messages that communicate status, warnings, errors, or important information to users. Alerts appear within the page flow and persist until dismissed or resolved. They provide contextual feedback that helps users understand system state and take corrective action.

**When to use:**
- Form validation results
- System status updates
- Important warnings before destructive actions
- Success confirmations for completed tasks
- Informational notices about features or changes

**When not to use:**
- Temporary notifications (use Toast instead)
- Blocking dialogs (use Modal instead)
- Contextual help (use Tooltip or Popover instead)

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  [Icon]  Message text goes here with optional action       × │
│          Additional context or details on second line        │
└─────────────────────────────────────────────────────────────┘

Components:
1. Container - Full-width background with border
2. Icon - Visual indicator of alert type (20×20px)
3. Message - Primary alert text
4. Description (optional) - Supporting details
5. Action (optional) - Link or button for user action
6. Dismiss button (optional) - Close/remove alert
```

## Variants

### Success Alert
**Purpose:** Confirm successful completion of an action or process.

```css
Background: var(--feedback-success-light) /* #D1FAE5 */
Border: 1px solid var(--feedback-success-default) /* #2D5016 */
Icon: Checkmark circle (--feedback-success-default)
Text: var(--feedback-success-default)
```

**Voice examples:**
- "Pronto! A gente recebeu e vai analisar seu caso."
- "Material enviado com sucesso! Vamos revisar e responder em até 24h."
- "Campanha ativada. Começamos a monitorar os resultados agora."

### Warning Alert
**Purpose:** Draw attention to important information that requires consideration.

```css
Background: var(--feedback-warning-light) /* #FEF3C7 */
Border: 1px solid var(--feedback-warning-default) /* #8D4C00 */
Icon: Alert triangle (--feedback-warning-default)
Text: var(--feedback-warning-default)
```

**Voice examples:**
- "Atenção: isso vai apagar os dados permanentemente. Tem certeza?"
- "Seu período de teste acaba em 3 dias. Que tal garantir o acesso?"
- "Alguns campos estão vazios. Preencha tudo pra gente ter o contexto completo."

### Error Alert
**Purpose:** Communicate errors, failures, or blocking issues that need resolution.

```css
Background: var(--feedback-error-light) /* #FEE2E2 */
Border: 1px solid var(--feedback-error-default) /* #B91C1C */
Icon: X circle (--feedback-error-default)
Text: var(--feedback-error-default)
```

**Voice examples:**
- "Algo deu errado (culpa nossa, não sua). Tenta de novo?"
- "Não conseguimos processar o pagamento. Confere os dados do cartão?"
- "Arquivo muito grande (máx 5MB). Pode comprimir ou dividir?"

### Info Alert
**Purpose:** Provide helpful information, tips, or context.

```css
Background: var(--feedback-info-light) /* #FCF5F4 */
Border: 1px solid var(--feedback-info-default) /* #75201C */
Icon: Info circle (--feedback-info-default)
Text: var(--feedback-info-default)
```

**Voice examples:**
- "Dica: você pode arrastar pra reordenar os itens."
- "Novidade: agora dá pra exportar relatórios em PDF também."
- "Esse recurso tá em beta. Feedback é muito bem-vindo!"

## Sizes

### Default
```css
Padding: var(--spacing-4) /* 16px */
Gap: var(--spacing-3) /* 12px between icon and text */
Border radius: var(--border-radius-md) /* 8px */
Font size: var(--font-size-base) /* 16px */
Line height: var(--line-height-normal) /* 1.5 */
Min height: 56px
```

### Compact
```css
Padding: var(--spacing-3) /* 12px */
Gap: var(--spacing-2) /* 8px */
Border radius: var(--border-radius-sm) /* 4px */
Font size: var(--font-size-sm) /* 13px */
Line height: var(--line-height-relaxed) /* 1.6 */
Min height: 44px
```

## States

### Default
- Standard appearance as defined in variants
- Fully visible and readable
- Interactive elements (dismiss, actions) available

### Hover (on action/dismiss)
```css
Dismiss button:
  Background: rgba(0, 0, 0, 0.08)
  Border radius: var(--border-radius-sm)
  Transition: background var(--duration-fast) var(--ease-gentle)

Action link:
  Text decoration: underline
  Color: Darken by 10% (OKLCH L-0.1)
  Transition: color var(--duration-fast) var(--ease-standard)
```

### Focus (on dismiss/action)
```css
Outline: 2px solid currentColor
Outline offset: 2px
Border radius: var(--border-radius-sm)
```

### Dismissing
```css
Animation: alert-exit
Duration: var(--duration-base) /* 200ms */
Easing: var(--ease-accelerate)
Properties:
  - opacity: 1 → 0
  - transform: translateX(0) → translateX(8px)
  - height: current → 0
  - margin: current → 0
```

## Animation

### Entry (on mount)
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

Duration: var(--duration-base) /* 200ms */
Easing: var(--ease-decelerate)
```

### Exit (on dismiss)
```css
@keyframes alert-exit {
  from {
    opacity: 1;
    transform: translateX(0);
    max-height: 200px;
  }
  to {
    opacity: 0;
    transform: translateX(8px);
    max-height: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
}

Duration: var(--duration-fast) /* 150ms */
Easing: var(--ease-accelerate)
```

## Props/API

```typescript
interface AlertProps {
  /** Alert variant type */
  variant: 'success' | 'warning' | 'error' | 'info';

  /** Primary message (required) */
  message: string;

  /** Additional description (optional) */
  description?: string;

  /** Show dismiss button */
  dismissible?: boolean;

  /** Callback when dismissed */
  onDismiss?: () => void;

  /** Optional action */
  action?: {
    label: string;
    onClick: () => void;
  };

  /** Size variant */
  size?: 'default' | 'compact';

  /** Custom icon (overrides default) */
  icon?: React.ReactNode;

  /** Additional CSS class */
  className?: string;

  /** ARIA role override */
  role?: 'alert' | 'status';
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Error alerts (immediate attention) -->
<div role="alert" aria-live="assertive">
  ...
</div>

<!-- Success/Info/Warning (polite notification) -->
<div role="status" aria-live="polite">
  ...
</div>
```

### Keyboard Navigation
- **Tab**: Move focus to action button or dismiss button
- **Enter/Space**: Activate focused button
- **Escape**: Dismiss alert (if dismissible)

### Screen Reader Considerations
- Alert type is announced via icon's `aria-label`
- Message and description are read in sequence
- Dismiss button has descriptive label: "Fechar alerta"
- Action buttons have clear, specific labels

### Focus Management
- When alert appears, focus remains on triggering element
- Exception: Error alerts for form validation may focus first input
- Dismiss button is last in tab order
- Focus trap is NOT needed (alerts are not modal)

## Usage Guidelines

### Do's

✓ **Use appropriate variant for context**
  - Success: Completed actions
  - Warning: Cautionary information
  - Error: Failures or blocking issues
  - Info: Helpful tips or notices

✓ **Write clear, actionable messages**
  - "Arquivo salvo com sucesso" ✓
  - "Operação concluída" ✗ (too vague)

✓ **Provide specific error solutions**
  - "Email inválido. Verifique se incluiu o @" ✓
  - "Erro ao salvar" ✗ (not helpful)

✓ **Limit to 1-2 alerts visible at once**
  - Multiple alerts cause cognitive overload
  - Stack vertically with spacing if multiple needed

✓ **Place alerts near related content**
  - Form errors: Top of form
  - Section updates: Within section
  - Page-level: Top of page

### Don'ts

✗ **Don't use for time-sensitive notifications**
  - Use Toast for temporary messages
  - Alerts persist until dismissed

✗ **Don't nest interactive elements**
  - Links in messages are OK
  - Complex forms/buttons belong elsewhere

✗ **Don't rely on color alone**
  - Always include icon
  - Text must convey full meaning

✗ **Don't make alerts blocking**
  - User can scroll past
  - Use Modal for required acknowledgment

✗ **Don't auto-dismiss error alerts**
  - Errors need user acknowledgment
  - Success alerts can auto-dismiss

## Code Examples

### Basic Alert

```html
<div class="alert alert--success" role="status" aria-live="polite">
  <svg class="alert__icon" aria-label="Sucesso">
    <use href="#icon-check-circle"></use>
  </svg>
  <div class="alert__content">
    <p class="alert__message">
      Pronto! A gente recebeu e vai analisar seu caso.
    </p>
  </div>
</div>
```

```css
.alert {
  display: flex;
  align-items: start;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  border: 1px solid;
  min-height: 56px;

  animation: alert-enter var(--duration-base) var(--ease-decelerate);
}

.alert--success {
  background: var(--feedback-success-light);
  border-color: var(--feedback-success-default);
  color: var(--feedback-success-default);
}

.alert--warning {
  background: var(--feedback-warning-light);
  border-color: var(--feedback-warning-default);
  color: var(--feedback-warning-default);
}

.alert--error {
  background: var(--feedback-error-light);
  border-color: var(--feedback-error-default);
  color: var(--feedback-error-default);
}

.alert--info {
  background: var(--feedback-info-light);
  border-color: var(--feedback-info-default);
  color: var(--feedback-info-default);
}

.alert__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px; /* Optical alignment with text */
}

.alert__content {
  flex: 1;
  min-width: 0;
}

.alert__message {
  margin: 0;
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  font-weight: var(--font-weight-medium);
}

.alert__description {
  margin: var(--spacing-1) 0 0;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  opacity: 0.9;
}
```

### Alert with Dismiss Button

```html
<div class="alert alert--warning" role="status" aria-live="polite">
  <svg class="alert__icon" aria-label="Atenção">
    <use href="#icon-alert-triangle"></use>
  </svg>
  <div class="alert__content">
    <p class="alert__message">
      Atenção: isso vai apagar os dados permanentemente.
    </p>
  </div>
  <button
    class="alert__dismiss"
    type="button"
    aria-label="Fechar alerta"
  >
    <svg aria-hidden="true">
      <use href="#icon-x"></use>
    </svg>
  </button>
</div>
```

```css
.alert__dismiss {
  padding: var(--spacing-2);
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  flex-shrink: 0;

  transition: background var(--duration-fast) var(--ease-gentle);
}

.alert__dismiss:hover {
  background: rgba(0, 0, 0, 0.08);
}

.alert__dismiss:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.alert__dismiss svg {
  width: 16px;
  height: 16px;
  display: block;
}
```

### Alert with Action

```html
<div class="alert alert--info" role="status" aria-live="polite">
  <svg class="alert__icon" aria-label="Informação">
    <use href="#icon-info-circle"></use>
  </svg>
  <div class="alert__content">
    <p class="alert__message">
      Novidade: agora dá pra exportar relatórios em PDF também.
    </p>
    <a href="/docs/export" class="alert__action">
      Ver como funciona →
    </a>
  </div>
</div>
```

```css
.alert__action {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  margin-top: var(--spacing-2);
  color: inherit;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;

  transition: all var(--duration-fast) var(--ease-standard);
}

.alert__action:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.alert__action:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}
```

### React Component

```tsx
import React, { useState } from 'react';

const icons = {
  success: 'check-circle',
  warning: 'alert-triangle',
  error: 'x-circle',
  info: 'info-circle',
};

export function Alert({
  variant,
  message,
  description,
  dismissible = false,
  onDismiss,
  action,
  size = 'default',
  icon,
  className = '',
  role,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.();
    }, 200); // Match animation duration
  };

  if (!isVisible) return null;

  const alertRole = role || (variant === 'error' ? 'alert' : 'status');
  const ariaLive = variant === 'error' ? 'assertive' : 'polite';

  return (
    <div
      className={`alert alert--${variant} alert--${size} ${className}`}
      role={alertRole}
      aria-live={ariaLive}
    >
      <svg className="alert__icon" aria-label={getAriaLabel(variant)}>
        <use href={`#icon-${icon || icons[variant]}`} />
      </svg>

      <div className="alert__content">
        <p className="alert__message">{message}</p>
        {description && (
          <p className="alert__description">{description}</p>
        )}
        {action && (
          <button
            type="button"
            className="alert__action"
            onClick={action.onClick}
          >
            {action.label} →
          </button>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          className="alert__dismiss"
          onClick={handleDismiss}
          aria-label="Fechar alerta"
        >
          <svg aria-hidden="true">
            <use href="#icon-x" />
          </svg>
        </button>
      )}
    </div>
  );
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

---

**Version:** 1.0
**Last updated:** 2025-12-13
**Component Specifier:** Design System Team
