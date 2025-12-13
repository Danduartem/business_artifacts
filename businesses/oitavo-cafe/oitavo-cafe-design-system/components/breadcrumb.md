# Breadcrumb Component

**Oitavo Café Design System** | Navigation Component

---

## Overview

Breadcrumbs provide a secondary navigation pattern that shows users their current location within the site hierarchy and allows them to backtrack through parent pages. For Oitavo Café, breadcrumbs help users understand the system structure and easily navigate back through the funnel stages.

**Purpose**: Help users orient themselves within the site structure and provide quick access to ancestor pages.

**Brand Alignment**: Breadcrumbs embody "System Over Service" by visualizing the connection between pages and showing the integrated flow. They reduce friction for the skeptical user (Carolina) by making navigation transparent and predictable.

---

## Anatomy

```
Home  /  Como funciona  /  Casos reais  /  Case: Boutique de Roupas
^^^^^    ^^^^^^^^^^^^^^    ^^^^^^^^^^^     ^^^^^^^^^^^^^^^^^^^^^^^^^^
Link     Link              Link            Current page (no link)

Parts:
1. Home icon/link (optional)
2. Separator (/)
3. Ancestor links
4. Current page (text only)
```

**Parts**:
1. **Home Link** - Optional first item linking to homepage
2. **Separator** - Visual divider between items (/, >, →)
3. **Link Items** - Clickable ancestor pages
4. **Current Item** - Non-clickable current page label
5. **Container** - Wrapper with proper spacing and layout

---

## Variants

### Default (Full Path)

**Use Case**: Standard pages with clear hierarchy

```
Início  /  Meu ROI  /  Funil de Vendas  /  Relatório Semanal
```

**Specs**:
- Font size: `14px` (0.875rem - sm)
- Font weight: `400` (Regular)
- Link color: `neutral-600` (#685A56)
- Current color: `neutral-800` (#2B2523)
- Separator: `/` in `neutral-400` (#958986)
- Gap between items: `12px` (spacing-3)
- Container padding: `16px 0` (spacing-4 top/bottom)

### Collapsed (Mobile/Long Paths)

**Use Case**: Mobile devices, paths with 5+ levels

```
...  /  Funil de Vendas  /  Relatório Semanal
```

**Specs**:
- Show: First item, last 2 items
- Collapse middle items into `...` (ellipsis)
- Ellipsis clickable: Opens dropdown with full path
- Same styling as default

### Icon-Based

**Use Case**: Tighter spaces, international audiences

```
🏠  ›  📊  ›  📈  ›  Relatório Semanal
```

**Specs**:
- Icons: 16×16px
- Separator: `›` (chevron right)
- Icon color matches link color
- Tooltip on hover showing full label

---

## States

### Link (Default)

**Visual**:
- Text color: `neutral-600` (#685A56)
- Font weight: `400`
- Text decoration: `none`
- Cursor: `pointer`

### Link Hover

**Visual**:
- Text color: `primary-600` (#993A33)
- Text decoration: `underline`
- Transition: `color 150ms ease-out`

### Link Active (Click)

**Visual**:
- Text color: `primary-700` (#75201C)
- Scale: `0.98`
- Transition: `transform 100ms`

### Link Focus

**Visual**:
- Outline: `2px solid primary-600`
- Outline offset: `2px`
- Border radius: `4px`

### Current Page (Non-interactive)

**Visual**:
- Text color: `neutral-800` (#2B2523)
- Font weight: `500` (Medium)
- Cursor: `default`
- No hover effects

### Separator

**Visual**:
- Color: `neutral-400` (#958986)
- Margin: `0 12px` (spacing-3)
- Non-interactive
- User-select: `none`

---

## Responsive Behavior

### Desktop (1440px+)
- Show full path (up to 6 levels)
- All items visible
- Separator: `/`
- Min container height: `48px`

### Tablet (768px - 1439px)
- Show full path (up to 5 levels)
- If > 5 levels, use collapsed variant
- Separator: `/` or `›`
- Min container height: `44px`

### Mobile (< 768px)
- **Auto-collapse at 4+ levels**
- Show: First + Last 2 items
- Separator: `›` (more compact)
- Font size: `13px`
- Tap target minimum: `44×44px` for links

**Example Mobile Transformation**:
```
Desktop:
Início / Meu ROI / Funil / Leads / Relatório de Dezembro

Mobile:
Início › ... › Leads › Relatório de Dezembro
```

---

## Animation Specifications

### Hover Transition

**Link Hover**:
- Duration: `150ms`
- Easing: `ease-out`
- Properties: `color`, `text-decoration`

### Ellipsis Dropdown (Collapsed)

**Dropdown Open**:
- Duration: `200ms`
- Easing: `cubic-bezier(0, 0, 0.2, 1)` (decelerate)
- Transform: `scaleY(0) → scaleY(1)`
- Transform origin: `top`
- Opacity: `0 → 1`

**Dropdown Close**:
- Duration: `150ms`
- Easing: `cubic-bezier(0.4, 0, 1, 1)` (accelerate)
- Transform: `scaleY(1) → scaleY(0)`
- Opacity: `1 → 0`

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .breadcrumb a {
    transition: color 50ms;
  }
  .breadcrumb-dropdown {
    transition: opacity 50ms;
  }
}
```

---

## Props / API

```typescript
interface BreadcrumbProps {
  // Content
  items: BreadcrumbItem[];

  // Variants
  variant?: 'default' | 'collapsed' | 'icon';
  separator?: '/' | '>' | '›' | '→' | React.ReactNode;

  // Behavior
  maxItems?: number; // Auto-collapse after N items
  showHome?: boolean; // Include home link
  homeLabel?: string; // Default: "Início"
  homeIcon?: React.ReactNode;

  // Styling
  size?: 'small' | 'medium';

  // Accessibility
  ariaLabel?: string; // Default: "Breadcrumb"
}

interface BreadcrumbItem {
  label: string;
  href?: string; // Omit for current page
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}
```

**Example Usage**:
```tsx
<Breadcrumb
  items={[
    { label: 'Início', href: '/' },
    { label: 'Meu ROI', href: '/dashboard' },
    { label: 'Funil', href: '/dashboard/funnel' },
    { label: 'Relatório Semanal' } // Current page
  ]}
  separator="/"
  maxItems={4}
  showHome={true}
/>
```

---

## Accessibility

### Semantic HTML

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/">Início</a>
    </li>
    <li class="breadcrumb-separator" aria-hidden="true">/</li>
    <li class="breadcrumb-item">
      <a href="/dashboard">Meu ROI</a>
    </li>
    <li class="breadcrumb-separator" aria-hidden="true">/</li>
    <li class="breadcrumb-item">
      <a href="/dashboard/funnel" aria-current="page">Funil</a>
    </li>
  </ol>
</nav>
```

### ARIA Attributes

**Container**:
- `<nav aria-label="Breadcrumb">` - Identifies navigation region
- `role="navigation"` - Redundant but safe for older AT

**Current Page**:
- `aria-current="page"` - Marks current location
- No `href` attribute on current item

**Separator**:
- `aria-hidden="true"` - Hide from screen readers
- Use CSS pseudo-elements when possible

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next breadcrumb link |
| `Shift + Tab` | Move to previous breadcrumb link |
| `Enter` | Activate focused link |

### Screen Reader Behavior

- Announces: "Breadcrumb navigation"
- Announces: "Link, Início, 1 of 3"
- Announces: "Funil, current page"
- Separator not announced (aria-hidden)

---

## Brand Voice in Breadcrumbs

### Do's ✓

**Direct, Results-Focused**:
- "Meu ROI" (not "Dashboard" or "Overview")
- "Vendas" (not "Sales Pipeline")
- "Investimento" (not "Pricing")

**Clear Hierarchy**:
- "Início" (not "Home")
- "Como funciona" (not "About Us")
- "Casos reais" (not "Case Studies")
- "Falar com a gente" (not "Contact")

**Specific Labels**:
- "Relatório de Dezembro" (not "Report")
- "Funil de Conversão" (not "Funnel")
- "Configurações da Conta" (not "Settings")

### Don'ts ✗

**Avoid Generic Labels**:
- ✗ "Page 1"
- ✗ "Details"
- ✗ "View"

**Avoid Jargon**:
- ✗ "KPI Dashboard"
- ✗ "Engagement Metrics"
- ✗ "Conversion Optimization"

**Avoid Long Labels**:
- ✗ "Relatório Completo de Análise de Performance de Vendas do Mês de Dezembro de 2025"
- ✓ "Relatório de Vendas - Dez/2025"

---

## Usage Guidelines

### When to Use

- Pages 3+ levels deep in site hierarchy
- Complex navigation structures
- Long forms or multi-step processes
- Documentation or help sections
- E-commerce category pages

### When NOT to Use

- Homepage (no hierarchy)
- Flat site structures (2 levels or less)
- Completely unrelated pages
- As a substitute for primary navigation
- In mobile apps (use back button)

### Content Guidelines

**Path Construction**:
- Reflect actual page hierarchy
- Keep labels concise (3-5 words max)
- Use consistent naming with page titles
- Omit unnecessary words ("Page", "Section")

**Hierarchy Logic**:
- Always start with home or top-level section
- Follow natural information architecture
- Each item should be a valid standalone page
- Last item is always current page (non-linked)

---

## Do's and Don'ts

### Visual Design

**Do**:
- Use subtle, non-intrusive styling
- Ensure sufficient contrast for links
- Keep separators visually quiet
- Align with page grid system

**Don't**:
- Make breadcrumbs visually prominent
- Use decorative or oversized separators
- Style current page identically to links
- Use breadcrumbs as primary navigation

### Interaction

**Do**:
- Provide clear hover states
- Make links easily clickable (44×44px touch target)
- Support keyboard navigation fully
- Collapse long paths gracefully

**Don't**:
- Make separators clickable
- Open links in new tabs
- Use JavaScript for basic navigation
- Animate unnecessarily

### Content

**Do**:
- Match page titles exactly (or shorten consistently)
- Use brand voice in labels
- Keep hierarchy logical and shallow
- Update dynamically based on actual path

**Don't**:
- Include query parameters in labels
- Use technical IDs or codes
- Create circular paths
- Exceed 6 levels (restructure if needed)

---

## Code Example

```tsx
// React + Tailwind implementation
import { Fragment } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export function Breadcrumb({ items, separator = '/', maxItems = 6, ariaLabel = 'Breadcrumb' }) {
  const displayItems = items.length > maxItems
    ? [items[0], { label: '...' }, ...items.slice(-2)]
    : items;

  return (
    <nav aria-label={ariaLabel} className="breadcrumb">
      <ol className="flex items-center gap-3 text-sm">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <Fragment key={index}>
              <li className="breadcrumb-item">
                {isLast ? (
                  // Current page (non-link)
                  <span
                    className="text-neutral-800 font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : isEllipsis ? (
                  // Ellipsis (could be dropdown trigger)
                  <button
                    className="text-neutral-600 hover:text-primary-600 transition-colors duration-150"
                    aria-label="Show hidden path"
                  >
                    {item.label}
                  </button>
                ) : (
                  // Regular link
                  <a
                    href={item.href}
                    className="text-neutral-600 hover:text-primary-600 hover:underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 rounded"
                  >
                    {item.label}
                  </a>
                )}
              </li>

              {/* Separator */}
              {!isLast && (
                <li
                  className="breadcrumb-separator text-neutral-400 select-none"
                  aria-hidden="true"
                >
                  {separator === 'icon' ? (
                    <ChevronRightIcon className="h-4 w-4" />
                  ) : (
                    separator
                  )}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
```

**Usage Example**:
```tsx
// In a page component
function ReportPage() {
  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: 'Início', href: '/' },
          { label: 'Meu ROI', href: '/dashboard' },
          { label: 'Funil', href: '/dashboard/funnel' },
          { label: 'Relatório Semanal' }
        ]}
      />

      <h1>Relatório Semanal de Vendas</h1>
      {/* Page content */}
    </div>
  );
}
```

---

## Related Components

- **Navbar** - Primary site navigation
- **Tabs** - Section-level navigation
- **Sidebar** - Vertical persistent navigation
- **Stepper** - Sequential process indicator
- **Pagination** - List/table navigation

---

## References

- WAI-ARIA Authoring Practices: [Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
- Nielsen Norman Group: [Breadcrumb Navigation](https://www.nngroup.com/articles/breadcrumb-navigation-useful/)
- W3C: [Breadcrumb Example](https://www.w3.org/WAI/ARIA/apg/example-index/breadcrumb/index.html)

---

**Component Status**: ✅ Production Ready
**Last Updated**: 2025-12-13
**Version**: 1.0.0
