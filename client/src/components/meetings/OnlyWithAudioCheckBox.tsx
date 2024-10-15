import React from "react";
import CheckImg from "/check.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setConnectOnlyWithAudio } from "@/store/meetSlice";

const OnlyWithAudioCheckbox = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { connectOnlyWithAudio } = useSelector((state: RootState) => state.meet);

  const handleConnectionTypeChange = () => {
    dispatch(setConnectOnlyWithAudio(!connectOnlyWithAudio));
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleConnectionTypeChange}>
      <div className="flex items-center justify-center w-6 h-6 border border-gray-300 rounded-md">
        {connectOnlyWithAudio && (
          <img className="w-4 h-4" src={CheckImg} alt="Checked" />
        )}
      </div>
      <p className="ml-2 text-sm">Only audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
