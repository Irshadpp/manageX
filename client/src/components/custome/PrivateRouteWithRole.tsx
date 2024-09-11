import { rbacConfig, Role } from '@/utils/rbac-config';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
// import { checkAuthStatus } from '@/store/authSlice';
import useSessionCheck from '@/hooks/useSessionCheck';
import VerifiedEmail from '@/pages/landing/Registration/VerifiedEmail';

const PrivateRouteWithRole = ({ requiredRole, redirectPath = "/login" }: { requiredRole: Role, redirectPath?: string }) => {
  console.log("----------============-----------")
  useSessionCheck();
  const { isAuthenticated, user, isInitialSetup } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role as Role;
  const naviate = useNavigate();
  // const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch<any>();
  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     if (!isAuthenticated) {
  //       await dispatch(checkAuthStatus());
  //     }
  //   };
  

  //   // checkAuthentication();
  // }, [dispatch, isAuthenticated]);
  // setLoading(false);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if(isAuthenticated && isInitialSetup){
    console.log("==============", isInitialSetup, userRole)
    return <Outlet/>
  }

  if (!isAuthenticated || userRole !== requiredRole) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to={redirectPath} replace/>;
  }
  
  const allowedRoutes = Array.from(rbacConfig[userRole]) as string[];
  const currPath = window.location.pathname.split(`/${userRole}`)[1];
  console.log(allowedRoutes, userRole,"----------",currPath)
  console.log(currPath)
  if (allowedRoutes.includes(currPath) || allowedRoutes.includes(`/${userRole}`)) {
    return <Outlet />;
  }

  console.log("=-================")
  return <Navigate to="*" replace/>;
};

export default PrivateRouteWithRole;

