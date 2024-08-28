import { apiRequest } from '@/services/api/commonRequest';
import { useEffect } from 'react'

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
