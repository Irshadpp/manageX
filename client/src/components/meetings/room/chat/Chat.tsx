import React from 'react';
import ChatLabel from './ChatLabel';
import Messages from './Messages';
import NewMessage from './NewMessage';

const Chat = () => {
  return (
    <div className="h-screen w-1/6 bg-muted/50 flex flex-col">
      <ChatLabel />
      <Messages />
      <NewMessage />
    </div>
  );
};

export default Chat;
