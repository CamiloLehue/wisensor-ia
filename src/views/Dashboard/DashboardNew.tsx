import {
  DashboardHeader,
  DashboardFiltersPanel,
  ChartsGrid,
  useDashboardLogic,
  usePreparedData,
} from "./components";

function Dashboard() {
  const {
    data,
    filters,
    setters,
    availableCenters,
    availableCiclos,
    getFilteredDataForCenters,
    getDataKeys,
    getMonthName,
    chartColors,
    fallbackData,
  } = useDashboardLogic();

  const { climaData, consumoData, fcrData, semanalesData } = usePreparedData(
    data || [],
    getFilteredDataForCenters,
    getMonthName,
    filters.selectedCenters,
    filters.compareCenters
  );

  return (
    <div className="relative w-full h-screen p-4 gap-2 grid grid-cols-12 overflow-hidden">
      <div className="col-span-2 h-full">
        <DashboardFiltersPanel
          filters={filters}
          availableCiclos={availableCiclos}
          availableCenters={availableCenters}
          setters={setters}
        />
      </div>
      <div className="col-span-10 flex flex-col w-full h-full gap-2">
        <div className="flex-shrink-0">
          <DashboardHeader
            data={data}
            selectedCenters={filters.selectedCenters}
            compareCenters={filters.compareCenters}
          />
        </div>
        <div className="flex-1 min-h-0">
          <ChartsGrid
            selectedMetric={filters.selectedMetric}
            chartType={filters.chartType}
            selectedYears={filters.selectedCiclos}
            showComparison={filters.showComparison}
            climaData={climaData}
            consumoData={consumoData}
            fcrData={fcrData}
            semanalesData={semanalesData}
            fallbackData={fallbackData}
            getDataKeys={getDataKeys}
            chartColors={chartColors}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
