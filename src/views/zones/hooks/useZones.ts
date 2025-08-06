import { useEffect, useState } from "react";
import { ZoneData, ApiZoneData } from "../types/Zone";
import { getZones } from "../services/zoneService";

export const useZones = () => {
  const [zones, setZones] = useState<ZoneData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const data: ApiZoneData[] = await getZones();
        setZones(data); // Los datos ya vienen en el formato correcto
      } catch (error) {
        console.error("Error al obtener zonas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  return { zones, loading };
};