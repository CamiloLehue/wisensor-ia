import { Icon } from "leaflet";
import { Marker as LeafletMarker } from "react-leaflet";
import concesionIcon from "../../../assets/img/concesion.png";

interface GeofenceMarkerProps {
    coordinates: [number, number][];
    name: string;
    zoom: number; // Nivel de zoom del mapa
    onClick?: () => void;
}

const GeofenceMarker = ({ coordinates, name, zoom, onClick }: GeofenceMarkerProps) => {
    // Calculamos el centro del polígono para colocar el marcador
    const center = coordinates.reduce(
        (acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]],
        [0, 0]
    ).map(coord => coord / coordinates.length) as [number, number];

    // Función para calcular el área aproximada del polígono usando la fórmula del área de Shoelace
    const calculatePolygonArea = (coords: [number, number][]): number => {
        let area = 0;
        for (let i = 0; i < coords.length; i++) {
            const j = (i + 1) % coords.length;
            area += coords[i][0] * coords[j][1];
            area -= coords[j][0] * coords[i][1];
        }
        return Math.abs(area) / 2;
    };

    // Calculamos el área y determinamos el tamaño del icono
    const polygonArea = calculatePolygonArea(coordinates);
    
    // Factor de escala basado en el zoom (zoom típico va de 1 a 18+)
    const minZoom = 7;  // Zoom mínimo considerado
    const maxZoom = 16; // Zoom máximo considerado
    const normalizedZoom = Math.max(0, Math.min(1, (zoom - minZoom) / (maxZoom - minZoom)));
    const zoomMultiplier = 0.2 + (normalizedZoom * 0.8); // Factor de 0.2 a 1.0
    
    // Escalamos el tamaño basado en el área del polígono
    const minBaseSize = 100;  // Tamaño base mínimo
    const maxBaseSize = 900; // Tamaño base máximo
    const areaThreshold = 0.01; // Área de referencia para el escalado
    
    // Calculamos el factor de escala logarítmico para una mejor distribución
    const areaSizeFactor = Math.log(polygonArea / areaThreshold + 1) / Math.log(10);
    const baseIconWidth = Math.max(minBaseSize, Math.min(maxBaseSize, minBaseSize + areaSizeFactor * 35));
    
    // Aplicamos el factor de zoom al tamaño base
    const iconWidth = baseIconWidth * zoomMultiplier;
    const iconHeight = iconWidth * 0.6; // Mantenemos la proporción original (60/100)

    const customIcon = new Icon({
        iconUrl: concesionIcon,
        iconSize: [iconWidth, iconHeight],
        iconAnchor: [iconWidth / 2, iconHeight], // Centro horizontal, parte inferior vertical
        popupAnchor: [0, -iconHeight], // Popup aparece arriba del icono
    });

    return (
        <LeafletMarker 
            position={center}
            icon={customIcon}
            title={`${name} (Área: ${polygonArea.toFixed(4)}, Zoom: ${zoom})`}
            zIndexOffset={-1000}
            eventHandlers={{
                click: onClick,
            }}
        />
    );
};

export default GeofenceMarker;
