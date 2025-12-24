import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// TYPES
// ============================================================================

export type ContentType = "reel" | "post" | "story" | "carousel" | "video";

export interface ContentMetric {
  /** Metric type */
  type: "likes" | "comments" | "views" | "saves" | "shares" | "reach" | "impressions";
  /** Metric value */
  value: number;
}

export interface ContentItem {
  /** Unique identifier */
  id: string;
  /** Thumbnail image URL */
  thumbnail: string;
  /** Content type */
  type: ContentType;
  /** Engagement metrics */
  metrics: ContentMetric[];
  /** Optional caption/title */
  caption?: string;
  /** Post date */
  date?: string;
  /** Link to original content */
  link?: string;
  /** Rank position (1, 2, 3...) */
  rank?: number;
}

// ============================================================================
// ICONS
// ============================================================================

const contentTypeIcons: Record<ContentType, React.FC<{ className?: string }>> = {
  reel: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  ),
  post: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  ),
  story: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="12" cy="12" r="6" />
    </svg>
  ),
  carousel: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
    </svg>
  ),
  video: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  ),
};

const metricIcons: Record<ContentMetric["type"], React.FC<{ className?: string }>> = {
  likes: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  comments: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
    </svg>
  ),
  views: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  ),
  saves: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  ),
  shares: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  ),
  reach: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  impressions: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format number for display (compact notation)
 */
function formatNumber(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1).replace(".", ",") + "M";
  if (value >= 1000) return (value / 1000).toFixed(1).replace(".", ",") + "K";
  return value.toLocaleString("pt-BR");
}

/**
 * Get content type label in Portuguese
 */
function getContentTypeLabel(type: ContentType): string {
  const labels: Record<ContentType, string> = {
    reel: "Reel",
    post: "Post",
    story: "Story",
    carousel: "Carrossel",
    video: "Vídeo",
  };
  return labels[type];
}

// ============================================================================
// CONTENT TYPE BADGE
// ============================================================================

const contentTypeBadgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm",
  {
    variants: {
      type: {
        reel: "bg-[rgba(122,46,33,0.85)] text-white",
        post: "bg-[rgba(45,139,139,0.85)] text-white",
        story: "bg-[rgba(161,82,60,0.85)] text-white",
        carousel: "bg-[rgba(78,19,13,0.85)] text-white",
        video: "bg-[rgba(139,92,246,0.85)] text-white",
      },
    },
    defaultVariants: {
      type: "post",
    },
  }
);

interface ContentTypeBadgeProps {
  type: ContentType;
  showLabel?: boolean;
  className?: string;
}

const ContentTypeBadge: React.FC<ContentTypeBadgeProps> = ({
  type,
  showLabel = true,
  className,
}) => {
  const Icon = contentTypeIcons[type];

  return (
    <span className={cn(contentTypeBadgeVariants({ type }), className)}>
      <Icon className="w-3.5 h-3.5" />
      {showLabel && <span>{getContentTypeLabel(type)}</span>}
    </span>
  );
};

// ============================================================================
// RANK BADGE
// ============================================================================

const rankBadgeVariants = cva(
  "absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg",
  {
    variants: {
      rank: {
        1: "bg-gradient-to-br from-yellow-400 to-amber-500 text-amber-900",
        2: "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700",
        3: "bg-gradient-to-br from-amber-600 to-amber-700 text-amber-100",
        default: "bg-white/90 text-gray-700 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      rank: "default",
    },
  }
);

interface RankBadgeProps {
  rank: number;
  className?: string;
}

const RankBadge: React.FC<RankBadgeProps> = ({ rank, className }) => {
  const variant = rank <= 3 ? (rank as 1 | 2 | 3) : "default";

  return (
    <span className={cn(rankBadgeVariants({ rank: variant }), className)}>
      {rank}
    </span>
  );
};

// ============================================================================
// CONTENT CARD
// ============================================================================

const contentCardVariants = cva(
  "group relative overflow-hidden rounded-xl transition-all duration-200",
  {
    variants: {
      variant: {
        default: [
          "bg-white border border-gray-100",
          "dark:bg-[rgba(0,0,0,0.2)] dark:border-[rgba(248,232,216,0.05)]",
        ],
        elevated: [
          "bg-white shadow-lg hover:shadow-xl",
          "dark:bg-[rgba(0,0,0,0.3)] dark:shadow-none dark:border dark:border-[rgba(248,232,216,0.05)]",
        ],
        minimal: "bg-transparent",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ContentCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentCardVariants> {
  /** Content item data */
  item: ContentItem;
  /** Show rank badge */
  showRank?: boolean;
  /** Show content type badge */
  showType?: boolean;
  /** Show metrics overlay */
  showMetrics?: boolean;
  /** Metrics to display (default: all) */
  visibleMetrics?: ContentMetric["type"][];
  /** Aspect ratio of thumbnail */
  aspectRatio?: "square" | "portrait" | "landscape";
  /** Click handler */
  onCardClick?: (item: ContentItem) => void;
}

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-video",
};

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  (
    {
      className,
      variant,
      size,
      item,
      showRank = true,
      showType = true,
      showMetrics = true,
      visibleMetrics = ["likes", "comments", "views"],
      aspectRatio = "square",
      onCardClick,
      ...props
    },
    ref
  ) => {
    const displayMetrics = item.metrics.filter((m) =>
      visibleMetrics.includes(m.type)
    );

    return (
      <div
        ref={ref}
        className={cn(
          contentCardVariants({ variant, size }),
          onCardClick && "cursor-pointer hover:scale-[1.02]",
          className
        )}
        onClick={() => onCardClick?.(item)}
        {...props}
      >
        {/* Thumbnail */}
        <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio])}>
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${item.thumbnail})` }}
          />

          {/* Gradient overlay for metrics */}
          {showMetrics && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          )}

          {/* Rank badge */}
          {showRank && item.rank && <RankBadge rank={item.rank} />}

          {/* Content type badge */}
          {showType && (
            <div className="absolute top-2 right-2">
              <ContentTypeBadge type={item.type} showLabel={false} />
            </div>
          )}

          {/* Metrics overlay (on hover) */}
          {showMetrics && displayMetrics.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center justify-center gap-4">
                {displayMetrics.map((metric) => {
                  const Icon = metricIcons[metric.type];
                  return (
                    <div
                      key={metric.type}
                      className="flex items-center gap-1 text-white"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold tabular-nums">
                        {formatNumber(metric.value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Caption (optional) */}
        {item.caption && (
          <div className="p-3">
            <p className="text-sm text-gray-600 dark:text-[#D4B8A8] line-clamp-2">
              {item.caption}
            </p>
            {item.date && (
              <p className="text-xs text-gray-400 dark:text-[#7A5A4A] mt-1">
                {item.date}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

ContentCard.displayName = "ContentCard";

// ============================================================================
// CONTENT GRID
// ============================================================================

const contentGridVariants = cva("grid gap-4", {
  variants: {
    columns: {
      2: "grid-cols-2",
      3: "grid-cols-2 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "md",
  },
});

export interface ContentGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentGridVariants> {
  /** Content items to display */
  items: ContentItem[];
  /** Card variant */
  cardVariant?: ContentCardProps["variant"];
  /** Show rank badges */
  showRanks?: boolean;
  /** Show content type badges */
  showTypes?: boolean;
  /** Show metrics on hover */
  showMetrics?: boolean;
  /** Metrics to display */
  visibleMetrics?: ContentMetric["type"][];
  /** Aspect ratio for cards */
  aspectRatio?: ContentCardProps["aspectRatio"];
  /** Card click handler */
  onCardClick?: (item: ContentItem) => void;
}

const ContentGrid = React.forwardRef<HTMLDivElement, ContentGridProps>(
  (
    {
      className,
      columns,
      gap,
      items,
      cardVariant = "default",
      showRanks = true,
      showTypes = true,
      showMetrics = true,
      visibleMetrics = ["likes", "comments", "views"],
      aspectRatio = "square",
      onCardClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(contentGridVariants({ columns, gap }), className)}
        {...props}
      >
        {items.map((item, index) => (
          <ContentCard
            key={item.id}
            item={{ ...item, rank: item.rank ?? index + 1 }}
            variant={cardVariant}
            showRank={showRanks}
            showType={showTypes}
            showMetrics={showMetrics}
            visibleMetrics={visibleMetrics}
            aspectRatio={aspectRatio}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    );
  }
);

ContentGrid.displayName = "ContentGrid";

// ============================================================================
// TOP CONTENT CARD (Card wrapper with title)
// ============================================================================

const topContentCardVariants = cva("rounded-xl", {
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
      flat: "bg-transparent",
    },
    padding: {
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export interface TopContentCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof topContentCardVariants> {
  /** Card title */
  title: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Content items */
  items: ContentItem[];
  /** Number of columns */
  columns?: ContentGridProps["columns"];
  /** Show info icon */
  showInfo?: boolean;
  /** Info click handler */
  onInfoClick?: () => void;
  /** Show rank badges */
  showRanks?: boolean;
  /** Show content type badges */
  showTypes?: boolean;
  /** Show metrics on hover */
  showMetrics?: boolean;
  /** Visible metrics */
  visibleMetrics?: ContentMetric["type"][];
  /** Aspect ratio */
  aspectRatio?: ContentCardProps["aspectRatio"];
  /** Card click handler */
  onCardClick?: (item: ContentItem) => void;
  /** View all link */
  viewAllLink?: string;
  /** View all click handler */
  onViewAll?: () => void;
}

const InfoIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const TopContentCard = React.forwardRef<HTMLDivElement, TopContentCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      subtitle,
      items,
      columns = 3,
      showInfo = false,
      onInfoClick,
      showRanks = true,
      showTypes = true,
      showMetrics = true,
      visibleMetrics = ["likes", "comments", "views"],
      aspectRatio = "square",
      onCardClick,
      viewAllLink,
      onViewAll,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(topContentCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-[#A89080] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {(viewAllLink || onViewAll) && (
              <a
                href={viewAllLink}
                onClick={(e) => {
                  if (onViewAll) {
                    e.preventDefault();
                    onViewAll();
                  }
                }}
                className="text-xs font-medium text-accent-500 hover:text-accent-600 dark:text-[#A1523C] dark:hover:text-[#C0614D] transition-colors"
              >
                Ver todos
              </a>
            )}
            {showInfo && (
              <button
                type="button"
                onClick={onInfoClick}
                className="text-gray-400 hover:text-gray-600 dark:text-[#7A5A4A] dark:hover:text-[#A89080] transition-colors"
              >
                <InfoIcon />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <ContentGrid
          items={items}
          columns={columns}
          showRanks={showRanks}
          showTypes={showTypes}
          showMetrics={showMetrics}
          visibleMetrics={visibleMetrics}
          aspectRatio={aspectRatio}
          onCardClick={onCardClick}
        />
      </div>
    );
  }
);

TopContentCard.displayName = "TopContentCard";

// ============================================================================
// CONTENT LIST (Alternative layout)
// ============================================================================

export interface ContentListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content items */
  items: ContentItem[];
  /** Show rank */
  showRank?: boolean;
  /** Max items to show */
  maxItems?: number;
  /** Card click handler */
  onCardClick?: (item: ContentItem) => void;
}

const ContentList = React.forwardRef<HTMLDivElement, ContentListProps>(
  (
    {
      className,
      items,
      showRank = true,
      maxItems = 5,
      onCardClick,
      ...props
    },
    ref
  ) => {
    const displayItems = items.slice(0, maxItems);

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {displayItems.map((item, index) => {
          const rank = item.rank ?? index + 1;
          const mainMetric = item.metrics[0];

          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                "hover:bg-gray-50 dark:hover:bg-[rgba(248,232,216,0.05)]",
                onCardClick && "cursor-pointer"
              )}
              onClick={() => onCardClick?.(item)}
            >
              {/* Rank */}
              {showRank && (
                <span
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                    rank === 1 && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                    rank === 2 && "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
                    rank === 3 && "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                    rank > 3 && "bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400"
                  )}
                >
                  {rank}
                </span>
              )}

              {/* Thumbnail */}
              <div
                className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url(${item.thumbnail})` }}
              />

              {/* Content info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <ContentTypeBadge
                    type={item.type}
                    showLabel={false}
                    className="!px-1.5 !py-0.5"
                  />
                  {item.caption && (
                    <p className="text-sm text-gray-700 dark:text-[#D4B8A8] truncate">
                      {item.caption}
                    </p>
                  )}
                </div>
                {item.date && (
                  <p className="text-xs text-gray-400 dark:text-[#7A5A4A] mt-0.5">
                    {item.date}
                  </p>
                )}
              </div>

              {/* Main metric */}
              {mainMetric && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {React.createElement(metricIcons[mainMetric.type], {
                    className: "w-4 h-4 text-gray-400 dark:text-[#7A5A4A]",
                  })}
                  <span className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
                    {formatNumber(mainMetric.value)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

ContentList.displayName = "ContentList";

// ============================================================================
// PRESETS
// ============================================================================

/**
 * Create a content item with common defaults
 */
export function createContentItem(
  id: string,
  thumbnail: string,
  type: ContentType,
  metrics: Partial<Record<ContentMetric["type"], number>>,
  options?: {
    caption?: string;
    date?: string;
    rank?: number;
    link?: string;
  }
): ContentItem {
  const metricsList: ContentMetric[] = Object.entries(metrics).map(
    ([type, value]) => ({
      type: type as ContentMetric["type"],
      value: value as number,
    })
  );

  return {
    id,
    thumbnail,
    type,
    metrics: metricsList,
    ...options,
  };
}

/**
 * Create sample content items for demos
 */
export function createSampleContent(count: number = 6): ContentItem[] {
  const types: ContentType[] = ["reel", "post", "carousel", "story", "video"];
  const items: ContentItem[] = [];

  for (let i = 0; i < count; i++) {
    items.push({
      id: `content-${i + 1}`,
      thumbnail: `https://picsum.photos/seed/${i + 1}/400/400`,
      type: types[i % types.length],
      metrics: [
        { type: "likes", value: Math.floor(Math.random() * 5000) + 500 },
        { type: "comments", value: Math.floor(Math.random() * 200) + 20 },
        { type: "views", value: Math.floor(Math.random() * 50000) + 5000 },
        { type: "saves", value: Math.floor(Math.random() * 300) + 30 },
      ],
      rank: i + 1,
      date: `${Math.floor(Math.random() * 28) + 1} de dez`,
    });
  }

  return items;
}

/**
 * Sort content by metric
 */
export function sortContentByMetric(
  items: ContentItem[],
  metricType: ContentMetric["type"],
  ascending: boolean = false
): ContentItem[] {
  return [...items].sort((a, b) => {
    const aValue = a.metrics.find((m) => m.type === metricType)?.value ?? 0;
    const bValue = b.metrics.find((m) => m.type === metricType)?.value ?? 0;
    return ascending ? aValue - bValue : bValue - aValue;
  });
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ContentCard,
  ContentGrid,
  TopContentCard,
  ContentList,
  ContentTypeBadge,
  RankBadge,
  contentCardVariants,
  contentGridVariants,
  topContentCardVariants,
  contentTypeBadgeVariants,
  rankBadgeVariants,
  contentTypeIcons,
  metricIcons,
  formatNumber as formatContentNumber,
  getContentTypeLabel,
};

export type { ContentCardProps, ContentGridProps, TopContentCardProps, ContentListProps };
