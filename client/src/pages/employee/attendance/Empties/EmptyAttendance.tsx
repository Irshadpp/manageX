import AttendanceDialog from "../AttendanceDialog";
import { Clock } from "lucide-react";

export function EmptyAttendance() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center border border-dashed border-muted/50 rounded-lg bg-muted/20">
      <Clock className="w-24 h-24 text-muted-foreground" />
      <h2 className="text-2xl font-semibold text-muted-foreground mt-6">
        No Attendance Logs Found
      </h2>
      <p className="text-lg text-muted-foreground my-3">
        There are currently no attendance logs to display.
      </p>
      <AttendanceDialog/>
    </div>
  );
}

export default EmptyAttendance;
