import { useEffect, useState } from "react";
import TaskDetailSheet from "./TaskDetailSheet";
import CreateTaskButton from "@/components/task/createTaskButton";
import { TanStackDataTable } from "@/components/custome/TanstackTable";
import { columns } from "./TaskColumns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTask } from "@/store/taskThunk";

const TaskDetails = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taskData } = useSelector((state: RootState) => state.task);

  const [onEditSheet, setOnEditSheet] = useState(false);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const rowOnClick = () => {
    setOnEditSheet(true);
  };

  return (
    <div className="col-span-3 h-screen pt-5">
      <TaskDetailSheet
        onOpenChange={onEditSheet}
        setOnOpenChange={setOnEditSheet}
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
