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
import FormInputCustom from "@/components/custome/FormInputCustom";
import { Textarea } from "@/components/ui/textarea";
import DatePickerDown from "@/components/common/DatePickerDown";
import { EmployeeList } from "@/components/task/EmployeeList";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "@/store/taskThunk";
import { useLocation } from "react-router-dom";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Please give a valid title.",
    })
    .optional(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  status: z
    .string()
    .min(2, {
      message: "Please give a valid status",
    })
    .optional(),
  priority: z
    .string()
    .min(2, {
      message: "Please give a valid priority.",
    })
    .optional(),
  assignee: z.any(),
  description: z
    .string()
    .min(2, {
      message: "Please give valid assignee.",
    })
    .optional(),
});

export default function TaskEditForm({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const location = useLocation();
  const curr = location.pathname.split("/")[1];
  const dispatch = useDispatch<AppDispatch>();

  const { taskData, loading, error } = useSelector((state: RootState) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: (taskData && taskData.title) || "",
      startDate:
        (taskData && format(new Date(taskData.startDate), "MMM d, yyyy")) || undefined,
      dueDate:
        (taskData && format(new Date(taskData.dueDate), "MMM d, yyyy")) || undefined,
      status: (taskData && taskData.status) || "",
      priority: (taskData && taskData.priority) || "",
      assignee: (taskData && taskData.assignee) || "",
      description: (taskData && taskData.description) || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (taskData) {
      const data = await dispatch(updateTask(values, taskData.id));
        setIsModalOpen(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          disabled={curr === "home"}
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter task title"
              title="Task Title"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Description"
                  className="bg-backgroundAccent"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full">
          <FormField
            control={form.control}
            name="startDate"
            disabled={curr === "home"}
            render={({ field }) => (
              <DatePickerDown title="Starting Date" field={field} />
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="dueDate"
            disabled={curr === "home"}
            render={({ field }) => (
              <DatePickerDown title="Due Date" field={field} />
            )}
          />
        </div>
        <div className="flex gap-5">
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
                      <SelectTrigger className="bg-backgroundAccent">
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
          <div className="w-full">
            <FormField
              control={form.control}
              name="priority"
              disabled={curr === "home"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-backgroundAccent">
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="assignee"
          disabled={curr === "home"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Choose Assignee</FormLabel>
              <EmployeeList field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Update Details"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
