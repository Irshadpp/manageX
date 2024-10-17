import { FileWarning } from "lucide-react";

export const EmptyLeaveRequests= () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center border border-dashed border-muted/50 rounded-lg bg-muted/20">
      <FileWarning className="w-24 h-24 text-muted-foreground" />
      <h2 className="text-2xl font-semibold text-muted-foreground mt-6">
        No Leave Requests Found
      </h2>
      <p className="text-lg text-muted-foreground my-3">
        There are currently no leave requests to display.
      </p>
    </div>
  );
};

export default EmptyLeaveRequests;
