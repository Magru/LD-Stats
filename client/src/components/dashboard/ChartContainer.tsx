import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Chart from "chart.js/auto";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";

type TimeRange = "daily" | "weekly" | "monthly" | "all";

interface ChartContainerProps {
  title: string;
  filters?: {
    key: TimeRange;
    label: string;
  }[];
  initialFilterKey?: TimeRange;
  chartType: "line" | "bar" | "doughnut" | "pie" | "polarArea";
  data: any;
  labels?: string[];
  className?: string;
  aspectRatio?: number;
  height?: number;
  options?: any;
}

export function ChartContainer({
  title,
  filters,
  initialFilterKey = "all",
  chartType,
  data,
  labels,
  className,
  aspectRatio = 2,
  height = 300,
  options,
}: ChartContainerProps) {
  const [activeFilter, setActiveFilter] = useState<TimeRange>(initialFilterKey);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { direction } = useLanguage();
  const { t } = useTranslation();

  // Generate a unique ID for the chart canvas
  const chartId = useRef(`chart-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // If we don't have data yet, don't create the chart
    if (!data) return;

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    let chartData = {
      labels: labels || [],
      datasets: Array.isArray(data) ? data : [data],
    };

    // Chart.js default options based on chart type
    const defaultOptions: any = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            boxWidth: 6,
            textDirection: direction, // Support RTL text direction
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          rtl: direction === 'rtl', // Support RTL tooltip
          textDirection: direction, // Support RTL text direction
        },
      },
      scales: chartType !== 'doughnut' && chartType !== 'pie' && chartType !== 'polarArea' ? {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      } : undefined,
    };
    
    // Specific options for doughnut/pie charts
    if (chartType === 'doughnut' || chartType === 'pie') {
      defaultOptions.cutout = chartType === 'doughnut' ? '70%' : 0;
    }

    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: { ...defaultOptions, ...options },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartType, data, labels, activeFilter, options, aspectRatio, direction]);

  return (
    <Card className={cn("border shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold">{title}</h2>
          
          {filters && filters.length > 0 && (
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <Button
                  key={filter.key}
                  size="sm"
                  variant={activeFilter === filter.key ? "secondary" : "ghost"}
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded",
                    activeFilter === filter.key
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ height: `${height}px` }}>
          <canvas id={chartId.current} ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}
