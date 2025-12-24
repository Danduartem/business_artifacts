import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// RADAR CHART COMPONENT
// A beautiful spider/radar chart for multi-dimensional data visualization
// Uses warm Oitavo Café brand colors with gradient fills
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export interface RadarDataPoint {
  /** Axis label */
  label: string;
  /** Value (0-100 normalized or raw value) */
  value: number;
  /** Optional max value for this axis (default 100) */
  maxValue?: number;
}

// ============================================================================
// COLOR PRESETS
// ============================================================================

export const radarColorPresets = {
  /** Primary brand - warm burgundy to terracotta */
  brand: {
    stroke: "#A1523C",
    fill: "rgba(161, 82, 60, 0.25)",
    fillDark: "rgba(161, 82, 60, 0.35)",
    dot: "#A1523C",
  },
  /** Teal accent - for health/performance metrics */
  teal: {
    stroke: "#14B8A6",
    fill: "rgba(20, 184, 166, 0.25)",
    fillDark: "rgba(20, 184, 166, 0.35)",
    dot: "#14B8A6",
  },
  /** Primary coffee brown */
  coffee: {
    stroke: "#7A1307",
    fill: "rgba(122, 19, 7, 0.25)",
    fillDark: "rgba(122, 19, 7, 0.35)",
    dot: "#7A1307",
  },
  /** Emerald for positive/growth */
  emerald: {
    stroke: "#10B981",
    fill: "rgba(16, 185, 129, 0.25)",
    fillDark: "rgba(16, 185, 129, 0.35)",
    dot: "#10B981",
  },
  /** Amber for warning/attention */
  amber: {
    stroke: "#F59E0B",
    fill: "rgba(245, 158, 11, 0.25)",
    fillDark: "rgba(245, 158, 11, 0.35)",
    dot: "#F59E0B",
  },
};

export type RadarColorPreset = keyof typeof radarColorPresets;

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Calculate point position on radar chart
 */
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

/**
 * Create polygon path from data points
 */
function createPolygonPath(
  data: RadarDataPoint[],
  centerX: number,
  centerY: number,
  maxRadius: number
): string {
  const angleStep = 360 / data.length;

  return data
    .map((point, index) => {
      const normalizedValue = point.value / (point.maxValue || 100);
      const radius = normalizedValue * maxRadius;
      const angle = index * angleStep;
      const { x, y } = polarToCartesian(centerX, centerY, radius, angle);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ") + " Z";
}

// ============================================================================
// VARIANTS
// ============================================================================

const radarChartVariants = cva(
  "relative inline-flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-48 h-48",
        md: "w-64 h-64",
        lg: "w-80 h-80",
        xl: "w-96 h-96",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// RADAR CHART COMPONENT
// ============================================================================

export interface RadarChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radarChartVariants> {
  /** Data points to display */
  data: RadarDataPoint[];
  /** Color preset or custom colors */
  color?: RadarColorPreset | typeof radarColorPresets.brand;
  /** Number of concentric rings (default 4) */
  rings?: number;
  /** Show axis labels */
  showLabels?: boolean;
  /** Show value dots on data points */
  showDots?: boolean;
  /** Animation on mount */
  animated?: boolean;
  /** Axis label font size */
  labelSize?: "xs" | "sm" | "md";
  /** Show grid lines to axes */
  showAxisLines?: boolean;
}

const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>(
  (
    {
      className,
      size,
      data,
      color = "brand",
      rings = 4,
      showLabels = true,
      showDots = true,
      animated = true,
      labelSize = "sm",
      showAxisLines = true,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(!animated);
    const [scale, setScale] = React.useState(animated ? 0 : 1);

    // Get colors
    const colors = typeof color === "string" ? radarColorPresets[color] : color;

    // SVG dimensions
    const svgSize = 200;
    const center = svgSize / 2;
    const maxRadius = 70; // Leave room for labels
    const labelRadius = maxRadius + 25;

    // Calculate ring radii
    const ringRadii = Array.from({ length: rings }, (_, i) =>
      ((i + 1) / rings) * maxRadius
    );

    // Calculate axis angles
    const angleStep = 360 / data.length;

    // Animation effect
    React.useEffect(() => {
      if (!animated) {
        setIsVisible(true);
        setScale(1);
        return;
      }

      const showTimer = setTimeout(() => setIsVisible(true), 100);
      const scaleTimer = setTimeout(() => {
        setScale(1);
      }, 200);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(scaleTimer);
      };
    }, [animated]);

    // Create data polygon path
    const dataPath = createPolygonPath(data, center, center, maxRadius);

    // Label font sizes
    const labelFontSizes = {
      xs: "text-[8px]",
      sm: "text-[10px]",
      md: "text-xs",
    };

    return (
      <div
        ref={ref}
        className={cn(radarChartVariants({ size }), className)}
        {...props}
      >
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <defs>
            {/* Gradient fill for data area */}
            <radialGradient id="radar-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.fill} />
              <stop offset="100%" stopColor={colors.fillDark} />
            </radialGradient>
            {/* Glow filter */}
            <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Concentric rings (background grid) */}
          {ringRadii.map((radius, index) => (
            <circle
              key={`ring-${index}`}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-200 dark:text-[rgba(248,232,216,0.1)]"
              strokeDasharray={index === ringRadii.length - 1 ? "none" : "2 4"}
            />
          ))}

          {/* Axis lines from center to each point */}
          {showAxisLines &&
            data.map((_, index) => {
              const angle = index * angleStep;
              const end = polarToCartesian(center, center, maxRadius, angle);
              return (
                <line
                  key={`axis-${index}`}
                  x1={center}
                  y1={center}
                  x2={end.x}
                  y2={end.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-200 dark:text-[rgba(248,232,216,0.1)]"
                />
              );
            })}

          {/* Data polygon with animation */}
          <g
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Fill area */}
            <path
              d={dataPath}
              fill="url(#radar-gradient)"
              stroke={colors.stroke}
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#radar-glow)"
            />

            {/* Data point dots */}
            {showDots &&
              data.map((point, index) => {
                const normalizedValue = point.value / (point.maxValue || 100);
                const radius = normalizedValue * maxRadius;
                const angle = index * angleStep;
                const { x, y } = polarToCartesian(center, center, radius, angle);
                return (
                  <circle
                    key={`dot-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={colors.dot}
                    stroke="white"
                    strokeWidth="2"
                    className="dark:stroke-[#1A0604]"
                  />
                );
              })}
          </g>

          {/* Labels */}
          {showLabels &&
            data.map((point, index) => {
              const angle = index * angleStep;
              const { x, y } = polarToCartesian(center, center, labelRadius, angle);

              // Adjust text anchor based on position
              let textAnchor: "start" | "middle" | "end" = "middle";
              let dx = 0;
              if (x < center - 10) {
                textAnchor = "end";
                dx = -2;
              } else if (x > center + 10) {
                textAnchor = "start";
                dx = 2;
              }

              // Adjust vertical position
              let dy = 0;
              if (y < center - 20) dy = -2;
              if (y > center + 20) dy = 8;

              return (
                <text
                  key={`label-${index}`}
                  x={x + dx}
                  y={y + dy}
                  textAnchor={textAnchor}
                  className={cn(
                    labelFontSizes[labelSize],
                    "fill-gray-600 dark:fill-[#D4B8A8] font-medium"
                  )}
                >
                  {point.label}
                </text>
              );
            })}
        </svg>
      </div>
    );
  }
);

RadarChart.displayName = "RadarChart";

// ============================================================================
// RADAR CHART CARD
// ============================================================================

const radarChartCardVariants = cva("rounded-2xl", {
  variants: {
    variant: {
      default: [
        "bg-white border border-gray-100",
        "dark:bg-[rgba(0,0,0,0.2)] dark:border-[rgba(248,232,216,0.05)]",
      ],
      elevated: [
        "bg-white shadow-xl",
        "dark:bg-[rgba(0,0,0,0.3)] dark:shadow-none dark:border dark:border-[rgba(248,232,216,0.05)]",
      ],
      flat: "bg-transparent",
    },
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export interface RadarChartCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radarChartCardVariants> {
  /** Card title */
  title: string;
  /** Subtitle/description */
  subtitle?: string;
  /** Chart data */
  data: RadarDataPoint[];
  /** Color preset */
  color?: RadarColorPreset;
  /** Chart size */
  chartSize?: "sm" | "md" | "lg" | "xl";
  /** Show info icon */
  showInfo?: boolean;
  /** Info click handler */
  onInfoClick?: () => void;
  /** Footer content */
  footer?: React.ReactNode;
  /** Header icon */
  headerIcon?: React.ReactNode;
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

const RadarChartCard = React.forwardRef<HTMLDivElement, RadarChartCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      subtitle,
      data,
      color = "brand",
      chartSize = "md",
      showInfo = false,
      onInfoClick,
      footer,
      headerIcon,
      ...props
    },
    ref
  ) => {
    // Calculate overall score as average
    const averageScore = Math.round(
      data.reduce((sum, point) => {
        const normalized = point.value / (point.maxValue || 100);
        return sum + normalized * 100;
      }, 0) / data.length
    );

    return (
      <div
        ref={ref}
        className={cn(radarChartCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2">
              {headerIcon && (
                <span className="text-accent-500 dark:text-[#A1523C]">{headerIcon}</span>
              )}
              <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
                {title}
              </h3>
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-[#A89080] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
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

        {/* Chart */}
        <div className="flex justify-center">
          <RadarChart data={data} color={color} size={chartSize} />
        </div>

        {/* Score summary */}
        <div className="text-center mt-2">
          <span className="text-sm font-medium text-gray-700 dark:text-[#D4B8A8]">
            Status:{" "}
            <span
              className={cn(
                "font-semibold",
                averageScore >= 65
                  ? "text-emerald-600 dark:text-emerald-400"
                  : averageScore >= 40
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {averageScore >= 65 ? "Bom" : averageScore >= 40 ? "Regular" : "Crítico"}{" "}
              ({averageScore} pontos)
            </span>
          </span>
        </div>

        {/* Axis breakdown */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[rgba(248,232,216,0.08)]">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-[#A89080]">
            {data.map((point, index) => (
              <span key={index}>
                {point.label} ({Math.round(point.value)}%)
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[rgba(248,232,216,0.08)]">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

RadarChartCard.displayName = "RadarChartCard";

// ============================================================================
// PRESETS
// ============================================================================

/**
 * Instagram algorithm health metrics preset
 */
export const instagramAlgorithmPreset = {
  create: (data: {
    watchTime: number;
    shares: number;
    saves: number;
    engagement: number;
    comments?: number;
    reach?: number;
  }): RadarDataPoint[] => {
    const points: RadarDataPoint[] = [
      { label: "Watch Time", value: data.watchTime },
      { label: "Shares", value: data.shares },
      { label: "Saves", value: data.saves },
      { label: "Engagement", value: data.engagement },
    ];

    if (data.comments !== undefined) {
      points.push({ label: "Comments", value: data.comments });
    }
    if (data.reach !== undefined) {
      points.push({ label: "Reach", value: data.reach });
    }

    return points;
  },
};

/**
 * Content performance preset
 */
export const contentPerformancePreset = {
  create: (data: {
    reach: number;
    engagement: number;
    saves: number;
    shares: number;
    comments: number;
  }): RadarDataPoint[] => [
    { label: "Alcance", value: data.reach },
    { label: "Engajamento", value: data.engagement },
    { label: "Salvamentos", value: data.saves },
    { label: "Compartilhamentos", value: data.shares },
    { label: "Comentários", value: data.comments },
  ],
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  RadarChart,
  RadarChartCard,
  radarChartVariants,
  radarChartCardVariants,
  radarColorPresets,
  polarToCartesian,
  createPolygonPath,
};

export type { RadarChartProps, RadarChartCardProps };
