import { LayerGroup } from "react-leaflet";
import GeofencePolygon from "./GeofencePolygon";
import GeofenceMarker from "./GeofenceMarker";
import { useZones } from "../hooks/useZones";

import "leaflet/dist/leaflet.css";
import { WeatherType } from "../../../types/Trazabilidad";

interface GeofenceLayerProps {
  onZoneClick?: (name: string, clima?: WeatherType) => void;
  zoom?: number; // Nivel de zoom del mapa
}

const GeofenceLayer = ({ onZoneClick, zoom = 10 }: GeofenceLayerProps) => {
  const handleClick = (name: string, clima?: WeatherType) => {
    if (onZoneClick) {
      onZoneClick(name, clima);
    }
  };
    const { zones, loading } = useZones();

    if (loading) return "cargando...";

    return (
        <>
            {/* Capa de polígonos */}
            <LayerGroup>
                {zones.map((zone) => (
                    <GeofencePolygon
                        key={`polygon-${zone?.id}`}
                        name={zone.name || "Zona sin nombre"}
                        coordinates={zone.coordinates || []}
                        color={zone.color || "blue"}
                        onClick={() => handleClick(zone.name || "Zona sin nombre", zone.clima as WeatherType)}
                    />
                ))}
            </LayerGroup>

            {/* Capa de iconos */}
            <LayerGroup>
                {zones.map((zone) => (
                    <GeofenceMarker
                        key={`marker-${zone?.id}`}
                        name={zone.name || "Zona sin nombre"}
                        coordinates={zone.coordinates || []}
                        zoom={zoom}
                        onClick={() => handleClick(zone.name || "Zona sin nombre", zone.clima as WeatherType)}
                    />
                ))}
            </LayerGroup>
        </>
    );
};

export default GeofenceLayer;