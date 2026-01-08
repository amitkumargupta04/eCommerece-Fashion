import axios from "axios";

const api = import.meta.env.VITE_API_URL;
// Axios instance
export const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true,
});

// Request interceptor to add token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
