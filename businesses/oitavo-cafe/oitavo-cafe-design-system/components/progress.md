# Progress Component

**Component Type:** Feedback
**Version:** 1.0.0
**Status:** Production Ready
**Last Updated:** 2025-12-13

---

## Overview

Progress indicators provide visual feedback about the status of ongoing processes, helping users understand that the system is working and how long they might need to wait. They reduce uncertainty and perceived waiting time.

**Purpose:** Communicate system activity, loading states, and completion status for operations that take time.

**When to Use:**
- File uploads/downloads
- Multi-step processes (onboarding, forms)
- Data processing or calculations (ROI calculations)
- Page/component loading
- Long-running operations (>1 second)

**When NOT to Use:**
- Instant operations (<300ms) → No indicator needed
- Unknown duration without progress → Use **Skeleton** or spinner instead
- Static content loading → Use **Skeleton** instead
- Simple binary states → Use loading spinner instead

---

## Component Types

### 1. Progress Bar (Linear)
Horizontal bar showing completion percentage.

**Best for:**
- Determinate progress (known completion %)
- File uploads/downloads
- Multi-step forms
- Calculations with known steps

### 2. Progress Circle (Circular)
Circular indicator showing completion percentage.

**Best for:**
- Compact spaces
- Profile completion
- Goals/targets
- Mobile interfaces

### 3. Progress Stepper
Multi-step indicator with discrete stages.

**Best for:**
- Onboarding flows
- Checkout processes
- Form wizards
- Sequential workflows

---

## Anatomy

### Progress Bar
```
Label Text                                          75%
[████████████████████████░░░░░░░░]
Helper text (optional)
```

### Progress Circle
```
      ┌─────────┐
      │    75%  │
      │  ████   │  ← Circular arc
      │ █    █  │
      │  ████   │
      └─────────┘
      Label text
```

### Progress Stepper
```
[●]────[●]────[○]────[○]
Step 1  Step 2  Step 3  Step 4
(Done) (Active)(Todo) (Todo)
```

### Required Elements
1. **Progress Indicator** - Visual representation of progress
2. **Container** - Bounds for the indicator

### Optional Elements
3. **Label** - Describes what's progressing
4. **Percentage** - Numeric completion (e.g., "75%")
5. **Helper Text** - Additional context (e.g., "2 of 4 arquivos")
6. **Time Estimate** - Estimated remaining time

---

## Progress Bar Specifications

### Variants

#### 1. Determinate Progress Bar
**Shows known completion percentage**

**Visual Properties:**
- Track color: `var(--color-neutral-200)` (#D6CEC7)
- Fill color: `var(--color-accent-600)` (#8D4C00)
- Height: 8px (default), 4px (thin), 12px (thick)
- Border radius: 4px (pill-shaped)
- Width: 100% of container

**States:**
- 0-33%: Amber fill
- 34-66%: Amber fill
- 67-100%: Amber fill (consider success green at 100%)

#### 2. Indeterminate Progress Bar
**Shows activity without known completion**

**Visual Properties:**
- Track color: `var(--color-neutral-200)`
- Fill color: `var(--color-accent-600)`
- Animation: Moving gradient or shimmer
- Height: 4px (thinner for indeterminate)

**Animation:**
```css
@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-bar--indeterminate::after {
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}
```

#### 3. Success State (100%)
**Completion state**

**Visual Properties:**
- Fill color: `var(--color-feedback-success)` (#2D5016)
- Optional checkmark icon at end
- Brief highlight animation on completion

### Sizing

| Variant | Height | Border Radius |
|---------|--------|---------------|
| Thin | 4px | 2px |
| Default | 8px | 4px |
| Thick | 12px | 6px |

### Typography

| Element | Font Size | Weight | Color |
|---------|-----------|--------|-------|
| Label | 14px (sm) | 500 (medium) | var(--color-text-primary) |
| Percentage | 14px (sm) | 600 (semibold) | var(--color-text-primary) |
| Helper | 12px (xs) | 400 (regular) | var(--color-text-secondary) |

---

## Progress Circle Specifications

### Sizing

| Size | Diameter | Stroke Width | Font Size |
|------|----------|--------------|-----------|
| Small | 48px | 4px | 12px |
| Medium | 80px | 6px | 16px |
| Large | 120px | 8px | 20px |

### Visual Properties

- Track color: `var(--color-neutral-200)` (#D6CEC7)
- Fill color: `var(--color-accent-600)` (#8D4C00)
- Percentage text: Centered, bold
- Label: Below circle, centered

### Animation

**Clockwise fill:**
```css
@keyframes progress-circle {
  from {
    stroke-dashoffset: 283; /* circumference */
  }
  to {
    stroke-dashoffset: calc(283 * (1 - var(--progress)));
  }
}

.progress-circle__fill {
  animation: progress-circle 500ms var(--ease-decelerate);
  transform-origin: center;
  transform: rotate(-90deg);
}
```

---

## Progress Stepper Specifications

### Step States

#### 1. Completed Step
- Circle: Filled with `var(--color-feedback-success)` (#2D5016)
- Icon: White checkmark (✓)
- Label: `var(--color-text-primary)`, weight 500
- Connector: `var(--color-feedback-success)`

#### 2. Active Step
- Circle: Border `var(--color-accent-600)`, fill white
- Icon: Step number in `var(--color-accent-600)`
- Label: `var(--color-text-primary)`, weight 600
- Connector: `var(--color-neutral-300)` (to next step)

#### 3. Upcoming Step
- Circle: Border `var(--color-neutral-300)`, fill white
- Icon: Step number in `var(--color-neutral-500)`
- Label: `var(--color-text-secondary)`, weight 400
- Connector: `var(--color-neutral-300)`

#### 4. Error Step
- Circle: Border `var(--color-feedback-error)`, fill `#FFEBEE`
- Icon: Red X or exclamation
- Label: `var(--color-feedback-error)`, weight 500

### Sizing

| Element | Desktop | Mobile |
|---------|---------|--------|
| Circle diameter | 32px | 28px |
| Circle border | 2px | 2px |
| Connector height | 2px | 2px |
| Connector length | 80-120px | 40-60px |
| Gap (vertical) | 16px | 12px |

### Orientation

**Horizontal (default):**
- Desktop: Steps in row
- Labels below circles

**Vertical:**
- Mobile: Steps in column
- Labels to right of circles

---

## Animation Specifications

### Progress Bar Fill

**Smooth increment:**
```css
.progress-bar__fill {
  transition: width 400ms var(--ease-decelerate);
}
```

**On completion (0% → 100%):**
```css
@keyframes progress-complete {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.progress-bar--complete {
  animation: progress-complete 500ms var(--ease-decelerate);
}
```

### Indeterminate Animation

```css
@keyframes progress-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-bar--indeterminate::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: progress-shimmer 1.5s ease-in-out infinite;
}
```

### Stepper Transition

**Step completion:**
```css
@keyframes step-complete {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.step--completing {
  animation: step-complete 300ms var(--ease-standard);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .progress-bar__fill,
  .progress-circle__fill,
  .step {
    transition: none !important;
    animation: none !important;
  }

  .progress-bar--indeterminate::after {
    animation: none;
    opacity: 0.5;
  }
}
```

---

## Props / API

### Progress Bar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | Required (0-100) | Current progress value |
| `max` | `number` | `100` | Maximum value |
| `label` | `string` | - | Progress label text |
| `showPercentage` | `boolean` | `true` | Show percentage text |
| `helperText` | `string` | - | Additional context below bar |
| `size` | `'thin' \| 'default' \| 'thick'` | `'default'` | Bar height |
| `variant` | `'determinate' \| 'indeterminate'` | `'determinate'` | Progress type |
| `status` | `'default' \| 'success' \| 'error'` | `'default'` | Visual status |
| `showEstimate` | `boolean` | `false` | Show time estimate |
| `estimatedTime` | `string` | - | Time estimate text |

### Progress Circle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | Required (0-100) | Current progress value |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Circle size |
| `label` | `string` | - | Label below circle |
| `showPercentage` | `boolean` | `true` | Show percentage in center |
| `status` | `'default' \| 'success' \| 'error'` | `'default'` | Visual status |
| `strokeWidth` | `number` | Auto | Custom stroke width |

### Progress Stepper

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Step[]` | Required | Array of step objects |
| `currentStep` | `number` | `0` | Current active step (0-indexed) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `onStepClick` | `(index: number) => void` | - | Callback when step clicked |
| `allowStepClick` | `boolean` | `false` | Allow clicking to change steps |

**Step Object:**
```typescript
interface Step {
  label: string;
  description?: string;
  status?: 'completed' | 'active' | 'upcoming' | 'error';
  icon?: ReactNode;
}
```

---

## Accessibility

### ARIA Attributes

**Progress Bar:**
```html
<div
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Calculando ROI"
>
  {/* Visual progress bar */}
</div>
```

**Indeterminate Progress:**
```html
<div
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Processando dados"
  aria-busy="true"
>
```

**Progress Circle:**
```html
<svg
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Perfil 75% completo"
>
```

**Stepper:**
```html
<nav aria-label="Progresso do diagnóstico">
  <ol>
    <li aria-current="step">
      <span>Passo 1: Informações básicas</span>
      <span aria-label="Concluído">✓</span>
    </li>
    <li aria-current="true">
      <span>Passo 2: Análise de ROI</span>
      <span aria-label="Ativo">2</span>
    </li>
  </ol>
</nav>
```

### Live Regions

**Update announcements:**
```html
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Announce on significant progress milestones -->
  {progress === 25 && "Upload 25% completo"}
  {progress === 50 && "Upload 50% completo"}
  {progress === 75 && "Upload 75% completo"}
  {progress === 100 && "Upload completo!"}
</div>
```

### Keyboard Navigation (Stepper)

| Key | Action |
|-----|--------|
| `Tab` | Focus next step (if clickable) |
| `Shift+Tab` | Focus previous step |
| `Enter` / `Space` | Activate focused step |
| `←` / `→` | Navigate steps (horizontal) |
| `↑` / `↓` | Navigate steps (vertical) |

### Screen Reader Considerations

**Announce progress:**
- At 0%, 25%, 50%, 75%, 100%
- On significant changes (>10% jump)
- On completion

**Format:**
```
"Calculando ROI, 75 por cento completo"
"Upload de arquivo, 2 de 4 arquivos enviados"
"Passo 2 de 4 ativo: Análise de ROI"
```

---

## Do's and Don'ts

### Do ✓

**Do use brand voice in labels:**
```
✓ "Calculando seu ROI... (pode levar uns segundos)"
✓ "Analisando seus dados de marketing"
✓ "Montando seu dashboard personalizado"
```

**Do provide context:**
```
✓ Label: "Upload de arquivos"
   Helper: "2 de 4 arquivos enviados (6.8 MB / 12 MB)"
```

**Do show time estimates when possible:**
```
✓ "Processando... cerca de 30 segundos restantes"
```

**Do celebrate completion:**
```
✓ Animate to success green on 100%
✓ Brief celebratory animation
```

**Do update frequently (smooth):**
```
✓ Update every 100-500ms for smooth animation
```

### Don't ✗

**Don't leave progress stuck:**
```
✗ Progress bar frozen at 99% indefinitely
✓ Complete the operation or show error
```

**Don't use for instant operations:**
```
✗ Progress bar for <300ms operation
✓ No indicator or simple spinner
```

**Don't show false progress:**
```
✗ Fake progress that doesn't reflect reality
✓ Accurate progress or indeterminate indicator
```

**Don't overwhelm with updates:**
```
✗ Screen reader announces every 1% change
✓ Announce at 25%, 50%, 75%, 100%
```

**Don't use technical labels:**
```
✗ "Executing API request pipeline"
✓ "Calculando seu ROI"
```

---

## Brand Voice Examples

### Progress Labels

#### File Operations
```
"Enviando sua proposta..."
"Fazendo upload dos arquivos... 2 de 4"
"Baixando relatório de ROI"
```

#### Data Processing
```
"Calculando seu ROI... (pode levar uns segundos)"
"Analisando leads do último mês"
"Cruzando dados do funil de vendas"
```

#### Multi-Step Processes
```
Step 1: "Conta pra gente sobre seu negócio"
Step 2: "Vamos calcular seu ROI potencial"
Step 3: "Quase lá! Só mais alguns detalhes"
Step 4: "Pronto! Seu diagnóstico está pronto"
```

#### Account Setup
```
"Montando seu dashboard personalizado..."
"Conectando suas redes sociais..."
"Configurando métricas de ROI..."
```

---

## Code Examples

### Basic Progress Bar

```jsx
<ProgressBar
  value={75}
  label="Calculando seu ROI"
  showPercentage
/>
```

### Progress with Helper Text

```jsx
<ProgressBar
  value={40}
  label="Upload de arquivos"
  helperText="2 de 4 arquivos (6.8 MB / 12 MB)"
  showEstimate
  estimatedTime="Cerca de 15 segundos restantes"
/>
```

### Indeterminate Progress

```jsx
<ProgressBar
  variant="indeterminate"
  label="Processando dados de marketing..."
/>
```

### Progress Circle

```jsx
<ProgressCircle
  value={75}
  size="large"
  label="Perfil Completo"
/>
```

### Success State

```jsx
<ProgressBar
  value={100}
  label="Upload completo!"
  status="success"
/>
```

### Multi-Step Stepper

```jsx
<ProgressStepper
  steps={[
    { label: 'Informações Básicas', status: 'completed' },
    { label: 'Análise de ROI', status: 'active' },
    { label: 'Detalhes do Negócio', status: 'upcoming' },
    { label: 'Confirmação', status: 'upcoming' }
  ]}
  currentStep={1}
  orientation="horizontal"
/>
```

### With Time Estimate

```jsx
const [progress, setProgress] = useState(0);
const [estimate, setEstimate] = useState('');

useEffect(() => {
  // Calculate estimate based on progress rate
  const remaining = ((100 - progress) / ratePerSecond);
  setEstimate(`Cerca de ${Math.ceil(remaining)} segundos`);
}, [progress]);

<ProgressBar
  value={progress}
  label="Processando"
  showEstimate
  estimatedTime={estimate}
/>
```

---

## Implementation Notes

### Progress Bar Structure

```jsx
<div className="progress-bar-wrapper">
  {label && (
    <div className="progress-bar__header">
      <span className="progress-bar__label">{label}</span>
      {showPercentage && (
        <span className="progress-bar__percentage">{value}%</span>
      )}
    </div>
  )}

  <div
    className="progress-bar"
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label={label}
  >
    <div
      className="progress-bar__fill"
      style={{ width: `${value}%` }}
    />
  </div>

  {helperText && (
    <div className="progress-bar__helper">{helperText}</div>
  )}

  {showEstimate && estimatedTime && (
    <div className="progress-bar__estimate">{estimatedTime}</div>
  )}
</div>
```

### CSS Architecture

```css
/* Progress Bar */
.progress-bar {
  position: relative;
  width: 100%;
  height: 8px;
  background: var(--color-neutral-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--color-accent-600);
  border-radius: 4px;
  transition: width 400ms var(--ease-decelerate);
}

.progress-bar--success .progress-bar__fill {
  background: var(--color-feedback-success);
}

/* Header */
.progress-bar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.progress-bar__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.progress-bar__percentage {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

/* Helper text */
.progress-bar__helper {
  margin-top: var(--space-1);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Indeterminate */
.progress-bar--indeterminate .progress-bar__fill {
  width: 40%;
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}

/* Progress Circle */
.progress-circle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.progress-circle__svg {
  transform: rotate(-90deg);
}

.progress-circle__track {
  fill: none;
  stroke: var(--color-neutral-200);
}

.progress-circle__fill {
  fill: none;
  stroke: var(--color-accent-600);
  stroke-linecap: round;
  transition: stroke-dashoffset 500ms var(--ease-decelerate);
}

.progress-circle__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}
```

### Calculating Circle Progress

```javascript
function calculateCircleProgress(value, radius) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return { circumference, offset };
}

// Usage
const radius = 36;
const { circumference, offset } = calculateCircleProgress(75, radius);

<circle
  r={radius}
  strokeDasharray={circumference}
  strokeDashoffset={offset}
/>
```

---

## Related Components

- **Skeleton** - For content loading placeholders
- **Spinner** - For indeterminate loading (simpler)
- **Toast** - For completion notifications
- **Alert** - For status updates

---

## Resources

- Design Tokens: `/tokens.css`
- Motion Guidelines: `/style-guide.md#motion`
- Brand Voice: `/voice-forge/voice-documentation.md`
- Accessibility: WCAG 2.1 Level AA

---

**Component Owner:** Design System Team
**Last Review:** 2025-12-13
**Next Review:** 2026-03-13
