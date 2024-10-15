import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Comments } from "@/store/types/task";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import CommentReplay from "./CommentReplay";
import UserAvatar from "@/components/common/UserAvatar";
import { replyToComment, updateTask } from "@/store/taskThunk";

interface Props {
  comment: Comments;
  task: any;
}

const ReplayButton = ({ comment, task }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replayMessage, setReplayMessage] = useState("");
  const {user} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();

  
  const handleReplaySubmit = async () => {
    if (task && comment) {
      const replyData = { text: replayMessage, user: user!.id };
      const res = await dispatch(replyToComment(task.id, comment.id, replyData));
      
      if (res?.success) {
        setIsModalOpen(false);
        setReplayMessage("");
      }
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-xs mt-1"
        onClick={() => setIsModalOpen(true)}
      >
        Replays {comment.replays && `(${comment.replays.length})`}
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
                       <UserAvatar
                        profileURL={comment.user.profileURL as string}
                        size="w-7 h-7"
                      />
                <div className="w-full">
                  <div className="bg-muted/40 rounded-md w-full p-2">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">
                        {comment.user.fName} {comment.user.lName}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <p className="pt-2">{comment.text}</p>
                  </div>
                  <ScrollArea className="w-full h-60 mt-2">
                    {comment.replays &&
                      comment.replays.length > 0 &&
                      comment.replays.map((replay, index) => {
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
