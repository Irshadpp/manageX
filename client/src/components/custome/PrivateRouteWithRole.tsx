import { fetchUserStatus } from '@/services/api/fetchUserStatus'
import { logout } from '@/services/auth/logout'
import { RootState } from '@/store'
import { updateUserStatus } from '@/store/authSlice'
import { rbacConfig, Role } from '@/utils/rbac-config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PrivateRouteWithRole = ({ requiredRole, redirectPath = "/login" }: { requiredRole: Role, redirectPath?: string }) => {
  const { isAuthenticated, user, isBlocked, accessToken } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role as Role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user && accessToken) {
        try {
          const res = await fetchUserStatus(user.userId);
          if (!res.isActive) {
            dispatch(updateUserStatus({ isBlocked: true }));
            toast.error("Your account has been blocked. Please contact support.");
            logout();
            navigate(redirectPath, { state: { from: location } });
            return;
          } else {
            dispatch(updateUserStatus({ isBlocked: false }));
          }
        } catch (error) {
          console.error("Failed to fetch user status:", error);
          navigate(redirectPath, { state: { from: location } });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [user, accessToken, dispatch, navigate, location, redirectPath]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || userRole !== requiredRole || isBlocked) {
    return <Navigate to={redirectPath} replace />;
  }

  const allowedRoutes = Array.from(rbacConfig[userRole]) as string[];
  const currPath = window.location.pathname.split(`/${userRole}`)[1];
  if (allowedRoutes.includes(currPath) || allowedRoutes.includes(`/${userRole}`)) {
    return <Outlet />;
  }

  return <Navigate to="*" replace />;
};

export default PrivateRouteWithRole;
