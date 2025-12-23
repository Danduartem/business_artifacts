import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const avatarVariants = cva(
  // Base styles
  [
    "relative",
    "inline-flex items-center justify-center",
    "overflow-hidden",
    "shrink-0",
    "font-display font-bold",
    "select-none",
  ],
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-14 w-14 text-lg",
        "2xl": "h-16 w-16 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-xl",
      },
      variant: {
        default: [
          // Light mode - warm gradient
          "bg-gradient-to-br from-accent-400 to-accent-600",
          "text-white",
          // Dark mode
          "dark:from-[#A1523C] dark:to-[#D4A574]",
          "dark:text-[#F8E8D8]",
        ],
        primary: [
          "bg-gradient-to-br from-primary-500 to-primary-700",
          "text-white",
          "dark:from-[#7A1307] dark:to-[#4E130D]",
        ],
        secondary: [
          "bg-gradient-to-br from-secondary-400 to-secondary-600",
          "text-white",
        ],
        neutral: [
          "bg-gray-200 text-gray-600",
          "dark:bg-[rgba(248,232,216,0.1)] dark:text-[#F8E8D8]",
        ],
        outline: [
          "bg-transparent",
          "border-2 border-gray-300 text-gray-600",
          "dark:border-[rgba(248,232,216,0.2)] dark:text-[#F8E8D8]",
        ],
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      variant: "default",
    },
  }
);

// Status indicator styles
const statusVariants = cva(
  [
    "absolute",
    "rounded-full",
    "ring-2 ring-white dark:ring-[#1A0604]",
  ],
  {
    variants: {
      size: {
        xs: "h-1.5 w-1.5 -bottom-0.5 -right-0.5",
        sm: "h-2 w-2 bottom-0 right-0",
        md: "h-2.5 w-2.5 bottom-0 right-0",
        lg: "h-3 w-3 bottom-0 right-0",
        xl: "h-3.5 w-3.5 bottom-0.5 right-0.5",
        "2xl": "h-4 w-4 bottom-0.5 right-0.5",
      },
      status: {
        online: "bg-success-500 dark:bg-[#6ABF6A]",
        offline: "bg-gray-400 dark:bg-[#7A5A4A]",
        busy: "bg-error-500 dark:bg-[#E57373]",
        away: "bg-warning-500 dark:bg-[#FFB74D]",
      },
    },
    defaultVariants: {
      size: "md",
      status: "online",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback initials when no image (e.g., "MC", "FS") */
  initials?: string;
  /** Full name - used to generate initials if not provided */
  name?: string;
  /** Online status indicator */
  status?: "online" | "offline" | "busy" | "away";
  /** Whether to show ring on focus/hover */
  interactive?: boolean;
}

/**
 * Generate initials from a name
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Avatar component for displaying user profiles
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" />
 *
 * // With initials
 * <Avatar initials="MC" />
 *
 * // From name (auto-generates initials)
 * <Avatar name="Marina Costa" />
 *
 * // With status
 * <Avatar name="John" status="online" />
 *
 * // Different sizes
 * <Avatar initials="FS" size="xl" />
 *
 * // Square shape
 * <Avatar initials="MC" shape="square" size="xl" />
 * ```
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      shape,
      variant,
      src,
      alt,
      initials,
      name,
      status,
      interactive = false,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    // Determine what to display
    const displayInitials = initials || (name ? getInitials(name) : "?");
    const showImage = src && !imageError;

    return (
      <div
        ref={ref}
        className={cn(
          avatarVariants({ size, shape, variant }),
          interactive && [
            "cursor-pointer",
            "transition-all duration-200",
            "hover:ring-2 hover:ring-accent-500/50",
            "focus:outline-none focus:ring-2 focus:ring-accent-500",
          ],
          className
        )}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span aria-label={name || initials}>{displayInitials}</span>
        )}

        {status && (
          <span
            className={cn(statusVariants({ size, status }))}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

/**
 * AvatarGroup - Stack multiple avatars with overlap
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar name="Alice" />
 *   <Avatar name="Bob" />
 *   <Avatar name="Charlie" />
 *   <Avatar name="Diana" />
 * </AvatarGroup>
 * ```
 */
const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    /** Maximum avatars to show before +N indicator */
    max?: number;
    /** Size of avatars in the group */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  }
>(({ className, children, max = 4, size = "md", ...props }, ref) => {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  // Calculate overlap based on size
  const overlapClass = {
    xs: "-space-x-2",
    sm: "-space-x-2.5",
    md: "-space-x-3",
    lg: "-space-x-3.5",
    xl: "-space-x-4",
    "2xl": "-space-x-5",
  }[size];

  return (
    <div
      ref={ref}
      className={cn("flex items-center", overlapClass, className)}
      {...props}
    >
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className="ring-2 ring-white dark:ring-[#1A0604] rounded-full"
          style={{ zIndex: visibleChildren.length - index }}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                size,
              })
            : child}
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            avatarVariants({ size, shape: "circle", variant: "neutral" }),
            "ring-2 ring-white dark:ring-[#1A0604]"
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
});

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
