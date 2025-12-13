# Select Component

**Component Type:** Form Control
**Category:** Forms
**Status:** Core Component
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

The Select component is a dropdown menu for choosing from predefined options. Designed with accessibility and mobile usability in mind - critical for Carolina who may be filling forms on her phone between meetings.

**Primary Use Cases:**
- Business category selection
- Revenue range selection
- Service interest selection
- Predefined option lists

**Key Principle:** Make options conversational and specific. Not "Small" - use "R$ 50k-80k/mês". Not "Marketing" - use "Marketing Digital e Tráfego Pago".

---

## Anatomy

```
┌─ Label ─────────────────────────────────────────┐
│ Qual seu faturamento mensal aproximado?         │
└──────────────────────────────────────────────────┘
┌─ Select Field ───────────────────────────────────┐
│ R$ 80k - 120k/mês                             ▼ │ ← Dropdown icon
└──────────────────────────────────────────────────┘
┌─ Helper Text ────────────────────────────────────┐
│ (pra saber se fazemos sentido pra você)          │
└──────────────────────────────────────────────────┘

[When opened]
┌─ Dropdown Menu ──────────────────────────────────┐
│ R$ 50k - 80k/mês                                 │
│ R$ 80k - 120k/mês  ← Selected                   │
│ R$ 120k - 150k/mês                               │
│ Acima de R$ 150k/mês                             │
└──────────────────────────────────────────────────┘
```

**Elements:**
1. **Label** - Question or instruction
2. **Select Field** - Current selection display
3. **Dropdown Icon** - Visual indicator (chevron)
4. **Dropdown Menu** - Options list
5. **Helper Text** - Context/guidance
6. **Error/Success Message** - Validation feedback
7. **Placeholder** - Instruction when empty

---

## Variants

### 1. Native Select
Uses browser's native select element.

**When to use:**
- Mobile-first experiences (better UX on mobile)
- Simple lists (< 10 options)
- Accessibility is critical priority

**Pros:** Best mobile UX, built-in accessibility
**Cons:** Limited styling control

### 2. Custom Select
Fully styled dropdown with custom behavior.

**When to use:**
- Desktop-first experiences
- Need for icons, descriptions, or rich content
- Brand consistency critical

**Pros:** Full design control
**Cons:** More complex, requires JavaScript, harder to make accessible

---

## States

### Default (Placeholder)
```css
Select {
  font-size: var(--font-size-base); /* 16px */
  padding: var(--space-3) var(--space-4); /* 12px 16px */
  padding-right: 40px; /* Space for icon */
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--input-bg);
  color: var(--text-primary);
  min-height: 44px; /* Touch target */
  cursor: pointer;
}

Select:invalid,
Select[value=""] {
  color: var(--text-disabled); /* Placeholder color */
}

Icon {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
}
```

### Hover
```css
Select:hover {
  border-color: var(--neutral-400);
}
```

### Focus
```css
Select:focus {
  border-color: var(--color-brand-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}
```

### Open (Custom Select)
```css
Select[aria-expanded="true"] {
  border-color: var(--color-brand-primary);
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}

Icon[data-expanded="true"] {
  transform: translateY(-50%) rotate(180deg);
}
```

### Selected (Has Value)
```css
Select:not(:invalid):not([value=""]) {
  color: var(--text-primary);
  border-color: var(--neutral-400);
}
```

### Error
```css
Select[aria-invalid="true"] {
  border-color: var(--color-feedback-error);
}
```

### Success
```css
Select[aria-invalid="false"].validated {
  border-color: var(--color-feedback-success);
}
```

### Disabled
```css
Select:disabled {
  background: var(--neutral-100);
  border-color: var(--neutral-200);
  color: var(--text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Dropdown Menu (Custom Select)
```css
Menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--input-bg);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  max-height: 280px;
  overflow-y: auto;
  z-index: 1000;
}

Option {
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  transition: background 0.15s ease;
}

Option:hover,
Option[data-focused="true"] {
  background: var(--neutral-50);
}

Option[aria-selected="true"] {
  background: var(--primary-50);
  color: var(--color-brand-primary);
  font-weight: var(--font-weight-medium);
}

Option[aria-disabled="true"] {
  color: var(--text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## Props/API

```typescript
interface SelectProps {
  // Required
  id: string;
  name: string;
  label: string;
  options: SelectOption[];

  // Content
  value?: string;
  placeholder?: string;
  defaultValue?: string;

  // State
  disabled?: boolean;
  required?: boolean;

  // Validation
  error?: string | boolean;
  success?: string | boolean;

  // Help text
  helperText?: string;

  // Type
  variant?: 'native' | 'custom';
  multiple?: boolean; // Allow multi-select

  // Sizing
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;

  // Callbacks
  onChange?: (value: string | string[]) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string; // For optgroup
}
```

---

## Accessibility

### Keyboard Navigation

**Native Select:**
- **Tab** - Focus select
- **Space/Enter** - Open dropdown
- **Arrow Up/Down** - Navigate options
- **Type** - Jump to matching option
- **Esc** - Close dropdown
- **Enter** - Select and close

**Custom Select:**
- Same as native PLUS:
- **Home** - First option
- **End** - Last option
- **Page Up/Down** - Jump multiple options

### Screen Reader Support

**Native Select:**
```html
<div class="select-group">
  <label for="revenue" id="revenue-label">
    Qual seu faturamento mensal aproximado?
  </label>

  <div class="select-wrapper">
    <select
      id="revenue"
      name="revenue"
      aria-labelledby="revenue-label"
      aria-describedby="revenue-helper"
      aria-invalid="false"
      required
    >
      <option value="" disabled selected>
        Selecione uma faixa...
      </option>
      <option value="50-80">R$ 50k - 80k/mês</option>
      <option value="80-120">R$ 80k - 120k/mês</option>
      <option value="120-150">R$ 120k - 150k/mês</option>
      <option value="150+">Acima de R$ 150k/mês</option>
    </select>

    <svg class="select-icon" aria-hidden="true">
      <!-- Chevron down icon -->
    </svg>
  </div>

  <p id="revenue-helper" class="helper-text">
    (pra saber se fazemos sentido pra você)
  </p>
</div>
```

**Custom Select:**
```html
<div class="select-group">
  <label for="revenue" id="revenue-label">
    Qual seu faturamento mensal aproximado?
  </label>

  <div class="select-wrapper">
    <button
      type="button"
      id="revenue"
      aria-labelledby="revenue-label"
      aria-describedby="revenue-helper"
      aria-expanded="false"
      aria-haspopup="listbox"
      aria-controls="revenue-listbox"
      class="select-trigger"
    >
      <span class="select-value">Selecione uma faixa...</span>
      <svg class="select-icon" aria-hidden="true">
        <!-- Chevron -->
      </svg>
    </button>

    <ul
      id="revenue-listbox"
      role="listbox"
      aria-labelledby="revenue-label"
      hidden
      class="select-menu"
    >
      <li role="option" data-value="50-80">R$ 50k - 80k/mês</li>
      <li role="option" data-value="80-120">R$ 80k - 120k/mês</li>
      <li role="option" data-value="120-150">R$ 120k - 150k/mês</li>
      <li role="option" data-value="150+">Acima de R$ 150k/mês</li>
    </ul>
  </div>

  <p id="revenue-helper" class="helper-text">
    (pra saber se fazemos sentido pra você)
  </p>

  <!-- Hidden input for form submission -->
  <input type="hidden" name="revenue" value="" />
</div>
```

### ARIA Attributes

**Native Select:**
- `aria-label` or `aria-labelledby`
- `aria-describedby` - Links helper/error text
- `aria-invalid` - Validation state
- `aria-required` - Required field

**Custom Select:**
- All of the above PLUS:
- `role="listbox"` - On menu
- `role="option"` - On each option
- `aria-expanded` - Dropdown state
- `aria-haspopup="listbox"` - Indicates dropdown
- `aria-activedescendant` - Currently focused option
- `aria-selected` - Selected option(s)

### Focus Management

- Clear focus ring (3px brand color)
- Focus returns to trigger after selection
- Focus trapped in dropdown when open (Esc to close)

---

## Do / Don't

### Label Microcopy

**DO:**
- "Qual seu faturamento mensal aproximado?" ✓
- "Em qual dessas áreas você precisa de ajuda?" ✓
- "Quantos funcionários você tem hoje?" ✓

**DON'T:**
- "Select revenue" ✗ (not conversational)
- "Choose option" ✗ (too vague)
- "Category" ✗ (too terse)

### Option Labels

**DO:**
- "R$ 50k - 80k/mês" ✓
- "3-10 funcionários" ✓
- "Marketing Digital e Tráfego Pago" ✓
- "Sim, e foi frustrante" ✓
- Be specific and conversational

**DON'T:**
- "Small" ✗ (ambiguous)
- "Option 1" ✗ (meaningless)
- "50000-80000" ✗ (hard to read)
- "Yes" (without context) ✗

### Helper Text

**DO:**
- "(pra saber se fazemos sentido pra você)" ✓
- "(não tem problema se for aproximado)" ✓
- "(pode escolher mais de um)" ✓ (for multi-select)

**DON'T:**
- "Select from dropdown" ✗ (obvious)
- "Required field" ✗ (use asterisk)

### Error Messages

**DO:**
- "Ops, esquecemos de selecionar uma opção aqui" ✓
- "Precisa escolher pelo menos uma área de interesse" ✓

**DON'T:**
- "Field required" ✗ (robotic)
- "Invalid selection" ✗ (vague)

### Placeholder

**DO:**
- "Selecione uma faixa..." ✓
- "Escolha uma opção..." ✓

**DON'T:**
- "Select" ✗ (too terse)
- "Please choose" ✗ (formal)

---

## Code Examples

### Basic Native Select

```html
<div class="select-group">
  <label for="revenue" class="select-label">
    Qual seu faturamento mensal aproximado?
  </label>

  <div class="select-wrapper">
    <select
      id="revenue"
      name="revenue"
      class="select"
      aria-describedby="revenue-helper"
      required
    >
      <option value="" disabled selected>
        Selecione uma faixa...
      </option>
      <option value="50-80">R$ 50k - 80k/mês</option>
      <option value="80-120">R$ 80k - 120k/mês</option>
      <option value="120-150">R$ 120k - 150k/mês</option>
      <option value="150+">Acima de R$ 150k/mês</option>
    </select>

    <svg class="select-icon" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20">
      <path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>
  </div>

  <p id="revenue-helper" class="helper-text">
    (pra saber se fazemos sentido pra você)
  </p>
</div>
```

### Select with Optgroups

```html
<div class="select-group">
  <label for="service" class="select-label">
    Em qual área você precisa de ajuda?
  </label>

  <div class="select-wrapper">
    <select id="service" name="service" class="select">
      <option value="" disabled selected>Escolha uma opção...</option>

      <optgroup label="Marketing Digital">
        <option value="social-media">Social Media</option>
        <option value="trafego-pago">Tráfego Pago</option>
        <option value="seo">SEO</option>
      </optgroup>

      <optgroup label="Projetos">
        <option value="landing-page">Landing Page</option>
        <option value="site">Site Institucional</option>
        <option value="marca">Registro de Marca</option>
      </optgroup>
    </select>

    <svg class="select-icon" aria-hidden="true">
      <!-- Chevron icon -->
    </svg>
  </div>
</div>
```

### Select with Error

```html
<div class="select-group">
  <label for="employees" class="select-label">
    Quantos funcionários você tem hoje?
  </label>

  <div class="select-wrapper">
    <select
      id="employees"
      name="employees"
      class="select select--error"
      aria-describedby="employees-helper employees-error"
      aria-invalid="true"
      required
    >
      <option value="" disabled selected>Selecione...</option>
      <option value="solo">Só eu</option>
      <option value="3-10">3-10 funcionários</option>
      <option value="11-20">11-20 funcionários</option>
      <option value="20+">Mais de 20 funcionários</option>
    </select>

    <svg class="select-icon" aria-hidden="true">
      <!-- Chevron icon -->
    </svg>
  </div>

  <p id="employees-error" class="error-message" role="alert">
    Ops, esquecemos de selecionar uma opção aqui
  </p>
</div>
```

### React Component (Native Select)

```tsx
import React, { useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  helperText,
  error,
  required = false,
  placeholder = 'Selecione...',
}) => {
  const [value, setValue] = useState('');
  const hasError = !!error;
  const helperId = `${name}-helper`;
  const errorId = `${name}-error`;

  return (
    <div className="select-group">
      <label htmlFor={name} className="select-label">
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>

      <div className="select-wrapper">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`select ${hasError ? 'select--error' : ''}`}
          aria-describedby={`${helperText ? helperId : ''} ${hasError ? errorId : ''}`.trim()}
          aria-invalid={hasError}
          aria-required={required}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <svg className="select-icon" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20">
          <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {helperText && !hasError && (
        <p id={helperId} className="helper-text">
          {helperText}
        </p>
      )}

      {hasError && (
        <p id={errorId} className="error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
```

---

## CSS Specification

```css
/* Select Group Container */
.select-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
}

/* Label */
.select-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  line-height: 1.5;
}

/* Select Wrapper (for positioning icon) */
.select-wrapper {
  position: relative;
  width: 100%;
}

/* Native Select */
.select {
  /* Reset default appearance */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Styling */
  font-family: inherit;
  font-size: var(--font-size-base); /* 16px */
  padding: var(--space-3) var(--space-4);
  padding-right: 40px; /* Space for icon */
  min-height: 44px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--input-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

/* Placeholder state (when invalid or empty) */
.select:invalid,
.select[value=""] {
  color: var(--text-disabled);
}

/* Remove IE arrow */
.select::-ms-expand {
  display: none;
}

/* Hover */
.select:hover:not(:disabled) {
  border-color: var(--neutral-400);
}

/* Focus */
.select:focus {
  border-color: var(--color-brand-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}

/* Error */
.select--error,
.select[aria-invalid="true"] {
  border-color: var(--color-feedback-error);
}

/* Success */
.select--success {
  border-color: var(--color-feedback-success);
}

/* Disabled */
.select:disabled {
  background: var(--neutral-100);
  border-color: var(--neutral-200);
  color: var(--text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Select Icon (Chevron) */
.select-icon {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
  transition: transform 0.2s ease;
}

.select:disabled ~ .select-icon {
  color: var(--text-disabled);
}

/* Optgroup styling */
.select optgroup {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.select option {
  font-weight: var(--font-weight-regular);
  padding: var(--space-2);
}

/* Helper Text */
.helper-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}

/* Error Message */
.error-message {
  font-size: var(--font-size-sm);
  color: var(--color-feedback-error);
  line-height: 1.4;
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: var(--space-1);
}

.error-message::before {
  content: "!";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  min-width: 16px;
  border-radius: 50%;
  background: var(--color-feedback-error);
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-top: 2px;
}

/* Size Variants */
.select--sm {
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-3);
  padding-right: 36px;
  min-height: 36px;
}

.select--lg {
  font-size: var(--font-size-lg);
  padding: var(--space-4) var(--space-5);
  padding-right: 48px;
  min-height: 52px;
}
```

---

## Custom Select CSS (Advanced)

```css
/* Custom Select Trigger */
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  width: 100%;
  font-family: inherit;
  font-size: var(--font-size-base);
  padding: var(--space-3) var(--space-4);
  min-height: 44px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--input-bg);
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.select-trigger:hover {
  border-color: var(--neutral-400);
}

.select-trigger:focus,
.select-trigger[aria-expanded="true"] {
  border-color: var(--color-brand-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}

.select-trigger[aria-expanded="true"] .select-icon {
  transform: rotate(180deg);
}

/* Custom Select Menu */
.select-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--input-bg);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  max-height: 280px;
  overflow-y: auto;
  z-index: 1000;
}

.select-menu[hidden] {
  display: none;
}

/* Custom Select Option */
.select-menu [role="option"] {
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  transition: background 0.15s ease;
}

.select-menu [role="option"]:hover,
.select-menu [role="option"][data-focused="true"] {
  background: var(--neutral-50);
}

.select-menu [role="option"][aria-selected="true"] {
  background: var(--primary-50);
  color: var(--color-brand-primary);
  font-weight: var(--font-weight-medium);
}

.select-menu [role="option"][aria-disabled="true"] {
  color: var(--text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## Responsive Behavior

### Mobile (< 768px)
- Use native select for better UX
- Full width
- Minimum 16px font size
- Adequate touch target (44px)

### Tablet/Desktop (>= 768px)
- Can use custom select if needed
- Consider max-width for long forms

```css
@media (max-width: 767px) {
  .select {
    font-size: var(--font-size-base); /* Never below 16px */
  }

  /* Force native select on mobile */
  .select-trigger {
    display: none;
  }
}
```

---

## Related Components

- **Input** - Text entry
- **Radio** - Alternative for few options (2-5)
- **Checkbox** - Multi-select alternative
- **FormField** - Wrapper component

---

## Design Tokens Used

```css
--color-brand-primary: #75201C
--color-border-default: #D6CEC7
--color-feedback-error: #B91C1C
--color-feedback-success: #2D5016
--text-primary: var(--neutral-900)
--text-secondary: var(--neutral-700)
--text-disabled: var(--neutral-400)
--input-bg: #ffffff
--space-2: 8px
--space-3: 12px
--space-4: 16px
--font-size-base: 16px
--font-weight-medium: 500
--radius-sm: 4px
--shadow-lg: 0 10px 15px rgba(21, 16, 15, 0.1)
```

---

## References

- WCAG 2.1 Level AA
- ARIA Authoring Practices Guide - Listbox
- GOV.UK Design System
- Nielsen Norman Group - Dropdown Best Practices
- Oitavo Café Brand Voice

---

**Version:** 1.0
**Component Status:** Ready for Implementation
**Reviewed By:** Design System Team
**Next Review:** 2025-03-13
