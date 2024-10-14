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
import { City } from "country-state-city";

export function CityList({
  field,
  countryISO,
  stateISO,
  value,
}: {
  field: any;
  countryISO: any;
  stateISO: any;
  value?: string;
}) {
  const cities = City.getCitiesOfState(countryISO, stateISO);

  const { setValue } = useFormContext();

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
              ? cities.find((city) => city.name === field.value)?.name
              : "Select city"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search City..." />
          <CommandEmpty>No City found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-40 w-full rounded-md">
              {cities.map((city) => (
                <CommandItem
                  key={city.name}
                  value={city.name}
                  onSelect={() => {
                    setValue(value ? value : "city", city.name);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      city.name === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex gap-2">{city.name}</div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
