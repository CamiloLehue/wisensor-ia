import { type DashboardFilters } from "./types";
import { CustomCheckbox } from "./CustomCheckbox";
import { AdvancedButton } from "../../../components/ui/AdvancedButton";

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
    <CardFilter className="relative group rounded-lg p-3 flex flex-col justify-start items-center gap-3 shadow-lg h-full ">
      {/* Selector de Centros */}
      <div className="flex flex-col w-full">
        <div className="border border-dashed border-[#3f88d0] bg-gradient-to-bl from-[#1b1b2e] to-[#09497e] p-3 w-full h-full flex flex-col justify-center items-center">
          <label className="text-sm font-medium text-white/80 mb-5 text-center">
            Centros
          </label>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-center">
              <CustomCheckbox
                checked={compareCenters}
                onChange={handleCompareCentersChange}
                label="Comparar Centros"
              />
              {compareCenters && (
                <span className="ml-2 px-2 py-1 text-xs text-nowrap border-b border-[#0baeef]">
                  {selectedCenters.length} seleccionados
                </span>
              )}
            </div>
            <div className="flex flex-col flex-nowrap gap-1 w-full">
              {availableCenters.map((center) => (
                <AdvancedButton
                  key={center}
                  variant={
                    selectedCenters.includes(center) ? "solid" : "border"
                  }
                  size="small"
                  onClick={() => handleCenterSelection(center)}
                  disabled={!compareCenters && selectedCenters.includes(center)}
                  className={`w-full text-sm font-semibold ${
                    selectedCenters.includes(center)
                      ? ""
                      : "!border-dashed !border-[#3f88d0] !text-white hover:!bg-[#032e79]"
                  } ${
                    !compareCenters && selectedCenters.includes(center)
                      ? "!cursor-default"
                      : ""
                  }`}
                >
                  {center}
                </AdvancedButton>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Selector de Métrica */}
      <div className="p-3 flex flex-col justify-center items-center w-full">
        <label className="text-sm font-medium text-white/80 mb-5 text-center">
          Acciones
        </label>
        <div className="grid grid-cols-2 w-full gap-2">
          <AdvancedButton
            variant="success"
            size="small"
            onClick={handleSelectAllCiclos}
            className="w-full"
          >
            Todos
          </AdvancedButton>
          <AdvancedButton variant="ghost" size="small" onClick={handleClearAll}>
            Limpiar
          </AdvancedButton>
        </div>
      </div>

      {/* Selector de Ciclos */}
      <div className="p-3 flex flex-col justify-center items-center w-full">
        <label className="text-sm font-medium text-white/80 mb-5 text-center">
          Ciclos a Comparar
        </label>
        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <CustomCheckbox
            checked={compareCiclos}
            onChange={setCompareCiclos}
            label="Comparar Ciclos"
          />
          <div className="flex gap-2 flex-wrap">
            {availableCiclos.map((ciclo) => (
              <CustomCheckbox
                key={ciclo}
                checked={selectedCiclos.includes(ciclo)}
                onChange={(checked) => handleCicloChange(ciclo, checked)}
                label={ciclo}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Comparación */}
      <div className=" p-3 flex flex-col justify-center items-center w-full">
        <label className="text-sm font-medium text-white/80 mb-5 text-center">
          Modo Comparación
        </label>
        <div className="flex justify-start items-center w-full">
          <CustomCheckbox
          checked={showComparison}
          onChange={setShowComparison}
          label="Comparar Ciclos"
        />
        </div>
      </div>

      {/* Selector de Métrica */}
      <div className="p-3 flex flex-col justify-center items-center w-full">
        <label className="text-sm font-medium text-white/80 mb-5 text-center">
          Métrica Principal
        </label>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="bg-[#051a38] border border-[#1f5593] text-white text-sm rounded p-2 w-full outline-none focus:ring-0 focus:ring-transparent"
        >
          <option value="all">Ver todos</option>
          <option value="temperatura">Temperatura</option>
          <option value="precipitacion">Precipitación</option>
          <option value="consumo">Consumo</option>
          <option value="fcr">FCR</option>
          <option value="peso">Peso</option>
        </select>
      </div>

      {/* Tipo de Gráfico */}
      <div className="p-3 flex flex-col justify-center items-center w-full">
        <label className="text-sm font-medium text-white/80 mb-5 text-center">
          Tipo de Gráfico
        </label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-[#051a38] border border-[#1f5593] text-white text-sm rounded p-2 w-full outline-none focus:ring-0 focus:ring-transparent"
        >
          <option value="line">Líneas</option>
          <option value="bar">Barras</option>
          <option value="area">Área</option>
        </select>
      </div>
    </CardFilter>
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
    <div className="w-full h-[100%] relative bg-gradient-to-b to-[#02c2fc]  from-[#022e6d] p-[1px] rounded-lg">
      <div
        className={`relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53]  flex flex-col shadow-lg h-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
