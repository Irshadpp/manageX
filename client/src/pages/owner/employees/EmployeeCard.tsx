import { BiPhone } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import UserAvatar from '/useravatar.png'
import { useNavigate } from "react-router-dom";
import { Employee } from "@/store/types/employee";
import React from "react";

interface EmployeeCardProps{
    employee: Employee
}


const EmployeeCard: React.FC<EmployeeCardProps> = React.memo(({ employee }) => {
  const navigate = useNavigate();
  return (
    <div
      className="shadow-md bg-muted/40 p-5 rounded-lg cursor-pointer hover:opacity-80"
      onClick={() => navigate(`/owner/employees/${employee.id}`)}
    >
      <div className="text-center py-5">
        <div className="w-32 h-32 mx-auto rounded-full overflow-clip">
          <img
            src={(employee && employee.profileURL) || UserAvatar}
            alt="profile image"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold">
          {employee && `${employee.fName} ${employee.lName}`}
        </h3>
        <div className="text-sm text-accent-foreground">
          {employee && `${employee.role}`}
        </div>
      </div>
      <div>
        <div className="flex gap-3 items-center mb-2 line-clamp-1">
          <div className="p-2 bg-background rounded-md">
            <BiPhone />
          </div>
          {employee && `${employee.phone}`}
        </div>
        <div className="flex gap-3 items-center line-clamp-1">
          <div className="p-2 bg-background rounded-md">
            <HiOutlineMail />
          </div>
          {employee && `${employee.email}`}
        </div>
      </div>
    </div>
  );
});

export default EmployeeCard;
