import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// GRADE BADGE COMPONENT
// Premium letter grades (A-F) with brand-aligned warm colors
// ============================================================================

/**
 * Grade color mapping using warm coffee-inspired tones
 * A = Rich emerald (growth), F = Deep burgundy (urgent)
 * All colors harmonize with Oitavo Café brand palette
 */
const gradeColors = {
  A: {
    bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    text: "text-white",
    ring: "ring-emerald-200 dark:ring-emerald-500/30",
    glow: "shadow-emerald-500/40",
    label: "Excelente",
  },
  B: {
    bg: "bg-gradient-to-br from-teal-500 to-teal-600",
    text: "text-white",
    ring: "ring-teal-200 dark:ring-teal-500/30",
    glow: "shadow-teal-500/40",
    label: "Bom",
  },
  C: {
    bg: "bg-gradient-to-br from-amber-400 to-amber-500",
    text: "text-amber-950",
    ring: "ring-amber-200 dark:ring-amber-500/30",
    glow: "shadow-amber-500/40",
    label: "Regular",
  },
  D: {
    bg: "bg-gradient-to-br from-orange-500 to-orange-600",
    text: "text-white",
    ring: "ring-orange-200 dark:ring-orange-500/30",
    glow: "shadow-orange-500/40",
    label: "Atenção",
  },
  F: {
    bg: "bg-gradient-to-br from-rose-500 to-rose-600",
    text: "text-white",
    ring: "ring-rose-200 dark:ring-rose-500/30",
    glow: "shadow-rose-500/40",
    label: "Crítico",
  },
} as const;

export type GradeLevel = keyof typeof gradeColors;

// ============================================================================
// VARIANTS
// ============================================================================

const gradeBadgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-display font-bold",
    "select-none",
    "transition-all duration-200",
  ],
  {
    variants: {
      size: {
        xs: "w-5 h-5 text-[10px]",
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
        xl: "w-12 h-12 text-lg",
        "2xl": "w-16 h-16 text-2xl",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-lg",
        square: "rounded-md",
      },
      variant: {
        solid: "",
        ring: "ring-2",
        glow: "shadow-lg",
        glossy: "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/30 before:to-transparent before:opacity-100 relative overflow-hidden",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      variant: "solid",
    },
  }
);

// ============================================================================
// COMPONENT
// ============================================================================

export interface GradeBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof gradeBadgeVariants> {
  /** Grade level (A, B, C, D, F) */
  grade: GradeLevel;
  /** Show label text instead of grade letter */
  showLabel?: boolean;
  /** Pulse animation for critical grades (D, F) */
  pulse?: boolean;
}

const GradeBadge = React.forwardRef<HTMLSpanElement, GradeBadgeProps>(
  (
    {
      className,
      grade,
      size,
      shape,
      variant = "solid",
      showLabel = false,
      pulse = false,
      ...props
    },
    ref
  ) => {
    const colors = gradeColors[grade];
    const shouldPulse = pulse && (grade === "D" || grade === "F");

    return (
      <span
        ref={ref}
        className={cn(
          gradeBadgeVariants({ size, shape, variant }),
          colors.bg,
          colors.text,
          variant === "ring" && colors.ring,
          variant === "glow" && colors.glow,
          shouldPulse && "animate-pulse",
          className
        )}
        title={colors.label}
        {...props}
      >
        <span className="relative z-10">
          {showLabel ? colors.label : grade}
        </span>
      </span>
    );
  }
);

GradeBadge.displayName = "GradeBadge";

// ============================================================================
// GRADE BADGE WITH LABEL
// ============================================================================

interface GradeBadgeWithLabelProps extends GradeBadgeProps {
  /** Custom label text */
  label?: string;
  /** Label position */
  labelPosition?: "right" | "bottom";
  /** Additional description text */
  description?: string;
}

const GradeBadgeWithLabel = React.forwardRef<HTMLDivElement, GradeBadgeWithLabelProps>(
  (
    {
      className,
      grade,
      size = "lg",
      shape,
      variant,
      label,
      labelPosition = "bottom",
      description,
      pulse,
      ...props
    },
    ref
  ) => {
    const colors = gradeColors[grade];
    const displayLabel = label || colors.label;

    const isHorizontal = labelPosition === "right";

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          isHorizontal ? "flex-row items-center gap-3" : "flex-col items-center gap-1.5",
          className
        )}
        {...props}
      >
        <GradeBadge
          grade={grade}
          size={size}
          shape={shape}
          variant={variant}
          pulse={pulse}
        />
        <div className={cn("text-center", isHorizontal && "text-left")}>
          <span className="block text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
            {displayLabel}
          </span>
          {description && (
            <span className="block text-xs text-gray-500 dark:text-[#A89080]">
              {description}
            </span>
          )}
        </div>
      </div>
    );
  }
);

GradeBadgeWithLabel.displayName = "GradeBadgeWithLabel";

// ============================================================================
// GRADE SCALE PREVIEW
// ============================================================================

interface GradeScalePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Highlighted grade */
  activeGrade?: GradeLevel;
  /** Badge size */
  size?: "xs" | "sm" | "md";
  /** Show labels */
  showLabels?: boolean;
}

const GradeScalePreview = React.forwardRef<HTMLDivElement, GradeScalePreviewProps>(
  ({ className, activeGrade, size = "sm", showLabels = false, ...props }, ref) => {
    const grades: GradeLevel[] = ["A", "B", "C", "D", "F"];

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {grades.map((grade) => (
          <div key={grade} className="flex flex-col items-center gap-0.5">
            <GradeBadge
              grade={grade}
              size={size}
              variant={activeGrade === grade ? "glow" : "solid"}
              className={cn(
                "transition-all duration-200",
                activeGrade && activeGrade !== grade && "opacity-40"
              )}
            />
            {showLabels && (
              <span className="text-[10px] text-gray-400 dark:text-[#7A5A4A]">
                {gradeColors[grade].label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
);

GradeScalePreview.displayName = "GradeScalePreview";

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Calculate grade from a score (0-100)
 */
export function scoreToGrade(score: number): GradeLevel {
  if (score >= 80) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  if (score >= 35) return "D";
  return "F";
}

/**
 * Get grade color info
 */
export function getGradeInfo(grade: GradeLevel) {
  return gradeColors[grade];
}

/**
 * Get all grades with their info
 */
export function getAllGrades() {
  return Object.entries(gradeColors).map(([grade, info]) => ({
    grade: grade as GradeLevel,
    ...info,
  }));
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  GradeBadge,
  GradeBadgeWithLabel,
  GradeScalePreview,
  gradeBadgeVariants,
  gradeColors,
};

export type {
  GradeBadgeProps,
  GradeBadgeWithLabelProps,
  GradeScalePreviewProps,
};
