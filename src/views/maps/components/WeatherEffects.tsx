import React, { useState, useEffect } from "react";
import { WiTime3 } from "react-icons/wi";
import MapHeader from "./MapHeader";
import { WeatherType } from "../../zones/types/Zone";

interface WeatherEffectsProps {
  weatherType: WeatherType; // La prop que determinará el clima a mostrar
  temperatura?: number;
  viento?: number;
  precipitacion?: number;
  fecha?: string; // Fecha del centro desde la respuesta del servidor
}

interface Raindrop {
  id: number;
  left: number; // Posición horizontal en porcentaje (0-100)
  animationDuration: number; // Duración de la animación en segundos
  animationDelay: number; // Retraso de la animación en segundos
  size: number; // Tamaño de la gota en píxeles
}

const WeatherEffects: React.FC<WeatherEffectsProps> = ({
  weatherType,
  temperatura,
  viento,
  precipitacion,
  fecha,
}) => {
  // Estado para almacenar las propiedades de las gotas de lluvia (solo relevantes para 'lluvioso')
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  // Número total de gotas de lluvia a renderizar
  const numRaindrops: number = 150;

  useEffect(() => {
    console.log("WeatherEffects recibió nuevo clima:", weatherType);
  }, [weatherType]);

  // Log datos climáticos cuando cambian
  useEffect(() => {
    console.log("WeatherEffects recibió datos climáticos:", {
      temperatura,
      viento,
      precipitacion,
      fecha,
    });
  }, [temperatura, viento, precipitacion, fecha]);

  // Efecto para generar las gotas de lluvia solo cuando el clima es 'lluvioso'
  useEffect(() => {
    if (weatherType === "lluvioso") {
      // Genera propiedades aleatorias para cada gota de lluvia
      const newRaindrops: Raindrop[] = Array.from({ length: numRaindrops }).map(
        (_, index) => ({
          id: index,
          left: Math.random() * 100,
          animationDuration: Math.random() * 1.5 + 0.5, // Duración entre 0.5s y 2s
          animationDelay: Math.random() * 2, // Retraso hasta 2s
          size: Math.random() * 1.5 + 0.8, // Tamaño entre 0.8px y 2.3px
        })
      );
      setRaindrops(newRaindrops); // Actualiza el estado con las gotas generadas
    } else {
      setRaindrops([]); // Limpia las gotas si no es clima lluvioso
    }
  }, [weatherType]); // Se re-ejecuta cuando 'weatherType' cambia

  //   const mainBackgroundClass =
  //     weatherType === 'soleado'
  //       ? 'bg-blue-300/20'
  //       : weatherType === 'nublado'
  //       ? 'bg-gray-700'
  //       : 'bg-gray-900/20';

  const gradientBackgroundClass =
    weatherType === "soleado"
      ? "bg-gradient-to-b from-amber-500/10 to-blue-500/70 "
      : weatherType === "nublado"
      ? "bg-gradient-to-b via-gray-100/20 from-gray-800/70 to-gray-600/20 "
      : "bg-gradient-to-b from-blue-500/40 to-gray-900/40 ";

  //   const weatherMessage =
  //     weatherType === 'soleado'
  //       ? '¡Día Soleado! ☀️'
  //       : weatherType === 'lluvioso'
  //       ? '¡Que llueva! 🌧️'
  //       : 'Día Nublado ☁️';

  return (
    <div
      className={`relative h-screen w-full overflow-hidden flex items-center justify-center`}
    >
      <div className={`absolute inset-0 ${gradientBackgroundClass}`}></div>
      {/* Ensure MapHeader has highest z-index to be visible */}
      <div className="absolute inset-0 z-[9999]">
        <MapHeader
          weatherType={weatherType}
          temperatura={temperatura}
          viento={viento}
          precipitacion={precipitacion}
        />
      </div>

      {weatherType === "lluvioso" && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {raindrops.map((drop: Raindrop) => (
            <div
              key={drop.id}
              className="absolute bg-blue-300 opacity-70 rounded-full"
              style={{
                left: `${drop.left}%`,
                width: `${drop.size}px`,
                height: `${drop.size * 5}px`,
                animation: `fall ${drop.animationDuration}s linear infinite`,
                animationDelay: `${drop.animationDelay}s`,
                transform: `translateX(-50%)`,
                filter: "blur(0.5px)",
              }}
            ></div>
          ))}
        </div>
      )}

      {weatherType === "soleado" && (
        <>
          {/* Sol central */}
          <div className="absolute top-27 left-10 w-10 h-10 bg-gradient-to-bl from-amber-300 to-amber-500 rounded-full shadow-lg shadow-amber-600/50 z-20"></div>

          {/* Resplandor base */}
          <div className="absolute top-25 left-7 w-14 h-14 rounded-full bg-yellow-500/30 blur-md pulse-glow z-10"></div>

          {/* Resplandor exterior con animación */}
          <div className="absolute -top-17 -left-27 w-80 h-80 rounded-full bg-gradient-to-r from-amber-400/50 to-transparent sun-glow z-[5]"></div>
          <div className="absolute -top-17 -left-27 w-80 h-80 rounded-full bg-gradient-to-r from-amber-400/50 to-transparent sun-glow2 z-[5]"></div>

          {/* Rayos de sol giratorios */}
          {/* <div className="absolute top-18 -left-4 blur-[2px]  w-32 h-32 sun-rays z-[15]">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-16 bg-gradient-to-t from-yellow-400/50 to-transparent"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: "0 0",
                }}
              ></div>
            ))}
          </div> */}

          {/* Halo exterior extra */}
          <div className="absolute -top-12 -right-24 w-96 h-96 rounded-full bg-gradient-radial from-yellow-500/20 via-yellow-500/5 to-transparent"></div>
        </>
      )}

      {weatherType === "nublado" && (
        <>
          {/* Nubes superiores */}
          <div className="absolute top-0 left-0 right-0 h-48 ">
            {/* Capa de nubes principal superior */}

            {/* Nubes individuales flotantes superiores */}
            <div className="absolute top-5 left-1/4 w-64 h-32">
              <div className="w-full h-full bg-gradient-to-b from-gray-300/60 to-gray-400/50 rounded-full blur-2xl cloud-float-1"></div>
            </div>
            <div className="absolute top-2 right-1/4 w-80 h-40">
              <div className="w-full h-full bg-gradient-to-b from-gray-400/60 to-gray-500 rounded-full blur-2xl cloud-float-2"></div>
            </div>
            <div className="absolute top-8 left-2/3 w-72 h-36">
              <div className="w-full h-full bg-gradient-to-b from-gray-300/60 to-gray-400/50 rounded-full blur-2xl cloud-float-3"></div>
            </div>
          </div>

          {/* Nubes inferiores */}
          <div className="absolute bottom-0 left-0 right-0 h-48  transform rotate-180">
            {/* Capa de nubes principal inferior */}

            {/* Nubes individuales flotantes inferiores */}
            <div className="absolute top-5 left-1/3 w-64 h-32">
              <div
                className="w-full h-full bg-gradient-to-b from-gray-300/60 to-gray-400/50 rounded-full blur-2xl cloud-float-1"
                style={{ animationDelay: "-4s" }}
              ></div>
            </div>
            <div className="absolute top-2 right-1/3 w-80 h-40">
              <div
                className="w-full h-full bg-gradient-to-b from-gray-400 to-gray-500 rounded-full blur-2xl cloud-float-2"
                style={{ animationDelay: "-6s" }}
              ></div>
            </div>
            <div className="absolute top-8 left-1/4 w-72 h-36">
              <div
                className="w-full h-full bg-gradient-to-b from-gray-300/60 to-gray-400/50 rounded-full blur-2xl cloud-float-3"
                style={{ animationDelay: "-2s" }}
              ></div>
            </div>
          </div>
        </>
      )}

      {/* Contenedor del indicador de clima (ya está incluido arriba) */}
      {/* <MapHeader weatherType={weatherType} /> */}
      {fecha && (weatherType === "nublado" ||
        weatherType === "soleado" ||
        weatherType === "lluvioso") && (
        <div className="absolute z-[9999] left-9 top-17 px-5 w-full h-10 ">
          <div className="  flex justify-start items-center  w-full gap-4 h-full  mx-auto">
            <article className="flex justify-center items-center gap-1 bg-red-500 border-t shadow-md border-t-red-400 rounded-lg px-4 py-1">
              <WiTime3 size={17} />
              <p className="text-nowrap">
                Fecha Histórica:{" "}
                <span className="text-lime-200">
                  {fecha
                    ? new Date(fecha).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "12 Julio 2025"}
                </span>
              </p>
            </article>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes sunGlow {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(5); opacity: 0.3; filter: blur(10px); }
          }

          @keyframes sunGlow2 {
            0% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(6); opacity: 0.2; filter: blur(10px); }
          }

          @keyframes sunRays {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes pulseGlow {
            0%, 100% { filter: blur(10px) brightness(1); }
            50% { filter: blur(15px) brightness(1.2); }
          }

          @keyframes floatCloud {
            0% { transform: translateX(-15%) scale(1); }
            50% { transform: translateX(15%) scale(2); }
            100% { transform: translateX(-15%) scale(1); }
          }

          @keyframes cloudPulse {
            0% { opacity: 0.6; filter: blur(8px); transform: translateX(-10%); }
            50% { opacity: 0.8; filter: blur(12px); transform: translateX(10%); }
            100% { opacity: 0.6; filter: blur(8px); transform: translateX(-10%); }
          }

          @keyframes cloudExpand {
            0% { transform: scaleX(1) translateX(-10%); }
            50% { transform: scaleX(3) translateX(10%); }
            100% { transform: scaleX(1) translateX(-10%); }
          }

          @keyframes floatCloudReverse {
            0% { transform: translateX(15%) scale(1); }
            50% { transform: translateX(-15%) scale(1.05); }
            100% { transform: translateX(15%) scale(1); }
          }

          @keyframes cloudDrift {
            0% { transform: translateX(-20%) scale(1); }
            33% { transform: translateX(0%) scale(2); }
            66% { transform: translateX(20%) scale(0.95); }
            100% { transform: translateX(-20%) scale(1); }
          }

          .cloud-float-1 {
            animation: floatCloud 20s ease-in-out infinite;
          }

          .cloud-float-2 {
            animation: floatCloudReverse 25s ease-in-out infinite;
          }

          .cloud-float-3 {
            animation: cloudDrift 30s ease-in-out infinite;
          }

          .cloud-pulse {
            animation: cloudPulse 15s ease-in-out infinite;
          }

          .cloud-expand {
            animation: cloudExpand 20s ease-in-out infinite;
          }

          .sun-glow {
            animation: sunGlow 10s ease-in-out infinite alternate forwards;
          }

          .sun-glow2 {
            animation: sunGlow2 5s  infinite alternate forwards;
            delay: 2s;
          }

          .sun-rays {
            animation: sunRays 20s linear infinite ;
          }

          .pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default WeatherEffects;

// MapHeader component moved to a separate file
