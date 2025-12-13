# Slider Component (Range Input)

## Overview

A range input control that allows users to select a numeric value or range by dragging a handle along a track. Ideal for adjusting settings where the relative value matters more than precision.

**When to use:**
- Selecting from a continuous range of values (volume, brightness, price range)
- Adjusting settings where approximate value is acceptable
- Budget or pricing filters (e.g., R$ 1k - R$ 50k)
- Relative adjustments (font size, spacing, opacity)
- When visual feedback enhances understanding

**When NOT to use:**
- Precise numeric entry required (use number input instead)
- Few discrete options (use radio buttons or select)
- Binary choices (use switch or checkbox)
- Very large ranges where precision matters (use input with increment buttons)

---

## Anatomy

```
Single Value Slider:
┌─────────────────────────────────────────────┐
│ Label text           Current Value: R$ 5.000│
│ ──────●────────────────────────────────────│
│ Min                                     Max │
│ R$ 0                                R$ 10.000│
│ Helper text (optional)                       │
└─────────────────────────────────────────────┘

Range Slider (Two Handles):
┌─────────────────────────────────────────────┐
│ Orçamento mensal      R$ 3.000 - R$ 8.000   │
│ ─────●──────────────●──────────────────────│
│ R$ 0                                R$ 10.000│
└─────────────────────────────────────────────┘

With Steps/Ticks:
┌─────────────────────────────────────────────┐
│ Faturamento mensal                  R$ 50.000│
│ ──────────────●────────────────────────────│
│ │     │     │     │     │     │     │      │
│ 0    10k   25k   50k  100k  250k  500k     │
└─────────────────────────────────────────────┘

Components:
1. Label (required)
2. Current value display
3. Track (full width)
4. Filled track (shows selected range)
5. Thumb/handle (draggable)
6. Min/max labels
7. Step indicators (optional)
8. Helper text (optional)
```

---

## Variants

| Variant | Use Case | Specifications |
|---------|----------|----------------|
| **Single Value** | Select one value from range | One thumb, track fills from min to value |
| **Range** | Select min and max values | Two thumbs, track fills between values |
| **Stepped** | Discrete values only | Snaps to defined steps, shows tick marks |
| **With Input** | Precise adjustment option | Slider + linked number input field |

---

## Sizes

| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Track Height** | 4px | - |
| **Track Border Radius** | 2px | - |
| **Thumb Size** | 20px diameter | - |
| **Thumb Border Width** | 2px | - |
| **Touch Target** | 44×44px (with padding) | WCAG 2.5.5 AAA |
| **Track Color** | neutral-200 | var(--color-neutral-200) |
| **Filled Track Color** | brand-primary | var(--color-brand-primary) |
| **Thumb Color** | white | var(--color-white) |
| **Thumb Border** | brand-primary | var(--color-brand-primary) |
| **Label Font Size** | 14px | var(--font-size-sm) |
| **Value Font Size** | 16px | var(--font-size-base) |
| **Min/Max Font Size** | 13px | var(--font-size-sm) |

---

## States

### Default
```css
.slider-track {
  position: relative;
  width: 100%;
  height: 4px;
  background: var(--color-neutral-200);
  border-radius: 2px;
  cursor: pointer;
}

.slider-track-filled {
  position: absolute;
  height: 100%;
  background: var(--color-brand-primary);
  border-radius: 2px;
  transition: width var(--duration-fast) var(--ease-easeOut);
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: var(--color-white);
  border: 2px solid var(--color-brand-primary);
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: grab;
  transition: all var(--duration-fast) var(--ease-easeOut);
}
```

### Hover
```css
.slider-thumb:hover {
  transform: translate(-50%, -50%) scale(1.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.slider-track:hover .slider-thumb {
  border-width: 3px;
}
```

### Active/Dragging
```css
.slider-thumb:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: var(--shadow-focus);
}
```

### Focus
```css
.slider-input:focus + .slider-thumb {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}
```

### Disabled
```css
.slider--disabled .slider-track {
  background: var(--color-neutral-100);
  cursor: not-allowed;
}

.slider--disabled .slider-track-filled {
  background: var(--color-neutral-300);
}

.slider--disabled .slider-thumb {
  background: var(--color-neutral-200);
  border-color: var(--color-neutral-400);
  cursor: not-allowed;
  box-shadow: none;
}
```

### With Ticks/Steps
```css
.slider-ticks {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-2);
}

.slider-tick {
  width: 2px;
  height: 8px;
  background: var(--color-neutral-300);
  border-radius: 1px;
}

.slider-tick.active {
  background: var(--color-brand-primary);
}

.slider-tick-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
  margin-top: var(--space-1);
}
```

---

## Props/API

```typescript
interface SliderProps {
  /** Unique identifier */
  id: string;

  /** Slider name attribute */
  name: string;

  /** Label text */
  label: string;

  /** Minimum value */
  min: number;

  /** Maximum value */
  max: number;

  /** Step increment (default: 1) */
  step?: number;

  /** Current value (single slider) */
  value?: number;

  /** Current range values (range slider) */
  rangeValue?: [number, number];

  /** Whether this is a range slider */
  isRange?: boolean;

  /** Whether slider is disabled */
  disabled?: boolean;

  /** Helper text */
  helperText?: string;

  /** Show current value */
  showValue?: boolean;

  /** Show min/max labels */
  showMinMax?: boolean;

  /** Show step ticks */
  showTicks?: boolean;

  /** Custom tick labels */
  tickLabels?: string[];

  /** Value formatter (e.g., currency, percentage) */
  formatValue?: (value: number) => string;

  /** Change handler */
  onChange?: (value: number | [number, number]) => void;

  /** ARIA attributes */
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab:** Focus slider
- **Shift + Tab:** Focus previous element
- **Arrow Left/Down:** Decrease value by step
- **Arrow Right/Up:** Increase value by step
- **Home:** Jump to minimum value
- **End:** Jump to maximum value
- **Page Down:** Decrease by larger increment (10% of range)
- **Page Up:** Increase by larger increment (10% of range)

### Screen Reader Support

#### Single Value Slider
```html
<div class="slider-field">
  <label id="budget-label" for="budget-slider" class="slider-label">
    Orçamento mensal
  </label>

  <div class="slider-value" aria-live="polite" aria-atomic="true">
    R$ 5.000
  </div>

  <input
    type="range"
    id="budget-slider"
    name="budget"
    min="0"
    max="10000"
    step="500"
    value="5000"
    class="slider-input"
    aria-labelledby="budget-label"
    aria-valuemin="0"
    aria-valuemax="10000"
    aria-valuenow="5000"
    aria-valuetext="5 mil reais"
  />

  <div class="slider-minmax">
    <span>R$ 0</span>
    <span>R$ 10.000</span>
  </div>
</div>
```

#### Range Slider
```html
<div class="slider-field">
  <label id="price-range-label" class="slider-label">
    Faixa de preço
  </label>

  <div class="slider-value" aria-live="polite">
    R$ 3.000 - R$ 8.000
  </div>

  <div class="slider-track-wrapper">
    <input
      type="range"
      id="price-min"
      name="priceMin"
      min="0"
      max="10000"
      step="500"
      value="3000"
      aria-labelledby="price-range-label"
      aria-label="Preço mínimo"
      aria-valuemin="0"
      aria-valuemax="10000"
      aria-valuenow="3000"
    />
    <input
      type="range"
      id="price-max"
      name="priceMax"
      min="0"
      max="10000"
      step="500"
      value="8000"
      aria-labelledby="price-range-label"
      aria-label="Preço máximo"
      aria-valuemin="0"
      aria-valuemax="10000"
      aria-valuenow="8000"
    />
  </div>
</div>
```

### ARIA Attributes
- `role="slider"` - Native range input provides this
- `aria-valuemin` - Minimum value
- `aria-valuemax` - Maximum value
- `aria-valuenow` - Current value
- `aria-valuetext` - Human-readable value (e.g., "5 mil reais")
- `aria-labelledby` - Links to label
- `aria-live="polite"` - Announces value changes

### WCAG Compliance
- **Touch target:** 44×44px for thumb (WCAG 2.5.5 AAA)
- **Keyboard accessible:** All arrow keys work
- **Visual feedback:** Clear focus and active states
- **Value display:** Show current value visually
- **Color independence:** Don't rely on color alone
- **Motion:** Respect prefers-reduced-motion

---

## Usage Guidelines

### Do's

✅ **Show current value clearly**
- Display value above or beside slider
- Update in real-time as user drags
- Format appropriately (currency, percentage, etc.)

✅ **Provide min/max labels**
- Shows the range at a glance
- Helps users understand context
- Format consistently with value

✅ **Use appropriate step increments**
- Match to user's mental model
- Budget: R$ 500 or R$ 1.000 steps
- Percentage: 5% or 10% steps
- Don't use too small steps (hard to control)

✅ **Format values for readability**
- Currency: "R$ 5.000" not "5000"
- Large numbers: "50k" not "50000"
- Percentages: "75%" not "0.75"

✅ **Consider linked number input**
- For precise adjustment option
- Slider for quick/approximate
- Input for exact values

✅ **Use for relative/approximate values**
- "More/less" matters more than exact number
- Visual feedback enhances understanding
- Example: Font size, zoom level, budget ranges

### Don'ts

❌ **Don't use for precise data entry**
- Hard to hit exact value with slider
- Use number input instead
- Slider is for approximate selection

❌ **Don't use for very large ranges**
- 0-1000000 too hard to control
- Break into categories or use input
- Consider if slider is right pattern

❌ **Don't hide current value**
- User needs to see what they selected
- Show value in real-time
- Format for easy comprehension

❌ **Don't make steps too small**
- Tiny increments are hard to control
- User may struggle to select value
- Match steps to use case

❌ **Don't use for few discrete options**
- 2-5 options? Use radio buttons
- Slider implies continuous range
- Radio shows all options at once

❌ **Don't rely on color alone**
- Filled track helps but isn't enough
- Show numeric value
- Provide text labels

---

## Code Examples

### Basic Single Value Slider

```html
<div class="slider-field">
  <div class="slider-header">
    <label for="budget" class="slider-label">
      Orçamento mensal
    </label>
    <span class="slider-value" id="budget-value" aria-live="polite">
      R$ 5.000
    </span>
  </div>

  <div class="slider-wrapper">
    <input
      type="range"
      id="budget"
      name="budget"
      min="0"
      max="10000"
      step="500"
      value="5000"
      class="slider-input"
      aria-describedby="budget-helper"
      aria-valuetext="5 mil reais"
    />
  </div>

  <div class="slider-minmax">
    <span class="slider-min">R$ 0</span>
    <span class="slider-max">R$ 10.000</span>
  </div>

  <span id="budget-helper" class="helper-text">
    Ajuste conforme o que faz sentido pro seu negócio
  </span>
</div>
```

### Range Slider (Price Filter)

```html
<div class="slider-field">
  <div class="slider-header">
    <label class="slider-label">
      Faixa de investimento
    </label>
    <span class="slider-value" aria-live="polite">
      R$ 3.000 - R$ 8.000
    </span>
  </div>

  <div class="slider-wrapper slider-wrapper--range">
    <div class="slider-track">
      <div class="slider-track-filled" style="left: 30%; width: 50%;"></div>
    </div>

    <input
      type="range"
      id="price-min"
      name="priceMin"
      min="0"
      max="10000"
      step="500"
      value="3000"
      class="slider-input slider-input--min"
      aria-label="Investimento mínimo"
    />

    <input
      type="range"
      id="price-max"
      name="priceMax"
      min="0"
      max="10000"
      step="500"
      value="8000"
      class="slider-input slider-input--max"
      aria-label="Investimento máximo"
    />
  </div>

  <div class="slider-minmax">
    <span>R$ 0</span>
    <span>R$ 10.000</span>
  </div>
</div>
```

### Slider with Steps/Ticks

```html
<div class="slider-field">
  <div class="slider-header">
    <label for="revenue" class="slider-label">
      Faturamento mensal
    </label>
    <span class="slider-value">R$ 50.000</span>
  </div>

  <div class="slider-wrapper">
    <input
      type="range"
      id="revenue"
      name="revenue"
      min="0"
      max="6"
      step="1"
      value="3"
      class="slider-input"
      list="revenue-ticks"
    />
  </div>

  <datalist id="revenue-ticks" class="slider-ticks">
    <option value="0" label="R$ 0"></option>
    <option value="1" label="R$ 10k"></option>
    <option value="2" label="R$ 25k"></option>
    <option value="3" label="R$ 50k"></option>
    <option value="4" label="R$ 100k"></option>
    <option value="5" label="R$ 250k"></option>
    <option value="6" label="R$ 500k+"></option>
  </datalist>

  <div class="slider-tick-labels">
    <span>R$ 0</span>
    <span>10k</span>
    <span>25k</span>
    <span>50k</span>
    <span>100k</span>
    <span>250k</span>
    <span>500k+</span>
  </div>
</div>
```

### Slider with Linked Input

```html
<div class="slider-field">
  <label for="team-size" class="slider-label">
    Tamanho da equipe
  </label>

  <div class="slider-with-input">
    <div class="slider-wrapper">
      <input
        type="range"
        id="team-size"
        name="teamSize"
        min="1"
        max="50"
        step="1"
        value="10"
        class="slider-input"
      />
    </div>

    <input
      type="number"
      id="team-size-input"
      name="teamSizeInput"
      min="1"
      max="50"
      value="10"
      class="slider-number-input"
    />
  </div>

  <div class="slider-minmax">
    <span>1 pessoa</span>
    <span>50+ pessoas</span>
  </div>
</div>
```

### CSS Implementation

```css
/* Slider Field */
.slider-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

/* Header with Label and Value */
.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.slider-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.slider-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-brand-primary);
}

/* Slider Wrapper */
.slider-wrapper {
  position: relative;
  padding: var(--space-3) 0;
}

/* Hide default range input styling */
.slider-input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: transparent;
  outline: none;
  cursor: pointer;
}

/* Track */
.slider-input::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: var(--color-neutral-200);
  border-radius: 2px;
}

.slider-input::-moz-range-track {
  width: 100%;
  height: 4px;
  background: var(--color-neutral-200);
  border-radius: 2px;
}

/* Filled Track (WebKit) */
.slider-input::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    var(--color-brand-primary) 0%,
    var(--color-brand-primary) var(--slider-progress, 50%),
    var(--color-neutral-200) var(--slider-progress, 50%),
    var(--color-neutral-200) 100%
  );
}

/* Thumb */
.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--color-white);
  border: 2px solid var(--color-brand-primary);
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: grab;
  margin-top: -8px;
  transition: all var(--duration-fast) var(--ease-easeOut);
}

.slider-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--color-white);
  border: 2px solid var(--color-brand-primary);
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: grab;
  transition: all var(--duration-fast) var(--ease-easeOut);
}

/* Hover */
.slider-input:hover::-webkit-slider-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.slider-input:hover::-moz-range-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

/* Active/Dragging */
.slider-input:active::-webkit-slider-thumb {
  cursor: grabbing;
  transform: scale(1.2);
  box-shadow: var(--shadow-focus);
}

.slider-input:active::-moz-range-thumb {
  cursor: grabbing;
  transform: scale(1.2);
  box-shadow: var(--shadow-focus);
}

/* Focus */
.slider-input:focus::-webkit-slider-thumb {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}

.slider-input:focus::-moz-range-thumb {
  outline: 3px solid var(--color-primary-200);
  outline-offset: 2px;
}

/* Disabled */
.slider-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.slider-input:disabled::-webkit-slider-thumb {
  background: var(--color-neutral-200);
  border-color: var(--color-neutral-400);
  cursor: not-allowed;
}

.slider-input:disabled::-moz-range-thumb {
  background: var(--color-neutral-200);
  border-color: var(--color-neutral-400);
  cursor: not-allowed;
}

/* Min/Max Labels */
.slider-minmax {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

/* Tick Labels */
.slider-tick-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-2);
}

/* Slider with Input */
.slider-with-input {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}

.slider-with-input .slider-wrapper {
  flex: 1;
}

.slider-number-input {
  width: 80px;
  padding: var(--space-2) var(--space-3);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  text-align: center;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .slider-input::-webkit-slider-thumb,
  .slider-input::-moz-range-thumb {
    transition: none;
  }
}
```

### JavaScript Implementation

```javascript
class Slider {
  constructor(element) {
    this.input = element;
    this.field = element.closest('.slider-field');
    this.valueDisplay = this.field.querySelector('.slider-value');
    this.min = parseFloat(this.input.min);
    this.max = parseFloat(this.input.max);

    this.init();
  }

  init() {
    this.updateValue();
    this.updateProgress();

    this.input.addEventListener('input', () => {
      this.updateValue();
      this.updateProgress();
    });
  }

  updateValue() {
    const value = parseFloat(this.input.value);
    const formatted = this.formatValue(value);

    if (this.valueDisplay) {
      this.valueDisplay.textContent = formatted;
    }

    // Update ARIA
    this.input.setAttribute('aria-valuenow', value);
    this.input.setAttribute('aria-valuetext', formatted);
  }

  updateProgress() {
    const value = parseFloat(this.input.value);
    const percent = ((value - this.min) / (this.max - this.min)) * 100;
    this.input.style.setProperty('--slider-progress', `${percent}%`);
  }

  formatValue(value) {
    // Customize formatting based on data type
    if (this.input.dataset.format === 'currency') {
      return `R$ ${value.toLocaleString('pt-BR')}`;
    }
    if (this.input.dataset.format === 'percentage') {
      return `${value}%`;
    }
    return value.toString();
  }
}

// Range Slider (Two handles)
class RangeSlider {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.minInput = wrapper.querySelector('.slider-input--min');
    this.maxInput = wrapper.querySelector('.slider-input--max');
    this.track = wrapper.querySelector('.slider-track-filled');
    this.valueDisplay = wrapper.closest('.slider-field').querySelector('.slider-value');
    this.min = parseFloat(this.minInput.min);
    this.max = parseFloat(this.maxInput.max);

    this.init();
  }

  init() {
    this.update();

    this.minInput.addEventListener('input', () => {
      if (parseFloat(this.minInput.value) > parseFloat(this.maxInput.value)) {
        this.minInput.value = this.maxInput.value;
      }
      this.update();
    });

    this.maxInput.addEventListener('input', () => {
      if (parseFloat(this.maxInput.value) < parseFloat(this.minInput.value)) {
        this.maxInput.value = this.minInput.value;
      }
      this.update();
    });
  }

  update() {
    const minValue = parseFloat(this.minInput.value);
    const maxValue = parseFloat(this.maxInput.value);

    const minPercent = ((minValue - this.min) / (this.max - this.min)) * 100;
    const maxPercent = ((maxValue - this.min) / (this.max - this.min)) * 100;

    this.track.style.left = `${minPercent}%`;
    this.track.style.width = `${maxPercent - minPercent}%`;

    if (this.valueDisplay) {
      this.valueDisplay.textContent =
        `R$ ${minValue.toLocaleString('pt-BR')} - R$ ${maxValue.toLocaleString('pt-BR')}`;
    }
  }
}

// Initialize sliders
document.querySelectorAll('.slider-input:not(.slider-input--min):not(.slider-input--max)').forEach(input => {
  new Slider(input);
});

document.querySelectorAll('.slider-wrapper--range').forEach(wrapper => {
  new RangeSlider(wrapper);
});
```

---

## Related Components

- **[Input](./input.md)** - For precise numeric entry
- **[Radio](./radio.md)** - For few discrete options
- **[Form Field](./form-field.md)** - Wrapper with label and helper
- **[Switch](./switch.md)** - For binary on/off toggles

---

## Brand Voice in Labels

Following Oitavo Café's conversational, helpful tone:

### Good Label Examples
- "Orçamento mensal"
- "Qual seu faturamento atual?"
- "Faixa de investimento"
- "Tamanho da sua equipe"

### Good Helper Text Examples
- "Ajuste conforme o que faz sentido pro seu negócio"
- "Quanto você pode investir confortavelmente por mês"
- "Aproximado tá bom - não precisa ser exato"

### Good Value Formatting
- "R$ 5.000" (not "5000")
- "R$ 50k - R$ 100k" (for ranges)
- "10 pessoas" (include unit)
- "75%" (for percentages)

### Bad Examples
- ❌ "Set range" (English, vague)
- ❌ "5000" (not formatted)
- ❌ "Adjust slider" (too obvious)
- ❌ "Select value" (not conversational)

Remember: Slider values should be formatted for easy comprehension. Show what the numbers mean in real terms. "R$ 5.000/mês" is clearer than "5000".
