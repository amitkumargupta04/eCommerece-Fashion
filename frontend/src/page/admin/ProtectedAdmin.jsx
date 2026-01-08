
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadUser } from "../../features/auth/authSlice";
import React from "react";

const ProtectedAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.auth
  );

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(loadUser()).finally(() => {
        setChecked(true);
      });
    } else {
      setChecked(true);
    }
  }, [dispatch]); // ONLY dispatch

  if (!checked || loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!isAuthenticated || user?.role?.toLowerCase() !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedAdmin;

