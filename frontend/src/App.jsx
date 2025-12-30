import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./page/homePage/HomePage";
import UserProfile from "./page/users/UserProfile";
import UserLayout from "./layout/UserLayout";
import AdminLoginPage from "./page/admin/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";
import ProtectedAdmin from "./page/admin/ProtectedAdmin";
import Products from "./components/adminComponents/Products";
import Categories from "./components/adminComponents/Categories";
import Orders from "./components/adminComponents/Orders";
import Customers from "./components/adminComponents/Customers";
import Banners from "./components/adminComponents/Banners";
import Dashboard from "./components/adminComponents/Dashboard";
import UserLogin from "./page/users/UserLogin";
import UserSignup from "./page/users/UserSignup";


function App() {
  return (
    <>
      {/* Global Toast System */}
      <ToastContainer position="top-right" autoClose={3000} />
      {/* All Routes for Users*/}
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<UserLogin/>} />
          <Route path="/register" element={<UserSignup />} />
          <Route path="/user-profile" element={<UserProfile/>} />

          {/* 404 → redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          {/* Default admin route */}
          <Route index element={<Navigate to="dashboard" replace />} />
          {/* Admin Pages */}
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders/>} />
          <Route path="customers" element={<Customers />} />
          <Route path="banners" element={<Banners/>} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
