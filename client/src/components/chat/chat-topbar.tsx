import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Info, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ExpandableChatHeader } from "./expandable-chat";
import { Link } from "react-router-dom";

interface ChatTopbarProps {
  selectedChat: any;
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({ selectedChat }: ChatTopbarProps) {
  return (
    <ExpandableChatHeader>
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedChat.profileURL}
            alt={selectedChat.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedChat.name}</span>
          <span className="text-xs">Active 2 mins ago</span>
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
