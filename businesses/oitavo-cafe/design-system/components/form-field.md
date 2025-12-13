# Form Field Component

## Overview

A wrapper component that provides consistent structure for all form inputs, including label, input/control, helper text, and error messages. Ensures accessibility and visual consistency across forms.

**When to use:**
- Wrapping any form input (text, select, textarea, etc.)
- Creating consistent spacing and layout
- Ensuring label-input association
- Providing helper text and error handling
- Building accessible forms quickly

**When NOT to use:**
- Standalone buttons (use Button component directly)
- Non-form interactive elements
- Read-only content display

---

## Anatomy

```
Complete Form Field:
┌─────────────────────────────────────────────┐
│ Label text *                                 │
│ ┌─────────────────────────────────────────┐ │
│ │ Input/Control                           │ │
│ └─────────────────────────────────────────┘ │
│ Helper text providing guidance               │
└─────────────────────────────────────────────┘

Error State:
┌─────────────────────────────────────────────┐
│ Label text *                                 │
│ ┌─────────────────────────────────────────┐ │
│ │ Invalid input                           │ │
│ └─────────────────────────────────────────┘ │
│ ⚠ Error message explaining the problem     │
└─────────────────────────────────────────────┘

Components:
1. Label (required) - 14px, semibold
2. Required indicator (*) - if required
3. Input/Control (any form element)
4. Helper text (optional) - 13px, secondary color
5. Error message (conditional) - 13px, error color with icon
6. Character counter (for limited inputs)
```

---

## Variants

| Variant | Use Case | Specifications |
|---------|----------|----------------|
| **Text Input** | Single-line text entry | Label + Input + Helper |
| **Textarea** | Multi-line text entry | Label + Textarea + Counter + Helper |
| **Select** | Dropdown selection | Label + Select + Helper |
| **Checkbox/Radio Group** | Multiple choices | Fieldset + Legend + Options + Helper |
| **Switch** | Binary toggle | Label + Switch + Helper |

---

## Sizes & Spacing

| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Field Margin Bottom** | 24px | var(--space-6) |
| **Label Margin Bottom** | 6px | var(--space-1.5) |
| **Label Font Size** | 14px | var(--font-size-sm) |
| **Label Font Weight** | 600 | var(--font-weight-semibold) |
| **Label Color** | neutral-700 | var(--color-neutral-700) |
| **Helper Margin Top** | 6px | var(--space-1.5) |
| **Helper Font Size** | 13px | var(--font-size-sm) |
| **Helper Color** | neutral-600 | var(--color-text-secondary) |
| **Error Margin Top** | 6px | var(--space-1.5) |
| **Error Font Size** | 13px | var(--font-size-sm) |
| **Error Color** | primary-800 | var(--color-feedback-error) |
| **Error Icon Size** | 16px | - |

---

## States

### Default
```css
.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-700);
  line-height: var(--line-height-normal);
}

.form-label .required-indicator {
  color: var(--color-brand-primary);
  margin-left: 2px;
}
```

### With Helper Text
```css
.helper-text {
  display: block;
  margin-top: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.helper-text .info-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: var(--space-1);
  vertical-align: middle;
  color: var(--color-text-secondary);
}
```

### Error State
```css
.form-field--error .form-label {
  color: var(--color-feedback-error);
}

.error-message {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin-top: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-feedback-error);
  line-height: var(--line-height-relaxed);
}

.error-message::before {
  content: '⚠';
  flex-shrink: 0;
  font-size: 16px;
}

.error-message .error-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--color-feedback-error);
}
```

### Disabled State
```css
.form-field--disabled .form-label {
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}

.form-field--disabled .helper-text {
  color: var(--color-text-tertiary);
}
```

---

## Props/API

```typescript
interface FormFieldProps {
  /** Unique identifier for input association */
  id: string;

  /** Label text (required for accessibility) */
  label: string;

  /** Whether field is required */
  required?: boolean;

  /** Helper text providing guidance */
  helperText?: string;

  /** Error message (shown when invalid) */
  errorMessage?: string;

  /** Whether field is invalid */
  invalid?: boolean;

  /** Whether field is disabled */
  disabled?: boolean;

  /** Children (input, select, textarea, etc.) */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Show character counter (for text inputs) */
  showCounter?: boolean;

  /** Current character count */
  currentCount?: number;

  /** Maximum character count */
  maxCount?: number;
}
```

---

## Accessibility

### Label Association
```html
<!-- Always associate label with input -->
<div class="form-field">
  <label for="user-email" class="form-label">
    Email *
  </label>
  <input
    id="user-email"
    name="email"
    type="email"
    required
    aria-required="true"
    aria-describedby="email-helper"
  />
  <span id="email-helper" class="helper-text">
    Usaremos apenas pra entrar em contato com você
  </span>
</div>
```

### Error Handling
```html
<div class="form-field form-field--error">
  <label for="user-name" class="form-label">
    Nome completo *
  </label>
  <input
    id="user-name"
    name="name"
    type="text"
    required
    aria-required="true"
    aria-invalid="true"
    aria-describedby="name-error"
  />
  <span id="name-error" class="error-message" role="alert">
    Ops! Precisamos do seu nome completo pra continuar
  </span>
</div>
```

### Required Fields
```html
<!-- Required indicator must be in label -->
<label for="business-name" class="form-label">
  Nome da empresa
  <span class="required-indicator" aria-label="obrigatório">*</span>
</label>

<!-- Explain required fields at form start -->
<p class="form-required-note">
  Campos marcados com
  <span class="required-indicator">*</span>
  são obrigatórios
</p>
```

### ARIA Attributes
- `aria-required="true"` - For required fields
- `aria-invalid="true"` - When validation fails
- `aria-describedby` - Links to helper text and error messages
- `role="alert"` - For error messages (announces to screen readers)
- `aria-live="polite"` - For dynamic validation messages

### WCAG Compliance
- **Label required:** Every input must have associated label
- **Color contrast:** 4.5:1 for all text
- **Error identification:** Clear, specific error messages
- **Focus management:** Focus first error on submit
- **Keyboard accessible:** All interactions keyboard-only
- **Screen reader support:** ARIA attributes properly used

---

## Usage Guidelines

### Do's

✅ **Always provide a visible label**
- Never use placeholder as sole label
- Label remains visible when user types
- Essential for accessibility and usability

✅ **Use specific, actionable error messages**
- ✅ "Email precisa incluir o @"
- ✅ "Senha deve ter no mínimo 8 caracteres"
- ❌ "Invalid input" (not helpful)

✅ **Provide helper text to reduce errors**
- Explain format expectations upfront
- "Use o formato: 11 9 1234-5678"
- "(pra saber se fazemos sentido pra você)"

✅ **Show validation on blur, not while typing**
- Less aggressive, better UX
- Let users finish typing before showing errors
- Exception: Real-time format help (password strength)

✅ **Keep field groups consistent**
- Same spacing between all fields
- Consistent label positioning
- Predictable error message location

✅ **Use conversational, helpful tone**
- "Ops! Esse email não parece válido"
- "Quase lá! Senha precisa de mais 2 caracteres"
- Not: "Error: Invalid format"

### Don'ts

❌ **Don't use placeholder as only label**
- Disappears when user types
- Bad for memory and accessibility
- Always use visible label + optional placeholder

❌ **Don't show errors while user is typing**
- Feels aggressive and interrupts
- Show errors on blur or submit
- Exception: Password strength meter

❌ **Don't use vague error messages**
- ❌ "Invalid" - What's invalid? How to fix?
- ❌ "Error" - Not helpful
- ✅ "CPF deve ter 11 dígitos. Exemplo: 123.456.789-00"

❌ **Don't hide error messages**
- Must be clearly visible
- Same location for all fields
- Don't rely on color alone (use icon too)

❌ **Don't make required indicator unclear**
- Use asterisk (*) consistently
- Explain meaning at form start
- Don't use just color

❌ **Don't use long helper text**
- Keep under 2 lines if possible
- Link to detailed help if needed
- Helper text should guide, not overwhelm

---

## Code Examples

### Text Input Field

```html
<div class="form-field">
  <label for="company-name" class="form-label">
    Nome da empresa
    <span class="required-indicator">*</span>
  </label>
  <input
    id="company-name"
    name="companyName"
    type="text"
    class="input"
    required
    aria-required="true"
    aria-describedby="company-name-helper"
    placeholder="Oitavo Café Marketing"
  />
  <span id="company-name-helper" class="helper-text">
    O nome como aparece no CNPJ
  </span>
</div>
```

### Email Field with Error

```html
<div class="form-field form-field--error">
  <label for="email" class="form-label">
    Email
    <span class="required-indicator">*</span>
  </label>
  <input
    id="email"
    name="email"
    type="email"
    class="input input--error"
    required
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error"
    value="carolina@oitavo"
  />
  <span id="email-error" class="error-message" role="alert">
    Ops! Esse email não parece válido. Confere se tem o @ e o domínio completo?
  </span>
</div>
```

### Select Field

```html
<div class="form-field">
  <label for="business-size" class="form-label">
    Porte da empresa
    <span class="required-indicator">*</span>
  </label>
  <div class="select-wrapper">
    <select
      id="business-size"
      name="businessSize"
      class="select"
      required
      aria-required="true"
      aria-describedby="business-size-helper"
    >
      <option value="">Selecione...</option>
      <option value="micro">Microempresa (até R$ 360k/ano)</option>
      <option value="small">Pequeno porte (R$ 360k - R$ 4.8M/ano)</option>
      <option value="medium">Médio porte (acima de R$ 4.8M/ano)</option>
    </select>
  </div>
  <span id="business-size-helper" class="helper-text">
    (pra saber se fazemos sentido pra você)
  </span>
</div>
```

### Textarea with Character Counter

```html
<div class="form-field">
  <label for="message" class="form-label">
    Mensagem
    <span class="required-indicator">*</span>
  </label>
  <div class="textarea-wrapper">
    <textarea
      id="message"
      name="message"
      class="textarea"
      rows="6"
      maxlength="500"
      required
      aria-required="true"
      aria-describedby="message-helper message-counter"
      placeholder="Conte mais sobre o que você precisa..."
    ></textarea>
    <span id="message-counter" class="character-count" aria-live="polite">
      0/500 caracteres
    </span>
  </div>
  <span id="message-helper" class="helper-text">
    Quanto mais detalhes, melhor conseguimos ajudar você
  </span>
</div>
```

### Checkbox Group as Form Field

```html
<fieldset class="form-field">
  <legend class="form-label">
    Quais serviços te interessam?
    <span class="required-indicator">*</span>
  </legend>

  <div class="checkbox-field">
    <input type="checkbox" id="service-1" name="services" value="social" class="checkbox-input" />
    <label for="service-1" class="checkbox-label">Gestão de Redes Sociais</label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="service-2" name="services" value="ads" class="checkbox-input" />
    <label for="service-2" class="checkbox-label">Tráfego Pago</label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="service-3" name="services" value="email" class="checkbox-input" />
    <label for="service-3" class="checkbox-label">Email Marketing</label>
  </div>

  <span class="helper-text">
    Marca todos que fazem sentido pro seu negócio agora
  </span>
</fieldset>
```

### Disabled Field

```html
<div class="form-field form-field--disabled">
  <label for="account-id" class="form-label">
    ID da conta
  </label>
  <input
    id="account-id"
    name="accountId"
    type="text"
    class="input"
    value="OC-2024-001234"
    disabled
    aria-describedby="account-id-helper"
  />
  <span id="account-id-helper" class="helper-text">
    Gerado automaticamente no cadastro
  </span>
</div>
```

### CSS Implementation

```css
/* Form Field Container */
.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-6);
}

.form-field:last-child {
  margin-bottom: 0;
}

/* Label */
.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-700);
  line-height: var(--line-height-normal);
}

.required-indicator {
  color: var(--color-brand-primary);
  margin-left: 2px;
  font-weight: var(--font-weight-bold);
}

/* Helper Text */
.helper-text {
  display: block;
  margin-top: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.helper-text a {
  color: var(--color-brand-primary);
  text-decoration: underline;
}

/* Error Message */
.error-message {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin-top: 6px;
  padding: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-feedback-error);
  line-height: var(--line-height-relaxed);
  background: var(--color-feedback-errorBg);
  border-radius: var(--radius-sm);
}

.error-message::before {
  content: '⚠';
  flex-shrink: 0;
  font-size: 16px;
}

/* Error State */
.form-field--error .form-label {
  color: var(--color-feedback-error);
}

/* Disabled State */
.form-field--disabled .form-label,
.form-field--disabled .helper-text {
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}

/* Character Counter */
.character-count {
  display: block;
  margin-top: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: right;
}

.character-count.warning {
  color: var(--color-accent-700);
  font-weight: var(--font-weight-medium);
}

.character-count.error {
  color: var(--color-feedback-error);
  font-weight: var(--font-weight-semibold);
}

/* Form Required Note */
.form-required-note {
  margin-bottom: var(--space-6);
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  background: var(--color-neutral-50);
  border-left: 3px solid var(--color-brand-primary);
  border-radius: var(--radius-sm);
}

/* Two Column Layout */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

/* Inline Fields (small related inputs) */
.form-inline {
  display: flex;
  gap: var(--space-3);
  align-items: flex-end;
}

.form-inline .form-field {
  flex: 1;
  margin-bottom: 0;
}
```

### JavaScript for Validation

```javascript
class FormField {
  constructor(element) {
    this.field = element;
    this.input = element.querySelector('input, textarea, select');
    this.errorElement = element.querySelector('.error-message');

    this.init();
  }

  init() {
    if (!this.input) return;

    // Validate on blur
    this.input.addEventListener('blur', () => this.validate());

    // Clear error on input
    this.input.addEventListener('input', () => {
      if (this.field.classList.contains('form-field--error')) {
        this.clearError();
      }
    });
  }

  validate() {
    const isValid = this.input.checkValidity();

    if (!isValid) {
      this.showError(this.getErrorMessage());
    } else {
      this.clearError();
    }

    return isValid;
  }

  getErrorMessage() {
    // Custom error messages based on validation type
    if (this.input.validity.valueMissing) {
      return this.input.dataset.errorRequired || 'Ops! Esse campo é obrigatório';
    }

    if (this.input.validity.typeMismatch) {
      if (this.input.type === 'email') {
        return 'Ops! Esse email não parece válido. Confere se tem o @ e o domínio?';
      }
      if (this.input.type === 'url') {
        return 'Esse link não parece válido. Começa com http:// ou https://';
      }
    }

    if (this.input.validity.tooShort) {
      const min = this.input.minLength;
      return `Precisa ter pelo menos ${min} caracteres`;
    }

    if (this.input.validity.tooLong) {
      const max = this.input.maxLength;
      return `Não pode ter mais que ${max} caracteres`;
    }

    if (this.input.validity.patternMismatch) {
      return this.input.dataset.errorPattern || 'Formato inválido';
    }

    return 'Ops! Algo não está certo com esse campo';
  }

  showError(message) {
    this.field.classList.add('form-field--error');
    this.input.setAttribute('aria-invalid', 'true');

    if (!this.errorElement) {
      this.errorElement = document.createElement('span');
      this.errorElement.className = 'error-message';
      this.errorElement.setAttribute('role', 'alert');
      this.errorElement.id = `${this.input.id}-error`;
      this.input.setAttribute('aria-describedby', this.errorElement.id);
      this.input.parentNode.appendChild(this.errorElement);
    }

    this.errorElement.textContent = message;
  }

  clearError() {
    this.field.classList.remove('form-field--error');
    this.input.setAttribute('aria-invalid', 'false');

    if (this.errorElement) {
      this.errorElement.textContent = '';
    }
  }
}

// Initialize all form fields
document.querySelectorAll('.form-field').forEach(field => {
  new FormField(field);
});

// Form submission validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    const fields = Array.from(form.querySelectorAll('.form-field'))
      .map(el => new FormField(el));

    const isValid = fields.every(field => field.validate());

    if (!isValid) {
      e.preventDefault();

      // Focus first error field
      const firstError = form.querySelector('.form-field--error input, .form-field--error textarea, .form-field--error select');
      if (firstError) {
        firstError.focus();
      }
    }
  });
});
```

---

## Related Components

- **[Input](./input.md)** - Text input component
- **[Textarea](./textarea.md)** - Multi-line text input
- **[Select](./select.md)** - Dropdown selection
- **[Checkbox](./checkbox.md)** - Multiple selection
- **[Radio](./radio.md)** - Mutually exclusive selection
- **[Switch](./switch.md)** - Binary toggle
- **[Form](./form.md)** - Complete form layout

---

## Brand Voice in Field Microcopy

Following Oitavo Café's conversational, helpful tone:

### Good Label Examples
- "Nome completo" (not "Full name")
- "Qual seu faturamento mensal?" (ask as question)
- "Email pra contato"
- "Empresa"

### Good Helper Text Examples
- "(pra saber se fazemos sentido pra você)"
- "Usaremos apenas pra entrar em contato"
- "O nome como aparece no CNPJ"
- "Exemplo: 11 9 1234-5678"

### Good Error Messages
- "Ops! Esse email não parece válido. Confere de novo?"
- "Quase lá! Faltam só 2 caracteres"
- "Precisa escolher pelo menos uma opção"
- "Esse campo é obrigatório pra continuar"

### Good Placeholder Examples
- "carolina@oitavocafe.com.br"
- "Conte mais sobre o que você precisa..."
- "Ex: Oitavo Café Marketing"

### Bad Examples
- ❌ "Enter your name" (English)
- ❌ "Required field" (cold, unhelpful)
- ❌ "Invalid input" (too technical)
- ❌ "Error 400" (user doesn't care about error codes)

Remember: Guide users like a helpful friend, not a strict form validator. Be conversational, explain why you're asking, and help them succeed.
