// Re-export del tipo principal del dashboard
export type { DashboardType as DashboardData } from '../types/DashboardType';

export interface DashboardFilters {
  selectedYears: number[];
  selectedMetric: string;
  chartType: string;
  showComparison: boolean;
  selectedCenters: string[];
  compareCenters: boolean;
}

export interface ChartData {
  month?: string;
  semana?: string;
  [key: string]: string | number | undefined;
}

export interface StatCardProps {
  title: string;
  value: string;
  gradient: string;
}

export interface ChartCardProps {
  title: string;
  subtitle: string;
  data: ChartData[];
  dataKeys: string[];
  colors: string[];
  chartType: string;
  className?: string;
}
