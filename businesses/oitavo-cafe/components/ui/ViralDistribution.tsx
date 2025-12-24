import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// VIRAL DISTRIBUTION COMPONENT
// Shows content performance distribution (Viral/Alto/Normal)
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export interface ViralTier {
  /** Tier label */
  label: string;
  /** Percentage value */
  percentage: number;
  /** Multiplier label (e.g., "3x+", "2x+") */
  multiplier?: string;
  /** Tier type for coloring */
  type: "viral" | "high" | "normal" | "low";
}

// ============================================================================
// COLOR SCHEME
// ============================================================================

const tierColors = {
  viral: {
    bg: "bg-gradient-to-r from-emerald-500 to-emerald-400",
    bgDark: "dark:from-emerald-600 dark:to-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500 dark:bg-emerald-500",
    glow: "shadow-emerald-500/30",
  },
  high: {
    bg: "bg-gradient-to-r from-teal-500 to-teal-400",
    bgDark: "dark:from-teal-600 dark:to-teal-500",
    text: "text-teal-600 dark:text-teal-400",
    bar: "bg-teal-500 dark:bg-teal-500",
    glow: "shadow-teal-500/30",
  },
  normal: {
    bg: "bg-gradient-to-r from-gray-400 to-gray-300",
    bgDark: "dark:from-[rgba(248,232,216,0.3)] dark:to-[rgba(248,232,216,0.2)]",
    text: "text-gray-600 dark:text-[#D4B8A8]",
    bar: "bg-gray-400 dark:bg-[rgba(248,232,216,0.3)]",
    glow: "shadow-gray-500/20",
  },
  low: {
    bg: "bg-gradient-to-r from-rose-500 to-rose-400",
    bgDark: "dark:from-rose-600 dark:to-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bar: "bg-rose-500 dark:bg-rose-500",
    glow: "shadow-rose-500/30",
  },
};

// ============================================================================
// TIER BLOCK COMPONENT
// ============================================================================

interface TierBlockProps {
  tier: ViralTier;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const blockSizes = {
  sm: "h-16 min-w-[80px]",
  md: "h-20 min-w-[100px]",
  lg: "h-24 min-w-[120px]",
};

const TierBlock: React.FC<TierBlockProps> = ({ tier, size = "md", animated = true }) => {
  const [isVisible, setIsVisible] = React.useState(!animated);
  const colors = tierColors[tier.type];

  React.useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  return (
    <div
      className={cn(
        "flex-1 rounded-xl flex flex-col items-center justify-center",
        "transition-all duration-500",
        colors.bg,
        colors.bgDark,
        blockSizes[size],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Percentage */}
      <span className="text-2xl font-bold text-white tabular-nums">
        {tier.percentage.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%
      </span>
      {/* Label with multiplier */}
      <span className="text-xs text-white/80 font-medium">
        {tier.label}
        {tier.multiplier && ` (${tier.multiplier})`}
      </span>
    </div>
  );
};

// ============================================================================
// VIRAL DISTRIBUTION BAR
// ============================================================================

interface ViralDistributionBarProps {
  tiers: ViralTier[];
  height?: "sm" | "md" | "lg";
  animated?: boolean;
  showLabels?: boolean;
}

const barHeights = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

const ViralDistributionBar: React.FC<ViralDistributionBarProps> = ({
  tiers,
  height = "md",
  animated = true,
  showLabels = true,
}) => {
  const [widths, setWidths] = React.useState<number[]>(
    animated ? tiers.map(() => 0) : tiers.map((t) => t.percentage)
  );

  React.useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setWidths(tiers.map((t) => t.percentage));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [animated, tiers]);

  return (
    <div>
      {/* Bar */}
      <div
        className={cn(
          "flex rounded-lg overflow-hidden",
          barHeights[height]
        )}
      >
        {tiers.map((tier, index) => {
          const colors = tierColors[tier.type];
          return (
            <div
              key={`${tier.label}-${index}`}
              className={cn(
                "flex items-center justify-center transition-all duration-700 ease-out",
                colors.bar,
                index === 0 && "rounded-l-lg",
                index === tiers.length - 1 && "rounded-r-lg"
              )}
              style={{ width: `${widths[index]}%` }}
            >
              {widths[index] > 10 && (
                <span className="text-white text-sm font-semibold tabular-nums">
                  {tier.percentage.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between mt-2">
          {tiers.map((tier, index) => {
            const colors = tierColors[tier.type];
            return (
              <div key={`label-${index}`} className="text-center" style={{ width: `${tier.percentage}%` }}>
                <span className={cn("text-xs font-medium", colors.text)}>
                  {tier.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT VARIANTS
// ============================================================================

const viralDistributionVariants = cva("", {
  variants: {
    layout: {
      blocks: "flex gap-3",
      bar: "",
      compact: "",
    },
  },
  defaultVariants: {
    layout: "blocks",
  },
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface ViralDistributionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof viralDistributionVariants> {
  /** Distribution tiers */
  tiers: ViralTier[];
  /** Component size */
  size?: "sm" | "md" | "lg";
  /** Animation on mount */
  animated?: boolean;
}

const ViralDistribution = React.forwardRef<HTMLDivElement, ViralDistributionProps>(
  ({ className, layout, tiers, size = "md", animated = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(viralDistributionVariants({ layout }), className)}
        {...props}
      >
        {layout === "blocks" ? (
          tiers.map((tier, index) => (
            <TierBlock
              key={`${tier.label}-${index}`}
              tier={tier}
              size={size}
              animated={animated}
            />
          ))
        ) : layout === "bar" ? (
          <ViralDistributionBar tiers={tiers} height={size} animated={animated} />
        ) : (
          // Compact layout
          <div className="flex items-center gap-4">
            {tiers.map((tier, index) => {
              const colors = tierColors[tier.type];
              return (
                <div key={`${tier.label}-${index}`} className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", colors.bar)} />
                  <span className="text-sm text-gray-600 dark:text-[#D4B8A8]">
                    {tier.label}:
                  </span>
                  <span className={cn("text-sm font-semibold tabular-nums", colors.text)}>
                    {tier.percentage.toLocaleString("pt-BR")}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

ViralDistribution.displayName = "ViralDistribution";

// ============================================================================
// VIRAL DISTRIBUTION CARD
// ============================================================================

const viralDistributionCardVariants = cva("rounded-2xl", {
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

export interface ViralDistributionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof viralDistributionCardVariants> {
  /** Card title */
  title: string;
  /** Distribution tiers */
  tiers: ViralTier[];
  /** Layout type */
  layout?: "blocks" | "bar" | "compact";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Header icon */
  headerIcon?: React.ReactNode;
  /** Children (high performers list, etc) */
  children?: React.ReactNode;
}

const FireIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.53 2.04-6.52 5-7.96v4.46c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10c0-2.49-.92-4.76-2.43-6.51l-1.42 1.42C15.64 9.47 16.5 11.14 16.5 13c0 3.03-2.47 5.5-5.5 5.5S5.5 16.03 5.5 13c0-1.96 1.03-3.68 2.58-4.65.31-.19.42-.6.23-.91-.19-.31-.6-.42-.91-.23C5.33 8.66 4 10.69 4 13c0 4.41 3.59 8 8 8s8-3.59 8-8c0-1.79-.59-3.44-1.59-4.77l-1.42 1.41C17.63 10.65 18 11.79 18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.29 1.29-4.28 3.18-5.29.33-.18.46-.59.29-.92-.18-.33-.59-.46-.92-.29C5.99 7.86 4.5 10.28 4.5 13c0 4.14 3.36 7.5 7.5 7.5s7.5-3.36 7.5-7.5c0-2.08-.85-3.96-2.22-5.32l-1.42 1.41C16.89 10.16 17.5 11.52 17.5 13c0 3.03-2.47 5.5-5.5 5.5z" />
  </svg>
);

const ViralDistributionCard = React.forwardRef<HTMLDivElement, ViralDistributionCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      tiers,
      layout = "blocks",
      size = "md",
      headerIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(viralDistributionCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          {headerIcon || (
            <span className="text-accent-500 dark:text-[#D4A574]">
              <FireIcon />
            </span>
          )}
          <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
            {title}
          </h3>
        </div>

        {/* Distribution */}
        <ViralDistribution tiers={tiers} layout={layout} size={size} />

        {/* Children (e.g., high performers list) */}
        {children && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[rgba(248,232,216,0.08)]">
            {children}
          </div>
        )}
      </div>
    );
  }
);

ViralDistributionCard.displayName = "ViralDistributionCard";

// ============================================================================
// HIGH PERFORMER ITEM
// ============================================================================

export interface HighPerformerItem {
  multiplier: string;
  title: string;
  metric?: string | number;
}

interface HighPerformersListProps {
  title?: string;
  items: HighPerformerItem[];
  maxItems?: number;
}

const HighPerformersList: React.FC<HighPerformersListProps> = ({
  title = "Alto Desempenho",
  items,
  maxItems = 5,
}) => {
  const displayItems = items.slice(0, maxItems);

  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-700 dark:text-[#D4B8A8] flex items-center gap-2 mb-2">
        <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        {title} ({items.length})
      </h4>
      <div className="space-y-2">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-gray-50 dark:bg-[rgba(248,232,216,0.03)]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-1.5 py-0.5 rounded">
                {item.multiplier}
              </span>
              <span className="text-sm text-gray-700 dark:text-[#D4B8A8] truncate">
                {item.title}
              </span>
            </div>
            {item.metric && (
              <span className="text-xs text-gray-400 dark:text-[#7A5A4A] tabular-nums shrink-0 ml-2">
                {typeof item.metric === "number"
                  ? item.metric >= 1000
                    ? `${(item.metric / 1000).toFixed(1)}K`
                    : item.metric
                  : item.metric}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// PRESETS
// ============================================================================

/**
 * Create default viral distribution tiers
 */
export function createViralTiers(
  viral: number,
  high: number,
  normal: number
): ViralTier[] {
  return [
    { label: "Viral", percentage: viral, multiplier: "3x+", type: "viral" },
    { label: "Alto", percentage: high, multiplier: "2x+", type: "high" },
    { label: "Normal", percentage: normal, type: "normal" },
  ];
}

/**
 * Create content performance tiers
 */
export function createPerformanceTiers(
  excellent: number,
  good: number,
  average: number,
  low: number
): ViralTier[] {
  return [
    { label: "Excelente", percentage: excellent, type: "viral" },
    { label: "Bom", percentage: good, type: "high" },
    { label: "Médio", percentage: average, type: "normal" },
    { label: "Baixo", percentage: low, type: "low" },
  ];
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ViralDistribution,
  ViralDistributionCard,
  ViralDistributionBar,
  TierBlock,
  HighPerformersList,
  viralDistributionVariants,
  viralDistributionCardVariants,
  tierColors,
};

export type { ViralDistributionProps, ViralDistributionCardProps, HighPerformersListProps };
