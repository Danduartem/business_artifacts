import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// CONSTANTS
// ============================================================================

/** Days of week in Portuguese (Monday to Sunday) */
export const DAYS_PT = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;

/** Days of week in English */
export const DAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** Default time slots (3-hour intervals) */
export const DEFAULT_TIME_SLOTS = ["00h", "03h", "06h", "09h", "12h", "15h", "18h", "21h"] as const;

// ============================================================================
// TAB FILTER - Segmented control for Posts/Reels/Stories
// ============================================================================

const tabFilterVariants = cva(
  "inline-flex rounded-lg p-1 bg-gray-100 dark:bg-[rgba(248,232,216,0.08)]",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const tabButtonVariants = cva(
  [
    "px-3 py-1.5 rounded-md font-medium transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
  ],
  {
    variants: {
      active: {
        true: [
          "bg-white text-gray-900 shadow-sm",
          "dark:bg-[#A1523C] dark:text-white",
        ],
        false: [
          "text-gray-500 hover:text-gray-700",
          "dark:text-[#A89080] dark:hover:text-[#D4B8A8]",
        ],
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface TabOption {
  value: string;
  label: string;
}

export interface TabFilterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabFilterVariants> {
  /** Tab options */
  options: TabOption[];
  /** Currently selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
}

const TabFilter = React.forwardRef<HTMLDivElement, TabFilterProps>(
  ({ className, size, options, value, onChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabFilterVariants({ size }), className)}
        {...props}
      >
        {options.map((option) => (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(tabButtonVariants({ active: value === option.value }))}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }
);

TabFilter.displayName = "TabFilter";

// ============================================================================
// HEATMAP CELL - Individual circle with intensity
// ============================================================================

interface HeatmapCellProps {
  /** Value from 0 to 1 (or 0-100) representing intensity */
  value: number;
  /** Maximum value for normalization (default: 1) */
  maxValue?: number;
  /** Size of the cell */
  size?: "sm" | "md" | "lg";
  /** Color scheme */
  color?: "blue" | "teal" | "accent" | "primary";
  /** Tooltip content */
  tooltip?: string;
  className?: string;
}

const cellSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const HeatmapCell = React.forwardRef<HTMLDivElement, HeatmapCellProps>(
  (
    {
      value,
      maxValue = 1,
      size = "md",
      color = "teal",
      tooltip,
      className,
    },
    ref
  ) => {
    // Normalize value to 0-1 range
    const normalizedValue = Math.min(Math.max(value / maxValue, 0), 1);

    // Calculate opacity based on value (minimum 0.1 for visibility)
    const opacity = normalizedValue > 0 ? 0.15 + normalizedValue * 0.85 : 0.08;

    // Color mapping
    const colorMap = {
      blue: { light: "59, 130, 246", dark: "100, 181, 246" }, // blue-500 / lighter
      teal: { light: "161, 82, 60", dark: "184, 109, 95" }, // #A1523C / lighter shade
      accent: { light: "161, 82, 60", dark: "161, 82, 60" }, // #A1523C
      primary: { light: "122, 19, 7", dark: "161, 82, 60" }, // #7A1307 / #A1523C
    };

    const rgb = colorMap[color];

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full transition-all duration-200",
          cellSizes[size],
          className
        )}
        style={{
          backgroundColor: `rgba(${rgb.light}, ${opacity})`,
        }}
        title={tooltip}
        role="gridcell"
        aria-label={tooltip || `Engagement: ${Math.round(normalizedValue * 100)}%`}
      />
    );
  }
);

HeatmapCell.displayName = "HeatmapCell";

// ============================================================================
// ENGAGEMENT HEATMAP - Main grid component
// ============================================================================

export interface HeatmapData {
  /** Day index (0-6, Monday to Sunday) */
  day: number;
  /** Hour slot index (0-7 for default 8 slots) */
  hour: number;
  /** Value representing engagement intensity */
  value: number;
}

export interface EngagementHeatmapProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Heatmap data array */
  data: HeatmapData[];
  /** Day labels */
  days?: readonly string[];
  /** Hour labels */
  hours?: readonly string[];
  /** Cell size */
  cellSize?: "sm" | "md" | "lg";
  /** Color scheme */
  color?: "blue" | "teal" | "accent" | "primary";
  /** Show day labels */
  showDayLabels?: boolean;
  /** Show hour labels */
  showHourLabels?: boolean;
  /** Gap between cells */
  gap?: "sm" | "md" | "lg";
}

const gapSizes = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
};

const EngagementHeatmap = React.forwardRef<HTMLDivElement, EngagementHeatmapProps>(
  (
    {
      className,
      data,
      days = DAYS_PT,
      hours = DEFAULT_TIME_SLOTS,
      cellSize = "md",
      color = "teal",
      showDayLabels = true,
      showHourLabels = true,
      gap = "md",
      ...props
    },
    ref
  ) => {
    // Find max value for normalization
    const maxValue = Math.max(...data.map((d) => d.value), 1);

    // Create lookup map for quick access
    const dataMap = new Map<string, number>();
    data.forEach((d) => {
      dataMap.set(`${d.day}-${d.hour}`, d.value);
    });

    // Get value for a specific cell
    const getValue = (dayIndex: number, hourIndex: number): number => {
      return dataMap.get(`${dayIndex}-${hourIndex}`) || 0;
    };

    return (
      <div
        ref={ref}
        className={cn("inline-block", className)}
        role="grid"
        aria-label="Engagement heatmap"
        {...props}
      >
        {/* Hour labels row */}
        {showHourLabels && (
          <div className={cn("flex", gapSizes[gap], "mb-1.5")}>
            {/* Empty cell for day labels column */}
            {showDayLabels && <div className="w-8" />}
            {hours.map((hour, index) => (
              <div
                key={hour}
                className={cn(
                  cellSizes[cellSize],
                  "flex items-center justify-center",
                  "text-[10px] text-gray-400 dark:text-[#7A5A4A]"
                )}
              >
                {hour}
              </div>
            ))}
          </div>
        )}

        {/* Grid rows */}
        {days.map((day, dayIndex) => (
          <div
            key={day}
            className={cn("flex items-center", gapSizes[gap])}
            role="row"
          >
            {/* Day label */}
            {showDayLabels && (
              <div className="w-8 text-xs text-gray-500 dark:text-[#A89080] text-right pr-2">
                {day}
              </div>
            )}

            {/* Cells for each hour */}
            {hours.map((hour, hourIndex) => {
              const value = getValue(dayIndex, hourIndex);
              return (
                <HeatmapCell
                  key={`${dayIndex}-${hourIndex}`}
                  value={value}
                  maxValue={maxValue}
                  size={cellSize}
                  color={color}
                  tooltip={`${day} às ${hour}: ${Math.round(value)} interações`}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);

EngagementHeatmap.displayName = "EngagementHeatmap";

// ============================================================================
// HEATMAP CARD - Wrapper with title, tabs, and insight
// ============================================================================

const heatmapCardVariants = cva(
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

export interface HeatmapCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heatmapCardVariants> {
  /** Card title */
  title: string;
  /** Show info icon */
  showInfo?: boolean;
  /** Tab options (if using tabs) */
  tabs?: TabOption[];
  /** Selected tab value */
  selectedTab?: string;
  /** Tab change handler */
  onTabChange?: (value: string) => void;
  /** Heatmap data */
  data: HeatmapData[];
  /** Heatmap props */
  heatmapProps?: Omit<EngagementHeatmapProps, "data">;
  /** Insight text below the heatmap */
  insight?: string;
  /** Highlight text within insight (will be bolded) */
  insightHighlight?: string;
}

const HeatmapCard = React.forwardRef<HTMLDivElement, HeatmapCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      showInfo = false,
      tabs,
      selectedTab,
      onTabChange,
      data,
      heatmapProps,
      insight,
      insightHighlight,
      ...props
    },
    ref
  ) => {
    // Format insight with highlight
    const renderInsight = () => {
      if (!insight) return null;

      if (insightHighlight && insight.includes(insightHighlight)) {
        const parts = insight.split(insightHighlight);
        return (
          <p className="text-xs text-gray-500 dark:text-[#A89080] mt-4">
            {parts[0]}
            <span className="font-semibold text-gray-700 dark:text-[#D4B8A8]">
              {insightHighlight}
            </span>
            {parts[1]}
          </p>
        );
      }

      return (
        <p className="text-xs text-gray-500 dark:text-[#A89080] mt-4">
          {insight}
        </p>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(heatmapCardVariants({ variant, padding }), className)}
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
              >
                <InfoIcon />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        {tabs && selectedTab && onTabChange && (
          <div className="mb-4">
            <TabFilter
              options={tabs}
              value={selectedTab}
              onChange={onTabChange}
            />
          </div>
        )}

        {/* Heatmap */}
        <EngagementHeatmap data={data} {...heatmapProps} />

        {/* Insight */}
        {renderInsight()}
      </div>
    );
  }
);

HeatmapCard.displayName = "HeatmapCard";

// ============================================================================
// UTILITIES - Generate sample data
// ============================================================================

/**
 * Generate random heatmap data for demo purposes
 */
export function generateSampleHeatmapData(
  days = 7,
  hours = 8,
  options?: {
    peakDay?: number;
    peakHour?: number;
    baseValue?: number;
    variance?: number;
  }
): HeatmapData[] {
  const {
    peakDay = 6, // Sunday
    peakHour = 7, // 21h
    baseValue = 30,
    variance = 50,
  } = options || {};

  const data: HeatmapData[] = [];

  for (let day = 0; day < days; day++) {
    for (let hour = 0; hour < hours; hour++) {
      // Calculate distance from peak
      const dayDist = Math.abs(day - peakDay);
      const hourDist = Math.abs(hour - peakHour);
      const distance = Math.sqrt(dayDist * dayDist + hourDist * hourDist);

      // Value decreases with distance from peak
      const peakBonus = Math.max(0, 100 - distance * 15);
      const randomVariance = (Math.random() - 0.5) * variance;
      const value = Math.max(0, baseValue + peakBonus + randomVariance);

      data.push({ day, hour, value });
    }
  }

  return data;
}

/**
 * Find the peak engagement time from data
 */
export function findPeakTime(
  data: HeatmapData[],
  days: readonly string[] = DAYS_PT,
  hours: readonly string[] = DEFAULT_TIME_SLOTS
): { day: string; hour: string; value: number } | null {
  if (data.length === 0) return null;

  const peak = data.reduce((max, current) =>
    current.value > max.value ? current : max
  );

  return {
    day: days[peak.day] || `Day ${peak.day}`,
    hour: hours[peak.hour] || `${peak.hour}h`,
    value: peak.value,
  };
}

// ============================================================================
// PRESETS - Common tab configurations
// ============================================================================

export const contentTypeTabs: TabOption[] = [
  { value: "posts", label: "Posts" },
  { value: "reels", label: "Reels" },
  { value: "stories", label: "Stories" },
];

export const locationTabs: TabOption[] = [
  { value: "cidade", label: "Cidade" },
  { value: "estado", label: "Estado" },
  { value: "pais", label: "País" },
];

// ============================================================================
// EXPORTS
// ============================================================================

export {
  TabFilter,
  HeatmapCell,
  EngagementHeatmap,
  HeatmapCard,
  tabFilterVariants,
  tabButtonVariants,
  heatmapCardVariants,
};

export type { TabFilterProps, HeatmapCellProps, EngagementHeatmapProps };
