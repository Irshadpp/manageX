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
import { Label } from "flowbite-react";
import UserAvatarImage from "/useravatar.png";
import GroupImage from "/groupProfile.jpeg"
import { TiDelete } from "react-icons/ti";
import MemberAddButton from "@/pages/owner/project/MemberAddButton";

const projectSchema = z.object({
  groupName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  startDate: z.date(),
  endDate: z.date(),
  groupDescription: z.string().optional(),
  members: z.array(z.string()),
});

interface PropsTypes {
  setIsModalOpen: any;
}

const CreateGroupForm = ({ setIsModalOpen }: PropsTypes) => {
    const [members, setMembers] = useState<any>([]);
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
      members: [],
    },
  });

  const { setValue } = form;
  console.log(members)
  const handleRemoveMember = (member: any) => {
    const updatedMembers = members.filter((m: any) => m.id !== member.id);
    setMembers(updatedMembers);
    setValue("members", updatedMembers.map((m: any) => m.id));
  };

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
        imageURL={GroupImage}
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
          {loading ? "Creating..." : "Create Group"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default CreateGroupForm;
