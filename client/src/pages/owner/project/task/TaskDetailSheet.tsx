import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import TaskEditForm from "./TaskEditForm";
import { removeTaskOnClose } from "@/app/lib/features/task/taskSlice";
import { columns } from "../subTask/subTaskColumns";
import { TanStackDataTableSmall } from "@/components/custom/TanStackDataTableSmall";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewSubTaskButton from "../subTask/NewSubTaskButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SubTaskEditForm from "../subTask/SubTaskEditForm";

import NotesListInSheet from "../notes/NotesListInSheet";
import EstimatedDuration from "./EstimatedDuration";
import TaskAttachments from "./TaskAttachments";

interface PropsTypes {
  onOpenChange: any;
  setOnOpenChange: any;
}

const TaskDetailSheet = ({ onOpenChange, setOnOpenChange }: PropsTypes) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subTaskId, setSubTaskId] = useState("");
  const { task } = useAppSelector((state) => state.task);

  const rowOnClick = (value: string) => {
    setIsModalOpen(true);
    setSubTaskId(value);
  };

  return (
    <Sheet
      open={onOpenChange}
      onOpenChange={(data) => {
        dispatch(removeTaskOnClose());
        setOnOpenChange(data);
      }}
    >
      <SheetContent className="pt-5 px-0">
        <ScrollArea className="h-screen  p-5">
          {task && <TaskEditForm setIsModalOpen={setOnOpenChange} />}
          <div className="pt-3">
            <TaskAttachments />
            <div>Estimated Time</div>
            <EstimatedDuration />
            {task && (
              <TanStackDataTableSmall
                columns={columns}
                data={task.subTasks}
                pageTitle="Sub Tasks"
                newButton={<NewSubTaskButton />}
                rowOnCLick={rowOnClick}
              />
            )}
          </div>
          <NotesListInSheet />
        </ScrollArea>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Sub Task</DialogTitle>
              <DialogDescription>
                Update in the below form. After your done click the add button
              </DialogDescription>
            </DialogHeader>
            <SubTaskEditForm
              setIsModalOpen={setIsModalOpen}
              subTaskId={subTaskId}
            />
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailSheet;
