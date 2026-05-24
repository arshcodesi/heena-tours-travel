import { useCallback, useEffect, useState } from "react";
import { fetchActiveTours } from "../api/toursApi";

export default function useTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchActiveTours();

      // ✅ FIX: correct field name
      const activeTours = data.filter((t) => t.isActive === true);

      setTours(activeTours);
    } catch (err) {
      setError(err.message || "Failed to load tours");
      setTours([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    tours,
    loading,
    error,
    reload: load
  };
}
