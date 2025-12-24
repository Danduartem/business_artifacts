import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format percentage value with Brazilian locale
 */
function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals).replace(".", ",")}%`;
}

/**
 * Format number with Brazilian locale
 */
function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}

// ============================================================================
// HORIZONTAL BAR - Single bar row
// ============================================================================

const horizontalBarVariants = cva(
  "h-full rounded-sm transition-all duration-500 ease-out",
  {
    variants: {
      color: {
        primary: "bg-primary-600 dark:bg-[#7A1307]",
        secondary: "bg-secondary-600 dark:bg-[#A1523C]",
        accent: "bg-accent-500 dark:bg-[#A1523C]",
        burgundy: "bg-[#8B2942] dark:bg-[#A1523C]",
        teal: "bg-[#2D8B8B] dark:bg-[#3AA5A5]",
        success: "bg-success-500 dark:bg-[#6ABF6A]",
        warning: "bg-warning-500 dark:bg-[#FFB74D]",
        info: "bg-info-500 dark:bg-[#64B5F6]",
        neutral: "bg-gray-400 dark:bg-[rgba(248,232,216,0.3)]",
      },
    },
    defaultVariants: {
      color: "burgundy",
    },
  }
);

export interface BarItem {
  /** Label displayed on the left */
  label: string;
  /** Value (percentage 0-100 or absolute number) */
  value: number;
  /** Optional color override for this bar */
  color?: "primary" | "secondary" | "accent" | "burgundy" | "teal" | "success" | "warning" | "info" | "neutral";
}

interface HorizontalBarProps extends BarItem {
  /** Maximum value for calculating bar width (default: 100 for percentages) */
  maxValue?: number;
  /** Whether value is a percentage */
  isPercentage?: boolean;
  /** Show value on the right */
  showValue?: boolean;
  /** Bar height */
  size?: "sm" | "md" | "lg";
  /** Default color if not specified per-bar */
  defaultColor?: "primary" | "secondary" | "accent" | "burgundy" | "teal" | "success" | "warning" | "info" | "neutral";
  className?: string;
}

const barSizes = {
  sm: "h-3",
  md: "h-4",
  lg: "h-5",
};

const HorizontalBar = React.forwardRef<HTMLDivElement, HorizontalBarProps>(
  (
    {
      label,
      value,
      maxValue = 100,
      isPercentage = true,
      showValue = true,
      size = "md",
      color,
      defaultColor = "burgundy",
      className,
    },
    ref
  ) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const barColor = color || defaultColor;
    const displayValue = isPercentage
      ? formatPercentage(value)
      : formatNumber(value);

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3 py-1.5", className)}
      >
        {/* Label */}
        <span className="flex-shrink-0 w-24 text-sm text-gray-700 dark:text-[#D4B8A8] truncate">
          {label}
        </span>

        {/* Bar container */}
        <div className="flex-1 relative">
          <div
            className={cn(
              "w-full rounded-sm bg-gray-100 dark:bg-[rgba(248,232,216,0.08)]",
              barSizes[size]
            )}
          >
            <div
              className={cn(horizontalBarVariants({ color: barColor }))}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Value */}
        {showValue && (
          <span className="flex-shrink-0 w-16 text-right text-sm font-medium text-gray-900 dark:text-[#F8E8D8] tabular-nums">
            {displayValue}
          </span>
        )}
      </div>
    );
  }
);

HorizontalBar.displayName = "HorizontalBar";

// ============================================================================
// HORIZONTAL BAR CHART - Collection of bars
// ============================================================================

export interface HorizontalBarChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of bar items */
  data: BarItem[];
  /** Maximum value for calculating bar widths */
  maxValue?: number;
  /** Auto-calculate maxValue from data */
  autoScale?: boolean;
  /** Whether values are percentages */
  isPercentage?: boolean;
  /** Show values on the right */
  showValues?: boolean;
  /** Bar size */
  size?: "sm" | "md" | "lg";
  /** Default bar color */
  color?: "primary" | "secondary" | "accent" | "burgundy" | "teal" | "success" | "warning" | "info" | "neutral";
  /** Sort bars by value */
  sortBy?: "none" | "asc" | "desc";
  /** Limit number of bars shown */
  limit?: number;
}

const HorizontalBarChart = React.forwardRef<HTMLDivElement, HorizontalBarChartProps>(
  (
    {
      className,
      data,
      maxValue,
      autoScale = false,
      isPercentage = true,
      showValues = true,
      size = "md",
      color = "burgundy",
      sortBy = "none",
      limit,
      ...props
    },
    ref
  ) => {
    // Calculate max value if auto-scaling
    const calculatedMax = autoScale
      ? Math.max(...data.map((d) => d.value))
      : maxValue || 100;

    // Sort data if needed
    let sortedData = [...data];
    if (sortBy === "desc") {
      sortedData.sort((a, b) => b.value - a.value);
    } else if (sortBy === "asc") {
      sortedData.sort((a, b) => a.value - b.value);
    }

    // Apply limit
    if (limit && limit > 0) {
      sortedData = sortedData.slice(0, limit);
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-1", className)}
        {...props}
      >
        {sortedData.map((item, index) => (
          <HorizontalBar
            key={`${item.label}-${index}`}
            {...item}
            maxValue={calculatedMax}
            isPercentage={isPercentage}
            showValue={showValues}
            size={size}
            defaultColor={color}
          />
        ))}
      </div>
    );
  }
);

HorizontalBarChart.displayName = "HorizontalBarChart";

// ============================================================================
// BAR CHART CARD - Card wrapper with title and info icon
// ============================================================================

const barChartCardVariants = cva(
  [
    "rounded-xl",
    "bg-white dark:bg-[rgba(0,0,0,0.2)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "border border-gray-100",
          "dark:border-[rgba(248,232,216,0.05)]",
        ],
        elevated: [
          "shadow-md",
          "dark:shadow-none dark:border dark:border-[rgba(248,232,216,0.05)]",
        ],
        flat: "border-none shadow-none",
      },
      padding: {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

interface TabOption {
  value: string;
  label: string;
}

interface BarChartCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof barChartCardVariants> {
  /** Card title */
  title: string;
  /** Show info icon next to title */
  showInfo?: boolean;
  /** Info tooltip content */
  infoText?: string;
  /** Chart data */
  data: BarItem[];
  /** All HorizontalBarChart props */
  chartProps?: Omit<HorizontalBarChartProps, "data">;
  /** Tab options (for Cidade/Estado/País filtering) */
  tabs?: TabOption[];
  /** Selected tab value */
  selectedTab?: string;
  /** Tab change handler */
  onTabChange?: (value: string) => void;
}

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

const BarChartCard = React.forwardRef<HTMLDivElement, BarChartCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      showInfo = false,
      infoText,
      data,
      chartProps,
      tabs,
      selectedTab,
      onTabChange,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(barChartCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
              {title}
            </h3>
            {showInfo && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 dark:text-[#7A5A4A] dark:hover:text-[#A89080] transition-colors"
                title={infoText}
              >
                <InfoIcon />
              </button>
            )}
          </div>

          {/* Tab Filter */}
          {tabs && selectedTab && onTabChange && (
            <div className="inline-flex rounded-lg p-0.5 bg-gray-100 dark:bg-[rgba(248,232,216,0.08)] text-xs">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => onTabChange(tab.value)}
                  className={cn(
                    "px-2 py-1 rounded-md font-medium transition-all duration-200",
                    selectedTab === tab.value
                      ? "bg-white text-gray-900 shadow-sm dark:bg-[#2D8B8B] dark:text-white"
                      : "text-gray-500 hover:text-gray-700 dark:text-[#A89080] dark:hover:text-[#D4B8A8]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chart */}
        <HorizontalBarChart data={data} {...chartProps} />
      </div>
    );
  }
);

BarChartCard.displayName = "BarChartCard";

// ============================================================================
// BIG STAT - Hero number with icon (like "Total de seguidores")
// ============================================================================

const bigStatVariants = cva(
  [
    "flex flex-col items-center justify-center text-center",
    "rounded-xl",
    "bg-white dark:bg-[rgba(0,0,0,0.2)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "border border-gray-100",
          "dark:border-[rgba(248,232,216,0.05)]",
        ],
        elevated: [
          "shadow-md",
          "dark:shadow-none dark:border dark:border-[rgba(248,232,216,0.05)]",
        ],
        flat: "border-none shadow-none",
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
  }
);

const bigStatIcons = {
  followers: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  views: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  ),
  engagement: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  reach: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
    </svg>
  ),
};

type BigStatIconName = keyof typeof bigStatIcons;

export interface BigStatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bigStatVariants> {
  /** Title above the stat */
  title: string;
  /** The main stat value */
  value: number | string;
  /** Label below the value */
  label: string;
  /** Icon name or custom React node */
  icon?: BigStatIconName | React.ReactNode;
  /** Icon color */
  iconColor?: "primary" | "secondary" | "accent" | "burgundy" | "teal";
  /** Format value as number with locale */
  formatValue?: boolean;
  /** Show info icon */
  showInfo?: boolean;
}

const iconColors = {
  primary: "text-primary-600 dark:text-[#A1523C]",
  secondary: "text-secondary-600 dark:text-[#A1523C]",
  accent: "text-accent-500 dark:text-[#A1523C]",
  burgundy: "text-[#8B2942] dark:text-[#A1523C]",
  teal: "text-[#2D8B8B] dark:text-[#3AA5A5]",
};

const BigStat = React.forwardRef<HTMLDivElement, BigStatProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      value,
      label,
      icon,
      iconColor = "burgundy",
      formatValue = true,
      showInfo = false,
      ...props
    },
    ref
  ) => {
    const iconContent =
      typeof icon === "string" && icon in bigStatIcons
        ? bigStatIcons[icon as BigStatIconName]
        : icon;

    const displayValue =
      formatValue && typeof value === "number"
        ? formatNumber(value)
        : value;

    return (
      <div
        ref={ref}
        className={cn(bigStatVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Title */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-sm font-medium text-gray-600 dark:text-[#A89080]">
            {title}
          </span>
          {showInfo && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 dark:text-[#7A5A4A] dark:hover:text-[#A89080] transition-colors"
            >
              <InfoIcon />
            </button>
          )}
        </div>

        {/* Icon */}
        {iconContent && (
          <div className={cn("w-10 h-10 mb-3", iconColors[iconColor])}>
            {iconContent}
          </div>
        )}

        {/* Value */}
        <span className="text-3xl font-bold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
          {displayValue}
        </span>

        {/* Label */}
        <span className="text-sm text-gray-500 dark:text-[#A89080] mt-1">
          {label}
        </span>
      </div>
    );
  }
);

BigStat.displayName = "BigStat";

// ============================================================================
// AUDIENCE GRID - Layout for audience section (like Wake's "Público do Instagram")
// ============================================================================

interface AudienceGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AudienceGrid = React.forwardRef<HTMLDivElement, AudienceGridProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

AudienceGrid.displayName = "AudienceGrid";

// ============================================================================
// PRESETS - Common audience data configurations
// ============================================================================

export const audiencePresets = {
  ageRanges: [
    { label: "13-17", value: 0 },
    { label: "18-24", value: 0 },
    { label: "25-34", value: 0 },
    { label: "35-44", value: 0 },
    { label: "45-54", value: 0 },
    { label: "55-64", value: 0 },
    { label: "65+", value: 0 },
  ],
  genderSplit: [
    { label: "Mulheres", value: 0 },
    { label: "Homens", value: 0 },
  ],
};

/** Location tabs preset for geographic breakdowns */
export const locationTabs: TabOption[] = [
  { value: "cidade", label: "Cidade" },
  { value: "estado", label: "Estado" },
  { value: "pais", label: "País" },
];

// ============================================================================
// EXPORTS
// ============================================================================

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
  locationTabs,
};

export type { TabOption as BarChartTabOption };

export type {
  HorizontalBarChartProps,
  BarChartCardProps,
  BigStatProps,
};
