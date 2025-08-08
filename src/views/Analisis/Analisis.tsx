import React, { useEffect, useRef, useState } from "react";
import { useSetCoordenadasFromMessages } from "../Analisis/hooks/useSetCoordenadasFromMessages.js";

import {
  Send,
  Trash2,
  Bot,
  Mic,
  MicOff,
  Info,
  User,
  Volume2,
  BotMessageSquare,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { isValidChart, ChartErrorBoundary } from "./components/ChartUtils";
import { useChatIA } from "./hooks/useChatIA";
import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { InfoModal } from "./components/InfoModal";
import { MapView } from "../maps/index.js";
import { Message, MessagesType } from "./types/MessageType.js";

export const Analisis = () => {
  const [coordenadas, setCoordenadas] = useState<[number, number]>([
    -42.624623, -73.171303,
  ]);

  const [zoomMap, setZoomMap] = useState(7);
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
  } = useChatIA();

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

  const {
    isRecording,
    startRecording,
    stopRecording,
    handlePlayAudio,
    audioRef,
  } = useAudioRecorder(setQuestion, setAnswer);

  useSetCoordenadasFromMessages(
    messages as MessagesType[],
    setCoordenadas,
    setZoomMap
  );

  return (
    <div className="flex h-full w-full text-white p-4 gap-4">
      {/* Sección del Mapa */}
      <div className="bg-[#08141e] w-5/12 h-full flex flex-col z-0 rounded-lg border border-[#182a38] shadow-lg">
        <div className="flex-1 rounded-md overflow-hidden">
          <MapView
            handleFlyToZone={handleFlyToZone}
            onFlyEnd={handleFlyEnd}
            coordinates={coordenadas}
            zoom={zoomMap}
          />
        </div>
      </div>
      {/* Panel derecho: Análisis y Chatbox */}
      <div className="w-7/12 h-full flex flex-col gap-4 rounded-lg shadow-lg">
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex flex-col flex-grow-[1] gap-8 relative">
            {/* modal info */}
            {showInfoModal && <InfoModal onClose={handleToggleInfoModal} />}
            {/* Chatbox IA */}
            <div className="w-full h-full relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg ">
              <div className="relative group overflow-hidden  bg-gradient-to-t to-[#08141e]  from-[#1b1b2e]  rounded-lg border border-[#283a53] p-3 flex flex-col shadow-lg h-full  min-h-[280px]">
                <div className="w-[700px] h-[300px] rounded-full transition-all duration-1000 group-hover:w-full group-hover:h-[500px] group-hover:bg-blue-950/50 bg-blue-800  blur-3xl absolute -bottom-70 right-10  "></div>
                <div className="w-[500px] h-[300px] rounded-full transition-all duration-1000 group-hover:w-full  group-hover:bg-amber-800/20 bg-amber-800  blur-3xl absolute -bottom-70 left-20  "></div>
                <div className="relative w-full h-200 pb-10 flex flex-col">
                  <div className="flex justify-between items-center mb-10 pb-3 px-5  border-b border-b-[#283a53]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-normal text-white flex items-center justify-center gap-2 py-1 border border-[#0074f857] px-6 rounded-full">
                        <p className="text-transparent bg-clip-text text-clip bg-gradient-to-br from-[#9448f8]  to-[#44fff6]">
                          Bot Agente
                        </p>
                        <p className="text-transparent border border-[#0074f8] rounded px-1 font-bold bg-clip-text text-clip bg-gradient-to-br from-[#0074f8]  to-[#6eb2ff]">
                          IA
                        </p>
                      </h3>
                      <div
                        onClick={handleToggleInfoModal}
                        className="group relative flex justify-center cursor-pointer items-center gap-1 bg-amber-800/40 rounded-full px-2 pe-3 py-1 border border-amber-400"
                      >
                        <Info
                          size={20}
                          className="cursor-pointer transform transition-transform group-hover:scale-130 text-amber-400"
                        />
                        <p>Información</p>
                      </div>
                    </div>
                    <div className="absolute left-[50%] -translate-x-1/2">
                      <h2 className="text-xl font-bold text-white">
                        <span className="text-red-500">WIS-AI</span> ANÁLISIS
                      </h2>
                    </div>
                    <div
                      onClick={handleClearChat}
                      className="flex space-x-2 cursor-pointer"
                    >
                      <button className="p-1 px-4 flex items-center justify-center gap-1 text-red-100 hover:text-red-500 rounded-full hover:bg-[#080d11] transition-colors">
                        <Trash2 size={16} />
                        <p className="text-nowrap cursor-pointer">
                          Eliminar conversación
                        </p>
                      </button>
                    </div>
                  </div>
                  <div
                    id="chatMessages"
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto h-20  mb-20 space-y-6 custom-scroll text-xs scrollbar-thin scrollbar-thumb-cyan-500/40   px-5 scrollbar-track-[#0d1b2a] scrollbar-thumb-rounded-full"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {messages.map((message: Message, index: number) => {
                      return (
                        <>
                          {message.sender === "bot-bienvenida" &&
                          message.text === "sin-pregunta" ? (
                            <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-center items-center mb-5 ">
                              <div className="absolute top-25 left-[50%] -translate-x-1/2 h-20 w-50 rounded-full bg-red-300 group-hover:bg-blue-500 transition-all duration-1000 blur-3xl opacity-25"></div>
                              <div className="py-5">
                                <BotMessageSquare
                                  size={60}
                                  className="text-gray-400 group-hover:text-sky-400 transition-all duration-700 ease-in-out"
                                />
                              </div>
                              <p className="text-balance text-center text-gray-200">
                                ¡Te damos la bienvenida a la sección de
                                Análisis!
                              </p>
                              <p className="text-balance text-center text-amber-500 mb-4">
                                (Versión beta) Beta 1.0.2
                              </p>
                              <p className="text-balance text-center text-gray-300">
                                Actualmente, puedes acceder a información de los
                                centros{"  "}
                                <span className="font-bold text-white">
                                  PIRQUEN y POLOCUHE
                                </span>
                                .
                              </p>
                              <p className="text-balance text-center text-gray-300 mb-4">
                                {" "}
                                la plataforma te permite consultar tres bases de
                                datos principales
                              </p>
                              <div className="flex justify-center items-start gap-5">
                                <p className=" cursor-default py-1 text-sky-300 border border-dashed border-sky-300/50 px-4 rounded">
                                  Clima
                                </p>
                                <p className=" cursor-default py-1 text-amber-300 border  border-dashed border-amber-300/50 px-4 rounded">
                                  Alimentación
                                </p>
                                <div className=" cursor-default flex flex-col justify-center items-center">
                                  <p className="text-lime-300  py-1  border  border-dashed border-lime-300/50 px-4 rounded">
                                    Informes Ambientales{" "}
                                  </p>
                                  <span className="text-gray-500 text-xs">
                                    (Exclusivo para Pirquén)
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={index}
                              className={`flex items-start ${
                                message.sender === "user" ? "justify-end" : ""
                              }`}
                            >
                              {/* Mensaje del BOT */}
                              {message.sender === "bot" && (
                                <>
                                  <div className="flex-shrink-0 bg-gradient-to-bl from-[#ce4827] to-[#ca4242] p-2 rounded-full">
                                    <Bot className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="ml-2 bg-[#03080c] border-s-2 border-s-[#ce4827] rounded-lg p-5 px-10 max-w-[calc(100%-60px)] h-full">
                                    <p className="text-[1rem] text-gray-100">
                                      {message.text
                                        .split("\n")
                                        .map((line, i) => (
                                          <span key={i}>
                                            {line}
                                            <br />
                                          </span>
                                        ))}
                                    </p>

                                    {/* Verifica que el gráfico exista en el mensaje y sea válido */}
                                    {message.chart &&
                                    isValidChart(message.chart) ? (
                                      <ChartErrorBoundary>
                                        <div className="mt-3 bg-[#0d1b2a] rounded-lg p-3 border border-[#22334a]">
                                          <h4 className="text-xs font-semibold mb-2 text-blue-300">
                                            {message.chart.title}
                                          </h4>
                                          <ResponsiveContainer
                                            width="100%"
                                            height={220}
                                          >
                                            {message.chart.type === "bar" ? (
                                              <BarChart
                                                data={message.chart.xAxis.map(
                                                  (cat, i) => {
                                                    const row: {
                                                      name: string;
                                                      [key: string]:
                                                        | string
                                                        | number;
                                                    } = { name: cat };
                                                    message?.chart?.series.forEach(
                                                      (serie) => {
                                                        row[serie.name] =
                                                          serie.data[i];
                                                      }
                                                    );
                                                    return row;
                                                  }
                                                )}
                                              >
                                                <XAxis
                                                  dataKey="name"
                                                  fontSize={10}
                                                />
                                                <YAxis fontSize={10} />
                                                <Tooltip />
                                                <Legend />
                                                {message.chart.series.map(
                                                  (serie, idx) => (
                                                    <Bar
                                                      key={serie.name}
                                                      dataKey={serie.name}
                                                      fill={
                                                        [
                                                          "#36A2EB",
                                                          "#FF6384",
                                                          "#FFCE56",
                                                          "#4BC0C0",
                                                        ][idx % 4]
                                                      }
                                                      barSize={18}
                                                    />
                                                  )
                                                )}
                                              </BarChart>
                                            ) : message.chart.type ===
                                              "line" ? (
                                              <LineChart
                                                data={message.chart.xAxis.map(
                                                  (cat, i) => {
                                                    const row: {
                                                      name: string;
                                                      [key: string]:
                                                        | string
                                                        | number;
                                                    } = { name: cat };
                                                    message?.chart?.series.forEach(
                                                      (serie) => {
                                                        row[serie.name] =
                                                          serie.data[i];
                                                      }
                                                    );
                                                    return row;
                                                  }
                                                )}
                                              >
                                                <XAxis
                                                  dataKey="name"
                                                  fontSize={10}
                                                />
                                                <YAxis fontSize={10} />
                                                <Tooltip />
                                                <Legend />
                                                {message.chart.series.map(
                                                  (serie, idx) => (
                                                    <Line
                                                      key={serie.name}
                                                      type="monotone"
                                                      dataKey={serie.name}
                                                      stroke={
                                                        [
                                                          "#36A2EB",
                                                          "#FF6384",
                                                          "#FFCE56",
                                                          "#4BC0C0",
                                                        ][idx % 4]
                                                      }
                                                      strokeWidth={2}
                                                      dot={false}
                                                    />
                                                  )
                                                )}
                                              </LineChart>
                                            ) : (
                                              <span>
                                                Unsupported chart type
                                              </span>
                                            )}
                                          </ResponsiveContainer>
                                        </div>
                                      </ChartErrorBoundary>
                                    ) : (
                                      <React.Fragment />
                                    )}

                                    {/* Renderizar audio si exist */}
                                    {message.audioBase64 && (
                                      <div className="mt-2 flex items-center space-x-1">
                                        <audio
                                          ref={audioRef}
                                          src={`data:audio/wav;base64,${message.audioBase64}`}
                                          controls
                                          className="hidden"
                                        />
                                        <button
                                          onClick={handlePlayAudio}
                                          className=" border border-lime-300 rounded-full hover:bg-blue-700 text-white px-3 py-2 text-xs flex items-center space-x-1"
                                        >
                                          <Volume2 size={14} />
                                          <span className="text-lime-300">
                                            Escuchar respuesta
                                          </span>
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}

                              {/* Mensaje del USUARIO */}
                              {message.sender === "user" && (
                                <>
                                  <div className="mr-2 bg-blue-800 border-e-2 border-e-blue-500 rounded-lg p-2 max-w-[calc(100%-60px)]">
                                    <p className="text-[1rem] text-white">
                                      {message.text}
                                    </p>
                                  </div>
                                  <div className="flex-shrink-0 bg-gradient-to-bl from-blue-600 p-2 rounded-full ">
                                    <User className="h-5 w-5 text-gray-200" />
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {isRecording && (
              <div className="absolute bottom-15 z-10 left-[50%] bg-red-950/50 border border-red-500 rounded-2xl -translate-x-1/2 h-8  w-[15%]  flex justify-centerd items-center px-10">
                <div className="bg-red-500 absolute left-[50%] -translate-x-1/2 blur-xl animate-pulse h-10 w-10 rounded-full opacity-50"></div>
                <p className="relative flex items-center gap-2 z-20">
                  <Mic size={16} /> Grabando...
                </p>
              </div>
            )}

            {/* Input y botones */}
            <div className="absolute bottom-10 w-[94.5%] left-[50%] -translate-x-1/2 flex items-center gap-2 mt-2 p-[1px] bg-gradient-to-br from-blue-900 to-amber-600  rounded-full">
              <div className="w-full flex gap-2 bg-gray-900 p-0.5 rounded-full">
                <input
                  type="text"
                  className="flex-1 px-5 py-4 bg-transparent  text-white text-xs  focus:outline-none focus:ring focus:ring-transparent focus:bg-slate-950 focus:rounded-full transition-all duration-500"
                  placeholder="Haz una pregunta sobre los centros o informes..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAskQuestion();
                    }
                  }}
                  disabled={isLoadingResponse || isRecording}
                />
                <div className="flex justify-center items-center ">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`rounded-full cursor-pointer h-8 w-8  flex items-center justify-center space-x-1 shadow-md ${
                      isRecording
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-slate-800  hover:bg-slate-950/20 text-amber-300 transition-all duration-300  hover:text-blue-200 border border-transparent hover:border hover:border-blue-900"
                    }  text-xs`}
                    disabled={isLoadingResponse}
                  >
                    {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                  </button>
                </div>
                <div className="flex justify-center items-center pe-2.5 ">
                  <button
                    onClick={handleAskQuestion}
                    className="flex gap-1 cursor-pointer justify-center items-center px-3 py-1 bg-slate-800 rounded-full  hover:bg-slate-950/20 text-amber-300 transition-all duration-300  hover:text-blue-200 border border-transparent hover:border hover:border-blue-900 "
                    disabled={isLoadingResponse || isRecording}
                  >
                    {isLoadingResponse ? (
                      <svg
                        className="animate-spin h-3 w-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Send className="text-blue-500" size={13} />
                    )}
                    <span>
                      {isLoadingResponse ? "Analizando..." : "Enviar"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-1/12 h-full flex flex-col gap-4 rounded-lg shadow-lg bg-amber-300"></div> */}
    </div>
  );
};

export default Analisis;
