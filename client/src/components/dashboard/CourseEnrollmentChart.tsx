import { useCourseEnrollment } from "@/hooks/useDashboardStats";
import { ChartContainer } from "./ChartContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/hooks/useLanguage";

export function CourseEnrollmentChart() {
  const { data, isLoading, error } = useCourseEnrollment();
  const { t } = useTranslation();
  const { direction } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-border h-[364px]">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Skeleton className="h-[300px] w-full rounded-md" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">{t('courseEnrollmentByCategory')}</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{t('failedToLoadData')}</p>
        </div>
      </div>
    );
  }
  
  const enrollmentData = data as Array<{
    category: string;
    count: number;
  }>;
  
  const chartColors = [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--success))',
    'hsl(var(--warning))',
    'hsl(var(--secondary))'
  ];
  
  const chartData = {
    data: enrollmentData.map(item => item.count),
    backgroundColor: chartColors.slice(0, enrollmentData.length),
    borderWidth: 0
  };
  
  return (
    <ChartContainer
      title={t('courseEnrollmentByCategory')}
      chartType="doughnut"
      data={chartData}
      labels={enrollmentData.map(item => item.category)}
      height={300}
      options={{
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              boxWidth: 6,
              padding: 15
            }
          }
        }
      }}
    />
  );
}
