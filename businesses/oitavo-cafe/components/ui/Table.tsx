import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const tableVariants = cva(
  // Base styles
  [
    "w-full",
    "text-sm",
    "border-collapse",
  ],
  {
    variants: {
      variant: {
        default: "",
        bordered: "",
        minimal: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tableContainerVariants = cva(
  // Base styles - the wrapper that provides rounded corners and border
  [
    "w-full",
    "overflow-hidden",
    "rounded-xl",
    "border",
  ],
  {
    variants: {
      variant: {
        default: [
          // Light mode
          "bg-neutral-50 border-gray-200",
          // Dark mode
          "dark:bg-gradient-to-b dark:from-[#2A0E0A] dark:to-[#1F0906]",
          "dark:border-[rgba(161,82,60,0.2)]",
        ],
        bordered: [
          "bg-white border-gray-300",
          "dark:bg-[#240504] dark:border-[rgba(161,82,60,0.3)]",
        ],
        minimal: [
          "bg-transparent border-transparent rounded-none",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /** Whether rows should have alternating background colors */
  striped?: boolean;
  /** Whether rows should highlight on hover */
  hoverable?: boolean;
  /** Compact size with less padding */
  compact?: boolean;
}

/**
 * Table container component
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Status</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>Active</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      variant,
      striped = false,
      hoverable = true,
      compact = false,
      children,
      ...props
    },
    ref
  ) => (
    <div className={cn(tableContainerVariants({ variant }))}>
      <div className="overflow-x-auto">
        <table
          ref={ref}
          className={cn(tableVariants({ variant }), className)}
          data-striped={striped || undefined}
          data-hoverable={hoverable || undefined}
          data-compact={compact || undefined}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  )
);

Table.displayName = "Table";

/**
 * Table header section
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      // Light mode
      "bg-primary-50/50",
      "border-b-2 border-primary-100",
      // Dark mode
      "dark:bg-[rgba(161,82,60,0.15)]",
      "dark:border-b-2 dark:border-[rgba(161,82,60,0.25)]",
      className
    )}
    {...props}
  />
));

TableHeader.displayName = "TableHeader";

/**
 * Table body section
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      // Striped rows via parent data attribute
      "[table[data-striped]_&>tr:nth-child(even)]:bg-gray-50",
      "dark:[table[data-striped]_&>tr:nth-child(even)]:bg-[rgba(0,0,0,0.2)]",
      className
    )}
    {...props}
  />
));

TableBody.displayName = "TableBody";

/**
 * Table footer section
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-gray-100 font-medium",
      "dark:bg-[rgba(161,82,60,0.1)]",
      "border-t border-gray-200 dark:border-[rgba(161,82,60,0.2)]",
      className
    )}
    {...props}
  />
));

TableFooter.displayName = "TableFooter";

/**
 * Table row
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-gray-100 dark:border-[rgba(161,82,60,0.1)]",
      "last:border-b-0",
      "transition-colors duration-100",
      // Hoverable via parent data attribute
      "[table[data-hoverable]_&]:hover:bg-gray-50",
      "dark:[table[data-hoverable]_&]:hover:bg-[rgba(161,82,60,0.08)]",
      className
    )}
    {...props}
  />
));

TableRow.displayName = "TableRow";

/**
 * Table header cell
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    /** Make column sortable */
    sortable?: boolean;
    /** Current sort direction */
    sortDirection?: "asc" | "desc" | null;
  }
>(({ className, children, sortable, sortDirection, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-6 text-left align-middle",
      "font-display text-sm font-semibold",
      // Light mode
      "text-primary-700",
      // Dark mode
      "dark:text-[#F8E8D8]",
      // Compact mode
      "[table[data-compact]_&]:h-10 [table[data-compact]_&]:px-4",
      // Sortable styles
      sortable && "cursor-pointer select-none hover:bg-primary-100/50 dark:hover:bg-[rgba(161,82,60,0.2)]",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      {children}
      {sortable && (
        <span className="text-gray-400 dark:text-[#7A5A4A]">
          {sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "↕"}
        </span>
      )}
    </div>
  </th>
));

TableHead.displayName = "TableHead";

/**
 * Table data cell
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    /** Make this cell stand out (like first column in timeline) */
    emphasis?: boolean;
  }
>(({ className, emphasis, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-6 align-middle",
      // Regular text
      "text-gray-700 dark:text-[#D4B8A8]",
      // Compact mode
      "[table[data-compact]_&]:p-4",
      // Emphasis (like first column)
      emphasis && [
        "font-display font-semibold",
        "text-primary-700 dark:text-[#F8E8D8]",
      ],
      className
    )}
    {...props}
  />
));

TableCell.displayName = "TableCell";

/**
 * Table caption
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-sm text-gray-500 dark:text-[#7A5A4A]",
      className
    )}
    {...props}
  />
));

TableCaption.displayName = "TableCaption";

/**
 * Empty state for tables
 */
const TableEmpty = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    colSpan: number;
    icon?: React.ReactNode;
    message?: string;
  }
>(
  (
    {
      className,
      colSpan,
      icon,
      message = "Nenhum dado encontrado",
      children,
      ...props
    },
    ref
  ) => (
    <tr ref={ref} className={className} {...props}>
      <td colSpan={colSpan} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-[#7A5A4A]">
          {icon && <span className="text-gray-400 dark:text-[#5A3A2A]">{icon}</span>}
          <span className="text-sm">{message}</span>
          {children}
        </div>
      </td>
    </tr>
  )
);

TableEmpty.displayName = "TableEmpty";

// Check icon for comparison tables
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-success-600 dark:text-[#6ABF6A]"
    aria-label="Sim"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// X icon for comparison tables
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-error-500 dark:text-[#E57373]"
    aria-label="Não"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

/**
 * TableCheck - Checkmark for comparison tables
 */
const TableCheck = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success-50 dark:bg-[rgba(106,191,106,0.15)]">
    <CheckIcon />
  </span>
);

/**
 * TableX - X mark for comparison tables
 */
const TableX = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-error-50 dark:bg-[rgba(229,115,115,0.15)]">
    <XIcon />
  </span>
);

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
  TableCheck,
  TableX,
  tableVariants,
};
