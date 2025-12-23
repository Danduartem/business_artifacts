import * as React from "react";
import { cn } from "../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string;
  /** Helper text displayed below the input */
  hint?: string;
  /** Error message - when set, input shows error state */
  error?: string;
  /** Icon to display at the start of the input */
  leftIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  rightIcon?: React.ReactNode;
}

/**
 * Input component with Oitavo Café design system styling
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" placeholder="seu@email.com" />
 * <Input label="Telefone" error="Formato inválido" />
 * <Input hint="Nunca compartilhamos seu email." />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || React.useId();
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-2",
              hasError ? "text-error-700" : "text-gray-900"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              // Base styles
              "w-full min-h-[44px]",
              "px-4 py-3",
              "font-body text-base",
              "bg-neutral-50",
              "border rounded-md",
              "transition-all duration-fast ease-out",
              "placeholder:text-gray-500",
              // Focus styles
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              // States
              hasError
                ? [
                    "border-error-500 bg-error-50",
                    "focus:border-error-500 focus:ring-error-500/20",
                  ]
                : [
                    "border-gray-200",
                    "hover:border-gray-300",
                    "focus:border-accent-500 focus:ring-accent-500/20",
                  ],
              // Disabled
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
              // Icon padding
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-error-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Hint text (only shown if no error) */}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-sm text-gray-600">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea variant
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/**
 * Textarea component with Oitavo Café design system styling
 *
 * @example
 * ```tsx
 * <Textarea label="Mensagem" placeholder="Conte-nos sobre seu projeto..." />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, disabled, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-2",
              hasError ? "text-error-700" : "text-gray-900"
            )}
          >
            {label}
          </label>
        )}

        <textarea
          id={inputId}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(
            // Base styles
            "w-full min-h-[120px]",
            "px-4 py-3",
            "font-body text-base",
            "bg-neutral-50",
            "border rounded-md",
            "transition-all duration-fast ease-out",
            "placeholder:text-gray-500",
            "resize-y",
            // Focus styles
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            // States
            hasError
              ? [
                  "border-error-500 bg-error-50",
                  "focus:border-error-500 focus:ring-error-500/20",
                ]
              : [
                  "border-gray-200",
                  "hover:border-gray-300",
                  "focus:border-accent-500 focus:ring-accent-500/20",
                ],
            // Disabled
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
            className
          )}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-error-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-sm text-gray-600">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
