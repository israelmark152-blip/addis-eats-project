import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to /login and remember where they tried to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}