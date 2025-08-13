import React, { useEffect } from 'react';
import { WiRain, WiDirectionDownRight, WiHumidity, WiCelsius, WiCloudy, WiDaySunny } from 'react-icons/wi';

interface MapHeaderProps {
  weatherType: 'lluvioso' | 'nublado' | 'soleado';
  temperatura?: number;
  viento?: number;
  precipitacion?: number;
}

const MapHeader: React.FC<MapHeaderProps> = ({ weatherType, temperatura, viento, precipitacion }) => {
  // Add a debug element to show if the component is rendering at all
  console.log('MapHeader rendering with', { weatherType, temperatura, viento, precipitacion });
  
  // Force conversion to numbers to ensure proper display
  const tempNumber = temperatura !== undefined ? Number(temperatura) : undefined;
  const vientoNumber = viento !== undefined ? Number(viento) : undefined;
  const precipNumber = precipitacion !== undefined ? Number(precipitacion) : undefined;
  // Log cuando cambian los valores
  useEffect(() => {
    console.log('MapHeader - PROPS RAW:', { weatherType, temperatura, viento, precipitacion });
    console.log('MapHeader - Datos climáticos recibidos:', { 
      weatherType, 
      temperatura: temperatura !== undefined ? temperatura : 'undefined', 
      viento: viento !== undefined ? viento : 'undefined', 
      precipitacion: precipitacion !== undefined ? precipitacion : 'undefined',
      typeOfTemperatura: typeof temperatura,
      typeOfViento: typeof viento,
      typeOfPrecipitacion: typeof precipitacion
    });
  }, [weatherType, temperatura, viento, precipitacion]);
  
  return (
    temperatura !== undefined  &&
    <div className="absolute right-2 top-3 w-full h-15">
      {weatherType === "lluvioso" && (
        <div className="bg-gradient-to-br from-white/20 backdrop-blur-lg grid grid-cols-4 border-t shadow-md border-t-white/40 to-gray-200/10 w-[85%] h-full rounded-lg mx-auto">
          <article className="flex items-center">
            <div>
              <WiRain className="text-5xl text-sky-300" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Clima Actual</small>
              <p className="text-base">Lluvioso</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiDirectionDownRight className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Velocidad del viento</small>
              <p className="text-base">{vientoNumber !== undefined ? `${vientoNumber.toFixed(2)} km/h` : 'Sur Este'}</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiHumidity className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Precipitación</small>
              <p className="text-base">{precipNumber !== undefined ? `${precipNumber.toFixed(2)} mm` : 'Moderada'}</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiCelsius className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Temperatura</small>
              <p className="text-base">{tempNumber !== undefined ? `${tempNumber.toFixed(2)} °C` : '7 °C'}</p>
            </div>
          </article>
        </div>
      )}
      {weatherType === "nublado" && (
        <div className="bg-gradient-to-br from-white/20 backdrop-blur-lg grid grid-cols-4 border-t shadow-md border-t-white/40 to-gray-200/10 w-[85%] h-full rounded-lg mx-auto">
          <article className="flex items-center">
            <div>
              <WiCloudy className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Clima Actual</small>
              <p className="text-base">Nublado</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiDirectionDownRight className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Velocidad del viento</small>
              <p className="text-base">{vientoNumber !== undefined ? `${vientoNumber.toFixed(2)} km/h` : 'Sur Este'}</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiHumidity className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Precipitación</small>
              <p className="text-base">{precipNumber !== undefined ? `${precipNumber.toFixed(2)} mm` : 'Baja'}</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiCelsius className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Temperatura</small>
              <p className="text-base">{tempNumber !== undefined ? `${tempNumber.toFixed(2)} °C` : '7 °C'}</p>
            </div>
          </article>
        </div>
      )}
      {weatherType === "soleado" && (
        <div className="bg-gradient-to-br from-white/20 backdrop-blur-lg grid grid-cols-4 border-t shadow-md border-t-white/40 to-gray-200/10 w-[85%] h-full rounded-lg mx-auto">
          <article className="flex items-center">
            <div>
              <WiDaySunny className="text-5xl text-amber-300" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Clima Actual</small>
              <p className="text-base">Soleado</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiDirectionDownRight className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Velocidad del viento</small>
              <p className="text-base">{vientoNumber !== undefined ? `${vientoNumber.toFixed(2)} km/h` : 'Sur Este'}</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiHumidity className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Precipitación</small>
              <p className="text-base">{precipNumber !== undefined ? `${precipNumber.toFixed(2)} mm` : '0 mm'}</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiCelsius className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Temperatura</small>
              <p className="text-base">{tempNumber !== undefined ? `${tempNumber.toFixed(2)} °C` : '7 °C'}</p>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default MapHeader;
