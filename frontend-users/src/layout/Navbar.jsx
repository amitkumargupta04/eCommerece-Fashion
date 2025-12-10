// components/Navbar.jsx
import { useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import React from "react";

const categories = [
  { name: "Men's Wear", link: "/category/mens" },
  { name: "Women's Wear", link: "/category/womens" },
  { name: "Kids Wear", link: "/category/kids" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo + Menu */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <a href="/" className="flex items-center ml-3 lg:ml-0">
                <img src="https://marketplace.canva.com/EAGVEEMC0FA/1/0/800w/canva-navy-and-pink-modern-online-store-logo-dm-X_1CXJto.jpg"
                 className="h-15 w-15" 
                />
              </a>

              {/* Desktop Menu */}
              <div className="hidden lg:flex lg:ml-10 lg:space-x-8">
                <a
                  href="/"
                  className="text-gray-900 hover:text-purple-600 font-medium transition"
                >
                  Home
                </a>

                <div
                  className="relative"
                  onMouseLeave={() => setCategoryOpen(false)}
                >
                  <button
                    onMouseEnter={() => setCategoryOpen(true)}
                    className="flex items-center text-gray-900 hover:text-purple-600 font-medium transition"
                  >
                    Categories
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {/* Dropdown */}
                  {categoryOpen && (
                    <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 overflow-hidden">
                      {categories.map((cat, index) => (
                        <a
                          key={index}
                          href={cat.link}
                          className="block px-6 py-3 text-gray-700 font-medium transition-all duration-200 
          hover:bg-purple-600 hover:text-white hover:px-8 hover:tracking-wide"
                        >
                          {cat.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Search + Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Bar - Hidden on mobile */}
              <div className="flex relative">
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  className="w-80 pl-12 pr-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 transition text-sm"
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-5 text-gray-700">
                {/* Mobile Search Icon */}
                <button className="md:hidden">
                  <Search size={22} />
                </button>

                <a href="/profile" className="hover:text-purple-600 transition">
                  <User size={22} />
                </a>

                <a
                  href="/wishlist"
                  className="relative hover:text-purple-600 transition"
                >
                  <Heart size={22} />
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    3
                  </span>
                </a>

                <a
                  href="/cart"
                  className="relative hover:text-purple-600 transition"
                >
                  <ShoppingBag size={22} />
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    5
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <a
                href="/"
                className="block text-lg font-medium text-gray-900 py-2"
              >
                Home
              </a>

              <div>
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="w-full flex justify-between items-center text-lg font-medium text-gray-900 py-2"
                >
                  Categories
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {categoryOpen && (
                  <div className="pl-6 space-y-3 mt-3">
                    <a
                      href="/category/mens"
                      className="block text-gray-600 hover:text-purple-600 py-2"
                    >
                      Men's
                    </a>
                    <a
                      href="/category/womens"
                      className="block text-gray-600 hover:text-purple-600 py-2"
                    >
                      Women's
                    </a>
                    <a
                      href="/category/kids"
                      className="block text-gray-600 hover:text-purple-600 py-2"
                    >
                      Kids
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
