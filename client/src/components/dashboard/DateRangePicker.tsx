import { useState } from "react";
import { Calendar, CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangePickerProps {
  className?: string;
  onDateRangeChange?: (range: DateRange) => void;
}

export function DateRangePicker({
  className,
  onDateRangeChange
}: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const [preset, setPreset] = useState<string>("year");
  
  const handlePresetChange = (value: string) => {
    setPreset(value);
    
    let newRange: DateRange = {
      from: undefined,
      to: undefined
    };
    
    const today = new Date();
    
    switch (value) {
      case "week":
        newRange = {
          from: addDays(today, -7),
          to: today
        };
        break;
      case "month":
        newRange = {
          from: addDays(today, -30),
          to: today
        };
        break;
      case "year":
        newRange = {
          from: new Date(today.getFullYear(), 0, 1),
          to: today
        };
        break;
      case "custom":
        // Keep the current range or set to undefined
        newRange = date || {
          from: undefined,
          to: undefined
        };
        break;
    }
    
    setDate(newRange);
    if (onDateRangeChange) {
      onDateRangeChange(newRange);
    }
  };
  
  return (
    <div className={cn("grid gap-2", className)}>
      {preset === "custom" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              size="sm"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => {
                setDate(range);
                if (onDateRangeChange) {
                  onDateRangeChange(range || { from: undefined, to: undefined });
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Select defaultValue={preset} onValueChange={handlePresetChange}>
          <SelectTrigger className="text-sm border-border rounded-md h-9">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="year">This year</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
