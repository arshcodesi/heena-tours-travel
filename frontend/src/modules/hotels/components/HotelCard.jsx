import { Link } from "react-router-dom";

const backendBaseUrl = import.meta.env.VITE_API_URL;


const getFullImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return backendBaseUrl + url;
  return backendBaseUrl + "/" + url;
};

export default function HotelCard({ hotel }) {
  const raw =
    (hotel.images && hotel.images[0]) ||
    hotel.imageUrl ||
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80";

  return (
    <article className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white shadow hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
        <img
          src={getFullImageUrl(raw)}
          alt={hotel.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-4 sm:p-5">
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{hotel.name}</h3>
        <p className="text-xs font-medium text-slate-700">{hotel.location || "Location not available"}</p>
        <div className="flex items-center gap-1">
          {Array.from({ length: hotel.starRating || 3 }, (_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
        </div>
        <p className="text-sm font-semibold text-slate-900">₹{hotel.minPrice} - ₹{hotel.maxPrice}</p>
        <Link
          to={`/hotels/${hotel._id}`}
          className="mt-auto rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-extrabold text-white hover:bg-slate-800"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
