import React, { useState, useEffect } from "react";

type WeatherType = "soleado" | "lluvioso" | "nublado";

interface WeatherEffectsProps {
  weatherType: WeatherType; // La prop que determinará el clima a mostrar
}

interface Raindrop {
  id: number;
  left: number; // Posición horizontal en porcentaje (0-100)
  animationDuration: number; // Duración de la animación en segundos
  animationDelay: number; // Retraso de la animación en segundos
  size: number; // Tamaño de la gota en píxeles
}

const WeatherEffects: React.FC<WeatherEffectsProps> = ({ weatherType }) => {
  // Estado para almacenar las propiedades de las gotas de lluvia (solo relevantes para 'lluvioso')
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  // Número total de gotas de lluvia a renderizar
  const numRaindrops: number = 150;

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
      ? "bg-gradient-to-b from-blue-500/70 to-yellow-200/20 "
      : weatherType === "nublado"
      ? "bg-gradient-to-b from-gray-800 to-gray-600 opacity-20"
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-bl from-amber-300 to-amber-500 rounded-full shadow-lg shadow-amber-600/50 z-10 animate-pulse-light"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-yellow-500 to-transparent opacity-30 animate-spin-slow"></div>
        </>
      )}

      {weatherType === "nublado" && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-32 bg-gray-400 rounded-full blur-md opacity-60 animate-cloud-move-1"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-40 bg-gray-500 rounded-full blur-md opacity-70 animate-cloud-move-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-36 bg-gray-400 rounded-full blur-md opacity-50 animate-cloud-move-3"></div>
        </>
      )}

      <style>
        {`
         
        `}
      </style>
    </div>
  );
};

export default WeatherEffects;
