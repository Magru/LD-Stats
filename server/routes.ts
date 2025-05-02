import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Import controllers
import * as dashboardController from "./controllers/dashboardController";
import * as courseController from "./controllers/courseController";
import * as quizController from "./controllers/quizController";
import * as userController from "./controllers/userController";
import * as forumController from "./controllers/forumController";
import * as groupController from "./controllers/groupController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard routes
  app.get("/api/dashboard/stats", dashboardController.getDashboardStats);
  app.get("/api/dashboard/user-engagement", dashboardController.getUserEngagement);
  app.get("/api/dashboard/course-enrollment", dashboardController.getCourseEnrollmentByCategory);
  app.get("/api/dashboard/course-completion-trend", dashboardController.getCourseCompletionTrend);
  app.get("/api/dashboard/forum-activity", dashboardController.getForumActivity);
  app.get("/api/dashboard/top-courses", dashboardController.getTopCourses);
  app.get("/api/dashboard/recent-activities", dashboardController.getRecentActivities);
  app.get("/api/dashboard/summary-stats", dashboardController.getSummaryStats);
  app.get("/api/dashboard/export", dashboardController.exportDashboardStats);
  
  // Course routes
  app.get("/api/courses", courseController.getCoursesStats);
  app.get("/api/courses/:courseId", courseController.getCourseStats);
  app.get("/api/courses/enrollment-by-category", courseController.getCourseEnrollmentByCategory);
  app.get("/api/courses/completion-trend", courseController.getCourseCompletionTrend);
  app.get("/api/courses/:courseId/users/:userId/progress", courseController.getUserProgressInCourse);
  
  // Quiz routes
  app.get("/api/quizzes", quizController.getQuizzesStats);
  app.get("/api/quizzes/:quizId", quizController.getQuizStats);
  app.get("/api/courses/:courseId/quizzes", quizController.getQuizzesByCourse);
  app.get("/api/quizzes/:quizId/users/:userId/attempts", quizController.getUserQuizAttempts);
  
  // User routes
  app.get("/api/users/stats", userController.getUserStats);
  app.get("/api/users/current", userController.getCurrentUser);
  app.get("/api/users/:userId", userController.getUserById);
  app.get("/api/users/:userId/progress", userController.getUserProgress);
  app.get("/api/users/:userId/activities", userController.getUserActivities);
  app.get("/api/users/roles/:role", userController.getUsersByRole);
  app.get("/api/users/available-roles", userController.getAvailableUserRoles);
  
  // Forum routes
  app.get("/api/forums/stats", forumController.getForumStats);
  app.get("/api/forums/activity", forumController.getForumActivity);
  app.get("/api/forums", forumController.getForums);
  app.get("/api/forums/:forumId", forumController.getForum);
  app.get("/api/forums/top-contributors", forumController.getTopForumContributors);
  app.get("/api/forums/:forumId/topics", forumController.getForumTopics);
  
  // Group routes
  app.get("/api/groups/stats", groupController.getGroupStats);
  app.get("/api/groups", groupController.getGroups);
  app.get("/api/groups/:groupId", groupController.getGroup);
  app.get("/api/groups/:groupId/members", groupController.getGroupMembers);
  app.get("/api/groups/:groupId/activity", groupController.getGroupActivity);
  app.get("/api/groups/most-active", groupController.getMostActiveGroups);

  const httpServer = createServer(app);

  return httpServer;
}
