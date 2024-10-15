import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import EditForm from "./EditForm";

const EditButton = ({project}: {project: any}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
        <FiEdit />
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <EditForm setIsModalOpen={setIsModalOpen} project={project}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
