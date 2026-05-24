import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={property.imageUrl || "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"}
        alt={property.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <p className="text-gray-700 text-sm">{property.location}</p>

        {/* Remove price display or comment out */}
        {/* <p className="text-gray-900 font-bold mt-2">₹{property.price.toLocaleString()}</p> */}

        <Link
          to={`/properties/${property._id}`}
          className="block mt-4 text-center bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}