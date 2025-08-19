const API_URL = import.meta.env.VITE_API_BASE_URL;
import { DashboardType } from "../types/DashboardType";

export const getDashboard = async (): Promise<DashboardType[]> => {
  const response = await fetch(`${API_URL}/dashboard/data`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const data: DashboardType[] = await response.json();

  return data;
};
