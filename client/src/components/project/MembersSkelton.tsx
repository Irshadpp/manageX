import { Skeleton } from "@/components/ui/skeleton";

const MembersSkelton = () => {
  return (
    <div className="p-2">
      <div className="flex items-center gap-3 mt-5">
        <Skeleton className="w-10 h-10 rounded-full bg-background" />
        <div>
          <Skeleton className="w-36 h-4 rounded-md bg-background" />
          <Skeleton className="w-52 h-4 rounded-md mt-1 bg-background" />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <Skeleton className="w-10 h-10 rounded-full bg-background" />
        <div>
          <Skeleton className="w-36 h-4 rounded-md bg-background" />
          <Skeleton className="w-52 h-4 rounded-md mt-1 bg-background" />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <Skeleton className="w-10 h-10 rounded-full bg-background" />
        <div>
          <Skeleton className="w-36 h-4 rounded-md bg-background" />
          <Skeleton className="w-52 h-4 rounded-md mt-1 bg-background" />
        </div>
      </div>
    </div>
  );
};

export default MembersSkelton;
