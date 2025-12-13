# Breadcrumb Component

## Overview

**Purpose**: Breadcrumbs provide hierarchical navigation showing the user's current location within the site structure. They enable quick navigation back to parent pages and improve discoverability.

**Usage**: Use breadcrumbs on content-heavy sites with 3+ levels of hierarchy. Display above page title on detail pages, product pages, documentation, or nested category views.

**Brand Context**: For Oitavo Café, breadcrumbs help Carolina navigate through nested reports and campaign analytics. Example: "Dashboard → Campanhas → Instagram → Post 15/Nov" - showing the path from overview to specific content details.

---

## Anatomy

```
Standard Breadcrumb:
┌────────────────────────────────────────────────────┐
│  Home  /  Campanhas  /  Redes Sociais  /  Instagram│
│  [link]   [link]        [link]           [text]    │
└────────────────────────────────────────────────────┘

With Icons:
┌────────────────────────────────────────────────────┐
│  🏠 Home  ›  📊 Dashboard  ›  📈 Métricas          │
└────────────────────────────────────────────────────┘

Components:
1. Container - <nav> with aria-label="Breadcrumb"
2. Ordered List - <ol> for semantic structure
3. Breadcrumb Items - <li> containing links
4. Separators - Visual dividers (/, >, ›, chevron)
5. Current Page - Text-only, non-clickable last item
```

---

## Variants

### 1. **Slash Separator** (Default)
- **Purpose**: Clean, minimal, universal
- **Separator**: `/` character
- **Specs**:
  - Separator color: `neutral-400` (#9B8B86)
  - Separator margin: `0 12px` (spacing.3)
  - Font weight: `regular` (400)

### 2. **Chevron Separator**
- **Purpose**: Stronger visual hierarchy, clearer direction
- **Separator**: `›` or SVG chevron icon
- **Specs**:
  - Icon size: 16px
  - Icon color: `neutral-400` (#9B8B86)
  - Icon margin: `0 8px` (spacing.2)
  - Better for RTL support (rotates easily)

### 3. **With Icons**
- **Purpose**: Adds visual context, aids quick scanning
- **Specs**:
  - Icon size: 16px
  - Icon position: left of text
  - Icon margin: `0 6px 0 0`
  - Icon color: matches text color
  - Use sparingly - only for top-level categories

### 4. **Collapsed/Truncated**
- **Purpose**: Handles very deep hierarchies (5+ levels)
- **Pattern**: `Home / ... / Parent / Current`
- **Specs**:
  - Show: First item, last 2 items, ellipsis dropdown
  - Ellipsis triggers popover with full path
  - Max visible items: 4

---

## Sizes

### Small
- **Font Size**: `0.8rem` (13px) - `fontSize.sm`
- **Height**: `28px`
- **Icon Size**: `14px`
- **Separator**: smaller chevron or single `/`
- **Use Case**: Compact interfaces, mobile headers

### Medium (Default)
- **Font Size**: `1rem` (16px) - `fontSize.base`
- **Height**: `32px`
- **Icon Size**: `16px`
- **Separator**: standard
- **Use Case**: Standard content pages, dashboards

### Large
- **Font Size**: `1.25rem` (20px) - `fontSize.md`
- **Height**: `40px`
- **Icon Size**: `20px`
- **Separator**: larger chevron
- **Use Case**: Hero sections, large displays

---

## States

### Default (Link Items)
- **Text Color**: `neutral-600` (#685A56)
- **Font Weight**: `regular` (400)
- **Text Decoration**: none
- **Cursor**: `pointer`

### Hover (Link Items)
- **Text Color**: `primary-700` (#75201C)
- **Text Decoration**: underline
- **Transition**: `color 150ms ease-out`

### Active/Current Page
- **Text Color**: `neutral-800` (#2B2523)
- **Font Weight**: `medium` (500)
- **Text Decoration**: none
- **Cursor**: `default`
- **Element**: Plain text, not a link
- **ARIA**: `aria-current="page"`

### Focus
- **Outline**: `2px solid` `boxShadow.focus`
- **Outline Offset**: `2px`
- **Border Radius**: `4px`

### Separator
- **Color**: `neutral-400` (#9B8B86)
- **Font Weight**: `regular` (400)
- **Cursor**: `default`
- **ARIA**: `aria-hidden="true"` (decorative only)

---

## Props/API

### TypeScript Interface

```typescript
interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];

  /** Separator type */
  separator?: 'slash' | 'chevron' | 'chevron-icon';

  /** Size variant */
  size?: 'small' | 'medium' | 'large';

  /** Show icons for items */
  showIcons?: boolean;

  /** Maximum items before collapsing */
  maxItems?: number;

  /** Custom separator component */
  customSeparator?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** ARIA label for navigation */
  ariaLabel?: string;
}

interface BreadcrumbItem {
  /** Display text */
  label: string;

  /** Link URL (omit for current page) */
  href?: string;

  /** Optional icon component */
  icon?: React.ReactNode;

  /** Is this the current page? */
  current?: boolean;

  /** Click handler (alternative to href) */
  onClick?: (event: React.MouseEvent) => void;
}
```

### Example Usage

```tsx
<Breadcrumb
  items={[
    {
      label: 'Home',
      href: '/',
      icon: <HomeIcon />
    },
    {
      label: 'Campanhas',
      href: '/campanhas'
    },
    {
      label: 'Redes Sociais',
      href: '/campanhas/social'
    },
    {
      label: 'Instagram - Novembro 2025',
      current: true
    }
  ]}
  separator="chevron"
  size="medium"
  ariaLabel="Navegação hierárquica"
/>
```

---

## Accessibility

### Keyboard Navigation
- **Tab Key**: Navigate between breadcrumb links
- **Enter/Space**: Activate focused link
- **Note**: Current page item is not focusable (not a link)

### ARIA Attributes
```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="/" class="breadcrumb__link">Home</a>
    </li>
    <li class="breadcrumb__separator" aria-hidden="true">/</li>
    <li class="breadcrumb__item">
      <a href="/campanhas" class="breadcrumb__link">Campanhas</a>
    </li>
    <li class="breadcrumb__separator" aria-hidden="true">/</li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__current" aria-current="page">
        Instagram
      </span>
    </li>
  </ol>
</nav>
```

### Accessibility Guidelines
- **Use `<nav>` element** with `aria-label="Breadcrumb"`
- **Use `<ol>` for semantic order** (not `<ul>` or `<div>`)
- **Mark current page** with `aria-current="page"` (not a link)
- **Hide separators** from screen readers (`aria-hidden="true"`)
- **Contrast**: Minimum 4.5:1 for link text (WCAG AA)
- **Touch Target**: Minimum 48px height on mobile (add padding)
- **Don't include current page** in breadcrumb navigation order

---

## Usage Guidelines

### Do's
- ✅ **Show full path** - Don't skip intermediate levels
- ✅ **Use page titles** - Match actual page headings for consistency
- ✅ **Keep labels short** - 1-3 words ideal, truncate long titles
- ✅ **Place above page title** - Standard location, easy to find
- ✅ **Make links functional** - All except current page should navigate
- ✅ **Use sentence case** - "Redes sociais" not "REDES SOCIAIS"
- ✅ **Start with "Home"** - Clear starting point (or skip if space-constrained)

### Don'ts
- ❌ **Don't use on simple sites** - Skip if only 1-2 levels deep
- ❌ **Don't duplicate primary nav** - Breadcrumb shows position, not all options
- ❌ **Don't make current page clickable** - It's where the user already is
- ❌ **Don't use as only navigation** - Supplement, don't replace navbar/menu
- ❌ **Don't show on homepage** - No parent to navigate back to
- ❌ **Don't change separator mid-path** - Visual consistency matters
- ❌ **Don't truncate with ellipsis** in middle of label - Shorten label or collapse items

### Rationale
**Location Not History**: Breadcrumbs show site structure, not browser history. Don't include "back" behavior - use browser back button for that.

**Truncation Strategy**: For paths with 5+ levels, show "Home / ... / Parent / Current" with dropdown for full path. This maintains context while saving space.

**Mobile Consideration**: On screens < 640px, consider showing only last 2 items or collapsing to dropdown to save precious horizontal space.

---

## Code Examples

### HTML Structure

```html
<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <!-- Home Link -->
    <li class="breadcrumb__item">
      <a href="/" class="breadcrumb__link">
        <svg class="breadcrumb__icon">
          <!-- Home icon SVG -->
        </svg>
        <span>Home</span>
      </a>
    </li>

    <!-- Separator -->
    <li class="breadcrumb__separator" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2"/>
      </svg>
    </li>

    <!-- Intermediate Link -->
    <li class="breadcrumb__item">
      <a href="/campanhas" class="breadcrumb__link">
        Campanhas
      </a>
    </li>

    <li class="breadcrumb__separator" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2"/>
      </svg>
    </li>

    <!-- Current Page -->
    <li class="breadcrumb__item">
      <span class="breadcrumb__current" aria-current="page">
        Instagram - Novembro
      </span>
    </li>
  </ol>
</nav>

<!-- Collapsed Variant (for deep hierarchies) -->
<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="/" class="breadcrumb__link">Home</a>
    </li>
    <li class="breadcrumb__separator" aria-hidden="true">/</li>

    <!-- Dropdown for collapsed items -->
    <li class="breadcrumb__item breadcrumb__item--collapsed">
      <button class="breadcrumb__dropdown-trigger" aria-label="Mostrar caminho completo">
        ...
      </button>
      <!-- Dropdown menu with full path -->
      <div class="breadcrumb__dropdown" hidden>
        <a href="/campanhas">Campanhas</a>
        <a href="/campanhas/social">Redes Sociais</a>
        <a href="/campanhas/social/instagram">Instagram</a>
      </div>
    </li>

    <li class="breadcrumb__separator" aria-hidden="true">/</li>
    <li class="breadcrumb__item">
      <a href="/campanhas/social/instagram/nov-2025" class="breadcrumb__link">
        Novembro 2025
      </a>
    </li>
    <li class="breadcrumb__separator" aria-hidden="true">/</li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__current" aria-current="page">Post 15/Nov</span>
    </li>
  </ol>
</nav>
```

### CSS Implementation

```css
/* Breadcrumb Navigation */
.breadcrumb-nav {
  margin-bottom: var(--spacing-4, 16px);
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0; /* Spacing handled by separators */
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--fontSize-base, 1rem);
  line-height: 1.5;
}

/* Breadcrumb Item */
.breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1, 6px);
}

/* Breadcrumb Link */
.breadcrumb__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1, 6px);
  padding: var(--spacing-1, 4px) var(--spacing-2, 8px);
  color: var(--neutral-600);
  text-decoration: none;
  font-weight: 400;
  border-radius: var(--borderRadius-sm, 4px);
  transition: color 150ms ease-out;
}

.breadcrumb__link:hover {
  color: var(--primary-700);
  text-decoration: underline;
}

.breadcrumb__link:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 2px;
}

/* Breadcrumb Icon */
.breadcrumb__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Current Page */
.breadcrumb__current {
  padding: var(--spacing-1, 4px) var(--spacing-2, 8px);
  color: var(--neutral-800);
  font-weight: 500;
}

/* Separator */
.breadcrumb__separator {
  display: inline-flex;
  align-items: center;
  margin: 0 var(--spacing-2, 8px);
  color: var(--neutral-400);
  user-select: none;
  pointer-events: none;
}

/* Chevron Icon Separator */
.breadcrumb__separator svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

/* Collapsed Dropdown */
.breadcrumb__item--collapsed {
  position: relative;
}

.breadcrumb__dropdown-trigger {
  padding: var(--spacing-1, 4px) var(--spacing-3, 12px);
  background: transparent;
  border: 1px solid var(--neutral-300);
  border-radius: var(--borderRadius-sm, 4px);
  color: var(--neutral-600);
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  transition: all 150ms ease-out;
}

.breadcrumb__dropdown-trigger:hover {
  background: var(--neutral-50);
  border-color: var(--neutral-400);
}

.breadcrumb__dropdown-trigger:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 2px;
}

.breadcrumb__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--spacing-1, 4px);
  padding: var(--spacing-2, 8px);
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: var(--borderRadius-md, 8px);
  box-shadow: var(--boxShadow-md);
  z-index: var(--zIndex-dropdown, 100);
}

.breadcrumb__dropdown a {
  display: block;
  padding: var(--spacing-2, 8px) var(--spacing-3, 12px);
  color: var(--neutral-700);
  text-decoration: none;
  border-radius: var(--borderRadius-sm, 4px);
  white-space: nowrap;
  transition: background 150ms ease-out;
}

.breadcrumb__dropdown a:hover {
  background: var(--neutral-50);
  color: var(--primary-700);
}

/* Size Variants */
.breadcrumb--small {
  font-size: var(--fontSize-sm, 0.8rem);
}

.breadcrumb--small .breadcrumb__icon,
.breadcrumb--small .breadcrumb__separator svg {
  width: 14px;
  height: 14px;
}

.breadcrumb--large {
  font-size: var(--fontSize-md, 1.25rem);
}

.breadcrumb--large .breadcrumb__icon,
.breadcrumb--large .breadcrumb__separator svg {
  width: 20px;
  height: 20px;
}

/* Responsive */
@media (max-width: 640px) {
  .breadcrumb {
    font-size: var(--fontSize-sm, 0.8rem);
  }

  .breadcrumb__separator {
    margin: 0 var(--spacing-1, 4px);
  }

  /* Auto-collapse on mobile if more than 3 items */
  .breadcrumb__item:nth-child(n+5):nth-last-child(n+5) {
    display: none;
  }

  /* Show ellipsis before last 2 items on mobile */
  .breadcrumb__item:nth-last-child(4)::after {
    content: "...";
    margin: 0 var(--spacing-2, 8px);
    color: var(--neutral-400);
  }
}

/* Dark Mode Support (if applicable) */
@media (prefers-color-scheme: dark) {
  .breadcrumb__link {
    color: var(--neutral-300);
  }

  .breadcrumb__link:hover {
    color: var(--primary-300);
  }

  .breadcrumb__current {
    color: var(--neutral-100);
  }

  .breadcrumb__separator {
    color: var(--neutral-500);
  }
}
```

### JavaScript Behavior (Collapsed Dropdown)

```javascript
class Breadcrumb {
  constructor(container) {
    this.container = container;
    this.dropdownTrigger = container.querySelector('.breadcrumb__dropdown-trigger');
    this.dropdown = container.querySelector('.breadcrumb__dropdown');

    if (this.dropdownTrigger && this.dropdown) {
      this.init();
    }
  }

  init() {
    this.dropdownTrigger.addEventListener('click', () => this.toggleDropdown());

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.closeDropdown();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown() {
    const isHidden = this.dropdown.hasAttribute('hidden');
    if (isHidden) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  openDropdown() {
    this.dropdown.removeAttribute('hidden');
    this.dropdownTrigger.setAttribute('aria-expanded', 'true');
  }

  closeDropdown() {
    this.dropdown.setAttribute('hidden', '');
    this.dropdownTrigger.setAttribute('aria-expanded', 'false');
  }
}

// Initialize all breadcrumbs with dropdowns
document.querySelectorAll('.breadcrumb-nav').forEach(nav => {
  new Breadcrumb(nav);
});
```

---

## Related Components

- **Navigation Bar** - Primary site navigation (complements breadcrumb)
- **Tabs** - Horizontal navigation within same hierarchy level
- **Sidebar** - Vertical navigation alternative
- **Back Button** - Browser history (different from breadcrumb path)
- **Pagination** - Sequential navigation (vs. hierarchical)

---

## Design Tokens Reference

```json
{
  "breadcrumb": {
    "sizes": {
      "small": {
        "fontSize": "{global.fontSize.sm}",
        "iconSize": "14px",
        "height": "28px"
      },
      "medium": {
        "fontSize": "{global.fontSize.base}",
        "iconSize": "16px",
        "height": "32px"
      },
      "large": {
        "fontSize": "{global.fontSize.md}",
        "iconSize": "20px",
        "height": "40px"
      }
    },
    "colors": {
      "link": {
        "default": "{global.color.neutral.600}",
        "hover": "{global.color.primary.700}"
      },
      "current": "{global.color.neutral.800}",
      "separator": "{global.color.neutral.400}"
    },
    "spacing": {
      "separator": "{global.spacing.2}",
      "itemGap": "{global.spacing.1}",
      "marginBottom": "{global.spacing.4}"
    },
    "typography": {
      "link": {
        "fontWeight": "{global.fontWeight.regular}"
      },
      "current": {
        "fontWeight": "{global.fontWeight.medium}"
      }
    },
    "motion": {
      "duration": "{global.duration.fast}",
      "easing": "{global.easing.easeOut}"
    }
  }
}
```
