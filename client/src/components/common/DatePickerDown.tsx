import * as React from "react";
import { format, isBefore, startOfToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DatePickerProps {
  field?: any; 
  title: string;
}

const DatePickerDown: React.FC<DatePickerProps> = ({ field, title }) => {
  const isDateDisabled = (date: Date): boolean => {
    return isBefore(date, startOfToday());
  };

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{title}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal bg-background",
                !field?.value && "text-muted-foreground"
              )}
            >
              {field?.value ? format(field.value, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={field?.value}
            onSelect={field?.onChange}
            disabled={isDateDisabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default DatePickerDown;
