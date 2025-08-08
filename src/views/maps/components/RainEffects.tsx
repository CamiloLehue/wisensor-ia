import React, { useState, useEffect } from 'react';

// Define la interfaz para las propiedades de cada gota de lluvia
interface Raindrop {
  id: number;
  left: number; // Posición horizontal en porcentaje (0-100)
  animationDuration: number; // Duración de la animación en segundos
  animationDelay: number; // Retraso de la animación en segundos
  size: number; // Tamaño de la gota en píxeles
}

// Componente principal de la aplicación que simula la lluvia
const RainEffects: React.FC = () => {
  // Estado para almacenar las propiedades de cada gota de lluvia, tipado como un array de Raindrop
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  // Número total de gotas de lluvia a renderizar
  const numRaindrops: number = 150;

  useEffect(() => {
    // Genera las propiedades iniciales para cada gota de lluvia al montar el componente
    const newRaindrops: Raindrop[] = Array.from({ length: numRaindrops }).map((_, index) => ({
      id: index, // ID único para cada gota (usado como 'key' en React)
      left: Math.random() * 100, // Posición horizontal aleatoria (0-100% del ancho)
      animationDuration: Math.random() * 1.5 + 0.5, // Duración de la animación aleatoria (entre 0.5s y 2s)
      animationDelay: Math.random() * 2, // Retraso de la animación aleatorio (hasta 2s)
      size: Math.random() * 1.5 + 0.8, // Tamaño de la gota aleatorio (entre 0.8px y 2.3px)
    }));
    setRaindrops(newRaindrops); // Actualiza el estado con las nuevas gotas
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  return (
    <div className="relative h-screen w-full overflow-hidden  flex items-center justify-center">
      {/* Capa de fondo con un degradado sutil para dar profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-800 opacity-30"></div>

      {/* Contenedor de las gotas de lluvia */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Mapea sobre el array de raindrops para renderizar cada gota */}
        {raindrops.map((drop: Raindrop) => (
          <div
            key={drop.id} // Clave única para la optimización de React
            className="absolute bg-blue-300 opacity-70 rounded-full"
            style={{
              left: `${drop.left}%`, // Posición horizontal de la gota
              width: `${drop.size}px`, // Ancho de la gota
              height: `${drop.size * 5}px`, // Altura de la gota (para un efecto de "rastro" o "línea")
              // Aplica la animación 'fall' con duración y retraso específicos para cada gota
              animation: `fall ${drop.animationDuration}s linear infinite`,
              animationDelay: `${drop.animationDelay}s`,
              transform: `translateX(-50%)`, // Centra la gota horizontalmente
              filter: 'blur(0.5px)', // Añade un ligero desenfoque para un aspecto más natural
            }}
          ></div>
        ))}
      </div>

      {/* Definición de la animación CSS 'fall' directamente en el componente */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100%) translateX(-50%); /* Empieza arriba, fuera de la vista */
              opacity: 0; /* Totalmente transparente al inicio */
            }
            10% {
              opacity: 0.7; /* Se vuelve visible rápidamente */
            }
            90% {
              opacity: 0.7; /* Permanece visible durante la mayor parte de la caída */
            }
            100% {
              transform: translateY(100vh) translateX(-50%); /* Termina abajo, fuera de la vista */
              opacity: 0; /* Se vuelve transparente al final */
            }
          }
        `}
      </style>

     
    </div>
  );
};

export default RainEffects;
