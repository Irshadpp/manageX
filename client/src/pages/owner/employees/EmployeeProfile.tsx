import { FaUser, FaTasks, FaClock, FaCog, FaList } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserAvatarImage from '/useravatar.png'
import EditForm from "../../../components/employees/EditForm";
import EmployeeSettings from "@/components/employees/EmployeeSettings";
import EmployeeAttendance from "../../../components/employees/EmployeeAttendance";
import EmptyAttendanceLogs from "./empties/EmptyAttendanceLogs";
import EmployeeTasks from "@/components/employees/EmployeeTasks";

export const EmployeeProfile = () => {
  const { id } = useParams();
  const { employees } = useSelector((state: RootState) => state.employee);
  const employee = employees.find(emp => emp.id === id);

  if (!employee) return <div>Employee not found</div>;

  return (

    <Tabs defaultValue="profile" className="relative">
      <div className="py-6 bg-background shadow-md rounded-lg">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={employee.profileURL || UserAvatarImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {employee.fName} {employee.lName}
              </h1>
              <p className="text-muted">{employee.role}</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <FaList className="text-red-500" />
              <span className="text-foreground">Assigned: {"0"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTasks className="text-green-500" />
              <span className="text-foreground">Completed: {"0"}</span>
            </div>
          </div>
        </div>

        <TabsList className="flex justify-start space-x-6 border-b border-border mt-6">
          {/* <TabsTrigger value="tasks" className="pb-2">
            <FaTasks className="inline mr-2" /> Tasks
          </TabsTrigger> */}
          <TabsTrigger value="profile" className="pb-2">
            <FaUser className="inline mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="attendance" className="pb-2">
            <FaClock className="inline mr-2" /> Attendance
          </TabsTrigger>
          <TabsTrigger value="settings" className="pb-2">
            <FaCog className="inline mr-2" /> Settings
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="absolute left-0 right-0 mt-4">
          {/* TODO  */}
        {/* <TabsContent value="tasks">
          <EmployeeTasks />
        </TabsContent> */}
        <TabsContent value="profile">
          <EditForm employee={employee} />
        </TabsContent>
        <TabsContent className="h-[380px]" value="attendance">
          {employee.attendanceLogs.length === 0 ? <EmptyAttendanceLogs/> : 
          <EmployeeAttendance attendanceLogs={employee.attendanceLogs}/>
          } 
        </TabsContent>
        <TabsContent value="settings">
          <EmployeeSettings id={employee.id} email={employee.email}/>
        </TabsContent>
      </div>
    </Tabs>
  );
};
