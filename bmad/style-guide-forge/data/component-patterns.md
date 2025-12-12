# Component Patterns

Reference guide for the Component Designer agent when documenting UI components.

---

## Component Documentation Structure

Every component should include:

1. **Description**: What it is, when to use it
2. **Anatomy**: Visual breakdown of parts
3. **Variants**: Sizes, styles, types
4. **States**: All interactive states
5. **Accessibility**: ARIA, keyboard, focus requirements
6. **Do's and Don'ts**: Usage guidelines with examples
7. **Code snippets**: Ready-to-use examples

---

## Core Components

### 1. Buttons

#### Variants by Hierarchy

| Variant | Usage | Visual Treatment |
|---------|-------|------------------|
| **Primary** | Main action, CTA | Filled, brand color |
| **Secondary** | Supporting actions | Outlined or muted fill |
| **Tertiary/Ghost** | Low emphasis | Text only, no background |
| **Destructive** | Dangerous actions | Red/warning color |
| **Icon-only** | When icon is clear | Square aspect ratio |

#### States

| State | Visual Cues |
|-------|-------------|
| Default | Base appearance |
| Hover | Slight darkening, cursor pointer |
| Active/Pressed | Darker, slight scale reduction |
| Focus | Visible focus ring (2px, offset) |
| Disabled | 50% opacity, cursor not-allowed |
| Loading | Spinner, disabled interaction |

#### Size Variants

| Size | Height | Padding | Font Size | Use Case |
|------|--------|---------|-----------|----------|
| Small | 32px | 12px h | 14px | Compact UIs, tables |
| Medium | 40px | 16px h | 16px | Default |
| Large | 48px | 24px h | 18px | CTAs, hero sections |

#### Rules
- One primary button per view/section
- Icon + text gap: 8px
- Minimum width: 80px (text buttons)
- Touch target: 44×44px minimum

---

### 2. Form Inputs

#### Types

- Text input
- Email input
- Password input (with show/hide toggle)
- Number input (with increment/decrement)
- Textarea (resizable)

#### Anatomy

```
┌─────────────────────────────────────┐
│ Label *                              │ ← Label (always visible)
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Placeholder text...              │ │ ← Input field
│ └─────────────────────────────────┘ │
│ Helper text or error message         │ ← Helper/error text
└─────────────────────────────────────┘
```

#### States

| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | Gray | White | Placeholder gray |
| Hover | Darker gray | White | - |
| Focus | Brand color | White | - |
| Filled | Gray | White | Text color |
| Error | Red | White/light red | Error message red |
| Disabled | Light gray | Gray | Muted |
| Read-only | None/subtle | Gray | Normal |

#### Rules
- Labels: Always visible (never use placeholder as label)
- Required indicator: Asterisk (*) or "(required)"
- Error messages: Inline, below input, specific language
- Min height: 40-48px for touch targets

---

### 3. Select/Dropdown

#### Variants

| Type | Description |
|------|-------------|
| Single select | Choose one option |
| Multi-select | Choose multiple with checkboxes |
| Searchable | Filter options by typing |
| Grouped | Options organized by category |

#### States
Same as form inputs, plus:
- Open/expanded (dropdown visible)
- Option hover
- Option selected
- Option disabled

#### Rules
- Max visible options: 6-8 before scrolling
- Search appears at 10+ options
- Clear selection option for optional fields
- Keyboard navigation: Arrow keys, Enter, Escape

---

### 4. Checkbox & Radio

#### Anatomy

```
┌──┐
│✓ │ Label text
└──┘
```

#### States

| State | Checkbox | Radio |
|-------|----------|-------|
| Unchecked | Empty square | Empty circle |
| Checked | Square + checkmark | Circle + dot |
| Indeterminate | Square + dash | N/A |
| Hover | Border darkens | Border darkens |
| Focus | Focus ring | Focus ring |
| Disabled | Muted, no pointer | Muted, no pointer |

#### Rules
- Min touch target: 44×44px (including label)
- Label always clickable
- Radio: Only one in group selected
- Checkbox: Independent selection
- Gap between options: 8-12px

---

### 5. Toggle/Switch

#### States

| State | Visual |
|-------|--------|
| Off | Track gray, thumb left |
| On | Track brand color, thumb right |
| Disabled Off | Muted gray |
| Disabled On | Muted brand color |
| Focus | Focus ring around track |

#### Rules
- Always pair with visible label
- Animation: 150-200ms
- Size: 48-56px wide, 24-28px tall
- Use for immediate effect (no submit needed)

---

### 6. Cards

#### Variants

| Type | Description |
|------|-------------|
| Standard | Basic container with padding |
| Interactive | Clickable, hover state |
| Media | Image at top or side |
| Pricing | Structured pricing layout |
| Horizontal | Side-by-side layout |

#### Anatomy

```
┌────────────────────────────┐
│ [Image/Media]              │
├────────────────────────────┤
│ Eyebrow text               │
│ Heading                    │
│ Description text...        │
│                            │
│ [Action] [Secondary]       │
└────────────────────────────┘
```

#### States
- Default
- Hover (if interactive): Shadow increase, subtle lift
- Focus (if interactive): Focus ring
- Selected: Border or background change
- Loading: Skeleton placeholder

#### Rules
- Consistent padding: 16-24px
- Border radius: 8-16px
- Shadow: Subtle, increases on hover
- Responsive: Stack vertically on mobile

---

### 7. Modals/Dialogs

#### Types

| Type | Usage | Dismissal |
|------|-------|-----------|
| Confirmation | Yes/No decisions | Button only |
| Form | Data input | Submit or cancel |
| Informational | Announcements | Close button |
| Alert | Critical messages | Acknowledge |

#### Anatomy

```
┌──────────────────────────────────┐
│ × │ Modal Title                   │ ← Header + close button
├──────────────────────────────────┤
│                                  │
│ Modal content goes here...       │ ← Content area
│                                  │
├──────────────────────────────────┤
│        [Cancel] [Primary Action] │ ← Footer with actions
└──────────────────────────────────┘
```

#### Rules
- Max width: 480-560px for simple, 720px for complex
- Backdrop: Dark overlay (rgba(0,0,0,0.5))
- Close: X button, Escape key, backdrop click (optional)
- Focus trap: Keep focus inside modal
- Scroll: Content scrolls, header/footer fixed

---

### 8. Alerts/Banners

#### Variants

| Type | Color | Icon | Usage |
|------|-------|------|-------|
| Success | Green | Checkmark | Positive confirmation |
| Warning | Yellow/Orange | Triangle | Caution needed |
| Error | Red | X or ! | Something wrong |
| Info | Blue | i | Neutral information |

#### Anatomy

```
┌─────────────────────────────────────────┐
│ [Icon] Message text                   × │
└─────────────────────────────────────────┘
```

#### Rules
- Dismissible: X button (optional)
- Position: Top of page/section or inline
- Icon: Always include for accessibility
- Don't rely on color alone

---

### 9. Tabs

#### Variants

| Type | Description |
|------|-------------|
| Horizontal | Standard, below tab bar |
| Vertical | Side navigation style |
| Pill | Rounded background tabs |
| Underline | Bottom border indicator |

#### States

| State | Active | Inactive |
|-------|--------|----------|
| Default | Bold text, indicator | Normal text |
| Hover | - | Slight background |
| Focus | Focus ring | Focus ring |
| Disabled | Muted | Muted |

#### Rules
- Active indicator: 2px underline or background
- One tab active at a time
- Keyboard: Arrow keys to navigate
- ARIA: `role="tablist"`, `role="tab"`, `aria-selected`

---

### 10. Navigation

#### Types

| Component | Usage |
|-----------|-------|
| Navbar | Primary site navigation |
| Sidebar | Secondary/app navigation |
| Breadcrumbs | Location hierarchy |
| Pagination | Multi-page content |

#### Navbar Anatomy

```
┌──────────────────────────────────────────────────┐
│ [Logo]    Nav Item   Nav Item   Nav Item   [CTA] │
└──────────────────────────────────────────────────┘
```

#### Mobile Navigation
- Hamburger menu icon (3 lines)
- Slide-out drawer or full-screen overlay
- Close button clearly visible
- Touch-friendly targets (48px min)

---

## Feedback Components

### Toast Notifications

#### Positioning
- Top-right or bottom-right (most common)
- Stack vertically if multiple
- Auto-dismiss: 3-5 seconds

#### Rules
- Max 3 visible at once
- Animation: Slide in, fade out
- Include close button
- Don't block important content

### Progress Indicators

#### Types

| Type | Usage |
|------|-------|
| Linear bar | Known progress percentage |
| Circular | Compact, dashboard |
| Indeterminate | Unknown duration |
| Steps | Multi-stage process |

#### Rules
- Show percentage when known
- Animate smoothly (not jumpy)
- Accessible: `role="progressbar"`, `aria-valuenow`

---

## Accessibility Checklist Per Component

### Universal Requirements

| Requirement | Implementation |
|-------------|----------------|
| Focus visible | 2px ring, 3:1 contrast |
| Keyboard operable | Tab, Enter, Space, Arrows, Escape |
| Screen reader | Proper ARIA roles and labels |
| Color independence | Don't rely on color alone |
| Touch targets | 44×44px minimum |
| Error identification | Clear, specific messages |

### ARIA Roles Reference

| Component | Role(s) |
|-----------|---------|
| Button | `button` |
| Input | `textbox` |
| Checkbox | `checkbox` |
| Radio | `radio`, `radiogroup` |
| Select | `combobox`, `listbox`, `option` |
| Modal | `dialog`, `alertdialog` |
| Tabs | `tablist`, `tab`, `tabpanel` |
| Alert | `alert`, `status` |
| Navigation | `navigation` |

---

## Do's and Don'ts Template

### Do's
- Use consistent styling across all instances
- Provide clear visual feedback for all states
- Test with keyboard navigation
- Include loading states where appropriate
- Follow established patterns

### Don'ts
- Don't create custom components when standard ones work
- Don't disable hover states on mobile (they work on long-press)
- Don't make interactive elements look static
- Don't use placeholder text as labels
- Don't rely on color alone to convey meaning
