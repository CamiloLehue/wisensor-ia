import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import { DashboardType } from "../types/DashboardType";

export const useDashboard = () => {
  const [data, setData] = useState<DashboardType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardData = await getDashboard();
      setData(dashboardData);
    };

    fetchData();
  }, []);

  console.log(data);

  return { data };

};
