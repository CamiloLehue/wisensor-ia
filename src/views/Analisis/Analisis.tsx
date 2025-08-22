import { useCallback, useEffect, useRef, useState } from "react";
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
  const [fecha, setFecha] = useState<string | undefined>(undefined);

  // Efecto para monitorear cambios en tipoClima
  useEffect(() => {
  }, [tipoClima]);
  
  // Efecto para monitorear cambios en los datos climáticos
  useEffect(() => {
  }, [temperatura, viento, precipitacion]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);


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

  const { isRecording, startRecording, stopRecording } =
    useAudioRecorder(setQuestion, setAnswer);

  // Separate ref for audio playback
  const playbackAudioRef = useRef<HTMLAudioElement | null>(null);

  // Function to handle suggested question selection
  const handleQuestionSelect = useCallback((selectedQuestion: string) => {
    setQuestion(selectedQuestion);
    // Automatically trigger the question after a short delay to allow state to update
    setTimeout(() => {
      handleAskQuestion();
    }, 100);
  }, [setQuestion, handleAskQuestion]);

  useSetCoordenadasFromMessages(
    messages as MessagesType[],
    setCoordenadas,
    setZoomMap,
    setTipoClima,
    setTemperatura,
    setViento,
    setPrecipitacion,
    setFecha
  );

  const { handleTextAudio, isLoadingAudio } = useTextAudio();
  // Cache maps text -> object URL for audio
  const audioCache = useRef<Map<string, string>>(new Map());
  const currentlyPlayingRef = useRef<string | null>(null);

  // Sync ref with state
  useEffect(() => {
    currentlyPlayingRef.current = currentlyPlayingAudio;
  }, [currentlyPlayingAudio]);

  const handlePlayAudioFunction = useCallback(async (text: string, autoPlay = false) => {
    console.log("🎬 handlePlayAudioFunction called:", { text, autoPlay });
    
    // Si ya está en caché, reproducir directamente
    if (audioCache.current.has(text)) {
      console.log("💾 Using cached audio for:", text);
      if (playbackAudioRef.current) {
        const cachedUrl = audioCache.current.get(text) || "";
        playbackAudioRef.current.src = cachedUrl;
        playbackAudioRef.current.currentTime = 0;
        setCurrentlyPlayingAudio(text);
        console.log("🔊 Audio src set to:", cachedUrl);
        if (autoPlay) {
          playbackAudioRef.current.play().catch(console.error);
        }
      }
      return;
    }

    // Marcar que este audio se está cargando
    setCurrentlyPlayingAudio(text);
    console.log("⏳ Loading audio for:", text);

    try {
      const audioUrl = await handleTextAudio(text);
      console.log("🎵 Received audio URL:", audioUrl);
      console.log("🎧 playbackAudioRef.current exists:", !!playbackAudioRef.current);

      if (audioUrl) {
        if (!playbackAudioRef.current) {
          console.error("❌ playbackAudioRef.current is null!");
          return;
        }

        // Guardar en caché
        audioCache.current.set(text, audioUrl);
        console.log("💾 Cached audio URL for:", text);

        // Configurar el audio siempre (sin verificar currentlyPlayingRef para debug)
        console.log("🔍 Setting audio src unconditionally for debug");
        playbackAudioRef.current.src = audioUrl;
        playbackAudioRef.current.currentTime = 0;
        console.log("🔊 Audio src set to URL:", audioUrl);

        // Reproducir automáticamente solo si es autoPlay (respuesta del servidor)
        if (autoPlay) {
          console.log("▶️ Auto-playing audio");
          playbackAudioRef.current.play().catch(console.error);
        }
      } else {
        console.log("❌ No audio URL received");
      }
    } catch (error) {
      console.error("💥 Error al generar audio:", error);
      setCurrentlyPlayingAudio(null);
    }
  }, [handleTextAudio]); // Removed audioRef dependency

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Removed auto-play functionality - audio will only play when user clicks the button
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
        fecha={fecha}
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
              audioRef={playbackAudioRef}
              setCurrentlyPlayingAudio={setCurrentlyPlayingAudio}
              handlePlayAudioFunction={handlePlayAudioFunction}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analisis;
