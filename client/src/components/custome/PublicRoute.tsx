import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () =>{
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    
    return isAuthenticated ? <Navigate to="/owner-dashboard"/> :  <Outlet/>
}

export default PublicRoute;