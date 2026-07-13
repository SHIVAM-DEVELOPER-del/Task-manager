import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => { const user = JSON.parse(localStorage.getItem("user") || "null"); const token = localStorage.getItem("token"); if (!token || !user) return <Navigate to="/login" replace />; if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} replace />; return <Outlet />; };
export default PrivateRoutes;
