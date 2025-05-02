import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { TranslationKey } from "@/lib/translations";
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

interface RouteItem {
  titleKey: TranslationKey;
  href: string;
  icon: React.FC<{ className?: string }>;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();
  
  const routes = [
    {
      titleKey: 'dashboard',
      href: "/",
      icon: BarChartBig,
    },
    {
      titleKey: 'courses',
      href: "/courses",
      icon: BookOpen,
    },
    {
      titleKey: 'lessons',
      href: "/lessons",
      icon: FileText,
    },
    {
      titleKey: 'quizzes',
      href: "/quizzes",
      icon: HelpCircle,
    },
    {
      titleKey: 'students',
      href: "/students",
      icon: User,
    },
    {
      titleKey: 'groups',
      href: "/groups",
      icon: Users,
    },
    {
      titleKey: 'forums',
      href: "/forums",
      icon: MessageSquare,
    },
    {
      titleKey: 'settings',
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
          <h1 className="text-xl font-bold text-primary">{t('lmsAnalytics')}</h1>
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
                {!collapsed && t(route.titleKey as TranslationKey)}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
