# FormField Component

**Component Type:** Layout Wrapper
**Category:** Forms
**Status:** Core Component
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

The FormField component is a wrapper that provides consistent structure, spacing, and accessibility for all form controls. It handles the relationship between labels, inputs, helper text, and error messages in a standardized way.

**Primary Use Cases:**
- Wrapping any form input component
- Ensuring consistent form layouts
- Managing label-input-error relationships
- Providing accessible form structure

**Key Principle:** Every form control should be wrapped in a FormField to ensure consistency and accessibility across the entire design system.

---

## Anatomy

```
┌─ FormField Container ───────────────────────────┐
│ ┌─ Label ────────────────────────────────────┐  │
│ │ Qual seu faturamento mensal?            *  │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌─ Input/Control ────────────────────────────┐  │
│ │ [Form control goes here]                   │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌─ Helper Text ──────────────────────────────┐  │
│ │ (pra saber se fazemos sentido pra você)    │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌─ Error Message (conditional) ──────────────┐  │
│ │ ! Ops, esse campo é importante             │  │
│ └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

**Elements:**
1. **Label** - Field label (required)
2. **Required Indicator** - Asterisk for required fields
3. **Control Slot** - Where the input/select/etc goes
4. **Helper Text** - Contextual guidance
5. **Error Message** - Validation feedback
6. **Success Message** - Success feedback (optional)

---

## Variants

### 1. Standard (Vertical)
Label stacked above input.

**When to use:** Default for most forms - best readability.

### 2. Horizontal (Inline)
Label beside input.

**When to use:** Settings panels, compact forms, desktop-only layouts.

### 3. Floating Label
Label starts in input, floats up when focused/filled.

**When to use:** Modern aesthetics, space-constrained designs.
**Note:** Ensure proper accessibility - needs careful implementation.

---

## States

### Default
```css
FormField {
  display: flex;
  flex-direction: column;
  gap: var(--space-2); /* 8px between elements */
  width: 100%;
  margin-bottom: var(--space-5); /* 20px between fields */
}
```

### With Error
```css
FormField[data-error="true"] {
  /* Error state styling cascades to children */
}

FormField[data-error="true"] .form-label {
  color: var(--text-primary); /* Keep label readable */
}
```

### Required
```css
FormField[data-required="true"] .form-label::after {
  content: " *";
  color: var(--color-feedback-error);
}
```

### Disabled
```css
FormField[data-disabled="true"] {
  opacity: 0.6;
  pointer-events: none;
}
```

---

## Props/API

```typescript
interface FormFieldProps {
  // Content
  label: string;
  children: ReactNode; // The form control

  // State
  required?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  success?: string | boolean;

  // Help text
  helperText?: string;

  // Layout
  variant?: 'vertical' | 'horizontal' | 'floating';
  fullWidth?: boolean;

  // Sizing
  size?: 'sm' | 'md' | 'lg';

  // IDs for accessibility
  id?: string; // Control ID
  labelId?: string;
  helperId?: string;
  errorId?: string;

  // Custom styling
  className?: string;

  // Accessibility
  hideLabel?: boolean; // Visually hide but keep for screen readers
}
```

---

## Accessibility

### Label Association
```html
<div class="form-field">
  <label for="email" id="email-label" class="form-label">
    Seu melhor email pra contato?
    <span class="form-required" aria-label="required">*</span>
  </label>

  <input
    type="email"
    id="email"
    name="email"
    aria-labelledby="email-label"
    aria-describedby="email-helper email-error"
    aria-invalid="false"
    aria-required="true"
  />

  <p id="email-helper" class="form-helper-text">
    (prometemos não encher sua caixa de spam)
  </p>

  <p id="email-error" class="form-error-message" role="alert">
    <!-- Error appears here -->
  </p>
</div>
```

### ARIA Relationships
- `for` attribute links label to input
- `aria-labelledby` provides label reference
- `aria-describedby` links helper text and errors
- `aria-invalid` indicates validation state
- `aria-required` indicates required fields
- `role="alert"` on error messages

### Required Fields
```html
<!-- Option 1: Asterisk with aria-label -->
<label for="name">
  Seu nome completo
  <span class="form-required" aria-label="required">*</span>
</label>

<!-- Option 2: Text indicator -->
<label for="name">
  Seu nome completo
  <span class="form-required">(obrigatório)</span>
</label>

<!-- Both should have aria-required on input -->
<input
  id="name"
  aria-required="true"
/>
```

### Visually Hidden Labels
When design requires hiding label visually:

```html
<div class="form-field">
  <label for="search" class="form-label sr-only">
    Buscar no site
  </label>

  <input
    type="search"
    id="search"
    placeholder="Buscar..."
    aria-label="Buscar no site"
  />
</div>
```

---

## Do / Don't

### Label Placement

**DO:**
- Stack labels above inputs (default) ✓
- Use horizontal only for simple, desktop-only forms ✓
- Ensure labels are always visible ✓

**DON'T:**
- Hide labels (unless intentional with sr-only) ✗
- Put labels inside inputs as placeholders ✗
- Use placeholder as the only label ✗

### Required Field Indicators

**DO:**
- Use asterisk (*) for required fields ✓
- Explain at form start: "* indica campo obrigatório" ✓
- Mark optional fields if most are required ✓

**DON'T:**
- Mark all fields as required ✗
- Use color alone to indicate required ✗
- Hide required indicator ✗

### Error Messages

**DO:**
- Show errors below the input ✓
- Use icon + text for errors ✓
- Keep messages conversational ✓
- Show all errors at once (not one at a time) ✓

**DON'T:**
- Show errors above the input ✗
- Rely on color alone ✗
- Use technical error messages ✗
- Clear errors on focus (wait until valid) ✗

### Helper Text

**DO:**
- Explain WHY you're asking ✓
- Provide format examples ✓
- Use for contextual guidance ✓

**DON'T:**
- Repeat obvious information ✗
- Write paragraphs ✗
- Use for critical information (use label instead) ✗

### Spacing

**DO:**
- Use consistent spacing between fields (20px) ✓
- Group related fields closer together ✓
- Add extra space before new sections ✓

**DON'T:**
- Cram fields too close (<12px) ✗
- Use inconsistent spacing ✗

---

## Code Examples

### Basic FormField (HTML)

```html
<div class="form-field">
  <label for="email" class="form-label">
    Seu melhor email pra contato?
    <span class="form-required" aria-label="required">*</span>
  </label>

  <input
    type="email"
    id="email"
    name="email"
    class="input"
    aria-describedby="email-helper"
    aria-required="true"
  />

  <p id="email-helper" class="form-helper-text">
    (prometemos não encher sua caixa de spam)
  </p>
</div>
```

### FormField with Error

```html
<div class="form-field" data-error="true">
  <label for="revenue" class="form-label">
    Qual seu faturamento mensal?
    <span class="form-required" aria-label="required">*</span>
  </label>

  <input
    type="text"
    id="revenue"
    name="revenue"
    class="input input--error"
    aria-describedby="revenue-helper revenue-error"
    aria-invalid="true"
    aria-required="true"
  />

  <p id="revenue-helper" class="form-helper-text">
    (pra saber se fazemos sentido pra você)
  </p>

  <p id="revenue-error" class="form-error-message" role="alert">
    Ops, esse campo é importante pra gente te entender melhor
  </p>
</div>
```

### Horizontal FormField

```html
<div class="form-field form-field--horizontal">
  <label for="newsletter" class="form-label">
    Receber novidades
  </label>

  <div class="form-field-input">
    <input
      type="checkbox"
      id="newsletter"
      name="newsletter"
      class="checkbox-input"
    />
    <label for="newsletter" class="checkbox-label">
      Sim, quero receber
    </label>
  </div>
</div>
```

### FormField with Success

```html
<div class="form-field" data-success="true">
  <label for="email" class="form-label">
    Seu melhor email pra contato?
  </label>

  <input
    type="email"
    id="email"
    name="email"
    class="input input--success"
    value="carolina@seubox.com.br"
    aria-describedby="email-success"
    aria-invalid="false"
  />

  <p id="email-success" class="form-success-message">
    Perfeito! Seu email parece ótimo.
  </p>
</div>
```

### React Component

```tsx
import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  variant?: 'vertical' | 'horizontal';
  id?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  required = false,
  disabled = false,
  error,
  success,
  helperText,
  variant = 'vertical',
  id,
  className = '',
}) => {
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;

  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = helperText ? `${fieldId}-helper` : undefined;
  const errorId = hasError ? `${fieldId}-error` : undefined;
  const successId = hasSuccess ? `${fieldId}-success` : undefined;

  // Clone children to add accessibility attributes
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const describedBy = [helperId, errorId, successId]
        .filter(Boolean)
        .join(' ');

      return React.cloneElement(child as React.ReactElement<any>, {
        id: fieldId,
        'aria-describedby': describedBy || undefined,
        'aria-invalid': hasError,
        'aria-required': required,
        disabled,
      });
    }
    return child;
  });

  return (
    <div
      className={`form-field form-field--${variant} ${className}`}
      data-error={hasError}
      data-success={hasSuccess}
      data-required={required}
      data-disabled={disabled}
    >
      <label htmlFor={fieldId} className="form-label">
        {label}
        {required && (
          <span className="form-required" aria-label="required">
            {' '}*
          </span>
        )}
      </label>

      <div className="form-field-input">{enhancedChildren}</div>

      {helperText && !hasError && !hasSuccess && (
        <p id={helperId} className="form-helper-text">
          {helperText}
        </p>
      )}

      {hasError && (
        <p id={errorId} className="form-error-message" role="alert">
          {error}
        </p>
      )}

      {hasSuccess && (
        <p id={successId} className="form-success-message">
          {success}
        </p>
      )}
    </div>
  );
};
```

### Usage Example

```tsx
// In your form component
<FormField
  label="Qual seu faturamento mensal?"
  helperText="(pra saber se fazemos sentido pra você)"
  required
  error={errors.revenue}
>
  <input
    type="text"
    name="revenue"
    className="input"
    placeholder="R$ 80.000"
  />
</FormField>

<FormField
  label="Em quais áreas você precisa de ajuda?"
  helperText="(pode escolher quantas quiser)"
  required
>
  <CheckboxGroup
    name="services"
    options={serviceOptions}
  />
</FormField>
```

---

## CSS Specification

```css
/* FormField Container */
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2); /* 8px */
  width: 100%;
  margin-bottom: var(--space-5); /* 20px between fields */
}

/* Last field in form - no bottom margin */
.form-field:last-child {
  margin-bottom: 0;
}

/* FormField Label */
.form-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  line-height: 1.5;
  display: block;
}

/* Required Indicator */
.form-required {
  color: var(--color-feedback-error);
  font-weight: var(--font-weight-semibold);
}

/* Helper Text */
.form-helper-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}

/* Error Message */
.form-error-message {
  font-size: var(--font-size-sm);
  color: var(--color-feedback-error);
  line-height: 1.4;
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: var(--space-1);
}

.form-error-message::before {
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
.form-success-message {
  font-size: var(--font-size-sm);
  color: var(--color-feedback-success);
  line-height: 1.4;
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.form-success-message::before {
  content: "✓";
  color: var(--color-feedback-success);
  font-weight: 600;
  font-size: 16px;
}

/* Disabled State */
.form-field[data-disabled="true"] {
  opacity: 0.6;
  pointer-events: none;
}

.form-field[data-disabled="true"] .form-label {
  color: var(--text-disabled);
}

/* Horizontal Variant */
.form-field--horizontal {
  flex-direction: row;
  align-items: center;
  gap: var(--space-4);
}

.form-field--horizontal .form-label {
  min-width: 200px;
  margin-bottom: 0;
}

.form-field--horizontal .form-field-input {
  flex: 1;
}

.form-field--horizontal .form-helper-text,
.form-field--horizontal .form-error-message,
.form-field--horizontal .form-success-message {
  margin-left: 200px; /* Align with input */
}

/* Size Variants */
.form-field--sm {
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}

.form-field--sm .form-label {
  font-size: var(--font-size-sm);
}

.form-field--lg {
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.form-field--lg .form-label {
  font-size: var(--font-size-lg);
}

/* Field Groups (related fields) */
.form-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding: var(--space-5);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.form-field-group-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

/* Inline Fields (side by side) */
.form-field-inline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

/* Screen Reader Only (visually hidden labels) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Form Layout Patterns

### Vertical Form (Default)

```html
<form class="form">
  <div class="form-field">
    <label for="name" class="form-label">Seu nome completo *</label>
    <input type="text" id="name" class="input" />
  </div>

  <div class="form-field">
    <label for="email" class="form-label">Seu melhor email *</label>
    <input type="email" id="email" class="input" />
  </div>

  <button type="submit" class="btn btn-primary">Enviar</button>
</form>
```

### Two-Column Form

```html
<form class="form">
  <div class="form-field-inline">
    <div class="form-field">
      <label for="first-name" class="form-label">Nome *</label>
      <input type="text" id="first-name" class="input" />
    </div>

    <div class="form-field">
      <label for="last-name" class="form-label">Sobrenome *</label>
      <input type="text" id="last-name" class="input" />
    </div>
  </div>

  <div class="form-field">
    <label for="email" class="form-label">Email *</label>
    <input type="email" id="email" class="input" />
  </div>
</form>
```

### Grouped Fields

```html
<form class="form">
  <div class="form-field-group">
    <h3 class="form-field-group-title">Dados Básicos</h3>

    <div class="form-field">
      <!-- Field 1 -->
    </div>

    <div class="form-field">
      <!-- Field 2 -->
    </div>
  </div>

  <div class="form-field-group">
    <h3 class="form-field-group-title">Dados do Negócio</h3>

    <div class="form-field">
      <!-- Field 3 -->
    </div>
  </div>
</form>
```

---

## Responsive Behavior

### Mobile (< 768px)
- Always stack vertically
- Full width fields
- Adequate spacing (16px between fields)
- Touch-friendly targets

### Tablet (768px - 1024px)
- Can use 2-column layouts for short fields
- Maintain vertical for complex fields
- Adequate touch targets

### Desktop (> 1024px)
- Can use horizontal layouts for settings
- Multi-column for short related fields
- Consider max-width for readability (600-800px)

```css
@media (max-width: 767px) {
  .form-field--horizontal {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-field--horizontal .form-label {
    min-width: auto;
    margin-bottom: var(--space-2);
  }

  .form-field--horizontal .form-helper-text,
  .form-field--horizontal .form-error-message {
    margin-left: 0;
  }

  .form-field-inline {
    grid-template-columns: 1fr; /* Stack on mobile */
  }
}

@media (min-width: 768px) {
  .form {
    max-width: 600px; /* Prevent too-wide forms */
  }

  .form--wide {
    max-width: 800px;
  }
}
```

---

## Related Components

- **Input** - Text input
- **Textarea** - Multi-line input
- **Select** - Dropdown
- **Checkbox** - Multi-select
- **Radio** - Single select
- **Switch** - Toggle
- **Button** - Form submission

---

## Design Tokens Used

```css
/* Colors */
--color-feedback-error: #B91C1C
--color-feedback-success: #2D5016
--text-primary: var(--neutral-900)
--text-secondary: var(--neutral-700)
--text-disabled: var(--neutral-400)
--border-light: var(--neutral-200)

/* Spacing */
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px

/* Typography */
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-weight-medium: 500
--font-weight-semibold: 600

/* Border Radius */
--radius-md: 8px
```

---

## Best Practices

### Form Validation
- Validate on submit, not on blur (less frustrating)
- Show all errors at once
- Keep focus on first error
- Clear error when field becomes valid

### Error Messages
- Be specific about what's wrong
- Suggest how to fix it
- Use conversational tone
- Never blame the user

### Required Fields
- Mark required fields with asterisk
- Explain asterisk meaning at form top
- Consider marking optional fields if most are required

### Form Length
- Keep forms as short as possible
- Only ask for what you need NOW
- Use progressive disclosure for complex forms
- Show progress indicator for multi-step forms

---

## References

- WCAG 2.1 Level AA
- Form Design Patterns by Adam Silver
- GOV.UK Design System
- Nielsen Norman Group - Form Design Guidelines
- Oitavo Café Brand Voice

---

**Version:** 1.0
**Component Status:** Ready for Implementation
**Reviewed By:** Design System Team
**Next Review:** 2025-03-13
