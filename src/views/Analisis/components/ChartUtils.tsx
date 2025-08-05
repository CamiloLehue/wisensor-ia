import React from 'react';

// Función para validar si el objeto chart es renderizable (versión robusta)
export function isValidChart(chart: any): boolean {
  if (!chart) return false;
  if (!Array.isArray(chart.xAxis) || chart.xAxis.length === 0) return false;
  if (!Array.isArray(chart.series) || chart.series.length === 0) return false;
  if (!chart.type || typeof chart.type !== 'string') return false;
  
  // Validar series
  for (const serie of chart.series) {
    if (!serie || typeof serie.name !== 'string' || !Array.isArray(serie.data)) return false;
    if (chart.type === 'bar' || chart.type === 'line') {
      if (serie.data.length !== chart.xAxis.length) return false;
      
      if (!serie.data.every((v: any) => v === null || (typeof v === 'number' && !isNaN(v)))) {
        return false;
      }
    }
  }

  // Validar xAxis
  if (!chart.xAxis.every((v: any) => typeof v === 'string')) return false;
  
  return true;
}

// ErrorBoundary local para el gráfico IA
export class ChartErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {

  }
  render() {
    if (this.state.hasError) {
      return <div className="mt-3 bg-[#0d1b2a] rounded-lg p-3 border border-[#22334a] text-xs text-red-300">Ocurrió un error al graficar los datos. El formato recibido no es válido.</div>;
    }
    return this.props.children;
  }
} 