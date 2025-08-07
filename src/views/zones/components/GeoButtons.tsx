import { useState } from "react";
import { useZones } from "../hooks/useZones";
import { useMap } from "react-leaflet";
import Button from "../../../components/ui/Button";

type GeoButtonsProps = {
  handleFlyToZone?: (lat: number, lng: number) => void;
  onFlyEnd?: (lat: number, lng: number) => void;
  zoom?: number;
};

function GeoButtons({ handleFlyToZone, onFlyEnd }: GeoButtonsProps) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="absolute bottom-5 left-2 bg-bgt z-[9999] px-4 rounded">
        <Button onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? "Ocultar" : "Mostrar Concesiones"}
        </Button>
      </div>
      {openMenu && <MenuOptions handleFlyToZone={handleFlyToZone} onFlyEnd={onFlyEnd} />}
    </>
  );
}

type MenuOptionsProps = {
  handleFlyToZone?: (lat: number, lng: number) => void;
  onFlyEnd?: (lat: number, lng: number) => void;
  zoom?: number;
};

const MenuOptions = ({ handleFlyToZone, onFlyEnd, zoom }: MenuOptionsProps) => {
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
          {zones.map((zone) => {
            const [lat, lng] = zone.coordinates[1];
            return (
              <button
                key={zone.id}
                onClick={() => flyToZone(lat, lng)}
                className="bg-[#07191e] py-2 px-2  text-white/90 hover:bg-[#1e3035] flex justify-start items-center border-b border-b-sky-300"
                style={{
                  borderLeftColor: zone.color,
                  borderLeftStyle: "solid",
                  borderLeftWidth: 5,
                }}
              >
                <small className="text-[10px] ">{zone.name}</small>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default GeoButtons;
