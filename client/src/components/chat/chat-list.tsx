import React, { useRef, useEffect } from "react";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from "./chat-bubble";
import { ChatMessageList } from "./chat-message-list";
import { DotsVerticalIcon, HeartIcon } from "@radix-ui/react-icons";
import { Forward, Heart } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { format } from "date-fns";
import UserAvatarImage from '/useravatar.png';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ChatType } from "@/store/types/chat";
import UserAvatar from "../common/UserAvatar";

interface ChatListProps {
  messages: any[];
  selectedChatId: string;
  sendMessage: (newMessage: any) => void;
  isMobile: boolean;
}

const getMessageVariant = (messageUserId: string, userId: string) =>{

  return userId == messageUserId  ? "sent" : "received";
}

export function ChatList({
  messages,
  selectedChatId,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const { chatData } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const selectedChat: any = chatData ? chatData.find(chat => chat.id === selectedChatId) : {};

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () =>{
    chatContainerRef.current?.scrollIntoView(false);
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const actionIcons = [
    { icon: DotsVerticalIcon, type: "More" },
    { icon: Forward, type: "Like" },
    { icon: Heart, type: "Share" },
  ];

  return (
    <div className="w-full overflow-y-auto h-full flex flex-col">
      <ChatMessageList>
        <AnimatePresence>
          <ScrollArea className="h-[540px] w-full">
          <ScrollAreaPrimitive.Viewport ref={chatContainerRef} className="h-full w-full rounded-[inherit]">
            {messages.map((message, index) => {
              const variant = getMessageVariant(message.userId, user?.id!);
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                  transition={{
                    opacity: { duration: 0.1 },
                    layout: {
                      type: "spring",
                      bounce: 0.3,
                      duration: index * 0.02,
                    },
                  }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  className="flex flex-col gap-2 p-4"
                >
                  <ChatBubble variant={variant}>
                    {selectedChat.type === ChatType.GROUP && <UserAvatar profileURL={message.profileURL || UserAvatarImage} />}
                    <ChatBubbleMessage isLoading={message.isLoading}>
                      {message.message}
                      {message.timestamp && (
                        <ChatBubbleTimestamp timestamp={format(new Date(message.timestamp), "hh:mm a")} />
                      )}
                    </ChatBubbleMessage>
                    <ChatBubbleActionWrapper>
                      {actionIcons.map(({ icon: Icon, type }) => (
                        <ChatBubbleAction
                          className="size-7"
                          key={type}
                          icon={<Icon className="size-4" />}
                          onClick={() =>
                            console.log(
                              "Action " + type + " clicked for message " + index,
                            )
                          }
                        />
                      ))}
                    </ChatBubbleActionWrapper>
                  </ChatBubble>
                </motion.div>
              );
            })}
            </ScrollAreaPrimitive.Viewport>
          </ScrollArea>
        </AnimatePresence>
      </ChatMessageList>

      <ChatBottombar isMobile={isMobile} selectedChatId={selectedChat.id} />
    </div>
  );
}
