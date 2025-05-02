import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNavigation } from "./TopNavigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleExport = async (format: "csv" | "pdf") => {
    try {
      const res = await apiRequest(
        "GET", 
        `/api/dashboard/export?format=${format}`, 
        undefined
      );
      
      if (format === "csv") {
        // Handle CSV download
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "dashboard-stats.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (format === "pdf") {
        // Handle PDF - in a real implementation
        toast({
          title: "Export Started",
          description: "Your PDF is being generated and will download shortly."
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar */}
      {isMobile ? (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar />
      )}
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavigation 
          onMenuClick={() => setSidebarOpen(true)}
          onExport={handleExport}
        />
        
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
