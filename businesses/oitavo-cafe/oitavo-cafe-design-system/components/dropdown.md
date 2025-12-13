# Dropdown

## Overview

Dropdowns are overlays that display a list of options or actions triggered by a button or form control. They appear temporarily and close when an option is selected or focus is lost.

**When to use:**
- Select from a list of options (select menus)
- Display contextual actions (menu buttons)
- Navigation with sub-items
- Filter and sort controls

**When not to use:**
- Fewer than 4 options (use radio buttons instead)
- More than 15 options without search (consider autocomplete)
- Critical actions without confirmation (use Modal)
- Complex content (use Popover instead)

---

## Anatomy

```
┌──────────────────┐
│ Trigger Button   │ ▼
└──────────────────┘
         │
         ▼
┌──────────────────────┐
│ ○ Option 1           │
│ ○ Option 2  →  Sub   │ ← Nested menu indicator
│ ✓ Selected option    │ ← Selection indicator
├──────────────────────┤ ← Divider (optional)
│ ⚙ Settings           │ ← Icon + label
│ ⚠ Danger action      │ ← Destructive variant
└──────────────────────┘
```

**Parts:**
1. **Trigger** - Button or form control that opens the dropdown
2. **Menu Container** - The overlay panel
3. **Menu Items** - Individual options/actions
4. **Icons** - Leading icons for clarity (optional)
5. **Indicators** - Selection state, chevrons for nested items
6. **Dividers** - Visual separation between groups
7. **Caret** - Visual indicator on trigger (optional)

---

## Types

### Select Dropdown

For form inputs where user picks one option:

```tsx
<Select
  label="Status do pedido"
  placeholder="Selecionar status"
  options={[
    { value: 'pending', label: 'Pendente' },
    { value: 'processing', label: 'Processando' },
    { value: 'completed', label: 'Completo' },
    { value: 'cancelled', label: 'Cancelado' },
  ]}
/>
```

### Menu Dropdown

For actions and commands:

```tsx
<MenuButton label="Ações">
  <MenuItem icon={<Edit />} onClick={handleEdit}>
    Editar
  </MenuItem>
  <MenuItem icon={<Copy />} onClick={handleDuplicate}>
    Duplicar
  </MenuItem>
  <MenuDivider />
  <MenuItem icon={<Trash />} variant="danger" onClick={handleDelete}>
    Excluir
  </MenuItem>
</MenuButton>
```

### Multi-Select Dropdown

Multiple selections with checkboxes:

```tsx
<MultiSelect
  label="Categorias"
  placeholder="Selecionar categorias"
  options={categories}
  value={selected}
  onChange={setSelected}
/>
```

---

## Animation Sequence

### Opening (200ms)

**Slide & Fade In:**
```css
.dropdown-menu {
  opacity: 0;
  transform: translateY(-8px);
  animation: dropdownOpen 200ms var(--ease-decelerate) forwards;
}

@keyframes dropdownOpen {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Closing (200ms)

**Faster exit, fade out:**
```css
.dropdown-menu.closing {
  animation: dropdownClose 200ms var(--ease-accelerate) forwards;
}

@keyframes dropdownClose {
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}
```

### Item Hover (immediate)

```css
.dropdown-item {
  transition: background-color 150ms var(--ease-standard);
}

.dropdown-item:hover {
  background-color: var(--color-surface-hover);
}
```

---

## Positioning

### Placement Options

**Primary placements:**
- `bottom-start` (default) - Below trigger, aligned to left
- `bottom-end` - Below trigger, aligned to right
- `top-start` - Above trigger, aligned to left
- `top-end` - Above trigger, aligned to right

**Auto-adjustment:**
Dropdown should automatically flip placement when there's insufficient space:

```typescript
interface PositioningProps {
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  autoFlip?: boolean; // default: true
  offset?: number; // default: 4px
}
```

### Positioning Logic

```css
.dropdown-menu {
  position: absolute;
  min-width: 200px;
  max-width: 320px;
}

/* Bottom-start (default) */
.dropdown-menu[data-placement="bottom-start"] {
  top: calc(100% + 4px);
  left: 0;
}

/* Bottom-end */
.dropdown-menu[data-placement="bottom-end"] {
  top: calc(100% + 4px);
  right: 0;
}

/* Top-start */
.dropdown-menu[data-placement="top-start"] {
  bottom: calc(100% + 4px);
  left: 0;
}

/* Top-end */
.dropdown-menu[data-placement="top-end"] {
  bottom: calc(100% + 4px);
  right: 0;
}
```

---

## Styling

### Menu Container

```css
.dropdown-menu {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-2);
  min-width: 200px;
  max-height: 400px;
  overflow-y: auto;
}
```

### Menu Items

```css
.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  color: var(--color-text);
  transition: background-color 150ms var(--ease-standard);
}

.dropdown-item:hover {
  background-color: var(--color-surface-hover);
}

.dropdown-item:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.dropdown-item[aria-selected="true"] {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
}

.dropdown-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Danger Items

```css
.dropdown-item[data-variant="danger"] {
  color: var(--color-danger);
}

.dropdown-item[data-variant="danger"]:hover {
  background-color: var(--color-danger-subtle);
}
```

### Divider

```css
.dropdown-divider {
  height: 1px;
  background-color: var(--color-border);
  margin: var(--spacing-2) 0;
}
```

### Icons

```css
.dropdown-item-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.dropdown-item-checkmark {
  margin-left: auto;
  color: var(--color-primary);
}
```

---

## Component API

### Select Component

```typescript
interface SelectProps {
  // Options
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
  }>;

  // Value
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;

  // Labeling
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;

  // State
  disabled?: boolean;
  required?: boolean;

  // Behavior
  searchable?: boolean;
  clearable?: boolean;

  // Positioning
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

  // Styling
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

### Menu Component

```typescript
interface MenuProps {
  // Trigger
  trigger: React.ReactNode;

  // Content
  children: React.ReactNode;

  // Behavior
  closeOnSelect?: boolean; // default: true

  // Positioning
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  offset?: number;

  // State
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface MenuItemProps {
  // Content
  children: React.ReactNode;
  icon?: React.ReactNode;

  // Action
  onClick?: () => void;
  href?: string;

  // State
  disabled?: boolean;
  selected?: boolean;

  // Styling
  variant?: 'default' | 'danger';
}
```

---

## Usage Examples

### Basic Select

```tsx
import { Select } from '@oitavo-cafe/ui';

function StatusFilter() {
  const [status, setStatus] = useState('all');

  return (
    <Select
      label="Filtrar por status"
      value={status}
      onChange={setStatus}
      options={[
        { value: 'all', label: 'Todos' },
        { value: 'active', label: 'Ativos' },
        { value: 'inactive', label: 'Inativos' },
      ]}
    />
  );
}
```

### Action Menu

```tsx
import { Menu, MenuItem, MenuDivider } from '@oitavo-cafe/ui';

function ContactActions({ contact }) {
  return (
    <Menu trigger={<Button variant="ghost" icon={<MoreVertical />} />}>
      <MenuItem icon={<Eye />} onClick={() => viewContact(contact.id)}>
        Ver detalhes
      </MenuItem>
      <MenuItem icon={<Edit />} onClick={() => editContact(contact.id)}>
        Editar
      </MenuItem>
      <MenuItem icon={<Mail />} onClick={() => emailContact(contact.email)}>
        Enviar email
      </MenuItem>
      <MenuDivider />
      <MenuItem
        icon={<Trash />}
        variant="danger"
        onClick={() => deleteContact(contact.id)}
      >
        Excluir contato
      </MenuItem>
    </Menu>
  );
}
```

### Searchable Select

```tsx
<Select
  label="Selecionar cliente"
  placeholder="Buscar clientes..."
  searchable
  options={customers}
  value={selectedCustomer}
  onChange={setSelectedCustomer}
/>
```

### Multi-Select

```tsx
import { MultiSelect } from '@oitavo-cafe/ui';

function TagSelector() {
  const [tags, setTags] = useState([]);

  return (
    <MultiSelect
      label="Tags"
      placeholder="Adicionar tags"
      options={availableTags}
      value={tags}
      onChange={setTags}
      clearable
    />
  );
}
```

---

## Accessibility

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open dropdown (when trigger focused) |
| `Escape` | Close dropdown |
| `ArrowDown` | Move focus to next item (open dropdown if closed) |
| `ArrowUp` | Move focus to previous item (open dropdown if closed) |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |
| `Enter` | Select focused item and close |
| `Tab` | Close dropdown and move to next focusable element |
| `A-Z` | Jump to first item starting with typed letter |

### ARIA Attributes

**Select/Combobox pattern:**
```html
<div class="select-container">
  <label id="select-label">Status do pedido</label>
  <button
    role="combobox"
    aria-labelledby="select-label"
    aria-expanded="false"
    aria-controls="select-menu"
    aria-haspopup="listbox"
  >
    Pendente
  </button>

  <ul
    id="select-menu"
    role="listbox"
    aria-labelledby="select-label"
  >
    <li role="option" aria-selected="true">Pendente</li>
    <li role="option" aria-selected="false">Processando</li>
    <li role="option" aria-selected="false">Completo</li>
  </ul>
</div>
```

**Menu pattern:**
```html
<button
  aria-haspopup="menu"
  aria-expanded="false"
  aria-controls="actions-menu"
>
  Ações
</button>

<div
  id="actions-menu"
  role="menu"
  aria-orientation="vertical"
>
  <button role="menuitem">Editar</button>
  <button role="menuitem">Duplicar</button>
  <div role="separator"></div>
  <button role="menuitem">Excluir</button>
</div>
```

### Focus Management

**On Open:**
1. Focus moves to first menu item (or selected item if any)
2. Trigger maintains `aria-expanded="true"`

**On Close:**
1. Focus returns to trigger
2. Trigger updates to `aria-expanded="false"`

### Screen Reader Announcements

- Selected option: "Pendente, selecionado"
- Navigation: "Processando, 2 de 4"
- Groups: "Ações principais, grupo 1 de 2"

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .dropdown-menu {
    animation-duration: 50ms;
  }

  @keyframes dropdownOpen {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes dropdownClose {
    to {
      opacity: 0;
    }
  }
}
```

---

## Best Practices

### Do

- Use clear, concise labels for options
- Group related items with dividers
- Show icons for common actions (edit, delete, etc.)
- Indicate current selection clearly
- Provide keyboard navigation
- Auto-close on selection (for single select)
- Position dropdowns to avoid viewport overflow
- Use danger styling for destructive actions

### Don't

- Overload with too many options (>15 without search)
- Use for primary navigation
- Nest more than 2 levels deep
- Hide critical information in dropdowns
- Use generic labels ("Actions", "Options")
- Require precise mouse control (ensure adequate item height)
- Mix selection and action patterns in same dropdown

---

## Voice & Content

### Oitavo Café Dropdown Voice

**Option labels should be clear and actionable:**

**Do:**
- "Editar perfil"
- "Exportar como PDF"
- "Marcar como favorito"
- "Arquivar conversa"

**Don't:**
- "Edit" (too terse, not in Portuguese)
- "PDF" (unclear action)
- "Favorite" (ambiguous)
- "Archive" (language consistency)

**Group labels:**
```tsx
<MenuGroup label="Ações principais">
  <MenuItem>Editar</MenuItem>
  <MenuItem>Duplicar</MenuItem>
</MenuGroup>
<MenuDivider />
<MenuGroup label="Outras ações">
  <MenuItem>Arquivar</MenuItem>
  <MenuItem variant="danger">Excluir</MenuItem>
</MenuGroup>
```

---

## Variants

### Sizes

```css
/* Small - Compact UI */
.dropdown-item.sm {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--text-xs);
}

/* Medium (default) */
.dropdown-item.md {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--text-sm);
}

/* Large - Touch-friendly */
.dropdown-item.lg {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--text-base);
}
```

### With Search

```tsx
<Select
  searchable
  searchPlaceholder="Buscar..."
  noResultsText="Nenhum resultado encontrado"
  options={longList}
/>
```

```css
.dropdown-search {
  padding: var(--spacing-2);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background: var(--color-surface);
  z-index: 1;
}
```

---

## Z-Index Layers

```css
.dropdown-menu {
  z-index: var(--z-popover); /* 600 */
}
```

**Stack order:**
- Base content: 0
- Sticky elements: 100
- Modal backdrop: 400
- Modal: 500
- Dropdown/Popover: 600
- Tooltip: 700

---

## Mobile Considerations

### Touch Targets

Ensure adequate touch target size on mobile:

```css
@media (max-width: 767px) {
  .dropdown-item {
    min-height: 44px; /* Apple's recommended minimum */
    padding: var(--spacing-3) var(--spacing-4);
  }

  .dropdown-menu {
    /* Full-width on mobile for easier interaction */
    left: 0;
    right: 0;
    width: 100vw;
    border-radius: 0;
    max-height: 50vh; /* Leave room for keyboard */
  }
}
```

### Bottom Sheet Alternative

For mobile, consider converting to bottom sheet:

```tsx
<Dropdown
  mobileVariant="bottom-sheet"
  options={options}
/>
```

---

## Implementation Notes

### Click Outside Detection

```tsx
import { useEffect, useRef } from 'react';

function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
}
```

### Virtual Scrolling

For very long lists (>100 items):

```tsx
import { FixedSizeList } from 'react-window';

function VirtualDropdown({ options }) {
  return (
    <FixedSizeList
      height={400}
      itemCount={options.length}
      itemSize={36}
    >
      {({ index, style }) => (
        <MenuItem style={style}>
          {options[index].label}
        </MenuItem>
      )}
    </FixedSizeList>
  );
}
```

---

## Related Components

- **Popover** - For richer content and descriptions
- **Modal** - For actions requiring confirmation
- **Autocomplete** - For searchable inputs with suggestions
- **Tooltip** - For simple hints on hover

---

**Component Status:** Ready for Implementation
**Last Updated:** 2025-12-13
**Design System:** Oitavo Café v1.0
