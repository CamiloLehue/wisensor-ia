import { WiRain, WiDirectionDownRight, WiHumidity, WiCelsius, WiCloudy, WiDaySunny } from 'react-icons/wi';

interface MapHeaderProps {
  weatherType: 'lluvioso' | 'nublado' | 'soleado';
}

const MapHeader: React.FC<MapHeaderProps> = ({ weatherType }) => {
  return (
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
              <small>Dirección del viento</small>
              <p className="text-base">Sur Este</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiHumidity className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Humedad</small>
              <p className="text-base">Sur Este</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiCelsius className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Temperatura</small>
              <p className="text-base">7 °C</p>
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
              <small>Dirección del viento</small>
              <p className="text-base">Sur Este</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiHumidity className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Humedad</small>
              <p className="text-base">Sur Este</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiCelsius className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Temperatura</small>
              <p className="text-base">7 °C</p>
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
              <small>Dirección del viento</small>
              <p className="text-base">Sur Este</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiHumidity className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Humedad</small>
              <p className="text-base">Sur Este</p>
            </div>
          </article>
          <article className="flex items-center">
            <div>
              <WiCelsius className="text-5xl" />
            </div>
            <div className="px-3 py-1 text-nowrap">
              <small>Temperatura</small>
              <p className="text-base">7 °C</p>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default MapHeader;
