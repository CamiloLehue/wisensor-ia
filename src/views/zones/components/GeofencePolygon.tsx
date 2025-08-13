import { Polygon, Popup, Marker } from "react-leaflet";
import L from "leaflet";

interface GeofencePolygonProps {
  name: string;
  coordinates: [number, number][];
  color?: string;
  onClick?: () => void;
}

const GeofencePolygon: React.FC<GeofencePolygonProps> = ({
  name,
  coordinates,
  color = "blue",
  onClick,
}) => {
  const latSum = coordinates.reduce((sum, [lat]) => sum + lat, 0);
  const lngSum = coordinates.reduce((sum, [, lng]) => sum + lng, 0);
  const center: [number, number] = [
    latSum / coordinates.length,
    lngSum / coordinates.length,
  ];

  const textIcon = L.divIcon({
    className: "polygon-label",
    html: `<div style="color:white; text-wrap: nowrap;  font-weight:bold; font-size:10px; text-shadow: 1px 1px 2px black;">${name}</div>`,
    iconSize: [100, 20],
  });

  return (
    <>
      <Polygon
        positions={coordinates}
        pathOptions={{
          color,
          fillOpacity: 0.1,
          fill: true,
          fillColor: color,
          weight: 0.5,
        }}
        eventHandlers={{
          click: onClick,
        }}
      >
        <Popup>{name}</Popup>
      </Polygon>

      <Marker position={center} icon={textIcon} interactive={false} />
    </>
  );
};

export default GeofencePolygon;
