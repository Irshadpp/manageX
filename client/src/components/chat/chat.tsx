import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";

interface ChatProps {
  messages?: any[];
  selectedChat: any;
  isMobile: boolean;
}


export function Chat({ messages, selectedChat, isMobile }: ChatProps) {
  const messagesState = selectedChat.messages;

  const sendMessage = (newMessage: any) => {
    
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedChat={selectedChat} />
      <ChatList
        messages={messagesState}
        selectedChat={selectedChat}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
