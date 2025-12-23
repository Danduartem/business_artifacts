import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const badgeVariants = cva(
  // Base styles
  [
    "inline-flex items-center",
    "px-3 py-1",
    "rounded-full",
    "text-xs font-semibold",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gray-100 text-gray-700",
        ],
        primary: [
          "bg-primary-100 text-primary-700",
        ],
        secondary: [
          "bg-secondary-100 text-secondary-600",
        ],
        accent: [
          "bg-accent-100 text-accent-600",
        ],
        success: [
          "bg-success-50 text-success-700",
        ],
        warning: [
          "bg-warning-50 text-warning-700",
        ],
        error: [
          "bg-error-50 text-error-700",
        ],
        info: [
          "bg-info-50 text-info-700",
        ],
        outline: [
          "bg-transparent text-gray-700",
          "border border-gray-300",
        ],
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional icon to display before text */
  icon?: React.ReactNode;
}

/**
 * Badge component for labels, tags, and status indicators
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="success">Ativo</Badge>
 * <Badge variant="error">Urgente</Badge>
 * <Badge variant="accent" size="lg">Novo</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {icon && <span className="mr-1 -ml-0.5">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
