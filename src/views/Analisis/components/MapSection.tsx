import React, { useEffect } from 'react';
import { MapView } from '../../maps/index.js';

import { WeatherType } from '../../zones/types/Zone';

interface MapSectionProps {
  handleFlyToZone: (lat: number, lng: number) => void;
  onFlyEnd: (lat: number, lng: number) => void;
  coordinates: [number, number];
  zoom: number;
  tipoClima: WeatherType;
}

export const MapSection: React.FC<MapSectionProps> = ({
  handleFlyToZone,
  onFlyEnd,
  coordinates,
  zoom,
  tipoClima,
}) => {
  useEffect(() => {
    console.log("MapSection recibió tipoClima:", tipoClima);
  }, [tipoClima]);
  return (
    <div className="bg-[#08141e] w-5/12 h-full flex flex-col z-0 rounded-lg border border-[#182a38] shadow-lg">
      <div className="flex-1 rounded-md overflow-hidden">
        <MapView
          handleFlyToZone={handleFlyToZone}
          onFlyEnd={onFlyEnd}
          coordinates={coordinates}
          zoom={zoom}
          tipoClima={tipoClima}
        />
      </div>
    </div>
  );
};