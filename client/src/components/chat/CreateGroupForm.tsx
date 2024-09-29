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
import FormInputCustom from "@/components/custome/FormInputCustom";
import { updateProject } from "@/store/projectThunk";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import DatePickerDown from "@/components/common/DatePickerDown";
import { ManagerList } from "@/pages/owner/project/ManagerList";
import ImageUpload from "../common/ImageUpload";
import { useState } from "react";

const projectSchema = z.object({
  groupName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  startDate: z.date(),
  endDate: z.date(),
  groupDescription: z.string().optional(),
  manager: z.string(),
});

interface PropsTypes {
  setIsModalOpen: any;
}

const CreateGroupForm = ({ setIsModalOpen }: PropsTypes) => {
    const [selectedFile, setSelectedFile] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { projectData, loading, error } = useSelector(
    (state: RootState) => state.project
  );

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      groupName: "",
      startDate: undefined,
      endDate: undefined,
      groupDescription: "",
      manager: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    // if (project) {
    //   const res: any = await dispatch(
    //     updateProject(values, project.id)
    //   );
    //   if(res?.success){
    //     setIsModalOpen(false);
    //   }
    // }
  };
  
  return (
      <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2  px-5 mb-5"
      >
        <ImageUpload
        size="20"
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        <FormField
          control={form.control}
          name="groupName"
          render={({ field }) => (
            <FormInputCustom
              placeholder="Enter Group Name"
              field={field}
              showTitle={true}
              title="Group Name"
            />
          )}
        />
        <FormField
          control={form.control}
          name="groupDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Group Description"
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
          {loading ? "Creating..." : "Create Group"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default CreateGroupForm;
