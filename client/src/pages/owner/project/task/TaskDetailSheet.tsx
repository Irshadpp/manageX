import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import TaskEditForm from "./TaskEditForm";
// import { removeTaskOnClose } from "@/app/lib/features/task/taskSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { columns } from "./SubTaskColumns";
import { TanStackSubTAskDataTable } from "@/components/custome/TenStackSubTaskDataTable";
import NewSubTaskButton from "./NewSubTaskButton";
import SubTaskEditForm from "./SubTaskEditForm";
import TaskComments from "./TaskComments";
import Attachments from "./Attachments";
import EstimatedDuration from "./EstimatedDuration";

interface PropsTypes {
  onOpenChange: any;
  setOnOpenChange: any;
  task: any;
  projectId: string;
}

const TaskDetailSheet = ({ onOpenChange, setOnOpenChange, task, projectId }: PropsTypes) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subTaskId, setSubTaskId] = useState("");

  const rowOnClick = (value: string) => {
    setIsModalOpen(true);
    setSubTaskId(value);
  };
  return (
    <Sheet
      open={onOpenChange}
      onOpenChange={(data) => {
        setOnOpenChange(data);
      }}
    >
      <SheetContent className="pt-5 px-0">
        <ScrollArea className="h-screen p-5">
          {task && <TaskEditForm setIsModalOpen={setOnOpenChange} task={task} projectId={projectId}/>}
          <div className="pt-3">
            <Attachments task={task} />
            <div>Estimated Time</div>
            <EstimatedDuration task={task} />
            {task && (
              <TanStackSubTAskDataTable
                columns={columns}
                data={task.subTasks}
                pageTitle="Sub Tasks"
                newButton={<NewSubTaskButton id={task.id}/>}
                rowOnCLick={rowOnClick}
              />
            )}
          </div>
          <TaskComments task={task}/>
        </ScrollArea>
       {task && <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Sub Task</DialogTitle>
              <DialogDescription>
                Update in the below form. After your done click the add button
              </DialogDescription>
            </DialogHeader>
            <SubTaskEditForm
              setIsModalOpen={setIsModalOpen}
              taskId={task.id}
              subTaskId={subTaskId}
            />
          </DialogContent>
        </Dialog>}
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailSheet;
