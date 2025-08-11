import { LayerGroup } from "react-leaflet";
import GeofencePolygon from "./GeofencePolygon";
import GeofenceMarker from "./GeofenceMarker";
import { useZones } from "../hooks/useZones";

const GeofenceLayer = () => {
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
                    />
                ))}
            </LayerGroup>
        </>
    );
};

export default GeofenceLayer;