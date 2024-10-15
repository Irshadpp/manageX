import React, { useEffect } from 'react';
import ConnectingButtons from '../../../components/meetings/ConnectingButtons';
import { connectWithSocketIOServer } from '@/utils/wss';
// import logo from '../../../public/logo.png';

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
    <div className="flex h-screen items-center justify-center p-4">
    <div className="flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.35)] rounded-lg w-full max-w-md bg-card p-5 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
      <div className="p-10 space-y-2 flex flex-col ">
      <div className="text-center w-full">
        <h2 className="text-2xl font-bold my-[30px]">Get Started With Your Meeting</h2>
      </div>
        <ConnectingButtons />
      </div>
      </div>
    </div>
  );
};

export default Meet;
