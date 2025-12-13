# Select Component

## Overview

A dropdown menu component that allows users to select one option from a list of choices. Optimized for 5-15 options with clear visual hierarchy and keyboard navigation.

**When to use:**
- Choosing from 5-15 predefined options
- Space-constrained layouts where showing all options would clutter
- Options are familiar (countries, categories, months)
- Single selection required

**When NOT to use:**
- Less than 5 options (use Radio buttons instead - shows all options at once)
- More than 15 options (use Autocomplete/Search input instead)
- Multiple selections needed (use Checkbox group)
- Unfamiliar options users need to compare (use Radio buttons to show all)

---

## Anatomy

```
┌─────────────────────────────────────────────┐
│ Label *                                      │
│ ┌─────────────────────────────────────────┐ │
│ │ Selected option or placeholder       ▼  │ │
│ └─────────────────────────────────────────┘ │
│ Helper text (optional)                       │
└─────────────────────────────────────────────┘

When Open:
┌─────────────────────────────────────────────┐
│ Selected option or placeholder        ▲  │
├─────────────────────────────────────────────┤
│ ✓ Option 1 (selected)                      │
│   Option 2                                  │
│   Option 3                                  │
│   Option 4                                  │
│   Option 5                                  │
└─────────────────────────────────────────────┘

Components:
1. Label (required)
2. Select trigger/button
3. Chevron icon (down/up)
4. Dropdown menu (when open)
5. Options list
6. Selected indicator (checkmark)
7. Helper text (optional)
8. Error message (conditional)
```

---

## Variants

| Variant | Use Case | Specifications |
|---------|----------|----------------|
| **Default** | Standard dropdown selection | White background, neutral border, chevron-down icon |
| **With Icon** | Visual category distinction | Icon before text (e.g., flag for countries) |
| **Searchable** | Large option lists (10+) | Type-ahead filter within dropdown |
| **Grouped** | Categorized options | Option groups with headers (e.g., regions → cities) |

---

## Sizes

| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Height** | 48px | 3 × var(--space-4) |
| **Padding** | 12px 40px 12px 16px | var(--space-3) var(--space-10) var(--space-3) var(--space-4) |
| **Font Size** | 16px | var(--font-size-base) |
| **Border Width** | 2px | - |
| **Border Radius** | 6px | var(--radius-sm) |
| **Icon Size** | 20px | - |
| **Icon Position** | Right 12px, centered | - |

### Dropdown Menu
| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Max Height** | 280px | 7 options × 40px |
| **Border Width** | 2px | - |
| **Border Radius** | 6px | var(--radius-sm) |
| **Shadow** | 0 4px 16px rgba(43, 37, 35, 0.15) | var(--shadow-md) |

### Option
| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Height** | 40px | var(--space-10) |
| **Padding** | 10px 16px | var(--space-2.5) var(--space-4) |
| **Font Size** | 16px | var(--font-size-base) |

---

## States

### Default (Closed)
```css
.select-trigger {
  height: 48px;
  padding: var(--space-3) 40px var(--space-3) var(--space-4);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-easeOut);
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-neutral-600);
  pointer-events: none;
  transition: transform var(--duration-fast) var(--ease-easeOut);
}
```

### Hover
```css
.select-trigger:hover {
  border-color: var(--color-neutral-400);
}
```

### Focus / Open
```css
.select-trigger:focus,
.select-trigger[aria-expanded="true"] {
  border-color: var(--color-brand-primary);
  box-shadow: var(--shadow-focus);
  outline: none;
}

.select-trigger[aria-expanded="true"] .select-icon {
  transform: translateY(-50%) rotate(180deg);
}
```

### Disabled
```css
.select-trigger:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-200);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}
```

### Error
```css
.select-trigger[aria-invalid="true"] {
  border-color: var(--color-feedback-error);
  background: var(--color-feedback-errorBg);
}
```

### Dropdown Menu
```css
.select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 280px;
  overflow-y: auto;
  background: var(--color-white);
  border: 2px solid var(--color-brand-primary);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  z-index: var(--z-dropdown);
}
```

### Option States
```css
.select-option {
  height: 40px;
  padding: 10px var(--space-4);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-easeOut);
}

.select-option:hover {
  background: var(--color-primary-50);
}

.select-option[aria-selected="true"] {
  background: var(--color-primary-100);
  font-weight: var(--font-weight-medium);
}

.select-option[aria-selected="true"]::after {
  content: '✓';
  float: right;
  color: var(--color-brand-primary);
}
```

---

## Props/API

```typescript
interface SelectProps {
  /** Unique identifier for label association */
  id: string;

  /** Select name attribute */
  name: string;

  /** Label text (always visible) */
  label: string;

  /** Whether field is required */
  required?: boolean;

  /** Placeholder text when no option selected */
  placeholder?: string;

  /** Helper text shown below field */
  helperText?: string;

  /** Error message (shown when invalid) */
  errorMessage?: string;

  /** Whether select is invalid */
  invalid?: boolean;

  /** Whether select is disabled */
  disabled?: boolean;

  /** Options array */
  options: SelectOption[];

  /** Currently selected value */
  value?: string | number;

  /** Change handler */
  onChange?: (value: string | number) => void;

  /** Blur handler */
  onBlur?: () => void;

  /** Enable type-ahead search */
  searchable?: boolean;

  /** Custom icon component */
  icon?: React.ReactNode;
}

interface SelectOption {
  /** Option value */
  value: string | number;

  /** Display label */
  label: string;

  /** Whether option is disabled */
  disabled?: boolean;

  /** Optional icon before label */
  icon?: React.ReactNode;

  /** Optional group header */
  group?: string;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab:** Focus select trigger
- **Space / Enter:** Open dropdown
- **Arrow Up/Down:** Navigate options
- **Home:** First option
- **End:** Last option
- **Type character:** Jump to option starting with that letter (type-ahead)
- **Esc:** Close dropdown
- **Enter:** Select highlighted option

### Screen Reader Support

#### Using Native Select (Recommended for simple cases)
```html
<label for="business-size">
  Porte da sua empresa *
</label>
<select
  id="business-size"
  name="businessSize"
  required
  aria-required="true"
  aria-describedby="business-size-helper"
>
  <option value="">Selecione...</option>
  <option value="micro">Microempresa (até R$ 360k/ano)</option>
  <option value="small">Pequeno porte (R$ 360k - R$ 4.8M/ano)</option>
  <option value="medium">Médio porte (acima de R$ 4.8M/ano)</option>
</select>
<span id="business-size-helper" class="helper-text">
  (pra saber se fazemos sentido pra você)
</span>
```

#### Using Custom Select (For complex UI)
```html
<label id="region-label" for="region-select">
  Região de atuação *
</label>
<div class="select-wrapper">
  <button
    id="region-select"
    role="combobox"
    aria-labelledby="region-label"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-controls="region-listbox"
    aria-activedescendant="region-option-1"
  >
    <span class="select-value">Sudeste</span>
    <svg class="select-icon" aria-hidden="true"><!-- chevron --></svg>
  </button>

  <ul
    id="region-listbox"
    role="listbox"
    aria-labelledby="region-label"
    hidden
  >
    <li id="region-option-1" role="option" aria-selected="true">
      Sudeste
    </li>
    <li id="region-option-2" role="option" aria-selected="false">
      Sul
    </li>
    <li id="region-option-3" role="option" aria-selected="false">
      Nordeste
    </li>
  </ul>
</div>
```

### ARIA Attributes
- `role="combobox"` - On trigger button (custom select)
- `aria-haspopup="listbox"` - Indicates dropdown will appear
- `aria-expanded="true/false"` - Dropdown state
- `aria-controls` - Links trigger to dropdown
- `aria-activedescendant` - Currently highlighted option
- `role="listbox"` - On dropdown menu
- `role="option"` - On each option
- `aria-selected="true/false"` - Selected state
- `aria-required="true"` - For required fields
- `aria-invalid="true"` - When validation fails

### WCAG Compliance
- **Touch target:** 48px height minimum (WCAG 2.5.5)
- **Option height:** 40px minimum for touch
- **Font size:** 16px prevents iOS zoom
- **Color contrast:** 4.5:1 for all text
- **Focus indicator:** 3px outline visible
- **Type-ahead:** First letter navigation required

---

## Usage Guidelines

### Do's

✅ **Use for 5-15 options**
- Optimal range for dropdown pattern
- Below 5: radio buttons show all at once (better UX)
- Above 15: search/autocomplete is more efficient

✅ **Sort options logically**
- Alphabetical for equal importance
- By frequency of use (most common first)
- By logical sequence (small → medium → large)

✅ **Include a default "Selecione..." option**
- Makes selection explicit
- Prevents accidental submission of first option
- Shows field is interactive

✅ **Provide context in helper text**
- "Escolha a opção que melhor descreve seu negócio"
- "(pra saber se fazemos sentido pra você)"

✅ **Group related options logically**
```html
<optgroup label="Produtos Digitais">
  <option>E-book</option>
  <option>Curso Online</option>
</optgroup>
<optgroup label="Serviços">
  <option>Consultoria</option>
  <option>Mentoria</option>
</optgroup>
```

✅ **Use semantic HTML select when possible**
- Better accessibility out of the box
- Works without JavaScript
- Mobile OS provides native picker

### Don'ts

❌ **Don't use for <5 options**
- Radio buttons show all options at once
- Easier to scan and compare
- No interaction required to see choices

❌ **Don't use for >15 options**
- Scrolling through long lists is tedious
- Autocomplete with search is better UX
- Consider if you need that many options

❌ **Don't auto-select first option**
- Users may not notice it's selected
- Causes form errors and frustration
- Violates principle of explicit choice

❌ **Don't use vague option labels**
- ❌ "Option 1", "Choice A"
- ✅ "Microempresa (até R$ 360k/ano)"

❌ **Don't rely on color alone**
- Selected state needs checkmark icon
- Disabled options need opacity + cursor
- Meets WCAG accessibility standards

❌ **Don't make labels too long**
- Keep under 50 characters if possible
- Use helper text for explanations
- Long labels break mobile layouts

---

## Code Examples

### Basic Select (Native)

```html
<div class="form-field">
  <label for="category" class="form-label">
    Categoria do seu negócio *
  </label>
  <div class="select-wrapper">
    <select
      id="category"
      name="category"
      class="select"
      required
      aria-required="true"
      aria-describedby="category-helper"
    >
      <option value="">Selecione uma categoria...</option>
      <option value="ecommerce">E-commerce</option>
      <option value="services">Prestação de Serviços</option>
      <option value="education">Educação</option>
      <option value="health">Saúde e Bem-estar</option>
      <option value="food">Alimentação</option>
      <option value="other">Outro</option>
    </select>
    <svg class="select-icon" aria-hidden="true">
      <!-- chevron-down icon -->
    </svg>
  </div>
  <span id="category-helper" class="helper-text">
    Escolha a opção que melhor descreve sua área de atuação
  </span>
</div>
```

### With Option Groups

```html
<div class="form-field">
  <label for="product-type" class="form-label">
    Tipo de produto/serviço *
  </label>
  <div class="select-wrapper">
    <select
      id="product-type"
      name="productType"
      class="select"
      required
    >
      <option value="">Selecione...</option>

      <optgroup label="Produtos Digitais">
        <option value="ebook">E-book</option>
        <option value="course">Curso Online</option>
        <option value="membership">Área de Membros</option>
      </optgroup>

      <optgroup label="Produtos Físicos">
        <option value="retail">Varejo</option>
        <option value="handmade">Artesanato</option>
      </optgroup>

      <optgroup label="Serviços">
        <option value="consulting">Consultoria</option>
        <option value="coaching">Mentoria/Coaching</option>
        <option value="agency">Agência</option>
      </optgroup>
    </select>
    <svg class="select-icon" aria-hidden="true">
      <!-- chevron-down -->
    </svg>
  </div>
</div>
```

### Error State

```html
<div class="form-field form-field--error">
  <label for="revenue" class="form-label">
    Faturamento mensal *
  </label>
  <div class="select-wrapper">
    <select
      id="revenue"
      name="revenue"
      class="select select--error"
      required
      aria-required="true"
      aria-invalid="true"
      aria-describedby="revenue-error"
    >
      <option value="">Selecione...</option>
      <option value="0-10k">Até R$ 10 mil</option>
      <option value="10k-50k">R$ 10 mil - R$ 50 mil</option>
      <option value="50k-100k">R$ 50 mil - R$ 100 mil</option>
      <option value="100k+">Acima de R$ 100 mil</option>
    </select>
    <svg class="select-icon" aria-hidden="true">
      <!-- chevron-down -->
    </svg>
  </div>
  <span id="revenue-error" class="error-message" role="alert">
    Ops! Precisamos saber seu faturamento pra montar a proposta certa pra você
  </span>
</div>
```

### CSS Implementation

```css
.select-wrapper {
  position: relative;
  width: 100%;
}

.select {
  appearance: none;
  width: 100%;
  height: 48px;
  padding: var(--space-3) 40px var(--space-3) var(--space-4);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  font-family: inherit;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-easeOut);
}

.select:hover {
  border-color: var(--color-neutral-400);
}

.select:focus {
  border-color: var(--color-brand-primary);
  box-shadow: var(--shadow-focus);
  outline: none;
}

.select--error {
  border-color: var(--color-feedback-error);
  background: var(--color-feedback-errorBg);
}

.select:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-200);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-neutral-600);
  pointer-events: none;
  transition: transform var(--duration-fast) var(--ease-easeOut);
}

.select:focus + .select-icon {
  color: var(--color-brand-primary);
}

/* Option Groups */
optgroup {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-style: normal;
}

option {
  padding: var(--space-2) var(--space-4);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
}

option:disabled {
  color: var(--color-text-tertiary);
}
```

### Custom Select with JavaScript

```javascript
class CustomSelect {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('[role="combobox"]');
    this.listbox = element.querySelector('[role="listbox"]');
    this.options = Array.from(element.querySelectorAll('[role="option"]'));
    this.selectedIndex = 0;

    this.init();
  }

  init() {
    this.trigger.addEventListener('click', () => this.toggle());
    this.trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));

    this.options.forEach((option, index) => {
      option.addEventListener('click', () => this.selectOption(index));
    });

    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    const isExpanded = this.trigger.getAttribute('aria-expanded') === 'true';
    isExpanded ? this.close() : this.open();
  }

  open() {
    this.trigger.setAttribute('aria-expanded', 'true');
    this.listbox.hidden = false;
    this.options[this.selectedIndex].focus();
  }

  close() {
    this.trigger.setAttribute('aria-expanded', 'false');
    this.listbox.hidden = true;
    this.trigger.focus();
  }

  selectOption(index) {
    this.selectedIndex = index;

    this.options.forEach((opt, i) => {
      opt.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    this.trigger.querySelector('.select-value').textContent =
      this.options[index].textContent;

    this.trigger.setAttribute('aria-activedescendant',
      this.options[index].id);

    this.close();
  }

  handleTriggerKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.open();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.open();
    }
  }
}

// Initialize all custom selects
document.querySelectorAll('.select-wrapper').forEach(el => {
  new CustomSelect(el);
});
```

---

## Related Components

- **[Input](./input.md)** - For free-text entry
- **[Radio](./radio.md)** - For 2-5 visible options (mutually exclusive)
- **[Checkbox](./checkbox.md)** - For multiple selections
- **[Form Field](./form-field.md)** - Wrapper with label, helper, and error
- **[Form](./form.md)** - Complete form layout patterns

---

## Brand Voice in Microcopy

Following Oitavo Café's conversational, helpful tone:

### Placeholder Text
**Good examples:**
- "Selecione uma opção..."
- "Escolha seu segmento..."
- "Qual o porte da sua empresa?"

**Bad examples:**
- ❌ "Select..." (English)
- ❌ "---" (not helpful)
- ❌ "Choose" (too terse)

### Helper Text
**Good examples:**
- "(pra saber se fazemos sentido pra você)"
- "Escolha a opção que melhor descreve seu negócio"
- "Não tem certeza? Escolha a opção mais próxima"

**Bad examples:**
- ❌ "Required field" (obvious from asterisk)
- ❌ "Select one" (too obvious)
- ❌ Empty (missed opportunity to guide)

### Error Messages
**Good examples:**
- "Ops! Precisamos saber sua categoria pra continuar"
- "Escolhe uma opção aí pra gente poder ajudar você melhor"
- "Quase lá! Só falta selecionar seu faturamento"

**Bad examples:**
- ❌ "Required" (not helpful)
- ❌ "Invalid selection" (no solution)
- ❌ "Please select an option" (too formal)

Remember: Be helpful, conversational, and show why you're asking. The user should feel guided, not interrogated.
