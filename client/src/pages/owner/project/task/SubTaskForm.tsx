import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { SubTask } from "@/store/types/task";
import { updateTask } from "@/store/taskThunk";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Please give a valid title",
    })
    .max(30, { message: "Title should be Less than 30 characters" }),
  status: z.string().min(2, {
    message: "Please choose a status",
  }),
  duration: z
    .object({
      length: z
        .number()
        .min(0, { message: "Duration must be a positive number" })
        .optional(),
      durationType: z.string().optional(),
    })
    .optional(),
});

export default function SubTaskForm({
  setIsModalOpen,
  id
}: {
  setIsModalOpen: any;
  id: string
}) {
  // const [suggestions, setSuggestions] = useState([""]);

  const suggestions = ["Change header color", "Complete home page", "Create addTask api"]

  const dispatch = useDispatch<AppDispatch>();

  const { taskData, loading, error } = useSelector((state: RootState) => state.task);
  const task: any = taskData.find(task => task.id === id)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "",
    },
  });

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (inputValue: string) => {
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    if (
      filtered.length === 1 &&
      filtered[0].toLowerCase() === inputValue.toLowerCase()
    ) {
      form.setValue("title", filtered[0]);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let val = values as SubTask;
    if (task) {
      let subTasks = [...task.subTasks, val];
      const res: any = await dispatch(
        updateTask({subTasks: subTasks} , task.id )
      );
      if(res?.success){
        setIsModalOpen(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter sub task title"
                  {...field}
                  className="bg-background"
                  onChange={(e) => {
                    handleInputChange(e.target.value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {filteredSuggestions.length > 0 && (
          <ul className="absolute z-10 bg-background rounded-lg border border-border w-4/5 mt-1">
            <ScrollArea className="h-52 w-full">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="py-2 px-3 cursor-pointer hover:bg-background border-b"
                  onClick={() => {
                    form.setValue("title", suggestion);
                    setFilteredSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ScrollArea>
          </ul>
        )}
        <div className="w-full">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="backlog">Backlog</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="py-1"></div>

        <FormLabel>Estimated Duration</FormLabel>
        <FormField
          control={form.control}
          name="duration.durationType"
          render={({ field }) => (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-background">
                  <SelectValue
                    className="capitalize"
                    placeholder="Select Duration Type"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          )}
        />
        <FormField
          control={form.control}
          name="duration.length"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Input
                  placeholder="Enter duration"
                  type="number"
                  min="0"
                  {...field}
                  className="bg-background"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-1"></div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Create New Task"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
