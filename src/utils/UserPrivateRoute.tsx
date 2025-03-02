import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = () => {
  const firmToken = localStorage.getItem("userToken");

  if (!firmToken) {
    return <Navigate to="/api/user/login" replace />;
  }

  return <Outlet />;
};

export default UserPrivateRoute;
