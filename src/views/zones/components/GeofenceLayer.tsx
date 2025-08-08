import GeofencePolygon from "./GeofencePolygon";
import { useZones } from "../hooks/useZones";

const GeofenceLayer = () => {
    const { zones, loading } = useZones();

    if (loading) return "cargando...";
    

    return (
        <>
            {zones.map((zone) => (
                <GeofencePolygon
                    key={zone?.id}
                    name={zone.name || "Zona sin nombre"}
                    coordinates={zone.coordinates || []}
                    color={zone.color || "blue"}
                />
            ))}
        </>
    );
};

export default GeofenceLayer;