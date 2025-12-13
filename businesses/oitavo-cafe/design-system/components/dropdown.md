# Dropdown Component

## Overview

Contextual menus that appear when users interact with a trigger element, displaying a list of actions or options. Dropdowns are compact navigation and action patterns that save screen space while providing quick access to related functions.

**When to use:**
- Navigation menus (user account, settings)
- Action menus (more options, context actions)
- Filter/sort options
- Selection lists (when radio/checkbox groups are too large)

**When not to use:**
- Form select inputs (use native `<select>`)
- Long lists (>10 items - use searchable component)
- Critical navigation (use visible links)
- Simple binary choices (use toggle or checkbox)

## Anatomy

```
[Trigger Button ▼]
     │
     └─► ┌─────────────────────┐
         │ ○ Menu Item 1       │
         │ ○ Menu Item 2       │
         ├─────────────────────┤
         │ ○ Menu Item 3       │
         │ ⚠ Destructive Item  │
         └─────────────────────┘

Components:
1. Trigger - Button/element that opens dropdown
2. Menu container - Floating menu panel
3. Menu items - Individual options/actions
4. Dividers - Separate item groups (optional)
5. Icons - Visual indicators (optional)
6. Keyboard shortcuts - Display shortcuts (optional)
```

## Variants

### Action Menu
**Purpose:** List of actions related to specific content.

```css
Items: Icon + text format
Usage: "More options" menus
Example: Edit, Duplicate, Delete
```

### Navigation Menu
**Purpose:** Navigate to different sections/pages.

```css
Items: Text or text + icon
Usage: User account, settings
Example: Profile, Settings, Logout
```

### Select Menu
**Purpose:** Choose one option from a list.

```css
Items: Checkmark shows selected
Usage: Filter/sort controls
Example: Sort by: Date, Name, Popularity
```

## Sizes

### Compact
```css
Min width: 160px
Padding: var(--spacing-1) 0 /* 4px */
Item padding: var(--spacing-2) var(--spacing-3) /* 8px 12px */
Font size: var(--font-size-sm) /* 13px */
```

### Default
```css
Min width: 200px
Padding: var(--spacing-2) 0 /* 8px */
Item padding: var(--spacing-3) var(--spacing-4) /* 12px 16px */
Font size: var(--font-size-base) /* 16px */
```

### Large
```css
Min width: 240px
Padding: var(--spacing-3) 0 /* 12px */
Item padding: var(--spacing-4) var(--spacing-5) /* 16px 24px */
Font size: var(--font-size-base) /* 16px */
```

## Menu Item States

### Default
```css
Background: transparent
Color: var(--text-primary)
Cursor: pointer
```

### Hover
```css
Background: var(--neutral-100) /* #EDE7E1 */
Color: var(--text-primary)
Transition: background var(--duration-fast) var(--ease-gentle)
```

### Active/Pressed
```css
Background: var(--neutral-200) /* #D6CEC7 */
```

### Focus
```css
Background: var(--neutral-100)
Outline: 2px solid var(--primary-600)
Outline offset: -2px
```

### Selected
```css
Background: var(--primary-50) /* #FCF5F4 */
Color: var(--primary-700) /* #75201C */
Icon: Checkmark (left or right)
Font weight: var(--font-weight-medium)
```

### Disabled
```css
Background: transparent
Color: var(--text-tertiary) /* Grayed out */
Cursor: not-allowed
Opacity: 0.5
```

### Destructive
```css
Color: var(--feedback-error-default) /* #B91C1C */
Icon: Warning triangle or trash
```

```css
Hover:
  Background: var(--feedback-error-light)
  Color: var(--feedback-error-dark)
```

## Positioning

### Preferred Positions (Auto-flip)
```css
Default: Bottom-left (aligned with trigger)
Fallback: Top-left (if no space below)
Alternative: Bottom-right, Top-right
```

### Position Offsets
```css
Offset from trigger: 4px
Max height: 400px (scroll if longer)
Viewport padding: 16px (keep in bounds)
```

## Animation

### Open Animation
```css
@keyframes dropdown-enter {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

Duration: var(--duration-fast) /* 200ms */
Easing: var(--ease-decelerate)
```

### Close Animation
```css
@keyframes dropdown-exit {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-4px);
  }
}

Duration: var(--duration-fast) /* 150ms */
Easing: var(--ease-accelerate)
```

### Item Stagger (Optional)
```css
/* For menus with 5+ items */
.dropdown-item:nth-child(1) { animation-delay: 0ms; }
.dropdown-item:nth-child(2) { animation-delay: 30ms; }
.dropdown-item:nth-child(3) { animation-delay: 60ms; }
/* ... */
```

## Props/API

```typescript
interface DropdownProps {
  /** Dropdown trigger element */
  trigger: React.ReactNode;

  /** Menu items */
  items: DropdownItem[];

  /** Dropdown open state */
  open?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Preferred position */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

  /** Enable auto-positioning */
  autoPosition?: boolean;

  /** Size variant */
  size?: 'compact' | 'default' | 'large';

  /** Close on item click */
  closeOnClick?: boolean;

  /** Additional CSS class */
  className?: string;
}

interface DropdownItem {
  /** Item label */
  label: string;

  /** Icon component */
  icon?: React.ReactNode;

  /** Keyboard shortcut display */
  shortcut?: string;

  /** Item click handler */
  onClick?: () => void;

  /** Item disabled state */
  disabled?: boolean;

  /** Destructive action style */
  destructive?: boolean;

  /** Divider after this item */
  divider?: boolean;

  /** Selected state */
  selected?: boolean;
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Trigger button -->
<button
  aria-haspopup="true"
  aria-expanded="false"
  id="dropdown-trigger"
>
  Menu ▼
</button>

<!-- Dropdown menu -->
<div
  role="menu"
  aria-labelledby="dropdown-trigger"
  hidden
>
  <button role="menuitem" tabindex="-1">
    Menu Item 1
  </button>
  <button role="menuitem" tabindex="-1">
    Menu Item 2
  </button>
</div>
```

### Keyboard Navigation
- **Enter/Space**: Open dropdown
- **Arrow Down**: Next item (wrap to first)
- **Arrow Up**: Previous item (wrap to last)
- **Home**: First item
- **End**: Last item
- **Escape**: Close dropdown
- **Tab**: Close and move to next element
- **Type-ahead**: Jump to item starting with letter

### Focus Management
```javascript
// When opening
dropdown.querySelector('[role="menuitem"]').focus();

// When closing
triggerButton.focus();

// Arrow key navigation
items[currentIndex].focus();
```

### Screen Reader Support
- Use `role="menu"` for menu container
- Use `role="menuitem"` for items
- Announce state with `aria-expanded`
- Disabled items have `aria-disabled="true"`
- Selected items have `aria-checked="true"` (for select menus)

## Usage Guidelines

### Do's

✓ **Group related items**
  - Use dividers to separate groups
  - Logical organization aids scanning

✓ **Use clear, action-oriented labels**
  - "Editar perfil" not "Perfil"
  - "Exportar PDF" not "PDF"

✓ **Place destructive actions last**
  - Delete, Remove at bottom
  - Separated by divider

✓ **Include keyboard shortcuts**
  - Show shortcuts on right
  - Helps power users

✓ **Limit item count**
  - Maximum 10-12 items
  - Use sub-menus or search for more

### Don'ts

✗ **Don't nest dropdowns deeply**
  - Maximum 1 level of sub-menus
  - Difficult to navigate on mobile

✗ **Don't use for critical navigation**
  - Important links should be visible
  - Dropdowns are supplementary

✗ **Don't make trigger unclear**
  - Icon-only needs tooltip
  - Text should indicate menu

✗ **Don't mix different item types**
  - Actions vs navigation vs selections
  - Keep menus focused

✗ **Don't auto-close on hover**
  - Click to open, click to close
  - Hover-only is accessibility issue

## Code Examples

### Basic Dropdown

```html
<div class="dropdown">
  <button
    class="dropdown-trigger"
    aria-haspopup="true"
    aria-expanded="false"
    id="dropdown-1"
  >
    Mais opções
    <svg class="dropdown-trigger__icon">
      <use href="#icon-chevron-down"></use>
    </svg>
  </button>

  <div
    class="dropdown-menu"
    role="menu"
    aria-labelledby="dropdown-1"
    hidden
  >
    <button class="dropdown-item" role="menuitem" tabindex="-1">
      <svg class="dropdown-item__icon">
        <use href="#icon-edit"></use>
      </svg>
      <span>Editar</span>
    </button>

    <button class="dropdown-item" role="menuitem" tabindex="-1">
      <svg class="dropdown-item__icon">
        <use href="#icon-copy"></use>
      </svg>
      <span>Duplicar</span>
    </button>

    <div class="dropdown-divider"></div>

    <button class="dropdown-item dropdown-item--destructive" role="menuitem" tabindex="-1">
      <svg class="dropdown-item__icon">
        <use href="#icon-trash"></use>
      </svg>
      <span>Excluir</span>
    </button>
  </div>
</div>
```

```css
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--border-default);
  border-radius: var(--border-radius-sm);
  background: var(--color-white);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  cursor: pointer;

  transition: all var(--duration-fast) var(--ease-gentle);
}

.dropdown-trigger:hover {
  background: var(--neutral-50);
  border-color: var(--border-strong);
}

.dropdown-trigger[aria-expanded="true"] {
  background: var(--neutral-100);
}

.dropdown-trigger__icon {
  width: 16px;
  height: 16px;
  transition: transform var(--duration-fast) var(--ease-standard);
}

.dropdown-trigger[aria-expanded="true"] .dropdown-trigger__icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 200px;
  padding: var(--spacing-2) 0;
  background: var(--color-white);
  border: 1px solid var(--border-default);
  border-radius: var(--border-radius-md);
  box-shadow: var(--elevation-floating);
  z-index: var(--z-index-dropdown);

  animation: dropdown-enter var(--duration-fast) var(--ease-decelerate);
}

.dropdown-menu[hidden] {
  display: none;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: var(--font-size-base);
  text-align: left;
  cursor: pointer;

  transition: background var(--duration-fast) var(--ease-gentle);
}

.dropdown-item:hover {
  background: var(--neutral-100);
}

.dropdown-item:active {
  background: var(--neutral-200);
}

.dropdown-item:focus-visible {
  background: var(--neutral-100);
  outline: 2px solid var(--primary-600);
  outline-offset: -2px;
}

.dropdown-item__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--text-secondary);
}

.dropdown-item--destructive {
  color: var(--feedback-error-default);
}

.dropdown-item--destructive:hover {
  background: var(--feedback-error-light);
}

.dropdown-item--destructive .dropdown-item__icon {
  color: var(--feedback-error-default);
}

.dropdown-item:disabled {
  color: var(--text-tertiary);
  cursor: not-allowed;
  opacity: 0.5;
}

.dropdown-item:disabled:hover {
  background: transparent;
}

.dropdown-divider {
  height: 1px;
  margin: var(--spacing-2) 0;
  background: var(--border-subtle);
}
```

### JavaScript Controller

```javascript
class Dropdown {
  constructor(element) {
    this.dropdown = element;
    this.trigger = element.querySelector('[aria-haspopup]');
    this.menu = element.querySelector('[role="menu"]');
    this.items = [...this.menu.querySelectorAll('[role="menuitem"]')];
    this.currentIndex = -1;

    this.init();
  }

  init() {
    this.trigger.addEventListener('click', () => this.toggle());
    this.menu.addEventListener('click', (e) => this.handleItemClick(e));
    document.addEventListener('click', (e) => this.handleClickOutside(e));
    this.menu.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  toggle() {
    const isOpen = this.trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.trigger.setAttribute('aria-expanded', 'true');
    this.menu.removeAttribute('hidden');
    this.currentIndex = 0;
    this.items[0]?.focus();
  }

  close() {
    this.trigger.setAttribute('aria-expanded', 'false');
    this.menu.setAttribute('hidden', '');
    this.currentIndex = -1;
    this.trigger.focus();
  }

  handleItemClick(e) {
    const item = e.target.closest('[role="menuitem"]');
    if (item && !item.disabled) {
      this.close();
    }
  }

  handleClickOutside(e) {
    if (!this.dropdown.contains(e.target)) {
      this.close();
    }
  }

  handleKeydown(e) {
    const { key } = e;

    switch (key) {
      case 'Escape':
      case 'Tab':
        e.preventDefault();
        this.close();
        break;

      case 'ArrowDown':
        e.preventDefault();
        this.focusNext();
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.focusPrevious();
        break;

      case 'Home':
        e.preventDefault();
        this.focusFirst();
        break;

      case 'End':
        e.preventDefault();
        this.focusLast();
        break;

      default:
        // Type-ahead
        if (key.length === 1) {
          this.focusItemStartingWith(key);
        }
    }
  }

  focusNext() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.items[this.currentIndex].focus();
  }

  focusPrevious() {
    this.currentIndex = this.currentIndex <= 0 ? this.items.length - 1 : this.currentIndex - 1;
    this.items[this.currentIndex].focus();
  }

  focusFirst() {
    this.currentIndex = 0;
    this.items[0].focus();
  }

  focusLast() {
    this.currentIndex = this.items.length - 1;
    this.items[this.currentIndex].focus();
  }

  focusItemStartingWith(char) {
    const startIndex = (this.currentIndex + 1) % this.items.length;
    const matchIndex = this.items.findIndex((item, i) => {
      const actualIndex = (startIndex + i) % this.items.length;
      const text = this.items[actualIndex].textContent.trim().toLowerCase();
      return text.startsWith(char.toLowerCase());
    });

    if (matchIndex !== -1) {
      this.currentIndex = (startIndex + matchIndex) % this.items.length;
      this.items[this.currentIndex].focus();
    }
  }
}

// Initialize all dropdowns
document.querySelectorAll('.dropdown').forEach((el) => {
  new Dropdown(el);
});
```

### React Component

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';

export function Dropdown({
  trigger,
  items,
  position = 'bottom-left',
  size = 'default',
  closeOnClick = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    middleware: [offset(4), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
      case 'Tab':
        e.preventDefault();
        setIsOpen(false);
        break;

      case 'ArrowDown':
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % items.length);
        break;

      case 'ArrowUp':
        e.preventDefault();
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
        break;

      case 'Home':
        e.preventDefault();
        setCurrentIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setCurrentIndex(items.length - 1);
        break;
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;

    item.onClick?.();

    if (closeOnClick) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement, {
        ref: refs.setReference,
        'aria-haspopup': 'true',
        'aria-expanded': isOpen,
        onClick: () => setIsOpen(!isOpen),
      })}

      {isOpen && (
        <div
          ref={refs.setFloating}
          role="menu"
          className={`dropdown-menu dropdown-menu--${size}`}
          style={floatingStyles}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <button
                role="menuitem"
                className={`dropdown-item ${item.destructive ? 'dropdown-item--destructive' : ''} ${item.selected ? 'dropdown-item--selected' : ''}`}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                tabIndex={index === currentIndex ? 0 : -1}
              >
                {item.icon && <span className="dropdown-item__icon">{item.icon}</span>}
                <span className="dropdown-item__label">{item.label}</span>
                {item.shortcut && (
                  <span className="dropdown-item__shortcut">{item.shortcut}</span>
                )}
              </button>
              {item.divider && <div className="dropdown-divider" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}
```

### Usage Example

```tsx
<Dropdown
  trigger={
    <button className="button button--secondary">
      Mais opções ▼
    </button>
  }
  items={[
    {
      label: 'Editar',
      icon: <EditIcon />,
      shortcut: 'Ctrl+E',
      onClick: () => handleEdit(),
    },
    {
      label: 'Duplicar',
      icon: <CopyIcon />,
      onClick: () => handleDuplicate(),
      divider: true,
    },
    {
      label: 'Excluir',
      icon: <TrashIcon />,
      destructive: true,
      onClick: () => handleDelete(),
    },
  ]}
/>
```

---

**Version:** 1.0
**Last updated:** 2025-12-13
**Component Specifier:** Design System Team
