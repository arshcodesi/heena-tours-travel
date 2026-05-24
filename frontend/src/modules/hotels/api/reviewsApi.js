import axios from "axios";

// ✅ Single source of truth
const API_BASE = import.meta.env.VITE_API_URL;

export const fetchReviews = async (hotelId) => {
  const response = await axios.get(`${API_BASE}/api/reviews/${hotelId}`);
  return response.data;
};

export const submitReview = async (reviewData) => {
  const response = await axios.post(`${API_BASE}/api/reviews`, reviewData);
  return response.data;
};
