import React, { RefObject } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatContainer } from "./ChatContainer";
import { RecordingIndicator } from "./RecordingIndicator";
import { ChatInput } from "./ChatInput";
import { Message } from "../types/MessageType";

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
  textAudio: string | null;
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
  textAudio,
  audioRef,
  setCurrentlyPlayingAudio,
  handlePlayAudioFunction,
}) => {
  return (
    <div className="w-full h-full relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg">
      <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-3 flex flex-col shadow-lg h-full min-h-[280px]">
        <div className="w-[700px] h-[300px] rounded-full transition-all duration-1000 group-hover:w-full group-hover:h-[500px] group-hover:bg-blue-950/50 bg-blue-800 blur-3xl absolute -bottom-70 right-10"></div>
        <div className="w-[500px] h-[300px] rounded-full transition-all duration-1000 group-hover:w-full group-hover:bg-amber-800/20 bg-amber-800 blur-3xl absolute -bottom-70 left-20"></div>
        <div className="relative w-full h-200 pb-10 flex flex-col">
          <ChatHeader
            handleToggleInfoModal={handleToggleInfoModal}
            handleClearChat={handleClearChat}
          />

          <ChatContainer
            messages={messages}
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
  );
};
