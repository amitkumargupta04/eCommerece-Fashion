import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TbShirt } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineShoppingBag, MdCategory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { toast } from "react-toastify";

import { logout } from "@/features/auth"; 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideBar({ children }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/admin/login", { replace: true });
  };

  const menus = [
    { name: "Dashboard", icon: <RxDashboard />, path: "/admin/dashboard" },
    { name: "Products", icon: <TbShirt />, path: "/admin/products" },
    { name: "Categories", icon: <MdCategory />, path: "/admin/categories" },
    { name: "Sub Categories", icon: <BiCategoryAlt />, path: "/admin/sub-categories" },
    { name: "Orders", icon: <MdOutlineShoppingBag />, path: "/admin/orders" },
    { name: "Customers", icon: <FaUsers />, path: "/admin/customers" },
    { name: "Banners", icon: <GiKnightBanner />, path: "/admin/banners" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* HEADER */}
      <header className="w-full bg-neutral-900 border-b border-neutral-800 py-2 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl text-neutral-300 hover:text-white focus:outline-none"
            >
              ☰
            </button>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Admin <span className="text-neutral-400 font-normal">Panel</span>
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex min-h-[calc(100vh-64px)] relative">
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-30 md:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-64px)] w-64
          bg-neutral-900 border-r border-neutral-800
          p-4 space-y-1.5
          transform transition-transform duration-300 overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Navigation</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xl text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {menus.map((menu, i) => {
            const isActive = location.pathname.startsWith(menu.path);

            return (
              <Link
                key={i}
                to={menu.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-neutral-400 hover:bg-neutral-800/80 hover:text-neutral-100"
                }`}
              >
                <span className="text-lg">{menu.icon}</span>
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </aside>

        {/* PAGE CONTENT */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}

export default SideBar;