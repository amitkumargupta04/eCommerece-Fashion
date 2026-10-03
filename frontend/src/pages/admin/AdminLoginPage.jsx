import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginThunk, clearError, clearSuccess } from "@/features/auth";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, user, error, success } = useSelector(
    (state) => state.auth
  );
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auth State Sync & Role Check
  useEffect(() => {
    if (isAuthenticated && user) {
      const userRole = user.role?.toUpperCase();

      if (userRole === "ADMIN" || userRole === "ROLE_ADMIN") {
        if (success) {
          toast.success("Welcome back, Admin!");
          dispatch(clearSuccess());
        }
        navigate("/admin/dashboard", { replace: true });
      } else {
        toast.error("Access Denied: You are not authorized as Admin!");
        dispatch(clearError());
      }
    }
  }, [isAuthenticated, user, success, navigate, dispatch]);

  // Handle Error Toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  //  Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }
    dispatch(loginThunk({ email, password }));
  };

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* LEFT IMAGE */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740&q=80)",
        }}
      />

      {/* RIGHT LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Admin Login
          </h2>
          <p className="text-gray-400 text-center mt-2 mb-8">
            Sign in to access admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/90 text-black font-semibold py-3 rounded-xl hover:bg-white active:scale-[0.98] transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            © {new Date().getFullYear()} Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;