import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonLeaveTable } from "./SkeletonLeaveTable";

export function SkeletonLeaves() {
  return (
    <div className="flex flex-col space-y-8">
      {/* Skeleton for DatePickerWithRange */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48 mr-auto" /> {/* Date picker skeleton */}
        <Skeleton className="h-10 w-32" /> {/* LeaveDialog button skeleton */}
      </div>

      {/* Skeleton for Leave Table */}
      <div className="flex flex-col gap-6">
        <SkeletonLeaveTable /> {/* Reuse existing table skeleton */}
      </div>

      {/* Optionally, Skeleton for pagination or additional buttons */}
    </div>
  );
}
