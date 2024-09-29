import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { Chat } from "./chat";
import { ScrollArea } from "../ui/scroll-area";
import { timeStamp } from "console";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchChats } from "@/store/chatThunk";
import UserAvatarImage from '/useravatar.png'
import { SelectChat } from "./SelectChat";
import { ChatTypes } from "@/store/types/chat";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}


export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  
  const {chatData} = useSelector((state:RootState) => state.chat);
  const [selectedChat, setSelectedChat] = React.useState<ChatTypes | null>(null);


  useEffect(()=>{
    dispatch(fetchChats());
  },[])

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
          )}`;
        }}
        className={cn(
          isCollapsed &&
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out",
        )}
      >
        <ScrollArea className="h-[100vh] w-full bg-muted/20">
          <Sidebar
            isCollapsed={isCollapsed || isMobile}
            chats={chatData ? chatData.map((item) => ({
              id: item.id,
              name: item.name || item.groupName!,
              messages: item.messages ?? [],
              profileURL: item.profileURL || item.groupProfile || UserAvatarImage,
              variant: selectedChat && selectedChat.name === item.name ? "secondary" : "ghost",
            })) : []} 
            isMobile={isMobile}
            onUserClick={(chat) => setSelectedChat(chat)}
          />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
      {selectedChat ? (
          <Chat
            messages={selectedChat.messages}
            selectedChatId={selectedChat.id}
            isMobile={isMobile}
          />
        ) : (
          <SelectChat /> // Show the prompt when no user is selected
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
