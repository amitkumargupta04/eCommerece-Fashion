import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import VerifyEmailModal from "../../components/auth/VerifyEmailModal";
import {verifyEmailThunk  } from "@/features/auth";

function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link.");
      navigate("/login");
      return;
    }

    dispatch(verifyEmailThunk(token))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        setIsModalOpen(true);
      })
      .catch((error) => {
        toast.error(error);
        navigate("/login");
      });
  }, [dispatch, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <VerifyEmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={() => navigate("/login")}
        onHome={() => navigate("/")}
      />
    </div>
  );
}

export default VerifyEmail;