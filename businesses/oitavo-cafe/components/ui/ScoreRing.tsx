import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import { GradeBadge, scoreToGrade, type GradeLevel } from "./GradeBadge";

// ============================================================================
// SCORE RING COMPONENT
// A beautiful circular gauge for displaying scores (0-100)
// Uses warm brand colors with gradient and glow effects
// ============================================================================

// ============================================================================
// COLOR SYSTEM
// ============================================================================

/**
 * Score-based color scheme using warm Oitavo Café palette
 * Colors transition from deep burgundy (critical) to emerald (excellent)
 */
const scoreColors = {
  critical: {
    stroke: "url(#gradient-critical)",
    bg: "rgba(225, 29, 72, 0.1)",
    glow: "drop-shadow(0 0 12px rgba(225, 29, 72, 0.4))",
    text: "text-rose-600 dark:text-rose-400",
    hex: "#E11D48",
    hexEnd: "#FB7185",
  },
  warning: {
    stroke: "url(#gradient-warning)",
    bg: "rgba(245, 158, 11, 0.1)",
    glow: "drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))",
    text: "text-amber-600 dark:text-amber-400",
    hex: "#F59E0B",
    hexEnd: "#FBBF24",
  },
  attention: {
    stroke: "url(#gradient-attention)",
    bg: "rgba(249, 115, 22, 0.1)",
    glow: "drop-shadow(0 0 12px rgba(249, 115, 22, 0.4))",
    text: "text-orange-600 dark:text-orange-400",
    hex: "#F97316",
    hexEnd: "#FB923C",
  },
  good: {
    stroke: "url(#gradient-good)",
    bg: "rgba(20, 184, 166, 0.1)",
    glow: "drop-shadow(0 0 12px rgba(20, 184, 166, 0.4))",
    text: "text-teal-600 dark:text-teal-400",
    hex: "#14B8A6",
    hexEnd: "#2DD4BF",
  },
  excellent: {
    stroke: "url(#gradient-excellent)",
    bg: "rgba(16, 185, 129, 0.1)",
    glow: "drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))",
    text: "text-emerald-600 dark:text-emerald-400",
    hex: "#10B981",
    hexEnd: "#34D399",
  },
  // Brand accent for neutral/branded displays
  brand: {
    stroke: "url(#gradient-brand)",
    bg: "rgba(161, 82, 60, 0.1)",
    glow: "drop-shadow(0 0 12px rgba(161, 82, 60, 0.4))",
    text: "text-accent-600 dark:text-[#D4A574]",
    hex: "#A1523C",
    hexEnd: "#D49D94",
  },
};

type ScoreColorKey = keyof typeof scoreColors;

/**
 * Get color key based on score value
 */
function getColorFromScore(score: number): ScoreColorKey {
  if (score >= 80) return "excellent";
  if (score >= 65) return "good";
  if (score >= 50) return "attention";
  if (score >= 35) return "warning";
  return "critical";
}

// ============================================================================
// VARIANTS
// ============================================================================

const scoreRingVariants = cva(
  "relative inline-flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-24 h-24",
        md: "w-32 h-32",
        lg: "w-40 h-40",
        xl: "w-48 h-48",
        "2xl": "w-56 h-56",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

// ============================================================================
// GRADIENT DEFS
// ============================================================================

const GradientDefs: React.FC = () => (
  <defs>
    <linearGradient id="gradient-critical" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#E11D48" />
      <stop offset="100%" stopColor="#FB7185" />
    </linearGradient>
    <linearGradient id="gradient-warning" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F59E0B" />
      <stop offset="100%" stopColor="#FBBF24" />
    </linearGradient>
    <linearGradient id="gradient-attention" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F97316" />
      <stop offset="100%" stopColor="#FB923C" />
    </linearGradient>
    <linearGradient id="gradient-good" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#14B8A6" />
      <stop offset="100%" stopColor="#2DD4BF" />
    </linearGradient>
    <linearGradient id="gradient-excellent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#10B981" />
      <stop offset="100%" stopColor="#34D399" />
    </linearGradient>
    <linearGradient id="gradient-brand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#A1523C" />
      <stop offset="100%" stopColor="#D49D94" />
    </linearGradient>
    {/* Track gradient (subtle) */}
    <linearGradient id="gradient-track" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="rgba(248, 232, 216, 0.15)" />
      <stop offset="100%" stopColor="rgba(248, 232, 216, 0.05)" />
    </linearGradient>
  </defs>
);

// ============================================================================
// COMPONENT
// ============================================================================

export interface ScoreRingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof scoreRingVariants> {
  /** Score value (0-100) */
  score: number;
  /** Maximum score (default 100) */
  maxScore?: number;
  /** Show score value in center */
  showValue?: boolean;
  /** Show "de X" label below score */
  showMax?: boolean;
  /** Show grade badge below ring */
  showGrade?: boolean;
  /** Custom label in center */
  label?: string;
  /** Subtitle below score */
  subtitle?: string;
  /** Ring thickness (2-20) */
  strokeWidth?: number;
  /** Force specific color (overrides score-based color) */
  color?: ScoreColorKey;
  /** Enable glow effect */
  glow?: boolean;
  /** Animation on mount */
  animated?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
}

const ScoreRing = React.forwardRef<HTMLDivElement, ScoreRingProps>(
  (
    {
      className,
      size,
      score,
      maxScore = 100,
      showValue = true,
      showMax = true,
      showGrade = false,
      label,
      subtitle,
      strokeWidth = 8,
      color,
      glow = true,
      animated = true,
      animationDuration = 1000,
      ...props
    },
    ref
  ) => {
    const [displayProgress, setDisplayProgress] = React.useState(animated ? 0 : (score / maxScore) * 100);
    const [isVisible, setIsVisible] = React.useState(!animated);

    // Clamp score
    const clampedScore = Math.min(Math.max(score, 0), maxScore);
    const percentage = (clampedScore / maxScore) * 100;

    // Determine color based on score or forced color
    const colorKey = color || getColorFromScore(percentage);
    const colors = scoreColors[colorKey];

    // SVG calculations
    const svgSize = 200;
    const center = svgSize / 2;
    const radius = (svgSize - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

    // Animation effect
    React.useEffect(() => {
      if (!animated) {
        setDisplayProgress(percentage);
        setIsVisible(true);
        return;
      }

      // Initial delay
      const showTimer = setTimeout(() => setIsVisible(true), 100);

      // Animate progress
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayProgress(eased * percentage);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const animTimer = setTimeout(() => {
        requestAnimationFrame(animate);
      }, 200);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(animTimer);
      };
    }, [animated, percentage, animationDuration]);

    // Get grade for badge
    const grade = scoreToGrade(percentage);

    // Size-based text scaling
    const textSizes = {
      sm: { value: "text-2xl", max: "text-xs", subtitle: "text-[10px]" },
      md: { value: "text-3xl", max: "text-sm", subtitle: "text-xs" },
      lg: { value: "text-4xl", max: "text-sm", subtitle: "text-xs" },
      xl: { value: "text-5xl", max: "text-base", subtitle: "text-sm" },
      "2xl": { value: "text-6xl", max: "text-lg", subtitle: "text-sm" },
    };

    const texts = textSizes[size || "lg"];

    return (
      <div
        ref={ref}
        className={cn(scoreRingVariants({ size }), "flex flex-col items-center", className)}
        {...props}
      >
        {/* Ring */}
        <div className="relative">
          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className={cn(
              "w-full h-full -rotate-90 transition-opacity duration-300",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={glow ? { filter: colors.glow } : undefined}
          >
            <GradientDefs />

            {/* Background track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="url(#gradient-track)"
              strokeWidth={strokeWidth}
              className="dark:stroke-[rgba(248,232,216,0.08)]"
            />

            {/* Progress arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={colors.stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300"
            />

            {/* End cap glow dot */}
            {displayProgress > 5 && (
              <circle
                cx={center + radius * Math.cos(((displayProgress / 100) * 360 - 90) * (Math.PI / 180))}
                cy={center + radius * Math.sin(((displayProgress / 100) * 360 - 90) * (Math.PI / 180))}
                r={strokeWidth / 2 + 2}
                fill={colors.hex}
                className="opacity-60"
              />
            )}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
            {showValue && (
              <>
                <span
                  className={cn(
                    texts.value,
                    "font-bold tabular-nums leading-none",
                    "text-gray-900 dark:text-[#F8E8D8]"
                  )}
                >
                  {Math.round(displayProgress)}
                </span>
                {showMax && (
                  <span
                    className={cn(
                      texts.max,
                      "text-gray-400 dark:text-[#7A5A4A] mt-0.5"
                    )}
                  >
                    de {maxScore}
                  </span>
                )}
              </>
            )}
            {label && !showValue && (
              <span className={cn(texts.value, "font-bold text-gray-900 dark:text-[#F8E8D8]")}>
                {label}
              </span>
            )}
          </div>
        </div>

        {/* Grade badge */}
        {showGrade && (
          <div className="mt-3 flex flex-col items-center gap-1">
            <GradeBadge grade={grade} size="md" variant="glow" />
            {subtitle && (
              <span className={cn(texts.subtitle, "text-gray-500 dark:text-[#A89080] text-center max-w-[120px]")}>
                {subtitle}
              </span>
            )}
          </div>
        )}

        {/* Subtitle without grade */}
        {!showGrade && subtitle && (
          <span className={cn(texts.subtitle, "mt-2 text-gray-500 dark:text-[#A89080] text-center")}>
            {subtitle}
          </span>
        )}
      </div>
    );
  }
);

ScoreRing.displayName = "ScoreRing";

// ============================================================================
// SCORE RING CARD
// ============================================================================

const scoreRingCardVariants = cva("rounded-2xl", {
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
      gradient: [
        "bg-gradient-to-br from-neutral-50 via-white to-accent-50",
        "border border-accent-100",
        "dark:from-[rgba(161,82,60,0.1)] dark:via-[rgba(0,0,0,0.2)] dark:to-[rgba(78,19,13,0.15)]",
        "dark:border-[rgba(161,82,60,0.2)]",
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

export interface ScoreRingCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scoreRingCardVariants>,
    Omit<ScoreRingProps, "className" | "ref"> {
  /** Card title */
  title?: string;
  /** Show info icon */
  showInfo?: boolean;
  /** Info click handler */
  onInfoClick?: () => void;
  /** Icon to show in header */
  headerIcon?: React.ReactNode;
  /** Footer content (e.g., follower count) */
  footer?: React.ReactNode;
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

const ScoreRingCard = React.forwardRef<HTMLDivElement, ScoreRingCardProps>(
  (
    {
      className,
      variant,
      padding,
      title = "Growth Score",
      showInfo = false,
      onInfoClick,
      headerIcon,
      footer,
      // ScoreRing props
      score,
      maxScore = 100,
      showValue = true,
      showMax = true,
      showGrade = true,
      label,
      subtitle,
      strokeWidth = 10,
      color,
      glow = true,
      animated = true,
      animationDuration,
      size = "lg",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(scoreRingCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {headerIcon && (
                <span className="text-accent-500 dark:text-[#A1523C]">{headerIcon}</span>
              )}
              <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
                {title}
              </h3>
            </div>
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
        )}

        {/* Ring */}
        <div className="flex justify-center">
          <ScoreRing
            score={score}
            maxScore={maxScore}
            showValue={showValue}
            showMax={showMax}
            showGrade={showGrade}
            label={label}
            subtitle={subtitle}
            strokeWidth={strokeWidth}
            color={color}
            glow={glow}
            animated={animated}
            animationDuration={animationDuration}
            size={size}
          />
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[rgba(248,232,216,0.08)] text-center">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

ScoreRingCard.displayName = "ScoreRingCard";

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ScoreRing,
  ScoreRingCard,
  scoreRingVariants,
  scoreRingCardVariants,
  scoreColors,
  getColorFromScore,
};

export type { ScoreColorKey };
