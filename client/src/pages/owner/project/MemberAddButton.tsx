import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import MembersList from "./MembersList";
import { IoIosAdd } from "react-icons/io";

const MemberAddButton = ({ setMembers, isIcon }: { setMembers: any, isIcon?: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className="flex items-center gap-3 w-full"
        onClick={() => setIsModalOpen(true)}
      >
        {
          isIcon ? (
            <button
            type="button"
            className={`relative w-10 h-10 rounded-full overflow-hidden`}
          >
            <IoIosAdd className="bg-muted w-full h-full object-fill"/>
            </button>
          ) : (
            <>
            <AiOutlinePlus />
        Add New Member
        </>
          )
        }
        
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
