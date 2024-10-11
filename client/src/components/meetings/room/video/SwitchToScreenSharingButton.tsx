import React, { useState } from 'react';
import ScreenShareButtonImg from "/switchToScreenSharing.svg";
import LocalScreenSharingPreview from './LocalScreenSharingPreview';
import { toggleScreenShare } from '@/utils/webRTCHandler';

const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState<boolean>(false);
  const [screenSharingStream, setScreenSharingStream] = useState<MediaStream | null>(null);

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia();
      } catch (error) {
        console.log("Error in screen sharing function:", error);
      }
      if (stream) {
        setScreenSharingStream(stream);
        toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
      }
    } else {
      toggleScreenShare(isScreenSharingActive);
      setIsScreenSharingActive(false);

      if (screenSharingStream) {
        screenSharingStream.getTracks().forEach((track) => track.stop());
        setScreenSharingStream(null);
      }
    }
  };

  return (
    <div className="ml-[25px] flex flex-col">
        <img
          src={ScreenShareButtonImg}
          alt="screen share button"
          onClick={handleScreenShareToggle}
          className='video_button_image cursor-pointer'
        />
      {isScreenSharingActive && screenSharingStream && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </div>
  );
};

export default SwitchToScreenSharingButton;
