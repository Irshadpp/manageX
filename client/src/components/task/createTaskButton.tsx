import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TaskForm from "./TaskForm";

const CreateTaskButton = ({
  projectId,
  customButton,
}: {
  projectId?: string;
  customButton?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!customButton ? (
        <Button onClick={() => setIsModalOpen(true)}>New Task</Button>
      ) : (
        <div
          className="flex items-center gap-3 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <AiOutlinePlus />
          New Task
        </div>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <TaskForm setIsModalOpen={setIsModalOpen} projectId={projectId} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTaskButton;
