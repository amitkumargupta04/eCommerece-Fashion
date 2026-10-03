import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, ArrowLeft } from "lucide-react";

import { forgotPasswordThunk, clearError, clearSuccess } from "@/features/auth";
import ForgotPasswordSuccessModal from "./ForgotPasswordSuccessModal";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  // Derive modal visibility directly from Redux state
  const isModalOpen = Boolean(success);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk({ email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleCloseModal = () => {
    dispatch(clearSuccess());
  };

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
          Forgot Password?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                className="w-full border border-gray-300 px-4 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded hover:bg-gray-800 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>

      {/* Success Modal */}
      <ForgotPasswordSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogin={handleNavigateToLogin}
      />
    </div>
  );
}

export default ForgotPasswordForm;