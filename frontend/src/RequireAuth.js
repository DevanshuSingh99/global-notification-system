import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireAuth = ({ allowedRoles }) => {
    const cookie = new Cookies();
    const userRole = cookie.get("role");
    const location = useLocation();

    return allowedRoles?.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default RequireAuth;
