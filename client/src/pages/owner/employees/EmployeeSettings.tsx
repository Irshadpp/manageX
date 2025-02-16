import Managex from '@/components/ui/Managex'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/services/api/commonRequest';
import TerminationForm from '@/components/employees/TerminationForm';

const EmployeeSettings = ({id, email}: {id: string, email: string}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSendInvitation = async (id:string) =>{
      setLoading(true);
      const response = await apiRequest({
        method: "POST",
        url: import.meta.env.VITE_EMPLOYEE_URL,
        route: `/api/v1/employee/send-invitation`,
        data: {id, email},
        headers:{
          "Content-Type": "application/json"
        }
      });
      if(!response.success){
        setError(response?.errors[0]?.message || "Employee updation failed");
        return setLoading(false);
      }
  
      setLoading(false);
    }
  return (
    <div className="my-5">
      <div className="border p-5 rounded-lg">
        <p>Employee Invitation</p>
        <p className="text-sm text-foreground md:w-1/2 py-2">
        Invite an employee to access the <Managex /> App
        </p>
        <Button disabled={loading}
        onClick={()=>handleSendInvitation(id)}
        >
          {loading ? "Loading" : "Send Invitation"}
        </Button>
      </div>

      <div className="border p-5 rounded-lg mt-5">
        <p>Employee Termination</p>
        <p className="text-sm text-foreground md:w-1/2 py-2">
        End the employee's access to ManageX by terminating them from the <Managex />
        </p>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Terminate Employee</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Termination</DialogTitle>
              <DialogDescription>
                This action can&apos;t be undone are you sure about the
                termination?
              </DialogDescription>
            </DialogHeader>
            <TerminationForm setIsModalOpen={setIsModalOpen} id={id} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default EmployeeSettings
