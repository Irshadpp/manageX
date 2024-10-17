import React, { useEffect, useState } from 'react';
import { DatePickerWithRange } from '@/components/custome/DatePickerWithRange';
import AttendanceDialog from './AttendanceDialog';
import AttendanceTable from '@/components/custome/AttendanceTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchAttendance } from '@/store/attendanceThunk';
import { SkeletonLeaves } from './skeletons/SkeletonLeaves';
import EmptyAttendance from './Empties/EmptyAttendance';

const Attendance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { attendanceData, totalPages, loading } = useSelector((state: RootState) => state.attendance);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchAttendance(currentPage, itemsPerPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if(loading){
    return <SkeletonLeaves />
  }

  if (!loading && attendanceData.length === 0) {
    return (
      <EmptyAttendance />
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      {loading && "looadiiinnngggggg"}
      <div className="flex justify-between items-center">
        <DatePickerWithRange className="mr-auto" />
        <AttendanceDialog />
      </div>

      <div className="flex flex-col gap-6">
        <AttendanceTable
          attendanceData={attendanceData}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Attendance;
