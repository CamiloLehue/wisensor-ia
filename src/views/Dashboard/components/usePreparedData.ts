import { useMemo } from 'react';
import { ChartData, DashboardData } from './types';

export const usePreparedData = (
  data: DashboardData[],
  getFilteredDataForCenters: () => DashboardData[],
  getMonthName: (monthId: number) => string,
  selectedYears: number[],
  selectedCenters: string[],
  compareCenters: boolean
) => {
  // Transformar datos de clima para gráfico comparativo por años
  const prepareClimaData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: ChartData[] = [];
    
    // Crear estructura base con 12 meses
    for (let mes = 1; mes <= 12; mes++) {
      const monthData: ChartData = { month: getMonthName(mes) };
      
      filteredCenters.forEach(centerData => {
        const climaData = centerData?.ciclos?.clima || [];
        const filteredClimaData = climaData.filter((yearData) => 
          selectedYears.length === 0 || selectedYears.includes(yearData.id_año)
        );
        
        filteredClimaData.forEach((yearData) => {
          const mesData = yearData.meses.find((m) => m.id_mes === mes);
          if (mesData?.datos?.promedioMensual) {
            const keyPrefix = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_temp_${yearData.id_año}`
              : `temp_${yearData.id_año}`;
            monthData[keyPrefix] = mesData.datos.promedioMensual.temperatura;
            
            const precipKey = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_precip_${yearData.id_año}`
              : `precip_${yearData.id_año}`;
            monthData[precipKey] = mesData.datos.promedioMensual.precipitacion;
          }
        });
      });
      
      chartData.push(monthData);
    }
    
    return chartData;
  }, [data, selectedYears, getFilteredDataForCenters, compareCenters, selectedCenters, getMonthName]);

  // Transformar datos de consumo
  const prepareConsumoData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: ChartData[] = [];
    
    for (let mes = 1; mes <= 12; mes++) {
      const monthData: ChartData = { month: getMonthName(mes) };
      
      filteredCenters.forEach(centerData => {
        const consumoData = centerData?.ciclos?.consumo_alimentos || [];
        const filteredConsumoData = consumoData.filter((yearData) => 
          selectedYears.length === 0 || selectedYears.includes(yearData.id_año)
        );
        
        filteredConsumoData.forEach((yearData) => {
          const mesData = yearData.meses.find((m) => m.id_mes === mes);
          if (mesData?.datos?.dias) {
            // Calcular promedio del consumo del mes
            const dias = Object.values(mesData.datos.dias) as number[];
            const promedio = dias.length > 0 ? dias.reduce((a, b) => a + b, 0) / dias.length : 0;
            const keyPrefix = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_consumo_${yearData.id_año}`
              : `consumo_${yearData.id_año}`;
            monthData[keyPrefix] = promedio;
          }
        });
      });
      
      chartData.push(monthData);
    }
    
    return chartData;
  }, [data, selectedYears, getFilteredDataForCenters, compareCenters, selectedCenters, getMonthName]);

  // Transformar datos de FCR
  const prepareFcrData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: ChartData[] = [];
    
    for (let mes = 1; mes <= 12; mes++) {
      const monthData: ChartData = { month: getMonthName(mes) };
      
      filteredCenters.forEach(centerData => {
        const fcrData = centerData?.ciclos?.fcr || [];
        const filteredFcrData = fcrData.filter((yearData) => 
          selectedYears.length === 0 || selectedYears.includes(yearData.id_año)
        );
        
        filteredFcrData.forEach((yearData) => {
          const mesData = yearData.meses.find((m) => m.id_mes === mes);
          if (mesData?.datos?.dias) {
            // Calcular promedio del FCR del mes
            const dias = Object.values(mesData.datos.dias) as number[];
            const promedio = dias.length > 0 ? dias.reduce((a, b) => a + b, 0) / dias.length : 0;
            const keyPrefix = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_fcr_${yearData.id_año}`
              : `fcr_${yearData.id_año}`;
            monthData[keyPrefix] = promedio;
          }
        });
      });
      
      chartData.push(monthData);
    }
    
    return chartData;
  }, [data, selectedYears, getFilteredDataForCenters, compareCenters, selectedCenters, getMonthName]);

  // Datos semanales para gráfico de líneas
  const prepareSemanalesData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const firstCenter = filteredCenters[0];
    if (!firstCenter) return [];
    
    const semanales = firstCenter?.semanales;
    if (!semanales) return [];
    
    const chartData: ChartData[] = [];
    const semanas = Object.keys(semanales.clima || {});
    
    semanas.forEach(semana => {
      chartData.push({
        semana,
        temperatura: semanales.clima[semana]?.temperatura || 0,
        precipitacion: semanales.clima[semana]?.precipitacion || 0,
        consumo: semanales.consumo_alimentos[semana] || 0,
        fcr: semanales.fcr[semana] || 0,
        peso: semanales.peso_promedio[semana] || 0
      });
    });
    
    return chartData;
  }, [data, getFilteredDataForCenters]);

  return {
    climaData: prepareClimaData,
    consumoData: prepareConsumoData,
    fcrData: prepareFcrData,
    semanalesData: prepareSemanalesData
  };
};
