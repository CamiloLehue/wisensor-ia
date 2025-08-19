import { MapView } from "../maps";
import { useDashboard } from "./hooks/useDashboard";

function Dashboard() {
  const { data } = useDashboard();
  return (
    <div className="relative w-full h-full p-4 gap-4 flex">
      <div className="w-5/12 h-full rounded-lg overflow-hidden z-0">
        <MapView />
      </div>
      <div className="w-7/12  h-full rounded-lg">
        <div className=" relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg">
          <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-3 flex flex-col shadow-lg h-full min-h-[280px]">
            <h2 className="text-lg font-semibold text-white">Dashboard</h2>
            <p className="text-sm text-gray-400">Overview of your data</p>
          </div>
          <div>
            {
              data.map((item, index) => (
                <div key={index}>
                  <h3>{item.mensuales.clima["2023-12-17"].temperatura}</h3>
                  <p>{item.mensuales.clima["2023-12-17"].precipitacion}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
