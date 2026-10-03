import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import UserLayout from "@/layout/UserLayout";
import AdminLayout from "@/layout/AdminLayout";
import AdminProtectedRoute from "@/pages/admin/AdminProtectedRoute";
import UserProtectedRoute from "@/pages/users/UserProtectedRoute";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import CategoryPage from "@/pages/admin/CategoryPage";
import SubCategoryPage from "@/pages/admin/SubCategoryPage";
import ProductPage from "@/pages/admin/ProductPage";

import Login from "@/pages/users/Login";
import Signup from "@/pages/users/Signup";
import VerifyEmail from "@/pages/users/VerifyEmail";
import ForgotPassword from "@/pages/users/ForgotPassword";
import ResetPassword from "@/pages/users/ResetPassword";
import Profile from "@/pages/users/Profile";
//import HomePage from "../pages/home/Home.jsx";

// Dummy/Actual Public Pages
//const HomePage = () => <div className="p-6 text-xl">Home Page (Public)</div>;
// const ProductsPage = () => (
//   <div className="p-6 text-xl">Products Listing (Public)</div>
// );
const ProductDetailsPage = () => (
  <div className="p-6 text-xl">Product Details (Public)</div>
);

// Dummy/Actual Protected User Pages
const CartPage = () => <div className="p-6 text-xl">Cart Page (Protected)</div>;
const WishlistPage = () => (
  <div className="p-6 text-xl">Wishlist Page (Protected)</div>
);
const OrdersPage = () => (
  <div className="p-6 text-xl">User Orders (Protected)</div>
);
const ProfilePage = () => (
  <div className="p-6 text-xl">User Profile (Protected)</div>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== PUBLIC USER ROUTES ==================== */}
        <Route element = {<UserLayout/>}>
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/products" element={<ProductsPage />} /> */}
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/verify-email" element = {<VerifyEmail/>}/>
          <Route path="/forgot-password" element = {<ForgotPassword/>}/>
          <Route path="/reset-password" element = {<ResetPassword/>}/>

          {/* ==================== PROTECTED USER ROUTES ==================== */}
          <Route element={<UserProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/my-orders" element={<OrdersPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="products" element={<ProductPage/>} />
            <Route path="categories" element={<CategoryPage/>} />
            <Route path="sub-categories" element={<SubCategoryPage/>} />
            <Route path="orders" element={<div>Admin Orders</div>} />
            <Route path="customers" element={<div>Customers</div>} />
            <Route path="banners" element={<div>Banners</div>} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<div>404 Page Not Founds</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
