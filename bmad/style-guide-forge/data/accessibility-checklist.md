# Accessibility Checklist

Reference guide for ensuring WCAG compliance across the style guide.

---

## WCAG 2.1 Compliance Levels

| Level | Description | Requirement |
|-------|-------------|-------------|
| **A** | Minimum | Must meet |
| **AA** | Standard | Recommended target |
| **AAA** | Enhanced | Gold standard |

**Target: WCAG 2.1 Level AA** (standard for most projects)

---

## Color & Contrast

### Contrast Ratios

| Element | AA Requirement | AAA Requirement |
|---------|---------------|-----------------|
| Normal text (< 18px) | 4.5:1 | 7:1 |
| Large text (≥ 18px bold, ≥ 24px) | 3:1 | 4.5:1 |
| UI components & graphics | 3:1 | 3:1 |
| Focus indicators | 3:1 | 3:1 |
| Non-text contrast | 3:1 | 3:1 |

### Calculating Contrast

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)

Where L1 = lighter color luminance
      L2 = darker color luminance
```

### Tools for Checking
- WebAIM Contrast Checker
- Chrome DevTools Accessibility
- Figma Contrast plugin
- Stark plugin

### Color Independence (1.4.1)

**Don't rely on color alone** to convey information:

| Instead of... | Use... |
|---------------|--------|
| Red text for errors | Red + icon + text label |
| Green for success | Green + checkmark icon |
| Color-coded links | Underline + color |
| Status indicators | Color + icon/text |

---

## Text & Typography

### Readable Text

| Requirement | Standard |
|-------------|----------|
| Minimum body text | 16px (1rem) |
| Line height | 1.5 minimum for body |
| Line length | 80 characters max |
| Letter spacing | Not condensed |
| Paragraph spacing | 1.5× font size minimum |

### Text Resizing

- Page must be usable at 200% zoom
- Text must reflow (no horizontal scrolling)
- No loss of content or functionality

### Language

```html
<html lang="en">
```
- Always declare page language
- Mark language changes: `<span lang="fr">Bonjour</span>`

---

## Keyboard Navigation

### Focus Management

| Key | Action |
|-----|--------|
| Tab | Move to next focusable element |
| Shift + Tab | Move to previous element |
| Enter | Activate buttons, links |
| Space | Activate buttons, toggle checkboxes |
| Arrow keys | Navigate within components |
| Escape | Close modals, cancel |

### Focus Indicators

**Requirements:**
- Visible focus ring on all interactive elements
- Minimum 3:1 contrast against adjacent colors
- 2px minimum width
- No focus suppression (`outline: none` without replacement)

```css
/* Good focus style */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Focus Order

- Logical reading order (top-to-bottom, left-to-right)
- Match visual order with DOM order
- Skip links for repetitive navigation

### Focus Trapping

When required:
- Modals (focus stays inside)
- Dropdown menus
- Autocomplete suggestions

---

## Interactive Elements

### Touch Targets

| Platform | Minimum | Recommended |
|----------|---------|-------------|
| iOS | 44×44px | 48×48px |
| Android | 48×48dp | 48×48dp |
| Web | 44×44px | 48×48px |

**Spacing between targets:** 8px minimum

### States Required

Every interactive element needs:
1. Default state
2. Hover state (`:hover`)
3. Focus state (`:focus-visible`)
4. Active/pressed state (`:active`)
5. Disabled state (`:disabled`)

### Button Accessibility

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><!-- icon --></svg>
</button>
```

- Use `<button>` not `<div>` or `<span>`
- Icon-only buttons need `aria-label`
- Hide decorative icons with `aria-hidden="true"`

---

## Forms

### Labels

```html
<!-- Method 1: Explicit label -->
<label for="email">Email address</label>
<input type="email" id="email" name="email">

<!-- Method 2: Implicit label -->
<label>
  Email address
  <input type="email" name="email">
</label>
```

**Rules:**
- Every input needs a visible label
- Labels must be programmatically associated
- Never use placeholder as the only label

### Error Handling

```html
<label for="email">Email address</label>
<input
  type="email"
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
>
<span id="email-error" class="error">
  Please enter a valid email address
</span>
```

**Requirements:**
- Identify errors clearly
- Describe how to fix them
- Don't clear form on error
- Focus first error field

### Required Fields

```html
<label for="name">
  Name <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span>
</label>
<input type="text" id="name" required aria-required="true">
```

---

## Images & Media

### Alt Text

| Image Type | Alt Text |
|------------|----------|
| Informative | Describe content and function |
| Decorative | `alt=""` (empty) |
| Functional (buttons) | Describe action |
| Complex (charts) | Brief alt + long description |

```html
<!-- Informative -->
<img src="chart.png" alt="Sales increased 25% in Q4 2024">

<!-- Decorative -->
<img src="decoration.png" alt="">

<!-- Functional -->
<button>
  <img src="search.svg" alt="Search">
</button>
```

### Icons

```html
<!-- Decorative icon (has text label) -->
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  Save
</button>

<!-- Meaningful icon (no text) -->
<button aria-label="Save document">
  <svg aria-hidden="true"><!-- icon --></svg>
</button>
```

---

## ARIA

### Common ARIA Attributes

| Attribute | Usage |
|-----------|-------|
| `aria-label` | Accessible name (when no visible text) |
| `aria-labelledby` | Reference visible label by ID |
| `aria-describedby` | Additional description (errors, hints) |
| `aria-hidden` | Hide from assistive tech |
| `aria-expanded` | Expandable content state |
| `aria-pressed` | Toggle button state |
| `aria-selected` | Selection state |
| `aria-invalid` | Error state |
| `aria-live` | Dynamic content announcements |

### ARIA Roles

| Component | Role |
|-----------|------|
| Modal | `dialog` or `alertdialog` |
| Tab container | `tablist` |
| Tab | `tab` |
| Tab content | `tabpanel` |
| Alert message | `alert` |
| Status update | `status` |
| Navigation | `navigation` |
| Search | `search` |
| Main content | `main` |

### First Rule of ARIA

> No ARIA is better than bad ARIA

Use native HTML elements when possible:
- `<button>` instead of `<div role="button">`
- `<nav>` instead of `<div role="navigation">`
- `<input type="checkbox">` instead of custom checkbox

---

## Motion & Animation

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Requirements:**
- Respect user's motion preference
- No auto-playing animations
- Pause/stop controls for motion
- No flashing (3 times/second max)

### Safe Animation Duration

| Animation Type | Max Duration |
|----------------|--------------|
| Micro-interactions | 200-300ms |
| Page transitions | 300-500ms |
| Complex animations | < 5 seconds |

---

## Semantic HTML

### Document Structure

```html
<header>
  <nav><!-- Primary navigation --></nav>
</header>

<main>
  <h1>Page Title</h1>
  <article>
    <h2>Section Heading</h2>
    <p>Content...</p>
  </article>
</main>

<aside>
  <!-- Sidebar content -->
</aside>

<footer>
  <!-- Footer content -->
</footer>
```

### Heading Hierarchy

- One `<h1>` per page
- Don't skip levels (h1 → h3)
- Use headings for structure, not styling

```html
<!-- Good -->
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>

<!-- Bad -->
<h1>Page Title</h1>
<h3>Section (skipped h2!)</h3>
```

---

## Testing Checklist

### Automated Testing
- [ ] Run axe DevTools
- [ ] Run Lighthouse accessibility audit
- [ ] Validate HTML
- [ ] Check color contrast

### Manual Testing
- [ ] Navigate entire page with keyboard only
- [ ] Test with screen reader (VoiceOver, NVDA)
- [ ] Zoom to 200% (no horizontal scroll)
- [ ] Test with reduced motion enabled
- [ ] Test without CSS (check logical order)

### Screen Reader Testing
- [ ] All images have appropriate alt text
- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Dynamic content changes are announced
- [ ] Modal focus is managed correctly

---

## Quick Reference Card

| Check | Requirement |
|-------|-------------|
| Text contrast | 4.5:1 minimum |
| Large text contrast | 3:1 minimum |
| UI contrast | 3:1 minimum |
| Focus visible | 3:1 minimum |
| Touch targets | 44×44px minimum |
| Heading order | Sequential, no skips |
| Images | Alt text or empty alt |
| Forms | Visible labels |
| Errors | Clear + fixable |
| Keyboard | All interactive elements |
| Motion | Respect reduced motion |
| Language | Declared in HTML |
