# Navbar Component

## Overview

**Purpose**: The navigation bar (navbar) serves as the primary wayfinding element, providing consistent access to top-level sections and key actions across the entire application. It establishes brand presence and user orientation.

**Usage**: Use navbar on all pages as the main horizontal navigation container. Typically contains logo, navigation links, search, user account, and primary CTA button.

**Brand Context**: For Oitavo Café, the navbar reflects the marketing funnel progression: "Meu ROI" (Dashboard), "Campanhas", "Clientes", "Conteúdo" - outcome-focused labels that speak Carolina's language. Mobile-first design ensures she can check metrics on-the-go from her phone.

---

## Anatomy

```
Desktop Navbar (≥768px):
┌──────────────────────────────────────────────────────────┐
│  [Logo]  Dashboard  Campanhas  Clientes  [🔍] [Avatar]  │
│                                                  [CTA]    │
└──────────────────────────────────────────────────────────┘

Mobile Navbar (<768px):
┌──────────────────────────────────────┐
│  [☰]  [Logo]              [Avatar]   │
└──────────────────────────────────────┘
    │
    └─► Side Drawer Menu
        ┌────────────────────┐
        │ Dashboard          │
        │ Campanhas          │
        │ Clientes           │
        │ ─────────────      │
        │ [CTA Button]       │
        │ Sair               │
        └────────────────────┘

Components:
1. Container - Full-width wrapper
2. Logo/Brand - Left-aligned, links to home
3. Navigation Links - Horizontal menu items
4. Search Bar - Optional, icon or full input
5. Actions - Right-aligned utilities
6. User Avatar - Profile menu trigger
7. CTA Button - Primary conversion action
8. Mobile Toggle - Hamburger menu icon
```

---

## Variants

### 1. **Standard Navbar** (Default)
- **Purpose**: Standard horizontal navigation for all pages
- **Specs**:
  - Height: `64px` desktop, `56px` mobile
  - Background: `white` with bottom border
  - Border: `1px solid` `neutral-200`
  - Shadow: none (flat)
  - Position: `static` or `sticky`

### 2. **Sticky Navbar**
- **Purpose**: Remains visible during scroll for constant access
- **Specs**:
  - Position: `sticky` top `0`
  - Z-index: `200` (`zIndex.sticky`)
  - Adds subtle shadow on scroll: `boxShadow.sm`
  - Smooth transition when shadow appears
  - Optional: Reduce height to 56px on scroll

### 3. **Transparent Navbar**
- **Purpose**: Hero sections, landing pages with image backgrounds
- **Specs**:
  - Background: `rgba(255, 255, 255, 0.9)` with backdrop blur
  - Position: `absolute` top `0`
  - Text color adapts to background (light/dark)
  - Becomes solid background on scroll

### 4. **Compact Navbar**
- **Purpose**: Maximize content space, minimal chrome
- **Specs**:
  - Height: `48px`
  - Smaller logo (32px vs. 40px)
  - Reduced padding: `spacing.2` (8px)
  - Font size: `fontSize.sm` (13px)
  - Use for dashboards, admin panels

---

## Sizes

### Mobile (< 640px)
- **Height**: `56px`
- **Logo Height**: `32px`
- **Font Size**: `fontSize.sm` (13px)
- **Padding**: `spacing.3` (12px) horizontal
- **Layout**: Hamburger + Logo + Avatar only
- **Nav Links**: Hidden, shown in slide-out drawer

### Tablet (640px - 1024px)
- **Height**: `60px`
- **Logo Height**: `36px`
- **Font Size**: `fontSize.base` (16px)
- **Padding**: `spacing.4` (16px) horizontal
- **Layout**: Logo + 3-4 key links + Avatar

### Desktop (≥ 1024px)
- **Height**: `64px`
- **Logo Height**: `40px`
- **Font Size**: `fontSize.base` (16px)
- **Padding**: `spacing.5` (24px) horizontal
- **Layout**: Full navigation with all links + CTA

---

## States

### Navigation Link - Default
- **Text Color**: `neutral-700` (#453C39)
- **Font Weight**: `medium` (500)
- **Text Decoration**: none
- **Padding**: `spacing.3` (12px) horizontal

### Navigation Link - Hover
- **Text Color**: `primary-700` (#75201C)
- **Background**: `neutral-50` (#F8F5F2)
- **Border Radius**: `borderRadius.sm` (4px)
- **Transition**: `all 150ms ease-out`

### Navigation Link - Active (Current Page)
- **Text Color**: `primary-700` (#75201C)
- **Font Weight**: `semibold` (600)
- **Border Bottom**: `3px solid` `primary-700`
- **ARIA**: `aria-current="page"`

### Navigation Link - Focus
- **Outline**: `2px solid` `boxShadow.focus`
- **Outline Offset**: `2px`
- **Border Radius**: `borderRadius.sm`

### Mobile Toggle (Hamburger)
- **Default**: `neutral-700` color
- **Hover**: `primary-700` color, `neutral-50` background
- **Active/Open**: Transforms to X icon
- **Size**: 24px × 24px icon in 48px × 48px touch target

### Scrolled State (Sticky)
- **Background**: `white` (solid)
- **Shadow**: `boxShadow.sm`
- **Optional**: Height reduces to 56px
- **Transition**: `all 200ms ease-out`

---

## Props/API

### TypeScript Interface

```typescript
interface NavbarProps {
  /** Logo image source or component */
  logo: string | React.ReactNode;

  /** Alt text for logo */
  logoAlt?: string;

  /** Navigation items */
  navItems: NavItem[];

  /** Right-side action items */
  actions?: React.ReactNode;

  /** Primary CTA button config */
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };

  /** User info for avatar */
  user?: {
    name: string;
    avatar?: string;
    email?: string;
  };

  /** User menu items */
  userMenuItems?: UserMenuItem[];

  /** Variant type */
  variant?: 'standard' | 'sticky' | 'transparent' | 'compact';

  /** Enable search bar */
  showSearch?: boolean;

  /** Search placeholder text */
  searchPlaceholder?: string;

  /** Mobile breakpoint (default: 768px) */
  mobileBreakpoint?: number;

  /** Additional CSS classes */
  className?: string;

  /** Callback when mobile menu opens/closes */
  onMobileMenuToggle?: (isOpen: boolean) => void;
}

interface NavItem {
  /** Display label */
  label: string;

  /** Link URL */
  href: string;

  /** Optional icon */
  icon?: React.ReactNode;

  /** Is this the current/active page? */
  active?: boolean;

  /** Badge indicator (e.g., notification count) */
  badge?: number | string;

  /** Submenu items (dropdown) */
  submenu?: NavItem[];

  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
}

interface UserMenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean; // Show divider above this item
}
```

### Example Usage

```tsx
<Navbar
  logo="/assets/oitavo-cafe-logo.svg"
  logoAlt="Oitavo Café"
  variant="sticky"
  navItems={[
    { label: 'Meu ROI', href: '/dashboard', active: true, icon: <ChartIcon /> },
    { label: 'Campanhas', href: '/campanhas', badge: 3 },
    { label: 'Clientes', href: '/clientes' },
    { label: 'Conteúdo', href: '/conteudo' }
  ]}
  cta={{
    label: 'Nova Campanha',
    onClick: () => navigate('/campanhas/nova')
  }}
  user={{
    name: 'Carolina',
    avatar: '/avatars/carolina.jpg',
    email: 'carolina@oitavocafe.com.br'
  }}
  userMenuItems={[
    { label: 'Meu Perfil', href: '/perfil', icon: <UserIcon /> },
    { label: 'Configurações', href: '/config', icon: <SettingsIcon /> },
    { label: 'Ajuda', href: '/ajuda', icon: <HelpIcon /> },
    { label: 'Sair', onClick: handleLogout, icon: <LogoutIcon />, divider: true }
  ]}
  showSearch={true}
  searchPlaceholder="Buscar campanhas..."
/>
```

---

## Accessibility

### Keyboard Navigation
- **Tab Key**: Navigate through logo, links, search, actions, avatar
- **Enter/Space**: Activate focused link or button
- **Escape**: Close mobile menu or dropdown
- **Arrow Down** (on dropdown): Open submenu
- **Arrow Up/Down** (in submenu): Navigate submenu items

### ARIA Attributes
```html
<nav class="navbar" role="navigation" aria-label="Navegação principal">
  <div class="navbar__container">
    <!-- Logo -->
    <a href="/" class="navbar__logo" aria-label="Oitavo Café - Ir para home">
      <img src="/logo.svg" alt="Oitavo Café" />
    </a>

    <!-- Mobile Toggle -->
    <button
      class="navbar__mobile-toggle"
      aria-label="Abrir menu de navegação"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <span class="hamburger-icon" aria-hidden="true"></span>
    </button>

    <!-- Navigation Links -->
    <ul class="navbar__nav" id="navbar-menu">
      <li>
        <a
          href="/dashboard"
          class="navbar__link navbar__link--active"
          aria-current="page"
        >
          Meu ROI
        </a>
      </li>
      <li>
        <a href="/campanhas" class="navbar__link">
          Campanhas
          <span class="navbar__badge" aria-label="3 novas campanhas">3</span>
        </a>
      </li>
    </ul>

    <!-- User Menu -->
    <div class="navbar__user">
      <button
        class="navbar__avatar"
        aria-label="Menu de usuário"
        aria-expanded="false"
        aria-controls="user-menu"
        aria-haspopup="true"
      >
        <img src="/avatar.jpg" alt="Carolina" />
      </button>
    </div>
  </div>
</nav>
```

### Accessibility Guidelines
- **Use `<nav>` element** with `aria-label="Navegação principal"`
- **Mark current page** with `aria-current="page"`
- **Skip link**: Provide "Skip to main content" before navbar
- **Focus management**: Trap focus in mobile menu when open
- **Contrast**: Minimum 4.5:1 for all text (WCAG AA)
- **Touch targets**: Minimum 48×48px on mobile (WCAG 2.5.5)
- **aria-expanded**: Update when dropdowns/mobile menu open/close
- **Close on outside click**: Dismiss mobile menu/dropdowns appropriately

---

## Usage Guidelines

### Do's
- ✅ **Keep navigation shallow** - Max 7 top-level items
- ✅ **Order by importance** - Most-used links first (left to right)
- ✅ **Use outcome-focused labels** - "Meu ROI" not "Dashboard"
- ✅ **Highlight current page** - Clear visual indicator
- ✅ **Make logo clickable** - Standard pattern: logo → home
- ✅ **Position CTA prominently** - Right side, high contrast
- ✅ **Test on real devices** - Mobile navigation is critical

### Don'ts
- ❌ **Don't overcrowd** - Too many links cause decision paralysis
- ❌ **Don't hide essential nav** on scroll - Use sticky instead
- ❌ **Don't use dropdown for everything** - Reserve for truly nested content
- ❌ **Don't change navbar structure** between pages - Consistency matters
- ❌ **Don't rely on hamburger alone** - Show key links on tablet+
- ❌ **Don't use carousel in navbar** - Poor UX, hidden content
- ❌ **Don't make navbar too tall** - Wastes vertical space

### Rationale
**Mobile-First Navigation**: Carolina checks metrics on her phone between meetings. The hamburger menu must be fast, with instant access to key sections.

**Outcome-Focused Labels**: "Meu ROI" > "Dashboard". "Campanhas" > "Marketing Campaigns". Use language that reflects business results, not technical features.

**Sticky vs. Fixed**: Sticky reveals on scroll up (better UX). Fixed always visible (intrusive). Auto-hide on scroll down (saves space but can disorient).

---

## Code Examples

### HTML Structure

```html
<nav class="navbar navbar--sticky" role="navigation" aria-label="Navegação principal">
  <div class="navbar__container">
    <!-- Logo -->
    <div class="navbar__brand">
      <a href="/" class="navbar__logo" aria-label="Oitavo Café - Ir para home">
        <img src="/assets/oitavo-cafe-logo.svg" alt="Oitavo Café" height="40" />
      </a>
    </div>

    <!-- Mobile Toggle -->
    <button
      class="navbar__mobile-toggle"
      aria-label="Abrir menu de navegação"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <!-- Navigation Links -->
    <ul class="navbar__nav" id="navbar-menu">
      <li class="navbar__item">
        <a href="/dashboard" class="navbar__link navbar__link--active" aria-current="page">
          <svg class="navbar__icon" width="20" height="20">...</svg>
          <span>Meu ROI</span>
        </a>
      </li>
      <li class="navbar__item">
        <a href="/campanhas" class="navbar__link">
          <span>Campanhas</span>
          <span class="navbar__badge">3</span>
        </a>
      </li>
      <li class="navbar__item">
        <a href="/clientes" class="navbar__link">
          <span>Clientes</span>
        </a>
      </li>
      <li class="navbar__item">
        <a href="/conteudo" class="navbar__link">
          <span>Conteúdo</span>
        </a>
      </li>
    </ul>

    <!-- Right Actions -->
    <div class="navbar__actions">
      <!-- Search -->
      <div class="navbar__search">
        <button class="navbar__search-toggle" aria-label="Buscar">
          <svg width="20" height="20">...</svg>
        </button>
        <!-- Search input appears on click (mobile) or always visible (desktop) -->
      </div>

      <!-- CTA Button -->
      <a href="/campanhas/nova" class="navbar__cta">
        Nova Campanha
      </a>

      <!-- User Menu -->
      <div class="navbar__user">
        <button
          class="navbar__avatar"
          aria-label="Menu de usuário"
          aria-expanded="false"
          aria-controls="user-menu"
          aria-haspopup="true"
        >
          <img src="/avatars/carolina.jpg" alt="Carolina" class="navbar__avatar-img" />
          <span class="navbar__user-name">Carolina</span>
          <svg class="navbar__chevron" width="16" height="16">...</svg>
        </button>

        <!-- Dropdown Menu -->
        <div class="navbar__dropdown" id="user-menu" hidden>
          <div class="navbar__dropdown-header">
            <p class="navbar__dropdown-name">Carolina</p>
            <p class="navbar__dropdown-email">carolina@oitavocafe.com.br</p>
          </div>
          <ul class="navbar__dropdown-menu">
            <li>
              <a href="/perfil" class="navbar__dropdown-item">
                <svg class="navbar__dropdown-icon">...</svg>
                Meu Perfil
              </a>
            </li>
            <li>
              <a href="/config" class="navbar__dropdown-item">
                <svg class="navbar__dropdown-icon">...</svg>
                Configurações
              </a>
            </li>
            <li class="navbar__dropdown-divider"></li>
            <li>
              <button class="navbar__dropdown-item" onclick="handleLogout()">
                <svg class="navbar__dropdown-icon">...</svg>
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Menu (Drawer) -->
  <div class="navbar__mobile-menu" id="mobile-menu" hidden>
    <ul class="navbar__mobile-nav">
      <li><a href="/dashboard" aria-current="page">Meu ROI</a></li>
      <li><a href="/campanhas">Campanhas <span class="badge">3</span></a></li>
      <li><a href="/clientes">Clientes</a></li>
      <li><a href="/conteudo">Conteúdo</a></li>
      <li class="divider"></li>
      <li><a href="/campanhas/nova" class="cta">Nova Campanha</a></li>
    </ul>
  </div>

  <!-- Mobile Menu Backdrop -->
  <div class="navbar__backdrop" hidden></div>
</nav>
```

### CSS Implementation

```css
/* Navbar Container */
.navbar {
  width: 100%;
  background: white;
  border-bottom: 1px solid var(--neutral-200);
  position: relative;
  z-index: var(--zIndex-sticky, 200);
}

.navbar--sticky {
  position: sticky;
  top: 0;
  transition: box-shadow 200ms ease-out;
}

.navbar--sticky.navbar--scrolled {
  box-shadow: var(--boxShadow-sm);
}

.navbar__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-desktop, 1312px);
  margin: 0 auto;
  padding: 0 var(--spacing-5, 24px);
  height: 64px;
}

/* Logo */
.navbar__brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.navbar__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.navbar__logo img {
  height: 40px;
  width: auto;
}

.navbar__logo:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 4px;
  border-radius: var(--borderRadius-sm);
}

/* Mobile Toggle */
.navbar__mobile-toggle {
  display: none; /* Show on mobile via media query */
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--borderRadius-sm);
  cursor: pointer;
  transition: all 150ms ease-out;
}

.navbar__mobile-toggle:hover {
  background: var(--neutral-50);
}

.navbar__mobile-toggle:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 2px;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--neutral-700);
  border-radius: 2px;
  transition: transform 200ms ease-out, opacity 200ms ease-out;
}

/* Hamburger Animation (to X) */
.navbar__mobile-toggle[aria-expanded="true"] .hamburger-icon span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__mobile-toggle[aria-expanded="true"] .hamburger-icon span:nth-child(2) {
  opacity: 0;
}

.navbar__mobile-toggle[aria-expanded="true"] .hamburger-icon span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Navigation Links */
.navbar__nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-2, 8px);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__item {
  position: relative;
}

.navbar__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1, 6px);
  padding: var(--spacing-3, 12px) var(--spacing-4, 16px);
  color: var(--neutral-700);
  font-size: var(--fontSize-base);
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--borderRadius-sm);
  transition: all 150ms ease-out;
}

.navbar__link:hover {
  background: var(--neutral-50);
  color: var(--primary-700);
}

.navbar__link--active {
  color: var(--primary-700);
  font-weight: 600;
  border-bottom: 3px solid var(--primary-700);
  border-radius: 0;
  margin-bottom: -1px; /* Align with navbar border */
}

.navbar__link:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 2px;
}

/* Icon */
.navbar__icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

/* Badge */
.navbar__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: var(--accent-600);
  color: white;
  font-size: var(--fontSize-xs);
  font-weight: 600;
  border-radius: 10px;
  line-height: 1;
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-3, 12px);
}

/* Search */
.navbar__search-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: var(--borderRadius-sm);
  color: var(--neutral-600);
  cursor: pointer;
  transition: all 150ms ease-out;
}

.navbar__search-toggle:hover {
  background: var(--neutral-50);
  color: var(--primary-700);
}

/* CTA Button */
.navbar__cta {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-3, 12px) var(--spacing-5, 24px);
  background: var(--accent-600);
  color: white;
  font-size: var(--fontSize-base);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--borderRadius-sm);
  box-shadow: var(--boxShadow-xs);
  transition: all 150ms ease-out;
}

.navbar__cta:hover {
  background: var(--accent-700);
  box-shadow: var(--boxShadow-sm);
  transform: translateY(-1px);
}

/* User Avatar */
.navbar__user {
  position: relative;
}

.navbar__avatar {
  display: flex;
  align-items: center;
  gap: var(--spacing-2, 8px);
  padding: var(--spacing-1, 4px) var(--spacing-2, 8px);
  background: transparent;
  border: none;
  border-radius: var(--borderRadius-md);
  cursor: pointer;
  transition: background 150ms ease-out;
}

.navbar__avatar:hover {
  background: var(--neutral-50);
}

.navbar__avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--neutral-200);
}

.navbar__user-name {
  font-size: var(--fontSize-sm);
  font-weight: 500;
  color: var(--neutral-700);
}

.navbar__chevron {
  width: 16px;
  height: 16px;
  stroke: var(--neutral-500);
  transition: transform 150ms ease-out;
}

.navbar__avatar[aria-expanded="true"] .navbar__chevron {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.navbar__dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px;
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: var(--borderRadius-md);
  box-shadow: var(--boxShadow-lg);
  padding: var(--spacing-2, 8px);
  z-index: var(--zIndex-dropdown, 100);
}

.navbar__dropdown-header {
  padding: var(--spacing-3, 12px);
  border-bottom: 1px solid var(--neutral-200);
  margin-bottom: var(--spacing-2, 8px);
}

.navbar__dropdown-name {
  font-size: var(--fontSize-base);
  font-weight: 600;
  color: var(--neutral-800);
  margin: 0 0 4px;
}

.navbar__dropdown-email {
  font-size: var(--fontSize-sm);
  color: var(--neutral-600);
  margin: 0;
}

.navbar__dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2, 8px);
  width: 100%;
  padding: var(--spacing-2, 8px) var(--spacing-3, 12px);
  background: transparent;
  border: none;
  border-radius: var(--borderRadius-sm);
  color: var(--neutral-700);
  font-size: var(--fontSize-sm);
  font-family: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background 150ms ease-out;
}

.navbar__dropdown-item:hover {
  background: var(--neutral-50);
  color: var(--primary-700);
}

.navbar__dropdown-icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.navbar__dropdown-divider {
  height: 1px;
  background: var(--neutral-200);
  margin: var(--spacing-2, 8px) 0;
}

/* Mobile Menu (Drawer) */
.navbar__mobile-menu {
  position: fixed;
  top: 56px;
  left: 0;
  width: 280px;
  height: calc(100vh - 56px);
  background: white;
  border-right: 1px solid var(--neutral-200);
  box-shadow: var(--boxShadow-lg);
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 200ms ease-out;
  z-index: var(--zIndex-modal, 500);
}

.navbar__mobile-menu:not([hidden]) {
  transform: translateX(0);
}

.navbar__mobile-nav {
  list-style: none;
  margin: 0;
  padding: var(--spacing-4, 16px);
}

.navbar__mobile-nav li {
  margin-bottom: var(--spacing-1, 4px);
}

.navbar__mobile-nav a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3, 12px) var(--spacing-4, 16px);
  color: var(--neutral-700);
  font-size: var(--fontSize-base);
  text-decoration: none;
  border-radius: var(--borderRadius-sm);
  transition: background 150ms ease-out;
}

.navbar__mobile-nav a:hover,
.navbar__mobile-nav a[aria-current="page"] {
  background: var(--neutral-50);
  color: var(--primary-700);
}

.navbar__mobile-nav .divider {
  height: 1px;
  background: var(--neutral-200);
  margin: var(--spacing-3, 12px) 0;
}

.navbar__mobile-nav .cta {
  background: var(--accent-600);
  color: white;
  font-weight: 600;
  text-align: center;
}

/* Backdrop */
.navbar__backdrop {
  position: fixed;
  top: 56px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 56px);
  background: rgba(43, 37, 35, 0.5);
  backdrop-filter: blur(4px);
  z-index: var(--zIndex-modalBackdrop, 400);
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.navbar__backdrop:not([hidden]) {
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar__container {
    height: 56px;
    padding: 0 var(--spacing-4, 16px);
  }

  .navbar__logo img {
    height: 32px;
  }

  .navbar__mobile-toggle {
    display: flex;
  }

  /* Hide desktop nav on mobile */
  .navbar__nav,
  .navbar__search,
  .navbar__cta,
  .navbar__user-name {
    display: none;
  }
}

@media (min-width: 769px) {
  /* Hide mobile elements on desktop */
  .navbar__mobile-menu,
  .navbar__backdrop {
    display: none !important;
  }
}
```

### JavaScript Behavior

```javascript
class Navbar {
  constructor(navbar) {
    this.navbar = navbar;
    this.mobileToggle = navbar.querySelector('.navbar__mobile-toggle');
    this.mobileMenu = navbar.querySelector('.navbar__mobile-menu');
    this.backdrop = navbar.querySelector('.navbar__backdrop');
    this.userAvatar = navbar.querySelector('.navbar__avatar');
    this.userDropdown = navbar.querySelector('.navbar__dropdown');
    this.lastScrollY = window.scrollY;

    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.mobileToggle && this.mobileMenu) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
      this.backdrop?.addEventListener('click', () => this.closeMobileMenu());
    }

    // User dropdown
    if (this.userAvatar && this.userDropdown) {
      this.userAvatar.addEventListener('click', () => this.toggleUserDropdown());
      document.addEventListener('click', (e) => {
        if (!this.userAvatar.contains(e.target) && !this.userDropdown.contains(e.target)) {
          this.closeUserDropdown();
        }
      });
    }

    // Sticky shadow on scroll
    if (this.navbar.classList.contains('navbar--sticky')) {
      window.addEventListener('scroll', () => this.handleScroll());
    }

    // Close dropdowns on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
        this.closeUserDropdown();
      }
    });
  }

  toggleMobileMenu() {
    const isOpen = this.mobileToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    this.mobileMenu.removeAttribute('hidden');
    this.backdrop?.removeAttribute('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  closeMobileMenu() {
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileMenu.setAttribute('hidden', '');
    this.backdrop?.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  toggleUserDropdown() {
    const isOpen = this.userAvatar.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      this.closeUserDropdown();
    } else {
      this.openUserDropdown();
    }
  }

  openUserDropdown() {
    this.userAvatar.setAttribute('aria-expanded', 'true');
    this.userDropdown.removeAttribute('hidden');
  }

  closeUserDropdown() {
    this.userAvatar.setAttribute('aria-expanded', 'false');
    this.userDropdown.setAttribute('hidden', '');
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 10) {
      this.navbar.classList.add('navbar--scrolled');
    } else {
      this.navbar.classList.remove('navbar--scrolled');
    }

    this.lastScrollY = currentScrollY;
  }
}

// Initialize
const navbar = document.querySelector('.navbar');
if (navbar) {
  new Navbar(navbar);
}
```

---

## Related Components

- **Sidebar** - Vertical alternative for primary navigation
- **Tabs** - Secondary navigation within pages
- **Breadcrumb** - Hierarchical context (complements navbar)
- **Footer** - Bottom navigation for secondary links
- **Search** - Often integrated into navbar

---

## Design Tokens Reference

```json
{
  "navbar": {
    "heights": {
      "mobile": "56px",
      "tablet": "60px",
      "desktop": "64px",
      "compact": "48px"
    },
    "logo": {
      "height": {
        "mobile": "32px",
        "desktop": "40px",
        "compact": "28px"
      }
    },
    "colors": {
      "background": "{global.color.white}",
      "border": "{global.color.neutral.200}",
      "link": {
        "default": "{global.color.neutral.700}",
        "hover": "{global.color.primary.700}",
        "active": "{global.color.primary.700}"
      }
    },
    "spacing": {
      "padding": {
        "mobile": "{global.spacing.4}",
        "desktop": "{global.spacing.5}"
      },
      "gap": "{global.spacing.2}"
    },
    "shadow": {
      "default": "none",
      "scrolled": "{global.boxShadow.sm}"
    },
    "zIndex": "{global.zIndex.sticky}",
    "motion": {
      "duration": "{global.duration.base}",
      "easing": "{global.easing.easeOut}"
    }
  }
}
```
