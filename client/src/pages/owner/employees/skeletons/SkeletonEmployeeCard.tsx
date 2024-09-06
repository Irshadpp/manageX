import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonEmployeeCard() {
  return (
    <div className="bg-accent p-5 rounded-lg">
      <div className="text-center py-5">
        <div className="w-32 h-32 mx-auto rounded-full overflow-clip">
          <Skeleton className="w-full h-full" />
        </div>
        <h3 className="text-lg font-semibold">
          <Skeleton className="h-6 w-32 mx-auto mt-3" />
        </h3>
        <div className="text-sm text-accent-foreground">
          <Skeleton className="h-4 w-24 mx-auto mt-1" />
        </div>
      </div>
      <div>
        <div className="flex gap-3 items-center mb-2 line-clamp-1">
          <div className="p-2 bg-background rounded-md">
            <Skeleton className="w-6 h-6" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-3 items-center line-clamp-1">
          <div className="p-2 bg-background rounded-md">
            <Skeleton className="w-6 h-6" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}
