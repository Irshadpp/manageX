import React, { FC } from "react";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { PopoverTrigger, Popover, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";


interface InputWithIconProps{
    field: {
        value: Date | null;
        onChange: (date: Date | null) => void;
    };
    title: string;
}

const DatePicker: React.FC<InputWithIconProps> = ({field, title}) =>{
    const selectedDate = field.value ?? undefined;
    return (
        <FormItem className="flex flex-col text-start font-semibold text-[15px]">
            <FormLabel className="mt-2 mb-2">{title}</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button variant={"outline"} className="w-full pl-3 text-left font-normal hover:bg-transparent hover:text-current">
                            {field.value ? (
                                format(field.value, "PPP")
                            ): (
                                <span>Picke a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-5 w-5"/>
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="bg-background rounded-md shadow-lg w-full">
                    <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => field.onChange(date ?? null)}
                    disabled={(date)=>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    fromYear={1950}
                    toYear={2030}
                    captionLayout="dropdown-buttons"
                    classNames={{
                        caption: "custom-calendar",
                        dropdown: "text-sm",
                      }}
                    />
                </PopoverContent>
            </Popover>
        </FormItem>
    )
}

export default DatePicker;