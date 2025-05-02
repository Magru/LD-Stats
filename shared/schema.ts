import { pgTable, text, serial, integer, boolean, timestamp, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("student"),
  email: text("email").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Course schema
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  instructorId: integer("instructor_id").notNull(),
  enrollmentCount: integer("enrollment_count").notNull().default(0),
  completionRate: real("completion_rate").notNull().default(0),
  rating: real("rating").notNull().default(0),
  category: text("category"),
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  instructorId: true,
  enrollmentCount: true,
  completionRate: true,
  rating: true,
  category: true,
});

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

// Quiz schema
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseId: integer("course_id").notNull(),
  averageScore: real("average_score").notNull().default(0),
  passRate: real("pass_rate").notNull().default(0),
  attemptsCount: integer("attempts_count").notNull().default(0),
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  title: true,
  courseId: true,
  averageScore: true,
  passRate: true,
  attemptsCount: true,
});

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;

// Forum schema
export const forums = pgTable("forums", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseId: integer("course_id"),
  postsCount: integer("posts_count").notNull().default(0),
  repliesCount: integer("replies_count").notNull().default(0),
  reactionsCount: integer("reactions_count").notNull().default(0),
});

export const insertForumSchema = createInsertSchema(forums).pick({
  title: true,
  courseId: true,
  postsCount: true,
  repliesCount: true,
  reactionsCount: true,
});

export type InsertForum = z.infer<typeof insertForumSchema>;
export type Forum = typeof forums.$inferSelect;

// Group schema
export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  membersCount: integer("members_count").notNull().default(0),
  activityLevel: real("activity_level").notNull().default(0),
});

export const insertGroupSchema = createInsertSchema(groups).pick({
  name: true,
  description: true,
  membersCount: true,
  activityLevel: true,
});

export type InsertGroup = z.infer<typeof insertGroupSchema>;
export type Group = typeof groups.$inferSelect;

// User activity schema
export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  activityType: text("activity_type").notNull(),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  relatedEntityId: integer("related_entity_id"),
  relatedEntityType: text("related_entity_type"),
});

export const insertUserActivitySchema = createInsertSchema(userActivities).pick({
  userId: true,
  activityType: true,
  description: true,
  relatedEntityId: true,
  relatedEntityType: true,
});

export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
export type UserActivity = typeof userActivities.$inferSelect;

// Statistics dashboard settings schema
export const dashboardSettings = pgTable("dashboard_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  preferences: json("preferences"),
});

export const insertDashboardSettingsSchema = createInsertSchema(dashboardSettings).pick({
  userId: true,
  preferences: true,
});

export type InsertDashboardSettings = z.infer<typeof insertDashboardSettingsSchema>;
export type DashboardSettings = typeof dashboardSettings.$inferSelect;

// Date range filter schema for API requests
export const dateRangeSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  preset: z.enum(['day', 'week', 'month', 'year', 'custom']).optional()
});

export type DateRange = z.infer<typeof dateRangeSchema>;

// Dashboard stats response schema for caching purposes
export const dashboardStatsSchema = z.object({
  activeUsers: z.number(),
  courseCompletionRate: z.number(),
  quizAverage: z.number(),
  forumPosts: z.number(),
  userEngagement: z.array(z.object({
    date: z.string(),
    courseViews: z.number(),
    forumActivity: z.number()
  })),
  courseEnrollment: z.array(z.object({
    category: z.string(),
    count: z.number()
  })),
  courseCompletionTrend: z.array(z.object({
    date: z.string(),
    rate: z.number()
  })),
  forumActivity: z.array(z.object({
    date: z.string(),
    posts: z.number()
  })),
  topCourses: z.array(z.object({
    id: z.number(),
    title: z.string(),
    instructor: z.string(),
    enrollments: z.number(),
    completionRate: z.number(),
    rating: z.number()
  })),
  recentActivities: z.array(z.object({
    user: z.string(),
    userId: z.number(),
    avatar: z.string().optional(),
    description: z.string(),
    date: z.string()
  }))
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
