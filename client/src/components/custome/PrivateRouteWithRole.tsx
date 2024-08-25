import { RootState } from '@/store'
import { rbacConfig, Role } from '@/utils/rbac-config'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteWithRole = ({ requiredRole, redirectPath = "/login" }: { requiredRole: Role, redirectPath?: string }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role as Role;

  if (!isAuthenticated || userRole !== requiredRole) {
    return <Navigate to={redirectPath} />;
  }

  const allowedRoutes = Array.from(rbacConfig[userRole]) as string[];
  if (allowedRoutes.includes(window.location.pathname)) {
    return <Outlet />;
  }

  return <Navigate to="*"/>
};


export default PrivateRouteWithRole
