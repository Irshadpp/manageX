import React from "react";

const JoinRoomTitle = ({ isRoomHost }: { isRoomHost: boolean }) => {
  const titleText = isRoomHost ? "Host meeting" : "Join meeting";

  return (
    <p className="text-2xl font-bold my-[40px]">
      {titleText}
    </p>
  );
};

export default JoinRoomTitle;
