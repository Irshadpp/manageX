import OwnerSideBar from '@/components/ui/sidebars/OwenerSideBar'
import { apiRequest } from '@/services/api/commonRequest';
import React, { useEffect } from 'react'

const OwnerDashboard = () => {
  useEffect(() => {
      const fetchUsers = async () =>{
        const res = await apiRequest({
          method: "GET",
          url: import.meta.env.VITE_USERS_URL,
          route: "/api/v1/users",
          headers:{
            "Content-Type": "application/json"
          }
        });
        console.log(res)
      }
      fetchUsers()
  }, []);
  return (
    <div>
      fdsfdsfasdf
    </div>
  )
}

export default OwnerDashboard
