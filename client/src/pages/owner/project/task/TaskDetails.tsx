import { useEffect, useState } from "react";
import TaskDetailSheet from "../../../../components/task/TaskDetailSheet";
import CreateTaskButton from "@/components/task/createTaskButton";
import { TanStackDataTable } from "@/components/custome/TanstackTable";
import { columns } from "../../../../components/task/TaskColumns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/taskThunk";

const TaskDetails = ({ projectId }: { projectId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taskData } = useSelector((state: RootState) => state.task);
  const [taskId, setTaskId] = useState("")
  
  
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
      {taskData && taskData.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={taskData}
          pageTitle="Tasks"
          newButton={<CreateTaskButton projectId={projectId} />}
          searchField="title"
          rowOnClick={rowOnClick}
        />
      ) : (
        <div className="flex-1 flex justify-center flex-col items-center ">
          <p className="my-3">No tasks were created yet!</p>
          <CreateTaskButton projectId={projectId} />
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
