import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// ============================================================================
// TYPES
// ============================================================================

export interface DataPoint {
  /** X-axis label (e.g., "Jan", "Fev", "1", "2") */
  label: string;
  /** Y-axis value */
  value: number;
}

export interface DataSeries {
  /** Series identifier */
  id: string;
  /** Series display name */
  name: string;
  /** Data points for this series */
  data: DataPoint[];
  /** Optional custom color */
  color?: string;
}

// ============================================================================
// COLOR PALETTES
// ============================================================================

/** Brand-aligned color palettes for line charts */
export const lineChartColors = {
  primary: "#7A2E21",
  secondary: "#A1523C",
  accent: "#4E130D",
  teal: "#2D8B8B",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
};

/** Multi-series color sequences */
export const lineChartPalettes = {
  brand: ["#7A2E21", "#A1523C", "#D49D94", "#4E130D", "#C0614D"],
  teal: ["#2D8B8B", "#4AA8A8", "#1E6B6B", "#6BCBCB"],
  semantic: ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"],
  warm: ["#7A2E21", "#A1523C", "#F59E0B", "#EC4899"],
  cool: ["#2D8B8B", "#3B82F6", "#8B5CF6", "#22C55E"],
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Calculate min and max values from data series
 */
function getValueRange(series: DataSeries[]): { min: number; max: number } {
  const allValues = series.flatMap((s) => s.data.map((d) => d.value));
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  return { min, max };
}

/**
 * Generate nice Y-axis tick values
 */
function generateYTicks(min: number, max: number, count: number = 5): number[] {
  const range = max - min;
  const rawStep = range / (count - 1);

  // Round step to a nice number
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalized = rawStep / magnitude;
  let niceStep: number;

  if (normalized <= 1) niceStep = magnitude;
  else if (normalized <= 2) niceStep = 2 * magnitude;
  else if (normalized <= 5) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const niceMin = Math.floor(min / niceStep) * niceStep;
  const niceMax = Math.ceil(max / niceStep) * niceStep;

  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax; v += niceStep) {
    ticks.push(v);
  }

  return ticks;
}

/**
 * Format value for display (compact notation)
 */
function formatValue(value: number, format: ValueFormat = "number"): string {
  switch (format) {
    case "compact":
      if (value >= 1000000) return (value / 1000000).toFixed(1).replace(".", ",") + "M";
      if (value >= 1000) return (value / 1000).toFixed(1).replace(".", ",") + "K";
      return value.toLocaleString("pt-BR");
    case "percentage":
      return value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";
    case "currency":
      return "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    default:
      return value.toLocaleString("pt-BR");
  }
}

export type ValueFormat = "number" | "compact" | "percentage" | "currency";

/**
 * Calculate SVG path for a line
 */
function calculateLinePath(
  points: Array<{ x: number; y: number }>,
  smooth: boolean = false
): string {
  if (points.length === 0) return "";

  if (!smooth) {
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  }

  // Smooth curve using quadratic bezier
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;

    path += ` Q ${prev.x} ${prev.y} ${midX} ${(prev.y + curr.y) / 2}`;
  }

  // Final segment
  if (points.length > 1) {
    const last = points[points.length - 1];
    path += ` L ${last.x} ${last.y}`;
  }

  return path;
}

/**
 * Calculate SVG path for an area (closed shape)
 */
function calculateAreaPath(
  points: Array<{ x: number; y: number }>,
  baseY: number,
  smooth: boolean = false
): string {
  if (points.length === 0) return "";

  const linePath = calculateLinePath(points, smooth);
  const firstX = points[0].x;
  const lastX = points[points.length - 1].x;

  return `${linePath} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
}

// ============================================================================
// LINE CHART VARIANTS
// ============================================================================

const lineChartVariants = cva("relative", {
  variants: {
    size: {
      sm: "h-40",
      md: "h-56",
      lg: "h-72",
      xl: "h-96",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================================================
// LINE CHART
// ============================================================================

export interface LineChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lineChartVariants> {
  /** Data series to display */
  series: DataSeries[];
  /** Color palette for multiple series */
  palette?: keyof typeof lineChartPalettes | string[];
  /** Show area fill under line */
  showArea?: boolean;
  /** Area fill opacity (0-1) */
  areaOpacity?: number;
  /** Show data point dots */
  showDots?: boolean;
  /** Smooth curved lines */
  smooth?: boolean;
  /** Show horizontal grid lines */
  showGrid?: boolean;
  /** Show Y-axis labels */
  showYAxis?: boolean;
  /** Show X-axis labels */
  showXAxis?: boolean;
  /** Value format for labels */
  valueFormat?: ValueFormat;
  /** Number of Y-axis ticks */
  yTickCount?: number;
  /** Animation on mount */
  animated?: boolean;
  /** Callback when data point is hovered */
  onPointHover?: (series: DataSeries, point: DataPoint, index: number) => void;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      className,
      size,
      series,
      palette = "brand",
      showArea = false,
      areaOpacity = 0.15,
      showDots = true,
      smooth = true,
      showGrid = true,
      showYAxis = true,
      showXAxis = true,
      valueFormat = "compact",
      yTickCount = 5,
      animated = true,
      onPointHover,
      ...props
    },
    ref
  ) => {
    const [hoveredPoint, setHoveredPoint] = React.useState<{
      seriesIndex: number;
      pointIndex: number;
    } | null>(null);
    const [isVisible, setIsVisible] = React.useState(!animated);

    // Get colors from palette
    const colors = Array.isArray(palette)
      ? palette
      : lineChartPalettes[palette] || lineChartPalettes.brand;

    // Chart dimensions
    const padding = {
      top: 20,
      right: 20,
      bottom: showXAxis ? 40 : 20,
      left: showYAxis ? 60 : 20,
    };

    // Calculate value range
    const { min, max } = getValueRange(series);
    const yTicks = generateYTicks(min, max, yTickCount);
    const yMin = yTicks[0];
    const yMax = yTicks[yTicks.length - 1];

    // Get all X labels (assuming same labels across series)
    const xLabels = series[0]?.data.map((d) => d.label) || [];

    // Animation
    React.useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
      }
    }, [animated]);

    // Calculate point positions
    const calculatePoints = (data: DataPoint[], width: number, height: number) => {
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      return data.map((point, index) => ({
        x: padding.left + (chartWidth * index) / (data.length - 1 || 1),
        y: padding.top + chartHeight - ((point.value - yMin) / (yMax - yMin || 1)) * chartHeight,
        ...point,
      }));
    };

    const handlePointHover = (
      seriesData: DataSeries,
      point: DataPoint,
      seriesIndex: number,
      pointIndex: number
    ) => {
      setHoveredPoint({ seriesIndex, pointIndex });
      onPointHover?.(seriesData, point, pointIndex);
    };

    const handleMouseLeave = () => {
      setHoveredPoint(null);
    };

    return (
      <div
        ref={ref}
        className={cn(lineChartVariants({ size }), "w-full", className)}
        {...props}
      >
        <svg
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid meet"
          className={cn(
            "w-full h-full",
            animated && "transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            {/* Gradient definitions for area fills */}
            {series.map((s, i) => {
              const color = s.color || colors[i % colors.length];
              return (
                <linearGradient
                  key={`gradient-${s.id}`}
                  id={`area-gradient-${s.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={areaOpacity} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>

          {/* Grid lines */}
          {showGrid &&
            yTicks.map((tick, i) => {
              const y =
                padding.top +
                (200 - padding.top - padding.bottom) -
                ((tick - yMin) / (yMax - yMin || 1)) *
                  (200 - padding.top - padding.bottom);
              return (
                <line
                  key={`grid-${i}`}
                  x1={padding.left}
                  y1={y}
                  x2={400 - padding.right}
                  y2={y}
                  className="stroke-gray-100 dark:stroke-[rgba(248,232,216,0.05)]"
                  strokeWidth="1"
                />
              );
            })}

          {/* Y-axis labels */}
          {showYAxis &&
            yTicks.map((tick, i) => {
              const y =
                padding.top +
                (200 - padding.top - padding.bottom) -
                ((tick - yMin) / (yMax - yMin || 1)) *
                  (200 - padding.top - padding.bottom);
              return (
                <text
                  key={`y-label-${i}`}
                  x={padding.left - 8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="text-[10px] fill-gray-500 dark:fill-[#A89080]"
                >
                  {formatValue(tick, valueFormat)}
                </text>
              );
            })}

          {/* X-axis labels */}
          {showXAxis &&
            xLabels.map((label, i) => {
              const x =
                padding.left +
                ((400 - padding.left - padding.right) * i) / (xLabels.length - 1 || 1);
              return (
                <text
                  key={`x-label-${i}`}
                  x={x}
                  y={200 - padding.bottom + 20}
                  textAnchor="middle"
                  className="text-[10px] fill-gray-500 dark:fill-[#A89080]"
                >
                  {label}
                </text>
              );
            })}

          {/* Area fills (render first, behind lines) */}
          {showArea &&
            series.map((s, i) => {
              const color = s.color || colors[i % colors.length];
              const points = calculatePoints(s.data, 400, 200);
              const areaPath = calculateAreaPath(
                points,
                200 - padding.bottom,
                smooth
              );

              return (
                <path
                  key={`area-${s.id}`}
                  d={areaPath}
                  fill={`url(#area-gradient-${s.id})`}
                  className="transition-opacity duration-300"
                />
              );
            })}

          {/* Lines */}
          {series.map((s, i) => {
            const color = s.color || colors[i % colors.length];
            const points = calculatePoints(s.data, 400, 200);
            const linePath = calculateLinePath(points, smooth);

            return (
              <path
                key={`line-${s.id}`}
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "transition-all duration-300",
                  animated && "stroke-dasharray-1000 stroke-dashoffset-0"
                )}
                style={
                  animated
                    ? {
                        strokeDasharray: 1000,
                        strokeDashoffset: isVisible ? 0 : 1000,
                        transition: "stroke-dashoffset 1.5s ease-out",
                      }
                    : undefined
                }
              />
            );
          })}

          {/* Data point dots */}
          {showDots &&
            series.map((s, seriesIndex) => {
              const color = s.color || colors[seriesIndex % colors.length];
              const points = calculatePoints(s.data, 400, 200);

              return points.map((point, pointIndex) => {
                const isHovered =
                  hoveredPoint?.seriesIndex === seriesIndex &&
                  hoveredPoint?.pointIndex === pointIndex;

                return (
                  <g key={`dot-${s.id}-${pointIndex}`}>
                    {/* Hover area (larger, invisible) */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="12"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() =>
                        handlePointHover(s, s.data[pointIndex], seriesIndex, pointIndex)
                      }
                    />
                    {/* Visible dot */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHovered ? 6 : 4}
                      fill={isHovered ? color : "white"}
                      stroke={color}
                      strokeWidth="2"
                      className="transition-all duration-150"
                    />
                  </g>
                );
              });
            })}

          {/* Tooltip */}
          {hoveredPoint && (
            (() => {
              const s = series[hoveredPoint.seriesIndex];
              const color = s.color || colors[hoveredPoint.seriesIndex % colors.length];
              const points = calculatePoints(s.data, 400, 200);
              const point = points[hoveredPoint.pointIndex];
              const dataPoint = s.data[hoveredPoint.pointIndex];

              // Position tooltip
              const tooltipX = point.x;
              const tooltipY = point.y - 35;
              const tooltipText = formatValue(dataPoint.value, valueFormat);

              return (
                <g>
                  {/* Tooltip background */}
                  <rect
                    x={tooltipX - 30}
                    y={tooltipY - 12}
                    width="60"
                    height="24"
                    rx="4"
                    className="fill-gray-900 dark:fill-[#F8E8D8]"
                  />
                  {/* Tooltip arrow */}
                  <polygon
                    points={`${tooltipX - 5},${tooltipY + 12} ${tooltipX + 5},${tooltipY + 12} ${tooltipX},${tooltipY + 18}`}
                    className="fill-gray-900 dark:fill-[#F8E8D8]"
                  />
                  {/* Tooltip text */}
                  <text
                    x={tooltipX}
                    y={tooltipY + 4}
                    textAnchor="middle"
                    className="text-[11px] font-semibold fill-white dark:fill-[#240504]"
                  >
                    {tooltipText}
                  </text>
                </g>
              );
            })()
          )}
        </svg>
      </div>
    );
  }
);

LineChart.displayName = "LineChart";

// ============================================================================
// LINE CHART LEGEND
// ============================================================================

interface LineChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  series: DataSeries[];
  palette?: keyof typeof lineChartPalettes | string[];
  direction?: "horizontal" | "vertical";
}

const LineChartLegend = React.forwardRef<HTMLDivElement, LineChartLegendProps>(
  ({ className, series, palette = "brand", direction = "horizontal", ...props }, ref) => {
    const colors = Array.isArray(palette)
      ? palette
      : lineChartPalettes[palette] || lineChartPalettes.brand;

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4",
          direction === "vertical" ? "flex-col" : "flex-row flex-wrap justify-center",
          className
        )}
        {...props}
      >
        {series.map((s, i) => {
          const color = s.color || colors[i % colors.length];
          return (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className="w-3 h-0.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600 dark:text-[#D4B8A8]">
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);

LineChartLegend.displayName = "LineChartLegend";

// ============================================================================
// LINE CHART CARD
// ============================================================================

const lineChartCardVariants = cva("rounded-xl", {
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

export interface LineChartCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lineChartCardVariants> {
  /** Card title */
  title: string;
  /** Chart data series */
  series: DataSeries[];
  /** Color palette */
  palette?: keyof typeof lineChartPalettes | string[];
  /** Show info icon */
  showInfo?: boolean;
  /** Info click handler */
  onInfoClick?: () => void;
  /** Show legend */
  showLegend?: boolean;
  /** Legend position */
  legendPosition?: "top" | "bottom";
  /** Chart size */
  chartSize?: "sm" | "md" | "lg" | "xl";
  /** Show area fill */
  showArea?: boolean;
  /** Show data point dots */
  showDots?: boolean;
  /** Smooth curves */
  smooth?: boolean;
  /** Value format */
  valueFormat?: ValueFormat;
  /** Summary stat to display */
  summaryValue?: string | number;
  /** Summary label */
  summaryLabel?: string;
  /** Trend indicator */
  trend?: { value: string; positive: boolean };
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

const LineChartCard = React.forwardRef<HTMLDivElement, LineChartCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      series,
      palette = "brand",
      showInfo = false,
      onInfoClick,
      showLegend = true,
      legendPosition = "bottom",
      chartSize = "md",
      showArea = true,
      showDots = true,
      smooth = true,
      valueFormat = "compact",
      summaryValue,
      summaryLabel,
      trend,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(lineChartCardVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#F8E8D8]">
              {title}
            </h3>
            {summaryValue !== undefined && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-[#F8E8D8] tabular-nums">
                  {typeof summaryValue === "number"
                    ? formatValue(summaryValue, valueFormat)
                    : summaryValue}
                </span>
                {trend && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
                      trend.positive
                        ? "text-emerald-600 bg-emerald-50 dark:text-[#6ABF6A] dark:bg-[rgba(106,191,106,0.15)]"
                        : "text-red-500 bg-red-50 dark:text-[#EF5350] dark:bg-[rgba(239,83,80,0.15)]"
                    )}
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {trend.positive ? (
                        <>
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                          <polyline points="17 6 23 6 23 12" />
                        </>
                      ) : (
                        <>
                          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                          <polyline points="17 18 23 18 23 12" />
                        </>
                      )}
                    </svg>
                    {trend.value}
                  </span>
                )}
                {summaryLabel && (
                  <span className="text-xs text-gray-500 dark:text-[#A89080]">
                    {summaryLabel}
                  </span>
                )}
              </div>
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

        {/* Legend (top position) */}
        {showLegend && legendPosition === "top" && series.length > 1 && (
          <div className="mb-4">
            <LineChartLegend series={series} palette={palette} />
          </div>
        )}

        {/* Chart */}
        <LineChart
          series={series}
          palette={palette}
          size={chartSize}
          showArea={showArea}
          showDots={showDots}
          smooth={smooth}
          valueFormat={valueFormat}
        />

        {/* Legend (bottom position) */}
        {showLegend && legendPosition === "bottom" && series.length > 1 && (
          <div className="mt-4">
            <LineChartLegend series={series} palette={palette} />
          </div>
        )}
      </div>
    );
  }
);

LineChartCard.displayName = "LineChartCard";

// ============================================================================
// PRESETS
// ============================================================================

/** Month labels (Portuguese) */
export const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

/** Month labels (English) */
export const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Week labels (Portuguese) */
export const WEEKS_PT = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];

/** Day labels */
export const DAYS_NUMERIC = ["1", "2", "3", "4", "5", "6", "7"];

/**
 * Create follower growth series
 */
export function createFollowerGrowthSeries(
  data: number[],
  labels: string[] = MONTHS_PT.slice(0, data.length)
): DataSeries {
  return {
    id: "followers",
    name: "Seguidores",
    data: data.map((value, i) => ({ label: labels[i], value })),
  };
}

/**
 * Create engagement trend series
 */
export function createEngagementSeries(
  data: number[],
  labels: string[] = MONTHS_PT.slice(0, data.length)
): DataSeries {
  return {
    id: "engagement",
    name: "Engajamento",
    data: data.map((value, i) => ({ label: labels[i], value })),
  };
}

/**
 * Create comparison series (current vs previous)
 */
export function createComparisonSeries(
  currentData: number[],
  previousData: number[],
  labels: string[]
): DataSeries[] {
  return [
    {
      id: "current",
      name: "Este período",
      data: currentData.map((value, i) => ({ label: labels[i], value })),
    },
    {
      id: "previous",
      name: "Período anterior",
      data: previousData.map((value, i) => ({ label: labels[i], value })),
      color: "#A3A3A3",
    },
  ];
}

/**
 * Generate sample growth data
 */
export function generateGrowthData(
  points: number,
  startValue: number,
  endValue: number,
  variance: number = 0.1
): number[] {
  const data: number[] = [];
  const step = (endValue - startValue) / (points - 1);

  for (let i = 0; i < points; i++) {
    const base = startValue + step * i;
    const randomVariance = base * variance * (Math.random() - 0.5);
    data.push(Math.round(base + randomVariance));
  }

  // Ensure start and end values are exact
  data[0] = startValue;
  data[points - 1] = endValue;

  return data;
}

/**
 * Calculate percentage change
 */
export function calculateGrowth(startValue: number, endValue: number): {
  value: string;
  positive: boolean;
} {
  const change = ((endValue - startValue) / startValue) * 100;
  return {
    value: (change >= 0 ? "+" : "") + change.toFixed(1).replace(".", ",") + "%",
    positive: change >= 0,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  LineChart,
  LineChartLegend,
  LineChartCard,
  lineChartVariants,
  lineChartCardVariants,
  lineChartColors,
  lineChartPalettes,
  formatValue,
  generateYTicks,
};

export type { LineChartProps, LineChartCardProps, LineChartLegendProps };
