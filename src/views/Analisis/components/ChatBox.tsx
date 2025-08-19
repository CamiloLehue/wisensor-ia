import React, { RefObject } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatContainer } from "./ChatContainer";
import { RecordingIndicator } from "./RecordingIndicator";
import { ChatInput } from "./ChatInput";
import { Message } from "../types/MessageType";
import { useWindowSize } from "usehooks-ts";

interface ChatBoxProps {
  messages: Message[];
  question: string;
  setQuestion: (question: string) => void;
  isLoadingResponse: boolean;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  handleAskQuestion: () => void;
  handleClearChat: () => void;
  handleToggleInfoModal: () => void;
  showInfoModal: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
  currentlyPlayingAudio: string | null;
  isLoadingAudio: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
  setCurrentlyPlayingAudio: (text: string | null) => void;
  handlePlayAudioFunction: (text: string, autoPlay: boolean) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  question,
  setQuestion,
  isLoadingResponse,
  isRecording,
  startRecording,
  stopRecording,
  handleAskQuestion,
  handleClearChat,
  handleToggleInfoModal,
  // showInfoModal,
  chatContainerRef,
  currentlyPlayingAudio,
  isLoadingAudio,
  audioRef,
  setCurrentlyPlayingAudio,
  handlePlayAudioFunction,
}) => {

  const { height } = useWindowSize();

  return (
    <>
      <div className="w-full h-[100%] relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg">
        <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-3 flex flex-col shadow-lg h-full min-h-[280px]">
          <div className="w-[700px] h-[300px] rounded-full transition-all duration-1000 group-hover:w-full group-hover:h-[500px] group-hover:bg-blue-950/50 bg-blue-800 blur-3xl absolute -bottom-70 right-10"></div>
          <div className="w-[500px] h-[300px] rounded-full transition-all duration-1000 group-hover:w-full group-hover:bg-amber-800/20 bg-amber-800 blur-3xl absolute -bottom-70 left-20"></div>
          <div className="relative w-full pb-10 flex flex-col"
          style={{
            height: height -100+ "px",
          }}>
            <ChatHeader
              handleToggleInfoModal={handleToggleInfoModal}
              handleClearChat={handleClearChat}
            />

            <ChatContainer
              messages={messages}
              chatContainerRef={chatContainerRef}
              currentlyPlayingAudio={currentlyPlayingAudio}
              isLoadingAudio={isLoadingAudio}
              audioRef={audioRef}
              setCurrentlyPlayingAudio={setCurrentlyPlayingAudio}
              handlePlayAudioFunction={handlePlayAudioFunction}
            />
          </div>
        </div>

        <RecordingIndicator isRecording={isRecording} />

        <ChatInput
          question={question}
          setQuestion={setQuestion}
          isLoadingResponse={isLoadingResponse}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          handleAskQuestion={handleAskQuestion}
        />
      </div>

      {/* <div className="w-full h-full max-h-[37%] relative bg-gradient-to-bl to-[#d76011] via-[#cb8604] from-[#02c6fc] p-[1px] rounded-lg">
        <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-3 flex flex-col shadow-lg h-full">
          <div className="w-[700px] h-[300px] rounded-full transition-all duration-1000 group-hover:w-full group-hover:h-[500px] group-hover:bg-blue-950/50 bg-blue-800 blur-3xl absolute -bottom-70 right-10"></div>
          <div className="w-[500px] h-[300px] rounded-full transition-all duration-1000 group-hover:w-full group-hover:bg-amber-800/20 bg-indigo-800 blur-3xl absolute -bottom-70 left-20"></div>

          <div className="w-full  flex-col justify-center items-start px-5">
            <div className="w-full flex justify-between items-center">
              <small className="text-orange-400">
                Resultado búsqueda de clima
              </small>
              <small className="text-gray-300">Lunes, 12 de Enero</small>
            </div>
            <h2 className="text-2xl">Pirquen, Chile</h2>
          </div>
          <div className="w-full h-full  grid grid-cols-4">
            <div className="border border-gray-100/20 rounded-2xl grid grid-cols-3 ">
              <div>
                <img
                  src="/clima/nublado.png"
                  alt="clima_img"
                  className=" overflow-clip"
                />
              </div>
              <div className="flex flex-col h-full">
                <h3 className="text-2xl text-white">Nublado</h3>
                <p className="text-gray-300">25°C</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
