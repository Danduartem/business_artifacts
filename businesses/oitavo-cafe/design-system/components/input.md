# Input

## Overview
Text input fields are essential form components for collecting single-line user data in the Oitavo Café Design System. Designed for clarity, accessibility, and ease of completion, inputs guide users through data entry with clear feedback and validation. Use inputs for names, emails, phone numbers, search queries, and other single-line text data.

## Anatomy

```
┌───────────────────────────────────────────┐
│  Label *                                  │
│  ┌─────────────────────────────────────┐  │
│  │ [icon]  Placeholder text...      [x]│  │
│  └─────────────────────────────────────┘  │
│  Helper text or error message             │
└───────────────────────────────────────────┘
     ↑          ↑              ↑        ↑
   Label    Leading Icon    Content  Trailing
(required)   (optional)    (user text) Icon
```

**Component Parts:**
- **Label**: Required, positioned above input
- **Input Field**: Container with border, padding, and background
- **Leading Icon**: Optional, for context (search, email, etc.)
- **Trailing Icon**: Optional, for actions (clear, show/hide password, validation status)
- **Placeholder**: Optional hint text (disappears on focus)
- **Helper Text**: Optional guidance below input
- **Error Message**: Validation feedback below input
- **Required Indicator**: Asterisk (*) in label for required fields

## Variants

| Variant | Use Case | Key Differences |
|---------|----------|-----------------|
| Text | General single-line text entry | Standard styling, type="text" |
| Email | Email addresses | type="email", triggers email keyboard on mobile |
| Tel | Phone numbers | type="tel", triggers numeric keyboard on mobile |
| Password | Password entry | type="password", includes show/hide toggle icon |
| Search | Search queries | Pill-shaped border radius, search icon, lighter background |
| Number | Numeric input | type="number", spinners for increment/decrement |
| URL | Web addresses | type="url", appropriate keyboard on mobile |

## Sizes

| Size | Height | Padding | Font Size | Token Reference |
|------|--------|---------|-----------|-----------------|
| sm | 40px | 10px 14px | 14px | var(--spacing-2) + 2px, var(--spacing-3) + 2px |
| md | 48px | 12px 16px | 16px | var(--spacing-3) var(--spacing-4) |
| lg | 56px | 16px 20px | 18px | var(--spacing-4) var(--spacing-5) |

**Note:** Medium (md) is the default size. Minimum 16px font size prevents auto-zoom on iOS.

## States

| State | Background | Border | Text | Shadow | Icon Color |
|-------|------------|--------|------|--------|------------|
| default | var(--color-white) | 2px solid var(--color-neutral-300) | var(--color-neutral-800) | none | var(--color-neutral-500) |
| hover | var(--color-white) | 2px solid var(--color-neutral-400) | var(--color-neutral-800) | none | var(--color-neutral-600) |
| focus | var(--color-white) | 2px solid var(--color-primary-600) | var(--color-neutral-800) | 0 0 0 3px rgba(183,91,83,0.1) | var(--color-primary-600) |
| filled | var(--color-support-cream-100) | 2px solid var(--color-neutral-300) | var(--color-neutral-800) | none | var(--color-neutral-500) |
| error | var(--color-primary-50) | 2px solid var(--color-primary-800) | var(--color-neutral-800) | none | var(--color-primary-800) |
| success | var(--color-accent-50) | 2px solid var(--color-accent-600) | var(--color-neutral-800) | none | var(--color-accent-600) |
| disabled | var(--color-neutral-100) | 2px solid var(--color-neutral-200) | var(--color-neutral-400) | none | var(--color-neutral-300) |
| read-only | var(--color-neutral-50) | 1px solid var(--color-neutral-200) | var(--color-neutral-700) | none | var(--color-neutral-400) |

### Search Variant States

| State | Background | Border | Border Radius |
|-------|------------|--------|---------------|
| default | var(--color-neutral-50) | 2px solid var(--color-neutral-200) | 24px (pill) |
| focus | var(--color-white) | 2px solid var(--color-primary-600) | 24px (pill) |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'text' \| 'email' \| 'tel' \| 'password' \| 'search' \| 'number' \| 'url' | 'text' | Input type |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Input size |
| value | string | - | Controlled input value |
| defaultValue | string | - | Uncontrolled input default value |
| placeholder | string | - | Placeholder text (use sparingly) |
| disabled | boolean | false | Disabled state |
| readOnly | boolean | false | Read-only state |
| required | boolean | false | Required field (shows asterisk in label) |
| error | boolean | false | Error state |
| success | boolean | false | Success/valid state |
| label | string | - | Label text (required for accessibility) |
| helperText | string | - | Helper text below input |
| errorMessage | string | - | Error message (shown when error=true) |
| leftIcon | ReactNode | - | Icon before input text |
| rightIcon | ReactNode | - | Icon after input text |
| autoComplete | string | - | HTML autocomplete attribute |
| maxLength | number | - | Maximum character length |
| onChange | function | - | Change handler function |
| onBlur | function | - | Blur handler (for validation) |
| onFocus | function | - | Focus handler |

## Accessibility

### Keyboard Navigation
| Key | Action |
|-----|--------|
| Tab | Move focus to input field |
| Shift + Tab | Move focus to previous element |
| Enter | Submit form (if in a form) |
| Escape | Clear focus (browser default) |

### ARIA Attributes
- **for/id**: Label must be associated with input using matching for/id
- **aria-label**: Alternative to visible label (use visible labels when possible)
- **aria-describedby**: Associate helper text and error messages with input
- **aria-invalid**: Set to `"true"` when input has validation error
- **aria-required**: Set to `"true"` for required fields
- **aria-disabled**: Set to `"true"` when disabled
- **role**: Implicit from `<input>` element (do not override)

### Screen Reader Behavior
- Default: Announces "[Label], edit text, [value or placeholder]"
- Required: Announces "[Label], required, edit text"
- Error: Announces "[Label], invalid entry, [error message]"
- Helper text: Announces helper text after label

### WCAG Compliance
- Label-input association required (WCAG 1.3.1, 4.1.2)
- Color contrast: 4.5:1 minimum for text and borders (WCAG AA)
- Focus indicator: Clearly visible 3px shadow (WCAG 2.4.7)
- Minimum 16px font size to prevent iOS auto-zoom
- Error messages programmatically associated (WCAG 3.3.1)
- Touch target: 48×48px minimum height

## Label Specifications

```css
.input-label {
  display: block;
  margin-bottom: 6px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-700);
  line-height: var(--line-height-normal);
}

.input-label-required::after {
  content: " *";
  color: var(--color-primary-700);
  margin-left: 2px;
}
```

## Helper Text Specifications

```css
.input-helper {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-neutral-600);
  line-height: var(--line-height-relaxed);
}

.input-helper-icon {
  width: 16px;
  height: 16px;
  color: var(--color-neutral-500);
  flex-shrink: 0;
}
```

## Error Message Specifications

```css
.input-error {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-primary-800);
  line-height: var(--line-height-relaxed);
}

.input-error-icon {
  width: 16px;
  height: 16px;
  color: var(--color-primary-800);
  flex-shrink: 0;
}
```

## Usage Guidelines

### ✅ Do
- Always use clear, specific labels above inputs (not placeholders alone)
- Use autocomplete attributes for better UX and accessibility
- Show validation on blur, not while user is typing
- Provide specific error messages with solutions ("Email deve incluir @")
- Use appropriate input types (email, tel, url) for mobile keyboards
- Keep minimum 16px font size to prevent iOS zoom
- Associate error messages using aria-describedby
- Use helper text to clarify expected formats

### ❌ Don't
- Don't use placeholder as the only label (disappears on focus)
- Don't validate while user is still typing (feels aggressive)
- Don't use red for anything except errors (creates false urgency)
- Don't make inputs narrower than 40 characters wide (can't review text)
- Don't disable inputs without explanation
- Don't rely on color alone for error state (use icons and text)
- Don't use custom styled inputs that hide browser functionality
- Don't remove focus indicators (required for keyboard users)

## Code Examples

### HTML

```html
<!-- Basic Text Input -->
<div class="input-wrapper">
  <label for="name" class="input-label input-label-required">
    Nome Completo
  </label>
  <input
    type="text"
    id="name"
    name="name"
    class="input input-md"
    placeholder="João Silva"
    autocomplete="name"
    required
    aria-required="true"
  />
  <p class="input-helper">
    Digite seu nome como aparece nos documentos oficiais.
  </p>
</div>

<!-- Email Input with Icon -->
<div class="input-wrapper">
  <label for="email" class="input-label input-label-required">
    Email Corporativo
  </label>
  <div class="input-container">
    <svg class="input-icon-left" aria-hidden="true">...</svg>
    <input
      type="email"
      id="email"
      name="email"
      class="input input-md input-with-icon-left"
      placeholder="nome@empresa.com.br"
      autocomplete="email"
      required
      aria-required="true"
    />
  </div>
</div>

<!-- Input with Error State -->
<div class="input-wrapper">
  <label for="email-error" class="input-label input-label-required">
    Email
  </label>
  <div class="input-container">
    <input
      type="email"
      id="email-error"
      name="email"
      class="input input-md input-error-state"
      value="invalid-email"
      aria-invalid="true"
      aria-describedby="email-error-message"
    />
    <svg class="input-icon-right input-icon-error" aria-hidden="true">!</svg>
  </div>
  <p id="email-error-message" class="input-error" role="alert">
    <svg class="input-error-icon" aria-hidden="true">!</svg>
    Email deve incluir o símbolo @
  </p>
</div>

<!-- Search Input -->
<div class="input-wrapper">
  <label for="search" class="input-label">
    Buscar
  </label>
  <div class="input-container">
    <svg class="input-icon-left" aria-hidden="true">🔍</svg>
    <input
      type="search"
      id="search"
      name="search"
      class="input input-search input-md input-with-icon-left"
      placeholder="Digite sua busca..."
      autocomplete="off"
    />
  </div>
</div>

<!-- Password Input with Toggle -->
<div class="input-wrapper">
  <label for="password" class="input-label input-label-required">
    Senha
  </label>
  <div class="input-container">
    <input
      type="password"
      id="password"
      name="password"
      class="input input-md input-with-icon-right"
      autocomplete="current-password"
      required
      aria-required="true"
    />
    <button
      type="button"
      class="input-icon-right input-password-toggle"
      aria-label="Mostrar senha"
    >
      👁️
    </button>
  </div>
</div>
```

### CSS

```css
/* Input Base Styles */
.input {
  width: 100%;
  height: 48px;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-white);
  font-size: var(--font-size-base);
  font-family: var(--font-family-sans);
  color: var(--color-neutral-800);
  line-height: var(--line-height-normal);
  transition: all var(--duration-fast) var(--easing-ease-out);
}

.input::placeholder {
  color: var(--color-neutral-400);
  font-style: italic;
}

.input:hover {
  border-color: var(--color-neutral-400);
}

.input:focus {
  border-color: var(--color-primary-600);
  outline: none;
  box-shadow: 0 0 0 3px rgba(183, 91, 83, 0.1);
}

.input:disabled {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-200);
  color: var(--color-neutral-400);
  cursor: not-allowed;
}

/* Input States */
.input-error-state {
  background: var(--color-primary-50);
  border-color: var(--color-primary-800);
}

.input-success-state {
  background: var(--color-accent-50);
  border-color: var(--color-accent-600);
}

/* Search Variant */
.input-search {
  background: var(--color-neutral-50);
  border-radius: 24px;
  border-color: var(--color-neutral-200);
}

.input-search:focus {
  background: var(--color-white);
  border-color: var(--color-primary-600);
}

/* With Icons */
.input-with-icon-left {
  padding-left: 44px;
}

.input-with-icon-right {
  padding-right: 44px;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon-left {
  position: absolute;
  left: 14px;
  width: 20px;
  height: 20px;
  color: var(--color-neutral-500);
  pointer-events: none;
}

.input-icon-right {
  position: absolute;
  right: 14px;
  width: 20px;
  height: 20px;
  color: var(--color-neutral-500);
}

.input-icon-error {
  color: var(--color-primary-800);
}

/* Sizes */
.input-sm {
  height: 40px;
  padding: 10px 14px;
  font-size: var(--font-size-sm);
}

.input-lg {
  height: 56px;
  padding: var(--spacing-4) var(--spacing-5);
  font-size: var(--font-size-lg);
}
```

### React Component Example

```jsx
import React, { useState } from 'react';
import './Input.css';

export const Input = ({
  type = 'text',
  size = 'md',
  label,
  required = false,
  helperText,
  errorMessage,
  error = false,
  success = false,
  disabled = false,
  readOnly = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputClasses = [
    'input',
    `input-${size}`,
    leftIcon && 'input-with-icon-left',
    rightIcon && 'input-with-icon-right',
    error && 'input-error-state',
    success && 'input-success-state',
    type === 'search' && 'input-search',
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'input-label',
    required && 'input-label-required',
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={props.id} className={labelClasses}>
          {label}
        </label>
      )}

      <div className="input-container">
        {leftIcon && (
          <span className="input-icon-left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          className={inputClasses}
          disabled={disabled}
          readOnly={readOnly}
          aria-required={required}
          aria-invalid={error}
          aria-describedby={
            error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
          }
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
          }}
          {...props}
        />

        {rightIcon && (
          <span className="input-icon-right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>

      {error && errorMessage && (
        <p id={`${props.id}-error`} className="input-error" role="alert">
          <svg className="input-error-icon" aria-hidden="true">!</svg>
          {errorMessage}
        </p>
      )}

      {!error && helperText && (
        <p id={`${props.id}-helper`} className="input-helper">
          {helperText}
        </p>
      )}
    </div>
  );
};
```

## Related Components
- **Textarea** - Multi-line text input for longer content
- **Select** - Dropdown menu for selecting from predefined options
- **Checkbox** - Boolean input for yes/no choices
- **Radio** - Mutually exclusive options
- **Form** - Container for multiple inputs with validation
- **Button** - For form submission
