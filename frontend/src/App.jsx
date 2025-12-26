import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import Layout from "./layout/Layout";
import UserProfile from "./page/UserProfile"; 

function App() {
  return (
    <>
      {/* Global Toast System */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* All Routes */}
      <Routes>
        {/* Layout wraps Navbar + Footer + Outlet */}
        <Route path="/" element={<Layout />}>
          {/* Default route */}
          <Route index element={<HomePage />} />

          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
          <Route path="/user-profile" element = {<UserProfile/>}/>

          {/* 404 → redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
