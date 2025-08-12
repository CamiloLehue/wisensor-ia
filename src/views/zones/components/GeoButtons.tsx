import { useState } from "react";
import { useZones } from "../hooks/useZones";
import { useMap } from "react-leaflet";
import Button from "../../../components/ui/Button";
import { CircleChevronRight } from "lucide-react";
import { WeatherType } from "../../../types/Trazabilidad";

type GeoButtonsProps = {
  handleFlyToZone?: (lat: number, lng: number) => void;
  onFlyEnd?: (lat: number, lng: number) => void;
  onZoneClick?: (name: string, clima?: WeatherType) => void;
  zoom?: number;
};

function GeoButtons({ handleFlyToZone, onFlyEnd, onZoneClick }: GeoButtonsProps) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="absolute bottom-5 left-2 bg-bgt z-[9999] px-4 rounded">
        <Button onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? "Ocultar" : "Mostrar Concesiones"}
        </Button>
      </div>
      {openMenu && (
        <MenuOptions handleFlyToZone={handleFlyToZone} onFlyEnd={onFlyEnd} onZoneClick={onZoneClick} />
      )}
    </>
  );
}

type MenuOptionsProps = {
  handleFlyToZone?: (lat: number, lng: number) => void;
  onFlyEnd?: (lat: number, lng: number) => void;
  onZoneClick?: (name: string, clima?: WeatherType) => void;
  zoom?: number;
};

const MenuOptions = ({ handleFlyToZone, onFlyEnd, onZoneClick, zoom }: MenuOptionsProps) => {
  const { zones, loading } = useZones();
  const map = useMap();

  if (loading) return null;

  const flyToZone = (lat: number, lng: number) => {
    map.flyTo([lat, lng], zoom, {
      animate: true,
      duration: 1.5,
    });
    if (handleFlyToZone) {
      handleFlyToZone(lat, lng);
    }
    if (onFlyEnd) {
      setTimeout(() => {
        onFlyEnd(lat, lng);
      }, 1500); // igual a la duración de la animación
    }
  };

  return (
    <div className="absolute bottom-15 left-2 z-[9999] bg-gradient-to-bl to-[#ffca2d] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg ">
      <div className=" bg-[#08141e] w-[240px]  rounded-lg border border-[#182a38] shadow-lg">
        <div className="flex flex-col gap-0.5 py-2">
          {zones
            .sort((a, b) => b.name.localeCompare(a.name))
            .map((zone) => {
              const [lat, lng] = zone.coordinates[1] || [0, 0];
              return zone.color === "gray" ? (
                <button
                  key={zone.id || 0}
                  onClick={() => {
                    flyToZone(lat, lng);
                    if (onZoneClick) {
                      onZoneClick(zone.name || "Zona desconocida", zone.clima as WeatherType);
                    }
                  }}
                  className="bg-[#595e5f] py-2 px-2  flex justify-between text-white/50  items-center border-b border-b-sky-300"
                  style={{
                    borderLeftColor: zone.color || "transparent",
                    borderLeftStyle: "solid",
                    borderLeftWidth: 5,
                  }}
                >
                  <small className="text-[10px] ">
                    {zone.name || "Zona desconocida"}{" "}
                  </small>
                  <CircleChevronRight />
                </button>
              ) : (
                <button
                  key={zone.id || 0}
                  onClick={() => {
                    flyToZone(lat, lng);
                    if (onZoneClick) {
                      onZoneClick(zone.name || "Zona desconocida", zone.clima as WeatherType);
                    }
                  }}
                  className="group bg-[#07191e] py-2 px-2 flex justify-between cursor-pointer  text-white/90 hover:bg-[#1e3035] items-center border-b border-b-sky-300"
                  style={{
                    borderLeftColor: zone.color || "transparent",
                    borderLeftStyle: "solid",
                    borderLeftWidth: 5,
                  }}
                >
                  <small className="text-[10px] group-hover:text-sky-500 ">
                    {zone.name || "Zona desconocida"}{" "}
                  </small>
                  <CircleChevronRight className="text-sky-400 group-hover:scale-90 transition-all duration-300 " />
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default GeoButtons;
