import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { apiRequest } from '@/services/api/commonRequest';
import { AttendancePolicyType } from './types/attendancePolicy';
import AttendancePolicyForm from '@/components/employees/AttendancePolicyForm';
import {SkeletonAttendancePolicy} from './skeletons/SkeletonAttendancePolicy';

const AttendancePolicy = () => {
    const {user} = useSelector((state:RootState) => state.auth)
    const [policy, setPolicy] = useState({});
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true);
    console.log(user?.organization)
    useEffect(()=>{
        const fetchPolicy = async () =>{
            const res = await apiRequest({
                method: "GET",
                url: import.meta.env.VITE_BACKEND_URL,
                route: `/api/v1/attendance-policy/${user?.organization}`,
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if(!res.success){
                console.log(error);
                setError(res?.errors[0]?.message);
                setLoading(false)
            }
            setPolicy(res.data);
            setLoading(false)
        }
        fetchPolicy();
    }, []);

    if(loading){
        return <SkeletonAttendancePolicy/>
    }
  return (
    <div>
        <h1 className="text-2xl font-bold -mt-3 mb-4">Attendance Policy</h1>
      <AttendancePolicyForm policy={policy as AttendancePolicyType}/>
    </div>
  )
}

export default AttendancePolicy
