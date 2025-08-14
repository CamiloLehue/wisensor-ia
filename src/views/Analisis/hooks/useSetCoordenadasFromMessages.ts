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
  setPrecipitacion?: Dispatch<SetStateAction<number | undefined>>,
  setFecha?: Dispatch<SetStateAction<string | undefined>>
) => {
  useEffect(() => {
    // Logs para depuración
    console.log("Messages recibidos:", messages);

    // Verificar la estructura completa del último mensaje y sus datos climáticos
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
    }

    // Verificar si hay mensajes
    if (messages.length > 0) {
      // Obtener el último mensaje
      const lastMessage = messages[messages.length - 1] as MessagesType;
      
      
      // Verificar si el mensaje tiene las coordenadas en debug_context
      if (lastMessage?.debug_context?.coordendadas?.coordinates?.length > 0) {
        // Obtener la primera coordenada del arreglo de coordinates
        const firstCoordinate = lastMessage.debug_context.coordendadas.coordinates[0];
        const zoom = lastMessage.debug_context.coordendadas.zoom;
        const clima = lastMessage.debug_context.coordendadas.clima as WeatherType;
        
        
        // Extraer lat y lng del primer par de coordenadas y actualizar estado
        const [lat, lng] = firstCoordinate;
        setCoordenadas([lat, lng]);
        setZoomMap(zoom);
        
        if (clima) {
          setTipoClima(clima);
        }
        
        // Extraer datos del clima si existen
        
        if (lastMessage?.debug_context?.datos_centros?.length > 0) {
          // Intentamos ambas posibles estructuras
          const datosCentroObj = lastMessage.debug_context.datos_centros[0] as any;
          
          
          // Primero intentamos acceder asumiendo que es un objeto DatosCentroClass
          if (datosCentroObj && typeof datosCentroObj === 'object') {
            // Comprobar si hay una propiedad data directa
            const dataArray = datosCentroObj.data || [];
            
            if (dataArray.length > 0) {
              const ultimoDato = dataArray[0]; // Obtenemos el dato más reciente
              
            
            if (setTemperatura && ultimoDato.temperatura_maxima !== undefined) {
              setTemperatura(ultimoDato.temperatura_maxima);
            }
            
            if (setViento && ultimoDato.viento !== undefined) {
              setViento(ultimoDato.viento);
            }
            
            if (setPrecipitacion && ultimoDato.precipitacion !== undefined) {
              setPrecipitacion(ultimoDato.precipitacion);
            }
            
            if (setFecha && ultimoDato.fecha !== undefined) {
              setFecha(ultimoDato.fecha);
            }
            }
          }
        }
      } else {
        console.log("No se encontraron coordenadas en el mensaje");
      }
    }
  }, [messages, setCoordenadas, setZoomMap, setTipoClima, setTemperatura, setViento, setPrecipitacion, setFecha]);
};