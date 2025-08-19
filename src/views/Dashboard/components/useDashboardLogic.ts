import { useState, useMemo, useEffect, useCallback } from 'react';
import { DashboardFilters } from './types';
import { useDashboard } from '../hooks/useDashboard';

export const useDashboardLogic = () => {
  const { data } = useDashboard();

  // Estados para los filtros
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const [chartType, setChartType] = useState<string>('line');
  const [showComparison, setShowComparison] = useState<boolean>(true);
  const [selectedCenters, setSelectedCenters] = useState<string[]>([]);
  const [compareCenters, setCompareCenters] = useState<boolean>(false);

  // Función para obtener el nombre del mes
  const getMonthName = (monthId: number): string => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months[monthId - 1] || `Mes ${monthId}`;
  };

  // Obtener centros disponibles
  const availableCenters = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map(center => center.nombreCentro);
  }, [data]);

  // Obtener años disponibles en los datos
  const availableYears = useMemo(() => {
    if (!data || data.length === 0) return [2024, 2025];
    
    const climaYears = data[0]?.ciclos?.clima?.map(c => c.id_año) || [];
    const consumoYears = data[0]?.ciclos?.consumo_alimentos?.map(c => c.id_año) || [];
    const fcrYears = data[0]?.ciclos?.fcr?.map(c => c.id_año) || [];
    
    const allYears = [...new Set([...climaYears, ...consumoYears, ...fcrYears])];
    return allYears.length > 0 ? allYears.sort() : [2024, 2025];
  }, [data]);

  // Inicializar centros seleccionados
  useEffect(() => {
    if (selectedCenters.length === 0 && availableCenters.length > 0) {
      setSelectedCenters([availableCenters[0]]); // Seleccionar el primer centro por defecto
    }
  }, [availableCenters, selectedCenters.length, setSelectedCenters]);

  // Inicializar años seleccionados
  useEffect(() => {
    if (selectedYears.length === 0) {
      setSelectedYears(availableYears.slice(0, 2)); // Seleccionar los primeros 2 años por defecto
    }
  }, [availableYears, selectedYears.length, setSelectedYears]);

  // Función para filtrar datos por centros seleccionados
  const getFilteredDataForCenters = useCallback(() => {
    if (!data || data.length === 0) return [];
    
    if (compareCenters && selectedCenters.length > 1) {
      // Modo comparación entre centros
      return data.filter(center => selectedCenters.includes(center.nombreCentro));
    } else {
      // Modo centro único (primer centro seleccionado)
      const centerData = data.find(center => selectedCenters.includes(center.nombreCentro)) || data[0];
      return [centerData];
    }
  }, [data, selectedCenters, compareCenters]);

  // Función para obtener las claves de datos según la métrica seleccionada
  const getDataKeys = (dataType: string) => {
    if (!showComparison) return [];
    
    const years = selectedYears.length > 0 ? selectedYears : availableYears;
    
    switch (dataType) {
      case 'temperatura':
        return years.map(year => `temp_${year}`);
      case 'precipitacion':
        return years.map(year => `precip_${year}`);
      case 'consumo':
        return years.map(year => `consumo_${year}`);
      case 'fcr':
        return years.map(year => `fcr_${year}`);
      default:
        return years.flatMap(year => [`temp_${year}`, `consumo_${year}`, `fcr_${year}`]);
    }
  };

  // Colores para diferentes años y métricas
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'];

  // Datos estáticos como respaldo si no hay datos reales
  const fallbackData = [
    { month: 'Ene', temp_2024: 25.5, temp_2025: 26.2, consumo_2024: 120, consumo_2025: 115, fcr_2024: 1.2, fcr_2025: 1.1 },
    { month: 'Feb', temp_2024: 26.1, temp_2025: 25.8, consumo_2024: 125, consumo_2025: 118, fcr_2024: 1.3, fcr_2025: 1.2 },
    { month: 'Mar', temp_2024: 24.8, temp_2025: 27.1, consumo_2024: 110, consumo_2025: 122, fcr_2024: 1.1, fcr_2025: 1.3 },
    { month: 'Abr', temp_2024: 23.5, temp_2025: 28.0, consumo_2024: 105, consumo_2025: 130, fcr_2024: 1.0, fcr_2025: 1.4 },
    { month: 'May', temp_2024: 22.8, temp_2025: 24.6, consumo_2024: 98, consumo_2025: 108, fcr_2024: 0.9, fcr_2025: 1.1 },
    { month: 'Jun', temp_2024: 21.2, temp_2025: 23.2, consumo_2024: 92, consumo_2025: 102, fcr_2024: 0.8, fcr_2025: 1.0 }
  ];

  const filters: DashboardFilters = {
    selectedYears,
    selectedMetric,
    chartType,
    showComparison,
    selectedCenters,
    compareCenters
  };

  const setters = {
    setSelectedYears,
    setSelectedMetric,
    setChartType,
    setShowComparison,
    setSelectedCenters,
    setCompareCenters
  };

  return {
    data,
    filters,
    setters,
    availableCenters,
    availableYears,
    getFilteredDataForCenters,
    getDataKeys,
    getMonthName,
    chartColors,
    fallbackData
  };
};
