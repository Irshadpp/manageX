import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JoinRoomInputs from "./JoinRoomInputs";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { setIdentity, setRoomId } from "@/store/meetSlice";
import JoinRoomButtons from "./JoinRoomButtons";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckBox";
import ErrorMessage from "./ErrorMessage";
import { getRoomExists } from "@/services/api/meetApis";
import { apiRequest } from "@/services/api/commonRequest";

const JoinRoomContent = () => {
  const { isRoomHost } = useSelector((state: RootState) => state.meet);
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {user} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if(!nameValue){
      return setErrorMessage("Name is required")
    }
    if(nameValue.trim().length < 2){
      return setErrorMessage("Name must include minimum 2 charecters")
    }
    dispatch(setIdentity(nameValue));
    if (isRoomHost) {
      createRoom();
    } else {
      joinRoom();
    }
  };

  const openNewTab = (path: string) => {
    window.open(`${window.location.origin}${path}`, "_blank");
  };
  
  const joinRoom = async () => {
    try {
      if(roomIdValue.trim().length < 1){
        return setErrorMessage("Room id is required")
      }
      const response = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_MEET_URL,
        route: `/api/v1/meet/room-exists/${roomIdValue}`,
        headers:{
          "Content-Type": "application/json"
        }
      });
      if(!response.success){
        setErrorMessage(response?.errors[0]?.message || "An error occurred. Please try again.");
        return
      }
      if (response.success) {
        dispatch(setRoomId(roomIdValue));
        navigate(`/${user?.role}/meetings/room`);
      }
    } catch (error: any) {
      console.log("errorr======>",error)
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  
  const createRoom = () => {
    navigate(`/${user?.role}/meetings/room`);
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons handleJoinRoom={handleJoinRoom} isRoomHost={isRoomHost} />
    </>
  );
};

export default JoinRoomContent;
