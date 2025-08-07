import { useEffect } from "react";

/**
 * Hook para setear coordenadas del mapa a partir del último mensaje con debug_context.coordendadas o coordinates
 * @param messages Lista de mensajes
 * @param setCoordenadas Setter de coordenadas del mapa
 */
export function useSetCoordenadasFromMessages(messages: any[], setCoordenadas: (c: [number, number]) => void) {
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (
      lastMsg.debug_context &&
      lastMsg.debug_context.coordendadas &&
      Array.isArray(lastMsg.debug_context.coordendadas.coordinates)
    ) {
      const coords = lastMsg.debug_context.coordendadas.coordinates;
      if (coords.length > 0 && Array.isArray(coords[0])) {
        const n = coords.length;
        let sumLat = 0;
        let sumLng = 0;
        coords.forEach(([lat, lng]: [number, number]) => {
          sumLat += lat;
          sumLng += lng;
        });
        setCoordenadas([sumLat / n, sumLng / n]);
        return;
      }
    }
    // Fallback: si no hay coordendadas, usar coordinates
    if (
      lastMsg.debug_context &&
      Array.isArray(lastMsg.debug_context.coordinates) &&
      lastMsg.debug_context.coordinates.length === 2 &&
      typeof lastMsg.debug_context.coordinates[0] === "number" &&
      typeof lastMsg.debug_context.coordinates[1] === "number"
    ) {
      setCoordenadas([
        lastMsg.debug_context.coordinates[0],
        lastMsg.debug_context.coordinates[1],
      ]);
    }
  }, [messages, setCoordenadas]);
}
