# Switch Component (Toggle)

## Overview

An on/off switch control for binary state changes that take effect immediately. Visually communicates current state and provides instant feedback when toggled.

**When to use:**
- Settings that apply immediately (no save button needed)
- Feature toggles (enable/disable functionality)
- User preferences (notifications, dark mode, auto-save)
- Binary state that changes instantly

**When NOT to use:**
- Actions requiring confirmation (use Checkbox + Save button)
- Changes that take time to process (loading states unclear)
- Mutually exclusive choices (use Radio buttons)
- Multiple independent selections (use Checkboxes)

---

## Anatomy

```
Switch Off:
┌─────────────────────────────────────────────┐
│ ◯──────  Label text                         │
└─────────────────────────────────────────────┘

Switch On:
┌─────────────────────────────────────────────┐
│ ──────◯  Label text                         │
└─────────────────────────────────────────────┘

With Status Text:
┌─────────────────────────────────────────────┐
│ ──────◯  Notificações ativadas             │
└─────────────────────────────────────────────┘

Components:
1. Switch track (48×24px pill)
2. Switch thumb/circle (20px)
3. Label text (clickable)
4. Status indicator (optional)
5. Helper text (optional)
```

---

## Variants

| Variant | Use Case | Specifications |
|---------|----------|----------------|
| **Default** | Standard toggle switch | 48×24px track, neutral off / accent on |
| **With Status** | Shows current state in label | "Notificações ativadas" vs "Notificações desativadas" |
| **With Icon** | Visual state reinforcement | Icon changes based on on/off state |
| **Loading** | Processing state change | Show spinner, disable interaction |

---

## Sizes

| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Track Width** | 48px | 3 × var(--space-4) |
| **Track Height** | 24px | var(--space-6) |
| **Border Radius** | 12px (pill) | var(--radius-full) |
| **Thumb Size** | 20px diameter | - |
| **Thumb Padding** | 2px from edges | - |
| **Touch Target** | 44×44px (with padding) | WCAG 2.5.5 AAA |
| **Label Margin** | 12px left | var(--space-3) |
| **Label Font Size** | 16px | var(--font-size-base) |
| **Transition Duration** | 200ms | var(--duration-base) |

---

## States

### Off (Default)
```css
.switch-track {
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background: var(--color-neutral-300);
  cursor: pointer;
  transition: background var(--duration-base) var(--ease-easeOut);
}

.switch-thumb {
  position: absolute;
  left: 2px;
  top: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform var(--duration-base) var(--ease-easeOut);
}
```

### On
```css
.switch-input:checked + .switch-track {
  background: var(--color-accent-600);
}

.switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(24px); /* 48px - 20px - 4px padding */
}
```

### Hover (Off)
```css
.switch-track:hover {
  background: var(--color-neutral-400);
}
```

### Hover (On)
```css
.switch-input:checked + .switch-track:hover {
  background: var(--color-accent-500);
}
```

### Focus
```css
.switch-input:focus + .switch-track {
  outline: 3px solid var(--color-accent-200);
  outline-offset: 2px;
}
```

### Disabled (Off)
```css
.switch-input:disabled + .switch-track {
  background: var(--color-neutral-200);
  cursor: not-allowed;
  opacity: 0.5;
}

.switch-input:disabled + .switch-track .switch-thumb {
  background: var(--color-neutral-100);
}
```

### Disabled (On)
```css
.switch-input:disabled:checked + .switch-track {
  background: var(--color-neutral-400);
  cursor: not-allowed;
  opacity: 0.5;
}

.switch-input:disabled:checked + .switch-track .switch-thumb {
  background: var(--color-neutral-100);
}
```

### Loading
```css
.switch-track.is-loading {
  cursor: wait;
  opacity: 0.7;
}

.switch-track.is-loading .switch-thumb::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  top: 4px;
  left: 4px;
  border: 2px solid var(--color-neutral-400);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Props/API

```typescript
interface SwitchProps {
  /** Unique identifier */
  id: string;

  /** Switch name attribute */
  name: string;

  /** Label text */
  label: string;

  /** Whether switch is on */
  checked?: boolean;

  /** Whether switch is disabled */
  disabled?: boolean;

  /** Whether switch is in loading state */
  loading?: boolean;

  /** Helper text */
  helperText?: string;

  /** Show state in label (e.g., "Ativado" / "Desativado") */
  showStatus?: boolean;

  /** Custom on/off labels */
  onLabel?: string;
  offLabel?: string;

  /** Change handler */
  onChange?: (checked: boolean) => void;

  /** ARIA attributes */
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab:** Focus switch
- **Shift + Tab:** Focus previous element
- **Space / Enter:** Toggle switch state
- **Disabled:** Cannot be focused or toggled

### Screen Reader Support

#### Basic Switch
```html
<div class="switch-field">
  <input
    type="checkbox"
    role="switch"
    id="notifications"
    name="notifications"
    class="switch-input"
    aria-checked="false"
    aria-describedby="notifications-helper"
  />
  <label for="notifications" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>
    <span class="switch-label">Notificações por email</span>
  </label>
  <span id="notifications-helper" class="helper-text">
    Receba atualizações sobre suas campanhas
  </span>
</div>
```

#### With Status Text
```html
<div class="switch-field">
  <input
    type="checkbox"
    role="switch"
    id="auto-save"
    name="autoSave"
    class="switch-input"
    aria-checked="true"
    checked
  />
  <label for="auto-save" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>
    <span class="switch-label">
      <span class="switch-label-text">Auto-save</span>
      <span class="switch-status" aria-live="polite">Ativado</span>
    </span>
  </label>
</div>
```

### ARIA Attributes
- `role="switch"` - Identifies as switch (not just checkbox)
- `aria-checked="true/false"` - Current state for screen readers
- `aria-label` or associated `<label>` - Provides accessible name
- `aria-describedby` - Links to helper text
- `aria-live="polite"` - Announces status changes
- `aria-disabled="true"` - For disabled switches

### WCAG Compliance
- **Touch target:** 44×44px minimum (WCAG 2.5.5 AAA)
- **Color contrast:** Don't rely on color alone (position indicates state)
- **Focus indicator:** 3px outline visible
- **State indication:** Position + color communicate state
- **Keyboard accessible:** Space/Enter toggle functionality
- **Motion:** Respect prefers-reduced-motion

---

## Usage Guidelines

### Do's

✅ **Use for immediate state changes**
- Toggle takes effect instantly
- No "Save" button needed
- Example: Enable/disable notifications

✅ **Provide clear labels for both states**
- Show what the switch controls
- "Notificações ativadas" vs "Notificações desativadas"
- User knows what will happen

✅ **Use success/accent color for on state**
- Golden amber (accent) = enabled, positive
- Communicates active state clearly
- Neutral gray for off = inactive

✅ **Show feedback when state changes**
- Toast notification: "Notificações ativadas"
- Update status text immediately
- Confirm action was successful

✅ **Use for settings and preferences**
- Auto-save, dark mode, compact view
- Privacy settings (show profile publicly)
- Feature flags (enable beta features)

✅ **Disable if action not currently available**
- Show why it's disabled in helper text
- Example: "Disponível apenas no plano Pro"

### Don'ts

❌ **Don't use for actions requiring confirmation**
- Deleting data, canceling subscriptions
- Use Checkbox + Save button instead
- Switch implies safe, reversible action

❌ **Don't use if change takes time to process**
- Loading state isn't clear in switch
- Use button with loading spinner instead
- User needs clear processing feedback

❌ **Don't use red for off state**
- Off ≠ error or danger
- Use neutral colors (gray)
- Red should only mean error

❌ **Don't require save button after toggle**
- Switch implies immediate action
- If save needed, use checkbox instead
- Don't confuse the pattern

❌ **Don't use for mutually exclusive choices**
- Use Radio buttons instead
- Switch is binary: on/off
- Not for choosing between options

❌ **Don't make label unclear about what's being toggled**
- ❌ "Notifications" (vague - what about them?)
- ✅ "Receber notificações por email" (clear action)

---

## Code Examples

### Basic Switch

```html
<div class="switch-field">
  <input
    type="checkbox"
    role="switch"
    id="email-updates"
    name="emailUpdates"
    class="switch-input"
    aria-checked="false"
  />
  <label for="email-updates" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>
    <span class="switch-label">
      Receber atualizações por email
    </span>
  </label>
  <span class="helper-text">
    Enviamos apenas atualizações importantes, sem spam
  </span>
</div>
```

### With Status Text

```html
<div class="switch-field">
  <input
    type="checkbox"
    role="switch"
    id="dark-mode"
    name="darkMode"
    class="switch-input"
    aria-checked="true"
    checked
  />
  <label for="dark-mode" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>
    <span class="switch-label">
      <span class="switch-label-text">Modo escuro</span>
      <span class="switch-status" aria-live="polite">Ativado</span>
    </span>
  </label>
</div>
```

### Disabled State

```html
<div class="switch-field">
  <input
    type="checkbox"
    role="switch"
    id="advanced-analytics"
    name="advancedAnalytics"
    class="switch-input"
    aria-checked="false"
    disabled
    aria-describedby="analytics-helper"
  />
  <label for="advanced-analytics" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>
    <span class="switch-label">
      Analytics avançado
    </span>
  </label>
  <span id="analytics-helper" class="helper-text">
    Disponível apenas no plano Pro
    <a href="/upgrade">Fazer upgrade</a>
  </span>
</div>
```

### Group of Switches (Settings)

```html
<fieldset class="switch-group">
  <legend class="switch-group-label">
    Preferências de notificação
  </legend>

  <div class="switch-field">
    <input
      type="checkbox"
      role="switch"
      id="notify-email"
      name="notifyEmail"
      class="switch-input"
      checked
    />
    <label for="notify-email" class="switch-container">
      <span class="switch-track">
        <span class="switch-thumb"></span>
      </span>
      <span class="switch-label">Notificações por email</span>
    </label>
  </div>

  <div class="switch-field">
    <input
      type="checkbox"
      role="switch"
      id="notify-push"
      name="notifyPush"
      class="switch-input"
    />
    <label for="notify-push" class="switch-container">
      <span class="switch-track">
        <span class="switch-thumb"></span>
      </span>
      <span class="switch-label">Notificações push</span>
    </label>
  </div>

  <div class="switch-field">
    <input
      type="checkbox"
      role="switch"
      id="notify-sms"
      name="notifySms"
      class="switch-input"
    />
    <label for="notify-sms" class="switch-container">
      <span class="switch-track">
        <span class="switch-thumb"></span>
      </span>
      <span class="switch-label">Notificações por SMS</span>
    </label>
  </div>
</fieldset>
```

### CSS Implementation

```css
/* Switch Field */
.switch-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

/* Hide Native Checkbox */
.switch-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* Switch Container */
.switch-container {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
}

/* Switch Track */
.switch-track {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  min-width: 48px; /* Prevent shrinking */
  border-radius: 12px;
  background: var(--color-neutral-300);
  transition: background var(--duration-base) var(--ease-easeOut);
}

/* Switch Thumb */
.switch-thumb {
  position: absolute;
  left: 2px;
  top: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform var(--duration-base) var(--ease-easeOut);
}

/* Checked State */
.switch-input:checked + .switch-container .switch-track {
  background: var(--color-accent-600);
}

.switch-input:checked + .switch-container .switch-thumb {
  transform: translateX(24px);
}

/* Hover States */
.switch-container:hover .switch-track {
  background: var(--color-neutral-400);
}

.switch-input:checked + .switch-container:hover .switch-track {
  background: var(--color-accent-500);
}

/* Focus State */
.switch-input:focus + .switch-container .switch-track {
  outline: 3px solid var(--color-accent-200);
  outline-offset: 2px;
}

/* Disabled States */
.switch-input:disabled + .switch-container {
  cursor: not-allowed;
  opacity: 0.5;
}

.switch-input:disabled + .switch-container .switch-track {
  background: var(--color-neutral-200);
}

.switch-input:disabled + .switch-container .switch-thumb {
  background: var(--color-neutral-100);
}

.switch-input:disabled:checked + .switch-container .switch-track {
  background: var(--color-neutral-400);
}

/* Label */
.switch-label {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}

.switch-label-text {
  font-weight: var(--font-weight-medium);
}

/* Status Text */
.switch-status {
  display: inline-block;
  margin-left: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-regular);
}

.switch-input:checked ~ .switch-label .switch-status::before {
  content: 'Ativado';
  color: var(--color-accent-700);
}

.switch-input:not(:checked) ~ .switch-label .switch-status::before {
  content: 'Desativado';
  color: var(--color-text-tertiary);
}

/* Loading State */
.switch-track.is-loading {
  cursor: wait;
  opacity: 0.7;
}

.switch-track.is-loading .switch-thumb::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  top: 4px;
  left: 4px;
  border: 2px solid var(--color-neutral-400);
  border-top-color: transparent;
  border-radius: 50%;
  animation: switch-spin 0.6s linear infinite;
}

@keyframes switch-spin {
  to { transform: rotate(360deg); }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .switch-track,
  .switch-thumb {
    transition: none;
  }
}

/* Switch Group */
.switch-group {
  border: none;
  padding: 0;
  margin: 0;
}

.switch-group-label {
  display: block;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}
```

### JavaScript Implementation

```javascript
class Switch {
  constructor(element) {
    this.input = element;
    this.container = element.nextElementSibling;
    this.statusElement = this.container.querySelector('.switch-status');

    this.init();
  }

  init() {
    this.input.addEventListener('change', () => this.handleChange());
  }

  handleChange() {
    const isChecked = this.input.checked;

    // Update ARIA
    this.input.setAttribute('aria-checked', isChecked);

    // Update status text
    if (this.statusElement) {
      this.statusElement.textContent = isChecked ? 'Ativado' : 'Desativado';
    }

    // Call onChange callback if provided
    if (this.input.onChange && typeof this.input.onChange === 'function') {
      this.input.onChange(isChecked);
    }

    // Show feedback toast (optional)
    this.showFeedback(isChecked);
  }

  showFeedback(isChecked) {
    const label = this.container.querySelector('.switch-label-text, .switch-label').textContent;
    const message = `${label} ${isChecked ? 'ativado' : 'desativado'}`;

    // Implement your toast/notification system here
    console.log(message);
  }

  async toggle() {
    if (this.input.disabled) return;

    // Simulate async operation
    this.setLoading(true);

    try {
      // Your API call here
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.input.checked = !this.input.checked;
      this.handleChange();
    } catch (error) {
      console.error('Failed to toggle:', error);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(isLoading) {
    const track = this.container.querySelector('.switch-track');

    if (isLoading) {
      track.classList.add('is-loading');
      this.input.disabled = true;
    } else {
      track.classList.remove('is-loading');
      this.input.disabled = false;
    }
  }
}

// Initialize all switches
document.querySelectorAll('.switch-input').forEach(input => {
  new Switch(input);
});
```

---

## Related Components

- **[Checkbox](./checkbox.md)** - For multiple selections requiring save
- **[Radio](./radio.md)** - For mutually exclusive choices
- **[Form Field](./form-field.md)** - Wrapper with label and helper text
- **[Button](./button.md)** - For actions requiring confirmation

---

## Brand Voice in Labels

Following Oitavo Café's conversational, helpful tone:

### Good Label Examples
- "Receber notificações por email"
- "Ativar modo compacto"
- "Mostrar meu perfil publicamente"
- "Auto-save de rascunhos"

### Good Status Text Examples
- "Ativado" / "Desativado"
- "Ligado" / "Desligado"
- Avoid "On" / "Off" (use Portuguese)

### Good Helper Text Examples
- "Enviamos apenas atualizações importantes, sem spam"
- "Sua conta ficará visível pra outros usuários"
- "Rascunhos são salvos automaticamente a cada 30 segundos"
- "Disponível apenas no plano Pro - Fazer upgrade"

### Good Feedback Messages (Toasts)
- "Notificações ativadas! Você vai receber atualizações por email"
- "Modo escuro desativado"
- "Configuração salva com sucesso"

### Bad Examples
- ❌ "Email notifications" (English)
- ❌ "Toggle feature" (too technical)
- ❌ "Enable/Disable" (vague - what exactly?)
- ❌ "On/Off" (use Portuguese: Ativado/Desativado)

Remember: Be clear about what the switch controls and what happens when toggled. Users should never wonder "what does this do?"
