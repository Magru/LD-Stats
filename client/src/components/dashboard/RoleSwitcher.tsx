import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserRole } from "@/hooks/useUserRole";
import { Label } from "@/components/ui/label";

export function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const { role, setRole } = useUserRole();

  // Fetch available roles when component mounts
  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await fetch("/api/users/available-roles");
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    }
    
    fetchRoles();
  }, []);

  // Convert roles to nice display names
  const roleDisplayNames: Record<string, string> = {
    administrator: "Administrator",
    instructor: "Instructor",
    student: "Student"
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-muted-foreground">View As</Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {role ? roleDisplayNames[role] || role : "Select role..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search role..." />
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((roleItem) => (
                <CommandItem
                  key={roleItem}
                  value={roleItem}
                  onSelect={(currentValue) => {
                    setRole(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      role === roleItem ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {roleDisplayNames[roleItem] || roleItem}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
