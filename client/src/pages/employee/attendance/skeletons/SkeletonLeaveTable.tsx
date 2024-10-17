import { Pagination, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableRow, TableCell, } from "@/components/ui/table";


export function SkeletonLeaveTable() {
  const skeletonRows = Array.from({ length: 8 }); // Assuming 8 rows for loading skeletons

  return (
    <div className="w-full">
      <Table>
        <thead>
          <TableRow className="bg-muted/50">
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
          </TableRow>
        </thead>
        <tbody>
          {skeletonRows.map((_, idx) => (
            <TableRow key={idx} className="bg-muted/30">
              <TableCell>
                <Skeleton className="h-6 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Pagination Skeleton */}
      <div className="flex justify-end mt-4">
        <Pagination className="flex items-center">
          <PaginationPrevious className="mr-2 text-gray-400">
            <Skeleton className="h-6 w-16" />
          </PaginationPrevious>
          <PaginationItem>
            <PaginationLink className="mx-1">
              <Skeleton className="h-6 w-8" />
            </PaginationLink>
          </PaginationItem>
          <PaginationNext className="ml-2 text-gray-400">
            <Skeleton className="h-6 w-16" />
          </PaginationNext>
        </Pagination>
      </div>
    </div>
  );
}
