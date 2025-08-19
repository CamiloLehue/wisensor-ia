import { type DashboardFilters } from './types';

interface DashboardFiltersProps {
  filters: DashboardFilters;
  availableYears: number[];
  availableCenters: string[];
  setters: {
    setSelectedYears: (years: number[]) => void;
    setSelectedMetric: (metric: string) => void;
    setChartType: (type: string) => void;
    setShowComparison: (show: boolean) => void;
    setSelectedCenters: (centers: string[]) => void;
    setCompareCenters: (compare: boolean) => void;
  };
}

export const DashboardFiltersPanel = ({ 
  filters, 
  availableYears, 
  availableCenters, 
  setters 
}: DashboardFiltersProps) => {
  const {
    selectedYears,
    selectedMetric,
    chartType,
    showComparison,
    selectedCenters,
    compareCenters
  } = filters;

  const {
    setSelectedYears,
    setSelectedMetric,
    setChartType,
    setShowComparison,
    setSelectedCenters,
    setCompareCenters
  } = setters;

  const handleYearChange = (year: number, checked: boolean) => {
    if (checked) {
      setSelectedYears([...selectedYears, year]);
    } else {
      setSelectedYears(selectedYears.filter(y => y !== year));
    }
  };

  const handleCenterSelection = (center: string) => {
    if (compareCenters) {
      // En modo comparación, permite múltiples selecciones
      setSelectedCenters(
        selectedCenters.includes(center)
          ? selectedCenters.filter(c => c !== center)
          : [...selectedCenters, center]
      );
    } else {
      // En modo individual, solo uno a la vez
      setSelectedCenters([center]);
    }
  };

  const handleSelectAllYears = () => {
    setSelectedYears(availableYears);
    setSelectedMetric('all');
    setChartType('line');
    setShowComparison(true);
    setSelectedCenters(availableCenters);
    setCompareCenters(true);
  };

  const handleClearAll = () => {
    setSelectedYears([]);
    setSelectedMetric('all');
    setSelectedCenters(availableCenters.length > 0 ? [availableCenters[0]] : []);
    setCompareCenters(false);
  };

  return (
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
                  onChange={(e) => handleYearChange(year, e.target.checked)}
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
           
            <div className="flex flex-wrap gap-1 max-w-48">
              {availableCenters.map((center) => (
                <button
                  key={center}
                  onClick={() => handleCenterSelection(center)}
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
              onClick={handleSelectAllYears}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-lg transition-colors"
            >
              Todos
            </button>
            <button
              onClick={handleClearAll}
              className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-3 py-1 rounded-lg transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
