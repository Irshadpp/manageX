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
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Label } from "flowbite-react";
import UserAvatarImage from "/useravatar.png";
import GroupImage from "/groupProfile.jpeg";
import { TiDelete } from "react-icons/ti";
import { uploadImage } from "@/utils/uploadImage";
import { ChatType } from "@/store/types/chat";
import { io } from "socket.io-client";
import ImageUpload from "../common/ImageUpload";
import { createGroup } from "@/store/chatThunk";
import MemberAddButton from "./MemberAddButton";

const groupSchema = z.object({
  groupName: z
    .string()
    .min(2, { message: "Group name must be at least 2 characters." }),
  groupDescription: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  groupProfile: z.string().optional(),
});

interface PropsTypes {
  setIsModalOpen: any;
}

const CreateGroupForm = ({ setIsModalOpen }: PropsTypes) => {
  const [socket, setSocket] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [members, setMembers] = useState<any[]>([]);
  const [participantError, setParicipantError] = useState<string>('')
  const { chatData, loading, error } = useSelector(
    (state: RootState) => state.chat
  );

  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      groupName: "",
      groupProfile: "",
      groupDescription: "",
    },
  });

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(socketInstance);

  }, []);

  const handleRemoveMember = (member: any) => {
    const updatedMembers = members.filter((m: any) => m.id !== member.id);
    setMembers(updatedMembers);
  };

  const onSubmit = async (values: z.infer<typeof groupSchema>) => {
    const groupProfile = selectedFile && (await uploadImage(selectedFile));
    if (groupProfile) {
      values.groupProfile = groupProfile;
    };
    if(members.length < 2){
      return setParicipantError("There must be at least 2 participants.")
    }

    const groupData = {
      participants: [user?.id, ...members.map(m => m.id)],
      type: ChatType.GROUP,
      groupName: values.groupName,
      groupDescription: values.groupDescription,
      groupProfile: groupProfile || "",
    }

    const res = await dispatch(createGroup(groupData))
    if(res?.success){
      setIsModalOpen(false);
    }
}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 px-5 mb-5"
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
            members.map((member: any, index: number) => (
              <div className="relative inline-block" key={index}>
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-4">
                  <img
                    src={member.profileURL || UserAvatarImage}
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

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Group"}
        </Button>
        {error || participantError && <p className="text-sm text-red-500">{error || participantError}</p>}
      </form>
    </Form>
  );
}
 

export default CreateGroupForm;
