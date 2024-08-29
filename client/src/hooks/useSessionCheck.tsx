import { apiRequest } from "@/services/api/commonRequest";
import { clearCredentials, setCredentials, updateUserStatus } from "@/store/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

const useSessionCheck = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const checkSession = async () =>{
            try {
                const response = await apiRequest({
                    method: "GET",
                    url: import.meta.env.VITE_USERS_URL,
                    route:`/api/v1/auth/check-user`,
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                console.log(response);
                const {user, accessToken} = response
                dispatch(setCredentials({user, accessToken}));
                dispatch(updateUserStatus({isBlocked: !user.isActive}));

            } catch (error) {
                console.log(error)
                dispatch(clearCredentials())
            }
        }
        checkSession();
    }, [dispatch])
}

export default useSessionCheck;