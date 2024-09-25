import AttendanceTable from '@/components/custome/AttendanceTable'
import { DatePickerWithRange } from '@/components/custome/DatePickerWithRange'
import { AttendanceLog } from '@/store/types/employee'

const EmployeeAttendance = ({attendanceLogs}: {attendanceLogs: AttendanceLog[]}) => {
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-end">
        <DatePickerWithRange className="left-0" />
      </div>

      <div className="flex flex-col gap-6">
        <AttendanceTable
          data={attendanceLogs}
        />
      </div>

    </div>
  )
}

export default EmployeeAttendance
