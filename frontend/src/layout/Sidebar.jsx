import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TbShirt } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineShoppingBag, MdCategory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../features/auth/authSlice";

function SideBar({ children }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Redux logout
      toast.success("Logged out successfully!");
      navigate("/admin-login"); // redirect to login page
    } catch (err) {
      toast.error("Failed to logout!");
    }
  };

  const menus = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <TbShirt />,
      path: "/admin/products",
    },
    {
      name: "Categories",
      icon: <MdCategory />,
      path: "/admin/categories",
    },
    {
      name: "Orders",
      icon: <MdOutlineShoppingBag />,
      path: "/admin/orders",
    },
    {
      name: "Customers",
      icon: <FaUsers />,
      path: "/admin/customers",
    },
    {
      name: "Banners",
      icon: <GiKnightBanner />,
      path: "/admin/banners",
    },
  ];

  return (
    <div className="min-h-screen bg-[#292A2D] text-white">
      {/* HEADER  */}
      <header className="w-full bg-[#292A2D] border-b border-gray-700 py-2">
        <div className="flex items-center justify-between px-4 py-4 h-16">
          {/* Left */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-2xl"
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold">
              Welcome <span className="text-orange-500">Admin</span>
            </h1>
          </div>

          {/* Right */}
          <button className="bg-black px-4 py-2 rounded-md text-sm hover:bg-gray-900 transition" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/*  BODY */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <aside
          className={`fixed md:static top-16 left-0 z-40 min-h-[calc(100vh-64px)] w-64
          bg-[#292A2D] border-r border-gray-700
          px-4 py-4 space-y-2
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          {/* Close btn mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-2xl mb-4 self-end"
          >
            ✕
          </button>

          {menus.map((menu, i) => {
            const isActive = location.pathname.startsWith(menu.path);

            return (
              <Link
                key={i}
                to={menu.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-3 py-2 rounded-md transition
                ${
                  isActive
                    ? "bg-black text-white ring-1 ring-white ring-offset-2 ring-offset-[#292A2D]"
                    : "text-gray-300 hover:bg-black"
                }`}
              >
                <span className="text-xl">{menu.icon}</span>
                <span className="text-sm font-medium">{menu.name}</span>
              </Link>
            );
          })}
        </aside>

        {/* PAGE CONTENT */}
        <main className="flex-1 px-4 py-4 ml-0 md:ml-64 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default SideBar;
