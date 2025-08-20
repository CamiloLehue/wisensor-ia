import { useMemo } from 'react';
import { ChartData, DashboardData } from './types';

export const usePreparedData = (
  data: DashboardData[],
  getFilteredDataForCenters: () => DashboardData[],
  getMonthName: (monthId: number, year?: number) => string,
  selectedCenters: string[],
  compareCenters: boolean
) => {
  // Transformar datos de clima para gráfico comparativo por ciclos
  const prepareClimaData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: ChartData[] = [];
    
    // Obtener todos los meses del ciclo ordenados por orden_en_ciclo
    const allMonths: Array<{idMes: number, año: number, orden_en_ciclo: number}> = [];
    filteredCenters.forEach(centerData => {
      if (centerData?.ciclos?.meses) {
        centerData.ciclos.meses.forEach(mes => {
          if (mes.orden_en_ciclo > 0) { // Solo incluir meses que no están vacíos
            const existingMonth = allMonths.find(m => 
              m.idMes === mes.idMes && 
              m.año === mes.año && 
              m.orden_en_ciclo === mes.orden_en_ciclo
            );
            if (!existingMonth) {
              allMonths.push({
                idMes: mes.idMes,
                año: mes.año,
                orden_en_ciclo: mes.orden_en_ciclo
              });
            }
          }
        });
      }
    });
    
    const sortedMonths = allMonths.sort((a, b) => a.orden_en_ciclo - b.orden_en_ciclo);
    
    // Crear estructura base con todos los meses del ciclo ordenados cronológicamente
    sortedMonths.forEach(mesInfo => {
      const monthData: ChartData = { month: getMonthName(mesInfo.idMes, mesInfo.año) };
      
      filteredCenters.forEach(centerData => {
        if (centerData?.ciclos) {
          const mesData = centerData.ciclos.meses.find((m) => 
            m.idMes === mesInfo.idMes && 
            m.año === mesInfo.año &&
            m.orden_en_ciclo === mesInfo.orden_en_ciclo
          );
          if (mesData?.datos?.resumen_mensual) {
            const keyPrefix = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_temp_${centerData.ciclos.id_ciclo}`
              : `temp_${centerData.ciclos.id_ciclo}`;
            monthData[keyPrefix] = mesData.datos.resumen_mensual.temperaturaPromedio;
            
            const precipKey = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_precip_${centerData.ciclos.id_ciclo}`
              : `precip_${centerData.ciclos.id_ciclo}`;
            monthData[precipKey] = mesData.datos.resumen_mensual.precipitacionTotal;
          }
        }
      });
      
      chartData.push(monthData);
    });
    
    return chartData;
  }, [data, getFilteredDataForCenters, compareCenters, selectedCenters, getMonthName]);

  // Transformar datos de consumo
  const prepareConsumoData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: ChartData[] = [];
    
    // Obtener todos los meses del ciclo ordenados por orden_en_ciclo
    const allMonths: Array<{idMes: number, año: number, orden_en_ciclo: number}> = [];
    filteredCenters.forEach(centerData => {
      if (centerData?.ciclos?.meses) {
        centerData.ciclos.meses.forEach(mes => {
          if (mes.orden_en_ciclo > 0) { // Solo incluir meses que no están vacíos
            const existingMonth = allMonths.find(m => 
              m.idMes === mes.idMes && 
              m.año === mes.año && 
              m.orden_en_ciclo === mes.orden_en_ciclo
            );
            if (!existingMonth) {
              allMonths.push({
                idMes: mes.idMes,
                año: mes.año,
                orden_en_ciclo: mes.orden_en_ciclo
              });
            }
          }
        });
      }
    });
    
    const sortedMonths = allMonths.sort((a, b) => a.orden_en_ciclo - b.orden_en_ciclo);
    
    sortedMonths.forEach(mesInfo => {
      const monthData: ChartData = { month: getMonthName(mesInfo.idMes, mesInfo.año) };
      
      filteredCenters.forEach(centerData => {
        if (centerData?.ciclos) {
          const mesData = centerData.ciclos.meses.find((m) => 
            m.idMes === mesInfo.idMes && 
            m.año === mesInfo.año &&
            m.orden_en_ciclo === mesInfo.orden_en_ciclo
          );
          if (mesData?.datos?.resumen_mensual) {
            const keyPrefix = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_consumo_${centerData.ciclos.id_ciclo}`
              : `consumo_${centerData.ciclos.id_ciclo}`;
            monthData[keyPrefix] = mesData.datos.resumen_mensual.consumoTotal;
          }
        }
      });
      
      chartData.push(monthData);
    });
    
    return chartData;
  }, [data, getFilteredDataForCenters, compareCenters, selectedCenters, getMonthName]);

  // Transformar datos de FCR
  const prepareFcrData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: ChartData[] = [];
    
    // Obtener todos los meses del ciclo ordenados por orden_en_ciclo
    const allMonths: Array<{idMes: number, año: number, orden_en_ciclo: number}> = [];
    filteredCenters.forEach(centerData => {
      if (centerData?.ciclos?.meses) {
        centerData.ciclos.meses.forEach(mes => {
          if (mes.orden_en_ciclo > 0) { // Solo incluir meses que no están vacíos
            const existingMonth = allMonths.find(m => 
              m.idMes === mes.idMes && 
              m.año === mes.año && 
              m.orden_en_ciclo === mes.orden_en_ciclo
            );
            if (!existingMonth) {
              allMonths.push({
                idMes: mes.idMes,
                año: mes.año,
                orden_en_ciclo: mes.orden_en_ciclo
              });
            }
          }
        });
      }
    });
    
    const sortedMonths = allMonths.sort((a, b) => a.orden_en_ciclo - b.orden_en_ciclo);
    
    sortedMonths.forEach(mesInfo => {
      const monthData: ChartData = { month: getMonthName(mesInfo.idMes, mesInfo.año) };
      
      filteredCenters.forEach(centerData => {
        if (centerData?.ciclos) {
          const mesData = centerData.ciclos.meses.find((m) => 
            m.idMes === mesInfo.idMes && 
            m.año === mesInfo.año &&
            m.orden_en_ciclo === mesInfo.orden_en_ciclo
          );
          if (mesData?.datos?.resumen_mensual) {
            const keyPrefix = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_fcr_${centerData.ciclos.id_ciclo}`
              : `fcr_${centerData.ciclos.id_ciclo}`;
            monthData[keyPrefix] = mesData.datos.resumen_mensual.fcrPromedio;
          }
        }
      });
      
      chartData.push(monthData);
    });
    
    return chartData;
  }, [data, getFilteredDataForCenters, compareCenters, selectedCenters, getMonthName]);

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
