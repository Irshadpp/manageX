import React from "react";

const RoomLabel = ({ roomId }: { roomId: string }) => {
  return (
    <div className="absolute flex w-full justify-center z-40">
      <p className="text-[17px] text-white mt-0 py-[18px] px-[38px] bg-gradient-to-b from-primary to-primary/30 rounded-b-[15px]">ID: {roomId}</p>
    </div>
  );
};

export default RoomLabel;
