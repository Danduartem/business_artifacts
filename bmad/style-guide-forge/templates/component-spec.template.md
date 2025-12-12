# {brand_name} Component Specifications

> Comprehensive UI component documentation for consistent implementation

---

## Component Index

### Core Components
- [Buttons](#buttons)
- [Form Inputs](#form-inputs)
- [Select/Dropdown](#selectdropdown)
- [Checkbox & Radio](#checkbox--radio)
- [Toggle/Switch](#toggleswitch)
- [Links](#links)

### Container Components
- [Cards](#cards)
- [Modals/Dialogs](#modalsdialogs)
- [Accordions](#accordions)
- [Tabs](#tabs)

### Feedback Components
- [Alerts/Banners](#alertsbanners)
- [Toasts/Notifications](#toastsnotifications)
- [Badges/Tags](#badgestags)
- [Progress](#progress)

### Navigation Components
- [Navbar](#navbar)
- [Breadcrumbs](#breadcrumbs)
- [Pagination](#pagination)
- [Footer](#footer)

---

## Buttons

### Description
{button_description}

### Variants

| Variant | Usage | Visual |
|---------|-------|--------|
| Primary | Main actions, CTAs | Filled, brand color |
| Secondary | Supporting actions | Outlined or muted |
| Ghost | Low emphasis | Text only |
| Destructive | Dangerous actions | Red/warning |
| Icon-only | When icon is clear | Square aspect |

### Sizes

| Size | Height | Padding | Font Size | Use Case |
|------|--------|---------|-----------|----------|
| sm | 32px | 12px h | 14px | Compact UIs |
| md | 40px | 16px h | 16px | Default |
| lg | 48px | 24px h | 18px | CTAs, heroes |

### States

{button_states_table}

### Accessibility

- **Role**: `button`
- **Keyboard**: Enter, Space to activate
- **Focus**: 2px ring, {focus_color}
- **ARIA**: `aria-disabled`, `aria-pressed` when applicable

### Do's and Don'ts

**Do:**
{button_dos}

**Don't:**
{button_donts}

---

## Form Inputs

### Description
{input_description}

### Types
- Text
- Email
- Password (with show/hide toggle)
- Number (with increment/decrement)
- Textarea

### Anatomy

```
┌─────────────────────────────┐
│ Label *                      │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ Placeholder...           │ │
│ └─────────────────────────┘ │
│ Helper text or error        │
└─────────────────────────────┘
```

### States

{input_states_table}

### Accessibility

- **Role**: `textbox`
- **Label**: Always associated via `for`/`id`
- **Errors**: Linked via `aria-describedby`
- **Required**: `aria-required="true"`
- **Invalid**: `aria-invalid="true"` on error

### Do's and Don'ts

**Do:**
{input_dos}

**Don't:**
{input_donts}

---

## Select/Dropdown

### Description
{select_description}

### Variants

| Type | Description |
|------|-------------|
| Single | Choose one option |
| Multi | Choose multiple with checkboxes |
| Searchable | Filter options by typing |

### States

{select_states_table}

### Accessibility

- **Role**: `combobox`, `listbox`, `option`
- **Keyboard**: Arrow keys, Enter, Escape
- **ARIA**: `aria-expanded`, `aria-activedescendant`

---

## Checkbox & Radio

### Description
{checkbox_description}

### States

| State | Checkbox | Radio |
|-------|----------|-------|
| Unchecked | Empty square | Empty circle |
| Checked | Square + checkmark | Circle + dot |
| Indeterminate | Square + dash | N/A |
| Hover | Border darkens | Border darkens |
| Focus | Focus ring | Focus ring |
| Disabled | Muted | Muted |

### Accessibility

- **Role**: `checkbox` / `radio`, `radiogroup`
- **Keyboard**: Space to toggle, Arrows for radio groups
- **Label**: Always clickable

---

## Toggle/Switch

### Description
{toggle_description}

### States

{toggle_states_table}

### Accessibility

- **Role**: `switch`
- **Keyboard**: Space to toggle
- **ARIA**: `aria-checked`

---

## Links

### Description
{link_description}

### Variants

| Type | Usage |
|------|-------|
| Inline | Within paragraph text |
| Standalone | Independent navigation |
| Navigation | Menu items |

### States

{link_states_table}

### Accessibility

- **Role**: `link`
- **Keyboard**: Enter to activate
- **External**: Include `rel="noopener"` for external links

---

## Cards

### Description
{card_description}

### Variants

| Type | Description |
|------|-------------|
| Standard | Basic container |
| Interactive | Clickable, hover state |
| Media | Image at top or side |
| Pricing | Structured pricing layout |

### Anatomy

{card_anatomy}

### States

{card_states_table}

### Specifications

- **Padding**: {card_padding}
- **Border Radius**: {card_radius}
- **Shadow**: {card_shadow}

---

## Modals/Dialogs

### Description
{modal_description}

### Types

| Type | Usage | Dismissal |
|------|-------|-----------|
| Confirmation | Yes/No decisions | Button only |
| Form | Data input | Submit or cancel |
| Informational | Announcements | Close button |

### Anatomy

{modal_anatomy}

### Specifications

- **Max Width**: 480-560px (simple), 720px (complex)
- **Backdrop**: rgba(0,0,0,0.5)
- **Animation**: {modal_animation}

### Accessibility

- **Role**: `dialog` or `alertdialog`
- **Focus Trap**: Yes
- **Keyboard**: Escape to close

---

## Accordions

### Description
{accordion_description}

### States

{accordion_states_table}

### Accessibility

- **Role**: Button header, region content
- **Keyboard**: Enter/Space to toggle
- **ARIA**: `aria-expanded`, `aria-controls`

---

## Tabs

### Description
{tab_description}

### Variants

| Type | Description |
|------|-------------|
| Horizontal | Standard, below tab bar |
| Vertical | Side navigation style |
| Pill | Rounded background |
| Underline | Bottom border indicator |

### Accessibility

- **Roles**: `tablist`, `tab`, `tabpanel`
- **Keyboard**: Arrow keys to navigate
- **ARIA**: `aria-selected`

---

## Alerts/Banners

### Description
{alert_description}

### Variants

| Type | Color | Icon | Usage |
|------|-------|------|-------|
| Success | Green | Checkmark | Positive |
| Warning | Yellow | Triangle | Caution |
| Error | Red | X | Problem |
| Info | Blue | i | Neutral |

### Accessibility

- **Role**: `alert` or `status`
- **Icon**: Never rely on color alone

---

## Toasts/Notifications

### Description
{toast_description}

### Specifications

- **Position**: Top-right or bottom-right
- **Auto-dismiss**: 3-5 seconds
- **Max visible**: 3
- **Animation**: Slide in, fade out

---

## Badges/Tags

### Description
{badge_description}

### Variants

| Type | Usage |
|------|-------|
| Status | Indicate state |
| Category | Classify content |
| Removable | User can dismiss |

---

## Progress

### Description
{progress_description}

### Types

| Type | Usage |
|------|-------|
| Linear bar | Known percentage |
| Circular | Compact, dashboard |
| Indeterminate | Unknown duration |
| Steps | Multi-stage process |

### Accessibility

- **Role**: `progressbar`
- **ARIA**: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

---

## Navbar

### Description
{navbar_description}

### Desktop Anatomy

{navbar_desktop_anatomy}

### Mobile Behavior

{navbar_mobile_behavior}

---

## Breadcrumbs

### Description
{breadcrumb_description}

### Specifications

- **Separator**: {breadcrumb_separator}
- **Truncation**: {breadcrumb_truncation}

---

## Pagination

### Description
{pagination_description}

### Variants

| Type | Usage |
|------|-------|
| Numbered | Page numbers |
| Infinite scroll | Load more on scroll |

---

## Footer

### Description
{footer_description}

### Variants

| Type | Sections |
|------|----------|
| Minimal | Copyright only |
| Standard | Links + copyright |
| Mega | Multi-column with all links |

---

*Generated by Style Guide Forge | {date}*
