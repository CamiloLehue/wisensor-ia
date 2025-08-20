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
    availableYears,
    getFilteredDataForCenters,
    getDataKeys,
    chartColors,
    fallbackData,
  } = useDashboardLogic();

  const { climaData, consumoData, fcrData, semanalesData } = usePreparedData(
    data || [],
    getFilteredDataForCenters,
    (monthId: number) => {
      const months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      return months[monthId - 1] || `Mes ${monthId}`;
    },
    filters.selectedYears,
    filters.selectedCenters,
    filters.compareCenters
  );

  return (
    <div className="relative w-full h-full p-4 gap-4 flex flex-col">
      <DashboardFiltersPanel
        filters={filters}
        availableYears={availableYears}
        availableCenters={availableCenters}
        setters={setters}
      />
      <DashboardHeader
        data={data}
        selectedCenters={filters.selectedCenters}
        compareCenters={filters.compareCenters}
      />

      <ChartsGrid
        selectedMetric={filters.selectedMetric}
        chartType={filters.chartType}
        selectedYears={filters.selectedYears}
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
  );
}

export default Dashboard;
