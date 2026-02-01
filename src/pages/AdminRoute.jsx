import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function AdminRoute() {
  const { role } = useAuth();

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
