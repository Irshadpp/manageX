import { RootState } from '@/store';
import { ScrollArea } from "@/components/ui/scroll-area";
import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({ author, content, sameAuthor, messageCreatedByMe }: any) => {
  const alignClass = messageCreatedByMe ? "self-end" : "self-start"; // Align messages left or right
  const authorText = messageCreatedByMe ? "You" : author;

  return (
    <div className={`flex flex-col mb-2 ${alignClass} max-w-[80%]`}>
      {!sameAuthor && (
        <p className="text-sm text-gray-500 mb-1">{authorText}</p>
      )}
      <p
        className={`inline-block p-2 rounded-lg shadow-md break-words ${
          messageCreatedByMe
            ? "bg-primary text-foreground"
            : "bg-gray-200 text-gray-800"
        }`}
        style={{ maxWidth: '100%', wordBreak: 'break-word' }} // Ensure the text wraps inside the container
      >
        {content}
      </p>
    </div>
  );
};

const Messages = () => {
  const { messages } = useSelector((state: RootState) => state.meet);

  return (
    <div className="flex-grow overflow-y-auto">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col space-y-2 px-4">
          {messages &&
            messages.map((message: any, index: number) => {
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
        </div>
      </ScrollArea>
    </div>
  );
};

export default Messages;
