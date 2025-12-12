# Spacing Systems

Reference guide for the Foundations Architect agent when creating spacing and grid systems.

---

## The 8-Point Grid System

### Why 8pt?

- **Divisible**: 8 divides evenly into common screen sizes (320, 768, 1024, 1440)
- **Scalable**: Works with @2x and @3x displays
- **Intuitive**: Easy multiples (8, 16, 24, 32, 40, 48...)
- **Industry standard**: Used by Material Design, IBM Carbon, Atlassian

### Base Unit and Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | No spacing |
| `space-1` | 4px | Tight inline spacing, icons |
| `space-2` | 8px | Compact elements, icon gaps |
| `space-3` | 12px | Small padding, list items |
| `space-4` | 16px | Standard padding, form fields |
| `space-5` | 24px | Medium gaps, card padding |
| `space-6` | 32px | Large gaps, section margins |
| `space-7` | 48px | Section separators |
| `space-8` | 64px | Major section gaps |
| `space-9` | 96px | Page section separators |
| `space-10` | 128px | Hero/feature spacing |

### The 4px Half-Step

For fine-tuning (icons, tight spaces):
- Use 4px increments for small adjustments
- Reserve for specific use cases (icon padding, inline elements)
- Don't use 4px as general spacing

---

## Spacing Density Modes

### Compact (Dense)

For data-heavy interfaces:
```
Base unit: 4px
Standard padding: 8px
Gap between elements: 4-8px
```

### Default (Comfortable)

For most interfaces:
```
Base unit: 8px
Standard padding: 16px
Gap between elements: 8-16px
```

### Spacious (Airy)

For marketing, landing pages:
```
Base unit: 8px (but use larger multiples)
Standard padding: 24-32px
Gap between elements: 24-48px
```

---

## Component Spacing Patterns

### Buttons

| Aspect | Compact | Default | Large |
|--------|---------|---------|-------|
| Horizontal padding | 12px | 16px | 24px |
| Vertical padding | 8px | 12px | 16px |
| Icon gap | 8px | 8px | 12px |
| Button gap | 8px | 12px | 16px |

### Forms

| Aspect | Value | Notes |
|--------|-------|-------|
| Label to input | 4-8px | Tight association |
| Between fields | 16-24px | Clear separation |
| Input padding | 12-16px | Comfortable touch targets |
| Form sections | 32-48px | Group related fields |

### Cards

| Aspect | Compact | Default | Spacious |
|--------|---------|---------|----------|
| Inner padding | 16px | 24px | 32px |
| Content gaps | 12px | 16px | 24px |
| Card-to-card gap | 16px | 24px | 32px |

### Lists

| Aspect | Value |
|--------|-------|
| Item padding | 12-16px |
| Between items | 0 (borders) or 8px |
| Nested indent | 24-32px |

---

## Layout Grid System

### 12-Column Grid

Industry standard, highly flexible:
- Divides into 1, 2, 3, 4, 6, 12 columns
- Works for all common layouts

### Column Configuration

| Viewport | Columns | Gutter | Margin |
|----------|---------|--------|--------|
| Mobile (< 640px) | 4 | 16px | 16px |
| Tablet (640-1024px) | 8 | 24px | 24px |
| Desktop (> 1024px) | 12 | 24-32px | Auto (centered) |

### Common Layout Patterns

```
12 columns | Usage
-----------|-------
12         | Full width
6 + 6      | Two equal columns
8 + 4      | Content + sidebar
4 + 8      | Sidebar + content
4 + 4 + 4  | Three equal columns
3 + 6 + 3  | Centered content
3+3+3+3    | Four equal columns
```

### Maximum Content Width

| Content Type | Max Width | Notes |
|--------------|-----------|-------|
| Prose/Text | 65ch (~680px) | Optimal reading line length |
| Content area | 1024-1200px | Standard container |
| Full layout | 1440px | Edge-to-edge maximum |
| Ultra-wide | 1920px | Rare, specific uses |

---

## Responsive Breakpoints

### Standard Breakpoint System

| Name | Width | Usage |
|------|-------|-------|
| `xs` | 0-479px | Small phones |
| `sm` | 480-639px | Large phones |
| `md` | 640-767px | Small tablets |
| `lg` | 768-1023px | Tablets |
| `xl` | 1024-1279px | Small desktops |
| `2xl` | 1280-1535px | Large desktops |
| `3xl` | 1536px+ | Ultra-wide |

### Simplified System (Recommended)

| Name | Width | Notes |
|------|-------|-------|
| `mobile` | < 768px | Stack layouts, single column |
| `tablet` | 768-1024px | 2-column optional |
| `desktop` | > 1024px | Full multi-column |

### Mobile-First Approach

```css
/* Default: Mobile styles */
.element {
  padding: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    padding: 24px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    padding: 32px;
  }
}
```

---

## Vertical Rhythm

### Baseline Grid

Align text to consistent vertical rhythm:
- Base line-height: 24px (1.5 × 16px)
- All vertical spacing: multiples of 24px
- Creates visual harmony across page

### Section Spacing

| Section Transition | Spacing |
|--------------------|---------|
| Within section | 24-48px |
| Between sections | 64-96px |
| Page sections | 96-128px |

---

## Margin vs Padding

### When to Use Margin

- Space **between** elements
- Collapsing margins (vertical stacking)
- Pushing elements apart
- Layout-level spacing

### When to Use Padding

- Space **inside** elements
- Background/border relationship
- Clickable/touchable areas
- Content breathing room

### Spacing Direction Convention

**Single-direction margins** (more predictable):
```css
/* Prefer margin-bottom */
.element {
  margin-bottom: 16px;
}

/* Or margin-right for inline */
.inline-element {
  margin-right: 8px;
}
```

---

## Touch Target Guidelines

### Minimum Sizes

| Platform | Minimum Size | Recommended |
|----------|--------------|-------------|
| iOS | 44×44px | 48×48px |
| Android | 48×48dp | 48×48dp |
| Web (mobile) | 44×44px | 48×48px |

### Spacing Between Targets

- Minimum: 8px between touch targets
- Recommended: 16px for comfortable tapping

---

## Anti-Patterns to Avoid

| Avoid | Why | Instead |
|-------|-----|---------|
| Arbitrary pixel values | Inconsistent, hard to maintain | Use spacing tokens |
| Different spacing every time | Visual chaos | Stick to scale |
| Too tight on mobile | Touch errors | Min 44px targets |
| Mixing margin and padding randomly | Unpredictable | Consistent approach |
| Ignoring breakpoints | Poor responsive | Define and test |
| No maximum width for text | Hard to read | Max 65-75 characters |
