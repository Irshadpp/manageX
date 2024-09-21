import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SubTaskForm from "./SubTaskForm";
import { useLocation } from "react-router-dom";

const NewSubTaskButton = ({id}: {id: string}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const curr = location.pathname.split("/")[1];

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setIsModalOpen(true)}
        disabled={curr === "employee"}
      >
        New
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Sub Task</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the add button
            </DialogDescription>
          </DialogHeader>
          <SubTaskForm setIsModalOpen={setIsModalOpen} id={id}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewSubTaskButton;
