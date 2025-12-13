# Textarea Component

## Overview

A multi-line text input component for collecting longer-form content from users such as messages, descriptions, feedback, or comments.

**When to use:**
- User needs to enter 2+ sentences
- Content requires formatting visibility (paragraphs, line breaks)
- Feedback forms, contact messages, descriptions, or comments
- Content that benefits from review while typing

**When NOT to use:**
- Single-line data entry (use Input component instead)
- Structured data that could use dropdown or radio buttons
- Very long documents (consider rich text editor)

---

## Anatomy

```
┌─────────────────────────────────────────────┐
│ Label *                                      │
│ ┌─────────────────────────────────────────┐ │
│ │ Placeholder text or user content...     │ │
│ │                                         │ │
│ │                                         │ │
│ │                                         │ │
│ │                                    150/500│ │
│ └─────────────────────────────────────────┘ │
│ Helper text (optional)                       │
│ Error message (when invalid)                 │
└─────────────────────────────────────────────┘

Components:
1. Label (required)
2. Textarea field
3. Character counter (optional)
4. Helper text (optional)
5. Error message (conditional)
6. Resize handle (bottom-right)
```

---

## Variants

| Variant | Use Case | Specifications |
|---------|----------|----------------|
| **Default** | Standard multi-line input | White background, 2px neutral-300 border, 96px min-height |
| **With Counter** | Limited character fields | Character count in bottom-right (e.g., "150/500 caracteres") |
| **Auto-grow** | Dynamic content length | Expands vertically as user types (max-height: 400px) |
| **Fixed Height** | Consistent layout needs | Disable resize, set specific height (e.g., 200px for feedback) |

---

## Sizes

| Property | Value | Token Reference |
|----------|-------|-----------------|
| **Min Height** | 96px | 6 × var(--space-4) |
| **Padding** | 12px 16px | var(--space-3) var(--space-4) |
| **Font Size** | 16px | var(--font-size-base) |
| **Line Height** | 1.5 | var(--line-height-normal) |
| **Border Width** | 2px | - |
| **Border Radius** | 6px | var(--radius-sm) |
| **Resize** | vertical | CSS: resize: vertical |

**Height recommendations:**
- **Short descriptions:** 96px (4-5 lines)
- **Messages/feedback:** 200px (12-13 lines)
- **Long content:** Auto-grow with 400px max-height

---

## States

### Default
```css
textarea {
  min-height: 96px;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
  resize: vertical;
  transition: border-color var(--duration-fast) var(--ease-easeOut);
}
```

### Hover
```css
textarea:hover {
  border-color: var(--color-neutral-400);
  cursor: text;
}
```

### Focus
```css
textarea:focus {
  border-color: var(--color-brand-primary);
  box-shadow: var(--shadow-focus);
  outline: none;
}
```

### Filled
```css
textarea:not(:placeholder-shown) {
  background: var(--color-support-cream-100);
}
```

### Error
```css
textarea[aria-invalid="true"] {
  border-color: var(--color-feedback-error);
  background: var(--color-feedback-errorBg);
}
```

### Disabled
```css
textarea:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-200);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
  resize: none;
}
```

---

## Props/API

```typescript
interface TextareaProps {
  /** Unique identifier for label association */
  id: string;

  /** Textarea name attribute */
  name: string;

  /** Label text (always visible) */
  label: string;

  /** Whether field is required */
  required?: boolean;

  /** Placeholder text (conversational, not a replacement for label) */
  placeholder?: string;

  /** Helper text shown below field */
  helperText?: string;

  /** Error message (shown when invalid) */
  errorMessage?: string;

  /** Whether textarea is invalid */
  invalid?: boolean;

  /** Whether textarea is disabled */
  disabled?: boolean;

  /** Whether textarea is read-only */
  readOnly?: boolean;

  /** Minimum height in pixels */
  minHeight?: number;

  /** Maximum height for auto-grow variant */
  maxHeight?: number;

  /** Maximum character count */
  maxLength?: number;

  /** Show character counter */
  showCounter?: boolean;

  /** Enable auto-grow behavior */
  autoGrow?: boolean;

  /** Current value */
  value?: string;

  /** Change handler */
  onChange?: (value: string) => void;

  /** Blur handler (for validation) */
  onBlur?: () => void;

  /** Number of visible text rows */
  rows?: number;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab:** Focus textarea
- **Shift + Tab:** Focus previous element
- **Esc:** Clear focus (browser default)
- **Ctrl/Cmd + A:** Select all text

### Screen Reader Support
```html
<label for="feedback-message">
  Conte mais sobre sua experiência *
</label>
<textarea
  id="feedback-message"
  name="feedback"
  aria-required="true"
  aria-describedby="feedback-helper feedback-counter"
  aria-invalid="false"
  rows="6"
></textarea>
<span id="feedback-helper" class="helper-text">
  Quanto mais detalhes, melhor conseguimos ajudar você
</span>
<span id="feedback-counter" class="character-count" aria-live="polite">
  0/500 caracteres
</span>
```

### ARIA Attributes
- `aria-required="true"` - For required fields
- `aria-invalid="true"` - When validation fails
- `aria-describedby` - Links to helper text, counter, and error messages
- `aria-live="polite"` - Character counter updates announce to screen readers

### WCAG Compliance
- **Minimum height:** 96px provides adequate touch target (WCAG 2.5.5)
- **Font size:** 16px minimum prevents iOS zoom on focus
- **Color contrast:** 4.5:1 for all text (WCAG AA)
- **Focus indicator:** 3px outline with 20% opacity brand color
- **Resize control:** Vertical only to prevent layout breaks

---

## Character Counter

### Position and Style
```css
.character-count {
  position: absolute;
  bottom: var(--space-2);
  right: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  pointer-events: none;
}
```

### Warning Threshold (90%)
```css
.character-count.warning {
  color: var(--color-accent-700);
  font-weight: var(--font-weight-medium);
}
```

### Error Threshold (100%)
```css
.character-count.error {
  color: var(--color-feedback-error);
  font-weight: var(--font-weight-semibold);
}
```

### Format
- **Portuguese:** "150/500 caracteres"
- **At limit:** "500/500 caracteres" (in error color)
- **Over limit:** Prevent input or show "505/500 caracteres" in red

---

## Usage Guidelines

### Do's

✅ **Show character count for limited fields**
- Helps users self-correct before submission
- Example: "150/500 caracteres" in bottom-right corner

✅ **Set appropriate min-height based on expected content**
- 96px (6 lines) for short descriptions
- 200px (12 lines) for feedback or messages
- Auto-grow for variable-length content

✅ **Allow vertical resize**
- Users can adjust to their comfort level
- Provides flexibility without breaking layout

✅ **Use conversational placeholder text**
- "Conte mais sobre sua experiência com nosso atendimento..."
- "Descreva o que você está buscando alcançar..."

✅ **Validate on blur, not while typing**
- Less aggressive, better user experience
- Allows users to finish their thought

✅ **Preserve content on validation errors**
- Never reset textarea on error
- Incredibly frustrating to re-enter long text

### Don'ts

❌ **Don't allow horizontal resize**
- Breaks responsive layouts
- CSS: `resize: vertical` only

❌ **Don't use for single-line input**
- Regular Input component is more appropriate
- Textarea signals multi-line expectation

❌ **Don't set max-height below 300px if resizable**
- Defeats purpose of resize functionality
- Use fixed height or adequate max

❌ **Don't use placeholder as only label**
- Disappears when typing
- Bad for accessibility and memory

❌ **Don't validate while user is typing**
- Feels aggressive and interrupts thought
- Show errors on blur or submit

❌ **Don't auto-advance or auto-submit**
- User should control form progression
- Unexpected behavior causes errors

---

## Code Examples

### Basic Textarea

```html
<div class="form-field">
  <label for="message" class="form-label">
    Sua mensagem *
  </label>
  <textarea
    id="message"
    name="message"
    class="textarea"
    rows="6"
    required
    aria-required="true"
    placeholder="Conte mais sobre o que você precisa..."
  ></textarea>
  <span class="helper-text">
    Quanto mais detalhes, melhor conseguimos entender sua necessidade
  </span>
</div>
```

### With Character Counter

```html
<div class="form-field">
  <label for="feedback" class="form-label">
    Feedback sobre nosso atendimento *
  </label>
  <div class="textarea-wrapper">
    <textarea
      id="feedback"
      name="feedback"
      class="textarea"
      rows="8"
      maxlength="500"
      required
      aria-required="true"
      aria-describedby="feedback-helper feedback-counter"
    ></textarea>
    <span id="feedback-counter" class="character-count" aria-live="polite">
      0/500 caracteres
    </span>
  </div>
  <span id="feedback-helper" class="helper-text">
    Sua opinião nos ajuda a melhorar continuamente
  </span>
</div>
```

### Error State

```html
<div class="form-field form-field--error">
  <label for="description" class="form-label">
    Descrição do problema *
  </label>
  <textarea
    id="description"
    name="description"
    class="textarea textarea--error"
    rows="6"
    required
    aria-required="true"
    aria-invalid="true"
    aria-describedby="description-error"
  ></textarea>
  <span id="description-error" class="error-message" role="alert">
    Ops! A descrição precisa ter pelo menos 20 caracteres pra gente entender melhor
  </span>
</div>
```

### CSS Implementation

```css
.textarea {
  min-height: 96px;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  font-family: inherit;
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  resize: vertical;
  transition: all var(--duration-fast) var(--ease-easeOut);
}

.textarea::placeholder {
  color: var(--color-text-tertiary);
  font-style: italic;
}

.textarea:hover {
  border-color: var(--color-neutral-400);
}

.textarea:focus {
  border-color: var(--color-brand-primary);
  box-shadow: var(--shadow-focus);
  outline: none;
}

.textarea:not(:placeholder-shown) {
  background: var(--color-support-cream-100);
}

.textarea--error {
  border-color: var(--color-feedback-error);
  background: var(--color-feedback-errorBg);
}

.textarea:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-200);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
  resize: none;
}

/* Character Counter */
.textarea-wrapper {
  position: relative;
}

.character-count {
  position: absolute;
  bottom: var(--space-2);
  right: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  pointer-events: none;
  background: var(--color-white);
  padding: var(--space-1);
  border-radius: var(--radius-sm);
}

.character-count.warning {
  color: var(--color-accent-700);
  font-weight: var(--font-weight-medium);
}

.character-count.error {
  color: var(--color-feedback-error);
  font-weight: var(--font-weight-semibold);
}
```

### JavaScript for Auto-grow

```javascript
const textarea = document.querySelector('.textarea--auto-grow');

textarea.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 400) + 'px';
});

// Character counter
const counter = document.querySelector('.character-count');
const maxLength = textarea.getAttribute('maxlength');

textarea.addEventListener('input', function() {
  const current = this.value.length;
  const max = parseInt(maxLength);
  const percentage = (current / max) * 100;

  counter.textContent = `${current}/${max} caracteres`;

  // Warning at 90%
  if (percentage >= 90 && percentage < 100) {
    counter.classList.add('warning');
    counter.classList.remove('error');
  }
  // Error at 100%
  else if (percentage >= 100) {
    counter.classList.add('error');
    counter.classList.remove('warning');
  }
  // Normal state
  else {
    counter.classList.remove('warning', 'error');
  }
});
```

---

## Related Components

- **[Input](./input.md)** - For single-line text entry
- **[Form Field](./form-field.md)** - Wrapper component with label, helper, and error
- **[Select](./select.md)** - For choosing from predefined options
- **[Form](./form.md)** - Complete form layout and validation patterns

---

## Brand Voice in Error Messages

Following Oitavo Café's conversational, empathetic tone:

**Good examples:**
- "Ops! Precisamos de mais detalhes pra entender melhor. Que tal escrever mais umas 2 linhas?"
- "Quase lá! Faltam só 15 caracteres pra você enviar sua mensagem"
- "Seu feedback é importante! Conta mais sobre sua experiência?"

**Bad examples:**
- ❌ "Invalid input" (too technical, not helpful)
- ❌ "Field is required" (cold, not conversational)
- ❌ "Minimum 20 characters" (no empathy, no solution)

Remember: Error messages should help, not blame. Be a helpful friend, not a strict teacher.
