# Oitavo Café UI Components

React component library built on the Oitavo Café design system.

## Installation

```bash
# Install peer dependencies
npm install react react-dom tailwindcss

# Install component dependencies
npm install class-variance-authority clsx tailwind-merge
```

## Setup

### 1. Configure Tailwind

Copy the Tailwind config from the design system:

```bash
cp ../design-system/tailwind.config.js ./tailwind.config.js
```

Or extend your existing config:

```js
// tailwind.config.js
import oitavoCafeConfig from '../design-system/tailwind.config.js';

export default {
  ...oitavoCafeConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### 2. Import Components

```tsx
import { Button, Card, Input, Alert, Badge, Modal } from '@/components';
```

---

## Components

### Button

```tsx
import { Button } from '@/components';

// Variants
<Button variant="primary">Quero agendar</Button>
<Button variant="secondary">Saiba mais</Button>
<Button variant="accent">Oferta especial</Button>
<Button variant="ghost">Ver detalhes</Button>
<Button variant="destructive">Excluir</Button>

// Sizes
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>

// Loading state
<Button isLoading>Processando...</Button>
<Button isLoading loadingText="Enviando...">Enviar</Button>

// With icons
<Button leftIcon={<IconArrow />}>Próximo</Button>
<Button rightIcon={<IconCheck />}>Confirmar</Button>

// Disabled
<Button disabled>Indisponível</Button>
```

### Input

```tsx
import { Input, Textarea } from '@/components';

// Basic
<Input placeholder="Digite aqui" />

// With label
<Input label="Email" type="email" placeholder="seu@email.com" />

// With hint
<Input label="Telefone" hint="Formato: (11) 99999-9999" />

// Error state
<Input
  label="Email"
  error="Email inválido. Verifique o formato."
  value="invalid"
/>

// With icons
<Input leftIcon={<IconSearch />} placeholder="Buscar..." />

// Textarea
<Textarea
  label="Mensagem"
  placeholder="Conte-nos sobre seu projeto..."
/>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components';

// Default card
<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição breve</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo principal do card.</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>

// Featured card (gradient background)
<Card variant="featured">
  <CardContent>Conteúdo em destaque</CardContent>
</Card>

// Interactive card (hover effects)
<Card variant="interactive" onClick={() => navigate('/details')}>
  <CardContent>Clique para ver mais</CardContent>
</Card>
```

### Alert

```tsx
import { Alert } from '@/components';

// Variants
<Alert variant="success" title="Feito. Sem enrolação.">
  Sua mensagem foi enviada com sucesso.
</Alert>

<Alert variant="warning" title="Atenção">
  Você tem alterações não salvas.
</Alert>

<Alert variant="error" title="Algo deu errado.">
  Não conseguimos processar sua solicitação.
</Alert>

<Alert variant="info" title="Novidade">
  Lançamos o Mocha CRM!
</Alert>

// Dismissible
<Alert
  variant="success"
  dismissible
  onDismiss={() => setShowAlert(false)}
>
  Operação concluída.
</Alert>

// Without icon
<Alert variant="info" showIcon={false}>
  Mensagem simples sem ícone.
</Alert>
```

### Badge

```tsx
import { Badge } from '@/components';

// Variants
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Ativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="error">Urgente</Badge>
<Badge variant="info">Beta</Badge>
<Badge variant="outline">Outline</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With icon
<Badge variant="success" icon={<CheckIcon />}>Ativo</Badge>
```

### Modal

```tsx
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from '@/components';

const [isOpen, setIsOpen] = useState(false);

// Basic modal
<Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader onClose={() => setIsOpen(false)}>
    <ModalTitle>Título do Modal</ModalTitle>
    <ModalDescription>Descrição breve</ModalDescription>
  </ModalHeader>
  <ModalBody>
    <p>Conteúdo do modal aqui.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancelar
    </Button>
    <Button onClick={() => setIsOpen(false)}>
      Confirmar
    </Button>
  </ModalFooter>
</Modal>

// Sizes
<Modal size="sm" ... />  // 384px
<Modal size="md" ... />  // 448px (default)
<Modal size="lg" ... />  // 512px
<Modal size="xl" ... />  // 576px
<Modal size="full" ... />  // Full width minus padding

// Options
<Modal
  closeOnBackdropClick={false}  // Disable backdrop click close
  closeOnEscape={false}         // Disable escape key close
  ...
/>
```

---

## Dashboard Components

### StatCard

```tsx
import { StatCard, StatCardGrid, LiveBadge } from '@/components';

// Basic usage
<StatCard label="Leads" value="127" change="+23%" changeType="positive" />

// Highlighted (for ROI, key metrics)
<StatCard
  label="ROI"
  value="3.2x"
  change="Retorno"
  variant="highlight"
/>

// Grid layout
<StatCardGrid columns={4}>
  <StatCard label="Leads" value="127" change="+23%" changeType="positive" />
  <StatCard label="Conversas" value="43" change="+12%" changeType="positive" />
  <StatCard label="Vendas" value="12" change="+8%" changeType="positive" />
  <StatCard label="ROI" value="3.2x" variant="highlight" />
</StatCardGrid>

// Live badge
<LiveBadge />
<LiveBadge status="syncing" />
```

### Table

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCheck,
  TableX,
} from '@/components';

// Basic table
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Fase</TableHead>
      <TableHead>O Que Acontece</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell emphasis>Mês 1-2</TableCell>
      <TableCell>Sistema construído. Primeiros leads.</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Comparison table
<Table striped>
  <TableBody>
    <TableRow>
      <TableCell>ROI Mensurado</TableCell>
      <TableCell><TableCheck /></TableCell>
      <TableCell><TableX /></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Avatar

```tsx
import { Avatar, AvatarGroup } from '@/components';

// From name (auto-generates initials)
<Avatar name="Marina Costa" />

// With initials
<Avatar initials="MC" size="lg" />

// Different shapes
<Avatar name="John" shape="square" />

// With status
<Avatar name="John" status="online" />

// Avatar group
<AvatarGroup max={3}>
  <Avatar name="Alice" />
  <Avatar name="Bob" />
  <Avatar name="Charlie" />
  <Avatar name="Diana" />
</AvatarGroup>
```

### Progress

```tsx
import { Progress, CircularProgress, FunnelProgress } from '@/components';

// Linear progress
<Progress value={75} showLabel />
<Progress value={50} color="gradient" size="lg" />

// Circular progress
<CircularProgress value={90} showLabel />

// Funnel visualization
<FunnelProgress
  steps={[
    { label: "Visitantes", value: 1247 },
    { label: "Leads", value: 127 },
    { label: "Vendas", value: 12 },
  ]}
/>
```

### Skeleton

```tsx
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonStatCard,
  SkeletonTable,
} from '@/components';

// Basic skeleton
<Skeleton variant="text" width="80%" />
<Skeleton variant="circular" width={40} height={40} />

// Preset skeletons
<SkeletonStatCard />
<SkeletonCard hasHeader hasFooter />
<SkeletonTable rows={5} columns={4} />
```

---

## Styling

All components use Tailwind CSS classes from the Oitavo Café design system:

- **Colors:** `primary`, `secondary`, `accent`, `neutral`, `gray`
- **Typography:** `font-display` (Hartwell), `font-body` (DIN Pro)
- **Shadows:** Warm coffee-toned shadows
- **Focus states:** Accent color ring

### Custom styling

Use the `className` prop to add custom styles:

```tsx
<Button className="w-full">Full Width Button</Button>
<Card className="max-w-md mx-auto">Centered Card</Card>
```

### Using `cn` utility

The `cn` utility merges Tailwind classes safely:

```tsx
import { cn } from '@/components';

<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)} />
```

---

## Brand Voice

Use first-person CTAs and direct language:

```tsx
// Do
<Button>Quero agendar</Button>
<Button>Começar agora</Button>

// Don't
<Button>Agendar</Button>
<Button>Submit</Button>
```

Alert messages should follow brand voice:

```tsx
// Do
<Alert variant="success" title="Feito. Sem enrolação." />
<Alert variant="error" title="Algo deu errado. Já estamos vendo." />

// Don't
<Alert variant="success" title="Success!" />
<Alert variant="error" title="Error occurred" />
```

---

## Files

```
components/
├── ui/
│   ├── Alert.tsx        # Feedback messages
│   ├── Avatar.tsx       # User avatars with initials/images
│   ├── Badge.tsx        # Labels and status indicators
│   ├── Button.tsx       # Action buttons
│   ├── Card.tsx         # Content containers
│   ├── Input.tsx        # Form inputs
│   ├── Modal.tsx        # Dialog overlays
│   ├── Progress.tsx     # Progress bars and funnels
│   ├── Skeleton.tsx     # Loading placeholders
│   ├── StatCard.tsx     # Dashboard metric cards
│   └── Table.tsx        # Data tables
├── utils/
│   └── cn.ts
├── index.ts
├── package.json
├── demo.html
└── README.md
```

---

## Dark Mode (Doppio)

All dashboard components support dark mode with the Doppio aesthetic:

```tsx
// Wrap your dashboard in dark mode
<div className="dark" style={{ background: '#1A0604' }}>
  <StatCardGrid>
    <StatCard label="Leads" value="127" change="+23%" changeType="positive" />
    <StatCard label="ROI" value="3.2x" variant="highlight" />
  </StatCardGrid>
</div>
```

Dark mode uses the Doppio color palette:
- Background: `#1A0604` (deep maroon)
- Card: `rgba(0,0,0,0.3)`
- Text: `#F8E8D8` (cream)
- Accent: `#A1523C` (terracotta)
- Glow effects on highlight variants

---

**Sem açúcar. Feito pra vender.**
