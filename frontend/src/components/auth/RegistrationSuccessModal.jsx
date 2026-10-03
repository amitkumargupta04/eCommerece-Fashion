import React from "react";
import { CheckCircle2, LogIn, X } from "lucide-react";

function RegistrationSuccessModal({
  isOpen = true,
  onClose,
  onLogin,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-center shadow-2xl border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10 stroke-[2]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Registration Successful 🎉
        </h2>

        {/* Description */}
        <div className="text-gray-600 text-sm sm:text-base space-y-2 mb-8 leading-relaxed">
          <p>Your account has been created successfully.</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            We've sent a verification link to your registered email address. Please verify your email before logging in.
          </p>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onLogin}
          className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <LogIn className="w-5 h-5" />
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccessModal;