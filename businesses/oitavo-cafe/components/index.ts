// Oitavo Café UI Components
// Design System v2.0.0

// Utilities
export { cn } from "./utils/cn";

// Button
export { Button, buttonVariants } from "./ui/Button";
export type { ButtonProps } from "./ui/Button";

// Input
export { Input, Textarea } from "./ui/Input";
export type { InputProps, TextareaProps } from "./ui/Input";

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from "./ui/Card";
export type { CardProps } from "./ui/Card";

// Alert
export { Alert, alertVariants } from "./ui/Alert";
export type { AlertProps } from "./ui/Alert";

// Badge
export { Badge, badgeVariants } from "./ui/Badge";
export type { BadgeProps } from "./ui/Badge";

// Modal
export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "./ui/Modal";
export type { ModalProps } from "./ui/Modal";

// StatCard (Dashboard Metrics)
export { StatCard, StatCardGrid, LiveBadge, statCardVariants } from "./ui/StatCard";
export type { StatCardProps } from "./ui/StatCard";

// Table
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
} from "./ui/Table";
export type { TableProps } from "./ui/Table";

// Avatar
export { Avatar, AvatarGroup, avatarVariants } from "./ui/Avatar";
export type { AvatarProps } from "./ui/Avatar";

// Progress
export { Progress, CircularProgress, FunnelProgress, progressVariants } from "./ui/Progress";
export type { ProgressProps, CircularProgressProps, FunnelProgressProps, FunnelStep } from "./ui/Progress";

// Skeleton
export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  SkeletonStatCard,
  SkeletonAvatar,
} from "./ui/Skeleton";
export type { SkeletonProps } from "./ui/Skeleton";
