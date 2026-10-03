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
  Menu,
  X,
  LogOut,
  Package,
  Key,
  UserCheck,
} from "lucide-react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const wishlistCount = 4;
  const cartCount = 3;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileOpen(false);
    }
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
              `transition hover:text-gray-300 ${
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-gray-300"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-gray-300"
              }`
            }
          >
            Products
          </NavLink>
        </nav>

        {/* SEARCH BAR */}
        <div className="flex-1 hidden sm:flex justify-center max-w-xs md:max-w-md">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-4 pr-10 bg-neutral-950 border border-white/20 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white transition"
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* RIGHT: ICONS & AUTHENTICATION */}
        <div className="flex items-center gap-3 lg:gap-5">
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
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition focus:outline-none cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-56 bg-neutral-950 border border-white/15 rounded-xl shadow-2xl py-2 z-50 divide-y divide-white/10">
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
                          to="/my-orders"
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

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition text-left font-medium cursor-pointer"
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
            className="md:hidden p-1 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
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
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-neutral-950 border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between p-6 ${
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

          <form onSubmit={handleSearchSubmit} className="relative my-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-900 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

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
                className="w-full flex items-center justify-center gap-2 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg text-sm font-medium hover:bg-red-600/30 transition cursor-pointer"
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
