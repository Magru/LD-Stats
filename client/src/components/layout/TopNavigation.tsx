import { useState } from "react";
import { Menu, User, Download, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";
import { getInitials } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";

interface TopNavigationProps {
  onMenuClick: () => void;
  onExport: (format: "csv" | "pdf") => void;
}

export function TopNavigation({ onMenuClick, onExport }: TopNavigationProps) {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between h-16 px-4 border-b border-border bg-background">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="ml-2 md:hidden font-heading font-bold text-lg text-primary">
          {t('lmsAnalytics')}
        </div>
      </div>
      
      <div className="flex items-center">
        {/* Date Range Picker */}
        <div className="hidden md:block mr-4">
          <DateRangePicker />
        </div>
        
        {/* Language Switcher */}
        <div className="hidden md:block mr-4">
          <LanguageSwitcher />
        </div>
        
        {/* Export Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="hidden md:inline-flex items-center mr-4"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              {t('export')}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExport("csv")}>
              {t('exportAsCSV')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("pdf")}>
              {t('exportAsPDF')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Menu */}
        <DropdownMenu 
          open={isUserMenuOpen} 
          onOpenChange={setIsUserMenuOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center px-1.5 focus:outline-none">
              {user?.displayName && (
                <span className="hidden md:block mr-2 text-sm font-medium">
                  {user.displayName}
                </span>
              )}
              <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.displayName || "User"} />
                ) : (
                  <AvatarFallback>
                    {getInitials(user?.displayName || "User")}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              {t('settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
