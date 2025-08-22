import React from "react";
import { Send, Mic, MicOff } from "lucide-react";
import GrabandoLoad from "../../../components/GrabandoLoad";

interface ChatInputProps {
  question: string;
  setQuestion: (question: string) => void;
  isLoadingResponse: boolean;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  handleAskQuestion: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  question,
  setQuestion,
  isLoadingResponse,
  isRecording,
  startRecording,
  stopRecording,
  handleAskQuestion,
}) => {
  return (
    <div className="absolute z-[9999]  bottom-10 w-[94.5%] left-[50%] -translate-x-1/2 flex items-end gap-2 mt-2 p-[1.2px] bg-gradient-to-br from-blue-900 to-amber-600 rounded-2xl">
      <div className="w-full flex gap-2 bg-gray-900 p-0.5 rounded-2xl">
        <textarea
          rows={1}
          className="input flex-1 px-5 py-3 bg-transparent text-white text-xs focus:outline-none focus:ring focus:ring-transparent focus:bg-slate-950 focus:rounded-2xl transition-all duration-500 resize-none overflow-hidden min-h-[44px] max-h-[200px]"
          placeholder="¿En qué puedo ayudarte?"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            // Ajustar altura automáticamente
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAskQuestion();
            }
          }}
          disabled={isLoadingResponse || isRecording}
        />
        <div className="flex justify-center items-center ">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`rounded-full cursor-pointer h-8 w-8 flex items-center justify-center space-x-1 shadow-md ${
              isRecording
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-slate-800 hover:bg-slate-950/20 text-amber-300 transition-all duration-300 hover:text-blue-200 border border-transparent hover:border hover:border-blue-900"
            } text-xs`}
            disabled={isLoadingResponse}
          >
            {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
          </button>
        </div>
        {isRecording && (
          <div
            onClick={isRecording ? stopRecording : startRecording}
            className="absolute backdrop-blur-xs cursor-pointer w-full h-[500px] bottom-0 transition-all duration-700   flex flex-col gap-10 justify-center items-center"
          >
            <GrabandoLoad  />
            <small className="bg-red-500 px-4 rounded-full">Parar grabación</small>
          </div>
        )}
        <div className="flex justify-center items-center pe-2.5 ">
          <button
            onClick={handleAskQuestion}
            className="flex gap-1 cursor-pointer justify-center items-center px-3 py-1 bg-slate-800 rounded-full hover:bg-slate-950/20 text-amber-300 transition-all duration-300 hover:text-blue-200 border border-transparent hover:border hover:border-blue-900"
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
            <span>{isLoadingResponse ? "Analizando..." : "Enviar"}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
