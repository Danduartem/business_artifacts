# Progress Component

## Overview

Visual indicators that show the completion status of ongoing operations or multi-step processes. Progress components help users understand system activity, estimate completion time, and maintain confidence during wait states.

**When to use:**
- File uploads/downloads
- Multi-step forms or processes
- Data loading with known duration
- Background task completion
- Installation or setup processes

**When not to use:**
- Unknown duration operations (use Skeleton or Spinner)
- Instant operations (<500ms)
- Simple loading states (use Spinner)
- Page-level loading (use Skeleton)

## Anatomy

### Linear Progress Bar
```
Label Text (optional)                              75%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░░░░░
Helper text or time remaining (optional)

Components:
1. Label - Describes what's loading
2. Track - Background bar (full width)
3. Fill - Colored bar showing progress
4. Percentage (optional) - Numeric indicator
5. Helper text (optional) - Status or time remaining
```

### Circular Progress
```
        ╭───────╮
       │   75%   │
        ╰───────╯
    Label (optional)

Components:
1. Circle track - Background ring
2. Circle fill - Colored ring (0-100%)
3. Center value (optional) - Percentage or metric
4. Label (optional) - Description below
```

## Variants

### Linear (Default)
**Purpose:** Show progress in horizontal bar format.

```css
Track background: var(--neutral-200) /* #D6CEC7 */
Fill background: var(--primary-600) /* #993A33 */
Height: 8px
Border radius: var(--border-radius-full) /* 9999px */
Width: 100%
```

### Linear Thin
**Purpose:** Compact progress for tight spaces.

```css
Height: 4px
Border radius: var(--border-radius-full)
No label or percentage shown
```

### Linear Thick
**Purpose:** Prominent progress for important operations.

```css
Height: 12px
Border radius: var(--border-radius-sm) /* 4px */
Label: Above bar
Percentage: Inside bar (if space allows) or right-aligned
```

### Circular Small
**Purpose:** Inline or compact spaces.

```css
Diameter: 40px
Stroke width: 4px
Center: Empty or small icon
```

### Circular Medium (Default)
**Purpose:** Standard circular progress.

```css
Diameter: 64px
Stroke width: 6px
Center: Percentage value
Font size: var(--font-size-lg) /* 25px */
```

### Circular Large
**Purpose:** Hero sections or full-screen loading.

```css
Diameter: 96px
Stroke width: 8px
Center: Percentage + label
Font size: var(--font-size-2xl) /* 39px */
```

### Indeterminate
**Purpose:** Unknown duration or continuous loading.

```css
Animation: Sliding gradient or pulsing bar
Duration: var(--duration-slow) /* 1400ms loop */
Easing: var(--ease-standard)
No percentage shown
```

## Sizes

### Linear Sizes
```css
/* Thin */
Height: 4px
Min width: 120px

/* Default */
Height: 8px
Min width: 200px

/* Thick */
Height: 12px
Min width: 240px
```

### Circular Sizes
```css
/* Small */
Diameter: 40px
Stroke: 4px
Font: var(--font-size-sm) /* 13px */

/* Medium */
Diameter: 64px
Stroke: 6px
Font: var(--font-size-lg) /* 25px */

/* Large */
Diameter: 96px
Stroke: 8px
Font: var(--font-size-2xl) /* 39px */
```

## States

### Default (0-100%)
- Shows current progress value
- Smooth transitions between values
- Color: Primary brand color

### Low Progress (0-33%)
```css
Fill color: var(--accent-600) /* #8D4C00 - Golden amber */
Message: "Iniciando..." or "Começando..."
```

### Medium Progress (34-66%)
```css
Fill color: var(--primary-600) /* #993A33 - Coffee maroon */
Message: "Processando..." or time remaining
```

### High Progress (67-99%)
```css
Fill color: var(--primary-700) /* #75201C - Darker maroon */
Message: "Quase lá..." or "Finalizando..."
```

### Complete (100%)
```css
Fill color: var(--feedback-success-default) /* #2D5016 - Green */
Message: "Concluído!" with checkmark icon
Duration: Show for 800ms before hiding/transitioning
Animation: Brief pulse or scale effect
```

### Error State
```css
Fill color: var(--feedback-error-default) /* #B91C1C - Red */
Track: Subtle red tint
Icon: Error icon replaces percentage
Message: Error description
```

### Paused State
```css
Fill color: var(--neutral-500) /* #8A7B76 - Gray */
Icon: Pause icon
Message: "Pausado" with resume option
Animation: Stopped
```

## Animation

### Progress Fill Transition
```css
.progress__fill {
  transition: width var(--duration-base) var(--ease-decelerate);
  /* or transform for circular */
  transition: stroke-dashoffset var(--duration-base) var(--ease-decelerate);
}
```

### Indeterminate Animation (Linear)
```css
@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.progress__fill--indeterminate {
  width: 25%;
  animation: progress-indeterminate 1400ms var(--ease-standard) infinite;
}
```

### Indeterminate Animation (Circular)
```css
@keyframes progress-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes progress-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -50;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -150;
  }
}

.progress__circle--indeterminate {
  animation: progress-rotate 1400ms linear infinite;
}

.progress__circle--indeterminate circle {
  animation: progress-dash 1400ms var(--ease-standard) infinite;
}
```

### Completion Pulse
```css
@keyframes progress-complete {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.progress--complete .progress__fill {
  animation: progress-complete 600ms var(--ease-emphasized);
}
```

## Props/API

```typescript
interface ProgressProps {
  /** Progress value (0-100) */
  value: number;

  /** Indeterminate state (unknown duration) */
  indeterminate?: boolean;

  /** Progress variant */
  variant?: 'linear' | 'circular';

  /** Size preset */
  size?: 'small' | 'medium' | 'large';

  /** Show percentage label */
  showPercentage?: boolean;

  /** Label text */
  label?: string;

  /** Helper text below progress */
  helperText?: string;

  /** Color scheme */
  color?: 'primary' | 'success' | 'warning' | 'error';

  /** Thickness (linear) */
  thickness?: 'thin' | 'default' | 'thick';

  /** Custom aria-label */
  ariaLabel?: string;

  /** Additional CSS class */
  className?: string;
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Determinate progress -->
<div
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Upload progress"
  aria-describedby="progress-helper"
>
  ...
</div>

<!-- Indeterminate progress -->
<div
  role="progressbar"
  aria-valuenow="0"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Loading content"
  aria-busy="true"
>
  ...
</div>
```

### Screen Reader Announcements
```typescript
// Announce milestones, not every percent
const shouldAnnounce = (value: number) => {
  return value % 25 === 0 || value === 100;
};

// Use aria-live for updates
<div aria-live="polite" aria-atomic="false">
  {shouldAnnounce(progress) && `${progress}% concluído`}
</div>
```

### Keyboard Navigation
- Progress components are typically not keyboard interactive
- Associated controls (pause/cancel buttons) must be keyboard accessible
- Focus should remain on triggering action, not progress indicator

## Usage Guidelines

### Do's

✓ **Show progress for operations >2 seconds**
  - Reduces perceived wait time
  - Maintains user confidence

✓ **Provide contextual labels**
  - "Enviando arquivo..." not just progress bar
  - Include file name or operation details

✓ **Show time remaining when possible**
  - "Cerca de 2 minutos restantes"
  - Updates every few seconds

✓ **Use indeterminate for unknown duration**
  - Initial loading before progress can be calculated
  - Server-side operations with unknown completion

✓ **Celebrate completion**
  - Brief success state (green + checkmark)
  - Don't hide immediately - show success for 800ms

### Don'ts

✗ **Don't fake progress**
  - Users notice when bar stops or jumps
  - Better to use indeterminate than fake values

✗ **Don't show progress for fast operations**
  - <500ms operations don't need progress
  - Creates unnecessary visual noise

✗ **Don't update too frequently**
  - Update every 100-200ms maximum
  - Smoother animation, better performance

✗ **Don't hide errors with progress**
  - Show error state in progress bar
  - Include retry option

✗ **Don't block interaction unnecessarily**
  - Allow navigation away if safe
  - Provide pause/cancel options

## Code Examples

### Linear Progress Bar

```html
<div class="progress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress">
  <div class="progress__header">
    <span class="progress__label">Enviando arquivo.pdf</span>
    <span class="progress__percentage">75%</span>
  </div>
  <div class="progress__track">
    <div class="progress__fill" style="width: 75%"></div>
  </div>
  <p class="progress__helper" id="progress-helper">
    Cerca de 30 segundos restantes
  </p>
</div>
```

```css
.progress {
  width: 100%;
}

.progress__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.progress__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.progress__percentage {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--primary-600);
  tabular-nums; /* Monospace numbers for stability */
}

.progress__track {
  width: 100%;
  height: 8px;
  background: var(--neutral-200);
  border-radius: var(--border-radius-full);
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  background: var(--primary-600);
  border-radius: var(--border-radius-full);
  transition: width var(--duration-base) var(--ease-decelerate);
}

.progress__helper {
  margin-top: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

/* States */
.progress--complete .progress__fill {
  background: var(--feedback-success-default);
  animation: progress-complete 600ms var(--ease-emphasized);
}

.progress--error .progress__fill {
  background: var(--feedback-error-default);
}

@keyframes progress-complete {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.2); }
}
```

### Circular Progress

```html
<div class="progress progress--circular" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="Processing">
  <svg class="progress__svg" viewBox="0 0 64 64">
    <circle
      class="progress__circle-track"
      cx="32"
      cy="32"
      r="28"
      fill="none"
      stroke-width="6"
    />
    <circle
      class="progress__circle-fill"
      cx="32"
      cy="32"
      r="28"
      fill="none"
      stroke-width="6"
      stroke-dasharray="176"
      stroke-dashoffset="44"
      transform="rotate(-90 32 32)"
    />
  </svg>
  <div class="progress__value">75%</div>
  <p class="progress__label">Processando</p>
</div>
```

```css
.progress--circular {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.progress__svg {
  width: 64px;
  height: 64px;
  position: relative;
}

.progress__circle-track {
  stroke: var(--neutral-200);
}

.progress__circle-fill {
  stroke: var(--primary-600);
  stroke-linecap: round;
  transition: stroke-dashoffset var(--duration-base) var(--ease-decelerate);
}

.progress__value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--primary-600);
  font-variant-numeric: tabular-nums;
}
```

### Indeterminate Progress

```html
<div class="progress progress--indeterminate" role="progressbar" aria-busy="true" aria-label="Loading">
  <div class="progress__track">
    <div class="progress__fill"></div>
  </div>
</div>
```

```css
.progress--indeterminate .progress__fill {
  width: 25%;
  animation: progress-indeterminate 1400ms var(--ease-standard) infinite;
}

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .progress--indeterminate .progress__fill {
    animation: progress-pulse 1400ms ease-in-out infinite;
  }

  @keyframes progress-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
}
```

### React Component

```tsx
import React, { useEffect, useState } from 'react';

interface ProgressProps {
  value: number;
  indeterminate?: boolean;
  variant?: 'linear' | 'circular';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  helperText?: string;
  showPercentage?: boolean;
  ariaLabel?: string;
}

export function Progress({
  value,
  indeterminate = false,
  variant = 'linear',
  size = 'medium',
  label,
  helperText,
  showPercentage = true,
  ariaLabel,
}: ProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Smooth value transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 50);
    return () => clearTimeout(timer);
  }, [value]);

  const clampedValue = Math.max(0, Math.min(100, displayValue));
  const isComplete = clampedValue >= 100;
  const color = getColor(clampedValue);

  if (variant === 'circular') {
    return <CircularProgress {...{ clampedValue, size, label, ariaLabel }} />;
  }

  return (
    <div
      className={`progress progress--${size} ${isComplete ? 'progress--complete' : ''}`}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clampedValue}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={ariaLabel || label}
      aria-busy={indeterminate}
    >
      {(label || showPercentage) && (
        <div className="progress__header">
          {label && <span className="progress__label">{label}</span>}
          {showPercentage && !indeterminate && (
            <span className="progress__percentage">{clampedValue}%</span>
          )}
        </div>
      )}

      <div className="progress__track">
        <div
          className={`progress__fill ${indeterminate ? 'progress__fill--indeterminate' : ''}`}
          style={!indeterminate ? { width: `${clampedValue}%`, background: color } : {}}
        />
      </div>

      {helperText && (
        <p className="progress__helper">{helperText}</p>
      )}
    </div>
  );
}

function CircularProgress({ clampedValue, size, label, ariaLabel }) {
  const sizes = {
    small: { diameter: 40, stroke: 4 },
    medium: { diameter: 64, stroke: 6 },
    large: { diameter: 96, stroke: 8 },
  };

  const { diameter, stroke } = sizes[size];
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className="progress progress--circular">
      <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke="var(--neutral-200)"
          strokeWidth={stroke}
        />
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={getColor(clampedValue)}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
          style={{
            transition: 'stroke-dashoffset 200ms cubic-bezier(0.0, 0.0, 0.2, 1)',
          }}
        />
      </svg>
      <div className="progress__value">{clampedValue}%</div>
      {label && <p className="progress__label">{label}</p>}
    </div>
  );
}

function getColor(value: number): string {
  if (value >= 100) return 'var(--feedback-success-default)';
  if (value >= 67) return 'var(--primary-700)';
  if (value >= 34) return 'var(--primary-600)';
  return 'var(--accent-600)';
}
```

---

**Version:** 1.0
**Last updated:** 2025-12-13
**Component Specifier:** Design System Team
