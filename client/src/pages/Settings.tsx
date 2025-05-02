import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Dashboard preferences
  const [dashboardPreferences, setDashboardPreferences] = useState({
    defaultDateRange: "year",
    enableRealTimeUpdates: true,
    showKPIChanges: true,
    chartColorScheme: "default"
  });
  
  // Email notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    courseCompletion: true,
    newForumPosts: true,
    quizResults: true,
    groupActivity: false,
    weeklyDigest: true
  });
  
  const handleSaveDashboardPreferences = async () => {
    try {
      setSaving(true);
      
      // This would use the actual API in a real implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Saved",
        description: "Your dashboard preferences have been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error Saving Settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleSaveNotificationSettings = async () => {
    try {
      setSaving(true);
      
      // This would use the actual API in a real implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error Saving Settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your dashboard and notification preferences
        </p>
      </div>
      
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Preferences</CardTitle>
              <CardDescription>
                Configure how your analytics dashboard appears and functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultDateRange">Default Date Range</Label>
                <Select 
                  value={dashboardPreferences.defaultDateRange}
                  onValueChange={(value) => setDashboardPreferences({
                    ...dashboardPreferences,
                    defaultDateRange: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select default date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chartColorScheme">Chart Color Scheme</Label>
                <Select 
                  value={dashboardPreferences.chartColorScheme}
                  onValueChange={(value) => setDashboardPreferences({
                    ...dashboardPreferences,
                    chartColorScheme: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chart color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="monochrome">Monochrome</SelectItem>
                    <SelectItem value="pastel">Pastel</SelectItem>
                    <SelectItem value="vibrant">Vibrant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="realTimeUpdates">Real-time Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Update dashboard data in real-time
                  </p>
                </div>
                <Switch 
                  id="realTimeUpdates"
                  checked={dashboardPreferences.enableRealTimeUpdates}
                  onCheckedChange={(checked) => setDashboardPreferences({
                    ...dashboardPreferences,
                    enableRealTimeUpdates: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showKPIChanges">Show KPI Changes</Label>
                  <p className="text-sm text-muted-foreground">
                    Display percent change on KPI cards
                  </p>
                </div>
                <Switch 
                  id="showKPIChanges"
                  checked={dashboardPreferences.showKPIChanges}
                  onCheckedChange={(checked) => setDashboardPreferences({
                    ...dashboardPreferences,
                    showKPIChanges: checked
                  })}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveDashboardPreferences} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="courseCompletion" className="flex flex-col space-y-1">
                    <span>Course Completion</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive email when a student completes a course
                    </span>
                  </Label>
                  <Switch 
                    id="courseCompletion"
                    checked={emailNotifications.courseCompletion}
                    onCheckedChange={(checked) => setEmailNotifications({
                      ...emailNotifications,
                      courseCompletion: checked
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="newForumPosts" className="flex flex-col space-y-1">
                    <span>New Forum Posts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive email for new posts in followed forums
                    </span>
                  </Label>
                  <Switch 
                    id="newForumPosts"
                    checked={emailNotifications.newForumPosts}
                    onCheckedChange={(checked) => setEmailNotifications({
                      ...emailNotifications,
                      newForumPosts: checked
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="quizResults" className="flex flex-col space-y-1">
                    <span>Quiz Results</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive email when students complete quizzes
                    </span>
                  </Label>
                  <Switch 
                    id="quizResults"
                    checked={emailNotifications.quizResults}
                    onCheckedChange={(checked) => setEmailNotifications({
                      ...emailNotifications,
                      quizResults: checked
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="groupActivity" className="flex flex-col space-y-1">
                    <span>Group Activity</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive email updates about group activities
                    </span>
                  </Label>
                  <Switch 
                    id="groupActivity"
                    checked={emailNotifications.groupActivity}
                    onCheckedChange={(checked) => setEmailNotifications({
                      ...emailNotifications,
                      groupActivity: checked
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="weeklyDigest" className="flex flex-col space-y-1">
                    <span>Weekly Digest</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive weekly summary of key statistics
                    </span>
                  </Label>
                  <Switch 
                    id="weeklyDigest"
                    checked={emailNotifications.weeklyDigest}
                    onCheckedChange={(checked) => setEmailNotifications({
                      ...emailNotifications,
                      weeklyDigest: checked
                    })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotificationSettings} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  defaultValue={user?.displayName || ""}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue={user?.email || ""}
                  placeholder="Your email address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  value={user?.role === "admin" ? "Administrator" : user?.role === "instructor" ? "Instructor" : "Student"}
                  disabled
                />
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline">Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
