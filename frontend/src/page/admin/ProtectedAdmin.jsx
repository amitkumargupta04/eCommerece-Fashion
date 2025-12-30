import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedAdmin = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role?.toLowerCase() !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedAdmin;
