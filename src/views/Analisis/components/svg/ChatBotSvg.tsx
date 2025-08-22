import { AIParticleEffects } from './AIParticleEffects';

function ChatBotSvg() {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 254.69 177.71"
    >
      <defs>
        <style>
          {`
            .robot-body {
              stroke-dasharray: 1200;
              stroke-dashoffset: 1000;
              animation: drawRobot 4s ease-in-out infinite alternate,
                         robotGlow 3s ease-in-out infinite alternate;
              filter: drop-shadow(0 0 10px #00ccff40);
            }
            
            .robot-eye {
              animation: smartBlink 4s infinite,
                         eyeGlow 2s ease-in-out infinite alternate;
              transform-origin: center;
              filter: drop-shadow(0 0 8px #00ccff80);
            }

            .robot-eye:nth-child(2) {
              animation-delay: 0.5s;
            }

            .robot-eye:nth-child(3) {
              animation-delay: 1s;
            }

            @keyframes drawRobot {
              0% {
                stroke-dashoffset: 1000;
                stroke-width: 4;
              }
              50% {
                stroke-width: 6;
              }
              100% {
                stroke-dashoffset: 0;
                stroke-width: 4;
              }
            }

            @keyframes robotGlow {
              0% {
                stroke: #00ccff;
                filter: drop-shadow(0 0 10px #00ccff40);
              }
              50% {
                stroke: #00ffcc;
                filter: drop-shadow(0 0 20px #00ffcc60);
              }
              100% {
                stroke: #0099ff;
                filter: drop-shadow(0 0 15px #0099ff50);
              }
            }

            @keyframes smartBlink {
              0%, 85%, 87%, 89%, 100% {
                transform: scaleY(1);
                opacity: 1;
              }
              86%, 88% {
                transform: scaleY(0.1);
                opacity: 0.7;
              }
              15%, 25% {
                transform: scaleY(0.8) scaleX(1.1);
              }
            }

            @keyframes eyeGlow {
              0% {
                fill: #00ccff;
                filter: drop-shadow(0 0 8px #00ccff80);
              }
              50% {
                fill: #00ffee;
                filter: drop-shadow(0 0 15px #00ffee90);
              }
              100% {
                fill: #0088ff;
                filter: drop-shadow(0 0 12px #0088ff70);
              }
            }

            /* Efectos de partículas */
            .particle {
              animation: float 3s ease-in-out infinite;
              opacity: 0.6;
            }

            .particle:nth-child(1) { animation-delay: 0s; }
            .particle:nth-child(2) { animation-delay: 0.5s; }
            .particle:nth-child(3) { animation-delay: 1s; }
            .particle:nth-child(4) { animation-delay: 1.5s; }

            @keyframes float {
              0%, 100% {
                transform: translateY(0) scale(0.8);
                opacity: 0.3;
              }
              50% {
                transform: translateY(-20px) scale(1.2);
                opacity: 0.8;
              }
            }

            /* Animación de ondas de energía */
            .energy-wave {
              animation: energyPulse 4s ease-in-out infinite;
              transform-origin: center;
            }

            @keyframes energyPulse {
              0%, 100% {
                transform: scale(0.8);
                opacity: 0.4;
              }
              50% {
                transform: scale(1.3);
                opacity: 0.1;
              }
            }
          `}
        </style>
      </defs>
      <g id="Layer_1-2" data-name="Layer 1">
        <AIParticleEffects intensity="medium" color="#00ccff" />
        
        {/* Ondas de energía de fondo */}
        <circle
          cx="127"
          cy="88"
          r="100"
          fill="none"
          stroke="#00ccff20"
          strokeWidth="2"
          className="energy-wave"
        />
        <circle
          cx="127"
          cy="88"
          r="120"
          fill="none"
          stroke="#00ffcc15"
          strokeWidth="1"
          className="energy-wave"
          style={{ animationDelay: "1s" }}
        />
        <circle
          cx="127"
          cy="88"
          r="140"
          fill="none"
          stroke="#0099ff10"
          strokeWidth="1"
          className="energy-wave"
          style={{ animationDelay: "2s" }}
        />

        {/* Partículas flotantes */}
        <circle cx="50" cy="40" r="2" fill="#00ccff" className="particle" />
        <circle cx="200" cy="60" r="1.5" fill="#00ffcc" className="particle" />
        <circle cx="220" cy="120" r="2.5" fill="#0099ff" className="particle" />
        <circle cx="30" cy="100" r="1" fill="#00ccff" className="particle" />
        <circle cx="180" cy="30" r="1.8" fill="#00ffcc" className="particle" />
        <circle cx="40" cy="140" r="2.2" fill="#0099ff" className="particle" />

        <g>
          <path
            fill="#ffffff00"
            stroke="#00ccff"
            strokeWidth="4"
            className="cls-1 robot-body"
            d="M244.94,53.91h-3.07v-19.01c7.4-2.16,12.82-8.99,12.82-17.09,0-9.84-7.98-17.82-17.82-17.82s-17.82,7.98-17.82,17.82c0,8.1,5.41,14.93,12.82,17.09v19.01h-3.07c-2.5,0-4.52,1.93-4.71,4.38-7.35-21.03-25.01-35.86-45.65-35.86h-10.08c1.44-.82,2.42-2.34,2.42-4.11V4.75c0-2.62-2.13-4.75-4.75-4.75h-82.29c-2.62,0-4.75,2.13-4.75,4.75v13.58c0,1.77.98,3.3,2.42,4.11h-10.08c-20.7,0-38.4,14.91-45.71,36.03-.1-2.53-2.17-4.56-4.73-4.56H4.75c-2.62,0-4.75,2.13-4.75,4.75v47.24c0,2.62,2.13,4.75,4.75,4.75h3.13c1.25,32.61,28.15,58.76,61.06,58.76h55.95c2.76,0,5-2.24,5-5s-2.24-5-5-5h-55.95c-27.4,0-49.82-21.66-51.06-48.76h3.01c2.62,0,4.75-2.13,4.75-4.75v-4.21c7.32,21.09,25.01,35.98,45.69,35.98h64.77l46.29,39.68c.29.25.62.36.95.36.76,0,1.48-.6,1.48-1.47v-39.06c17.82-2.69,32.64-16.49,39.24-35.26v4c0,2.62,2.13,4.75,4.75,4.75h16.14c2.62,0,4.75-2.13,4.75-4.75v-47.24c0-2.62-2.13-4.75-4.75-4.75ZM199.42,106.14c-4.75,6.26-10.99,10.26-17.59,11.25l-17.01,2.57v15.98l-15.7-13.46-5.62-4.82h-72.17c-7.23,0-14.21-3.51-19.66-9.88-6.21-7.26-9.64-17.11-9.64-27.74s3.42-20.47,9.64-27.74c5.45-6.37,12.43-9.88,19.66-9.88h107.11c7.23,0,14.21,3.51,19.66,9.88,6.21,7.26,9.64,17.11,9.64,27.74,0,9.75-2.95,19.01-8.32,26.09Z"
          />
          <path
            id="left-eye"
            className="cls-1 robot-eye"
            fill="#00ccff"
            d="M85.45,52.5c-6.08,0-11,4.92-11,11v27.55c0,6.08,4.92,11,11,11s11-4.92,11-11v-27.55c0-6.08-4.92-11-11-11Z"
          />
          <path
            id="right-eye"
            className="cls-1 robot-eye"
            fill="#00ccff"
            d="M164.32,52.5c-6.08,0-11,4.92-11,11v27.55c0,6.08,4.92,11,11,11s11-4.92,11-11v-27.55c0-6.08-4.92-11-11-11Z"
          />
        </g>
      </g>
    </svg>
  );
}


function ChatBotSvgStatic() {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 254.69 177.71"
      height="25px"
      width="30px"
    >
     
      <g id="Layer_1-2" data-name="Layer 1">
        <g>
          <path
            fill="#00ccff"
            stroke="#00ccff"
            strokeWidth="4"
            className="cls-1 robot-body"
            d="M244.94,53.91h-3.07v-19.01c7.4-2.16,12.82-8.99,12.82-17.09,0-9.84-7.98-17.82-17.82-17.82s-17.82,7.98-17.82,17.82c0,8.1,5.41,14.93,12.82,17.09v19.01h-3.07c-2.5,0-4.52,1.93-4.71,4.38-7.35-21.03-25.01-35.86-45.65-35.86h-10.08c1.44-.82,2.42-2.34,2.42-4.11V4.75c0-2.62-2.13-4.75-4.75-4.75h-82.29c-2.62,0-4.75,2.13-4.75,4.75v13.58c0,1.77.98,3.3,2.42,4.11h-10.08c-20.7,0-38.4,14.91-45.71,36.03-.1-2.53-2.17-4.56-4.73-4.56H4.75c-2.62,0-4.75,2.13-4.75,4.75v47.24c0,2.62,2.13,4.75,4.75,4.75h3.13c1.25,32.61,28.15,58.76,61.06,58.76h55.95c2.76,0,5-2.24,5-5s-2.24-5-5-5h-55.95c-27.4,0-49.82-21.66-51.06-48.76h3.01c2.62,0,4.75-2.13,4.75-4.75v-4.21c7.32,21.09,25.01,35.98,45.69,35.98h64.77l46.29,39.68c.29.25.62.36.95.36.76,0,1.48-.6,1.48-1.47v-39.06c17.82-2.69,32.64-16.49,39.24-35.26v4c0,2.62,2.13,4.75,4.75,4.75h16.14c2.62,0,4.75-2.13,4.75-4.75v-47.24c0-2.62-2.13-4.75-4.75-4.75ZM199.42,106.14c-4.75,6.26-10.99,10.26-17.59,11.25l-17.01,2.57v15.98l-15.7-13.46-5.62-4.82h-72.17c-7.23,0-14.21-3.51-19.66-9.88-6.21-7.26-9.64-17.11-9.64-27.74s3.42-20.47,9.64-27.74c5.45-6.37,12.43-9.88,19.66-9.88h107.11c7.23,0,14.21,3.51,19.66,9.88,6.21,7.26,9.64,17.11,9.64,27.74,0,9.75-2.95,19.01-8.32,26.09Z"
          />
          <path
            className="cls-1 robot-eye"
            fill="#00ccff"
            d="M85.45,52.5c-6.08,0-11,4.92-11,11v27.55c0,6.08,4.92,11,11,11s11-4.92,11-11v-27.55c0-6.08-4.92-11-11-11Z"
          />
          <path
            className="cls-1 robot-eye"
            fill="#00ccff"
            d="M164.32,52.5c-6.08,0-11,4.92-11,11v27.55c0,6.08,4.92,11,11,11s11-4.92,11-11v-27.55c0-6.08-4.92-11-11-11Z"
          />
        </g>
      </g>
    </svg>
  );
}

export  {ChatBotSvg,ChatBotSvgStatic};
