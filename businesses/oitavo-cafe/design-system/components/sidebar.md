# Sidebar Component

## Overview

**Purpose**: The sidebar provides persistent vertical navigation for multi-section applications, offering quick access to primary sections and nested sub-navigation. It supports both collapsed and expanded states to balance navigation depth with content space.

**Usage**: Use sidebar for applications with 5+ top-level sections or deep hierarchical navigation. Common in dashboards, admin panels, and content management systems.

**Brand Context**: For Oitavo Café, sidebar navigation helps Carolina move between Dashboard → Campanhas → Redes Sociais → Instagram with clear visual hierarchy showing her current location in the marketing funnel.

---

## Anatomy

```
Expanded Sidebar (Desktop):
┌──────────────────┐
│ [Logo]           │
│                  │
│ 📊 Meu ROI      │  ← Active
│ ═══════════     │
│ 📱 Campanhas    │
│   ├ Instagram   │
│   ├ Facebook    │
│   └ Email       │
│ 👥 Clientes     │
│ 📝 Conteúdo     │
│ ⚙️  Config       │
│                  │
│ [User Avatar]   │
└──────────────────┘

Collapsed Sidebar:
┌─────┐
│ [🏠] │
│ [📊]│ ← Active
│ ═══ │
│ [📱]│
│ [👥]│
│ [📝]│
│ [⚙️] │
│     │
│ [👤]│
└─────┘

Mobile Overlay:
[☰] → Opens as full-height overlay from left
```

---

## Variants

### 1. **Persistent Sidebar** (Default)
- Always visible on desktop (≥1024px)
- Collapsible via toggle button
- Width: 260px expanded, 64px collapsed
- Position: Fixed left

### 2. **Overlay Sidebar** (Mobile)
- Slides in from left on mobile/tablet
- Full-height overlay with backdrop
- Width: 280px
- Closes on outside click or nav selection

### 3. **Rail Sidebar** (Compact)
- Always collapsed, icon-only
- Expands on hover (desktop) or click (mobile)
- Width: 64px
- Shows tooltips for collapsed items

### 4. **Nested Sidebar**
- Multi-level navigation support
- Expandable sections with chevron indicators
- Indentation for hierarchy (16px per level)
- Max 3 levels recommended

---

## Sizes

### Expanded
- **Width**: `260px` (desktop), `280px` (mobile overlay)
- **Logo Height**: `40px`
- **Item Height**: `44px`
- **Icon Size**: `20px`
- **Font Size**: `fontSize.base` (16px)

### Collapsed (Rail)
- **Width**: `64px`
- **Icon Size**: `24px`
- **Item Height**: `48px`
- **No text labels** (icon + tooltip only)

---

## States

### Navigation Item - Default
- **Background**: `transparent`
- **Text Color**: `neutral-700` (#453C39)
- **Icon Color**: `neutral-600` (#685A56)
- **Font Weight**: `medium` (500)

### Navigation Item - Hover
- **Background**: `neutral-50` (#F8F5F2)
- **Text Color**: `neutral-800` (#2B2523)
- **Icon Color**: `primary-700` (#75201C)
- **Border Radius**: `borderRadius.sm` (4px)

### Navigation Item - Active
- **Background**: `primary-50` (#FCF5F4)
- **Text Color**: `primary-700` (#75201C)
- **Icon Color**: `primary-700`
- **Font Weight**: `semibold` (600)
- **Left Border**: `4px solid` `primary-700`
- **ARIA**: `aria-current="page"`

### Navigation Item - Focus
- **Outline**: `2px solid` `boxShadow.focus`
- **Outline Offset**: `2px`

### Section Header
- **Text Color**: `neutral-500` (#8A7B76)
- **Font Size**: `fontSize.xs` (10px)
- **Font Weight**: `semibold` (600)
- **Text Transform**: `uppercase`
- **Letter Spacing**: `0.05em`
- **Padding**: `spacing.3` top, `spacing.4` horizontal

---

## Props/API

```typescript
interface SidebarProps {
  logo?: string | React.ReactNode;
  logoCollapsed?: string | React.ReactNode;
  navItems: SidebarNavItem[];
  variant?: 'persistent' | 'overlay' | 'rail';
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  user?: UserInfo;
  footer?: React.ReactNode;
  className?: string;
}

interface SidebarNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  active?: boolean;
  badge?: number | string;
  children?: SidebarNavItem[];
  expanded?: boolean;
  onClick?: () => void;
}

interface UserInfo {
  name: string;
  avatar?: string;
  role?: string;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab**: Navigate between items
- **Enter/Space**: Activate link or toggle submenu
- **Arrow Up/Down**: Navigate sibling items
- **Arrow Right**: Expand submenu
- **Arrow Left**: Collapse submenu
- **Escape**: Close mobile overlay

### ARIA Attributes
```html
<nav class="sidebar" aria-label="Navegação principal">
  <button class="sidebar__toggle" aria-label="Alternar menu lateral" aria-expanded="false">
    <svg>...</svg>
  </button>

  <ul class="sidebar__nav">
    <li>
      <a href="/dashboard" class="sidebar__link sidebar__link--active" aria-current="page">
        <svg class="sidebar__icon">...</svg>
        <span>Meu ROI</span>
      </a>
    </li>
    <li>
      <button class="sidebar__link" aria-expanded="false" aria-controls="campanhas-submenu">
        <svg class="sidebar__icon">...</svg>
        <span>Campanhas</span>
        <svg class="sidebar__chevron">...</svg>
      </button>
      <ul class="sidebar__submenu" id="campanhas-submenu" hidden>
        <li><a href="/campanhas/instagram">Instagram</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

---

## Code Examples

### HTML Structure
```html
<aside class="sidebar sidebar--persistent" role="complementary" aria-label="Navegação lateral">
  <!-- Logo -->
  <div class="sidebar__header">
    <a href="/" class="sidebar__logo">
      <img src="/logo.svg" alt="Oitavo Café" class="sidebar__logo-img" />
      <span class="sidebar__logo-text">Oitavo Café</span>
    </a>
    <button class="sidebar__toggle" aria-label="Recolher menu" aria-expanded="true">
      <svg width="20" height="20">...</svg>
    </button>
  </div>

  <!-- Navigation -->
  <nav class="sidebar__nav" aria-label="Navegação principal">
    <ul class="sidebar__menu">
      <li class="sidebar__item">
        <a href="/dashboard" class="sidebar__link sidebar__link--active" aria-current="page">
          <svg class="sidebar__icon" width="20" height="20">...</svg>
          <span class="sidebar__label">Meu ROI</span>
        </a>
      </li>

      <li class="sidebar__item">
        <button class="sidebar__link" aria-expanded="true" aria-controls="campanhas-menu">
          <svg class="sidebar__icon" width="20" height="20">...</svg>
          <span class="sidebar__label">Campanhas</span>
          <svg class="sidebar__chevron" width="16" height="16">...</svg>
          <span class="sidebar__badge">3</span>
        </button>
        <ul class="sidebar__submenu" id="campanhas-menu">
          <li><a href="/campanhas/instagram" class="sidebar__sublink">Instagram</a></li>
          <li><a href="/campanhas/facebook" class="sidebar__sublink">Facebook</a></li>
          <li><a href="/campanhas/email" class="sidebar__sublink">Email Marketing</a></li>
        </ul>
      </li>
    </ul>
  </nav>

  <!-- User Footer -->
  <div class="sidebar__footer">
    <div class="sidebar__user">
      <img src="/avatar.jpg" alt="Carolina" class="sidebar__user-avatar" />
      <div class="sidebar__user-info">
        <p class="sidebar__user-name">Carolina</p>
        <p class="sidebar__user-role">Admin</p>
      </div>
    </div>
  </div>
</aside>

<!-- Mobile Backdrop -->
<div class="sidebar__backdrop" hidden></div>
```

### CSS
```css
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background: white;
  border-right: 1px solid var(--neutral-200);
  display: flex;
  flex-direction: column;
  transition: width 200ms ease-out;
  z-index: var(--zIndex-fixed, 300);
}

.sidebar--collapsed {
  width: 64px;
}

.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--neutral-200);
  height: 64px;
}

.sidebar__logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.sidebar__logo-img {
  height: 32px;
  width: 32px;
}

.sidebar--collapsed .sidebar__logo-text {
  display: none;
}

.sidebar__nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-4);
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  background: transparent;
  border: none;
  border-radius: var(--borderRadius-sm);
  color: var(--neutral-700);
  font-size: var(--fontSize-base);
  text-decoration: none;
  transition: all 150ms ease-out;
}

.sidebar__link:hover {
  background: var(--neutral-50);
  color: var(--primary-700);
}

.sidebar__link--active {
  background: var(--primary-50);
  color: var(--primary-700);
  font-weight: 600;
  border-left: 4px solid var(--primary-700);
  padding-left: calc(var(--spacing-4) - 4px);
}

.sidebar--collapsed .sidebar__label {
  display: none;
}

.sidebar__submenu {
  list-style: none;
  padding-left: var(--spacing-7);
  margin-top: var(--spacing-1);
}

.sidebar__sublink {
  display: block;
  padding: var(--spacing-2) var(--spacing-3);
  color: var(--neutral-600);
  font-size: var(--fontSize-sm);
  text-decoration: none;
  border-radius: var(--borderRadius-sm);
}

.sidebar__sublink:hover {
  background: var(--neutral-50);
  color: var(--primary-700);
}

@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
    box-shadow: var(--boxShadow-lg);
  }

  .sidebar:not([hidden]) {
    transform: translateX(0);
  }

  .sidebar__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(43, 37, 35, 0.5);
    backdrop-filter: blur(4px);
    z-index: var(--zIndex-modalBackdrop, 400);
  }
}
```

---

## Related Components
- **Navbar** - Horizontal alternative
- **Tabs** - Page-level navigation
- **Breadcrumb** - Hierarchical position
- **Accordion** - Collapsible content pattern
