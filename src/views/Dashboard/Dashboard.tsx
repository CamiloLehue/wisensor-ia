import { useDashboard } from "./hooks/useDashboard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { useState, useMemo, useEffect, useCallback } from 'react';

function DashboardOld() {
  const { data } = useDashboard();

  // Estados para los filtros
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  // const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  // const [dateRange, setDateRange] = useState<{start: string, end: string}>({
  //   start: '',
  //   end: ''
  // });
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

  // Transformar datos de clima para gráfico comparativo por años
  const prepareClimaData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: Array<Record<string, string | number>> = [];
    
    // Crear estructura base con 12 meses
    for (let mes = 1; mes <= 12; mes++) {
      const monthData: Record<string, string | number> = { month: getMonthName(mes) };
      
      filteredCenters.forEach(centerData => {
        const climaData = centerData?.ciclos?.clima || [];
        const filteredClimaData = climaData.filter(yearData => 
          selectedYears.length === 0 || selectedYears.includes(yearData.id_año)
        );
        
        filteredClimaData.forEach(yearData => {
          const mesData = yearData.meses.find(m => m.id_mes === mes);
          if (mesData?.datos?.promedioMensual) {
            const keyPrefix = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_temp_${yearData.id_año}`
              : `temp_${yearData.id_año}`;
            monthData[keyPrefix] = mesData.datos.promedioMensual.temperatura;
            
            const precipKey = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_precip_${yearData.id_año}`
              : `precip_${yearData.id_año}`;
            monthData[precipKey] = mesData.datos.promedioMensual.precipitacionTotal;
          }
        });
      });
      
      chartData.push(monthData);
    }
    
    return chartData;
  }, [data, selectedYears, getFilteredDataForCenters, compareCenters, selectedCenters]);

  // Transformar datos de consumo de alimentos
  const prepareConsumoData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: Array<Record<string, string | number>> = [];
    
    for (let mes = 1; mes <= 12; mes++) {
      const monthData: Record<string, string | number> = { month: getMonthName(mes) };
      
      filteredCenters.forEach(centerData => {
        const consumoData = centerData?.ciclos?.consumo_alimentos || [];
        const filteredConsumoData = consumoData.filter(yearData => 
          selectedYears.length === 0 || selectedYears.includes(yearData.id_año)
        );
        
        filteredConsumoData.forEach(yearData => {
          const mesData = yearData.meses.find(m => m.id_mes === mes);
          if (mesData?.datos?.consumoTotalMensual) {
            const keyPrefix = compareCenters && selectedCenters.length > 1 
              ? `${centerData.nombreCentro}_consumo_${yearData.id_año}`
              : `consumo_${yearData.id_año}`;
            monthData[keyPrefix] = mesData.datos.consumoTotalMensual;
          }
        });
      });
      
      chartData.push(monthData);
    }
    
    return chartData;
  }, [data, selectedYears, getFilteredDataForCenters, compareCenters, selectedCenters]);

  // Transformar datos de FCR
  const prepareFcrData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const chartData: Array<Record<string, string | number>> = [];
    
    for (let mes = 1; mes <= 12; mes++) {
      const monthData: Record<string, string | number> = { month: getMonthName(mes) };
      
      filteredCenters.forEach(centerData => {
        const fcrData = centerData?.ciclos?.fcr || [];
        const filteredFcrData = fcrData.filter(yearData => 
          selectedYears.length === 0 || selectedYears.includes(yearData.id_año)
        );
        
        filteredFcrData.forEach(yearData => {
          const mesData = yearData.meses.find(m => m.id_mes === mes);
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
  }, [data, selectedYears, getFilteredDataForCenters, compareCenters, selectedCenters]);

  // Datos semanales para gráfico de líneas
  const prepareSemanalesData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const filteredCenters = getFilteredDataForCenters();
    const firstCenter = filteredCenters[0];
    if (!firstCenter) return [];
    
    const semanales = firstCenter?.semanales;
    if (!semanales) return [];
    
    const chartData: Array<Record<string, string | number>> = [];
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

  const climaData = prepareClimaData;
  const consumoData = prepareConsumoData;
  const fcrData = prepareFcrData;
  const semanalesData = prepareSemanalesData;

  // Función para renderizar gráfico dinámicamente
  const renderChart = (data: Array<Record<string, string | number>>, dataKeys: string[], colors: string[]) => {
    const ChartComponent = chartType === 'bar' ? BarChart : chartType === 'area' ? AreaChart : LineChart;
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="month" stroke="#E5E7EB" fontSize={12} />
          <YAxis stroke="#E5E7EB" fontSize={12} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Legend />
          {chartType === 'bar' ? (
            dataKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={colors[index % colors.length]} name={key} />
            ))
          ) : chartType === 'area' ? (
            dataKeys.map((key, index) => (
              <Area key={key} type="monotone" dataKey={key} stackId={index + 1} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} name={key} />
            ))
          ) : (
            dataKeys.map((key, index) => (
              <Line key={key} type="monotone" dataKey={key} stroke={colors[index % colors.length]} name={key} strokeWidth={2} />
            ))
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

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
  
  return (
    <div className="relative w-full h-full p-4 gap-4 flex flex-col">
      {/* Header con información del centro */}
      <div className="w-full">
        <h1 className="text-2xl font-bold text-white mb-2">
          Dashboard - {
            compareCenters && selectedCenters.length > 1 
              ? `Comparación: ${selectedCenters.join(', ')}`
              : selectedCenters.length > 0 
                ? selectedCenters[0]
                : 'Centro de Datos'
          }
        </h1>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {data?.[0]?.promedios && (
            <>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-lg">
                <h3 className="text-white text-sm font-medium">FCR Promedio</h3>
                <p className="text-2xl font-bold text-white">{data[0].promedios.fcr_promedio.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-4 rounded-lg">
                <h3 className="text-white text-sm font-medium">Peso Promedio</h3>
                <p className="text-2xl font-bold text-white">{data[0].promedios.peso_promedio.toFixed(1)} kg</p>
              </div>
              <div className="bg-gradient-to-r from-orange-600 to-orange-800 p-4 rounded-lg">
                <h3 className="text-white text-sm font-medium">Temperatura Promedio</h3>
                <p className="text-2xl font-bold text-white">{data[0].promedios.temperatura_promedio.toFixed(1)}°C</p>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-lg">
                <h3 className="text-white text-sm font-medium">Precipitación Promedio</h3>
                <p className="text-2xl font-bold text-white">{data[0].promedios.precipitacion_promedio.toFixed(1)} mm</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Panel de Filtros */}
      <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
        <div className="flex flex-wrap gap-6 items-center">
          
          {/* Selector de Años */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-2">Años a Comparar</label>
            <div className="flex gap-2">
              {availableYears.map(year => (
                <label key={year} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedYears.includes(year)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedYears([...selectedYears, year]);
                      } else {
                        setSelectedYears(selectedYears.filter(y => y !== year));
                      }
                    }}
                    className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white text-sm">{year}</span>
                </label>
              ))}
            </div>
          </div>         

          {/* Selector de Métrica */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-2">Métrica Principal</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2 w-36"
            >
              <option value="all">Todas</option>
              <option value="temperatura">Temperatura</option>
              <option value="precipitacion">Precipitación</option>
              <option value="consumo">Consumo</option>
              <option value="fcr">FCR</option>
              <option value="peso">Peso</option>
            </select>
          </div>

          {/* Tipo de Gráfico */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-2">Tipo de Gráfico</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2 w-32"
            >
              <option value="line">Líneas</option>
              <option value="bar">Barras</option>
              <option value="area">Área</option>
            </select>
          </div>

          {/* Rango de Fechas */}
         

          {/* Toggle Comparación */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-2">Modo Comparación</label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showComparison}
                onChange={(e) => setShowComparison(e.target.checked)}
                className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white text-sm">Comparar Años</span>
            </label>
          </div>

          {/* Filtro de Centros */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-2">Centros</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={compareCenters}
                  onChange={(e) => setCompareCenters(e.target.checked)}
                  className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-white text-sm">Comparar Centros</span>
              </label>
              <div className="flex flex-wrap gap-1 max-w-48">
                {availableCenters.map((center) => (
                  <button
                    key={center}
                    onClick={() => {
                      if (compareCenters) {
                        // En modo comparación, permite múltiples selecciones
                        setSelectedCenters(prev => 
                          prev.includes(center)
                            ? prev.filter(c => c !== center)
                            : [...prev, center]
                        );
                      } else {
                        // En modo individual, solo uno a la vez
                        setSelectedCenters([center]);
                      }
                    }}
                    className={`px-2 py-1 rounded text-xs ${
                      selectedCenters.includes(center)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    {center}
                  </button>
                ))}
                {availableCenters.length > 1 && (
                  <button
                    onClick={() => setSelectedCenters(availableCenters)}
                    className="px-2 py-1 rounded text-xs bg-green-600 text-white hover:bg-green-700"
                  >
                    Todos
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-2">Acciones</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedYears(availableYears);
                  setSelectedMetric('all');
                  setChartType('line');
                  setShowComparison(true);
                  setSelectedCenters(availableCenters);
                  setCompareCenters(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-lg transition-colors"
              >
                Todos
              </button>
              <button
                onClick={() => {
                  setSelectedYears([]);
                  setSelectedMetric('all');
                  setSelectedCenters(availableCenters.length > 0 ? [availableCenters[0]] : []);
                  setCompareCenters(false);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-3 py-1 rounded-lg transition-colors"
              >
                Limpiar
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Grid de gráficos */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Gráfico Principal Dinámico */}
        {(selectedMetric === 'all' || selectedMetric === 'temperatura') && (
          <div className="relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg h-full">
            <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-4 flex flex-col shadow-lg h-full">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Temperatura Mensual ({chartType === 'line' ? 'Líneas' : chartType === 'bar' ? 'Barras' : 'Área'})
                </h2>
                <p className="text-sm text-gray-400">
                  Años: {selectedYears.length > 0 ? selectedYears.join(', ') : 'Todos'}
                </p>
              </div>
              
              <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
                {renderChart(
                  climaData.length > 0 ? climaData : fallbackData,
                  getDataKeys('temperatura'),
                  chartColors
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gráfico de Consumo */}
        {(selectedMetric === 'all' || selectedMetric === 'consumo') && (
          <div className="relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg h-full">
            <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-4 flex flex-col shadow-lg h-full">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Consumo de Alimentos ({chartType === 'line' ? 'Líneas' : chartType === 'bar' ? 'Barras' : 'Área'})
                </h2>
                <p className="text-sm text-gray-400">
                  Años: {selectedYears.length > 0 ? selectedYears.join(', ') : 'Todos'}
                </p>
              </div>
              
              <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
                {renderChart(
                  consumoData.length > 0 ? consumoData : fallbackData,
                  getDataKeys('consumo'),
                  chartColors.slice(2)
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gráfico de FCR */}
        {(selectedMetric === 'all' || selectedMetric === 'fcr') && (
          <div className="relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg h-full">
            <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-4 flex flex-col shadow-lg h-full">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  FCR Mensual ({chartType === 'line' ? 'Líneas' : chartType === 'bar' ? 'Barras' : 'Área'})
                </h2>
                <p className="text-sm text-gray-400">
                  Años: {selectedYears.length > 0 ? selectedYears.join(', ') : 'Todos'} | FCR: Factor de Conversión Alimenticia
                </p>
              </div>
              
              <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
                {renderChart(
                  fcrData.length > 0 ? fcrData : fallbackData,
                  getDataKeys('fcr'),
                  chartColors.slice(4)
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gráfico de Precipitación */}
        {(selectedMetric === 'all' || selectedMetric === 'precipitacion') && (
          <div className="relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg h-full">
            <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-4 flex flex-col shadow-lg h-full">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Precipitación Mensual ({chartType === 'line' ? 'Líneas' : chartType === 'bar' ? 'Barras' : 'Área'})
                </h2>
                <p className="text-sm text-gray-400">
                  Años: {selectedYears.length > 0 ? selectedYears.join(', ') : 'Todos'}
                </p>
              </div>
              
              <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
                {renderChart(
                  climaData.length > 0 ? climaData : fallbackData,
                  getDataKeys('precipitacion'),
                  chartColors.slice(1)
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gráfico de Datos Semanales - Solo se muestra si selectedMetric es 'all' o 'peso' */}
        {(selectedMetric === 'all' || selectedMetric === 'peso') && (
          <div className="relative bg-gradient-to-bl to-[#115dd76d] via-[#18182a] from-[#02c6fc7e] p-[1px]  h-full">
            <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e]  border border-[#283a53] p-4 flex flex-col shadow-lg h-full">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-2">Tendencias Semanales</h2>
                <p className="text-sm text-gray-400">Datos semanales combinados - Últimas 8 semanas</p>
              </div>
              
              <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={semanalesData.length > 0 ? semanalesData.slice(0, 8) : []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="semana" stroke="#E5E7EB" fontSize={12} />
                    <YAxis stroke="#E5E7EB" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="temperatura" stroke="#F59E0B" name="Temperatura" strokeWidth={2} />
                    <Line type="monotone" dataKey="fcr" stroke="#8B5CF6" name="FCR" strokeWidth={2} />
                    <Line type="monotone" dataKey="peso" stroke="#10B981" name="Peso" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Gráfico Comparativo Unificado - Solo cuando selectedMetric es 'all' */}
        {selectedMetric === 'all' && showComparison && (
          <div className="relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg h-full lg:col-span-2">
            <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-4 flex flex-col shadow-lg h-full">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-2">Vista Comparativa Unificada</h2>
                <p className="text-sm text-gray-400">
                  Todas las métricas por años seleccionados: {selectedYears.length > 0 ? selectedYears.join(', ') : 'Todos'}
                </p>
              </div>
              
              <div className="flex-1 w-full" style={{ minHeight: '400px' }}>
                {renderChart(
                  climaData.length > 0 ? climaData : fallbackData,
                  getDataKeys('all'),
                  chartColors
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default DashboardOld;
