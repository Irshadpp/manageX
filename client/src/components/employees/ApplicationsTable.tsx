import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { apiRequest } from '@/services/api/commonRequest';
import { Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

const ApplicationsTable: React.FC = () => {
  const [leaveApplications, setLeaveApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const fetchLeaveApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        method: 'GET',
        url: import.meta.env.VITE_EMPLOYEE_URL,
        route: "/api/v1/leave/requests",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.errors && response.errors.length > 0) {
        setError(response.errors[0].message);
      } else {
        setLeaveApplications(response.data);
      }
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaveApplications();
  }, [fetchLeaveApplications]);

  const totalPages = Math.ceil(leaveApplications.length / pageSize);
  const paginatedData = leaveApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    try {
      const response = await apiRequest({
        method: 'PATCH',
        url: import.meta.env.VITE_EMPLOYEE_URL,
        route: `/api/v1/leave/status/${id}`,
        data: { status: action },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.errors && response.errors.length > 0) {
        setError(response.errors[0].message);
      } else {
        setLeaveApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: action } : app))
        );
      }
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col gap-6">
        {loading && <p>Loading...</p>}
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
            {paginatedData.map((application) => (
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
                      <Button aria-haspopup="true" size="icon" variant="outline" className="text-primary border-primary">
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleAction(application.id, 'approved')}>Approve</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(application.id, 'rejected')}>Reject</DropdownMenuItem>
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
