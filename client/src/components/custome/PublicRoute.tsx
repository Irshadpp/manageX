import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () =>{
    const {isAuthenticated, isInitialSetup, user} = useSelector((state: RootState) => state.auth);
    
    if(isInitialSetup){
        return <Outlet/>
    }

    return isAuthenticated ? <Navigate to={`/${user?.role}`}/> :  <Outlet/>
}

export default PublicRoute;