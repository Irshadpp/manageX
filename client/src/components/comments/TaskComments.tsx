import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import NewCommentButton from "./NewCommentButton";
import ReplayButton from "./ReplayButton";
import UserAvatar from "@/components/common/UserAvatar";
import { useEffect, useState } from "react";
import { apiRequest } from "@/services/api/commonRequest";

const TaskComments = ({ task }: { task: any }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_PROJECT_URL,
        route: `/api/v1/task/${task.id}/comments`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComments(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pollComments = () =>{
      fetchComments();
    }
    const intervalId = setInterval(pollComments, 10000)

    fetchComments() //initia fetch
  
    return () => clearInterval(intervalId)
  }, [task]);


  return (
    <div className="py-3">
      {comments && (
        <div>
          <div className="flex items-center justify-between gap-2 pb-3">
            <h1 className="font-bold text-xl">Comments</h1>
            <NewCommentButton task={task} />
          </div>
          <ScrollArea className="h-52">
            {comments && comments.length > 0 ? (
              comments.map((comment: any, index: number) => (
                <div className="text-sm mb-1" key={index}>
                  {typeof comment.user !== "string" && (
                    <div className="flex gap-2">
                      <UserAvatar
                        profileURL={comment.user.profileURL as string}
                        size="w-7 h-7"
                      />
                      <div className="w-full">
                        <div className="bg-muted/40 rounded-md w-full p-2">
                          <div className="flex justify-between items-center">
                            <p className="font-bold line-clamp-1">
                              {comment.user.fName} {comment.user.lName}
                            </p>
                            <p className="text-xs text-foreground/60 shrink-0">
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </p>
                          </div>
                          <p className="pt-2">{comment.text}</p>
                        </div>
                        <ReplayButton comment={comment} task={task} />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-52">
                <p className="pt-3">No comments were added yet!</p>
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default TaskComments;
