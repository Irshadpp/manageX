import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatarImage from '/useravatar.png';
import { FormControl } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { apiRequest } from "@/services/api/commonRequest";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface Employee {
  value: string;
  label: string;
  profileURL: string;
}


export function EmployeeList({ field }: { field: any }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { setValue } = useFormContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_BACKEND_URL,
        route: "/api/v1/project/members?role=employee",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.success) {
        const employees = res.data;
        const transformedEmployees = employees.map((employee: any) => ({
          value: employee.id,
          label: `${employee.fName} ${employee.lName}`,
          profileURL: employee.profileURL || "",
        }));
        setEmployees(transformedEmployees);
      }
    };
    fetchData();
  }, []);

  return (
    <Popover>
    <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between bg-backgroundAccent",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value
            ? employees.find((employee) => employee.value === field.value)?.label
            : "Select employee"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </FormControl>
    </PopoverTrigger>
    <PopoverContent className="w-80 p-0">
      <Command>
        <CommandInput placeholder="Search Employee..."/>
        <CommandEmpty>No Employee found.</CommandEmpty>
        <CommandGroup>
          <ScrollArea className="h-52 w-full rounded-md">
            {employees.map((employee) => (
              <CommandItem
                key={employee.value}
                value={employee.value}
                onSelect={() => {
                  setValue(field.name, employee.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    employee.value === field.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full overflow-clip">
                    <img
                      src={employee.profileURL || UserAvatarImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                  {employee.label}
                </div>
              </CommandItem>
            ))}
          </ScrollArea>
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
  );
}
