import { useRecentActivities } from "@/hooks/useDashboardStats";
import { DataTable } from "./DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, getColorByIndex } from "@/lib/utils";

interface RecentActivitiesTableProps {
  limit?: number;
}

export function RecentActivitiesTable({ limit = 5 }: RecentActivitiesTableProps) {
  const { data, isLoading, error } = useRecentActivities(limit);
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow border border-border">
        <div className="border-b border-border px-4 py-3">
          <Skeleton className="h-6 w-36" />
        </div>
        <div className="p-4">
          {Array(limit).fill(0).map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-3" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex space-x-8">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow border border-border">
        <div className="border-b border-border px-4 py-3">
          <h2 className="font-heading font-semibold text-lg">Recent Activities</h2>
        </div>
        <div className="p-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Failed to load recent activities data</p>
          </div>
        </div>
      </div>
    );
  }
  
  const activitiesData = data as Array<{
    userId: number;
    user: string;
    avatar?: string;
    description: string;
    date: string;
  }>;
  
  const columns = [
    {
      header: "User",
      accessorKey: "user",
      cell: (activity: typeof activitiesData[0]) => (
        <div className="flex items-center">
          <Avatar className={`h-8 w-8 mr-3 ${getColorByIndex(activity.userId - 1)}`}>
            {activity.avatar ? (
              <img src={activity.avatar} alt={activity.user} />
            ) : (
              <AvatarFallback>
                {getInitials(activity.user)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="text-sm font-medium">{activity.user}</div>
        </div>
      ),
    },
    {
      header: "Activity",
      accessorKey: "description",
      cell: (activity: typeof activitiesData[0]) => (
        <span className="text-sm">{activity.description}</span>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (activity: typeof activitiesData[0]) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">{activity.date}</span>
      ),
    },
  ];
  
  return (
    <DataTable
      title="Recent Activities"
      columns={columns}
      data={activitiesData}
      viewAllHref="/students"
      emptyState={
        <div className="text-center py-8">
          <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold">No recent activities</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Activity data will appear here once available.
          </p>
        </div>
      }
    />
  );
}
