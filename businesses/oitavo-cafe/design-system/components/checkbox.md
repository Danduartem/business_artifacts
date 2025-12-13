# Checkbox Component

## Overview

A toggle control for binary choices or multiple independent selections from a list. Each checkbox operates independently, allowing users to select zero, one, or multiple options.

**When to use:**
- Multiple independent selections from a list
- Opt-in choices (newsletter, terms acceptance)
- Enabling/disabling multiple features or settings
- Filtering or selecting items in a list

**When NOT to use:**
- Mutually exclusive choices (use Radio buttons instead)
- Single on/off toggle for immediate state change (use Switch/Toggle instead)
- More than 10 options (consider other patterns like multi-select dropdown)

---

## Anatomy

```
Single Checkbox:
┌─────────────────────────────────────────────┐
│ ☐ Label text describing the choice          │
└─────────────────────────────────────────────┘

Checked Checkbox:
┌─────────────────────────────────────────────┐
│ ☑ Label text describing the choice          │
└─────────────────────────────────────────────┘

Checkbox Group:
┌─────────────────────────────────────────────┐
│ Group Label *                                │
│ ☑ Option 1                                  │
│ ☐ Option 2                                  │
│ ☐ Option 3                                  │
│ Helper text (optional)                       │
└─────────────────────────────────────────────┘

Components:
1. Checkbox input (20×20px)
2. Label text (clickable)
3. Checkmark icon (when checked)
4. Group label (for related checkboxes)
5. Helper text (optional)
6. Error message (conditional)
```

---

## Variants

| Variant | Use Case | Specifications |
|---------|----------|----------------|
| **Default** | Standard checkbox | 20×20px box, 2px border, checkmark when selected |
| **Indeterminate** | Parent checkbox with partial child selection | Horizontal line icon instead of checkmark |
| **With Description** | Complex choices need explanation | Checkbox + label + secondary text below |
| **Card Style** | Visually prominent selection | Checkbox within bordered card container |

---

## Sizes

| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Checkbox Size** | 20×20px | - |
| **Border Width** | 2px | - |
| **Border Radius** | 4px | var(--radius-sm) × 0.5 |
| **Checkmark Size** | 14px | - |
| **Touch Target** | 44×44px (with padding) | WCAG 2.5.5 AAA |
| **Label Margin** | 12px left | var(--space-3) |
| **Label Font Size** | 16px | var(--font-size-base) |
| **Group Spacing** | 16px between items | var(--space-4) |

---

## States

### Unchecked (Default)
```css
.checkbox-input {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-neutral-400);
  border-radius: 4px;
  background: var(--color-white);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-easeOut);
}
```

### Checked
```css
.checkbox-input:checked {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.checkbox-input:checked::after {
  content: '';
  display: block;
  width: 14px;
  height: 14px;
  background-image: url("data:image/svg+xml,..."); /* checkmark */
  background-size: contain;
  color: var(--color-white);
}
```

### Indeterminate
```css
.checkbox-input:indeterminate {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.checkbox-input:indeterminate::after {
  content: '';
  display: block;
  width: 12px;
  height: 2px;
  background: var(--color-white);
  margin: 8px auto;
}
```

### Hover (Unchecked)
```css
.checkbox-input:hover:not(:disabled) {
  border-color: var(--color-neutral-600);
}
```

### Hover (Checked)
```css
.checkbox-input:checked:hover:not(:disabled) {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
}
```

### Focus
```css
.checkbox-input:focus {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}
```

### Disabled (Unchecked)
```css
.checkbox-input:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-300);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Disabled (Checked)
```css
.checkbox-input:disabled:checked {
  background: var(--color-neutral-400);
  border-color: var(--color-neutral-400);
  cursor: not-allowed;
}

.checkbox-input:disabled:checked::after {
  color: var(--color-neutral-100);
}
```

---

## Props/API

```typescript
interface CheckboxProps {
  /** Unique identifier */
  id: string;

  /** Checkbox name attribute (same for grouped checkboxes) */
  name: string;

  /** Label text */
  label: string;

  /** Checkbox value */
  value: string | number;

  /** Whether checkbox is checked */
  checked?: boolean;

  /** Whether checkbox is indeterminate (partial selection) */
  indeterminate?: boolean;

  /** Whether checkbox is required */
  required?: boolean;

  /** Whether checkbox is disabled */
  disabled?: boolean;

  /** Whether checkbox is invalid */
  invalid?: boolean;

  /** Helper text (for single checkbox or group) */
  helperText?: string;

  /** Error message */
  errorMessage?: string;

  /** Secondary description text */
  description?: string;

  /** Change handler */
  onChange?: (checked: boolean, value: string | number) => void;

  /** Blur handler */
  onBlur?: () => void;

  /** ARIA attributes */
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

interface CheckboxGroupProps {
  /** Group name (applied to all checkboxes) */
  name: string;

  /** Group label */
  label: string;

  /** Whether any checkbox in group is required */
  required?: boolean;

  /** Group helper text */
  helperText?: string;

  /** Group error message */
  errorMessage?: string;

  /** Array of checkbox options */
  options: CheckboxOption[];

  /** Array of selected values */
  value?: (string | number)[];

  /** Change handler for group */
  onChange?: (selectedValues: (string | number)[]) => void;
}

interface CheckboxOption {
  id: string;
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab:** Focus checkbox
- **Shift + Tab:** Focus previous element
- **Space:** Toggle checkbox state
- **Enter:** Submit form (if in form context)

### Screen Reader Support

#### Single Checkbox
```html
<div class="checkbox-field">
  <input
    type="checkbox"
    id="newsletter"
    name="newsletter"
    value="yes"
    class="checkbox-input"
    aria-describedby="newsletter-helper"
  />
  <label for="newsletter" class="checkbox-label">
    Quero receber dicas de marketing por email
  </label>
  <span id="newsletter-helper" class="helper-text">
    Enviamos conteúdo prático 1x por semana, sem spam
  </span>
</div>
```

#### Checkbox Group
```html
<fieldset class="checkbox-group">
  <legend class="checkbox-group-label">
    Quais canais você já usa? *
  </legend>

  <div class="checkbox-field">
    <input
      type="checkbox"
      id="channel-instagram"
      name="channels"
      value="instagram"
      class="checkbox-input"
    />
    <label for="channel-instagram" class="checkbox-label">
      Instagram
    </label>
  </div>

  <div class="checkbox-field">
    <input
      type="checkbox"
      id="channel-facebook"
      name="channels"
      value="facebook"
      class="checkbox-input"
    />
    <label for="channel-facebook" class="checkbox-label">
      Facebook
    </label>
  </div>

  <div class="checkbox-field">
    <input
      type="checkbox"
      id="channel-email"
      name="channels"
      value="email"
      class="checkbox-input"
    />
    <label for="channel-email" class="checkbox-label">
      Email Marketing
    </label>
  </div>

  <span id="channels-helper" class="helper-text" aria-describedby="channels-helper">
    Marca todas que você usa atualmente
  </span>
</fieldset>
```

### ARIA Attributes
- `aria-checked="true/false"` - For custom checkboxes
- `aria-describedby` - Links to helper text and errors
- `aria-invalid="true"` - When validation fails
- `aria-required="true"` - For required fields
- Use `<fieldset>` and `<legend>` for checkbox groups

### WCAG Compliance
- **Touch target:** 44×44px minimum (WCAG 2.5.5 AAA)
- **Color contrast:** 4.5:1 for label text
- **Focus indicator:** 3px outline visible and clear
- **Color independence:** Don't rely on color alone (use checkmark icon)
- **Label association:** Always use `<label for="">` or wrap

---

## Usage Guidelines

### Do's

✅ **Use for multiple independent choices**
- Each checkbox operates independently
- Users can select 0, 1, or multiple options
- Example: Select services interested in

✅ **Make the entire label clickable**
- Larger target = easier interaction
- Use `<label for="">` association
- Improves mobile usability significantly

✅ **Use positive language**
- ✅ "Receber newsletter"
- ✅ "Ativar notificações"
- ❌ "Não enviar emails" (creates confusion)

✅ **Stack checkboxes vertically for 3+ options**
- Easier to scan and select
- Better mobile experience
- Clear visual hierarchy

✅ **Provide clear, specific labels**
- ✅ "Concordo com os Termos de Uso"
- ❌ "I agree" (what are you agreeing to?)

✅ **Use helper text to explain why**
- "Enviamos dicas práticas 1x por semana"
- "Marca todas que você usa atualmente"
- Conversational, helpful tone

### Don'ts

❌ **Don't use for mutually exclusive choices**
- Use Radio buttons instead
- Only one option should be selectable
- Example: Payment method selection

❌ **Don't use checkbox for on/off toggles**
- Use Switch/Toggle component instead
- Toggle communicates immediate state change
- Checkbox implies form submission needed

❌ **Don't use negative language**
- ❌ "Don't send me emails"
- Creates double-negative confusion
- Checked = yes should be intuitive

❌ **Don't make labels too long**
- Keep under 80 characters
- Use description text for details
- Long labels hurt scannability

❌ **Don't require all checkboxes to be checked**
- Defeats purpose of choice
- Use required radio button instead
- Checkboxes = optional selections

❌ **Don't use more than 10 checkboxes in a group**
- Too many options overwhelm users
- Consider categorization or different pattern
- User research shows 5-7 is optimal

---

## Code Examples

### Single Checkbox (Terms Agreement)

```html
<div class="checkbox-field">
  <input
    type="checkbox"
    id="terms"
    name="terms"
    value="accepted"
    class="checkbox-input"
    required
    aria-required="true"
  />
  <label for="terms" class="checkbox-label">
    Concordo com os
    <a href="/termos" target="_blank">Termos de Uso</a>
    e
    <a href="/privacidade" target="_blank">Política de Privacidade</a>
    *
  </label>
</div>
```

### Checkbox Group

```html
<fieldset class="checkbox-group">
  <legend class="checkbox-group-label">
    Quais serviços te interessam? *
  </legend>

  <div class="checkbox-field">
    <input
      type="checkbox"
      id="service-social"
      name="services"
      value="social-media"
      class="checkbox-input"
    />
    <label for="service-social" class="checkbox-label">
      Gestão de Redes Sociais
    </label>
    <p class="checkbox-description">
      Instagram, Facebook, LinkedIn com estratégia e conteúdo
    </p>
  </div>

  <div class="checkbox-field">
    <input
      type="checkbox"
      id="service-ads"
      name="services"
      value="paid-ads"
      class="checkbox-input"
    />
    <label for="service-ads" class="checkbox-label">
      Tráfego Pago
    </label>
    <p class="checkbox-description">
      Google Ads, Meta Ads com foco em conversão
    </p>
  </div>

  <div class="checkbox-field">
    <input
      type="checkbox"
      id="service-email"
      name="services"
      value="email"
      class="checkbox-input"
    />
    <label for="service-email" class="checkbox-label">
      Email Marketing
    </label>
    <p class="checkbox-description">
      Automações e campanhas que vendem
    </p>
  </div>

  <span class="helper-text">
    Marca todos que fazem sentido pro seu negócio agora
  </span>
</fieldset>
```

### Indeterminate Checkbox (Select All)

```html
<div class="checkbox-field">
  <input
    type="checkbox"
    id="select-all"
    class="checkbox-input"
    aria-label="Selecionar todos"
  />
  <label for="select-all" class="checkbox-label">
    Selecionar todos
  </label>
</div>

<div class="checkbox-group-indented">
  <div class="checkbox-field">
    <input type="checkbox" id="item-1" name="items" value="1" class="checkbox-input" />
    <label for="item-1" class="checkbox-label">Item 1</label>
  </div>
  <div class="checkbox-field">
    <input type="checkbox" id="item-2" name="items" value="2" class="checkbox-input" />
    <label for="item-2" class="checkbox-label">Item 2</label>
  </div>
  <div class="checkbox-field">
    <input type="checkbox" id="item-3" name="items" value="3" class="checkbox-input" />
    <label for="item-3" class="checkbox-label">Item 3</label>
  </div>
</div>
```

### Error State

```html
<fieldset class="checkbox-group checkbox-group--error">
  <legend class="checkbox-group-label">
    Como você nos conheceu? *
  </legend>

  <div class="checkbox-field">
    <input type="checkbox" id="source-instagram" name="source" value="instagram" class="checkbox-input" />
    <label for="source-instagram" class="checkbox-label">Instagram</label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="source-google" name="source" value="google" class="checkbox-input" />
    <label for="source-google" class="checkbox-label">Google</label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="source-indication" name="source" value="indication" class="checkbox-input" />
    <label for="source-indication" class="checkbox-label">Indicação</label>
  </div>

  <span class="error-message" role="alert">
    Ops! Marca pelo menos uma opção pra gente saber como você chegou aqui
  </span>
</fieldset>
```

### CSS Implementation

```css
/* Checkbox Field Container */
.checkbox-field {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-2);
  min-height: 44px; /* Touch target */
  cursor: pointer;
}

/* Hide Native Checkbox */
.checkbox-input {
  appearance: none;
  width: 20px;
  height: 20px;
  min-width: 20px; /* Prevent shrinking */
  margin: 0;
  border: 2px solid var(--color-neutral-400);
  border-radius: 4px;
  background: var(--color-white);
  cursor: pointer;
  position: relative;
  transition: all var(--duration-fast) var(--ease-easeOut);
}

/* Checkmark */
.checkbox-input::after {
  content: '';
  position: absolute;
  display: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-input:checked::after {
  display: block;
  width: 14px;
  height: 14px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

/* Indeterminate */
.checkbox-input:indeterminate::after {
  display: block;
  width: 12px;
  height: 2px;
  background: var(--color-white);
  border-radius: 1px;
}

/* States */
.checkbox-input:checked,
.checkbox-input:indeterminate {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.checkbox-input:hover:not(:disabled) {
  border-color: var(--color-neutral-600);
}

.checkbox-input:checked:hover:not(:disabled),
.checkbox-input:indeterminate:hover:not(:disabled) {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.checkbox-input:focus {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}

.checkbox-input:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-300);
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-input:disabled:checked {
  background: var(--color-neutral-400);
  border-color: var(--color-neutral-400);
}

/* Label */
.checkbox-label {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  cursor: pointer;
  line-height: var(--line-height-normal);
  user-select: none;
}

.checkbox-label a {
  color: var(--color-brand-primary);
  text-decoration: underline;
}

.checkbox-input:disabled + .checkbox-label {
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}

/* Description */
.checkbox-description {
  margin: var(--space-1) 0 0 32px; /* Align with label */
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* Checkbox Group */
.checkbox-group {
  border: none;
  padding: 0;
  margin: 0;
}

.checkbox-group-label {
  display: block;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.checkbox-group .checkbox-field {
  margin-bottom: var(--space-4);
}

.checkbox-group .checkbox-field:last-of-type {
  margin-bottom: var(--space-2);
}

/* Error State */
.checkbox-group--error .checkbox-input {
  border-color: var(--color-feedback-error);
}

.checkbox-group-indented {
  margin-left: var(--space-6);
}
```

### JavaScript for Indeterminate State

```javascript
// Select All functionality with indeterminate state
const selectAllCheckbox = document.getElementById('select-all');
const itemCheckboxes = document.querySelectorAll('input[name="items"]');

function updateSelectAllState() {
  const checkedCount = Array.from(itemCheckboxes).filter(cb => cb.checked).length;
  const totalCount = itemCheckboxes.length;

  if (checkedCount === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
  } else if (checkedCount === totalCount) {
    selectAllCheckbox.checked = true;
    selectAllCheckbox.indeterminate = false;
  } else {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = true;
  }
}

selectAllCheckbox.addEventListener('change', function() {
  const isChecked = this.checked;
  itemCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;
  });
});

itemCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateSelectAllState);
});

// Initialize state
updateSelectAllState();
```

---

## Related Components

- **[Radio](./radio.md)** - For mutually exclusive choices
- **[Switch](./switch.md)** - For on/off toggles with immediate effect
- **[Form Field](./form-field.md)** - Wrapper with label and error handling
- **[Select](./select.md)** - For single choice from many options
- **[Form](./form.md)** - Complete form layout patterns

---

## Brand Voice in Labels

Following Oitavo Café's conversational, friendly tone:

### Good Label Examples
- "Quero receber dicas práticas de marketing por email"
- "Concordo em receber propostas personalizadas"
- "Tenho interesse em consultoria de tráfego pago"

### Good Helper Text Examples
- "Enviamos apenas conteúdo prático, 1x por semana, sem spam"
- "Marca todos que fazem sentido pro seu negócio agora"
- "Não se preocupa, você pode mudar isso depois"

### Good Error Messages
- "Ops! Precisa marcar pelo menos uma opção pra continuar"
- "Quase lá! Só confirma que você leu os termos"
- "Marca pelo menos um serviço que te interessa"

### Bad Examples
- ❌ "Select all that apply" (English, too formal)
- ❌ "This field is required" (obvious, not helpful)
- ❌ "Invalid selection" (not conversational, no solution)

Remember: Be helpful and conversational. Explain why you're asking. Make users feel guided, not tested.
