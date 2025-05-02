import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import CourseStats from "@/pages/CourseStats";
import QuizStats from "@/pages/QuizStats";
import UserStats from "@/pages/UserStats";
import ForumStats from "@/pages/ForumStats";
import GroupStats from "@/pages/GroupStats";
import Settings from "@/pages/Settings";
import { AuthProvider } from "@/hooks/useAuth";
import { UserRoleProvider } from "@/hooks/useUserRole";
import { LanguageProvider } from "@/hooks/useLanguage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard}/>
      <Route path="/courses" component={CourseStats}/>
      <Route path="/lessons" component={CourseStats}/>
      <Route path="/quizzes" component={QuizStats}/>
      <Route path="/students" component={UserStats}/>
      <Route path="/groups" component={GroupStats}/>
      <Route path="/forums" component={ForumStats}/>
      <Route path="/settings" component={Settings}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <UserRoleProvider>
            <TooltipProvider>
              <MainLayout>
                <Router />
              </MainLayout>
              <Toaster />
            </TooltipProvider>
          </UserRoleProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
