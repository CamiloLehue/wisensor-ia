import { Icon } from "leaflet";
import { Marker as LeafletMarker } from "react-leaflet";
import concesionIcon from "../../../assets/img/concesion.png";

interface GeofenceMarkerProps {
    coordinates: [number, number][];
    name: string;
}

const GeofenceMarker = ({ coordinates, name }: GeofenceMarkerProps) => {
    // Calculamos el centro del polígono para colocar el marcador
    const center = coordinates.reduce(
        (acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]],
        [0, 0]
    ).map(coord => coord / coordinates.length) as [number, number];

    const customIcon = new Icon({
        iconUrl: concesionIcon,
        iconSize: [200, 130], // Tamaño del icono
        iconAnchor: [60, 60], // Punto de anclaje del icono (centro)
        popupAnchor: [0, -100], // Punto donde se abrirá el popup
    });

    return (
        <LeafletMarker 
            position={center}
            icon={customIcon}
            title={name}
        />
    );
};

export default GeofenceMarker;
