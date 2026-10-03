import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import RegistrationSuccessModal from "./RegistrationSuccessModal";
import { signupThunk, clearError, clearSuccess } from "@/features/auth";

function SignupForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error} = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signupThunk(form)).unwrap();
      toast.success("Registration successful.");
      setIsModalOpen(true);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleModalLogin = () => {
    dispatch(clearSuccess());
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleModalClose = () => {
    dispatch(clearSuccess());
    setIsModalOpen(false);
  };

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
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 cursor-pointer font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Verification Success Modal */}
      <RegistrationSuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLogin={handleModalLogin}
      />
    </div>
  );
}

export default SignupForm;
