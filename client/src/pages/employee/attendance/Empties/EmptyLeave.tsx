import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeaveDialog from "../LeaveDialog";

interface EmptyLeaveProps {
  setLeaveData: React.Dispatch<React.SetStateAction<any[]>>; 
}

export function EmptyLeave({ setLeaveData }: EmptyLeaveProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center border border-dashed border-muted/50 rounded-lg bg-muted/20">
      <FileText className="w-24 h-24 text-muted-foreground" />
      <h2 className="text-2xl font-semibold text-muted-foreground mt-6">
        No Leave Applications Found
      </h2>
      <p className="text-lg text-muted-foreground my-3">
        There are currently no leave applications to display.
      </p>
      <LeaveDialog setLeaveData={setLeaveData}/>
    </div>
  );
}

export default EmptyLeave;
