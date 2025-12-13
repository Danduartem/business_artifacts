# Navbar Component

**Oitavo Café Design System** | Navigation Component

---

## Overview

The Navbar (Navigation Bar) is the primary navigation component that appears at the top of every page. It provides access to main site sections, brand identity, and key actions. For Oitavo Café, the navbar guides users through the conversion funnel: Social → Landing → Email → Sale.

**Purpose**: Provide consistent, accessible site-wide navigation and reinforce brand identity across all pages.

**Brand Alignment**: The navbar embodies "System Over Service" by showing the integrated journey. It reflects brand confidence through clear CTAs and builds trust through transparency (pricing/investment visible upfront).

---

## Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]  Como funciona  Casos reais  Investimento  [Falar com a gente] │
│   ^           ^             ^            ^              ^        │
│  Brand    Nav Link      Nav Link     Nav Link        CTA        │
└─────────────────────────────────────────────────────────────────┘
```

**Desktop Parts**:
1. **Logo** - Brand mark, links to homepage
2. **Navigation Links** - Main site sections
3. **Primary CTA** - High-contrast action button
4. **Container** - Full-width or max-width wrapper

**Mobile Parts** (< 768px):
```
┌─────────────────────────────────┐
│  [Logo]              [☰ Menu]   │  ← Header
└─────────────────────────────────┘
│  Como funciona                  │  ← Drawer
│  Casos reais                    │    (opened)
│  Investimento                   │
│  ─────────────────              │
│  [Falar com a gente]            │
└─────────────────────────────────┘
```

---

## Variants

### Standard (Marketing Site)

**Use Case**: Public-facing pages, pre-auth

```
┌────────────────────────────────────────────────────────────┐
│ [Oitavo Café]  Como funciona  Casos reais  Investimento   [Falar com a gente] │
└────────────────────────────────────────────────────────────┘
```

**Specs**:
- Height: `80px` (desktop), `64px` (mobile)
- Background: `support-50` (#F8F4F2) or `white`
- Border bottom: `1px solid neutral-200` (#D3CCCA)
- Logo height: `40px`
- Link font size: `16px`
- Link font weight: `500`
- Link color: `neutral-700` (#4A403D)
- Link hover color: `primary-600` (#993A33)
- Gap between links: `32px`
- CTA button: Primary variant (accent-600)

### Dashboard (Authenticated)

**Use Case**: Post-login, app interface

```
┌────────────────────────────────────────────────────────────┐
│ [Logo]  Meu ROI  Funil  Leads  Vendas     [👤 Carolina ▼] │
└────────────────────────────────────────────────────────────┘
```

**Specs**:
- Height: `72px`
- Background: `white`
- Box shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Active link indicator: `3px` bottom border in `primary-700`
- User menu: Avatar + name + dropdown

### Sticky (Scroll-Adaptive)

**Use Case**: Long pages, improves navigation access

**Behavior**:
- Starts at full height (`80px`)
- After scroll > 100px, shrinks to `64px` (20% reduction)
- Logo scales to `32px`
- Background gains subtle shadow
- Animates smoothly (300ms)

**Specs**:
- Position: `sticky`, `top: 0`
- Z-index: `1000`
- Transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`
- Shrunk shadow: `0 2px 8px rgba(0,0,0,0.08)`

### Transparent (Hero Overlay)

**Use Case**: Landing pages with hero images

```
[White Logo]  Como funciona  Casos reais  [White CTA]
             (white text over hero image)
```

**Specs**:
- Background: `transparent` initially
- Logo: White variant
- Text color: `white` or `support-50`
- Text shadow: `0 1px 3px rgba(0,0,0,0.3)` for legibility
- Becomes opaque/colored on scroll

---

## States

### Navigation Link (Default)

**Visual**:
- Text color: `neutral-700` (#4A403D)
- Font weight: `500`
- Text decoration: `none`
- Cursor: `pointer`

### Navigation Link Hover

**Visual**:
- Text color: `primary-600` (#993A33)
- Transition: `color 150ms ease-out`
- Optional: Underline animation (slide in from center)

### Navigation Link Active (Current Page)

**Visual**:
- Text color: `primary-700` (#75201C)
- Font weight: `600`
- Bottom border: `3px solid primary-700`
- Border position: `bottom`, offset `-1px` (overlaps navbar border)

### Navigation Link Focus

**Visual**:
- Outline: `2px solid primary-600`
- Outline offset: `4px`
- Border radius: `4px`

### Mobile Menu (Closed)

**Visual**:
- Hamburger icon: 3 lines, `neutral-700`
- Size: `24×24px`
- Background: `transparent`
- Aria-label: "Abrir menu"

### Mobile Menu (Open)

**Visual**:
- Drawer slides in from right
- Background: `white`
- Overlay: `rgba(0,0,0,0.5)`
- Close icon: X, `neutral-700`
- Animation: `250ms ease-out`

---

## Responsive Behavior

### Desktop (1440px+)
- Full horizontal layout
- All links visible
- Logo + Links + CTA in single row
- Container max-width: `1312px` (centered)
- Padding: `0 64px`

### Tablet (768px - 1439px)
- Horizontal layout maintained
- Reduced link gaps: `24px`
- Container padding: `0 32px`
- Font size: `15px`

### Mobile (< 768px)
- **Hamburger menu** (3-line icon)
- Logo left, menu button right
- Drawer navigation (full-height slide-in)
- Stack links vertically in drawer
- CTA at bottom of drawer (prominent)
- Touch target: `48×48px` minimum

**Mobile Menu Behavior**:
- Opens from right side
- Covers full viewport width (or 80%)
- Body scroll locked when open
- Closes on overlay click or X button
- Smooth slide animation (250ms)

---

## Animation Specifications

### Sticky Shrink Animation

**Trigger**: Scroll position > 100px

```css
/* Initial state */
.navbar {
  height: 80px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrolled state */
.navbar.scrolled {
  height: 64px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.navbar-logo {
  height: 40px;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled .navbar-logo {
  height: 32px;
}
```

**Duration**: `300ms`
**Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (standard)
**Properties**: `height`, `box-shadow`, `logo height`

### Mobile Drawer Animation

**Opening**:
- Overlay: `opacity 0 → 1` in `200ms`
- Drawer: `translateX(100% → 0)` in `250ms`
- Easing: `cubic-bezier(0, 0, 0.2, 1)` (decelerate)
- Stagger links: Each link fades in with `50ms` delay

**Closing**:
- Drawer: `translateX(0 → 100%)` in `200ms`
- Overlay: `opacity 1 → 0` in `200ms`
- Easing: `cubic-bezier(0.4, 0, 1, 1)` (accelerate)

### Link Hover Underline

**Animation**:
```css
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-primary-600);
  transition: all 200ms ease-out;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}
```

**Duration**: `200ms`
**Easing**: `ease-out`
**Effect**: Underline grows from center outward

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .navbar,
  .navbar-logo,
  .mobile-drawer {
    transition-duration: 50ms;
  }

  .nav-link::after {
    transition: none;
  }
}
```

---

## Props / API

```typescript
interface NavbarProps {
  // Content
  logo: React.ReactNode;
  logoHref?: string; // Default: '/'
  links: NavLink[];
  cta?: CTAConfig;

  // Variants
  variant?: 'standard' | 'dashboard' | 'transparent';
  sticky?: boolean;
  shrinkOnScroll?: boolean; // For sticky variant

  // User (Dashboard variant)
  user?: UserConfig;

  // Styling
  background?: 'white' | 'cream' | 'transparent';
  maxWidth?: 'full' | 'container'; // Default: 'container'

  // Behavior
  currentPath?: string; // Highlight active link
  onLogoClick?: () => void;

  // Accessibility
  ariaLabel?: string; // Default: "Main navigation"
}

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean; // Opens in new tab
  onClick?: (event: React.MouseEvent) => void;
}

interface CTAConfig {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'accent'; // Button variant
}

interface UserConfig {
  name: string;
  avatar?: string;
  menuItems: MenuItem[];
}

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean; // Show separator before item
}
```

**Example Usage**:
```tsx
<Navbar
  logo={<OitavoCafeLogo />}
  links={[
    { label: 'Como funciona', href: '/how-it-works' },
    { label: 'Casos reais', href: '/case-studies' },
    { label: 'Investimento', href: '/pricing' }
  ]}
  cta={{
    label: 'Falar com a gente',
    href: '/contact',
    variant: 'accent'
  }}
  sticky={true}
  shrinkOnScroll={true}
/>
```

---

## Accessibility

### Semantic HTML

```html
<nav aria-label="Main navigation" role="navigation">
  <div class="navbar-container">
    <!-- Logo -->
    <a href="/" aria-label="Oitavo Café - Home">
      <img src="/logo.svg" alt="Oitavo Café" />
    </a>

    <!-- Desktop Links -->
    <ul class="navbar-links" role="list">
      <li><a href="/how-it-works">Como funciona</a></li>
      <li><a href="/case-studies">Casos reais</a></li>
      <li><a href="/pricing" aria-current="page">Investimento</a></li>
    </ul>

    <!-- CTA -->
    <a href="/contact" class="navbar-cta">Falar com a gente</a>

    <!-- Mobile Menu Button -->
    <button
      aria-label="Abrir menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
      class="mobile-menu-button"
    >
      <span class="hamburger-icon"></span>
    </button>
  </div>
</nav>
```

### ARIA Attributes

**Navigation Container**:
- `<nav role="navigation" aria-label="Main navigation">`
- Identifies primary navigation landmark

**Current Page**:
- `aria-current="page"` on active link
- Screen reader announces "current page"

**Mobile Menu Button**:
- `aria-label="Abrir menu"` / `"Fechar menu"`
- `aria-expanded="false"` / `"true"`
- `aria-controls="mobile-menu"` (references drawer ID)

**Mobile Drawer**:
- `id="mobile-menu"`
- `aria-modal="true"` (when open)
- `role="dialog"`
- `aria-label="Menu de navegação"`

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next nav link |
| `Shift + Tab` | Move to previous link |
| `Enter` | Activate focused link |
| `Esc` | Close mobile menu (if open) |

### Focus Management

**Desktop**:
- Visible focus indicators on all links
- Skip to main content link (before navbar)

**Mobile Menu**:
- Focus trapped within drawer when open
- Focus moves to first link when menu opens
- Focus returns to menu button when closed
- Body scroll locked when drawer open

### Screen Reader Support

- Announces: "Main navigation, landmark"
- Announces: "Link, Como funciona"
- Announces: "Link, Investimento, current page"
- Announces: "Button, Open menu" (mobile)
- Announces: "Dialog, Navigation menu" (mobile drawer)

---

## Brand Voice in Navigation

### Do's ✓

**Direct, Results-Focused**:
- "Meu ROI" (not "Dashboard")
- "Investimento" (not "Pricing" or "Plans")
- "Falar com a gente" (not "Contact Us")
- "Como funciona" (not "About" or "How It Works")

**Conversational, Approachable**:
- "Casos reais" (not "Case Studies")
- "Ver resultados" (not "View Analytics")
- "Minha conta" (not "Account Settings")

**Clear CTAs**:
- "Começar agora" (not "Get Started")
- "Falar com especialista" (not "Contact Sales")
- "Ver meu ROI" (not "Login")

### Don'ts ✗

**Avoid Corporate Jargon**:
- ✗ "Solutions"
- ✗ "Platform"
- ✗ "Enterprise"
- ✗ "Resources"

**Avoid Vague Terms**:
- ✗ "Services"
- ✗ "Products"
- ✗ "Offerings"

**Avoid Generic Labels**:
- ✗ "Home"
- ✗ "About"
- ✗ "Contact"
- ✗ "Login"

---

## Usage Guidelines

### When to Use

- Every page on the site (consistency)
- Marketing site (public pages)
- Dashboard/app (authenticated pages)
- Documentation or help sections

### When NOT to Use

- Inside modals or dialogs
- Print layouts
- Embedded widgets
- Full-screen experiences (video, presentations)

### Content Guidelines

**Link Organization**:
- **Limit to 4-6 main links** - More creates decision paralysis
- **Logical order** - Follow user journey or importance
- **Group related items** - Use dropdowns for sub-navigation
- **Prominent CTA** - 1 primary action, right-aligned

**Link Labels**:
- **1-3 words** - "Como funciona" not "Saiba como nosso sistema funciona"
- **Action-oriented** - When appropriate ("Ver casos", "Falar conosco")
- **Consistent voice** - All in same language/tone

---

## Do's and Don'ts

### Visual Design

**Do**:
- Keep navbar height proportional (5-8% of viewport)
- Use sufficient contrast for text
- Make logo prominent but not overwhelming
- Ensure CTA stands out visually

**Don't**:
- Over-design with gradients or heavy shadows
- Use too many colors or styles
- Make navbar taller than 100px
- Hide critical links in submenus

### Interaction

**Do**:
- Provide clear hover/focus states
- Make click targets large enough (44×44px)
- Keep navbar visible (sticky) on scroll
- Support keyboard navigation fully

**Don't**:
- Use mega-menus for simple sites
- Auto-hide navbar on scroll down
- Use dropdowns for single items
- Make mobile menu hard to close

### Mobile

**Do**:
- Use hamburger menu for 4+ links
- Make drawer easy to dismiss (X, overlay click, swipe)
- Lock body scroll when menu open
- Show CTA prominently in drawer

**Don't**:
- Use tiny mobile menu button
- Hide logo on mobile
- Make drawer too narrow (< 80% width)
- Forget to handle landscape orientation

---

## Code Example

```tsx
// React + Tailwind implementation
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export function Navbar({ logo, links, cta, sticky = false, shrinkOnScroll = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!shrinkOnScroll) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shrinkOnScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`
          navbar
          ${sticky ? 'sticky top-0 z-50' : ''}
          ${isScrolled ? 'h-16 shadow-md' : 'h-20'}
          bg-support-50 border-b border-neutral-200
          transition-all duration-300
        `}
      >
        <div className="max-w-[1312px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="/" aria-label="Oitavo Café - Home">
            <img
              src={logo}
              alt="Oitavo Café"
              className={`
                ${isScrolled ? 'h-8' : 'h-10'}
                transition-all duration-300
              `}
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={link.active ? 'page' : undefined}
                  className={`
                    relative text-base font-medium transition-colors duration-150
                    focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-4 rounded
                    ${link.active
                      ? 'text-primary-700 font-semibold'
                      : 'text-neutral-700 hover:text-primary-600'
                    }
                  `}
                >
                  {link.label}
                  {link.active && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-[3px] bg-primary-700" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button (Desktop) */}
          {cta && (
            <a
              href={cta.href}
              className="hidden md:inline-flex px-6 py-3 bg-accent-600 text-support-50 font-semibold rounded-md hover:bg-accent-500 transition-all duration-150 shadow-md"
            >
              {cta.label}
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-neutral-700 hover:text-primary-600"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl md:hidden animate-slideInRight"
          >
            <div className="flex flex-col h-full p-6">
              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fechar menu"
                className="self-end p-2 text-neutral-700 hover:text-primary-600 mb-8"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {/* Mobile Links */}
              <nav className="flex-1">
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={link.active ? 'page' : undefined}
                        className={`
                          block py-3 text-lg font-medium transition-colors
                          ${link.active
                            ? 'text-primary-700 font-semibold'
                            : 'text-neutral-700 hover:text-primary-600'
                          }
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile CTA */}
              {cta && (
                <a
                  href={cta.href}
                  className="w-full py-4 px-6 bg-accent-600 text-support-50 text-center font-semibold rounded-md hover:bg-accent-500 transition-all shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {cta.label}
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Animations in CSS/Tailwind
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
```

---

## Related Components

- **Sidebar** - Vertical navigation for dashboards
- **Breadcrumb** - Hierarchical navigation
- **Tabs** - Section-level navigation
- **Footer** - Bottom site-wide navigation
- **Dropdown Menu** - Nested navigation items

---

## References

- WAI-ARIA Authoring Practices: [Navigation Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/navigation/)
- Nielsen Norman Group: [Navbar Design](https://www.nngroup.com/articles/navigation-ia/)
- A11Y Project: [Skip Navigation Links](https://www.a11yproject.com/posts/skip-nav-links/)

---

**Component Status**: ✅ Production Ready
**Last Updated**: 2025-12-13
**Version**: 1.0.0
