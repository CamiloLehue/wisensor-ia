import { MessagesType } from "./types/MessageType";
import { Dispatch, SetStateAction, useEffect } from "react";

export const useSetCoordenadasFromMessages = (
  messages: MessagesType[],
  setCoordenadas: Dispatch<SetStateAction<[number, number]>>
  ,setZoomMap: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    // Logs para depuración
    console.log("Messages recibidos:", messages);

    // Verificar si hay mensajes
    if (messages.length > 0) {
      // Obtener el último mensaje
      const lastMessage = messages[messages.length - 1] as MessagesType;
      console.log("Último mensaje:", lastMessage);
      
      // Verificar la estructura del debug_context
      console.log("debug_context:", lastMessage?.debug_context);
      console.log("coordenadas:", lastMessage?.debug_context?.coordendadas);
      
      // Verificar si el mensaje tiene las coordenadas en debug_context
      if (lastMessage?.debug_context?.coordendadas?.coordinates?.length > 0) {
        // Obtener la primera coordenada del arreglo de coordinates
        const firstCoordinate = lastMessage.debug_context.coordendadas.coordinates[0];
        console.log("Primera coordenada encontrada:", firstCoordinate);
        const zoom = lastMessage.debug_context.coordendadas.zoom;
        
        // Extraer lat y lng del primer par de coordenadas y actualizar estado
        const [lat, lng] = firstCoordinate;
        console.log("Actualizando coordenadas a:", [lat, lng]);
        setCoordenadas([lat, lng]);
        setZoomMap(zoom);
      } else {
        console.log("No se encontraron coordenadas en el mensaje");
      }
    }
  }, [messages, setCoordenadas,setZoomMap]);
};