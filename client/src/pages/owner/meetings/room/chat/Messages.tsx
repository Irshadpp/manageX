import { RootState } from '@/store';
import { ScrollArea } from "@/components/ui/scroll-area";
import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({ author, content, sameAuthor, messageCreatedByMe }: any) => {
    const alignClass = messageCreatedByMe ? "justify-end" : "justify-start";
    const authorText = messageCreatedByMe ? "You" : author;
  
    return (
      <div className={`flex ${alignClass} mb-2`}>
        {!sameAuthor && (
          <p className="text-sm text-gray-500">{authorText}</p>
        )}
        <p
          className={`max-w-xs p-2 rounded-lg shadow-md ${
            messageCreatedByMe
              ? "bg-primary text-forground ml-2"
              : "bg-gray-200 text-gray-800 mr-2"
          }`}
        >
          {content}
        </p>
      </div>
    );
  };

  const Messages = () => {
    const { messages } = useSelector((state: RootState) => state.meet);
    
    return (
      <div className="w-[calc(100%-70px)] ml-[30px] mr-[30px] flex-grow">
        <ScrollArea className="h-[600px] w-full">
        {messages && messages.map((message: any, index: number) => {
          const sameAuthor = index > 0 && message.identity === messages[index - 1].identity;
          return (
            <Message
              key={index}
              author={message.identity}
              content={message.content}
              sameAuthor={sameAuthor}
              messageCreatedByMe={message.messageCreatedByMe}
            />
          );
        })}
        </ScrollArea>
      </div>
    );
  };
  
  export default Messages
  