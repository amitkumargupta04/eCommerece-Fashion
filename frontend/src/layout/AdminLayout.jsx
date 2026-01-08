
import React, { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/auth/authSlice";

function AdminLayout() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      dispatch(loadUser()).finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, [dispatch, isAuthenticated]);

  if (checking || loading) {
    return <div className="text-center mt-20">Loading Admin...</div>; // Loader while checking token
  }

  return (
    <div>
      <SideBar>
        <Outlet />
      </SideBar>
    </div>
  );
}

export default AdminLayout;
