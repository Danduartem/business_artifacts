import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// TYPES
// ============================================================================

export interface ProfileStats {
  followers: number;
  following?: number;
  posts?: number;
  /** Custom stats to display instead of the default trio */
  custom?: Array<{ value: number; label: string }>;
}

export interface ProfileTag {
  label: string;
  icon?: React.ReactNode;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format large numbers with K/M suffixes (Brazilian style)
 * 15506 → "15,5K"
 * 1234567 → "1,2M"
 */
function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    const value = num / 1_000_000;
    return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "M";
  }
  if (num >= 10_000) {
    const value = num / 1_000;
    return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "K";
  }
  if (num >= 1_000) {
    const value = num / 1_000;
    return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "K";
  }
  return num.toLocaleString("pt-BR");
}

// ============================================================================
// ICONS
// ============================================================================

/** Verification badge (Instagram-style checkmark) */
const VerifiedBadge: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <svg
      className={cn(sizeClasses[size], "text-[#3B82F6] dark:text-[#60A5FA]")}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="Conta verificada"
    >
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
    </svg>
  );
};

/** Link icon for bio URLs */
const LinkIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

/** Instagram icon */
const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// ============================================================================
// PROFILE AVATAR
// ============================================================================

const profileAvatarVariants = cva(
  [
    "relative",
    "inline-flex items-center justify-center",
    "overflow-hidden",
    "shrink-0",
    "rounded-full",
    "font-display font-bold",
    "select-none",
  ],
  {
    variants: {
      size: {
        md: "h-20 w-20 text-2xl",
        lg: "h-28 w-28 text-3xl",
        xl: "h-36 w-36 text-4xl",
        "2xl": "h-44 w-44 text-5xl",
      },
      ring: {
        none: "",
        default: "ring-4 ring-white dark:ring-[#240504]",
        gradient: [
          "ring-4",
          "ring-gradient-to-br from-accent-400 to-primary-600",
          // Using box-shadow for gradient ring effect
          "shadow-[0_0_0_4px] shadow-accent-400/50",
          "dark:shadow-[0_0_0_4px] dark:shadow-[rgba(161,82,60,0.5)]",
        ],
        accent: "ring-4 ring-accent-400 dark:ring-[#A1523C]",
      },
    },
    defaultVariants: {
      size: "lg",
      ring: "default",
    },
  }
);

interface ProfileAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: "md" | "lg" | "xl" | "2xl";
  ring?: "none" | "default" | "gradient" | "accent";
  verified?: boolean;
  verifiedSize?: "sm" | "md" | "lg";
}

const ProfileAvatar = React.forwardRef<HTMLDivElement, ProfileAvatarProps>(
  (
    {
      className,
      src,
      name,
      size = "lg",
      ring = "default",
      verified = false,
      verifiedSize,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    // Generate initials from name
    const initials = name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "?";

    // Determine verification badge size based on avatar size
    const badgeSize = verifiedSize || (size === "2xl" || size === "xl" ? "lg" : size === "lg" ? "md" : "sm");

    // Badge position based on avatar size
    const badgePosition = {
      md: "bottom-0 right-0",
      lg: "bottom-1 right-1",
      xl: "bottom-2 right-2",
      "2xl": "bottom-3 right-3",
    };

    return (
      <div
        ref={ref}
        className={cn(
          profileAvatarVariants({ size, ring }),
          // Fallback gradient background
          "bg-gradient-to-br from-accent-400 to-accent-600",
          "dark:from-[#A1523C] dark:to-[#7A1307]",
          "text-white",
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name || "Profile"}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span aria-label={name}>{initials}</span>
        )}

        {verified && (
          <span
            className={cn(
              "absolute",
              badgePosition[size],
              "bg-white dark:bg-[#240504] rounded-full p-0.5"
            )}
          >
            <VerifiedBadge size={badgeSize} />
          </span>
        )}
      </div>
    );
  }
);

ProfileAvatar.displayName = "ProfileAvatar";

// ============================================================================
// PROFILE STATS ROW
// ============================================================================

interface ProfileStatsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: ProfileStats;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

const ProfileStatsRow = React.forwardRef<HTMLDivElement, ProfileStatsRowProps>(
  ({ className, stats, size = "md", showLabels = true, ...props }, ref) => {
    // Build stats array
    const statItems = stats.custom || [
      { value: stats.followers, label: "seguidores" },
      ...(stats.following !== undefined
        ? [{ value: stats.following, label: "seguindo" }]
        : []),
      ...(stats.posts !== undefined
        ? [{ value: stats.posts, label: "publicações" }]
        : []),
    ];

    const sizeClasses = {
      sm: { value: "text-lg font-bold", label: "text-xs" },
      md: { value: "text-xl font-bold", label: "text-sm" },
      lg: { value: "text-2xl font-bold", label: "text-sm" },
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          size === "sm" ? "gap-4" : "gap-6",
          className
        )}
        {...props}
      >
        {statItems.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <span
              className={cn(
                sizeClasses[size].value,
                "text-gray-900 dark:text-[#F8E8D8] tabular-nums"
              )}
            >
              {formatNumber(stat.value)}
            </span>
            {showLabels && (
              <span
                className={cn(
                  sizeClasses[size].label,
                  "text-gray-500 dark:text-[#A89080]"
                )}
              >
                {stat.label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
);

ProfileStatsRow.displayName = "ProfileStatsRow";

// ============================================================================
// PROFILE TAGS
// ============================================================================

interface ProfileTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: ProfileTag[];
  size?: "sm" | "md";
}

const ProfileTags = React.forwardRef<HTMLDivElement, ProfileTagsProps>(
  ({ className, tags, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "px-2 py-0.5 text-[10px] gap-1",
      md: "px-3 py-1 text-xs gap-1.5",
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-2", className)}
        {...props}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "inline-flex items-center rounded-full",
              "bg-gray-100 text-gray-700",
              "dark:bg-[rgba(248,232,216,0.1)] dark:text-[#D4B8A8]",
              "font-medium",
              sizeClasses[size]
            )}
          >
            {tag.icon && <span className="shrink-0">{tag.icon}</span>}
            {tag.label}
          </span>
        ))}
      </div>
    );
  }
);

ProfileTags.displayName = "ProfileTags";

// ============================================================================
// PROFILE HEADER CARD
// ============================================================================

const profileHeaderVariants = cva("rounded-2xl", {
  variants: {
    variant: {
      default: [
        "bg-white border border-gray-100",
        "dark:bg-[rgba(0,0,0,0.2)] dark:border-[rgba(248,232,216,0.05)]",
      ],
      elevated: [
        "bg-white shadow-lg",
        "dark:bg-[rgba(0,0,0,0.3)] dark:shadow-none dark:border dark:border-[rgba(248,232,216,0.05)]",
      ],
      gradient: [
        "bg-gradient-to-br from-neutral-50 via-white to-accent-50",
        "border border-accent-100",
        "dark:from-[rgba(161,82,60,0.15)] dark:via-[rgba(0,0,0,0.2)] dark:to-[rgba(78,19,13,0.2)]",
        "dark:border-[rgba(161,82,60,0.2)]",
      ],
      hero: [
        "bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600",
        "text-white",
        "dark:from-[#4E130D] dark:via-[#7A1307] dark:to-[#A1523C]",
      ],
      flat: "bg-transparent",
    },
    layout: {
      centered: "text-center",
      horizontal: "",
      compact: "",
    },
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    },
  },
  defaultVariants: {
    variant: "default",
    layout: "centered",
    padding: "lg",
  },
});

export interface ProfileHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileHeaderVariants> {
  /** Profile display name */
  name: string;
  /** Username/handle (without @) */
  handle?: string;
  /** Bio/description text */
  bio?: string;
  /** Avatar image URL */
  avatarSrc?: string;
  /** Show verification badge */
  verified?: boolean;
  /** Stats to display */
  stats?: ProfileStats;
  /** Category/niche tags */
  tags?: ProfileTag[];
  /** Link URL to display in bio */
  link?: string;
  /** Link display text (defaults to URL) */
  linkText?: string;
  /** Avatar size */
  avatarSize?: "md" | "lg" | "xl" | "2xl";
  /** Avatar ring style */
  avatarRing?: "none" | "default" | "gradient" | "accent";
  /** Platform icon to show (e.g., Instagram) */
  platform?: "instagram" | "none";
  /** Custom actions/buttons to render */
  actions?: React.ReactNode;
  /** Show stats row */
  showStats?: boolean;
}

const ProfileHeader = React.forwardRef<HTMLDivElement, ProfileHeaderProps>(
  (
    {
      className,
      variant,
      layout = "centered",
      padding,
      name,
      handle,
      bio,
      avatarSrc,
      verified = false,
      stats,
      tags,
      link,
      linkText,
      avatarSize = "lg",
      avatarRing = "default",
      platform = "none",
      actions,
      showStats = true,
      ...props
    },
    ref
  ) => {
    const isHero = variant === "hero";
    const isCentered = layout === "centered";
    const isHorizontal = layout === "horizontal";
    const isCompact = layout === "compact";

    return (
      <div
        ref={ref}
        className={cn(profileHeaderVariants({ variant, layout, padding }), className)}
        {...props}
      >
        {/* Horizontal layout wrapper */}
        {isHorizontal ? (
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <ProfileAvatar
              src={avatarSrc}
              name={name}
              size={avatarSize}
              ring={avatarRing}
              verified={verified}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Name & Handle */}
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h2
                    className={cn(
                      "font-display font-bold text-2xl",
                      isHero
                        ? "text-white"
                        : "text-gray-900 dark:text-[#F8E8D8]"
                    )}
                  >
                    {name}
                  </h2>
                  {platform === "instagram" && (
                    <span className={isHero ? "text-white/80" : "text-gray-400 dark:text-[#7A5A4A]"}>
                      <InstagramIcon />
                    </span>
                  )}
                </div>
                {handle && (
                  <p
                    className={cn(
                      "text-sm",
                      isHero
                        ? "text-white/70"
                        : "text-gray-500 dark:text-[#A89080]"
                    )}
                  >
                    @{handle}
                  </p>
                )}
              </div>

              {/* Bio */}
              {bio && (
                <p
                  className={cn(
                    "text-sm leading-relaxed mb-3",
                    isHero
                      ? "text-white/90"
                      : "text-gray-600 dark:text-[#D4B8A8]"
                  )}
                >
                  {bio}
                </p>
              )}

              {/* Link */}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium mb-4",
                    isHero
                      ? "text-white hover:text-white/80"
                      : "text-accent-600 hover:text-accent-700 dark:text-[#D4A574] dark:hover:text-[#F8E8D8]"
                  )}
                >
                  <LinkIcon />
                  {linkText || link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              )}

              {/* Tags */}
              {tags && tags.length > 0 && (
                <ProfileTags tags={tags} className="mb-4" />
              )}

              {/* Stats */}
              {showStats && stats && (
                <ProfileStatsRow stats={stats} size="md" />
              )}

              {/* Actions */}
              {actions && <div className="mt-4">{actions}</div>}
            </div>
          </div>
        ) : (
          /* Centered/Compact layout */
          <>
            {/* Avatar */}
            <div className={cn(isCentered && "flex justify-center", "mb-4")}>
              <ProfileAvatar
                src={avatarSrc}
                name={name}
                size={isCompact ? "md" : avatarSize}
                ring={avatarRing}
                verified={verified}
              />
            </div>

            {/* Name & Handle */}
            <div className="mb-3">
              <div
                className={cn(
                  "flex items-center gap-2",
                  isCentered && "justify-center"
                )}
              >
                <h2
                  className={cn(
                    "font-display font-bold",
                    isCompact ? "text-xl" : "text-2xl",
                    isHero
                      ? "text-white"
                      : "text-gray-900 dark:text-[#F8E8D8]"
                  )}
                >
                  {name}
                </h2>
                {platform === "instagram" && (
                  <span className={isHero ? "text-white/80" : "text-gray-400 dark:text-[#7A5A4A]"}>
                    <InstagramIcon />
                  </span>
                )}
              </div>
              {handle && (
                <p
                  className={cn(
                    "text-sm",
                    isHero
                      ? "text-white/70"
                      : "text-gray-500 dark:text-[#A89080]"
                  )}
                >
                  @{handle}
                </p>
              )}
            </div>

            {/* Stats (centered layout shows stats prominently) */}
            {showStats && stats && (
              <div
                className={cn(
                  isCentered && "flex justify-center",
                  "mb-4"
                )}
              >
                <ProfileStatsRow
                  stats={stats}
                  size={isCompact ? "sm" : "lg"}
                />
              </div>
            )}

            {/* Bio */}
            {bio && (
              <p
                className={cn(
                  "text-sm leading-relaxed mb-3",
                  isCompact && "line-clamp-2",
                  isCentered && "max-w-md mx-auto",
                  isHero
                    ? "text-white/90"
                    : "text-gray-600 dark:text-[#D4B8A8]"
                )}
              >
                {bio}
              </p>
            )}

            {/* Link */}
            {link && (
              <div className={cn(isCentered && "flex justify-center", "mb-4")}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium",
                    isHero
                      ? "text-white hover:text-white/80"
                      : "text-accent-600 hover:text-accent-700 dark:text-[#D4A574] dark:hover:text-[#F8E8D8]"
                  )}
                >
                  <LinkIcon />
                  {linkText || link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className={cn(isCentered && "flex justify-center", "mb-4")}>
                <ProfileTags tags={tags} size={isCompact ? "sm" : "md"} />
              </div>
            )}

            {/* Actions */}
            {actions && (
              <div className={cn(isCentered && "flex justify-center", "mt-4")}>
                {actions}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

ProfileHeader.displayName = "ProfileHeader";

// ============================================================================
// PRESETS
// ============================================================================

/** Common platform category tags */
export const platformTags = {
  marketing: { label: "Marketing", icon: null },
  business: { label: "Negócios", icon: null },
  entrepreneur: { label: "Empreendedor", icon: null },
  sales: { label: "Vendas", icon: null },
  digitalMarketing: { label: "Marketing Digital", icon: null },
  contentCreator: { label: "Criador de Conteúdo", icon: null },
  consultant: { label: "Consultor", icon: null },
  agency: { label: "Agência", icon: null },
  coach: { label: "Coach", icon: null },
  mentor: { label: "Mentor", icon: null },
};

/** Create profile stats object */
export function createProfileStats(data: {
  followers: number;
  following?: number;
  posts?: number;
}): ProfileStats {
  return {
    followers: data.followers,
    following: data.following,
    posts: data.posts,
  };
}

/** Create profile with custom stat labels */
export function createCustomStats(
  stats: Array<{ value: number; label: string }>
): ProfileStats {
  return {
    followers: 0, // Required but not used when custom is provided
    custom: stats,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ProfileHeader,
  ProfileAvatar,
  ProfileStatsRow,
  ProfileTags,
  VerifiedBadge,
  profileHeaderVariants,
  profileAvatarVariants,
  formatNumber,
};

export type {
  ProfileHeaderProps,
  ProfileAvatarProps,
  ProfileStatsRowProps,
  ProfileTagsProps,
};
