import { Replay } from "@/store/types/task";
import { formatDistanceToNow } from "date-fns";
import UserAvatar from "../common/UserAvatar";

interface Props {
  replay: Replay;
}

const CommentReplay = ({ replay }: Props) => {
  if (typeof replay.user !== "string") {
    return (
      <div className="flex gap-2 mb-2">
        <UserAvatar
          profileURL={replay.user.profileURL as string}
          size="w-7 h-7"
        />
        <div className="w-full">
          <div className="bg-muted/40 rounded-md w-full p-2">
            <div className="flex gap-2 justify-between items-center">
              <p className="font-bold line-clamp-1">
                {replay.user.fName} {replay.user.lName}
              </p>
              <p className="text-xs text-foreground/60 shrink-0">
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
