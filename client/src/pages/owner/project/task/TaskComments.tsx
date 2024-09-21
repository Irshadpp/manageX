import UserAvatar from '/useravatar.png';
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import NewCommentButton from "./NewCommentButton";
import ReplayButton from './ReplayButton';

const TaskComments = ({task}: {task: any}) => {

  console.log(task,"-------------")

  return (
    <div className="py-3">
      {task && (
        <div>
          <div className="flex items-center justify-between gap-2 pb-3">
            <h1 className="font-bold text-xl">Comments</h1>
            <NewCommentButton task={task}/>
          </div>
          <ScrollArea className="h-52">
            {task.notes && task.notes.length > 0 ? (
              task.notes.map((comment: any, index: number) => (
                <div className="text-sm mb-1" key={index}>
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
                            <p className="font-bold line-clamp-1">
                              {comment.user.firstName} {comment.user.lastName}
                            </p>
                            <p className="text-xs text-foregroundAccent shrink-0">
                              {formatDistanceToNow(new Date(comment.createdAt), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <p className="pt-2">{comment.text}</p>
                        </div>
                        <ReplayButton comment={comment} taskId={task.id}/>
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
