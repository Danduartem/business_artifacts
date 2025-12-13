# List Component

**Component Category:** Data Display
**Design System:** Oitavo Café Design System
**Version:** 1.0
**Last Updated:** 2025-12-13

---

## Overview

Lists organize and display related items in a vertical sequence. They're fundamental for displaying collections of content, from simple feature lists to complex interactive item collections. In the Oitavo Café system, lists showcase service offerings, client benefits, step-by-step processes, and navigation menus.

**Primary Use Cases:**
- Service feature lists
- Step-by-step process guides
- ROI benefit breakdowns
- Client testimonial collections
- Navigation menus
- Activity feeds and timelines

**Design Principle Alignment:**
Following "Clarity Over Cleverness," lists make information scannable and hierarchical. They support "Restraint = Luxury" through minimal styling that emphasizes content over decoration.

---

## Anatomy

```
Unordered List:
• List item one
• List item two
• List item three

Ordered List:
1. First step
2. Second step
3. Third step

Description List:
Term 1
  Definition or description
Term 2
  Definition or description

Icon List:
✓ Feature one
✓ Feature two
✓ Feature three

Interactive List:
┌────────────────────────────┐
│ [Icon] Item Title     [>]  │ ← Clickable item
│        Subtitle            │
├────────────────────────────┤
│ [Icon] Item Title     [>]  │
│        Subtitle            │
└────────────────────────────┘
```

**Anatomy Parts:**
1. **Container** - Wrapper for list items
2. **List Items** - Individual entries
3. **Markers** (optional) - Bullets, numbers, icons
4. **Leading Media** (optional) - Icons, avatars, images
5. **Content** - Text, metadata
6. **Trailing Action** (optional) - Chevron, button, badge
7. **Dividers** (optional) - Separators between items

---

## Variants

### 1. Unordered List
Simple bullet list for related items without sequence.

**Visual Characteristics:**
- Custom bullet points (not default browser bullets)
- Consistent spacing between items
- Optional icons instead of bullets

**When to Use:**
- Feature lists
- Benefit highlights
- Non-sequential information
- Navigation menus

### 2. Ordered List
Numbered list for sequential information.

**Visual Characteristics:**
- Custom number styling
- Optional custom counter design
- Clear visual hierarchy

**When to Use:**
- Step-by-step processes
- Rankings or priorities
- Sequential instructions
- Process flows

### 3. Description List
Key-value pairs or term-definition pairs.

**Visual Characteristics:**
- Term on left or top, description on right or bottom
- Clear visual distinction between term and description
- Optional horizontal or vertical layout

**When to Use:**
- Metadata display
- Glossaries
- Specifications
- Property lists

### 4. Icon List
Items prefixed with icons for visual categorization.

**Visual Characteristics:**
- Icon aligned with first line of text
- Icon color can indicate status or category
- Consistent icon sizing

**When to Use:**
- Feature benefits (checkmarks)
- Status lists
- Categorized information
- Visual differentiation

### 5. Interactive List
Clickable items that navigate or expand.

**Visual Characteristics:**
- Hover states
- Trailing chevron or arrow
- Optional avatar or icon
- May include subtitle/metadata

**When to Use:**
- Navigation menus
- Settings panels
- Item selection
- Expandable sections

### 6. Activity/Timeline List
Chronological events or updates.

**Visual Characteristics:**
- Timestamp or date indicator
- Optional connecting line between items
- Avatar for attribution
- Metadata (time ago, actor)

**When to Use:**
- Activity feeds
- Project timelines
- Audit logs
- Notification lists

---

## Sizes

### Compact
- Item height: 32px
- Padding: 8px 12px
- Font size: 14px
- Use: Dense information, sidebars

### Default
- Item height: 48px
- Padding: 12px 16px
- Font size: 16px
- Use: Standard lists, feature displays

### Comfortable
- Item height: 64px
- Padding: 16px 20px
- Font size: 16px
- Use: Touch interfaces, prominent lists

---

## States

### List Item States

**Default**
```css
background: transparent;
color: var(--neutral-800);
border-bottom: 1px solid var(--neutral-200);
```

**Hover (interactive)**
```css
background: var(--support-50);
cursor: pointer;
```

**Active/Selected**
```css
background: var(--primary-50);
border-left: 3px solid var(--primary-600);
font-weight: 500;
```

**Focus**
```css
outline: 2px solid var(--primary-600);
outline-offset: -2px;
```

**Disabled**
```css
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;
```

---

## Color Specifications

### Default List
```css
background: white;
color: var(--neutral-800);
```

### List Item Border
```css
border-bottom: 1px solid var(--neutral-200);
```

### Hover State
```css
background: var(--support-50);  /* #F8F4F2 - warm cream */
```

### Selected State
```css
background: var(--primary-50);
border-left: 3px solid var(--primary-600);
```

### Icon Colors

**Success/Checkmark**
```css
color: var(--accent-600);  /* Golden Amber */
```

**Info**
```css
color: var(--secondary-600);
```

**Warning**
```css
color: var(--accent-700);
```

**Error**
```css
color: var(--primary-700);
```

---

## Typography

### List Item Title
- Font Size: 16px (var(--font-size-base))
- Font Weight: 500 (medium)
- Color: var(--neutral-800)
- Line Height: 1.5

### List Item Subtitle/Meta
- Font Size: 14px (var(--font-size-sm))
- Font Weight: 400 (regular)
- Color: var(--neutral-600)
- Line Height: 1.4

### Ordered List Numbers
- Font Size: Same as content
- Font Weight: 600 (semibold)
- Color: var(--primary-600)

### Description Terms
- Font Size: 14px (var(--font-size-sm))
- Font Weight: 600 (semibold)
- Color: var(--neutral-700)
- Text Transform: None

---

## Spacing & Layout

### List Spacing
- Margin between lists: 24px
- Padding within list container: 0

### List Item Spacing
- Compact: 8px vertical, 12px horizontal
- Default: 12px vertical, 16px horizontal
- Comfortable: 16px vertical, 20px horizontal

### Icon/Marker Spacing
- Gap from text: 12px
- Icon size: 20px (default), 16px (compact), 24px (comfortable)

### Nested List Indent
- First level: 0
- Second level: 24px
- Third level: 48px

### Description List Layout

**Horizontal:**
```
Term               Description
Another Term       Description
```
- Term width: 30% or fixed (180px)
- Gap: 24px

**Vertical (mobile):**
```
Term
Description

Another Term
Description
```
- Term margin-bottom: 4px
- Item margin-bottom: 16px

---

## Accessibility

### Semantic HTML

```html
<!-- Unordered list -->
<ul class="list" role="list">
  <li class="list__item">Feature one</li>
  <li class="list__item">Feature two</li>
  <li class="list__item">Feature three</li>
</ul>

<!-- Ordered list -->
<ol class="list list--ordered" role="list">
  <li class="list__item">First step</li>
  <li class="list__item">Second step</li>
  <li class="list__item">Third step</li>
</ol>

<!-- Description list -->
<dl class="list list--description">
  <dt class="list__term">Revenue</dt>
  <dd class="list__description">R$ 42.350</dd>

  <dt class="list__term">ROI</dt>
  <dd class="list__description">+23%</dd>
</dl>

<!-- Interactive list -->
<ul class="list list--interactive" role="list">
  <li class="list__item">
    <a href="/campaigns" class="list__link">
      <span class="list__content">
        <span class="list__title">Campaigns</span>
        <span class="list__subtitle">View all active campaigns</span>
      </span>
      <span class="list__action" aria-hidden="true">›</span>
    </a>
  </li>
</ul>

<!-- Icon list -->
<ul class="list list--icon" role="list">
  <li class="list__item">
    <span class="list__icon" aria-hidden="true">✓</span>
    <span>ROI mensurável em 90 dias</span>
  </li>
</ul>
```

### ARIA Guidelines
- Use semantic list elements (`<ul>`, `<ol>`, `<dl>`)
- Add `role="list"` if styling removes list semantics
- Interactive items: Wrap in `<a>` or `<button>`
- Icons: Use `aria-hidden="true"` if decorative
- Status icons: Provide text alternative
- Selected state: Use `aria-current="true"` or `aria-selected="true"`

### Keyboard Navigation
- **Tab**: Move to next interactive item
- **Shift + Tab**: Move to previous interactive item
- **Enter/Space**: Activate item
- **Arrow Up/Down**: Navigate list (optional enhancement)
- **Home/End**: First/last item (optional)

### Screen Reader Support
- Announce list type and item count ("List, 5 items")
- For icon lists: Announce icon meaning if semantic
- For activity lists: Include timestamp context
- Selected items: Announce selection state
- Nested lists: Announce nesting level

### Color Contrast
- Text meets WCAG AA (4.5:1 minimum)
- Icons/markers: 3:1 contrast minimum
- Focus indicators: 3:1 contrast
- Don't rely on color alone for status

---

## Responsive Behavior

### Mobile (< 768px)
- Stack description lists vertically
- Increase touch targets to 44px minimum
- Reduce comfortable spacing to default
- Consider hiding less important metadata

### Tablet (768px - 1024px)
- Can use horizontal description lists
- Default spacing optimal
- Full feature set

### Desktop (> 1024px)
- All layouts supported
- Can use more sophisticated layouts
- Hover states fully enabled

---

## Do's and Don'ts

### Do

- **Do** use semantic HTML (`<ul>`, `<ol>`, `<dl>`)
- **Do** provide clear visual hierarchy
- **Do** use icons to reinforce meaning (checkmarks for benefits)
- **Do** maintain consistent spacing between items
- **Do** provide hover states for interactive lists
- **Do** use Golden Amber checkmarks for ROI benefits
- **Do** keep list items concise and scannable

### Don't

- **Don't** use lists for non-list content
- **Don't** exceed 3 levels of nesting (confusing)
- **Don't** forget touch targets on mobile (44px minimum)
- **Don't** rely on color alone for meaning
- **Don't** make non-interactive items look clickable
- **Don't** use tiny icons that are hard to see
- **Don't** create walls of text in list items

### Brand-Specific Guidance

**Carolina's Dashboard Context:**
- Use icon lists with Golden Amber checkmarks for ROI benefits
- "Sistema completo de vendas" features
- Step-by-step onboarding processes
- Client success metrics in timeline format
- Service offerings with clear value props

**Feature List Best Practice:**
```
✓ ROI mensurável em 90 dias
✓ Dashboard com métricas reais (vendas, não likes)
✓ Sistema integrado (social + site + ads)
✓ Suporte dedicado por WhatsApp
```

---

## Code Examples

### Basic Unordered List

```html
<ul class="list" role="list">
  <li class="list__item">Dashboard com métricas reais</li>
  <li class="list__item">ROI mensurável em 90 dias</li>
  <li class="list__item">Suporte dedicado por WhatsApp</li>
</ul>
```

```css
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list__item {
  padding: 12px 16px;
  border-bottom: 1px solid var(--neutral-200);
  color: var(--neutral-800);
  line-height: 1.5;
}

.list__item:last-child {
  border-bottom: none;
}

/* Custom bullet */
.list__item::before {
  content: '•';
  color: var(--primary-600);
  font-weight: bold;
  margin-right: 12px;
}
```

### Ordered List

```html
<ol class="list list--ordered" role="list">
  <li class="list__item">Diagnóstico: Entendemos seu funil</li>
  <li class="list__item">Estruturação: Conectamos todas as peças</li>
  <li class="list__item">Implementação: Colocamos pra rodar</li>
  <li class="list__item">Otimização: Ajustamos baseado em dados</li>
</ol>
```

```css
.list--ordered {
  counter-reset: list-counter;
}

.list--ordered .list__item {
  counter-increment: list-counter;
  position: relative;
  padding-left: 48px;
}

.list--ordered .list__item::before {
  content: counter(list-counter);
  position: absolute;
  left: 16px;
  top: 12px;
  width: 24px;
  height: 24px;
  background: var(--primary-600);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
```

### Description List

```html
<dl class="list list--description">
  <div class="list__item">
    <dt class="list__term">Revenue This Month</dt>
    <dd class="list__description">R$ 42.350</dd>
  </div>
  <div class="list__item">
    <dt class="list__term">ROI</dt>
    <dd class="list__description">+23%</dd>
  </div>
  <div class="list__item">
    <dt class="list__term">Active Campaigns</dt>
    <dd class="list__description">3</dd>
  </div>
</dl>
```

```css
.list--description {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list--description .list__item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid var(--neutral-200);
}

.list__term {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--neutral-700);
  margin: 0;
}

.list__description {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--neutral-800);
  margin: 0;
  text-align: right;
}

/* Vertical layout on mobile */
@media (max-width: 768px) {
  .list--description .list__item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .list__description {
    text-align: left;
  }
}
```

### Icon List (Feature List)

```html
<ul class="list list--icon" role="list">
  <li class="list__item">
    <span class="list__icon list__icon--success" aria-hidden="true">✓</span>
    <span>ROI mensurável em 90 dias</span>
  </li>
  <li class="list__item">
    <span class="list__icon list__icon--success" aria-hidden="true">✓</span>
    <span>Dashboard com métricas reais (vendas, não likes)</span>
  </li>
  <li class="list__item">
    <span class="list__icon list__icon--success" aria-hidden="true">✓</span>
    <span>Sistema integrado (social + site + ads)</span>
  </li>
</ul>
```

```css
.list--icon .list__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 16px;
}

.list__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.list__icon--success {
  color: var(--accent-600);  /* Golden Amber */
}

.list__icon--info {
  color: var(--secondary-600);
}

.list__icon--warning {
  color: var(--accent-700);
}

.list__icon--error {
  color: var(--primary-700);
}
```

### Interactive List (Navigation)

```html
<ul class="list list--interactive" role="list">
  <li class="list__item">
    <a href="/campaigns" class="list__link">
      <div class="list__media">
        <svg class="list__icon"><!-- campaign icon --></svg>
      </div>
      <div class="list__content">
        <span class="list__title">Campaigns</span>
        <span class="list__subtitle">View all active campaigns</span>
      </div>
      <div class="list__action">
        <span aria-hidden="true">›</span>
      </div>
    </a>
  </li>
  <li class="list__item">
    <a href="/clients" class="list__link">
      <div class="list__media">
        <svg class="list__icon"><!-- clients icon --></svg>
      </div>
      <div class="list__content">
        <span class="list__title">Clients</span>
        <span class="list__subtitle">Manage client relationships</span>
      </div>
      <div class="list__action">
        <span aria-hidden="true">›</span>
      </div>
    </a>
  </li>
</ul>
```

```css
.list--interactive .list__item {
  padding: 0;
  border-bottom: 1px solid var(--neutral-200);
}

.list__link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  text-decoration: none;
  color: inherit;
  transition: background var(--duration-fast) var(--ease-gentle);
}

.list__link:hover {
  background: var(--support-50);
}

.list__link:focus-visible {
  outline: 2px solid var(--primary-600);
  outline-offset: -2px;
}

.list__media {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neutral-100);
  border-radius: var(--radius-md);
}

.list__icon {
  width: 20px;
  height: 20px;
  color: var(--neutral-600);
}

.list__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.list__title {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--neutral-800);
}

.list__subtitle {
  font-size: var(--font-size-sm);
  color: var(--neutral-600);
}

.list__action {
  flex-shrink: 0;
  color: var(--neutral-400);
  font-size: 20px;
}

/* Selected state */
.list__link[aria-current="page"] {
  background: var(--primary-50);
  border-left: 3px solid var(--primary-600);
}

.list__link[aria-current="page"] .list__title {
  color: var(--primary-700);
  font-weight: 600;
}
```

### Activity/Timeline List

```html
<ul class="list list--timeline" role="list">
  <li class="list__item">
    <div class="list__timeline-marker"></div>
    <img class="avatar avatar--sm" src="/user.jpg" alt="Carolina Silva" />
    <div class="list__content">
      <div class="list__title">
        <strong>Carolina Silva</strong> criou nova campanha
      </div>
      <div class="list__meta">2 horas atrás</div>
    </div>
  </li>
  <li class="list__item">
    <div class="list__timeline-marker"></div>
    <img class="avatar avatar--sm" src="/user2.jpg" alt="João Santos" />
    <div class="list__content">
      <div class="list__title">
        <strong>João Santos</strong> adicionou comentário
      </div>
      <div class="list__meta">5 horas atrás</div>
    </div>
  </li>
</ul>
```

```css
.list--timeline {
  position: relative;
}

.list--timeline::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 24px;
  bottom: 24px;
  width: 2px;
  background: var(--neutral-200);
}

.list--timeline .list__item {
  position: relative;
  display: flex;
  gap: 12px;
  padding: 12px 16px 12px 32px;
  border-bottom: none;
}

.list__timeline-marker {
  position: absolute;
  left: 12px;
  top: 18px;
  width: 10px;
  height: 10px;
  background: var(--primary-600);
  border: 2px solid white;
  border-radius: 50%;
  z-index: 1;
}

.list--timeline .list__content {
  flex: 1;
}

.list__meta {
  font-size: var(--font-size-xs);
  color: var(--neutral-500);
  margin-top: 4px;
}
```

---

## React/Component Example

```jsx
// List.jsx
const List = ({ children, variant = 'default', size = 'default', className = '' }) => {
  const variantClass = variant !== 'default' ? `list--${variant}` : '';
  const sizeClass = size !== 'default' ? `list--${size}` : '';

  return (
    <ul className={`list ${variantClass} ${sizeClass} ${className}`} role="list">
      {children}
    </ul>
  );
};

// ListItem.jsx
const ListItem = ({ children, icon, title, subtitle, href, selected, onClick }) => {
  const content = (
    <>
      {icon && <span className="list__icon" aria-hidden="true">{icon}</span>}
      <div className="list__content">
        {title && <span className="list__title">{title}</span>}
        {subtitle && <span className="list__subtitle">{subtitle}</span>}
        {!title && !subtitle && children}
      </div>
      {href && <span className="list__action" aria-hidden="true">›</span>}
    </>
  );

  if (href) {
    return (
      <li className="list__item">
        <a
          href={href}
          className="list__link"
          aria-current={selected ? 'page' : undefined}
        >
          {content}
        </a>
      </li>
    );
  }

  if (onClick) {
    return (
      <li className="list__item">
        <button className="list__link" onClick={onClick}>
          {content}
        </button>
      </li>
    );
  }

  return <li className="list__item">{content}</li>;
};

// DescriptionList.jsx
const DescriptionList = ({ items }) => (
  <dl className="list list--description">
    {items.map((item, index) => (
      <div className="list__item" key={index}>
        <dt className="list__term">{item.term}</dt>
        <dd className="list__description">{item.description}</dd>
      </div>
    ))}
  </dl>
);

// Usage
<List variant="icon">
  <ListItem icon="✓">ROI mensurável em 90 dias</ListItem>
  <ListItem icon="✓">Dashboard com métricas reais</ListItem>
  <ListItem icon="✓">Sistema integrado</ListItem>
</List>

<List variant="interactive">
  <ListItem
    href="/campaigns"
    title="Campaigns"
    subtitle="View all active campaigns"
    selected
  />
  <ListItem
    href="/clients"
    title="Clients"
    subtitle="Manage client relationships"
  />
</List>

<DescriptionList
  items={[
    { term: 'Revenue', description: 'R$ 42.350' },
    { term: 'ROI', description: '+23%' },
    { term: 'Campaigns', description: '3 active' }
  ]}
/>
```

---

## Design Tokens Reference

```css
/* List-specific tokens */
:root {
  /* Sizes */
  --list-item-height-compact: 32px;
  --list-item-height-default: 48px;
  --list-item-height-comfortable: 64px;

  /* Padding */
  --list-item-padding-compact: 8px 12px;
  --list-item-padding-default: 12px 16px;
  --list-item-padding-comfortable: 16px 20px;

  /* Spacing */
  --list-item-gap: 12px;
  --list-icon-size: 20px;
  --list-icon-gap: 12px;
  --list-nested-indent: 24px;

  /* Border */
  --list-border: 1px solid var(--neutral-200);

  /* Colors */
  --list-hover-bg: var(--support-50);
  --list-selected-bg: var(--primary-50);
  --list-selected-border: var(--primary-600);
}
```

---

## Related Components

- **Card** - Lists often appear within cards
- **Avatar** - Used in activity/timeline lists
- **Badge** - Status indicators in list items
- **Icon** - Visual markers and indicators

---

## References

- Design Principle: "Clarity Over Cleverness"
- Design Principle: "Restraint = Luxury"
- Brand Context: Feature lists with Golden Amber checkmarks
- Carolina's Benefits: Clear, scannable value propositions

---

*Generated for Oitavo Café Design System - Organized information, clear hierarchy*
