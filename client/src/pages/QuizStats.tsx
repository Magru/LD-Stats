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
  HelpCircle, 
  BarChart, 
  CheckCircle, 
  Clock, 
  Users 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getIconColorByIndex } from "@/lib/utils";

export default function QuizStats() {
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
  
  // Fetch quizzes data
  const { data: quizzesData, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['/api/quizzes'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Quiz Statistics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed overview of quiz performance and student results
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>
      
      {/* Quiz Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Quizzes</p>
                {isLoadingQuizzes ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {quizzesData?.length || 0}
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
                <BarChart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                {isLoadingQuizzes ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {quizzesData?.length > 0 
                      ? `${Math.round(quizzesData.reduce((sum, quiz) => sum + quiz.averageScore, 0) / quizzesData.length)}%` 
                      : "0%"}
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
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                {isLoadingQuizzes ? (
                  <Skeleton className="h-7 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">
                    {quizzesData?.length > 0 
                      ? `${Math.round(quizzesData.reduce((sum, quiz) => sum + quiz.passRate, 0) / quizzesData.length)}%` 
                      : "0%"}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Average Score by Quiz */}
        {isLoadingQuizzes ? (
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
            title="Average Scores by Quiz"
            chartType="bar"
            data={{
              label: 'Average Score (%)',
              data: quizzesData?.map(quiz => quiz.averageScore) || [],
              backgroundColor: 'hsl(var(--primary))'
            }}
            labels={quizzesData?.map(quiz => quiz.title) || []}
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
        
        {/* Pass Rate by Quiz */}
        {isLoadingQuizzes ? (
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
            title="Pass Rates by Quiz"
            chartType="bar"
            data={{
              label: 'Pass Rate (%)',
              data: quizzesData?.map(quiz => quiz.passRate) || [],
              backgroundColor: 'hsl(var(--success))'
            }}
            labels={quizzesData?.map(quiz => quiz.title) || []}
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
      </div>
      
      {/* Quiz Table */}
      {isLoadingQuizzes ? (
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
          title="Quiz Performance"
          columns={[
            {
              header: "Quiz",
              accessorKey: "title",
              cell: (quiz) => (
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-md flex items-center justify-center mr-3 ${getIconColorByIndex(quiz.id - 1)}`}>
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{quiz.title}</div>
                    <div className="text-xs text-muted-foreground">Course ID: {quiz.courseId}</div>
                  </div>
                </div>
              ),
            },
            {
              header: "Average Score",
              accessorKey: "averageScore",
              cell: (quiz) => (
                <div className="flex items-center">
                  <span className="text-sm mr-2">{quiz.averageScore}%</span>
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${quiz.averageScore}%` }}
                    ></div>
                  </div>
                </div>
              ),
            },
            {
              header: "Pass Rate",
              accessorKey: "passRate",
              cell: (quiz) => (
                <div className="flex items-center">
                  <span className="text-sm mr-2">{quiz.passRate}%</span>
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div 
                      className="h-2 bg-success rounded-full" 
                      style={{ width: `${quiz.passRate}%` }}
                    ></div>
                  </div>
                </div>
              ),
            },
            {
              header: "Attempts",
              accessorKey: "attemptsCount",
              cell: (quiz) => (
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{quiz.attemptsCount}</span>
                </div>
              ),
            }
          ]}
          data={quizzesData || []}
          emptyState={
            <div className="text-center py-8">
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No quizzes found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Quiz data will appear here once available.
              </p>
            </div>
          }
        />
      )}
    </div>
  );
}
