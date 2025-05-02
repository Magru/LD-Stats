import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  colorClass?: string;
  className?: string;
}

export function KPICard({
  title,
  value,
  icon: Icon,
  change,
  colorClass = "bg-primary/10 text-primary",
  className,
}: KPICardProps) {
  return (
    <Card className={cn("border shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", colorClass)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        
        {change && (
          <div className="mt-2 flex items-center text-sm">
            <span 
              className={cn(
                "font-medium",
                change.trend === "up" ? "text-success" : "text-destructive"
              )}
            >
              {change.trend === "up" ? "↑" : "↓"} {Math.abs(change.value)}%
            </span>
            <span className="ml-1 text-muted-foreground">vs. last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
