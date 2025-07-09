// src/components/ProtectedAdminRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedAdminRoute;
