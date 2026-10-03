import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Lock } from "lucide-react";

import { resetPasswordThunk, clearError, clearSuccess } from "@/features/auth";
import ResetPasswordSuccessModal from "./ResetPasswordSuccessModal";

function ResetPasswordForm() {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  // Derive modal visibility directly from Redux state
  const isModalOpen = Boolean(success);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const payload = {
      token: token, 
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    };

    dispatch(resetPasswordThunk(payload));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleNavigateToLogin = () => {
    dispatch(clearSuccess());
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Image */}
      <img
        src="https://plus.unsplash.com/premium_photo-1684785617500-fb22234eeedd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter your new password below.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                minLength={6}
                required
                className="w-full border border-gray-300 px-4 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                minLength={6}
                required
                className="w-full border border-gray-300 px-4 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded hover:bg-gray-800 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <ResetPasswordSuccessModal
        isOpen={isModalOpen}
        onLogin={handleNavigateToLogin}
      />
    </div>
  );
}

export default ResetPasswordForm;
