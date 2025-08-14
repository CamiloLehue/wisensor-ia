import React, { RefObject } from 'react';
import { Bot, Volume2 } from 'lucide-react';
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
} from 'recharts';
import { isValidChart, ChartErrorBoundary } from './ChartUtils';
import { Message } from '../types/MessageType';

interface BotMessageProps {
  message: Message;
  currentlyPlayingAudio: string | null;
  isLoadingAudio: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
  setCurrentlyPlayingAudio: (text: string | null) => void;
  handlePlayAudioFunction: (text: string, autoPlay: boolean) => void;
}

export const BotMessage: React.FC<BotMessageProps> = ({
  message,
  currentlyPlayingAudio,
  isLoadingAudio,
  audioRef,
  setCurrentlyPlayingAudio,
  handlePlayAudioFunction,
}) => {
  return (
    <>
      <div className="flex-shrink-0 bg-gradient-to-bl from-[#ce4827] to-[#ca4242] p-2 rounded-full">
        <Bot className="h-5 w-5 text-white" />
      </div>
      <div className="ml-2 bg-[#03080c] border-s-2 border-s-[#ce4827] rounded-lg p-5 px-10 max-w-[calc(100%-60px)] h-full">
        <p className="text-[1rem] text-gray-100">
          {message.text.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>

        {/* Verifica que el gráfico exista en el mensaje y sea válido */}
        {message.chart && isValidChart(message.chart) ? (
          <ChartErrorBoundary>
            <div className="mt-3 bg-[#0d1b2a] rounded-lg p-3 border border-[#22334a]">
              <h4 className="text-xs font-semibold mb-2 text-blue-300">
                {message.chart.title}
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                {message.chart.type === "bar" ? (
                  <BarChart
                    data={message.chart.xAxis.map((cat, i) => {
                      const row: {
                        name: string;
                        [key: string]: string | number;
                      } = { name: cat };
                      message?.chart?.series.forEach((serie) => {
                        row[serie.name] = serie.data[i];
                      });
                      return row;
                    })}
                  >
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Legend />
                    {message.chart.series.map((serie, idx) => (
                      <Bar
                        key={serie.name}
                        dataKey={serie.name}
                        fill={
                          ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"][
                            idx % 4
                          ]
                        }
                        barSize={18}
                      />
                    ))}
                  </BarChart>
                ) : message.chart.type === "line" ? (
                  <LineChart
                    data={message.chart.xAxis.map((cat, i) => {
                      const row: {
                        name: string;
                        [key: string]: string | number;
                      } = { name: cat };
                      message?.chart?.series.forEach((serie) => {
                        row[serie.name] = serie.data[i];
                      });
                      return row;
                    })}
                  >
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Legend />
                    {message.chart.series.map((serie, idx) => (
                      <Line
                        key={serie.name}
                        type="monotone"
                        dataKey={serie.name}
                        stroke={
                          ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"][
                            idx % 4
                          ]
                        }
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <span>Unsupported chart type</span>
                )}
              </ResponsiveContainer>
            </div>
          </ChartErrorBoundary>
        ) : (
          <React.Fragment />
        )}

        {/* Renderizar audio si existe - siempre presente para mantener la ref */}
        <div className="mt-2 flex items-center space-x-1">
          {/* Audio element - always present but hidden when not needed */}
          <audio
            ref={audioRef}
            controls={currentlyPlayingAudio === message.text && !isLoadingAudio}
            onEnded={() => setCurrentlyPlayingAudio(null)}
            onLoadedData={() => console.log("🎵 Audio loaded and ready to play")}
            onError={(e) => console.error("❌ Audio error:", e)}
            onCanPlay={() => console.log("✅ Audio can play")}
            className={`custom-audio ${
              currentlyPlayingAudio === message.text && !isLoadingAudio ? 'block' : 'hidden'
            }`}
          />
          
          {currentlyPlayingAudio === message.text ? (
            isLoadingAudio ? (
              <button
                className="border border-amber-300 rounded-full bg-amber-900/20 text-white px-3 py-2 text-xs flex items-center space-x-1"
                disabled
              >
                <svg
                  className="animate-spin h-3 w-3 text-amber-300"
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
                <span className="text-amber-300">Cargando audio...</span>
              </button>
            ) : null
          ) : (
            <button
              onClick={() => {
                console.log("🔘 Audio button clicked for:", message.text);
                handlePlayAudioFunction(message.text, false);
              }}
              className="border border-lime-300 rounded-full hover:bg-blue-700 text-white px-3 py-2 text-xs flex items-center space-x-1"
              disabled={isLoadingAudio}
            >
              <Volume2 size={14} />
              <span className="text-lime-300">Cargar Audio</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};