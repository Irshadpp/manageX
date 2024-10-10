import React, { useState } from 'react'
import MicButtonImage from "/mic.svg"
import MicOffButtonImage from "/micOff.svg"
import { toggleMic } from '@/utils/webRTCHandler'

const MicButton = () => {
    const [isMicMute, setIsMicMute] = useState<boolean>(false)

    const handleMicbuttonClick = () =>{
      toggleMic(isMicMute);
        setIsMicMute(!isMicMute);
    }
  return (
    <div className='ml-[25px] flex flex-col'>
      <img src={isMicMute ? MicOffButtonImage : MicButtonImage} 
      alt="icone" 
      onClick={handleMicbuttonClick}
      className='h-[80%] p-[10px] rounded-[25px] transition duration-300'
      />    
    </div>
  )
}

export default MicButton
