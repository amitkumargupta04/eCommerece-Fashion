import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/category/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="w-full bg-black text-white py-4 fixed top-0 left-0 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold tracking-wide cursor-pointer"
        >
          FashionX
        </motion.h1>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex gap-4 text-sm font-medium opacity-90 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Dropdown */}
          <div className="group relative cursor-pointer">
            <span className="hover:text-gray-300 transition inline-block">
              Categories ▾
            </span>

            <div className="absolute left-0 mt-2 w-40 bg-black border border-white/10 rounded-lg shadow-lg 
              opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">

              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.name.toLowerCase()}`}
                  className="block px-4 py-2 hover:bg-white/10"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Desktop Search Bar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 hidden sm:flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-black border border-white/20 rounded-full 
              text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-300" />
          </div>
        </motion.div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
            <User className="w-6 h-6" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold 
              w-5 h-5 flex items-center justify-center rounded-full">3</span>
          </motion.div>

          {/* Hamburger */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-black px-6 pb-4 mt-3 border-t border-white/10"
        >
          {/* Search */}
          <div className="relative w-full my-3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-black border border-white/20 rounded-full 
              text-white placeholder-gray-400 focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-300" />
          </div>

          {/* Mobile Categories */}
          <div className="flex flex-col gap-2 text-lg mt-4">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/category/${cat.name.toLowerCase()}`}
                className="py-2 border-b border-white/10"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
