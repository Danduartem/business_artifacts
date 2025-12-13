# Pagination Component

**Oitavo Café Design System** | Navigation Component

---

## Overview

Pagination breaks large data sets into manageable pages, allowing users to navigate through lists, tables, or search results. For Oitavo Café, pagination helps users explore leads, sales records, and analytics data efficiently while maintaining system performance.

**Purpose**: Enable users to navigate through large datasets without overwhelming the interface or degrading performance.

**Brand Alignment**: Pagination reflects "Data Dignity: Numbers Are Heroes" by making large datasets navigable and scannable. Clear, honest communication about total results builds trust with skeptical users like Carolina.

---

## Anatomy

```
┌─────────────────────────────────────────────────────────┐
│  Showing 1-20 of 247 leads                              │
│                                                          │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐       ┌───┐  ┌───┐        │
│  │ ← │  │ 1 │  │ 2 │  │ 3 │  ...  │ 13│  │ → │        │
│  └───┘  └───┘  └───┘  └───┘       └───┘  └───┘        │
│          ^^^^                                            │
│        Active page                                       │
└─────────────────────────────────────────────────────────┘
```

**Parts**:
1. **Info Text** - Total count and current range (optional)
2. **Previous Button** - Navigate to previous page
3. **Page Numbers** - Clickable page buttons
4. **Ellipsis** - Indicates skipped pages (...)
5. **Next Button** - Navigate to next page
6. **Jump to Page** - Direct input (optional)

---

## Variants

### Standard (Numbers)

**Use Case**: Default pagination for most lists and tables

```
←  1  2  3  4  5  6  7  8  9  →
   ^^^ Active
```

**Specs**:
- Button size: `40×40px`
- Gap between buttons: `8px` (spacing-2)
- Font size: `14px`
- Font weight: `500` (Medium)
- Border radius: `6px`
- Active background: `primary-700` (#75201C)
- Active text: `support-50` (#F8F4F2)
- Inactive text: `neutral-700` (#4A403D)
- Inactive hover background: `neutral-100` (#EBE7E6)

### Compact (Prev/Next Only)

**Use Case**: Mobile, tight spaces, unknown total pages

```
← Anterior      Próxima →
```

**Specs**:
- Button padding: `10px 16px`
- Gap between buttons: `16px`
- Font size: `14px`
- Font weight: `500`
- Border radius: `6px`
- Shows only navigation buttons, no page numbers

### With Ellipsis (Many Pages)

**Use Case**: Large datasets (10+ pages)

```
←  1  2  3  ...  45  46  47  ...  99  100  →
      ^^^                           ^^^^^^
   Start pages                    End pages
```

**Specs**:
- Show first 3 pages
- Show last 3 pages
- Show current page ± 1
- Ellipsis (...) for gaps
- Max visible buttons: 9 (including arrows)

### With Jump Input

**Use Case**: Very large datasets (50+ pages), power users

```
←  1  2  3  ...  10  ...  99  →    Go to: [___] →
                                           Input
```

**Specs**:
- Input width: `60px`
- Input height: `40px`
- Validation: 1 to maxPages
- Submit on Enter or button click
- Error state for invalid numbers

### Load More (Infinite Scroll Alternative)

**Use Case**: Mobile-first, continuous browsing

```
┌─────────────────────────────────┐
│  [20 leads displayed]           │
│                                  │
│  ┌─────────────────────────┐    │
│  │  Carregar mais 20       │    │
│  └─────────────────────────┘    │
│                                  │
│  Showing 20 of 247 total        │
└─────────────────────────────────┘
```

**Specs**:
- Button width: Full width on mobile, `auto` on desktop
- Button styling: Secondary button variant
- Shows total count
- Appends new items below

---

## States

### Page Button (Inactive)

**Visual**:
- Background: `transparent`
- Text color: `neutral-700` (#4A403D)
- Border: `1px solid neutral-200` (#D3CCCA)
- Cursor: `pointer`

### Page Button Hover

**Visual**:
- Background: `neutral-100` (#EBE7E6)
- Text color: `primary-600` (#993A33)
- Border: `1px solid neutral-300` (#AEA6A3)
- Transition: `all 150ms ease-out`

### Page Button Active (Current Page)

**Visual**:
- Background: `primary-700` (#75201C)
- Text color: `support-50` (#F8F4F2)
- Border: `1px solid primary-700`
- Font weight: `600` (Semibold)
- Cursor: `default`
- Box shadow: `0 2px 4px rgba(75, 32, 28, 0.2)`

### Page Button Focus

**Visual**:
- Outline: `3px solid primary-600` with `0.3` opacity
- Outline offset: `2px`
- Border radius: `6px`

### Disabled (First/Last Page)

**Visual**:
- Background: `transparent`
- Text color: `neutral-400` (#958986)
- Border: `1px solid neutral-200`
- Cursor: `not-allowed`
- Opacity: `0.5`

**When to Disable**:
- Previous button on page 1
- Next button on last page

### Loading

**Visual**:
- Buttons disabled
- Spinner icon in place of page numbers
- Opacity: `0.6`
- Text: "Loading..."

---

## Responsive Behavior

### Desktop (1440px+)
- Show up to 9 page buttons
- Include first page, last page, current ± 2
- Full info text: "Showing 1-20 of 247 leads"
- Button size: `40×40px`

### Tablet (768px - 1439px)
- Show up to 7 page buttons
- Include first page, last page, current ± 1
- Abbreviated info: "1-20 of 247"
- Button size: `40×40px`

### Mobile (< 768px)
- **Option 1: Compact** (Recommended for < 10 pages)
  ```
  ← Anterior  1 of 13  Próxima →
  ```

- **Option 2: Simple Numbers** (For 3-5 pages)
  ```
  ←  1  2  3  4  5  →
  ```

- **Option 3: Load More** (For infinite scroll feel)
  ```
  [Carregar mais 20 leads]
  20 de 247 total
  ```

**Specs**:
- Info text above or below pagination
- Button size: `44×44px` (larger touch target)
- Full-width layout option
- Stack vertically if needed

---

## Animation Specifications

### Page Change

**Button Click**:
- Duration: `100ms`
- Easing: `ease-out`
- Scale: `0.95` on active click
- Background transition: `150ms`

**Content Transition**:
- Old content: Fade out `opacity 1 → 0` in `150ms`
- New content: Fade in `opacity 0 → 1` in `200ms` with `50ms` delay
- Optional: Slide effect `translateX(-20px → 0)` in `250ms`

**Active Page Indicator**:
- Duration: `200ms`
- Easing: `cubic-bezier(0.4, 0, 0.6, 1)` (sharp)
- Background color transition
- Scale in: `transform: scale(0.9 → 1)`

### Hover Animation

- Duration: `150ms`
- Easing: `ease-out`
- Properties: `background-color`, `border-color`, `color`

### Loading State

**Spinner**:
- Rotation: `360deg` per `800ms`
- Easing: `linear`
- Infinite loop

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .pagination-button {
    transition: none;
  }
  .pagination-content {
    transition: opacity 50ms;
  }
}
```

---

## Props / API

```typescript
interface PaginationProps {
  // Data
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;

  // Callbacks
  onPageChange: (page: number) => void;

  // Variants
  variant?: 'standard' | 'compact' | 'load-more';
  showInfo?: boolean; // Show "1-20 of 247" text
  showJumpTo?: boolean; // Show jump-to-page input

  // Behavior
  siblingCount?: number; // Pages to show around current (default: 1)
  boundaryCount?: number; // Pages to show at start/end (default: 1)
  disabled?: boolean;
  loading?: boolean;

  // Customization
  previousLabel?: string; // Default: "Anterior"
  nextLabel?: string; // Default: "Próxima"
  loadMoreLabel?: string; // Default: "Carregar mais"

  // Accessibility
  ariaLabel?: string; // Default: "Pagination navigation"
}
```

**Example Usage**:
```tsx
<Pagination
  currentPage={3}
  totalPages={13}
  totalItems={247}
  itemsPerPage={20}
  onPageChange={(page) => fetchLeads(page)}
  variant="standard"
  showInfo={true}
  siblingCount={1}
  boundaryCount={1}
/>
```

---

## Accessibility

### Semantic HTML

```html
<nav aria-label="Pagination" role="navigation">
  <div class="pagination-info" aria-live="polite">
    Showing 1-20 of 247 leads
  </div>

  <ul class="pagination-list">
    <li>
      <a href="?page=2" aria-label="Go to previous page">
        ← Anterior
      </a>
    </li>
    <li>
      <a href="?page=1" aria-label="Go to page 1">1</a>
    </li>
    <li>
      <a href="?page=2" aria-label="Go to page 2">2</a>
    </li>
    <li>
      <span aria-current="page" aria-label="Page 3, current page">3</span>
    </li>
    <!-- ... -->
  </ul>
</nav>
```

### ARIA Attributes

**Container**:
- `<nav role="navigation" aria-label="Pagination">`
- Identifies pagination as navigation landmark

**Current Page**:
- `aria-current="page"` - Marks active page
- `aria-label="Page 3, current page"`

**Page Links**:
- `aria-label="Go to page 5"` - Clear action description
- `aria-label="Go to next page"` for arrows

**Info Text**:
- `aria-live="polite"` - Announces updates when page changes
- `role="status"` - Identifies as status region

**Disabled Buttons**:
- `aria-disabled="true"`
- `disabled` attribute
- `tabindex="-1"` to remove from tab order

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next pagination control |
| `Shift + Tab` | Move to previous control |
| `Enter` | Activate focused page/button |
| `Space` | Activate focused page/button |

### Screen Reader Announcements

- "Pagination navigation"
- "Page 3 of 13, current page"
- "Link, go to page 5"
- "Button, previous page, disabled"
- "Showing 21 to 40 of 247 leads" (when page changes)

---

## Brand Voice in Pagination

### Do's ✓

**Direct, Clear Language**:
- "Mostrando 1-20 de 247 leads"
- "Anterior" / "Próxima" (not "Previous" / "Next")
- "Carregar mais 20 leads" (specific numbers)
- "Ir para página:"

**Results-Focused**:
- Always show total count when known
- Use specific nouns: "247 leads", "89 vendas", "142 clientes"
- Highlight the data: "20 resultados" not just "20 items"

**Honest and Transparent**:
- Show accurate totals
- Don't hide pagination depth
- Clear about what's being paginated

### Don'ts ✗

**Avoid Generic Terms**:
- ✗ "Items"
- ✗ "Results"
- ✗ "Records"
- ✓ "Leads", "Vendas", "Clientes" (specific)

**Avoid Ambiguity**:
- ✗ "More" (How many more?)
- ✗ "Show all" (Could be thousands)
- ✗ "..." without context

**Avoid Technical Jargon**:
- ✗ "Page 1 of N"
- ✓ "Página 1 de 13"

---

## Usage Guidelines

### When to Use

- Lists with 20+ items
- Tables with multiple rows
- Search results
- Blog posts or articles archive
- Product catalogs
- Lead/client databases

### When NOT to Use

- Fewer than 20 items (show all)
- Real-time feeds (use infinite scroll)
- Critical sequential content (use single-page)
- Mobile-first content consumption (consider load more)
- Time-sensitive data (use real-time updates)

### Best Practices

**Performance**:
- Default to 20-50 items per page
- Allow users to change page size (10, 20, 50, 100)
- Load only current page data (server-side pagination)
- Show loading states during fetch

**UX**:
- Scroll to top of list after page change
- Maintain filters/sorts across pages
- Preserve page state in URL (?page=3)
- Show total results for transparency

**Content**:
- Use consistent page sizes
- Show range (1-20 of 247) for context
- Disable/hide unavailable pages
- Provide jump-to-page for large datasets

---

## Do's and Don'ts

### Visual Design

**Do**:
- Make active page clearly distinct
- Use consistent button sizing
- Ensure sufficient touch targets (44×44px)
- Provide clear hover states

**Don't**:
- Make pagination visually overwhelming
- Use tiny click targets
- Hide total page count without reason
- Auto-advance pages

### Interaction

**Do**:
- Scroll to top after page change
- Show loading state during fetch
- Disable previous/next when unavailable
- Support keyboard navigation

**Don't**:
- Change pages on hover
- Reload entire page (use AJAX)
- Hide pagination controls on mobile
- Auto-play through pages

### Content

**Do**:
- Show accurate total counts
- Use specific item labels ("247 leads")
- Provide page size options
- Update URL with current page

**Don't**:
- Round or estimate totals ("~250 items")
- Use vague labels ("items", "records")
- Force small page sizes on desktop
- Break back button functionality

---

## Code Example

```tsx
// React + Tailwind implementation
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showInfo = true,
  siblingCount = 1,
  boundaryCount = 1,
}) {
  const generatePages = () => {
    const pages = [];
    const showLeftEllipsis = currentPage > boundaryCount + siblingCount + 2;
    const showRightEllipsis = currentPage < totalPages - boundaryCount - siblingCount - 1;

    // First pages
    for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
      pages.push(i);
    }

    // Left ellipsis
    if (showLeftEllipsis) pages.push('left-ellipsis');

    // Middle pages (current ± siblings)
    const start = Math.max(boundaryCount + 1, currentPage - siblingCount);
    const end = Math.min(totalPages - boundaryCount, currentPage + siblingCount);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    // Right ellipsis
    if (showRightEllipsis) pages.push('right-ellipsis');

    // Last pages
    for (let i = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1); i <= totalPages; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav aria-label="Pagination" className="flex flex-col items-center gap-4">
      {/* Info Text */}
      {showInfo && totalItems && (
        <div className="text-sm text-neutral-600" role="status" aria-live="polite">
          Mostrando {startItem}-{endItem} de {totalItems} leads
        </div>
      )}

      {/* Pagination Controls */}
      <ul className="flex items-center gap-2">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className={`
              flex items-center gap-1 px-4 py-2 rounded-md border transition-all duration-150
              ${currentPage === 1
                ? 'border-neutral-200 text-neutral-400 cursor-not-allowed opacity-50'
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 hover:text-primary-600'
              }
            `}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </li>

        {/* Page Numbers */}
        {generatePages().map((page, index) => {
          if (typeof page === 'string') {
            // Ellipsis
            return (
              <li key={page}>
                <span className="px-3 py-2 text-neutral-500">...</span>
              </li>
            );
          }

          const isActive = page === currentPage;

          return (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                aria-label={isActive ? `Page ${page}, current page` : `Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  w-10 h-10 rounded-md border font-medium transition-all duration-150
                  focus:outline-none focus:ring-3 focus:ring-primary-600/30
                  ${isActive
                    ? 'bg-primary-700 border-primary-700 text-support-50 shadow-md cursor-default'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 hover:text-primary-600'
                  }
                `}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className={`
              flex items-center gap-1 px-4 py-2 rounded-md border transition-all duration-150
              ${currentPage === totalPages
                ? 'border-neutral-200 text-neutral-400 cursor-not-allowed opacity-50'
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 hover:text-primary-600'
              }
            `}
          >
            <span className="hidden sm:inline">Próxima</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
```

---

## Related Components

- **Table** - Often contains pagination
- **Search** - Results typically paginated
- **Tabs** - Alternative to pagination for related content
- **Infinite Scroll** - Alternative loading pattern
- **Load More Button** - Simpler alternative

---

## References

- WAI-ARIA Authoring Practices: [Pagination Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/pagination/)
- Nielsen Norman Group: [Pagination Best Practices](https://www.nngroup.com/articles/item-list-view-all/)
- Baymard Institute: [Pagination UX](https://baymard.com/blog/pagination-design)

---

**Component Status**: ✅ Production Ready
**Last Updated**: 2025-12-13
**Version**: 1.0.0
