// Para el formato que viene del JSON
export interface ApiZoneData {
  id: string;  // Cambié a string porque en tu JSON los IDs son strings
  name: string;
  color: string;
  coordinates: [number, number][]; // Array de tuplas [lat, lng]
  category?: string; // Opcional porque no está en tu JSON
}

// Para el formato que usa tu aplicación (puede ser el mismo en este caso)
export interface ZoneData {
  id: string;
  name: string;
  coordinates: [number, number][];
  color: string;
  category?: string;
}