import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "@/features/auth";

import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Package,
  Key,
  UserCheck,
} from "lucide-react";

const categoriesData = [
  {
    id: "cat-1",
    name: "Men's Fashion",
    path: "/category/men",
    subcategories: [
      { name: "Topwear", path: "/category/men/topwear" },
      { name: "Bottomwear", path: "/category/men/bottomwear" },
      { name: "Footwear", path: "/category/men/footwear" },
    ],
  },
  {
    id: "cat-2",
    name: "Women's Fashion",
    path: "/category/women",
    subcategories: [
      { name: "Ethnic Wear", path: "/category/women/ethnic" },
      { name: "Western Wear", path: "/category/women/western" },
      { name: "Jewelry", path: "/category/women/jewelry" },
    ],
  },
  {
    id: "cat-3",
    name: "Accessories",
    path: "/category/accessories",
    subcategories: [
      { name: "Watches", path: "/category/accessories/watches" },
      { name: "Bags & Backpacks", path: "/category/accessories/bags" },
      { name: "Sunglasses", path: "/category/accessories/sunglasses" },
    ],
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);

  const wishlistCount = 4;
  const cartCount = 3;

  const toggleMobileCategory = (id) => {
    setOpenMobileCategory((prev) => (prev === id ? null : id));
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");

    setIsProfileOpen(false);
    setIsMobileOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-black text-white shadow-xl z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-4 lg:gap-8">
        {/* BRAND LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide cursor-pointer text-white hover:opacity-90 transition"
        >
          FashionX
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${isActive ? "text-white font-semibold border-b-2 border-white pb-1" : "text-gray-300"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${isActive ? "text-white font-semibold border-b-2 border-white pb-1" : "text-gray-300"}`
            }
          >
            Products
          </NavLink>

          {/* Categories Dropdown */}
          <div className="group relative cursor-pointer py-2">
            <span className="hover:text-gray-300 transition inline-flex items-center gap-1 text-gray-300">
              Categories{" "}
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </span>

            <div className="absolute left-0 top-full w-52 bg-black border border-white/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 py-2 z-50">
              {categoriesData.map((category) => (
                <div
                  key={category.id}
                  className="group/sub relative px-4 py-2 hover:bg-white/10 flex items-center justify-between"
                >
                  <Link
                    to={category.path}
                    className="text-sm text-gray-200 hover:text-white block w-full"
                  >
                    {category.name}
                  </Link>
                  {category.subcategories?.length > 0 && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}

                  {category.subcategories?.length > 0 && (
                    <div className="absolute left-full top-0 w-48 bg-black border border-white/10 rounded-lg shadow-xl opacity-0 group-hover/sub:opacity-100 invisible group-hover/sub:visible transition-all duration-200 py-2 -ml-1">
                      {category.subcategories.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          className="block px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* SEARCH BAR */}
        <div className="flex-1 hidden sm:flex justify-center max-w-xs md:max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-4 pr-10 bg-black border border-white/20 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white transition"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* RIGHT: ICONS & AUTHENTICATION */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* 🟢 dynamic conditional rendering via Redux isAuthenticated */}
          {isAuthenticated ? (
            <>
              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-1 text-gray-300 hover:text-white transition"
              >
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-1 text-gray-300 hover:text-white transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition focus:outline-none"
                >
                  <User className="w-5 h-5" />
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-56 bg-black border border-white/10 rounded-xl shadow-2xl py-2 z-50 divide-y divide-white/10">
                      {/* Dynamic User Name & Email */}
                      <div className="px-4 py-2 text-xs text-gray-400">
                        Signed in as{" "}
                        <span className="font-semibold text-white block truncate">
                          {user?.name || user?.email?.split("@")[0] || "User"}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition"
                        >
                          <UserCheck className="w-4 h-4" /> My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition"
                        >
                          <Package className="w-4 h-4" /> My Orders
                        </Link>
                        <Link
                          to="/reset-password"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition"
                        >
                          <Key className="w-4 h-4" /> Reset Password
                        </Link>
                      </div>

                      {/* LOGOUT BUTTON */}
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition text-left font-medium"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            /* Login & Signup Buttons (When Logged Out) */
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-1.5 border border-white/30 text-white rounded-lg text-sm hover:border-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Hamburger Icon (Mobile) */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-1 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Open Menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 md:hidden ${
          isMobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-black border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between p-6 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="text-xl font-bold tracking-wide">FashionX</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative my-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <nav className="flex flex-col gap-4 text-base font-medium mt-4">
            <NavLink
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `block ${isActive ? "text-white font-bold" : "text-gray-300"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `block ${isActive ? "text-white font-bold" : "text-gray-300"}`
              }
            >
              Products
            </NavLink>

            {/* Mobile Categories */}
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                Categories
              </span>
              {categoriesData.map((cat) => (
                <div key={cat.id} className="border-b border-white/5 py-2">
                  <div
                    onClick={() => toggleMobileCategory(cat.id)}
                    className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openMobileCategory === cat.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {openMobileCategory === cat.id && (
                    <div className="pl-4 mt-2 space-y-2 flex flex-col border-l border-white/10">
                      {cat.subcategories.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-sm text-gray-400 hover:text-white py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Links for Logged-In User */}
            {isAuthenticated && (
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-white"
                >
                  <span>Wishlist</span>
                  <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full font-bold">
                    {wishlistCount}
                  </span>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-white"
                >
                  <span>Cart</span>
                  <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Drawer Footer Auth Controls */}
        <div className="pt-6 border-t border-white/10">
          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/profile"
                onClick={() => setIsMobileOpen(false)}
                className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" /> My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg text-sm font-medium hover:bg-red-600/30 transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                className="w-full text-center py-2 border border-white/30 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileOpen(false)}
                className="w-full text-center py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </aside>
    </header>
  );
}
