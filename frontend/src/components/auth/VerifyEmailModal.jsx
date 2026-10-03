import React from "react";
import { CheckCircle, Home, LogIn } from "lucide-react";

function VerifyEmailModal({
  isOpen = true,
  onClose,
  onLogin,
  onHome,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md text-center border border-gray-100">
        {/* Success Checkmark Icon Container */}
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 text-green-500">
          <CheckCircle className="w-12 h-12 stroke-[2.5]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 leading-snug">
          Email Verified Successfully 🎉
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
          Your email has been successfully verified.
          <br />
          You can now login and start shopping.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Button: Login Now */}
          <button
            onClick={onLogin}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <LogIn className="w-5 h-5" />
            Login Now
          </button>

          {/* Secondary Button: Go Home */}
          <button
            onClick={onHome}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 border border-gray-200 transition duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailModal;