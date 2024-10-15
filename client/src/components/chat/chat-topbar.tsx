import { Info, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ExpandableChatHeader } from "./expandable-chat";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserAvatar from "../common/UserAvatar";
import UserAvatarImage from '/useravatar.png'
import { ChatType } from "@/store/types/chat";
import GroupImage from "/groupProfile.jpeg";

interface ChatTopbarProps {
  selectedChatId: string;
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({ selectedChatId }: ChatTopbarProps) {
  const {chatData} = useSelector((state: RootState) => state.chat);
  const selectedChat: any = chatData ? chatData.find(chat => chat.id === selectedChatId) : {}; 
  console.log(selectedChat)
  return (
    <ExpandableChatHeader>
      <div className="flex items-center gap-2">
      <UserAvatar
                  profileURL={selectedChat.type == ChatType.ONE_ON_ONE ? (selectedChat.profileURL || UserAvatarImage) : (selectedChat.groupProfile || GroupImage)}
                 size={50}
                />
        <div className="flex flex-col">
          <span className="font-medium">{selectedChat.name || selectedChat.groupName}</span>
          {/* <span className="text-xs">Active 2 mins ago</span> */}
        </div>
      </div>

      <div className="flex gap-1">
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            to="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>
    </ExpandableChatHeader>
  );
}
