import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({redirectPath = "/login"}) =>{
    const {isAuthenticated} = useSelector((state: RootState)=> state.auth);
    console.log(isAuthenticated,"---------")

    return isAuthenticated ? <Outlet/> : <Navigate to={redirectPath} />
};

export default ProtectedRoute;