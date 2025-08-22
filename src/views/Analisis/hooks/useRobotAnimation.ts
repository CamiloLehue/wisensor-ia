import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject, useEffect } from 'react';
import { useEyeTracking } from './useEyeTracking';

export const useRobotAnimation = (
  containerRef: RefObject<HTMLDivElement | null>
) => {
  // Hook para el seguimiento de ojos
  const { leftEyePosition, rightEyePosition } = useEyeTracking(containerRef);

  useGSAP(
    () => {
      // Entrada simple del robot sin efectos dramáticos
      gsap.fromTo(
        "#Layer_2",
        { 
          opacity: 0
        },
        { 
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }
      );
    },
    { scope: containerRef }
  );

  // Efecto para mover los ojos completos siguiendo el cursor
  useEffect(() => {
    const leftEye = containerRef.current?.querySelector('#left-eye') as SVGElement;
    const rightEye = containerRef.current?.querySelector('#right-eye') as SVGElement;

    if (leftEye && rightEye) {
      gsap.to(leftEye, {
        x: leftEyePosition.x - 85.45, // Restar la posición base
        y: leftEyePosition.y - 66.25,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(rightEye, {
        x: rightEyePosition.x - 164.32, // Restar la posición base
        y: rightEyePosition.y - 66.25,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [leftEyePosition, rightEyePosition, containerRef]);
};
