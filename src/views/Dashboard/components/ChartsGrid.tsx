import { ChartCard } from './ChartCard';
import { WeeklyTrendsChart } from './WeeklyTrendsChart';
import { ChartData } from './types';

interface ChartsGridProps {
  selectedMetric: string;
  chartType: string;
  selectedYears: number[];
  showComparison: boolean;
  climaData: ChartData[];
  consumoData: ChartData[];
  fcrData: ChartData[];
  semanalesData: ChartData[];
  fallbackData: ChartData[];
  getDataKeys: (dataType: string) => string[];
  chartColors: string[];
}

export const ChartsGrid = ({
  selectedMetric,
  chartType,
  selectedYears,
  showComparison,
  climaData,
  consumoData,
  fcrData,
  semanalesData,
  fallbackData,
  getDataKeys,
  chartColors
}: ChartsGridProps) => {
  const getChartTypeLabel = () => {
    switch (chartType) {
      case 'line': return 'Líneas';
      case 'bar': return 'Barras';
      case 'area': return 'Área';
      default: return 'Líneas';
    }
  };

  const getYearsLabel = () => {
    return selectedYears.length > 0 ? selectedYears.join(', ') : 'Todos';
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
      
      {/* Gráfico Principal Dinámico */}
      {(selectedMetric === 'all' || selectedMetric === 'temperatura') && (
        <ChartCard
          title={`Temperatura Mensual (${getChartTypeLabel()})`}
          subtitle={`Años: ${getYearsLabel()}`}
          data={climaData.length > 0 ? climaData : fallbackData}
          dataKeys={getDataKeys('temperatura')}
          colors={chartColors}
          chartType={chartType}
        />
      )}

      {/* Gráfico de Consumo */}
      {(selectedMetric === 'all' || selectedMetric === 'consumo') && (
        <ChartCard
          title={`Consumo de Alimentos (${getChartTypeLabel()})`}
          subtitle={`Años: ${getYearsLabel()}`}
          data={consumoData.length > 0 ? consumoData : fallbackData}
          dataKeys={getDataKeys('consumo')}
          colors={chartColors.slice(2)}
          chartType={chartType}
        />
      )}

      {/* Gráfico de FCR */}
      {(selectedMetric === 'all' || selectedMetric === 'fcr') && (
        <ChartCard
          title={`FCR Mensual (${getChartTypeLabel()})`}
          subtitle={`Años: ${getYearsLabel()} | FCR: Factor de Conversión Alimenticia`}
          data={fcrData.length > 0 ? fcrData : fallbackData}
          dataKeys={getDataKeys('fcr')}
          colors={chartColors.slice(4)}
          chartType={chartType}
        />
      )}

      {/* Gráfico de Precipitación */}
      {(selectedMetric === 'all' || selectedMetric === 'precipitacion') && (
        <ChartCard
          title={`Precipitación Mensual (${getChartTypeLabel()})`}
          subtitle={`Años: ${getYearsLabel()}`}
          data={climaData.length > 0 ? climaData : fallbackData}
          dataKeys={getDataKeys('precipitacion')}
          colors={chartColors.slice(1)}
          chartType={chartType}
        />
      )}

      {/* Gráfico de Datos Semanales */}
      {(selectedMetric === 'all' || selectedMetric === 'peso') && (
        <WeeklyTrendsChart data={semanalesData} />
      )}

      {/* Gráfico Comparativo Unificado */}
      {selectedMetric === 'all' && showComparison && (
        <ChartCard
          title="Vista Comparativa Unificada"
          subtitle={`Todas las métricas por años seleccionados: ${getYearsLabel()}`}
          data={climaData.length > 0 ? climaData : fallbackData}
          dataKeys={getDataKeys('all')}
          colors={chartColors}
          chartType={chartType}
          className="lg:col-span-2"
        />
      )}

    </div>
  );
};
