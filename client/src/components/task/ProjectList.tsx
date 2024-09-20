import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormControl } from "@/components/ui/form";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function ProjectList({ field }: { field: any }) {
  const { setValue } = useFormContext();
  const {projectData} = useSelector((state: RootState)=> state.project)


        const projects = projectData.map((project) => ({
          value: project.id,
          label: project.name,
        }))

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
              ? projects.find((project) => project.value === field.value)?.label
              : "Select Project"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search Project..." />
          <CommandEmpty>No Project found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-52 w-full rounded-md">
              {projects.map((project) => (
                <CommandItem
                  key={project.value}
                  value={project.value}
                  onSelect={() => {
                    setValue("project", project.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      project.value === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div>{project.label}</div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
