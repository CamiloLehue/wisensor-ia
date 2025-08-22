import React from 'react';

interface AIParticleEffectsProps {
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
}

export const AIParticleEffects: React.FC<AIParticleEffectsProps> = ({ 
  intensity = 'medium',
  color = '#00ccff'
}) => {
  const particleCount = intensity === 'low' ? 8 : intensity === 'medium' ? 12 : 16;
  
  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 300;
      const y = Math.random() * 200;
      const size = Math.random() * 3 + 1;
      const delay = Math.random() * 4;
      
      particles.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={size}
          fill={color}
          className="ai-particle"
          style={{
            animationDelay: `${delay}s`,
            opacity: Math.random() * 0.7 + 0.3
          }}
        />
      );
    }
    return particles;
  };

  return (
    <>
      <style>
        {`
          .ai-particle {
            animation: aiFloat 6s ease-in-out infinite,
                       aiGlow 3s ease-in-out infinite alternate;
          }
          
          @keyframes aiFloat {
            0%, 100% {
              transform: translateY(0) translateX(0) scale(1);
            }
            25% {
              transform: translateY(-15px) translateX(5px) scale(1.2);
            }
            50% {
              transform: translateY(-8px) translateX(-3px) scale(0.8);
            }
            75% {
              transform: translateY(-20px) translateX(8px) scale(1.1);
            }
          }
          
          @keyframes aiGlow {
            0% {
              filter: drop-shadow(0 0 4px ${color}60);
            }
            100% {
              filter: drop-shadow(0 0 12px ${color}90);
            }
          }
        `}
      </style>
      <g className="ai-particle-system">
        {generateParticles()}
        
        {/* Líneas de conexión de datos */}
        <g className="data-connections" style={{ opacity: 0.3 }}>
          <line x1="50" y1="50" x2="200" y2="100" stroke={color} strokeWidth="1" className="ai-particle" />
          <line x1="100" y1="30" x2="180" y2="150" stroke={color} strokeWidth="1" className="ai-particle" />
          <line x1="220" y1="80" x2="80" y2="120" stroke={color} strokeWidth="1" className="ai-particle" />
        </g>
        
        {/* Pulsos de energía */}
        <g className="energy-pulses">
          <circle cx="127" cy="88" r="80" fill="none" stroke={`${color}20`} strokeWidth="2" className="ai-particle" />
          <circle cx="127" cy="88" r="95" fill="none" stroke={`${color}15`} strokeWidth="1" className="ai-particle" style={{ animationDelay: '1s' }} />
          <circle cx="127" cy="88" r="110" fill="none" stroke={`${color}10`} strokeWidth="1" className="ai-particle" style={{ animationDelay: '2s' }} />
        </g>
      </g>
    </>
  );
};
