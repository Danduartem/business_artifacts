# Tabs Component

**Oitavo Café Design System** | Navigation Component

---

## Overview

Tabs organize related content into separate views, allowing users to switch between sections without leaving the page. For Oitavo Café, tabs help guide users through the funnel stages (Social → Landing → Email → Sale) and organize dashboard metrics in scannable, digestible sections.

**Purpose**: Enable efficient navigation between related content sections while maintaining context and reducing cognitive load.

**Brand Alignment**: Tabs reflect the "System Over Service" principle - showing integration and flow between connected sections. The active indicator animation provides smooth, coffee-like transitions.

---

## Anatomy

```
┌─────────────────────────────────────────────────────┐
│ ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│ │  Meu ROI │  │ Funil   │  │ Leads   │  │ Vendas  │ │
│ └─────────┘  └─────────┘  └─────────┘  └─────────┘ │
│ ════════════                                         │ ← Active indicator
├─────────────────────────────────────────────────────┤
│                                                      │
│  Tab Panel Content Area                             │
│  (Current active tab content displays here)         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Parts**:
1. **Tab List** - Container for all tab buttons
2. **Tab Button** - Individual clickable tab
3. **Active Indicator** - Visual line/bar showing current tab
4. **Tab Panel** - Content area for active tab

---

## Variants

### Horizontal Tabs (Default)

**Use Case**: Primary navigation within page sections, dashboard views

```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Overview│  │ Métricas│  │ Relatórios│
└─────────┘  └─────────┘  └─────────┘
════════════
```

**Specs**:
- Tab button padding: `12px 24px` (spacing-4 × spacing-5)
- Gap between tabs: `8px` (spacing-2)
- Active indicator height: `3px`
- Active indicator color: `primary-700` (#75201C)
- Active indicator position: `bottom`
- Border bottom (full width): `1px solid neutral-200` (#D3CCCA)

### Vertical Tabs

**Use Case**: Sidebar navigation, settings panels, longer tab lists (6+ items)

```
┌─────────────────┐
│ ► Meu ROI       │ ← Active
├─────────────────┤
│   Funil         │
├─────────────────┤
│   Leads         │
├─────────────────┤
│   Vendas        │
└─────────────────┘
```

**Specs**:
- Tab button padding: `16px 24px` (spacing-4 × spacing-5)
- Gap between tabs: `4px` (spacing-1)
- Active indicator width: `4px`
- Active indicator color: `primary-700` (#75201C)
- Active indicator position: `left`
- Border right (full height): `1px solid neutral-200`

### Pills Style

**Use Case**: Filter tabs, category switching, less formal contexts

```
┌─────────────┐  ┌──────────┐  ┌──────────┐
│ Todos       │  │ Ativos   │  │ Pausados │
└─────────────┘  └──────────┘  └──────────┘
   ^^^^^^^^^ Active (filled background)
```

**Specs**:
- Tab button padding: `10px 20px`
- Border radius: `24px` (full pill)
- Active background: `primary-700` (#75201C)
- Active text: `support-50` (#F8F4F2)
- Inactive background: `transparent`
- Inactive text: `neutral-700` (#4A403D)
- Inactive hover background: `neutral-100` (#EBE7E6)
- Gap between tabs: `8px`

---

## States

### Default (Inactive)

**Visual**:
- Text color: `neutral-700` (#4A403D)
- Font weight: `500` (Hartwell Regular)
- Background: `transparent`
- Cursor: `pointer`

### Hover (Inactive)

**Visual**:
- Text color: `primary-600` (#993A33)
- Background: `support-100` (#EDE7E1)
- Transition: `all 150ms ease-out`

### Active

**Visual**:
- Text color: `primary-700` (#75201C)
- Font weight: `600` (Hartwell Medium)
- Background: `transparent` (horizontal) or `support-50` (vertical)
- Active indicator: Full opacity
- Cursor: `default`

### Focus (Keyboard)

**Visual**:
- Focus ring: `3px solid primary-600` with `0.3` opacity
- Offset: `2px`
- Border radius: `6px`

### Disabled

**Visual**:
- Text color: `neutral-400` (#958986)
- Cursor: `not-allowed`
- Opacity: `0.5`

---

## Responsive Behavior

### Desktop (1440px+)
- Horizontal layout (default)
- All tabs visible
- Tab button min-width: `120px`
- Max tabs per row: 8

### Tablet (768px - 1439px)
- Horizontal layout maintained
- Tab button padding reduced: `10px 16px`
- Max tabs per row: 6
- Scrollable if overflow

### Mobile (< 768px)
- **Option 1: Scrollable Horizontal**
  - Swipe to reveal more tabs
  - Snap to tab on scroll stop
  - Show scroll gradient on edges

- **Option 2: Dropdown (5+ tabs)**
  - Convert to select dropdown
  - Shows active tab label
  - Opens menu with all options

**Recommendation**: Use scrollable horizontal for 2-4 tabs, dropdown for 5+ tabs on mobile.

---

## Animation Specifications

### Tab Switch Animation

**Indicator Slide**:
- Duration: `300ms`
- Easing: `cubic-bezier(0.4, 0, 0.6, 1)` (sharp)
- Property: `transform: translateX()` (horizontal) or `translateY()` (vertical)
- Accompanying: Text color transition `200ms`

**Content Fade**:
- Old panel: `opacity 0 → 0` in `150ms`
- New panel: `opacity 0 → 1` in `200ms` with `50ms` delay
- Total duration: `400ms`

**Reduced Motion**:
```css
@media (prefers-reduced-motion: reduce) {
  .tab-indicator {
    transition: none;
  }
  .tab-panel {
    transition: opacity 50ms;
  }
}
```

### Hover Animation

- Background color fade: `150ms ease-out`
- Text color fade: `150ms ease-out`

---

## Props / API

```typescript
interface TabsProps {
  // Content
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;

  // Variants
  variant?: 'horizontal' | 'vertical' | 'pills';

  // Styling
  align?: 'left' | 'center' | 'right' | 'stretch';
  size?: 'small' | 'medium' | 'large';

  // Behavior
  lazy?: boolean; // Load panel content on demand
  unmountInactive?: boolean; // Destroy inactive panels

  // Accessibility
  ariaLabel?: string;
  id?: string;
}

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
  panel: React.ReactNode;
}
```

**Example Usage**:
```tsx
<Tabs
  tabs={[
    { id: 'roi', label: 'Meu ROI', panel: <ROIDashboard /> },
    { id: 'funnel', label: 'Funil', panel: <FunnelView /> },
    { id: 'leads', label: 'Leads', panel: <LeadsTable /> }
  ]}
  defaultTab="roi"
  variant="horizontal"
  align="left"
/>
```

---

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus to tab list (first tab) |
| `→` / `←` | Navigate between tabs (horizontal) |
| `↓` / `↑` | Navigate between tabs (vertical) |
| `Home` | Focus first tab |
| `End` | Focus last tab |
| `Enter` / `Space` | Activate focused tab |

### ARIA Attributes

**Tab List**:
```html
<div
  role="tablist"
  aria-label="Dashboard sections"
  aria-orientation="horizontal"
>
```

**Tab Button**:
```html
<button
  role="tab"
  id="tab-roi"
  aria-selected="true"
  aria-controls="panel-roi"
  tabindex="0"
>
  Meu ROI
</button>
```

**Tab Panel**:
```html
<div
  role="tabpanel"
  id="panel-roi"
  aria-labelledby="tab-roi"
  tabindex="0"
>
  <!-- Panel content -->
</div>
```

### Focus Management

- When tab is activated, move focus to tab button
- Panel content should be focusable for keyboard users
- Skip to tab panel content should be available
- Disabled tabs should be skipped in keyboard navigation

### Screen Reader Support

- Announce: "Tab list with 4 tabs"
- Announce: "Tab 2 of 4, Funil, selected"
- Panel changes announced automatically

---

## Brand Voice in Tab Labels

### Do's ✓

**Results-Focused**:
- "Meu ROI" (not "Dashboard")
- "Vendas" (not "Sales Pipeline")
- "Funil de Conversão" (not "Marketing Funnel")

**Direct Language**:
- "Investimento" (not "Pricing Plans")
- "Resultados" (not "Analytics")
- "Sistema" (not "Overview")

**Brand Personality**:
- "Como funciona" (not "About")
- "Casos reais" (not "Case Studies")
- "Falar com a gente" (not "Contact")

### Don'ts ✗

**Avoid Jargon**:
- ✗ "Awareness"
- ✗ "Engagement Metrics"
- ✗ "KPIs"
- ✗ "Synergy"

**Avoid Vague Terms**:
- ✗ "Insights"
- ✗ "Performance"
- ✗ "Growth" (without context)

**Avoid Corporate Speak**:
- ✗ "Solutions"
- ✗ "Enterprise Platform"
- ✗ "Strategic Overview"

---

## Usage Guidelines

### When to Use

- Organizing dashboard sections (ROI, Funnel, Leads, Sales)
- Switching between related views (Day/Week/Month)
- Filtering content categories
- Settings with multiple sections
- Multi-step forms (as navigation, not progress)

### When NOT to Use

- For primary site navigation (use Navbar)
- For page-to-page navigation (use Breadcrumb or links)
- For sequential processes (use Stepper)
- For 2 options (use Toggle Switch)
- For many options (use Dropdown)

### Content Guidelines

- **Limit to 2-8 tabs** - More options create decision paralysis
- **Keep labels short** - 1-2 words ideal, 3 maximum
- **Use consistent length** - Avoid "ROI" next to "Configurações de Integração"
- **Logical order** - Follow user mental model or process flow
- **Equal importance** - All tabs should be comparable in hierarchy

---

## Do's and Don'ts

### Visual Design

**Do**:
- Use clear active indicator with brand color
- Maintain consistent spacing and alignment
- Ensure sufficient touch target (44×44px minimum)
- Use subtle hover states for feedback

**Don't**:
- Over-style tabs with heavy borders or backgrounds
- Use icons without labels (exceptions: extremely familiar icons)
- Make inactive tabs too prominent
- Use decorative animations that distract

### Interaction

**Do**:
- Animate tab indicator smoothly
- Provide immediate visual feedback on click
- Support keyboard navigation fully
- Remember user's last selected tab (if appropriate)

**Don't**:
- Auto-rotate tabs without user control
- Switch tabs on hover
- Use tabs for navigation to different pages
- Disable tabs without explanation

### Content

**Do**:
- Use brand voice in labels ("Meu ROI")
- Keep content within tabs related
- Load heavy content lazily
- Show loading states when switching

**Don't**:
- Mix disparate content types
- Use generic labels ("Tab 1", "Section A")
- Nest tabs within tabs
- Hide critical actions in inactive tabs

---

## Code Example

```tsx
// React + Tailwind implementation
import { useState } from 'react';

export function Tabs({ tabs, defaultTab, variant = 'horizontal' }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className="tabs">
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation={variant}
        className={`
          flex gap-2 border-b border-neutral-200
          ${variant === 'vertical' ? 'flex-col border-r border-b-0' : ''}
        `}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-3 font-medium transition-all duration-150
              relative focus:outline-none focus:ring-3 focus:ring-primary-600/30
              ${activeTab === tab.id
                ? 'text-primary-700 font-semibold'
                : 'text-neutral-700 hover:text-primary-600 hover:bg-support-100'
              }
            `}
          >
            {tab.label}

            {/* Active Indicator */}
            {activeTab === tab.id && (
              <span
                className={`
                  absolute bg-primary-700 transition-all duration-300
                  ${variant === 'vertical'
                    ? 'left-0 top-0 bottom-0 w-1'
                    : 'left-0 right-0 bottom-0 h-[3px]'
                  }
                `}
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map(tab => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className="py-6 animate-fadeIn"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

// CSS for fade animation
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// .animate-fadeIn {
//   animation: fadeIn 200ms ease-out;
// }
```

---

## Related Components

- **Breadcrumb** - Shows hierarchical navigation path
- **Navbar** - Primary site navigation
- **Sidebar** - Vertical persistent navigation
- **Stepper** - Sequential process navigation
- **Accordion** - Collapsible content sections

---

## References

- WAI-ARIA Authoring Practices: [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- Nielsen Norman Group: [Tabs, Used Right](https://www.nngroup.com/articles/tabs-used-right/)
- Material Design: [Tabs](https://m3.material.io/components/tabs)

---

**Component Status**: ✅ Production Ready
**Last Updated**: 2025-12-13
**Version**: 1.0.0
