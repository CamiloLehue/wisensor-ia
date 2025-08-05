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