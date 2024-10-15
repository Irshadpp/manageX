import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import { AiOutlinePaperClip } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { EmojiPicker } from "./emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChatInput } from "./chat-input";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchChats } from "@/store/chatThunk";
import {MessageType } from "@/store/types/chat";
import useSocket from "@/hooks/useSocket";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import FileUploadSelector from "./file-upload-selector";

interface ChatBottombarProps {
  isMobile: boolean;
  selectedChatId: string;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({ isMobile, selectedChatId }: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const selectedChat =  useSelector((state: RootState) => 
    state.chat.chatData.find(chat => chat.id === selectedChatId)
  );
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useSelector((state: RootState) => state.auth);
  const {emitEvent} = useSocket()


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = (newMessage: any) => {
    if(selectedChat){
      const message = {
        chatId: selectedChat.id,
        content: newMessage.message,
        type: MessageType.TEXT,
        from: user!.id
      }
      emitEvent("sendMessage", message);
    }
  };

  const handleThumbsUp = () => {
    const newMessage = {
      name: user!.name, 
      profileURL: user?.profileURL, 
      message: "👍",
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        name: user!.name, 
      profileURL: user?.profileURL, 
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };


  useEffect(() => {
    if (selectedChat) {
      emitEvent('joinRoom', { chatId: selectedChat.id });
    }
  }, [selectedChat]);


  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };
  return (
    <div className="px-2 py-4 flex justify-between w-full items-center gap-2">
      <div className="flex">
        {!message.trim() && !isMobile && (
          <div className="flex">
            <AiOutlinePaperClip
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="text-muted-foreground h-9 w-9 shrink-0"/>   
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload file</DialogTitle>
              <DialogDescription>
                Choose the type of file you are planning to send
              </DialogDescription>
            </DialogHeader> 
            <FileUploadSelector chat={selectedChat} setIsModalOpen={setIsModalOpen} />
          </DialogContent>
        </Dialog>


      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <ChatInput
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="rounded-full pr-12"
          />
          <div className="absolute right-4 bottom-2  ">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={handleSend}
            disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <SendHorizontal size={22} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={handleThumbsUp}
            disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <ThumbsUp size={22} className="text-muted-foreground" />
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
