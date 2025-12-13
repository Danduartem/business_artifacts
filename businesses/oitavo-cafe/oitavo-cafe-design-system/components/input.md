# Input Component

**Component Type:** Form Control
**Category:** Forms
**Status:** Core Component
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

The Input component is a text entry field with label, helper text, and comprehensive state management. It's optimized for accessibility and designed to capture lead information with empathy and clarity.

**Primary Use Cases:**
- Email capture forms
- Contact information collection
- Search fields
- Single-line text entry

**Key Principle:** Every input should be conversational and explain WHY we're asking, not just WHAT we're asking for.

---

## Anatomy

```
┌─ Label (conversational) ────────────────────────┐
│ Qual seu faturamento mensal?                    │
└─────────────────────────────────────────────────┘
┌─ Input Field ───────────────────────────────────┐
│ R$ 80.000                                    [i]│ ← Optional icon
└─────────────────────────────────────────────────┘
┌─ Helper Text (explains why) ────────────────────┐
│ (pra saber se fazemos sentido pra você)         │
└─────────────────────────────────────────────────┘
```

**Elements:**
1. **Label** - Conversational question or instruction (required)
2. **Input Field** - Text entry area with proper sizing
3. **Helper Text** - Contextual explanation (optional but recommended)
4. **Icon** - Visual indicator or action trigger (optional)
5. **Error/Success Message** - Validation feedback
6. **Character Counter** - For limited inputs (optional)

---

## Variants

### 1. Default (Outlined)
Standard input with border and no fill.

```css
border: 1px solid var(--neutral-300);
background: var(--input-bg);
```

**When to use:** Most common use case for forms.

### 2. Filled
Input with subtle background fill.

```css
border: none;
border-bottom: 2px solid var(--neutral-300);
background: var(--neutral-50);
```

**When to use:** Dense forms, inline editing contexts.

---

## States

### Default
```css
Input {
  font-size: var(--font-size-base); /* 16px - Carolina's presbyopia */
  padding: var(--space-3) var(--space-4); /* 12px 16px */
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm); /* 4px */
  color: var(--text-primary);
  background: var(--input-bg);
  min-height: 44px; /* Touch target minimum */
}

Label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium); /* 500 */
  color: var(--text-primary);
  margin-bottom: var(--space-2); /* 8px */
}

HelperText {
  font-size: var(--font-size-sm); /* 14px */
  color: var(--text-secondary);
  margin-top: var(--space-2);
}
```

### Hover
```css
Input:hover {
  border-color: var(--neutral-400);
  cursor: text;
}
```

### Focus
```css
Input:focus {
  border-color: var(--color-brand-primary); /* #75201C */
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20); /* Focus ring */
}
```

### Filled (Has Value)
```css
Input:not(:placeholder-shown) {
  border-color: var(--neutral-400);
}
```

### Error
```css
Input[aria-invalid="true"] {
  border-color: var(--color-feedback-error); /* #B91C1C */
}

ErrorMessage {
  color: var(--color-feedback-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

/* Icon before error text */
ErrorMessage::before {
  content: "!";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-feedback-error);
  color: white;
  font-size: 12px;
  font-weight: 600;
}
```

### Success
```css
Input[aria-invalid="false"].validated {
  border-color: var(--color-feedback-success); /* #2D5016 */
}

SuccessMessage {
  color: var(--color-feedback-success);
  font-size: var(--font-size-sm);
  margin-top: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

/* Checkmark before success text */
SuccessMessage::before {
  content: "✓";
  color: var(--color-feedback-success);
  font-weight: 600;
}
```

### Disabled
```css
Input:disabled {
  background: var(--neutral-100);
  border-color: var(--neutral-200);
  color: var(--text-disabled);
  cursor: not-allowed;
}

Label[for][aria-disabled="true"] {
  color: var(--text-disabled);
}
```

### Read-only
```css
Input[readonly] {
  background: var(--neutral-50);
  border-color: var(--neutral-200);
  cursor: default;
}
```

---

## Props/API

```typescript
interface InputProps {
  // Required
  id: string;
  name: string;
  label: string;

  // Input attributes
  type?: 'text' | 'email' | 'tel' | 'url' | 'search' | 'password';
  value?: string;
  placeholder?: string;

  // State
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;

  // Validation
  error?: string | boolean;
  success?: string | boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;

  // Help text
  helperText?: string;

  // Sizing
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;

  // Icon
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  // Character counter
  showCounter?: boolean;

  // Variant
  variant?: 'outlined' | 'filled';

  // Callbacks
  onChange?: (value: string) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  autoComplete?: string;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab** - Move focus to input
- **Shift + Tab** - Move focus away
- **Esc** (in search) - Clear input

### Screen Reader Support
```html
<div class="input-group">
  <label for="revenue" id="revenue-label">
    Qual seu faturamento mensal?
  </label>

  <input
    type="text"
    id="revenue"
    name="revenue"
    aria-labelledby="revenue-label"
    aria-describedby="revenue-helper revenue-error"
    aria-invalid="false"
    aria-required="true"
  />

  <p id="revenue-helper" class="helper-text">
    (pra saber se fazemos sentido pra você)
  </p>

  <p id="revenue-error" class="error-message" role="alert">
    <!-- Error appears here when validation fails -->
  </p>
</div>
```

### ARIA Attributes
- `aria-label` or `aria-labelledby` - Always present
- `aria-describedby` - Links to helper text and error messages
- `aria-invalid` - `true` when error exists
- `aria-required` - `true` for required fields
- `role="alert"` - On error messages for immediate announcement

### Focus Management
- Clear 3px focus ring with brand color
- Never remove focus indicators
- Focus should be visible on both light and dark backgrounds

### Color Independence
- Never rely on color alone for error/success states
- Include icons and text messages
- Error border + icon + message
- Success border + checkmark + message

---

## Do / Don't

### Label Microcopy

**DO:**
- "Qual seu faturamento mensal?" ✓
- "Seu melhor email pra contato?" ✓
- "Como prefere ser chamada?" ✓
- Use conversational tone that matches Carolina's reality

**DON'T:**
- "Monthly Revenue" ✗ (too corporate)
- "Enter email address" ✗ (commanding)
- "Name" ✗ (too terse)
- "Input your data here" ✗ (robotic)

### Helper Text

**DO:**
- "(pra saber se fazemos sentido pra você)" ✓
- "(prometemos não encher sua caixa de spam)" ✓
- "(só pra personalizar nossa conversa)" ✓
- Explain WHY you're asking

**DON'T:**
- "Required field" ✗ (use asterisk instead)
- "Please enter valid data" ✗ (obvious)
- "" (empty helper text when context helps)

### Error Messages

**DO:**
- "Ops, esse email não parece válido. Confere de novo?" ✓
- "Hmm, faturamento não pode ser zero. Deixa a gente te ajudar!" ✓
- "Esse campo é importante pra gente te entender melhor" ✓
- Use empathy and conversational tone

**DON'T:**
- "Invalid email format" ✗ (robotic)
- "Error: field required" ✗ (system language)
- "This field cannot be empty" ✗ (commanding)

### Success Messages

**DO:**
- "Pronto! A gente recebeu e vai analisar seu caso." ✓
- "Perfeito! Seu email parece ótimo." ✓
- Keep it brief and warm

**DON'T:**
- "Validation successful" ✗ (system language)
- "Field accepted" ✗ (robotic)
- Overuse success messages (reserve for form completion)

### Layout

**DO:**
- Stack label above input ✓
- Use full width for mobile ✓
- Provide 8px spacing between elements ✓
- Ensure 44x44px minimum touch target ✓

**DON'T:**
- Place label inside input (accessibility issue) ✗
- Make inputs smaller than 44px height ✗
- Use font sizes below 16px (prevents mobile zoom) ✗

---

## Code Examples

### Basic Input

```html
<div class="input-group">
  <label for="email" class="input-label">
    Seu melhor email pra contato?
  </label>

  <input
    type="email"
    id="email"
    name="email"
    class="input"
    placeholder="carolina@seubox.com.br"
    aria-describedby="email-helper"
    required
  />

  <p id="email-helper" class="helper-text">
    (prometemos não encher sua caixa de spam)
  </p>
</div>
```

### Input with Error

```html
<div class="input-group">
  <label for="revenue" class="input-label">
    Qual seu faturamento mensal?
  </label>

  <input
    type="text"
    id="revenue"
    name="revenue"
    class="input input--error"
    value="0"
    aria-describedby="revenue-helper revenue-error"
    aria-invalid="true"
    required
  />

  <p id="revenue-helper" class="helper-text">
    (pra saber se fazemos sentido pra você)
  </p>

  <p id="revenue-error" class="error-message" role="alert">
    Hmm, faturamento não pode ser zero. Deixa a gente te ajudar!
  </p>
</div>
```

### Input with Success

```html
<div class="input-group">
  <label for="email" class="input-label">
    Seu melhor email pra contato?
  </label>

  <input
    type="email"
    id="email"
    name="email"
    class="input input--success"
    value="carolina@seubox.com.br"
    aria-describedby="email-helper email-success"
    aria-invalid="false"
  />

  <p id="email-helper" class="helper-text">
    (prometemos não encher sua caixa de spam)
  </p>

  <p id="email-success" class="success-message">
    Perfeito! Seu email parece ótimo.
  </p>
</div>
```

### Input with Icon

```html
<div class="input-group">
  <label for="search" class="input-label">
    Procurando algo específico?
  </label>

  <div class="input-wrapper">
    <span class="input-icon input-icon--left">
      <svg><!-- search icon --></svg>
    </span>

    <input
      type="search"
      id="search"
      name="search"
      class="input input--with-icon-left"
      placeholder="Digite aqui..."
    />
  </div>
</div>
```

### Input with Character Counter

```html
<div class="input-group">
  <label for="company" class="input-label">
    Nome da sua empresa
  </label>

  <input
    type="text"
    id="company"
    name="company"
    class="input"
    maxlength="50"
    aria-describedby="company-counter"
  />

  <div class="input-footer">
    <p id="company-counter" class="character-counter">
      <span class="current">0</span> / <span class="max">50</span>
    </p>
  </div>
</div>
```

### React Component Example

```tsx
import React, { useState } from 'react';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  helperText,
  error,
  required = false,
  placeholder,
}) => {
  const [value, setValue] = useState('');
  const hasError = !!error;
  const helperId = `${name}-helper`;
  const errorId = `${name}-error`;

  return (
    <div className="input-group">
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`input ${hasError ? 'input--error' : ''}`}
        placeholder={placeholder}
        aria-describedby={`${helperText ? helperId : ''} ${hasError ? errorId : ''}`.trim()}
        aria-invalid={hasError}
        aria-required={required}
      />

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
/* Input Group Container */
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2); /* 8px */
  width: 100%;
}

/* Label */
.input-label {
  font-size: var(--font-size-base); /* 16px */
  font-weight: var(--font-weight-medium); /* 500 */
  color: var(--text-primary);
  line-height: 1.5;
}

.input-label[aria-disabled="true"] {
  color: var(--text-disabled);
}

/* Input Field */
.input {
  font-family: inherit;
  font-size: var(--font-size-base); /* 16px - prevents mobile zoom */
  padding: var(--space-3) var(--space-4); /* 12px 16px */
  min-height: 44px; /* Touch target minimum */
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm); /* 4px */
  background: var(--input-bg);
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

.input::placeholder {
  color: var(--text-disabled);
  opacity: 1;
}

/* Hover State */
.input:hover:not(:disabled):not(:focus) {
  border-color: var(--neutral-400);
}

/* Focus State */
.input:focus {
  border-color: var(--color-brand-primary); /* #75201C */
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}

/* Error State */
.input--error,
.input[aria-invalid="true"] {
  border-color: var(--color-feedback-error); /* #B91C1C */
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.20);
}

/* Success State */
.input--success,
.input[aria-invalid="false"].validated {
  border-color: var(--color-feedback-success); /* #2D5016 */
}

/* Disabled State */
.input:disabled {
  background: var(--neutral-100);
  border-color: var(--neutral-200);
  color: var(--text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Read-only State */
.input[readonly] {
  background: var(--neutral-50);
  border-color: var(--neutral-200);
  cursor: default;
}

/* Helper Text */
.helper-text {
  font-size: var(--font-size-sm); /* 14px */
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

/* Success Message */
.success-message {
  font-size: var(--font-size-sm);
  color: var(--color-feedback-success);
  line-height: 1.4;
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.success-message::before {
  content: "✓";
  color: var(--color-feedback-success);
  font-weight: 600;
  font-size: 16px;
}

/* Input with Icons */
.input-wrapper {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  pointer-events: none;
}

.input-icon--left {
  left: var(--space-3);
}

.input-icon--right {
  right: var(--space-3);
}

.input--with-icon-left {
  padding-left: calc(var(--space-4) + 24px);
}

.input--with-icon-right {
  padding-right: calc(var(--space-4) + 24px);
}

/* Character Counter */
.input-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-1);
}

.character-counter {
  font-size: var(--font-size-xs); /* 12px */
  color: var(--text-secondary);
  margin: 0;
}

/* Size Variants */
.input--sm {
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-3);
  min-height: 36px;
}

.input--lg {
  font-size: var(--font-size-lg);
  padding: var(--space-4) var(--space-5);
  min-height: 52px;
}

/* Filled Variant */
.input--filled {
  border: none;
  border-bottom: 2px solid var(--neutral-300);
  border-radius: 4px 4px 0 0;
  background: var(--neutral-50);
}

.input--filled:focus {
  border-bottom-color: var(--color-brand-primary);
  box-shadow: none;
}

.input--filled.input--error {
  border-bottom-color: var(--color-feedback-error);
}
```

---

## Responsive Behavior

### Mobile (< 768px)
- Full width inputs
- Minimum 16px font size (prevents zoom)
- Larger touch targets (44x44px minimum)
- Stack labels above inputs
- Adequate spacing between form fields (16px)

### Tablet (768px - 1024px)
- Can use 2-column layouts for short inputs
- Maintain minimum touch targets
- Consistent spacing

### Desktop (> 1024px)
- Can use 3-column layouts for short inputs
- Maintain visual hierarchy
- Consider max-width for long forms (600-800px)

```css
@media (max-width: 767px) {
  .input-group {
    margin-bottom: var(--space-4); /* 16px between fields */
  }

  .input {
    font-size: var(--font-size-base); /* Never below 16px */
  }
}

@media (min-width: 768px) {
  .input-group--inline {
    flex-direction: row;
    align-items: center;
    gap: var(--space-3);
  }

  .input-group--inline .input-label {
    min-width: 200px;
    margin-bottom: 0;
  }
}
```

---

## Related Components

- **FormField** - Wrapper component for consistent form layouts
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Button** - Form submission

---

## Design Tokens Used

```css
/* Colors */
--color-brand-primary: #75201C
--color-border-default: #D6CEC7
--color-feedback-error: #B91C1C
--color-feedback-success: #2D5016
--text-primary: var(--neutral-900)
--text-secondary: var(--neutral-700)
--text-disabled: var(--neutral-400)
--input-bg: #ffffff

/* Spacing */
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px

/* Typography */
--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-weight-medium: 500

/* Border Radius */
--radius-sm: 4px

/* Shadows */
--shadow-focus: 0 0 0 3px rgba(117, 32, 28, 0.20)
```

---

## References

- WCAG 2.1 AA Compliance
- Material Design Input Guidelines
- Inclusive Components by Heydon Pickering
- Form Design Patterns by Adam Silver
- Oitavo Café Brand Voice Guidelines
- Carolina Persona (Accessibility needs: presbyopia onset)

---

**Version:** 1.0
**Component Status:** Ready for Implementation
**Reviewed By:** Design System Team
**Next Review:** 2025-03-13
