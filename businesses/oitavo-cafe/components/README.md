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

## Media Kit Components

### MetricColumn

Instagram analytics-style metric columns, perfect for media kits and social dashboards.

```tsx
import {
  MetricColumn,
  MetricColumnGroup,
  createInstagramMetrics,
} from '@/components';

// Basic usage
<MetricColumn
  icon="reels"
  count={65}
  label="Reels"
  metrics={[
    { icon: "likes", value: 1266, label: "Curtidas" },
    { icon: "comments", value: 225, label: "Comentários" },
    { icon: "saves", value: 62, label: "Salvos" },
    { icon: "views", value: 56064, label: "Visualizações" },
    { icon: "reach", value: 3.15, label: "Alcance", type: "percentage" },
    { icon: "engagement", value: 8.14, label: "Engajamento", type: "percentage" },
  ]}
  period="Dados dos últimos 90 dias"
/>

// Using presets for quick setup
const reelsData = createInstagramMetrics("reels", 65, {
  curtidas: 1266,
  comentarios: 225,
  salvos: 62,
  visualizacoes: 56064,
  alcance: 3.15,
  engajamento: 8.14,
});

// 3-column layout
<MetricColumnGroup columns={3}>
  <MetricColumn icon="reels" count={65} label="Reels" metrics={...} />
  <MetricColumn icon="posts" count={96} label="Posts" metrics={...} />
  <MetricColumn icon="stories" count={181} label="Stories" metrics={...} />
</MetricColumnGroup>
```

**Built-in Icons:**
- Content types: `reels`, `posts`, `stories`
- Metrics: `likes`, `comments`, `saves`, `views`, `impressions`, `reach`, `engagement`, `replies`, `tapsBack`, `tapsForward`, `followers`, `shares`, `plays`

**Props:**
- `icon` - Icon name or custom React node
- `count` - Header count number
- `label` - Header label (e.g., "Reels")
- `metrics` - Array of metric objects
- `period` - Footer time period text
- `variant` - `"default"` | `"elevated"` | `"flat"`
- `iconVariant` - `"default"` | `"accent"` | `"muted"`

### HorizontalBarChart

Horizontal bar charts for demographics, distributions, and comparisons.

```tsx
import { HorizontalBarChart, BarChartCard, BigStat, AudienceGrid } from '@/components';

// Basic bar chart
<HorizontalBarChart
  data={[
    { label: "13-17", value: 0.24 },
    { label: "18-24", value: 3.40 },
    { label: "25-34", value: 29.86 },
    { label: "35-44", value: 39.04 },
  ]}
  color="burgundy"
  autoScale
/>

// With card wrapper and title
<BarChartCard
  title="Idade da audiência"
  showInfo
  data={ageData}
  chartProps={{ color: "burgundy", autoScale: true }}
/>

// Hero stat card
<BigStat
  title="Total de seguidores"
  value={15506}
  label="Seguidores"
  icon="followers"
  showInfo
/>

// Grid layout for audience section
<AudienceGrid>
  <BarChartCard title="Idade" data={ageData} />
  <BarChartCard title="Cidades" data={cityData} />
  <BigStat title="Seguidores" value={15506} icon="followers" />
</AudienceGrid>
```

**Colors:**
- `burgundy` (default), `teal`, `primary`, `secondary`, `accent`, `success`, `warning`, `info`, `neutral`

**BigStat Icons:**
- `followers`, `views`, `engagement`, `reach`, `growth`

### EngagementHeatmap

Activity heatmap grid showing engagement patterns by day and hour.

```tsx
import {
  HeatmapCard,
  EngagementHeatmap,
  TabFilter,
  contentTypeTabs,
  generateSampleHeatmapData,
  findPeakTime,
} from '@/components';

// Generate sample data
const data = generateSampleHeatmapData(7, 8, {
  peakDay: 6, // Sunday
  peakHour: 7, // 21h
});

// Find peak time
const peak = findPeakTime(data);
// { day: "Dom", hour: "21h", value: 95 }

// Full card with tabs and insight
<HeatmapCard
  title="Horários de maior atividade"
  showInfo
  tabs={contentTypeTabs}
  selectedTab="posts"
  onTabChange={setTab}
  data={data}
  insight={`Seu público interage mais aos ${peak?.day} às ${peak?.hour}`}
  insightHighlight={`${peak?.day} às ${peak?.hour}`}
/>

// Standalone heatmap grid
<EngagementHeatmap
  data={data}
  color="teal"
  cellSize="md"
  showDayLabels
  showHourLabels
/>

// Tab filter only
<TabFilter
  options={contentTypeTabs}
  value="posts"
  onChange={setTab}
/>
```

**Props:**
- `data` - Array of `{ day: number, hour: number, value: number }`
- `color` - `"blue"` | `"teal"` (default) | `"accent"` | `"primary"`
- `cellSize` - `"sm"` | `"md"` (default) | `"lg"`
- `showDayLabels` / `showHourLabels` - Toggle axis labels
- `days` - Custom day labels (default: Portuguese weekdays)
- `hours` - Custom hour labels (default: 3-hour intervals)

**Presets:**
- `contentTypeTabs` - Posts/Reels/Stories tabs
- `locationTabs` - Cidade/Estado/País tabs
- `DAYS_PT` / `DAYS_EN` - Day labels
- `DEFAULT_TIME_SLOTS` - Hour labels (00h, 03h, 06h...)

### IndicatorTable

Simple metric rows for performance and engagement indicators.

```tsx
import {
  IndicatorTable,
  IndicatorTableGroup,
  createPerformanceIndicators,
  createEngagementIndicators,
} from '@/components';

// Using helper functions
const performanceData = createPerformanceIndicators({
  engajamento: 18,
  impressoes: 758,
  alcance: 210,
});

const engagementData = createEngagementIndicators({
  comentarios: 3,
  curtidas: 13,
  salvos: 1,
  compartilhamentos: 2,
});

// Side by side layout
<IndicatorTableGroup columns={2}>
  <IndicatorTable
    title="Indicadores de Performance"
    showInfo
    indicators={performanceData}
    tabs={contentTypeTabs}
    selectedTab="posts"
    onTabChange={setTab}
  />
  <IndicatorTable
    title="Indicadores de Engajamento"
    indicators={engagementData}
  />
</IndicatorTableGroup>

// With trends
<IndicatorTable
  title="Métricas Semanais"
  indicators={[
    { label: "Engajamento", value: 1234, trend: "up", trendValue: "+12%" },
    { label: "Alcance", value: 567, trend: "down", trendValue: "-3%" },
  ]}
/>
```

**Props:**
- `title` - Table title
- `showInfo` - Show info icon
- `indicators` - Array of `{ label, value, type?, trend?, trendValue? }`
- `tabs` / `selectedTab` / `onTabChange` - Optional tab filter
- `rowVariant` - `"default"` | `"minimal"` | `"striped"`
- `rowSize` - `"sm"` | `"md"` | `"lg"`

**Helpers:**
- `createPerformanceIndicators({ engajamento, impressoes, alcance })`
- `createEngagementIndicators({ comentarios, curtidas, salvos, compartilhamentos? })`

### EngagementRateCard

Large percentage displays for engagement metrics and rates.

```tsx
import {
  EngagementRateCard,
  RateCardGroup,
  createEngagementRates,
} from '@/components';

// Using presets
const rates = createEngagementRates({
  byImpressions: 1.83,
  byFollowers: 0.12,
  effectiveReach: 1.35,
});

// 3-column rate cards
<RateCardGroup columns={3}>
  {rates.map((rate) => (
    <EngagementRateCard
      key={rate.title}
      title={rate.title}
      value={rate.value}
      description={rate.description}
      showInfo
      tabs={contentTypeTabs}
      selectedTab="posts"
      onTabChange={setTab}
    />
  ))}
</RateCardGroup>

// Single rate card with trend
<EngagementRateCard
  title="Taxa de crescimento"
  value={2.41}
  previousValue={2.11}  // Shows +14.2% trend
  description="Variação no número de seguidores."
  rateSize="xl"
/>
```

**Props:**
- `title` - Card title (uppercase label)
- `value` - Percentage value (e.g., 1.83 for 1.83%)
- `description` - Explanatory text below the rate
- `tabs` / `selectedTab` / `onTabChange` - Optional tab filter
- `previousValue` - For trend calculation
- `rateSize` - `"md"` | `"lg"` | `"xl"`

**Presets:**
- `engagementRateTypes` - Common rate definitions with titles/descriptions
- `createEngagementRates({ byImpressions, byFollowers, effectiveReach })`

### BarChartCard with Tabs

BarChartCard now supports tabs for location breakdowns (Cidade/Estado/País).

```tsx
import { BarChartCard, locationTabs } from '@/components';

<BarChartCard
  title="Localização do público"
  tabs={locationTabs}
  selectedTab="pais"
  onTabChange={setLocationTab}
  data={[
    { label: "Brasil", value: 89.83 },
    { label: "Portugal", value: 2.92 },
    { label: "Estados Unidos", value: 2.00 },
  ]}
  chartProps={{ autoScale: true }}
/>
```

**New Props:**
- `tabs` - Array of `{ value, label }` tab options
- `selectedTab` - Currently selected tab value
- `onTabChange` - Tab change handler

**Preset:**
- `locationTabs` - Cidade/Estado/País tabs

### ProfileHeader

Media kit hero component with avatar, stats, bio, and verification badge.

```tsx
import {
  ProfileHeader,
  ProfileAvatar,
  ProfileStatsRow,
  ProfileTags,
  createProfileStats,
  platformTags,
} from '@/components';

// Centered layout (default)
<ProfileHeader
  name="Oitavo Café"
  handle="oitavocafe"
  bio="Café das soluções em vendas e marketing. Sem açúcar. Feito pra vender."
  avatarSrc="/avatar.jpg"
  verified
  platform="instagram"
  stats={createProfileStats({ followers: 15506, following: 892, posts: 342 })}
  tags={[platformTags.marketing, platformTags.sales, platformTags.agency]}
  link="https://oitavocafe.com.br"
/>

// Horizontal layout
<ProfileHeader
  layout="horizontal"
  name="Wake Creators"
  handle="wakecreators"
  verified
  ...
/>

// Hero variant (gradient background)
<ProfileHeader
  variant="hero"
  avatarSize="xl"
  ...
/>

// With custom stats
import { createCustomStats } from '@/components';

<ProfileHeader
  stats={createCustomStats([
    { value: 1500000, label: "impressões" },
    { value: 125000, label: "alcance" },
  ])}
  ...
/>
```

**Props:**
- `name` - Profile display name
- `handle` - Username without @
- `bio` - Biography text
- `avatarSrc` - Profile image URL
- `verified` - Show verification badge
- `stats` - `{ followers, following?, posts?, custom? }`
- `tags` - Category/niche tags array
- `link` / `linkText` - Website link
- `variant` - `"default"` | `"elevated"` | `"gradient"` | `"hero"` | `"flat"`
- `layout` - `"centered"` | `"horizontal"` | `"compact"`
- `avatarSize` - `"md"` | `"lg"` | `"xl"` | `"2xl"`
- `avatarRing` - `"none"` | `"default"` | `"gradient"` | `"accent"`
- `platform` - `"instagram"` | `"none"`

**Sub-components:**
- `ProfileAvatar` - Large avatar with verification badge
- `ProfileStatsRow` - Followers/Following/Posts row
- `ProfileTags` - Category tag chips
- `VerifiedBadge` - Instagram-style checkmark

**Helpers:**
- `createProfileStats({ followers, following?, posts? })`
- `createCustomStats([{ value, label }])`
- `formatNumber(num)` - Formats with K/M suffixes (15.5K, 1.2M)
- `platformTags` - Preset tags (marketing, business, sales, agency, etc.)

### ComparisonCard

Month-over-month metrics with trend indicators and mini sparklines.

```tsx
import {
  ComparisonCard,
  ComparisonCardGroup,
  MiniSparkline,
  createComparison,
  generateSparklineData,
} from '@/components';

// Stacked layout (default)
<ComparisonCard
  title="Seguidores"
  currentValue={15506}
  previousValue={13800}
  format="compact"
  showInfo
  sparklineData={generateSparklineData(7, 13800, 15506)}
/>

// Using presets
const data = createComparison("followers", 15506, 13800, "month");
<ComparisonCard {...data} />

// Side-by-side layout
<ComparisonCard
  layout="sideBySide"
  title="Alcance"
  currentValue={125000}
  previousValue={98000}
  format="compact"
/>

// Compact layout
<ComparisonCard
  layout="compact"
  title="Curtidas"
  currentValue={8234}
  previousValue={7456}
/>

// Highlight variant (for key metrics)
<ComparisonCard
  variant="highlight"
  title="Receita"
  currentValue={28500}
  previousValue={19630}
  format="currency"
/>

// Inverted trend (down is good, e.g., costs)
<ComparisonCard
  title="Custo por Lead"
  currentValue={12.50}
  previousValue={15.80}
  format="currency"
  invertTrend
/>
```

**Props:**
- `title` - Metric name
- `currentValue` / `previousValue` - Values to compare
- `currentLabel` / `previousLabel` - Period labels (default: "Este mês" / "Mês anterior")
- `format` - `"number"` | `"percentage"` | `"currency"` | `"compact"`
- `variant` - `"default"` | `"elevated"` | `"highlight"` | `"flat"`
- `layout` - `"stacked"` | `"sideBySide"` | `"compact"`
- `invertTrend` - When true, decreases show as positive (for costs, churn, etc.)
- `sparklineData` - Array of numbers for mini chart
- `showChange` - Show/hide percentage change badge
- `showAbsoluteDiff` - Show absolute difference text

**Sub-components:**
- `ComparisonCardGroup` - Grid layout for multiple cards
- `MiniSparkline` - Standalone sparkline chart

**Presets:**
- `comparisonMetrics` - Common metrics (followers, engagement, reach, revenue, etc.)
- `periodLabels` - Period presets (month, week, day, quarter, year)
- `createComparison(metric, current, previous, period)` - Quick setup
- `generateSparklineData(points, start, end, variance)` - Sample data generator

### DonutChart

SVG-based pie and donut charts with hover interactions, legends, and multiple color palettes.

```tsx
import {
  DonutChart,
  DonutChartCard,
  DonutChartLegend,
  DonutCenter,
  donutColorPalettes,
  createGenderChart,
  createContentTypeChart,
  genderPreset,
  agePreset,
} from '@/components';

// Basic donut chart with center content
<DonutChart
  segments={[
    { label: "Mulheres", value: 65.2 },
    { label: "Homens", value: 32.8 },
    { label: "Outros", value: 2 },
  ]}
  palette="gender"
  centerContent={<DonutCenter value="15,5K" label="seguidores" />}
/>

// Using presets for quick setup
const genderData = createGenderChart(65.2, 32.8, 2);
<DonutChart {...genderData} />

const contentData = createContentTypeChart(55, 30, 15);
<DonutChart {...contentData} />

// Pie chart (no hole in center)
<DonutChart
  segments={agePreset.segments({ "25-34": 42, "35-44": 28, "18-24": 18, "45-54": 8, "55+": 4 })}
  palette="brand"
  innerRadius={0}
  size="lg"
/>

// Complete card with title and legend
<DonutChartCard
  title="Gênero dos seguidores"
  segments={genderPreset.segments(65.2, 32.8, 2)}
  palette="gender"
  showInfo
  centerContent={<DonutCenter value="15,5K" label="seguidores" />}
  legendPosition="right"
  showPercentages
/>

// Custom color palette
<DonutChart
  segments={[...]}
  palette={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
/>
```

**Props:**
- `segments` - Array of `{ label, value, color? }`
- `palette` - `"brand"` | `"gender"` | `"teal"` | `"semantic"` | `"neutral"` | custom array
- `innerRadius` - 0 (pie) to 1 (thin ring), default 0.6 (donut)
- `size` - `"sm"` (128px) | `"md"` (192px) | `"lg"` (256px) | `"xl"` (320px)
- `centerContent` - React node for center (use `DonutCenter` helper)
- `animated` - Fade-in animation on mount
- `onSegmentHover` - Callback for hover interactions

**Sub-components:**
- `DonutChart` - Core SVG chart
- `DonutChartLegend` - Legend with color indicators
- `DonutChartCard` - Card wrapper with title, info icon, and legend
- `DonutCenter` - Pre-styled center content (value + label)

**Color Palettes:**
- `brand` - Warm coffee tones (#7A2E21, #A1523C, #D49D94, ...)
- `gender` - Terracotta/burgundy/rose for demographics
- `teal` - Teal gradient for alternative accent
- `semantic` - Success/info/warning/error colors
- `neutral` - Grayscale for muted charts

**Presets:**
- `genderPreset.segments(women, men, other?)` - Gender breakdown
- `contentTypePreset.segments(reels, posts, stories)` - Content types
- `agePreset.segments({ "18-24": 15, "25-34": 42, ... })` - Age ranges
- `createGenderChart(women, men, other?)` - Returns { segments, palette }
- `createContentTypeChart(reels, posts, stories)` - Returns { segments, palette }

### LineChart

SVG-based line and area charts for growth trends and time-series data.

```tsx
import {
  LineChart,
  LineChartCard,
  LineChartLegend,
  lineChartPalettes,
  createFollowerGrowthSeries,
  createComparisonSeries,
  generateGrowthData,
  calculateGrowth,
  MONTHS_PT,
} from '@/components';

// Basic line chart with area fill
const data = createFollowerGrowthSeries(
  [10000, 11200, 12500, 13800, 14200, 15506],
  MONTHS_PT.slice(0, 6)
);

<LineChart
  series={[data]}
  showArea
  showDots
  smooth
  valueFormat="compact"
/>

// Line chart card with summary and trend
<LineChartCard
  title="Crescimento de seguidores"
  series={[data]}
  summaryValue={15506}
  summaryLabel="este mês"
  trend={calculateGrowth(10000, 15506)}
  showArea
  showInfo
/>

// Comparison of two periods
const comparison = createComparisonSeries(
  [80000, 95000, 110000, 125000],  // current
  [60000, 75000, 85000, 98000],    // previous
  ["Sem 1", "Sem 2", "Sem 3", "Sem 4"]
);

<LineChartCard
  title="Comparação de períodos"
  series={comparison}
  showLegend
/>

// Multiple series
<LineChart
  series={[
    { id: "reach", name: "Alcance", data: [...] },
    { id: "engagement", name: "Engajamento", data: [...], color: "#2D8B8B" },
  ]}
  palette="brand"
  showDots
/>

// Generate sample data with variance
const growthData = generateGrowthData(7, 10000, 15500, 0.1);
```

**Props:**
- `series` - Array of `DataSeries` objects
- `palette` - `"brand"` | `"teal"` | `"semantic"` | `"warm"` | `"cool"` | custom array
- `showArea` - Show gradient area fill under line
- `areaOpacity` - Area fill opacity (0-1, default 0.15)
- `showDots` - Show data point circles
- `smooth` - Use curved lines (quadratic bezier)
- `showGrid` - Show horizontal grid lines
- `showYAxis` / `showXAxis` - Toggle axis labels
- `valueFormat` - `"number"` | `"compact"` | `"percentage"` | `"currency"`
- `size` - `"sm"` (160px) | `"md"` (224px) | `"lg"` (288px) | `"xl"` (384px)
- `animated` - Fade-in and line draw animation

**DataSeries structure:**
```tsx
interface DataSeries {
  id: string;
  name: string;
  data: Array<{ label: string; value: number }>;
  color?: string;
}
```

**Sub-components:**
- `LineChart` - Core SVG chart
- `LineChartLegend` - Legend for multiple series
- `LineChartCard` - Card wrapper with title, summary, and legend

**LineChartCard extras:**
- `summaryValue` - Large stat display
- `summaryLabel` - Label after value
- `trend` - `{ value: string, positive: boolean }` for trend badge
- `showLegend` - Show legend (auto for multi-series)
- `legendPosition` - `"top"` | `"bottom"`

**Presets:**
- `createFollowerGrowthSeries(values[], labels[])` - Follower growth
- `createEngagementSeries(values[], labels[])` - Engagement trend
- `createComparisonSeries(current[], previous[], labels[])` - Period comparison
- `generateGrowthData(points, start, end, variance)` - Random growth data
- `calculateGrowth(start, end)` - Returns `{ value: "+12,3%", positive: true }`
- `MONTHS_PT` / `MONTHS_EN` - Month labels
- `WEEKS_PT` - Week labels (Sem 1, Sem 2...)

### TopContentGrid

Grid and list layouts for showcasing best performing content with thumbnails, metrics, and rank badges.

```tsx
import {
  ContentCard,
  ContentGrid,
  TopContentCard,
  ContentList,
  ContentTypeBadge,
  RankBadge,
  createContentItem,
  createSampleContent,
  sortContentByMetric,
} from '@/components';

// Create content items
const content = [
  createContentItem("1", "/thumb1.jpg", "reel", [
    { type: "likes", value: 1234 },
    { type: "comments", value: 89 },
    { type: "views", value: 45600 },
  ], { rank: 1 }),
  createContentItem("2", "/thumb2.jpg", "post", [
    { type: "likes", value: 856 },
    { type: "shares", value: 42 },
  ], { rank: 2 }),
];

// Grid layout (Instagram-style)
<ContentGrid columns={3}>
  {content.map(item => (
    <ContentCard
      key={item.id}
      thumbnail={item.thumbnail}
      type={item.type}
      metrics={item.metrics}
      rank={item.rank}
      showRank
      showMetricsOnHover
    />
  ))}
</ContentGrid>

// Full card with title and info
<TopContentCard title="Top Conteúdos" showInfo period="Últimos 30 dias">
  <ContentGrid columns={3}>
    {content.map(item => <ContentCard key={item.id} {...item} showRank />)}
  </ContentGrid>
</TopContentCard>

// List layout (vertical)
<ContentList>
  {content.map(item => (
    <ContentCard
      key={item.id}
      {...item}
      layout="list"
      showRank
    />
  ))}
</ContentList>

// Sort by metric
const sortedByLikes = sortContentByMetric(content, "likes");
const sortedByViews = sortContentByMetric(content, "views", false); // descending

// Generate sample data
const sampleContent = createSampleContent(6);
```

**Props - ContentCard:**
- `thumbnail` - Image URL
- `type` - `"reel"` | `"post"` | `"story"` | `"carousel"` | `"video"`
- `metrics` - Array of `{ type, value }` objects
- `rank` - Position number (1-3 get special styling)
- `caption` - Optional caption text
- `date` - Optional date string
- `layout` - `"grid"` | `"list"`
- `showRank` - Display rank badge
- `showType` - Display content type badge
- `showMetricsOnHover` - Reveal metrics overlay on hover
- `variant` - `"default"` | `"elevated"` | `"flat"`

**Props - ContentGrid:**
- `columns` - `2` | `3` | `4` | `5` (default 3)
- `gap` - `"sm"` | `"md"` | `"lg"` (default "md")

**Props - TopContentCard:**
- `title` - Card title
- `showInfo` - Show info icon
- `period` - Time period text
- `variant` - `"default"` | `"elevated"` | `"flat"`

**Content Types (color-coded):**
- `reel` - Burgundy (#7A2E21)
- `post` - Teal (#2D8B8B)
- `story` - Terracotta (#A1523C)
- `carousel` - Dark burgundy (#4E130D)
- `video` - Purple (#6B4C6A)

**Metric Types:**
- `likes`, `comments`, `shares`, `saves`, `views`, `impressions`, `reach`, `engagement`, `plays`, `replies`

**Rank Badges:**
- Rank 1: Gold gradient with star icon
- Rank 2: Silver gradient
- Rank 3: Bronze gradient
- Rank 4+: Neutral badge

**Helpers:**
- `createContentItem(id, thumbnail, type, metrics, options?)` - Create content item
- `createSampleContent(count)` - Generate sample items
- `sortContentByMetric(items, metricType, ascending?)` - Sort by metric value
- `formatContentNumber(num)` - Format with K/M suffixes
- `getContentTypeLabel(type)` - Get Portuguese label

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
│   ├── ComparisonCard.tsx # Month-over-month metrics
│   ├── DonutChart.tsx   # Pie and donut chart visualizations
│   ├── EngagementHeatmap.tsx # Activity heatmap grid
│   ├── EngagementRateCard.tsx # Percentage rate cards
│   ├── Input.tsx        # Form inputs
│   ├── HorizontalBarChart.tsx # Demographics & bar charts
│   ├── IndicatorTable.tsx # Performance & engagement metrics
│   ├── LineChart.tsx    # Line and area charts for trends
│   ├── MetricColumn.tsx # Instagram analytics columns
│   ├── Modal.tsx        # Dialog overlays
│   ├── ProfileHeader.tsx # Media kit profile hero
│   ├── Progress.tsx     # Progress bars and funnels
│   ├── Skeleton.tsx     # Loading placeholders
│   ├── StatCard.tsx     # Dashboard metric cards
│   ├── Table.tsx        # Data tables
│   └── TopContentGrid.tsx # Best performing content display
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
