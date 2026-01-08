import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout successfully")
    toastShown.current = false; // 🔄 reset ref
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/register");
    } else {
      navigate("/cart"); // agar cart page hai
    }
  };

  const handleProfileClick = () => {
    if (!user) {
      navigate("/register");
    } else {
      navigate("/user-profile"); // agar profile page hai
    }
  };

  return (
    <header className="w-full bg-black text-white py-6 fixed top-0 left-0 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <h1
          className="text-2xl font-bold tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          FashionX
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 text-sm font-medium opacity-90 relative">
          {/* Dropdown */}
          <div className="group relative cursor-pointer">
            <span className="hover:text-gray-300 transition inline-block">
              Categories ▾
            </span>

            <div
              className="absolute left-0 mt-2 w-40 bg-black border border-white/10 rounded-lg shadow-lg 
              opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200"
            >
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
        </nav>

        {/* Desktop Search Bar */}
        <div className="flex-1 hidden sm:flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-black border border-white/20 rounded-full 
              text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-300" />
          </div>
        </div>

        {/* Right Buttons & Icons */}
        <div className="flex items-center gap-3 md:gap-5">
          {user ? (
            <>
              <button
                className="flex items-center justify-center w-10 h-10 text-white cursor-pointer"
                onClick={handleProfileClick}
              >
                <User className="w-7 h-7" />
              </button>
              <button
                className="px-4 py-1.5 bg-red-500 rounded text-white text-sm md:text-base cursor-pointer hover:bg-red-600 "
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-1.5 bg-white/90 text-black rounded text-sm md:text-base cursor-pointer hover:bg-white"
                onClick={() => navigate("/register")}
              >
                Signup
              </button>
              <button
                className="px-4 py-1.5 bg-white/90 text-black rounded text-sm md:text-base cursor-pointer hover:bg-white"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          )}

          {/* Cart */}
          <div className="cursor-pointer relative" onClick={handleCartClick}>
            <ShoppingCart className="w-6 h-6" />
            <span
              className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold 
              w-5 h-5 flex items-center justify-center rounded-full"
            >
              3
            </span>
          </div>

          {/* Hamburger */}
          <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black px-6 pb-4 mt-3 border-t border-white/10">
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
        </div>
      )}
    </header>
  );
}
