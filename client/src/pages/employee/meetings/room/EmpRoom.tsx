import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as webRTChandler from '@/utils/webRTCHandler';
import { RootState } from "@/store";
import ParticipantsSection from "@/components/meetings/room/participants/ParticipantsSection";
import Video from "@/components/meetings/room/video/Video";
import RoomLabel from "@/components/meetings/room/RoomLabel";
import Chat from "@/components/meetings/room/chat/Chat";
import Overlay from "@/components/meetings/room/Overlay";

const EmpRoom = () => {
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
      {showOverlay && <Overlay />}
    </div>
  );
};

export default EmpRoom;
