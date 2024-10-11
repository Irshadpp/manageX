import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as webRTChandler from '@/utils/webRTCHandler';
import { RootState } from "@/store";
import RoomLabel from "../../../../components/meetings/room/RoomLabel";
import ParticipantsSection from "../../../../components/meetings/room/participants/ParticipantsSection";
import Chat from "../../../../components/meetings/room/chat/Chat";
import Video from "../../../../components/meetings/room/video/Video";
import Overlay from "../../../../components/meetings/room/Overlay";

const ManRoom = () => {
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

export default ManRoom;
