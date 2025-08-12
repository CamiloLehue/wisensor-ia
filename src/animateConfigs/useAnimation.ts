import { useGSAP } from '@gsap/react';
import { RefObject } from 'react';
import {
  fadeIn, fadeOut, scaleIn, rotate, slide, float, elasticScale,
  shake, blink, bounce, flip, glow, morph, pulse, roll, swing,
  typewriter, wave, wobble, zoom, split, rainbow, jelly,
  heartbeat, spin, vibrate, pop, draw, ripple, fold, unfold,
  dance, glitch, sparkle
} from './animations';
import {
  FadeConfig, ScaleConfig, RotateConfig, SlideConfig, FloatConfig,
  ElasticConfig, ShakeConfig, BlinkConfig, BounceConfig, FlipConfig,
  GlowConfig, MorphConfig, PulseConfig, RollConfig, SwingConfig,
  TypewriterConfig, WaveConfig, WobbleConfig, ZoomConfig, SplitConfig,
  RainbowConfig, JellyConfig, HeartbeatConfig, SpinConfig, VibrateConfig,
  PopConfig, DrawConfig, RippleConfig, FoldConfig, UnfoldConfig,
  DanceConfig, GlitchConfig, SparkleConfig
} from './types';

export const useAnimation = (containerRef: RefObject<HTMLElement | null>) => {
  const context = useGSAP({ scope: containerRef });

  return {
    // Animaciones básicas
    fadeIn: (target: string, config?: FadeConfig) => fadeIn(target, config),
    fadeOut: (target: string, config?: FadeConfig) => fadeOut(target, config),
    scaleIn: (target: string, config?: ScaleConfig) => scaleIn(target, config),
    rotate: (target: string, config?: RotateConfig) => rotate(target, config),
    slide: (target: string, config?: SlideConfig) => slide(target, config),
    float: (target: string, config?: FloatConfig) => float(target, config),
    elasticScale: (target: string, config?: ElasticConfig) => elasticScale(target, config),

    // Efectos de movimiento
    shake: (target: string, config?: ShakeConfig) => shake(target, config),
    bounce: (target: string, config?: BounceConfig) => bounce(target, config),
    wobble: (target: string, config?: WobbleConfig) => wobble(target, config),
    vibrate: (target: string, config?: VibrateConfig) => vibrate(target, config),
    
    // Efectos de rotación y transformación
    flip: (target: string, config?: FlipConfig) => flip(target, config),
    spin: (target: string, config?: SpinConfig) => spin(target, config),
    roll: (target: string, config?: RollConfig) => roll(target, config),
    swing: (target: string, config?: SwingConfig) => swing(target, config),
    
    // Efectos de escala y zoom
    pulse: (target: string, config?: PulseConfig) => pulse(target, config),
    zoom: (target: string, config?: ZoomConfig) => zoom(target, config),
    pop: (target: string, config?: PopConfig) => pop(target, config),
    jelly: (target: string, config?: JellyConfig) => jelly(target, config),
    
    // Efectos visuales
    glow: (target: string, config?: GlowConfig) => glow(target, config),
    rainbow: (target: string, config?: RainbowConfig) => rainbow(target, config),
    sparkle: (target: string, config?: SparkleConfig) => sparkle(target, config),
    glitch: (target: string, config?: GlitchConfig) => glitch(target, config),
    
    // Efectos de texto y dibujo
    typewriter: (target: string, config: TypewriterConfig) => typewriter(target, config),
    draw: (target: string, config?: DrawConfig) => draw(target, config),
    morph: (target: string, config?: MorphConfig) => morph(target, config),
    
    // Efectos de expansión y contracción
    ripple: (target: string, config?: RippleConfig) => ripple(target, config),
    fold: (target: string, config?: FoldConfig) => fold(target, config),
    unfold: (target: string, config?: UnfoldConfig) => unfold(target, config),
    split: (target: string, config?: SplitConfig) => split(target, config),
    
    // Efectos especiales
    wave: (target: string, config?: WaveConfig) => wave(target, config),
    heartbeat: (target: string, config?: HeartbeatConfig) => heartbeat(target, config),
    dance: (target: string, config?: DanceConfig) => dance(target, config),
    blink: (target: string, config?: BlinkConfig) => blink(target, config),
    
    context
  };
};
