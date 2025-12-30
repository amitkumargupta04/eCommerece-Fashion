import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function UserSignup() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, signupSuccess } = useSelector((state) => state.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Generic input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        fullname: form.fullname,
        email: form.email,
        password: form.password,
      })
    );
  };

  useEffect(() => {
    if (signupSuccess) {
      navigate("/login");
    }
  }, [signupSuccess, navigate]);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Fullscreen background image */}
      <img
        src="https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=1223&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Signup Form Card */}
      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-pulse">Registering...</span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default UserSignup;
