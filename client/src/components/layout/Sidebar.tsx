import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import { 
  BarChartBig, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  User, 
  Users, 
  MessageSquare, 
  Settings 
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  
  const routes = [
    {
      title: "Overview",
      href: "/",
      icon: BarChartBig,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: BookOpen,
    },
    {
      title: "Lessons",
      href: "/lessons",
      icon: FileText,
    },
    {
      title: "Quizzes",
      href: "/quizzes",
      icon: HelpCircle,
    },
    {
      title: "Students",
      href: "/students",
      icon: User,
    },
    {
      title: "Groups",
      href: "/groups",
      icon: Users,
    },
    {
      title: "Forums",
      href: "/forums",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className={cn(
      "flex flex-col h-full bg-sidebar border-r border-sidebar-border",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        {collapsed ? (
          <div className="text-xl font-bold text-primary mx-auto">LMS</div>
        ) : (
          <h1 className="text-xl font-bold text-primary">LMS Analytics</h1>
        )}
      </div>
      
      <div className="flex flex-col flex-grow overflow-y-auto p-4">
        {!collapsed && user?.role === "admin" && (
          <div className="mb-6">
            <RoleSwitcher />
          </div>
        )}
        
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link 
              key={route.href} 
              href={route.href}
            >
              <a className={cn(
                "flex items-center py-2 px-2 text-sm font-medium rounded-md transition-colors",
                location === route.href
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
                collapsed ? "justify-center" : ""
              )}>
                <route.icon className={cn(
                  "flex-shrink-0",
                  collapsed ? "w-6 h-6" : "w-5 h-5 mr-3"
                )} />
                {!collapsed && route.title}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
