import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "./avatar";
import { Link } from "react-router-dom";



interface SidebarProps {
  isCollapsed: boolean;
  chats: {
    id: string;
    name: string;
    messages: any[];
    profileURL: string;
    variant: "secondary" | "ghost";
  }[];
  onUserClick: (user: any) => void; // Callback to update selected user
  isMobile: boolean;
}

export function Sidebar({ chats, isCollapsed, onUserClick, isMobile }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({chats.length})</span>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {chats.map((chat, index) =>
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
                    onClick={() => onUserClick(chat)} // Handle user click
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={chat.profileURL}
                        alt={chat.profileURL}
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
              onClick={() => onUserClick(chat)} // Handle user click
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={chat.profileURL}
                  alt={chat.profileURL}
                  width={10}
                  height={10}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{chat.name}</span>
                {chat.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {chat.name}: {chat.messages[chat.messages.length - 1].message}
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
