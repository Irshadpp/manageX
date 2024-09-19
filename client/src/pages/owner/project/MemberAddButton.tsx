import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import MembersList from "./MembersList";

const MemberAddButton = ({ setMembers }: { setMembers: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className="flex items-center gap-3 w-full"
        onClick={() => setIsModalOpen(true)}
      >
        <AiOutlinePlus />
        Add New Member
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose below members</DialogTitle>
          </DialogHeader>
          <MembersList
            setIsModalOpen={setIsModalOpen}
            setMembers={setMembers}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemberAddButton;
