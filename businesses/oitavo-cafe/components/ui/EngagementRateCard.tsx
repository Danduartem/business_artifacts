import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// TYPES
// ============================================================================

export interface TabOption {
  value: string;
  label: string;
}

export interface RateData {
  /** The rate/percentage value (e.g., 1.83 for 1.83%) */
  value: number;
  /** Optional previous value for comparison */
  previousValue?: number;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format percentage with Brazilian locale (comma as decimal separator)
 */
function formatPercentage(value: number, decimals: number = 2): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }) + "%";
}

/**
 * Calculate trend direction and value
 */
function calculateTrend(
  current: number,
  previous?: number
): { direction: "up" | "down" | "neutral"; value: string } | null {
  if (previous === undefined) return null;

  const diff = current - previous;
  if (Math.abs(diff) < 0.01) {
    return { direction: "neutral", value: "0%" };
  }

  const percentChange = ((diff / previous) * 100).toFixed(1);
  return {
    direction: diff > 0 ? "up" : "down",
    value: `${diff > 0 ? "+" : ""}${percentChange}%`,
  };
}

// ============================================================================
// TAB FILTER (Compact inline version)
// ============================================================================

const tabVariants = cva(
  "inline-flex rounded-lg p-0.5 bg-gray-100 dark:bg-[rgba(248,232,216,0.08)]",
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

interface RateTabFilterProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
  className?: string;
}

const RateTabFilter: React.FC<RateTabFilterProps> = ({
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
            "px-2 py-1 rounded-md font-medium transition-all duration-200",
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
// ENGAGEMENT RATE CARD
// ============================================================================

const rateCardVariants = cva(
  "rounded-xl flex flex-col",
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

export interface EngagementRateCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rateCardVariants> {
  /** Card title (e.g., "Taxa de engajamento por impressão") */
  title: string;
  /** The rate/percentage value */
  value: number;
  /** Number of decimal places for the percentage */
  decimals?: number;
  /** Description text below the rate */
  description?: string;
  /** Show info icon */
  showInfo?: boolean;
  /** Info button click handler */
  onInfoClick?: () => void;
  /** Tab options (for Posts/Reels/Stories filtering) */
  tabs?: TabOption[];
  /** Selected tab value */
  selectedTab?: string;
  /** Tab change handler */
  onTabChange?: (value: string) => void;
  /** Previous value for trend comparison */
  previousValue?: number;
  /** Show trend indicator */
  showTrend?: boolean;
  /** Size of the percentage display */
  rateSize?: "md" | "lg" | "xl";
}

const rateSizes = {
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const EngagementRateCard = React.forwardRef<HTMLDivElement, EngagementRateCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      value,
      decimals = 2,
      description,
      showInfo = false,
      onInfoClick,
      tabs,
      selectedTab,
      onTabChange,
      previousValue,
      showTrend = true,
      rateSize = "lg",
      ...props
    },
    ref
  ) => {
    const formattedRate = formatPercentage(value, decimals);
    const trend = showTrend ? calculateTrend(value, previousValue) : null;

    return (
      <div
        ref={ref}
        className={cn(rateCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header with title and info */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xs font-medium text-gray-500 dark:text-[#A89080] uppercase tracking-wide">
            {title}
          </h3>
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

        {/* Tab Filter */}
        {tabs && selectedTab && onTabChange && (
          <div className="mb-4">
            <RateTabFilter
              options={tabs}
              value={selectedTab}
              onChange={onTabChange}
            />
          </div>
        )}

        {/* Large Rate Display */}
        <div className="flex items-end gap-2 mb-2">
          <span
            className={cn(
              "font-bold text-gray-900 dark:text-[#F8E8D8] tabular-nums leading-none",
              rateSizes[rateSize]
            )}
          >
            {formattedRate}
          </span>
          {trend && (
            <span
              className={cn(
                "text-sm font-medium mb-1",
                trend.direction === "up" && "text-emerald-600 dark:text-emerald-400",
                trend.direction === "down" && "text-red-500 dark:text-red-400",
                trend.direction === "neutral" && "text-gray-400 dark:text-[#7A5A4A]"
              )}
            >
              {trend.direction === "up" && "↑ "}
              {trend.direction === "down" && "↓ "}
              {trend.value}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-gray-500 dark:text-[#A89080] leading-relaxed mt-auto">
            {description}
          </p>
        )}
      </div>
    );
  }
);

EngagementRateCard.displayName = "EngagementRateCard";

// ============================================================================
// RATE CARD GROUP - Grid layout for multiple rate cards
// ============================================================================

interface RateCardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Gap size */
  gap?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const gapSizes = {
  sm: "gap-4",
  md: "gap-5",
  lg: "gap-6",
};

const RateCardGroup = React.forwardRef<HTMLDivElement, RateCardGroupProps>(
  ({ className, columns = 3, gap = "md", children, ...props }, ref) => {
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

RateCardGroup.displayName = "RateCardGroup";

// ============================================================================
// PRESETS - Common rate card configurations
// ============================================================================

/** Content type tabs preset */
export const contentTypeTabs: TabOption[] = [
  { value: "posts", label: "Posts" },
  { value: "reels", label: "Reels" },
  { value: "stories", label: "Stories" },
];

/** Common engagement rate types with descriptions */
export const engagementRateTypes = {
  byImpressions: {
    title: "Taxa de engajamento por impressão",
    description: "Pessoas que viam o conteúdo e interagiam.",
  },
  byFollowers: {
    title: "Taxa de engajamento por seguidores",
    description: "Seguidores que interagiam com os conteúdos.",
  },
  effectiveReach: {
    title: "Alcance efetivo",
    description: "Quantos dos seus seguidores viram o conteúdo.",
  },
  averageEngagement: {
    title: "Engajamento médio",
    description: "Média de interações por publicação.",
  },
  growthRate: {
    title: "Taxa de crescimento",
    description: "Variação no número de seguidores.",
  },
};

/**
 * Create a set of engagement rate cards data
 */
export function createEngagementRates(data: {
  byImpressions: number;
  byFollowers: number;
  effectiveReach: number;
}): Array<{
  title: string;
  value: number;
  description: string;
}> {
  return [
    {
      ...engagementRateTypes.byImpressions,
      value: data.byImpressions,
    },
    {
      ...engagementRateTypes.byFollowers,
      value: data.byFollowers,
    },
    {
      ...engagementRateTypes.effectiveReach,
      value: data.effectiveReach,
    },
  ];
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  EngagementRateCard,
  RateCardGroup,
  RateTabFilter,
  rateCardVariants,
  tabVariants,
  formatPercentage,
  calculateTrend,
};

export type { EngagementRateCardProps, RateCardGroupProps, RateTabFilterProps };
