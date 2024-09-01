import { rbacConfig, Role } from '@/utils/rbac-config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import useSessionCheck from '@/hooks/useSessionCheck';

const PrivateRouteWithRole = ({ requiredRole, redirectPath = "/login" }: { requiredRole: Role, redirectPath?: string }) => {
  useSessionCheck();

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role as Role;
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [isAuthenticated, user, navigate, location, redirectPath]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || userRole !== requiredRole) {
    return <Navigate to={redirectPath} replace />;
  }

  const allowedRoutes = Array.from(rbacConfig[userRole]) as string[];
  const currPath = window.location.pathname.split(`/${userRole}`)[1];
  console.log("-----------------",window.location.pathname)
  if (allowedRoutes.includes(currPath) || allowedRoutes.includes(`/${userRole}`)) {
    return <Outlet />;
  }

  return <Navigate to="*" replace />;
};

export default PrivateRouteWithRole;
