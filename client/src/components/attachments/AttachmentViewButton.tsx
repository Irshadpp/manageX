import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Attachments } from "@/store/types/task";
import FileRow from "./FileRow";

interface Props {
  attachment: Attachments;
}

const AttachmentViewButton = ({ attachment }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="link" onClick={() => setIsModalOpen(true)}>
        View
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{attachment.title}</DialogTitle>
            <DialogDescription>{attachment.description}</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 flex-wrap">
            {attachment.attachments &&
              attachment.attachments.length > 0 &&
              attachment.attachments.map((attach, index) => (
                <FileRow attach={attach} key={index} />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AttachmentViewButton;
