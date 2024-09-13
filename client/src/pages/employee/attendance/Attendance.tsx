import React, { useEffect, useState } from 'react';
import { DatePickerWithRange } from '@/components/custome/DatePickerWithRange';
import AttendanceDialog from './AttendanceDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchAttendance } from '@/store/attendanceThunk';
import AttendanceTable from '@/components/custome/AttendanceTable';


const Attendance: React.FC = () => {
  const [dateRange, setDateRange] = useState<{from: Date, to: Date} | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const {attendanceData} = useSelector((state: RootState) => state.attendance);

  useEffect(()=>{
    dispatch(fetchAttendance());
  }, [dispatch])

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <DatePickerWithRange className="mr-auto" />
        <AttendanceDialog/>
      </div>

      <div className="flex flex-col gap-6">
        <AttendanceTable
          data={attendanceData || []}
        />
      </div>

    </div>
  );
};

export default Attendance;
