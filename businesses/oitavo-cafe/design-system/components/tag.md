# Tag Component

## Overview

**Purpose**: Tags (also called chips or labels) categorize, label, or highlight specific attributes. They provide quick visual identification of status, category, or metadata.

**Usage**: Use tags for categories, filters, keywords, status indicators, or removable selections. They can be static (read-only) or interactive (clickable, removable).

**Brand Context**: For Oitavo Café, tags label campaign types ("Instagram", "Email"), status ("Ativa", "Pausada"), content categories ("Educacional", "Promocional"), or client segments - helping Carolina organize and filter information at a glance.

---

## Anatomy

```
Basic Tag:
┌──────────────┐
│ Instagram    │
└──────────────┘

With Icon:
┌──────────────┐
│ ✓ Publicado  │
└──────────────┘

Removable Tag:
┌──────────────┐
│ Email    [×] │
└──────────────┘

Components:
1. Container - Rounded background
2. Icon (optional) - Left-side indicator
3. Label Text - Category/status name
4. Remove Button (optional) - Right-side close icon
```

---

## Variants

### 1. **Static Tag** (Default)
- Read-only label
- No interaction
- Used for display/categorization
- Examples: "Instagram", "Cliente VIP"

### 2. **Clickable Tag**
- Hover/focus states
- Acts as filter or navigation
- `cursor: pointer`
- Examples: Filter chips, category links

### 3. **Removable Tag**
- Close button (×)
- Callback on remove
- Used in multi-select inputs
- Examples: Selected filters, email recipients

### 4. **Status Tag**
- Color-coded for semantic meaning
- Success, warning, error, info variants
- Examples: "Ativa" (success), "Pausada" (warning)

### 5. **Outlined Tag**
- Transparent background
- Colored border only
- Subtle, less visual weight
- Examples: Secondary categories

---

## Sizes

### Small
- **Height**: `24px`
- **Font Size**: `fontSize.xs` (10px)
- **Padding**: `spacing.1` (4px) horizontal, `spacing.2` (8px) vertical
- **Icon Size**: `12px`
- **Use**: Compact lists, inline text

### Medium (Default)
- **Height**: `28px`
- **Font Size**: `fontSize.sm` (13px)
- **Padding**: `spacing.2` (8px) horizontal, `spacing.3` (12px) vertical
- **Icon Size**: `14px`
- **Use**: Standard filters, categories

### Large
- **Height**: `32px`
- **Font Size**: `fontSize.base` (16px)
- **Padding**: `spacing.3` (12px) horizontal, `spacing.4` (16px) vertical
- **Icon Size**: `16px`
- **Use**: Prominent labels, touch interfaces

---

## States

### Default
- **Background**: `neutral-100` (#EDE7E1)
- **Text Color**: `neutral-800` (#2B2523)
- **Border**: none (or `1px solid` for outlined)
- **Border Radius**: `borderRadius.full` (pill shape)
- **Font Weight**: `medium` (500)

### Hover (if clickable)
- **Background**: `neutral-200` (#D6CEC7)
- **Text Color**: `neutral-900` (#1A1817)
- **Cursor**: `pointer`
- **Transition**: `all 150ms ease-out`

### Focus
- **Outline**: `2px solid` `boxShadow.focus`
- **Outline Offset**: `2px`

### Active/Selected
- **Background**: `primary-700` (#75201C)
- **Text Color**: `white`
- **Border**: none

### Disabled
- **Background**: `neutral-100` (#EDE7E1)
- **Text Color**: `neutral-400` (#9B8B86)
- **Opacity**: `0.5`
- **Cursor**: `not-allowed`

---

## Semantic Variants

### Success
- **Background**: `feedback.successBg` (#D1FAE5)
- **Text Color**: `feedback.success` (#2D5016)
- **Icon**: Checkmark
- **Use**: "Publicada", "Concluída", "Ativa"

### Warning
- **Background**: `feedback.warningBg` (#FEF3C7)
- **Text Color**: `feedback.warning` (#8D4C00)
- **Icon**: Alert triangle
- **Use**: "Pendente", "Aguardando", "Rascunho"

### Error
- **Background**: `feedback.errorBg` (#FEE2E2)
- **Text Color**: `feedback.error` (#B91C1C)
- **Icon**: X circle
- **Use**: "Rejeitada", "Erro", "Pausada"

### Info
- **Background**: `feedback.infoBg` (#FCF5F4)
- **Text Color**: `feedback.info` (#75201C)
- **Icon**: Info circle
- **Use**: "Nova", "Atualizada", "Em análise"

---

## Props/API

```typescript
interface TagProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  clickable?: boolean;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}
```

### Example Usage

```tsx
{/* Static Category Tag */}
<Tag label="Instagram" />

{/* Status Tag */}
<Tag label="Ativa" variant="success" icon={<CheckIcon />} />

{/* Clickable Filter */}
<Tag
  label="Email Marketing"
  clickable={true}
  onClick={() => filterByChannel('email')}
/>

{/* Removable Tag */}
<Tag
  label="carolina@oitavo.com"
  removable={true}
  onRemove={() => removeRecipient('carolina@oitavo.com')}
/>

{/* Selected Tag */}
<Tag
  label="ROI Alto"
  clickable={true}
  selected={true}
  onClick={() => toggleFilter('roi-alto')}
/>
```

---

## Accessibility

### Keyboard Navigation
- **Tab**: Focus tag (if clickable/removable)
- **Enter/Space**: Activate tag or remove
- **Escape**: Cancel remove action (if confirmation needed)

### ARIA Attributes
```html
<!-- Static Tag -->
<span class="tag" role="status">
  <svg aria-hidden="true">✓</svg>
  <span>Publicada</span>
</span>

<!-- Clickable Tag -->
<button class="tag tag--clickable" role="button">
  <span>Instagram</span>
</button>

<!-- Removable Tag -->
<div class="tag tag--removable">
  <span>Email Marketing</span>
  <button
    class="tag__remove"
    aria-label="Remover Email Marketing"
    type="button"
  >
    <svg aria-hidden="true">×</svg>
  </button>
</div>

<!-- Selected Tag (Filter) -->
<button
  class="tag tag--selected"
  role="button"
  aria-pressed="true"
>
  <span>ROI Alto</span>
</button>
```

### Guidelines
- **role="status"**: For static status tags
- **aria-label**: Descriptive label for remove button
- **aria-pressed**: For toggleable filter tags
- **Icon decoration**: `aria-hidden="true"` if redundant
- **Contrast**: 4.5:1 minimum for text
- **Touch target**: Minimum 44×44px for clickable/removable

---

## Code Examples

### HTML Structure

```html
<!-- Basic Tag -->
<span class="tag">
  <span class="tag__label">Instagram</span>
</span>

<!-- Tag with Icon -->
<span class="tag tag--success">
  <svg class="tag__icon" width="14" height="14" aria-hidden="true">
    <path d="M5 10L2 7L3 6L5 8L9 4L10 5Z" fill="currentColor"/>
  </svg>
  <span class="tag__label">Publicada</span>
</span>

<!-- Clickable Tag -->
<button class="tag tag--clickable" type="button">
  <span class="tag__label">Email Marketing</span>
</button>

<!-- Removable Tag -->
<div class="tag tag--removable">
  <span class="tag__label">carolina@oitavo.com</span>
  <button class="tag__remove" aria-label="Remover carolina@oitavo.com" type="button">
    <svg width="12" height="12" aria-hidden="true">
      <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>
</div>

<!-- Outlined Tag -->
<span class="tag tag--outlined">
  <span class="tag__label">Cliente VIP</span>
</span>
```

### CSS Implementation

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1, 4px);
  height: 28px;
  padding: 0 var(--spacing-3, 12px);
  background: var(--neutral-100);
  color: var(--neutral-800);
  font-size: var(--fontSize-sm, 13px);
  font-weight: 500;
  line-height: 1;
  border: none;
  border-radius: var(--borderRadius-full);
  white-space: nowrap;
  user-select: none;
  transition: all 150ms ease-out;
}

/* Icon */
.tag__icon {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
}

/* Label */
.tag__label {
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Remove Button */
.tag__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  margin-left: var(--spacing-1, 4px);
  margin-right: calc(var(--spacing-1) * -1);
  background: transparent;
  border: none;
  border-radius: 50%;
  color: currentColor;
  cursor: pointer;
  transition: all 150ms ease-out;
}

.tag__remove:hover {
  background: rgba(0, 0, 0, 0.1);
}

.tag__remove:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 1px;
}

/* Clickable */
.tag--clickable {
  cursor: pointer;
}

.tag--clickable:hover {
  background: var(--neutral-200);
}

.tag--clickable:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 2px;
}

/* Selected */
.tag--selected {
  background: var(--primary-700);
  color: white;
}

.tag--selected:hover {
  background: var(--primary-600);
}

/* Disabled */
.tag--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Semantic Variants */
.tag--success {
  background: var(--feedback-successBg);
  color: var(--feedback-success);
}

.tag--warning {
  background: var(--feedback-warningBg);
  color: var(--feedback-warning);
}

.tag--error {
  background: var(--feedback-errorBg);
  color: var(--feedback-error);
}

.tag--info {
  background: var(--feedback-infoBg);
  color: var(--feedback-info);
}

/* Outlined Variant */
.tag--outlined {
  background: transparent;
  border: 1px solid currentColor;
}

.tag--outlined.tag--clickable:hover {
  background: var(--neutral-50);
}

/* Size Variants */
.tag--small {
  height: 24px;
  padding: 0 var(--spacing-2, 8px);
  font-size: var(--fontSize-xs, 10px);
}

.tag--small .tag__icon {
  width: 12px;
  height: 12px;
}

.tag--large {
  height: 32px;
  padding: 0 var(--spacing-4, 16px);
  font-size: var(--fontSize-base, 16px);
}

.tag--large .tag__icon {
  width: 16px;
  height: 16px;
}

/* Tag Group */
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2, 8px);
  align-items: center;
}
```

### JavaScript Behavior

```javascript
class Tag {
  constructor(element) {
    this.element = element;
    this.removeButton = element.querySelector('.tag__remove');

    if (this.removeButton) {
      this.removeButton.addEventListener('click', (e) => this.handleRemove(e));
    }
  }

  handleRemove(event) {
    event.stopPropagation(); // Prevent parent click handlers

    // Animate removal
    this.element.style.transform = 'scale(0)';
    this.element.style.opacity = '0';

    setTimeout(() => {
      this.element.remove();

      // Trigger custom event for parent to handle
      const removeEvent = new CustomEvent('tag-removed', {
        detail: { tag: this.element.dataset.value }
      });
      document.dispatchEvent(removeEvent);
    }, 150);
  }
}

// Initialize all tags
document.querySelectorAll('.tag--removable').forEach(tag => {
  new Tag(tag);
});

// Listen for tag removal
document.addEventListener('tag-removed', (e) => {
  console.log('Tag removed:', e.detail.tag);
  // Update application state, filters, etc.
});
```

---

## Usage Guidelines

### Do's
- ✅ **Use consistent colors** - Map meanings (green=success, red=error)
- ✅ **Keep labels short** - 1-2 words max
- ✅ **Group related tags** - Use tag-group container
- ✅ **Provide remove feedback** - Animate removal
- ✅ **Use icons for clarity** - Checkmark for success, X for error
- ✅ **Limit tag count** - Show "+3 more" if > 5 tags

### Don'ts
- ❌ **Don't use for long text** - Use chip with ellipsis or different component
- ❌ **Don't mix variants** - Stick to one style per context
- ❌ **Don't make tags too similar** - Ensure color contrast between variants
- ❌ **Don't use only color** - Add icons or text for accessibility
- ❌ **Don't stack tags vertically** - Use horizontal wrap instead
- ❌ **Don't make static tags clickable** - Clear interaction affordance needed

---

## Related Components
- **Badge** - Numeric indicators (vs. categorical labels)
- **Button** - Primary actions (vs. labels)
- **Chip** - Alternative name, same component
- **Dropdown** - Select multiple tags
- **Input** - Tag input field
