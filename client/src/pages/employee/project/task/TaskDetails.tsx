import { useEffect, useState } from "react";
import CreateTaskButton from "@/components/task/createTaskButton";
import { TanStackDataTable } from "@/components/custome/TanstackTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/taskThunk";
import { columns } from "@/components/task/TaskColumns";
import TaskDetailSheet from "../../../../components/task/TaskDetailSheet";

const TaskDetails = ({ projectId }: { projectId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taskData } = useSelector((state: RootState) => state.task);
  const {user} = useSelector((state: RootState) => state.auth);
  const [taskId, setTaskId] = useState("")


  const filterdTaskData = taskData && taskData.filter((t: any )=> t.assignee.id === user?.id)
  const [onEditSheet, setOnEditSheet] = useState(false);
  
  useEffect(() => {
    dispatch(fetchTasks(projectId));
  }, [dispatch]);
  
  const rowOnClick = (taskId: string) => {
    setTaskId(taskId)
    setOnEditSheet(true);
  };

  return (
    <div className="col-span-3 h-screen pt-5">
      <TaskDetailSheet
        onOpenChange={onEditSheet}
        setOnOpenChange={setOnEditSheet}
        taskId={taskId}
        projectId={projectId}
      />
      {filterdTaskData && filterdTaskData.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={filterdTaskData}
          pageTitle="Tasks"
          searchField="title"
          rowOnClick={rowOnClick}
        />
      ) : (
        <div className="flex-1 flex justify-center flex-col items-center ">
          <p className="my-3">No tasks were created yet!</p>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
