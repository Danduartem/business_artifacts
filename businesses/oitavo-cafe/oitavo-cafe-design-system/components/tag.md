# Tag Component

**Component Category:** Data Display
**Design System:** Oitavo Café Design System
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

Tags are interactive elements used for categorization, filtering, and organization. Unlike badges (which are purely informational), tags are actionable - they can be selected, removed, or clicked to filter content. In the Oitavo Café system, tags help Carolina organize campaigns, filter metrics, and manage content categories.

**Primary Use Cases:**
- Content categorization and filtering
- Multi-select filters in dashboards
- Removable selections in forms
- Campaign and project organization
- Metadata display with interaction

**Design Principle Alignment:**
Tags support "Clarity Over Cleverness" by making categorization and filtering immediately obvious through visual and interactive feedback.

---

## Anatomy

```
┌──────────────────────┐
│  Label Text    [×]   │  ← Removable Tag
└──────────────────────┘

┌──────────────────────┐
│  [✓] Selected Tag    │  ← Selectable Tag (checked state)
└──────────────────────┘

┌──────────────────────┐
│  Clickable Tag       │  ← Link Tag (no close button)
└──────────────────────┘
```

**Anatomy Parts:**
1. **Container** - Background with border and border-radius
2. **Label** - Text content describing the tag
3. **Leading Icon** (optional) - Checkmark for selected state
4. **Trailing Icon** (optional) - Remove/close button (×)
5. **Interactive States** - Hover, active, focus rings

---

## Variants

### 1. Removable Tag
User can dismiss/remove the tag with a close button.

**Visual Characteristics:**
- Close button (×) on trailing edge
- Slightly more padding on right to accommodate button
- Hover state on close button

**When to Use:**
- Selected filters that can be cleared
- Applied categories in forms
- Active search terms
- Selected options in multi-select

### 2. Selectable Tag (Toggle)
Acts as a checkbox - can be selected/deselected.

**Visual Characteristics:**
- Changes background/border when selected
- Optional checkmark icon in leading position
- Clear visual distinction between selected/unselected

**When to Use:**
- Filter groups (select multiple filters)
- Category selection in forms
- Feature toggles
- Multi-select options

### 3. Link Tag
Non-removable tag that acts as a navigation link.

**Visual Characteristics:**
- Hover state indicates clickability
- No close button
- Underline or color change on hover

**When to Use:**
- Category navigation
- Topic links
- Content organization
- Metadata that links to filtered views

### 4. Read-Only Tag
Informational only, no interaction.

**Visual Characteristics:**
- No hover states
- No interactive elements
- Slightly subdued colors

**When to Use:**
- Static metadata display
- System-generated labels
- Non-editable categorization

---

## Sizes

### Small
- Height: 24px
- Padding: 4px 10px
- Font: 12px (--font-size-xs)
- Close button: 14×14px
- Use: Compact spaces, inline with text

### Medium (Default)
- Height: 32px
- Padding: 6px 12px
- Font: 14px (--font-size-sm)
- Close button: 16×16px
- Use: Standard UI, forms, filters

### Large
- Height: 40px
- Padding: 8px 16px
- Font: 16px (--font-size-base)
- Close button: 20×20px
- Use: Prominent filters, touch interfaces

---

## States

### Default (Unselected)
```css
background: var(--neutral-100);
color: var(--neutral-700);
border: 1px solid var(--neutral-300);
```

### Hover
```css
background: var(--neutral-200);
border-color: var(--neutral-400);
cursor: pointer;
transition: all var(--duration-fast) var(--ease-gentle);
```

### Selected/Active
```css
background: var(--primary-700);
color: white;
border-color: var(--primary-700);
font-weight: 500;
```

### Focus
```css
outline: 2px solid var(--primary-600);
outline-offset: 2px;
```

### Disabled
```css
background: var(--neutral-100);
color: var(--neutral-400);
border-color: var(--neutral-200);
opacity: 0.6;
cursor: not-allowed;
```

---

## Color Specifications

### Default Tags (Neutral)

**Unselected**
```css
background: var(--neutral-100);  /* #EBE7E6 */
color: var(--neutral-700);       /* #4A403D */
border: 1px solid var(--neutral-300);
```

**Selected**
```css
background: var(--primary-700);  /* #75201C */
color: white;
border: 1px solid var(--primary-700);
```

### Semantic Color Tags

Tags can use semantic colors for categorization:

**Primary Category**
```css
background: var(--primary-50);
color: var(--primary-700);
border: 1px solid var(--primary-300);

/* Selected */
background: var(--primary-700);
color: white;
```

**Success Category**
```css
background: var(--accent-50);
color: var(--accent-700);
border: 1px solid var(--accent-300);

/* Selected */
background: var(--accent-600);
color: white;
```

**Info Category**
```css
background: var(--secondary-50);
color: var(--secondary-700);
border: 1px solid var(--secondary-300);

/* Selected */
background: var(--secondary-600);
color: white;
```

---

## Typography

- Font Family: System font stack (inherited)
- Font Weight: 400 (regular) unselected, 500 (medium) selected
- Line Height: 1.4
- Letter Spacing: 0.01em
- Text Transform: None (preserve natural case)
- Max Width: 200px (truncate with ellipsis if longer)

---

## Spacing & Layout

**Padding:**
- Small: 4px 10px (6px right with close button)
- Medium: 6px 12px (8px right with close button)
- Large: 8px 16px (12px right with close button)

**Border Radius:**
- Default: var(--radius-md) - 8px
- Alternative: var(--radius-full) for pill-shaped tags

**Gaps in Groups:**
- Horizontal gap: 8px
- Vertical gap: 8px
- Use flexbox with `gap` property

**Close Button Spacing:**
- Margin-left: 8px from label
- Padding: 2px (for larger touch target)

---

## Interactive Behavior

### Click/Tap
- **Selectable tags:** Toggle selected state
- **Link tags:** Navigate to URL
- **Removable tags:** Clicking close button removes tag

### Keyboard Interaction
- **Tab:** Focus moves to next tag
- **Shift + Tab:** Focus moves to previous tag
- **Enter/Space:** Activate tag (toggle selection or follow link)
- **Delete/Backspace:** Remove tag (if removable and focused)
- **Arrow keys:** Navigate between tags in a group

### Animation
```css
transition: all var(--duration-fast) var(--ease-gentle); /* 150ms */

/* On removal */
@keyframes tag-remove {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.9); }
  100% { opacity: 0; transform: scale(0.8); }
}
```

---

## Accessibility

### Semantic HTML

```html
<!-- Removable tag -->
<div class="tag" role="listitem">
  <span class="tag__label">Marketing</span>
  <button class="tag__close" aria-label="Remove Marketing tag">
    ×
  </button>
</div>

<!-- Selectable tag (checkbox pattern) -->
<label class="tag tag--selectable">
  <input type="checkbox" class="tag__input" />
  <span class="tag__label">Social Media</span>
  <span class="tag__checkmark" aria-hidden="true">✓</span>
</label>

<!-- Link tag -->
<a href="/category/design" class="tag tag--link">
  Design
</a>
```

### ARIA Guidelines
- Tag groups: Wrap in container with `role="list"`
- Individual tags: `role="listitem"`
- Removable tags: Close button needs descriptive `aria-label`
- Selectable tags: Use native checkbox with label
- Dynamic updates: Use `aria-live="polite"` for screenreader announcements

### Keyboard Support
- All interactive tags must be keyboard accessible
- Focus indicators must be visible (2px outline minimum)
- Close buttons must be at least 24×24px for touch targets
- Provide keyboard shortcuts for common operations

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Selected state maintains AAA contrast (white on dark)
- Focus indicators have 3:1 contrast with background
- Don't rely on color alone - use icons/text for states

### Screen Reader Considerations
- Announce tag count: "5 tags selected"
- On removal: "Marketing tag removed"
- On selection: "Social Media tag selected"
- Group label: "Filter by category: 3 of 8 selected"

---

## Responsive Behavior

**Mobile (< 768px):**
- Use medium or large sizes for touch-friendly targets
- Ensure 44×44px minimum touch target for close buttons
- Stack tags vertically or wrap with generous gaps
- Consider "Show more" pattern for long tag lists

**Tablet (768px - 1024px):**
- Medium size optimal
- Allow wrapping in horizontal layouts
- Maintain touch-friendly close buttons

**Desktop (> 1024px):**
- All sizes appropriate
- Can use tighter spacing in filter sidebars
- Hover states fully enabled

---

## Do's and Don'ts

### Do

- **Do** use tags for interactive categorization and filtering
- **Do** provide visual feedback for all interactive states
- **Do** keep tag labels concise (1-3 words)
- **Do** group related tags together
- **Do** make close buttons large enough for touch (24×24px minimum)
- **Do** show count of selected tags: "Filters (3)"
- **Do** provide keyboard shortcuts for power users

### Don't

- **Don't** use tags for purely decorative purposes (use badges)
- **Don't** make tags look clickable if they aren't
- **Don't** exceed 200px width (truncate long labels)
- **Don't** use too many colors - stick to neutral + 1-2 semantic
- **Don't** forget focus states for keyboard users
- **Don't** make close buttons too small (<24px)
- **Don't** use tags as primary navigation (use nav components)

### Brand-Specific Guidance

**Carolina's Dashboard Context:**
- Use tags for filtering ROI data by campaign, channel, timeframe
- Selected tags should use Coffee Maroon (primary-700)
- Keep tag labels business-focused: "Q4 2024", "Instagram Ads", "E-mail"
- Show active filter count prominently: "3 filters active"
- Allow quick "Clear all" action for filter tags

---

## Code Examples

### Basic Removable Tag

```html
<div class="tag tag--removable">
  <span class="tag__label">Marketing</span>
  <button class="tag__close" aria-label="Remove Marketing tag">
    <svg class="tag__close-icon">
      <use xlink:href="#icon-close" />
    </svg>
  </button>
</div>
```

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px 6px 12px;
  background: var(--neutral-100);
  color: var(--neutral-700);
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  line-height: 1.4;
  transition: all var(--duration-fast) var(--ease-gentle);
}

.tag__label {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  border-radius: 4px;
  transition: background var(--duration-fast) var(--ease-gentle);
}

.tag__close:hover {
  background: rgba(0, 0, 0, 0.1);
}

.tag__close:focus-visible {
  outline: 2px solid var(--primary-600);
  outline-offset: 2px;
}

.tag__close-icon {
  width: 12px;
  height: 12px;
}
```

### Selectable Tag (Checkbox Pattern)

```html
<label class="tag tag--selectable">
  <input type="checkbox" class="tag__input" id="tag-social" />
  <span class="tag__checkmark" aria-hidden="true">✓</span>
  <span class="tag__label">Social Media</span>
</label>
```

```css
.tag--selectable {
  cursor: pointer;
  user-select: none;
}

.tag__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.tag__checkmark {
  display: none;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  font-size: 12px;
}

.tag--selectable:hover {
  background: var(--neutral-200);
  border-color: var(--neutral-400);
}

.tag__input:checked + .tag__checkmark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tag__input:checked ~ .tag__label {
  font-weight: 500;
}

.tag--selectable:has(.tag__input:checked) {
  background: var(--primary-700);
  color: white;
  border-color: var(--primary-700);
}

.tag__input:focus-visible + .tag__checkmark {
  outline: 2px solid var(--primary-600);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Link Tag

```html
<a href="/category/design" class="tag tag--link">
  Design
</a>
```

```css
.tag--link {
  text-decoration: none;
  cursor: pointer;
}

.tag--link:hover {
  background: var(--primary-50);
  border-color: var(--primary-300);
  color: var(--primary-700);
}

.tag--link:active {
  background: var(--primary-100);
}
```

### Tag Group with Clear All

```html
<div class="tag-group" role="list" aria-label="Active filters">
  <div class="tag-group__header">
    <span class="tag-group__label">Filters (3)</span>
    <button class="tag-group__clear" aria-label="Clear all filters">
      Clear all
    </button>
  </div>

  <div class="tag-group__list">
    <div class="tag tag--removable" role="listitem">
      <span class="tag__label">Instagram</span>
      <button class="tag__close" aria-label="Remove Instagram filter">×</button>
    </div>
    <div class="tag tag--removable" role="listitem">
      <span class="tag__label">Q4 2024</span>
      <button class="tag__close" aria-label="Remove Q4 2024 filter">×</button>
    </div>
    <div class="tag tag--removable" role="listitem">
      <span class="tag__label">Email Campaign</span>
      <button class="tag__close" aria-label="Remove Email Campaign filter">×</button>
    </div>
  </div>
</div>
```

```css
.tag-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tag-group__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-group__label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--neutral-700);
}

.tag-group__clear {
  padding: 4px 8px;
  background: none;
  border: none;
  color: var(--primary-600);
  font-size: var(--font-size-sm);
  cursor: pointer;
  border-radius: 4px;
  transition: background var(--duration-fast) var(--ease-gentle);
}

.tag-group__clear:hover {
  background: var(--primary-50);
  color: var(--primary-700);
}

.tag-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

### Animated Tag Removal

```html
<div class="tag tag--removable" id="tag-1">
  <span class="tag__label">Marketing</span>
  <button class="tag__close" onclick="removeTag('tag-1')">×</button>
</div>
```

```css
@keyframes tag-fadeout {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
    max-width: 0;
    padding: 0;
    margin: 0;
    border-width: 0;
  }
}

.tag--removing {
  animation: tag-fadeout 200ms var(--ease-gentle) forwards;
}
```

```javascript
function removeTag(tagId) {
  const tag = document.getElementById(tagId);
  tag.classList.add('tag--removing');

  // Announce to screen readers
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.textContent = `${tag.querySelector('.tag__label').textContent} tag removed`;
  document.body.appendChild(announcement);

  setTimeout(() => {
    tag.remove();
    announcement.remove();
  }, 200);
}
```

---

## React/Component Example

```jsx
// Tag.jsx
const Tag = ({
  children,
  variant = 'default',
  size = 'medium',
  selected = false,
  removable = false,
  selectable = false,
  href,
  onRemove,
  onChange,
  ...props
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleToggle = () => {
    if (selectable) {
      const newState = !isSelected;
      setIsSelected(newState);
      onChange?.(newState);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove?.();
  };

  const className = `tag tag--${variant} tag--${size} ${isSelected ? 'tag--selected' : ''}`;

  // Link tag
  if (href) {
    return (
      <a href={href} className={`${className} tag--link`} {...props}>
        {children}
      </a>
    );
  }

  // Selectable tag
  if (selectable) {
    return (
      <label className={`${className} tag--selectable`}>
        <input
          type="checkbox"
          className="tag__input"
          checked={isSelected}
          onChange={handleToggle}
        />
        {isSelected && <span className="tag__checkmark">✓</span>}
        <span className="tag__label">{children}</span>
      </label>
    );
  }

  // Removable tag
  return (
    <div className={className} {...props}>
      <span className="tag__label">{children}</span>
      {removable && (
        <button
          className="tag__close"
          onClick={handleRemove}
          aria-label={`Remove ${children} tag`}
        >
          ×
        </button>
      )}
    </div>
  );
};

// TagGroup.jsx
const TagGroup = ({ tags, label, onClearAll, children }) => {
  return (
    <div className="tag-group" role="list" aria-label={label}>
      {(label || onClearAll) && (
        <div className="tag-group__header">
          {label && <span className="tag-group__label">{label}</span>}
          {onClearAll && (
            <button className="tag-group__clear" onClick={onClearAll}>
              Clear all
            </button>
          )}
        </div>
      )}
      <div className="tag-group__list">
        {children}
      </div>
    </div>
  );
};

// Usage
<TagGroup label="Filters (3)" onClearAll={() => console.log('clear')}>
  <Tag removable onRemove={() => console.log('removed')}>Instagram</Tag>
  <Tag removable onRemove={() => console.log('removed')}>Q4 2024</Tag>
  <Tag selectable onChange={(selected) => console.log(selected)}>
    Email Campaign
  </Tag>
</TagGroup>
```

---

## Design Tokens Reference

```css
/* Tag-specific tokens */
:root {
  /* Sizes */
  --tag-height-sm: 24px;
  --tag-height-md: 32px;
  --tag-height-lg: 40px;

  /* Padding */
  --tag-padding-sm: 4px 10px;
  --tag-padding-md: 6px 12px;
  --tag-padding-lg: 8px 16px;

  /* Typography */
  --tag-font-size-sm: var(--font-size-xs);
  --tag-font-size-md: var(--font-size-sm);
  --tag-font-size-lg: var(--font-size-base);

  /* Close button */
  --tag-close-size-sm: 14px;
  --tag-close-size-md: 16px;
  --tag-close-size-lg: 20px;
  --tag-close-gap: 8px;

  /* Border */
  --tag-border-width: 1px;
  --tag-border-radius: var(--radius-md);

  /* Animation */
  --tag-transition: all var(--duration-fast) var(--ease-gentle);
}
```

---

## Related Components

- **Badge** - For non-interactive status/count display
- **Chip** - Similar to tags, used in input contexts
- **Button** - For primary actions (tags are secondary)
- **Checkbox** - Native form control that tags can wrap

---

## References

- Design Principle: "Clarity Over Cleverness"
- Interaction Pattern: Clear visual feedback for all states
- Carolina's Dashboard: Filter by campaign, channel, timeframe
- Accessibility: WCAG 2.1 Level AA compliance

---

*Generated for Oitavo Café Design System - Clear categorization, powerful filtering*
