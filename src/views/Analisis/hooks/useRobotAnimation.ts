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
    initialScale = 0.1,
    initialY = -100,
    floatHeight = 12,
    entryDuration = 2,
    floatDuration = 4
  } = config;

  useGSAP(
    () => {
      // Timeline para animaciones secuenciales
      const tl = gsap.timeline();

      // Entrada dramática del robot con efectos múltiples
      tl.fromTo(
        "#Layer_2",
        { 
          scale: initialScale, 
          opacity: 0,
          y: initialY,
          rotation: -180,
          filter: "blur(10px)"
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          rotation: 0,
          filter: "blur(0px)",
          duration: entryDuration,
          ease: "elastic.out(1.2, 0.6)"
        }
      )
      // Efecto de "activación" con escala pulsante
      .to("#Layer_2", {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to("#Layer_2", {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animación de flotación continua con variaciones
      gsap.to("#Layer_2", {
        y: floatHeight,
        duration: floatDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Rotación sutil continua para efecto "escaneando"
      gsap.to("#Layer_2", {
        rotation: 3,
        duration: floatDuration * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Efecto de pulsación de escala periódica
      gsap.to("#Layer_2", {
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Animaciones específicas para los ojos del robot
      gsap.to(".robot-eye", {
        scaleX: 0.8,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 4,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.1
      });

      // Efecto de "pensamiento" - variación en la opacidad
      gsap.to("#Layer_2", {
        opacity: 0.95,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    },
    { scope: containerRef }
  );
};
