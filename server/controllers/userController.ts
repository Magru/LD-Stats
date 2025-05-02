import { type Request, Response } from "express";
import { storage } from "../storage";
import { dateRangeSchema } from "@shared/schema";
import * as buddyBossApi from "../api/buddyBossApi";
import * as learnDashApi from "../api/learnDashApi";
import * as wordpressApi from "../api/wordpressApi";

export async function getUserStats(req: Request, res: Response) {
  try {
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const userStats = await buddyBossApi.getUserStats(dateRange);
    
    res.json(userStats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Failed to fetch user statistics" });
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  try {
    const currentUser = await wordpressApi.getCurrentUser();
    
    if (!currentUser) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    res.json(currentUser);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Failed to fetch current user data" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const user = await wordpressApi.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user ${req.params.userId}:`, error);
    res.status(500).json({ message: "Failed to fetch user data" });
  }
}

export async function getUserProgress(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const userProgress = await learnDashApi.getUserProgressStats(userId);
    
    res.json(userProgress);
  } catch (error) {
    console.error(`Error fetching progress for user ${req.params.userId}:`, error);
    res.status(500).json({ message: "Failed to fetch user progress data" });
  }
}

export async function getUserActivities(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const userActivities = await storage.getUserActivities(userId);
    
    res.json(userActivities);
  } catch (error) {
    console.error(`Error fetching activities for user ${req.params.userId}:`, error);
    res.status(500).json({ message: "Failed to fetch user activities data" });
  }
}

export async function getUsersByRole(req: Request, res: Response) {
  try {
    const role = req.params.role;
    
    if (!role) {
      return res.status(400).json({ message: "Role parameter is required" });
    }
    
    const users = await wordpressApi.getUsersByRole(role);
    
    res.json(users);
  } catch (error) {
    console.error(`Error fetching users with role ${req.params.role}:`, error);
    res.status(500).json({ message: "Failed to fetch users data" });
  }
}

export async function getAvailableUserRoles(req: Request, res: Response) {
  try {
    const roles = await wordpressApi.getAvailableUserRoles();
    
    res.json(roles);
  } catch (error) {
    console.error("Error fetching available user roles:", error);
    res.status(500).json({ message: "Failed to fetch user roles data" });
  }
}
