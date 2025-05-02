import { 
  users, type User, type InsertUser,
  courses, type Course, type InsertCourse,
  quizzes, type Quiz, type InsertQuiz,
  forums, type Forum, type InsertForum,
  groups, type Group, type InsertGroup,
  userActivities, type UserActivity, type InsertUserActivity,
  dashboardSettings, type DashboardSettings, type InsertDashboardSettings,
  type DashboardStats, type DateRange
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Course operations
  getCourse(id: number): Promise<Course | undefined>;
  getCourses(): Promise<Course[]>;
  getCoursesByInstructor(instructorId: number): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<Course>): Promise<Course | undefined>;
  
  // Quiz operations
  getQuiz(id: number): Promise<Quiz | undefined>;
  getQuizzesByCourse(courseId: number): Promise<Quiz[]>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  updateQuiz(id: number, quiz: Partial<Quiz>): Promise<Quiz | undefined>;
  
  // Forum operations
  getForum(id: number): Promise<Forum | undefined>;
  getForums(): Promise<Forum[]>;
  createForum(forum: InsertForum): Promise<Forum>;
  updateForum(id: number, forum: Partial<Forum>): Promise<Forum | undefined>;
  
  // Group operations
  getGroup(id: number): Promise<Group | undefined>;
  getGroups(): Promise<Group[]>;
  createGroup(group: InsertGroup): Promise<Group>;
  updateGroup(id: number, group: Partial<Group>): Promise<Group | undefined>;
  
  // User activity operations
  getUserActivity(id: number): Promise<UserActivity | undefined>;
  getUserActivities(userId: number): Promise<UserActivity[]>;
  createUserActivity(activity: InsertUserActivity): Promise<UserActivity>;
  
  // Dashboard settings operations
  getDashboardSettings(userId: number): Promise<DashboardSettings | undefined>;
  createDashboardSettings(settings: InsertDashboardSettings): Promise<DashboardSettings>;
  updateDashboardSettings(userId: number, settings: Partial<DashboardSettings>): Promise<DashboardSettings | undefined>;
  
  // Dashboard statistics operations
  getDashboardStats(userId: number, role: string, dateRange?: DateRange): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private quizzes: Map<number, Quiz>;
  private forums: Map<number, Forum>;
  private groups: Map<number, Group>;
  private userActivities: Map<number, UserActivity>;
  private dashboardSettings: Map<number, DashboardSettings>;
  
  private currentUserId: number;
  private currentCourseId: number;
  private currentQuizId: number;
  private currentForumId: number;
  private currentGroupId: number;
  private currentActivityId: number;
  private currentSettingsId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.quizzes = new Map();
    this.forums = new Map();
    this.groups = new Map();
    this.userActivities = new Map();
    this.dashboardSettings = new Map();
    
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentQuizId = 1;
    this.currentForumId = 1;
    this.currentGroupId = 1;
    this.currentActivityId = 1;
    this.currentSettingsId = 1;
    
    // Initialize with a default admin user
    this.createUser({
      username: "admin",
      password: "admin",
      role: "admin",
      email: "admin@example.com"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userUpdate };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Course operations
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
  
  async getCoursesByInstructor(instructorId: number): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(
      (course) => course.instructorId === instructorId
    );
  }
  
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }
  
  async updateCourse(id: number, courseUpdate: Partial<Course>): Promise<Course | undefined> {
    const course = await this.getCourse(id);
    if (!course) return undefined;
    
    const updatedCourse = { ...course, ...courseUpdate };
    this.courses.set(id, updatedCourse);
    return updatedCourse;
  }
  
  // Quiz operations
  async getQuiz(id: number): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }
  
  async getQuizzesByCourse(courseId: number): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).filter(
      (quiz) => quiz.courseId === courseId
    );
  }
  
  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.currentQuizId++;
    const quiz: Quiz = { ...insertQuiz, id };
    this.quizzes.set(id, quiz);
    return quiz;
  }
  
  async updateQuiz(id: number, quizUpdate: Partial<Quiz>): Promise<Quiz | undefined> {
    const quiz = await this.getQuiz(id);
    if (!quiz) return undefined;
    
    const updatedQuiz = { ...quiz, ...quizUpdate };
    this.quizzes.set(id, updatedQuiz);
    return updatedQuiz;
  }
  
  // Forum operations
  async getForum(id: number): Promise<Forum | undefined> {
    return this.forums.get(id);
  }
  
  async getForums(): Promise<Forum[]> {
    return Array.from(this.forums.values());
  }
  
  async createForum(insertForum: InsertForum): Promise<Forum> {
    const id = this.currentForumId++;
    const forum: Forum = { ...insertForum, id };
    this.forums.set(id, forum);
    return forum;
  }
  
  async updateForum(id: number, forumUpdate: Partial<Forum>): Promise<Forum | undefined> {
    const forum = await this.getForum(id);
    if (!forum) return undefined;
    
    const updatedForum = { ...forum, ...forumUpdate };
    this.forums.set(id, updatedForum);
    return updatedForum;
  }
  
  // Group operations
  async getGroup(id: number): Promise<Group | undefined> {
    return this.groups.get(id);
  }
  
  async getGroups(): Promise<Group[]> {
    return Array.from(this.groups.values());
  }
  
  async createGroup(insertGroup: InsertGroup): Promise<Group> {
    const id = this.currentGroupId++;
    const group: Group = { ...insertGroup, id };
    this.groups.set(id, group);
    return group;
  }
  
  async updateGroup(id: number, groupUpdate: Partial<Group>): Promise<Group | undefined> {
    const group = await this.getGroup(id);
    if (!group) return undefined;
    
    const updatedGroup = { ...group, ...groupUpdate };
    this.groups.set(id, updatedGroup);
    return updatedGroup;
  }
  
  // User activity operations
  async getUserActivity(id: number): Promise<UserActivity | undefined> {
    return this.userActivities.get(id);
  }
  
  async getUserActivities(userId: number): Promise<UserActivity[]> {
    return Array.from(this.userActivities.values()).filter(
      (activity) => activity.userId === userId
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
  
  async createUserActivity(insertActivity: InsertUserActivity): Promise<UserActivity> {
    const id = this.currentActivityId++;
    const activity: UserActivity = { 
      ...insertActivity, 
      id, 
      timestamp: new Date()
    };
    this.userActivities.set(id, activity);
    return activity;
  }
  
  // Dashboard settings operations
  async getDashboardSettings(userId: number): Promise<DashboardSettings | undefined> {
    return Array.from(this.dashboardSettings.values()).find(
      (settings) => settings.userId === userId
    );
  }
  
  async createDashboardSettings(insertSettings: InsertDashboardSettings): Promise<DashboardSettings> {
    const id = this.currentSettingsId++;
    const settings: DashboardSettings = { ...insertSettings, id };
    this.dashboardSettings.set(id, settings);
    return settings;
  }
  
  async updateDashboardSettings(userId: number, settingsUpdate: Partial<DashboardSettings>): Promise<DashboardSettings | undefined> {
    const settings = await this.getDashboardSettings(userId);
    if (!settings) return undefined;
    
    const updatedSettings = { ...settings, ...settingsUpdate };
    this.dashboardSettings.set(settings.id, updatedSettings);
    return updatedSettings;
  }
  
  // Dashboard statistics operations 
  async getDashboardStats(userId: number, role: string, dateRange?: DateRange): Promise<DashboardStats> {
    // This would normally fetch from LearnDash and BuddyBoss APIs
    // For demo, we're generating structured mock data
    return {
      activeUsers: 1254,
      courseCompletionRate: 68,
      quizAverage: 76.4,
      forumPosts: 3782,
      userEngagement: [
        { date: "Jan", courseViews: 650, forumActivity: 350 },
        { date: "Feb", courseViews: 750, forumActivity: 420 },
        { date: "Mar", courseViews: 820, forumActivity: 510 },
        { date: "Apr", courseViews: 900, forumActivity: 580 },
        { date: "May", courseViews: 950, forumActivity: 620 },
        { date: "Jun", courseViews: 1020, forumActivity: 670 },
        { date: "Jul", courseViews: 980, forumActivity: 690 },
        { date: "Aug", courseViews: 1050, forumActivity: 750 },
        { date: "Sep", courseViews: 1150, forumActivity: 780 },
        { date: "Oct", courseViews: 1250, forumActivity: 850 },
        { date: "Nov", courseViews: 1350, forumActivity: 900 },
        { date: "Dec", courseViews: 1254, forumActivity: 930 }
      ],
      courseEnrollment: [
        { category: "Web Development", count: 35 },
        { category: "UX Design", count: 25 },
        { category: "Data Science", count: 20 },
        { category: "Marketing", count: 15 },
        { category: "Business", count: 5 }
      ],
      courseCompletionTrend: [
        { date: "Jan", rate: 62 },
        { date: "Feb", rate: 65 },
        { date: "Mar", rate: 68 },
        { date: "Apr", rate: 70 },
        { date: "May", rate: 73 },
        { date: "Jun", rate: 77 }
      ],
      forumActivity: [
        { date: "Week 1", posts: 120 },
        { date: "Week 2", posts: 190 },
        { date: "Week 3", posts: 300 },
        { date: "Week 4", posts: 500 },
        { date: "Week 5", posts: 800 },
        { date: "Week 6", posts: 1200 }
      ],
      topCourses: [
        { id: 1, title: "Web Development Masterclass", instructor: "John Smith", enrollments: 743, completionRate: 85, rating: 4.8 },
        { id: 2, title: "UX Design Principles", instructor: "Sarah Johnson", enrollments: 651, completionRate: 78, rating: 4.6 },
        { id: 3, title: "Data Analysis with Python", instructor: "David Chen", enrollments: 582, completionRate: 71, rating: 4.5 },
        { id: 4, title: "Digital Marketing Essentials", instructor: "Lisa Moore", enrollments: 479, completionRate: 92, rating: 4.9 }
      ],
      recentActivities: [
        { userId: 1, user: "Michael Scott", description: "Completed \"Advanced JavaScript\" course", date: "2 hours ago" },
        { userId: 2, user: "Pam Beesly", description: "Started \"UX Design Principles\" course", date: "5 hours ago" },
        { userId: 3, user: "Jim Halpert", description: "Replied to thread in \"JavaScript Basics\" forum", date: "Yesterday" },
        { userId: 4, user: "Dwight Schrute", description: "Scored 98% on \"Data Structures\" quiz", date: "Yesterday" },
        { userId: 5, user: "Andy Bernard", description: "Created new group \"Cornell Alumni Coders\"", date: "2 days ago" }
      ]
    };
  }
}

export const storage = new MemStorage();
