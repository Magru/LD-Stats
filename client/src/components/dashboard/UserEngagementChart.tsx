import { useUserEngagement } from "@/hooks/useDashboardStats";
import { ChartContainer } from "./ChartContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import { type DateRange } from "@shared/schema";

interface UserEngagementChartProps {
  dateRange?: DateRange;
}

export function UserEngagementChart({ dateRange }: UserEngagementChartProps) {
  const { data, isLoading, error } = useUserEngagement(dateRange);
  const { t } = useTranslation();
  const { direction } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-border h-[364px]">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-40" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">{t('userEngagement')}</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{t('failedToLoadData')}</p>
        </div>
      </div>
    );
  }
  
  const engagementData = data as Array<{
    date: string;
    courseViews: number;
    forumActivity: number;
  }>;
  
  const chartData = [
    {
      label: 'Course Views',
      data: engagementData.map(item => item.courseViews),
      borderColor: 'hsl(var(--primary))',
      backgroundColor: 'hsla(var(--primary), 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Forum Activity',
      data: engagementData.map(item => item.forumActivity),
      borderColor: 'hsl(var(--accent))',
      backgroundColor: 'hsla(var(--accent), 0.1)',
      tension: 0.4,
      fill: true
    }
  ];
  
  const timeRangeFilters = [
    { key: 'daily' as const, label: t('daily') },
    { key: 'weekly' as const, label: t('weekly') },
    { key: 'monthly' as const, label: t('monthly') }
  ];
  
  return (
    <ChartContainer
      title={t('userEngagement')}
      chartType="line"
      data={chartData}
      labels={engagementData.map(item => item.date)}
      filters={timeRangeFilters}
      initialFilterKey="daily"
      height={300}
      options={{
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
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
        },
      }}
    />
  );
}
