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
import CreateGroupForm from "./CreateGroupForm";
  
  const CreateGroupButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
      <>
        <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
          <FiEdit size={20}/>
        </Button>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Update in the below form. After your done click the create button
              </DialogDescription>
            </DialogHeader>
            <CreateGroupForm setIsModalOpen={setIsModalOpen}/>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default CreateGroupButton;
  