import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  emptyState?: React.ReactNode;
  viewAllHref?: string;
  className?: string;
  onViewAll?: () => void;
}

export function DataTable<T>({
  title,
  columns,
  data,
  emptyState,
  viewAllHref,
  className,
  onViewAll,
}: DataTableProps<T>) {
  return (
    <Card className={cn("border shadow-sm", className)}>
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg font-heading">{title}</CardTitle>
      </CardHeader>
      
      <div className="overflow-x-auto">
        {data.length === 0 && emptyState ? (
          <div className="p-6 flex justify-center items-center">{emptyState}</div>
        ) : (
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column, idx) => (
                  <th 
                    key={idx} 
                    scope="col" 
                    className={cn(
                      "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
                      column.className
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="bg-background divide-y divide-border">
              {data.map((item, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((column, colIdx) => (
                    <td 
                      key={colIdx} 
                      className={cn(
                        "px-4 py-3 text-sm",
                        column.className
                      )}
                    >
                      {column.cell 
                        ? column.cell(item) 
                        : String(item[column.accessorKey] || '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {(viewAllHref || onViewAll) && (
        <CardFooter className="px-4 py-3 border-t bg-muted/50 justify-end">
          {viewAllHref ? (
            <Button variant="link" className="text-sm text-primary font-medium" asChild>
              <a href={viewAllHref}>View All</a>
            </Button>
          ) : (
            <Button variant="link" className="text-sm text-primary font-medium" onClick={onViewAll}>
              View All
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
