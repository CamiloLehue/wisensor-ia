import React from "react";
import { Gauge, AlertTriangle, CheckCircle, TrendingUp, HeartPulse, BarChart3, Ship, ListChecks, Cpu, Activity, Shield, Flame, Bell, Thermometer, Zap } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area } from 'recharts';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-[#08141e] rounded-lg p-4 border border-[#22334a] shadow-md flex flex-col items-center min-w-[180px] ${className}`}>
    {children}
  </div>
);

// Líneas de abajo más cortas
const LINES = [
  // Izquierda (de arriba a abajo)
  { x1: 500, y1: 350, x2: 260, y2: 260 }, // Biomasa
  { x1: 500, y1: 420, x2: 260, y2: 370 }, // Riesgo de FANs
  { x1: 500, y1: 490, x2: 260, y2: 480 }, // Alerta Temperatura
  { x1: 500, y1: 560, x2: 260, y2: 590 }, // Alerta Ruido
  // Derecha (de arriba a abajo)
  { x1: 500, y1: 350, x2: 740, y2: 260 }, // Cumplimiento
  { x1: 500, y1: 420, x2: 740, y2: 370 }, // Rankings
  { x1: 500, y1: 490, x2: 740, y2: 480 }, // Alerta Seguridad
  { x1: 500, y1: 560, x2: 740, y2: 590 }, // Alerta Oxígeno
  // Abajo (de izquierda a derecha, aún más cortas)
  { x1: 500, y1: 600, x2: 400, y2: 670 }, // Alimentación
  { x1: 500, y1: 600, x2: 450, y2: 700 }, // Logística
  { x1: 500, y1: 600, x2: 500, y2: 710 }, // Alertas
  { x1: 500, y1: 600, x2: 550, y2: 700 }, // Energía
  { x1: 500, y1: 600, x2: 600, y2: 670 }, // Actividad
];

// SVG decorativo de barco
const BarcoSVG = () => (
  <svg viewBox="0 0 80 40" className="w-40 h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 30 Q40 38 70 30 L75 20 H5 L10 30 Z" fill="#00eaff" opacity="0.13" />
    <rect x="20" y="12" width="40" height="10" rx="2" fill="#00eaff" opacity="0.14" />
    <rect x="30" y="7" width="10" height="7" rx="1.5" fill="#00eaff" opacity="0.14" />
    <rect x="50" y="7" width="6" height="7" rx="1.5" fill="#00eaff" opacity="0.14" />
    <rect x="38" y="3" width="4" height="6" rx="1.5" fill="#00eaff" opacity="0.14" />
    <path d="M5 20 Q40 32 75 20" stroke="#00eaff" strokeWidth="1.5" opacity="0.14" />
  </svg>
);

// SVG decorativo de módulos de salmón (2x3 grid diagonal, jaula 106 bien posicionada)
const SalmonModuleSVG = () => (
  <svg viewBox="0 0 280 180" className="w-72 h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#00eaff" strokeWidth="1.5" opacity="0.09">
      {/* Fila superior */}
      <polygon points="40,80 80,60 120,80 80,100" />     {/* 101 */}
      <polygon points="80,60 120,40 160,60 120,80" />     {/* 102 */}
      <polygon points="120,40 160,20 200,40 160,60" />    {/* 103 */}
      {/* Fila inferior */}
      <polygon points="80,100 120,80 160,100 120,120" />  {/* 104 */}
      <polygon points="120,80 160,60 200,80 160,100" />   {/* 105 */}
      <polygon points="160,60 200,40 240,60 200,80" />    {/* 106 */}
    </g>
    {/* Nodos */}
    <g fill="#00eaff" opacity="0.15">
      <circle cx="40" cy="80" r="3" />
      <circle cx="80" cy="60" r="3" />
      <circle cx="120" cy="40" r="3" />
      <circle cx="160" cy="20" r="3" />
      <circle cx="200" cy="40" r="3" />
      <circle cx="80" cy="100" r="3" />
      <circle cx="120" cy="80" r="3" />
      <circle cx="160" cy="60" r="3" />
      <circle cx="200" cy="80" r="3" />
      <circle cx="120" cy="120" r="3" />
      <circle cx="160" cy="100" r="3" />
      <circle cx="240" cy="60" r="3" />
    </g>
    {/* Textos */}
    <g fontFamily="sans-serif" fontWeight="bold" fontSize="18" textAnchor="middle" fill="#00eaff" opacity="0.7">
      <text x="80" y="85" opacity="0.5">101</text>
      <text x="120" y="65" opacity="0.5">102</text>
      <text x="160" y="45" opacity="0.5">103</text>
      <text x="120" y="105" opacity="0.5">104</text>
      <text x="160" y="85" opacity="0.5">105</text>
      <text x="200" y="65" fill="#ffc300" opacity="0.8">106</text>
    </g>
    {/* Alerta 106 */}
    <g>
      <circle cx="200" cy="65" r="13" fill="#ffc300" opacity="0.12" />
      <text x="200" y="70" fontFamily="sans-serif" fontWeight="bold" fontSize="16" textAnchor="middle" fill="#ffc300" opacity="1">&#9888;</text>
    </g>
  </svg>
);
  
  
  
  
  
  
  
  

const Inicio = () => {
  const biomasaData = [
    { subject: 'Crecimiento', A: 120, fullMark: 150 },
    { subject: 'Salud', A: 98, fullMark: 150 },
    { subject: 'Alimentación', A: 86, fullMark: 150 },
    { subject: 'Densidad', A: 99, fullMark: 150 },
    { subject: 'Oxígeno', A: 85, fullMark: 150 },
    { subject: 'Temperatura', A: 65, fullMark: 150 },
  ];

  // Gradiente SVG para el relleno neón
  const NeonRadarGradient = () => (
    <svg width="0" height="0">
      <defs>
        <radialGradient id="radarNeonGradient" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0e1e3a" stopOpacity="0.08" />
        </radialGradient>
      </defs>
    </svg>
  );

  // Datos de ejemplo para alimentación
  const alimentacionData = [
    { name: 'Lun', value: 3.2 },
    { name: 'Mar', value: 3.8 },
    { name: 'Mié', value: 4.1 },
    { name: 'Jue', value: 4.5 },
    { name: 'Vie', value: 4.2 },
    { name: 'Sáb', value: 4.7 },
    { name: 'Dom', value: 4.8 },
  ];

  // Gradiente SVG para el área bajo la línea
  const NeonLineGradient = () => (
    <svg width="0" height="0">
      <defs>
        <linearGradient id="alimentacionNeonGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
  const getLineLength = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
  return (
    <main className="flex-1 h-screen min-h-0 p-4 bg-azul-dark flex flex-col items-center justify-center relative overflow-hidden">
      {/* SVG decorativos background */}
      <div className="absolute right-10 top-32 z-0 opacity-30 pointer-events-none">
        <BarcoSVG />
      </div>
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 z-0 opacity-20 pointer-events-none">
        <SalmonModuleSVG />
      </div>
      {/* Título y subtítulo */}
      <div className="flex flex-col items-center mb-2 z-10 relative">
        <h1 className="text-4xl font-bold text-cyan-300 tracking-tight">Wisensor IA</h1>
        <p className="text-gray-300 text-lg text-center max-w-2xl">Innovación que lleva a la industria del salmón hacia el futuro</p>
        {/* Efecto lámpara neón visible */}
        <div
          className="absolute left-1/2 top-[72px] -translate-x-1/2 w-80 h-16 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(34,211,238,0.35) 0%, rgba(34,211,238,0.12) 60%, transparent 100%)",
            filter: "blur(16px)",
            opacity: 0.85,
          }}
        />
      </div>
      {/* SVG de líneas de conexión */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1000 1000">
        {LINES.map((l, i) => {
        const length = getLineLength(l.x1, l.y1, l.x2, l.y2);
        return (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#22d3ee"
            strokeWidth="2"
            opacity="0.18"
            strokeLinecap="round"
            // Configura el stroke-dasharray para el efecto de dibujo
            strokeDasharray={length}
            strokeDashoffset={length} // Inicialmente oculta la línea
          >
            {/* Animación del stroke-dashoffset */}
            <animate
              attributeName="stroke-dashoffset"
              from={length}
              to="0"
              dur="2s" // Duración de la animación
              begin={`${i * 0.1}s`} // Retraso para cada línea
              fill="freeze" // Mantiene el estado final de la animación
            />
             {/* Animación de la opacidad (opcional, para que aparezca gradualmente) */}
             <animate
              attributeName="opacity"
              from="0"
              to="0.18"
              dur="0.5s"
              begin={`${i * 0.1}s`}
              fill="freeze"
             />
          </line>
        );
      })}
      </svg>
      {/* Layout central */}
      <div className="relative flex-1 w-full flex items-center justify-center" style={{minHeight: 480}}>
        {/* Izquierda */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          <Card className="h-40 w-48 justify-center">
            <div className="w-full flex flex-col items-center justify-center h-full">
              <span className="text-white font-semibold text-sm mb-1 tracking-wide">Biomasa</span>
              <div style={{ width: '100%', height: 110, filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
                <NeonRadarGradient />
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius={45} data={biomasaData}>
                    <PolarGrid stroke="#22d3ee" strokeOpacity={0.18} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#22d3ee', fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar name="Biomasa" dataKey="A" stroke="#22d3ee" strokeWidth={2} fill="url(#radarNeonGradient)" fillOpacity={1} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <span className="text-xs text-cyan-300 mt-1">Radar de parámetros</span>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="text-orange-400" />
              <span className="text-white font-semibold">Riesgo de FANs</span>
            </div>
            <span className="text-2xl font-bold text-orange-400">2,3%</span>
            <span className="text-xs text-gray-400">Actual</span>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="text-red-400" />
              <span className="text-white font-semibold">Alerta Temperatura</span>
            </div>
            <span className="text-xs text-red-400 font-bold">Alta</span>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="text-yellow-300" />
              <span className="text-white font-semibold">Alerta Ruido</span>
            </div>
            <span className="text-xs text-yellow-300 font-bold">Moderada</span>
          </Card>
        </div>
        {/* Derecha */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-end">
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="text-green-400" />
              <span className="text-white font-semibold">Cumplimiento</span>
            </div>
            <span className="text-2xl font-bold text-green-400">95%</span>
            <span className="text-xs text-gray-400">Dentro de Norma</span>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="text-cyan-400" />
              <span className="text-white font-semibold">Rankings</span>
            </div>
            <span className="text-xs text-gray-400">Centro B Mejor</span>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="text-blue-400" />
              <span className="text-white font-semibold">Alerta Seguridad</span>
            </div>
            <span className="text-xs text-blue-400 font-bold">Sin Riesgo</span>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="text-cyan-300" />
              <span className="text-white font-semibold">Alerta Oxígeno</span>
            </div>
            <span className="text-xs text-cyan-300 font-bold">Normal</span>
          </Card>
        </div>
        {/* Centro: Icono Cpu Lucide, más arriba, con decorativos a los costados en absolute */}
        <div className="relative flex flex-col items-center justify-center mx-auto z-10" style={{ marginTop: '-80px', minHeight: '180px', minWidth: '400px' }}>
          {/* Módulo de salmón a la izquierda del CPU (más lejos del centro) */}
          <div className="absolute left-[-200px] top-1/2 -translate-y-1/2">
            <SalmonModuleSVG />
          </div>
          {/* Barco a la derecha del CPU */}
          <div className="absolute right-[-110px] top-1/2 -translate-y-1/2">
            <BarcoSVG />
          </div>
          <Cpu className="w-44 h-44 text-cyan-400 drop-shadow-xl animate-pulse" />
          <span className="text-cyan-400 font-bold text-xl mt-2 tracking-widest">IA</span>
        </div>
        {/* Abajo */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex gap-6 mb-2">
          <Card className="h-32 w-40 justify-center">
            <div className="w-full flex flex-col items-center justify-center h-full">
              <span className="text-white font-semibold text-sm mb-1 tracking-wide">Alimentación</span>
              <div style={{ width: '100%', height: 70, filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
                <NeonLineGradient />
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={alimentacionData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                    <XAxis dataKey="name" hide />
                    <YAxis domain={[3, 5]} hide />
                    <Tooltip content={() => null} />
                    <Area type="monotone" dataKey="value" stroke="none" fill="url(#alimentacionNeonGradient)" fillOpacity={1} />
                    <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} activeDot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <span className="text-xs text-cyan-300 mt-1">Consumo semanal (ton)</span>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Ship className="text-cyan-400" />
              <span className="text-white font-semibold">Logística</span>
            </div>
            <span className="text-xs text-gray-400">Próxima Cosecha en tránsito</span>
            <span className="text-xs text-cyan-300">ETA Planta 3 h</span>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="text-orange-400" />
              <span className="text-white font-semibold">Alertas</span>
            </div>
            <span className="text-xs text-orange-400 font-bold">Brote Detectado</span>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="text-cyan-400" />
              <span className="text-white font-semibold">Alerta Energía</span>
            </div>
            <span className="text-xs text-cyan-400 font-bold">Estable</span>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="text-pink-400" />
              <span className="text-white font-semibold">Alerta Actividad</span>
            </div>
            <span className="text-xs text-pink-400 font-bold">Normal</span>
          </Card>
        </div>
      </div>
      {/* Footer de alertas */}
      <div className="flex justify-center gap-2 mt-8 z-10">
        <AlertTriangle className="text-orange-400" />
        <AlertTriangle className="text-orange-400" />
        <AlertTriangle className="text-orange-400" />
      </div>
    </main>
  );
};

export default Inicio; 