import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DataTable } from "@/components/dashboard/DataTable";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  Activity,
  BarChart
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, getColorByIndex, formatNumber } from "@/lib/utils";

export default function GroupStats() {
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string; preset?: string }>({
    preset: "year"
  });
  
  const handleDateRangeChange = (range: DateRange) => {
    const newDateRange: { startDate?: string; endDate?: string; preset?: string } = { preset: "custom" };
    
    if (range?.from) {
      newDateRange.startDate = format(range.from, "yyyy-MM-dd");
    }
    
    if (range?.to) {
      newDateRange.endDate = format(range.to, "yyyy-MM-dd");
    }
    
    setDateRange(newDateRange);
  };
  
  // Fetch group stats
  const { data: groupStatsData, isLoading: isLoadingGroupStats } = useQuery({
    queryKey: ['/api/groups/stats'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fetch most active groups
  const { data: mostActiveGroupsData, isLoading: isLoadingActiveGroups } = useQuery({
    queryKey: ['/api/groups/most-active'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Group Statistics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed analytics of group activity and member engagement
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>
      
      {/* Group Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Groups</p>
                {isLoadingGroupStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {groupStatsData?.totalGroups || 0}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-success/10 text-success flex items-center justify-center mr-3">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Groups</p>
                {isLoadingGroupStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {groupStatsData?.activeGroups || 0}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Group Activity Chart */}
      <div className="mb-6">
        {isLoadingActiveGroups ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-44" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ) : (
          <ChartContainer
            title="Group Activity Levels"
            chartType="bar"
            data={{
              label: 'Activity Level',
              data: mostActiveGroupsData?.map(group => group.activityLevel) || [],
              backgroundColor: 'hsl(var(--primary))'
            }}
            labels={mostActiveGroupsData?.map(group => group.name) || []}
            height={300}
            options={{
              indexAxis: 'y' as const,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                x: {
                  beginAtZero: true,
                  max: 100,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  }
                },
                y: {
                  grid: {
                    display: false
                  }
                }
              }
            }}
          />
        )}
      </div>
      
      {/* Most Active Groups Table */}
      {isLoadingActiveGroups ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-md mr-3" />
                  <div>
                    <Skeleton className="h-4 w-40 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex space-x-8">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <DataTable
          title="Most Active Groups"
          columns={[
            {
              header: "Group",
              accessorKey: "name",
              cell: (group) => (
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-md flex items-center justify-center mr-3 ${getIconColorByIndex(group.id - 1)}`}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">{group.name}</div>
                </div>
              ),
            },
            {
              header: "Members",
              accessorKey: "membersCount",
              cell: (group) => (
                <div className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{group.membersCount}</span>
                </div>
              ),
            },
            {
              header: "Activity Level",
              accessorKey: "activityLevel",
              cell: (group) => (
                <div className="flex items-center">
                  <span className="text-sm mr-2">{group.activityLevel}%</span>
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${group.activityLevel}%` }}
                    ></div>
                  </div>
                </div>
              ),
            }
          ]}
          data={mostActiveGroupsData || []}
          emptyState={
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No active groups found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Group data will appear here once available.
              </p>
            </div>
          }
        />
      )}
    </div>
  );
}
