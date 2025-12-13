# Divider Component

## Overview

**Purpose**: Dividers visually separate content into distinct sections, creating clear boundaries and improving scannability. They provide subtle or strong visual breaks between related content groups.

**Usage**: Use dividers to separate list items, form sections, card content, or navigation groups. They help organize information without adding excessive white space.

**Brand Context**: For Oitavo Café, dividers separate campaign sections (Instagram vs. Email), dashboard widgets, or settings categories - maintaining visual hierarchy while keeping the interface clean and organized.

---

## Anatomy

```
Horizontal Divider (Default):
┌──────────────────────────────┐
│ Content Above                │
├──────────────────────────────┤  ← Divider
│ Content Below                │
└──────────────────────────────┘

Vertical Divider:
┌──────┬──────┬──────┐
│ Item │  │   │ Item │  ← Vertical divider between
└──────┴──────┴──────┘

With Label:
┌──────────────────────────────┐
│ Content Above                │
├───── Categorias ─────────────┤  ← Labeled divider
│ Content Below                │
└──────────────────────────────┘

Components:
1. Line - Visual separator (1px border)
2. Label (optional) - Text describing section
3. Spacing - Margin above/below
```

---

## Variants

### 1. **Horizontal Divider** (Default)
- Full-width line
- Separates vertical content
- `border-top: 1px solid`
- Use in lists, forms, cards

### 2. **Vertical Divider**
- Height-based line
- Separates horizontal content
- `border-left: 1px solid`
- Use in toolbars, navigation, flex layouts

### 3. **Divider with Label**
- Centered text with lines on sides
- Acts as section header
- Font size: `fontSize.xs` (10px)
- Use for major content breaks

### 4. **Subtle Divider**
- Lighter color (`neutral-100`)
- Minimal visual weight
- Use within related content

### 5. **Strong Divider**
- Darker color (`neutral-400`)
- Higher emphasis
- Use between unrelated sections

### 6. **Inset Divider**
- Doesn't extend to edges
- Left/right padding offset
- Use in lists with icons/avatars

---

## Sizes

### Subtle
- **Thickness**: `1px`
- **Color**: `neutral-100` (#EDE7E1)
- **Opacity**: `0.5`
- **Use**: Within cards, related sections

### Default
- **Thickness**: `1px`
- **Color**: `neutral-200` (#D6CEC7)
- **Opacity**: `1`
- **Use**: Standard content separation

### Strong
- **Thickness**: `2px` or `1px` with darker color
- **Color**: `neutral-400` (#9B8B86)
- **Opacity**: `1`
- **Use**: Major section breaks

---

## Spacing

### Compact
- **Margin**: `spacing.3` (12px) vertical
- **Use**: Dense lists, tight layouts

### Default
- **Margin**: `spacing.5` (24px) vertical
- **Use**: Standard content separation

### Comfortable
- **Margin**: `spacing.7` (40px) vertical
- **Use**: Major section breaks, hero content

---

## Props/API

```typescript
interface DividerProps {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Visual weight */
  variant?: 'subtle' | 'default' | 'strong';

  /** Optional label text */
  label?: string;

  /** Spacing around divider */
  spacing?: 'compact' | 'default' | 'comfortable';

  /** Inset from edges (px) */
  inset?: number;

  /** Additional CSS classes */
  className?: string;
}
```

### Example Usage

```tsx
{/* Basic Horizontal Divider */}
<Divider />

{/* Divider with Label */}
<Divider label="Campanhas Ativas" variant="strong" />

{/* Subtle Divider in List */}
<Divider variant="subtle" spacing="compact" inset={56} />

{/* Vertical Divider in Toolbar */}
<div className="toolbar">
  <button>Editar</button>
  <Divider orientation="vertical" />
  <button>Excluir</button>
</div>
```

---

## Accessibility

### Guidelines
- **Semantic HTML**: Use `<hr>` for horizontal dividers (thematic break)
- **role="separator"**: For vertical dividers (not semantic break)
- **aria-orientation**: Specify "vertical" or "horizontal"
- **aria-label**: Describe section if labeled divider
- **Not focusable**: Dividers are decorative, skip in tab order
- **Contrast**: 3:1 minimum against background (WCAG AA for graphics)

### ARIA Attributes
```html
<!-- Horizontal Divider (Semantic Break) -->
<hr class="divider" />

<!-- Vertical Divider (Non-semantic) -->
<div
  class="divider divider--vertical"
  role="separator"
  aria-orientation="vertical"
></div>

<!-- Labeled Divider -->
<div class="divider divider--labeled" role="separator">
  <span class="divider__label" aria-label="Início da seção Campanhas Ativas">
    Campanhas Ativas
  </span>
</div>
```

---

## Code Examples

### HTML Structure

```html
<!-- Basic Horizontal Divider -->
<hr class="divider" />

<!-- Subtle Divider -->
<hr class="divider divider--subtle" />

<!-- Strong Divider -->
<hr class="divider divider--strong" />

<!-- Divider with Label -->
<div class="divider divider--labeled">
  <span class="divider__label">Campanhas Ativas</span>
</div>

<!-- Inset Divider (in list) -->
<ul class="list">
  <li class="list-item">Item 1</li>
  <hr class="divider divider--inset" style="--inset: 56px;" />
  <li class="list-item">Item 2</li>
</ul>

<!-- Vertical Divider -->
<div class="toolbar">
  <button>Editar</button>
  <div class="divider divider--vertical" role="separator" aria-orientation="vertical"></div>
  <button>Excluir</button>
  <div class="divider divider--vertical" role="separator" aria-orientation="vertical"></div>
  <button>Compartilhar</button>
</div>
```

### CSS Implementation

```css
/* Horizontal Divider (Default) */
.divider {
  border: none;
  border-top: 1px solid var(--neutral-200);
  margin: var(--spacing-5, 24px) 0;
  height: 0;
}

/* Subtle Variant */
.divider--subtle {
  border-top-color: var(--neutral-100);
  opacity: 0.5;
}

/* Strong Variant */
.divider--strong {
  border-top-width: 2px;
  border-top-color: var(--neutral-400);
}

/* Spacing Variants */
.divider--compact {
  margin: var(--spacing-3, 12px) 0;
}

.divider--comfortable {
  margin: var(--spacing-7, 40px) 0;
}

/* Inset Divider */
.divider--inset {
  margin-left: var(--inset, 0);
  margin-right: var(--inset, 0);
}

/* Labeled Divider */
.divider--labeled {
  display: flex;
  align-items: center;
  margin: var(--spacing-6, 32px) 0;
  text-align: center;
  color: var(--neutral-600);
}

.divider--labeled::before,
.divider--labeled::after {
  content: '';
  flex: 1;
  border-top: 1px solid var(--neutral-200);
}

.divider__label {
  padding: 0 var(--spacing-3, 12px);
  font-size: var(--fontSize-xs, 10px);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* Vertical Divider */
.divider--vertical {
  display: inline-block;
  width: 1px;
  height: 24px;
  margin: 0 var(--spacing-3, 12px);
  border: none;
  border-left: 1px solid var(--neutral-200);
  vertical-align: middle;
}

.divider--vertical.divider--subtle {
  border-left-color: var(--neutral-100);
  opacity: 0.5;
}

.divider--vertical.divider--strong {
  border-left-width: 2px;
  border-left-color: var(--neutral-400);
}

/* Responsive - Hide vertical dividers on mobile */
@media (max-width: 640px) {
  .divider--vertical {
    display: none;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .divider {
    border-top-color: var(--neutral-700);
  }

  .divider--subtle {
    border-top-color: var(--neutral-800);
  }

  .divider--strong {
    border-top-color: var(--neutral-500);
  }

  .divider__label {
    color: var(--neutral-400);
  }
}
```

---

## Usage Guidelines

### Do's
- ✅ **Use sparingly** - Too many dividers create noise
- ✅ **Match spacing** - Divider margin should relate to surrounding content
- ✅ **Use with white space** - Dividers complement spacing, not replace it
- ✅ **Choose appropriate weight** - Subtle for related, strong for unrelated
- ✅ **Align with content** - Inset dividers should align with text/icons
- ✅ **Label major sections** - Helps users understand content organization

### Don'ts
- ❌ **Don't overuse** - Not every content break needs a divider
- ❌ **Don't use instead of spacing** - White space is often better
- ❌ **Don't make too prominent** - Dividers should be subtle guides
- ❌ **Don't use decoratively** - Every divider should have purpose
- ❌ **Don't nest dividers** - One level of separation is enough
- ❌ **Don't use as borders** - Use CSS border for component edges

### When to Use vs. White Space
- **Use divider**: Between list items, form sections, toolbar groups
- **Use white space**: Between paragraphs, cards, major page sections
- **Use both**: For maximum clarity in complex layouts

---

## Related Components
- **List** - Often includes inset dividers
- **Card** - May use dividers for internal sections
- **Toolbar** - Vertical dividers between action groups
- **Form** - Dividers between field groups
- **Navigation** - Separate nav sections

---

## Design Tokens Reference

```json
{
  "divider": {
    "thickness": {
      "default": "1px",
      "strong": "2px"
    },
    "colors": {
      "subtle": "{global.color.neutral.100}",
      "default": "{global.color.neutral.200}",
      "strong": "{global.color.neutral.400}"
    },
    "spacing": {
      "compact": "{global.spacing.3}",
      "default": "{global.spacing.5}",
      "comfortable": "{global.spacing.7}"
    },
    "label": {
      "fontSize": "{global.fontSize.xs}",
      "fontWeight": "{global.fontWeight.semibold}",
      "color": "{global.color.neutral.600}",
      "textTransform": "uppercase",
      "letterSpacing": "0.05em"
    }
  }
}
```
