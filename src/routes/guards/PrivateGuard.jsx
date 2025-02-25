import { Navigate, Outlet } from "react-router-dom";

export const PrivateGuard = () => {
    const isAuthenticated = true;
  return isAuthenticated ? <Outlet/> : <Navigate to={'/login'} replace/>
}