import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { MoreHorizontal } from 'lucide-react';

interface ApplicationsTableProps {
  leaveApplications: any[];
  error: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  onAction: (id: string, action: 'approved' | 'rejected') => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  leaveApplications,
  error,
  currentPage, 
  setCurrentPage,
   totalPages,
  onAction,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col gap-6">
        {error && <p className="text-red-500">{error}</p>}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-muted/100">
              <TableHead>Applied On</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveApplications.map((application) => (
              <TableRow key={application.id} className="bg-muted/40 border-background">
                <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(application.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(application.endDate).toLocaleDateString()}</TableCell>
                <TableCell className='capitalize'>{application.leaveType}</TableCell>
                <TableCell>{application.reason}</TableCell>
                <TableCell className='capitalize'>{application.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" className="bg-accent text-foreground border-primary">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onAction(application.id, 'approved')}>Approve</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction(application.id, 'rejected')}>Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
};

export default ApplicationsTable;
