import { useState, useEffect } from "react";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { UserEngagementChart } from "@/components/dashboard/UserEngagementChart";
import { CourseEnrollmentChart } from "@/components/dashboard/CourseEnrollmentChart";
import { CourseCompletionChart } from "@/components/dashboard/CourseCompletionChart";
import { ForumActivityChart } from "@/components/dashboard/ForumActivityChart";
import { TopCoursesTable } from "@/components/dashboard/TopCoursesTable";
import { RecentActivitiesTable } from "@/components/dashboard/RecentActivitiesTable";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useTranslation } from "@/hooks/useTranslation";

export default function Dashboard() {
  const { user } = useAuth();
  const { role } = useUserRole();
  const { t } = useTranslation();
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
  
  // Mobile date range picker
  const [showMobileDatePicker, setShowMobileDatePicker] = useState(false);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">{t('dashboard')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('lmsAnalytics')}
        </p>
      </div>
      
      {/* Mobile Date Range */}
      <div className="mb-4 md:hidden">
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      </div>
      
      {/* KPI Summary Cards */}
      <StatsOverview dateRange={dateRange} />
      
      {/* Chart Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* User Engagement Chart */}
        <div className="lg:col-span-2">
          <UserEngagementChart dateRange={dateRange} />
        </div>
        
        {/* Enrollment Distribution */}
        <div>
          <CourseEnrollmentChart />
        </div>
      </div>
      
      {/* Second Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Course Completion Chart */}
        <CourseCompletionChart dateRange={dateRange} />
        
        {/* Forum Activity Chart */}
        <ForumActivityChart dateRange={dateRange} />
      </div>
      
      {/* Data Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses Table */}
        <TopCoursesTable limit={4} />
        
        {/* Recent Activities Table */}
        <RecentActivitiesTable limit={5} />
      </div>
    </div>
  );
}
