import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { isAuthenticated, isInitialSetup, user } = useSelector((state: RootState) => state.auth);

    return isAuthenticated && !isInitialSetup ? <Navigate to={`/${user?.role}`} replace /> : <Outlet />;
  };

  export default PublicRoute
  