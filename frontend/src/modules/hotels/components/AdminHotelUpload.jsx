import { useMemo, useState } from "react";
import axios from "axios";

export default function AdminHotelUpload({ hotelId, roomTypes = [] }) {
  const [uploading, setUploading] = useState(false);
  const backendBaseUrl = import.meta.env.VITE_API_URL;


  // ✅ Must be the REAL JWT
  const getToken = () => localStorage.getItem("adminToken");

  // ✅ Extract type names like ["Deluxe","Executive",...]
  const typeNames = useMemo(
    () => roomTypes.map((r) => r.type).filter(Boolean),
    [roomTypes]
  );

  // ✅ Store selected files per roomType dynamically
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleFileChange = (roomType, files) => {
    setSelectedFiles((prev) => ({ ...prev, [roomType]: files }));
  };

  const handleUpload = async (roomType) => {
    try {
      if (!hotelId) return alert("Hotel ID is missing.");

      const files = selectedFiles[roomType];
      if (!files || files.length === 0) {
        return alert(`Please select files for ${roomType} room.`);
      }

      const token = getToken();
      if (!token || token === "authenticated") {
        return alert("Please login again (JWT token missing).");
      }

      setUploading(true);

      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("images", file));

      // ✅ Upload hotel images
      const uploadRes = await axios.post(
        `${backendBaseUrl}/api/upload/hotel-images`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const imageUrls = uploadRes.data?.imageUrls;
      if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        return alert("Upload failed: No image URLs received.");
      }

      // ✅ Update hotel room images
      await axios.put(
        `${backendBaseUrl}/api/hotels/room-images`,
        { hotelId, roomType, images: imageUrls }
      );

      alert(`${roomType} images uploaded successfully!`);
      window.location.reload();
    } catch (error) {
      console.error("HOTEL UPLOAD ERROR:", error.response?.data || error.message);
      alert("Upload failed: " + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  if (!typeNames.length) {
    return (
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Upload Room Images (Admin)</h3>
        <p className="text-gray-600">No room types found for this hotel.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Upload Room Images (Admin)</h3>

      {typeNames.map((roomType) => (
        <div key={roomType} className="mb-4">
          <label className="block text-sm font-medium mb-2">
            {roomType} Room Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(roomType, e.target.files)}
            className="border rounded px-3 py-2 w-full"
            disabled={uploading}
          />

          <button
            onClick={() => handleUpload(roomType)}
            disabled={uploading}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700 transition"
          >
            {uploading ? `Uploading ${roomType}...` : `Upload ${roomType} Images`}
          </button>
        </div>
      ))}
    </div>
  );
}
