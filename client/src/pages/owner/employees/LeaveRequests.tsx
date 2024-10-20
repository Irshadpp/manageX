import React, { useCallback, useEffect, useState } from 'react';
import ApplicationsTable from "@/components/employees/ApplicationsTable";
import { apiRequest } from '@/services/api/commonRequest';
import EmptyLeaveRequests from './empties/EmptyLeaveRequests';
import { SkeletonLeaveRequests } from './skeletons/SkeltonLeaveRequests';

const LeaveRequests: React.FC = () => {
  const [leaveApplications, setLeaveApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;


  const fetchLeaveApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        method: 'GET',
        url: import.meta.env.VITE_BACKEND_URL,
        route: `/api/v1/leave/requests?page=${currentPage}&limit=${itemsPerPage}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.errors && response.errors.length > 0) {
        setError(response.errors[0].message);
      } else {
        setLeaveApplications(response.data.leaveApplications);
        setTotalPages(response.data.totalPages);
      }
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchLeaveApplications();
  }, [fetchLeaveApplications]);

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    try {
      const response = await apiRequest({
        method: 'PATCH',
        url: import.meta.env.VITE_BACKEND_URL,
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

  if(loading){
    return <SkeletonLeaveRequests/>
  }

  if(!loading && leaveApplications.length === 0){
    return <EmptyLeaveRequests/>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold -mt-3 mb-4">Leave Requests</h2>
      <ApplicationsTable
        leaveApplications={leaveApplications}
        error={error}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        totalPages={totalPages} 
        onAction={handleAction}
      />
    </div>
  );
};

export default LeaveRequests;
