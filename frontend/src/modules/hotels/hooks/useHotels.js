import { useState, useEffect, useCallback } from "react";
import { fetchHotels, fetchHotelById } from "../api/hotelsApi";

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHotels();
      setHotels(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  return { hotels, loading, error, refetch: loadHotels };
};

export const useHotel = (id) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadHotel = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHotelById(id);
        setHotel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHotel();
  }, [id]);

  return { hotel, loading, error };
};
