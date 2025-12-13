# Tooltip Component

**Component Type:** Feedback (Contextual Help)
**Version:** 1.0.0
**Status:** Production Ready
**Last Updated:** 2025-12-13

---

## Overview

Tooltips are small contextual overlays that appear on hover or focus to provide brief, supplementary information about an element. They help users understand interface elements, features, or data without cluttering the UI.

**Purpose:** Provide just-in-time contextual help and additional information for interface elements.

**When to Use:**
- Explaining icon-only buttons
- Providing definitions for terms or metrics
- Showing truncated text in full
- Displaying keyboard shortcuts
- Clarifying complex UI elements
- Showing additional metadata on hover

**When NOT to Use:**
- Critical information users must see → Use visible text or **Alert**
- Long explanations → Use **Popover** or help documentation
- Interactive content → Use **Popover** instead
- Mobile-first interfaces → Touch doesn't support hover (use alternative pattern)
- Form validation errors → Use inline error messages

---

## Philosophy: Subtle Enhancement

Tooltips follow these principles:
1. **Progressive Enhancement** - Nice to have, not essential
2. **Brief and Scannable** - 1-2 lines max, no paragraphs
3. **Non-blocking** - Never interrupt user flow
4. **Discoverable** - Appear on natural interactions (hover, focus)
5. **Accessible** - Work with keyboard and screen readers

---

## Anatomy

```
                        Trigger Element
                              ↓
                         [Button 🛈]
                              │
                    ┌─────────┴─────────┐
                    │ Tooltip content   │ ← Tooltip
                    │ appears here      │
                    └───────────────────┘
                              ▲
                            Arrow
```

### Required Elements
1. **Trigger** - Element that activates tooltip (button, icon, text)
2. **Tooltip Container** - Background with content
3. **Content** - Brief text explanation

### Optional Elements
4. **Arrow/Pointer** - Visual connection to trigger
5. **Icon** - Visual indicator for help/info (ℹ️, ?, 🛈)
6. **Title** - Bold heading (for richer tooltips)

---

## Variants

### By Content Type

#### 1. Simple Tooltip
**Single line of text**

```
[Icon button]
     ↓
┌──────────────┐
│ Salvar lead  │
└──────────────┘
```

**Use Case:**
- Icon button labels
- Abbreviation definitions
- Short hints

#### 2. Rich Tooltip
**Title + description (multi-line)**

```
[Metric]
     ↓
┌─────────────────────────┐
│ ROI (Return on Invest.) │ ← Bold title
│ Quanto cada R$ investido│ ← Description
│ retorna em vendas       │
└─────────────────────────┘
```

**Use Case:**
- Complex metrics
- Feature explanations
- Detailed hints

#### 3. Keyboard Shortcut Tooltip
**Action + keyboard combo**

```
[Button]
     ↓
┌──────────────────┐
│ Salvar    ⌘S     │ ← Action + shortcut badge
└──────────────────┘
```

**Use Case:**
- Power user hints
- Keyboard shortcuts
- Command palettes

### By Position

#### Placement Options
- **Top** (default) - Below trigger, common
- **Bottom** - Above trigger
- **Left** - To right of trigger
- **Right** - To left of trigger
- **Auto** - Smart positioning (avoids viewport edges)

---

## Specifications

### Sizing

| Element | Size | Token |
|---------|------|-------|
| Max width | 240px | - |
| Min width | 80px | - |
| Padding | 8px 12px | var(--space-2) var(--space-3) |
| Border radius | 6px | var(--radius-md) |
| Arrow size | 6px (triangle) | - |
| Gap from trigger | 8px | var(--space-2) |

### Typography

| Element | Font Size | Weight | Line Height |
|---------|-----------|--------|-------------|
| Simple text | 12px (xs) | 400 (regular) | 1.4 |
| Title | 12px (xs) | 600 (semibold) | 1.4 |
| Description | 12px (xs) | 400 (regular) | 1.4 |
| Shortcut | 11px | 500 (medium) | 1 |

### Colors

**Default Theme:**
- Background: `var(--color-neutral-900)` (#1A1817)
- Text: `#FFFFFF`
- Arrow: Same as background
- Shadow: `var(--shadow-md)`

**Light Theme (Alternative):**
- Background: `#FFFFFF`
- Text: `var(--color-text-primary)` (#2B2523)
- Border: `1px solid var(--color-border-default)`

### Spacing

```
Tooltip:
  padding: 8px 12px
  gap: 4px (between title and description)

Arrow:
  distance from trigger: 8px
  size: 6px × 6px
```

---

## Behavior

### Activation

**Desktop:**
- **Mouse hover** - Appears after delay (400ms)
- **Keyboard focus** - Appears immediately on focus
- **Mouse leave** - Disappears after brief delay (100ms)
- **Focus blur** - Disappears immediately

**Mobile/Touch:**
- **Not recommended** - Touch doesn't support hover
- **Alternative:** Use tap-to-reveal pattern or inline help

### Show/Hide Timing

| Event | Delay | Reason |
|-------|-------|--------|
| Hover enter | 400ms | Avoid accidental triggers |
| Focus | 0ms | Immediate feedback for keyboard users |
| Hover leave | 100ms | Allow cursor to move to tooltip |
| Focus blur | 0ms | Immediate cleanup |

### Smart Positioning

**Auto-placement algorithm:**
1. Try preferred position (e.g., "top")
2. If tooltip exceeds viewport, try opposite side
3. If still exceeding, shift horizontally
4. Ensure arrow points to trigger center

**Priority order:**
```
Preferred: top
Fallback 1: bottom
Fallback 2: right
Fallback 3: left
```

---

## Animation Specifications

### Entry Animation
**Type:** Fade + Slight slide (from direction)

```css
@keyframes tooltip-enter-top {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tooltip[data-placement="top"] {
  animation: tooltip-enter-top 150ms var(--ease-decelerate);
}
```

**Timing:**
- Duration: 150ms
- Easing: decelerate (cubic-bezier(0, 0, 0.2, 1))
- Direction-based translate: 4px from placement direction

### Exit Animation
**Type:** Fade + Slight slide

```css
@keyframes tooltip-exit-top {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(4px);
  }
}

.tooltip-exiting[data-placement="top"] {
  animation: tooltip-exit-top 100ms var(--ease-accelerate);
}
```

**Timing:**
- Duration: 100ms (faster exit)
- Easing: accelerate (cubic-bezier(0.4, 0, 1, 1))

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .tooltip {
    animation: tooltip-fade 100ms ease;
  }

  @keyframes tooltip-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

---

## Props / API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `content` | `string \| ReactNode` | Tooltip content |
| `children` | `ReactNode` | Trigger element |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `TooltipPlacement` | `'top'` | Preferred position |
| `delay` | `number` | `400` | Show delay in ms (hover only) |
| `hideDelay` | `number` | `100` | Hide delay in ms |
| `offset` | `number` | `8` | Distance from trigger (px) |
| `arrow` | `boolean` | `true` | Show arrow pointer |
| `maxWidth` | `string` | `'240px'` | Max tooltip width |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `variant` | `'dark' \| 'light'` | `'dark'` | Color theme |
| `trigger` | `'hover' \| 'focus' \| 'both'` | `'both'` | Activation method |
| `id` | `string` | Auto | For accessibility |

### TooltipPlacement Type

```typescript
type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'auto';
```

---

## Accessibility

### ARIA Attributes

**Simple Tooltip:**
```html
<button
  aria-describedby="tooltip-save"
  onMouseEnter={showTooltip}
  onFocus={showTooltip}
>
  <SaveIcon />
</button>

<div
  role="tooltip"
  id="tooltip-save"
  className="tooltip"
>
  Salvar lead
</div>
```

**Rich Tooltip:**
```html
<span
  aria-describedby="tooltip-roi"
  tabindex="0"
>
  ROI <InfoIcon />
</span>

<div
  role="tooltip"
  id="tooltip-roi"
  className="tooltip"
>
  <strong>ROI (Return on Investment)</strong>
  <p>Quanto cada R$ investido retorna em vendas.</p>
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus trigger, show tooltip |
| `Shift+Tab` | Blur trigger, hide tooltip |
| `Escape` | Hide tooltip (when focused) |

### Screen Reader Considerations

**Tooltip vs. Label:**
- Use `aria-label` for icon button **labels** (essential)
- Use `aria-describedby` + tooltip for **additional info** (optional)

```html
<!-- ESSENTIAL label (aria-label) -->
<button aria-label="Salvar lead">
  <SaveIcon />
</button>

<!-- ADDITIONAL info (tooltip) -->
<button
  aria-label="Salvar lead"
  aria-describedby="tooltip-shortcut"
>
  <SaveIcon />
</button>
<div role="tooltip" id="tooltip-shortcut">
  Atalho: ⌘S
</div>
```

### Focus Visibility

Ensure trigger is clearly focusable:
```css
button:focus-visible {
  outline: 3px solid var(--color-primary-600);
  outline-offset: 2px;
}
```

### Touch Accessibility

**Mobile alternatives:**
- Info button that reveals content inline
- Expandable help text
- Link to help documentation

```jsx
// Mobile-friendly alternative
{isMobile ? (
  <button onClick={toggleInfo} aria-expanded={showInfo}>
    ROI <InfoIcon />
  </button>
  {showInfo && <div className="info-panel">{content}</div>}
) : (
  <Tooltip content={content}>
    ROI <InfoIcon />
  </Tooltip>
)}
```

---

## Do's and Don'ts

### Do ✓

**Do keep content brief (1-2 lines):**
```
✓ "Salvar lead"
✓ "ROI: Quanto cada R$ retorna em vendas"
```

**Do use for non-essential info:**
```
✓ Keyboard shortcuts
✓ Icon labels (with aria-label backup)
✓ Metric definitions
```

**Do provide alternative for mobile:**
```
✓ Inline help text
✓ Info button with modal
✓ Help link
```

**Do use consistent placement:**
```
✓ Top for most tooltips
✓ Same placement for similar elements
```

**Do use brand voice (when appropriate):**
```
✓ "Ops, esse dado ainda não está disponível"
✓ "Dica: você pode arrastar pra reorganizar"
```

### Don't ✗

**Don't hide critical information:**
```
✗ Error messages in tooltips
✗ Required form instructions
✓ Use visible text or alerts
```

**Don't write long paragraphs:**
```
✗ "O ROI, ou Return on Investment, é uma métrica..."
   (200 palavras)
✓ "ROI: Retorno de cada R$ investido"
```

**Don't rely on hover for mobile:**
```
✗ Tooltip as only way to access info
✓ Provide alternative pattern
```

**Don't use for interactive content:**
```
✗ Forms, buttons, links inside tooltip
✓ Use Popover component instead
```

**Don't make tooltips focusable:**
```
✗ Tooltip can receive focus
✓ Only trigger is focusable
```

---

## Brand Voice Examples

### Icon Button Labels
```
"Salvar lead"
"Editar campanha"
"Remover do funil"
"Exportar relatório"
"Compartilhar dashboard"
```

### Metric Definitions
```
"ROI: Retorno de cada R$ investido em marketing"
"CAC: Custo para conquistar cada cliente"
"LTV: Quanto cada cliente gera de receita total"
"Taxa de Conversão: % de leads que viram clientes"
```

### Helpful Tips
```
"Dica: arrasta pra reorganizar"
"Atalho: ⌘S"
"Ops, esse dado ainda não está pronto"
"Disponível em breve"
```

### Feature Hints
```
"Clique pra ver detalhes"
"Arrasta cards entre colunas"
"Filtros salvos automaticamente"
```

---

## Code Examples

### Basic Tooltip

```jsx
<Tooltip content="Salvar lead">
  <button aria-label="Salvar lead">
    <SaveIcon />
  </button>
</Tooltip>
```

### Rich Tooltip (Title + Description)

```jsx
<Tooltip
  content={
    <>
      <strong>ROI (Return on Investment)</strong>
      <p>Quanto cada R$ investido retorna em vendas</p>
    </>
  }
  maxWidth="280px"
>
  <span className="metric-label">
    ROI <InfoIcon />
  </span>
</Tooltip>
```

### Tooltip with Keyboard Shortcut

```jsx
<Tooltip
  content={
    <div className="tooltip-with-shortcut">
      <span>Salvar lead</span>
      <kbd>⌘S</kbd>
    </div>
  }
>
  <button aria-label="Salvar lead">
    <SaveIcon />
  </button>
</Tooltip>
```

### Custom Placement

```jsx
<Tooltip
  content="Adicionar ao funil"
  placement="right"
  offset={12}
>
  <button>
    <PlusIcon />
  </button>
</Tooltip>
```

### Disabled Tooltip

```jsx
<Tooltip
  content="Feature disponível em breve"
  disabled={!isFeatureEnabled}
>
  <button disabled={!isFeatureEnabled}>
    Novo recurso
  </button>
</Tooltip>
```

### Controlled Tooltip

```jsx
function ControlledTooltip() {
  const [show, setShow] = useState(false);

  return (
    <Tooltip
      content="Tooltip controlado"
      show={show}
      onShow={() => setShow(true)}
      onHide={() => setShow(false)}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

### Tooltip on Truncated Text

```jsx
<Tooltip content={fullText}>
  <div className="truncated-text">
    {fullText}
  </div>
</Tooltip>
```

---

## Implementation Notes

### Component Structure

```jsx
function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 400,
  hideDelay = 100,
  offset = 8,
  arrow = true,
  ...props
}) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(null);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Show/hide handlers with delays
  const showTooltip = useCallback(() => {
    showTimeout = setTimeout(() => setShow(true), delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => setShow(false), hideDelay);
  }, [hideDelay]);

  // Calculate position
  useEffect(() => {
    if (show && triggerRef.current && tooltipRef.current) {
      const pos = calculatePosition(
        triggerRef.current,
        tooltipRef.current,
        placement,
        offset
      );
      setPosition(pos);
    }
  }, [show, placement, offset]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby={show ? tooltipId : undefined}
      >
        {children}
      </span>

      {show && ReactDOM.createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          id={tooltipId}
          className="tooltip"
          data-placement={position?.placement}
          style={{
            top: position?.top,
            left: position?.left
          }}
        >
          {arrow && <div className="tooltip__arrow" />}
          <div className="tooltip__content">
            {content}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
```

### CSS Architecture

```css
/* Tooltip container */
.tooltip {
  position: absolute;
  z-index: var(--z-tooltip, 700);
  max-width: 240px;
  padding: 8px 12px;
  background: var(--color-neutral-900);
  color: #FFFFFF;
  font-size: 12px;
  line-height: 1.4;
  border-radius: 6px;
  box-shadow: var(--shadow-md);
  pointer-events: none;
  user-select: none;
}

/* Arrow */
.tooltip__arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

/* Arrow positions */
.tooltip[data-placement^="top"] .tooltip__arrow {
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0;
  border-color: var(--color-neutral-900) transparent transparent;
}

.tooltip[data-placement^="bottom"] .tooltip__arrow {
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 6px 6px;
  border-color: transparent transparent var(--color-neutral-900);
}

.tooltip[data-placement^="left"] .tooltip__arrow {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 0 6px 6px;
  border-color: transparent transparent transparent var(--color-neutral-900);
}

.tooltip[data-placement^="right"] .tooltip__arrow {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 6px 6px 0;
  border-color: transparent var(--color-neutral-900) transparent transparent;
}

/* Light variant */
.tooltip--light {
  background: #FFFFFF;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}

.tooltip--light .tooltip__arrow {
  border-top-color: #FFFFFF;
  filter: drop-shadow(0 -1px 0 var(--color-border-default));
}

/* Rich tooltip */
.tooltip__content strong {
  display: block;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 4px;
}

.tooltip__content p {
  margin: 0;
}

/* Keyboard shortcut badge */
.tooltip kbd {
  display: inline-block;
  padding: 2px 6px;
  margin-left: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  font-size: 11px;
  font-family: var(--font-mono);
}

/* Animations */
@keyframes tooltip-fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tooltip {
  animation: tooltip-fade-in 150ms var(--ease-decelerate);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .tooltip {
    animation-duration: 50ms;
  }
}
```

### Position Calculation Algorithm

```javascript
function calculatePosition(trigger, tooltip, placement, offset) {
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top, left;
  let finalPlacement = placement;

  // Calculate based on placement
  switch (placement) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

      // Check if tooltip exceeds top viewport
      if (top < 0) {
        finalPlacement = 'bottom';
        top = triggerRect.bottom + offset;
      }
      break;

    case 'bottom':
      top = triggerRect.bottom + offset;
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

      // Check if tooltip exceeds bottom viewport
      if (top + tooltipRect.height > viewportHeight) {
        finalPlacement = 'top';
        top = triggerRect.top - tooltipRect.height - offset;
      }
      break;

    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
      left = triggerRect.left - tooltipRect.width - offset;

      if (left < 0) {
        finalPlacement = 'right';
        left = triggerRect.right + offset;
      }
      break;

    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
      left = triggerRect.right + offset;

      if (left + tooltipRect.width > viewportWidth) {
        finalPlacement = 'left';
        left = triggerRect.left - tooltipRect.width - offset;
      }
      break;
  }

  // Constrain to viewport (horizontal)
  if (left < 8) left = 8;
  if (left + tooltipRect.width > viewportWidth - 8) {
    left = viewportWidth - tooltipRect.width - 8;
  }

  // Constrain to viewport (vertical)
  if (top < 8) top = 8;
  if (top + tooltipRect.height > viewportHeight - 8) {
    top = viewportHeight - tooltipRect.height - 8;
  }

  return {
    top: `${top}px`,
    left: `${left}px`,
    placement: finalPlacement
  };
}
```

---

## Mobile Considerations

### Touch Devices

**Problem:** Touch doesn't support hover

**Solutions:**

1. **Inline Help Text**
```jsx
<div className="metric">
  <span className="metric-label">ROI</span>
  <span className="metric-value">4.2x</span>
  <p className="metric-help">
    Quanto cada R$ investido retorna
  </p>
</div>
```

2. **Info Button with Modal**
```jsx
<button
  className="info-button"
  onClick={() => setShowModal(true)}
>
  ROI <InfoIcon />
</button>
{showModal && (
  <Modal onClose={() => setShowModal(false)}>
    <h3>ROI (Return on Investment)</h3>
    <p>Quanto cada R$ investido retorna em vendas.</p>
  </Modal>
)}
```

3. **Expandable Help**
```jsx
<details className="help-details">
  <summary>ROI 4.2x <InfoIcon /></summary>
  <p>Quanto cada R$ investido retorna em vendas</p>
</details>
```

### Responsive Pattern

```jsx
const isMobile = useMediaQuery('(max-width: 768px)');

{isMobile ? (
  <span className="inline-help">
    ROI <InfoIcon />
    <span className="help-text">
      Quanto cada R$ retorna
    </span>
  </span>
) : (
  <Tooltip content="ROI: Quanto cada R$ retorna em vendas">
    <span>ROI <InfoIcon /></span>
  </Tooltip>
)}
```

---

## Related Components

- **Popover** - For interactive/rich content
- **Alert** - For important, persistent messages
- **Help Text** - For inline form guidance
- **Modal** - For detailed help/information

---

## Resources

- Design Tokens: `/tokens.css`
- Animation Guidelines: `/style-guide.md#motion`
- Accessibility: WCAG 2.1 Level AA
- Positioning Library: Floating UI / Popper.js

---

**Component Owner:** Design System Team
**Last Review:** 2025-12-13
**Next Review:** 2026-03-13
