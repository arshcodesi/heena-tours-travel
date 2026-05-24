import { useState } from "react";
import axios from "axios";

export default function AdminPropertyUpload({ propertyId }) {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploading, setUploading] = useState(false);

  const backendBaseUrl = import.meta.env.VITE_API_URL;

  // ✅ use the real JWT token key
  const getAdminToken = () => localStorage.getItem("adminToken");

  const handleFileChange = (files) => {
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    if (!propertyId) {
      alert("Property ID is missing.");
      return;
    }

    const token = getAdminToken();
    if (!token) {
      alert("Admin authentication required. Please log in.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => formData.append("images", file));

    try {
      // 1) Upload files
      const uploadRes = await axios.post(
        `${backendBaseUrl}/api/upload/property-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrls = uploadRes.data?.imageUrls;
      if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        alert("Upload failed: No valid image URLs received.");
        return;
      }

      // 2) Update property images
      await axios.put(
        `${backendBaseUrl}/api/properties/images/${propertyId}`,
        { images: imageUrls },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Images uploaded successfully!");
      window.location.reload();
    } catch (error) {
      console.error("UPLOAD FAILED:", error.response?.data || error.message);
      alert("Upload failed: " + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        Upload Property Images (Admin)
      </h3>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
        className="border rounded px-3 py-2 w-full mb-4"
        disabled={uploading}
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}
