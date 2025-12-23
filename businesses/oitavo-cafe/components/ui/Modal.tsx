import * as React from "react";
import { cn } from "../utils/cn";

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
    className="h-5 w-5"
    aria-hidden="true"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Additional class names for the modal container */
  className?: string;
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Size of the modal */
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * Modal dialog component with backdrop
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
 *
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <ModalHeader>
 *     <ModalTitle>Título do Modal</ModalTitle>
 *   </ModalHeader>
 *   <ModalBody>
 *     <p>Conteúdo do modal</p>
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button onClick={() => setIsOpen(false)}>Fechar</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      children,
      className,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      size = "md",
    },
    ref
  ) => {
    // Handle escape key
    React.useEffect(() => {
      if (!closeOnEscape || !isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-[calc(100%-2rem)]",
    };

    return (
      <div
        className="fixed inset-0 z-[1050] overflow-y-auto"
        aria-modal="true"
        role="dialog"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-primary-900/75 transition-opacity duration-300"
          style={{ zIndex: 1040 }}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Modal container */}
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 1050 }}
          onClick={handleBackdropClick}
        >
          {/* Modal content */}
          <div
            ref={ref}
            className={cn(
              "relative w-full",
              sizeClasses[size],
              "bg-neutral-50",
              "rounded-xl",
              "shadow-xl",
              "transform transition-all duration-300",
              "animate-in fade-in zoom-in-95",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

/**
 * Modal header section
 */
const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { onClose?: () => void }
>(({ className, children, onClose, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-start justify-between",
      "p-6 pb-0",
      className
    )}
    {...props}
  >
    <div className="flex-1">{children}</div>
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className={cn(
          "p-1 -m-1 rounded-md",
          "text-gray-500 hover:text-gray-700",
          "transition-colors duration-100",
          "focus:outline-none focus:ring-2 focus:ring-accent-500/20"
        )}
        aria-label="Fechar modal"
      >
        <CloseIcon />
      </button>
    )}
  </div>
));
ModalHeader.displayName = "ModalHeader";

/**
 * Modal title component
 */
const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-display text-xl font-semibold text-primary-700",
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

/**
 * Modal description component
 */
const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 mt-1", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

/**
 * Modal body/content section
 */
const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
ModalBody.displayName = "ModalBody";

/**
 * Modal footer section
 */
const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-3",
      "p-6 pt-0",
      className
    )}
    {...props}
  />
));
ModalFooter.displayName = "ModalFooter";

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
};
