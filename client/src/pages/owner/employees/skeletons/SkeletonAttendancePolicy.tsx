import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonAttendancePolicy = () => {
  return (
    <div className="space-y-4 pb-5">
      <Skeleton className="h-10 w-72" /> 
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/2" /> 
          <Skeleton className="h-10 w-full" /> 
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/2" /> 
          <Skeleton className="h-10 w-full" /> 
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/2" /> 
          <Skeleton className="h-10 w-full" /> 
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/2" /> 
          <Skeleton className="h-10 w-full" /> 
        </div>
      </div>

      <div className="mt-4">
        <Skeleton className="h-6 w-1/4" /> 
        <div className="grid grid-cols-3 gap-5 mt-2">
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/2" /> 
            <Skeleton className="h-10 w-full" /> 
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/2" /> 
            <Skeleton className="h-10 w-full" /> 
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/2" /> 
            <Skeleton className="h-10 w-full" /> 
          </div>
        </div>
      </div>

      <div className="flex space-x-5 mt-4">
        <Skeleton className="h-10 w-24" /> 
      </div>

    </div>
  );
};
