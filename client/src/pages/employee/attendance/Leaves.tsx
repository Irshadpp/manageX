import React, { useEffect, useState } from 'react';
import { DatePickerWithRange } from '@/components/custome/DatePickerWithRange';
import LeaveDialog from './LeaveDialog';
import LeaveTable from '@/components/custome/LeaveTable';
import { apiRequest } from '@/services/api/commonRequest';

const Leaves: React.FC = () => {
  const [dateRange, setDateRange] = useState<{from: Date, to: Date} | undefined>(undefined);
  const [leaveData, setLeaveData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const response = await apiRequest({
          method: 'GET',
          url: import.meta.env.VITE_EMPLOYEE_URL, 
          route: "/api/v1/leave",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.errors && response.errors.length > 0) {
          setError(response.errors[0].message);
        } else {
          setLeaveData(response.data);
        }
      } catch (error: any) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <DatePickerWithRange className="mr-auto"
        //  onDateRangeChange={setDateRange}
          />
        <LeaveDialog />
      </div>

      <div className="flex flex-col gap-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <LeaveTable
          data={leaveData}
        />
      </div>
    </div>
  );
};

export default Leaves;
