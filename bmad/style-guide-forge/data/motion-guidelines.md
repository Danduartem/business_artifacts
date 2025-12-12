# Motion Guidelines

Reference guide for the Interaction Designer agent when creating animation and motion systems.

---

## Motion Principles

### 1. Purposeful

Every animation should serve a function:
- **Feedback**: Confirm user actions
- **Orientation**: Show relationships between elements
- **Focus**: Direct attention to important content
- **Delight**: Add personality (use sparingly)

### 2. Natural

Motion should feel organic:
- Objects have weight and momentum
- Elements accelerate and decelerate naturally
- Avoid perfectly linear movement
- Respect physics (gravity, friction)

### 3. Quick

Interface animations should be fast:
- Users shouldn't wait for animations
- 100-300ms for most interactions
- 300-500ms for larger transitions
- Never block user actions

### 4. Respectful

Honor user preferences:
- Support `prefers-reduced-motion`
- Avoid auto-playing animations
- No flashing or strobing effects
- Provide pause controls for long animations

---

## Timing Tokens

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 0ms | No animation |
| `duration-fast` | 100ms | Micro-interactions (hover, press) |
| `duration-normal` | 200ms | Standard transitions |
| `duration-slow` | 300ms | Medium complexity |
| `duration-slower` | 400ms | Complex transitions |
| `duration-slowest` | 500ms | Large/dramatic animations |

### Duration Guidelines by Type

| Animation Type | Recommended Duration |
|----------------|---------------------|
| Color change | 100-150ms |
| Opacity fade | 150-200ms |
| Scale/transform | 150-250ms |
| Position/movement | 200-300ms |
| Expand/collapse | 200-300ms |
| Page transition | 300-400ms |
| Modal entrance | 200-300ms |
| Toast notification | 200ms in, 150ms out |

### Size-Based Duration

Larger elements need more time:

| Element Size | Duration Modifier |
|--------------|-------------------|
| Small (< 100px) | ×0.75 |
| Medium (100-300px) | ×1.0 (base) |
| Large (300-600px) | ×1.25 |
| Full screen | ×1.5 |

---

## Easing Functions

### Standard Easings

| Token | CSS Value | Usage |
|-------|-----------|-------|
| `ease-linear` | `linear` | Opacity, color (rare) |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Moving elements |
| `ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Attention-grabbing |

### When to Use Each

| Easing | Use For |
|--------|---------|
| **ease-out** | Elements appearing, expanding, entering view |
| **ease-in** | Elements disappearing, collapsing, exiting |
| **ease-in-out** | Elements moving from one position to another |
| **linear** | Continuous animations, progress bars, opacity |
| **emphasized** | Important state changes, primary actions |

### Custom Easing Curves

```css
/* Material Design - Standard */
--ease-standard: cubic-bezier(0.2, 0, 0, 1);

/* Material Design - Emphasized */
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);

/* Smooth deceleration */
--ease-decelerate: cubic-bezier(0, 0, 0.2, 1);

/* Quick acceleration */
--ease-accelerate: cubic-bezier(0.4, 0, 1, 1);

/* Springy/bouncy (use sparingly) */
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

---

## Microinteractions

### Button States

```css
.button {
  transition:
    background-color 100ms ease-out,
    transform 100ms ease-out,
    box-shadow 100ms ease-out;
}

.button:hover {
  background-color: var(--color-primary-dark);
}

.button:active {
  transform: scale(0.98);
}
```

### Form Inputs

```css
.input {
  transition:
    border-color 150ms ease-out,
    box-shadow 150ms ease-out;
}

.input:focus {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}
```

### Toggle Switches

```css
.toggle-thumb {
  transition: transform 200ms ease-in-out;
}

.toggle-track {
  transition: background-color 200ms ease-in-out;
}

.toggle[aria-checked="true"] .toggle-thumb {
  transform: translateX(24px);
}
```

### Checkboxes

```css
.checkbox-icon {
  transform: scale(0);
  transition: transform 150ms ease-out;
}

.checkbox:checked .checkbox-icon {
  transform: scale(1);
}
```

---

## Component Animations

### Modal/Dialog

**Enter:**
```css
@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal {
  animation: modal-enter 200ms ease-out;
}
```

**Exit:**
```css
@keyframes modal-exit {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

**Backdrop:**
```css
.backdrop {
  transition: opacity 200ms ease-out;
}
```

### Accordion/Expand

```css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms ease-out;
}

.accordion-content[aria-expanded="true"] {
  grid-template-rows: 1fr;
}

.accordion-content-inner {
  overflow: hidden;
}
```

### Dropdown Menu

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

.dropdown-menu {
  animation: dropdown-enter 150ms ease-out;
  transform-origin: top;
}
```

### Toast Notifications

```css
/* Enter from right */
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Exit */
@keyframes toast-exit {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.toast {
  animation: toast-enter 200ms ease-out;
}

.toast[data-exiting] {
  animation: toast-exit 150ms ease-in;
}
```

### Tabs

```css
.tab-indicator {
  transition:
    transform 200ms ease-in-out,
    width 200ms ease-in-out;
}
```

---

## Page Transitions

### Fade

```css
.page-enter {
  opacity: 0;
}

.page-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-out;
}

.page-exit {
  opacity: 1;
}

.page-exit-active {
  opacity: 0;
  transition: opacity 200ms ease-in;
}
```

### Slide

```css
.page-enter {
  transform: translateX(20px);
  opacity: 0;
}

.page-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 300ms ease-out;
}
```

---

## Loading States

### Skeleton Pulse

```css
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton {
  background: var(--color-gray-200);
  animation: skeleton-pulse 2s ease-in-out infinite;
}
```

### Spinner

```css
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spinner 1s linear infinite;
}
```

### Progress Bar

```css
.progress-bar {
  transition: width 300ms ease-out;
}
```

---

## Reduced Motion

### Implementation

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Alternative Approaches

Instead of removing all motion:

```css
@media (prefers-reduced-motion: reduce) {
  /* Replace slide with fade */
  .modal {
    animation: fade-in 150ms ease-out;
  }

  /* Reduce duration significantly */
  .button {
    transition-duration: 50ms;
  }

  /* Remove decorative animations, keep functional */
  .decorative-animation {
    animation: none;
  }
}
```

---

## Performance Best Practices

### Animatable Properties (Performant)

**Prefer these** (GPU accelerated):
- `transform` (translate, rotate, scale)
- `opacity`

**Avoid** (trigger layout/paint):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `font-size`

### Use `will-change` Sparingly

```css
/* Only for elements about to animate */
.modal[data-entering] {
  will-change: transform, opacity;
}

/* Remove after animation */
.modal {
  will-change: auto;
}
```

### Composite Layers

```css
/* Force GPU layer for smooth animation */
.animated-element {
  transform: translateZ(0);
  /* or */
  backface-visibility: hidden;
}
```

---

## Anti-Patterns to Avoid

| Avoid | Why | Instead |
|-------|-----|---------|
| Animations > 500ms | Feels slow | Keep under 400ms |
| Linear easing everywhere | Unnatural | Use ease-out/ease-in-out |
| Animating width/height | Poor performance | Use transform: scale |
| Auto-playing long animations | Annoying, accessibility | User-triggered |
| Flashing (> 3Hz) | Seizure risk | Slow, subtle effects |
| Blocking animations | Frustrating | Allow interaction |
| Ignoring reduced-motion | Accessibility failure | Always implement |

---

## Motion Values Quick Reference

```css
:root {
  /* Durations */
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 400ms;

  /* Easings */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
}
```
