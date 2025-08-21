import { type DashboardFilters } from "./types";

interface DashboardFiltersProps {
  filters: DashboardFilters;
  availableCiclos: string[];
  availableCenters: string[];
  setters: {
    setSelectedCiclos: (ciclos: string[]) => void;
    setSelectedMetric: (metric: string) => void;
    setChartType: (type: string) => void;
    setShowComparison: (show: boolean) => void;
    setSelectedCenters: (centers: string[]) => void;
    setCompareCenters: (compare: boolean) => void;
    setCompareCiclos: (compare: boolean) => void;
  };
}

export const DashboardFiltersPanel = ({
  filters,
  availableCiclos,
  availableCenters,
  setters,
}: DashboardFiltersProps) => {
  const {
    selectedCiclos,
    selectedMetric,
    chartType,
    showComparison,
    selectedCenters,
    compareCenters,
    compareCiclos,
  } = filters;

  const {
    setSelectedCiclos,
    setSelectedMetric,
    setChartType,
    setShowComparison,
    setSelectedCenters,
    setCompareCenters,
    setCompareCiclos,
  } = setters;

  const handleCicloChange = (ciclo: string, checked: boolean) => {
    if (checked) {
      setSelectedCiclos([...selectedCiclos, ciclo]);
    } else {
      setSelectedCiclos(selectedCiclos.filter((c) => c !== ciclo));
    }
  };

  const handleCenterSelection = (center: string) => {
    if (compareCenters) {
      // En modo comparación, permite múltiples selecciones
      const newSelection = selectedCenters.includes(center)
        ? selectedCenters.filter((c) => c !== center)
        : [...selectedCenters, center];

      // Asegurar que al menos un centro esté seleccionado
      if (newSelection.length > 0) {
        setSelectedCenters(newSelection);
      }
    } else {
      // En modo individual, solo uno a la vez
      setSelectedCenters([center]);
    }
  };

  const handleCompareCentersChange = (checked: boolean) => {
    setCompareCenters(checked);

    if (!checked && selectedCenters.length > 1) {
      // Si se desactiva la comparación y hay múltiples centros seleccionados,
      // mantener solo el primero
      setSelectedCenters([selectedCenters[0]]);
    } else if (checked && selectedCenters.length === 0) {
      // Si se activa la comparación y no hay centros seleccionados,
      // seleccionar el primer centro disponible
      if (availableCenters.length > 0) {
        setSelectedCenters([availableCenters[0]]);
      }
    }
  };

  const handleSelectAllCiclos = () => {
    setSelectedCiclos(availableCiclos);
    setSelectedMetric("all");
    setChartType("line");
    setShowComparison(true);
    setSelectedCenters(availableCenters);
    setCompareCenters(true);
  };

  const handleClearAll = () => {
    setSelectedCiclos([]);
    setSelectedMetric("all");
    setSelectedCenters(
      availableCenters.length > 0 ? [availableCenters[0]] : []
    );
    setCompareCenters(false);
    setCompareCiclos(false);
    setShowComparison(false);
  };
  // bg-gradient-to-l to-[#18182a] from-[#070714]
  return (
    <div className="relative group  rounded-lg border border-[#283a53] p-3 grid grid-cols-6 place-items-start place-content-between gap-6 shadow-lg ">
      {/* Selector de Centros */}
      <CardFilter className="flex flex-col w-full">
        <div className="bg-gradient-to-bl from-[#1b1b2e] to-[#09497e] p-3">
          <label className="text-sm font-medium text-gray-300 mb-2">
            Centro
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={compareCenters}
                onChange={(e) => handleCompareCentersChange(e.target.checked)}
                className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white text-sm">Comparar Centros</span>
              {compareCenters && (
                <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-tl from-[#032e79]  to-[#0baeef] text-[#ffffff] rounded-full">
                  {selectedCenters.length} seleccionados
                </span>
              )}
            </label>
            <div className="flex flex-nowrap gap-1 w-full">
              {availableCenters.map((center) => (
                <button
                  key={center}
                  onClick={() => handleCenterSelection(center)}
                  disabled={!compareCenters && selectedCenters.includes(center)}
                  className={`px-5 py-2  rounded-md font-semibold w-full transition-colors cursor-pointer ${
                    selectedCenters.includes(center)
                      ? "bg-gradient-to-tl from-[#032e79]  to-[#0baeef] text-[#ffffff] border border-[#0baeef] text-lg"
                      : "border border-dashed border-[#3f88d0] text-gray-300 hover:bg-[#032e79] hover:text-white"
                  } ${
                    !compareCenters && selectedCenters.includes(center)
                      ? "cursor-default"
                      : ""
                  }`}
                >
                  {center}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardFilter>

      {/* Selector de Ciclos */}
      <CardFilter className="flex flex-col w-full">
        <div className="p-3">
          <label className="text-sm font-medium text-gray-300 mb-2">
            Ciclos a Comparar
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={compareCiclos}
                onChange={(e) => setCompareCiclos(e.target.checked)}
                className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white text-sm">Comparar Ciclos</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {availableCiclos.map((ciclo) => (
                <label key={ciclo} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCiclos.includes(ciclo)}
                    onChange={(e) => handleCicloChange(ciclo, e.target.checked)}
                    className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white text-sm">{ciclo}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </CardFilter>

      {/* Selector de Métrica */}
      <CardFilter className="flex flex-col p-3">
        <label className="text-sm font-medium text-gray-300 mb-2">
          Métrica Principal
        </label>
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
      </CardFilter>

      {/* Tipo de Gráfico */}
      <CardFilter className="flex flex-col p-3">
        <label className="text-sm font-medium text-gray-300 mb-2">
          Tipo de Gráfico
        </label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2 w-32"
        >
          <option value="line">Líneas</option>
          <option value="bar">Barras</option>
          <option value="area">Área</option>
        </select>
      </CardFilter>

      {/* Toggle Comparación */}
      <CardFilter className="flex flex-col p-3">
        <label className="text-sm font-medium text-gray-300 mb-2">
          Modo Comparación
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showComparison}
            onChange={(e) => setShowComparison(e.target.checked)}
            className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-white text-sm">Comparar Ciclos</span>
        </label>
      </CardFilter>

      {/* Selector de Métrica */}
      <CardFilter className="flex flex-col p-3">
        <label className="text-sm font-medium text-gray-300 mb-2">
          Acciones
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleSelectAllCiclos}
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
      </CardFilter>
    </div>
  );
};

const CardFilter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div className="w-full h-[100%] relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg">
      <div
        className={`relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53]  flex flex-col shadow-lg h-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
