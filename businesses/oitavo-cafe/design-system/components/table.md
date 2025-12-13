# Table Component

## Overview

**Purpose**: Tables organize and display structured data in rows and columns, enabling users to scan, compare, sort, and filter information efficiently.

**Usage**: Use for datasets with 3+ columns and 10+ rows. Common for analytics dashboards, campaign performance, client lists, and transaction history.

**Brand Context**: For Oitavo Café, tables show campaign metrics (Campanha, Alcance, Engajamento, ROI), client databases, and content calendars - helping Carolina make data-driven decisions quickly.

---

## Anatomy

```
Basic Table:
┌────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Campanha ▼  │ Alcance  │ Engajamento │ ROI        │   │ ← Header
│ ├─────────────────────────────────────────────────────┤   │
│ │ Post Café   │ 12.5K    │ 8.2%        │ R$ 2.340   │   │ ← Row 1
│ │ Story Nov   │ 8.1K     │ 12.5%       │ R$ 1.890   │   │ ← Row 2
│ │ Reels 15/11 │ 24.3K    │ 15.8%       │ R$ 4.120   │   │ ← Row 3
│ └─────────────────────────────────────────────────────┘   │
│ [Pagination]                                               │
└────────────────────────────────────────────────────────────┘

Features:
1. Header Row - Column labels, sortable
2. Data Rows - Alternating backgrounds (zebra striping)
3. Cells - Text-aligned content
4. Actions Column - Row-specific buttons/menu
5. Selection - Checkboxes for bulk actions
6. Sticky Header - Remains visible on scroll
```

---

## Variants

### 1. **Basic Table** (Default)
- Simple grid layout
- No sorting, filtering, or selection
- Border between rows: `1px solid` `neutral-200`
- Use for small, static datasets (< 50 rows)

### 2. **Sortable Table**
- Clickable column headers with sort indicators
- Icons: `↑` ascending, `↓` descending, `↕` unsorted
- Maintains sort state
- ARIA: `aria-sort="ascending|descending|none"`

### 3. **Selectable Table**
- Checkbox column (leftmost)
- Select all checkbox in header
- Bulk action toolbar appears when rows selected
- Visual highlight for selected rows

### 4. **Expandable Rows**
- Chevron icon to expand/collapse details
- Nested content panel below row
- Use for additional context without cluttering

### 5. **Responsive Table**
- **Desktop (≥768px)**: Standard table layout
- **Mobile (<768px)**: Card-based layout or horizontal scroll
- Sticky first column option

---

## Sizes

### Compact
- **Row Height**: `40px`
- **Font Size**: `fontSize.sm` (13px)
- **Cell Padding**: `spacing.2` (8px) horizontal, `spacing.2` vertical
- **Use**: Dense data tables, admin panels

### Default
- **Row Height**: `56px`
- **Font Size**: `fontSize.base` (16px)
- **Cell Padding**: `spacing.4` (16px) horizontal, `spacing.3` (12px) vertical
- **Use**: Standard dashboards, reports

### Comfortable
- **Row Height**: `72px`
- **Font Size**: `fontSize.base` (16px)
- **Cell Padding**: `spacing.5` (24px) horizontal, `spacing.4` (16px) vertical
- **Use**: Touch interfaces, large displays

---

## States

### Header Cell
- **Background**: `neutral-100` (#EDE7E1)
- **Text Color**: `neutral-800` (#2B2523)
- **Font Weight**: `semibold` (600)
- **Font Size**: `fontSize.sm` (13px)
- **Text Transform**: `uppercase`
- **Letter Spacing**: `0.05em`
- **Border Bottom**: `2px solid` `neutral-300`

### Data Cell
- **Background**: `white` (alternating `neutral-50` for zebra)
- **Text Color**: `neutral-700` (#453C39)
- **Font Weight**: `regular` (400)
- **Vertical Align**: `middle`
- **Text Align**: Left for text, right for numbers

### Row - Hover
- **Background**: `neutral-50` (#F8F5F2)
- **Cursor**: `pointer` (if clickable)
- **Transition**: `background 100ms ease-out`

### Row - Selected
- **Background**: `primary-50` (#FCF5F4)
- **Border Left**: `4px solid` `primary-700`
- **Checkbox**: Checked state

### Row - Focus
- **Outline**: `2px solid` `boxShadow.focus`
- **Outline Offset**: `-2px` (inset)

### Sort Indicator
- **Default (Unsorted)**: `neutral-400` color, both arrows visible
- **Active**: `primary-700` color, single arrow
- **Hover**: `primary-600` color

---

## Props/API

```typescript
interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  variant?: 'basic' | 'sortable' | 'selectable' | 'expandable';
  size?: 'compact' | 'default' | 'comfortable';
  stickyHeader?: boolean;
  zebraStriping?: boolean;
  responsive?: 'scroll' | 'cards' | 'auto';
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  onSelectRows?: (selectedIds: string[]) => void;
  onRowClick?: (row: TableRow) => void;
  className?: string;
  emptyState?: React.ReactNode;
}

interface TableColumn {
  id: string;
  label: string;
  accessor: string | ((row: TableRow) => any);
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (value: any, row: TableRow) => React.ReactNode;
}

interface TableRow {
  id: string;
  [key: string]: any;
  expandedContent?: React.ReactNode;
}
```

---

## Accessibility

### Keyboard Navigation
- **Tab**: Navigate through interactive elements (checkboxes, buttons, sort headers)
- **Enter/Space**: Toggle selection, activate sort
- **Arrow Keys**: Navigate cells (optional, advanced)

### ARIA Attributes
```html
<div class="table-container" role="region" aria-label="Tabela de campanhas" tabindex="0">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">
          <input type="checkbox" aria-label="Selecionar todas as campanhas" />
        </th>
        <th scope="col" aria-sort="ascending">
          <button class="table__sort-button">
            Campanha
            <svg aria-hidden="true">↑</svg>
          </button>
        </th>
        <th scope="col" class="table__header--numeric">Alcance</th>
      </tr>
    </thead>
    <tbody>
      <tr aria-selected="false">
        <td><input type="checkbox" aria-label="Selecionar Post Café" /></td>
        <td>Post Café</td>
        <td class="table__cell--numeric">12.5K</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Guidelines
- **Use `<table>` semantics**: `<thead>`, `<tbody>`, `<th scope="col">`, `<td>`
- **aria-sort**: Indicate sort state on headers
- **aria-label**: Describe checkboxes clearly
- **Scrollable wrapper**: `role="region"` with `aria-label` and `tabindex="0"`
- **Contrast**: 4.5:1 minimum for all text
- **Focus indicators**: Visible on all interactive elements

---

## Usage Guidelines

### Do's
- ✅ **Align numbers right** - Easier to compare magnitudes
- ✅ **Limit columns to 7-8** - More = horizontal scroll
- ✅ **Use monospaced fonts for numbers** - Better alignment
- ✅ **Sort by most important column** by default
- ✅ **Show loading state** - Skeleton or spinner
- ✅ **Provide empty state** - Clear message when no data
- ✅ **Sticky header for tall tables** - Keep context visible

### Don'ts
- ❌ **Don't truncate with ellipsis** without tooltip
- ❌ **Don't use tables for layout** - Use CSS Grid/Flexbox
- ❌ **Don't make entire row clickable** if cells have actions
- ❌ **Don't hide pagination controls** - Always visible
- ❌ **Don't use red/green alone** - Add icons for meaning
- ❌ **Don't sort text columns numerically** - "10" before "2"

---

## Code Examples

### HTML Structure
```html
<div class="table-wrapper">
  <!-- Toolbar (optional) -->
  <div class="table-toolbar">
    <div class="table-toolbar__selection" hidden>
      <span>3 campanhas selecionadas</span>
      <button class="button button--secondary">Exportar</button>
      <button class="button button--ghost">Excluir</button>
    </div>
  </div>

  <!-- Table Container -->
  <div class="table-container" role="region" aria-label="Tabela de campanhas" tabindex="0">
    <table class="table table--sortable">
      <thead class="table__header">
        <tr>
          <th class="table__cell table__cell--checkbox">
            <input type="checkbox" aria-label="Selecionar todas" class="checkbox" />
          </th>
          <th class="table__cell" scope="col">
            <button class="table__sort-button" aria-sort="descending">
              <span>Campanha</span>
              <svg class="table__sort-icon" width="16" height="16">
                <path d="M8 4L8 12M5 9L8 12L11 9" stroke="currentColor"/>
              </svg>
            </button>
          </th>
          <th class="table__cell table__cell--numeric" scope="col">Alcance</th>
          <th class="table__cell table__cell--numeric" scope="col">Engajamento</th>
          <th class="table__cell table__cell--numeric" scope="col">ROI</th>
          <th class="table__cell table__cell--actions" scope="col">
            <span class="sr-only">Ações</span>
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr class="table__row" aria-selected="false">
          <td class="table__cell table__cell--checkbox">
            <input type="checkbox" aria-label="Selecionar Post Café" class="checkbox" />
          </td>
          <td class="table__cell">
            <div class="table__cell-content">
              <strong>Post Café da Manhã</strong>
              <span class="table__cell-subtitle">Instagram • 15/Nov</span>
            </div>
          </td>
          <td class="table__cell table__cell--numeric">12.500</td>
          <td class="table__cell table__cell--numeric">
            <span class="table__badge table__badge--success">8.2%</span>
          </td>
          <td class="table__cell table__cell--numeric">R$ 2.340</td>
          <td class="table__cell table__cell--actions">
            <button class="table__action-button" aria-label="Mais ações">
              <svg width="16" height="16">...</svg>
            </button>
          </td>
        </tr>
        <!-- More rows -->
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="table-pagination">
    <span class="table-pagination__info">Mostrando 1-10 de 48 campanhas</span>
    <!-- Pagination component -->
  </div>
</div>
```

### CSS
```css
.table-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
}

.table-container {
  overflow-x: auto;
  border: 1px solid var(--neutral-200);
  border-radius: var(--borderRadius-md);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--fontSize-base);
}

.table__header {
  background: var(--neutral-100);
  border-bottom: 2px solid var(--neutral-300);
  position: sticky;
  top: 0;
  z-index: 10;
}

.table__cell {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  vertical-align: middle;
}

.table__cell--numeric {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-family: var(--fontFamily-mono);
}

.table__cell--checkbox {
  width: 48px;
  padding: var(--spacing-2);
}

.table__sort-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  background: transparent;
  border: none;
  padding: 0;
  color: var(--neutral-800);
  font-size: var(--fontSize-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 150ms ease-out;
}

.table__sort-button:hover {
  color: var(--primary-700);
}

.table__sort-icon {
  stroke: var(--neutral-400);
  transition: stroke 150ms ease-out;
}

.table__sort-button[aria-sort="ascending"] .table__sort-icon,
.table__sort-button[aria-sort="descending"] .table__sort-icon {
  stroke: var(--primary-700);
}

.table__row {
  border-bottom: 1px solid var(--neutral-200);
  transition: background 100ms ease-out;
}

.table__row:hover {
  background: var(--neutral-50);
}

.table__row[aria-selected="true"] {
  background: var(--primary-50);
  border-left: 4px solid var(--primary-700);
}

.table--zebra .table__row:nth-child(even) {
  background: var(--neutral-50);
}

.table__badge {
  display: inline-flex;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--borderRadius-sm);
  font-size: var(--fontSize-xs);
  font-weight: 600;
}

.table__badge--success {
  background: var(--feedback-successBg);
  color: var(--feedback-success);
}

/* Responsive */
@media (max-width: 768px) {
  .table-container {
    border: none;
  }

  .table {
    display: block;
  }

  .table__row {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-4);
    border: 1px solid var(--neutral-200);
    border-radius: var(--borderRadius-md);
    margin-bottom: var(--spacing-3);
  }

  .table__cell {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-2) 0;
    border-bottom: 1px solid var(--neutral-100);
  }

  .table__cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--neutral-600);
  }
}
```

---

## Related Components
- **Pagination** - Navigate large datasets
- **Avatar** - User/entity representation in cells
- **Badge** - Status indicators
- **Dropdown** - Actions menu
- **Checkbox** - Row selection
