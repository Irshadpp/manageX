import React, { useState } from 'react';
import CameraButtonImage from "/camera.svg";
import CameraOffButtonImage from "/cameraOff.svg";
import { toggleCamera } from '@/utils/webRTCHandler';

const CameraButton = () => {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState<boolean>(false);

  const handleCameraButtonClick = () => {
    toggleCamera(isLocalVideoDisabled);
    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };

  return (
    <div className="ml-[25px] flex flex-col">
      <img
        src={isLocalVideoDisabled ? CameraOffButtonImage : CameraButtonImage}
        alt="Camera Icon"
        onClick={handleCameraButtonClick}
        className="cursor-pointer w-10 h-10" // Adjust size as needed
      />
    </div>
  );
};

export default CameraButton;
