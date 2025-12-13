# Drawer

## Overview

Drawers are slide-out panels that appear from the edge of the screen, providing access to additional content or navigation without leaving the current context. They're ideal for mobile navigation, filters, and contextual actions.

**When to use:**
- Mobile navigation menus
- Filter panels with multiple options
- Shopping carts and side summaries
- Contextual actions and details
- Form wizards on mobile
- Settings panels

**When not to use:**
- Critical information requiring immediate attention (use Modal)
- Simple selections (use Dropdown)
- Desktop-first interfaces (consider alternatives)
- Very complex multi-step processes (use dedicated pages)

---

## Anatomy

```
┌─────────────────┬──────────────────┐
│                 │ [×] Drawer Title │ ← Header
│                 ├──────────────────┤
│                 │                  │
│                 │   Drawer Body    │ ← Scrollable content
│  Main Content   │                  │
│  (partially     │   Navigation     │
│   visible)      │   Filters        │
│                 │   Content        │
│                 │                  │
│                 ├──────────────────┤
│                 │   Drawer Footer  │ ← Actions
│                 │   [Cancel] [Apply]│
└─────────────────┴──────────────────┘
         ↑                  ↑
    Backdrop           Drawer Panel
```

**Parts:**
1. **Backdrop** - Semi-transparent overlay (optional on desktop)
2. **Panel** - The sliding drawer container
3. **Header** - Title and close button
4. **Body** - Scrollable content area
5. **Footer** - Action buttons (optional)
6. **Handle** - Drag indicator for mobile (optional)

---

## Positions

### Right (Default)

Most common, slides from right edge:

```tsx
<Drawer position="right">
  <Navigation />
</Drawer>
```

**Use for:**
- Primary navigation (mobile)
- Filters and settings
- Shopping cart
- User profile

### Left

Slides from left edge:

```tsx
<Drawer position="left">
  <Sidebar />
</Drawer>
```

**Use for:**
- Secondary navigation
- Table of contents
- Alternative layouts

### Bottom

Slides from bottom edge:

```tsx
<Drawer position="bottom">
  <MobileFilters />
</Drawer>
```

**Use for:**
- Mobile filter sheets
- Action sheets
- Share dialogs
- Quick actions

### Top

Slides from top edge (rare):

```tsx
<Drawer position="top">
  <Notifications />
</Drawer>
```

**Use for:**
- Notification panels
- Search overlays

---

## Sizes

### Narrow (280px)

Compact navigation or simple content:

```tsx
<Drawer size="narrow">
  <MobileNav />
</Drawer>
```

### Default (360px)

Standard width for most use cases:

```tsx
<Drawer size="default">
  <FilterPanel />
</Drawer>
```

### Wide (480px)

Rich content and forms:

```tsx
<Drawer size="wide">
  <DetailPanel />
</Drawer>
```

### Full

Takes full width/height:

```tsx
<Drawer size="full">
  <MobileCheckout />
</Drawer>
```

**Note:** Bottom drawers use height instead of width:
- Small: 40vh
- Default: 60vh
- Large: 80vh
- Full: 95vh

---

## Animation Sequence

### Right Drawer Opening (400ms)

**Step 1: Backdrop Fade In (300ms)**
```css
.drawer-backdrop {
  opacity: 0;
  animation: backdropFadeIn 300ms var(--ease-emphasized) forwards;
}

@keyframes backdropFadeIn {
  to {
    opacity: 1;
  }
}
```

**Step 2: Panel Slide In (400ms, simultaneous)**
```css
.drawer-panel[data-position="right"] {
  transform: translateX(100%);
  animation: drawerSlideInRight 400ms var(--ease-emphasized) forwards;
}

@keyframes drawerSlideInRight {
  to {
    transform: translateX(0);
  }
}
```

### Right Drawer Closing (300ms)

Faster exit - user has dismissed:

```css
.drawer-backdrop.closing {
  animation: backdropFadeOut 300ms var(--ease-accelerate) forwards;
}

.drawer-panel[data-position="right"].closing {
  animation: drawerSlideOutRight 300ms var(--ease-accelerate) forwards;
}

@keyframes backdropFadeOut {
  to {
    opacity: 0;
  }
}

@keyframes drawerSlideOutRight {
  to {
    transform: translateX(100%);
  }
}
```

### Other Positions

```css
/* Left */
.drawer-panel[data-position="left"] {
  transform: translateX(-100%);
}

@keyframes drawerSlideInLeft {
  to {
    transform: translateX(0);
  }
}

/* Bottom */
.drawer-panel[data-position="bottom"] {
  transform: translateY(100%);
}

@keyframes drawerSlideInBottom {
  to {
    transform: translateY(0);
  }
}

/* Top */
.drawer-panel[data-position="top"] {
  transform: translateY(-100%);
}

@keyframes drawerSlideInTop {
  to {
    transform: translateY(0);
  }
}
```

---

## Styling

### Panel Container

```css
.drawer-panel {
  position: fixed;
  background: var(--color-surface);
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  z-index: var(--z-modal); /* 500 */
}

/* Right position */
.drawer-panel[data-position="right"] {
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--drawer-width, 360px);
  max-width: 90vw;
}

/* Left position */
.drawer-panel[data-position="left"] {
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--drawer-width, 360px);
  max-width: 90vw;
}

/* Bottom position */
.drawer-panel[data-position="bottom"] {
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--drawer-height, 60vh);
  max-height: 95vh;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

/* Top position */
.drawer-panel[data-position="top"] {
  top: 0;
  left: 0;
  right: 0;
  height: var(--drawer-height, 60vh);
  max-height: 95vh;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}
```

### Header

```css
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.drawer-title {
  font-family: var(--font-primary);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
}

.drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: all 150ms var(--ease-standard);
}

.drawer-close:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}
```

### Body

```css
.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-6);
  overscroll-behavior: contain;
}

/* Custom scrollbar for better aesthetics */
.drawer-body::-webkit-scrollbar {
  width: 8px;
}

.drawer-body::-webkit-scrollbar-track {
  background: var(--color-surface-secondary);
}

.drawer-body::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}

.drawer-body::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}
```

### Footer

```css
.drawer-footer {
  display: flex;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
  background: var(--color-surface);
}

.drawer-footer button {
  flex: 1;
}
```

### Mobile Handle (Bottom Drawer)

```css
.drawer-handle {
  display: flex;
  justify-content: center;
  padding: var(--spacing-3) 0;
  cursor: grab;
}

.drawer-handle:active {
  cursor: grabbing;
}

.drawer-handle-bar {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: var(--color-border);
}
```

### Backdrop

```css
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(78, 19, 13, 0.5);
  z-index: var(--z-modal-backdrop); /* 400 */
}

/* Optional: no backdrop on desktop for persistent drawers */
@media (min-width: 1024px) {
  .drawer-backdrop.desktop-persistent {
    display: none;
  }

  .drawer-panel.desktop-persistent {
    position: relative;
    box-shadow: none;
    border-right: 1px solid var(--color-border);
  }
}
```

---

## Component API

```typescript
interface DrawerProps {
  // Visibility
  open: boolean;
  onClose: () => void;

  // Layout
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'narrow' | 'default' | 'wide' | 'full' | number;

  // Content
  title?: string;
  children: React.ReactNode;

  // Behavior
  closeOnBackdropClick?: boolean; // default: true
  closeOnEscape?: boolean; // default: true
  showBackdrop?: boolean; // default: true
  showCloseButton?: boolean; // default: true

  // Mobile features
  swipeToClose?: boolean; // default: true (bottom drawers)
  showHandle?: boolean; // default: true (bottom drawers)

  // Desktop behavior
  persistent?: boolean; // No backdrop, stays open (default: false)

  // Layout parts
  header?: React.ReactNode;
  footer?: React.ReactNode;

  // Accessibility
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;

  // Advanced
  initialFocus?: React.RefObject<HTMLElement>;
  returnFocus?: boolean; // default: true

  // Styling
  className?: string;
}
```

---

## Usage Examples

### Mobile Navigation

```tsx
import { Drawer } from '@oitavo-cafe/ui';

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        icon={<Menu />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position="right"
        size="narrow"
        title="Menu"
      >
        <nav>
          <NavLink href="/dashboard" icon={<Home />}>
            Início
          </NavLink>
          <NavLink href="/contacts" icon={<Users />}>
            Contatos
          </NavLink>
          <NavLink href="/deals" icon={<Briefcase />}>
            Negócios
          </NavLink>
          <NavLink href="/reports" icon={<BarChart />}>
            Relatórios
          </NavLink>

          <Divider />

          <NavLink href="/settings" icon={<Settings />}>
            Configurações
          </NavLink>
          <NavLink href="/logout" icon={<LogOut />}>
            Sair
          </NavLink>
        </nav>
      </Drawer>
    </>
  );
}
```

### Filter Panel

```tsx
function ProductFilters() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const handleApply = () => {
    applyFilters(filters);
    setOpen(false);
  };

  const handleClear = () => {
    setFilters({});
  };

  return (
    <>
      <Button icon={<Filter />} onClick={() => setOpen(true)}>
        Filtros {activeCount > 0 && `(${activeCount})`}
      </Button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position="right"
        title="Filtrar produtos"
      >
        <Drawer.Body>
          <FormField label="Categoria">
            <Select
              options={categories}
              value={filters.category}
              onChange={(category) =>
                setFilters({ ...filters, category })
              }
            />
          </FormField>

          <FormField label="Faixa de preço">
            <RangeSlider
              min={0}
              max={1000}
              value={filters.priceRange}
              onChange={(priceRange) =>
                setFilters({ ...filters, priceRange })
              }
            />
          </FormField>

          <FormField label="Disponibilidade">
            <CheckboxGroup
              options={availabilityOptions}
              value={filters.availability}
              onChange={(availability) =>
                setFilters({ ...filters, availability })
              }
            />
          </FormField>

          <FormField label="Avaliação mínima">
            <StarRating
              value={filters.minRating}
              onChange={(minRating) =>
                setFilters({ ...filters, minRating })
              }
            />
          </FormField>
        </Drawer.Body>

        <Drawer.Footer>
          <Button variant="ghost" onClick={handleClear}>
            Limpar filtros
          </Button>
          <Button onClick={handleApply}>
            Aplicar
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}
```

### Bottom Sheet (Mobile)

```tsx
function ShareSheet({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      position="bottom"
      size="default"
      showHandle
      swipeToClose
    >
      <Drawer.Header>
        <h2>Compartilhar</h2>
      </Drawer.Header>

      <Drawer.Body>
        <div className="share-options">
          <ShareOption icon={<Mail />} label="Email" />
          <ShareOption icon={<MessageSquare />} label="WhatsApp" />
          <ShareOption icon={<Facebook />} label="Facebook" />
          <ShareOption icon={<Twitter />} label="Twitter" />
          <ShareOption icon={<Link />} label="Copiar link" />
        </div>
      </Drawer.Body>
    </Drawer>
  );
}
```

### Shopping Cart

```tsx
function ShoppingCart() {
  const { isOpen, close, items, total } = useCart();

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      position="right"
      title={`Carrinho (${items.length})`}
    >
      <Drawer.Body>
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart />}
            title="Carrinho vazio"
            description="Adicione produtos para começar"
          />
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
        )}

        <Divider />

        <div className="cart-summary">
          <div className="summary-line">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>Frete</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="summary-line total">
            <strong>Total</strong>
            <strong>{formatPrice(total)}</strong>
          </div>
        </div>
      </Drawer.Body>

      <Drawer.Footer>
        <Button variant="ghost" onClick={close}>
          Continuar comprando
        </Button>
        <Button onClick={handleCheckout}>
          Finalizar compra
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
}
```

### Persistent Sidebar (Desktop)

```tsx
function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="app-layout">
      <Drawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        position="left"
        size="narrow"
        persistent={isDesktop}
        showBackdrop={!isDesktop}
      >
        <Sidebar />
      </Drawer>

      <main className="app-content">
        {!isDesktop && (
          <Button
            icon={<Menu />}
            onClick={() => setSidebarOpen(true)}
          />
        )}
        {/* Main content */}
      </main>
    </div>
  );
}
```

---

## Accessibility

### Focus Management

**On Open:**
1. Trap focus within drawer
2. Move focus to close button or first focusable element
3. Save reference to trigger element

**On Close:**
1. Return focus to trigger element
2. Release focus trap

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Escape` | Close drawer |
| `Tab` | Move to next focusable element (cycles within drawer) |
| `Shift + Tab` | Move to previous focusable element |

### ARIA Attributes

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="drawer-title"
  aria-describedby="drawer-description"
>
  <div class="drawer-header">
    <h2 id="drawer-title">Drawer Title</h2>
    <button aria-label="Fechar">×</button>
  </div>
  <div id="drawer-description" class="drawer-body">
    Drawer content
  </div>
</div>
```

### Touch Gestures

**Bottom drawers:**
- Swipe down to close
- Visual feedback during swipe
- Snap to open/close based on velocity and distance

```tsx
function useSwipeToClose(onClose: () => void) {
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > 0) {
      // Dragging down
      e.currentTarget.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const currentY = e.changedTouches[0].clientY;
    const diff = currentY - startY;

    if (diff > 100) { // Threshold
      onClose();
    } else {
      // Snap back
      e.currentTarget.style.transform = '';
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}
```

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .drawer-backdrop,
  .drawer-panel {
    animation-duration: 50ms;
  }

  .drawer-panel {
    transform: none;
  }

  @keyframes drawerSlideInRight,
  @keyframes drawerSlideInLeft,
  @keyframes drawerSlideInBottom,
  @keyframes drawerSlideInTop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes drawerSlideOutRight,
  @keyframes drawerSlideOutLeft,
  @keyframes drawerSlideOutBottom,
  @keyframes drawerSlideOutTop {
    to {
      opacity: 0;
    }
  }
}
```

---

## Best Practices

### Do

- Use for mobile navigation as primary pattern
- Provide clear close mechanisms (X button, backdrop, swipe)
- Keep content organized and scannable
- Use appropriate size for content
- Include footer for filter/form actions
- Consider persistent mode on desktop
- Provide visual feedback during swipe
- Use handle indicator for bottom drawers

### Don't

- Use for critical alerts (use Modal instead)
- Nest drawers inside each other
- Block content indefinitely
- Use overly wide drawers on mobile (max 90vw)
- Forget to handle keyboard navigation
- Open automatically without user action
- Use for brief content (consider Popover)
- Mix too many interaction patterns in one drawer

---

## Voice & Content

### Oitavo Café Drawer Voice

**Titles should be clear and contextual:**

**Do:**
- "Menu" (navigation)
- "Filtrar produtos"
- "Carrinho de compras"
- "Detalhes do contato"

**Don't:**
- "Options" (use Portuguese)
- "Side panel" (too technical)
- Empty titles
- Overly long titles that truncate

**Navigation labels:**
```tsx
// Good: Clear, action-oriented
<NavLink icon={<Users />}>
  Meus contatos
</NavLink>
<NavLink icon={<Settings />}>
  Configurações
</NavLink>

// Bad: Too verbose or unclear
<NavLink icon={<Users />}>
  Click here to view your contact list
</NavLink>
```

**Footer actions:**
```tsx
// Good: Clear outcomes
<Button variant="ghost">Cancelar</Button>
<Button>Aplicar filtros</Button>

// Bad: Vague
<Button>OK</Button>
<Button>Submit</Button>
```

---

## Variants

### Scrollable Header

For long titles or filters summary:

```css
.drawer-header.scrollable {
  max-height: 120px;
  overflow-y: auto;
}
```

### Detached (Desktop)

Drawer doesn't touch screen edge:

```css
@media (min-width: 1024px) {
  .drawer-panel.detached {
    top: var(--spacing-4);
    right: var(--spacing-4);
    bottom: var(--spacing-4);
    height: auto;
    border-radius: var(--radius-xl);
  }
}
```

### Nested Sections

For complex navigation:

```tsx
<Drawer.Body>
  <DrawerSection title="Principal">
    <NavLink>Dashboard</NavLink>
    <NavLink>Contatos</NavLink>
  </DrawerSection>

  <DrawerSection title="Vendas">
    <NavLink>Pipeline</NavLink>
    <NavLink>Propostas</NavLink>
  </DrawerSection>

  <DrawerSection title="Configurações">
    <NavLink>Perfil</NavLink>
    <NavLink>Equipe</NavLink>
  </DrawerSection>
</Drawer.Body>
```

---

## Mobile Optimization

### Performance

```tsx
// Lazy load drawer content
const DrawerContent = lazy(() => import('./DrawerContent'));

<Drawer open={open}>
  <Suspense fallback={<Spinner />}>
    <DrawerContent />
  </Suspense>
</Drawer>
```

### Safe Areas

Handle notches and rounded corners:

```css
.drawer-panel {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}
```

### Overscroll Prevention

```css
.drawer-body {
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
```

---

## Implementation Notes

### Body Scroll Lock

Prevent background scrolling when drawer is open:

```tsx
useEffect(() => {
  if (open) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };
}, [open]);
```

### Focus Trap

```tsx
import { useFocusTrap } from '@oitavo-cafe/ui/hooks';

function Drawer({ open, children }) {
  const drawerRef = useFocusTrap(open);

  return (
    <div ref={drawerRef} role="dialog">
      {children}
    </div>
  );
}
```

---

## Z-Index Layers

```css
.drawer-backdrop {
  z-index: var(--z-modal-backdrop); /* 400 */
}

.drawer-panel {
  z-index: var(--z-modal); /* 500 */
}
```

---

## Related Components

- **Modal** - For focused dialogs requiring attention
- **Dropdown** - For simple menus and selections
- **Popover** - For contextual information
- **Sidebar** - For persistent desktop navigation

---

**Component Status:** Ready for Implementation
**Last Updated:** 2025-12-13
**Design System:** Oitavo Café v1.0
