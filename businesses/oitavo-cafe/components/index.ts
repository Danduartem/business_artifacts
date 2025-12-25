// Oitavo Café UI Components
// Design System v2.0.0

// Utilities
export { cn } from "./utils/cn";

// Button
export { Button, buttonVariants } from "./ui/Button";
export type { ButtonProps } from "./ui/Button";

// Input
export { Input, Textarea } from "./ui/Input";
export type { InputProps, TextareaProps } from "./ui/Input";

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from "./ui/Card";
export type { CardProps } from "./ui/Card";

// Alert
export { Alert, alertVariants } from "./ui/Alert";
export type { AlertProps } from "./ui/Alert";

// Badge
export { Badge, badgeVariants } from "./ui/Badge";
export type { BadgeProps } from "./ui/Badge";

// Modal
export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "./ui/Modal";
export type { ModalProps } from "./ui/Modal";

// StatCard (Dashboard Metrics)
export { StatCard, StatCardGrid, LiveBadge, statCardVariants } from "./ui/StatCard";
export type { StatCardProps } from "./ui/StatCard";

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
  TableCheck,
  TableX,
  tableVariants,
} from "./ui/Table";
export type { TableProps } from "./ui/Table";

// Avatar
export { Avatar, AvatarGroup, avatarVariants } from "./ui/Avatar";
export type { AvatarProps } from "./ui/Avatar";

// Progress
export { Progress, CircularProgress, FunnelProgress, progressVariants } from "./ui/Progress";
export type { ProgressProps, CircularProgressProps, FunnelProgressProps, FunnelStep } from "./ui/Progress";

// Skeleton
export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  SkeletonStatCard,
  SkeletonAvatar,
} from "./ui/Skeleton";
export type { SkeletonProps } from "./ui/Skeleton";

// MetricColumn (Instagram Analytics Style)
export {
  MetricColumn,
  MetricColumnHeader,
  MetricColumnFooter,
  MetricColumnGroup,
  MetricIcon,
  MetricRow,
  metricColumnVariants,
  metricIcons,
  formatMetricValue,
  instagramMetricPresets,
  createInstagramMetrics,
} from "./ui/MetricColumn";
export type {
  MetricColumnProps,
  Metric,
} from "./ui/MetricColumn";

// HorizontalBarChart (Demographics & Distribution)
export {
  HorizontalBar,
  HorizontalBarChart,
  BarChartCard,
  BigStat,
  AudienceGrid,
  horizontalBarVariants,
  barChartCardVariants,
  bigStatVariants,
  bigStatIcons,
  audiencePresets,
  locationTabs,
} from "./ui/HorizontalBarChart";
export type {
  HorizontalBarChartProps,
  BarChartCardProps,
  BigStatProps,
  BarItem,
  BarChartTabOption,
} from "./ui/HorizontalBarChart";

// EngagementHeatmap (Activity Heatmap Grid)
export {
  TabFilter,
  HeatmapCell,
  EngagementHeatmap,
  HeatmapCard,
  tabFilterVariants,
  tabButtonVariants,
  heatmapCardVariants,
  DAYS_PT,
  DAYS_EN,
  DEFAULT_TIME_SLOTS,
  contentTypeTabs,
  locationTabs as heatmapLocationTabs,
  generateSampleHeatmapData,
  findPeakTime,
} from "./ui/EngagementHeatmap";
export type {
  TabFilterProps,
  TabOption,
  HeatmapCellProps,
  EngagementHeatmapProps,
  HeatmapCardProps,
  HeatmapData,
} from "./ui/EngagementHeatmap";

// IndicatorTable (Performance & Engagement Metrics)
export {
  IndicatorTable,
  IndicatorTableGroup,
  IndicatorRow,
  InlineTabFilter,
  indicatorRowVariants,
  indicatorTableCardVariants,
  indicatorIcons,
  performanceIndicators,
  engagementIndicators,
  contentTypeTabs as indicatorContentTypeTabs,
  createPerformanceIndicators,
  createEngagementIndicators,
  formatValue,
} from "./ui/IndicatorTable";
export type {
  IndicatorTableProps,
  Indicator,
  IndicatorTableGroupProps,
  IndicatorRowProps,
  InlineTabFilterProps,
} from "./ui/IndicatorTable";

// EngagementRateCard (Percentage Metrics)
export {
  EngagementRateCard,
  RateCardGroup,
  RateTabFilter,
  rateCardVariants,
  contentTypeTabs as rateContentTypeTabs,
  engagementRateTypes,
  createEngagementRates,
  formatPercentage as formatRatePercentage,
  calculateTrend,
} from "./ui/EngagementRateCard";
export type {
  EngagementRateCardProps,
  RateCardGroupProps,
  RateTabFilterProps,
} from "./ui/EngagementRateCard";

// ProfileHeader (Media Kit Hero)
export {
  ProfileHeader,
  ProfileAvatar,
  ProfileStatsRow,
  ProfileTags,
  VerifiedBadge,
  profileHeaderVariants,
  profileAvatarVariants,
  formatNumber,
  platformTags,
  createProfileStats,
  createCustomStats,
} from "./ui/ProfileHeader";
export type {
  ProfileHeaderProps,
  ProfileStats,
  ProfileTag,
} from "./ui/ProfileHeader";

// ComparisonCard (Month-over-Month Metrics)
export {
  ComparisonCard,
  ComparisonCardGroup,
  MiniSparkline,
  comparisonCardVariants,
  formatValue as formatComparisonValue,
  calculateChange,
  calculateDifference,
  comparisonMetrics,
  periodLabels,
  createComparison,
  generateSparklineData,
} from "./ui/ComparisonCard";
export type {
  ComparisonCardProps,
  ComparisonCardGroupProps,
  MiniSparklineProps,
  ValueFormat,
  ComparisonPeriod,
} from "./ui/ComparisonCard";

// DonutChart (Pie/Donut Visualizations)
export {
  DonutChart,
  DonutChartLegend,
  DonutChartCard,
  DonutCenter,
  donutChartVariants,
  donutChartCardVariants,
  donutColorPalettes,
  formatPercentage as formatDonutPercentage,
  toPercentage,
  genderPreset,
  contentTypePreset,
  agePreset,
  createGenderChart,
  createContentTypeChart,
} from "./ui/DonutChart";
export type {
  DonutSegment,
  DonutChartProps,
  DonutChartCardProps,
} from "./ui/DonutChart";

// LineChart (Growth Trends & Time Series)
export {
  LineChart,
  LineChartLegend,
  LineChartCard,
  lineChartVariants,
  lineChartCardVariants,
  lineChartColors,
  lineChartPalettes,
  formatValue as formatLineChartValue,
  generateYTicks,
  MONTHS_PT,
  MONTHS_EN,
  WEEKS_PT,
  DAYS_NUMERIC,
  createFollowerGrowthSeries,
  createEngagementSeries,
  createComparisonSeries,
  generateGrowthData,
  calculateGrowth,
} from "./ui/LineChart";
export type {
  DataPoint,
  DataSeries,
  ValueFormat as LineChartValueFormat,
  LineChartProps,
  LineChartCardProps,
} from "./ui/LineChart";

// TopContentGrid (Best Performing Content)
export {
  ContentCard,
  ContentGrid,
  TopContentCard,
  ContentList,
  ContentTypeBadge,
  RankBadge,
  contentCardVariants,
  contentGridVariants,
  topContentCardVariants,
  contentTypeBadgeVariants,
  rankBadgeVariants,
  contentTypeIcons,
  metricIcons as contentMetricIcons,
  formatContentNumber,
  getContentTypeLabel,
  createContentItem,
  createSampleContent,
  sortContentByMetric,
} from "./ui/TopContentGrid";
export type {
  ContentType,
  ContentMetric,
  ContentItem,
  ContentCardProps,
  ContentGridProps,
  TopContentCardProps,
  ContentListProps,
} from "./ui/TopContentGrid";

// GradeBadge (Letter Grade Indicators A-F)
export {
  GradeBadge,
  GradeBadgeWithLabel,
  GradeScalePreview,
  gradeBadgeVariants,
  gradeColors,
  scoreToGrade,
  getGradeInfo,
  getAllGrades,
} from "./ui/GradeBadge";
export type {
  GradeBadgeProps,
  GradeLevel,
} from "./ui/GradeBadge";

// ScoreRing (Circular Gauge for Growth Score)
export {
  ScoreRing,
  ScoreRingCard,
  scoreRingVariants,
  scoreRingCardVariants,
  scoreColors,
  getColorFromScore,
} from "./ui/ScoreRing";
export type {
  ScoreRingProps,
  ScoreRingCardProps,
  ScoreColorKey,
} from "./ui/ScoreRing";

// RadarChart (Spider/Radar Chart for Algorithm Health)
export {
  RadarChart,
  RadarChartCard,
  radarChartVariants,
  radarChartCardVariants,
  radarColorPresets,
  polarToCartesian,
  createPolygonPath,
  instagramAlgorithmPreset,
  contentPerformancePreset,
} from "./ui/RadarChart";
export type {
  RadarDataPoint,
  RadarColorPreset,
  RadarChartProps,
  RadarChartCardProps,
} from "./ui/RadarChart";

// VerticalBarChart (Day-of-Week Performance)
export {
  VerticalBarChart,
  VerticalBarChartCard,
  VerticalBar,
  verticalBarChartVariants,
  verticalBarChartCardVariants,
  verticalBarColors,
  dayOfWeekLabels,
  hourLabels,
  createDayOfWeekData,
  createHourlyData,
} from "./ui/VerticalBarChart";
export type {
  VerticalBarData,
  VerticalBarColorPreset,
  VerticalBarChartProps,
  VerticalBarChartCardProps,
} from "./ui/VerticalBarChart";

// AccountCard (Dashboard Profile Cards)
export {
  AccountCard,
  AccountCardGrid,
  AccountCardCompact,
  AccountAvatar,
  MetricItem,
  accountCardVariants,
  formatNumber as formatAccountNumber,
  formatPercentage as formatAccountPercentage,
} from "./ui/AccountCard";
export type {
  AccountCardProps,
  AccountCardGridProps,
} from "./ui/AccountCard";

// DashboardKPICard (Top Metric Cards)
export {
  DashboardKPICard,
  DashboardKPIGrid,
  dashboardKPICardVariants,
  kpiIcons,
  kpiPresets,
  formatValue as formatKPIValue,
} from "./ui/DashboardKPICard";
export type {
  DashboardKPICardProps,
  DashboardKPIGridProps,
  KPIIconName,
} from "./ui/DashboardKPICard";

// ViralDistribution (Content Performance Distribution)
export {
  ViralDistribution,
  ViralDistributionCard,
  ViralDistributionBar,
  TierBlock,
  HighPerformersList,
  viralDistributionVariants,
  viralDistributionCardVariants,
  tierColors,
  createViralTiers,
  createPerformanceTiers,
} from "./ui/ViralDistribution";
export type {
  ViralTier,
  ViralDistributionProps,
  ViralDistributionCardProps,
  HighPerformerItem,
} from "./ui/ViralDistribution";

// InsightCard (Tips & Recommendations)
export {
  InsightCard,
  InsightList,
  QuickTip,
  ComparisonInsights,
  insightCardVariants,
  insightStyles,
  insightIcons,
  createBestDayInsight,
  createEngagementTip,
  createGrowthInsight,
} from "./ui/InsightCard";
export type {
  InsightType,
  InsightIconName,
  InsightCardProps,
  ComparisonInsightData,
} from "./ui/InsightCard";
