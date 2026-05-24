import { useParams } from "react-router-dom";
import { useProperty } from "../hooks/useProperties";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminPropertyUpload from "./AdminPropertyUpload";
import AdminLogin from "./AdminLogin";

export default function PropertyDetails() {
  const { id } = useParams();
  const { property, loading, error, fetchProperty } = useProperty(id);
  const [selectedImages, setSelectedImages] = useState([]);

  // ✅ Admin auth state: token-based (not "authenticated")
  const [isPropertyAdmin, setIsPropertyAdmin] = useState(
    !!localStorage.getItem("adminToken")
  );
  const [showLogin, setShowLogin] = useState(false);

  const backendBaseUrl = import.meta.env.VITE_API_URL;


  const getFullImageUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : backendBaseUrl + url;
  };

  // ✅ DELETE IMAGE - updated endpoint + Authorization header
  const handleDeleteImage = async (imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      if (!property?._id || !imageUrl) {
        alert("Missing property or image URL");
        return;
      }

      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Admin token not found. Please login again.");
        setIsPropertyAdmin(false);
        return;
      }

      await axios.delete(
        `${backendBaseUrl}/api/properties/delete-image/${property._id}`,
        {
          data: { imageUrl }, // ✅ only imageUrl now
          headers: {
            Authorization: `Bearer ${token}`, // ✅ required
          },
        }
      );

      alert("Image deleted successfully");
      if (fetchProperty) fetchProperty();
      else window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert(
        "Failed to delete image: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  useEffect(() => {
    // ✅ update admin state if localStorage changes outside this component
    const handleStorageChange = () => {
      setIsPropertyAdmin(!!localStorage.getItem("adminToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading property...</div>;

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  if (!property)
    return <div className="text-center py-10">Property not found</div>;

  const phoneNumber = property.contactPhone || "+919719030786";
  const whatsappNumber = (property.contactWhatsApp || "919719030786").replace(
    "+",
    ""
  );
  const contactMessage = encodeURIComponent(
    `Hello, I want to inquire about ${property.name}`
  );

  const images = Array.isArray(property.images) ? property.images : [];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Property Name */}
      <h1 className="text-3xl font-bold mb-6">{property.name}</h1>

      {/* Images Grid */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.length > 0 ? (
          images.map((image, idx) => (
            <div key={idx} className="relative group">
              <img
                src={getFullImageUrl(image)}
                alt={`${property.name} image ${idx + 1}`}
                className="w-full h-52 object-cover rounded-lg cursor-pointer shadow-sm hover:scale-105 transition"
                onClick={() => setSelectedImages(images.map(getFullImageUrl))}
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
                }}
              />
              {/* Delete Button - Admin Only */}
              {isPropertyAdmin && (
                <button
                  onClick={() => handleDeleteImage(image)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                  title="Delete Image"
                >
                  ×
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="h-52 w-full col-span-3 flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg">
            No images available
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-auto relative">
            <button
              className="absolute top-3 right-4 text-red-600 text-3xl font-bold"
              onClick={() => setSelectedImages([])}
            >
              ×
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {selectedImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="rounded-lg object-cover max-h-60 w-full"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <p className="mt-6 text-gray-700 leading-relaxed">
        {property.description}
      </p>

      {/* Contact Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${contactMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-green-700 transition"
        >
          WhatsApp Contact
        </a>

        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 py-4 text-center bg-blue-600 text-white rounded-lg font-extrabold hover:bg-blue-700 transition"
        >
          Call: {phoneNumber}
        </a>
      </div>

      {/* Admin Login / Upload Section */}
      {isPropertyAdmin ? (
        <div>
          {/* Admin upload component stays same */}
          <AdminPropertyUpload propertyId={property._id} />

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              setIsPropertyAdmin(false);
            }}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowLogin(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Admin Login
          </button>
        </div>
      )}

      {/* Admin Login Modal */}
      {showLogin && (
        <AdminLogin
          onLogin={(success) => {
            setShowLogin(false);
            if (success) setIsPropertyAdmin(true);
          }}
        />
      )}
    </div>
  );
}
