import { type Request, Response } from "express";
import { storage } from "../storage";
import { dateRangeSchema } from "@shared/schema";
import * as learnDashApi from "../api/learnDashApi";
import * as buddyBossApi from "../api/buddyBossApi";
import * as wordpressApi from "../api/wordpressApi";

export async function getDashboardStats(req: Request, res: Response) {
  try {
    const userId = parseInt(req.query.userId as string) || 1;
    const role = req.query.role as string || "admin";
    
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const dashboardStats = await storage.getDashboardStats(userId, role, dateRange);
    
    res.json(dashboardStats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Failed to fetch dashboard statistics" });
  }
}

export async function getUserEngagement(req: Request, res: Response) {
  try {
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const userEngagement = await buddyBossApi.getUserEngagement(dateRange);
    
    res.json(userEngagement);
  } catch (error) {
    console.error("Error fetching user engagement:", error);
    res.status(500).json({ message: "Failed to fetch user engagement data" });
  }
}

export async function getCourseEnrollmentByCategory(req: Request, res: Response) {
  try {
    const courseEnrollment = await learnDashApi.getCourseEnrollmentByCategory();
    
    res.json(courseEnrollment);
  } catch (error) {
    console.error("Error fetching course enrollment:", error);
    res.status(500).json({ message: "Failed to fetch course enrollment data" });
  }
}

export async function getCourseCompletionTrend(req: Request, res: Response) {
  try {
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const courseCompletionTrend = await learnDashApi.getCourseCompletionTrend(dateRange);
    
    res.json(courseCompletionTrend);
  } catch (error) {
    console.error("Error fetching course completion trend:", error);
    res.status(500).json({ message: "Failed to fetch course completion trend data" });
  }
}

export async function getForumActivity(req: Request, res: Response) {
  try {
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const forumStats = await buddyBossApi.getForumStats(dateRange);
    
    res.json(forumStats.activityByDate);
  } catch (error) {
    console.error("Error fetching forum activity:", error);
    res.status(500).json({ message: "Failed to fetch forum activity data" });
  }
}

export async function getTopCourses(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 4;
    
    const coursesStats = await learnDashApi.getCoursesStats();
    
    // Sort courses by enrollment count in descending order and limit the results
    const topCourses = coursesStats
      .sort((a, b) => b.enrollments - a.enrollments)
      .slice(0, limit)
      .map(course => ({
        id: course.id,
        title: course.title,
        instructor: course.instructorName,
        enrollments: course.enrollments,
        completionRate: course.completionRate,
        rating: course.averageRating
      }));
    
    res.json(topCourses);
  } catch (error) {
    console.error("Error fetching top courses:", error);
    res.status(500).json({ message: "Failed to fetch top courses data" });
  }
}

export async function getRecentActivities(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    
    const recentActivities = await buddyBossApi.getRecentActivities(limit);
    
    res.json(recentActivities);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({ message: "Failed to fetch recent activities data" });
  }
}

export async function getSummaryStats(req: Request, res: Response) {
  try {
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const userStats = await buddyBossApi.getUserStats(dateRange);
    const forumStats = await buddyBossApi.getForumStats(dateRange);
    const coursesStats = await learnDashApi.getCoursesStats(dateRange);
    const quizzesStats = await learnDashApi.getQuizzesStats(undefined, dateRange);
    
    // Calculate the average completion rate of all courses
    const courseCompletionRate = coursesStats.reduce((sum, course) => sum + course.completionRate, 0) / coursesStats.length;
    
    // Calculate the average quiz score
    const quizAverage = quizzesStats.reduce((sum, quiz) => sum + quiz.averageScore, 0) / quizzesStats.length;
    
    const summaryStats = {
      activeUsers: userStats.activeUsers,
      courseCompletionRate: Math.round(courseCompletionRate),
      quizAverage: Math.round(quizAverage * 10) / 10,
      forumPosts: forumStats.totalPosts
    };
    
    res.json(summaryStats);
  } catch (error) {
    console.error("Error fetching summary stats:", error);
    res.status(500).json({ message: "Failed to fetch summary statistics" });
  }
}

export async function exportDashboardStats(req: Request, res: Response) {
  try {
    const format = req.query.format as string || 'json';
    const userId = parseInt(req.query.userId as string) || 1;
    const role = req.query.role as string || "admin";
    
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const dashboardStats = await storage.getDashboardStats(userId, role, dateRange);
    
    if (format === 'csv') {
      // In a real implementation, this would convert the stats to CSV
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=dashboard-stats.csv');
      
      // Simple CSV example for summary stats
      let csv = 'Metric,Value\n';
      csv += `Active Users,${dashboardStats.activeUsers}\n`;
      csv += `Course Completion Rate,${dashboardStats.courseCompletionRate}%\n`;
      csv += `Quiz Average,${dashboardStats.quizAverage}%\n`;
      csv += `Forum Posts,${dashboardStats.forumPosts}\n`;
      
      res.send(csv);
    } else if (format === 'pdf') {
      // In a real implementation, this would generate a PDF
      res.setHeader('Content-Type', 'application/json');
      res.json({ message: "PDF export functionality would be implemented here" });
    } else {
      // Default to JSON
      res.json(dashboardStats);
    }
  } catch (error) {
    console.error("Error exporting dashboard stats:", error);
    res.status(500).json({ message: "Failed to export dashboard statistics" });
  }
}
