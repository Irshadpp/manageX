import { Skeleton } from "@/components/ui/skeleton"; // Importing the Skeleton component from shadcn

export const EmailVerificationSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 w-24 mb-4" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-10 w-40 mb-4" />
      <Skeleton className="h-16 w-full mb-4" />
      <Skeleton className="h-12 w-48" />
    </>
  );
};
