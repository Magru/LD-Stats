import { type Request, Response } from "express";
import { storage } from "../storage";
import { dateRangeSchema } from "@shared/schema";
import * as learnDashApi from "../api/learnDashApi";

export async function getQuizzesStats(req: Request, res: Response) {
  try {
    const courseId = req.query.courseId ? parseInt(req.query.courseId as string) : undefined;
    
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const quizzesStats = await learnDashApi.getQuizzesStats(courseId, dateRange);
    
    res.json(quizzesStats);
  } catch (error) {
    console.error("Error fetching quizzes stats:", error);
    res.status(500).json({ message: "Failed to fetch quizzes statistics" });
  }
}

export async function getQuizStats(req: Request, res: Response) {
  try {
    const quizId = parseInt(req.params.quizId);
    
    if (isNaN(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }
    
    const quizzesStats = await learnDashApi.getQuizzesStats();
    const quizStats = quizzesStats.find(quiz => quiz.id === quizId);
    
    if (!quizStats) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    res.json(quizStats);
  } catch (error) {
    console.error(`Error fetching stats for quiz ${req.params.quizId}:`, error);
    res.status(500).json({ message: "Failed to fetch quiz statistics" });
  }
}

export async function getQuizzesByCourse(req: Request, res: Response) {
  try {
    const courseId = parseInt(req.params.courseId);
    
    if (isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    
    const quizzesStats = await learnDashApi.getQuizzesStats(courseId);
    
    res.json(quizzesStats);
  } catch (error) {
    console.error(`Error fetching quizzes for course ${req.params.courseId}:`, error);
    res.status(500).json({ message: "Failed to fetch quizzes data" });
  }
}

export async function getUserQuizAttempts(req: Request, res: Response) {
  try {
    const quizId = parseInt(req.params.quizId);
    const userId = parseInt(req.params.userId);
    
    if (isNaN(quizId) || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid quiz ID or user ID" });
    }
    
    // In a real implementation, this would fetch quiz attempts from the LearnDash API
    // For now, we'll return a sample response
    const quizAttempts = [
      {
        id: 1,
        quizId,
        userId,
        score: 85,
        passed: true,
        timeSpent: 1250, // seconds
        date: "2023-06-10T14:28:31Z"
      },
      {
        id: 2,
        quizId,
        userId,
        score: 72,
        passed: true,
        timeSpent: 980,
        date: "2023-06-05T10:15:22Z"
      }
    ];
    
    res.json(quizAttempts);
  } catch (error) {
    console.error(`Error fetching attempts for quiz ${req.params.quizId}:`, error);
    res.status(500).json({ message: "Failed to fetch quiz attempts data" });
  }
}
