import axios from "axios";

// ✅ Single source of truth (local + production)
const API_BASE = import.meta.env.VITE_API_URL;

export const fetchProperties = async () => {
  const response = await axios.get(`${API_BASE}/api/properties`);
  return response.data;
};

export const fetchPropertyById = async (id) => {
  const response = await axios.get(`${API_BASE}/api/properties/${id}`);
  return response.data;
};

export const addProperty = async (propertyData, token) => {
  const response = await axios.post(`${API_BASE}/api/properties`, propertyData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProperty = async (id, propertyData, token) => {
  const response = await axios.put(
    `${API_BASE}/api/properties/${id}`,
    propertyData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteProperty = async (id, token) => {
  await axios.delete(`${API_BASE}/api/properties/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
