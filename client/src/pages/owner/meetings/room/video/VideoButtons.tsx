import React from 'react';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import LeaveButton from './LeaveButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const VideoButtons = () => {
  const { connectOnlyWithAudio } = useSelector((state: RootState) => state.meet);
  
  return (
    <div className="w-[60%] h-[10%] flex items-center justify-center absolute left-[20%] bottom-0 bg-gradient-to-b from-primary to-primary/30 rounded-t-[25px]">
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}
      <LeaveButton />
      {!connectOnlyWithAudio && <SwitchToScreenSharingButton />}
    </div>
  );
};

export default VideoButtons;
