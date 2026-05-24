import { useEffect, useState } from "react";
import { fetchProperties } from "../api/propertiesApi"; // Your API function to fetch properties
import PropertyCard from "./PropertyCard";               // Component for displaying property cards

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProperties();
        // If you want to show only properties in Nainital, filter here:
        const nainitalProperties = data.filter(p => 
          p.location.toLowerCase().includes("nainital")
        );
        setProperties(nainitalProperties);
      } catch (err) {
        setError("Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if(loading) return <div className="text-center py-10">Loading properties…</div>;
  if(error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if(properties.length === 0) return <div className="text-center py-10">No properties available.</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Properties in Nainital</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
}