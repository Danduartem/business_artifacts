# Sidebar Component

**Oitavo Café Design System** | Navigation Component

---

## Overview

The Sidebar is a persistent vertical navigation component typically used in dashboard and application interfaces. For Oitavo Café, the sidebar provides quick access to key dashboard sections (ROI, Funnel, Leads, Sales) while maintaining context and allowing users to navigate without losing their current view.

**Purpose**: Provide persistent, hierarchical navigation for complex application interfaces while maximizing content area.

**Brand Alignment**: The sidebar embodies "System Over Service" by showing the integrated structure of the dashboard. It makes ROI metrics and business-critical sections immediately accessible, reflecting the brand's focus on results and transparency.

---

## Anatomy

```
┌─────────────────┐
│ [Logo]          │ ← Header
├─────────────────┤
│ ► Meu ROI       │ ← Active section
│   Leads         │
│   Vendas        │
│   Funil         │
├─────────────────┤
│ Configurações   │ ← Secondary section
│ Integrações     │
├─────────────────┤
│ [Avatar]        │ ← Footer
│ Carolina        │
│ Sair            │
└─────────────────┘
```

**Parts**:
1. **Header** - Logo or app branding
2. **Primary Navigation** - Main sections/pages
3. **Secondary Navigation** - Settings, help, etc.
4. **Active Indicator** - Visual marker for current page
5. **Footer** - User profile, logout (optional)
6. **Collapse Toggle** - Expand/collapse button (optional)

---

## Variants

### Expanded (Default)

**Use Case**: Desktop dashboards, ample screen space

```
┌────────────────────────┐
│ [Oitavo Café]          │
├────────────────────────┤
│ ► 📊 Meu ROI           │ ← Active
│   📈 Funil             │
│   👥 Leads             │
│   💰 Vendas            │
├────────────────────────┤
│   ⚙️ Configurações     │
│   🔗 Integrações       │
└────────────────────────┘
```

**Specs**:
- Width: `280px`
- Background: `white` or `neutral-50` (#F7F4F4)
- Border right: `1px solid neutral-200` (#D3CCCA)
- Item padding: `12px 24px` (spacing-4 × spacing-5)
- Item height: `48px`
- Font size: `16px`
- Font weight: `500`
- Icon size: `20×20px`
- Gap between icon and text: `12px`

### Collapsed (Icon-Only)

**Use Case**: Maximize content area, user preference

```
┌──────┐
│ [☕] │
├──────┤
│ ► 📊│ ← Active
│   📈│
│   👥│
│   💰│
├──────┤
│   ⚙️│
│   🔗│
└──────┘
```

**Specs**:
- Width: `72px`
- Same height/spacing as expanded
- Center-aligned icons
- Text hidden (aria-label for accessibility)
- Tooltip on hover showing full label
- Transition: `width 250ms ease-out`

### Rail (Ultra-Compact)

**Use Case**: Tablet, very tight spaces

```
┌───┐
│ ☕│
│ ━ │
│📊│ ← Active (colored)
│📈│
│👥│
│💰│
│ ━ │
│⚙️│
└───┘
```

**Specs**:
- Width: `56px`
- Icons only, smaller: `18×18px`
- No text ever (not even on expand)
- Minimal padding: `8px`
- Active state: Colored icon + background

### Mini (Mobile Drawer)

**Use Case**: Mobile devices (< 768px)

```
┌────────────────────────┐
│ [Oitavo Café]      [X] │
├────────────────────────┤
│ Meu ROI                │
│ Funil                  │
│ Leads                  │
│ Vendas                 │
├────────────────────────┤
│ Configurações          │
│ Integrações            │
├────────────────────────┤
│ [Avatar] Carolina      │
│ Sair                   │
└────────────────────────┘
```

**Specs**:
- Opens as overlay drawer
- Width: `80%` of viewport (max `320px`)
- Slides in from left
- Dark overlay on content area
- Closes on overlay click or item click

---

## States

### Navigation Item (Default)

**Visual**:
- Background: `transparent`
- Text color: `neutral-700` (#4A403D)
- Icon color: `neutral-600` (#685A56)
- Font weight: `500`
- Cursor: `pointer`

### Navigation Item Hover

**Visual**:
- Background: `neutral-100` (#EBE7E6)
- Text color: `primary-600` (#993A33)
- Icon color: `primary-600`
- Transition: `all 150ms ease-out`

### Navigation Item Active (Current Page)

**Visual**:
- Background: `primary-50` (#FCF3F1)
- Text color: `primary-700` (#75201C)
- Icon color: `primary-700`
- Font weight: `600`
- Left border: `4px solid primary-700`
- Border radius: `0 6px 6px 0`

### Navigation Item Focus

**Visual**:
- Outline: `2px solid primary-600`
- Outline offset: `2px`
- Border radius: `6px`

### Navigation Item with Badge

**Visual**:
- Badge: Small red dot or number
- Position: Top-right of item (absolute)
- Background: `accent-600` (#8D4C00) or semantic red
- Color: `white`
- Size: `6px` (dot) or `20×20px` (number)

### Collapsed State

**Visual**:
- Width: `280px → 72px`
- Text: Fade out (`opacity 1 → 0`)
- Icons: Stay visible
- Tooltips: Show on hover
- Transition: `250ms ease-out`

### Sidebar (Mobile Closed)

**Visual**:
- Transform: `translateX(-100%)`
- Not visible, off-screen left

### Sidebar (Mobile Open)

**Visual**:
- Transform: `translateX(0)`
- Overlay: `rgba(0,0,0,0.5)` on content
- Z-index: `1000`
- Slide animation: `250ms ease-out`

---

## Responsive Behavior

### Desktop (1440px+)
- **Expanded sidebar** (280px) by default
- Collapsible via toggle button
- User preference saved to localStorage
- Pushes main content (content width adjusts)

### Tablet (768px - 1439px)
- **Collapsed sidebar** (72px) by default
- Expands on hover (temporary)
- OR: Hidden by default, opens as drawer
- Main content full-width when closed

### Mobile (< 768px)
- **Hidden by default**
- Opens as **overlay drawer** from left
- Triggered by hamburger menu in navbar
- Full-height, 80% width (max 320px)
- Dark overlay prevents interaction with content
- Closes on:
  - Overlay click
  - Navigation item click
  - Close button (X)
  - Swipe left gesture

---

## Animation Specifications

### Expand/Collapse Animation

**Expanding (72px → 280px)**:
- Duration: `250ms`
- Easing: `cubic-bezier(0, 0, 0.2, 1)` (decelerate)
- Width: Smooth transition
- Text: Fade in after width reaches 50% (`opacity 0 → 1` in last `125ms`)
- Icons: Stay centered, shift left as width grows

**Collapsing (280px → 72px)**:
- Duration: `250ms`
- Easing: `cubic-bezier(0.4, 0, 1, 1)` (accelerate)
- Text: Fade out first (`opacity 1 → 0` in first `100ms`)
- Width: Transition after text fades
- Icons: Stay visible, move to center

### Mobile Drawer Animation

**Opening**:
- Overlay: `opacity 0 → 1` in `200ms`
- Drawer: `translateX(-100% → 0)` in `250ms`
- Easing: `cubic-bezier(0, 0, 0.2, 1)` (decelerate)
- Stagger items: Each nav item fades in with `30ms` delay

**Closing**:
- Drawer: `translateX(0 → -100%)` in `200ms`
- Overlay: `opacity 1 → 0` in `200ms`
- Easing: `cubic-bezier(0.4, 0, 1, 1)` (accelerate)

### Active Indicator Transition

**When changing pages**:
- Duration: `200ms`
- Easing: `cubic-bezier(0.4, 0, 0.6, 1)` (sharp)
- Background color: Fade in/out
- Border: Slide to new position (if using animated border)

### Item Hover

- Duration: `150ms`
- Easing: `ease-out`
- Properties: `background-color`, `color`

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .sidebar {
    transition: width 50ms;
  }
  .sidebar-item {
    transition: none;
  }
  .mobile-drawer {
    transition: transform 50ms;
  }
}
```

---

## Props / API

```typescript
interface SidebarProps {
  // Content
  logo: React.ReactNode;
  logoCollapsed?: React.ReactNode; // Icon-only logo for collapsed state
  items: SidebarSection[];
  footer?: React.ReactNode;

  // Variants
  variant?: 'expanded' | 'collapsed' | 'rail' | 'mobile';
  defaultExpanded?: boolean;

  // Behavior
  collapsible?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  persistState?: boolean; // Save to localStorage
  currentPath?: string; // Highlight active item

  // Styling
  width?: number; // Default: 280px
  collapsedWidth?: number; // Default: 72px
  background?: string;

  // Mobile
  isMobileOpen?: boolean;
  onMobileClose?: () => void;

  // Accessibility
  ariaLabel?: string; // Default: "Sidebar navigation"
}

interface SidebarSection {
  title?: string; // Optional section header
  items: SidebarItem[];
  divider?: boolean; // Show separator before section
}

interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: number | string;
  onClick?: (event: React.MouseEvent) => void;

  // Nested items (accordion)
  children?: SidebarItem[];
  defaultExpanded?: boolean;
}
```

**Example Usage**:
```tsx
<Sidebar
  logo={<OitavoCafeLogo />}
  items={[
    {
      items: [
        { id: 'roi', label: 'Meu ROI', icon: <ChartIcon />, href: '/dashboard', active: true },
        { id: 'funnel', label: 'Funil', icon: <FunnelIcon />, href: '/funnel' },
        { id: 'leads', label: 'Leads', icon: <UsersIcon />, href: '/leads', badge: 12 },
        { id: 'sales', label: 'Vendas', icon: <CurrencyIcon />, href: '/sales' }
      ]
    },
    {
      divider: true,
      items: [
        { id: 'settings', label: 'Configurações', icon: <CogIcon />, href: '/settings' },
        { id: 'integrations', label: 'Integrações', icon: <LinkIcon />, href: '/integrations' }
      ]
    }
  ]}
  collapsible={true}
  defaultExpanded={true}
  persistState={true}
/>
```

---

## Accessibility

### Semantic HTML

```html
<nav aria-label="Sidebar navigation" class="sidebar">
  <!-- Header -->
  <div class="sidebar-header">
    <a href="/" aria-label="Oitavo Café - Dashboard">
      <img src="/logo.svg" alt="Oitavo Café" />
    </a>
    <button
      aria-label="Collapse sidebar"
      aria-expanded="true"
      aria-controls="sidebar-nav"
    >
      <span class="collapse-icon"></span>
    </button>
  </div>

  <!-- Navigation -->
  <ul id="sidebar-nav" role="list" class="sidebar-nav">
    <li>
      <a
        href="/dashboard"
        aria-current="page"
        class="sidebar-item active"
      >
        <ChartIcon aria-hidden="true" />
        <span>Meu ROI</span>
      </a>
    </li>
    <li>
      <a href="/leads" class="sidebar-item">
        <UsersIcon aria-hidden="true" />
        <span>Leads</span>
        <span class="badge" aria-label="12 new leads">12</span>
      </a>
    </li>
    <!-- ... -->
  </ul>

  <!-- Footer -->
  <div class="sidebar-footer">
    <button aria-label="User menu">
      <img src="/avatar.jpg" alt="Carolina's avatar" />
      <span>Carolina</span>
    </button>
  </div>
</nav>
```

### ARIA Attributes

**Sidebar Container**:
- `<nav role="navigation" aria-label="Sidebar navigation">`
- Identifies sidebar as navigation landmark

**Collapse Toggle**:
- `aria-label="Collapse sidebar"` / `"Expand sidebar"`
- `aria-expanded="true"` / `"false"`
- `aria-controls="sidebar-nav"` (references nav list ID)

**Current Page**:
- `aria-current="page"` on active item
- Announces "current page" to screen readers

**Icons**:
- `aria-hidden="true"` on decorative icons
- Text label provides context

**Badges**:
- `aria-label="12 new leads"` for notification badges
- Hidden visually but announced

**Tooltips (Collapsed State)**:
- `role="tooltip"`
- `aria-describedby` on hovered item

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next sidebar item |
| `Shift + Tab` | Move to previous item |
| `Enter` | Activate focused item |
| `Space` | Activate focused item |
| `↓` | Move to next item (optional) |
| `↑` | Move to previous item (optional) |
| `Home` | Focus first item (optional) |
| `End` | Focus last item (optional) |

**Nested Items (Accordion)**:
| Key | Action |
|-----|--------|
| `→` | Expand collapsed parent item |
| `←` | Collapse expanded parent item |

### Focus Management

**Desktop**:
- Visible focus indicators on all items
- Focus order: Logo → Collapse toggle → Nav items → Footer

**Mobile Drawer**:
- Focus trapped within drawer when open
- Focus moves to first nav item when drawer opens
- Focus returns to menu button when drawer closes
- Body scroll locked when open

### Screen Reader Announcements

- "Sidebar navigation, landmark"
- "Link, Meu ROI, current page"
- "Link, Leads, 12 new leads"
- "Button, Collapse sidebar, expanded"
- "Section, Settings" (for dividers/headers)

---

## Brand Voice in Sidebar

### Do's ✓

**Direct, Results-Focused**:
- "Meu ROI" (not "Dashboard" or "Overview")
- "Vendas" (not "Sales Pipeline")
- "Leads qualificados" (not "Leads")
- "Investimento total" (not "Spending")

**Clear, Specific Sections**:
- "Funil de Conversão" (not just "Funnel")
- "Relatórios de ROI" (not "Reports")
- "Integrações ativas" (not "Integrations")
- "Configurações da conta" (not "Settings")

**Actionable Labels**:
- "Ver resultados" (when appropriate)
- "Gerenciar leads"
- "Configurar alertas"

### Don'ts ✗

**Avoid Generic Terms**:
- ✗ "Home"
- ✗ "Dashboard"
- ✗ "Analytics"
- ✗ "Metrics"

**Avoid Jargon**:
- ✗ "KPIs"
- ✗ "Attribution"
- ✗ "Engagement"

**Avoid Vague Labels**:
- ✗ "More"
- ✗ "Other"
- ✗ "Tools"

---

## Usage Guidelines

### When to Use

- Dashboard interfaces with 4+ main sections
- Application interfaces with complex navigation
- Multi-level hierarchical navigation
- When persistent navigation improves UX
- Authenticated user experiences

### When NOT to Use

- Marketing websites (use Navbar)
- Simple 2-3 page apps
- Mobile-first apps (prefer bottom nav)
- Content-focused sites (blogs, articles)
- When screen space is at premium

### Content Guidelines

**Navigation Organization**:
- **Primary sections first** - Most important/frequent (ROI, Sales)
- **Group related items** - Use dividers or section headers
- **Limit to 8-12 items** - More requires restructuring
- **Secondary items below** - Settings, help, profile at bottom

**Label Best Practices**:
- **1-3 words** - "Meu ROI" not "Painel de Controle de ROI"
- **Specific nouns** - "Leads", "Vendas", not "Data"
- **Consistent voice** - All in same language/formality
- **Action-oriented** - When appropriate ("Ver relatórios")

---

## Do's and Don'ts

### Visual Design

**Do**:
- Use clear active state indicator
- Provide sufficient contrast
- Align icons and text consistently
- Use subtle hover states

**Don't**:
- Over-decorate with shadows or gradients
- Make sidebar too wide (> 320px)
- Use too many colors
- Hide critical navigation

### Interaction

**Do**:
- Support expand/collapse smoothly
- Save user's preference (expanded/collapsed)
- Show tooltips in collapsed state
- Make entire item clickable (not just text)

**Don't**:
- Auto-collapse without user action
- Forget to handle nested items
- Make items too small to click
- Use animations that cause motion sickness

### Mobile

**Do**:
- Use overlay drawer pattern
- Lock body scroll when open
- Make close action obvious
- Support swipe-to-close gesture

**Don't**:
- Keep sidebar persistent on mobile
- Make drawer too narrow (< 70% width)
- Forget overlay tap-to-close
- Hide important nav on mobile

---

## Code Example

```tsx
// React + Tailwind implementation
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function Sidebar({ logo, items, collapsible = true, defaultExpanded = true, persistState = true }) {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (!persistState || typeof window === 'undefined') return defaultExpanded;
    const saved = localStorage.getItem('sidebar-expanded');
    return saved ? JSON.parse(saved) : defaultExpanded;
  });

  useEffect(() => {
    if (persistState) {
      localStorage.setItem('sidebar-expanded', JSON.stringify(isExpanded));
    }
  }, [isExpanded, persistState]);

  return (
    <nav
      aria-label="Sidebar navigation"
      className={`
        sidebar fixed left-0 top-0 h-full bg-white border-r border-neutral-200
        transition-all duration-250 ease-out z-40
        ${isExpanded ? 'w-[280px]' : 'w-[72px]'}
      `}
    >
      {/* Header */}
      <div className="sidebar-header h-20 flex items-center justify-between px-6 border-b border-neutral-200">
        <a href="/" aria-label="Oitavo Café - Dashboard">
          {isExpanded ? (
            <img src={logo} alt="Oitavo Café" className="h-10" />
          ) : (
            <img src="/logo-icon.svg" alt="Oitavo Café" className="h-8" />
          )}
        </a>

        {collapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isExpanded}
            aria-controls="sidebar-nav"
            className={`
              p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100
              transition-all duration-150
              ${!isExpanded && 'hidden'}
            `}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div id="sidebar-nav" className="sidebar-nav flex-1 overflow-y-auto py-4">
        {items.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Divider */}
            {section.divider && <hr className="my-4 border-neutral-200" />}

            {/* Section Title */}
            {section.title && isExpanded && (
              <div className="px-6 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                {section.title}
              </div>
            )}

            {/* Section Items */}
            <ul role="list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={item.active ? 'page' : undefined}
                    className={`
                      group flex items-center h-12 px-6 transition-all duration-150
                      focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-inset
                      ${item.active
                        ? 'bg-primary-50 text-primary-700 font-semibold border-l-4 border-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600'
                      }
                      ${!isExpanded && 'justify-center px-0'}
                    `}
                    title={!isExpanded ? item.label : undefined}
                  >
                    {/* Icon */}
                    {item.icon && (
                      <span
                        className={`
                          flex-shrink-0 h-5 w-5
                          ${item.active ? 'text-primary-700' : 'text-neutral-600 group-hover:text-primary-600'}
                          ${isExpanded && 'mr-3'}
                        `}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}

                    {/* Label */}
                    {isExpanded && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}

                    {/* Badge */}
                    {item.badge && isExpanded && (
                      <span
                        className="ml-auto flex-shrink-0 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-accent-600 text-white rounded-full"
                        aria-label={`${item.badge} new`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Expand Button (Collapsed State) */}
      {collapsible && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          aria-label="Expand sidebar"
          className="w-full py-4 flex justify-center text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 border-t border-neutral-200"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}
    </nav>
  );
}

// Mobile Drawer Version
export function MobileSidebar({ isOpen, onClose, logo, items }) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer */}
      <nav
        aria-label="Mobile navigation"
        className="fixed left-0 top-0 bottom-0 w-[80%] max-w-[320px] bg-white z-50 shadow-2xl animate-slideInLeft"
      >
        {/* Same content as desktop sidebar, but full-width */}
        {/* ... */}
      </nav>
    </>
  );
}
```

---

## Related Components

- **Navbar** - Horizontal site-wide navigation
- **Tabs** - Section-level navigation
- **Breadcrumb** - Hierarchical path
- **Dropdown Menu** - Contextual navigation
- **Bottom Navigation** - Mobile-first alternative

---

## References

- WAI-ARIA Authoring Practices: [Navigation Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/navigation/)
- Material Design: [Navigation Drawer](https://m3.material.io/components/navigation-drawer)
- Nielsen Norman Group: [Sidebar Navigation](https://www.nngroup.com/articles/hamburger-menus/)

---

**Component Status**: ✅ Production Ready
**Last Updated**: 2025-12-13
**Version**: 1.0.0
