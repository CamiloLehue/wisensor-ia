import { MessagesType, DatosCentroClass, Datum } from "../types/MessageType"; 
import { Dispatch, SetStateAction, useEffect } from "react";

import { WeatherType } from "../../zones/types/Zone";

export const useSetCoordenadasFromMessages = (
  messages: MessagesType[],
  setCoordenadas: Dispatch<SetStateAction<[number, number]>>,
  setZoomMap: Dispatch<SetStateAction<number>>,
  setTipoClima: Dispatch<SetStateAction<WeatherType>>,
  setTemperatura?: Dispatch<SetStateAction<number | undefined>>,
  setViento?: Dispatch<SetStateAction<number | undefined>>,
  setPrecipitacion?: Dispatch<SetStateAction<number | undefined>>
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
        const clima = lastMessage.debug_context.coordendadas.clima as WeatherType;
        
        console.log("Clima recibido:", clima);
        
        // Extraer lat y lng del primer par de coordenadas y actualizar estado
        const [lat, lng] = firstCoordinate;
        console.log("Actualizando coordenadas a:", [lat, lng]);
        setCoordenadas([lat, lng]);
        setZoomMap(zoom);
        
        if (clima) {
          console.log("Actualizando clima a:", clima);
          setTipoClima(clima);
        }
        
        // Extraer datos del clima si existen
        if (lastMessage?.debug_context?.datos_centro?.length > 0) {
          const datosCentro = lastMessage.debug_context.datos_centro[0] as DatosCentroClass;
          
          if (datosCentro && datosCentro.data && datosCentro.data.length > 0) {
            const ultimoDato = datosCentro.data[0]; // Obtenemos el dato más reciente
            
            console.log("Datos climáticos encontrados:", ultimoDato);
            
            if (setTemperatura && ultimoDato.temperatura_maxima !== undefined) {
              console.log("Actualizando temperatura a:", ultimoDato.temperatura_maxima);
              setTemperatura(ultimoDato.temperatura_maxima);
            }
            
            if (setViento && ultimoDato.viento !== undefined) {
              console.log("Actualizando viento a:", ultimoDato.viento);
              setViento(ultimoDato.viento);
            }
            
            if (setPrecipitacion && ultimoDato.precipitacion !== undefined) {
              console.log("Actualizando precipitación a:", ultimoDato.precipitacion);
              setPrecipitacion(ultimoDato.precipitacion);
            }
          }
        }
      } else {
        console.log("No se encontraron coordenadas en el mensaje");
      }
    }
  }, [messages, setCoordenadas, setZoomMap, setTipoClima, setTemperatura, setViento, setPrecipitacion]);
};