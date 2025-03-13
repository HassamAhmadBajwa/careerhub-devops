import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  // trying getting data from local storage

  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  const finalRole = role || storedRole;
  const isAuth = isAuthenticated || !!storedToken;
  if (!isAuth || !allowedRoles.includes(finalRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
