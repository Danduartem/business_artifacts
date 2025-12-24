import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// TYPES
// ============================================================================

export interface Indicator {
  /** Label for the metric */
  label: string;
  /** Value (number or pre-formatted string) */
  value: number | string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Value type for formatting */
  type?: "number" | "percentage" | "text";
  /** Optional trend indicator */
  trend?: "up" | "down" | "neutral";
  /** Trend value (e.g., "+12%") */
  trendValue?: string;
}

export interface TabOption {
  value: string;
  label: string;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format number with Brazilian locale (dots for thousands)
 */
function formatValue(value: number | string, type: "number" | "percentage" | "text" = "number"): string {
  if (typeof value === "string") return value;

  if (type === "percentage") {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%";
  }

  return value.toLocaleString("pt-BR");
}

// ============================================================================
// INDICATOR ROW
// ============================================================================

const indicatorRowVariants = cva(
  "flex items-center justify-between py-2.5 border-b last:border-b-0",
  {
    variants: {
      variant: {
        default: [
          "border-gray-100",
          "dark:border-[rgba(248,232,216,0.05)]",
        ],
        minimal: "border-transparent",
        striped: [
          "border-gray-100 odd:bg-gray-50/50",
          "dark:border-[rgba(248,232,216,0.05)] dark:odd:bg-[rgba(248,232,216,0.02)]",
        ],
      },
      size: {
        sm: "py-2 text-xs",
        md: "py-2.5 text-sm",
        lg: "py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface IndicatorRowProps extends VariantProps<typeof indicatorRowVariants> {
  indicator: Indicator;
  className?: string;
}

const IndicatorRow: React.FC<IndicatorRowProps> = ({
  indicator,
  variant,
  size,
  className,
}) => {
  const formattedValue = formatValue(indicator.value, indicator.type);

  return (
    <div className={cn(indicatorRowVariants({ variant, size }), className)}>
      <div className="flex items-center gap-2">
        {indicator.icon && (
          <span className="text-gray-400 dark:text-[#7A5A4A] flex-shrink-0">
            {indicator.icon}
          </span>
        )}
        <span className="text-gray-600 dark:text-[#A89080]">
          {indicator.label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
          {formattedValue}
        </span>
        {indicator.trend && indicator.trendValue && (
          <span
            className={cn(
              "text-xs font-medium",
              indicator.trend === "up" && "text-emerald-600 dark:text-emerald-400",
              indicator.trend === "down" && "text-red-500 dark:text-red-400",
              indicator.trend === "neutral" && "text-gray-400 dark:text-[#7A5A4A]"
            )}
          >
            {indicator.trend === "up" && "↑"}
            {indicator.trend === "down" && "↓"}
            {indicator.trendValue}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// TAB FILTER (Inline version for IndicatorTable)
// ============================================================================

const tabVariants = cva(
  "inline-flex rounded-lg p-1 bg-gray-100 dark:bg-[rgba(248,232,216,0.08)]",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

interface InlineTabFilterProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
  className?: string;
}

const InlineTabFilter: React.FC<InlineTabFilterProps> = ({
  options,
  value,
  onChange,
  size = "sm",
  className,
}) => {
  return (
    <div className={cn(tabVariants({ size }), className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-2.5 py-1 rounded-md font-medium transition-all duration-200",
            value === option.value
              ? "bg-white text-gray-900 shadow-sm dark:bg-[#2D8B8B] dark:text-white"
              : "text-gray-500 hover:text-gray-700 dark:text-[#A89080] dark:hover:text-[#D4B8A8]"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// INFO ICON
// ============================================================================

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
// INDICATOR TABLE CARD
// ============================================================================

const indicatorTableCardVariants = cva(
  "rounded-xl",
  {
    variants: {
      variant: {
        default: [
          "bg-white border border-gray-100",
          "dark:bg-[rgba(0,0,0,0.2)] dark:border-[rgba(248,232,216,0.05)]",
        ],
        elevated: [
          "bg-white shadow-md",
          "dark:bg-[rgba(0,0,0,0.2)] dark:shadow-none dark:border dark:border-[rgba(248,232,216,0.05)]",
        ],
        flat: "bg-transparent",
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

export interface IndicatorTableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorTableCardVariants> {
  /** Table title */
  title: string;
  /** Show info icon next to title */
  showInfo?: boolean;
  /** Info button click handler */
  onInfoClick?: () => void;
  /** Indicator data */
  indicators: Indicator[];
  /** Row variant */
  rowVariant?: "default" | "minimal" | "striped";
  /** Row size */
  rowSize?: "sm" | "md" | "lg";
  /** Tab options (for Posts/Reels/Stories filtering) */
  tabs?: TabOption[];
  /** Selected tab value */
  selectedTab?: string;
  /** Tab change handler */
  onTabChange?: (value: string) => void;
  /** Footer text */
  footer?: string;
}

const IndicatorTable = React.forwardRef<HTMLDivElement, IndicatorTableProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      showInfo = false,
      onInfoClick,
      indicators,
      rowVariant = "default",
      rowSize = "md",
      tabs,
      selectedTab,
      onTabChange,
      footer,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(indicatorTableCardVariants({ variant, padding }), className)}
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
                onClick={onInfoClick}
                className="text-gray-400 hover:text-gray-600 dark:text-[#7A5A4A] dark:hover:text-[#A89080] transition-colors"
              >
                <InfoIcon />
              </button>
            )}
          </div>

          {/* Tabs */}
          {tabs && selectedTab && onTabChange && (
            <InlineTabFilter
              options={tabs}
              value={selectedTab}
              onChange={onTabChange}
            />
          )}
        </div>

        {/* Indicator Rows */}
        <div>
          {indicators.map((indicator, index) => (
            <IndicatorRow
              key={`${indicator.label}-${index}`}
              indicator={indicator}
              variant={rowVariant}
              size={rowSize}
            />
          ))}
        </div>

        {/* Footer */}
        {footer && (
          <p className="text-xs text-gray-500 dark:text-[#A89080] mt-4 pt-3 border-t border-gray-100 dark:border-[rgba(248,232,216,0.05)]">
            {footer}
          </p>
        )}
      </div>
    );
  }
);

IndicatorTable.displayName = "IndicatorTable";

// ============================================================================
// INDICATOR TABLE GROUP - Side by side layout
// ============================================================================

interface IndicatorTableGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: 2 | 3;
  /** Gap size */
  gap?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const gapSizes = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

const IndicatorTableGroup = React.forwardRef<HTMLDivElement, IndicatorTableGroupProps>(
  ({ className, columns = 2, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
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

IndicatorTableGroup.displayName = "IndicatorTableGroup";

// ============================================================================
// PRESETS - Common indicator configurations
// ============================================================================

/** Performance indicators preset (Portuguese) */
export const performanceIndicators: Indicator[] = [
  { label: "Engajamento", value: 0, type: "number" },
  { label: "Impressões", value: 0, type: "number" },
  { label: "Alcance", value: 0, type: "number" },
];

/** Engagement indicators preset (Portuguese) */
export const engagementIndicators: Indicator[] = [
  { label: "Comentários", value: 0, type: "number" },
  { label: "Curtidas", value: 0, type: "number" },
  { label: "Salvos", value: 0, type: "number" },
];

/** Content type tabs preset */
export const contentTypeTabs: TabOption[] = [
  { value: "posts", label: "Posts" },
  { value: "reels", label: "Reels" },
  { value: "stories", label: "Stories" },
];

/**
 * Create performance indicators with values
 */
export function createPerformanceIndicators(data: {
  engajamento: number;
  impressoes: number;
  alcance: number;
}): Indicator[] {
  return [
    { label: "Engajamento", value: data.engajamento, type: "number" },
    { label: "Impressões", value: data.impressoes, type: "number" },
    { label: "Alcance", value: data.alcance, type: "number" },
  ];
}

/**
 * Create engagement indicators with values
 */
export function createEngagementIndicators(data: {
  comentarios: number;
  curtidas: number;
  salvos: number;
  compartilhamentos?: number;
}): Indicator[] {
  const indicators: Indicator[] = [
    { label: "Comentários", value: data.comentarios, type: "number" },
    { label: "Curtidas", value: data.curtidas, type: "number" },
    { label: "Salvos", value: data.salvos, type: "number" },
  ];

  if (data.compartilhamentos !== undefined) {
    indicators.push({ label: "Compartilhamentos", value: data.compartilhamentos, type: "number" });
  }

  return indicators;
}

// ============================================================================
// BUILT-IN ICONS
// ============================================================================

export const indicatorIcons = {
  engagement: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  impressions: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  reach: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  comments: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  likes: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  saves: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  shares: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  IndicatorTable,
  IndicatorTableGroup,
  IndicatorRow,
  InlineTabFilter,
  indicatorRowVariants,
  indicatorTableCardVariants,
  tabVariants,
  formatValue,
};

export type { IndicatorRowProps, InlineTabFilterProps, IndicatorTableGroupProps };
