import { type Request, Response } from "express";
import { storage } from "../storage";
import { dateRangeSchema } from "@shared/schema";
import * as buddyBossApi from "../api/buddyBossApi";

export async function getForumStats(req: Request, res: Response) {
  try {
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const forumStats = await buddyBossApi.getForumStats(dateRange);
    
    res.json(forumStats);
  } catch (error) {
    console.error("Error fetching forum stats:", error);
    res.status(500).json({ message: "Failed to fetch forum statistics" });
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

export async function getForums(req: Request, res: Response) {
  try {
    const forums = await storage.getForums();
    
    res.json(forums);
  } catch (error) {
    console.error("Error fetching forums:", error);
    res.status(500).json({ message: "Failed to fetch forums data" });
  }
}

export async function getForum(req: Request, res: Response) {
  try {
    const forumId = parseInt(req.params.forumId);
    
    if (isNaN(forumId)) {
      return res.status(400).json({ message: "Invalid forum ID" });
    }
    
    const forum = await storage.getForum(forumId);
    
    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }
    
    res.json(forum);
  } catch (error) {
    console.error(`Error fetching forum ${req.params.forumId}:`, error);
    res.status(500).json({ message: "Failed to fetch forum data" });
  }
}

export async function getTopForumContributors(req: Request, res: Response) {
  try {
    // In a real implementation, this would fetch top contributors from the BuddyBoss API
    // For now, we'll return a sample response
    const topContributors = [
      { userId: 1, userName: "Michael Scott", postsCount: 32, reactionsReceived: 128 },
      { userId: 3, userName: "Jim Halpert", postsCount: 28, reactionsReceived: 95 },
      { userId: 5, userName: "Andy Bernard", postsCount: 22, reactionsReceived: 84 },
      { userId: 2, userName: "Pam Beesly", postsCount: 18, reactionsReceived: 76 },
      { userId: 4, userName: "Dwight Schrute", postsCount: 15, reactionsReceived: 68 }
    ];
    
    res.json(topContributors);
  } catch (error) {
    console.error("Error fetching top forum contributors:", error);
    res.status(500).json({ message: "Failed to fetch top contributors data" });
  }
}

export async function getForumTopics(req: Request, res: Response) {
  try {
    const forumId = parseInt(req.params.forumId);
    
    if (isNaN(forumId)) {
      return res.status(400).json({ message: "Invalid forum ID" });
    }
    
    // In a real implementation, this would fetch topics from the BuddyBoss API
    // For now, we'll return a sample response
    const forumTopics = [
      { id: 1, title: "Introduction to JavaScript", postsCount: 24, lastActivity: "2023-06-12T08:45:22Z" },
      { id: 2, title: "CSS Layout Techniques", postsCount: 18, lastActivity: "2023-06-10T14:32:11Z" },
      { id: 3, title: "React vs Vue", postsCount: 42, lastActivity: "2023-06-15T19:05:33Z" }
    ];
    
    res.json(forumTopics);
  } catch (error) {
    console.error(`Error fetching topics for forum ${req.params.forumId}:`, error);
    res.status(500).json({ message: "Failed to fetch forum topics data" });
  }
}
