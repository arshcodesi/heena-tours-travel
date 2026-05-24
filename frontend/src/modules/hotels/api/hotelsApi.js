import axios from "axios";

// ✅ Single source of truth for backend
const API_BASE = import.meta.env.VITE_API_URL;

export const fetchHotels = async () => {
  const response = await axios.get(`${API_BASE}/api/hotels`);
  return response.data;
};

export const fetchHotelById = async (id) => {
  const response = await axios.get(`${API_BASE}/api/hotels/${id}`);
  return response.data;
};

export const addHotel = async (hotelData, token) => {
  const response = await axios.post(`${API_BASE}/api/hotels`, hotelData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateHotel = async (id, hotelData, token) => {
  const response = await axios.put(`${API_BASE}/api/hotels/${id}`, hotelData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteHotel = async (id, token) => {
  await axios.delete(`${API_BASE}/api/hotels/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
