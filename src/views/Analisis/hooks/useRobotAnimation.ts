import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject } from 'react';

interface RobotAnimationConfig {
  initialScale?: number;
  initialY?: number;
  floatHeight?: number;
  entryDuration?: number;
  floatDuration?: number;
}

export const useRobotAnimation = (
  containerRef: RefObject<HTMLDivElement | null>,
  config: RobotAnimationConfig = {}
) => {
  const {
    initialScale = 0.3,
    initialY = -50,
    floatHeight = 15,
    entryDuration = 1.5,
    floatDuration = 2
  } = config;

  useGSAP(
    () => {
      // Entrada inicial del robot
      gsap.fromTo(
        "#Layer_2",
        { 
          scale: initialScale, 
          opacity: 0,
          y: initialY 
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          duration: entryDuration,
          ease: "elastic.out(1, 0.5)"
        }
      );

      // Animación de flotación continua
      gsap.to("#Layer_2", {
        y: floatHeight,
        duration: floatDuration,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    },
    { scope: containerRef }
  );
};
