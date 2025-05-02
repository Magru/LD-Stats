import { useCourseCompletionTrend } from "@/hooks/useDashboardStats";
import { ChartContainer } from "./ChartContainer";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseCompletionChartProps {
  dateRange?: {
    startDate?: string;
    endDate?: string;
    preset?: string;
  };
}

export function CourseCompletionChart({ dateRange }: CourseCompletionChartProps) {
  const { data, isLoading, error } = useCourseCompletionTrend(dateRange);
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-border h-[364px]">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-48" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Course Completion Rate</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Failed to load course completion data</p>
        </div>
      </div>
    );
  }
  
  const completionData = data as Array<{
    date: string;
    rate: number;
  }>;
  
  const chartData = {
    label: 'Completion Rate (%)',
    data: completionData.map(item => item.rate),
    backgroundColor: 'hsl(var(--success))'
  };
  
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'category', label: 'By Category' }
  ];
  
  return (
    <ChartContainer
      title="Course Completion Rate"
      chartType="bar"
      data={chartData}
      labels={completionData.map(item => item.date)}
      filters={filters}
      initialFilterKey="all"
      height={300}
      options={{
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }}
    />
  );
}
