// import raw from "../../../assets/data/zones.json";
// import { ApiZoneData } from "../types/Zone";
import { ApiZoneData } from "../types/Zone";
const API_URL = import.meta.env.VITE_API_BASE_URL;

// export const getZones = async (): Promise<ApiZoneData[]> => {
//     return raw as ApiZoneData[];
// };

export const getZones = async (): Promise<ApiZoneData[]> => {
  // const token = localStorage.getItem("token");

  // if (!token) {
  //     throw new Error("Token no encontrado. El usuario no está autenticado.");
  // }

  const response = await fetch(`${API_URL}/question-analyzer/datos-centros`, {
    // headers: {
    // "Authorization": `Bearer ${token}`,
    // "Content-Type": "application/json",
    // },
  });

  if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
  }

  const data: ApiZoneData[] = await response.json();

  return data;
};
