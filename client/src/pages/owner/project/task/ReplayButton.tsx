import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserAvatar from '/useravatar.png';
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Comments } from "@/store/types/task";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import CommentReplay from "./CommentReplay";

interface Props {
  comment: Comments;
  taskId: string;
}

const ReplayButton = ({ comment, taskId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replayMessage, setReplayMessage] = useState("");
  const {user} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();

  const handleReplaySubmit = () => {
    const data = {
      id: taskId,
      commentId: comment.id,
      replay: {
        text: replayMessage,
        user: user?.id,
      },
    };
    // dispatch(replayToTaskComment(data));
    setReplayMessage("");
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-xs mt-1"
        onClick={() => setIsModalOpen(true)}
      >
        Replays {comment.replay && `(${comment.replay.length})`}
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Comment</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the add button
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm mb-1">
            {typeof comment.user !== "string" && (
              <div className="flex gap-2">
                        <img
                    src={
                      (comment.user &&
                        typeof comment.user !== "string" &&
                        (comment.user.profileURL as string)) ||
                      UserAvatar
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                <div className="w-full">
                  <div className="bg-backgroundAccent rounded-md w-full p-2">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">
                        {comment.user.firstName} {comment.user.lastName}
                      </p>
                      <p className="text-xs text-foregroundAccent">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <p className="pt-2">{comment.text}</p>
                  </div>
                  <ScrollArea className="w-full h-60 mt-2">
                    {comment.replay &&
                      comment.replay.length > 0 &&
                      comment.replay.map((replay, index) => {
                        return <CommentReplay replay={replay} key={index} />;
                      })}
                  </ScrollArea>
                </div>
              </div>
            )}
            <div className="mt-2">
              <Input
                placeholder="Replay..."
                value={replayMessage}
                onChange={(e) => setReplayMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.code === "Enter" || e.code === "NumpadEnter") {
                    handleReplaySubmit();
                  }
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReplayButton;
