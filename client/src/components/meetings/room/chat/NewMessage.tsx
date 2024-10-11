import React, { useState } from 'react';
import SendMessageButton from "/sendMessageButton.svg";
import { sendMessageUsingDataSignal } from '@/utils/webRTCHandler';

const NewMessage = () => {
    const [message, setMessage] = useState<string>("");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    }

    const sendMessage = () => {
        if (message.trim().length > 0) {
            console.log("sending the message to other user=========>", message);
            sendMessageUsingDataSignal(message);
        }
        setMessage("");
    }

    return (
        <div className='w-full h-[100px] flex items-center justify-center relative'>
            <input 
                type="text"
                className='border bg-background border-[#d1dbe2] text-foreground rounded-[60px] py-0 px-[20px] h-[50px] text-[16px] w-[80%] shadow-[2px_20px_5px_rgba(0,82,201,0.05)]'
                value={message}
                onChange={handleOnChange}
                placeholder='Type your message....'
                onKeyDown={handleKeyPressed}
            />
            <img 
                src={SendMessageButton} 
                alt="Send message button" 
                className='ml-2 cursor-pointer h-10 w-10'
                onClick={sendMessage}
            />
        </div>
    );
}

export default NewMessage;
