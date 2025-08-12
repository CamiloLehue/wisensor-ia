import { RefObject } from 'react';

export interface BaseAnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}

export interface FadeConfig extends BaseAnimationConfig {
  initialOpacity?: number;
  finalOpacity?: number;
}

export interface ScaleConfig extends BaseAnimationConfig {
  initialScale?: number;
  finalScale?: number;
}

export interface RotateConfig extends BaseAnimationConfig {
  initialRotation?: number;
  finalRotation?: number;
  infinite?: boolean;
}

export interface SlideConfig extends BaseAnimationConfig {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export interface FloatConfig extends BaseAnimationConfig {
  height?: number;
  infinite?: boolean;
}

export interface ElasticConfig extends BaseAnimationConfig {
  strength?: number;
  bounce?: number;
}

export interface ShakeConfig extends BaseAnimationConfig {
  intensity?: number;
  infinite?: boolean;
}

export interface BlinkConfig extends BaseAnimationConfig {
  infinite?: boolean;
}

export interface BounceConfig extends BaseAnimationConfig {
  height?: number;
  infinite?: boolean;
}

export interface FlipConfig extends BaseAnimationConfig {
  direction?: 'x' | 'y';
  infinite?: boolean;
}

export interface GlowConfig extends BaseAnimationConfig {
  color?: string;
  intensity?: number;
  infinite?: boolean;
}

export interface MorphConfig extends BaseAnimationConfig {
  path?: string;
  infinite?: boolean;
}

export interface PulseConfig extends BaseAnimationConfig {
  scale?: number;
  infinite?: boolean;
}

export interface RollConfig extends BaseAnimationConfig {
  direction?: 'left' | 'right';
  distance?: number;
}

export interface SwingConfig extends BaseAnimationConfig {
  angle?: number;
  infinite?: boolean;
}

export interface TypewriterConfig extends BaseAnimationConfig {
  text: string;
  infinite?: boolean;
}

export interface WaveConfig extends BaseAnimationConfig {
  amplitude?: number;
  frequency?: number;
  infinite?: boolean;
}

export interface WobbleConfig extends BaseAnimationConfig {
  intensity?: number;
  infinite?: boolean;
}

export interface ZoomConfig extends BaseAnimationConfig {
  scale?: number;
  origin?: string;
}

export interface SplitConfig extends BaseAnimationConfig {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export interface RainbowConfig extends BaseAnimationConfig {
  colors?: string[];
  infinite?: boolean;
}

export interface JellyConfig extends BaseAnimationConfig {
  intensity?: number;
}

export interface HeartbeatConfig extends BaseAnimationConfig {
  scale?: number;
  infinite?: boolean;
}

export interface SpinConfig extends BaseAnimationConfig {
  rotation?: number;
  infinite?: boolean;
}

export interface VibrateConfig extends BaseAnimationConfig {
  intensity?: number;
  infinite?: boolean;
}

export interface PopConfig extends BaseAnimationConfig {
  scale?: number;
}

export interface DrawConfig extends BaseAnimationConfig {
  path?: string;
}

export interface RippleConfig extends BaseAnimationConfig {
  scale?: number;
  opacity?: number;
}

export interface FoldConfig extends BaseAnimationConfig {
  direction?: 'horizontal' | 'vertical';
}

export interface UnfoldConfig extends BaseAnimationConfig {
  direction?: 'horizontal' | 'vertical';
}

export interface DanceConfig extends BaseAnimationConfig {
  steps?: Array<{
    x: number;
    y: number;
    rotation: number;
  }>;
  infinite?: boolean;
}

export interface GlitchConfig extends BaseAnimationConfig {
  intensity?: number;
  infinite?: boolean;
}

export interface SparkleConfig extends BaseAnimationConfig {
  color?: string;
  size?: number;
  quantity?: number;
}

export type AnimationTarget = string | RefObject<HTMLElement | null> | HTMLElement;
