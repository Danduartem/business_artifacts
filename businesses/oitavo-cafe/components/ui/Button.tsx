import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "font-body font-semibold",
    "rounded-md",
    "transition-all duration-normal ease-out",
    "focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600 text-neutral-50",
          "hover:bg-primary-700",
          "active:bg-primary-800",
        ],
        secondary: [
          "bg-transparent text-primary-600",
          "border-2 border-primary-400",
          "hover:text-primary-700 hover:border-primary-600",
        ],
        accent: [
          "bg-accent-500 text-neutral-50",
          "hover:bg-accent-600",
          "active:bg-accent-700",
        ],
        ghost: [
          "bg-transparent text-primary-600",
          "hover:bg-neutral-100",
        ],
        destructive: [
          "bg-error-500 text-white",
          "hover:bg-error-700",
        ],
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Loading spinner component
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows loading spinner and disables button */
  isLoading?: boolean;
  /** Text to show while loading (optional) */
  loadingText?: string;
  /** Icon to display before children */
  leftIcon?: React.ReactNode;
  /** Icon to display after children */
  rightIcon?: React.ReactNode;
}

/**
 * Button component with Oitavo Café design system styling
 *
 * @example
 * ```tsx
 * <Button variant="primary">Quero agendar</Button>
 * <Button variant="secondary" size="sm">Saiba mais</Button>
 * <Button variant="accent" isLoading>Processando...</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
