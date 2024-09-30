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
import { Label } from "@/components/ui/label";
import UserAvatarImage from "/useravatar.png";
import { TiDelete, TiDeleteOutline } from "react-icons/ti";
import MemberAddButton from "./MemberAddButton";
import { useState } from "react";


const projectSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().optional(),
  manager: z.string(),
  members: z.array(z.string()),
});

interface PropsTypes {
  setIsModalOpen: any;
  project: any;
}

const EditForm = ({ setIsModalOpen, project }: PropsTypes) => {
  const [projectData, setProjectData] = useState(project)
  const [members, setMembers] = useState(projectData.members);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.project
  );

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: (projectData && projectData.name) || "",
      startDate: (projectData && new Date(projectData.startDate)) || undefined,
      endDate: (projectData && new Date(projectData.endDate)) || undefined,
      description: (projectData && projectData.description) || "",
      manager:
        (projectData &&
          typeof projectData.manager !== "string" &&
          projectData.manager.id) ||
        "",
      members: members.map((m:any) => m.id)
    },
  });
  
  const { setValue } = form;

  const handleRemoveMember = (member: any) => {
    const updatedMembers = members.filter((m: any) => m.id !== member.id);
    setMembers(updatedMembers);
    setValue("members", updatedMembers.map((m: any) => m.id));
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    console.log("form submitted..........", members)
    if (projectData) {
      console.log(values, ".............")
      const res: any = await dispatch(updateProject(values, projectData.id));
      if (res?.success) {
        setIsModalOpen(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 px-5 mb-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInputCustom
              placeholder="Enter project Name"
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

        <Label>
          <p className="pt-2">Members</p>
        </Label>
        <div className="mb-2 flex">
          {members &&
            members !== "string" &&
            members.map((member: any, index: number) => (
              <div className="relative inline-block" key={index}>
              <div
                className={`relative w-11 h-11 rounded-full overflow-hidden border-4 `}
              >
                <img
                  src={
                    (member &&
                      typeof member !== "string" &&
                      (member.profileURL as string)) ||
                    UserAvatarImage
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            
              <button
              type="button"
                onClick={() => handleRemoveMember(member)}
                className="absolute top-0 right-0 translate-x-2 -translate-y-2 w-5 h-5 flex items-center justify-center z-50"
              >
                <TiDelete className="text-red-500 w-5 h-5" />
              </button>
            </div>
            ))}
            <MemberAddButton isIcon={true} setMembers={setMembers} />
        </div>
  

        <Button type="submit" className="" disabled={loading}>
          {loading ? "Loading..." : "Update Project"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default EditForm;
