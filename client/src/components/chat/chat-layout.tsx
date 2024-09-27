// import { userData } from "@/app/data";
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

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}


const userData = [
  {name: "irshad1", messages:[
    {
      id: 1,
      avatar:
        "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
      name: "Jane Doe",
      message: "Hey, Jakob",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      avatar:
        "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
      name: "Jakob Hoeg",
      message: "Hey!",
      timestamp: "10:01 AM",
    },
    {
      id: 3,
      avatar:
        "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
      name: "Jane Doe",
      message: "How are you?",
      timestamp: "10:02 AM",
    },
    {
      id: 4,
      avatar:
        "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
      name: "Jakob Hoeg",
      message: "I am good, you?",
      timestamp: "10:03 AM",
    },
    {
      id: 5,
      avatar:
        "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
      name: "Jane Doe",
      message: "I am good too!",
      timestamp: "10:04 AM",
    },
    {
      id: 6,
      avatar:
        "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
      name: "Jakob Hoeg",
      message: "That is good to hear!",
      timestamp: "10:05 AM",
      isLiked: true,
    },
    {
      id: 7,
      avatar:
        "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
      name: "Jane Doe",
      message: "How has your day been so far?",
      timestamp: "10:06 AM",
    },
    {
      id: 8,
      avatar:
        "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
      name: "Jakob Hoeg",
      message:
        "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
      timestamp: "10:10 AM",
    },
    {
      id: 9,
      avatar:
        "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
      name: "Jane Doe",
      isLoading: true,
    },
  ], avatar: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"},

  {name: "irshad2", messages:[], avatar: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"},
  {name: "irshad3", messages:[], avatar: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"},
  {name: "irshad4", messages:[], avatar: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"},
  {name: "irshad5", messages:[], avatar: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"},
  {name: "irshad6", messages:[], avatar: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"},
  {name: "irshad7", messages:[], avatar: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"},
  {name: "irshad8", messages:[], avatar: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"},
]

// export function ChatLayout({
//   defaultLayout = [320, 480],
//   defaultCollapsed = false,
//   navCollapsedSize,
// }: ChatLayoutProps) {
//   const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
//   const [selectedUser, setSelectedUser] = React.useState(userData[0]);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenWidth = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     // Initial check
//     checkScreenWidth();

//     // Event listener for screen width changes
//     window.addEventListener("resize", checkScreenWidth);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", checkScreenWidth);
//     };
//   }, []);

//   return (
//     <ResizablePanelGroup
//       direction="horizontal"
//       onLayout={(sizes: number[]) => {
//         document.cookie = `react-resizable-panels:layout=${JSON.stringify(
//           sizes,
//         )}`;
//       }}
//       className="h-full items-stretch"
//     >
//       <ResizablePanel
//         defaultSize={defaultLayout[0]}
//         collapsedSize={navCollapsedSize}
//         collapsible={true}
//         minSize={isMobile ? 0 : 24}
//         maxSize={isMobile ? 8 : 30}
//         onCollapse={() => {
//           setIsCollapsed(true);
//           document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//             true,
//           )}`;
//         }}
//         onExpand={() => {
//           setIsCollapsed(false);
//           document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//             false,
//           )}`;
//         }}
//         className={cn(
//           isCollapsed &&
//             "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out",
//         )}
//       >
//         <ScrollArea className="h-[100vh] w-full bg-muted/20">
//         <Sidebar
//           isCollapsed={isCollapsed || isMobile}
//           chats={userData.map((user) => ({
//             name: user.name,
//             messages: user.messages ?? [],
//             avatar: user.avatar,
//             variant: selectedUser.name === user.name ? "secondary" : "ghost",
//           }))}
//           isMobile={isMobile}
//         />
//         </ScrollArea>
//       </ResizablePanel>
//       <ResizableHandle withHandle />
//       <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
//         <Chat
//           messages={selectedUser.messages}
//           selectedUser={selectedUser}
//           isMobile={isMobile}
//         />
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   );
// }




export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);

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
            chats={userData.map((user) => ({
              name: user.name,
              messages: user.messages ?? [],
              avatar: user.avatar,
              variant: selectedUser.name === user.name ? "secondary" : "ghost",
            }))}
            isMobile={isMobile}
            onUserClick={(user) => setSelectedUser(user)} // Pass the handler to update selectedUser
          />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
