import { useQuery } from "@tanstack/react-query";
import { type DateRange } from "@shared/schema";
import { useUserRole } from "./useUserRole";

export function useDashboardStats(dateRange?: DateRange) {
  const { role } = useUserRole();
  
  // Build query string for date range if provided
  let queryParams = new URLSearchParams();
  if (role) queryParams.append("role", role);
  if (dateRange?.startDate) queryParams.append("startDate", dateRange.startDate);
  if (dateRange?.endDate) queryParams.append("endDate", dateRange.endDate);
  if (dateRange?.preset) queryParams.append("preset", dateRange.preset);
  
  const queryString = queryParams.toString();
  const apiUrl = `/api/dashboard/stats${queryString ? `?${queryString}` : ''}`;
  
  return useQuery({
    queryKey: [apiUrl],
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useSummaryStats(dateRange?: DateRange) {
  // Build query string for date range if provided
  let queryParams = new URLSearchParams();
  if (dateRange?.startDate) queryParams.append("startDate", dateRange.startDate);
  if (dateRange?.endDate) queryParams.append("endDate", dateRange.endDate);
  if (dateRange?.preset) queryParams.append("preset", dateRange.preset);
  
  const queryString = queryParams.toString();
  const apiUrl = `/api/dashboard/summary-stats${queryString ? `?${queryString}` : ''}`;
  
  return useQuery({
    queryKey: [apiUrl],
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useUserEngagement(dateRange?: DateRange) {
  // Build query string for date range if provided
  let queryParams = new URLSearchParams();
  if (dateRange?.startDate) queryParams.append("startDate", dateRange.startDate);
  if (dateRange?.endDate) queryParams.append("endDate", dateRange.endDate);
  if (dateRange?.preset) queryParams.append("preset", dateRange.preset);
  
  const queryString = queryParams.toString();
  const apiUrl = `/api/dashboard/user-engagement${queryString ? `?${queryString}` : ''}`;
  
  return useQuery({
    queryKey: [apiUrl],
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useCourseEnrollment() {
  return useQuery({
    queryKey: ['/api/dashboard/course-enrollment'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCourseCompletionTrend(dateRange?: DateRange) {
  // Build query string for date range if provided
  let queryParams = new URLSearchParams();
  if (dateRange?.startDate) queryParams.append("startDate", dateRange.startDate);
  if (dateRange?.endDate) queryParams.append("endDate", dateRange.endDate);
  if (dateRange?.preset) queryParams.append("preset", dateRange.preset);
  
  const queryString = queryParams.toString();
  const apiUrl = `/api/dashboard/course-completion-trend${queryString ? `?${queryString}` : ''}`;
  
  return useQuery({
    queryKey: [apiUrl],
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useForumActivity(dateRange?: DateRange) {
  // Build query string for date range if provided
  let queryParams = new URLSearchParams();
  if (dateRange?.startDate) queryParams.append("startDate", dateRange.startDate);
  if (dateRange?.endDate) queryParams.append("endDate", dateRange.endDate);
  if (dateRange?.preset) queryParams.append("preset", dateRange.preset);
  
  const queryString = queryParams.toString();
  const apiUrl = `/api/dashboard/forum-activity${queryString ? `?${queryString}` : ''}`;
  
  return useQuery({
    queryKey: [apiUrl],
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useTopCourses(limit: number = 4) {
  return useQuery({
    queryKey: [`/api/dashboard/top-courses?limit=${limit}`],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRecentActivities(limit: number = 5) {
  return useQuery({
    queryKey: [`/api/dashboard/recent-activities?limit=${limit}`],
    staleTime: 60 * 1000, // 1 minute
  });
}
