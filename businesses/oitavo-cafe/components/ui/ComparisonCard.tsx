import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// TYPES
// ============================================================================

export type ValueFormat = "number" | "percentage" | "currency" | "compact";

export interface ComparisonPeriod {
  value: number;
  label: string;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format value based on type
 */
function formatValue(value: number, format: ValueFormat, locale = "pt-BR"): string {
  switch (format) {
    case "percentage":
      return value.toLocaleString(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }) + "%";
    case "currency":
      return value.toLocaleString(locale, {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    case "compact":
      if (value >= 1_000_000) {
        return (value / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 1 }) + "M";
      }
      if (value >= 1_000) {
        return (value / 1_000).toLocaleString(locale, { maximumFractionDigits: 1 }) + "K";
      }
      return value.toLocaleString(locale);
    case "number":
    default:
      return value.toLocaleString(locale);
  }
}

/**
 * Calculate percentage change between two values
 */
function calculateChange(current: number, previous: number): {
  value: number;
  direction: "up" | "down" | "neutral";
  formatted: string;
} {
  if (previous === 0) {
    return {
      value: current > 0 ? 100 : 0,
      direction: current > 0 ? "up" : "neutral",
      formatted: current > 0 ? "+100%" : "0%",
    };
  }

  const change = ((current - previous) / Math.abs(previous)) * 100;
  const absChange = Math.abs(change);

  if (absChange < 0.1) {
    return { value: 0, direction: "neutral", formatted: "0%" };
  }

  return {
    value: change,
    direction: change > 0 ? "up" : "down",
    formatted: `${change > 0 ? "+" : ""}${change.toFixed(1)}%`,
  };
}

/**
 * Calculate absolute difference
 */
function calculateDifference(current: number, previous: number): {
  value: number;
  direction: "up" | "down" | "neutral";
} {
  const diff = current - previous;
  if (Math.abs(diff) < 0.01) {
    return { value: 0, direction: "neutral" };
  }
  return {
    value: diff,
    direction: diff > 0 ? "up" : "down",
  };
}

// ============================================================================
// ICONS
// ============================================================================

const TrendUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-4 h-4", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-4 h-4", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const TrendNeutralIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-4 h-4", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const InfoIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

// ============================================================================
// MINI SPARKLINE
// ============================================================================

interface MiniSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  width = 60,
  height = 24,
  color,
  className,
}) => {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  // Determine trend direction for color
  const isUp = data[data.length - 1] > data[0];
  const strokeColor = color || (isUp ? "#22C55E" : "#EF4444");

  return (
    <svg
      width={width}
      height={height}
      className={cn("shrink-0", className)}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ============================================================================
// COMPARISON CARD
// ============================================================================

const comparisonCardVariants = cva(
  "rounded-xl flex flex-col",
  {
    variants: {
      variant: {
        default: [
          "bg-white border border-gray-100",
          "dark:bg-[rgba(0,0,0,0.2)] dark:border-[rgba(248,232,216,0.05)]",
        ],
        elevated: [
          "bg-white shadow-lg",
          "dark:bg-[rgba(0,0,0,0.3)] dark:shadow-none dark:border dark:border-[rgba(248,232,216,0.05)]",
        ],
        highlight: [
          "bg-gradient-to-br from-accent-50 via-white to-neutral-50",
          "border border-accent-200",
          "dark:from-[rgba(161,82,60,0.2)] dark:via-[rgba(0,0,0,0.2)] dark:to-[rgba(0,0,0,0.15)]",
          "dark:border-[rgba(161,82,60,0.3)]",
        ],
        flat: "bg-transparent",
      },
      layout: {
        stacked: "",
        sideBySide: "",
        compact: "",
      },
      padding: {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      layout: "stacked",
      padding: "md",
    },
  }
);

export interface ComparisonCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comparisonCardVariants> {
  /** Card title */
  title: string;
  /** Current period value */
  currentValue: number;
  /** Previous period value */
  previousValue: number;
  /** Current period label (e.g., "Este mês") */
  currentLabel?: string;
  /** Previous period label (e.g., "Mês anterior") */
  previousLabel?: string;
  /** Value format type */
  format?: ValueFormat;
  /** Show info icon */
  showInfo?: boolean;
  /** Info click handler */
  onInfoClick?: () => void;
  /** When true, a decrease is considered positive (e.g., costs, churn) */
  invertTrend?: boolean;
  /** Optional sparkline data points */
  sparklineData?: number[];
  /** Show the change badge */
  showChange?: boolean;
  /** Show absolute difference instead of percentage */
  showAbsoluteDiff?: boolean;
  /** Custom icon for the card */
  icon?: React.ReactNode;
}

const ComparisonCard = React.forwardRef<HTMLDivElement, ComparisonCardProps>(
  (
    {
      className,
      variant,
      layout = "stacked",
      padding,
      title,
      currentValue,
      previousValue,
      currentLabel = "Este mês",
      previousLabel = "Mês anterior",
      format = "number",
      showInfo = false,
      onInfoClick,
      invertTrend = false,
      sparklineData,
      showChange = true,
      showAbsoluteDiff = false,
      icon,
      ...props
    },
    ref
  ) => {
    const change = calculateChange(currentValue, previousValue);
    const diff = calculateDifference(currentValue, previousValue);

    // Determine if this is a "good" change
    const isPositive = invertTrend
      ? change.direction === "down"
      : change.direction === "up";
    const isNegative = invertTrend
      ? change.direction === "up"
      : change.direction === "down";

    const trendColorClass = isPositive
      ? "text-emerald-600 dark:text-emerald-400"
      : isNegative
      ? "text-red-500 dark:text-red-400"
      : "text-gray-400 dark:text-[#7A5A4A]";

    const trendBgClass = isPositive
      ? "bg-emerald-50 dark:bg-emerald-500/10"
      : isNegative
      ? "bg-red-50 dark:bg-red-500/10"
      : "bg-gray-100 dark:bg-[rgba(248,232,216,0.05)]";

    const TrendIcon = change.direction === "up"
      ? TrendUpIcon
      : change.direction === "down"
      ? TrendDownIcon
      : TrendNeutralIcon;

    const isStacked = layout === "stacked";
    const isSideBySide = layout === "sideBySide";
    const isCompact = layout === "compact";

    return (
      <div
        ref={ref}
        className={cn(comparisonCardVariants({ variant, layout, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-gray-500 dark:text-[#7A5A4A]">{icon}</span>
            )}
            <h3 className="text-xs font-medium text-gray-500 dark:text-[#A89080] uppercase tracking-wide">
              {title}
            </h3>
          </div>
          {showInfo && (
            <button
              type="button"
              onClick={onInfoClick}
              className="text-gray-400 hover:text-gray-600 dark:text-[#7A5A4A] dark:hover:text-[#A89080] transition-colors -mt-0.5"
            >
              <InfoIcon />
            </button>
          )}
        </div>

        {/* Content based on layout */}
        {isStacked && (
          <>
            {/* Current value - Large */}
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl font-bold text-gray-900 dark:text-[#F8E8D8] tabular-nums leading-none">
                {formatValue(currentValue, format)}
              </span>
              {showChange && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                    trendColorClass,
                    trendBgClass
                  )}
                >
                  <TrendIcon className="w-3 h-3" />
                  {change.formatted}
                </span>
              )}
            </div>

            {/* Current label */}
            <p className="text-xs text-gray-500 dark:text-[#A89080] mb-3">
              {currentLabel}
            </p>

            {/* Previous value row */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[rgba(248,232,216,0.1)]">
              <div>
                <span className="text-lg font-semibold text-gray-600 dark:text-[#D4B8A8] tabular-nums">
                  {formatValue(previousValue, format)}
                </span>
                <p className="text-xs text-gray-400 dark:text-[#7A5A4A]">
                  {previousLabel}
                </p>
              </div>
              {sparklineData && sparklineData.length > 0 && (
                <MiniSparkline
                  data={sparklineData}
                  color={isPositive ? "#22C55E" : isNegative ? "#EF4444" : "#9CA3AF"}
                />
              )}
            </div>

            {/* Absolute difference (optional) */}
            {showAbsoluteDiff && diff.value !== 0 && (
              <p className={cn("text-xs mt-2", trendColorClass)}>
                {diff.direction === "up" ? "+" : ""}
                {formatValue(diff.value, format)} vs {previousLabel.toLowerCase()}
              </p>
            )}
          </>
        )}

        {isSideBySide && (
          <>
            {/* Side by side comparison */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              {/* Current */}
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
                  {formatValue(currentValue, format)}
                </span>
                <span className="text-xs text-gray-500 dark:text-[#A89080]">
                  {currentLabel}
                </span>
              </div>

              {/* Previous */}
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-400 dark:text-[#7A5A4A] tabular-nums">
                  {formatValue(previousValue, format)}
                </span>
                <span className="text-xs text-gray-400 dark:text-[#7A5A4A]">
                  {previousLabel}
                </span>
              </div>
            </div>

            {/* Change indicator centered */}
            {showChange && (
              <div className="flex justify-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold",
                    trendColorClass,
                    trendBgClass
                  )}
                >
                  <TrendIcon className="w-4 h-4" />
                  {change.formatted}
                </span>
              </div>
            )}
          </>
        )}

        {isCompact && (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
                {formatValue(currentValue, format)}
              </span>
              <span className="text-sm text-gray-400 dark:text-[#7A5A4A] ml-2">
                vs {formatValue(previousValue, format)}
              </span>
            </div>
            {showChange && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-semibold",
                  trendColorClass
                )}
              >
                <TrendIcon className="w-3.5 h-3.5" />
                {change.formatted}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

ComparisonCard.displayName = "ComparisonCard";

// ============================================================================
// COMPARISON CARD GROUP
// ============================================================================

interface ComparisonCardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const gapSizes = {
  sm: "gap-4",
  md: "gap-5",
  lg: "gap-6",
};

const ComparisonCardGroup = React.forwardRef<HTMLDivElement, ComparisonCardGroupProps>(
  ({ className, columns = 2, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
          gapSizes[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComparisonCardGroup.displayName = "ComparisonCardGroup";

// ============================================================================
// PRESETS
// ============================================================================

/** Common comparison metrics for Instagram/social media */
export const comparisonMetrics = {
  followers: {
    title: "Seguidores",
    format: "compact" as ValueFormat,
  },
  engagement: {
    title: "Taxa de engajamento",
    format: "percentage" as ValueFormat,
  },
  reach: {
    title: "Alcance",
    format: "compact" as ValueFormat,
  },
  impressions: {
    title: "Impressões",
    format: "compact" as ValueFormat,
  },
  posts: {
    title: "Publicações",
    format: "number" as ValueFormat,
  },
  likes: {
    title: "Curtidas",
    format: "compact" as ValueFormat,
  },
  comments: {
    title: "Comentários",
    format: "compact" as ValueFormat,
  },
  saves: {
    title: "Salvamentos",
    format: "compact" as ValueFormat,
  },
  shares: {
    title: "Compartilhamentos",
    format: "compact" as ValueFormat,
  },
  profileVisits: {
    title: "Visitas ao perfil",
    format: "compact" as ValueFormat,
  },
  revenue: {
    title: "Receita",
    format: "currency" as ValueFormat,
  },
  cost: {
    title: "Custo",
    format: "currency" as ValueFormat,
    invertTrend: true,
  },
};

/** Period label presets */
export const periodLabels = {
  month: { current: "Este mês", previous: "Mês anterior" },
  week: { current: "Esta semana", previous: "Semana anterior" },
  day: { current: "Hoje", previous: "Ontem" },
  quarter: { current: "Este trimestre", previous: "Trimestre anterior" },
  year: { current: "Este ano", previous: "Ano anterior" },
  custom: (current: string, previous: string) => ({ current, previous }),
};

/**
 * Create comparison card data from a metric preset
 */
export function createComparison(
  metric: keyof typeof comparisonMetrics,
  currentValue: number,
  previousValue: number,
  period: keyof typeof periodLabels = "month"
): {
  title: string;
  currentValue: number;
  previousValue: number;
  currentLabel: string;
  previousLabel: string;
  format: ValueFormat;
  invertTrend?: boolean;
} {
  const metricConfig = comparisonMetrics[metric];
  const periodConfig = periodLabels[period] as { current: string; previous: string };

  return {
    title: metricConfig.title,
    currentValue,
    previousValue,
    currentLabel: periodConfig.current,
    previousLabel: periodConfig.previous,
    format: metricConfig.format,
    invertTrend: "invertTrend" in metricConfig ? metricConfig.invertTrend : undefined,
  };
}

/**
 * Generate sample sparkline data with trend
 */
export function generateSparklineData(
  points: number,
  startValue: number,
  endValue: number,
  variance: number = 0.1
): number[] {
  const data: number[] = [];
  const step = (endValue - startValue) / (points - 1);

  for (let i = 0; i < points; i++) {
    const baseValue = startValue + step * i;
    const randomVariance = baseValue * variance * (Math.random() - 0.5);
    data.push(Math.max(0, baseValue + randomVariance));
  }

  // Ensure first and last values are exact
  data[0] = startValue;
  data[data.length - 1] = endValue;

  return data;
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ComparisonCard,
  ComparisonCardGroup,
  MiniSparkline,
  comparisonCardVariants,
  formatValue,
  calculateChange,
  calculateDifference,
};

export type {
  ComparisonCardProps,
  ComparisonCardGroupProps,
  MiniSparklineProps,
};
