import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import UserProfile from "./page/UserProfile";
import UserLayout from "./layout/UserLayout";
import AdminLoginPage from "./page/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";

function App() {
  return (
    <>
      {/* Global Toast System */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* All Routes */}
      <Routes>
        {/* Layout wraps Navbar + Footer + Outlet */}
        <Route path="/" element={<UserLayout />}>
          {/* Default route */}
          <Route index element={<HomePage />} />
          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />

          {/* 404 → redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        {/* Amin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
