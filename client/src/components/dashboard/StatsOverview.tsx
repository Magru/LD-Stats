import { useSummaryStats } from "@/hooks/useDashboardStats";
import { KPICard } from "./KPICard";
import { Skeleton } from "@/components/ui/skeleton";
import { User, CheckSquare, BarChart2, MessageSquare } from "lucide-react";

interface StatsOverviewProps {
  dateRange?: {
    startDate?: string;
    endDate?: string;
    preset?: string;
  };
}

export function StatsOverview({ dateRange }: StatsOverviewProps) {
  const { data, isLoading, error } = useSummaryStats(dateRange);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <p className="text-red-600">Failed to load summary statistics</p>
      </div>
    );
  }
  
  const statsData = data as {
    activeUsers: number;
    courseCompletionRate: number;
    quizAverage: number;
    forumPosts: number;
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KPICard
        title="Active Users"
        value={statsData.activeUsers.toLocaleString()}
        icon={User}
        change={{ value: 12, trend: "up" }}
        colorClass="bg-primary/10 text-primary"
      />
      
      <KPICard
        title="Course Completion"
        value={`${statsData.courseCompletionRate}%`}
        icon={CheckSquare}
        change={{ value: 5, trend: "up" }}
        colorClass="bg-success/10 text-success"
      />
      
      <KPICard
        title="Quiz Average"
        value={`${statsData.quizAverage}%`}
        icon={BarChart2}
        change={{ value: 2.3, trend: "down" }}
        colorClass="bg-warning/10 text-warning"
      />
      
      <KPICard
        title="Forum Activity"
        value={statsData.forumPosts.toLocaleString()}
        icon={MessageSquare}
        change={{ value: 18, trend: "up" }}
        colorClass="bg-accent/10 text-accent"
      />
    </div>
  );
}
