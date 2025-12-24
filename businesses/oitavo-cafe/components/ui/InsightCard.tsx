import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// INSIGHT CARD COMPONENT
// Tips, recommendations, and actionable insights
// ============================================================================

// ============================================================================
// ICONS
// ============================================================================

const icons = {
  lightbulb: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </svg>
  ),
  trendUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  trendDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 18 23 18 23 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

export type InsightIconName = keyof typeof icons;

// ============================================================================
// INSIGHT TYPES
// ============================================================================

export type InsightType = "tip" | "positive" | "negative" | "warning" | "neutral" | "action";

const insightStyles: Record<InsightType, {
  bg: string;
  border: string;
  icon: string;
  text: string;
  iconDefault: InsightIconName;
}> = {
  tip: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/20",
    icon: "text-amber-500 dark:text-amber-400",
    text: "text-amber-800 dark:text-amber-200",
    iconDefault: "lightbulb",
  },
  positive: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
    icon: "text-emerald-500 dark:text-emerald-400",
    text: "text-emerald-800 dark:text-emerald-200",
    iconDefault: "trendUp",
  },
  negative: {
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/20",
    icon: "text-rose-500 dark:text-rose-400",
    text: "text-rose-800 dark:text-rose-200",
    iconDefault: "trendDown",
  },
  warning: {
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-200 dark:border-orange-500/20",
    icon: "text-orange-500 dark:text-orange-400",
    text: "text-orange-800 dark:text-orange-200",
    iconDefault: "alert",
  },
  neutral: {
    bg: "bg-gray-50 dark:bg-[rgba(248,232,216,0.05)]",
    border: "border-gray-200 dark:border-[rgba(248,232,216,0.1)]",
    icon: "text-gray-500 dark:text-[#A89080]",
    text: "text-gray-700 dark:text-[#D4B8A8]",
    iconDefault: "lightbulb",
  },
  action: {
    bg: "bg-accent-50 dark:bg-[rgba(161,82,60,0.1)]",
    border: "border-accent-200 dark:border-[rgba(161,82,60,0.3)]",
    icon: "text-accent-500 dark:text-[#D4A574]",
    text: "text-accent-800 dark:text-[#F8E8D8]",
    iconDefault: "zap",
  },
};

// ============================================================================
// VARIANTS
// ============================================================================

const insightCardVariants = cva(
  [
    "rounded-xl border",
    "transition-all duration-200",
  ],
  {
    variants: {
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
      },
      layout: {
        inline: "flex items-start gap-3",
        stacked: "flex flex-col gap-2",
      },
    },
    defaultVariants: {
      size: "md",
      layout: "inline",
    },
  }
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface InsightCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof insightCardVariants> {
  /** Insight type determines colors */
  type?: InsightType;
  /** Icon name or custom React node */
  icon?: InsightIconName | React.ReactNode;
  /** Main insight text */
  message: string;
  /** Optional title/header */
  title?: string;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Dismiss button */
  dismissable?: boolean;
  /** Dismiss handler */
  onDismiss?: () => void;
}

const InsightCard = React.forwardRef<HTMLDivElement, InsightCardProps>(
  (
    {
      className,
      size,
      layout,
      type = "tip",
      icon,
      message,
      title,
      action,
      dismissable = false,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const styles = insightStyles[type];

    // Get icon content
    const iconName = typeof icon === "string" ? icon : styles.iconDefault;
    const iconContent =
      typeof icon === "object" ? icon : icons[iconName as InsightIconName];

    return (
      <div
        ref={ref}
        className={cn(
          insightCardVariants({ size, layout }),
          styles.bg,
          styles.border,
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className={cn("w-5 h-5 shrink-0", styles.icon)}>
          {iconContent}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn("text-sm font-semibold mb-1", styles.text)}>
              {title}
            </h4>
          )}
          <p className={cn("text-sm", styles.text)}>{message}</p>

          {/* Action button */}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                "mt-2 text-sm font-medium underline underline-offset-2",
                "hover:no-underline transition-all",
                styles.icon
              )}
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Dismiss button */}
        {dismissable && (
          <button
            type="button"
            onClick={onDismiss}
            className={cn(
              "w-5 h-5 shrink-0 opacity-50 hover:opacity-100 transition-opacity",
              styles.icon
            )}
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

InsightCard.displayName = "InsightCard";

// ============================================================================
// INSIGHT LIST
// ============================================================================

interface InsightListProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const gapSizes = {
  sm: "space-y-2",
  md: "space-y-3",
  lg: "space-y-4",
};

const InsightList = React.forwardRef<HTMLDivElement, InsightListProps>(
  ({ className, gap = "md", children, ...props }, ref) => (
    <div ref={ref} className={cn(gapSizes[gap], className)} {...props}>
      {children}
    </div>
  )
);

InsightList.displayName = "InsightList";

// ============================================================================
// QUICK TIP (INLINE MINIMAL VERSION)
// ============================================================================

interface QuickTipProps {
  icon?: InsightIconName | React.ReactNode;
  message: string;
  type?: InsightType;
  className?: string;
}

const QuickTip: React.FC<QuickTipProps> = ({
  icon = "lightbulb",
  message,
  type = "tip",
  className,
}) => {
  const styles = insightStyles[type];
  const iconContent =
    typeof icon === "object" ? icon : icons[icon as InsightIconName];

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <span className={cn("w-4 h-4 shrink-0", styles.icon)}>{iconContent}</span>
      <span className={cn(styles.text)}>{message}</span>
    </div>
  );
};

// ============================================================================
// BEST/WORST COMPARISON INSIGHTS
// ============================================================================

export interface ComparisonInsightData {
  best: {
    label: string;
    value: string | number;
    change?: string;
  };
  worst: {
    label: string;
    value: string | number;
    change?: string;
  };
  tip?: string;
}

interface ComparisonInsightsProps {
  data: ComparisonInsightData;
  className?: string;
}

const ComparisonInsights: React.FC<ComparisonInsightsProps> = ({ data, className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-2 gap-3">
        {/* Best */}
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 p-3">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Melhor dia
          </span>
          <p className="text-lg font-bold text-gray-900 dark:text-[#F8E8D8]">
            {data.best.label}
          </p>
          {data.best.change && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              {data.best.change}
            </span>
          )}
        </div>

        {/* Worst */}
        <div className="rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-3">
          <span className="text-xs font-medium text-rose-600 dark:text-rose-400">
            Pior dia
          </span>
          <p className="text-lg font-bold text-gray-900 dark:text-[#F8E8D8]">
            {data.worst.label}
          </p>
          {data.worst.change && (
            <span className="text-xs text-rose-600 dark:text-rose-400">
              {data.worst.change}
            </span>
          )}
        </div>
      </div>

      {/* Tip */}
      {data.tip && <QuickTip message={data.tip} />}
    </div>
  );
};

// ============================================================================
// PRESETS
// ============================================================================

/**
 * Create best day insight
 */
export function createBestDayInsight(day: string, change: string): InsightCardProps {
  return {
    type: "positive",
    icon: "calendar",
    message: `Melhor desempenho ${day}. ${change} vs média. Considere postar mais nesse dia.`,
  };
}

/**
 * Create engagement tip
 */
export function createEngagementTip(rate: number): InsightCardProps {
  if (rate >= 5) {
    return {
      type: "positive",
      icon: "star",
      message: `Taxa de engajamento de ${rate.toFixed(2)}% está excelente! Continue assim.`,
    };
  }
  if (rate >= 3) {
    return {
      type: "tip",
      icon: "lightbulb",
      message: `Taxa de engajamento de ${rate.toFixed(2)}% é boa. Experimente CTAs mais fortes.`,
    };
  }
  return {
    type: "warning",
    icon: "alert",
    message: `Taxa de engajamento de ${rate.toFixed(2)}% precisa melhorar. Revise sua estratégia de conteúdo.`,
  };
}

/**
 * Create growth insight
 */
export function createGrowthInsight(currentScore: number): InsightCardProps {
  if (currentScore >= 65) {
    return {
      type: "positive",
      icon: "trendUp",
      message: `Growth Score de ${currentScore} indica crescimento saudável. Mantenha a consistência!`,
    };
  }
  if (currentScore >= 40) {
    return {
      type: "tip",
      icon: "target",
      message: `Growth Score de ${currentScore} tem espaço para melhoria. Foque em conteúdo de alta retenção.`,
    };
  }
  return {
    type: "negative",
    icon: "alert",
    message: `Growth Score de ${currentScore} precisa de atenção urgente. Revise sua estratégia.`,
    title: "Ação urgente",
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  InsightCard,
  InsightList,
  QuickTip,
  ComparisonInsights,
  insightCardVariants,
  insightStyles,
  icons as insightIcons,
};

export type { InsightCardProps, InsightListProps, QuickTipProps, ComparisonInsightsProps };
