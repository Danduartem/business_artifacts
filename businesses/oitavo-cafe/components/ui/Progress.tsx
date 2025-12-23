import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const progressVariants = cva(
  // Base styles - the track
  [
    "relative",
    "w-full",
    "overflow-hidden",
    "rounded-full",
  ],
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
      variant: {
        default: [
          "bg-gray-200",
          "dark:bg-[rgba(248,232,216,0.1)]",
        ],
        accent: [
          "bg-accent-100",
          "dark:bg-[rgba(161,82,60,0.2)]",
        ],
        neutral: [
          "bg-neutral-200",
          "dark:bg-[rgba(248,232,216,0.08)]",
        ],
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const progressFillVariants = cva(
  // Base styles - the fill
  [
    "h-full",
    "rounded-full",
    "transition-all duration-500 ease-out",
  ],
  {
    variants: {
      color: {
        primary: "bg-primary-600 dark:bg-[#7A1307]",
        secondary: "bg-secondary-600 dark:bg-[#A1523C]",
        accent: "bg-accent-500 dark:bg-[#A1523C]",
        success: "bg-success-500 dark:bg-[#6ABF6A]",
        warning: "bg-warning-500 dark:bg-[#FFB74D]",
        error: "bg-error-500 dark:bg-[#E57373]",
        gradient: [
          "bg-gradient-to-r",
          "from-accent-400 via-accent-500 to-accent-600",
          "dark:from-[#7A1307] dark:via-[#A1523C] dark:to-[#D4A574]",
        ],
      },
      animated: {
        true: [
          "relative overflow-hidden",
          "after:absolute after:inset-0",
          "after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
          "after:animate-[shimmer_2s_infinite]",
        ],
        false: "",
      },
    },
    defaultVariants: {
      color: "accent",
      animated: false,
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Color of the progress fill */
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "gradient";
  /** Show shimmer animation */
  animated?: boolean;
  /** Show value label */
  showLabel?: boolean;
  /** Custom label format */
  formatLabel?: (value: number, max: number) => string;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * Progress bar component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Progress value={60} />
 *
 * // With label
 * <Progress value={75} showLabel />
 *
 * // Different colors
 * <Progress value={90} color="success" />
 * <Progress value={30} color="warning" />
 *
 * // Animated
 * <Progress value={50} animated />
 *
 * // Custom size
 * <Progress value={80} size="lg" />
 *
 * // Gradient style
 * <Progress value={65} color="gradient" size="lg" />
 * ```
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      size,
      variant,
      color = "accent",
      animated = false,
      showLabel = false,
      formatLabel,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    // Clamp value between 0 and max
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Format label
    const label = formatLabel
      ? formatLabel(value, max)
      : `${Math.round(percentage)}%`;

    return (
      <div className="w-full">
        {showLabel && (
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-gray-700 dark:text-[#D4B8A8]">
              Progresso
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
              {label}
            </span>
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel || `Progress: ${label}`}
          className={cn(progressVariants({ size, variant }), className)}
          {...props}
        >
          <div
            className={cn(progressFillVariants({ color, animated }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

/**
 * CircularProgress - Circular/radial progress indicator
 *
 * @example
 * ```tsx
 * <CircularProgress value={75} />
 * <CircularProgress value={90} size="lg" showLabel />
 * ```
 */
export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value: number;
  /** Size of the circle */
  size?: "sm" | "md" | "lg" | "xl";
  /** Stroke width */
  strokeWidth?: number;
  /** Color */
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  /** Show percentage label in center */
  showLabel?: boolean;
  /** Custom label */
  label?: React.ReactNode;
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      className,
      value,
      size = "md",
      strokeWidth,
      color = "accent",
      showLabel = false,
      label,
      ...props
    },
    ref
  ) => {
    // Size configurations
    const sizeConfig = {
      sm: { dimension: 40, stroke: strokeWidth || 4, fontSize: "text-xs" },
      md: { dimension: 56, stroke: strokeWidth || 5, fontSize: "text-sm" },
      lg: { dimension: 80, stroke: strokeWidth || 6, fontSize: "text-base" },
      xl: { dimension: 120, stroke: strokeWidth || 8, fontSize: "text-xl" },
    };

    const config = sizeConfig[size];
    const radius = (config.dimension - config.stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max(value, 0), 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Color mapping
    const colorClasses = {
      primary: "stroke-primary-600 dark:stroke-[#7A1307]",
      secondary: "stroke-secondary-600 dark:stroke-[#A1523C]",
      accent: "stroke-accent-500 dark:stroke-[#A1523C]",
      success: "stroke-success-500 dark:stroke-[#6ABF6A]",
      warning: "stroke-warning-500 dark:stroke-[#FFB74D]",
      error: "stroke-error-500 dark:stroke-[#E57373]",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: config.dimension, height: config.dimension }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <svg
          className="transform -rotate-90"
          width={config.dimension}
          height={config.dimension}
        >
          {/* Background circle */}
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            strokeWidth={config.stroke}
            className="stroke-gray-200 dark:stroke-[rgba(248,232,216,0.1)]"
          />
          {/* Progress circle */}
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              colorClasses[color],
              "transition-[stroke-dashoffset] duration-500 ease-out"
            )}
          />
        </svg>

        {/* Center label */}
        {(showLabel || label) && (
          <div className="absolute inset-0 flex items-center justify-center">
            {label || (
              <span
                className={cn(
                  "font-bold text-gray-900 dark:text-[#F8E8D8]",
                  config.fontSize
                )}
              >
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

/**
 * FunnelProgress - Funnel visualization for conversion tracking
 *
 * @example
 * ```tsx
 * <FunnelProgress
 *   steps={[
 *     { label: "Visitantes", value: 1000 },
 *     { label: "Leads", value: 250 },
 *     { label: "Conversas", value: 80 },
 *     { label: "Vendas", value: 25 },
 *   ]}
 * />
 * ```
 */
export interface FunnelStep {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: FunnelStep[];
  showConversion?: boolean;
}

const FunnelProgress = React.forwardRef<HTMLDivElement, FunnelProgressProps>(
  ({ className, steps, showConversion = true, ...props }, ref) => {
    const maxValue = Math.max(...steps.map((s) => s.value));

    return (
      <div
        ref={ref}
        className={cn("space-y-3", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const percentage = (step.value / maxValue) * 100;
          const prevStep = steps[index - 1];
          const conversionRate = prevStep
            ? ((step.value / prevStep.value) * 100).toFixed(1)
            : null;

          return (
            <div key={step.label}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-[#D4B8A8]">
                  {step.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-[#F8E8D8]">
                    {step.value.toLocaleString()}
                  </span>
                  {showConversion && conversionRate && (
                    <span className="text-xs text-gray-500 dark:text-[#7A5A4A]">
                      ({conversionRate}%)
                    </span>
                  )}
                </div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-[rgba(248,232,216,0.1)] rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    "bg-gradient-to-r from-accent-400 to-accent-600",
                    "dark:from-[#7A1307] dark:to-[#A1523C]"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

FunnelProgress.displayName = "FunnelProgress";

export { Progress, CircularProgress, FunnelProgress, progressVariants };
