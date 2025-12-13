# Radio Component

**Component Type:** Form Control
**Category:** Forms
**Status:** Core Component
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

The Radio component allows users to select exactly one option from a set of mutually exclusive choices. Critical for qualification questions where Carolina must pick her revenue range, business type, or team size.

**Primary Use Cases:**
- Single selection from predefined options
- Mutually exclusive choices
- Qualification questions
- Preference selection

**Key Principle:** Options should be clear, mutually exclusive, and cover all reasonable cases. Include an "Other" option when the list might not be exhaustive.

---

## Anatomy

```
┌─ Group Label ──────────────────────────────────┐
│ Qual seu faturamento mensal aproximado?        │
└─────────────────────────────────────────────────┘
┌─ Radio Options ─────────────────────────────────┐
│ ○ R$ 50k - 80k/mês                              │
│ ● R$ 80k - 120k/mês    ← Selected               │
│ ○ R$ 120k - 150k/mês                            │
│ ○ Acima de R$ 150k/mês                          │
└─────────────────────────────────────────────────┘
┌─ Helper Text ───────────────────────────────────┐
│ (pode ser aproximado - a gente entende)         │
└─────────────────────────────────────────────────┘
```

**Elements:**
1. **Radio Button** - Circle indicator (selected/unselected)
2. **Label** - Option text (required, clickable)
3. **Group Label** - Question or instruction (required)
4. **Helper Text** - Additional context
5. **Error Message** - Validation feedback
6. **Description** - Optional secondary text per option

---

## Variants

### 1. Standard Radio Group
Vertical stack of radio options.

**When to use:** Most common - clear hierarchy, easy to scan.

### 2. Horizontal Radio Group
Options displayed in a row.

**When to use:** Few options (2-4), short labels, limited space.

### 3. Radio with Description
Radio with explanatory text below label.

**When to use:** Options need clarification or additional context.

### 4. Radio Cards
Each option as a larger, card-style container.

**When to use:** Feature comparison, plan selection, when visual emphasis needed.

---

## States

### Default (Unselected)
```css
RadioButton {
  width: 20px;
  height: 20px;
  border: 2px solid var(--neutral-400);
  border-radius: 50%; /* Perfect circle */
  background: var(--input-bg);
  cursor: pointer;
  transition: all 0.2s ease;
}

Label {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
}
```

### Hover
```css
RadioButton:hover {
  border-color: var(--color-brand-primary);
  background: var(--primary-50);
}
```

### Focus
```css
RadioButton:focus,
Input:focus + RadioButton {
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}
```

### Selected
```css
RadioButton:checked {
  border-color: var(--color-brand-primary);
  background: var(--input-bg);
}

RadioButton:checked::after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-brand-primary);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Disabled (Unselected)
```css
RadioButton:disabled {
  border-color: var(--neutral-200);
  background: var(--neutral-100);
  cursor: not-allowed;
  opacity: 0.6;
}

Label[for][aria-disabled="true"] {
  color: var(--text-disabled);
  cursor: not-allowed;
}
```

### Disabled (Selected)
```css
RadioButton:disabled:checked {
  border-color: var(--neutral-300);
}

RadioButton:disabled:checked::after {
  background: var(--neutral-400);
}
```

### Error
```css
RadioGroup[aria-invalid="true"] RadioButton {
  border-color: var(--color-feedback-error);
}

ErrorMessage {
  color: var(--color-feedback-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-2);
}
```

---

## Props/API

```typescript
interface RadioProps {
  // Required
  id: string;
  name: string; // Same for all options in group
  value: string;
  label: string;

  // State
  checked?: boolean;
  disabled?: boolean;

  // Additional content
  description?: string;

  // Sizing
  size?: 'sm' | 'md' | 'lg';

  // Callbacks
  onChange?: (value: string) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

interface RadioGroupProps {
  // Required
  name: string;
  label: string;
  options: RadioOption[];

  // State
  value?: string; // Currently selected value
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;

  // Validation
  error?: string | boolean;

  // Help text
  helperText?: string;

  // Layout
  direction?: 'vertical' | 'horizontal';
  variant?: 'standard' | 'cards';

  // Callbacks
  onChange?: (selectedValue: string) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab** - Focus first/next radio in group
- **Shift + Tab** - Focus previous radio/exit group
- **Arrow Up/Left** - Select previous option
- **Arrow Down/Right** - Select next option
- **Space** - Select focused option

### Screen Reader Support

```html
<fieldset class="radio-group" role="radiogroup" aria-required="true">
  <legend class="radio-group-label">
    Qual seu faturamento mensal aproximado?
  </legend>

  <div class="radio-group-options" aria-describedby="revenue-helper">
    <div class="radio-wrapper">
      <input
        type="radio"
        id="revenue-50-80"
        name="revenue"
        value="50-80"
        class="radio-input"
      />
      <label for="revenue-50-80" class="radio-label">
        R$ 50k - 80k/mês
      </label>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="revenue-80-120"
        name="revenue"
        value="80-120"
        class="radio-input"
        checked
      />
      <label for="revenue-80-120" class="radio-label">
        R$ 80k - 120k/mês
      </label>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="revenue-120-150"
        name="revenue"
        value="120-150"
        class="radio-input"
      />
      <label for="revenue-120-150" class="radio-label">
        R$ 120k - 150k/mês
      </label>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="revenue-150-plus"
        name="revenue"
        value="150+"
        class="radio-input"
      />
      <label for="revenue-150-plus" class="radio-label">
        Acima de R$ 150k/mês
      </label>
    </div>
  </div>

  <p id="revenue-helper" class="helper-text">
    (pode ser aproximado - a gente entende)
  </p>
</fieldset>
```

### ARIA Attributes
- `role="radiogroup"` - On fieldset
- `aria-labelledby` - Links to legend
- `aria-describedby` - Links helper text and errors
- `aria-invalid` - Validation state
- `aria-required` - Required group
- `aria-checked` - For custom radio buttons

### Focus Management
- Clear 3px focus ring
- Arrow keys change selection AND move focus
- Tab moves to next form element (not next radio)

### Touch Targets
- Minimum 44x44px touch area
- Entire label is clickable
- Adequate spacing (12px minimum between options)

---

## Do / Don't

### Group Labels

**DO:**
- "Qual seu faturamento mensal aproximado?" ✓
- "Quantos funcionários você tem hoje?" ✓
- "Você já trabalhou com agência antes?" ✓
- Use questions for clarity

**DON'T:**
- "Revenue" ✗ (not conversational)
- "Select option" ✗ (obvious)
- "Choose" ✗ (too commanding)

### Option Labels

**DO:**
- "R$ 50k - 80k/mês" ✓
- "3-10 funcionários" ✓
- "Sim, e foi frustrante" ✓
- "Não, nunca tentei" ✓
- Be specific and conversational

**DON'T:**
- "Option A" ✗ (meaningless)
- "Small" ✗ (ambiguous)
- "Yes" (without context) ✗
- Use overlapping ranges ✗

### Helper Text

**DO:**
- "(pode ser aproximado - a gente entende)" ✓
- "(escolha a opção que mais se aproxima)" ✓
- "(sem julgamento - só queremos entender seu contexto)" ✓

**DON'T:**
- "Select one option" ✗ (obvious - that's how radios work)
- "Required field" ✗ (use asterisk)

### Error Messages

**DO:**
- "Ops, precisa escolher uma faixa de faturamento" ✓
- "Essa informação é importante pra gente te ajudar melhor" ✓

**DON'T:**
- "Required field" ✗ (not specific)
- "Invalid selection" ✗ (vague)

### Option Descriptions

**DO:**
- Use when options need clarification ✓
- Keep to 1 line maximum ✓
- "Ideal pra quem quer começar com sistema base" ✓

**DON'T:**
- Write paragraphs ✗
- Repeat the label ✗
- Use for every option (creates visual noise) ✗

---

## Code Examples

### Basic Radio Group

```html
<fieldset class="radio-group" role="radiogroup">
  <legend class="radio-group-label">
    Quantos funcionários você tem hoje?
  </legend>

  <div class="radio-group-options">
    <div class="radio-wrapper">
      <input
        type="radio"
        id="employees-solo"
        name="employees"
        value="solo"
        class="radio-input"
      />
      <label for="employees-solo" class="radio-label">
        Só eu
      </label>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="employees-3-10"
        name="employees"
        value="3-10"
        class="radio-input"
      />
      <label for="employees-3-10" class="radio-label">
        3-10 funcionários
      </label>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="employees-11-20"
        name="employees"
        value="11-20"
        class="radio-input"
      />
      <label for="employees-11-20" class="radio-label">
        11-20 funcionários
      </label>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="employees-20-plus"
        name="employees"
        value="20+"
        class="radio-input"
      />
      <label for="employees-20-plus" class="radio-label">
        Mais de 20 funcionários
      </label>
    </div>
  </div>
</fieldset>
```

### Radio with Descriptions

```html
<fieldset class="radio-group" role="radiogroup">
  <legend class="radio-group-label">
    Você já trabalhou com agência antes?
  </legend>

  <div class="radio-group-options">
    <div class="radio-wrapper">
      <input
        type="radio"
        id="agency-yes-frustrated"
        name="agency-experience"
        value="yes-frustrated"
        class="radio-input"
        aria-describedby="agency-yes-frustrated-desc"
      />
      <div class="radio-content">
        <label for="agency-yes-frustrated" class="radio-label">
          Sim, e foi frustrante
        </label>
        <p id="agency-yes-frustrated-desc" class="radio-description">
          (gastei mas não vi ROI)
        </p>
      </div>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="agency-yes-ok"
        name="agency-experience"
        value="yes-ok"
        class="radio-input"
        aria-describedby="agency-yes-ok-desc"
      />
      <div class="radio-content">
        <label for="agency-yes-ok" class="radio-label">
          Sim, e foi ok
        </label>
        <p id="agency-yes-ok-desc" class="radio-description">
          (vi algum resultado)
        </p>
      </div>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="agency-no"
        name="agency-experience"
        value="no"
        class="radio-input"
      />
      <label for="agency-no" class="radio-label">
        Não, nunca trabalhei
      </label>
    </div>
  </div>
</fieldset>
```

### Horizontal Radio Group

```html
<fieldset class="radio-group radio-group--horizontal" role="radiogroup">
  <legend class="radio-group-label">
    Prefere que a gente entre em contato por:
  </legend>

  <div class="radio-group-options">
    <div class="radio-wrapper">
      <input
        type="radio"
        id="contact-email"
        name="contact-preference"
        value="email"
        class="radio-input"
      />
      <label for="contact-email" class="radio-label">
        Email
      </label>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="contact-whatsapp"
        name="contact-preference"
        value="whatsapp"
        class="radio-input"
      />
      <label for="contact-whatsapp" class="radio-label">
        WhatsApp
      </label>
    </div>

    <div class="radio-wrapper">
      <input
        type="radio"
        id="contact-phone"
        name="contact-preference"
        value="phone"
        class="radio-input"
      />
      <label for="contact-phone" class="radio-label">
        Telefone
      </label>
    </div>
  </div>
</fieldset>
```

### Radio Group with Error

```html
<fieldset class="radio-group radio-group--error" role="radiogroup" aria-invalid="true">
  <legend class="radio-group-label">
    Qual seu faturamento mensal aproximado? *
  </legend>

  <div class="radio-group-options" aria-describedby="revenue-error">
    <!-- Radio options here -->
  </div>

  <p id="revenue-error" class="error-message" role="alert">
    Ops, precisa escolher uma faixa de faturamento
  </p>
</fieldset>
```

### React Component

```tsx
import React, { useState } from 'react';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  helperText?: string;
  error?: string;
  required?: boolean;
  direction?: 'vertical' | 'horizontal';
  onChange?: (selectedValue: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  helperText,
  error,
  required = false,
  direction = 'vertical',
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const hasError = !!error;
  const helperId = `${name}-helper`;
  const errorId = `${name}-error`;

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <fieldset
      className={`radio-group ${direction === 'horizontal' ? 'radio-group--horizontal' : ''} ${
        hasError ? 'radio-group--error' : ''
      }`}
      role="radiogroup"
      aria-required={required}
      aria-invalid={hasError}
    >
      <legend className="radio-group-label">
        {label}
        {required && <span aria-label="required"> *</span>}
      </legend>

      <div
        className="radio-group-options"
        aria-describedby={`${helperText ? helperId : ''} ${hasError ? errorId : ''}`.trim()}
      >
        {options.map((option) => (
          <div key={option.value} className="radio-wrapper">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              className="radio-input"
              checked={selectedValue === option.value}
              disabled={option.disabled}
              onChange={() => handleChange(option.value)}
              aria-describedby={option.description ? `${name}-${option.value}-desc` : undefined}
            />

            {option.description ? (
              <div className="radio-content">
                <label htmlFor={`${name}-${option.value}`} className="radio-label">
                  {option.label}
                </label>
                <p id={`${name}-${option.value}-desc`} className="radio-description">
                  {option.description}
                </p>
              </div>
            ) : (
              <label htmlFor={`${name}-${option.value}`} className="radio-label">
                {option.label}
              </label>
            )}
          </div>
        ))}
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
    </fieldset>
  );
};
```

---

## CSS Specification

```css
/* Radio Group */
.radio-group {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Radio Group Label (Legend) */
.radio-group-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: var(--space-2);
}

/* Radio Group Options */
.radio-group-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Single Radio Wrapper */
.radio-wrapper {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  min-height: 44px; /* Touch target */
  position: relative;
}

/* Hide native radio, use custom styling */
.radio-input {
  position: absolute;
  opacity: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Custom Radio Button */
.radio-input + .radio-label::before,
.radio-input + .radio-content .radio-label::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid var(--neutral-400);
  border-radius: 50%;
  background: var(--input-bg);
  margin-right: var(--space-3);
  transition: all 0.2s ease;
  vertical-align: text-top;
  position: relative;
}

/* Radio Label */
.radio-label {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
}

/* Hover State */
.radio-input:hover + .radio-label::before,
.radio-input:hover + .radio-content .radio-label::before {
  border-color: var(--color-brand-primary);
  background: var(--primary-50);
}

/* Focus State */
.radio-input:focus + .radio-label::before,
.radio-input:focus + .radio-content .radio-label::before {
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}

/* Selected State */
.radio-input:checked + .radio-label::before,
.radio-input:checked + .radio-content .radio-label::before {
  border-color: var(--color-brand-primary);
}

.radio-input:checked + .radio-label::after,
.radio-input:checked + .radio-content .radio-label::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-brand-primary);
}

/* Disabled State */
.radio-input:disabled + .radio-label::before,
.radio-input:disabled + .radio-content .radio-label::before {
  border-color: var(--neutral-200);
  background: var(--neutral-100);
  cursor: not-allowed;
  opacity: 0.6;
}

.radio-input:disabled + .radio-label,
.radio-input:disabled + .radio-content .radio-label {
  color: var(--text-disabled);
  cursor: not-allowed;
}

/* Disabled + Selected */
.radio-input:disabled:checked + .radio-label::after,
.radio-input:disabled:checked + .radio-content .radio-label::after {
  background: var(--neutral-400);
}

/* Radio Content (when there's description) */
.radio-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

/* Radio Description */
.radio-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
  margin-left: 32px; /* Align with label text */
}

/* Horizontal Layout */
.radio-group--horizontal .radio-group-options {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--space-4);
}

/* Error State for Group */
.radio-group--error .radio-group-label {
  color: var(--color-feedback-error);
}

.radio-group--error .radio-input + .radio-label::before,
.radio-group--error .radio-input + .radio-content .radio-label::before {
  border-color: var(--color-feedback-error);
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
.radio-wrapper--sm .radio-input + .radio-label::before,
.radio-wrapper--sm .radio-input + .radio-content .radio-label::before {
  width: 16px;
  height: 16px;
  min-width: 16px;
}

.radio-wrapper--sm .radio-label {
  font-size: var(--font-size-sm);
}

.radio-wrapper--lg .radio-input + .radio-label::before,
.radio-wrapper--lg .radio-input + .radio-content .radio-label::before {
  width: 24px;
  height: 24px;
  min-width: 24px;
}

.radio-wrapper--lg .radio-label {
  font-size: var(--font-size-lg);
}
```

---

## Responsive Behavior

### Mobile (< 768px)
- Stack vertically
- Minimum 44x44px touch targets
- Full-width labels
- Adequate spacing (12px)

### Desktop (>= 768px)
- Can use horizontal layout for few options
- Maintain touch targets for tablet users

```css
@media (max-width: 767px) {
  .radio-group--horizontal .radio-group-options {
    flex-direction: column; /* Stack on mobile */
  }

  .radio-wrapper {
    min-height: 44px; /* Ensure touch target */
  }
}
```

---

## Related Components

- **Checkbox** - Multi-select alternative
- **Select** - Dropdown alternative for many options
- **Switch** - Binary toggle alternative
- **FormField** - Wrapper component

---

## Design Tokens Used

```css
--color-brand-primary: #75201C
--primary-50: #FCF3F1
--neutral-200: #D3CCCA
--neutral-300: #AEA6A3
--neutral-400: #958986
--color-feedback-error: #B91C1C
--text-primary: var(--neutral-900)
--text-secondary: var(--neutral-700)
--text-disabled: var(--neutral-400)
--input-bg: #ffffff
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-weight-medium: 500
```

---

## References

- WCAG 2.1 Level AA
- ARIA Authoring Practices - Radio Group
- GOV.UK Design System
- Inclusive Components
- Oitavo Café Brand Voice

---

**Version:** 1.0
**Component Status:** Ready for Implementation
**Reviewed By:** Design System Team
**Next Review:** 2025-03-13
