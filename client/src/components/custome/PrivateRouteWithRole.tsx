import { rbacConfig, Role } from "@/utils/rbac-config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "@/store";
// import { checkAuthStatus } from '@/store/authSlice';
import useSessionCheck from "@/hooks/useSessionCheck";

const PrivateRouteWithRole = ({
  requiredRole,
  redirectPath = "/login",
}: {
  requiredRole: Role;
  redirectPath?: string;
}) => {
  // useSessionCheck();
  const { isAuthenticated, user, isInitialSetup } = useSelector(
    (state: RootState) => state.auth
  );
  const userRole = user?.role as Role;
  const naviate = useNavigate();
  if (isAuthenticated && isInitialSetup) {
    return <Outlet />;
  }

  if (!isAuthenticated || userRole !== requiredRole) {
    return <Navigate to={redirectPath} replace />;
  }
  const allowedRoutes = Array.from(rbacConfig[userRole]) as string[];
  const currPath = window.location.pathname.split(`/${userRole}`)[1];
  console.log(currPath);
  if (
    allowedRoutes.includes(currPath) ||
    allowedRoutes.includes(`/${userRole}`)
  ) {
    return <Outlet />;
  }

  return <Navigate to="*" replace />;
};

export default PrivateRouteWithRole;
