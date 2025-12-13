# Textarea Component

**Component Type:** Form Control
**Category:** Forms
**Status:** Core Component
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

The Textarea component is a multi-line text input field for longer responses and detailed information capture. Designed with Carolina in mind - busy entrepreneurs who need clarity on what to write and why.

**Primary Use Cases:**
- Lead qualification questions
- Business challenge descriptions
- Open-ended feedback
- Message composition

**Key Principle:** Guide Carolina on what level of detail you need. Don't just say "Tell us about your business" - say "Conta pra gente em 2-3 linhas: qual seu maior desafio em vendas hoje?"

---

## Anatomy

```
┌─ Label (conversational with guidance) ──────────┐
│ Qual seu maior desafio em vendas hoje?          │
└──────────────────────────────────────────────────┘
┌─ Textarea Field ─────────────────────────────────┐
│ Invisto em marketing mas não sei o retorno...    │
│                                                   │
│                                                   │
│                                                   │
│                                               120 │ ← Character counter
└───────────────────────────────────────────────────┘
┌─ Helper Text ────────────────────────────────────┐
│ (2-3 linhas tá ótimo - ajuda a gente entender)   │
└───────────────────────────────────────────────────┘
```

**Elements:**
1. **Label** - Conversational prompt with context
2. **Textarea Field** - Expandable text area
3. **Helper Text** - Guidance on length and content
4. **Character Counter** - Shows remaining/used characters
5. **Resize Handle** - Visual indicator of resizability
6. **Error/Success Message** - Validation feedback

---

## Variants

### 1. Auto-grow
Textarea expands as user types, up to a maximum height.

**When to use:** Better UX for unknown content length.

### 2. Fixed Height
Textarea maintains constant height with scrolling.

**When to use:** Consistent form layouts, known content length.

### 3. Resizable
User can manually resize the textarea.

**When to use:** Desktop-first experiences where user control is valued.

---

## States

### Default
```css
Textarea {
  font-size: var(--font-size-base); /* 16px */
  padding: var(--space-3) var(--space-4); /* 12px 16px */
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm); /* 4px */
  color: var(--text-primary);
  background: var(--input-bg);
  min-height: 120px; /* ~5 lines */
  line-height: 1.5;
  resize: vertical; /* Allow vertical resize only */
}

Label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

HelperText {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--space-2);
}
```

### Hover
```css
Textarea:hover {
  border-color: var(--neutral-400);
  cursor: text;
}
```

### Focus
```css
Textarea:focus {
  border-color: var(--color-brand-primary); /* #75201C */
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}
```

### Filled (Has Value)
```css
Textarea:not(:placeholder-shown) {
  border-color: var(--neutral-400);
}
```

### Error
```css
Textarea[aria-invalid="true"] {
  border-color: var(--color-feedback-error);
}

ErrorMessage {
  color: var(--color-feedback-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-2);
  display: flex;
  align-items: flex-start;
  gap: var(--space-1);
}
```

### Success
```css
Textarea[aria-invalid="false"].validated {
  border-color: var(--color-feedback-success);
}
```

### Disabled
```css
Textarea:disabled {
  background: var(--neutral-100);
  border-color: var(--neutral-200);
  color: var(--text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
  resize: none;
}
```

### Read-only
```css
Textarea[readonly] {
  background: var(--neutral-50);
  border-color: var(--neutral-200);
  cursor: default;
  resize: none;
}
```

---

## Props/API

```typescript
interface TextareaProps {
  // Required
  id: string;
  name: string;
  label: string;

  // Content
  value?: string;
  placeholder?: string;
  defaultValue?: string;

  // State
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;

  // Validation
  error?: string | boolean;
  success?: string | boolean;
  minLength?: number;
  maxLength?: number;

  // Help text
  helperText?: string;

  // Sizing
  rows?: number; // Default visible rows
  minRows?: number; // For auto-grow
  maxRows?: number; // For auto-grow
  cols?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';

  // Character counter
  showCounter?: boolean;
  counterPosition?: 'bottom-right' | 'bottom-left' | 'top-right';

  // Auto-grow
  autoGrow?: boolean;

  // Callbacks
  onChange?: (value: string) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab** - Move focus to textarea
- **Shift + Tab** - Move focus away
- **Arrow keys** - Navigate within text
- **Enter** - New line (not form submission)
- **Ctrl/Cmd + Enter** - Submit form (optional feature)

### Screen Reader Support
```html
<div class="textarea-group">
  <label for="challenge" id="challenge-label">
    Qual seu maior desafio em vendas hoje?
  </label>

  <textarea
    id="challenge"
    name="challenge"
    rows="5"
    maxlength="500"
    aria-labelledby="challenge-label"
    aria-describedby="challenge-helper challenge-counter"
    aria-invalid="false"
    aria-required="true"
  ></textarea>

  <div class="textarea-footer">
    <p id="challenge-helper" class="helper-text">
      (2-3 linhas tá ótimo - ajuda a gente entender)
    </p>
    <p id="challenge-counter" class="character-counter" aria-live="polite">
      <span class="current">0</span> / <span class="max">500</span>
    </p>
  </div>
</div>
```

### ARIA Attributes
- `aria-label` or `aria-labelledby` - Required
- `aria-describedby` - Links helper text and counter
- `aria-invalid` - `true` when validation fails
- `aria-required` - `true` for required fields
- `aria-live="polite"` - On character counter for updates
- `role="alert"` - On error messages

### Focus Management
- Clear focus ring with brand color
- Focus visible indicator required
- No removal of outline

### Color Independence
- Icons + text for error/success states
- Don't rely solely on border color changes

---

## Do / Don't

### Label Microcopy

**DO:**
- "Qual seu maior desafio em vendas hoje?" ✓
- "Conta um pouco sobre seu negócio" ✓
- "O que você já tentou pra resolver isso?" ✓
- Provide clear guidance on what to write

**DON'T:**
- "Description" ✗ (too vague)
- "Enter details here" ✗ (commanding)
- "Comments" ✗ (doesn't guide what to say)
- Leave it too open-ended without context

### Helper Text

**DO:**
- "(2-3 linhas tá ótimo - ajuda a gente entender)" ✓
- "(pode ser breve - tipo: faturamento, número de funcionários, setor)" ✓
- "(sem pressão - a gente vai conversar depois sobre isso)" ✓
- Guide on length AND content expectations

**DON'T:**
- "Please provide details" ✗ (doesn't specify)
- "Maximum 500 characters" ✗ (just use counter)
- "" (empty when guidance would help)

### Error Messages

**DO:**
- "Ops, parece que ficou um pouco curto. Consegue dar mais uns detalhes?" ✓
- "Passou um pouquinho do limite. Consegue resumir?" ✓
- "Esse campo é importante pra gente te entender melhor" ✓
- Use empathy and be specific

**DON'T:**
- "Text too short" ✗ (robotic)
- "Maximum length exceeded" ✗ (system message)
- "Field required" ✗ (obvious and cold)

### Success Messages

**DO:**
- "Pronto! Isso ajuda muito." ✓
- "Perfeito! A gente entendeu." ✓
- Use sparingly - usually for final form submission

**DON'T:**
- Overuse for every textarea ✗
- "Validation successful" ✗ (system language)

### Length Guidance

**DO:**
- Provide character/word count when there's a limit ✓
- Suggest ideal length: "2-3 linhas" ✓
- Show remaining count as user approaches limit ✓

**DON'T:**
- Set arbitrary low limits that frustrate users ✗
- Hide counter until limit is near ✗
- Use technical character counts without context ✗

---

## Code Examples

### Basic Textarea

```html
<div class="textarea-group">
  <label for="challenge" class="textarea-label">
    Qual seu maior desafio em vendas hoje?
  </label>

  <textarea
    id="challenge"
    name="challenge"
    class="textarea"
    rows="5"
    placeholder="Conta pra gente o que tá travando suas vendas..."
    aria-describedby="challenge-helper"
    required
  ></textarea>

  <p id="challenge-helper" class="helper-text">
    (2-3 linhas tá ótimo - ajuda a gente entender)
  </p>
</div>
```

### Textarea with Character Counter

```html
<div class="textarea-group">
  <label for="about-business" class="textarea-label">
    Conta um pouco sobre seu negócio
  </label>

  <textarea
    id="about-business"
    name="about-business"
    class="textarea"
    rows="5"
    maxlength="500"
    aria-describedby="about-helper about-counter"
  ></textarea>

  <div class="textarea-footer">
    <p id="about-helper" class="helper-text">
      (tipo: faturamento, funcionários, setor)
    </p>
    <p id="about-counter" class="character-counter" aria-live="polite">
      <span class="current">0</span> / <span class="max">500</span>
    </p>
  </div>
</div>
```

### Textarea with Error

```html
<div class="textarea-group">
  <label for="challenge" class="textarea-label">
    Qual seu maior desafio em vendas hoje?
  </label>

  <textarea
    id="challenge"
    name="challenge"
    class="textarea textarea--error"
    rows="5"
    aria-describedby="challenge-helper challenge-error"
    aria-invalid="true"
    required
  >Não sei</textarea>

  <p id="challenge-helper" class="helper-text">
    (2-3 linhas tá ótimo - ajuda a gente entender)
  </p>

  <p id="challenge-error" class="error-message" role="alert">
    Ops, parece que ficou um pouco curto. Consegue dar mais uns detalhes?
  </p>
</div>
```

### Auto-growing Textarea

```html
<div class="textarea-group">
  <label for="message" class="textarea-label">
    Quer adicionar algo mais?
  </label>

  <textarea
    id="message"
    name="message"
    class="textarea textarea--auto-grow"
    rows="3"
    data-min-rows="3"
    data-max-rows="10"
    aria-describedby="message-helper"
  ></textarea>

  <p id="message-helper" class="helper-text">
    (opcional - mas adoramos ouvir)
  </p>
</div>
```

### React Component Example

```tsx
import React, { useState, useRef, useEffect } from 'react';

interface TextareaProps {
  label: string;
  name: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  showCounter?: boolean;
  autoGrow?: boolean;
  minRows?: number;
  maxRows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  helperText,
  error,
  required = false,
  placeholder,
  maxLength,
  showCounter = false,
  autoGrow = false,
  minRows = 5,
  maxRows = 10,
}) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasError = !!error;
  const helperId = `${name}-helper`;
  const errorId = `${name}-error`;
  const counterId = `${name}-counter`;

  // Auto-grow functionality
  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value, autoGrow, minRows, maxRows]);

  const characterCount = value.length;
  const charactersRemaining = maxLength ? maxLength - characterCount : null;

  return (
    <div className="textarea-group">
      <label htmlFor={name} className="textarea-label">
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>

      <textarea
        ref={textareaRef}
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`textarea ${hasError ? 'textarea--error' : ''} ${autoGrow ? 'textarea--auto-grow' : ''}`}
        placeholder={placeholder}
        rows={minRows}
        maxLength={maxLength}
        aria-describedby={`${helperText ? helperId : ''} ${showCounter ? counterId : ''} ${hasError ? errorId : ''}`.trim()}
        aria-invalid={hasError}
        aria-required={required}
      />

      <div className="textarea-footer">
        {helperText && !hasError && (
          <p id={helperId} className="helper-text">
            {helperText}
          </p>
        )}

        {showCounter && maxLength && (
          <p id={counterId} className="character-counter" aria-live="polite">
            <span className="current">{characterCount}</span> / <span className="max">{maxLength}</span>
          </p>
        )}
      </div>

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
/* Textarea Group Container */
.textarea-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
}

/* Label */
.textarea-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  line-height: 1.5;
}

.textarea-label[aria-disabled="true"] {
  color: var(--text-disabled);
}

/* Textarea Field */
.textarea {
  font-family: inherit;
  font-size: var(--font-size-base); /* 16px */
  line-height: 1.5;
  padding: var(--space-3) var(--space-4); /* 12px 16px */
  min-height: 120px; /* ~5 lines at 16px/1.5 */
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--input-bg);
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  resize: vertical; /* Allow vertical resize only */
  width: 100%;
}

.textarea::placeholder {
  color: var(--text-disabled);
  opacity: 1;
}

/* Hover State */
.textarea:hover:not(:disabled):not(:focus) {
  border-color: var(--neutral-400);
}

/* Focus State */
.textarea:focus {
  border-color: var(--color-brand-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(117, 32, 28, 0.20);
}

/* Error State */
.textarea--error,
.textarea[aria-invalid="true"] {
  border-color: var(--color-feedback-error);
}

.textarea--error:focus {
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.20);
}

/* Success State */
.textarea--success,
.textarea[aria-invalid="false"].validated {
  border-color: var(--color-feedback-success);
}

/* Disabled State */
.textarea:disabled {
  background: var(--neutral-100);
  border-color: var(--neutral-200);
  color: var(--text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
  resize: none;
}

/* Read-only State */
.textarea[readonly] {
  background: var(--neutral-50);
  border-color: var(--neutral-200);
  cursor: default;
  resize: none;
}

/* Auto-grow variant */
.textarea--auto-grow {
  resize: none;
  overflow: hidden;
  transition: height 0.1s ease;
}

/* Resize variants */
.textarea--no-resize {
  resize: none;
}

.textarea--resize-horizontal {
  resize: horizontal;
}

.textarea--resize-both {
  resize: both;
}

/* Footer (Helper + Counter) */
.textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
  margin-top: var(--space-1);
}

/* Helper Text */
.helper-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
  flex: 1;
}

/* Character Counter */
.character-counter {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
  white-space: nowrap;
  text-align: right;
}

.character-counter .current {
  font-weight: var(--font-weight-medium);
}

/* Counter warning state (approaching limit) */
.character-counter.warning .current {
  color: var(--accent-600);
}

/* Counter error state (at/over limit) */
.character-counter.error .current {
  color: var(--color-feedback-error);
  font-weight: 600;
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
}
```

---

## JavaScript Enhancement

```javascript
// Auto-grow functionality
function initAutoGrowTextarea(textarea) {
  const minRows = parseInt(textarea.dataset.minRows) || 3;
  const maxRows = parseInt(textarea.dataset.maxRows) || 10;

  function resize() {
    textarea.style.height = 'auto';
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }

  textarea.addEventListener('input', resize);
  resize(); // Initial sizing
}

// Character counter with warnings
function initCharacterCounter(textarea, counter) {
  const maxLength = parseInt(textarea.maxLength);
  const warningThreshold = 0.9; // 90% of max

  function updateCounter() {
    const current = textarea.value.length;
    const currentSpan = counter.querySelector('.current');

    if (currentSpan) {
      currentSpan.textContent = current;
    }

    // Update counter styling based on usage
    counter.classList.remove('warning', 'error');

    if (current >= maxLength) {
      counter.classList.add('error');
    } else if (current >= maxLength * warningThreshold) {
      counter.classList.add('warning');
    }
  }

  textarea.addEventListener('input', updateCounter);
  updateCounter(); // Initial state
}

// Initialize all textareas
document.addEventListener('DOMContentLoaded', () => {
  // Auto-grow textareas
  document.querySelectorAll('.textarea--auto-grow').forEach(textarea => {
    initAutoGrowTextarea(textarea);
  });

  // Character counters
  document.querySelectorAll('.textarea[maxlength]').forEach(textarea => {
    const counterId = textarea.getAttribute('aria-describedby')?.split(' ').find(id => id.includes('counter'));
    if (counterId) {
      const counter = document.getElementById(counterId);
      if (counter) {
        initCharacterCounter(textarea, counter);
      }
    }
  });
});
```

---

## Responsive Behavior

### Mobile (< 768px)
- Full width
- Minimum 16px font size
- Reduce padding slightly if needed: 10px 12px
- Disable manual resize (use auto-grow instead)
- Show counter inline below on narrow screens

### Tablet (768px - 1024px)
- Allow resize
- Maintain comfortable line length
- Counter can stay inline with helper text

### Desktop (> 1024px)
- Full resize capabilities
- Consider max-width for readability (600-800px)
- Counter positioned right

```css
@media (max-width: 767px) {
  .textarea {
    resize: none; /* Disable manual resize on mobile */
    font-size: var(--font-size-base); /* Never below 16px */
  }

  .textarea-footer {
    flex-direction: column;
    gap: var(--space-2);
  }

  .character-counter {
    text-align: left;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .textarea {
    resize: vertical;
  }
}

@media (min-width: 1025px) {
  .textarea {
    max-width: 800px;
  }
}
```

---

## Related Components

- **Input** - Single-line text input
- **FormField** - Wrapper for consistent layouts
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

/* Typography */
--font-size-sm: 14px
--font-size-base: 16px
--font-weight-medium: 500

/* Border Radius */
--radius-sm: 4px
```

---

## References

- WCAG 2.1 AA Compliance
- GOV.UK Design System (Textarea best practices)
- Inclusive Components
- Oitavo Café Brand Voice Guidelines
- Carolina Persona

---

**Version:** 1.0
**Component Status:** Ready for Implementation
**Reviewed By:** Design System Team
**Next Review:** 2025-03-13
