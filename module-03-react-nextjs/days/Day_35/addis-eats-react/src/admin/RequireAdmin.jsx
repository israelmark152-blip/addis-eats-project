
import { Navigate, useLocation } from "react-router-dom";

function RequireAdmin({ children }) {
  const location = useLocation();

  const isAdmin = sessionStorage.getItem(
    "addis-eats-admin"
  );

  if (isAdmin !== "true") {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default RequireAdmin;

