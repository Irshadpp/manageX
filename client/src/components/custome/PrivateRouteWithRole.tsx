// import useSessionCheck from '@/hooks/useSessionCheck';
// import { fetchUserStatus } from '@/services/api/fetchUserStatus';
// import { logout } from '@/services/auth/logout';
// import { RootState } from '@/store';
// import { updateUserStatus } from '@/store/authSlice';
import { rbacConfig, Role } from '@/utils/rbac-config';
import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const PrivateRouteWithRole = ({ requiredRole, redirectPath = "/login" }: { requiredRole: Role, redirectPath?: string }) => {

//   useSessionCheck();
//   const { isAuthenticated, user, isBlocked } = useSelector((state: RootState) => state.auth);
//   const userRole = user?.role as Role;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//       if (!isAuthenticated || !user) {
//         setLoading(false);
//         return;
//     };
//     if (isBlocked) {
//       toast.error("Your account has been blocked. Please contact support.");
//       navigate(redirectPath, { state: { from: location } });
//       setLoading(false);
//       return;
//     }
//     setLoading(false)
//   }, [user, dispatch, navigate, location, redirectPath]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated || userRole !== requiredRole || isBlocked) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   const allowedRoutes = Array.from(rbacConfig[userRole]) as string[];
//   const currPath = window.location.pathname.split(`/${userRole}`)[1];
//   if (allowedRoutes.includes(currPath) || allowedRoutes.includes(`/${userRole}`)) {
//     return <Outlet />;
//   }

//   return <Navigate to="*" replace />;
// };

// export default PrivateRouteWithRole;

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { toast } from 'react-toastify';
import useSessionCheck from '@/hooks/useSessionCheck';
import logout from '@/services/auth/logout';

const PrivateRouteWithRole = ({ requiredRole, redirectPath = "/login" }: { requiredRole: Role, redirectPath?: string }) => {
  useSessionCheck();

  const { isAuthenticated, user, isBlocked } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role as Role;
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // const handleLogout = async () =>{
  //   await logout()
  // }

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      <Navigate to={redirectPath} replace />
      return;
    }

    if (isBlocked) {
      toast.error("Your account has been blocked. Please contact support.");
      navigate(redirectPath, { state: { from: location } });
      setLoading(false);
      <Navigate to={redirectPath} replace />
      return;
    }

    setLoading(false);
  }, [isAuthenticated, user, isBlocked, navigate, location, redirectPath]);

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
