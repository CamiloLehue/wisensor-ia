import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LatLngExpression } from "leaflet";

type UseReverseLayerReturn = {
  route: LatLngExpression[] | null;
  loading: boolean;
  error: string | null;
};

export const useReverseLayer = (
  originDestiny?: LatLngExpression[] | null
): UseReverseLayerReturn => {
  const [route, setRoute] = useState<LatLngExpression[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const lastOriginDestiny = useRef<string | null>(null); // para comparar

  const fetchRoute = async (origin: LatLngExpression, destination: LatLngExpression) => {
    try {
      setLoading(true);
      setError(null);

      const [originLat, originLng] = origin as [number, number];
      const [destLat, destLng] = destination as [number, number];

      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${originLng},${originLat};${destLng},${destLat}`,
        {
          params: {
            geometries: "geojson",
            overview: "full",
            steps: true,
            alternatives: false,
            access_token: "pk.eyJ1IjoidHJ5NGxpZmUiLCJhIjoiY204MzJneXlzMW13bjJrcHRzcmFhbHd5bCJ9.6h0-bNxJDc7QWPFSGI_1ew",
          },
        }
      );

      const coordinates = response.data.routes[0]?.geometry?.coordinates;
      const leafletCoords: LatLngExpression[] = coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
      );

      setRoute(leafletCoords);
    } catch (err) {
      console.error("Error al obtener la ruta de Mapbox:", err);
      setError("No se pudo obtener la ruta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      originDestiny &&
      originDestiny.length === 2 &&
      originDestiny[0] &&
      originDestiny[1]
    ) {
      const currentKey = JSON.stringify(originDestiny);

      if (currentKey !== lastOriginDestiny.current) {
        lastOriginDestiny.current = currentKey;
        fetchRoute(originDestiny[0], originDestiny[1]);
      }
    } else {
      setRoute(null);
    }
  }, [originDestiny]);

  return { route, loading, error };
};