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
  BookOpen, 
  FileText, 
  Users, 
  Calendar, 
  Clock, 
  BarChart 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getIconColorByIndex } from "@/lib/utils";

export default function CourseStats() {
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string; preset?: string }>({
    preset: "year"
  });
  
  const [activeTab, setActiveTab] = useState("overview");
  
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
  
  // Fetch courses data
  const { data: coursesData, isLoading: isLoadingCourses } = useQuery({
    queryKey: ['/api/courses'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Course completion trend data
  const { data: completionTrendData, isLoading: isLoadingCompletionTrend } = useQuery({
    queryKey: ['/api/courses/completion-trend'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Course enrollment by category data
  const { data: enrollmentData, isLoading: isLoadingEnrollment } = useQuery({
    queryKey: ['/api/courses/enrollment-by-category'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Course Statistics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed overview of course performance and engagement
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>
      
      {/* Course Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                {isLoadingCourses ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {coursesData?.length || 0}
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
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                {isLoadingCourses ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {coursesData?.reduce((sum, course) => sum + course.enrollmentCount, 0) || 0}
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
                <BarChart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Completion Rate</p>
                {isLoadingCourses ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {coursesData?.length > 0 
                      ? `${Math.round(coursesData.reduce((sum, course) => sum + course.completionRate, 0) / coursesData.length)}%` 
                      : "0%"}
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
          <TabsTrigger value="courses">All Courses</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Course Completion Trend */}
            {isLoadingCompletionTrend ? (
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
                title="Completion Rate Trend"
                chartType="bar"
                data={{
                  label: 'Completion Rate (%)',
                  data: completionTrendData?.map(item => item.rate) || [],
                  backgroundColor: 'hsl(var(--success))'
                }}
                labels={completionTrendData?.map(item => item.date) || []}
                height={300}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    x: { grid: { display: false } }
                  }
                }}
              />
            )}
            
            {/* Course Enrollment by Category */}
            {isLoadingEnrollment ? (
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
                title="Enrollment Distribution"
                chartType="doughnut"
                data={{
                  data: enrollmentData?.map(item => item.count) || [],
                  backgroundColor: [
                    'hsl(var(--primary))',
                    'hsl(var(--accent))',
                    'hsl(var(--success))',
                    'hsl(var(--warning))',
                    'hsl(var(--secondary))'
                  ].slice(0, enrollmentData?.length || 0),
                  borderWidth: 0
                }}
                labels={enrollmentData?.map(item => item.category) || []}
                height={300}
                options={{
                  cutout: '70%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { usePointStyle: true, boxWidth: 6, padding: 15 }
                    }
                  }
                }}
              />
            )}
          </div>
          
          {/* Top Courses */}
          {isLoadingCourses ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
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
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <DataTable
              title="Course Performance"
              columns={[
                {
                  header: "Course",
                  accessorKey: "title",
                  cell: (course) => (
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-md flex items-center justify-center mr-3 ${getIconColorByIndex(course.id - 1)}`}>
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{course.title}</div>
                        <div className="text-xs text-muted-foreground">Instructor ID: {course.instructorId}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Enrollments",
                  accessorKey: "enrollmentCount",
                  cell: (course) => (
                    <span className="text-sm">{course.enrollmentCount}</span>
                  ),
                },
                {
                  header: "Completion",
                  accessorKey: "completionRate",
                  cell: (course) => (
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{course.completionRate}%</span>
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-success rounded-full" 
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Rating",
                  accessorKey: "rating",
                  cell: (course) => (
                    <div className="flex items-center text-warning">
                      <span className="mr-1">★</span>
                      <span className="text-sm text-foreground">{course.rating}</span>
                    </div>
                  ),
                },
                {
                  header: "Category",
                  accessorKey: "category",
                  cell: (course) => (
                    <span className="text-sm">{course.category || "Uncategorized"}</span>
                  ),
                }
              ]}
              data={coursesData || []}
              emptyState={
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">No courses found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Course data will appear here once available.
                  </p>
                </div>
              }
            />
          )}
        </TabsContent>
        
        <TabsContent value="courses" className="mt-6">
          {isLoadingCourses ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                {Array(10).fill(0).map((_, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-md mr-3" />
                      <div>
                        <Skeleton className="h-4 w-40 mb-1" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <div className="flex space-x-8">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <DataTable
              title="All Courses"
              columns={[
                {
                  header: "Course",
                  accessorKey: "title",
                  cell: (course) => (
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-md flex items-center justify-center mr-3 ${getIconColorByIndex(course.id - 1)}`}>
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{course.title}</div>
                        <div className="text-xs text-muted-foreground">Instructor ID: {course.instructorId}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Description",
                  accessorKey: "description",
                  cell: (course) => (
                    <span className="text-sm">{course.description || "No description available"}</span>
                  ),
                },
                {
                  header: "Enrollments",
                  accessorKey: "enrollmentCount",
                  cell: (course) => (
                    <span className="text-sm">{course.enrollmentCount}</span>
                  ),
                },
                {
                  header: "Completion",
                  accessorKey: "completionRate",
                  cell: (course) => (
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{course.completionRate}%</span>
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-success rounded-full" 
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Rating",
                  accessorKey: "rating",
                  cell: (course) => (
                    <div className="flex items-center text-warning">
                      <span className="mr-1">★</span>
                      <span className="text-sm text-foreground">{course.rating}</span>
                    </div>
                  ),
                }
              ]}
              data={coursesData || []}
              emptyState={
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">No courses found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Course data will appear here once available.
                  </p>
                </div>
              }
            />
          )}
        </TabsContent>
        
        <TabsContent value="lessons" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature is coming soon. Lesson statistics will show detailed information about individual lessons, 
                including view counts, completion rates, and time spent by students.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
