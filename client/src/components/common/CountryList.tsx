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
import { useState } from "react";
import { Country, ICountry } from "country-state-city";

export function CountryList({
  field,
  setCountryISO,
  value,
}: {
  field: any;
  setCountryISO: any;
  value?: string;
}) {
  const countries = Country.getAllCountries();

  const [isOpen, setIsOpen] = useState(false);
  const [managers, setManagers] = useState<ICountry[]>([...countries]);
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
              ? managers.find((country) => country.name === field.value)?.name
              : "Select country"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 overflow-visible">
        <Command>
          <CommandInput placeholder="Search Country..." />
          <CommandEmpty>No Country found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-40 max-h-40 w-full rounded-md ">
              {managers.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.name}
                  onSelect={() => {
                    setValue(value ? value : "country", country.name);
                    setCountryISO(country.isoCode);
                    setIsOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      country.name === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex gap-2">{country.name}</div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
