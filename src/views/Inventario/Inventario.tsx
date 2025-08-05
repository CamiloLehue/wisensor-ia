import React from "react";
import { TrendingUp, AlertTriangle, Gauge, Lightbulb } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart
} from "recharts";

// Widget simple
const Widget = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
  <div className="flex items-center p-4 rounded-lg shadow-md bg-[#08141e] border border-[#182a38] min-w-0">
    <div className="p-3 rounded-full mr-4" style={{ background: color + '22' }}>
      {icon}
    </div>
    <div>
      <div className="text-sm font-semibold text-gray-300 tracking-wide">{title}</div>
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
    </div>
  </div>
);

// Datos simulados para widgets
const widgets = [
  {
    title: "Predicción de Demanda",
    value: "Alta",
    icon: <TrendingUp size={28} color="#34d399" strokeWidth={2.5} />, // Lucide TrendingUp
    color: "#34d399",
  },
  {
    title: "Anomalías Detectadas",
    value: 3,
    icon: <AlertTriangle size={28} color="#f59e42" strokeWidth={2.5} />, // Lucide AlertTriangle
    color: "#f59e42",
  },
  {
    title: "Eficiencia Operativa IA",
    value: "92%",
    icon: <Gauge size={28} color="#60a5fa" strokeWidth={2.5} />, // Lucide Gauge
    color: "#60a5fa",
  },
  {
    title: "Recomendaciones",
    value: "2 nuevas",
    icon: <Lightbulb size={28} color="#f472b6" strokeWidth={2.5} />, // Lucide Lightbulb
    color: "#f472b6",
  },
];

// Datos simulados para gráficos
const dataLine = [
  { name: "Lun", valor: 120 },
  { name: "Mar", valor: 132 },
  { name: "Mié", valor: 101 },
  { name: "Jue", valor: 134 },
  { name: "Vie", valor: 90 },
  { name: "Sáb", valor: 230 },
  { name: "Dom", valor: 210 },
];
const dataBar = [
  { name: "Lun", procesos: 5 },
  { name: "Mar", procesos: 8 },
  { name: "Mié", procesos: 12 },
  { name: "Jue", procesos: 15 },
  { name: "Vie", procesos: 20 },
  { name: "Sáb", procesos: 18 },
  { name: "Dom", procesos: 22 },
];
const dataArea = [
  { name: "Lun", alertas: 2 },
  { name: "Mar", alertas: 4 },
  { name: "Mié", alertas: 3 },
  { name: "Jue", alertas: 7 },
  { name: "Vie", alertas: 6 },
  { name: "Sáb", alertas: 8 },
  { name: "Dom", alertas: 5 },
];
const dataLineNeon = [
  { name: "Lun", ia: 10 },
  { name: "Mar", ia: 22 },
  { name: "Mié", ia: 18 },
  { name: "Jue", ia: 30 },
  { name: "Vie", ia: 25 },
  { name: "Sáb", ia: 40 },
  { name: "Dom", ia: 38 },
];
const dataBar2 = [
  { name: "Lun", score: 60 },
  { name: "Mar", score: 70 },
  { name: "Mié", score: 80 },
  { name: "Jue", score: 90 },
  { name: "Vie", score: 85 },
  { name: "Sáb", score: 95 },
  { name: "Dom", score: 92 },
];
const dataLine2 = [
  { name: "Lun", pred: 15 },
  { name: "Mar", pred: 18 },
  { name: "Mié", pred: 20 },
  { name: "Jue", pred: 25 },
  { name: "Vie", pred: 22 },
  { name: "Sáb", pred: 30 },
  { name: "Dom", pred: 28 },
];

// Datos para RadarChart
const dataRadar = [
  { subject: 'Stock', A: 120, B: 110, fullMark: 150 },
  { subject: 'Consumo', A: 98, B: 130, fullMark: 150 },
  { subject: 'Pedidos', A: 86, B: 130, fullMark: 150 },
  { subject: 'Devoluciones', A: 99, B: 100, fullMark: 150 },
  { subject: 'Rotación', A: 85, B: 90, fullMark: 150 },
  { subject: 'IA', A: 65, B: 85, fullMark: 150 },
];
// Datos para ComposedChart
const dataComposed = [
  { name: 'Lun',gpt4: 400, gpt3: 240, pred: 240 },
  { name: 'Mar', gpt4: 300, gpt3: 139, pred: 221 },
  { name: 'Mié', gpt4: 200, gpt3: 980, pred: 229 },
  { name: 'Jue', gpt4: 278, gpt3: 390, pred: 200 },
  { name: 'Vie', gpt4: 189, gpt3: 480, pred: 218 },
  { name: 'Sáb', gpt4: 239, gpt3: 380, pred: 250 },
  { name: 'Dom', gpt4: 349, gpt3: 430, pred: 210 },
];

export const Inventario = () => (
  <div className="w-full h-full flex flex-col overflow-hidden">
    {/* Header con alto fijo */}
    <div className="flex items-center border-b border-gray-700 px-4" style={{height: '72px', minHeight: '72px'}}>
          <div>
        <h1 className="text-2xl font-bold text-white">Panel Inteligencia Artificial</h1>
        <p className="text-gray-400 text-sm">Monitorea y visualiza métricas inteligentes del sistema</p>
      </div>
    </div>
    {/* Contenido principal ocupa el resto */}
    <div className="flex flex-col flex-1 min-h-0 px-4 py-4 overflow-hidden">
      {/* Widgets con alto fijo */}
      <div className="flex gap-4 w-full mb-4" style={{height: '88px', minHeight: '88px'}}>
        {widgets.map((w, i) => (
          <div className="flex-1 min-w-0 h-full py-2" key={i}>
            <Widget {...w} />
          </div>
        ))}
      </div>
      {/* Gráficos ocupan todo el espacio restante */}
      <div className="flex flex-col gap-4 w-full flex-1 min-h-0 h-0 overflow-hidden">
        {/* Primera fila de gráficos */}
        <div className="flex gap-4 w-full flex-1 min-h-0 h-0 overflow-hidden">
          {/* Línea (degradado) */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#182a38] shadow-md min-w-0 flex-1 flex flex-col overflow-hidden">
            <div className="text-sm font-semibold text-cyan-300 tracking-wide mb-2">Predicción de Demanda</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataLine} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineInvGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#6ee7b7" tick={{ fontSize: 10 }} />
                <YAxis stroke="#6ee7b7" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#181e2a', border: '1px solid #34d399', color: '#fff', fontSize: 11 }} />
                <Line type="monotone" dataKey="valor" stroke="url(#lineInvGradient)" strokeWidth={3} dot={{ r: 3, fill: '#34d399', stroke: '#fff', strokeWidth: 1 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Barras (degradado) */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#182a38] shadow-md min-w-0 flex-1 flex flex-col overflow-hidden">
            <div className="text-sm font-semibold text-violet-300 tracking-wide mb-2">Procesos Automatizados</div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataBar} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barInvGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#a78bfa" tick={{ fontSize: 10 }} />
                <YAxis stroke="#a78bfa" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#181e2a', border: '1px solid #a78bfa', color: '#fff', fontSize: 11 }} />
                <Bar dataKey="procesos" fill="url(#barInvGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* RadarChart (nuevo) */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#182a38] shadow-md min-w-0 flex-1 flex flex-col overflow-hidden">
            <div className="text-sm font-semibold text-blue-300 tracking-wide mb-2">Comparativa inventario</div>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                <PolarGrid stroke="#22334a" />
                <PolarAngleAxis dataKey="subject" stroke="#60a5fa" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#60a5fa" fontSize={10} />
                <Radar name="A" dataKey="A" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.4} />
                <Radar name="B" dataKey="B" stroke="#f472b6" fill="#f472b6" fillOpacity={0.2} />
                <Legend />
                <Tooltip contentStyle={{ background: '#181e2a', border: '1px solid #60a5fa', color: '#fff', fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Segunda fila de gráficos */}
        <div className="flex gap-4 w-full flex-1 min-h-0 h-0 overflow-hidden">
          {/* Línea Neón (degradado) */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#182a38] shadow-md min-w-0 flex-1 flex flex-col overflow-hidden animate-pulse-neon">
            <div className="text-sm font-semibold text-cyan-300 tracking-wide mb-2">Análisis IA </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataLineNeon} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineNeonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00fff7" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#00fff7" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#00fff7" tick={{ fontSize: 10 }} />
                <YAxis stroke="#00fff7" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#181e2a', border: '1px solid #00fff7', color: '#fff', fontSize: 11 }} />
                <Line type="monotone" dataKey="ia" stroke="url(#lineNeonGradient)" strokeWidth={3} dot={{ r: 3, fill: '#00fff7', stroke: '#fff', strokeWidth: 1 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* ComposedChart (nuevo) */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#182a38] shadow-md min-w-0 flex-1 flex flex-col overflow-hidden">
            <div className="text-sm font-semibold text-orange-300 tracking-wide mb-2">Aprendizaje IA</div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dataComposed} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barComposedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e42" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#f59e42" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="lineComposedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#f59e42" tick={{ fontSize: 10 }} />
                <YAxis stroke="#f59e42" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#181e2a', border: '1px solid #f59e42', color: '#fff', fontSize: 11 }} />
                <Bar dataKey="gpt3" fill="url(#barComposedGradient)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="gpt4" fill="#f472b6" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="pred" stroke="url(#lineComposedGradient)" strokeWidth={3} dot={{ r: 3, fill: '#60a5fa', stroke: '#fff', strokeWidth: 1 }} activeDot={{ r: 5 }} />
                <Legend />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          {/* Línea Predicción (degradado) */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#182a38] shadow-md min-w-0 flex-1 flex flex-col overflow-hidden">
            <div className="text-sm font-semibold text-yellow-300 tracking-wide mb-2">Predicción</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataLine2} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="linePredGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fbbf24" tick={{ fontSize: 10 }} />
                <YAxis stroke="#fbbf24" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#181e2a', border: '1px solid #fbbf24', color: '#fff', fontSize: 11 }} />
                <Line type="monotone" dataKey="pred" stroke="url(#linePredGradient)" strokeWidth={3} dot={{ r: 3, fill: '#fbbf24', stroke: '#fff', strokeWidth: 1 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
);
