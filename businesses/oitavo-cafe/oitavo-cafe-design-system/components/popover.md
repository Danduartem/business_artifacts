# Popover

## Overview

Popovers are floating content containers that display rich information or interactive elements relative to a trigger element. Unlike tooltips, they can contain complex content including forms, images, and interactive controls.

**When to use:**
- Provide detailed information without leaving context
- Display rich content (images, formatted text, links)
- House simple interactive controls
- Show help text or definitions
- Display previews (contact cards, product info)

**When not to use:**
- Simple text hints (use Tooltip instead)
- Lists of actions (use Dropdown instead)
- Critical information requiring attention (use Modal)
- Content that should always be visible

---

## Anatomy

```
         Trigger Element
               ↓
         ┌─────────┐
         │  Button │
         └─────────┘
              ▲
              │ Arrow (optional)
    ┌─────────┴──────────────┐
    │ [×]  Popover Header    │
    ├────────────────────────┤
    │                        │
    │  Rich content area:    │
    │  • Text                │
    │  • Images              │
    │  • Forms               │
    │  • Interactive items   │
    │                        │
    ├────────────────────────┤
    │  Footer (optional)     │
    │  [Link] [Button]       │
    └────────────────────────┘
```

**Parts:**
1. **Trigger** - Element that opens the popover (button, icon, text)
2. **Container** - The floating panel
3. **Arrow** - Visual connector to trigger (optional)
4. **Header** - Title and close button (optional)
5. **Body** - Main content area
6. **Footer** - Actions or links (optional)

---

## Types

### Information Popover

Display read-only information:

```tsx
<Popover>
  <Popover.Trigger>
    <Button variant="ghost" icon={<Info />} />
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Header>Sobre este campo</Popover.Header>
    <Popover.Body>
      O nome fantasia é como sua empresa é conhecida
      no mercado. Pode ser diferente da razão social.
    </Popover.Body>
  </Popover.Content>
</Popover>
```

### Interactive Popover

Contains forms or controls:

```tsx
<Popover>
  <Popover.Trigger>
    <Button icon={<Filter />}>Filtros</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Header>Filtrar resultados</Popover.Header>
    <Popover.Body>
      <FormField label="Status" />
      <FormField label="Data" type="date" />
      <FormField label="Categoria" />
    </Popover.Body>
    <Popover.Footer>
      <Button variant="ghost">Limpar</Button>
      <Button variant="primary">Aplicar</Button>
    </Popover.Footer>
  </Popover.Content>
</Popover>
```

### Preview Popover

Show rich previews on hover:

```tsx
<Popover trigger="hover">
  <Popover.Trigger>
    <Avatar src={contact.avatar} />
  </Popover.Trigger>
  <Popover.Content>
    <ContactCard
      name={contact.name}
      title={contact.title}
      email={contact.email}
      phone={contact.phone}
    />
  </Popover.Content>
</Popover>
```

---

## Animation Sequence

### Opening (250ms)

**Scale & Fade In:**
```css
.popover-content {
  opacity: 0;
  transform: scale(0.95);
  transform-origin: var(--popover-origin);
  animation: popoverOpen 250ms var(--ease-decelerate) forwards;
}

@keyframes popoverOpen {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Arrow animation (if present):**
```css
.popover-arrow {
  opacity: 0;
  animation: arrowFadeIn 200ms var(--ease-standard) 50ms forwards;
}

@keyframes arrowFadeIn {
  to {
    opacity: 1;
  }
}
```

### Closing (200ms)

```css
.popover-content.closing {
  animation: popoverClose 200ms var(--ease-accelerate) forwards;
}

@keyframes popoverClose {
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

---

## Positioning

### Placement Options

12 possible placements (4 sides × 3 alignments):

**Primary placements:**
- `top` - Centered above trigger
- `right` - Centered to the right
- `bottom` - Centered below (default)
- `left` - Centered to the left

**Aligned placements:**
- `top-start`, `top-end`
- `right-start`, `right-end`
- `bottom-start`, `bottom-end`
- `left-start`, `left-end`

### Auto-Positioning

```typescript
interface PopoverPositioning {
  placement?: Placement;
  offset?: number; // Distance from trigger (default: 8px)
  autoFlip?: boolean; // Flip when no space (default: true)
  autoShift?: boolean; // Shift to stay in viewport (default: true)
  arrow?: boolean; // Show arrow indicator (default: true)
}
```

### Transform Origin

Popover scales from the side closest to trigger:

```css
/* Bottom placement - scale from top */
.popover-content[data-placement^="bottom"] {
  transform-origin: top center;
}

/* Top placement - scale from bottom */
.popover-content[data-placement^="top"] {
  transform-origin: bottom center;
}

/* Right placement - scale from left */
.popover-content[data-placement^="right"] {
  transform-origin: left center;
}

/* Left placement - scale from right */
.popover-content[data-placement^="left"] {
  transform-origin: right center;
}
```

---

## Styling

### Container

```css
.popover-content {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 360px;
  min-width: 200px;
  overflow: hidden;
}
```

### Arrow

```css
.popover-arrow {
  width: 16px;
  height: 16px;
  position: absolute;
}

.popover-arrow::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transform: rotate(45deg);
}

/* Bottom placement - arrow on top */
.popover-arrow[data-placement^="bottom"] {
  top: -8px;
}

.popover-arrow[data-placement^="bottom"]::before {
  border-bottom: none;
  border-right: none;
}

/* Top placement - arrow on bottom */
.popover-arrow[data-placement^="top"] {
  bottom: -8px;
}

.popover-arrow[data-placement^="top"]::before {
  border-top: none;
  border-left: none;
}
```

### Header

```css
.popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-border);
}

.popover-title {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.popover-close {
  padding: var(--spacing-1);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  transition: all 150ms var(--ease-standard);
}

.popover-close:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}
```

### Body

```css
.popover-body {
  padding: var(--spacing-4);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
}

/* Scrollable for long content */
.popover-body.scrollable {
  max-height: 400px;
  overflow-y: auto;
}
```

### Footer

```css
.popover-footer {
  display: flex;
  gap: var(--spacing-2);
  justify-content: flex-end;
  padding: var(--spacing-3) var(--spacing-4);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-secondary);
}
```

---

## Component API

```typescript
interface PopoverProps {
  // Trigger behavior
  trigger?: 'click' | 'hover' | 'focus'; // default: 'click'

  // Controlled state
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Positioning
  placement?: Placement;
  offset?: number;
  arrow?: boolean;
  autoFlip?: boolean;
  autoShift?: boolean;

  // Interaction
  closeOnClickOutside?: boolean; // default: true
  closeOnEscape?: boolean; // default: true
  closeOnInteractOutside?: boolean; // default: true

  // Delay (for hover trigger)
  openDelay?: number; // default: 200ms
  closeDelay?: number; // default: 300ms

  // Portal
  modal?: boolean; // Trap focus like modal (default: false)
  portal?: boolean; // Render in portal (default: true)

  // Content
  children: React.ReactNode;

  // Styling
  className?: string;
  maxWidth?: number;
}

interface PopoverContentProps {
  // Layout
  width?: number | string;
  maxHeight?: number;

  // Styling
  className?: string;

  // Content
  children: React.ReactNode;
}
```

---

## Usage Examples

### Basic Popover

```tsx
import { Popover } from '@oitavo-cafe/ui';

function HelpPopover() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button variant="ghost" icon={<HelpCircle />} />
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>Como funciona?</Popover.Header>
        <Popover.Body>
          Esta métrica mostra o total de vendas realizadas
          no período selecionado, incluindo todas as fontes
          de receita.
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
```

### Hover Popover (Preview Card)

```tsx
function ContactPreview({ contact }) {
  return (
    <Popover trigger="hover" openDelay={300}>
      <Popover.Trigger>
        <Link>{contact.name}</Link>
      </Popover.Trigger>
      <Popover.Content>
        <div className="contact-preview">
          <Avatar size="lg" src={contact.avatar} />
          <div>
            <h3>{contact.name}</h3>
            <p>{contact.title}</p>
            <p className="text-secondary">{contact.email}</p>
          </div>
          <div className="stats">
            <Stat label="Negócios" value={contact.deals} />
            <Stat label="Último contato" value={contact.lastContact} />
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
}
```

### Form Popover

```tsx
function QuickFilter() {
  const [filters, setFilters] = useState({});

  return (
    <Popover>
      <Popover.Trigger>
        <Button icon={<Filter />}>
          Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </Popover.Trigger>
      <Popover.Content width={320}>
        <Popover.Header>Filtrar lista</Popover.Header>
        <Popover.Body>
          <Select
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(status) => setFilters({ ...filters, status })}
          />
          <DateRangePicker
            label="Período"
            value={filters.dateRange}
            onChange={(dateRange) => setFilters({ ...filters, dateRange })}
          />
          <MultiSelect
            label="Tags"
            options={tagOptions}
            value={filters.tags}
            onChange={(tags) => setFilters({ ...filters, tags })}
          />
        </Popover.Body>
        <Popover.Footer>
          <Button variant="ghost" onClick={clearFilters}>
            Limpar
          </Button>
          <Button onClick={applyFilters}>
            Aplicar filtros
          </Button>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  );
}
```

### Controlled Popover

```tsx
function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <p>Content here</p>
        <Button onClick={() => setOpen(false)}>
          Close
        </Button>
      </Popover.Content>
    </Popover>
  );
}
```

---

## Accessibility

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open popover (when trigger focused) |
| `Escape` | Close popover |
| `Tab` | Navigate through focusable elements inside popover |
| `Shift + Tab` | Navigate backwards through focusable elements |

### Focus Management

**Non-Modal Popover (default):**
- Focus remains on trigger when opened
- Tab moves to next element in DOM order
- Interactive content inside popover is reachable via Tab

**Modal Popover:**
```tsx
<Popover modal>
  {/* Focus trapped inside, like a modal */}
</Popover>
```
- Focus moves to first focusable element
- Tab cycles within popover
- Escape closes popover

### ARIA Attributes

```html
<!-- Trigger -->
<button
  aria-expanded="false"
  aria-haspopup="dialog"
  aria-controls="popover-1"
>
  More info
</button>

<!-- Popover content -->
<div
  id="popover-1"
  role="dialog"
  aria-labelledby="popover-title"
  aria-describedby="popover-description"
>
  <h2 id="popover-title">Popover Title</h2>
  <p id="popover-description">Popover content...</p>
</div>
```

**For non-interactive popovers (info only):**
```html
<button
  aria-expanded="false"
  aria-describedby="info-popover"
>
  Info
</button>

<div id="info-popover" role="tooltip">
  Information content
</div>
```

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .popover-content {
    animation-duration: 50ms;
  }

  @keyframes popoverOpen {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes popoverClose {
    to {
      opacity: 0;
    }
  }

  .popover-arrow {
    animation: none;
    opacity: 1;
  }
}
```

---

## Best Practices

### Do

- Keep content concise and scannable
- Use for supplementary information
- Provide clear close mechanisms
- Position thoughtfully to avoid blocking important content
- Use hover trigger sparingly (mainly for previews)
- Include arrow for better context
- Make interactive content keyboard accessible
- Use appropriate max-width (320-400px typically)

### Don't

- Put critical information only in popovers
- Use for long-form content (consider Modal or dedicated page)
- Stack popovers
- Use for primary navigation
- Trigger automatically without user action
- Block important UI elements
- Use for time-sensitive information
- Include too many interactive elements (consider Modal instead)

---

## Voice & Content

### Oitavo Café Popover Voice

**Headers should be clear and helpful:**

**Do:**
- "Sobre este campo"
- "Como calcular?"
- "Dica: Personalize seus filtros"
- "Últimas atualizações"

**Don't:**
- "Info" (too generic)
- "Help" (use Portuguese)
- "???" (unclear)
- Long titles that wrap

**Body content should be friendly and practical:**

```tsx
// Good: Conversational and helpful
<Popover.Body>
  O pipeline mostra todas as suas oportunidades de venda
  organizadas por etapa. Arraste os cards para atualizar
  o status de cada negócio.
</Popover.Body>

// Bad: Too technical
<Popover.Body>
  Pipeline visualization component displays CRM opportunity
  records with drag-and-drop state management.
</Popover.Body>
```

---

## Variants

### Sizes

```css
/* Compact */
.popover-content.sm {
  max-width: 240px;
  font-size: var(--text-xs);
}

/* Default */
.popover-content.md {
  max-width: 360px;
}

/* Large */
.popover-content.lg {
  max-width: 480px;
}
```

### Without Header/Footer

```tsx
// Simple info popover
<Popover>
  <Popover.Trigger>
    <InfoIcon />
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Body>
      Just the content, no header needed
    </Popover.Body>
  </Popover.Content>
</Popover>
```

### Rich Content

```tsx
<Popover>
  <Popover.Trigger>
    <ProductThumbnail />
  </Popover.Trigger>
  <Popover.Content>
    <img src={product.image} alt={product.name} />
    <Popover.Body>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">{product.price}</div>
      <div className="stats">
        <Badge>{product.stock} em estoque</Badge>
        <Rating value={product.rating} />
      </div>
    </Popover.Body>
    <Popover.Footer>
      <Button variant="ghost" icon={<Eye />}>
        Ver detalhes
      </Button>
      <Button icon={<ShoppingCart />}>
        Adicionar
      </Button>
    </Popover.Footer>
  </Popover.Content>
</Popover>
```

---

## Z-Index Layers

```css
.popover-content {
  z-index: var(--z-popover); /* 600 */
}
```

**Stack order:**
- Base content: 0
- Sticky elements: 100
- Modal backdrop: 400
- Modal: 500
- Popover/Dropdown: 600
- Tooltip: 700

---

## Mobile Considerations

### Responsive Behavior

```css
@media (max-width: 767px) {
  .popover-content {
    /* Reduce max-width on mobile */
    max-width: calc(100vw - 32px);

    /* Simplify shadows for performance */
    box-shadow: var(--shadow-lg);
  }

  /* Convert to bottom sheet for complex popovers */
  .popover-content.complex {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 100vw;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    animation: slideUp 300ms var(--ease-emphasized);
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
}
```

### Touch Interactions

- Increase touch targets (min 44x44px)
- Close on backdrop tap
- Consider converting interactive popovers to full-screen on mobile

---

## Implementation Notes

### Positioning Library Integration

Recommend using a positioning library like Floating UI (formerly Popper.js):

```tsx
import { useFloating, offset, flip, shift, arrow } from '@floating-ui/react';

function Popover({ children, placement = 'bottom' }) {
  const arrowRef = useRef(null);

  const { x, y, strategy, refs, middlewareData } = useFloating({
    placement,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  return (
    <>
      <div ref={refs.setReference}>{trigger}</div>
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
      >
        {content}
        <div
          ref={arrowRef}
          style={{
            left: middlewareData.arrow?.x,
            top: middlewareData.arrow?.y,
          }}
        />
      </div>
    </>
  );
}
```

### Click Outside Handler

```tsx
function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
```

---

## Comparison with Similar Components

| Feature | Popover | Tooltip | Dropdown | Modal |
|---------|---------|---------|----------|-------|
| Complexity | Medium-High | Low | Medium | High |
| Interactive | Yes | No | Yes | Yes |
| Rich content | Yes | No | Limited | Yes |
| Trigger | Click/Hover | Hover/Focus | Click | Click |
| Blocks content | No | No | No | Yes |
| Use case | Info, Forms | Hints | Actions, Selections | Critical flows |

---

## Related Components

- **Tooltip** - For simple text hints
- **Dropdown** - For menus and selections
- **Modal** - For critical interactions
- **Drawer** - For complex side panels

---

**Component Status:** Ready for Implementation
**Last Updated:** 2025-12-13
**Design System:** Oitavo Café v1.0
