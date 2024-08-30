import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { isAuthenticated, isInitialSetup, user } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkAuthStatus = () => {
        if (!isInitialSetup) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      
      checkAuthStatus();
    }, [isAuthenticated, isInitialSetup]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <Outlet />;
  };

  export default PublicRoute
  