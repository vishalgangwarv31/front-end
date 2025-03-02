import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/api/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
