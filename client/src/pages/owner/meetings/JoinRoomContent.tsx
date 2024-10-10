import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JoinRoomInputs from "./JoinRoomInputs";
// import { getRoomExists } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { setIdentity, setRoomId } from "@/store/meetSlice";
import JoinRoomButtons from "./JoinRoomButtons";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckBox";
import ErrorMessage from "./ErrorMessage";

const JoinRoomContent = () => {
  const { isRoomHost } = useSelector((state: RootState) => state.meet);
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  const joinRoom = async () => {
    try {
    //   const response = await getRoomExists(roomIdValue);
    //   if (response.success) {
    //     dispatch(setRoomId(roomIdValue));
    //     navigate("/room");
    //   }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const createRoom = () => {
    navigate("/owner/meetings/room");
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
