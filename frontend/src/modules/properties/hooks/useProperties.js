import { useState, useEffect } from "react";
import { fetchProperties, fetchPropertyById } from "../api/propertiesApi";

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  return { properties, loading, error, refetch: () => loadProperties() };
};

export const useProperty = (id) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const loadProperty = async () => {
      try {
        const data = await fetchPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  return { property, loading, error };
};