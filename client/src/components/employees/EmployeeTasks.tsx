import AttendanceTable from '@/components/custome/AttendanceTable'
import { DatePickerWithRange } from '@/components/custome/DatePickerWithRange'
import { AttendanceLog } from '@/store/types/employee'
import { useState } from 'react';

const EmployeeTasks = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = attendanceLogs && Math.ceil((attendanceLogs?.length || 0) / pageSize);
//   const paginatedAttendanceLogs = attendanceLogs && attendanceLogs?.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col gap-6">
        {/* <AttendanceTable
          attendanceData={paginatedAttendanceLogs}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </div>
  )
}

export default EmployeeTasks
