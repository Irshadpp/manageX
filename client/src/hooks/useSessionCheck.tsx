import { apiRequest } from "@/services/api/commonRequest";
import { RootState } from "@/store";
import { clearCredentials, setCredentials } from "@/store/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

const useSessionCheck = () =>{
    const {isInitialSetup} = useSelector((state: RootState)=> state.auth)
    const dispatch = useDispatch<any>();
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
                const {user} = response.data;
                if(!user.isActive){
                    return dispatch(clearCredentials());
                }
                if(!isInitialSetup){
                    dispatch(setCredentials({user}));
                }
            } catch (error) {
                dispatch(clearCredentials())
            }
        }
        checkSession();
    }, [dispatch])
}

export default useSessionCheck;

