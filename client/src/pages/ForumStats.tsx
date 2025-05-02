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
  MessageSquare, 
  MessageCircle, 
  Heart, 
  Users,
  Activity
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, getColorByIndex, formatNumber } from "@/lib/utils";

export default function ForumStats() {
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
  
  // Fetch forum stats
  const { data: forumStatsData, isLoading: isLoadingForumStats } = useQuery({
    queryKey: ['/api/forums/stats'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fetch forum activity
  const { data: forumActivityData, isLoading: isLoadingForumActivity } = useQuery({
    queryKey: ['/api/forums/activity'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fetch top contributors
  const { data: topContributorsData, isLoading: isLoadingTopContributors } = useQuery({
    queryKey: ['/api/forums/top-contributors'],
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Forum Statistics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed analytics of forum activity and engagement
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>
      
      {/* Forum Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Forums</p>
                {isLoadingForumStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {forumStatsData?.totalForums || 0}
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
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Topics</p>
                {isLoadingForumStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {formatNumber(forumStatsData?.totalTopics || 0)}
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
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Posts</p>
                {isLoadingForumStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {formatNumber(forumStatsData?.totalPosts || 0)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-warning/10 text-warning flex items-center justify-center mr-3">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Replies</p>
                {isLoadingForumStats ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {formatNumber(forumStatsData?.totalReplies || 0)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Forum Activity Chart */}
      <div className="mb-6">
        {isLoadingForumActivity ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ) : (
          <ChartContainer
            title="Forum Activity"
            chartType="line"
            data={{
              label: 'Posts',
              data: forumActivityData?.map(item => item.posts) || [],
              borderColor: 'hsl(var(--accent))',
              backgroundColor: 'hsla(var(--accent), 0.1)',
              tension: 0.4,
              fill: true
            }}
            labels={forumActivityData?.map(item => item.date) || []}
            height={300}
            filters={[
              { key: 'posts', label: 'Posts' },
              { key: 'replies', label: 'Replies' },
              { key: 'reactions', label: 'Reactions' }
            ]}
            initialFilterKey="posts"
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
        )}
      </div>
      
      {/* Top Contributors Table */}
      {isLoadingTopContributors ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-3" />
                  <Skeleton className="h-4 w-32" />
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
          title="Top Forum Contributors"
          columns={[
            {
              header: "User",
              accessorKey: "userName",
              cell: (contributor) => (
                <div className="flex items-center">
                  <Avatar className={`h-8 w-8 mr-3 ${getColorByIndex(contributor.userId - 1)}`}>
                    <AvatarFallback>
                      {getInitials(contributor.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">{contributor.userName}</div>
                </div>
              ),
            },
            {
              header: "Posts",
              accessorKey: "postsCount",
              cell: (contributor) => (
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-accent" />
                  <span className="text-sm">{contributor.postsCount}</span>
                </div>
              ),
            },
            {
              header: "Reactions Received",
              accessorKey: "reactionsReceived",
              cell: (contributor) => (
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-warning" />
                  <span className="text-sm">{contributor.reactionsReceived}</span>
                </div>
              ),
            }
          ]}
          data={topContributorsData || []}
          emptyState={
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No contributors found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Contributor data will appear here once available.
              </p>
            </div>
          }
        />
      )}
    </div>
  );
}
