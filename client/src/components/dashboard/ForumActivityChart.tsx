import { useForumActivity } from "@/hooks/useDashboardStats";
import { ChartContainer } from "./ChartContainer";
import { Skeleton } from "@/components/ui/skeleton";

interface ForumActivityChartProps {
  dateRange?: {
    startDate?: string;
    endDate?: string;
    preset?: string;
  };
}

export function ForumActivityChart({ dateRange }: ForumActivityChartProps) {
  const { data, isLoading, error } = useForumActivity(dateRange);
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-border h-[364px]">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-36" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Forum Activity</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Failed to load forum activity data</p>
        </div>
      </div>
    );
  }
  
  const activityData = data as Array<{
    date: string;
    posts: number;
  }>;
  
  const chartData = {
    label: 'Posts',
    data: activityData.map(item => item.posts),
    borderColor: 'hsl(var(--accent))',
    backgroundColor: 'hsla(var(--accent), 0.1)',
    tension: 0.4,
    fill: true
  };
  
  const filters = [
    { key: 'posts', label: 'Posts' },
    { key: 'replies', label: 'Replies' },
    { key: 'reactions', label: 'Reactions' }
  ];
  
  return (
    <ChartContainer
      title="Forum Activity"
      chartType="line"
      data={chartData}
      labels={activityData.map(item => item.date)}
      filters={filters}
      initialFilterKey="posts"
      height={300}
      options={{
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              boxWidth: 6
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
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
