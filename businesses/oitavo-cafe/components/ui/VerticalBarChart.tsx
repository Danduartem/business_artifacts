import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// VERTICAL BAR CHART COMPONENT
// Beautiful vertical bar charts for time-series and categorical data
// Uses warm Oitavo Café brand colors with gradient fills
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export interface VerticalBarData {
  /** Bar label (shown below bar) */
  label: string;
  /** Bar value */
  value: number;
  /** Optional highlight this bar */
  highlighted?: boolean;
  /** Optional custom color for this bar */
  color?: string;
}

// ============================================================================
// COLOR PRESETS
// ============================================================================

export const verticalBarColors = {
  /** Brand gradient - burgundy to terracotta */
  brand: {
    default: "bg-gradient-to-t from-primary-700 to-accent-500",
    defaultDark: "dark:from-[#4E130D] dark:to-[#A1523C]",
    highlight: "bg-gradient-to-t from-accent-500 to-accent-400",
    highlightDark: "dark:from-[#A1523C] dark:to-[#D4A574]",
    muted: "bg-gradient-to-t from-gray-300 to-gray-200",
    mutedDark: "dark:from-[rgba(248,232,216,0.2)] dark:to-[rgba(248,232,216,0.1)]",
  },
  /** Teal for performance/health data */
  teal: {
    default: "bg-gradient-to-t from-teal-600 to-teal-400",
    defaultDark: "dark:from-[#0D9488] dark:to-[#14B8A6]",
    highlight: "bg-gradient-to-t from-teal-500 to-teal-300",
    highlightDark: "dark:from-[#14B8A6] dark:to-[#5EEAD4]",
    muted: "bg-gradient-to-t from-gray-300 to-gray-200",
    mutedDark: "dark:from-[rgba(248,232,216,0.2)] dark:to-[rgba(248,232,216,0.1)]",
  },
  /** Coffee brown solid */
  coffee: {
    default: "bg-gradient-to-t from-[#4E130D] to-[#7A1307]",
    defaultDark: "dark:from-[#7A1307] dark:to-[#A1523C]",
    highlight: "bg-gradient-to-t from-[#7A1307] to-[#A1523C]",
    highlightDark: "dark:from-[#A1523C] dark:to-[#D4A574]",
    muted: "bg-gradient-to-t from-gray-300 to-gray-200",
    mutedDark: "dark:from-[rgba(248,232,216,0.2)] dark:to-[rgba(248,232,216,0.1)]",
  },
};

export type VerticalBarColorPreset = keyof typeof verticalBarColors;

// ============================================================================
// VARIANTS
// ============================================================================

const verticalBarChartVariants = cva("relative w-full", {
  variants: {
    height: {
      sm: "h-32",
      md: "h-48",
      lg: "h-64",
      xl: "h-80",
    },
  },
  defaultVariants: {
    height: "md",
  },
});

// ============================================================================
// SINGLE BAR COMPONENT
// ============================================================================

interface VerticalBarProps {
  value: number;
  maxValue: number;
  label: string;
  highlighted?: boolean;
  colorPreset: VerticalBarColorPreset;
  showValue?: boolean;
  showLabel?: boolean;
  animated?: boolean;
  barWidth?: "narrow" | "medium" | "wide";
  roundedTop?: boolean;
}

const barWidthClasses = {
  narrow: "w-8",
  medium: "w-12",
  wide: "w-16",
};

const VerticalBar: React.FC<VerticalBarProps> = ({
  value,
  maxValue,
  label,
  highlighted = false,
  colorPreset,
  showValue = true,
  showLabel = true,
  animated = true,
  barWidth = "medium",
  roundedTop = true,
}) => {
  const [displayHeight, setDisplayHeight] = React.useState(animated ? 0 : (value / maxValue) * 100);

  const colors = verticalBarColors[colorPreset];
  const percentage = Math.min((value / maxValue) * 100, 100);

  // Animation
  React.useEffect(() => {
    if (!animated) {
      setDisplayHeight(percentage);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayHeight(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [animated, percentage]);

  // Determine bar color classes
  const barColorClass = highlighted
    ? cn(colors.highlight, colors.highlightDark)
    : cn(colors.default, colors.defaultDark);

  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      {/* Value label (above bar) */}
      {showValue && (
        <span
          className={cn(
            "text-xs font-semibold tabular-nums transition-colors duration-200",
            highlighted
              ? "text-accent-600 dark:text-[#D4A574]"
              : "text-gray-600 dark:text-[#D4B8A8]"
          )}
        >
          {value.toLocaleString("pt-BR")}
        </span>
      )}

      {/* Bar container */}
      <div className="flex-1 w-full flex items-end justify-center">
        <div
          className={cn(
            barWidthClasses[barWidth],
            "relative overflow-hidden transition-all duration-700 ease-out",
            roundedTop && "rounded-t-lg",
            barColorClass
          )}
          style={{ height: `${displayHeight}%` }}
        >
          {/* Subtle shine effect */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}
          />
        </div>
      </div>

      {/* Label (below bar) */}
      {showLabel && (
        <span
          className={cn(
            "text-xs transition-colors duration-200",
            highlighted
              ? "font-semibold text-gray-900 dark:text-[#F8E8D8]"
              : "text-gray-500 dark:text-[#A89080]"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface VerticalBarChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof verticalBarChartVariants> {
  /** Bar data */
  data: VerticalBarData[];
  /** Auto-calculate max from data */
  autoScale?: boolean;
  /** Manual max value */
  maxValue?: number;
  /** Color preset */
  color?: VerticalBarColorPreset;
  /** Show values above bars */
  showValues?: boolean;
  /** Show labels below bars */
  showLabels?: boolean;
  /** Show grid lines */
  showGrid?: boolean;
  /** Number of grid lines */
  gridLines?: number;
  /** Animate bars on mount */
  animated?: boolean;
  /** Bar width */
  barWidth?: "narrow" | "medium" | "wide";
  /** Rounded bar tops */
  roundedBars?: boolean;
  /** Gap between bars */
  gap?: "tight" | "normal" | "loose";
}

const gapClasses = {
  tight: "gap-1",
  normal: "gap-2",
  loose: "gap-4",
};

const VerticalBarChart = React.forwardRef<HTMLDivElement, VerticalBarChartProps>(
  (
    {
      className,
      height,
      data,
      autoScale = true,
      maxValue,
      color = "brand",
      showValues = true,
      showLabels = true,
      showGrid = true,
      gridLines = 4,
      animated = true,
      barWidth = "medium",
      roundedBars = true,
      gap = "normal",
      ...props
    },
    ref
  ) => {
    // Calculate max value
    const calculatedMax = autoScale
      ? Math.ceil(Math.max(...data.map((d) => d.value)) * 1.1) // 10% headroom
      : maxValue || 100;

    // Generate grid values
    const gridValues = Array.from({ length: gridLines }, (_, i) =>
      Math.round((calculatedMax / gridLines) * (gridLines - i))
    );

    return (
      <div
        ref={ref}
        className={cn(verticalBarChartVariants({ height }), className)}
        {...props}
      >
        <div className="flex h-full">
          {/* Y-axis labels */}
          {showGrid && (
            <div className="flex flex-col justify-between pr-2 text-right">
              {gridValues.map((value, index) => (
                <span
                  key={index}
                  className="text-[10px] text-gray-400 dark:text-[#7A5A4A] tabular-nums"
                >
                  {value.toLocaleString("pt-BR")}
                </span>
              ))}
              <span className="text-[10px] text-gray-400 dark:text-[#7A5A4A]">0</span>
            </div>
          )}

          {/* Chart area */}
          <div className="flex-1 relative">
            {/* Grid lines */}
            {showGrid && (
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {gridValues.map((_, index) => (
                  <div
                    key={index}
                    className="border-t border-gray-100 dark:border-[rgba(248,232,216,0.08)]"
                  />
                ))}
                <div className="border-t border-gray-200 dark:border-[rgba(248,232,216,0.15)]" />
              </div>
            )}

            {/* Bars */}
            <div
              className={cn(
                "relative flex items-end justify-around h-full",
                gapClasses[gap]
              )}
            >
              {data.map((bar, index) => (
                <VerticalBar
                  key={`${bar.label}-${index}`}
                  value={bar.value}
                  maxValue={calculatedMax}
                  label={bar.label}
                  highlighted={bar.highlighted}
                  colorPreset={color}
                  showValue={showValues}
                  showLabel={showLabels}
                  animated={animated}
                  barWidth={barWidth}
                  roundedTop={roundedBars}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VerticalBarChart.displayName = "VerticalBarChart";

// ============================================================================
// VERTICAL BAR CHART CARD
// ============================================================================

const verticalBarChartCardVariants = cva("rounded-2xl", {
  variants: {
    variant: {
      default: [
        "bg-white border border-gray-100",
        "dark:bg-[rgba(0,0,0,0.2)] dark:border-[rgba(248,232,216,0.05)]",
      ],
      elevated: [
        "bg-white shadow-xl",
        "dark:bg-[rgba(0,0,0,0.3)] dark:shadow-none dark:border dark:border-[rgba(248,232,216,0.05)]",
      ],
      flat: "bg-transparent",
    },
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export interface VerticalBarChartCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof verticalBarChartCardVariants> {
  /** Card title */
  title: string;
  /** Chart data */
  data: VerticalBarData[];
  /** Color preset */
  color?: VerticalBarColorPreset;
  /** Chart height */
  chartHeight?: "sm" | "md" | "lg" | "xl";
  /** Show info icon */
  showInfo?: boolean;
  /** Info click handler */
  onInfoClick?: () => void;
  /** Header icon */
  headerIcon?: React.ReactNode;
  /** Footer/insight content */
  children?: React.ReactNode;
}

const CalendarIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

const VerticalBarChartCard = React.forwardRef<HTMLDivElement, VerticalBarChartCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      data,
      color = "brand",
      chartHeight = "md",
      showInfo = false,
      onInfoClick,
      headerIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(verticalBarChartCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {headerIcon || (
              <span className="text-gray-500 dark:text-[#A89080]">
                <CalendarIcon />
              </span>
            )}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
              {title}
            </h3>
          </div>
          {showInfo && (
            <button
              type="button"
              onClick={onInfoClick}
              className="text-gray-400 hover:text-gray-600 dark:text-[#7A5A4A] dark:hover:text-[#A89080] transition-colors"
            >
              <InfoIcon />
            </button>
          )}
        </div>

        {/* Chart */}
        <VerticalBarChart data={data} color={color} height={chartHeight} />

        {/* Footer/Children (insights, etc) */}
        {children && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[rgba(248,232,216,0.08)]">
            {children}
          </div>
        )}
      </div>
    );
  }
);

VerticalBarChartCard.displayName = "VerticalBarChartCard";

// ============================================================================
// PRESETS
// ============================================================================

/** Day of week data with Portuguese labels */
export const dayOfWeekLabels = {
  full: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
  short: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  abbreviated: ["S", "T", "Q", "Q", "S", "S", "D"],
};

/**
 * Create day-of-week bar data
 */
export function createDayOfWeekData(
  values: number[],
  labelFormat: "full" | "short" | "abbreviated" = "short",
  highlightBest: boolean = true
): VerticalBarData[] {
  const labels = dayOfWeekLabels[labelFormat];
  const maxValue = Math.max(...values);

  return values.map((value, index) => ({
    label: labels[index] || `Dia ${index + 1}`,
    value,
    highlighted: highlightBest && value === maxValue,
  }));
}

/** Hour of day labels */
export const hourLabels = Array.from({ length: 24 }, (_, i) => `${i}h`);

/**
 * Create hourly bar data
 */
export function createHourlyData(
  values: number[],
  highlightBest: boolean = true
): VerticalBarData[] {
  const maxValue = Math.max(...values);

  return values.slice(0, 24).map((value, index) => ({
    label: hourLabels[index],
    value,
    highlighted: highlightBest && value === maxValue,
  }));
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  VerticalBarChart,
  VerticalBarChartCard,
  VerticalBar,
  verticalBarChartVariants,
  verticalBarChartCardVariants,
  verticalBarColors,
};

export type { VerticalBarChartProps, VerticalBarChartCardProps, VerticalBarProps };
