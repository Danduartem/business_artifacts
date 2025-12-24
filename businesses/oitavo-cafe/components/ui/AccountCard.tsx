import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import { GradeBadge, scoreToGrade, type GradeLevel } from "./GradeBadge";

// ============================================================================
// ACCOUNT CARD COMPONENT
// Compact profile cards for dashboard grids showing account metrics
// ============================================================================

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format large numbers with K/M suffixes (Brazilian style)
 */
function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "K";
  }
  return num.toLocaleString("pt-BR");
}

/**
 * Format percentage
 */
function formatPercentage(num: number): string {
  return num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
}

// ============================================================================
// ICONS
// ============================================================================

const TrendUpIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-3 h-3", className)} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14l5-5 5 5H7z" />
  </svg>
);

const TrendDownIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-3 h-3", className)} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" opacity="0.5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// ============================================================================
// AVATAR COMPONENT
// ============================================================================

interface AccountAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const avatarSizes = {
  sm: "w-10 h-10 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-14 h-14 text-lg",
};

const AccountAvatar: React.FC<AccountAvatarProps> = ({ src, name, size = "md", className }) => {
  const [imageError, setImageError] = React.useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        avatarSizes[size],
        "rounded-full overflow-hidden flex items-center justify-center shrink-0",
        "bg-gradient-to-br from-accent-400 to-primary-600",
        "dark:from-[#A1523C] dark:to-[#4E130D]",
        "text-white font-semibold",
        "ring-2 ring-white dark:ring-[rgba(248,232,216,0.1)]",
        className
      )}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

// ============================================================================
// METRIC ITEM
// ============================================================================

interface MetricItemProps {
  icon?: React.ReactNode;
  value: number | string;
  label: string;
  format?: "number" | "percentage" | "raw";
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const MetricItem: React.FC<MetricItemProps> = ({
  icon,
  value,
  label,
  format = "number",
  trend,
  className,
}) => {
  const formattedValue =
    typeof value === "string"
      ? value
      : format === "percentage"
      ? formatPercentage(value)
      : format === "number"
      ? formatNumber(value)
      : value;

  return (
    <div className={cn("text-center", className)}>
      <div className="flex items-center justify-center gap-1">
        {icon && <span className="text-gray-400 dark:text-[#7A5A4A]">{icon}</span>}
        <span className="text-lg font-bold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
          {formattedValue}
        </span>
        {trend && trend !== "neutral" && (
          <span
            className={cn(
              trend === "up" ? "text-emerald-500" : "text-rose-500"
            )}
          >
            {trend === "up" ? <TrendUpIcon /> : <TrendDownIcon />}
          </span>
        )}
      </div>
      <span className="text-[10px] text-gray-500 dark:text-[#A89080]">{label}</span>
    </div>
  );
};

// ============================================================================
// ACCOUNT CARD VARIANTS
// ============================================================================

const accountCardVariants = cva(
  [
    "relative rounded-xl overflow-hidden",
    "transition-all duration-200",
    "group",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white border border-gray-100",
          "dark:bg-[rgba(0,0,0,0.2)] dark:border-[rgba(248,232,216,0.08)]",
          "hover:border-accent-200 dark:hover:border-[rgba(161,82,60,0.3)]",
          "hover:shadow-md",
        ],
        elevated: [
          "bg-white shadow-lg",
          "dark:bg-[rgba(0,0,0,0.3)] dark:border dark:border-[rgba(248,232,216,0.05)]",
          "hover:shadow-xl",
        ],
        gradient: [
          "bg-gradient-to-br from-neutral-50 via-white to-accent-50/50",
          "border border-accent-100",
          "dark:from-[rgba(161,82,60,0.1)] dark:via-[rgba(0,0,0,0.2)] dark:to-[rgba(78,19,13,0.1)]",
          "dark:border-[rgba(161,82,60,0.2)]",
          "hover:border-accent-300 dark:hover:border-[rgba(161,82,60,0.4)]",
        ],
        flat: [
          "bg-transparent border border-gray-200 dark:border-[rgba(248,232,216,0.1)]",
          "hover:bg-gray-50 dark:hover:bg-[rgba(248,232,216,0.02)]",
        ],
      },
      padding: {
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface AccountCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accountCardVariants> {
  /** Account display name */
  name: string;
  /** Username/handle (without @) */
  handle: string;
  /** Avatar image URL */
  avatarSrc?: string;
  /** Growth score (0-100) */
  score?: number;
  /** Follower count */
  followers?: number;
  /** Engagement rate (percentage) */
  engagement?: number;
  /** Last updated date */
  lastUpdated?: string | Date;
  /** Platform type */
  platform?: "instagram";
  /** Show grade badge */
  showGrade?: boolean;
  /** Show platform icon */
  showPlatformIcon?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Make card clickable/interactive */
  interactive?: boolean;
}

const AccountCard = React.forwardRef<HTMLDivElement, AccountCardProps>(
  (
    {
      className,
      variant,
      padding,
      name,
      handle,
      avatarSrc,
      score,
      followers,
      engagement,
      lastUpdated,
      platform = "instagram",
      showGrade = true,
      showPlatformIcon = false,
      onClick,
      interactive = true,
      ...props
    },
    ref
  ) => {
    const grade = score !== undefined ? scoreToGrade(score) : undefined;

    // Format last updated date
    const formattedDate = lastUpdated
      ? typeof lastUpdated === "string"
        ? lastUpdated
        : lastUpdated.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
      : undefined;

    const handleClick = interactive && onClick ? onClick : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          accountCardVariants({ variant, padding }),
          interactive && onClick && "cursor-pointer",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {/* Grade badge (top-right) */}
        {showGrade && grade && (
          <div className="absolute top-3 right-3">
            <GradeBadge grade={grade} size="sm" variant="glow" />
          </div>
        )}

        {/* Header: Avatar + Info */}
        <div className="flex items-start gap-3 mb-4">
          <AccountAvatar src={avatarSrc} name={name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-gray-900 dark:text-[#F8E8D8] truncate">
                {name}
              </h3>
              {showPlatformIcon && platform === "instagram" && (
                <span className="text-gray-400 dark:text-[#7A5A4A]">
                  <InstagramIcon />
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-[#A89080] truncate">
              @{handle}
            </p>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {score !== undefined && (
            <MetricItem
              icon={<TrendUpIcon className="w-3 h-3" />}
              value={score}
              label="Score"
              format="raw"
            />
          )}
          {followers !== undefined && (
            <MetricItem
              icon={<UsersIcon />}
              value={followers}
              label="Seguidores"
              format="number"
            />
          )}
          {engagement !== undefined && (
            <MetricItem
              icon={<HeartIcon />}
              value={engagement}
              label="Engajamento"
              format="percentage"
            />
          )}
        </div>

        {/* Footer: Last updated */}
        {formattedDate && (
          <div className="pt-3 border-t border-gray-100 dark:border-[rgba(248,232,216,0.08)]">
            <span className="text-[10px] text-gray-400 dark:text-[#7A5A4A]">
              Atualizado em {formattedDate}
            </span>
          </div>
        )}
      </div>
    );
  }
);

AccountCard.displayName = "AccountCard";

// ============================================================================
// ACCOUNT CARD GRID
// ============================================================================

interface AccountCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const gridColumns = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

const gridGaps = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

const AccountCardGrid = React.forwardRef<HTMLDivElement, AccountCardGridProps>(
  ({ className, columns = 3, gap = "md", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid", gridColumns[columns], gridGaps[gap], className)}
      {...props}
    >
      {children}
    </div>
  )
);

AccountCardGrid.displayName = "AccountCardGrid";

// ============================================================================
// COMPACT VARIANT
// ============================================================================

export interface AccountCardCompactProps
  extends Omit<AccountCardProps, "padding"> {}

const AccountCardCompact = React.forwardRef<HTMLDivElement, AccountCardCompactProps>(
  (props, ref) => <AccountCard ref={ref} padding="sm" {...props} />
);

AccountCardCompact.displayName = "AccountCardCompact";

// ============================================================================
// EXPORTS
// ============================================================================

export {
  AccountCard,
  AccountCardGrid,
  AccountCardCompact,
  AccountAvatar,
  MetricItem,
  accountCardVariants,
  formatNumber,
  formatPercentage,
};

export type { AccountCardProps, AccountCardGridProps, AccountAvatarProps, MetricItemProps };
