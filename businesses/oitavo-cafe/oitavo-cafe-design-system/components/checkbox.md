# Checkbox Component

**Component Type:** Form Control
**Category:** Forms
**Status:** Core Component
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

The Checkbox component allows users to select one or more options from a set. Designed for multi-select scenarios where Carolina can indicate all areas of interest or agree to multiple terms.

**Primary Use Cases:**
- Service interest selection (multiple)
- Agreement to terms and policies
- Feature preference selection
- Multi-criteria filtering

**Key Principle:** Labels should be conversational and specific. "Quero receber novidades por email" beats "Subscribe to newsletter".

---

## Anatomy

```
Single Checkbox:
┌────────────────────────────────────────────────┐
│ ☑ Quero receber novidades sobre vendas         │
└────────────────────────────────────────────────┘
  ↑             ↑
 Box          Label (clickable)

Checkbox Group:
┌─ Group Label ──────────────────────────────────┐
│ Em quais áreas você precisa de ajuda?          │
└─────────────────────────────────────────────────┘
┌─ Options ───────────────────────────────────────┐
│ ☑ Social Media                                  │
│ ☐ Tráfego Pago                                  │
│ ☑ SEO                                           │
│ ☐ Landing Page                                  │
└─────────────────────────────────────────────────┘
┌─ Helper Text ───────────────────────────────────┐
│ (pode escolher quantas quiser)                  │
└─────────────────────────────────────────────────┘
```

**Elements:**
1. **Checkbox Box** - Visual indicator (checked/unchecked)
2. **Label** - Descriptive text (required, clickable)
3. **Group Label** - For checkbox groups
4. **Helper Text** - Additional context
5. **Error Message** - Validation feedback
6. **Description** - Optional secondary text per option

---

## Variants

### 1. Single Checkbox
Standalone checkbox for binary choices.

**When to use:** Agreement, opt-in, single toggle.

### 2. Checkbox Group
Multiple related checkboxes.

**When to use:** Multi-select from list, feature preferences.

### 3. Checkbox with Description
Checkbox with secondary explanatory text.

**When to use:** When option needs clarification.

---

## States

### Default (Unchecked)
```css
Checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--neutral-400);
  border-radius: var(--radius-xs); /* 2px */
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
Checkbox:hover {
  border-color: var(--color-brand-primary);
  background: var(--primary-50);
}
```

### Focus
```css
Checkbox:focus,
Input:focus + Checkbox {
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}
```

### Checked
```css
Checkbox:checked {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

Checkbox:checked::after {
  /* Checkmark icon */
  content: "";
  display: block;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 6px;
}
```

### Indeterminate (Partial Selection)
Used for "select all" when some but not all items are checked.

```css
Checkbox:indeterminate {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

Checkbox:indeterminate::after {
  content: "";
  display: block;
  width: 10px;
  height: 2px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Disabled (Unchecked)
```css
Checkbox:disabled {
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

### Disabled (Checked)
```css
Checkbox:disabled:checked {
  background: var(--neutral-300);
  border-color: var(--neutral-300);
}
```

### Error
```css
Checkbox[aria-invalid="true"] {
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
interface CheckboxProps {
  // Required
  id: string;
  name: string;
  label: string;

  // State
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;

  // Value
  value?: string;

  // Validation
  error?: string | boolean;

  // Additional content
  description?: string;

  // Sizing
  size?: 'sm' | 'md' | 'lg';

  // Callbacks
  onChange?: (checked: boolean) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

interface CheckboxGroupProps {
  // Required
  name: string;
  label: string;
  options: CheckboxOption[];

  // State
  value?: string[]; // Array of selected values
  defaultValue?: string[];
  disabled?: boolean;
  required?: boolean;

  // Validation
  error?: string | boolean;
  minSelected?: number;
  maxSelected?: number;

  // Help text
  helperText?: string;

  // Layout
  direction?: 'vertical' | 'horizontal';

  // Callbacks
  onChange?: (selectedValues: string[]) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab** - Focus next checkbox
- **Shift + Tab** - Focus previous checkbox
- **Space** - Toggle checkbox
- **Arrow keys** - Navigate in checkbox group (optional enhancement)

### Screen Reader Support

**Single Checkbox:**
```html
<div class="checkbox-wrapper">
  <input
    type="checkbox"
    id="newsletter"
    name="newsletter"
    class="checkbox-input"
    aria-describedby="newsletter-desc"
  />
  <label for="newsletter" class="checkbox-label">
    Quero receber novidades sobre vendas
  </label>
  <p id="newsletter-desc" class="checkbox-description">
    (prometemos não encher sua caixa - só conteúdo relevante)
  </p>
</div>
```

**Checkbox Group:**
```html
<fieldset class="checkbox-group">
  <legend class="checkbox-group-label">
    Em quais áreas você precisa de ajuda?
  </legend>

  <div class="checkbox-group-options">
    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        id="service-social"
        name="services"
        value="social-media"
        class="checkbox-input"
      />
      <label for="service-social" class="checkbox-label">
        Social Media
      </label>
    </div>

    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        id="service-trafego"
        name="services"
        value="trafego-pago"
        class="checkbox-input"
      />
      <label for="service-trafego" class="checkbox-label">
        Tráfego Pago
      </label>
    </div>

    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        id="service-seo"
        name="services"
        value="seo"
        class="checkbox-input"
      />
      <label for="service-seo" class="checkbox-label">
        SEO
      </label>
    </div>
  </div>

  <p id="services-helper" class="helper-text">
    (pode escolher quantas quiser)
  </p>
</fieldset>
```

### ARIA Attributes
- `aria-describedby` - Links descriptions and helper text
- `aria-invalid` - Validation state
- `aria-required` - Required group
- `aria-checked` - For custom checkboxes (non-native)
- `role="checkbox"` - For custom implementations

### Focus Management
- Clear 3px focus ring with brand color
- Focus visible on checkbox box (not label)
- Never remove focus indicators

### Touch Targets
- Minimum 44x44px touch area
- Entire label is clickable
- Adequate spacing between checkboxes (12px minimum)

---

## Do / Don't

### Label Microcopy

**DO:**
- "Quero receber novidades sobre vendas" ✓
- "Aceito os termos de uso e política de privacidade" ✓
- "Já trabalhei com agência antes" ✓
- Use first person, conversational tone

**DON'T:**
- "Newsletter subscription" ✗ (not conversational)
- "Agree to terms" ✗ (commanding)
- "Option 1" ✗ (meaningless)

### Group Labels

**DO:**
- "Em quais áreas você precisa de ajuda?" ✓
- "Como você prefere que a gente entre em contato?" ✓
- "Quais desses desafios você enfrenta hoje?" ✓

**DON'T:**
- "Select services" ✗ (commanding)
- "Options" ✗ (too vague)
- "Categories" ✗ (too technical)

### Helper Text

**DO:**
- "(pode escolher quantas quiser)" ✓
- "(escolha pelo menos 2)" ✓ (when there's a minimum)
- "(prometemos não encher sua caixa)" ✓ (for email opt-in)

**DON'T:**
- "Select all that apply" ✗ (obvious)
- "Check boxes" ✗ (too literal)

### Error Messages

**DO:**
- "Ops, precisa escolher pelo menos uma área de interesse" ✓
- "Precisa aceitar os termos pra continuar" ✓

**DON'T:**
- "Required field" ✗ (not specific)
- "Invalid selection" ✗ (vague)

### Descriptions

**DO:**
- Use for clarification when needed ✓
- Keep brief (1 line) ✓
- Link to more info if complex ✓

**DON'T:**
- Write paragraphs in descriptions ✗
- Repeat label in description ✗

---

## Code Examples

### Single Checkbox

```html
<div class="checkbox-wrapper">
  <input
    type="checkbox"
    id="newsletter"
    name="newsletter"
    class="checkbox-input"
    value="yes"
  />
  <label for="newsletter" class="checkbox-label">
    Quero receber novidades sobre vendas
  </label>
</div>
```

### Checkbox with Description

```html
<div class="checkbox-wrapper">
  <input
    type="checkbox"
    id="terms"
    name="terms"
    class="checkbox-input"
    required
    aria-describedby="terms-desc"
  />
  <div class="checkbox-content">
    <label for="terms" class="checkbox-label">
      Aceito os termos de uso e política de privacidade
    </label>
    <p id="terms-desc" class="checkbox-description">
      (pode ler os <a href="/termos">termos completos aqui</a>)
    </p>
  </div>
</div>
```

### Checkbox Group

```html
<fieldset class="checkbox-group">
  <legend class="checkbox-group-label">
    Em quais áreas você precisa de ajuda?
  </legend>

  <div class="checkbox-group-options">
    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        id="service-social"
        name="services"
        value="social-media"
        class="checkbox-input"
      />
      <label for="service-social" class="checkbox-label">
        Social Media
      </label>
    </div>

    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        id="service-trafego"
        name="services"
        value="trafego-pago"
        class="checkbox-input"
      />
      <label for="service-trafego" class="checkbox-label">
        Tráfego Pago
      </label>
    </div>

    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        id="service-seo"
        name="services"
        value="seo"
        class="checkbox-input"
      />
      <label for="service-seo" class="checkbox-label">
        SEO
      </label>
    </div>

    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        id="service-landing"
        name="services"
        value="landing-page"
        class="checkbox-input"
      />
      <label for="service-landing" class="checkbox-label">
        Landing Page
      </label>
    </div>
  </div>

  <p class="helper-text">
    (pode escolher quantas quiser)
  </p>
</fieldset>
```

### Checkbox Group with Error

```html
<fieldset class="checkbox-group checkbox-group--error">
  <legend class="checkbox-group-label">
    Em quais áreas você precisa de ajuda? *
  </legend>

  <div class="checkbox-group-options" aria-describedby="services-error">
    <!-- Checkboxes here -->
  </div>

  <p id="services-error" class="error-message" role="alert">
    Ops, precisa escolher pelo menos uma área de interesse
  </p>
</fieldset>
```

### React Component (Single Checkbox)

```tsx
import React from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  description,
  checked = false,
  disabled = false,
  required = false,
  onChange,
}) => {
  const descId = description ? `${id}-desc` : undefined;

  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id={id}
        name={name}
        className="checkbox-input"
        checked={checked}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-describedby={descId}
      />

      <div className="checkbox-content">
        <label htmlFor={id} className="checkbox-label">
          {label}
          {required && <span aria-label="required"> *</span>}
        </label>

        {description && (
          <p id={descId} className="checkbox-description">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
```

### React Component (Checkbox Group)

```tsx
import React, { useState } from 'react';

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: CheckboxOption[];
  helperText?: string;
  error?: string;
  required?: boolean;
  onChange?: (selectedValues: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  helperText,
  error,
  required = false,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const hasError = !!error;
  const helperId = `${name}-helper`;
  const errorId = `${name}-error`;

  const handleChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  return (
    <fieldset className={`checkbox-group ${hasError ? 'checkbox-group--error' : ''}`}>
      <legend className="checkbox-group-label">
        {label}
        {required && <span aria-label="required"> *</span>}
      </legend>

      <div
        className="checkbox-group-options"
        aria-describedby={`${helperText ? helperId : ''} ${hasError ? errorId : ''}`.trim()}
      >
        {options.map((option) => (
          <div key={option.value} className="checkbox-wrapper">
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              className="checkbox-input"
              checked={selectedValues.includes(option.value)}
              disabled={option.disabled}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              aria-describedby={option.description ? `${name}-${option.value}-desc` : undefined}
            />

            <div className="checkbox-content">
              <label htmlFor={`${name}-${option.value}`} className="checkbox-label">
                {option.label}
              </label>

              {option.description && (
                <p id={`${name}-${option.value}-desc`} className="checkbox-description">
                  {option.description}
                </p>
              )}
            </div>
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
/* Single Checkbox Wrapper */
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  min-height: 44px; /* Touch target */
  position: relative;
}

/* Hide native checkbox, use custom styling */
.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Custom Checkbox Box */
.checkbox-input + .checkbox-label::before,
.checkbox-input + .checkbox-content .checkbox-label::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid var(--neutral-400);
  border-radius: var(--radius-xs); /* 2px */
  background: var(--input-bg);
  margin-right: var(--space-3);
  transition: all 0.2s ease;
  vertical-align: text-top;
  position: relative;
}

/* Checkbox Label */
.checkbox-label {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
}

/* Hover State */
.checkbox-input:hover + .checkbox-label::before,
.checkbox-input:hover + .checkbox-content .checkbox-label::before {
  border-color: var(--color-brand-primary);
  background: var(--primary-50);
}

/* Focus State */
.checkbox-input:focus + .checkbox-label::before,
.checkbox-input:focus + .checkbox-content .checkbox-label::before {
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}

/* Checked State */
.checkbox-input:checked + .checkbox-label::before,
.checkbox-input:checked + .checkbox-content .checkbox-label::before {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

/* Checkmark */
.checkbox-input:checked + .checkbox-label::after,
.checkbox-input:checked + .checkbox-content .checkbox-label::after {
  content: "";
  position: absolute;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Indeterminate State */
.checkbox-input:indeterminate + .checkbox-label::before,
.checkbox-input:indeterminate + .checkbox-content .checkbox-label::before {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.checkbox-input:indeterminate + .checkbox-label::after,
.checkbox-input:indeterminate + .checkbox-content .checkbox-label::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 9px;
  width: 10px;
  height: 2px;
  background: white;
}

/* Disabled State */
.checkbox-input:disabled + .checkbox-label::before,
.checkbox-input:disabled + .checkbox-content .checkbox-label::before {
  border-color: var(--neutral-200);
  background: var(--neutral-100);
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-input:disabled + .checkbox-label,
.checkbox-input:disabled + .checkbox-content .checkbox-label {
  color: var(--text-disabled);
  cursor: not-allowed;
}

/* Disabled + Checked */
.checkbox-input:disabled:checked + .checkbox-label::before,
.checkbox-input:disabled:checked + .checkbox-content .checkbox-label::before {
  background: var(--neutral-300);
  border-color: var(--neutral-300);
}

/* Checkbox Content (when there's description) */
.checkbox-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

/* Checkbox Description */
.checkbox-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
  margin-left: 32px; /* Align with label text */
}

/* Checkbox Group */
.checkbox-group {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Checkbox Group Label (Legend) */
.checkbox-group-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: var(--space-2);
}

/* Checkbox Group Options */
.checkbox-group-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Horizontal Layout */
.checkbox-group--horizontal .checkbox-group-options {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--space-4);
}

/* Error State for Group */
.checkbox-group--error .checkbox-group-label {
  color: var(--color-feedback-error);
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
.checkbox-wrapper--sm .checkbox-input + .checkbox-label::before,
.checkbox-wrapper--sm .checkbox-input + .checkbox-content .checkbox-label::before {
  width: 16px;
  height: 16px;
  min-width: 16px;
}

.checkbox-wrapper--sm .checkbox-label {
  font-size: var(--font-size-sm);
}

.checkbox-wrapper--lg .checkbox-input + .checkbox-label::before,
.checkbox-wrapper--lg .checkbox-input + .checkbox-content .checkbox-label::before {
  width: 24px;
  height: 24px;
  min-width: 24px;
}

.checkbox-wrapper--lg .checkbox-label {
  font-size: var(--font-size-lg);
}
```

---

## Responsive Behavior

### Mobile (< 768px)
- Minimum 44x44px touch targets
- Full-width labels
- Adequate spacing (12px between checkboxes)
- Stack vertically in groups

### Desktop (>= 768px)
- Can use horizontal layout for short lists
- Maintain touch targets for tablet users

```css
@media (max-width: 767px) {
  .checkbox-group--horizontal .checkbox-group-options {
    flex-direction: column; /* Stack on mobile */
  }

  .checkbox-wrapper {
    min-height: 44px; /* Ensure touch target */
  }
}
```

---

## Related Components

- **Radio** - Single selection alternative
- **Switch** - Toggle alternative for binary choices
- **FormField** - Wrapper component
- **Button** - Form submission

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
--radius-xs: 2px
```

---

## References

- WCAG 2.1 Level AA
- Inclusive Components - Checkboxes
- GOV.UK Design System
- Material Design
- Oitavo Café Brand Voice

---

**Version:** 1.0
**Component Status:** Ready for Implementation
**Reviewed By:** Design System Team
**Next Review:** 2025-03-13
