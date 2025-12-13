# List Component

## Overview

**Purpose**: Lists display a collection of related items in a vertical or horizontal format, providing clear structure and easy scanning. They organize content logically with consistent spacing and visual hierarchy.

**Usage**: Use for navigation menus, search results, activity feeds, settings options, file lists, or any structured collection of items.

**Brand Context**: For Oitavo Café, lists show campaign history, client rosters, content calendar entries, or action items - helping Carolina scan and process information quickly.

---

## Anatomy

```
Simple List:
┌──────────────────────────────┐
│ • Post Café da Manhã         │
│ • Story Novembro             │
│ • Reels 15/Nov               │
└──────────────────────────────┘

Rich List (with metadata):
┌────────────────────────────────────────────┐
│ [🖼️] Post Café da Manhã        [🔔 12.5K] │
│      Instagram • 15/Nov/2025    [...]      │
├────────────────────────────────────────────┤
│ [🖼️] Story Novembro            [🔔 8.1K]  │
│      Instagram • 10/Nov/2025    [...]      │
└────────────────────────────────────────────┘

Components:
1. Container - <ul> or <ol> wrapper
2. List Item - Individual row
3. Leading Element - Icon, avatar, checkbox
4. Primary Text - Main content/title
5. Secondary Text - Description/metadata
6. Trailing Element - Action button, badge, chevron
```

---

## Variants

### 1. **Simple List**
- Bullet or numbered markers
- Single line per item
- Minimal padding
- Use for basic content display

### 2. **Two-Line List**
- Primary + secondary text
- Avatar or icon (optional)
- Dividers between items
- Use for contacts, emails, notifications

### 3. **Three-Line List**
- Title + description + metadata
- More vertical spacing
- Thumbnail image (optional)
- Use for articles, products, search results

### 4. **Interactive List**
- Clickable/hoverable items
- Actions menu (trailing)
- Selection checkboxes
- Use for selectable options, settings

### 5. **Ordered/Unordered**
- **Unordered**: Bullet points, no sequence
- **Ordered**: Numbers, sequential steps
- **Definition**: Term + description pairs

---

## Sizes

### Compact
- **Item Height**: `40px`
- **Font Size**: `fontSize.sm` (13px)
- **Padding**: `spacing.2` (8px) vertical
- **Icon Size**: `16px`
- **Use**: Dense menus, sidebars

### Default
- **Item Height**: `56px`
- **Font Size**: `fontSize.base` (16px)
- **Padding**: `spacing.3` (12px) vertical
- **Icon Size**: `20px`
- **Use**: Standard lists, activity feeds

### Comfortable
- **Item Height**: `72px`
- **Font Size**: `fontSize.base` (16px)
- **Padding**: `spacing.4` (16px) vertical
- **Icon Size**: `24px`
- **Use**: Touch interfaces, detailed views

---

## States

### List Item - Default
- **Background**: `white`
- **Text Color**: `neutral-800` (#2B2523)
- **Border**: `1px solid` `neutral-200` (bottom only)
- **Cursor**: `default` (or `pointer` if interactive)

### List Item - Hover
- **Background**: `neutral-50` (#F8F5F2)
- **Cursor**: `pointer`
- **Transition**: `background 100ms ease-out`

### List Item - Active/Selected
- **Background**: `primary-50` (#FCF5F4)
- **Text Color**: `primary-700` (#75201C)
- **Border Left**: `4px solid` `primary-700`
- **Font Weight**: `semibold` (600)

### List Item - Focus
- **Outline**: `2px solid` `boxShadow.focus`
- **Outline Offset**: `-2px` (inset)

### List Item - Disabled
- **Text Color**: `neutral-400` (#9B8B86)
- **Cursor**: `not-allowed`
- **Opacity**: `0.6`

---

## Props/API

```typescript
interface ListProps {
  items: ListItem[];
  variant?: 'simple' | 'two-line' | 'three-line' | 'interactive';
  size?: 'compact' | 'default' | 'comfortable';
  ordered?: boolean;
  dividers?: boolean;
  selectable?: boolean;
  onItemClick?: (item: ListItem) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  className?: string;
}

interface ListItem {
  id: string;
  primary: string;
  secondary?: string;
  tertiary?: string;
  icon?: React.ReactNode;
  avatar?: { src: string; alt: string };
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  badge?: number | string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
}
```

### Example Usage

```tsx
<List
  variant="two-line"
  size="default"
  dividers={true}
  items={[
    {
      id: '1',
      primary: 'Post Café da Manhã',
      secondary: 'Instagram • 15/Nov/2025',
      icon: <ImageIcon />,
      badge: '12.5K',
      trailing: <ChevronRight />
    },
    {
      id: '2',
      primary: 'Story Novembro',
      secondary: 'Instagram • 10/Nov/2025',
      icon: <VideoIcon />,
      badge: '8.1K',
      trailing: <ChevronRight />
    }
  ]}
  onItemClick={(item) => navigate(`/campanhas/${item.id}`)}
/>
```

---

## Accessibility

### Keyboard Navigation
- **Tab**: Navigate between interactive list items
- **Enter/Space**: Activate selected item
- **Arrow Up/Down**: Navigate list (optional, for menus)

### ARIA Attributes
```html
<ul class="list" role="list">
  <li class="list-item" role="listitem">
    <a href="/campanhas/1" class="list-item__link">
      <div class="list-item__leading">
        <svg aria-hidden="true">...</svg>
      </div>
      <div class="list-item__content">
        <span class="list-item__primary">Post Café da Manhã</span>
        <span class="list-item__secondary">Instagram • 15/Nov/2025</span>
      </div>
      <div class="list-item__trailing">
        <span class="list-item__badge">12.5K</span>
        <svg aria-hidden="true">→</svg>
      </div>
    </a>
  </li>
</ul>

<!-- Selectable List -->
<ul class="list list--selectable" role="listbox" aria-label="Selecionar campanhas">
  <li class="list-item" role="option" aria-selected="false">
    <label class="list-item__label">
      <input type="checkbox" class="sr-only" />
      <span class="list-item__checkbox" aria-hidden="true"></span>
      <span class="list-item__content">Post Café da Manhã</span>
    </label>
  </li>
</ul>
```

### Guidelines
- **Use semantic HTML**: `<ul>`, `<ol>`, `<li>`
- **role="list"**: Ensure screen readers announce list
- **Clickable items**: Use `<a>` or `<button>` inside `<li>`
- **Icon decoration**: `aria-hidden="true"` for decorative icons
- **Descriptive text**: Primary text should be self-explanatory
- **Contrast**: 4.5:1 minimum for text

---

## Code Examples

### HTML Structure

```html
<!-- Two-Line List -->
<ul class="list list--two-line">
  <li class="list-item">
    <a href="/campanhas/1" class="list-item__link">
      <div class="list-item__leading">
        <img src="/thumbnails/cafe.jpg" alt="" class="list-item__thumbnail" />
      </div>
      <div class="list-item__content">
        <span class="list-item__primary">Post Café da Manhã</span>
        <span class="list-item__secondary">Instagram • 15/Nov/2025</span>
      </div>
      <div class="list-item__trailing">
        <span class="list-item__badge">12.5K</span>
        <svg class="list-item__icon" width="16" height="16">
          <path d="M6 4L10 8L6 12" stroke="currentColor"/>
        </svg>
      </div>
    </a>
  </li>

  <li class="list-item">
    <a href="/campanhas/2" class="list-item__link">
      <div class="list-item__leading">
        <img src="/thumbnails/story.jpg" alt="" class="list-item__thumbnail" />
      </div>
      <div class="list-item__content">
        <span class="list-item__primary">Story Novembro</span>
        <span class="list-item__secondary">Instagram • 10/Nov/2025</span>
      </div>
      <div class="list-item__trailing">
        <span class="list-item__badge">8.1K</span>
        <svg class="list-item__icon" width="16" height="16">
          <path d="M6 4L10 8L6 12" stroke="currentColor"/>
        </svg>
      </div>
    </a>
  </li>
</ul>

<!-- Interactive List with Actions -->
<ul class="list list--interactive">
  <li class="list-item">
    <div class="list-item__content">
      <div class="list-item__leading">
        <input type="checkbox" aria-label="Selecionar Post Café" />
      </div>
      <div class="list-item__text">
        <span class="list-item__primary">Post Café da Manhã</span>
        <span class="list-item__secondary">Publicado há 2 dias</span>
      </div>
      <div class="list-item__trailing">
        <button class="list-item__action" aria-label="Mais ações">
          <svg width="20" height="20">...</svg>
        </button>
      </div>
    </div>
  </li>
</ul>
```

### CSS Implementation

```css
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.list-item {
  position: relative;
  border-bottom: 1px solid var(--neutral-200);
}

.list-item:last-child {
  border-bottom: none;
}

.list-item__link {
  display: flex;
  align-items: center;
  gap: var(--spacing-3, 12px);
  padding: var(--spacing-3, 12px) var(--spacing-4, 16px);
  color: inherit;
  text-decoration: none;
  transition: background 100ms ease-out;
}

.list-item__link:hover {
  background: var(--neutral-50);
}

.list-item__link:focus-visible {
  outline: 2px solid rgba(117, 32, 28, 0.20);
  outline-offset: -2px;
}

/* Leading */
.list-item__leading {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-item__thumbnail {
  width: 48px;
  height: 48px;
  border-radius: var(--borderRadius-sm);
  object-fit: cover;
}

/* Content */
.list-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1, 4px);
  min-width: 0; /* Allow text truncation */
}

.list-item__primary {
  font-size: var(--fontSize-base);
  font-weight: 500;
  color: var(--neutral-800);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item__secondary {
  font-size: var(--fontSize-sm);
  color: var(--neutral-600);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item__tertiary {
  font-size: var(--fontSize-xs);
  color: var(--neutral-500);
}

/* Trailing */
.list-item__trailing {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-2, 8px);
}

.list-item__badge {
  font-size: var(--fontSize-sm);
  font-weight: 600;
  color: var(--neutral-700);
}

.list-item__icon {
  stroke: var(--neutral-400);
}

/* Selected State */
.list-item--selected .list-item__link {
  background: var(--primary-50);
  border-left: 4px solid var(--primary-700);
  padding-left: calc(var(--spacing-4) - 4px);
}

.list-item--selected .list-item__primary {
  color: var(--primary-700);
  font-weight: 600;
}

/* Disabled State */
.list-item--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.list-item--disabled .list-item__primary {
  color: var(--neutral-400);
}

/* Dividers */
.list--dividers .list-item {
  border-bottom: 1px solid var(--neutral-200);
}

/* Size Variants */
.list--compact .list-item__link {
  padding: var(--spacing-2, 8px) var(--spacing-3, 12px);
}

.list--compact .list-item__primary {
  font-size: var(--fontSize-sm);
}

.list--comfortable .list-item__link {
  padding: var(--spacing-4, 16px) var(--spacing-5, 24px);
}

/* Ordered List */
ol.list {
  counter-reset: list-counter;
}

ol.list .list-item {
  counter-increment: list-counter;
}

ol.list .list-item::before {
  content: counter(list-counter) ".";
  margin-right: var(--spacing-3);
  font-weight: 600;
  color: var(--neutral-600);
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

---

## Related Components
- **Avatar** - User representation in lists
- **Badge** - Status/count indicators
- **Checkbox** - Selection control
- **Dropdown** - Action menu in trailing
- **Icon** - Visual markers
