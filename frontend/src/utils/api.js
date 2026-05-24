import axios from "axios";

// If you use Vite proxy for /api, keep baseURL empty ("").
// If you want direct backend URL, set VITE_API_URL=http://localhost:5000 in .env
const baseURL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalized error message helper (no ugly console spam)
export function getApiErrorMessage(error) {
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "Something went wrong. Please try again.";
}