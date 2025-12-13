# Skeleton Component

## Overview

Placeholder components that mimic the structure of content while it loads. Skeletons reduce perceived loading time by immediately showing the page layout, creating the impression of speed even when data is still being fetched. They're a key pattern for maintaining user confidence during asynchronous operations.

**When to use:**
- Initial page load with async data
- List or card grid population
- Profile or dashboard data loading
- Images or media loading
- Any content fetch >500ms

**When not to use:**
- Operations <500ms (content appears fast enough)
- Progress-based loading (use Progress instead)
- Full page transitions (use page loading pattern)
- Unknown content structure (use generic spinner)

## Anatomy

```
┌──────────────────────────────────────────────────┐
│  ╔════════╗  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓              │
│  ║        ║  ░░░░░░░░░░░░░░░░                    │
│  ║  IMG   ║                                      │
│  ║        ║  ▓▓▓▓▓▓▓▓▓▓▓▓                        │
│  ╚════════╝  ░░░░░░░░░░░░░░░░░░░░                │
└──────────────────────────────────────────────────┘

Components:
1. Container - Matches real content dimensions
2. Shapes - Rectangles, circles for different content types
3. Shimmer overlay - Animated gradient sweep
4. Color scheme - Neutral grays matching content

Types:
- Text lines (headings, paragraphs)
- Rectangles (images, cards, buttons)
- Circles (avatars, icons)
- Custom shapes (specific component structure)
```

## Variants

### Text Line
**Purpose:** Placeholder for text content.

```css
Background: var(--neutral-200) /* #D6CEC7 */
Height: Based on font size
  - Heading: 24px (--font-size-xl)
  - Body: 16px (--font-size-base)
  - Small: 13px (--font-size-sm)
Width: 100% or percentage (60%, 80% for variety)
Border radius: var(--border-radius-sm) /* 4px */
```

### Rectangle
**Purpose:** Images, cards, buttons, banners.

```css
Background: var(--neutral-200)
Aspect ratio: Match content (16:9 for images, etc.)
Border radius: Match component (--border-radius-md for cards)
```

### Circle
**Purpose:** Avatars, profile images, circular icons.

```css
Background: var(--neutral-200)
Width/Height: Equal (40px, 64px, 96px common sizes)
Border radius: var(--border-radius-full) /* 50% */
```

### Card Skeleton
**Purpose:** Complete card structure.

```css
Structure:
  - Image rectangle (16:9 aspect)
  - Title text (80% width)
  - Description lines (100%, 90%)
  - Metadata line (60% width)
Spacing: Match real card component
```

### List Item Skeleton
**Purpose:** List row placeholder.

```css
Structure:
  - Circle (avatar, 40px)
  - Text lines (title + subtitle)
  - Action area (rectangle, 80px)
Height: Match list item (64px typical)
```

### Table Row Skeleton
**Purpose:** Table data placeholder.

```css
Structure:
  - Multiple cells matching column widths
  - Alternating row backgrounds (optional)
Rows: 5-8 rows typically shown
```

## Sizes

### Text Sizes
```css
/* Heading */
Height: 24px
Border radius: 4px

/* Body */
Height: 16px
Border radius: 4px

/* Small */
Height: 13px
Border radius: 3px

/* Width variations for natural look */
100%, 95%, 85%, 75% (randomized)
```

### Component Sizes
```css
/* Avatar/Circle */
Small: 32px × 32px
Medium: 48px × 48px
Large: 64px × 64px

/* Button */
Width: 120px
Height: 48px

/* Card */
Width: 100% (responsive)
Height: Auto (aspect ratio based)
```

## Shimmer Animation

### Standard Shimmer
```css
@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton {
  position: relative;
  overflow: hidden;
  background: var(--neutral-200);
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent,
    var(--neutral-100),
    transparent
  );
  animation: skeleton-shimmer 1500ms var(--ease-standard) infinite;
}

Duration: 1500ms (1.5s per shimmer cycle)
Easing: var(--ease-standard)
```

### Pulse Animation (Alternative)
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
  animation: skeleton-pulse 1500ms var(--ease-gentle) infinite;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .skeleton::after {
    animation: none;
  }

  .skeleton {
    opacity: 0.8; /* Static, slightly dimmed */
  }
}
```

## States

### Loading
- Shimmer animation active
- Standard neutral colors
- Structure matches expected content

### Loaded (Transition)
```css
.skeleton--loaded {
  animation: skeleton-fade-out 200ms var(--ease-accelerate) forwards;
}

@keyframes skeleton-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Replace skeleton with real content after animation */
```

### Error State
```css
/* Option 1: Show error message in place of skeleton */
.skeleton-error {
  background: var(--feedback-error-light);
  border: 1px solid var(--feedback-error-default);
  color: var(--feedback-error-default);
}

/* Option 2: Remove skeleton, show error alert */
```

## Props/API

```typescript
interface SkeletonProps {
  /** Skeleton variant */
  variant?: 'text' | 'rectangle' | 'circle';

  /** Width (CSS value or percentage) */
  width?: string | number;

  /** Height (CSS value) */
  height?: string | number;

  /** Animation type */
  animation?: 'shimmer' | 'pulse' | 'none';

  /** Border radius (CSS value) */
  borderRadius?: string;

  /** Number of repetitions (for text lines) */
  count?: number;

  /** Additional CSS class */
  className?: string;
}

interface SkeletonGroupProps {
  /** Loading state */
  loading: boolean;

  /** Skeleton placeholder */
  skeleton: React.ReactNode;

  /** Actual content (shown when loaded) */
  children: React.ReactNode;
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Skeleton container -->
<div
  class="skeleton-container"
  aria-busy="true"
  aria-label="Loading content"
>
  <!-- Skeleton elements -->
</div>

<!-- When loaded -->
<div
  class="content-container"
  aria-busy="false"
>
  <!-- Real content -->
</div>
```

### Screen Reader Considerations
- Use `aria-busy="true"` on container while loading
- Provide descriptive `aria-label`: "Loading articles" not just "Loading"
- Announce completion with `aria-live="polite"`: "Content loaded"
- Don't announce individual skeleton elements (use `aria-hidden="true"`)
- Focus management: Maintain focus position when content loads

### Hidden Elements
```html
<div class="skeleton" aria-hidden="true">
  <!-- Skeleton shapes - hidden from screen readers -->
</div>

<div class="visually-hidden" aria-live="polite" aria-atomic="true">
  Loading article content...
</div>
```

## Usage Guidelines

### Do's

✓ **Match real content structure**
  - Same spacing, sizing, and layout
  - Users should recognize what's loading

✓ **Show skeletons for >500ms loads**
  - Immediate feedback reduces perceived time
  - Don't flash skeletons for fast loads

✓ **Use consistent animation**
  - Shimmer is modern standard
  - Pulse works for reduced motion

✓ **Vary text line widths**
  - 100%, 95%, 85% creates natural look
  - Last line often shorter (60-80%)

✓ **Load progressively when possible**
  - Replace skeletons as data arrives
  - Don't wait for all data before showing any

### Don'ts

✗ **Don't show skeleton for <500ms**
  - Creates unnecessary flash
  - Content loads fast enough without

✗ **Don't use for unknown structures**
  - Generic spinner is better
  - Skeleton implies known layout

✗ **Don't make skeletons interactive**
  - No hover states
  - No click handlers

✗ **Don't overdo the shimmer**
  - Subtle effect is better
  - Too bright = distracting

✗ **Don't mix skeleton with real content poorly**
  - Inconsistent loading creates confusion
  - Load sections completely when possible

## Code Examples

### Basic Skeleton Elements

```html
<!-- Text line -->
<div class="skeleton skeleton--text"></div>

<!-- Text with custom width -->
<div class="skeleton skeleton--text" style="width: 80%"></div>

<!-- Rectangle (image) -->
<div class="skeleton skeleton--rectangle" style="height: 200px"></div>

<!-- Circle (avatar) -->
<div class="skeleton skeleton--circle" style="width: 48px; height: 48px"></div>
```

```css
.skeleton {
  position: relative;
  overflow: hidden;
  background: var(--neutral-200);
  border-radius: var(--border-radius-sm);
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: skeleton-shimmer 1500ms cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton--text {
  height: 16px;
  width: 100%;
  border-radius: 4px;
}

.skeleton--rectangle {
  width: 100%;
  min-height: 100px;
}

.skeleton--circle {
  border-radius: 50%;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .skeleton::after {
    animation: none;
  }

  .skeleton {
    opacity: 0.8;
  }
}
```

### Card Skeleton

```html
<div class="card-skeleton" aria-busy="true" aria-label="Loading article">
  <div class="skeleton skeleton--rectangle" style="height: 200px; aspect-ratio: 16/9"></div>
  <div class="card-skeleton__content">
    <div class="skeleton skeleton--text" style="height: 24px; width: 80%"></div>
    <div class="skeleton skeleton--text" style="margin-top: 8px"></div>
    <div class="skeleton skeleton--text" style="width: 95%"></div>
    <div class="skeleton skeleton--text" style="width: 85%"></div>
    <div class="skeleton skeleton--text" style="width: 60%; margin-top: 12px; height: 13px"></div>
  </div>
</div>
```

```css
.card-skeleton {
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--elevation-raised);
}

.card-skeleton__content {
  padding: var(--spacing-5);
}

.card-skeleton .skeleton--text {
  margin-top: var(--spacing-2);
}

.card-skeleton .skeleton--text:first-child {
  margin-top: 0;
}
```

### List Item Skeleton

```html
<div class="list-skeleton">
  <div class="skeleton skeleton--circle" style="width: 40px; height: 40px"></div>
  <div class="list-skeleton__content">
    <div class="skeleton skeleton--text" style="width: 60%; height: 16px"></div>
    <div class="skeleton skeleton--text" style="width: 40%; height: 13px; margin-top: 6px"></div>
  </div>
  <div class="skeleton skeleton--rectangle" style="width: 80px; height: 32px"></div>
</div>
```

```css
.list-skeleton {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-subtle);
}

.list-skeleton__content {
  flex: 1;
  min-width: 0;
}
```

### React Component

```tsx
import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'rectangle' | 'circle';
  width?: string | number;
  height?: string | number;
  animation?: 'shimmer' | 'pulse' | 'none';
  borderRadius?: string;
  count?: number;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'shimmer',
  borderRadius,
  count = 1,
  className = '',
}: SkeletonProps) {
  const styles: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius,
  };

  const skeletonClass = `skeleton skeleton--${variant} skeleton--${animation} ${className}`;

  if (count > 1) {
    return (
      <div className="skeleton-group">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={skeletonClass} style={styles} aria-hidden="true" />
        ))}
      </div>
    );
  }

  return <div className={skeletonClass} style={styles} aria-hidden="true" />;
}

// Skeleton wrapper that shows skeleton while loading
export function SkeletonGroup({
  loading,
  skeleton,
  children,
}: {
  loading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(loading);

  React.useEffect(() => {
    if (!loading && isLoading) {
      // Delay to allow fade-out animation
      const timer = setTimeout(() => setIsLoading(false), 200);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(loading);
    }
  }, [loading, isLoading]);

  return (
    <div aria-busy={loading}>
      {isLoading ? skeleton : children}
    </div>
  );
}

// Pre-built skeleton patterns
export function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <Skeleton variant="rectangle" height={200} />
      <div style={{ padding: 'var(--spacing-5)' }}>
        <Skeleton width="80%" height={24} />
        <Skeleton count={3} />
        <Skeleton width="60%" height={13} />
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="list-skeleton">
      <Skeleton variant="circle" width={40} height={40} />
      <div style={{ flex: 1 }}>
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={13} />
      </div>
      <Skeleton variant="rectangle" width={80} height={32} />
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="table-skeleton">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="table-skeleton__row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="table-skeleton__cell">
              <Skeleton />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Usage Example

```tsx
function ArticleList() {
  const { data, isLoading } = useArticles();

  return (
    <SkeletonGroup
      loading={isLoading}
      skeleton={
        <div className="articles-skeleton">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <div className="articles-grid">
        {data.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </SkeletonGroup>
  );
}
```

### Advanced: Progressive Loading

```tsx
function ProgressiveArticle({ id }) {
  const { data, isLoading } = useArticle(id);

  return (
    <article>
      {/* Load hero image first */}
      <SkeletonGroup
        loading={!data?.image}
        skeleton={<Skeleton variant="rectangle" height={400} />}
      >
        <img src={data.image} alt={data.title} />
      </SkeletonGroup>

      {/* Then title and metadata */}
      <SkeletonGroup
        loading={!data?.title}
        skeleton={
          <>
            <Skeleton width="80%" height={32} />
            <Skeleton width="40%" height={16} />
          </>
        }
      >
        <h1>{data.title}</h1>
        <p className="metadata">{data.author} · {data.date}</p>
      </SkeletonGroup>

      {/* Finally content */}
      <SkeletonGroup
        loading={!data?.content}
        skeleton={<Skeleton count={8} />}
      >
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </SkeletonGroup>
    </article>
  );
}
```

---

**Version:** 1.0
**Last updated:** 2025-12-13
**Component Specifier:** Design System Team
