import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { ManagerList } from "./ManagerList";
import FormInputCustom from "@/components/custome/FormInputCustom";
import { updateProject } from "@/store/projectThunk";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import DatePickerDown from "@/components/common/DatePickerDown";

const projectSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().optional(),
  manager: z.string(),
});

interface PropsTypes {
  setIsModalOpen: any;
  project: any;
}

const EditForm = ({ setIsModalOpen, project }: PropsTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const { projectData, loading, error } = useSelector((state: RootState) => state.project);


  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: (project && project.name) || "",
      startDate: (project && new Date(project.startDate)) || undefined,
      endDate: (project && new Date(project.endDate)) || undefined,
      description: (project && project.description) || "",
      manager:
        (project &&
          typeof project.manager !== "string" &&
          project.manager.id) ||
        "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    if (project) {
      const res: any = await dispatch(
        updateProject(values, project.id)
      );
      if(res?.success){
        setIsModalOpen(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-5 mb-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInputCustom
              placeholder="Enter Project Name"
              field={field}
              showTitle={true}
              title="Project Name"
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Project Description"
                  {...field}
                  className="my-2 h-20 bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <DatePickerDown title="Start Date" field={field} />
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <DatePickerDown title="End Date" field={field} />
          )}
        />
        <FormField
          control={form.control}
          name="manager"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Choose Manager</FormLabel>
              <ManagerList field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="" disabled={loading}>
          {loading ? "Loading..." : "Update Project"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default EditForm;
