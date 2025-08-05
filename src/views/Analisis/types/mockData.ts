// Datos mock y constantes de color para Analisis
//import { SalmonConcession, ConcessionArea } from './analisisTypes';
// Tipos para Analisis
export interface SalmonConcession {
  id: number;
  name: string;
  position: [number, number];
  type: string;
  production: string;
  capacity: number;
  status: string;
  region: string;
}

export interface ConcessionArea {
  id: number;
  name: string;
  region: string;
  status: string;
  positions: [number, number][];
} 
export const speciesColors: { [key: string]: string } = {
  "Salmón Atlántico": "#FF6384",
  "Trucha Arcoíris": "#36A2EB",
  "Salmón Coho": "#FFCE56",
};

export const statusColors: { [key: string]: string } = {
  "Activa": "#4BC0C0",
  "Inactiva": "#FF9F40",
  "En Mantenimiento": "#9966FF",
};

export const regionColors: { [key: string]: string } = {
  "Los Lagos": "#8A2BE2",
  "Aysén": "#DC143C",
  "Magallanes": "#20B2AA",
  "Bío Bío": "#DAA520",
};

export const center: [number, number] = [-41.47, -72.94];

export const salmonConcessions: SalmonConcession[] = [
  { id: 1, name: "Concesión Río Maullín", position: [-41.59, -73.00], type: "Marino", production: "Salmón Atlántico", capacity: 2000, status: "Activa", region: "Los Lagos" },
  { id: 2, name: "Concesión Isla Tenglo", position: [-41.52, -72.93], type: "Marino", production: "Trucha Arcoíris", capacity: 1800, status: "En Mantenimiento", region: "Los Lagos" },
  { id: 3, name: "Concesión Calbuco Sur", position: [-41.77, -73.13], type: "Marino", production: "Salmón Coho", capacity: 2500, status: "Activa", region: "Los Lagos" },
  { id: 4, name: "Concesión Seno de Reloncaví", position: [-41.67, -72.68], type: "Marino", production: "Salmón Atlántico", capacity: 2200, status: "Activa", region: "Los Lagos" },
  { id: 5, name: "Concesión Estero Castro", position: [-42.45, -73.78], type: "Marino", production: "Salmón Coho", capacity: 1900, status: "Activa", region: "Los Lagos" },
  { id: 6, name: "Concesión Puerto Montt Oeste", position: [-41.48, -73.05], type: "Marino", production: "Salmón Atlántico", capacity: 2100, status: "Activa", region: "Los Lagos" },
  { id: 7, name: "Concesión Golfo de Ancud", position: [-41.80, -72.80], type: "Marino", production: "Trucha Arcoíris", capacity: 1700, status: "Inactiva", region: "Los Lagos" },
  { id: 8, name: "Concesión Chiloé Norte", position: [-42.00, -73.50], type: "Marino", production: "Salmón Coho", capacity: 2300, status: "Activa", region: "Los Lagos" },
  { id: 9, name: "Concesión Quellón", position: [-43.12, -73.61], type: "Marino", production: "Salmón Atlántico", capacity: 2000, status: "Activa", region: "Los Lagos" },
  { id: 10, name: "Concesión Cochamó", position: [-41.49, -72.31], type: "Marino", production: "Salmón Atlántico", capacity: 1600, status: "Activa", region: "Los Lagos" },
  { id: 11, name: "Concesión Aysén Fjord", position: [-45.39, -73.00], type: "Marino", production: "Salmón Atlántico", capacity: 1500, status: "Activa", region: "Aysén" },
  { id: 12, name: "Concesión Puerto Natales", position: [-51.72, -72.50], type: "Marino", production: "Trucha Arcoíris", capacity: 1000, status: "Activa", region: "Magallanes" },
  { id: 13, name: "Concesión Talcahuano", position: [-36.72, -73.12], type: "Marino", production: "Salmón Coho", capacity: 1200, status: "Inactiva", region: "Bío Bío" },
];

export const concessionAreas: ConcessionArea[] = [
  { id: 1, name: "Area Marina Protegida 1", region: "Los Lagos", status: "Activa",
    positions: [
      [-41.60, -73.10],
      [-41.60, -73.00],
      [-41.70, -73.00],
      [-41.70, -73.10],
    ]
  },
  { id: 2, name: "Centro de Cultivo Chiloé", region: "Los Lagos", status: "En Mantenimiento",
    positions: [
      [-42.00, -73.70],
      [-42.00, -73.60],
      [-42.10, -73.60],
      [-42.10, -73.70],
    ]
  },
  { id: 3, name: "Fiordo Comau Concesión", region: "Los Lagos", status: "Activa",
    positions: [
      [-42.20, -72.50],
      [-42.20, -72.40],
      [-42.30, -72.40],
      [-42.30, -72.50],
    ]
  },
];

export const mockStats = {
  totalConcessions: 120,
  activeConcessions: 95,
  totalCapacity: 1500000,
  statusBreakdown: {
    "Activa": 95,
    "Inactiva": 20,
    "En Mantenimiento": 5,
  },
  regionBreakdown: {
    "Los Lagos": 60,
    "Aysén": 40,
    "Magallanes": 15,
    "Bío Bío": 5,
  },
  recentAlerts: 3,
  pendingInspections: 5,
}; 