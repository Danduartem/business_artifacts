import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// Trend arrow icons
const TrendUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3"
    aria-hidden="true"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3"
    aria-hidden="true"
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const statCardVariants = cva(
  // Base styles
  [
    "relative",
    "rounded-xl",
    "border",
    "transition-all duration-200 ease-out",
    "hover:-translate-y-0.5",
  ],
  {
    variants: {
      variant: {
        default: [
          // Light mode
          "bg-neutral-50 border-gray-200",
          "hover:border-gray-300 hover:shadow-md",
          // Dark mode
          "dark:bg-[rgba(0,0,0,0.3)] dark:border-[rgba(248,232,216,0.05)]",
          "dark:hover:bg-[rgba(0,0,0,0.4)] dark:hover:border-[rgba(248,232,216,0.1)]",
        ],
        highlight: [
          // Light mode - accent glow
          "bg-gradient-to-br from-accent-50 via-accent-100/50 to-neutral-50",
          "border-accent-300",
          "shadow-lg shadow-accent-500/20",
          "hover:shadow-xl hover:shadow-accent-500/30",
          // Dark mode - terracotta glow (Doppio style)
          "dark:from-[rgba(161,82,60,0.35)] dark:via-[rgba(161,82,60,0.2)] dark:to-[rgba(161,82,60,0.12)]",
          "dark:border-[rgba(161,82,60,0.4)]",
          "dark:shadow-[0_0_30px_rgba(161,82,60,0.2)]",
          "dark:hover:shadow-[0_0_40px_rgba(161,82,60,0.3)]",
        ],
        outline: [
          "bg-transparent border-gray-300",
          "hover:bg-neutral-50 hover:border-gray-400",
          "dark:border-[rgba(248,232,216,0.15)]",
          "dark:hover:bg-[rgba(0,0,0,0.2)] dark:hover:border-[rgba(248,232,216,0.25)]",
        ],
        ghost: [
          "bg-transparent border-transparent",
          "hover:bg-gray-50",
          "dark:hover:bg-[rgba(255,255,255,0.05)]",
        ],
      },
      size: {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const changeVariants = cva(
  // Base styles
  [
    "inline-flex items-center gap-1",
    "text-xs font-semibold",
    "mt-2",
  ],
  {
    variants: {
      type: {
        positive: "text-success-600 dark:text-[#6ABF6A]",
        negative: "text-error-600 dark:text-[#E57373]",
        neutral: "text-gray-500 dark:text-[#B89888]",
      },
    },
    defaultVariants: {
      type: "neutral",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** The metric label (e.g., "Leads", "Revenue", "ROI") */
  label: string;
  /** The main value to display */
  value: string | number;
  /** Optional change indicator (e.g., "+23%", "-5%", "Retorno") */
  change?: string;
  /** Type of change for color styling */
  changeType?: "positive" | "negative" | "neutral";
  /** Show trend arrow icon */
  showTrend?: boolean;
  /** Optional icon to display next to label */
  icon?: React.ReactNode;
  /** Optional description text below value */
  description?: string;
  /** Loading state - shows skeleton */
  loading?: boolean;
  /** Whether the card is interactive/clickable */
  interactive?: boolean;
}

/**
 * StatCard component for displaying metrics and KPIs
 *
 * @example
 * ```tsx
 * // Basic usage
 * <StatCard label="Leads" value="127" change="+23%" changeType="positive" />
 *
 * // Highlighted ROI card
 * <StatCard
 *   label="ROI"
 *   value="3.2x"
 *   change="Retorno"
 *   variant="highlight"
 * />
 *
 * // With icon
 * <StatCard
 *   label="Vendas"
 *   value="R$ 28k"
 *   change="+8%"
 *   changeType="positive"
 *   icon={<DollarIcon />}
 * />
 *
 * // Loading state
 * <StatCard label="Leads" value="0" loading />
 * ```
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      variant,
      size,
      label,
      value,
      change,
      changeType = "neutral",
      showTrend = true,
      icon,
      description,
      loading = false,
      interactive = false,
      ...props
    },
    ref
  ) => {
    // Determine trend icon based on changeType
    const TrendIcon =
      changeType === "positive"
        ? TrendUpIcon
        : changeType === "negative"
        ? TrendDownIcon
        : null;

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            statCardVariants({ variant, size }),
            "animate-pulse",
            className
          )}
          {...props}
        >
          {/* Label skeleton */}
          <div className="h-3 w-16 bg-gray-200 dark:bg-[rgba(248,232,216,0.1)] rounded mb-3" />
          {/* Value skeleton */}
          <div className="h-9 w-24 bg-gray-200 dark:bg-[rgba(248,232,216,0.1)] rounded mb-2" />
          {/* Change skeleton */}
          <div className="h-4 w-12 bg-gray-200 dark:bg-[rgba(248,232,216,0.1)] rounded" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          statCardVariants({ variant, size }),
          interactive && "cursor-pointer",
          className
        )}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {/* Label */}
        <div className="flex items-center gap-2 mb-2">
          {icon && (
            <span className="text-gray-500 dark:text-[#7A5A4A]">{icon}</span>
          )}
          <span
            className={cn(
              "text-[11px] font-bold uppercase tracking-[0.1em]",
              "text-gray-500 dark:text-[#7A5A4A]"
            )}
          >
            {label}
          </span>
        </div>

        {/* Value */}
        <div
          className={cn(
            "font-body text-4xl font-black tracking-tight",
            "text-gray-900 dark:text-[#F8E8D8]",
            variant === "highlight" && [
              "text-accent-700 dark:text-[#F8E8D8]",
              "dark:[text-shadow:0_0_25px_rgba(161,82,60,0.5)]",
            ]
          )}
        >
          {value}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-[#B89888] mt-1">
            {description}
          </p>
        )}

        {/* Change indicator */}
        {change && (
          <div className={cn(changeVariants({ type: changeType }))}>
            {showTrend && TrendIcon && <TrendIcon />}
            <span>{change}</span>
          </div>
        )}
      </div>
    );
  }
);

StatCard.displayName = "StatCard";

/**
 * StatCardGrid - Grid container for StatCards
 *
 * @example
 * ```tsx
 * <StatCardGrid>
 *   <StatCard label="Leads" value="127" />
 *   <StatCard label="Conversas" value="43" />
 *   <StatCard label="Vendas" value="12" />
 *   <StatCard label="ROI" value="3.2x" variant="highlight" />
 * </StatCardGrid>
 * ```
 */
const StatCardGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    /** Number of columns */
    columns?: 2 | 3 | 4;
  }
>(({ className, columns = 2, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid gap-4",
      columns === 2 && "grid-cols-1 sm:grid-cols-2",
      columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

StatCardGrid.displayName = "StatCardGrid";

/**
 * LiveBadge - Pulsing indicator for live/real-time data
 *
 * @example
 * ```tsx
 * <LiveBadge />
 * <LiveBadge status="syncing" />
 * ```
 */
const LiveBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    status?: "live" | "syncing" | "offline";
  }
>(({ className, status = "live", ...props }, ref) => {
  const statusConfig = {
    live: {
      color: "bg-success-500 dark:bg-[#6ABF6A]",
      glow: "shadow-success-500 dark:shadow-[#6ABF6A]",
      text: "Ao vivo",
      textColor: "text-success-600 dark:text-[#6ABF6A]",
    },
    syncing: {
      color: "bg-warning-500 dark:bg-[#FFB74D]",
      glow: "shadow-warning-500 dark:shadow-[#FFB74D]",
      text: "Atualizando",
      textColor: "text-warning-600 dark:text-[#FFB74D]",
    },
    offline: {
      color: "bg-gray-400 dark:bg-[#7A5A4A]",
      glow: "",
      text: "Offline",
      textColor: "text-gray-500 dark:text-[#7A5A4A]",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2",
        "px-3 py-1.5",
        "bg-success-50/80 dark:bg-[rgba(106,191,106,0.15)]",
        "rounded-full",
        "text-[11px] font-bold tracking-wide",
        config.textColor,
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          config.color,
          status !== "offline" && [
            "shadow-[0_0_10px]",
            config.glow,
            "animate-pulse",
          ]
        )}
      />
      {config.text}
    </span>
  );
});

LiveBadge.displayName = "LiveBadge";

export { StatCard, StatCardGrid, LiveBadge, statCardVariants };
