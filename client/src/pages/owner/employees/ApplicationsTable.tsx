import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { apiRequest } from '@/services/api/commonRequest';

const ApplicationsTable: React.FC = () => {
  const [leaveApplications, setLeaveApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaveApplications = async () => {
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
        console.log(response)
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
    };

    fetchLeaveApplications();
}, []);

const handleAction = (id: string, action: 'approved' | 'rejected') => {
    // const updateStatus = async () => {
    //     try {
    //       const response = await apiRequest({
    //         method: 'PATCH',
    //         url: import.meta.env.VITE_EMPLOYEE_URL,
    //         route: `/api/v1/leave/status/${id}`,
    //         data:{status: action},
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
    //       console.log(response)
    //       if (response.errors && response.errors.length > 0) {
    //         setError(response.errors[0].message);
    //       } else {
    //         setLeaveApplications(response.data);
    //       }
    //     } catch (error: any) {
    //       setError(error.message || 'Something went wrong');
    //     } finally {
    //     }
    //   };
    //   updateStatus();
};

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col gap-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Table>
          <TableHeader>
            <TableRow>
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
              <TableRow key={application.id}>
                <TableCell>{new Date(application.appliedOn).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(application.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(application.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{application.leaveType}</TableCell>
                <TableCell>{application.reason}</TableCell>
                <TableCell>{application.status}</TableCell>
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
      </div>
    </div>
  );
};

export default ApplicationsTable;
