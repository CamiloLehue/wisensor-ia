import { useState, useEffect } from 'react';
import { getCenters, Center } from '../../Configuracion/sections/services/centersService';

export const useCentersData = ( ) => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setLoading(true);
        const data = await getCenters();
        setCenters(data);
      } catch (err) {
        console.error("Error fetching centers:", err);
        setError("Failed to load centers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []); 

  return { centers, loading, error };
}; 