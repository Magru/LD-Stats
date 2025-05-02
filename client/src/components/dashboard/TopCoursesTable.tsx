import { useTopCourses } from "@/hooks/useDashboardStats";
import { DataTable } from "./DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import { getIconColorByIndex } from "@/lib/utils";

interface TopCoursesTableProps {
  limit?: number;
}

export function TopCoursesTable({ limit = 4 }: TopCoursesTableProps) {
  const { data, isLoading, error } = useTopCourses(limit);
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow border border-border">
        <div className="border-b border-border px-4 py-3">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="p-4">
          {Array(limit).fill(0).map((_, index) => (
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
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow border border-border">
        <div className="border-b border-border px-4 py-3">
          <h2 className="font-heading font-semibold text-lg">Top Performing Courses</h2>
        </div>
        <div className="p-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Failed to load top courses data</p>
          </div>
        </div>
      </div>
    );
  }
  
  const coursesData = data as Array<{
    id: number;
    title: string;
    instructor: string;
    enrollments: number;
    completionRate: number;
    rating: number;
  }>;
  
  const columns = [
    {
      header: "Course",
      accessorKey: "title",
      cell: (course: typeof coursesData[0]) => (
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-md flex items-center justify-center mr-3 ${getIconColorByIndex(course.id - 1)}`}>
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium">{course.title}</div>
            <div className="text-xs text-muted-foreground">{course.instructor}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Enrollments",
      accessorKey: "enrollments",
      cell: (course: typeof coursesData[0]) => (
        <span className="text-sm">{course.enrollments}</span>
      ),
    },
    {
      header: "Completion",
      accessorKey: "completionRate",
      cell: (course: typeof coursesData[0]) => (
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
      cell: (course: typeof coursesData[0]) => (
        <div className="flex items-center text-warning">
          <span className="mr-1">★</span>
          <span className="text-sm text-foreground">{course.rating}</span>
        </div>
      ),
    },
  ];
  
  return (
    <DataTable
      title="Top Performing Courses"
      columns={columns}
      data={coursesData}
      viewAllHref="/courses"
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
  );
}
