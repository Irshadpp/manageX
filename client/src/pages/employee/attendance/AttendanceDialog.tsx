import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AttendanceForm from './AttendanceForm';

const AttendanceDialog: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
    <Button onClick={() => setModalOpen(true)}>Mark Attendance</Button>
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            Please select your attendance type and update your attendance
          </DialogDescription>
        </DialogHeader>
        <AttendanceForm setModalOpen={setModalOpen} />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default AttendanceDialog;
