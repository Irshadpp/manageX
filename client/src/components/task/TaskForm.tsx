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
import { Textarea } from "@/components/ui/textarea";
import FormInputCustom from "../custome/FormInputCustom";
import DatePickerDown from "../common/DatePickerDown";
import { EmployeeList } from "./EmployeeList";
import { ProjectList } from "./ProjectList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { createTask } from "@/store/taskThunk";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Please give a valid title.",
    }),
  projectId: z
    .string()
    .min(2, {
      message: "Please give a valid project",
    })
    .optional(),
  startDate: z.date(),
  dueDate: z.date(),
  status: z
    .string()
    .min(2, {
      message: "Please choose a status",
    }),
  priority: z
    .string()
    .min(2, {
      message: "Please choose a priority",
    }),
  assignee: z
    .string()
    .min(2, {
      message: "Please choose an assignee",
    }),
  description: z
    .string()
    .min(2, {
      message: "Please give a valid description.",
    })
    .max(300, { message: "Description should be Less than 300 characters" })
    .optional(),
});

export default function TaskForm({
  setIsModalOpen,
  id,
}: {
  setIsModalOpen: any;
  id?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state:RootState) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      projectId: id ?? "",
      startDate: undefined,
      dueDate: undefined,
      status: "",
      priority: "",
      assignee: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await dispatch(createTask(values))
      setIsModalOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
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
                  className="bg-background"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <div className="w-full">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <DatePickerDown title="Starting Date" field={field} />
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <DatePickerDown title="Due Date" field={field} />
              )}
            />
          </div>
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
          <div className="w-full">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
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
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Choose Assignee</FormLabel>
              <EmployeeList field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        {!id && (
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Choose Project</FormLabel>
                <ProjectList field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Update Details"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
