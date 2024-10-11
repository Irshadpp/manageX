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

const JoinRoomContent = () => {
  const { isRoomHost } = useSelector((state: RootState) => state.meet);
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {user} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
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
      const response = await getRoomExists(roomIdValue);
      if (response.success) {
        dispatch(setRoomId(roomIdValue));
        navigate(`/${user?.role}/meetings/room`);
      }
    } catch (error) {
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
