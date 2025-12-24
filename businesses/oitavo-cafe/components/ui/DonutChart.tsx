import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// TYPES
// ============================================================================

export interface DonutSegment {
  /** Segment label */
  label: string;
  /** Segment value (will be converted to percentage) */
  value: number;
  /** Optional custom color (hex or CSS color) */
  color?: string;
}

// ============================================================================
// COLOR PALETTES
// ============================================================================

/** Brand-aligned color palettes for donut charts */
export const donutColorPalettes = {
  /** Primary brand colors - warm coffee tones */
  brand: [
    "#7A2E21", // primary-600
    "#A1523C", // accent-500
    "#D49D94", // primary-300
    "#4E130D", // primary-700
    "#C0614D", // secondary-400
    "#E5C9BD", // accent-200
  ],
  /** Gender breakdown - traditional but accessible */
  gender: [
    "#A1523C", // Women - terracotta
    "#4E130D", // Men - deep burgundy
    "#D49D94", // Other/Non-binary - soft rose
  ],
  /** Teal accent palette */
  teal: [
    "#2D8B8B", // teal primary
    "#4AA8A8", // teal light
    "#1E6B6B", // teal dark
    "#6BCBCB", // teal lighter
    "#0E4B4B", // teal darker
  ],
  /** Semantic/status colors */
  semantic: [
    "#22C55E", // success
    "#3B82F6", // info
    "#F59E0B", // warning
    "#EF4444", // error
    "#8B5CF6", // purple
    "#EC4899", // pink
  ],
  /** Neutral grayscale */
  neutral: [
    "#525252", // gray-700
    "#878787", // gray-500
    "#A3A3A3", // gray-400
    "#BFBFBF", // gray-300
    "#D9D9D9", // gray-200
  ],
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Calculate percentage from value and total
 */
function toPercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Format percentage for display (Brazilian locale)
 */
function formatPercentage(value: number, decimals: number = 1): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }) + "%";
}

/**
 * Calculate SVG arc path for a donut segment
 */
function describeArc(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
): string {
  // Convert angles from degrees to radians
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;

  // Calculate outer arc points
  const outerStartX = cx + outerRadius * Math.cos(startRad);
  const outerStartY = cy + outerRadius * Math.sin(startRad);
  const outerEndX = cx + outerRadius * Math.cos(endRad);
  const outerEndY = cy + outerRadius * Math.sin(endRad);

  // Calculate inner arc points
  const innerStartX = cx + innerRadius * Math.cos(startRad);
  const innerStartY = cy + innerRadius * Math.sin(startRad);
  const innerEndX = cx + innerRadius * Math.cos(endRad);
  const innerEndY = cy + innerRadius * Math.sin(endRad);

  // Determine if arc should be drawn as large arc
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  // Build SVG path
  const path = [
    `M ${outerStartX} ${outerStartY}`, // Move to outer start
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`, // Outer arc
    `L ${innerEndX} ${innerEndY}`, // Line to inner end
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`, // Inner arc (reverse)
    "Z", // Close path
  ].join(" ");

  return path;
}

// ============================================================================
// DONUT SEGMENT COMPONENT
// ============================================================================

interface DonutSegmentPathProps {
  cx: number;
  cy: number;
  outerRadius: number;
  innerRadius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

const DonutSegmentPath: React.FC<DonutSegmentPathProps> = ({
  cx,
  cy,
  outerRadius,
  innerRadius,
  startAngle,
  endAngle,
  color,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  className,
}) => {
  // Add small gap between segments
  const gapAngle = 1;
  const adjustedStart = startAngle + gapAngle / 2;
  const adjustedEnd = endAngle - gapAngle / 2;

  // Don't render if segment is too small
  if (adjustedEnd <= adjustedStart) return null;

  const path = describeArc(
    cx,
    cy,
    isHovered ? outerRadius + 4 : outerRadius,
    innerRadius,
    adjustedStart,
    adjustedEnd
  );

  return (
    <path
      d={path}
      fill={color}
      className={cn(
        "transition-all duration-200 ease-out cursor-pointer",
        isHovered && "filter drop-shadow-lg",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

// ============================================================================
// DONUT CHART
// ============================================================================

const donutChartVariants = cva("relative inline-flex items-center justify-center flex-none", {
  variants: {
    size: {
      sm: "w-32 h-32",
      md: "w-48 h-48",
      lg: "w-64 h-64",
      xl: "w-80 h-80",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface DonutChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof donutChartVariants> {
  /** Data segments to display */
  segments: DonutSegment[];
  /** Color palette to use */
  palette?: keyof typeof donutColorPalettes | string[];
  /** Inner radius as percentage of outer radius (0 = pie, 0.6 = donut) */
  innerRadius?: number;
  /** Center content (label, value, icon) */
  centerContent?: React.ReactNode;
  /** Show percentage labels on segments */
  showLabels?: boolean;
  /** Animation on mount */
  animated?: boolean;
  /** Callback when segment is hovered */
  onSegmentHover?: (segment: DonutSegment | null, index: number) => void;
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      className,
      size,
      segments,
      palette = "brand",
      innerRadius = 0.6,
      centerContent,
      showLabels = false,
      animated = true,
      onSegmentHover,
      ...props
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    const [isVisible, setIsVisible] = React.useState(!animated);

    // Get colors from palette
    const colors = Array.isArray(palette)
      ? palette
      : donutColorPalettes[palette] || donutColorPalettes.brand;

    // Calculate total and percentages
    const total = segments.reduce((sum, seg) => sum + seg.value, 0);

    // Calculate angles for each segment
    let currentAngle = 0;
    const segmentAngles = segments.map((segment) => {
      const percentage = toPercentage(segment.value, total);
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      return { startAngle, endAngle, percentage };
    });

    // SVG dimensions
    const svgSize = 200;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const outerRadius = 90;
    const innerRadiusValue = outerRadius * innerRadius;

    // Animation on mount
    React.useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
      }
    }, [animated]);

    const handleMouseEnter = (segment: DonutSegment, index: number) => {
      setHoveredIndex(index);
      onSegmentHover?.(segment, index);
    };

    const handleMouseLeave = () => {
      setHoveredIndex(null);
      onSegmentHover?.(null, -1);
    };

    return (
      <div
        ref={ref}
        className={cn(donutChartVariants({ size }), className)}
        {...props}
      >
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={cn(
            "w-full h-full",
            animated && "transition-opacity duration-500",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {segments.map((segment, index) => {
            const { startAngle, endAngle } = segmentAngles[index];
            const color = segment.color || colors[index % colors.length];

            return (
              <DonutSegmentPath
                key={index}
                cx={cx}
                cy={cy}
                outerRadius={outerRadius}
                innerRadius={innerRadiusValue}
                startAngle={startAngle}
                endAngle={endAngle}
                color={color}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => handleMouseEnter(segment, index)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </svg>

        {/* Center content */}
        {centerContent && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {centerContent}
          </div>
        )}
      </div>
    );
  }
);

DonutChart.displayName = "DonutChart";

// ============================================================================
// DONUT CHART LEGEND
// ============================================================================

interface DonutChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: DonutSegment[];
  palette?: keyof typeof donutColorPalettes | string[];
  /** Show percentages in legend */
  showPercentages?: boolean;
  /** Show values in legend */
  showValues?: boolean;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Size of color indicators */
  indicatorSize?: "sm" | "md";
}

const DonutChartLegend = React.forwardRef<HTMLDivElement, DonutChartLegendProps>(
  (
    {
      className,
      segments,
      palette = "brand",
      showPercentages = true,
      showValues = false,
      direction = "vertical",
      indicatorSize = "md",
      ...props
    },
    ref
  ) => {
    const colors = Array.isArray(palette)
      ? palette
      : donutColorPalettes[palette] || donutColorPalettes.brand;

    const total = segments.reduce((sum, seg) => sum + seg.value, 0);

    const indicatorSizes = {
      sm: "w-2 h-2",
      md: "w-3 h-3",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3",
          direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className
        )}
        {...props}
      >
        {segments.map((segment, index) => {
          const color = segment.color || colors[index % colors.length];
          const percentage = toPercentage(segment.value, total);

          return (
            <div key={index} className="flex items-center gap-2">
              <span
                className={cn("rounded-full shrink-0", indicatorSizes[indicatorSize])}
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-gray-700 dark:text-[#D4B8A8]">
                {segment.label}
              </span>
              {showPercentages && (
                <span className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
                  {formatPercentage(percentage)}
                </span>
              )}
              {showValues && (
                <span className="text-sm text-gray-500 dark:text-[#A89080] tabular-nums">
                  ({segment.value.toLocaleString("pt-BR")})
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

DonutChartLegend.displayName = "DonutChartLegend";

// ============================================================================
// DONUT CHART CARD
// ============================================================================

const donutChartCardVariants = cva("rounded-xl", {
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

export interface DonutChartCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof donutChartCardVariants> {
  /** Card title */
  title: string;
  /** Chart segments */
  segments: DonutSegment[];
  /** Color palette */
  palette?: keyof typeof donutColorPalettes | string[];
  /** Show info icon */
  showInfo?: boolean;
  /** Info click handler */
  onInfoClick?: () => void;
  /** Chart size */
  chartSize?: "sm" | "md" | "lg";
  /** Inner radius (0 = pie, 0.6 = donut) */
  innerRadius?: number;
  /** Center content */
  centerContent?: React.ReactNode;
  /** Legend position */
  legendPosition?: "right" | "bottom" | "none";
  /** Show percentages in legend */
  showPercentages?: boolean;
  /** Show values in legend */
  showValues?: boolean;
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

const DonutChartCard = React.forwardRef<HTMLDivElement, DonutChartCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      segments,
      palette = "brand",
      showInfo = false,
      onInfoClick,
      chartSize = "md",
      innerRadius = 0.6,
      centerContent,
      legendPosition = "right",
      showPercentages = true,
      showValues = false,
      ...props
    },
    ref
  ) => {
    const isHorizontal = legendPosition === "right";

    return (
      <div
        ref={ref}
        className={cn(donutChartCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
            {title}
          </h3>
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

        {/* Content */}
        <div
          className={cn(
            "flex",
            isHorizontal ? "flex-row items-center gap-6" : "flex-col items-center gap-4"
          )}
        >
          {/* Chart */}
          <DonutChart
            segments={segments}
            palette={palette}
            size={chartSize}
            innerRadius={innerRadius}
            centerContent={centerContent}
          />

          {/* Legend */}
          {legendPosition !== "none" && (
            <DonutChartLegend
              segments={segments}
              palette={palette}
              showPercentages={showPercentages}
              showValues={showValues}
              direction="vertical"
            />
          )}
        </div>
      </div>
    );
  }
);

DonutChartCard.displayName = "DonutChartCard";

// ============================================================================
// PRESETS
// ============================================================================

/** Gender breakdown preset */
export const genderPreset = {
  palette: "gender" as const,
  segments: (women: number, men: number, other?: number): DonutSegment[] => {
    const result: DonutSegment[] = [
      { label: "Mulheres", value: women },
      { label: "Homens", value: men },
    ];
    if (other !== undefined && other > 0) {
      result.push({ label: "Outros", value: other });
    }
    return result;
  },
};

/** Content type breakdown preset */
export const contentTypePreset = {
  palette: "brand" as const,
  segments: (reels: number, posts: number, stories: number): DonutSegment[] => [
    { label: "Reels", value: reels },
    { label: "Posts", value: posts },
    { label: "Stories", value: stories },
  ],
};

/** Age breakdown preset */
export const agePreset = {
  palette: "brand" as const,
  segments: (data: Record<string, number>): DonutSegment[] =>
    Object.entries(data).map(([label, value]) => ({ label, value })),
};

/**
 * Create gender chart data
 */
export function createGenderChart(
  women: number,
  men: number,
  other?: number
): { segments: DonutSegment[]; palette: keyof typeof donutColorPalettes } {
  return {
    segments: genderPreset.segments(women, men, other),
    palette: genderPreset.palette,
  };
}

/**
 * Create content type chart data
 */
export function createContentTypeChart(
  reels: number,
  posts: number,
  stories: number
): { segments: DonutSegment[]; palette: keyof typeof donutColorPalettes } {
  return {
    segments: contentTypePreset.segments(reels, posts, stories),
    palette: contentTypePreset.palette,
  };
}

// ============================================================================
// CENTER CONTENT COMPONENTS
// ============================================================================

interface DonutCenterProps {
  value: string | number;
  label?: string;
  className?: string;
}

/** Pre-styled center content for donut charts */
const DonutCenter: React.FC<DonutCenterProps> = ({ value, label, className }) => (
  <div className={cn("text-center", className)}>
    <div className="text-2xl font-bold text-gray-900 dark:text-[#F8E8D8]">
      {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
    </div>
    {label && (
      <div className="text-xs text-gray-500 dark:text-[#A89080]">{label}</div>
    )}
  </div>
);

// ============================================================================
// EXPORTS
// ============================================================================

export {
  DonutChart,
  DonutChartLegend,
  DonutChartCard,
  DonutCenter,
  donutChartVariants,
  donutChartCardVariants,
  formatPercentage,
  toPercentage,
};

export type {
  DonutChartProps,
  DonutChartLegendProps,
  DonutChartCardProps,
};
