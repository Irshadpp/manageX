import { Replay } from "@/store/types/task";
import UserAvatar from "/useravatar.png";
import { formatDistanceToNow } from "date-fns";

interface Props {
  replay: Replay;
}

const CommentReplay = ({ replay }: Props) => {
  if (typeof replay.user !== "string") {
    return (
      <div className="flex gap-2 mb-2">
        <img
          src={
            (replay.user &&
              typeof replay.user !== "string" &&
              (replay.user.profileURL as string)) ||
            UserAvatar
          }
          alt="Profile"
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
        <div className="w-full">
          <div className="bg-backgroundAccent rounded-md w-full p-2">
            <div className="flex gap-2 justify-between items-center">
              <p className="font-bold line-clamp-1">
                {replay.user.fName} {replay.user.lName}
              </p>
              <p className="text-xs text-foregroundAccent shrink-0">
                {formatDistanceToNow(new Date(replay.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <p className="pt-2">{replay.text}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default CommentReplay;
