import { useEffect, useState } from "react";
import TaskDetailSheet from "./TaskDetailSheet";
import CreateTaskButton from "@/components/task/createTaskButton";
import { TanStackDataTable } from "@/components/custome/TanstackTable";
import { columns } from "./TaskColumns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/taskThunk";

const TaskDetails = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taskData } = useSelector((state: RootState) => state.task);
  const [task, setTask] = useState({})
  
  
  const [onEditSheet, setOnEditSheet] = useState(false);
  
  useEffect(() => {
    dispatch(fetchTasks(id));
  }, [dispatch]);
  
  console.log(task)
  const rowOnClick = (taskId: string) => {
    const task: any = taskData ? taskData.find(task => task.id === taskId) : {}
    setTask(task)
    setOnEditSheet(true);
  };

  return (
    <div className="col-span-3 h-screen pt-5">
      <TaskDetailSheet
        onOpenChange={onEditSheet}
        setOnOpenChange={setOnEditSheet}
        task={task}
        projectId={id}
      />
      {taskData && taskData.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={taskData}
          pageTitle="Tasks"
          newButton={<CreateTaskButton id={id} />}
          searchField="title"
          rowOnClick={rowOnClick}
        />
      ) : (
        <div className="flex-1 flex justify-center flex-col items-center ">
          <p className="my-3">No tasks were created yet!</p>
          <CreateTaskButton id={id} />
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
