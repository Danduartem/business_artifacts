import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const alertVariants = cva(
  // Base styles
  [
    "relative w-full",
    "rounded-md",
    "p-4",
    "border-l-4",
  ],
  {
    variants: {
      variant: {
        success: [
          "bg-success-50",
          "border-l-success-500",
          "text-success-700",
        ],
        warning: [
          "bg-warning-50",
          "border-l-warning-500",
          "text-warning-700",
        ],
        error: [
          "bg-error-50",
          "border-l-error-500",
          "text-error-700",
        ],
        info: [
          "bg-info-50",
          "border-l-info-500",
          "text-info-700",
        ],
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

// Icons for each variant
const AlertIcons = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" x2="9" y1="9" y2="15" />
      <line x1="9" x2="15" y1="9" y2="15" />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="16" y2="12" />
      <line x1="12" x2="12.01" y1="8" y2="8" />
    </svg>
  ),
};

// Close icon
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Alert title (optional) */
  title?: string;
  /** Show icon based on variant */
  showIcon?: boolean;
  /** Allow dismissing the alert */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
}

/**
 * Alert component with Oitavo Café design system styling
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Feito. Sem enrolação.">
 *   Sua mensagem foi enviada com sucesso.
 * </Alert>
 *
 * <Alert variant="error" dismissible onDismiss={() => setShow(false)}>
 *   Algo deu errado. Já estamos vendo.
 * </Alert>
 * ```
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "info",
      title,
      showIcon = true,
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const icon = variant ? AlertIcons[variant] : null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        <div className="flex gap-3">
          {showIcon && icon && (
            <div className="shrink-0 mt-0.5">{icon}</div>
          )}

          <div className="flex-1">
            {title && (
              <h5 className="font-semibold mb-1">{title}</h5>
            )}
            <div className="text-sm">{children}</div>
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className={cn(
                "shrink-0 p-1 -m-1 rounded-md",
                "opacity-70 hover:opacity-100",
                "transition-opacity duration-fast",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                variant === "success" && "focus:ring-success-500",
                variant === "warning" && "focus:ring-warning-500",
                variant === "error" && "focus:ring-error-500",
                variant === "info" && "focus:ring-info-500"
              )}
              aria-label="Fechar alerta"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
