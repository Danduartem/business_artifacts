# Radio Button Component

## Overview

A form control for mutually exclusive selection from a group of options. Only one radio button in a group can be selected at a time, making the choice clear and explicit.

**When to use:**
- 2-5 mutually exclusive choices
- All options should be visible at once
- User must select exactly one option
- Options are relatively short (under 50 characters)

**When NOT to use:**
- More than 5 options (use Select dropdown instead)
- Multiple selections needed (use Checkbox instead)
- Binary on/off toggle (use Switch instead)
- Less than 2 options (not a choice)

---

## Anatomy

```
Radio Group:
┌─────────────────────────────────────────────┐
│ Group Label *                                │
│ ○ Option 1                                  │
│ ◉ Option 2 (selected)                       │
│ ○ Option 3                                  │
│ Helper text (optional)                       │
└─────────────────────────────────────────────┘

With Descriptions:
┌─────────────────────────────────────────────┐
│ Escolha seu plano *                          │
│                                              │
│ ◉ Plano Starter                             │
│   Ideal pra quem está começando agora       │
│                                              │
│ ○ Plano Pro                                 │
│   Pra negócios que já faturam R$ 50k+/mês   │
└─────────────────────────────────────────────┘

Components:
1. Radio button (20×20px circle)
2. Label text (clickable)
3. Inner dot (when selected)
4. Group label (required)
5. Description text (optional)
6. Helper text (optional)
7. Error message (conditional)
```

---

## Variants

| Variant | Use Case | Specifications |
|---------|----------|----------------|
| **Vertical Stack** | Default, best for 2+ options | Options stacked vertically with 16px spacing |
| **Horizontal** | 2 short options only | Inline display with 32px spacing (e.g., Sim/Não) |
| **With Description** | Complex choices need context | Radio + bold label + secondary text |
| **Card Style** | Visually prominent plans/tiers | Radio inside bordered card with pricing/features |

---

## Sizes

| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Radio Size** | 20×20px | - |
| **Border Width** | 2px | - |
| **Border Radius** | 50% (circle) | var(--radius-full) |
| **Inner Dot Size** | 10px | - |
| **Touch Target** | 44×44px (with padding) | WCAG 2.5.5 AAA |
| **Label Margin** | 12px left | var(--space-3) |
| **Label Font Size** | 16px | var(--font-size-base) |
| **Vertical Spacing** | 16px between options | var(--space-4) |
| **Horizontal Spacing** | 32px between options | var(--space-8) |

---

## States

### Unselected (Default)
```css
.radio-input {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-neutral-400);
  border-radius: 50%;
  background: var(--color-white);
  cursor: pointer;
  position: relative;
  transition: all var(--duration-fast) var(--ease-easeOut);
}
```

### Selected
```css
.radio-input:checked {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.radio-input:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-white);
}
```

### Hover (Unselected)
```css
.radio-input:hover:not(:disabled) {
  border-color: var(--color-neutral-600);
}
```

### Hover (Selected)
```css
.radio-input:checked:hover:not(:disabled) {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
}
```

### Focus
```css
.radio-input:focus {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}
```

### Disabled (Unselected)
```css
.radio-input:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-300);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Disabled (Selected)
```css
.radio-input:disabled:checked {
  background: var(--color-neutral-400);
  border-color: var(--color-neutral-400);
  cursor: not-allowed;
}

.radio-input:disabled:checked::after {
  background: var(--color-neutral-100);
}
```

---

## Props/API

```typescript
interface RadioProps {
  /** Unique identifier */
  id: string;

  /** Radio group name (must be same for all options in group) */
  name: string;

  /** Radio value (submitted when selected) */
  value: string | number;

  /** Label text */
  label: string;

  /** Whether this radio is checked */
  checked?: boolean;

  /** Whether radio is required */
  required?: boolean;

  /** Whether radio is disabled */
  disabled?: boolean;

  /** Description text (optional) */
  description?: string;

  /** Change handler */
  onChange?: (value: string | number) => void;

  /** ARIA attributes */
  ariaDescribedBy?: string;
}

interface RadioGroupProps {
  /** Group name (applied to all radios) */
  name: string;

  /** Group label (required) */
  label: string;

  /** Whether group is required */
  required?: boolean;

  /** Group helper text */
  helperText?: string;

  /** Group error message */
  errorMessage?: string;

  /** Whether group is invalid */
  invalid?: boolean;

  /** Layout direction */
  direction?: 'vertical' | 'horizontal';

  /** Radio options */
  options: RadioOption[];

  /** Currently selected value */
  value?: string | number;

  /** Change handler for group */
  onChange?: (value: string | number) => void;
}

interface RadioOption {
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
- **Tab:** Focus first/next radio in group
- **Shift + Tab:** Focus previous element
- **Arrow Up/Down:** Navigate between radios in group (vertical)
- **Arrow Left/Right:** Navigate between radios in group (horizontal)
- **Space:** Select focused radio
- **Enter:** Submit form (if in form)

### Screen Reader Support

#### Basic Radio Group
```html
<fieldset class="radio-group">
  <legend class="radio-group-label">
    Qual o porte da sua empresa? *
  </legend>

  <div class="radio-field">
    <input
      type="radio"
      id="size-micro"
      name="businessSize"
      value="micro"
      class="radio-input"
      required
    />
    <label for="size-micro" class="radio-label">
      Microempresa (até R$ 360k/ano)
    </label>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="size-small"
      name="businessSize"
      value="small"
      class="radio-input"
    />
    <label for="size-small" class="radio-label">
      Pequeno porte (R$ 360k - R$ 4.8M/ano)
    </label>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="size-medium"
      name="businessSize"
      value="medium"
      class="radio-input"
    />
    <label for="size-medium" class="radio-label">
      Médio porte (acima de R$ 4.8M/ano)
    </label>
  </div>

  <span class="helper-text" id="size-helper">
    (pra saber se fazemos sentido pra você)
  </span>
</fieldset>
```

#### With Descriptions
```html
<fieldset class="radio-group" aria-describedby="plan-helper">
  <legend class="radio-group-label">
    Escolha seu plano *
  </legend>

  <div class="radio-field">
    <input
      type="radio"
      id="plan-starter"
      name="plan"
      value="starter"
      class="radio-input"
      aria-describedby="plan-starter-desc"
    />
    <label for="plan-starter" class="radio-label">
      Plano Starter
    </label>
    <p id="plan-starter-desc" class="radio-description">
      Ideal pra quem está começando agora - R$ 1.500/mês
    </p>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="plan-pro"
      name="plan"
      value="pro"
      class="radio-input"
      aria-describedby="plan-pro-desc"
    />
    <label for="plan-pro" class="radio-label">
      Plano Pro
    </label>
    <p id="plan-pro-desc" class="radio-description">
      Pra negócios que já faturam R$ 50k+/mês - R$ 3.500/mês
    </p>
  </div>

  <span id="plan-helper" class="helper-text">
    Você pode mudar de plano a qualquer momento
  </span>
</fieldset>
```

### ARIA Attributes
- `<fieldset>` - Groups related radios (required)
- `<legend>` - Provides group label (required)
- `aria-describedby` - Links to helper text and descriptions
- `aria-invalid="true"` - When validation fails
- `aria-required="true"` - For required groups (on fieldset or first radio)

### WCAG Compliance
- **Touch target:** 44×44px minimum (WCAG 2.5.5 AAA)
- **Color contrast:** 4.5:1 for label text
- **Focus indicator:** 3px visible outline
- **Color independence:** Inner dot provides non-color indicator
- **Label association:** Always use `<label for="">` or wrap
- **Keyboard navigation:** Arrow keys must work within group

---

## Usage Guidelines

### Do's

✅ **Use for mutually exclusive choices**
- Only one option can be selected
- Clear communication of exclusivity
- Example: Payment method, shipping option

✅ **Pre-select the most common or recommended option**
- Reduces decision time
- Shows best practice or default
- Example: Pre-select recommended plan

✅ **Keep options to 2-5 choices**
- More than 5: use Select dropdown
- Easier to scan when all visible
- Optimal cognitive load

✅ **Stack vertically for easier scanning**
- Better readability
- Clearer visual hierarchy
- Mobile-friendly

✅ **Use horizontal layout only for 2 short options**
- Example: Sim/Não, Ativo/Inativo
- Must be under 20 characters each
- Clear visual relationship

✅ **Provide context in descriptions**
- Help users make informed choices
- Explain differences between options
- Use conversational tone

### Don'ts

❌ **Don't use for non-exclusive choices**
- Use Checkbox for multiple selections
- Radio = only one can be selected
- Don't confuse users with wrong pattern

❌ **Don't use for on/off toggles**
- Use Switch component instead
- Switch better communicates state
- Radio implies form submission

❌ **Don't use for more than 5 options**
- Select dropdown is better
- Too many radios overwhelm
- Harder to scan and find option

❌ **Don't make all options disabled**
- At least one must be selectable
- Otherwise, why show the group?
- Confusing user experience

❌ **Don't allow no selection if required**
- Pre-select default option OR
- Require selection before submission
- Clear error message if none selected

❌ **Don't use vague labels**
- ❌ "Option A", "Choice 1"
- ✅ "Cartão de crédito", "PIX"
- Be specific and clear

---

## Code Examples

### Basic Radio Group (Vertical)

```html
<fieldset class="radio-group">
  <legend class="radio-group-label">
    Como você prefere receber o contato? *
  </legend>

  <div class="radio-field">
    <input
      type="radio"
      id="contact-email"
      name="contactMethod"
      value="email"
      class="radio-input"
      checked
      required
    />
    <label for="contact-email" class="radio-label">
      Email
    </label>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="contact-whatsapp"
      name="contactMethod"
      value="whatsapp"
      class="radio-input"
    />
    <label for="contact-whatsapp" class="radio-label">
      WhatsApp
    </label>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="contact-phone"
      name="contactMethod"
      value="phone"
      class="radio-input"
    />
    <label for="contact-phone" class="radio-label">
      Telefone
    </label>
  </div>

  <span class="helper-text">
    Vamos entrar em contato em até 24h
  </span>
</fieldset>
```

### Horizontal Layout (2 Options)

```html
<fieldset class="radio-group radio-group--horizontal">
  <legend class="radio-group-label">
    Você já investe em marketing digital? *
  </legend>

  <div class="radio-field">
    <input
      type="radio"
      id="invests-yes"
      name="currentlyInvests"
      value="yes"
      class="radio-input"
      required
    />
    <label for="invests-yes" class="radio-label">
      Sim
    </label>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="invests-no"
      name="currentlyInvests"
      value="no"
      class="radio-input"
    />
    <label for="invests-no" class="radio-label">
      Não
    </label>
  </div>
</fieldset>
```

### With Descriptions

```html
<fieldset class="radio-group">
  <legend class="radio-group-label">
    Qual seu objetivo principal? *
  </legend>

  <div class="radio-field">
    <input
      type="radio"
      id="goal-leads"
      name="mainGoal"
      value="leads"
      class="radio-input"
      aria-describedby="goal-leads-desc"
      checked
    />
    <label for="goal-leads" class="radio-label">
      Gerar mais leads qualificados
    </label>
    <p id="goal-leads-desc" class="radio-description">
      Aumentar o número de contatos interessados no seu produto/serviço
    </p>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="goal-sales"
      name="mainGoal"
      value="sales"
      class="radio-input"
      aria-describedby="goal-sales-desc"
    />
    <label for="goal-sales" class="radio-label">
      Aumentar vendas diretas
    </label>
    <p id="goal-sales-desc" class="radio-description">
      Vender mais através de e-commerce ou conversões online
    </p>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="goal-brand"
      name="mainGoal"
      value="brand"
      class="radio-input"
      aria-describedby="goal-brand-desc"
    />
    <label for="goal-brand" class="radio-label">
      Fortalecer a marca
    </label>
    <p id="goal-brand-desc" class="radio-description">
      Aumentar reconhecimento e autoridade no mercado
    </p>
  </div>

  <span class="helper-text">
    Vamos focar nossa estratégia no que mais importa pra você
  </span>
</fieldset>
```

### Error State

```html
<fieldset class="radio-group radio-group--error" aria-invalid="true">
  <legend class="radio-group-label">
    Escolha a forma de pagamento *
  </legend>

  <div class="radio-field">
    <input
      type="radio"
      id="payment-credit"
      name="paymentMethod"
      value="credit"
      class="radio-input"
      required
      aria-describedby="payment-error"
    />
    <label for="payment-credit" class="radio-label">
      Cartão de crédito
    </label>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="payment-pix"
      name="paymentMethod"
      value="pix"
      class="radio-input"
    />
    <label for="payment-pix" class="radio-label">
      PIX
    </label>
  </div>

  <div class="radio-field">
    <input
      type="radio"
      id="payment-boleto"
      name="paymentMethod"
      value="boleto"
      class="radio-input"
    />
    <label for="payment-boleto" class="radio-label">
      Boleto bancário
    </label>
  </div>

  <span id="payment-error" class="error-message" role="alert">
    Ops! Escolhe uma forma de pagamento pra continuar
  </span>
</fieldset>
```

### CSS Implementation

```css
/* Radio Group */
.radio-group {
  border: none;
  padding: 0;
  margin: 0;
}

.radio-group-label {
  display: block;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

/* Radio Field */
.radio-field {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-2);
  min-height: 44px; /* Touch target */
  margin-bottom: var(--space-4);
  cursor: pointer;
}

.radio-group .radio-field:last-of-type {
  margin-bottom: var(--space-2);
}

/* Hide Native Radio */
.radio-input {
  appearance: none;
  width: 20px;
  height: 20px;
  min-width: 20px; /* Prevent shrinking */
  margin: 0;
  border: 2px solid var(--color-neutral-400);
  border-radius: 50%;
  background: var(--color-white);
  cursor: pointer;
  position: relative;
  transition: all var(--duration-fast) var(--ease-easeOut);
}

/* Inner Dot */
.radio-input::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-white);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-easeOut);
}

.radio-input:checked::after {
  opacity: 1;
}

/* States */
.radio-input:checked {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.radio-input:hover:not(:disabled) {
  border-color: var(--color-neutral-600);
}

.radio-input:checked:hover:not(:disabled) {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.radio-input:focus {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}

.radio-input:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-300);
  cursor: not-allowed;
  opacity: 0.6;
}

.radio-input:disabled:checked {
  background: var(--color-neutral-400);
  border-color: var(--color-neutral-400);
}

.radio-input:disabled:checked::after {
  background: var(--color-neutral-100);
}

/* Label */
.radio-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  cursor: pointer;
  line-height: var(--line-height-normal);
  user-select: none;
}

.radio-input:disabled + .radio-label {
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}

/* Description */
.radio-description {
  margin: var(--space-1) 0 0 32px; /* Align with label */
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* Horizontal Layout */
.radio-group--horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  align-items: center;
}

.radio-group--horizontal .radio-field {
  margin-bottom: 0;
  flex: 0 0 auto;
}

/* Error State */
.radio-group--error .radio-input {
  border-color: var(--color-feedback-error);
}

.radio-group--error .radio-input:checked {
  background: var(--color-feedback-error);
  border-color: var(--color-feedback-error);
}
```

### JavaScript for Arrow Key Navigation

```javascript
class RadioGroup {
  constructor(fieldset) {
    this.fieldset = fieldset;
    this.radios = Array.from(fieldset.querySelectorAll('input[type="radio"]'));
    this.init();
  }

  init() {
    this.radios.forEach((radio, index) => {
      radio.addEventListener('keydown', (e) => this.handleKeydown(e, index));
    });
  }

  handleKeydown(event, currentIndex) {
    let newIndex = currentIndex;

    switch(event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % this.radios.length;
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = (currentIndex - 1 + this.radios.length) % this.radios.length;
        break;

      case ' ':
        event.preventDefault();
        this.radios[currentIndex].checked = true;
        this.radios[currentIndex].dispatchEvent(new Event('change', { bubbles: true }));
        return;

      default:
        return;
    }

    // Skip disabled radios
    while (this.radios[newIndex].disabled) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        newIndex = (newIndex + 1) % this.radios.length;
      } else {
        newIndex = (newIndex - 1 + this.radios.length) % this.radios.length;
      }

      // Prevent infinite loop if all are disabled
      if (newIndex === currentIndex) return;
    }

    this.radios[newIndex].focus();
    this.radios[newIndex].checked = true;
    this.radios[newIndex].dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// Initialize all radio groups
document.querySelectorAll('.radio-group').forEach(fieldset => {
  new RadioGroup(fieldset);
});
```

---

## Related Components

- **[Checkbox](./checkbox.md)** - For multiple independent selections
- **[Select](./select.md)** - For single choice from 5+ options
- **[Switch](./switch.md)** - For binary on/off toggles
- **[Form Field](./form-field.md)** - Wrapper with label and error handling
- **[Form](./form.md)** - Complete form layout patterns

---

## Brand Voice in Labels

Following Oitavo Café's conversational, helpful tone:

### Good Label Examples
- "Como você prefere receber o contato?"
- "Qual seu objetivo principal com marketing?"
- "Você já investe em tráfego pago?"

### Good Description Examples
- "Aumentar o número de contatos interessados no seu produto/serviço"
- "Ideal pra quem está começando agora"
- "Pra negócios que já faturam R$ 50k+/mês"

### Good Helper Text Examples
- "(pra saber se fazemos sentido pra você)"
- "Vamos focar nossa estratégia no que mais importa pra você"
- "Você pode mudar de plano a qualquer momento"

### Good Error Messages
- "Ops! Escolhe uma opção pra continuar"
- "Precisa selecionar uma forma de pagamento"
- "Quase lá! Só falta escolher seu plano"

### Bad Examples
- ❌ "Select one option" (English, impersonal)
- ❌ "Required field" (obvious, not helpful)
- ❌ "Invalid selection" (not conversational)
- ❌ "Choose payment" (too terse, not friendly)

Remember: Ask questions naturally, explain why you need the info, and make users feel like they're talking to a helpful person, not filling out bureaucratic forms.
