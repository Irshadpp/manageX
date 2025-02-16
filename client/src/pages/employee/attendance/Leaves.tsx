import React, { useEffect, useState } from 'react';
import { DatePickerWithRange } from '@/components/custome/DatePickerWithRange';
import LeaveDialog from './LeaveDialog';
import LeaveTable from '@/components/custome/LeaveTable';
import { apiRequest } from '@/services/api/commonRequest';
import { SkeletonLeaveTable } from './skeletons/SkeletonLeaveTable';
import { SkeletonLeaves } from './skeletons/SkeletonLeaves';
import EmptyLeave from './Empties/EmptyLeave';

const Leaves: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>(undefined);
  const [leaveData, setLeaveData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;

  const fetchLeaveData = async (page: number) => {
    setLoading(true);
    try {
      const response = await apiRequest({
        method: 'GET',
        url: import.meta.env.VITE_EMPLOYEE_URL,
        route: `/api/v1/leave?page=${page}&limit=${itemsPerPage}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.errors && response.errors.length > 0) {
        setError(response.errors[0].message);
      } else {
        setLeaveData(response.data.leaveApplications);
        setTotalPages(response.data.totalPages);
      }
    } catch (error: any) {
      setError('Something went wrong, Please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData(currentPage);
  }, [currentPage]);


  if(loading){
    return <SkeletonLeaves />
  }

  if (!loading && leaveData.length === 0) {
    return (
      <EmptyLeave setLeaveData={setLeaveData} />
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <DatePickerWithRange className="mr-auto" />
        <LeaveDialog setLeaveData={setLeaveData}/>
      </div>

      <div className="flex flex-col gap-6">
          <LeaveTable 
            data={leaveData} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            totalPages={totalPages} 
          />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Leaves;
