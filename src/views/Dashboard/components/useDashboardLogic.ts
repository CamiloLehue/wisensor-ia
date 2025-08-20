import { useState, useMemo, useEffect, useCallback } from 'react';
import { DashboardFilters } from './types';
import { useDashboard } from '../hooks/useDashboard';

export const useDashboardLogic = () => {
  const { data } = useDashboard();

  // Estados para los filtros
  const [selectedCiclos, setSelectedCiclos] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const [chartType, setChartType] = useState<string>('line');
  const [showComparison, setShowComparison] = useState<boolean>(true);
  const [selectedCenters, setSelectedCenters] = useState<string[]>([]);
  const [compareCenters, setCompareCenters] = useState<boolean>(false);
  const [compareCiclos, setCompareCiclos] = useState<boolean>(false);

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

  // Obtener ciclos disponibles en los datos
  const availableCiclos = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const ciclos = new Set<string>();
    data.forEach(center => {
      if (center.ciclos?.id_ciclo) {
        ciclos.add(center.ciclos.id_ciclo);
      }
    });
    
    return Array.from(ciclos).sort();
  }, [data]);

  // Inicializar centros seleccionados
  useEffect(() => {
    if (selectedCenters.length === 0 && availableCenters.length > 0) {
      setSelectedCenters([availableCenters[0]]); // Seleccionar el primer centro por defecto
    }
  }, [availableCenters, selectedCenters.length, setSelectedCenters]);

  // Inicializar ciclos seleccionados
  useEffect(() => {
    if (selectedCiclos.length === 0 && availableCiclos.length > 0) {
      setSelectedCiclos([availableCiclos[0]]); // Seleccionar el primer ciclo por defecto
    }
  }, [availableCiclos, selectedCiclos.length, setSelectedCiclos]);

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
    
    const ciclos = selectedCiclos.length > 0 ? selectedCiclos : availableCiclos;
    
    switch (dataType) {
      case 'temperatura':
        return ciclos.map(ciclo => `temp_${ciclo}`);
      case 'precipitacion':
        return ciclos.map(ciclo => `precip_${ciclo}`);
      case 'consumo':
        return ciclos.map(ciclo => `consumo_${ciclo}`);
      case 'fcr':
        return ciclos.map(ciclo => `fcr_${ciclo}`);
      default:
        return ciclos.flatMap(ciclo => [`temp_${ciclo}`, `consumo_${ciclo}`, `fcr_${ciclo}`]);
    }
  };

  // Colores para diferentes ciclos y métricas
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'];

  // Datos estáticos como respaldo si no hay datos reales
  const fallbackData = [
    { month: 'Ene', temp_I23F24: 25.5, consumo_I23F24: 120, fcr_I23F24: 1.2 },
    { month: 'Feb', temp_I23F24: 26.1, consumo_I23F24: 125, fcr_I23F24: 1.3 },
    { month: 'Mar', temp_I23F24: 24.8, consumo_I23F24: 110, fcr_I23F24: 1.1 },
    { month: 'Abr', temp_I23F24: 23.5, consumo_I23F24: 105, fcr_I23F24: 1.0 },
    { month: 'May', temp_I23F24: 22.8, consumo_I23F24: 98, fcr_I23F24: 0.9 },
    { month: 'Jun', temp_I23F24: 21.2, consumo_I23F24: 92, fcr_I23F24: 0.8 }
  ];

  const filters: DashboardFilters = {
    selectedCiclos,
    selectedMetric,
    chartType,
    showComparison,
    selectedCenters,
    compareCenters,
    compareCiclos
  };

  const setters = {
    setSelectedCiclos,
    setSelectedMetric,
    setChartType,
    setShowComparison,
    setSelectedCenters,
    setCompareCenters,
    setCompareCiclos
  };

  return {
    data,
    filters,
    setters,
    availableCenters,
    availableCiclos,
    getFilteredDataForCenters,
    getDataKeys,
    getMonthName,
    chartColors,
    fallbackData
  };
};
