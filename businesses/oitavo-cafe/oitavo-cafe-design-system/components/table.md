# Table Component

**Component Category:** Data Display
**Design System:** Oitavo Café Design System
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

Tables organize and display structured data in rows and columns, enabling comparison and analysis. In the Oitavo Café system, tables are essential for Carolina's ROI dashboard - showing campaign performance, client lists, transaction history, and detailed metrics that prove results.

**Primary Use Cases:**
- Campaign performance comparisons
- ROI metrics across channels
- Client/project lists
- Transaction and billing history
- Detailed analytics reports

**Design Principle Alignment:**
Following "Data Dignity: Numbers Are Heroes," tables make metrics scannable and comparable. Mobile-first approach ensures Carolina can check her dashboard anywhere - tables transform into cards on mobile to maintain clarity without sacrificing information.

---

## Anatomy

```
┌─────────────────────────────────────────────────────────┐
│ Table Title                                    [Search] │ ← Caption/Header
├─────────────────────────────────────────────────────────┤
│ Column 1    │ Column 2    │ Column 3    │ Actions      │ ← Header Row
├─────────────┼─────────────┼─────────────┼──────────────┤
│ Cell Data   │ Cell Data   │ Cell Data   │ [•••]        │ ← Data Row
│ Cell Data   │ Cell Data   │ Cell Data   │ [•••]        │
│ Cell Data   │ Cell Data   │ Cell Data   │ [•••]        │
├─────────────┼─────────────┼─────────────┼──────────────┤
│ Total       │ Sum Value   │             │              │ ← Footer (optional)
└─────────────────────────────────────────────────────────┘
```

**Anatomy Parts:**
1. **Container** - Wrapper with overflow handling
2. **Caption** (optional) - Table title and controls
3. **Header Row** - Column labels, sortable indicators
4. **Data Rows** - Content cells
5. **Footer** (optional) - Totals, summaries, pagination
6. **Actions Column** (optional) - Row-specific actions

---

## Variants

### 1. Basic Table
Simple data display without complex interactions.

**Visual Characteristics:**
- Clean rows with subtle borders
- Alternating row backgrounds (zebra striping) optional
- Minimal styling for clarity

**When to Use:**
- Simple data lists
- Reference information
- Static reports

### 2. Sortable Table
Columns can be sorted ascending/descending.

**Visual Characteristics:**
- Sort indicators in headers (↑↓)
- Active sort column highlighted
- Keyboard accessible sorting

**When to Use:**
- Campaign performance tables
- Client lists
- Any data requiring comparison

### 3. Selectable Table
Rows can be selected with checkboxes.

**Visual Characteristics:**
- Checkbox column on left
- Selected rows highlighted
- Bulk action toolbar appears on selection

**When to Use:**
- Batch operations
- Multi-select actions
- Data export selections

### 4. Expandable/Collapsible Table
Rows expand to show additional details.

**Visual Characteristics:**
- Expand icon in first column
- Expanded content slides in smoothly
- Nested information indented

**When to Use:**
- Detailed transaction history
- Campaign breakdown
- Hierarchical data

### 5. Responsive Table (Mobile)
On mobile, transforms into card-based layout.

**Visual Characteristics:**
- Each row becomes a card
- Column headers inline with values
- Scrollable on tablet (horizontal)
- Stacked on mobile

**When to Use:**
- All tables in responsive contexts
- Dashboard tables Carolina checks on phone

---

## Sizes

### Compact
- Row height: 40px
- Padding: 8px 12px
- Font size: 14px
- Use: Dense data, dashboards with many tables

### Default
- Row height: 56px
- Padding: 16px
- Font size: 16px
- Use: Standard tables, comfortable reading

### Comfortable
- Row height: 64px
- Padding: 20px
- Font size: 16px
- Use: Important data requiring focus

---

## States

### Header States

**Default**
```css
background: var(--neutral-50);
color: var(--neutral-700);
font-weight: 600;
border-bottom: 2px solid var(--neutral-300);
```

**Sortable (Hover)**
```css
cursor: pointer;
background: var(--neutral-100);
```

**Active Sort**
```css
color: var(--primary-700);
background: var(--primary-50);
```

### Row States

**Default**
```css
background: white;
border-bottom: 1px solid var(--neutral-200);
```

**Hover**
```css
background: var(--support-50);
cursor: pointer;
```

**Selected**
```css
background: var(--primary-50);
border: 1px solid var(--primary-300);
```

**Focus**
```css
outline: 2px solid var(--primary-600);
outline-offset: -2px;
```

### Cell States

**Default**
```css
padding: 16px;
color: var(--neutral-800);
vertical-align: middle;
```

**Numeric (Right-aligned)**
```css
text-align: right;
font-variant-numeric: tabular-nums;
font-weight: 500;
```

**ROI Highlight**
```css
color: var(--accent-600);
font-weight: 600;
font-size: 18px;
```

---

## Color Specifications

### Table Background
```css
background: white;
border: 1px solid var(--neutral-200);
border-radius: var(--radius-md);
```

### Headers
```css
background: var(--neutral-50);
color: var(--neutral-700);
border-bottom: 2px solid var(--neutral-300);
```

### Zebra Striping (Optional)
```css
tr:nth-child(even) {
  background: var(--support-50);
}
```

### Hover Row
```css
background: var(--support-100);
```

### Selected Row
```css
background: var(--primary-50);
border-left: 3px solid var(--primary-600);
```

### Positive Metrics
```css
color: var(--accent-600);  /* Golden Amber */
font-weight: 600;
```

### Negative Metrics
```css
color: var(--primary-700);
font-weight: 600;
```

---

## Typography

### Table Headers
- Font Size: 14px (var(--font-size-sm))
- Font Weight: 600 (semibold)
- Color: var(--neutral-700)
- Text Transform: None
- Letter Spacing: 0.03em

### Table Data
- Font Size: 16px (var(--font-size-base))
- Font Weight: 400 (regular)
- Color: var(--neutral-800)
- Line Height: 1.5

### Numeric Data
- Font Variant: tabular-nums (monospace numbers for alignment)
- Font Weight: 500 (medium)
- Text Align: Right

### Metric Highlights (ROI)
- Font Size: 18px
- Font Weight: 600 (semibold)
- Color: var(--accent-600) or var(--primary-700)

---

## Spacing & Layout

### Cell Padding
- Compact: 8px 12px
- Default: 16px
- Comfortable: 20px

### Row Height
- Compact: 40px
- Default: 56px
- Comfortable: 64px

### Column Gaps
- Minimum: 16px between columns
- Preferred: 24px for comfortable reading

### Table Margins
- Container padding: 0 (overflow handling)
- Section spacing: 32px between tables

---

## Sorting & Interaction

### Sort Indicators

```html
<th class="table__header table__header--sortable" aria-sort="none">
  <button class="table__sort-button">
    Campaign Name
    <span class="table__sort-icon">
      <svg><!-- sort icon --></svg>
    </span>
  </button>
</th>
```

**Sort States:**
- `aria-sort="none"` - Not sorted (both arrows gray)
- `aria-sort="ascending"` - Ascending (↑ active)
- `aria-sort="descending"` - Descending (↓ active)

### Selection

```html
<td class="table__cell table__cell--checkbox">
  <input
    type="checkbox"
    id="row-1"
    aria-label="Select campaign Instagram Q4"
  />
</td>
```

**Bulk Selection:**
- Header checkbox selects/deselects all
- Indeterminate state when some selected
- Selection counter: "3 of 15 selected"

---

## Responsive Behavior

### Desktop (> 1024px)
- Full table layout
- All columns visible
- Horizontal scroll if needed
- Fixed header option for long tables

### Tablet (768px - 1024px)
- Horizontal scroll with sticky first column
- Reduce padding slightly
- Consider hiding less important columns
- Show column toggle if many columns

### Mobile (< 768px)
**Transform to Cards:**

```
Desktop Table:
┌─────────┬─────────┬─────────┐
│ Name    │ Revenue │ ROI     │
├─────────┼─────────┼─────────┤
│ Camp A  │ R$42k   │ +23%    │
│ Camp B  │ R$38k   │ +18%    │
└─────────┴─────────┴─────────┘

Mobile Cards:
┌───────────────────────┐
│ Campaign Name: Camp A │
│ Revenue: R$42k        │
│ ROI: +23%             │
│ [Actions]             │
├───────────────────────┤
│ Campaign Name: Camp B │
│ Revenue: R$38k        │
│ ROI: +18%             │
│ [Actions]             │
└───────────────────────┘
```

**Implementation:**
```css
@media (max-width: 768px) {
  /* Hide thead */
  .table__header {
    display: none;
  }

  /* Transform rows to cards */
  .table__row {
    display: block;
    margin-bottom: 16px;
    border: 1px solid var(--neutral-200);
    border-radius: var(--radius-md);
    padding: 16px;
  }

  /* Show labels inline */
  .table__cell::before {
    content: attr(data-label);
    font-weight: 600;
    display: inline-block;
    margin-right: 8px;
  }

  .table__cell {
    display: block;
    text-align: left;
    padding: 8px 0;
  }
}
```

---

## Accessibility

### Semantic HTML

```html
<table class="table" role="table" aria-label="Campaign Performance">
  <caption class="table__caption">
    Campaign Performance - Q4 2024
  </caption>

  <thead>
    <tr>
      <th scope="col" aria-sort="none">
        <button class="table__sort">Campaign Name</button>
      </th>
      <th scope="col" class="table__cell--numeric">Revenue</th>
      <th scope="col" class="table__cell--numeric">ROI</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Instagram Q4</td>
      <td class="table__cell--numeric">R$ 42.350</td>
      <td class="table__cell--numeric table__cell--positive">+23%</td>
      <td>
        <button aria-label="Actions for Instagram Q4 campaign">•••</button>
      </td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td><strong>Total</strong></td>
      <td class="table__cell--numeric"><strong>R$ 156.890</strong></td>
      <td class="table__cell--numeric">+19%</td>
      <td></td>
    </tr>
  </tfoot>
</table>
```

### ARIA Guidelines
- Use `<table>` element (not div-based tables)
- `<caption>` describes table purpose
- `scope="col"` on header cells
- `aria-sort` on sortable columns
- `aria-label` on action buttons with context
- `role="status"` for dynamic updates (sorting, filtering)

### Keyboard Navigation
- **Tab**: Move between interactive elements
- **Arrow Keys**: Navigate cells (optional enhancement)
- **Enter/Space**: Activate sort, expand row, select
- **Shift + Click**: Multi-select rows
- **Ctrl/Cmd + A**: Select all (when in table)

### Screen Reader Support
- Announce column headers with each cell
- Announce sort state changes
- Announce selection count
- Provide context for numeric values ("42,350 reais")
- Announce row expansion/collapse

### Color Contrast
- All text meets WCAG AA (4.5:1)
- Don't rely on color alone for positive/negative (use icons too)
- Selected state: sufficient contrast
- Focus indicators: 3:1 minimum

---

## Do's and Don'ts

### Do

- **Do** make numeric columns right-aligned for easy comparison
- **Do** use tabular-nums for consistent digit width
- **Do** transform to cards on mobile - never horizontal scroll only
- **Do** highlight ROI and growth metrics with Golden Amber
- **Do** provide sort functionality for large datasets
- **Do** use fixed headers for long tables
- **Do** show loading states for async data
- **Do** include empty states with helpful guidance

### Don't

- **Don't** cram too many columns (prioritize, hide less important on mobile)
- **Don't** use tiny fonts that strain readability
- **Don't** forget zebra striping for long tables (aids scanning)
- **Don't** make entire rows clickable AND have action buttons (confusing)
- **Don't** use generic action labels ("Edit" - edit what?)
- **Don't** forget caption/title for context
- **Don't** hide pagination controls on mobile
- **Don't** use color alone to indicate positive/negative

### Brand-Specific Guidance

**Carolina's ROI Dashboard:**
- Revenue and ROI columns are the heroes - make them prominent
- Always show currency (R$, €) with amounts
- Use Golden Amber for positive growth, Coffee Maroon for decline
- Include comparison context (vs. last month, vs. target)
- Sort by ROI descending by default - show winners first
- Mobile transformation is critical - Carolina checks on phone
- Empty state: "No campaigns yet. Start your first campaign to see ROI here."

**Table Best Practice:**
```
┌──────────────┬───────────┬─────────┬─────────────┐
│ Campaign     │ Revenue   │ ROI     │ Status      │
├──────────────┼───────────┼─────────┼─────────────┤
│ Instagram Q4 │ R$ 42.350 │ +23% ↗  │ Active      │
│              │           │ Golden  │             │
│ Email Nov    │ R$ 38.120 │ +18% ↗  │ Active      │
│ Google Ads   │ R$ 29.450 │ +12% ↗  │ Paused      │
├──────────────┼───────────┼─────────┼─────────────┤
│ Total        │ R$109.920 │ +19%    │ 2 active    │
└──────────────┴───────────┴─────────┴─────────────┘
        ↑             ↑         ↑
     Context      Currency   Highlight
```

---

## Code Examples

### Basic Table

```html
<div class="table-container">
  <table class="table" aria-label="Campaign Performance">
    <caption class="table__caption">
      Campaign Performance - Q4 2024
    </caption>

    <thead>
      <tr>
        <th scope="col">Campaign Name</th>
        <th scope="col" class="table__cell--numeric">Revenue</th>
        <th scope="col" class="table__cell--numeric">ROI</th>
        <th scope="col">Status</th>
      </tr>
    </thead>

    <tbody>
      <tr class="table__row">
        <td>Instagram Q4</td>
        <td class="table__cell--numeric">R$ 42.350</td>
        <td class="table__cell--numeric table__cell--positive">+23% ↗</td>
        <td><span class="badge badge--success">Active</span></td>
      </tr>
      <tr class="table__row">
        <td>Email November</td>
        <td class="table__cell--numeric">R$ 38.120</td>
        <td class="table__cell--numeric table__cell--positive">+18% ↗</td>
        <td><span class="badge badge--success">Active</span></td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td><strong>Total</strong></td>
        <td class="table__cell--numeric"><strong>R$ 80.470</strong></td>
        <td class="table__cell--numeric"><strong>+21%</strong></td>
        <td>2 active</td>
      </tr>
    </tfoot>
  </table>
</div>
```

```css
.table-container {
  overflow-x: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.table__caption {
  padding: 16px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  text-align: left;
  color: var(--neutral-800);
  border-bottom: 1px solid var(--neutral-200);
}

thead {
  background: var(--neutral-50);
}

th {
  padding: 16px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--neutral-700);
  text-align: left;
  border-bottom: 2px solid var(--neutral-300);
  letter-spacing: 0.03em;
}

td {
  padding: 16px;
  border-bottom: 1px solid var(--neutral-200);
  color: var(--neutral-800);
}

.table__row:hover {
  background: var(--support-50);
}

.table__cell--numeric {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
}

.table__cell--positive {
  color: var(--accent-600);
  font-weight: 600;
}

.table__cell--negative {
  color: var(--primary-700);
  font-weight: 600;
}

tfoot td {
  font-weight: 600;
  background: var(--neutral-50);
  border-top: 2px solid var(--neutral-300);
}
```

### Sortable Table

```html
<thead>
  <tr>
    <th scope="col">
      <button
        class="table__sort"
        aria-sort="ascending"
        aria-label="Sort by Campaign Name, currently ascending"
      >
        Campaign Name
        <span class="table__sort-icon" aria-hidden="true">↑</span>
      </button>
    </th>
    <th scope="col" class="table__cell--numeric">
      <button
        class="table__sort"
        aria-sort="none"
        aria-label="Sort by Revenue"
      >
        Revenue
        <span class="table__sort-icon" aria-hidden="true">↕</span>
      </button>
    </th>
  </tr>
</thead>
```

```css
.table__sort {
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  font: inherit;
  text-align: inherit;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.table__sort:hover {
  color: var(--primary-600);
}

.table__sort[aria-sort="ascending"] .table__sort-icon,
.table__sort[aria-sort="descending"] .table__sort-icon {
  color: var(--primary-600);
}

.table__sort-icon {
  font-size: 12px;
  opacity: 0.5;
  transition: opacity var(--duration-fast) var(--ease-gentle);
}

.table__sort:hover .table__sort-icon {
  opacity: 1;
}
```

### Responsive Table (Mobile Cards)

```html
<table class="table table--responsive">
  <thead>
    <tr>
      <th scope="col">Campaign</th>
      <th scope="col">Revenue</th>
      <th scope="col">ROI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Campaign">Instagram Q4</td>
      <td data-label="Revenue">R$ 42.350</td>
      <td data-label="ROI">+23%</td>
    </tr>
  </tbody>
</table>
```

```css
@media (max-width: 768px) {
  .table--responsive thead {
    position: absolute;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
  }

  .table--responsive tbody,
  .table--responsive tr,
  .table--responsive td {
    display: block;
  }

  .table--responsive tr {
    margin-bottom: 16px;
    border: 1px solid var(--neutral-200);
    border-radius: var(--radius-md);
    padding: 16px;
    background: white;
  }

  .table--responsive td {
    border: none;
    padding: 8px 0;
    text-align: left !important;
    display: flex;
    justify-content: space-between;
  }

  .table--responsive td::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--neutral-600);
    flex: 0 0 40%;
  }

  .table--responsive td:last-child {
    border-bottom: none;
  }
}
```

### Table with Selection

```html
<table class="table table--selectable">
  <thead>
    <tr>
      <th scope="col" class="table__cell--checkbox">
        <input
          type="checkbox"
          id="select-all"
          aria-label="Select all campaigns"
        />
      </th>
      <th scope="col">Campaign</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table__row" aria-selected="false">
      <td class="table__cell--checkbox">
        <input
          type="checkbox"
          id="row-1"
          aria-label="Select Instagram Q4 campaign"
        />
      </td>
      <td>Instagram Q4</td>
      <td class="table__cell--numeric">R$ 42.350</td>
    </tr>
  </tbody>
</table>

<!-- Bulk action toolbar (appears when rows selected) -->
<div class="table__bulk-actions" hidden>
  <span>3 selected</span>
  <button>Export</button>
  <button>Delete</button>
</div>
```

```css
.table__cell--checkbox {
  width: 48px;
  padding: 0;
  text-align: center;
}

.table__row[aria-selected="true"] {
  background: var(--primary-50);
  border-left: 3px solid var(--primary-600);
}

.table__bulk-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--primary-100);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}
```

### Fixed Header Table

```html
<div class="table-container table-container--fixed-header">
  <table class="table">
    <!-- table content -->
  </table>
</div>
```

```css
.table-container--fixed-header {
  max-height: 400px;
  overflow-y: auto;
}

.table-container--fixed-header thead {
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

---

## React/Component Example

```jsx
// Table.jsx
const Table = ({
  data,
  columns,
  sortable = false,
  selectable = false,
  responsive = true,
  caption,
  onSort,
  onSelect,
  className = '',
}) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (columnKey) => {
    let direction = 'ascending';
    if (sortConfig?.key === columnKey && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: columnKey, direction });
    onSort?.({ key: columnKey, direction });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((_, i) => i));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRows(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={`table-container ${responsive ? 'table-container--responsive' : ''}`}>
      <table className={`table ${className}`} aria-label={caption}>
        {caption && <caption className="table__caption">{caption}</caption>}

        <thead>
          <tr>
            {selectable && (
              <th className="table__cell--checkbox">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === data.length}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                scope="col"
                className={col.numeric ? 'table__cell--numeric' : ''}
              >
                {sortable && col.sortable !== false ? (
                  <button
                    className="table__sort"
                    onClick={() => handleSort(col.key)}
                    aria-sort={
                      sortConfig?.key === col.key
                        ? sortConfig.direction
                        : 'none'
                    }
                  >
                    {col.label}
                    <span className="table__sort-icon" aria-hidden="true">
                      {sortConfig?.key === col.key
                        ? sortConfig.direction === 'ascending' ? '↑' : '↓'
                        : '↕'}
                    </span>
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="table__row"
              aria-selected={selectedRows.includes(rowIndex)}
            >
              {selectable && (
                <td className="table__cell--checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleSelectRow(rowIndex)}
                    aria-label={`Select row ${rowIndex + 1}`}
                  />
                </td>
              )}
              {columns.map(col => (
                <td
                  key={col.key}
                  data-label={col.label}
                  className={col.numeric ? 'table__cell--numeric' : ''}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Usage
const columns = [
  { key: 'campaign', label: 'Campaign Name', sortable: true },
  {
    key: 'revenue',
    label: 'Revenue',
    numeric: true,
    sortable: true,
    render: (value) => `R$ ${value.toLocaleString('pt-BR')}`
  },
  {
    key: 'roi',
    label: 'ROI',
    numeric: true,
    sortable: true,
    render: (value) => (
      <span className={value > 0 ? 'table__cell--positive' : 'table__cell--negative'}>
        {value > 0 ? '+' : ''}{value}% {value > 0 ? '↗' : '↘'}
      </span>
    )
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <Badge variant={value === 'Active' ? 'success' : 'neutral'}>{value}</Badge>
  }
];

const data = [
  { campaign: 'Instagram Q4', revenue: 42350, roi: 23, status: 'Active' },
  { campaign: 'Email November', revenue: 38120, roi: 18, status: 'Active' },
  { campaign: 'Google Ads', revenue: 29450, roi: 12, status: 'Paused' }
];

<Table
  data={data}
  columns={columns}
  caption="Campaign Performance - Q4 2024"
  sortable
  selectable
  responsive
  onSort={(config) => console.log('Sort:', config)}
/>
```

---

## Design Tokens Reference

```css
/* Table-specific tokens */
:root {
  /* Sizes */
  --table-row-height-compact: 40px;
  --table-row-height-default: 56px;
  --table-row-height-comfortable: 64px;

  /* Padding */
  --table-cell-padding-compact: 8px 12px;
  --table-cell-padding-default: 16px;
  --table-cell-padding-comfortable: 20px;

  /* Colors */
  --table-header-bg: var(--neutral-50);
  --table-header-color: var(--neutral-700);
  --table-border: var(--neutral-200);
  --table-row-hover: var(--support-50);
  --table-row-selected: var(--primary-50);

  /* Typography */
  --table-header-font-size: var(--font-size-sm);
  --table-cell-font-size: var(--font-size-base);
  --table-header-font-weight: 600;

  /* Border */
  --table-border-width: 1px;
  --table-border-radius: var(--radius-md);
}
```

---

## Related Components

- **Badge** - Status indicators within cells
- **Button** - Action buttons in cells
- **Avatar** - User representation in cells
- **Pagination** - Navigate large datasets

---

## References

- Design Principle: "Data Dignity: Numbers Are Heroes"
- Mobile-First: Transform to cards on small screens
- Carolina's Dashboard: ROI metrics front and center
- Accessibility: Full keyboard navigation, screen reader support

---

*Generated for Oitavo Café Design System - Where data tells the ROI story*
