import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import { LatLngExpression } from "leaflet";
import { CircleDot } from "lucide-react";
import { GeoButtons, GeofenceLayer } from "../../zones";

interface MapViewProps {
  vehicleLastPosition?: [number, number];
  height?: string;
}

const MapCenterUpdater = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
    map.invalidateSize();
  }, [center, map]);
  return null;
};

const ResizeMap = ({ height }: { height: string }) => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [height, map]);
  return null;
};

const MapView = ({ height = "100%" }: MapViewProps) => {
  const { BaseLayer,Overlay } = LayersControl;

  return (
    <div
      className="rounded-b-xl"
      style={{ height: height, width: "100%", position: "relative" }}
    >
      <MapContainer
        key={"default"}
        center={[-42.624623, -73.171303]}
        zoom={8}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <ResizeMap height={height} />
        {<MapCenterUpdater center={[-42.624623, -73.171303]} />}

        <LayersControl position="topright">
          <BaseLayer checked name="Esri Satellite">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              opacity={0.2}
            />
          </BaseLayer>
          <Overlay checked name="Zonas Geográficas">
            <GeofenceLayer />
          </Overlay>
         <GeoButtons />
        </LayersControl>
      </MapContainer>

      <div className="absolute bottom-5 right-2 z-[999] flex flex-col gap-2 items-end">
        <div className="bg-gradient-to-bl to-[#ffca2d] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg ">
          <div className="flex items-center gap-2 bg-[#08141e] px-3 py-1 rounded-lg shadow w-45">
            <CircleDot className="text-blue w-5 h-5 rotate-45 text-blue-500" />
            <span className="text-sm font-medium text-sky-50">Centros</span>
          </div>
        </div>
        <div className="bg-gradient-to-bl to-[#ffca2d] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg ">
          <div className="flex items-center gap-2 bg-[#08141e] px-3 py-1 rounded-lg shadow w-45">
            <CircleDot className="text-blue w-5 h-5 rotate-45 text-red-500" />
            <span className="text-sm font-medium text-sky-50 ">
              Concesiones
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-bl to-[#ffca2d] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg ">
          <div className="flex items-center gap-2 bg-[#08141e] px-3 py-1 rounded-lg shadow w-45">
            <CircleDot className="text-blue w-5 h-5 rotate-45 text-teal-400" />
            <span className="text-sm font-medium text-sky-50">Clorofila</span>
          </div>
        </div>
        <div className="bg-gradient-to-bl to-[#ffca2d] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg ">
          <div className="flex items-center gap-2 bg-[#08141e] px-3 py-1 rounded-lg shadow w-45">
            <CircleDot className="text-blue w-5 h-5 rotate-45 text-indigo-300" />
            <span className="text-sm font-medium text-sky-50">
              Áreas de Concesión
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
