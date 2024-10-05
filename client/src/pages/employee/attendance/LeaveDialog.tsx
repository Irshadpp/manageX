import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LeaveForm from './LeaveForm';

interface LeaveDialogProps {
  setLeaveData: React.Dispatch<React.SetStateAction<any[]>>;
}

const LeaveDialog: React.FC<LeaveDialogProps> = ({ setLeaveData }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Apply for Leave</Button>
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
            <DialogDescription>
              Please provide your leave details below.
            </DialogDescription>
          </DialogHeader>
          <LeaveForm setModalOpen={setModalOpen} setLeaveData={setLeaveData} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeaveDialog;
