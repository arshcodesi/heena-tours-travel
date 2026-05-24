import { useParams } from "react-router-dom";
import { useHotel } from "../hooks/useHotels";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";
import AdminHotelUpload from "./AdminHotelUpload";
import AdminLogin from "../../../components/AdminLogin";

export default function HotelDetails() {
  const { id } = useParams();
  const { hotel, loading, error } = useHotel(id);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  // ✅ Hotel Admin = either hotel UI flag OR real JWT
  const computeIsHotelAdmin = () => {
    const hotelFlag =
      localStorage.getItem("hotelAdminToken") === "authenticated";
    const jwt = localStorage.getItem("adminToken"); // ✅ FIXED
    const hasJwt = !!jwt && jwt !== "authenticated";
    return hotelFlag || hasJwt;
  };

  const [isHotelAdmin, setIsHotelAdmin] = useState(computeIsHotelAdmin);

  useEffect(() => {
    const sync = () => setIsHotelAdmin(computeIsHotelAdmin());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  if (loading) return <div className="text-center py-10">Loading hotel...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">Error: {error}</div>
    );
  if (!hotel) return <div className="text-center py-10">Hotel not found.</div>;

  const phoneNumber = hotel.contactPhone || "+919719030786";
  const whatsappNumber = (hotel.contactWhatsApp || "919719030786").replace(
    "+",
    ""
  );
  const contactMessage = encodeURIComponent(
    `Hello, I want to book a room at ${hotel.name}`
  );

  const backendBaseUrl = import.meta.env.VITE_API_URL;

  const getFullImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return backendBaseUrl + url;
    return backendBaseUrl + "/" + url;
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="relative h-96 w-full overflow-hidden rounded-3xl mb-6">
        <img
          src={getFullImageUrl(
            hotel.imageUrl ||
              "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
          )}
          alt={hotel.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80";
          }}
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
      <p className="text-lg text-slate-700 mb-6">{hotel.description}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Amenities</h2>
        <ul className="flex flex-wrap gap-3">
          {hotel.amenities?.length > 0 ? (
            hotel.amenities.map((amenity) => (
              <li
                key={amenity}
                className="bg-gray-100 rounded-full px-4 py-1 text-sm font-medium text-gray-800 select-none"
              >
                {amenity}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No amenities listed</p>
          )}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Room Types</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {hotel.roomTypes?.length > 0 ? (
            hotel.roomTypes.map(({ type, images }, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                {images && images.length > 0 ? (
                  <div
                    className="relative h-48 cursor-pointer"
                    onClick={() => setSelectedImages(images.map(getFullImageUrl))}
                  >
                    <img
                      src={getFullImageUrl(images[0])}
                      alt={`${type} room`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        +{images.length - 1} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No images
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{type}</h3>
                  <p className="text-gray-600 text-sm">Contact for price</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No room types available</p>
          )}
        </div>
      </div>

      {selectedImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl max-h-full overflow-auto relative">
            <button
              onClick={() => setSelectedImages([])}
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
            >
              &times;
            </button>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-12">
              {selectedImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Room"
                  className="w-full h-48 object-cover rounded"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${contactMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-4 text-center bg-green-600 text-white rounded-lg font-extrabold hover:bg-green-700 transition"
        >
          Book Now via WhatsApp
        </a>

        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 py-4 text-center bg-blue-600 text-white rounded-lg font-extrabold hover:bg-blue-700 transition"
        >
          Call to Book: {phoneNumber}
        </a>
      </div>

      <Reviews hotelId={id} />

      {/* ✅ Admin upload section */}
      {isHotelAdmin ? (
        <div>
          <AdminHotelUpload hotelId={id} roomTypes={hotel.roomTypes || []} />

          <button
            onClick={() => {
              // ✅ Full admin logout (Hotels + Properties + Tours)
              localStorage.removeItem("hotelAdminToken");
              localStorage.removeItem("adminToken");
              localStorage.removeItem("propertyAdminToken"); // optional legacy cleanup

              setIsHotelAdmin(false);
              window.location.reload();
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
            Admin Access
          </button>
        </div>
      )}

      {showLogin && (
        <AdminLogin
          onLogin={(success) => {
            setShowLogin(false);
            if (success) setIsHotelAdmin(true);
          }}
        />
      )}
    </div>
  );
}
