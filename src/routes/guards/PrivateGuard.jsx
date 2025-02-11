import { Navigate, Outlet } from "react-router-dom";

export const PrivateGuard = () => {
    const isAuthenticate = true;
    return (
        isAuthenticate ? <Outlet/> : <Navigate to={'/login'} replace />
    );
}