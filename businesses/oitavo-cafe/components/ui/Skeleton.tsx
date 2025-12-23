import * as React from "react";
import { cn } from "../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Shape variant */
  variant?: "text" | "circular" | "rectangular" | "rounded";
  /** Animation style */
  animation?: "pulse" | "wave" | "none";
}

/**
 * Skeleton loading placeholder
 *
 * @example
 * ```tsx
 * // Text skeleton
 * <Skeleton variant="text" width="80%" />
 *
 * // Avatar skeleton
 * <Skeleton variant="circular" width={40} height={40} />
 *
 * // Card skeleton
 * <Skeleton variant="rounded" width="100%" height={120} />
 *
 * // No animation
 * <Skeleton animation="none" />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      width,
      height,
      variant = "text",
      animation = "pulse",
      style,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      text: "rounded h-4",
      circular: "rounded-full",
      rectangular: "rounded-none",
      rounded: "rounded-xl",
    };

    const animationClasses = {
      pulse: "animate-pulse",
      wave: [
        "relative overflow-hidden",
        "after:absolute after:inset-0",
        "after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent",
        "after:animate-[shimmer_1.5s_infinite]",
        "dark:after:via-white/10",
      ],
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-gray-200 dark:bg-[rgba(248,232,216,0.1)]",
          variantClasses[variant],
          animationClasses[animation],
          className
        )}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

/**
 * SkeletonText - Multiple text line skeletons
 */
const SkeletonText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    lines?: number;
    lastLineWidth?: string;
  }
>(({ className, lines = 3, lastLineWidth = "60%", ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? lastLineWidth : "100%"}
      />
    ))}
  </div>
));

SkeletonText.displayName = "SkeletonText";

/**
 * SkeletonCard - Card-shaped skeleton
 */
const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hasHeader?: boolean;
    hasFooter?: boolean;
  }
>(({ className, hasHeader = true, hasFooter = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-200 dark:border-[rgba(248,232,216,0.05)]",
      "bg-neutral-50 dark:bg-[rgba(0,0,0,0.3)]",
      "p-6",
      className
    )}
    {...props}
  >
    {hasHeader && (
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="25%" height={12} />
        </div>
      </div>
    )}
    <SkeletonText lines={3} />
    {hasFooter && (
      <div className="mt-4 flex justify-end gap-2">
        <Skeleton variant="rounded" width={80} height={36} />
        <Skeleton variant="rounded" width={80} height={36} />
      </div>
    )}
  </div>
));

SkeletonCard.displayName = "SkeletonCard";

/**
 * SkeletonTable - Table rows skeleton
 */
const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    rows?: number;
    columns?: number;
  }
>(({ className, rows = 5, columns = 4, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-200 dark:border-[rgba(248,232,216,0.05)]",
      "bg-neutral-50 dark:bg-[rgba(0,0,0,0.3)]",
      "overflow-hidden",
      className
    )}
    {...props}
  >
    {/* Header */}
    <div className="flex gap-4 p-4 bg-gray-50 dark:bg-[rgba(161,82,60,0.15)] border-b border-gray-200 dark:border-[rgba(161,82,60,0.2)]">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === 0 ? "25%" : "20%"}
          height={14}
        />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className="flex gap-4 p-4 border-b last:border-b-0 border-gray-100 dark:border-[rgba(248,232,216,0.05)]"
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={colIndex}
            variant="text"
            width={colIndex === 0 ? "25%" : "20%"}
            height={14}
          />
        ))}
      </div>
    ))}
  </div>
));

SkeletonTable.displayName = "SkeletonTable";

/**
 * SkeletonStatCard - Stat card skeleton
 */
const SkeletonStatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-200 dark:border-[rgba(248,232,216,0.05)]",
      "bg-neutral-50 dark:bg-[rgba(0,0,0,0.3)]",
      "p-5",
      className
    )}
    {...props}
  >
    <Skeleton variant="text" width={60} height={10} className="mb-3" />
    <Skeleton variant="text" width={100} height={32} className="mb-2" />
    <Skeleton variant="text" width={50} height={14} />
  </div>
));

SkeletonStatCard.displayName = "SkeletonStatCard";

/**
 * SkeletonAvatar - Avatar skeleton
 */
const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
  }
>(({ className, size = "md", ...props }, ref) => {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  };

  return (
    <Skeleton
      ref={ref}
      variant="circular"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
      {...props}
    />
  );
});

SkeletonAvatar.displayName = "SkeletonAvatar";

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  SkeletonStatCard,
  SkeletonAvatar,
};
