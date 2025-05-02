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
  User, 
  UserPlus, 
  Users, 
  Clock, 
  BookOpen, 
  Award,
  Activity 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, getColorByIndex } from "@/lib/utils";

export default function UserStats() {
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string; preset?: string }>({
    preset: "year"
  });
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRole, setSelectedRole] = useState("all");
  
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
  
  // Fetch user stats
  const { data: userStatsData, isLoading: isLoadingUserStats } = useQuery({
    queryKey: ['/api/users/stats'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fetch recent activities
  const { data: recentActivitiesData, isLoading: isLoadingActivities } = useQuery({
    queryKey: ['/api/dashboard/recent-activities?limit=10'],
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Student Statistics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed analytics of student activity and performance
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>
      
      {/* User Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                {isLoadingUserStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {userStatsData?.totalUsers?.toLocaleString() || 0}
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
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                {isLoadingUserStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {userStatsData?.activeUsers?.toLocaleString() || 0}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mr-3">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Users</p>
                {isLoadingUserStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {userStatsData?.newUsers?.toLocaleString() || 0}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different views */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">User Activities</TabsTrigger>
          <TabsTrigger value="progress">Learning Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* User Activity Chart */}
          {isLoadingUserStats ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          ) : (
            <ChartContainer
              title="User Activity Trend"
              chartType="line"
              data={{
                label: 'Active Users',
                data: userStatsData?.userActivity?.map(item => item.count) || [],
                borderColor: 'hsl(var(--primary))',
                backgroundColor: 'hsla(var(--primary), 0.1)',
                tension: 0.4,
                fill: true
              }}
              labels={userStatsData?.userActivity?.map(item => item.date) || []}
              height={300}
              filters={[
                { key: 'daily', label: 'Daily' },
                { key: 'weekly', label: 'Weekly' },
                { key: 'monthly', label: 'Monthly' }
              ]}
              initialFilterKey="monthly"
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
          )}
          
          {/* Recent Activities */}
          {isLoadingActivities ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-36" />
              </CardHeader>
              <CardContent>
                {Array(5).fill(0).map((_, index) => (
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
              </CardContent>
            </Card>
          ) : (
            <DataTable
              title="Recent User Activities"
              columns={[
                {
                  header: "User",
                  accessorKey: "user",
                  cell: (activity) => (
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
                  cell: (activity) => (
                    <span className="text-sm">{activity.description}</span>
                  ),
                },
                {
                  header: "Date",
                  accessorKey: "date",
                  cell: (activity) => (
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{activity.date}</span>
                  ),
                }
              ]}
              data={recentActivitiesData || []}
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
          )}
        </TabsContent>
        
        <TabsContent value="activities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature is coming soon. This section will provide detailed information about user activities, 
                including course enrollments, forum participation, quiz attempts, and more.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature is coming soon. This section will show detailed learning progress statistics for 
                users, including course completion rates, quiz scores, and time spent on learning materials.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
