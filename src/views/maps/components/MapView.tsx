import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { CircleDot } from "lucide-react";
import { GeoButtons, GeofenceLayer } from "../../zones";
import WeatherEffects from "./WeatherEffects";
import { WeatherType } from "../../zones/types/Zone";

interface MapViewProps {
  height?: string;
  handleFlyToZone?: (lat: number, lng: number) => void;
  onFlyEnd?: (lat: number, lng: number) => void;
  coordinates?: [number, number];
  zoom?: number;
  tipoClima?: WeatherType;
  temperatura?: number;
  viento?: number;
  precipitacion?: number;
  fecha?: string;
}

interface WeatherEffectsControllerProps {
  weatherType: WeatherType;
  temperatura?: number;
  viento?: number;
  precipitacion?: number;
  fecha?: string;
}

const ResizeMap = ({ height }: { height: string }) => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [height, map]);
  return null;
};

const MapCenterUpdater = ({
  coordinates,
  zoom,
}: {
  coordinates: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  const [isInitialZoom, setIsInitialZoom] = useState(true);

  useEffect(() => {
    if (coordinates) {
      if (isInitialZoom) {
        // Primera vez: solo centramos el mapa sin cambiar el zoom
        map.setView(coordinates, zoom);
        setIsInitialZoom(false);
      } else {
        // Siguientes actualizaciones: animación con zoom
        map.flyTo(coordinates, zoom, {
          duration: 2,
          easeLinearity: 0.5,
        });
      }
      map.invalidateSize();
    }
  }, [coordinates, map, isInitialZoom, zoom]);
  return null;
};

const WeatherEffectsController: React.FC<WeatherEffectsControllerProps> = ({ weatherType, temperatura, viento, precipitacion, fecha }) => {
  const map = useMap();
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());
  
  useEffect(() => {
    console.log('WeatherEffectsController - tipo de clima actual:', weatherType);
  }, [weatherType]);
  
  useEffect(() => {
    const handleZoomEnd = () => {
      setCurrentZoom(map.getZoom());
    };

    map.on("zoomend", handleZoomEnd);

    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [map]);

  return (
    <div
      className="leaflet-pane leaflet-overlay-pane"
      style={{
        zIndex: 999,
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {currentZoom > 6 && <WeatherEffects weatherType={weatherType} temperatura={temperatura} viento={viento} precipitacion={precipitacion} fecha={fecha} />}
    </div>
  );
};

const MapView = ({
  height = "100%",
  handleFlyToZone,
  onFlyEnd,
  coordinates,
  zoom = 8,
  tipoClima = "soleado",
  temperatura,
  viento,
  precipitacion,
  fecha
}: MapViewProps) => {
  const { BaseLayer, Overlay } = LayersControl;
  

  return (
    <div
      className="rounded-b-xl"
      style={{ height: height, width: "100%", position: "relative" }}
    >
      <MapContainer
        key={"default"}
        center={[-42.624623, -73.171303]}
        zoom={zoom}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <ResizeMap height={height} />
        {coordinates && (
          <MapCenterUpdater coordinates={coordinates} zoom={zoom || 10} />
        )}

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
          <Overlay checked name="Polígonos de Zonas">
            <GeofenceLayer />
          </Overlay>
          <Overlay checked name="Iconos de Zonas">
            <GeofenceLayer />
          </Overlay>
          <GeoButtons
            handleFlyToZone={handleFlyToZone}
            onFlyEnd={onFlyEnd}
            zoom={zoom}
          />
        </LayersControl>
        <WeatherEffectsController weatherType={tipoClima} temperatura={temperatura} viento={viento} precipitacion={precipitacion} fecha={fecha} />
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
