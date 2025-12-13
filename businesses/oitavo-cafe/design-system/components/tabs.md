# Tabs Component

## Overview

**Purpose**: Tabbed navigation allows users to switch between related content views within the same context without leaving the page. Tabs organize content into logical groups, reducing cognitive load and page clutter.

**Usage**: Use tabs when content can be divided into distinct, related sections that users may want to compare or switch between frequently. Common use cases: dashboard views ("Visão Geral" vs "Métricas Detalhadas"), settings categories, product details.

**Brand Context**: For Oitavo Café, tabs help Carolina navigate between different aspects of her marketing performance - from social media metrics to email campaign results - maintaining focus on outcomes rather than drowning in data.

---

## Anatomy

```
Horizontal Tabs (Default):
┌─────────────────────────────────────────────────────┐
│ [Active Tab]  [Tab 2]  [Tab 3]  [Tab 4]            │
│ ═══════════                                         │
│                                                      │
│  ┌───────────────────────────────────────────┐     │
│  │                                            │     │
│  │         Tab Panel Content                  │     │
│  │                                            │     │
│  └───────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘

Components:
1. Tab List (container) - role="tablist"
2. Tab Buttons - role="tab", clickable headers
3. Active Indicator - visual marker (underline or background)
4. Tab Panel - role="tabpanel", content area


Vertical Tabs (Optional):
┌──────────┬──────────────────────────────────┐
│ Active   │                                   │
│ Tab      │                                   │
│──────────│                                   │
│ Tab 2    │    Tab Panel Content              │
│          │                                   │
│ Tab 3    │                                   │
│          │                                   │
│ Tab 4    │                                   │
└──────────┴──────────────────────────────────┘

Left indicator bar shows active tab
```

---

## Variants

### 1. **Underline Tabs** (Default)
- **Purpose**: Clean, modern look for content-heavy interfaces
- **Specs**:
  - Active indicator: 3px bottom border
  - Border color: `primary-700` (#75201C)
  - Tab spacing: 32px gap between tabs
  - Background: transparent
  - Hover: subtle background `neutral-50` (#F8F5F2)

### 2. **Filled Tabs**
- **Purpose**: Higher emphasis, clearer separation
- **Specs**:
  - Active background: `primary-700` (#75201C)
  - Active text: `white`
  - Inactive background: `neutral-100` (#EDE7E1)
  - Inactive text: `neutral-600` (#685A56)
  - Border radius: `8px 8px 0 0` (top corners only)

### 3. **Pill Tabs**
- **Purpose**: Compact, button-like navigation for smaller spaces
- **Specs**:
  - Active background: `primary-700` (#75201C)
  - Active text: `white`
  - Inactive background: transparent
  - Inactive text: `neutral-700` (#453C39)
  - Border radius: `24px` (full pill)
  - Padding: `8px 20px`
  - Gap: `12px`

### 4. **Vertical Tabs**
- **Purpose**: Side navigation for settings or multi-step forms
- **Specs**:
  - Active indicator: 4px left border
  - Active background: `neutral-50` (#F8F5F2)
  - Border color: `primary-700` (#75201C)
  - Min width: `200px`
  - Padding: `16px 20px`

---

## Sizes

### Small
- **Height**: `40px`
- **Font Size**: `0.8rem` (13px) - `fontSize.sm`
- **Padding**: `spacing.2` (8px) horizontal, `spacing.3` (12px) vertical
- **Indicator**: 2px thickness
- **Use Case**: Compact dashboards, mobile views

### Medium (Default)
- **Height**: `48px`
- **Font Size**: `1rem` (16px) - `fontSize.base`
- **Padding**: `spacing.4` (16px) horizontal, `spacing.3` (12px) vertical
- **Indicator**: 3px thickness
- **Use Case**: Primary navigation, standard desktop

### Large
- **Height**: `56px`
- **Font Size**: `1.25rem` (20px) - `fontSize.md`
- **Padding**: `spacing.5` (24px) horizontal, `spacing.4` (16px) vertical
- **Indicator**: 4px thickness
- **Use Case**: Hero sections, important dashboard toggles

---

## States

### Default (Inactive)
- **Background**: `transparent`
- **Text Color**: `neutral-600` (#685A56)
- **Font Weight**: `medium` (500)
- **Border**: none
- **Cursor**: `pointer`

### Hover (Inactive)
- **Background**: `neutral-50` (#F8F5F2)
- **Text Color**: `neutral-800` (#2B2523)
- **Transition**: `background-color 150ms ease-out`

### Active
- **Background**: `transparent` (underline) or `primary-700` (filled)
- **Text Color**: `primary-700` (#75201C) (underline) or `white` (filled)
- **Font Weight**: `semibold` (600)
- **Indicator**: 3px solid `primary-700`
- **Border Bottom**: connects to panel (no gap)

### Focus
- **Outline**: `3px solid` `boxShadow.focus` (Coffee Maroon at 20% opacity)
- **Outline Offset**: `2px`
- **Note**: Visible keyboard focus for accessibility

### Disabled
- **Background**: `transparent`
- **Text Color**: `neutral-300` (#BEB3AE)
- **Cursor**: `not-allowed`
- **Opacity**: `0.5`
- **Indicator**: none
- **Note**: Include aria-disabled="true"

---

## Props/API

### TypeScript Interface

```typescript
interface TabsProps {
  /** Array of tab configurations */
  tabs: Tab[];

  /** Currently active tab ID */
  activeTab: string;

  /** Callback when tab changes */
  onChange: (tabId: string) => void;

  /** Visual variant */
  variant?: 'underline' | 'filled' | 'pill' | 'vertical';

  /** Size variant */
  size?: 'small' | 'medium' | 'large';

  /** Full width tabs (equal distribution) */
  fullWidth?: boolean;

  /** Alignment for non-fullWidth tabs */
  alignment?: 'start' | 'center' | 'end';

  /** Allow manual tab panel mounting (lazy loading) */
  lazy?: boolean;

  /** Persist mounted panels when switching tabs */
  keepMounted?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label for tab list */
  ariaLabel?: string;
}

interface Tab {
  /** Unique identifier */
  id: string;

  /** Tab label text */
  label: string;

  /** Optional icon component */
  icon?: React.ReactNode;

  /** Tab panel content */
  content: React.ReactNode;

  /** Disable this tab */
  disabled?: boolean;

  /** Badge count (e.g., "3 novas mensagens") */
  badge?: number | string;

  /** Accessible description */
  ariaLabel?: string;
}
```

### Example Usage

```tsx
<Tabs
  tabs={[
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: <ChartIcon />,
      content: <DashboardOverview />
    },
    {
      id: 'social',
      label: 'Redes Sociais',
      badge: 12,
      content: <SocialMetrics />
    },
    {
      id: 'email',
      label: 'Email Marketing',
      content: <EmailCampaigns />
    },
    {
      id: 'reports',
      label: 'Relatórios',
      disabled: true,
      content: <Reports />
    }
  ]}
  activeTab="overview"
  onChange={(tabId) => setActiveTab(tabId)}
  variant="underline"
  size="medium"
/>
```

---

## Accessibility

### Keyboard Navigation
- **Tab Key**: Move focus to tab list (first tab or active tab)
- **Arrow Right/Down**: Navigate to next tab
- **Arrow Left/Up**: Navigate to previous tab
- **Home**: Jump to first tab
- **End**: Jump to last tab
- **Enter/Space**: Activate focused tab
- **Note**: Focus wraps from last to first tab

### ARIA Attributes
```html
<div role="tablist" aria-label="Dashboard Sections">
  <button
    role="tab"
    id="tab-overview"
    aria-selected="true"
    aria-controls="panel-overview"
    tabindex="0"
  >
    Visão Geral
  </button>
  <button
    role="tab"
    id="tab-social"
    aria-selected="false"
    aria-controls="panel-social"
    tabindex="-1"
  >
    Redes Sociais
  </button>
</div>

<div
  role="tabpanel"
  id="panel-overview"
  aria-labelledby="tab-overview"
  tabindex="0"
>
  <!-- Panel content -->
</div>
```

### Accessibility Guidelines
- **Contrast**: Minimum 4.5:1 for tab text (WCAG AA)
- **Focus Indicator**: 3px visible outline with 2px offset (WCAG 2.4.7)
- **Touch Target**: Minimum 48×48px for mobile (WCAG 2.5.5)
- **Screen Reader**: Announce tab count ("1 of 4"), selected state
- **tabindex Management**: Active tab = 0, inactive tabs = -1 (roving tabindex pattern)
- **Panel Focus**: Tab panel should be focusable (tabindex="0") for keyboard users to access content

---

## Usage Guidelines

### Do's
- ✅ **Use 3-7 tabs maximum** - Beyond 7, consider dropdown or different navigation pattern
- ✅ **Keep tab labels short** - 1-2 words ideal, max 3 words
- ✅ **Use sentence case** - "Visão geral" not "VISÃO GERAL"
- ✅ **Order tabs by importance** - Most used/important first (left to right)
- ✅ **Maintain consistent tab count** - Don't show/hide tabs based on state (disable instead)
- ✅ **Use icons sparingly** - Only when they add clear meaning
- ✅ **Persist selected tab** - Save to URL or localStorage for better UX

### Don'ts
- ❌ **Don't use for sequential workflows** - Use stepper/wizard pattern instead
- ❌ **Don't nest tabs within tabs** - Creates confusion, consider page hierarchy
- ❌ **Don't use for navigation between pages** - Use navbar or sidebar instead
- ❌ **Don't make tabs too narrow** - Min 80px width to prevent cramping
- ❌ **Don't rely on color alone** - Use indicator + color for active state
- ❌ **Don't use for unrelated content** - Tabs should be logically grouped
- ❌ **Don't truncate tab labels with ellipsis** - Rephrase to be shorter

### Rationale
**Tabs vs. Accordion**: Use tabs when users need to compare content or switch frequently. Use accordion when users process content sequentially.

**Tab Order**: Left-to-right matches reading direction and user expectations. Most important = most visible.

**Mobile Consideration**: On screens < 640px, consider switching to accordion or dropdown for better touch interaction.

---

## Code Examples

### HTML Structure

```html
<div class="tabs-container">
  <!-- Tab List -->
  <div class="tab-list" role="tablist" aria-label="Marketing Channels">
    <button
      class="tab tab--active"
      role="tab"
      id="tab-social"
      aria-selected="true"
      aria-controls="panel-social"
      tabindex="0"
    >
      <svg class="tab__icon">...</svg>
      <span>Redes Sociais</span>
      <span class="tab__badge">12</span>
    </button>

    <button
      class="tab"
      role="tab"
      id="tab-email"
      aria-selected="false"
      aria-controls="panel-email"
      tabindex="-1"
    >
      Email Marketing
    </button>

    <button
      class="tab tab--disabled"
      role="tab"
      id="tab-reports"
      aria-selected="false"
      aria-controls="panel-reports"
      aria-disabled="true"
      tabindex="-1"
    >
      Relatórios
    </button>
  </div>

  <!-- Tab Panels -->
  <div
    class="tab-panel"
    role="tabpanel"
    id="panel-social"
    aria-labelledby="tab-social"
    tabindex="0"
  >
    <h2>Métricas de Redes Sociais</h2>
    <!-- Content -->
  </div>

  <div
    class="tab-panel tab-panel--hidden"
    role="tabpanel"
    id="panel-email"
    aria-labelledby="tab-email"
    tabindex="0"
    hidden
  >
    <!-- Content -->
  </div>
</div>
```

### CSS Implementation

```css
/* Tab Container */
.tabs-container {
  width: 100%;
}

/* Tab List */
.tab-list {
  display: flex;
  gap: var(--spacing-6, 32px);
  border-bottom: 1px solid var(--neutral-200);
  margin-bottom: var(--spacing-5, 24px);
}

/* Individual Tab - Underline Variant */
.tab {
  position: relative;
  padding: var(--spacing-3, 12px) var(--spacing-4, 16px);
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--neutral-600);
  font-size: var(--fontSize-base, 1rem);
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 150ms ease-out;
  white-space: nowrap;

  /* Align icon and text */
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2, 8px);
}

.tab:hover:not(.tab--disabled) {
  background-color: var(--neutral-50);
  color: var(--neutral-800);
}

.tab--active {
  color: var(--primary-700);
  font-weight: 600;
  border-bottom-color: var(--primary-700);
}

.tab:focus-visible {
  outline: 3px solid rgba(117, 32, 28, 0.20);
  outline-offset: 2px;
  border-radius: 4px 4px 0 0;
}

.tab--disabled {
  color: var(--neutral-300);
  cursor: not-allowed;
  opacity: 0.5;
}

/* Tab Icon */
.tab__icon {
  width: 20px;
  height: 20px;
  stroke-width: 2px;
}

/* Tab Badge */
.tab__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: var(--accent-600);
  color: white;
  font-size: var(--fontSize-xs, 0.64rem);
  font-weight: 600;
  border-radius: 10px;
}

/* Tab Panel */
.tab-panel {
  padding: var(--spacing-5, 24px);
  background: white;
  border-radius: var(--borderRadius-md, 8px);
  animation: fadeIn 200ms ease-out;
}

.tab-panel--hidden {
  display: none;
}

.tab-panel:focus {
  outline: 2px solid var(--primary-700);
  outline-offset: 4px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Filled Variant */
.tab--filled {
  border: none;
  border-radius: 8px 8px 0 0;
  background: var(--neutral-100);
  margin-bottom: -1px; /* Overlap with panel border */
}

.tab--filled.tab--active {
  background: var(--primary-700);
  color: white;
}

/* Pill Variant */
.tab--pill {
  border: none;
  border-radius: 24px;
  padding: var(--spacing-2, 8px) var(--spacing-4, 20px);
}

.tab--pill.tab--active {
  background: var(--primary-700);
  color: white;
}

/* Vertical Variant */
.tabs-container--vertical {
  display: flex;
  gap: var(--spacing-5, 24px);
}

.tabs-container--vertical .tab-list {
  flex-direction: column;
  border-bottom: none;
  border-right: 1px solid var(--neutral-200);
  min-width: 200px;
}

.tabs-container--vertical .tab {
  border-bottom: none;
  border-left: 4px solid transparent;
  padding: var(--spacing-4, 16px) var(--spacing-5, 20px);
  text-align: left;
  justify-content: flex-start;
}

.tabs-container--vertical .tab--active {
  background: var(--neutral-50);
  border-left-color: var(--primary-700);
}

/* Responsive */
@media (max-width: 640px) {
  .tab-list {
    gap: var(--spacing-3, 12px);
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .tab {
    font-size: var(--fontSize-sm, 0.8rem);
    padding: var(--spacing-2, 8px) var(--spacing-3, 12px);
  }
}
```

### JavaScript Behavior

```javascript
class Tabs {
  constructor(container) {
    this.container = container;
    this.tabList = container.querySelector('[role="tablist"]');
    this.tabs = Array.from(container.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));

    this.init();
  }

  init() {
    // Click handlers
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => this.handleClick(e));
      tab.addEventListener('keydown', (e) => this.handleKeydown(e));
    });
  }

  handleClick(event) {
    const tab = event.currentTarget;
    if (tab.getAttribute('aria-disabled') === 'true') return;

    this.activateTab(tab);
  }

  handleKeydown(event) {
    const { key } = event;
    const currentIndex = this.tabs.indexOf(event.currentTarget);
    let targetIndex;

    switch (key) {
      case 'ArrowRight':
      case 'ArrowDown':
        targetIndex = (currentIndex + 1) % this.tabs.length;
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        targetIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
        event.preventDefault();
        break;
      case 'Home':
        targetIndex = 0;
        event.preventDefault();
        break;
      case 'End':
        targetIndex = this.tabs.length - 1;
        event.preventDefault();
        break;
      default:
        return;
    }

    // Skip disabled tabs
    while (this.tabs[targetIndex].getAttribute('aria-disabled') === 'true') {
      targetIndex = key === 'ArrowRight' || key === 'ArrowDown'
        ? (targetIndex + 1) % this.tabs.length
        : (targetIndex - 1 + this.tabs.length) % this.tabs.length;
    }

    const targetTab = this.tabs[targetIndex];
    this.activateTab(targetTab);
    targetTab.focus();
  }

  activateTab(newTab) {
    const newPanelId = newTab.getAttribute('aria-controls');
    const newPanel = document.getElementById(newPanelId);

    // Deactivate all tabs
    this.tabs.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      tab.classList.remove('tab--active');
    });

    // Hide all panels
    this.panels.forEach(panel => {
      panel.setAttribute('hidden', '');
      panel.classList.add('tab-panel--hidden');
    });

    // Activate new tab
    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    newTab.classList.add('tab--active');

    // Show new panel
    newPanel.removeAttribute('hidden');
    newPanel.classList.remove('tab-panel--hidden');

    // Optional: Update URL
    if (window.history && window.history.pushState) {
      const url = new URL(window.location);
      url.searchParams.set('tab', newTab.id.replace('tab-', ''));
      window.history.pushState({}, '', url);
    }
  }
}

// Initialize all tab containers
document.querySelectorAll('.tabs-container').forEach(container => {
  new Tabs(container);
});
```

---

## Related Components

- **Accordion** - Alternative for vertical content switching, better for mobile
- **Breadcrumb** - Shows hierarchical position, complements tabs for sub-navigation
- **Stepper** - For sequential workflows (vs. tabs for non-sequential content)
- **Dropdown Menu** - Consider when 7+ options need navigation
- **Sidebar Navigation** - Use for primary app navigation (tabs for content switching)

---

## Design Tokens Reference

```json
{
  "tabs": {
    "default": {
      "height": { "sm": "40px", "md": "48px", "lg": "56px" },
      "padding": {
        "horizontal": { "sm": "8px", "md": "16px", "lg": "24px" },
        "vertical": { "sm": "12px", "md": "12px", "lg": "16px" }
      },
      "gap": "32px",
      "indicator": {
        "thickness": { "sm": "2px", "md": "3px", "lg": "4px" },
        "color": "{global.color.primary.700}"
      }
    },
    "colors": {
      "inactive": {
        "text": "{global.color.neutral.600}",
        "background": "transparent"
      },
      "active": {
        "text": "{global.color.primary.700}",
        "indicator": "{global.color.primary.700}"
      },
      "hover": {
        "background": "{global.color.neutral.50}"
      },
      "disabled": {
        "text": "{global.color.neutral.300}",
        "opacity": "0.5"
      }
    },
    "typography": {
      "inactive": {
        "fontSize": "{global.fontSize.base}",
        "fontWeight": "{global.fontWeight.medium}"
      },
      "active": {
        "fontSize": "{global.fontSize.base}",
        "fontWeight": "{global.fontWeight.semibold}"
      }
    },
    "motion": {
      "duration": "{global.duration.fast}",
      "easing": "{global.easing.easeOut}"
    }
  }
}
```
