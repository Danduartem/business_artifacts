# Pagination Component

## Overview

**Purpose**: Pagination breaks large datasets into manageable pages, allowing users to navigate through content sequentially. It provides clear feedback about current position and total content available.

**Usage**: Use for tables, search results, product listings, or any content set with 25+ items. Displays current page, total pages, and navigation controls.

**Brand Context**: For Oitavo Café, pagination helps Carolina browse through campaign performance data, client lists, or monthly reports without overwhelming the interface. Shows "Página 3 de 12" with clear next/previous controls.

---

## Anatomy

```
Standard Pagination:
┌─────────────────────────────────────────────────────┐
│  [< Anterior]  [1] [2] [3] ... [10]  [Próximo >]   │
│                    ^^^(active)                      │
└─────────────────────────────────────────────────────┘

With Page Info:
┌─────────────────────────────────────────────────────┐
│  [<< Primeira]  [< Anterior]  Página 3 de 12        │
│                                                      │
│  [Próximo >]  [Última >>]     Mostrando 21-30 de 120│
└─────────────────────────────────────────────────────┘

Compact (Mobile):
┌──────────────────────┐
│  3 de 12  [<] [>]   │
└──────────────────────┘

Components:
1. First/Last buttons - Jump to endpoints
2. Previous/Next buttons - Sequential navigation
3. Page numbers - Direct page access
4. Current page indicator - Visual highlight
5. Ellipsis (...) - Truncation for many pages
6. Item count - "Mostrando X-Y de Z"
```

---

## Variants

### 1. **Simple** (Default)
- **Purpose**: Clean, essential controls only
- **Includes**: Previous, page numbers, Next
- **Specs**:
  - Show max 7 page buttons
  - Pattern: `[<] 1 2 3 ... 10 [>]`
  - No First/Last buttons
  - Best for 2-15 pages

### 2. **Full**
- **Purpose**: Maximum control, all navigation options
- **Includes**: First, Previous, page numbers, Next, Last
- **Specs**:
  - Pattern: `[<<] [<] 1 2 3 ... 10 [>] [>>]`
  - Show item count: "21-30 de 120"
  - Best for 15+ pages or data tables

### 3. **Compact**
- **Purpose**: Mobile-first, minimal space
- **Includes**: Current page, total pages, arrows only
- **Specs**:
  - Pattern: `3 de 12 [<] [>]`
  - No page number buttons
  - Full width on mobile
  - Best for < 640px screens

### 4. **Infinite Scroll Hybrid**
- **Purpose**: Lazy load with fallback controls
- **Includes**: "Carregar mais" button + traditional pagination
- **Specs**:
  - Auto-load first 3 pages
  - Show pagination after scroll threshold
  - Better UX for long lists

---

## Sizes

### Small
- **Button Height**: `32px`
- **Font Size**: `0.8rem` (13px) - `fontSize.sm`
- **Padding**: `spacing.2` (8px) horizontal
- **Icon Size**: `14px`
- **Use Case**: Compact data tables, mobile

### Medium (Default)
- **Button Height**: `40px`
- **Font Size**: `1rem` (16px) - `fontSize.base`
- **Padding**: `spacing.3` (12px) horizontal
- **Icon Size**: `16px`
- **Use Case**: Standard tables, desktop views

### Large
- **Button Height**: `48px`
- **Font Size**: `1.25rem` (20px) - `fontSize.md`
- **Padding**: `spacing.4` (16px) horizontal
- **Icon Size**: `20px`
- **Use Case**: Touch interfaces, large displays

---

## States

### Page Button - Default
- **Background**: `transparent`
- **Text Color**: `neutral-700` (#453C39)
- **Border**: `1px solid` `neutral-300` (#BEB3AE)
- **Font Weight**: `regular` (400)
- **Cursor**: `pointer`

### Page Button - Hover
- **Background**: `neutral-50` (#F8F5F2)
- **Border Color**: `neutral-400` (#9B8B86)
- **Text Color**: `neutral-800` (#2B2523)
- **Transition**: `all 150ms ease-out`

### Page Button - Active (Current Page)
- **Background**: `primary-700` (#75201C)
- **Text Color**: `white`
- **Border Color**: `primary-700`
- **Font Weight**: `semibold` (600)
- **Cursor**: `default`
- **ARIA**: `aria-current="page"`

### Page Button - Focus
- **Outline**: `2px solid` `boxShadow.focus`
- **Outline Offset**: `2px`
- **Border Radius**: `4px`

### Page Button - Disabled
- **Background**: `transparent`
- **Text Color**: `neutral-300` (#BEB3AE)
- **Border Color**: `neutral-200` (#D6CEC7)
- **Cursor**: `not-allowed`
- **Opacity**: `0.5`
- **ARIA**: `aria-disabled="true"`

### Ellipsis
- **Text**: `...` or `•••`
- **Color**: `neutral-400` (#9B8B86)
- **Cursor**: `default`
- **Not Clickable**: Purely visual indicator
- **Optional**: Can be dropdown showing all pages

---

## Props/API

### TypeScript Interface

```typescript
interface PaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number;

  /** Total number of pages */
  totalPages: number;

  /** Callback when page changes */
  onPageChange: (page: number) => void;

  /** Variant type */
  variant?: 'simple' | 'full' | 'compact';

  /** Size variant */
  size?: 'small' | 'medium' | 'large';

  /** Show first/last buttons */
  showFirstLast?: boolean;

  /** Show item count (requires totalItems) */
  showItemCount?: boolean;

  /** Total number of items (for count display) */
  totalItems?: number;

  /** Items per page (for count calculation) */
  itemsPerPage?: number;

  /** Maximum page buttons to show */
  maxPageButtons?: number;

  /** Custom labels */
  labels?: {
    previous?: string;
    next?: string;
    first?: string;
    last?: string;
    page?: string;
    of?: string;
    showing?: string;
  };

  /** Additional CSS classes */
  className?: string;

  /** Disabled state */
  disabled?: boolean;
}
```

### Example Usage

```tsx
<Pagination
  currentPage={3}
  totalPages={12}
  onPageChange={(page) => fetchData(page)}
  variant="full"
  size="medium"
  showItemCount={true}
  totalItems={120}
  itemsPerPage={10}
  labels={{
    previous: "Anterior",
    next: "Próximo",
    first: "Primeira",
    last: "Última",
    showing: "Mostrando"
  }}
/>

// Output:
// [<< Primeira] [< Anterior] [1] [2] [3] ... [12] [Próximo >] [Última >>]
// Mostrando 21-30 de 120 itens
```

---

## Accessibility

### Keyboard Navigation
- **Tab Key**: Navigate between page buttons
- **Enter/Space**: Activate focused page button
- **Arrow Keys**: Optional - move between page numbers
- **Note**: Skip disabled buttons in tab order

### ARIA Attributes
```html
<nav aria-label="Paginação de resultados">
  <ul class="pagination">
    <li>
      <button
        class="pagination__button"
        aria-label="Ir para primeira página"
        disabled
      >
        <span aria-hidden="true">««</span>
        <span class="sr-only">Primeira</span>
      </button>
    </li>
    <li>
      <button
        class="pagination__button"
        aria-label="Ir para página anterior"
      >
        <span aria-hidden="true">‹</span>
        <span class="sr-only">Anterior</span>
      </button>
    </li>
    <li>
      <button
        class="pagination__button pagination__button--active"
        aria-label="Página 3"
        aria-current="page"
      >
        3
      </button>
    </li>
    <li>
      <span class="pagination__ellipsis" aria-hidden="true">...</span>
    </li>
  </ul>

  <div class="pagination__info" role="status" aria-live="polite">
    Mostrando 21-30 de 120 resultados
  </div>
</nav>
```

### Accessibility Guidelines
- **Use `<nav>` element** with descriptive `aria-label`
- **Mark current page** with `aria-current="page"`
- **Disable, don't hide** previous/next when unavailable
- **Provide descriptive labels** for icon-only buttons
- **Announce updates** with `aria-live="polite"` for item count
- **Touch targets**: Minimum 48×48px on mobile (WCAG 2.5.5)
- **Contrast**: 4.5:1 minimum for text (WCAG AA)
- **Screen reader text**: Include "Página X" not just number

---

## Usage Guidelines

### Do's
- ✅ **Show total page count** - "3 de 12" gives context
- ✅ **Keep page numbers accessible** - Max 7-9 buttons visible
- ✅ **Disable when at endpoints** - Previous on page 1, Next on last page
- ✅ **Update URL with page number** - Enables bookmarking, back button
- ✅ **Show item count** - "21-30 de 120" helps users estimate content
- ✅ **Center align** - Creates balanced, symmetric layout
- ✅ **Persist per-page setting** - Remember user's preferred items/page

### Don'ts
- ❌ **Don't reset to page 1** when filtering - Maintain position if possible
- ❌ **Don't show pagination** for < 25 items - Show all instead
- ❌ **Don't break keyboard navigation** - All buttons must be focusable
- ❌ **Don't hide First/Last** on 50+ pages - Users need quick access
- ❌ **Don't use infinite scroll** for data tables - Pagination better for scanning
- ❌ **Don't make ellipsis clickable** unless it's a dropdown menu
- ❌ **Don't change items per page** without user consent

### Rationale
**Truncation Pattern**: For many pages, show: `1 2 3 ... 10 11 12` (first 3, last 3, current ±1). This provides context while limiting buttons.

**Page Size Options**: Offer 10, 25, 50, 100 items per page. Let users choose based on their workflow (quick scan vs. deep dive).

**Mobile Strategy**: On < 640px, switch to compact variant automatically. Full pagination takes too much horizontal space.

---

## Code Examples

### HTML Structure

```html
<nav class="pagination-nav" aria-label="Paginação de campanhas">
  <ul class="pagination">
    <!-- First Button -->
    <li class="pagination__item">
      <button
        class="pagination__button pagination__button--first"
        aria-label="Ir para primeira página"
        disabled
      >
        <svg class="pagination__icon" width="16" height="16">
          <path d="M12 4L6 8L12 12M6 4L0 8L6 12" stroke="currentColor"/>
        </svg>
        <span class="pagination__label">Primeira</span>
      </button>
    </li>

    <!-- Previous Button -->
    <li class="pagination__item">
      <button
        class="pagination__button pagination__button--prev"
        aria-label="Ir para página anterior"
        disabled
      >
        <svg class="pagination__icon" width="16" height="16">
          <path d="M10 4L4 8L10 12" stroke="currentColor"/>
        </svg>
        <span class="pagination__label">Anterior</span>
      </button>
    </li>

    <!-- Page 1 (Active) -->
    <li class="pagination__item">
      <button
        class="pagination__button pagination__button--active"
        aria-label="Página 1"
        aria-current="page"
      >
        1
      </button>
    </li>

    <!-- Page 2 -->
    <li class="pagination__item">
      <button
        class="pagination__button"
        aria-label="Ir para página 2"
      >
        2
      </button>
    </li>

    <!-- Page 3 -->
    <li class="pagination__item">
      <button
        class="pagination__button"
        aria-label="Ir para página 3"
      >
        3
      </button>
    </li>

    <!-- Ellipsis -->
    <li class="pagination__item">
      <span class="pagination__ellipsis" aria-hidden="true">...</span>
    </li>

    <!-- Last Page -->
    <li class="pagination__item">
      <button
        class="pagination__button"
        aria-label="Ir para página 12"
      >
        12
      </button>
    </li>

    <!-- Next Button -->
    <li class="pagination__item">
      <button
        class="pagination__button pagination__button--next"
        aria-label="Ir para próxima página"
      >
        <span class="pagination__label">Próximo</span>
        <svg class="pagination__icon" width="16" height="16">
          <path d="M6 4L12 8L6 12" stroke="currentColor"/>
        </svg>
      </button>
    </li>

    <!-- Last Button -->
    <li class="pagination__item">
      <button
        class="pagination__button pagination__button--last"
        aria-label="Ir para última página"
      >
        <span class="pagination__label">Última</span>
        <svg class="pagination__icon" width="16" height="16">
          <path d="M4 4L10 8L4 12M10 4L16 8L10 12" stroke="currentColor"/>
        </svg>
      </button>
    </li>
  </ul>

  <!-- Item Count -->
  <div class="pagination__info" role="status" aria-live="polite">
    Mostrando <strong>1-10</strong> de <strong>120</strong> campanhas
  </div>
</nav>
```

### CSS Implementation

```css
/* Pagination Navigation */
.pagination-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3, 12px);
  margin: var(--spacing-6, 32px) 0;
}

/* Pagination List */
.pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-2, 8px);
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Pagination Item */
.pagination__item {
  display: inline-flex;
}

/* Pagination Button */
.pagination__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1, 6px);
  min-width: 40px;
  height: 40px;
  padding: var(--spacing-3, 12px);
  background: transparent;
  border: 1px solid var(--neutral-300);
  border-radius: var(--borderRadius-sm, 4px);
  color: var(--neutral-700);
  font-size: var(--fontSize-base, 1rem);
  font-weight: 400;
  font-family: inherit;
  cursor: pointer;
  transition: all 150ms ease-out;
}

.pagination__button:hover:not(:disabled):not(.pagination__button--active) {
  background: var(--neutral-50);
  border-color: var(--neutral-400);
  color: var(--neutral-800);
}

.pagination__button:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: 2px;
  z-index: 1;
}

/* Active Page */
.pagination__button--active {
  background: var(--primary-700);
  border-color: var(--primary-700);
  color: white;
  font-weight: 600;
  cursor: default;
}

/* Disabled State */
.pagination__button:disabled {
  background: transparent;
  border-color: var(--neutral-200);
  color: var(--neutral-300);
  cursor: not-allowed;
  opacity: 0.5;
}

/* Navigation Buttons (First, Prev, Next, Last) */
.pagination__button--first,
.pagination__button--prev,
.pagination__button--next,
.pagination__button--last {
  padding: var(--spacing-3, 12px) var(--spacing-4, 16px);
}

/* Icon */
.pagination__icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2px;
  fill: none;
}

/* Label (hide on mobile for icon-only) */
.pagination__label {
  white-space: nowrap;
}

/* Ellipsis */
.pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  color: var(--neutral-400);
  font-weight: 500;
  user-select: none;
  pointer-events: none;
}

/* Item Count Info */
.pagination__info {
  font-size: var(--fontSize-sm, 0.8rem);
  color: var(--neutral-600);
  text-align: center;
}

.pagination__info strong {
  color: var(--neutral-800);
  font-weight: 600;
}

/* Size Variants */
.pagination--small .pagination__button {
  min-width: 32px;
  height: 32px;
  padding: var(--spacing-2, 8px);
  font-size: var(--fontSize-sm, 0.8rem);
}

.pagination--small .pagination__icon {
  width: 14px;
  height: 14px;
}

.pagination--large .pagination__button {
  min-width: 48px;
  height: 48px;
  padding: var(--spacing-4, 16px);
  font-size: var(--fontSize-md, 1.25rem);
}

.pagination--large .pagination__icon {
  width: 20px;
  height: 20px;
}

/* Compact Variant (Mobile) */
.pagination--compact {
  gap: var(--spacing-3, 12px);
}

.pagination--compact .pagination__button {
  padding: var(--spacing-3, 12px) var(--spacing-4, 16px);
}

.pagination--compact .pagination__current {
  font-size: var(--fontSize-base, 1rem);
  color: var(--neutral-700);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 640px) {
  /* Hide labels on mobile, show icons only */
  .pagination__label {
    display: none;
  }

  .pagination__button--first,
  .pagination__button--prev,
  .pagination__button--next,
  .pagination__button--last {
    padding: var(--spacing-3, 12px);
    min-width: 40px;
  }

  /* Reduce gap */
  .pagination {
    gap: var(--spacing-1, 4px);
  }

  /* Hide First/Last buttons on very small screens */
  @media (max-width: 480px) {
    .pagination__button--first,
    .pagination__button--last {
      display: none;
    }
  }
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### JavaScript Implementation

```javascript
class Pagination {
  constructor(container, options = {}) {
    this.container = container;
    this.currentPage = options.currentPage || 1;
    this.totalPages = options.totalPages || 1;
    this.maxPageButtons = options.maxPageButtons || 7;
    this.onPageChange = options.onPageChange || (() => {});

    this.render();
    this.attachEventListeners();
  }

  render() {
    const pageNumbers = this.getPageNumbers();
    const pagination = this.container.querySelector('.pagination');

    // Clear existing page buttons (keep nav buttons)
    const existingPages = pagination.querySelectorAll('[data-page]');
    existingPages.forEach(el => el.parentElement.remove());

    // Insert new page buttons before "Next" button
    const nextButton = pagination.querySelector('.pagination__button--next');
    const insertPosition = nextButton ? nextButton.parentElement : null;

    pageNumbers.forEach(page => {
      const li = document.createElement('li');
      li.className = 'pagination__item';

      if (page === '...') {
        li.innerHTML = '<span class="pagination__ellipsis" aria-hidden="true">...</span>';
      } else {
        const isActive = page === this.currentPage;
        li.innerHTML = `
          <button
            class="pagination__button ${isActive ? 'pagination__button--active' : ''}"
            data-page="${page}"
            aria-label="Ir para página ${page}"
            ${isActive ? 'aria-current="page"' : ''}
          >
            ${page}
          </button>
        `;
      }

      if (insertPosition) {
        pagination.insertBefore(li, insertPosition);
      } else {
        pagination.appendChild(li);
      }
    });

    this.updateNavigationButtons();
    this.updateInfo();
  }

  getPageNumbers() {
    const pages = [];
    const { currentPage, totalPages, maxPageButtons } = this;

    if (totalPages <= maxPageButtons) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Truncate with ellipsis
      const sideButtons = Math.floor((maxPageButtons - 3) / 2); // Reserve 3 for 1, ..., last

      if (currentPage <= sideButtons + 2) {
        // Near start: 1 2 3 4 5 ... 12
        for (let i = 1; i <= maxPageButtons - 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - sideButtons - 1) {
        // Near end: 1 ... 8 9 10 11 12
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - (maxPageButtons - 3); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle: 1 ... 5 6 7 ... 12
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }

  updateNavigationButtons() {
    const firstBtn = this.container.querySelector('.pagination__button--first');
    const prevBtn = this.container.querySelector('.pagination__button--prev');
    const nextBtn = this.container.querySelector('.pagination__button--next');
    const lastBtn = this.container.querySelector('.pagination__button--last');

    if (firstBtn) firstBtn.disabled = this.currentPage === 1;
    if (prevBtn) prevBtn.disabled = this.currentPage === 1;
    if (nextBtn) nextBtn.disabled = this.currentPage === this.totalPages;
    if (lastBtn) lastBtn.disabled = this.currentPage === this.totalPages;
  }

  updateInfo() {
    const info = this.container.querySelector('.pagination__info');
    if (!info) return;

    const itemsPerPage = 10; // Could be configurable
    const totalItems = this.totalPages * itemsPerPage;
    const startItem = (this.currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(this.currentPage * itemsPerPage, totalItems);

    info.innerHTML = `Mostrando <strong>${startItem}-${endItem}</strong> de <strong>${totalItems}</strong> itens`;
  }

  attachEventListeners() {
    this.container.addEventListener('click', (e) => {
      const button = e.target.closest('.pagination__button');
      if (!button || button.disabled) return;

      if (button.hasAttribute('data-page')) {
        const page = parseInt(button.getAttribute('data-page'), 10);
        this.goToPage(page);
      } else if (button.classList.contains('pagination__button--first')) {
        this.goToPage(1);
      } else if (button.classList.contains('pagination__button--prev')) {
        this.goToPage(this.currentPage - 1);
      } else if (button.classList.contains('pagination__button--next')) {
        this.goToPage(this.currentPage + 1);
      } else if (button.classList.contains('pagination__button--last')) {
        this.goToPage(this.totalPages);
      }
    });
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;

    this.currentPage = page;
    this.render();
    this.onPageChange(page);

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);

    // Scroll to top (optional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Initialize
const paginationNav = document.querySelector('.pagination-nav');
if (paginationNav) {
  new Pagination(paginationNav, {
    currentPage: 1,
    totalPages: 12,
    maxPageButtons: 7,
    onPageChange: (page) => {
      console.log('Navigating to page:', page);
      // Fetch new data here
    }
  });
}
```

---

## Related Components

- **Table** - Primary use case for pagination (data tables)
- **Breadcrumb** - Shows hierarchical position (pagination shows sequential position)
- **Tabs** - Non-sequential content switching (vs. sequential pagination)
- **Infinite Scroll** - Alternative pattern for continuous content
- **Dropdown** - Use for "items per page" selector

---

## Design Tokens Reference

```json
{
  "pagination": {
    "sizes": {
      "small": {
        "buttonHeight": "32px",
        "buttonMinWidth": "32px",
        "fontSize": "{global.fontSize.sm}",
        "iconSize": "14px",
        "padding": "{global.spacing.2}"
      },
      "medium": {
        "buttonHeight": "40px",
        "buttonMinWidth": "40px",
        "fontSize": "{global.fontSize.base}",
        "iconSize": "16px",
        "padding": "{global.spacing.3}"
      },
      "large": {
        "buttonHeight": "48px",
        "buttonMinWidth": "48px",
        "fontSize": "{global.fontSize.md}",
        "iconSize": "20px",
        "padding": "{global.spacing.4}"
      }
    },
    "colors": {
      "default": {
        "background": "transparent",
        "text": "{global.color.neutral.700}",
        "border": "{global.color.neutral.300}"
      },
      "hover": {
        "background": "{global.color.neutral.50}",
        "text": "{global.color.neutral.800}",
        "border": "{global.color.neutral.400}"
      },
      "active": {
        "background": "{global.color.primary.700}",
        "text": "{global.color.white}",
        "border": "{global.color.primary.700}"
      },
      "disabled": {
        "background": "transparent",
        "text": "{global.color.neutral.300}",
        "border": "{global.color.neutral.200}",
        "opacity": "0.5"
      },
      "ellipsis": "{global.color.neutral.400}"
    },
    "spacing": {
      "gap": "{global.spacing.2}",
      "margin": "{global.spacing.6}"
    },
    "typography": {
      "default": {
        "fontWeight": "{global.fontWeight.regular}"
      },
      "active": {
        "fontWeight": "{global.fontWeight.semibold}"
      }
    },
    "motion": {
      "duration": "{global.duration.fast}",
      "easing": "{global.easing.easeOut}"
    }
  }
}
```
