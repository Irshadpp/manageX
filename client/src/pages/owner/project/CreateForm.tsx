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
import FormInputCustom from "@/components/custome/FormInputCustom";
import { Textarea } from "@/components/ui/textarea";
import { MembersTable } from "./MembersTable";
import { ManagerList } from "./ManagerList";
import DatePickerWithLimit from "@/components/project/DatePickerWithLimit";

const projectSchema = z.object({
  name: z.string().min(2, { message: "Please give a valid name" }),
  startDate: z.date(),
  endDate: z.date(),
  members: z.array(z.string()).optional(),
  description: z.string().optional(),
  manager: z.string(),
});

const CreateForm = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const { loading, error } = useAppSelector((state) => state.project);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      startDate: undefined,
      endDate: undefined,
      members: [],
      description: "",
      manager: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    // const res = await dispatch(createProject(values));
    // if (createProject.fulfilled.match(res)) {
    //   router.back();
    // }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-5 mb-5"
      >
        <div className="md:grid grid-cols-4 gap-5">
          <div className="col-span-3">
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
            <div className="py-2"></div>
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
                      className="my-2 h-52 bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MembersTable />
          </div>
          <div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <DatePickerWithLimit title="Start Date" field={field} />
              )}
            />
            <div className="py-2"></div>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <DatePickerWithLimit title="End Date" field={field} />
              )}
            />
            <div className="py-2"></div>
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
          </div>
        </div>

        {/* <Button type="submit" className="" disabled={loading}>
          {loading ? "Loading..." : "Create Project"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>} */}
      </form>
    </Form>
  );
};

export default CreateForm;
