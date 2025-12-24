import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// ICONS - Built-in SVG icons matching Wake's style
// ============================================================================

const icons = {
  // Content type icons (header)
  reels: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  posts: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
    </svg>
  ),
  stories: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),

  // Metric icons
  likes: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  comments: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M21 6h-2V4c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2v4l4-4h6l4-4h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 6h-3l-2 2H8l-2-2H3V4h14v8z" />
    </svg>
  ),
  saves: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  ),
  views: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  ),
  impressions: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  ),
  reach: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
    </svg>
  ),
  engagement: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M7 14l5-5 5 5H7z" />
      <path d="M5 18h14v2H5v-2z" />
    </svg>
  ),
  replies: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
    </svg>
  ),
  tapsBack: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </svg>
  ),
  tapsForward: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  ),
  followers: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  shares: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  ),
  plays: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
};

type IconName = keyof typeof icons;

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format number with Brazilian locale (dots for thousands)
 * @example formatNumber(21268) => "21.268"
 * @example formatNumber(0.0155, true) => "1,55%"
 */
export function formatMetricValue(
  value: number,
  options?: {
    type?: "number" | "percentage" | "compact";
    decimals?: number;
  }
): string {
  const { type = "number", decimals } = options || {};

  if (type === "percentage") {
    const pct = value < 1 ? value * 100 : value;
    return `${pct.toFixed(decimals ?? 2).replace(".", ",")}%`;
  }

  if (type === "compact" && value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(".", ",")}M`;
  }

  if (type === "compact" && value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(".", ",")}K`;
  }

  // Brazilian format: dots for thousands
  return value.toLocaleString("pt-BR");
}

// ============================================================================
// METRIC ICON COMPONENT
// ============================================================================

interface MetricIconProps {
  icon: IconName | React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "accent" | "muted";
  className?: string;
}

const metricIconVariants = cva(
  "inline-flex items-center justify-center rounded-full flex-shrink-0",
  {
    variants: {
      size: {
        sm: "w-5 h-5 p-1",
        md: "w-6 h-6 p-1.5",
        lg: "w-8 h-8 p-2",
      },
      variant: {
        default: [
          "bg-accent-500 text-white",
          "dark:bg-[#A1523C] dark:text-white",
        ],
        accent: [
          "bg-primary-600 text-white",
          "dark:bg-[#7A1307] dark:text-white",
        ],
        muted: [
          "bg-gray-200 text-gray-600",
          "dark:bg-[rgba(248,232,216,0.1)] dark:text-[#D4B8A8]",
        ],
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const MetricIcon = React.forwardRef<HTMLSpanElement, MetricIconProps>(
  ({ icon, size, variant, className }, ref) => {
    const iconContent = typeof icon === "string" && icon in icons
      ? icons[icon as IconName]
      : icon;

    return (
      <span
        ref={ref}
        className={cn(metricIconVariants({ size, variant }), className)}
      >
        {iconContent}
      </span>
    );
  }
);

MetricIcon.displayName = "MetricIcon";

// ============================================================================
// METRIC ROW COMPONENT
// ============================================================================

export interface Metric {
  /** Icon name or custom React node */
  icon: IconName | React.ReactNode;
  /** Metric value (number or pre-formatted string) */
  value: number | string;
  /** Metric label */
  label: string;
  /** Value type for formatting */
  type?: "number" | "percentage" | "compact" | "raw";
  /** Decimal places for percentages */
  decimals?: number;
}

interface MetricRowProps extends Metric {
  iconVariant?: "default" | "accent" | "muted";
  className?: string;
}

const MetricRow = React.forwardRef<HTMLDivElement, MetricRowProps>(
  ({ icon, value, label, type = "number", decimals, iconVariant, className }, ref) => {
    const formattedValue =
      typeof value === "string" || type === "raw"
        ? value
        : formatMetricValue(value, { type, decimals });

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2.5 py-1.5",
          className
        )}
      >
        <MetricIcon icon={icon} size="sm" variant={iconVariant} />
        <span className="font-semibold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
          {formattedValue}
        </span>
        <span className="text-gray-600 dark:text-[#A89080]">
          {label}
        </span>
      </div>
    );
  }
);

MetricRow.displayName = "MetricRow";

// ============================================================================
// METRIC COLUMN VARIANTS
// ============================================================================

const metricColumnVariants = cva(
  [
    "flex flex-col",
    "bg-white dark:bg-[rgba(0,0,0,0.2)]",
    "rounded-xl",
    "text-sm",
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
        flat: [
          "border-none shadow-none",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

// ============================================================================
// METRIC COLUMN HEADER
// ============================================================================

interface MetricColumnHeaderProps {
  /** Header icon */
  icon: IconName | React.ReactNode;
  /** Count/total number */
  count: number;
  /** Label (e.g., "Reels", "Posts", "Stories") */
  label: string;
  /** Icon color variant */
  iconVariant?: "default" | "accent" | "muted";
  className?: string;
}

const MetricColumnHeader = React.forwardRef<HTMLDivElement, MetricColumnHeaderProps>(
  ({ icon, count, label, iconVariant = "default", className }, ref) => {
    const iconContent = typeof icon === "string" && icon in icons
      ? icons[icon as IconName]
      : icon;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center text-center pb-4 mb-3",
          "border-b border-gray-100 dark:border-[rgba(248,232,216,0.08)]",
          className
        )}
      >
        {/* Header Icon */}
        <span
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center mb-2",
            iconVariant === "default" && "bg-accent-500 text-white dark:bg-[#A1523C]",
            iconVariant === "accent" && "bg-primary-600 text-white dark:bg-[#7A1307]",
            iconVariant === "muted" && "bg-gray-200 text-gray-600 dark:bg-[rgba(248,232,216,0.1)] dark:text-[#D4B8A8]"
          )}
        >
          <span className="w-5 h-5">{iconContent}</span>
        </span>

        {/* Count */}
        <span className="text-2xl font-bold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
          {count.toLocaleString("pt-BR")}
        </span>

        {/* Label */}
        <span className="text-gray-500 dark:text-[#A89080] text-sm">
          {label}
        </span>
      </div>
    );
  }
);

MetricColumnHeader.displayName = "MetricColumnHeader";

// ============================================================================
// METRIC COLUMN FOOTER
// ============================================================================

interface MetricColumnFooterProps {
  children: React.ReactNode;
  className?: string;
}

const MetricColumnFooter = React.forwardRef<HTMLDivElement, MetricColumnFooterProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-auto pt-3 border-t border-gray-100 dark:border-[rgba(248,232,216,0.08)]",
        "text-xs text-gray-400 dark:text-[#7A5A4A] text-center",
        className
      )}
    >
      {children}
    </div>
  )
);

MetricColumnFooter.displayName = "MetricColumnFooter";

// ============================================================================
// MAIN METRIC COLUMN COMPONENT
// ============================================================================

export interface MetricColumnProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricColumnVariants> {
  /** Header icon */
  icon: IconName | React.ReactNode;
  /** Header count */
  count: number;
  /** Header label */
  label: string;
  /** Array of metrics to display */
  metrics: Metric[];
  /** Time period text for footer */
  period?: string;
  /** Icon color variant */
  iconVariant?: "default" | "accent" | "muted";
}

/**
 * MetricColumn - Instagram analytics style metric display
 *
 * @example
 * ```tsx
 * <MetricColumn
 *   icon="reels"
 *   count={65}
 *   label="Reels"
 *   metrics={[
 *     { icon: "likes", value: 1266, label: "Curtidas" },
 *     { icon: "comments", value: 225, label: "Comentários" },
 *     { icon: "saves", value: 62, label: "Salvos" },
 *     { icon: "views", value: 56064, label: "Visualizações" },
 *     { icon: "reach", value: 3.15, label: "Alcance", type: "percentage" },
 *     { icon: "engagement", value: 8.14, label: "Engajamento", type: "percentage" },
 *   ]}
 *   period="Dados dos últimos 90 dias"
 * />
 * ```
 */
const MetricColumn = React.forwardRef<HTMLDivElement, MetricColumnProps>(
  (
    {
      className,
      variant,
      padding,
      icon,
      count,
      label,
      metrics,
      period,
      iconVariant = "default",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(metricColumnVariants({ variant, padding }), className)}
        {...props}
      >
        <MetricColumnHeader
          icon={icon}
          count={count}
          label={label}
          iconVariant={iconVariant}
        />

        <div className="flex-1 space-y-0.5">
          {metrics.map((metric, index) => (
            <MetricRow
              key={`${metric.label}-${index}`}
              {...metric}
              iconVariant={iconVariant}
            />
          ))}
        </div>

        {period && (
          <MetricColumnFooter>
            {period}
          </MetricColumnFooter>
        )}
      </div>
    );
  }
);

MetricColumn.displayName = "MetricColumn";

// ============================================================================
// METRIC COLUMN GROUP - For laying out multiple columns
// ============================================================================

interface MetricColumnGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns in grid */
  columns?: 2 | 3 | 4;
  /** Gap between columns */
  gap?: "sm" | "md" | "lg";
}

const MetricColumnGroup = React.forwardRef<HTMLDivElement, MetricColumnGroupProps>(
  ({ className, columns = 3, gap = "md", children, ...props }, ref) => {
    const gridCols = {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    const gapSizes = {
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", gridCols[columns], gapSizes[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MetricColumnGroup.displayName = "MetricColumnGroup";

// ============================================================================
// PRESET CONFIGURATIONS - Common Instagram metrics
// ============================================================================

export const instagramMetricPresets = {
  reels: {
    icon: "reels" as IconName,
    label: "Reels",
    metrics: [
      { icon: "likes" as IconName, label: "Curtidas" },
      { icon: "comments" as IconName, label: "Comentários" },
      { icon: "saves" as IconName, label: "Salvos" },
      { icon: "views" as IconName, label: "Visualizações" },
      { icon: "reach" as IconName, label: "Alcance", type: "percentage" as const },
      { icon: "engagement" as IconName, label: "Engajamento", type: "percentage" as const },
    ],
  },
  posts: {
    icon: "posts" as IconName,
    label: "Posts",
    metrics: [
      { icon: "likes" as IconName, label: "Curtidas" },
      { icon: "comments" as IconName, label: "Comentários" },
      { icon: "saves" as IconName, label: "Salvos" },
      { icon: "impressions" as IconName, label: "Impressões" },
      { icon: "reach" as IconName, label: "Alcance", type: "percentage" as const },
      { icon: "engagement" as IconName, label: "Engajamento", type: "percentage" as const },
    ],
  },
  stories: {
    icon: "stories" as IconName,
    label: "Stories",
    metrics: [
      { icon: "replies" as IconName, label: "Replies" },
      { icon: "tapsBack" as IconName, label: "Taps back" },
      { icon: "impressions" as IconName, label: "Impressões" },
      { icon: "reach" as IconName, label: "Alcance", type: "percentage" as const },
      { icon: "engagement" as IconName, label: "Engajamento", type: "percentage" as const },
    ],
  },
};

/**
 * Create a MetricColumn with Instagram preset
 * @example
 * const reelsData = createInstagramMetrics("reels", 65, {
 *   curtidas: 1266,
 *   comentarios: 225,
 *   salvos: 62,
 *   visualizacoes: 56064,
 *   alcance: 3.15,
 *   engajamento: 8.14,
 * });
 */
export function createInstagramMetrics(
  type: "reels" | "posts" | "stories",
  count: number,
  values: {
    curtidas?: number;
    comentarios?: number;
    salvos?: number;
    visualizacoes?: number;
    impressoes?: number;
    alcance?: number;
    engajamento?: number;
    replies?: number;
    tapsBack?: number;
  }
): MetricColumnProps {
  const preset = instagramMetricPresets[type];

  const valueMap: Record<string, number | undefined> = {
    Curtidas: values.curtidas,
    Comentários: values.comentarios,
    Salvos: values.salvos,
    Visualizações: values.visualizacoes,
    Impressões: values.impressoes,
    Alcance: values.alcance,
    Engajamento: values.engajamento,
    Replies: values.replies,
    "Taps back": values.tapsBack,
  };

  return {
    icon: preset.icon,
    count,
    label: preset.label,
    metrics: preset.metrics
      .filter((m) => valueMap[m.label] !== undefined)
      .map((m) => ({
        ...m,
        value: valueMap[m.label]!,
      })),
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  MetricColumn,
  MetricColumnHeader,
  MetricColumnFooter,
  MetricColumnGroup,
  MetricIcon,
  MetricRow,
  metricColumnVariants,
  icons as metricIcons,
};

export type { MetricColumnProps, MetricColumnHeaderProps, MetricColumnFooterProps, MetricIconProps, MetricRowProps };
