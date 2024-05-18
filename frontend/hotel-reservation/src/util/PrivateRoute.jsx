import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext.jsx";

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("token")).jwt || null;
  if (token === null) {
    alert("No such user registered! Please try again!");
  }
  return user && token !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
