import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegBell, FaDollarSign, FaCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbArticle } from "react-icons/tb";
import { MdOutlineRateReview, MdOutlineAnalytics } from "react-icons/md";

function SideBar({ children }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { name: "Dashboard", icon: <RxDashboard />, path: "/admin/dashboard" },
    { name: "Article", icon: <TbArticle />, path: "/admin/article" },
    { name: "Review Article", icon: <MdOutlineRateReview />, path: "/admin/review" },
    { name: "Analytics Page", icon: <MdOutlineAnalytics />, path: "/admin/analytics" },
    { name: "Earning", icon: <FaDollarSign />, path: "/admin/earning" },
    { name: "Profile & Setting", icon: <FaCog />, path: "/admin/profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#292A2D]">
      {/* Top Strip */}

      {/* Header */}
      <div className="bg-[#292A2D] px-4 py-4 flex justify-between items-center w-full z-50 relative">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Hamburger - mobile only */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>

          <div className="text-white">
            <h1 className="font-bold text-3xl">Journel</h1>
            <p className="text-xl">
              of <span className="text-orange-500">In</span>d
              <span className="text-green-600">ia</span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-4 items-center text-white">
          <button className="bg-[#1F1F1F] p-3 rounded-xl">
            <FaRegBell />
          </button>
          <div className="flex items-center cursor-pointer">
            <span className="hidden sm:block">Contributor</span>
            <RiArrowDropDownLine className="text-3xl" />
          </div>
          <CgProfile className="text-xl cursor-pointer" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Overlay - Mobile */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:sticky top-0 left-0 z-50 md:h-screen h-screen
            w-64 bg-[#292A2D] px-4 space-y-2
            transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}
        >
          {/* Close button (mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white text-2xl mb-4 self-end"
          >
            ✕
          </button>

          {/* Menu Items */}
          {menus.map((menu, i) => {
            const isActive = location.pathname.startsWith(menu.path);

            return (
              <Link
                key={i}
                to={menu.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-3 py-2 rounded-md text-gray-300 transition-all
                  ${isActive
                    ? "bg-black text-white ring-1 ring-white ring-offset-2 ring-offset-[#292A2D]"
                    : "hover:bg-black"}
                `}
              >
                <span className="text-xl shrink-0">{menu.icon}</span>
                <span className="text-sm font-medium">{menu.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-[#292A2D] px-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default SideBar;
