import { type Request, Response } from "express";
import { storage } from "../storage";
import { dateRangeSchema } from "@shared/schema";
import * as buddyBossApi from "../api/buddyBossApi";

export async function getGroupStats(req: Request, res: Response) {
  try {
    const dateRangeResult = dateRangeSchema.safeParse(req.query);
    const dateRange = dateRangeResult.success ? dateRangeResult.data : undefined;
    
    const groupStats = await buddyBossApi.getGroupStats(dateRange);
    
    res.json(groupStats);
  } catch (error) {
    console.error("Error fetching group stats:", error);
    res.status(500).json({ message: "Failed to fetch group statistics" });
  }
}

export async function getGroups(req: Request, res: Response) {
  try {
    const groups = await storage.getGroups();
    
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Failed to fetch groups data" });
  }
}

export async function getGroup(req: Request, res: Response) {
  try {
    const groupId = parseInt(req.params.groupId);
    
    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }
    
    const group = await storage.getGroup(groupId);
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    
    res.json(group);
  } catch (error) {
    console.error(`Error fetching group ${req.params.groupId}:`, error);
    res.status(500).json({ message: "Failed to fetch group data" });
  }
}

export async function getGroupMembers(req: Request, res: Response) {
  try {
    const groupId = parseInt(req.params.groupId);
    
    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }
    
    // In a real implementation, this would fetch members from the BuddyBoss API
    // For now, we'll return a sample response
    const groupMembers = [
      { userId: 1, userName: "Michael Scott", joinDate: "2023-05-15", isAdmin: false },
      { userId: 2, userName: "Pam Beesly", joinDate: "2023-05-18", isAdmin: false },
      { userId: 3, userName: "Jim Halpert", joinDate: "2023-05-20", isAdmin: false },
      { userId: 4, userName: "Dwight Schrute", joinDate: "2023-05-22", isAdmin: false },
      { userId: 5, userName: "Andy Bernard", joinDate: "2023-05-10", isAdmin: true }
    ];
    
    res.json(groupMembers);
  } catch (error) {
    console.error(`Error fetching members for group ${req.params.groupId}:`, error);
    res.status(500).json({ message: "Failed to fetch group members data" });
  }
}

export async function getGroupActivity(req: Request, res: Response) {
  try {
    const groupId = parseInt(req.params.groupId);
    
    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }
    
    // In a real implementation, this would fetch activity from the BuddyBoss API
    // For now, we'll return a sample response
    const groupActivity = [
      { id: 1, userId: 5, userName: "Andy Bernard", type: "created_group", description: "Created the group", date: "2023-05-10T10:15:22Z" },
      { id: 2, userId: 1, userName: "Michael Scott", type: "joined_group", description: "Joined the group", date: "2023-05-15T14:28:31Z" },
      { id: 3, userId: 2, userName: "Pam Beesly", type: "joined_group", description: "Joined the group", date: "2023-05-18T09:42:15Z" },
      { id: 4, userId: 3, userName: "Jim Halpert", type: "joined_group", description: "Joined the group", date: "2023-05-20T11:37:45Z" },
      { id: 5, userId: 4, userName: "Dwight Schrute", type: "joined_group", description: "Joined the group", date: "2023-05-22T16:53:08Z" },
      { id: 6, userId: 5, userName: "Andy Bernard", type: "posted_message", description: "Posted \"Welcome everyone to Cornell Alumni Coders!\"", date: "2023-05-23T10:24:17Z" }
    ];
    
    res.json(groupActivity);
  } catch (error) {
    console.error(`Error fetching activity for group ${req.params.groupId}:`, error);
    res.status(500).json({ message: "Failed to fetch group activity data" });
  }
}

export async function getMostActiveGroups(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    
    const groupStats = await buddyBossApi.getGroupStats();
    
    const mostActiveGroups = groupStats.groupsByActivity
      .sort((a, b) => b.activityLevel - a.activityLevel)
      .slice(0, limit);
    
    res.json(mostActiveGroups);
  } catch (error) {
    console.error("Error fetching most active groups:", error);
    res.status(500).json({ message: "Failed to fetch most active groups data" });
  }
}
