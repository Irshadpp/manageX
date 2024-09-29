import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ChatProps {
  messages?: any[];
  selectedChatId: string;
  isMobile: boolean;
}


export function Chat({ messages, selectedChatId, isMobile }: ChatProps) {
  const {chatData} = useSelector((state: RootState) => state.chat);
  const chat = chatData && chatData.find(chat => selectedChatId === chat.id);
  const messagesState = chat?.messages || [];

  const sendMessage = (newMessage: any) => {
    
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedChatId={selectedChatId} />
      <ChatList
        messages={messagesState}
        selectedChatId={selectedChatId}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
