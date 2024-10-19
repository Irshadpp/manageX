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
import { State } from "country-state-city";
import { useState } from "react";

export function StateList({
  field,
  countryISO,
  setStateISO,
  value,
}: {
  field: any;
  countryISO: any;
  setStateISO: any;
  value?: string;
}) {
  const states = State.getStatesOfCountry(countryISO);

  const [isOpen, setIsOpen] = useState(false);
  const { setValue } = useFormContext();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
              ? states.find((state) => state.name === field.value)?.name
              : "Select state"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search State..." />
          <CommandEmpty>No State found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-40 w-full rounded-md">
              {states.map((state) => (
                <CommandItem
                  key={state.name}
                  value={state.name}
                  onSelect={() => {
                    setValue(value ? value : "state", state.name);
                    setStateISO(state.isoCode);
                    setIsOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      state.name === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex gap-2">{state.name}</div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
