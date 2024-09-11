import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AttendanceForm from './AttendanceForm';

const AttendanceDialog: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [attendanceType, setAttendanceType] = useState<'checkin' | 'checkout'>('checkin');
  const [remarks, setRemarks] = useState('');

  const handleSave = () => {
    // Handle save logic
    setModalOpen(false);
  };

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
