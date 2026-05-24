import { useHotels } from "../hooks/useHotels";
import HotelCard from "./HotelCard";

export default function HotelsPage() {
  const { hotels, loading, error } = useHotels();

  if (loading) return <div className="text-center py-10">Loading hotels...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (hotels.length === 0) return <div className="text-center py-10">No hotels available.</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Hotels</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}