# Switch Component

**Component Type:** Form Control
**Category:** Forms
**Status:** Core Component
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

The Switch component is a toggle for binary (on/off) settings and preferences. It provides immediate visual feedback and is perfect for enabling/disabling features or opting in/out of preferences.

**Primary Use Cases:**
- Feature toggles
- Preference settings
- Instant state changes
- Marketing opt-ins

**Key Principle:** Switches should have immediate effect or clearly indicate the change will apply. Don't use for actions that require confirmation - use checkboxes instead.

---

## Anatomy

```
┌─ Switch Component ──────────────────────────────┐
│ ⚫────○  Quero receber novidades por email       │
└──────────────────────────────────────────────────┘
  ↑  ↑            ↑
Track Thumb     Label (clickable)

[When ON]
┌─ Switch Component ──────────────────────────────┐
│ ○────⚫  Quero receber novidades por email       │
└──────────────────────────────────────────────────┘
```

**Elements:**
1. **Track** - Background rail (changes color based on state)
2. **Thumb** - Circular button that slides
3. **Label** - Descriptive text (required)
4. **Helper Text** - Additional context (optional)
5. **State Indicator** - "On/Off" text (optional)

---

## Variants

### 1. Standard Switch
Basic toggle switch with label.

**When to use:** Most common - simple toggles.

### 2. Switch with Description
Switch with explanatory helper text.

**When to use:** When toggle needs clarification.

### 3. Switch with State Labels
Shows "On" or "Off" text next to switch.

**When to use:** When state clarity is critical.

---

## States

### Default (Off)
```css
Track {
  width: 44px;
  height: 24px;
  background: var(--neutral-300);
  border-radius: 12px; /* Pill shape */
  transition: background 0.2s ease;
  cursor: pointer;
}

Thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateX(2px);
  transition: transform 0.2s ease;
}

Label {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
}
```

### Hover (Off)
```css
Track:hover {
  background: var(--neutral-400);
}
```

### Focus
```css
Switch:focus Track {
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
  outline: none;
}
```

### On (Checked)
```css
Track:checked {
  background: var(--color-brand-primary);
}

Thumb:checked {
  transform: translateX(22px); /* Move to right */
}
```

### Hover (On)
```css
Track:hover:checked {
  background: var(--primary-800);
}
```

### Disabled (Off)
```css
Track:disabled {
  background: var(--neutral-200);
  cursor: not-allowed;
  opacity: 0.6;
}

Thumb:disabled {
  cursor: not-allowed;
}

Label[aria-disabled="true"] {
  color: var(--text-disabled);
  cursor: not-allowed;
}
```

### Disabled (On)
```css
Track:disabled:checked {
  background: var(--neutral-400);
}
```

### Loading
```css
Thumb.loading {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## Props/API

```typescript
interface SwitchProps {
  // Required
  id: string;
  name: string;
  label: string;

  // State
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean; // For async operations

  // Additional content
  description?: string;
  showStateLabel?: boolean; // Show "On/Off" text

  // Sizing
  size?: 'sm' | 'md' | 'lg';

  // Callbacks
  onChange?: (checked: boolean) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: 'switch'; // Default
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab** - Focus switch
- **Space** - Toggle switch
- **Enter** - Toggle switch

### Screen Reader Support

```html
<div class="switch-wrapper">
  <input
    type="checkbox"
    id="newsletter"
    name="newsletter"
    class="switch-input"
    role="switch"
    aria-checked="false"
    aria-describedby="newsletter-desc"
  />

  <label for="newsletter" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>

    <span class="switch-content">
      <span class="switch-label">
        Quero receber novidades por email
      </span>
      <span id="newsletter-desc" class="switch-description">
        (prometemos não encher sua caixa)
      </span>
    </span>
  </label>
</div>
```

### ARIA Attributes
- `role="switch"` - Required for custom switches
- `aria-checked` - Current state ("true"/"false")
- `aria-describedby` - Links description
- `aria-label` - When no visible label
- `aria-disabled` - When disabled

### Focus Management
- Clear 3px focus ring on track
- Focus visible on track (not thumb)
- Never remove focus indicators

### Touch Targets
- Minimum 44x44px touch area
- Entire label is clickable
- Switch track is 44px wide minimum

---

## Do / Don't

### Label Microcopy

**DO:**
- "Quero receber novidades por email" ✓
- "Habilitar notificações de novas oportunidades" ✓
- "Manter conectado neste dispositivo" ✓
- Use active voice, describe what happens when ON

**DON'T:**
- "Newsletter" ✗ (unclear what switch does)
- "Enable feature" ✗ (too generic)
- "Yes/No" ✗ (use radio buttons instead)

### Descriptions

**DO:**
- "(prometemos não encher sua caixa)" ✓
- "(você pode mudar isso depois nas configurações)" ✓
- Use for context or reassurance

**DON'T:**
- "Toggle this switch to enable" ✗ (obvious)
- Write long paragraphs ✗

### When to Use Switch vs Checkbox

**USE SWITCH:**
- Immediate effect ✓
- Enable/disable features ✓
- Toggle settings ✓
- Binary state changes ✓

**USE CHECKBOX:**
- Requires form submission ✓
- Agreement to terms ✓
- Multi-select from list ✓
- Needs confirmation before applying ✓

### State Labels

**DO:**
- Keep it simple: "Ativado" / "Desativado" ✓
- Or: "Sim" / "Não" ✓
- Only when state ambiguity exists ✓

**DON'T:**
- Use long state labels ✗
- Rely solely on state label (have a descriptive label too) ✗

---

## Code Examples

### Basic Switch

```html
<div class="switch-wrapper">
  <input
    type="checkbox"
    id="newsletter"
    name="newsletter"
    class="switch-input"
    role="switch"
    aria-checked="false"
  />

  <label for="newsletter" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>

    <span class="switch-label">
      Quero receber novidades por email
    </span>
  </label>
</div>
```

### Switch with Description

```html
<div class="switch-wrapper">
  <input
    type="checkbox"
    id="notifications"
    name="notifications"
    class="switch-input"
    role="switch"
    aria-checked="false"
    aria-describedby="notifications-desc"
  />

  <label for="notifications" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>

    <span class="switch-content">
      <span class="switch-label">
        Habilitar notificações de novas oportunidades
      </span>
      <span id="notifications-desc" class="switch-description">
        (você pode mudar isso depois nas configurações)
      </span>
    </span>
  </label>
</div>
```

### Switch with State Labels

```html
<div class="switch-wrapper">
  <input
    type="checkbox"
    id="auto-save"
    name="auto-save"
    class="switch-input"
    role="switch"
    aria-checked="true"
    checked
  />

  <label for="auto-save" class="switch-container">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>

    <span class="switch-label">
      Salvar automaticamente
    </span>

    <span class="switch-state" aria-live="polite">
      <span class="switch-state-on">Ativado</span>
      <span class="switch-state-off">Desativado</span>
    </span>
  </label>
</div>
```

### Disabled Switch

```html
<div class="switch-wrapper">
  <input
    type="checkbox"
    id="premium-feature"
    name="premium-feature"
    class="switch-input"
    role="switch"
    aria-checked="false"
    disabled
  />

  <label for="premium-feature" class="switch-container" aria-disabled="true">
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>

    <span class="switch-content">
      <span class="switch-label">
        Feature premium (disponível no plano Pro)
      </span>
      <span class="switch-description">
        (faça upgrade para desbloquear)
      </span>
    </span>
  </label>
</div>
```

### React Component

```tsx
import React, { useState } from 'react';

interface SwitchProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  showStateLabel?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  id,
  name,
  label,
  description,
  checked = false,
  disabled = false,
  loading = false,
  showStateLabel = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const descId = description ? `${id}-desc` : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return;
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className={`switch-wrapper ${loading ? 'switch-wrapper--loading' : ''}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className="switch-input"
        role="switch"
        checked={isChecked}
        disabled={disabled || loading}
        onChange={handleChange}
        aria-checked={isChecked}
        aria-describedby={descId}
      />

      <label htmlFor={id} className="switch-container" aria-disabled={disabled}>
        <span className="switch-track">
          <span className={`switch-thumb ${loading ? 'switch-thumb--loading' : ''}`} />
        </span>

        <span className="switch-content">
          <span className="switch-label">{label}</span>

          {description && (
            <span id={descId} className="switch-description">
              {description}
            </span>
          )}
        </span>

        {showStateLabel && (
          <span className="switch-state" aria-live="polite">
            {isChecked ? 'Ativado' : 'Desativado'}
          </span>
        )}
      </label>
    </div>
  );
};
```

---

## CSS Specification

```css
/* Switch Wrapper */
.switch-wrapper {
  display: flex;
  align-items: flex-start;
  min-height: 44px; /* Touch target */
  position: relative;
}

/* Hide native checkbox */
.switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* Switch Container (clickable area) */
.switch-container {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
}

.switch-container[aria-disabled="true"] {
  cursor: not-allowed;
}

/* Switch Track */
.switch-track {
  display: inline-flex;
  align-items: center;
  width: 44px;
  height: 24px;
  min-width: 44px;
  background: var(--neutral-300);
  border-radius: 12px;
  padding: 2px;
  transition: background 0.2s ease;
  position: relative;
}

/* Switch Thumb */
.switch-thumb {
  display: block;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateX(0);
  transition: transform 0.2s ease;
}

/* Hover State (Off) */
.switch-input:hover:not(:disabled) ~ .switch-container .switch-track {
  background: var(--neutral-400);
}

/* Focus State */
.switch-input:focus ~ .switch-container .switch-track {
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
  outline: none;
}

/* Checked State (On) */
.switch-input:checked ~ .switch-container .switch-track {
  background: var(--color-brand-primary);
}

.switch-input:checked ~ .switch-container .switch-thumb {
  transform: translateX(20px);
}

/* Hover State (On) */
.switch-input:checked:hover:not(:disabled) ~ .switch-container .switch-track {
  background: var(--primary-800);
}

/* Disabled State (Off) */
.switch-input:disabled ~ .switch-container .switch-track {
  background: var(--neutral-200);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Disabled State (On) */
.switch-input:checked:disabled ~ .switch-container .switch-track {
  background: var(--neutral-400);
}

.switch-input:disabled ~ .switch-container {
  cursor: not-allowed;
}

/* Loading State */
.switch-thumb--loading {
  animation: switch-pulse 1.5s ease-in-out infinite;
}

@keyframes switch-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Switch Content */
.switch-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

/* Switch Label */
.switch-label {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  line-height: 1.5;
}

.switch-container[aria-disabled="true"] .switch-label {
  color: var(--text-disabled);
}

/* Switch Description */
.switch-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
}

.switch-container[aria-disabled="true"] .switch-description {
  color: var(--text-disabled);
}

/* Switch State Label */
.switch-state {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  min-width: 80px;
  text-align: right;
}

.switch-input:checked ~ .switch-container .switch-state-off {
  display: none;
}

.switch-input:not(:checked) ~ .switch-container .switch-state-on {
  display: none;
}

.switch-input:checked ~ .switch-container .switch-state {
  color: var(--color-brand-primary);
}

/* Size Variants */
.switch-wrapper--sm .switch-track {
  width: 36px;
  height: 20px;
  min-width: 36px;
}

.switch-wrapper--sm .switch-thumb {
  width: 16px;
  height: 16px;
}

.switch-wrapper--sm .switch-input:checked ~ .switch-container .switch-thumb {
  transform: translateX(16px);
}

.switch-wrapper--lg .switch-track {
  width: 52px;
  height: 28px;
  min-width: 52px;
}

.switch-wrapper--lg .switch-thumb {
  width: 24px;
  height: 24px;
}

.switch-wrapper--lg .switch-input:checked ~ .switch-container .switch-thumb {
  transform: translateX(24px);
}
```

---

## JavaScript Enhancement

```javascript
// Auto-save implementation example
function initAutoSaveSwitch(switchElement, saveFunction) {
  switchElement.addEventListener('change', async (e) => {
    const checked = e.target.checked;

    // Show loading state
    const thumb = switchElement.parentElement.querySelector('.switch-thumb');
    thumb.classList.add('switch-thumb--loading');

    try {
      // Perform async operation
      await saveFunction(checked);

      // Optional: Show success feedback
      showToast('Configuração salva com sucesso');
    } catch (error) {
      // Revert switch on error
      e.target.checked = !checked;
      showToast('Erro ao salvar. Tente novamente.', 'error');
    } finally {
      // Remove loading state
      thumb.classList.remove('switch-thumb--loading');
    }
  });
}

// Toast notification helper
function showToast(message, type = 'success') {
  // Implementation depends on your notification system
  console.log(`[${type}] ${message}`);
}
```

---

## Responsive Behavior

### Mobile (< 768px)
- Minimum 44x44px touch target
- Full-width labels for easier tapping
- Adequate spacing around switches

### Desktop (>= 768px)
- Maintain touch targets for accessibility
- Can use compact layouts in settings panels

```css
@media (max-width: 767px) {
  .switch-wrapper {
    min-height: 44px; /* Ensure touch target */
  }

  .switch-container {
    width: 100%; /* Full width for easier tapping */
  }
}
```

---

## Related Components

- **Checkbox** - For multi-select or when form submission required
- **Radio** - For single selection from multiple options
- **Button** - For actions that need confirmation
- **FormField** - Wrapper component

---

## Design Tokens Used

```css
--color-brand-primary: #75201C
--primary-800: #4C0707
--neutral-200: #D3CCCA
--neutral-300: #AEA6A3
--neutral-400: #958986
--text-primary: var(--neutral-900)
--text-secondary: var(--neutral-700)
--text-disabled: var(--neutral-400)
--space-1: 4px
--space-2: 8px
--space-3: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-weight-medium: 500
```

---

## References

- WCAG 2.1 Level AA
- ARIA Authoring Practices - Switch
- Material Design - Switch
- iOS Human Interface Guidelines - Toggle
- Oitavo Café Brand Voice

---

**Version:** 1.0
**Component Status:** Ready for Implementation
**Reviewed By:** Design System Team
**Next Review:** 2025-03-13
