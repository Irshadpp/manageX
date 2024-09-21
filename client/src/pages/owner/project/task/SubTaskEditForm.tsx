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
import { Input } from "@/components/ui/input";
import FormInputCustom from "@/components/custome/FormInputCustom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { SubTask } from "@/store/types/task";
import { fetchTasks, updateTask } from "@/store/taskThunk";

const formSchema = z.object({
  id: z
    .string(),
  title: z
    .string()
    .min(2, {
      message: "Please give a valid title",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  status: z.string()
  .min(2, {
    message: "Please select a valid status.",
  }),
  duration: z
    .object({
      length: z
        .number()
        .min(0, { message: "Duration must be a positive number." })
        .optional(),
      durationType: z.string().optional(),
    })
    .optional(),
});

export default function SubTaskEditForm({
  setIsModalOpen,
  taskId,
  subTaskId,
}: {
  setIsModalOpen: any;
  taskId: string;
  subTaskId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { taskData, loading, error } = useSelector((state:RootState) => state.task);
  const task = taskData.find(task => task.id === taskId)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: task?.subTasks.find((item) => item.id === subTaskId)?.id || "",
      title: task?.subTasks.find((item) => item.id === subTaskId)?.title || "",
      status:
        task?.subTasks.find((item) => item.id === subTaskId)?.status || "",
      duration: {
        durationType:
          task?.subTasks.find((item) => item.id === subTaskId)?.duration
            .durationType || "",
        length:
          task?.subTasks.find((item) => item.id === subTaskId)?.duration
            .length || undefined,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let val = values as SubTask;
    if (task) {
      const index = task.subTasks.findIndex((item) => item.id === subTaskId);

      let subTasks = [...task.subTasks];
      subTasks[index] = val;

      const res = await dispatch(
        updateTask({subTasks: subTasks}, task.id )
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
            <FormInputCustom
              field={field}
              placeholder="Enter sub task title"
              title="Title"
              showTitle={true}
            />
          )}
        />
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
          {loading ? "Loading..." : "Update Sub Task"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
