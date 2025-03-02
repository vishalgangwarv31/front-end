import { Navigate, Outlet } from "react-router-dom";

const FirmPrivateRoute = () => {
  const firmToken = localStorage.getItem("firmToken");

  if (!firmToken) {
    return <Navigate to="/api/firm/login" replace />;
  }

  return <Outlet />;
};

export default FirmPrivateRoute;
