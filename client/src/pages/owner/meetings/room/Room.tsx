import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as webRTChandler from '@/utils/webRTCHandler';
import { RootState } from "@/store";
import RoomLabel from "./RoomLabel";
import { Overlay } from "@radix-ui/react-dialog";
import ParticipantsSection from "./participants/ParticipantsSection";
import Chat from "./chat/Chat";
import Video from "./video/Video";

const Room = () => {
  const { roomId, isRoomHost, identity, showOverlay, connectOnlyWithAudio } =
    useSelector((state: RootState) => state.meet);

  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    }
    webRTChandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId,
      connectOnlyWithAudio
    );
  }, []);

  return (
    <div className="flex w-full h-screen">
      <ParticipantsSection />
    <Video />
      <Chat />
      <RoomLabel roomId={roomId} />
      {/* {showOverlay && <Overlay />} */}
    </div>
  );
};

export default Room;
