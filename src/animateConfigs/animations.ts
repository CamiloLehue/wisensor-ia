import { gsap } from 'gsap';
import { 
  AnimationTarget, 
  FadeConfig, 
  ScaleConfig, 
  RotateConfig, 
  SlideConfig, 
  FloatConfig, 
  ElasticConfig,
  ShakeConfig,
  BlinkConfig,
  BounceConfig,
  FlipConfig,
  GlowConfig,
  MorphConfig,
  PulseConfig,
  RollConfig,
  SwingConfig,
  TypewriterConfig,
  WaveConfig,
  WobbleConfig,
  ZoomConfig,
  SplitConfig,
  RainbowConfig,
  JellyConfig,
  HeartbeatConfig,
  SpinConfig,
  VibrateConfig,
  PopConfig,
  DrawConfig,
  RippleConfig,
  FoldConfig,
  UnfoldConfig,
  DanceConfig,
  GlitchConfig,
  SparkleConfig
} from './types';

// Fade Animations
export const fadeIn = (target: AnimationTarget, config: FadeConfig = {}) => {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    initialOpacity = 0,
    finalOpacity = 1
  } = config;

  return gsap.fromTo(target,
    { opacity: initialOpacity },
    { opacity: finalOpacity, duration, delay, ease }
  );
};

export const fadeOut = (target: AnimationTarget, config: FadeConfig = {}) => {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'power2.in',
  } = config;

  return gsap.to(target, {
    opacity: 0,
    duration,
    delay,
    ease
  });
};

// Scale Animations
export const scaleIn = (target: AnimationTarget, config: ScaleConfig = {}) => {
  const {
    duration = 0.5,
    delay = 0,
    ease = 'back.out(1.7)',
    initialScale = 0,
    finalScale = 1
  } = config;

  return gsap.fromTo(target,
    { scale: initialScale },
    { scale: finalScale, duration, delay, ease }
  );
};

// Rotate Animations
export const rotate = (target: AnimationTarget, config: RotateConfig = {}) => {
  const {
    duration = 2,
    delay = 0,
    ease = 'none',
    initialRotation = 0,
    finalRotation = 360,
    infinite = false
  } = config;

  return gsap.fromTo(target,
    { rotation: initialRotation },
    { 
      rotation: finalRotation, 
      duration, 
      delay, 
      ease,
      repeat: infinite ? -1 : 0 
    }
  );
};

// Slide Animations
export const slide = (target: AnimationTarget, config: SlideConfig = {}) => {
  const {
    direction = 'left',
    distance = 100,
    duration = 0.5,
    delay = 0,
    ease = 'power2.out'
  } = config;

  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const multiplier = direction === 'left' || direction === 'up' ? -1 : 1;

  return gsap.fromTo(target,
    { [axis]: distance * multiplier },
    { [axis]: 0, duration, delay, ease }
  );
};

// Float Animation
export const float = (target: AnimationTarget, config: FloatConfig = {}) => {
  const {
    height = 15,
    duration = 2,
    delay = 0,
    ease = 'power1.inOut',
    infinite = true
  } = config;

  return gsap.to(target, {
    y: height,
    duration,
    delay,
    ease,
    yoyo: true,
    repeat: infinite ? -1 : 0
  });
};

// Elastic Animation
export const elasticScale = (target: AnimationTarget, config: ElasticConfig = {}) => {
  const {
    duration = 1,
    delay = 0,
    strength = 1,
    bounce = 0.5
  } = config;

  return gsap.fromTo(target,
    { scale: 0 },
    { 
      scale: 1, 
      duration, 
      delay, 
      ease: `elastic.out(${strength}, ${bounce})`
    }
  );
};

// Shake Animation
export const shake = (target: AnimationTarget, config: ShakeConfig = {}) => {
  const { intensity = 5, duration = 0.5, delay = 0, infinite = false } = config;
  return gsap.to(target, {
    x: intensity,
    duration: duration / 8,
    repeat: infinite ? -1 : 7,
    yoyo: true,
    ease: "power1.inOut",
    delay,
  });
};

// Blink Animation
export const blink = (target: AnimationTarget, config: BlinkConfig = {}) => {
  const { duration = 0.5, delay = 0, infinite = false } = config;
  return gsap.to(target, {
    opacity: 0,
    duration: duration / 2,
    repeat: infinite ? -1 : 1,
    yoyo: true,
    delay,
    ease: "none"
  });
};

// Bounce Animation
export const bounce = (target: AnimationTarget, config: BounceConfig = {}) => {
  const { height = 20, duration = 1, delay = 0, infinite = false } = config;
  return gsap.to(target, {
    y: -height,
    duration,
    delay,
    repeat: infinite ? -1 : 0,
    yoyo: true,
    ease: "bounce.out"
  });
};

// Flip Animation
export const flip = (target: AnimationTarget, config: FlipConfig = {}) => {
  const { direction = 'x', duration = 1, delay = 0 } = config;
  return gsap.to(target, {
    [`${direction}Rotation`]: 360,
    duration,
    delay,
    ease: "power2.inOut"
  });
};

// Glow Animation
export const glow = (target: AnimationTarget, config: GlowConfig = {}) => {
  const { color = '#fff', intensity = 20, duration = 1, delay = 0, infinite = false } = config;
  return gsap.to(target, {
    boxShadow: `0 0 ${intensity}px ${color}`,
    duration,
    delay,
    repeat: infinite ? -1 : 0,
    yoyo: true,
    ease: "power1.inOut"
  });
};

// Morph Animation
export const morph = (target: AnimationTarget, config: MorphConfig = {}) => {
  const { duration = 1, delay = 0 } = config;
  return gsap.to(target, {
    morphSVG: config.path,
    duration,
    delay,
    ease: "power1.inOut"
  });
};

// Pulse Animation
export const pulse = (target: AnimationTarget, config: PulseConfig = {}) => {
  const { scale = 1.2, duration = 0.5, delay = 0, infinite = false } = config;
  return gsap.to(target, {
    scale,
    duration: duration / 2,
    delay,
    repeat: infinite ? -1 : 1,
    yoyo: true,
    ease: "power1.inOut"
  });
};

// Roll Animation
export const roll = (target: AnimationTarget, config: RollConfig = {}) => {
  const { direction = 'left', distance = 100, duration = 1, delay = 0 } = config;
  const x = direction === 'left' ? -distance : distance;
  return gsap.to(target, {
    x,
    rotation: direction === 'left' ? -360 : 360,
    duration,
    delay,
    ease: "power1.inOut"
  });
};

// Swing Animation
export const swing = (target: AnimationTarget, config: SwingConfig = {}) => {
  const { angle = 15, duration = 1, delay = 0, infinite = false } = config;
  return gsap.to(target, {
    rotation: angle,
    duration: duration / 2,
    delay,
    repeat: infinite ? -1 : 3,
    yoyo: true,
    ease: "power1.inOut"
  });
};

// Typewriter Animation
export const typewriter = (target: AnimationTarget, config: TypewriterConfig) => {
  const { text, duration = 2, delay = 0 } = config;
  return gsap.to(target, {
    duration,
    delay,
    text: {
      value: text,
      delimiter: "",
    },
    ease: "none"
  });
};

// Wave Animation
export const wave = (target: AnimationTarget, config: WaveConfig = {}) => {
  const { amplitude = 20, frequency = 1, duration = 2, delay = 0, infinite = false } = config;
  return gsap.to(target, {
    y: amplitude,
    duration: duration / frequency,
    delay,
    repeat: infinite ? -1 : frequency,
    yoyo: true,
    ease: "sine.inOut"
  });
};

// Wobble Animation
export const wobble = (target: AnimationTarget, config: WobbleConfig = {}) => {
  const { intensity = 30, duration = 1, delay = 0, infinite = false } = config;
  const timeline = gsap.timeline({ repeat: infinite ? -1 : 0, delay });
  timeline
    .to(target, { rotation: -intensity, duration: duration / 4 })
    .to(target, { rotation: intensity, duration: duration / 2 })
    .to(target, { rotation: 0, duration: duration / 4 });
  return timeline;
};

// Zoom Animation
export const zoom = (target: AnimationTarget, config: ZoomConfig = {}) => {
  const { scale = 1.5, duration = 0.5, delay = 0, origin = 'center center' } = config;
  return gsap.to(target, {
    scale,
    duration,
    delay,
    transformOrigin: origin,
    ease: "power2.inOut"
  });
};

// Split Animation
export const split = (target: AnimationTarget, config: SplitConfig = {}) => {
  const { direction = 'left', distance = 100, duration = 1, delay = 0 } = config;
  const x = direction === 'left' || direction === 'right' ? distance : 0;
  const y = direction === 'up' || direction === 'down' ? distance : 0;
  return gsap.to(target, {
    x: direction === 'left' ? -x : x,
    y: direction === 'up' ? -y : y,
    duration,
    delay,
    ease: "power2.inOut"
  });
};

// Rainbow Animation
export const rainbow = (target: AnimationTarget, config: RainbowConfig = {}) => {
  const { colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'],
          duration = 3, delay = 0, infinite = true } = config;
  const timeline = gsap.timeline({ repeat: infinite ? -1 : 0, delay });
  colors.forEach((color) => {
    timeline.to(target, {
      color,
      duration: duration / colors.length,
      ease: "none"
    });
  });
  return timeline;
};

// Jelly Animation
export const jelly = (target: AnimationTarget, config: JellyConfig = {}) => {
  const { intensity = 1.2, duration = 0.8, delay = 0 } = config;
  return gsap.to(target, {
    scaleX: intensity,
    scaleY: 1/intensity,
    duration: duration/2,
    yoyo: true,
    repeat: 1,
    ease: "elastic.out(1, 0.3)",
    delay
  });
};

// Heartbeat Animation
export const heartbeat = (target: AnimationTarget, config: HeartbeatConfig = {}) => {
  const { scale = 1.2, duration = 0.5, delay = 0, infinite = true } = config;
  return gsap.to(target, {
    scale,
    duration: duration/2,
    delay,
    repeat: infinite ? -1 : 1,
    yoyo: true,
    ease: "power1.inOut",
    repeatDelay: duration/2
  });
};

// Spin Animation
export const spin = (target: AnimationTarget, config: SpinConfig = {}) => {
  const { rotation = 360, duration = 1, delay = 0, infinite = false } = config;
  return gsap.to(target, {
    rotation,
    duration,
    delay,
    repeat: infinite ? -1 : 0,
    ease: "none"
  });
};

// Vibrate Animation
export const vibrate = (target: AnimationTarget, config: VibrateConfig = {}) => {
  const { intensity = 2, duration = 0.1, delay = 0, infinite = true } = config;
  return gsap.to(target, {
    x: `random(${-intensity},${intensity})`,
    y: `random(${-intensity},${intensity})`,
    duration,
    delay,
    repeat: infinite ? -1 : 10,
    ease: "none"
  });
};

// Pop Animation
export const pop = (target: AnimationTarget, config: PopConfig = {}) => {
  const { scale = 1.2, duration = 0.4, delay = 0 } = config;
  return gsap.to(target, {
    scale,
    duration: duration/2,
    yoyo: true,
    repeat: 1,
    ease: "back.out(3)",
    delay
  });
};

// Draw Animation
export const draw = (target: AnimationTarget, config: DrawConfig = {}) => {
  const { duration = 1, delay = 0 } = config;
  return gsap.fromTo(target,
    { strokeDashoffset: 100 },
    {
      strokeDashoffset: 0,
      duration,
      delay,
      ease: "power1.inOut"
    }
  );
};

// Ripple Animation
export const ripple = (target: AnimationTarget, config: RippleConfig = {}) => {
  const { scale = 2, opacity = 0, duration = 1, delay = 0 } = config;
  return gsap.to(target, {
    scale,
    opacity,
    duration,
    delay,
    ease: "power1.out"
  });
};

// Fold Animation
export const fold = (target: AnimationTarget, config: FoldConfig = {}) => {
  const { direction = 'horizontal', duration = 0.5, delay = 0 } = config;
  return gsap.to(target, {
    scaleX: direction === 'horizontal' ? 0 : 1,
    scaleY: direction === 'vertical' ? 0 : 1,
    duration,
    delay,
    ease: "power2.inOut"
  });
};

// Unfold Animation
export const unfold = (target: AnimationTarget, config: UnfoldConfig = {}) => {
  const { direction = 'horizontal', duration = 0.5, delay = 0 } = config;
  return gsap.fromTo(target,
    {
      scaleX: direction === 'horizontal' ? 0 : 1,
      scaleY: direction === 'vertical' ? 0 : 1
    },
    {
      scaleX: 1,
      scaleY: 1,
      duration,
      delay,
      ease: "power2.out"
    }
  );
};

// Dance Animation
export const dance = (target: AnimationTarget, config: DanceConfig = {}) => {
  const { steps = [
    { x: 10, y: -10, rotation: 10 },
    { x: -10, y: 10, rotation: -10 }
  ], duration = 0.5, delay = 0, infinite = true } = config;
  
  const timeline = gsap.timeline({ repeat: infinite ? -1 : 0, delay });
  steps.forEach(step => {
    timeline.to(target, {
      x: step.x,
      y: step.y,
      rotation: step.rotation,
      duration: duration/steps.length,
      ease: "power1.inOut"
    });
  });
  return timeline;
};

// Glitch Animation
export const glitch = (target: AnimationTarget, config: GlitchConfig = {}) => {
  const { intensity = 10, duration = 0.2, delay = 0, infinite = true } = config;
  const timeline = gsap.timeline({ repeat: infinite ? -1 : 0, delay });
  for (let i = 0; i < 5; i++) {
    timeline
      .to(target, {
        skewX: intensity,
        duration: duration/10,
        ease: "power1.inOut"
      })
      .to(target, {
        skewX: 0,
        duration: duration/10,
        ease: "power1.inOut"
      });
  }
  return timeline;
};

// Sparkle Animation
export const sparkle = (target: AnimationTarget, config: SparkleConfig = {}) => {
  const { color = '#fff', size = 10, quantity = 5, duration = 1, delay = 0 } = config;
  const timeline = gsap.timeline({ delay });
  
  for (let i = 0; i < quantity; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (targetElement instanceof HTMLElement) {
      targetElement.appendChild(particle);
      
      timeline.to(particle, {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        opacity: 0,
        duration,
        ease: "power1.out",
        onComplete: () => particle.remove()
      }, i * 0.1);
    }
  }
  return timeline;
};
