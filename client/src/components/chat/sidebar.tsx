import { cn } from "@/lib/utils";
import {  buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import CreateGroupButton from "./CreateGroupButton";
import { Avatar, AvatarImage } from "../ui/avatar";
import UserAvatar from "../common/UserAvatar";
import UserAvatarImage from '/useravatar.png'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { ChatType, MessageType } from "@/store/types/chat";
import GroupImage from "/groupProfile.jpeg";
import { Message } from "@mui/icons-material";


interface SidebarProps {
  isCollapsed: boolean;
  chats: {
    id: string;
    name: string;
    messages: any[];
    profileURL: string;
    type: string;
    groupProfile?: string;
    variant: "secondary" | "ghost";
  }[];
  onUserClick: (user: any) => void; // Callback to update selected user
  isMobile: boolean;
}

export function Sidebar({ chats, isCollapsed, onUserClick, isMobile }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: RootState) => state.auth)
 console.log(chats," from side bar...........")

 const sortedChats = [...chats].sort((a, b) => {
  const lastMessageA = a.messages[a.messages.length - 1];
  const lastMessageB = b.messages[b.messages.length - 1];

  const timestampA = lastMessageA ? new Date(lastMessageA.timestamp).getTime() : 0;
  const timestampB = lastMessageB ? new Date(lastMessageB.timestamp).getTime() : 0;

  return timestampB - timestampA; // Sort in descending order (latest on top)
});

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span >({chats.length})</span>
          </div>
          <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        {user?.role !== "employee" && <CreateGroupButton/>}
        </TooltipTrigger>
        <TooltipContent>
          <p>Create New Group</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {sortedChats.map((chat, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      buttonVariants({ variant: chat.variant, size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16",
                      chat.variant === "secondary" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    )}
                    onClick={() => onUserClick(chat)} 
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={chat.type === ChatType.ONE_ON_ONE ? (chat.profileURL || UserAvatarImage) : (chat.groupProfile || GroupImage)}
                        alt={chat.type === ChatType.ONE_ON_ONE ? (chat.profileURL || UserAvatarImage) : (chat.groupProfile || GroupImage)}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{chat.name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {chat.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <button
              key={index}
              className={cn(
                buttonVariants({ variant: chat.variant, size: "lg" }),
                "h-16 md:h-16 ",
                chat.variant === "secondary" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                "justify-start gap-4",
              )}
              onClick={() => onUserClick(chat)} 
            >
                <UserAvatar
                  profileURL={chat.type === ChatType.ONE_ON_ONE ? (chat.profileURL || UserAvatarImage) : (chat.groupProfile || GroupImage)}
                 size={50}
                />
              <div className="flex flex-col max-w-28">
                <span>{chat.name}</span>
                {chat.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate">
                  {chat.messages[chat.messages.length - 1]?.name === user?.name ? "You" : chat.messages[chat.messages.length - 1]?.name}:
                  {chat.messages[chat.messages.length - 1]?.type === MessageType.IMAGE
                    ? " Image"
                    : chat.messages[chat.messages.length - 1]?.type === MessageType.VIDEO
                    ? " Video"
                    : chat.messages[chat.messages.length - 1]?.type === MessageType.FILE
                    ? " File"
                    : " "+chat.messages[chat.messages.length - 1]?.message}
                </span>
                )}
              </div>
            </button>
          ),
        )}
      </nav>
    </div>
  );
}
