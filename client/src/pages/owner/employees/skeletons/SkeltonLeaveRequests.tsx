import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonLeaveRequests = () => {
  return (
    <div className="space-y-6">
      <div className="w-full overflow-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="bg-muted/50">
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Applied On</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Start Date</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">End Date</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Leave Type</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Reason</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="bg-muted/40 border-b">
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
