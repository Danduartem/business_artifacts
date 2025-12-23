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
import { Button, Card, Input, Alert } from '@/components';
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
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Alert.tsx
├── utils/
│   └── cn.ts
├── index.ts
├── package.json
└── README.md
```

---

**Sem açúcar. Feito pra vender.**
