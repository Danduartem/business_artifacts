import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// DASHBOARD KPI CARD COMPONENT
// Top-row metric cards with icon, value, and label
// ============================================================================

// ============================================================================
// ICONS
// ============================================================================

const icons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  trendUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  barChart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <line x1="12" y1="20" x2="12" y2="10" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="20" x2="18" y2="4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6" y1="20" x2="6" y2="16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export type KPIIconName = keyof typeof icons;

// ============================================================================
// UTILITIES
// ============================================================================

function formatValue(value: number, format: "number" | "percentage" | "compact" | "currency"): string {
  switch (format) {
    case "percentage":
      return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
    case "currency":
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    case "compact":
      if (value >= 1_000_000) return (value / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "M";
      if (value >= 1_000) return (value / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "K";
      return value.toLocaleString("pt-BR");
    default:
      return value.toLocaleString("pt-BR");
  }
}

// ============================================================================
// VARIANTS
// ============================================================================

const dashboardKPICardVariants = cva(
  [
    "relative rounded-xl",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white border border-gray-100",
          "dark:bg-[rgba(0,0,0,0.2)] dark:border-[rgba(248,232,216,0.08)]",
        ],
        elevated: [
          "bg-white shadow-lg",
          "dark:bg-[rgba(0,0,0,0.3)] dark:border dark:border-[rgba(248,232,216,0.05)]",
        ],
        gradient: [
          "bg-gradient-to-br from-white via-white to-accent-50/30",
          "border border-gray-100",
          "dark:from-[rgba(0,0,0,0.2)] dark:via-[rgba(0,0,0,0.2)] dark:to-[rgba(161,82,60,0.1)]",
          "dark:border-[rgba(248,232,216,0.08)]",
        ],
        accent: [
          "bg-gradient-to-br from-accent-500 to-accent-600",
          "text-white",
          "dark:from-[#A1523C] dark:to-[#7A1307]",
        ],
        flat: "bg-transparent border border-gray-200 dark:border-[rgba(248,232,216,0.1)]",
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

// ============================================================================
// COMPONENT
// ============================================================================

export interface DashboardKPICardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardKPICardVariants> {
  /** Card title */
  title: string;
  /** KPI value */
  value: number | string;
  /** Subtitle/description below value */
  subtitle?: string;
  /** Icon name or custom React node */
  icon?: KPIIconName | React.ReactNode;
  /** Value format */
  format?: "number" | "percentage" | "compact" | "currency" | "raw";
  /** Change from previous period */
  change?: {
    value: number;
    direction: "up" | "down" | "neutral";
    label?: string;
  };
  /** Whether increase is positive (default true) */
  increaseIsPositive?: boolean;
  /** Icon position */
  iconPosition?: "top-right" | "left" | "none";
  /** Loading state */
  loading?: boolean;
}

const DashboardKPICard = React.forwardRef<HTMLDivElement, DashboardKPICardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      value,
      subtitle,
      icon,
      format = "number",
      change,
      increaseIsPositive = true,
      iconPosition = "top-right",
      loading = false,
      ...props
    },
    ref
  ) => {
    const isAccent = variant === "accent";

    // Format display value
    const displayValue =
      typeof value === "string" || format === "raw"
        ? value
        : formatValue(value as number, format);

    // Get icon content
    const iconContent =
      typeof icon === "string" && icon in icons
        ? icons[icon as KPIIconName]
        : icon;

    // Determine change color
    const isPositiveChange =
      change?.direction === "up" ? increaseIsPositive : !increaseIsPositive;
    const changeColorClass = !change
      ? ""
      : change.direction === "neutral"
      ? "text-gray-400 dark:text-[#7A5A4A]"
      : isPositiveChange
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-rose-500 dark:text-rose-400";

    return (
      <div
        ref={ref}
        className={cn(dashboardKPICardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Icon (top-right position) */}
        {iconPosition === "top-right" && iconContent && (
          <div
            className={cn(
              "absolute top-4 right-4 w-5 h-5",
              isAccent ? "text-white/60" : "text-gray-400 dark:text-[#7A5A4A]"
            )}
          >
            {iconContent}
          </div>
        )}

        {/* Content */}
        <div className={cn(iconPosition === "left" && "flex items-start gap-4")}>
          {/* Icon (left position) */}
          {iconPosition === "left" && iconContent && (
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                isAccent
                  ? "bg-white/20"
                  : "bg-accent-50 dark:bg-[rgba(161,82,60,0.2)]"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6",
                  isAccent ? "text-white" : "text-accent-500 dark:text-[#D4A574]"
                )}
              >
                {iconContent}
              </div>
            </div>
          )}

          <div>
            {/* Title */}
            <p
              className={cn(
                "text-sm font-medium mb-1",
                isAccent ? "text-white/80" : "text-gray-500 dark:text-[#A89080]"
              )}
            >
              {title}
            </p>

            {/* Value */}
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 dark:bg-[rgba(248,232,216,0.1)] rounded animate-pulse" />
            ) : (
              <p
                className={cn(
                  "text-2xl font-bold tabular-nums",
                  isAccent ? "text-white" : "text-gray-900 dark:text-[#F8E8D8]"
                )}
              >
                {displayValue}
              </p>
            )}

            {/* Subtitle */}
            {subtitle && (
              <p
                className={cn(
                  "text-xs mt-1",
                  isAccent ? "text-white/70" : "text-gray-400 dark:text-[#7A5A4A]"
                )}
              >
                {subtitle}
              </p>
            )}

            {/* Change indicator */}
            {change && (
              <div className="flex items-center gap-1 mt-2">
                <span className={cn("text-xs font-medium", changeColorClass)}>
                  {change.direction === "up" ? "+" : change.direction === "down" ? "-" : ""}
                  {Math.abs(change.value).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
                </span>
                {change.label && (
                  <span
                    className={cn(
                      "text-xs",
                      isAccent ? "text-white/50" : "text-gray-400 dark:text-[#7A5A4A]"
                    )}
                  >
                    {change.label}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DashboardKPICard.displayName = "DashboardKPICard";

// ============================================================================
// KPI GRID
// ============================================================================

interface DashboardKPIGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const gridColumns = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gridGaps = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

const DashboardKPIGrid = React.forwardRef<HTMLDivElement, DashboardKPIGridProps>(
  ({ className, columns = 4, gap = "md", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid", gridColumns[columns], gridGaps[gap], className)}
      {...props}
    >
      {children}
    </div>
  )
);

DashboardKPIGrid.displayName = "DashboardKPIGrid";

// ============================================================================
// PRESETS
// ============================================================================

export const kpiPresets = {
  totalContas: {
    title: "Total Contas",
    icon: "instagram" as KPIIconName,
    format: "number" as const,
  },
  totalSeguidores: {
    title: "Total Seguidores",
    icon: "users" as KPIIconName,
    format: "compact" as const,
  },
  scoreMedio: {
    title: "Score Médio",
    icon: "trendUp" as KPIIconName,
    format: "number" as const,
  },
  engajamentoMedio: {
    title: "Engajamento Médio",
    icon: "barChart" as KPIIconName,
    format: "percentage" as const,
  },
  alcance: {
    title: "Alcance",
    icon: "eye" as KPIIconName,
    format: "compact" as const,
  },
  impressoes: {
    title: "Impressões",
    icon: "target" as KPIIconName,
    format: "compact" as const,
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  DashboardKPICard,
  DashboardKPIGrid,
  dashboardKPICardVariants,
  icons as kpiIcons,
  formatValue,
};

export type { DashboardKPICardProps, DashboardKPIGridProps };
