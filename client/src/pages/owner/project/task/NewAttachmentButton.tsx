import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NewAttachmentForm from "./NewAttachmentForm";

const NewAttachmentButton = ({task}: {task: any}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
        New
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>New Attachment</DialogTitle>
            <DialogDescription>
              Click the below button to upload a file or drag and drop an item
              here
            </DialogDescription>
          </DialogHeader>
          <NewAttachmentForm setIsModalOpen={setIsModalOpen} task={task}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewAttachmentButton;
