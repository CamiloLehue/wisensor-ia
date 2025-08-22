import { useEffect, useState, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface EyePosition {
  x: number;
  y: number;
}

export const useEyeTracking = (containerRef: RefObject<HTMLDivElement | null>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [leftEyePosition, setLeftEyePosition] = useState<EyePosition>({ x: 0, y: 0 });
  const [rightEyePosition, setRightEyePosition] = useState<EyePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calcular la posición relativa del mouse respecto al centro del contenedor
      const relativeX = event.clientX - centerX;
      const relativeY = event.clientY - centerY;

      setMousePosition({ x: relativeX, y: relativeY });

      // Calcular las posiciones de los ojos basadas en la posición del mouse
      const maxMovement = 3; // Movimiento más sutil para ojos completos
      const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
      const maxDistance = 200; // Distancia reducida para más sutileza

      // Normalizar la distancia con una curva más suave
      const normalizedDistance = Math.min(Math.pow(distance / maxDistance, 0.8), 1);
      
      // Calcular el ángulo hacia el cursor
      const angle = Math.atan2(relativeY, relativeX);
      
      // Calcular las nuevas posiciones de los ojos con amortiguación
      const eyeMovementX = Math.cos(angle) * maxMovement * normalizedDistance;
      const eyeMovementY = Math.sin(angle) * maxMovement * normalizedDistance;

      // Posiciones base de los ojos en el SVG (centro de cada ojo)
      const leftEyeBase = { x: 85.45, y: 66.25 };
      const rightEyeBase = { x: 164.32, y: 66.25 };

      setLeftEyePosition({
        x: leftEyeBase.x + eyeMovementX,
        y: leftEyeBase.y + eyeMovementY
      });

      setRightEyePosition({
        x: rightEyeBase.x + eyeMovementX,
        y: rightEyeBase.y + eyeMovementY
      });
    };

    // Agregar el listener para el movimiento del mouse
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef]);

  return {
    mousePosition,
    leftEyePosition,
    rightEyePosition
  };
};
