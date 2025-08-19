import { useState } from "react";
import { CardProps } from "../../assets/types/Dashboard";
import { Users, Package, Settings, Activity, TrendingUp, Shield, Database, BarChart3 } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { MapPin, AlertTriangle, Cpu, Zap, Thermometer, Droplet, Activity as ActivityIcon } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icono custom para los centros
const centerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const mockCenters = [
  { name: 'Pirquen', position: [-41.59, -73.00] },
  { name: 'Reloncaví', position: [-41.67, -72.68] },
  { name: 'Chiloé', position: [-42.45, -73.78] },
  { name: 'Aysén', position: [-45.39, -73.00] },
  { name: 'Magallanes', position: [-51.72, -72.50] },
];

function Card({ children }: CardProps) {
  return (
    <div className="flex-1 h-full overflow-hidden bg-[#08141e] rounded-lg border border-[#182a38] shadow-sm">
      {children}
    </div>
  );
}

export const DashboardDos = () => {
  const [activeTab, setActiveTab] = useState(0);


  const anomalyData = [
    { day: 'Lun', value: 2 },
    { day: 'Mar', value: 1 },
    { day: 'Mié', value: 3 },
    { day: 'Jue', value: 0 },
    { day: 'Vie', value: 4 },
    { day: 'Sáb', value: 1 },
    { day: 'Dom', value: 2 },
  ];
  const feedData = [
    { day: 'Lun', value: 120 },
    { day: 'Mar', value: 150 },
    { day: 'Mié', value: 110 },
    { day: 'Jue', value: 180 },
    { day: 'Vie', value: 140 },
    { day: 'Sáb', value: 170 },
    { day: 'Dom', value: 130 },
  ];
  const alertData = [
    { name: 'Críticas', value: 3 },
    { name: 'Medias', value: 7 },
    { name: 'Bajas', value: 15 },
  ];
  const sensorStatus = [
    { name: 'Activos', value: 12 },
    { name: 'Inactivos', value: 2 },
    { name: 'Mantenimiento', value: 1 },
  ];
  const efficiencyRanking = [
    { center: 'Pirquen', value: 92 },
    { center: 'Reloncaví', value: 88 },
    { center: 'Chiloé', value: 85 },
    { center: 'Aysén', value: 80 },
    { center: 'Magallanes', value: 77 },
  ];
  const envTrend = [
    { mes: 'Ene', temp: 13.2, ox: 8.1, ph: 7.8 },
    { mes: 'Feb', temp: 13.5, ox: 8.0, ph: 7.7 },
    { mes: 'Mar', temp: 13.8, ox: 7.9, ph: 7.8 },
    { mes: 'Abr', temp: 13.1, ox: 8.2, ph: 7.9 },
    { mes: 'May', temp: 12.7, ox: 8.3, ph: 7.8 },
    { mes: 'Jun', temp: 12.3, ox: 8.4, ph: 7.7 },
  ];
  const iaActivity = [
    { time: '08:00', action: 'Predicción de anomalía', result: 'Sin anomalía' },
    { time: '10:30', action: 'Análisis de sensor', result: 'Sensor 3 fuera de rango' },
    { time: '12:00', action: 'Predicción de consumo', result: 'Consumo esperado: 150kg' },
    { time: '14:15', action: 'Alerta crítica', result: 'MOT alto en E5' },
  ];

  return (
    <main className="flex-1 h-screen min-h-0 p-4 bg-azul-dark flex flex-col">
      <div className="flex flex-col flex-1 min-h-0 gap-6">
        {/* Header visual */}
        <div className="flex items-center justify-between pb-2 border-b border-[#22334a]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-cyan-900 bg-[#0a1a2f]">
              <Cpu className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">WISENSOR</h1>
              <p className="text-gray-400 text-sm">Panel Inteligente de Monitoreo y Gestión</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>Sistema Activo</span>
            </div>
            <div className="text-gray-600">|</div>
            <div>{new Date().toLocaleDateString('es-ES')}</div>
            <div className="text-gray-600">|</div>
            <div>{new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Widgets principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Anomalías */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#22334a] shadow-md flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-yellow-400" />
              <span className="text-white font-semibold">Predicción de Anomalías</span>
            </div>
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={anomalyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6384" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#FF6384" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <Line type="monotone" dataKey="value" stroke="url(#anomalyGradient)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <span className="text-2xl font-bold text-yellow-400 mt-2">{anomalyData.reduce((a, b) => a + b.value, 0)}</span>
            <span className="text-xs text-gray-400">Anomalías esta semana</span>
          </div>
          {/* Consumo de Alimento */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#22334a] shadow-md flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-400" />
              <span className="text-white font-semibold">Consumo de Alimento</span>
            </div>
            <ResponsiveContainer width="100%" height={60}>
              <BarChart data={feedData}>
                <defs>
                  <linearGradient id="feedBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#36A2EB" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#36A2EB" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <Bar dataKey="value" fill="url(#feedBarGradient)" barSize={18} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <span className="text-2xl font-bold text-green-400 mt-2">{feedData.reduce((a, b) => a + b.value, 0)} kg</span>
            <span className="text-xs text-gray-400">Últimos 7 días</span>
          </div>
          {/* Estado de Sensores */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#22334a] shadow-md flex flex-col items-center w-full">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-cyan-400" />
              <span className="text-white font-semibold">Estado de Sensores</span>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              {sensorStatus.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className={`w-20 text-xs font-medium ${idx === 0 ? 'text-green-400' : idx === 1 ? 'text-red-400' : 'text-yellow-400'}`}>{item.name}</span>
                  <div className="flex-1 h-2 bg-gray-800 rounded">
                    <div className={`h-2 rounded ${idx === 0 ? 'bg-green-400' : idx === 1 ? 'bg-red-400' : 'bg-yellow-400'}`} style={{ width: `${(item.value / sensorStatus.reduce((a, b) => a + b.value, 0)) * 100}%` }}></div>
                  </div>
                  <span className={`text-xs font-bold ${idx === 0 ? 'text-green-400' : idx === 1 ? 'text-red-400' : 'text-yellow-400'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Alertas Críticas */}
          <div className="bg-[#08141e] rounded-lg p-4 border border-[#22334a] shadow-md flex flex-col items-center w-full">
            <div className="flex items-center gap-2 mb-2">
              <ActivityIcon className="text-red-400" />
              <span className="text-white font-semibold">Alertas Críticas</span>
            </div>
            <div className="flex flex-col items-center w-full mt-2">
              <span className="text-3xl font-bold text-red-400 mb-1">{alertData[0].value}</span>
              <span className="text-xs text-gray-400 mb-2">Críticas activas</span>
              <ul className="w-full text-xs text-gray-300">
                {alertData.map((item, idx) => (
                  <li key={item.name} className="flex items-center gap-2 mb-1">
                    <span className={`w-16 font-medium ${idx === 0 ? 'text-red-400' : idx === 1 ? 'text-yellow-400' : 'text-green-400'}`}>{item.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded">
                      <div className={`h-1.5 rounded ${idx === 0 ? 'bg-red-400' : idx === 1 ? 'bg-yellow-400' : 'bg-green-400'}`} style={{ width: `${(item.value / alertData.reduce((a, b) => a + b.value, 0)) * 100}%` }}></div>
                    </div>
                    <span className={`text-xs font-bold ${idx === 0 ? 'text-red-400' : idx === 1 ? 'text-yellow-400' : 'text-green-400'}`}>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs para más widgets y gráficos */}
        <div className="flex-1 flex flex-col min-h-0 gap-4">
          <div className="flex gap-2 mb-2">
            <button onClick={() => setActiveTab(0)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 0 ? 'bg-red-dark text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>Visión General</button>
            <button onClick={() => setActiveTab(1)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 1 ? 'bg-red-dark text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>Tendencias Ambientales</button>
            <button onClick={() => setActiveTab(2)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 2 ? 'bg-red-dark text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>Ranking & IA</button>
          </div>
          <div className="flex-1 bg-[#08141e] rounded-lg border border-[#22334a] shadow-md p-4 flex flex-col min-h-0">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-0">
                {/* Mapa de centros activos con Leaflet */}
                <div className="flex flex-col items-center justify-center bg-gray-darkL rounded-lg border border-gray-700 h-full min-h-0 overflow-hidden max-h-full">
                  <MapContainer center={[-43, -73]} zoom={5.5} scrollWheelZoom={false} style={{ width: '100%', height: '100%', minHeight: 220, borderRadius: '0.5rem', filter: 'grayscale(0.2) brightness(0.9)' }}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />
                    {mockCenters.map((center, idx) => (
                      <Marker key={center.name} position={center.position} icon={centerIcon}>
                        <Popup>
                          <span className="font-semibold text-blue-700">{center.name}</span><br/>
                          Centro activo
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                  <span className="text-white font-semibold mt-2">Mapa de Centros Activos</span>
                  <span className="text-xs text-gray-400">({mockCenters.length} centros activos)</span>
                </div>
                {/* Actividad IA */}
                <div className="bg-gray-darkL rounded-lg border border-gray-700 p-4 flex flex-col min-h-0 h-full overflow-auto max-h-full">
                  <h5 className="font-medium text-white mb-2">Actividad Reciente de IA</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {iaActivity.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span className="font-semibold text-white">{item.time}</span>
                        <span>{item.action}</span>
                        <span className="text-green-400">{item.result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className="flex flex-col h-full min-h-0">
                <h4 className="text-lg font-semibold text-white mb-4">Tendencia de Parámetros Ambientales</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={envTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tempLineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#36A2EB" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#36A2EB" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="oxLineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF6384" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#FF6384" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="phLineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFCE56" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#FFCE56" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="mes" stroke="#8884d8" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="url(#tempLineGradient)" strokeWidth={3} name="Temp (°C)" dot={false} />
                    <Line type="monotone" dataKey="ox" stroke="url(#oxLineGradient)" strokeWidth={3} name="O2 (mg/L)" dot={false} />
                    <Line type="monotone" dataKey="ph" stroke="url(#phLineGradient)" strokeWidth={3} name="pH" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {activeTab === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-0">
                {/* Ranking de eficiencia */}
                <div className="bg-gray-darkL rounded-lg border border-gray-700 p-4 flex flex-col min-h-0 h-full overflow-auto max-h-full">
                  <h5 className="font-medium text-white mb-2">Ranking de Centros por Eficiencia</h5>
                  <ul className="text-xs text-gray-300 space-y-2">
                    {efficiencyRanking.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="font-semibold text-white">{item.center}</span>
                        <div className="flex-1 h-2 bg-gray-700 rounded mx-2">
                          <div className="h-2 rounded bg-green-400" style={{ width: `${item.value}%` }}></div>
                        </div>
                        <span className="text-green-400 font-bold">{item.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Placeholder para expansión futura */}
                <div className="flex flex-col items-center justify-center bg-gray-darkL rounded-lg border border-gray-700 h-full min-h-0 overflow-hidden max-h-full">
                  <Thermometer className="w-10 h-10 text-yellow-400 mb-2" />
                  <span className="text-white font-semibold">Más widgets próximamente</span>
                  <span className="text-xs text-gray-400">Sugerencias bienvenidas</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};