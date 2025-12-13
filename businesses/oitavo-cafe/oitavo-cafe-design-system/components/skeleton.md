# Skeleton Component

**Component Type:** Feedback (Loading)
**Version:** 1.0.0
**Status:** Production Ready
**Last Updated:** 2025-12-13

---

## Overview

Skeleton screens (also called skeleton loaders or ghost elements) are placeholder UI elements that mimic the structure and layout of content while it loads. They provide visual feedback that content is coming and reduce perceived loading time by maintaining layout stability.

**Purpose:** Indicate loading state while preserving layout and reducing visual jumps when content appears.

**When to Use:**
- Initial page load with structured content
- Loading content with predictable layouts (cards, lists, tables)
- Lazy-loading components
- Content that takes >300ms to load
- Replacing spinners for better UX

**When NOT to Use:**
- Quick operations (<300ms) → No loading indicator needed
- Unpredictable content structure → Use spinner instead
- Full-page loads → Consider progress bar
- Form submissions → Use button loading state

---

## Philosophy: Content-First Loading

Skeletons reduce perceived wait time by:
1. **Maintaining layout stability** - No content shift when real data loads
2. **Setting expectations** - User sees what's coming
3. **Reducing uncertainty** - Clear that system is working
4. **Progressive disclosure** - Show structure before details

---

## Anatomy

### Basic Skeleton Elements

```
┌─────────────────────────────────────┐
│ ████████████░░░░░░░░░░░░░░░░░░░░   │  ← Title (shimmer animation)
│ ██████░░░░░░░░░░░░░░░░░░░░░░░░░░   │  ← Subtitle
│                                     │
│ ████████████████████████████░░░░░  │  ← Text line
│ ██████████████████████░░░░░░░░░░░  │  ← Text line (shorter)
│ ███████████████████████████████░░  │  ← Text line
└─────────────────────────────────────┘
```

### Card Skeleton

```
┌─────────────────────────────────────┐
│ ┌─────────┐                         │
│ │         │ ████████████░░░░░░░     │  ← Avatar + Name
│ │ Avatar  │ ████░░░░░░░░░░░░░░░     │  ← Metadata
│ │         │                         │
│ └─────────┘                         │
│                                     │
│ ████████████████████████░░░░░░░░   │  ← Content lines
│ ██████████████████░░░░░░░░░░░░░░   │
│ ████████████████████████████░░░░   │
│                                     │
│ [██████] [██████] [██████]          │  ← Action buttons
└─────────────────────────────────────┘
```

---

## Component Variants

### 1. Skeleton Text
Single or multiple text lines.

**Use Cases:**
- Paragraphs
- Headlines
- Labels
- Descriptions

**Variants:**
- Single line
- Multi-line (paragraph)
- Custom width (%, px, or auto)

### 2. Skeleton Avatar
Circular or square placeholder for profile images.

**Use Cases:**
- User profiles
- Team members
- Comment authors

**Variants:**
- Circle (default)
- Square
- Rounded square
- Sizes: XS (24px), SM (32px), MD (48px), LG (64px), XL (96px)

### 3. Skeleton Card
Full card layout placeholder.

**Use Cases:**
- Blog post cards
- Product cards
- Dashboard widgets
- List items

**Variants:**
- With image (top or left)
- Text-only
- With actions

### 4. Skeleton Table
Table row placeholders.

**Use Cases:**
- Data tables
- Lists with columns
- Analytics dashboards

### 5. Skeleton Chart
Chart/graph placeholders.

**Use Cases:**
- Dashboard charts
- Analytics visualizations
- Reports

---

## Specifications

### Visual Properties

#### Colors (Light Mode)
- Base color: `var(--color-neutral-200)` (#D6CEC7)
- Shimmer highlight: `var(--color-neutral-100)` (#EDE7E1)
- Background: `var(--color-bg-primary)` (#FFFFFF)

#### Colors (Dark Mode - Optional)
- Base color: `rgba(255, 255, 255, 0.1)`
- Shimmer highlight: `rgba(255, 255, 255, 0.2)`

### Sizing

| Element | Default Size | Variants |
|---------|-------------|----------|
| Text line height | 16px | 12px (sm), 20px (lg) |
| Text line width | 100% | 75%, 50%, 25%, custom |
| Avatar circle | 48px | 24px, 32px, 64px, 96px |
| Card padding | 24px | var(--space-5) |
| Border radius | 4px | var(--radius-sm) |
| Gap between lines | 12px | var(--space-3) |

### Animation

#### Shimmer Effect (Primary)

```css
@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 0%,
    var(--color-neutral-100) 50%,
    var(--color-neutral-200) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}
```

**Timing:**
- Duration: 1500ms (1.5s)
- Easing: ease-in-out
- Iteration: infinite
- Direction: normal (left to right)

#### Pulse Effect (Alternative)

```css
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.skeleton--pulse {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
```

#### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background: var(--color-neutral-200);
  }
}
```

---

## States

### Loading (Default)
- Shimmer animation active
- Placeholder visible
- Layout preserved

### Loaded (Transition Out)

**Crossfade Transition:**
```css
.skeleton-container {
  position: relative;
}

.skeleton-fade-out {
  animation: fade-out 200ms ease-out forwards;
}

.content-fade-in {
  animation: fade-in 300ms ease-in;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Timing:**
- Skeleton fade out: 200ms
- Content fade in: 300ms (50ms delay)
- Overlap for smooth transition

---

## Props / API

### SkeletonText

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `number` | `1` | Number of text lines |
| `width` | `string \| number` | `'100%'` | Width of lines (%, px, or array) |
| `height` | `string \| number` | `'16px'` | Height of each line |
| `spacing` | `number` | `12` | Gap between lines (px) |
| `variant` | `'shimmer' \| 'pulse'` | `'shimmer'` | Animation type |
| `rounded` | `boolean` | `false` | Rounded corners |

### SkeletonAvatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |
| `variant` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Shape |
| `animation` | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation type |

### SkeletonCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hasImage` | `boolean` | `false` | Include image placeholder |
| `imagePosition` | `'top' \| 'left'` | `'top'` | Image position |
| `imageHeight` | `string` | `'200px'` | Image placeholder height |
| `lines` | `number` | `3` | Number of text lines |
| `hasActions` | `boolean` | `false` | Include action buttons |
| `padding` | `string` | `'24px'` | Card padding |

### SkeletonTable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `5` | Number of rows |
| `columns` | `number` | `4` | Number of columns |
| `hasHeader` | `boolean` | `true` | Include header row |
| `columnWidths` | `string[]` | Auto | Custom column widths |

---

## Accessibility

### ARIA Attributes

```html
<div
  className="skeleton"
  role="status"
  aria-busy="true"
  aria-label="Carregando conteúdo"
>
  {/* Skeleton elements */}
</div>
```

**When Content Loads:**
```html
<div
  role="status"
  aria-busy="false"
  aria-live="polite"
>
  {/* Actual content */}
  <span className="sr-only">Conteúdo carregado</span>
</div>
```

### Screen Reader Experience

**Loading State:**
```
"Carregando conteúdo"
```

**Loaded State:**
```
"Conteúdo carregado"
[Screen reader reads actual content]
```

### Focus Management

- Skeletons are **not focusable**
- No keyboard interaction needed
- Focus moves to real content when loaded

### Reduced Motion

Users who prefer reduced motion see:
- Static skeleton (no animation)
- Faster fade transitions (100ms)
- Or instant content swap

```css
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none !important;
  }

  .skeleton-fade-out,
  .content-fade-in {
    animation-duration: 100ms !important;
  }
}
```

---

## Do's and Don'ts

### Do ✓

**Do match actual content structure:**
```
✓ Skeleton mirrors real layout (card → skeleton card)
✓ Same spacing, same dimensions
```

**Do use for predictable layouts:**
```
✓ Cards, lists, tables, profiles
✓ Content with consistent structure
```

**Do fade in real content smoothly:**
```
✓ Crossfade (skeleton fades out, content fades in)
✓ Brief overlap for smooth transition
```

**Do vary line widths for realism:**
```
✓ Lines: 100%, 90%, 75% (looks like text)
✗ All lines 100% (looks mechanical)
```

**Do respect reduced motion:**
```
✓ Static skeleton for prefers-reduced-motion
```

### Don't ✗

**Don't use for unpredictable content:**
```
✗ Unknown structure → Use spinner
✓ Known structure → Use skeleton
```

**Don't animate too fast or slow:**
```
✗ 500ms shimmer (too fast, seizure risk)
✗ 3000ms shimmer (feels broken)
✓ 1500ms shimmer (comfortable)
```

**Don't make skeletons interactive:**
```
✗ Clickable skeleton elements
✓ Non-interactive placeholders
```

**Don't show skeletons indefinitely:**
```
✗ Skeleton showing for >10 seconds
✓ Show error state or timeout message
```

**Don't use for instant loads:**
```
✗ Skeleton for <300ms load
✓ No indicator or instant content
```

---

## Brand Voice in Loading States

### Loading Messages (Optional)

When using skeleton with loading text:

```
"Calculando seu ROI..."
"Buscando seus leads..."
"Montando o dashboard..."
"Analisando os dados..."
"Preparando as métricas..."
```

### Empty States (After Failed Load)

```
"Ops, não conseguimos carregar os dados. Tenta de novo?"
"Hmm, nada por aqui ainda. Que tal adicionar o primeiro lead?"
"Ainda não tem dados suficientes. Vamos coletar mais?"
```

---

## Code Examples

### Basic Skeleton Text

```jsx
<SkeletonText lines={3} />
```

### Skeleton with Custom Widths

```jsx
<SkeletonText
  lines={4}
  width={['100%', '95%', '85%', '60%']}
/>
```

### Skeleton Avatar

```jsx
<SkeletonAvatar size="lg" variant="circle" />
```

### Skeleton Card

```jsx
<SkeletonCard
  hasImage
  imagePosition="top"
  imageHeight="200px"
  lines={3}
  hasActions
/>
```

### Skeleton Table

```jsx
<SkeletonTable
  rows={8}
  columns={5}
  hasHeader
  columnWidths={['20%', '30%', '20%', '15%', '15%']}
/>
```

### Dashboard Widget Skeleton

```jsx
<div className="dashboard-widget">
  <SkeletonText lines={1} width="40%" height="24px" />
  <div className="widget-chart">
    <SkeletonChart type="bar" height="200px" />
  </div>
  <div className="widget-stats">
    <SkeletonText lines={2} width="60%" />
  </div>
</div>
```

### Content with Loading State

```jsx
function LeadCard({ leadId }) {
  const { data, isLoading } = useQuery(['lead', leadId]);

  if (isLoading) {
    return (
      <SkeletonCard
        hasImage={false}
        lines={3}
        hasActions
      />
    );
  }

  return (
    <Card>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <Button>Ver Detalhes</Button>
    </Card>
  );
}
```

### List with Skeletons

```jsx
function LeadList() {
  const { data, isLoading } = useLeads();

  return (
    <div className="lead-list">
      {isLoading ? (
        // Show 5 skeleton cards
        Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))
      ) : (
        // Show actual leads
        data.map(lead => <LeadCard key={lead.id} lead={lead} />)
      )}
    </div>
  );
}
```

---

## Implementation Notes

### Component Structure

```jsx
<div
  className="skeleton-container"
  role="status"
  aria-busy={isLoading}
  aria-label="Carregando conteúdo"
>
  {isLoading ? (
    <div className="skeleton-wrapper">
      <div className="skeleton skeleton--text" style={{ width: '100%' }} />
      <div className="skeleton skeleton--text" style={{ width: '90%' }} />
      <div className="skeleton skeleton--text" style={{ width: '75%' }} />
    </div>
  ) : (
    <div className="content-wrapper">
      {/* Actual content */}
    </div>
  )}
</div>
```

### CSS Architecture

```css
/* Base skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 0%,
    var(--color-neutral-100) 50%,
    var(--color-neutral-200) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

@keyframes skeleton-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Text variant */
.skeleton--text {
  height: 16px;
  margin-bottom: var(--space-3);
}

.skeleton--text:last-child {
  margin-bottom: 0;
}

/* Avatar variant */
.skeleton--avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.skeleton--avatar.skeleton--square {
  border-radius: var(--radius-sm);
}

.skeleton--avatar.skeleton--rounded {
  border-radius: var(--radius-md);
}

/* Size variants */
.skeleton--xs { width: 24px; height: 24px; }
.skeleton--sm { width: 32px; height: 32px; }
.skeleton--md { width: 48px; height: 48px; }
.skeleton--lg { width: 64px; height: 64px; }
.skeleton--xl { width: 96px; height: 96px; }

/* Card variant */
.skeleton-card {
  padding: var(--space-5);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
}

.skeleton-card__image {
  width: 100%;
  height: 200px;
  margin-bottom: var(--space-4);
}

.skeleton-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skeleton-card__actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.skeleton-card__action {
  width: 80px;
  height: 36px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background: var(--color-neutral-200);
  }
}

/* Transition */
.skeleton-fade-exit {
  opacity: 1;
  transition: opacity 200ms ease-out;
}

.skeleton-fade-exit-active {
  opacity: 0;
}

.content-fade-enter {
  opacity: 0;
  transition: opacity 300ms ease-in 50ms;
}

.content-fade-enter-active {
  opacity: 1;
}
```

### React Implementation Example

```jsx
function Skeleton({
  variant = 'text',
  width = '100%',
  height = '16px',
  animation = 'shimmer',
  className = '',
  ...props
}) {
  const classes = [
    'skeleton',
    `skeleton--${variant}`,
    animation && `skeleton--${animation}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ width, height }}
      {...props}
    />
  );
}

function SkeletonText({ lines = 1, width = '100%', ...props }) {
  const widthArray = Array.isArray(width)
    ? width
    : Array(lines).fill(width);

  return (
    <div className="skeleton-text-group">
      {widthArray.map((w, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={w}
          {...props}
        />
      ))}
    </div>
  );
}

function SkeletonCard({
  hasImage = false,
  imageHeight = '200px',
  lines = 3,
  hasActions = false
}) {
  return (
    <div className="skeleton-card">
      {hasImage && (
        <Skeleton variant="rect" width="100%" height={imageHeight} />
      )}

      <div className="skeleton-card__content">
        <SkeletonText
          lines={lines}
          width={['100%', '90%', '75%']}
        />
      </div>

      {hasActions && (
        <div className="skeleton-card__actions">
          <Skeleton width="80px" height="36px" />
          <Skeleton width="80px" height="36px" />
        </div>
      )}
    </div>
  );
}
```

---

## Pattern Library

### Common Patterns

#### Dashboard Widget
```jsx
<div className="widget">
  <SkeletonText lines={1} width="40%" height="20px" />
  <Skeleton variant="rect" height="200px" />
  <SkeletonText lines={2} width="60%" />
</div>
```

#### Profile Card
```jsx
<div className="profile-card">
  <div style={{ display: 'flex', gap: '12px' }}>
    <SkeletonAvatar size="lg" />
    <div style={{ flex: 1 }}>
      <SkeletonText lines={1} width="60%" height="20px" />
      <SkeletonText lines={1} width="40%" height="14px" />
    </div>
  </div>
  <SkeletonText lines={3} />
</div>
```

#### Data Table Row
```jsx
<tr className="skeleton-row">
  <td><Skeleton width="80px" /></td>
  <td><Skeleton width="120px" /></td>
  <td><Skeleton width="90px" /></td>
  <td><Skeleton width="60px" /></td>
  <td><Skeleton width="40px" /></td>
</tr>
```

#### Blog Post Card
```jsx
<SkeletonCard
  hasImage
  imagePosition="top"
  imageHeight="240px"
  lines={4}
  hasActions={false}
/>
```

---

## Related Components

- **Spinner** - For indeterminate loading (simpler)
- **Progress** - For determinate progress with percentage
- **Empty State** - For when loading completes with no data
- **Error State** - For when loading fails

---

## Resources

- Design Tokens: `/tokens.css`
- Motion Guidelines: `/style-guide.md#motion`
- Accessibility: WCAG 2.1 Level AA
- Best Practices: [Skeleton Screen Design Pattern](https://www.nngroup.com/articles/skeleton-screens/)

---

**Component Owner:** Design System Team
**Last Review:** 2025-12-13
**Next Review:** 2026-03-13
