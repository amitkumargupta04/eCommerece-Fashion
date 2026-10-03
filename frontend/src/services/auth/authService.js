import api from "@/app/axios";

const login = async (credentials) => {
  console.log("Calling API...");
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

const signup = async (userData) => {
  console.log("Calling API...");
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

const forgotPassword = async (emailData) => {
  const response = await api.post("/auth/forgot-password", emailData);
  return response.data;
};

const resetPassword = async (resetData) => {
  const response = await api.post("/auth/reset-password", resetData);
  return response.data;
};

const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email?token=${token}`);
  return response.data;
};

export default {
  login,
  signup,
  forgotPassword,
  resetPassword,
  verifyEmail,
};