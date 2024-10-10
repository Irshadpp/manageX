import React, { useEffect } from 'react';
import ConnectingButtons from './ConnectingButtons';
import { connectWithSocketIOServer } from '@/utils/wss';
// import logo from '../../../public/logo.png';
// import { connectWithSocketIOServer } from '../../../utils/wss';

const Meet = () => {
  window.onload = () => {
    console.log('Checking WebRTC and secure random number support...');
    if ((window.crypto as any).getRandomValues && window.RTCPeerConnection) {
      console.log('WebRTC and secure random number generation are supported.');
    } else {
      console.log('WebRTC or secure random number generation is not supported.');
    }
  };

  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[600px] h-[400px] bg-card text-card-foreground border border-border shadow-md flex flex-col items-center justify-evenly">
        {/* <img src={logo} alt="Logo" className="w-[150px]" /> */}
        <ConnectingButtons />
      </div>
    </div>
  );
};

export default Meet;
