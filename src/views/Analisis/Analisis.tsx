import { useEffect, useRef, useState } from "react";
import { useSetCoordenadasFromMessages } from "../Analisis/hooks/useSetCoordenadasFromMessages.js";
import { useChatIA } from "./hooks/useChatIA";
import { WeatherType } from "../zones/types/Zone";
import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { InfoModal } from "./components/InfoModal";
import { MessagesType } from "./types/MessageType.js";
import { useTextAudio } from "./hooks/useVoice.js";
import { ChatBox } from "./components/ChatBox";
import { MapSection } from "./components/MapSection";

export const Analisis = () => {
  const [coordenadas, setCoordenadas] = useState<[number, number]>([
    -42.624623, -73.171303,
  ]);
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<
    string | null
  >(null);

  const [tipoClima, setTipoClima] = useState<WeatherType>("soleado");
  const [zoomMap, setZoomMap] = useState(9);
  const [temperatura, setTemperatura] = useState<number | undefined>(undefined);
  const [viento, setViento] = useState<number | undefined>(undefined);
  const [precipitacion, setPrecipitacion] = useState<number | undefined>(undefined);

  // Efecto para monitorear cambios en tipoClima
  useEffect(() => {
    console.log("Analisis: tipoClima cambió a:", tipoClima);
  }, [tipoClima]);
  
  // Efecto para monitorear cambios en los datos climáticos
  useEffect(() => {
    console.log("Analisis: datos climáticos actualizados:", { temperatura, viento, precipitacion });
  }, [temperatura, viento, precipitacion]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  console.log(setTipoClima);

  // Chat IA hook
  const {
    question,
    setQuestion,
    messages,
    isLoadingResponse,
    handleAskQuestion,
    handleClearChat,
    setAnswer,
  } = useChatIA({ 
    onWeatherChange: (clima: WeatherType) => setTipoClima(clima)
  });

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  // Centra el mapa en una zona específica (solo para botones externos)
  const handleFlyToZone = (lat: number, lng: number) => {
    // Si quieres centrar desde fuera, puedes usar map.flyTo desde GeoButtons
    // Aquí solo actualizamos el estado si se llama desde otro lado
    setCoordenadas([lat, lng]);
    setZoomMap(11);
  };

  // Sincroniza el estado después de la animación
  const handleFlyEnd = (lat: number, lng: number) => {
    setCoordenadas([lat, lng]);
    setZoomMap(11);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const { isRecording, startRecording, stopRecording, audioRef } =
    useAudioRecorder(setQuestion, setAnswer);

  useSetCoordenadasFromMessages(
    messages as MessagesType[],
    setCoordenadas,
    setZoomMap,
    setTipoClima,
    setTemperatura,
    setViento,
    setPrecipitacion
  );

  const { handleTextAudio, textAudio, isLoadingAudio } = useTextAudio();
  const audioCache = useRef<Map<string, string>>(new Map());

  const handlePlayAudioFunction = async (text: string, autoPlay = false) => {
    // Si ya está en caché, reproducir directamente
    if (audioCache.current.has(text)) {
      if (audioRef.current) {
        audioRef.current.src = `data:audio/wav;base64,${audioCache.current.get(
          text
        )}`;
        audioRef.current.currentTime = 0;
        setCurrentlyPlayingAudio(text);
        if (autoPlay) {
          audioRef.current.play();
        }
      }
      return;
    }

    // Marcar que este audio se está cargando
    setCurrentlyPlayingAudio(text);

    try {
      await handleTextAudio(text);

      if (textAudio && audioRef.current) {
        // Guardar en caché
        audioCache.current.set(text, textAudio);

        // Configurar el audio solo si sigue siendo el audio actual que queremos reproducir
        if (currentlyPlayingAudio === text) {
          audioRef.current.src = `data:audio/wav;base64,${textAudio}`;
          audioRef.current.currentTime = 0;

          // Reproducir automáticamente solo si es autoPlay (respuesta del servidor)
          if (autoPlay) {
            audioRef.current.play();
          }
        }
      }
    } catch (error) {
      console.error("Error al generar audio:", error);
      setCurrentlyPlayingAudio(null);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // Solo auto-reproducir si es respuesta del bot y no es el mensaje inicial
      if (
        lastMessage.sender === "bot" &&
        lastMessage.text !== "sin-pregunta" &&
        lastMessage.text !== "Buscando en WI-DB... Por favor, espera."
      ) {
        handlePlayAudioFunction(lastMessage.text, true);
      }
    }
  }, [messages]);
  return (
    <div className="flex h-full w-full text-white p-4 gap-4">
      {/* Sección del Mapa */}
      <MapSection
        handleFlyToZone={handleFlyToZone}
        onFlyEnd={handleFlyEnd}
        coordinates={coordenadas}
        zoom={zoomMap}
        tipoClima={tipoClima}
        temperatura={temperatura}
        viento={viento}
        precipitacion={precipitacion}
      />

      {/* Panel derecho: Análisis y Chatbox */}
      <div className="w-7/12 h-full flex flex-col gap-4 rounded-lg shadow-lg">
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex flex-col flex-grow-[1] gap-8 relative">
            {/* modal info */}
            {showInfoModal && <InfoModal onClose={handleToggleInfoModal} />}

            {/* Chatbox IA */}
            <ChatBox
              messages={messages}
              question={question}
              setQuestion={setQuestion}
              isLoadingResponse={isLoadingResponse}
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
              handleAskQuestion={handleAskQuestion}
              handleClearChat={handleClearChat}
              handleToggleInfoModal={handleToggleInfoModal}
              showInfoModal={showInfoModal}
              chatContainerRef={chatContainerRef}
              currentlyPlayingAudio={currentlyPlayingAudio}
              isLoadingAudio={isLoadingAudio}
              textAudio={textAudio}
              audioRef={audioRef}
              setCurrentlyPlayingAudio={setCurrentlyPlayingAudio}
              handlePlayAudioFunction={handlePlayAudioFunction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analisis;
