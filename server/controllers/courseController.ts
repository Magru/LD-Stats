import { type Request, Response } from "express";
import { storage } from "../storage";
import { dateRangeSchema } from "@shared/schema";
import * as learnDashApi from "../api/learnDashApi";

export async function getCoursesStats(req: Request, res: Response) {
  try {
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const coursesStats = await learnDashApi.getCoursesStats(dateRange);
    
    res.json(coursesStats);
  } catch (error) {
    console.error("Error fetching courses stats:", error);
    res.status(500).json({ message: "Failed to fetch courses statistics" });
  }
}

export async function getCourseStats(req: Request, res: Response) {
  try {
    const courseId = parseInt(req.params.courseId);
    
    if (isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    
    const coursesStats = await learnDashApi.getCoursesStats();
    const courseStats = coursesStats.find(course => course.id === courseId);
    
    if (!courseStats) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    const lessonsStats = await learnDashApi.getLessonsStats(courseId);
    const quizzesStats = await learnDashApi.getQuizzesStats(courseId);
    
    const courseDetails = {
      ...courseStats,
      lessons: lessonsStats,
      quizzes: quizzesStats
    };
    
    res.json(courseDetails);
  } catch (error) {
    console.error(`Error fetching stats for course ${req.params.courseId}:`, error);
    res.status(500).json({ message: "Failed to fetch course statistics" });
  }
}

export async function getCourseEnrollmentByCategory(req: Request, res: Response) {
  try {
    const courseEnrollment = await learnDashApi.getCourseEnrollmentByCategory();
    
    res.json(courseEnrollment);
  } catch (error) {
    console.error("Error fetching course enrollment by category:", error);
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

export async function getUserProgressInCourse(req: Request, res: Response) {
  try {
    const courseId = parseInt(req.params.courseId);
    const userId = parseInt(req.params.userId);
    
    if (isNaN(courseId) || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid course ID or user ID" });
    }
    
    const userProgress = await learnDashApi.getUserProgressStats(userId, courseId);
    
    if (userProgress.length === 0) {
      return res.status(404).json({ message: "No progress data found for this user and course" });
    }
    
    res.json(userProgress[0]);
  } catch (error) {
    console.error(`Error fetching user progress for course ${req.params.courseId}:`, error);
    res.status(500).json({ message: "Failed to fetch user progress data" });
  }
}
